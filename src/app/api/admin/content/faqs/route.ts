import { query } from "@/lib/db";

export async function GET() {
  try {
    const result = await query(
      `SELECT id, question, answer, sort_order FROM faqs
       ORDER BY sort_order ASC, id ASC`,
    );
    return Response.json({
      faqs: result.rows.map((row) => ({
        id: row.id,
        question: row.question,
        answer: row.answer,
        sortOrder: row.sort_order,
      })),
    });
  } catch (err) {
    console.error("GET /api/admin/content/faqs", err);
    return Response.json({ error: "Failed to load faqs." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body: { question?: string; answer?: string; sortOrder?: number } = await request.json();

    if (!body.question?.trim() || !body.answer?.trim()) {
      return Response.json(
        { error: "Both question and answer are required." },
        { status: 400 },
      );
    }

    const result = await query(
      `INSERT INTO faqs (question, answer, sort_order)
       VALUES ($1, $2, $3)
       RETURNING id, question, answer, sort_order`,
      [body.question.trim(), body.answer.trim(), Number(body.sortOrder ?? 0)],
    );
    const row = result.rows[0];
    return Response.json(
      {
        faq: {
          id: row.id,
          question: row.question,
          answer: row.answer,
          sortOrder: row.sort_order,
        },
      },
      { status: 201 },
    );
  } catch (err) {
    console.error("POST /api/admin/content/faqs", err);
    return Response.json({ error: "Failed to create faq." }, { status: 500 });
  }
}