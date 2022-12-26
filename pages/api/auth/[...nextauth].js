import { compare } from "bcryptjs";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectMongo from "../../../db/conn";
import users from "../../../models/userSchema";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  // jwt: {
  //   signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
  // },
  // secret: process.env.SECRET,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials, res) {
        connectMongo().catch((err) => {
          err: "Connection to database failed.";
        });

        const user = await users.findOne({ email: credentials.email });

        if (!user) {
          throw new Error("No user found with this email please sign up.");
        }

        const checkPassword = await compare(
          credentials.password,
          user.password
        );

        if (!checkPassword || user.email !== credentials.email) {
          throw new Error("Email and password does not match.");
        }

        return user;
      },
    }),
  ],
};
export default NextAuth(authOptions);
