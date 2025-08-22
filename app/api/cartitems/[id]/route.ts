import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/app/_lib/prisma";

export async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === "DELETE") {
    try {
      await prisma.cartItem.delete({
        where: { id: Number(id) },
      });
      return res.status(200).json({ message: "آیتم از سبد خرید حذف شد" });
    } catch (error) {
      return res.status(500).json({ message: "خطا در حذف آیتم" });
    }
  }

  res.setHeader("Allow", ["DELETE"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
