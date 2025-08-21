import { cookies } from "next/headers";
import { verifyToken } from "@/app/_lib/auth";
import { prisma } from "@/app/_lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = verifyToken(token) as { userId: string } | null;
    if (!decoded)
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    const cartItems = await prisma.cartItem.findMany({
      where: { userId: decoded.userId },
      include: { product: true },
    });

    return NextResponse.json({ cartItems });
  } catch (error) {
    console.error("GET /api/cart error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = verifyToken(token) as { userId: string } | null;
    if (!decoded)
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const itemId = searchParams.get("id");

    if (itemId) {
      await prisma.cartItem.deleteMany({
        where: {
          id: Number(itemId),
          userId: decoded.userId,
        },
      });
      return NextResponse.json({ message: "آیتم از سبد خرید حذف شد" });
    } else {
      await prisma.cartItem.deleteMany({
        where: { userId: decoded.userId },
      });
      return NextResponse.json({ message: "سبد خرید خالی شد" });
    }
  } catch (error) {
    console.error("DELETE /api/cart error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
export async function PATCH(req: Request) {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const decoded = verifyToken(token) as { userId: string } | null;
    if (!decoded)
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });

    const { itemId, quantity } = await req.json();

    if (!itemId || quantity < 1) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const updatedItem = await prisma.cartItem.update({
      where: {
        id: Number(itemId),
        userId: decoded.userId,
      },
      data: {
        quantity,
      },
      include: { product: true },
    });

    return NextResponse.json({ cartItem: updatedItem });
  } catch (error) {
    console.error("PATCH /api/cart error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
