import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import prisma from "@/db";
import bcrypt from "bcrypt";
export const NEXT_AUTH_CONFIG = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "" },
        password: { label: "password", type: "password", placeholder: "" },
      },
      async authorize(credentials: any) {
        if (!credentials) {
          throw new Error("No credentails provided");
        }
        const { email, password } = credentials;
        console.log(email, password);
        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user) {
          console.log("error in user");
          throw new Error("No user found with the provided email");
        }

        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          console.log("error in password");
          throw new Error("Invalid password");
        }

        const { password: _, ...userWithoutPassword } = user;

        return {
          id: String(userWithoutPassword.id),
          email: userWithoutPassword.email,
          name: userWithoutPassword.fullname,
          image: userWithoutPassword.profileImg,
        };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,

  callbacks: {
    jwt: async ({ user, token }: any) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
    session: ({ session, token, user }: any) => {
      if (session.user) {
        session.user.id = token.uid;
      }
      return session;
    },
  },
  pages: {
    signIn: "./signin",
  },
};
