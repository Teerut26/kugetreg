import { type DefaultSession, type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { type JWT } from "next-auth/jwt";
import SignInService from "@/services/sign-in.service";
import { AxiosError } from "axios";
import { type Student } from "types/responses/ISignInServiceResponse";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      access_token: string;
      student: Student;
    } & DefaultSession["user"];
  }

  interface User {
    access_token: string;
    student: Student;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    access_token: string;
    student: Student;
  }
}

export const authConfig = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        try {
          const result = await SignInService({
            username: credentials.username as string,
            password: credentials.password as string,
          });

          return {
            email: result.user.student.email,
            access_token: result.accesstoken,
            id: result.user.idCode,
            name:
              result.user.student.firstNameEn +
              " " +
              result.user.student.lastNameEn,
            student: result.user.student,
          };
        } catch (error) {
          if (error instanceof AxiosError) {
            console.log("error", error);

            return null;
          }
          console.log("error", error);
          throw error;
        }
      },
    }),
  ],
  callbacks: {
    session: (session) => {
      session.session.user.access_token = session.token.access_token;
      session.session.user.email = session.token.email ?? "";
      session.session.user.name = session.token.name;
      session.session.user.id = session.token.id;
      session.session.user.image = session.token.image as string;
      return session.session;
    },
    async jwt({ user, token }) {
      if (user) {
        return {
          access_token: user.access_token,
          email: user.email,
          name: user.name,
          id: user.id,
          image: user.image,
          student: user.student,
        } as JWT;
      }
      console.log("jwt", token);

      return token;
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  session: {
    strategy: "jwt",
  },
} satisfies NextAuthConfig;
