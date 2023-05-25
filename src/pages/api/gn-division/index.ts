import { NextApiRequest, NextApiResponse } from "next"
import { prismaCore } from "@/lib/prisma"


// GET /api/gn-division
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const gnDivisions = await prismaCore.gNDivisionLocation.findMany()
  res.status(200).json({ message: gnDivisions })
}

export default handler
