"use client";

import { useEffect, useState } from "react";
import {
  PageHeader,
  Panel,
  Field,
  inputClass,
  btnPrimary,
  btnOutline,
  btnDanger,
  EmptyState,
} from "@/components/admin/ui";

type SiteSettings = {
  businessName: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  location: string;
  messengerLink: string;
  facebookLink: string;
  primaryCtaLabel: string;
};

const EMPTY_SETTINGS: SiteSettings = {
  businessName: "",
  tagline: "",
  description: "",
  phone: "",
  email: "",
  location: "",
  messengerLink: "",
  facebookLink: "",
  primaryCtaLabel: "",
};

type Faq = {
  id: number;
  question: string;
  answer: string;
  sortOrder: number;
};

export default function AdminContentPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Admin Desk · Content"
        title="The Content Desk."
        description="Company identity, financing guidance, and the public FAQ. Changes save directly to the database."
      />
      <div className="mt-8 grid gap-8">
        <SettingsPanel />
        <FinancingPanel />
        <FaqPanel />
      </div>
    </div>
  );
}

function SaveNotice({ text }: { text: string }) {
  if (!text) return null;
  return (
    <div className="border border-slate-900 bg-slate-950 px-4 py-3">
      <p className="text-[10px] font-black uppercase tracking-widest text-white">{text}</p>
    </div>
  );
}

function SettingsPanel() {
  const [form, setForm] = useState<SiteSettings>(EMPTY_SETTINGS);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    fetch("/api/admin/content/settings", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) setForm({ ...EMPTY_SETTINGS, ...data.settings });
      })
      .finally(() => setLoading(false));
  }, []);

  const set = <K extends keyof SiteSettings>(key: K, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/content/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    setSaving(false);
    setNotice(data.error ? data.error : "Site settings saved.");
  };

  return (
    <Panel eyebrow="Company" title="Site Identity">
      {loading ? (
        <EmptyState message="Loading site settings…" />
      ) : (
        <form onSubmit={save} className="grid gap-5">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Field label="Business Name">
              <input value={form.businessName} onChange={(e) => set("businessName", e.target.value)} className={inputClass} />
            </Field>
            <Field label="Tagline">
              <input value={form.tagline} onChange={(e) => set("tagline", e.target.value)} className={inputClass} />
            </Field>
            <Field label="Primary CTA Label">
              <input value={form.primaryCtaLabel} onChange={(e) => set("primaryCtaLabel", e.target.value)} className={inputClass} />
            </Field>
            <Field label="Phone">
              <input value={form.phone} onChange={(e) => set("phone", e.target.value)} className={inputClass} />
            </Field>
            <Field label="Email">
              <input value={form.email} onChange={(e) => set("email", e.target.value)} className={inputClass} />
            </Field>
            <Field label="Location">
              <input value={form.location} onChange={(e) => set("location", e.target.value)} className={inputClass} />
            </Field>
            <Field label="Messenger Link">
              <input value={form.messengerLink} onChange={(e) => set("messengerLink", e.target.value)} className={inputClass} />
            </Field>
            <Field label="Facebook Link">
              <input value={form.facebookLink} onChange={(e) => set("facebookLink", e.target.value)} className={inputClass} />
            </Field>
          </div>
          <Field label="Description" hint="Shown across metadata and public pages">
            <textarea value={form.description} onChange={(e) => set("description", e.target.value)} rows={3} className={`${inputClass} resize-none`} />
          </Field>
          <div className="flex flex-wrap items-center gap-4 border-t border-slate-100 pt-5">
            <button type="submit" disabled={saving} className={btnPrimary}>
              {saving ? "Saving…" : "Save settings"}
            </button>
            <SaveNotice text={notice} />
          </div>
        </form>
      )}
    </Panel>
  );
}

function FinancingPanel() {
  const [explanation, setExplanation] = useState("");
  const [disclaimer, setDisclaimer] = useState("");
  const [requirements, setRequirements] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");

  useEffect(() => {
    fetch("/api/admin/content/financing", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data.financing) {
          setExplanation(data.financing.explanation ?? "");
          setDisclaimer(data.financing.disclaimer ?? "");
          setRequirements((data.financing.requirements ?? []).join("\n"));
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const res = await fetch("/api/admin/content/financing", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        explanation,
        disclaimer,
        requirements: requirements
          .split("\n")
          .map((r) => r.trim())
          .filter(Boolean),
      }),
    });
    const data = await res.json();
    setSaving(false);
    setNotice(data.error ? data.error : "Financing content saved.");
  };

  return (
    <Panel eyebrow="Services" title="Financing Guidance">
      {loading ? (
        <EmptyState message="Loading financing content…" />
      ) : (
        <form onSubmit={save} className="grid gap-5">
          <Field label="Explanation">
            <textarea value={explanation} onChange={(e) => setExplanation(e.target.value)} rows={3} className={`${inputClass} resize-none`} />
          </Field>
          <Field label="Disclaimer">
            <textarea value={disclaimer} onChange={(e) => setDisclaimer(e.target.value)} rows={2} className={`${inputClass} resize-none`} />
          </Field>
          <Field label="Requirements" hint="One requirement per line">
            <textarea value={requirements} onChange={(e) => setRequirements(e.target.value)} rows={6} className={`${inputClass} resize-none`} />
          </Field>
          <div className="flex flex-wrap items-center gap-4 border-t border-slate-100 pt-5">
            <button type="submit" disabled={saving} className={btnPrimary}>
              {saving ? "Saving…" : "Save financing"}
            </button>
            <SaveNotice text={notice} />
          </div>
        </form>
      )}
    </Panel>
  );
}

function FaqPanel() {
  const [faqs, setFaqs] = useState<Faq[] | null>(null);
  const [notice, setNotice] = useState("");
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  const load = async () => {
    const res = await fetch("/api/admin/content/faqs", { cache: "no-store" });
    const data = await res.json();
    if (!data.error) setFaqs(data.faqs);
  };

  useEffect(() => {
    fetch("/api/admin/content/faqs", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) setFaqs(data.faqs);
      })
      .catch(() => setFaqs([]));
  }, []);

  const addFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim() || !newAnswer.trim()) return;
    const res = await fetch("/api/admin/content/faqs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        question: newQuestion.trim(),
        answer: newAnswer.trim(),
        sortOrder: faqs?.length ?? 0,
      }),
    });
    const data = await res.json();
    if (data.error) {
      setNotice(data.error);
    } else {
      setNewQuestion("");
      setNewAnswer("");
      setNotice("FAQ published.");
      await load();
    }
  };

  const updateFaq = async (faq: Faq) => {
    const res = await fetch(`/api/admin/content/faqs/${faq.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(faq),
    });
    const data = await res.json();
    setNotice(data.error ? data.error : "FAQ updated.");
    await load();
  };

  const deleteFaq = async (id: number) => {
    if (!window.confirm("Delete this FAQ?")) return;
    await fetch(`/api/admin/content/faqs/${id}`, { method: "DELETE" });
    setNotice("FAQ removed.");
    await load();
  };

  return (
    <Panel eyebrow="Support" title="Frequently Asked Questions">
      <div className="grid gap-5">
        <form onSubmit={addFaq} className="grid gap-3 border border-dashed border-slate-200 bg-slate-50/60 p-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            New FAQ
          </p>
          <Field label="Question">
            <input value={newQuestion} onChange={(e) => setNewQuestion(e.target.value)} className={inputClass} placeholder="Ask a common question…" />
          </Field>
          <Field label="Answer">
            <textarea value={newAnswer} onChange={(e) => setNewAnswer(e.target.value)} rows={2} className={`${inputClass} resize-none`} placeholder="Direct answer…" />
          </Field>
          <div className="flex flex-wrap items-center gap-4">
            <button type="submit" className={btnPrimary}>
              Publish FAQ
            </button>
            <SaveNotice text={notice} />
          </div>
        </form>

        {faqs === null ? (
          <EmptyState message="Loading FAQs…" />
        ) : faqs.length === 0 ? (
          <EmptyState message="No FAQs published yet." />
        ) : (
          <div className="grid gap-4">
            {faqs.map((faq, index) => (
              <FaqRow
                key={faq.id}
                faq={faq}
                position={index}
                onChange={(next) => setFaqs((prev) => prev?.map((f) => (f.id === faq.id ? next : f)) ?? prev)}
                onSave={() => updateFaq(faqs.find((f) => f.id === faq.id)!)}
                onDelete={() => deleteFaq(faq.id)}
              />
            ))}
          </div>
        )}
      </div>
    </Panel>
  );
}

function FaqRow({
  faq,
  position,
  onChange,
  onSave,
  onDelete,
}: {
  faq: Faq;
  position: number;
  onChange: (next: Faq) => void;
  onSave: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="grid gap-3 border border-slate-100 bg-slate-50/50 p-4">
      <div className="flex flex-wrap items-center gap-3">
        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-[10px] font-black text-white">
          {position + 1}
        </span>
        <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider text-slate-400">
          Order
          <input
            type="number"
            value={faq.sortOrder}
            onChange={(e) => onChange({ ...faq, sortOrder: Number(e.target.value) })}
            className="w-20 border border-slate-200 bg-white px-2 py-1.5 text-xs font-semibold text-slate-800 outline-none focus:border-slate-400"
          />
        </label>
        <div className="ml-auto flex gap-2">
          <button type="button" onClick={onSave} className={btnOutline}>
            Save
          </button>
          <button type="button" onClick={onDelete} className={btnDanger}>
            Delete
          </button>
        </div>
      </div>
      <Field label="Question">
        <input value={faq.question} onChange={(e) => onChange({ ...faq, question: e.target.value })} className={inputClass} />
      </Field>
      <Field label="Answer">
        <textarea value={faq.answer} onChange={(e) => onChange({ ...faq, answer: e.target.value })} rows={3} className={`${inputClass} resize-none`} />
      </Field>
    </div>
  );
}