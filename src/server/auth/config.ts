import { type DefaultSession, type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { type JWT } from "next-auth/jwt";
import SignInService from "@/services/signIn.service";
import { AxiosError } from "axios";
import { type Student } from "types/responses/ISignInServiceResponse";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      access_token: string;
      student: Student;
      userType: string;
    } & DefaultSession["user"];
  }

  interface User {
    access_token: string;
    student: Student;
    userType: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    access_token: string;
    student: Student;
    userType: string;
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
            userType: result.user.userType,
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
      session.session.user.student = session.token.student;
      session.session.user.userType = session.token.userType;
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
          userType: user.userType,
        } as JWT;
      }

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
