import { query } from "@/lib/db";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body: { question?: string; answer?: string; sortOrder?: number } = await request.json();

    if (!body.question?.trim() || !body.answer?.trim()) {
      return Response.json(
        { error: "Both question and answer are required." },
        { status: 400 },
      );
    }

    const result = await query(
      `UPDATE faqs SET question = $2, answer = $3, sort_order = $4, updated_at = NOW()
       WHERE id = $1
       RETURNING id, question, answer, sort_order`,
      [Number(id), body.question.trim(), body.answer.trim(), Number(body.sortOrder ?? 0)],
    );

    if (result.rowCount === 0) {
      return Response.json({ error: "Faq not found." }, { status: 404 });
    }

    const row = result.rows[0];
    return Response.json({
      faq: {
        id: row.id,
        question: row.question,
        answer: row.answer,
        sortOrder: row.sort_order,
      },
    });
  } catch (err) {
    console.error("PUT /api/admin/content/faqs/[id]", err);
    return Response.json({ error: "Failed to update faq." }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const result = await query("DELETE FROM faqs WHERE id = $1", [Number(id)]);
    if (result.rowCount === 0) {
      return Response.json({ error: "Faq not found." }, { status: 404 });
    }
    return Response.json({ ok: true });
  } catch (err) {
    console.error("DELETE /api/admin/content/faqs/[id]", err);
    return Response.json({ error: "Failed to delete faq." }, { status: 500 });
  }
}