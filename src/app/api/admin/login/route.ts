import { NextResponse } from "next/server";
import { safeEqual, sessionCookieOptions, SESSION_COOKIE, signSession } from "@/lib/auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const password = typeof body.password === "string" ? body.password : "";
  const expected = process.env.ADMIN_PASSWORD ?? "";

  if (!expected || !password || !safeEqual(password, expected)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, signSession(), sessionCookieOptions);
  return response;
}