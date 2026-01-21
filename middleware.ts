import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const userData = req.cookies.get("userData")?.value;
  const { pathname } = req.nextUrl;

  if (userData && (pathname === "/login" || pathname === "/register")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!userData && pathname === "/profile") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/register", "/:path*"],
};
