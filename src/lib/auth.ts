import { createHmac, randomBytes, timingSafeEqual } from "crypto";

export const SESSION_COOKIE = "o2mack_admin_session";
const SESSION_TTL_MS = 7 * 24 * 60 * 60 * 1000;

function secret(): string {
  return process.env.ADMIN_PASSWORD ?? "";
}

function hmac(data: string): string {
  return createHmac("sha256", secret()).update(data).digest("hex");
}

export function safeEqual(a: string, b: string): boolean {
  const ba = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ba.length !== bb.length) return false;
  return timingSafeEqual(ba, bb);
}

export function signSession(): string {
  const exp = Date.now() + SESSION_TTL_MS;
  const payload = `v1.${exp}.${randomBytes(16).toString("hex")}`;
  return `${payload}.${hmac(payload)}`;
}

export function verifySession(token: string | undefined | null): boolean {
  if (!token || !secret()) return false;
  const parts = token.split(".");
  if (parts.length !== 4) return false;
  const exp = Number(parts[1]);
  if (!Number.isFinite(exp) || exp < Date.now()) return false;
  const payload = parts.slice(0, 3).join(".");
  return safeEqual(parts[3], hmac(payload));
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
};