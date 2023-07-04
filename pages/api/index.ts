import { NextApiResponse } from "next";
import { NextRequest } from "next/server";

export default function handler(req: NextRequest, res: NextApiResponse) {
  res.status(200).json({ name: "John Doe" });
}
