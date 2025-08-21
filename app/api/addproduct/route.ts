import { cookies } from "next/headers";
import { verifyToken } from "@/app/_lib/auth";
import { prisma } from "@/app/_lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token) as { userId: string } | null;
    if (!decoded) {
      return NextResponse.json({ error: "توکن نا معتبر" }, { status: 401 });
    }

    const body = await req.json();
    const { productId, quantity, size, color } = body;

    if (!productId) {
      return NextResponse.json(
        { error: "آیدی محصول لازم هست" },
        { status: 400 }
      );
    }

    const existingItem = await prisma.cartItem.findFirst({
      where: {
        userId: decoded.userId,
        productId,
        size,
        color,
      },
    });

    let cartItem;
    if (existingItem) {
      cartItem = await prisma.cartItem.update({
        where: { id: existingItem.id },
        data: { quantity: existingItem.quantity + (quantity || 1) },
      });
    } else {
      cartItem = await prisma.cartItem.create({
        data: {
          userId: decoded.userId,
          productId,
          quantity: quantity || 1,
          size,
          color,
        },
      });
    }

    return NextResponse.json({ cartItem }, { status: 201 });
  } catch (error) {
    console.error("POST /api/cart/add error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
