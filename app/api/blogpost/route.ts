import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const products = await prisma.blogPost.findMany();
    return NextResponse.json(products);
  } catch (error) {
    console.error("خطا در دریافت مقالات:", error);
    return NextResponse.json(
      { error: "خطا در دریافت مقالات" },
      { status: 500 }
    );
  }
}
