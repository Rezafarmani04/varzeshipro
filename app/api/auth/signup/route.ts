import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/app/_lib/prisma";
import { sendVerificationEmail } from "@/app/_lib/mail";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "همه‌ی فیلدها الزامی هستند." },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json(
        { message: "ایمیل قبلاً ثبت شده است." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await prisma.oTP.create({
      data: {
        code,
        user: {
          create: {
            name,
            email,
            password: hashedPassword,
            verified: false,
          },
        },
        expiresAt,
      },
    });

    await sendVerificationEmail(email, code);

    return NextResponse.json(
      {
        message: "کد تایید به ایمیل ارسال شد.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("⛔ ثبت‌نام با خطا مواجه شد:", error);
    return NextResponse.json(
      { message: "خطا در ثبت‌نام. لطفاً دوباره تلاش کنید." },
      { status: 500 }
    );
  }
}
