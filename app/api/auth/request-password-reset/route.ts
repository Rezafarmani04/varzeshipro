import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import {
  addMinutes,
  generateRawToken,
  hashToken,
} from "../../../_lib/security";
import { sendPasswordResetEmail } from "@/app/_lib/mail";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json(
        { message: "ایمیل الزامی است" },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({ where: { email } });

    if (user) {
      await prisma.passwordResetToken.deleteMany({
        where: { userId: user.id, used: false },
      });

      const rawToken = generateRawToken();
      const tokenHash = await hashToken(rawToken);

      const expiresAt = addMinutes(new Date(), 15);

      await prisma.passwordResetToken.create({
        data: {
          tokenHash,
          userId: user.id,
          expiresAt,
        },
      });

      const baseUrl = process.env.NEXT_PUBLIC_APP_URL!;
      const link = `${baseUrl}/reset-password/${rawToken}`;
      await sendPasswordResetEmail(email, link);
    }

    return NextResponse.json({
      ok: true,
      message: "اگر ایمیل معتبر باشد، لینک بازیابی ارسال شد.",
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
