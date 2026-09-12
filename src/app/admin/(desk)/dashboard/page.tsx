"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  PageHeader,
  StatCard,
  Panel,
  StatusBadge,
  formatDate,
  btnPrimary,
  btnOutline,
  EmptyState,
} from "@/components/admin/ui";

type Stats = {
  cars: number;
  available: number;
  reserved: number;
  sold: number;
  contactTotal: number;
  contactNew: number;
  sellTradeTotal: number;
  sellTradeNew: number;
  faqs: number;
};

type RecentItem = {
  kind: string;
  id: string;
  name: string;
  message: string;
  status: string;
  created_at: string;
};

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [recent, setRecent] = useState<RecentItem[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/admin/stats", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setStats(data.stats);
        setRecent(data.recent ?? []);
      })
      .catch(() => setError("Could not reach the database. Is PostgreSQL running?"));
  }, []);

  return (
    <div>
      <PageHeader
        eyebrow="Admin Desk · Overview"
        title="The Desk."
        description="A live look at the lot and the pipeline — inventory position, open inquiries, and recent activity."
      />

      {error ? (
        <div className="mt-8 border border-red-200 bg-red-50 px-5 py-4">
          <p className="text-xs font-bold text-red-700">{error}</p>
        </div>
      ) : null}

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Units" value={stats?.cars ?? "—"} sub="In the lot" strong />
        <StatCard
          label="Available"
          value={stats?.available ?? "—"}
          sub="Ready to buy"
        />
        <StatCard label="Reserved" value={stats?.reserved ?? "—"} sub="Held for buyers" />
        <StatCard label="Sold" value={stats?.sold ?? "—"} sub="Completed deals" />
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Contact Inquiries"
          value={stats?.contactTotal ?? "—"}
          sub={`${stats?.contactNew ?? 0} new`}
        />
        <StatCard
          label="Sell / Trade"
          value={stats?.sellTradeTotal ?? "—"}
          sub={`${stats?.sellTradeNew ?? 0} new`}
        />
        <StatCard label="Open Contact" value={stats?.contactNew ?? "—"} sub="Needs reply" />
        <StatCard label="Published FAQs" value={stats?.faqs ?? "—"} sub="Live answers" />
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Panel
          eyebrow="Activity"
          title="Recent Inquiries"
          action={
            <Link href="/admin/inquiries" className={btnOutline}>
              View all
            </Link>
          }
        >
          {recent.length === 0 ? (
            <EmptyState message="No inquiries yet — new messages will appear here." />
          ) : (
            <div className="grid gap-3">
              {recent.map((item) => (
                <div
                  key={`${item.kind}-${item.id}`}
                  className="flex items-start justify-between gap-4 border border-slate-100 bg-slate-50/50 px-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      {item.kind === "contact" ? "Contact" : "Sell / Trade"}
                    </p>
                    <p className="mt-1 truncate text-sm font-black text-slate-900">{item.name}</p>
                    <p className="mt-0.5 truncate text-xs text-slate-500">{item.message}</p>
                    <p className="mt-1 text-[10px] text-slate-400">{formatDate(item.created_at)}</p>
                  </div>
                  <div className="shrink-0 pt-4">
                    <StatusBadge status={item.status} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </Panel>

        <div className="grid gap-4">
          <Panel eyebrow="Inventory" title="Quick Actions">
            <div className="grid gap-3">
              <Link href="/admin/cars?new=1" className={btnPrimary}>
                Add a vehicle
              </Link>
              <Link href="/admin/cars" className={btnOutline}>
                Manage inventory
              </Link>
            </div>
          </Panel>
          <Panel eyebrow="Site" title="Content Desk">
            <div className="grid gap-3">
              <Link href="/admin/content" className={btnOutline}>
                Edit site content
              </Link>
              <Link href="/home" className={btnOutline}>
                View live site
              </Link>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}