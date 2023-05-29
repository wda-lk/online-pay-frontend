import { NextApiRequest, NextApiResponse } from "next"
import { authOptions } from "@/pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth"
import { prismaOnlinePay } from "@/lib/prisma"


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ message: "Method Not Allowed" })
  }
  const session = await getServerSession(req, res, authOptions)
  res.status(201).json({ message: session })
  /*await
    prismaOnlinePay
      .user
      .update(
        {
          where: { id: session?.user?.email },
          data: {
            nicNumber: req.body.nicNumber,
            name: req.body.name,
            mobileNumber: req.body.mobileNumber,
            gnDivisionId: parseInt(req.body.gnDivision.value),
            address: req.body.address,
            isActive: true
          }
        })
      .then(user => res.status(201).json({ message: user }))
      .catch(error => res.status(error.status).json({ message: error.message }))*/
}

export default handler
