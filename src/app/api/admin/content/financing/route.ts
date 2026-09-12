import { query } from "@/lib/db";

const KEYS = ["financing_explanation", "financing_disclaimer", "financing_requirements"] as const;

export async function GET() {
  try {
    const result = await query("SELECT key, value FROM settings WHERE key = ANY($1::text[])", [
      KEYS,
    ]);
    const values = Object.fromEntries(result.rows.map((row) => [row.key, row.value]));

    let requirements: string[] = [];
    try {
      const parsed = JSON.parse(values.financing_requirements ?? "[]");
      if (Array.isArray(parsed)) requirements = parsed.filter((r) => typeof r === "string");
    } catch {
      requirements = [];
    }

    return Response.json({
      financing: {
        explanation: values.financing_explanation ?? "",
        disclaimer: values.financing_disclaimer ?? "",
        requirements,
      },
    });
  } catch (err) {
    console.error("GET /api/admin/content/financing", err);
    return Response.json({ error: "Failed to load financing content." }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const body: {
      explanation?: string;
      disclaimer?: string;
      requirements?: string[];
    } = await request.json();

    const updates: Record<string, string> = {
      financing_explanation: body.explanation ?? "",
      financing_disclaimer: body.disclaimer ?? "",
      financing_requirements: JSON.stringify(
        Array.isArray(body.requirements) ? body.requirements : [],
      ),
    };

    for (const [key, value] of Object.entries(updates)) {
      await query(
        `INSERT INTO settings (key, value) VALUES ($1, $2)
         ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()`,
        [key, value],
      );
    }

    return Response.json({ ok: true });
  } catch (err) {
    console.error("PUT /api/admin/content/financing", err);
    return Response.json({ error: "Failed to save financing content." }, { status: 500 });
  }
}