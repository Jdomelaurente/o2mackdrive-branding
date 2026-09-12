import { query } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body: { name?: string; phone?: string; email?: string; message?: string } =
      await request.json();

    if (!body.name?.trim() || !body.phone?.trim() || !body.message?.trim()) {
      return Response.json(
        { error: "Name, contact number, and message are required." },
        { status: 400 },
      );
    }

    const result = await query(
      `INSERT INTO contact_inquiries (name, phone, email, message)
       VALUES ($1, $2, $3, $4)
       RETURNING id`,
      [
        body.name.trim(),
        body.phone.trim(),
        body.email?.trim() || null,
        body.message.trim(),
      ],
    );

    return Response.json(
      { ok: true, id: result.rows[0].id },
      { status: 201 },
    );
  } catch (err) {
    console.error("POST /api/inquiries/contact", err);
    return Response.json({ error: "Failed to submit inquiry." }, { status: 500 });
  }
}