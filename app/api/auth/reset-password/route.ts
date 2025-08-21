import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { compareToken } from "@/app/_lib/security";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { token, password } = await req.json();
    if (!token || !password) {
      return NextResponse.json(
        { message: "اطلاعات ناقص است" },
        { status: 400 }
      );
    }

    const candidates = await prisma.passwordResetToken.findMany({
      where: {
        used: false,
        expiresAt: { gt: new Date() },
      },
      include: { user: true },
    });

    let matched: (typeof candidates)[number] | null = null;
    for (const c of candidates) {
      const ok = await compareToken(token, c.tokenHash);
      if (ok) {
        matched = c;
        break;
      }
    }

    if (!matched) {
      return NextResponse.json(
        { message: "توکن نامعتبر یا منقضی‌شده" },
        { status: 400 }
      );
    }

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    await prisma.$transaction([
      prisma.user.update({
        where: { id: matched.userId },
        data: { password: hashed },
      }),
      prisma.passwordResetToken.update({
        where: { id: matched.id },
        data: { used: true },
      }),
      prisma.passwordResetToken.updateMany({
        where: { userId: matched.userId, used: false },
        data: { used: true },
      }),
    ]);

    return NextResponse.json({
      ok: true,
      message: "رمز عبور با موفقیت تغییر کرد",
    });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
