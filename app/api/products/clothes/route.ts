import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const shoes = await prisma.product.findMany({
      where: {
        category: {
          equals: "clothes",
          mode: "insensitive",
        },
      },
    });

    return NextResponse.json(shoes);
  } catch (error) {
    console.error("خطا در دریافت لباس ها:", error);
    return NextResponse.json(
      { error: "خطا در دریافت لباس ها" },
      { status: 500 }
    );
  }
}
