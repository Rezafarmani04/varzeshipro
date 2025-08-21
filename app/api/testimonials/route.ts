import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const testimonials = await prisma.testimonial.findMany({
      orderBy: { date: "desc" },
    });
    return NextResponse.json(testimonials);
  } catch (error) {
    console.error("خطا در دریافت نظرات:", error);
    return NextResponse.json({ error: "خطا در دریافت نظرات" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, role, avatar, comment, rating, product, verified } = body;

    if (!name || !role || !comment || !product) {
      return NextResponse.json(
        { error: "تمام فیلدهای ضروری را وارد کنید" },
        { status: 400 }
      );
    }

    const testimonial = await prisma.testimonial.create({
      data: {
        name,
        role,
        avatar,
        comment,
        rating,
        product,
        verified: verified ?? false,
        date: new Date(),
      },
    });

    return NextResponse.json(testimonial);
  } catch (error) {
    console.error("خطا در ثبت نظر:", error);
    return NextResponse.json({ error: "خطا در ثبت نظر" }, { status: 500 });
  }
}
