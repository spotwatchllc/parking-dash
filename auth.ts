// auth.ts
import NextAuth from "next-auth"

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    async session({ session, token }) {
      if (token.role && session.user) {
        session.user.role = token.role // Pass the role from JWT to the session
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) token.role = user.role // Capture the role when the user logs in
      return token
    },
  },
  providers: [], // Add your Credentials or OAuth providers here
})