import { NextResponse } from "next/server";
import { prisma } from "@/app/_lib/prisma";
import bcrypt from "bcrypt";
import { signToken } from "@/app/_lib/auth";
import { createAuthCookie } from "@/app/_lib/cookies";

export async function POST(req: Request) {
  const { email, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json(
      { message: "ایمیل یا رمز اشتباه" },
      { status: 401 }
    );
  }

  const token = signToken({ userId: user.id });
  const cookie = createAuthCookie(token);

  return NextResponse.json(
    { message: "ورود موفق", userId: user.id },
    {
      status: 200,
      headers: { "Set-Cookie": cookie },
    }
  );
}
