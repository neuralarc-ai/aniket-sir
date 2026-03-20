import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Allow login page without auth
  if (pathname === "/login") {
    return NextResponse.next();
  }

  // Check for auth cookie
  const authToken = request.cookies.get("auth_token");

  // If no auth token and not on login page, redirect to login
  if (!authToken && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
