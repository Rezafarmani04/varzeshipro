import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifyToken } from "./_lib/auth";

export function middleware(req: NextRequest) {
  const protectedPaths = ["/cart", "/favorites"];
  const { pathname } = req.nextUrl;

  const isProductDetail = /^\/product\/\d+$/.test(pathname);

  const isProtected =
    protectedPaths.some((path) => pathname.startsWith(path)) || isProductDetail;

  if (isProtected) {
    const token = req.cookies.get("token")?.value;
    if (!token || !verifyToken(token)) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/cart/:path*", "/favorites/:path*", "/product/:path*"],
};
