import { query } from "@/lib/db";
import { isInquiryStatus } from "@/lib/admin";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body: { status?: unknown } = await request.json();

    if (!isInquiryStatus(body.status)) {
      return Response.json({ error: "Invalid status value." }, { status: 400 });
    }

    const result = await query(
      "UPDATE contact_inquiries SET status = $2 WHERE id = $1 RETURNING id, status",
      [Number(id), body.status],
    );

    if (result.rowCount === 0) {
      return Response.json({ error: "Inquiry not found." }, { status: 404 });
    }

    return Response.json({ ok: true, status: result.rows[0].status });
  } catch (err) {
    console.error("PATCH /api/admin/inquiries/contact/[id]", err);
    return Response.json({ error: "Failed to update inquiry." }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const result = await query("DELETE FROM contact_inquiries WHERE id = $1", [Number(id)]);
    if (result.rowCount === 0) {
      return Response.json({ error: "Inquiry not found." }, { status: 404 });
    }
    return Response.json({ ok: true });
  } catch (err) {
    console.error("DELETE /api/admin/inquiries/contact/[id]", err);
    return Response.json({ error: "Failed to delete inquiry." }, { status: 500 });
  }
}