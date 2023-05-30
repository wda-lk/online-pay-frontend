import { PrismaClient as PrismaCoreClient } from "@prisma-core/client"
import { PrismaClient as PrismaOnlinePayClient } from "@prisma-online-payment/client"


// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
//
// Learn more:
// https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = global as unknown as {
  prismaCore: PrismaCoreClient,
  prismaOnlinePay: PrismaOnlinePayClient
}

export const prismaCore = globalForPrisma.prismaCore || new PrismaCoreClient()
export const prismaOnlinePay = globalForPrisma.prismaOnlinePay || new PrismaOnlinePayClient()


if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prismaCore = prismaCore
  globalForPrisma.prismaOnlinePay = prismaOnlinePay
}
