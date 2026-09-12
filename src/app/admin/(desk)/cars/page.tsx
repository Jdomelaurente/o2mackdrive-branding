"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import type { Car, CarStatus, Transmission, FuelType } from "@/types/car";
import {
  PageHeader,
  Panel,
  Field,
  inputClass,
  selectClass,
  btnPrimary,
  btnOutline,
  btnDanger,
  StatusBadge,
  EmptyState,
  formatDate,
  formatPrice,
} from "@/components/admin/ui";

type FormState = Partial<Car>;

const EMPTY_FORM: FormState = {
  brand: "",
  model: "",
  variant: "",
  year: new Date().getFullYear(),
  price: 0,
  mileage: 0,
  transmission: "Automatic",
  fuelType: "Gasoline",
  bodyType: "SUV",
  color: "",
  status: "Available",
  location: "Metro Manila",
  images: [],
  featured: false,
  spotlight: false,
  highlightLabel: "",
  description: "",
  features: [],
  dateAdded: new Date().toISOString().slice(0, 10),
};

export default function AdminCarsPage() {
  const searchParams = useSearchParams();
  const autoNew = searchParams.get("new") === "1";

  const [cars, setCars] = useState<Car[] | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [editorOpen, setEditorOpen] = useState(autoNew);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/cars", { cache: "no-store" });
    const data = await res.json();
    if (data.error) {
      setError(data.error);
      return;
    }
    setCars(data.cars);
  }, []);

  useEffect(() => {
    fetch("/api/admin/cars", { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else setCars(data.cars);
      })
      .catch(() => setError("Failed to load vehicles."));
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setEditorOpen(true);
    setNotice("");
  };

  const openEdit = (car: Car) => {
    setEditingId(car.id);
    setEditorOpen(true);
    setNotice("");
  };

  const closeEditor = async () => {
    setEditorOpen(false);
    setEditingId(null);
    await load();
  };

  return (
    <div>
      <PageHeader
        eyebrow="Admin Desk · Inventory"
        title="The Lot."
        description="Add, edit, and move units through the lot. Every change here is written straight to the PostgreSQL store."
      />

      {notice ? (
        <div className="mt-6 flex items-center justify-between gap-4 border border-slate-900 bg-slate-950 px-5 py-3.5">
          <p className="text-[11px] font-bold uppercase tracking-widest text-white">{notice}</p>
          <button
            type="button"
            onClick={() => setNotice("")}
            className="text-[10px] font-black uppercase tracking-widest text-white/50 transition hover:text-white cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      ) : null}

      {error ? (
        <div className="mt-6 border border-red-200 bg-red-50 px-5 py-4">
          <p className="text-xs font-bold text-red-700">{error}</p>
        </div>
      ) : null}

      {editorOpen ? (
        <div className="mt-8">
          <div className="mb-5 flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                {editingId ? "Editing unit" : "New listing"}
              </p>
              <h2 className="mt-1 text-xl font-black tracking-tight text-slate-950">
                {editingId ? "Edit Vehicle" : "Add Vehicle"}
              </h2>
            </div>
            <button type="button" onClick={closeEditor} className={btnOutline}>
              Close
            </button>
          </div>

          <CarForm
            key={editingId ?? "new"}
            car={cars?.find((c) => c.id === editingId)}
            onSaved={() => {
              setNotice(editingId ? "Vehicle updated in the lot." : "Vehicle added to the lot.");
              closeEditor();
            }}
            onCancel={closeEditor}
            saving={saving}
            setSaving={setSaving}
          />
        </div>
      ) : (
        <div className="mt-8 grid gap-4">
          <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              {cars ? `${cars.length} units in stock` : "Loading lot…"}
            </p>
            <button type="button" onClick={openCreate} className={btnPrimary}>
              Add vehicle
            </button>
          </div>

          {cars === null ? (
            <EmptyState message="Loading vehicles…" />
          ) : cars.length === 0 ? (
            <EmptyState message="The lot is empty. Add your first vehicle." />
          ) : (
            <div className="grid gap-3">
              {cars.map((car) => (
                <article
                  key={car.id}
                  className="grid gap-4 border border-slate-200 bg-white p-4 shadow-sm sm:grid-cols-[7rem_1fr_auto] sm:items-center"
                >
                  <div className="relative hidden aspect-[16/10] overflow-hidden bg-slate-100 sm:block">
                    <Image
                      src={car.images[0]}
                      alt={car.model}
                      fill
                      sizes="112px"
                      className="object-cover"
                    />
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[9px] font-black uppercase tracking-wider text-slate-400">
                        #{car.id}
                      </span>
                      {car.featured ? (
                        <span className="inline-block bg-orange-500 px-2 py-0.5 text-[8px] font-black uppercase tracking-wider text-white">
                          Featured
                        </span>
                      ) : null}
                      <StatusBadge status={car.status} />
                    </div>
                    <h3 className="mt-1.5 text-base font-black uppercase tracking-tight text-slate-950">
                      {car.year} {car.brand} {car.model}
                      {car.variant ? ` ${car.variant}` : ""}
                    </h3>
                    <p className="mt-0.5 truncate text-xs text-slate-500">
                      {car.bodyType} · {car.transmission} · {car.fuelType} ·{" "}
                      {car.mileage.toLocaleString("en-PH")} km · {car.location}
                    </p>
                    <p className="mt-1 text-sm font-black text-slate-900">
                      {formatPrice(car.price)}
                      <span className="ml-2 text-[10px] font-bold text-slate-400">
                        Listed {formatDate(car.dateAdded)}
                      </span>
                    </p>
                  </div>

                  <div className="flex gap-2 sm:flex-col sm:items-end">
                    <button
                      type="button"
                      onClick={() => openEdit(car)}
                      className={btnOutline}
                    >
                      Edit
                    </button>
                    <DeleteCarButton id={car.id} onDeleted={load} />
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function DeleteCarButton({ id, onDeleted }: { id: string; onDeleted: () => void }) {
  const [asking, setAsking] = useState(false);
  const [busy, setBusy] = useState(false);

  const doDelete = async () => {
    setBusy(true);
    await fetch(`/api/admin/cars/${id}`, { method: "DELETE" });
    setBusy(false);
    onDeleted();
  };

  if (asking) {
    return (
      <div className="flex items-center gap-2">
        <button type="button" onClick={doDelete} disabled={busy} className={btnDanger}>
          Confirm
        </button>
        <button type="button" onClick={() => setAsking(false)} className={btnOutline}>
          Keep
        </button>
      </div>
    );
  }

  return (
    <button type="button" onClick={() => setAsking(true)} className={btnDanger}>
      Delete
    </button>
  );
}

type CarFormProps = {
  car?: Car;
  onSaved: () => void;
  onCancel: () => void;
  saving: boolean;
  setSaving: (v: boolean) => void;
};

function CarForm({ car, onSaved, onCancel, saving, setSaving }: CarFormProps) {
  const [form, setForm] = useState<FormState>(() => {
    if (!car) return EMPTY_FORM;
    return {
      ...car,
      images: [...car.images],
      features: [...car.features],
    };
  });

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        mileage: Number(form.mileage),
        year: Number(form.year),
        images: form.images?.map((i) => i.trim()).filter(Boolean) ?? [],
        features: form.features?.map((f) => f.trim()).filter(Boolean) ?? [],
      };
      const res = await fetch(car ? `/api/admin/cars/${car.id}` : "/api/admin/cars", {
        method: car ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Save failed");
      onSaved();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <Panel>
      <form onSubmit={handleSubmit} className="grid gap-5">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="Brand">
            <input required value={form.brand ?? ""} onChange={(e) => set("brand", e.target.value)} className={inputClass} placeholder="e.g. Toyota" />
          </Field>
          <Field label="Model">
            <input required value={form.model ?? ""} onChange={(e) => set("model", e.target.value)} className={inputClass} placeholder="e.g. Fortuner" />
          </Field>
          <Field label="Variant">
            <input value={form.variant ?? ""} onChange={(e) => set("variant", e.target.value)} className={inputClass} placeholder="e.g. G" />
          </Field>
          <Field label="Year">
            <input required type="number" value={form.year ?? ""} onChange={(e) => set("year", Number(e.target.value))} className={inputClass} />
          </Field>
          <Field label="Price (₱)">
            <input required type="number" value={form.price ?? ""} onChange={(e) => set("price", Number(e.target.value))} className={inputClass} />
          </Field>
          <Field label="Mileage (km)">
            <input required type="number" value={form.mileage ?? ""} onChange={(e) => set("mileage", Number(e.target.value))} className={inputClass} />
          </Field>
          <Field label="Transmission">
            <select value={form.transmission ?? ""} onChange={(e) => set("transmission", e.target.value as Transmission)} className={selectClass}>
              <option>Automatic</option>
              <option>Manual</option>
            </select>
          </Field>
          <Field label="Fuel Type">
            <select value={form.fuelType ?? ""} onChange={(e) => set("fuelType", e.target.value as FuelType)} className={selectClass}>
              <option>Gasoline</option>
              <option>Diesel</option>
              <option>Hybrid</option>
              <option>Electric</option>
            </select>
          </Field>
          <Field label="Body Type">
            <select value={form.bodyType ?? ""} onChange={(e) => set("bodyType", e.target.value)} className={selectClass}>
              <option>Sedan</option>
              <option>SUV</option>
              <option>Pickup</option>
              <option>MPV</option>
              <option>Van</option>
              <option>Hatchback</option>
            </select>
          </Field>
          <Field label="Color">
            <input value={form.color ?? ""} onChange={(e) => set("color", e.target.value)} className={inputClass} placeholder="e.g. Attitude Black" />
          </Field>
          <Field label="Status">
            <select value={form.status ?? ""} onChange={(e) => set("status", e.target.value as CarStatus)} className={selectClass}>
              <option>Available</option>
              <option>Reserved</option>
              <option>Sold</option>
            </select>
          </Field>
          <Field label="Location">
            <input value={form.location ?? ""} onChange={(e) => set("location", e.target.value)} className={inputClass} placeholder="e.g. Metro Manila" />
          </Field>
          <Field label="Image Paths" hint="Comma separated (e.g. /cars/sakyanan-1.png, /cars/sakyanan-2.png)">
            <input value={form.images?.join(", ") ?? ""} onChange={(e) => set("images", e.target.value.split(","))} className={inputClass} placeholder="/cars/sakyanan-1.png" />
          </Field>
          <Field label="Features" hint="Comma separated">
            <input value={form.features?.join(", ") ?? ""} onChange={(e) => set("features", e.target.value.split(","))} className={inputClass} placeholder="Reverse camera, Alloy wheels" />
          </Field>
          <Field label="Highlight Label" hint="Optional badge text shown on public cards">
            <input value={form.highlightLabel ?? ""} onChange={(e) => set("highlightLabel", e.target.value)} className={inputClass} placeholder="Recently Pulled In" />
          </Field>
          <Field label="Date Added">
            <input type="date" value={form.dateAdded ?? ""} onChange={(e) => set("dateAdded", e.target.value)} className={inputClass} />
          </Field>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Field label="Featured on homepage">
            <select value={form.featured ? "1" : "0"} onChange={(e) => set("featured", e.target.value === "1")} className={selectClass}>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </Field>
          <Field label="Spotlight unit">
            <select value={form.spotlight ? "1" : "0"} onChange={(e) => set("spotlight", e.target.value === "1")} className={selectClass}>
              <option value="1">Yes</option>
              <option value="0">No</option>
            </select>
          </Field>
        </div>

        <Field label="Description">
          <textarea value={form.description ?? ""} onChange={(e) => set("description", e.target.value)} rows={4} className={`${inputClass} resize-none`} />
        </Field>

        <div className="flex flex-wrap gap-3 border-t border-slate-100 pt-5">
          <button type="submit" disabled={saving} className={btnPrimary}>
            {saving ? "Saving…" : car ? "Save changes" : "Add to lot"}
          </button>
          <button type="button" onClick={onCancel} className={btnOutline}>
            Cancel
          </button>
        </div>
      </form>
    </Panel>
  );
}