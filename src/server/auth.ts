import {
  DefaultUser,
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
import { env } from "@/env";
import {
  SignInServiceResponseInterface,
  User as UserKU,
} from "@/interfaces/SignInServiceResponseInterface";
import { DefaultJWT } from "next-auth/jwt";
import SignInService from "@/services/signInService";
import { AxiosError } from "axios";
import { UserKuInterface } from "@/interfaces/UserKuInterface";
import getRenewToken from "@/services/renewToken";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      accesstoken: string;
      renewtoken: string;
      user: UserKU;
    };
  }
  interface User {
    accesstoken: string;
    renewtoken: string;
    user: UserKU;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    accesstoken: string;
    renewtoken: string;
    user: UserKU;
  }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  callbacks: {
    async session({ session, user, token }) {
      const data: UserKuInterface = jwtDecode(session.user.accesstoken);

      if (data.exp < Date.now() / 1000) {
        return {} as any;
      }

      return {
        ...session,
      };
    },
    async jwt({ token, user, account, profile }) {
      const renewToken = await getRenewToken({
        renewtoken: token.renewtoken,
      });
      return {
        ...token,
        accesstoken: renewToken.data.accesstoken,
      };
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/sign-in",
  },
  providers: [
    CredentialsProvider({
      name: "ku-login",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "เช่น b63xxxxxxxx หรือ regxxx",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "รหัสผ่านบัญชีผู้ใช้เครือข่ายนนทรี",
        },
      },
      async authorize(credentials) {
        try {
          const response = await SignInService({
            username: credentials?.username!,
            password: credentials?.password!,
          });
          return {
            accesstoken: response.data.accesstoken,
            renewtoken: response.data.renewtoken,
            user: response.data.user,
          };
        } catch (error) {
          if (error instanceof AxiosError) {
            throw new Error(
              error.response?.data.message ?? "มีบางอย่างผิดพลาด",
            );
          }
        }
      },
    }),
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
