import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  //Middleware bảo vệ router
  const sessionToken = req.cookies.get("sessionToken")?.value;
  const role = req.cookies.get("userRole")?.value;
  const { pathname } = req.nextUrl;
  if (
    sessionToken &&
    (pathname === "/auth/login" || pathname === "/auth/register")
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!sessionToken && pathname === "/profile") {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }
  if (role === "HV" && pathname.startsWith("/admin")) {
    return NextResponse.rewrite(new URL("/not-found", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/auth/login", "/auth/register", "/profile", "/admin/:path*"],
};
