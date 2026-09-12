import { query } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body: {
      year?: string | number;
      make?: string;
      model?: string;
      mileage?: string | number;
      price?: string;
      notes?: string;
      name?: string;
      phone?: string;
    } = await request.json();

    if (!body.name?.trim() || !body.phone?.trim()) {
      return Response.json(
        { error: "Name and contact number are required." },
        { status: 400 },
      );
    }

    const result = await query(
      `INSERT INTO sell_trade_inquiries (
        vehicle_year, vehicle_make, vehicle_model, mileage, target_price,
        notes, name, phone
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING id`,
      [
        body.year ? Number(body.year) : null,
        body.make?.trim() || null,
        body.model?.trim() || null,
        body.mileage ? Number(body.mileage) : null,
        body.price?.trim() || null,
        body.notes?.trim() || null,
        body.name.trim(),
        body.phone.trim(),
      ],
    );

    return Response.json(
      { ok: true, id: result.rows[0].id },
      { status: 201 },
    );
  } catch (err) {
    console.error("POST /api/inquiries/sell-trade", err);
    return Response.json({ error: "Failed to submit inquiry." }, { status: 500 });
  }
}