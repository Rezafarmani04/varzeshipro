import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/app/_lib/prisma";
import { signToken } from "@/app/_lib/auth";
import { createAuthCookie } from "@/app/_lib/cookies";

export async function POST(req: Request) {
  const { email, code } = await req.json();

  const pending = globalThis.pendingUsers?.get(email);
  if (!pending) {
    return NextResponse.json(
      { message: "درخواست تأیید نامعتبر است." },
      { status: 400 }
    );
  }

  if (pending.code !== code || Date.now() > pending.expiresAt) {
    return NextResponse.json(
      { message: "کد اشتباه یا منقضی شده است." },
      { status: 400 }
    );
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json(
      { message: "این ایمیل قبلاً ثبت شده است." },
      { status: 409 }
    );
  }

  const hashedPassword = await bcrypt.hash(pending.password, 10);

  const user = await prisma.user.create({
    data: {
      name: pending.name,
      email: pending.email,
      password: hashedPassword,
      verified: true,
    },
  });

  globalThis.pendingUsers.delete(email);

  const token = signToken({ userId: user.id });
  const cookie = createAuthCookie(token);

  return NextResponse.json(
    { message: "ثبت‌نام با موفقیت انجام شد." },
    { status: 200, headers: { "Set-Cookie": cookie } }
  );
}
