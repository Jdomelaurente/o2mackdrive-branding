import { query } from "@/lib/db";
import { mapCarRow, slugifyCar } from "@/lib/admin";
import type { Car } from "@/types/car";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const body: Partial<Car> = await request.json();

    if (!body.brand || !body.model || !body.year || !body.price) {
      return Response.json({ error: "Missing required fields." }, { status: 400 });
    }

    const slug =
      body.slug?.trim() || slugifyCar({ year: body.year, brand: body.brand, model: body.model, variant: body.variant });

    const result = await query(
      `UPDATE cars SET
        slug = $2,
        brand = $3,
        model = $4,
        variant = $5,
        year = $6,
        price = $7,
        mileage = $8,
        transmission = $9,
        fuel_type = $10,
        body_type = $11,
        color = $12,
        status = $13,
        location = $14,
        images = $15,
        featured = $16,
        spotlight = $17,
        highlight_label = $18,
        description = $19,
        features = $20,
        date_added = $21,
        updated_at = NOW()
      WHERE id = $1
      RETURNING *`,
      [
        id,
        slug,
        body.brand,
        body.model,
        body.variant ?? null,
        Number(body.year),
        Number(body.price),
        Number(body.mileage),
        body.transmission,
        body.fuelType,
        body.bodyType,
        body.color,
        body.status,
        body.location,
        body.images ?? [],
        body.featured ?? false,
        body.spotlight ?? false,
        body.highlightLabel ?? null,
        body.description,
        body.features ?? [],
        body.dateAdded ?? new Date().toISOString().slice(0, 10),
      ],
    );

    if (result.rowCount === 0) {
      return Response.json({ error: "Vehicle not found." }, { status: 404 });
    }

    return Response.json({ car: mapCarRow(result.rows[0]) });
  } catch (err) {
    console.error("PUT /api/admin/cars/[id]", err);
    return Response.json({ error: "Failed to update vehicle." }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const result = await query("DELETE FROM cars WHERE id = $1", [id]);
    if (result.rowCount === 0) {
      return Response.json({ error: "Vehicle not found." }, { status: 404 });
    }
    return Response.json({ ok: true });
  } catch (err) {
    console.error("DELETE /api/admin/cars/[id]", err);
    return Response.json({ error: "Failed to delete vehicle." }, { status: 500 });
  }
}