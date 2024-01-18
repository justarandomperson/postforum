import nextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import connectMongoDB from "@/lib/mongodb";
import User from "@/models/user";

export default nextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        await connectMongoDB();
        const user = await User.findOne({ username: credentials.username });
        if (!user) {
          throw new Error("Invalid username/password.");
        }

        if (!(await compare(credentials.password, user.password))) {
          throw "Invalid username/password.";
        }

        const user_info = {
          name: user.username,
          id: user._id,
        };

        return user_info;
      },
    }),
  ],
  callbacks: {
    jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = user?.id;
      }
      return token;
    },
    session({ session, token }) {
      session.user.id = token.id;

      return session;
    },
  },
});
