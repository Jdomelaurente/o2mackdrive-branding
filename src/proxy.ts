import { NextResponse, type NextRequest } from "next/server";
import { SESSION_COOKIE, verifySession } from "@/lib/auth";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLoginApi = pathname === "/api/admin/login";
  const isLoginPage = pathname === "/admin/login";
  const isApi = pathname.startsWith("/api/admin");
  const loggedIn = verifySession(request.cookies.get(SESSION_COOKIE)?.value);

  if (isLoginPage || isLoginApi) {
    if (isLoginPage && loggedIn) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url));
    }
    return NextResponse.next();
  }

  if (!loggedIn) {
    if (isApi) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const login = new URL("/admin/login", request.url);
    if (pathname !== "/admin") login.searchParams.set("next", pathname);
    return NextResponse.redirect(login);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};