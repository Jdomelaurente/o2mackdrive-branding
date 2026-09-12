"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { inputClass, Label, btnPrimary } from "@/components/admin/ui";

function nextPath(raw: string | null): string | null {
  if (!raw || !raw.startsWith("/admin") || raw.includes("//")) return null;
  return raw;
}

export default function AdminLoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Login failed");
      const next = nextPath(new URLSearchParams(window.location.search).get("next"));
      router.replace(next ?? "/admin/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-[#f7f5f2]">
      {/* Desk chrome — mirrors the admin top bar */}
      <header className="border-b border-black/10 bg-black px-5 py-3 text-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <p className="text-sm font-black tracking-tight">
            O2MackDrive
            <span className="ml-2 text-[8px] font-black uppercase tracking-[0.3em] text-orange-400">
              Admin Desk
            </span>
          </p>
          <Link
            href="/home"
            className="text-[9px] font-black uppercase tracking-widest text-white/50 transition hover:text-white"
          >
            View site
          </Link>
        </div>
      </header>

      <main className="flex flex-1 items-center justify-center px-5 py-12">
        <div className="w-full max-w-sm">
          <section className="border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-200 px-7 py-6">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                Admin Desk · Sign in
              </p>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-slate-950">
                The Desk.
              </h1>
              <div className="mt-4 border-l-2 border-slate-900 pl-4">
                <p className="text-sm leading-relaxed text-slate-600">
                  Enter the desk password to manage the lot, inquiries, and site content.
                </p>
              </div>
            </div>

            <form onSubmit={submit} className="grid gap-5 p-7">
              {error ? (
                <div className="border border-red-200 bg-red-50 px-5 py-4">
                  <p className="text-xs font-bold text-red-700">{error}</p>
                </div>
              ) : null}

              <label className="grid gap-2">
                <Label>Username</Label>
                <input
                  type="text"
                  required
                  autoFocus
                  autoComplete="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={busy}
                  placeholder="Enter your username"
                  className={inputClass}
                />
              </label>

              <label className="grid gap-2">
                <Label>Password</Label>
                <input
                  type="password"
                  required
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={busy}
                  placeholder="Enter the desk password"
                  className={inputClass}
                />
              </label>

              <button type="submit" disabled={busy} className={`${btnPrimary} w-full`}>
                {busy ? "Signing in…" : "Enter the desk"}
              </button>
            </form>
          </section>

          <p className="mt-6 flex items-center justify-between px-1">
            <Link
              href="/home"
              className="text-[10px] font-black uppercase tracking-widest text-slate-500 transition hover:text-slate-950"
            >
              Back to site
            </Link>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Staff only
            </span>
          </p>
        </div>
      </main>
    </div>
  );
}