import { NextApiRequest, NextApiResponse } from "next"
import { ResponseData } from "@/../types/global";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth"
import { prismaOnlinePay } from "@/lib/prisma"


const authenticate = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>) => {
  const session = await getServerSession(req, res, authOptions)
  if (!session) {
    return res.status(401)
              .json({
                error: "Unauthorized",
                message: "User should first be authenticated to use the requested service"
              })
  }
  return session
}

// GET /api/users?nicNumber=[nicNumber]
const getUserByNICNumber = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
  nicNumber: string) => {
  await authenticate(req, res)
  const user = await prismaOnlinePay.user.findUnique({ where: { nicNumber: nicNumber } })
  if (!user) {
    return res.status(404)
              .json({
                "error": "Data Not Found",
                "message": "The requested user does not exist in the database."
              })
  }
  return res.status(200).json({ data: user })
}

const createUser = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>) => {
  const session = await authenticate(req, res)
  const email = session?.user?.email
  try {
    const body = JSON.parse(req.body)
    const user
      = await prismaOnlinePay.user
                             .update({
                               where: { email: email },
                               data: {
                                 nicNumber: body.nicNumber,
                                 name: body.name,
                                 tmpName: body.name,
                                 mobileNumber: body.mobileNumber,
                                 gnDivisionId: body.gnDivisionId,
                                 address: body.address,
                                 tmpAddress: body.address,
                                 isActive: true
                               }
                             })
    return res.status(201)
              .json({
                message: `Activated the account of user ${email}`,
                data: user
              })
  } catch (error: any) {
    if (error.code === "P2025") {
      return res.status(404)
                .json({
                  "error": "Data Not Found",
                  "message": "The requested user does not exist in the database."
                })
    }
    throw error
  }
}

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  switch (req.method) {
    case "GET":
      const { nicNumber } = req.query;
      if (typeof nicNumber === "string") {
        return await getUserByNICNumber(req, res, nicNumber)
      }
      return res.status(400)
                .json({
                  error: "Invalid query parameters",
                  message: "The provided query parameters are either missing or in the incorrect " +
                           "format. Supported params : nicNumber: string"
                })
    case "PUT":
      return await createUser(req, res)
    default:
      res.status(405).json({ error: "Method Not Allowed" })
  }
}

export default handler
