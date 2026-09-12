"use client";

import { useCallback, useEffect, useState } from "react";
import {
  PageHeader,
  Panel,
  StatusBadge,
  EmptyState,
  btnDanger,
  formatDateTime,
} from "@/components/admin/ui";

const TAB_CLASS =
  "px-5 py-3 text-[10px] font-black uppercase tracking-widest transition cursor-pointer";
const TAB_ACTIVE = "bg-black text-white";
const TAB_IDLE = "text-slate-500 hover:bg-slate-100";

type ContactInquiry = {
  id: number;
  name: string;
  phone: string;
  email: string | null;
  message: string;
  status: string;
  createdAt: string;
};

type SellTradeInquiry = {
  id: number;
  vehicleYear: number | null;
  vehicleMake: string | null;
  vehicleModel: string | null;
  mileage: number | null;
  targetPrice: string | null;
  notes: string | null;
  name: string;
  phone: string;
  status: string;
  createdAt: string;
};

const STATUSES = ["New", "Reviewed", "Replied", "Closed"] as const;

export default function AdminInquiriesPage() {
  const [tab, setTab] = useState<"contact" | "sell-trade">("contact");
  const [contact, setContact] = useState<ContactInquiry[] | null>(null);
  const [sellTrade, setSellTrade] = useState<SellTradeInquiry[] | null>(null);
  const [error, setError] = useState("");

  const load = useCallback(async (which: "contact" | "sell-trade") => {
    const res = await fetch(`/api/admin/inquiries/${which}`, { cache: "no-store" });
    const data = await res.json();
    if (data.error) throw new Error(data.error);
    if (which === "contact") setContact(data.inquiries);
    else setSellTrade(data.inquiries);
  }, []);

  useEffect(() => {
    Promise.all([
      fetch("/api/admin/inquiries/contact", { cache: "no-store" }),
      fetch("/api/admin/inquiries/sell-trade", { cache: "no-store" }),
    ])
      .then(([contactRes, sellTradeRes]) =>
        Promise.all([contactRes.json(), sellTradeRes.json()]),
      )
      .then(([contactData, sellTradeData]) => {
        if (contactData.error) throw new Error(contactData.error);
        if (sellTradeData.error) throw new Error(sellTradeData.error);
        setContact(contactData.inquiries);
        setSellTrade(sellTradeData.inquiries);
      })
      .catch(() => setError("Failed to load inquiries."));
  }, []);

  const updateStatus = async (
    kind: "contact" | "sell-trade",
    id: number,
    status: string,
  ) => {
    await fetch(`/api/admin/inquiries/${kind}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    await load(kind);
  };

  const remove = async (kind: "contact" | "sell-trade", id: number) => {
    if (!window.confirm("Delete this inquiry permanently?")) return;
    await fetch(`/api/admin/inquiries/${kind}/${id}`, { method: "DELETE" });
    await load(kind);
  };

  return (
    <div>
      <PageHeader
        eyebrow="Admin Desk · Inquiries"
        title="The Inbox."
        description="Every contact and sell/trade submission from the site, tracked through review, reply, and close."
      />

      {error ? (
        <div className="mt-6 border border-red-200 bg-red-50 px-5 py-4">
          <p className="text-xs font-bold text-red-700">{error}</p>
        </div>
      ) : null}

      <div className="mt-8 flex border-b border-slate-200">
        {(["contact", "sell-trade"] as const).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`${TAB_CLASS} ${tab === key ? TAB_ACTIVE : TAB_IDLE}`}
          >
            {key === "contact" ? "Contact" : "Sell / Trade"}
            <span className="ml-2 opacity-60">
              {(key === "contact" ? contact : sellTrade)?.length ?? "…"}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-6 grid gap-4">
        {tab === "contact" ? (
          contact === null ? (
            <EmptyState message="Loading contact inquiries…" />
          ) : contact.length === 0 ? (
            <EmptyState message="No contact inquiries yet." />
          ) : (
            contact.map((item) => (
              <InquiryCard
                key={item.id}
                title={item.name}
                meta={[
                  item.phone,
                  item.email ?? "no email",
                  formatDateTime(item.createdAt),
                ]}
                status={item.status}
                body={item.message}
                onStatus={(status) => updateStatus("contact", item.id, status)}
                onDelete={() => remove("contact", item.id)}
              />
            ))
          )
        ) : sellTrade === null ? (
          <EmptyState message="Loading sell/trade inquiries…" />
        ) : sellTrade.length === 0 ? (
          <EmptyState message="No sell/trade submissions yet." />
        ) : (
          sellTrade.map((item) => {
            const vehicle = [
              item.vehicleYear,
              item.vehicleMake,
              item.vehicleModel,
            ]
              .filter(Boolean)
              .join(" ");
            return (
              <InquiryCard
                key={item.id}
                title={item.name}
                meta={[
                  vehicle || "Vehicle details pending",
                  item.targetPrice ?? "No target price",
                  formatDateTime(item.createdAt),
                ]}
                status={item.status}
                body={
                  [
                    item.mileage ? `${item.mileage.toLocaleString("en-PH")} km` : null,
                    item.notes ?? null,
                  ]
                    .filter(Boolean)
                    .join(" · ") || "No additional notes."
                }
                onStatus={(status) => updateStatus("sell-trade", item.id, status)}
                onDelete={() => remove("sell-trade", item.id)}
              />
            );
          })
        )}
      </div>
    </div>
  );
}

function InquiryCard({
  title,
  meta,
  status,
  body,
  onStatus,
  onDelete,
}: {
  title: string;
  meta: string[];
  status: string;
  body: string;
  onStatus: (status: string) => void;
  onDelete: () => void;
}) {
  return (
    <Panel className="overflow-hidden">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={status} />
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              {meta.join(" · ")}
            </span>
          </div>
          <h3 className="mt-2 text-sm font-black uppercase tracking-tight text-slate-950">
            {title}
          </h3>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <select
            value={status}
            onChange={(e) => onStatus(e.target.value)}
            className="border border-slate-200 bg-slate-50 px-3 py-2 text-[10px] font-black uppercase tracking-widest text-slate-800 outline-none transition focus:border-slate-400 focus:bg-white cursor-pointer"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <button type="button" onClick={onDelete} className={btnDanger}>
            Delete
          </button>
        </div>
      </div>
      <p className="mt-3 border-t border-slate-100 pt-3 text-xs leading-relaxed text-slate-600">
        {body}
      </p>
    </Panel>
  );
}