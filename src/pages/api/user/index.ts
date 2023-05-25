// GET /api/user?nicNumber=[nicNumber]&mobileNumber=[mobileNumber]
import { NextApiRequest, NextApiResponse } from "next"
import { prismaOnlinePay } from "@/lib/prisma"

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { nic, mobile } = req.query
  const user = await prismaOnlinePay.user.findFirst(
    {
      where: {
        OR: [
          {
            nicNumber: {
              equals: nic
            }
          },
          {
            mobileNumber: {
              equals: mobile
            }
          }
        ]
      }
    })
  user ? res.status(200).json({ message: true })
       : res.status(204).json({ message: false })
}

export default handler
