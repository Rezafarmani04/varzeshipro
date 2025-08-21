import { cookies } from "next/headers";
import { verifyToken } from "@/app/_lib/auth";
import { prisma } from "@/app/_lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token) as { userId: string } | null;
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const favorites = await prisma.favorite.findMany({
      where: { userId: decoded.userId },
      include: { product: true },
    });

    return NextResponse.json({ favorites }, { status: 200 });
  } catch (error) {
    console.error("GET /api/favorites error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const token = (await cookies()).get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decoded = verifyToken(token) as { userId: string } | null;
    if (!decoded) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const body = await req.json();
    const { productId } = body;

    if (!productId) {
      return NextResponse.json(
        { error: "آیدی محصول نیاز هست" },
        { status: 400 }
      );
    }

    const exists = await prisma.favorite.findFirst({
      where: { userId: decoded.userId, productId },
    });

    if (exists) {
      await prisma.favorite.delete({
        where: { id: exists.id },
      });
      return NextResponse.json(
        { message: "Favorite removed" },
        { status: 200 }
      );
    }

    const favorite = await prisma.favorite.create({
      data: {
        userId: decoded.userId,
        productId,
      },
    });

    return NextResponse.json({ favorite }, { status: 201 });
  } catch (error) {
    console.error("POST /api/favorites error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
