import { cookies } from "next/headers";
import { prisma } from "@/app/_lib/prisma";
import { verifyToken } from "@/app/_lib/auth";
import { NextResponse } from "next/server";

async function getUserId() {
  const token = (await cookies()).get("token")?.value;
  if (!token) return null;
  const decoded = verifyToken(token) as { userId: string } | null;
  return decoded?.userId ?? null;
}

export async function GET() {
  const userId = await getUserId();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const cartItems = await prisma.cartItem.findMany({
    where: { userId },
    include: { product: true },
  });

  return NextResponse.json({ cartItems });
}

export async function DELETE(req: Request) {
  const userId = await getUserId();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (id) {
    await prisma.cartItem.deleteMany({ where: { id: Number(id), userId } });
    return NextResponse.json({ message: "آیتم حذف شد" });
  } else {
    await prisma.cartItem.deleteMany({ where: { userId } });
    return NextResponse.json({ message: "سبد خرید خالی شد" });
  }
}

export async function PATCH(req: Request) {
  const userId = await getUserId();
  if (!userId)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { itemId, quantity } = await req.json();
  if (!itemId || quantity < 1)
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });

  const updatedItem = await prisma.cartItem.update({
    where: { id: Number(itemId), userId },
    data: { quantity },
    include: { product: true },
  });

  return NextResponse.json({ cartItem: updatedItem });
}
