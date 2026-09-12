import { NextResponse } from "next/server";
import { safeEqual, sessionCookieOptions, SESSION_COOKIE, signSession } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const username = typeof body.username === "string" ? body.username : "";
  const password = typeof body.password === "string" ? body.password : "";
  const expectedUsername = process.env.ADMIN_USERNAME ?? "";
  const expectedPassword = process.env.ADMIN_PASSWORD ?? "";

  if (
    !expectedUsername ||
    !expectedPassword ||
    !safeEqual(username, expectedUsername) ||
    !safeEqual(password, expectedPassword)
  ) {
    return NextResponse.json({ error: "Invalid username or password" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, signSession(), sessionCookieOptions);
  return response;
}