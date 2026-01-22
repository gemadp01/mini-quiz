import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  if (pathname === "/" && token) {
    return NextResponse.redirect(new URL("/user/dashboard", request.url));
  }

  if (pathname === "/" && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/user") && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname === "/user" || pathname === "/user/quiz") {
    return NextResponse.redirect(new URL("/user/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
