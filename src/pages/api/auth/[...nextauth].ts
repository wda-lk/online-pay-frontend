import EmailProvider from "next-auth/providers/email"
import NextAuth from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { prismaOnlinePay } from "@/lib/prisma"


export const authOptions = {
  adapter: PrismaAdapter(prismaOnlinePay),
  providers: [
    EmailProvider(
      {
        server: {
          host: process.env.EMAIL_SERVER_HOST,
          port: parseInt(process.env.EMAIL_SERVER_PORT || ""),
          auth: {
            user: process.env.EMAIL_SERVER_USER,
            pass: process.env.EMAIL_SERVER_PASSWORD
          },
          tls: {
            rejectUnauthorized: false // This is insecure should be removed after setting up a proper email client
          }
        },
        from: process.env.EMAIL_FROM
      }
    )
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, email }: any) {
      // If a user already has activated their account send them directly to the dashboard
      if (!email) {
        if (user.isActive) {
          return "/dashboard"
        }
      }
      return true
    },
    async session({ session, user }: any) {
      session.user.isActive = user.isActive
      return session
    }
  },
  pages: {
    signIn: "/auth/sign-in",
    verifyRequest: "/auth/verify-request", // (used for check email message)
    newUser: "/auth/new-user" // New users will be directed here on first sign in
  }
}

export default NextAuth(authOptions)
