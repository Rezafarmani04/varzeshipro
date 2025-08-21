import { cookies } from "next/headers";
import { verifyToken } from "@/app/_lib/auth";
import { prisma } from "@/app/_lib/prisma";

export async function DELETE(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
      });
    }

    const decoded = verifyToken(token) as { userId: string } | null;
    if (!decoded) {
      return new Response(JSON.stringify({ error: "Invalid token" }), {
        status: 401,
      });
    }

    await prisma.favorite.deleteMany({
      where: {
        userId: decoded.userId,
        productId: Number(params.productId),
      },
    });

    return new Response(JSON.stringify({ message: "حذف شد" }), { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: "Server error" }), {
      status: 500,
    });
  }
}
