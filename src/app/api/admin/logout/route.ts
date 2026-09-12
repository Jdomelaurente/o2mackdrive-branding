import { NextResponse } from "next/server";
import { sessionCookieOptions, SESSION_COOKIE } from "@/lib/auth";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, "", {
    ...sessionCookieOptions,
    expires: new Date(0),
  });
  return response;
}