import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const { handler, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      authorize: async (credentials) => {
        try {
          const response = await axios.post("http://localhost:5000/api/auth/login", credentials);
          
          if (!response.data.user || !response.data.token) {
            return null;
          }
          
          return {
            user: response.data.user,
            token: response.data.token
          };
        } catch (error) {
          console.error("Login error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        token.accessToken = user.token;
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }) => {
      session.accessToken = token.accessToken;
      session.user = token.user;
      return session;
    }
  },
  pages: {
    signIn: "/login",
    error: "/error",
  }
});
