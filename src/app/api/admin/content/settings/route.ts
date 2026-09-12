import { query } from "@/lib/db";

type FieldName =
  | "businessName"
  | "tagline"
  | "description"
  | "phone"
  | "email"
  | "location"
  | "messengerLink"
  | "facebookLink"
  | "primaryCtaLabel";

const FIELD_MAP: Record<FieldName, string> = {
  businessName: "business_name",
  tagline: "tagline",
  description: "description",
  phone: "phone",
  email: "email",
  location: "location",
  messengerLink: "messenger_link",
  facebookLink: "facebook_link",
  primaryCtaLabel: "primary_cta_label",
};

const SETTING_KEYS = Object.values(FIELD_MAP);

export async function GET() {
  try {
    const result = await query("SELECT key, value FROM settings WHERE key = ANY($1::text[])", [
      SETTING_KEYS,
    ]);
    const values = Object.fromEntries(result.rows.map((row) => [row.key, row.value]));
    return Response.json({
      settings: Object.fromEntries(
        Object.entries(FIELD_MAP).map(([field, key]) => [field, values[key] ?? ""]),
      ),
    });
  } catch (err) {
    console.error("GET /api/admin/content/settings", err);
    return Response.json({ error: "Failed to load site settings." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body: Partial<Record<FieldName, string>> = await request.json();

    const entries = Object.entries(FIELD_MAP).filter(([field]) => field in body);
    if (entries.length === 0) {
      return Response.json({ error: "No settings provided." }, { status: 400 });
    }

    for (const [field, key] of entries) {
      const value = body[field as FieldName];
      await query(
        `INSERT INTO settings (key, value) VALUES ($1, $2)
         ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()`,
        [key, value ?? ""],
      );
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("PUT /api/admin/content/settings", err);
    return Response.json({ error: "Failed to save site settings." }, { status: 500 });
  }
}