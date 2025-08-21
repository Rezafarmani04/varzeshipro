import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
  try {
    const token = (await cookies()).get("token")?.value;

    if (!token) {
      return NextResponse.json({ isLoggedIn: false });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);
      return NextResponse.json({ isLoggedIn: true, user: decoded });
    } catch (err) {
      return NextResponse.json({ isLoggedIn: false });
    }
  } catch (error) {
    console.error("Auth check error:", error);
    return NextResponse.json(
      { isLoggedIn: false, error: "Server error" },
      { status: 500 }
    );
  }
}
