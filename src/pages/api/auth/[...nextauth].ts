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
        from: process.env.EMAIL_FROM,
        maxAge: 10 * 60 // Magic links are valid for 10 min only
      }
    )
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile, email }: any) {
      if (!email) {
        if (user.isActive) {
          return true
        }
        return "/auth/user-info"
      }
      return true
    },
    async session({ session, user }: any) {
      console.log(`Session callback: session - ${session}, user - ${user}`)
      return session
    }
  },
  pages: {
    signIn: "/auth/sign-in",
  }
}

export default NextAuth(authOptions)
