import { query } from "@/lib/db";

export async function GET() {
  try {
    const result = await query(
      `SELECT id, name, phone, email, message, status, created_at
       FROM contact_inquiries
       ORDER BY created_at DESC`,
    );
    return Response.json({
      inquiries: result.rows.map((row) => ({
        id: row.id,
        name: row.name,
        phone: row.phone,
        email: row.email ?? null,
        message: row.message,
        status: row.status,
        createdAt: row.created_at,
      })),
    });
  } catch (err) {
    console.error("GET /api/admin/inquiries/contact", err);
    return Response.json({ error: "Failed to load inquiries." }, { status: 500 });
  }
}