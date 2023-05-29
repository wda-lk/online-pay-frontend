import { NextApiRequest, NextApiResponse } from "next"
import { prismaOnlinePay } from "@/lib/prisma"


type ResponseData = {
  message: string | {}
}

const handler = async (req: NextApiRequest, res: NextApiResponse<ResponseData>) => {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ message: "Method Not Allowed" })
  }
  const { nicNumber } = req.query
  if (typeof nicNumber !== "string") {
    return res
      .status(405)
      .json({ message: `Passed param nicNumber ${nicNumber} should be a single string` })
  }
  await prismaOnlinePay
    .user
    .findUniqueOrThrow({ where: { nicNumber: nicNumber } })
    .then(user => res.status(200).json({ message: user }))
    .catch((error) => {
      error.code === "P2025" ? res.status(404).json({ message: `User doesn't exist for ${nicNumber}` })
                             : res.status(error.status).json({ message: error.message })
    })
}

export default handler
