import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const products = await prisma.brand.findMany();
    return NextResponse.json(products);
  } catch (error) {
    console.error("خطا در دریافت :", error);
    return NextResponse.json(
      { error: "خطا در دریافت " },
      { status: 500 }
    );
  }
}