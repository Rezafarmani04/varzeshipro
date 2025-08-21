import { NextResponse } from "next/server";
import { sendVerificationEmail } from "@/app/_lib/mail";

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 5 * 60 * 1000;

  globalThis.pendingUsers = globalThis.pendingUsers || new Map();
  globalThis.pendingUsers.set(email, {
    name,
    email,
    password,
    code,
    expiresAt,
  });

  try {
    await sendVerificationEmail(email, code);
    return NextResponse.json(
      { message: "کد تأیید ارسال شد.", email },
      { status: 200 }
    );
  } catch (err) {
    console.error("خطا در ارسال ایمیل:", err);
    return NextResponse.json(
      { message: "ارسال ایمیل ناموفق بود." },
      { status: 500 }
    );
  }
}
