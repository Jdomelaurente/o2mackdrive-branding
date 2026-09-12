import { query } from "@/lib/db";
import { mapCarRow, slugifyCar } from "@/lib/admin";
import type { Car } from "@/types/car";

export async function GET() {
  try {
    const result = await query(
      `SELECT * FROM cars
       ORDER BY date_added DESC, created_at DESC`,
    );
    return Response.json({ cars: result.rows.map(mapCarRow) });
  } catch (err) {
    console.error("GET /api/admin/cars", err);
    return Response.json({ error: "Failed to load vehicles." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body: Partial<Car> = await request.json();

    const requiredFields = [
      "brand",
      "model",
      "year",
      "price",
      "mileage",
      "transmission",
      "fuelType",
      "bodyType",
      "color",
      "status",
      "location",
      "description",
    ] as const;

    for (const field of requiredFields) {
      if (body[field] === undefined || body[field] === null || body[field] === "") {
        return Response.json({ error: `Missing required field: ${field}` }, { status: 400 });
      }
    }

    const id = body.id?.trim() || `car-${crypto.randomUUID().slice(0, 8)}`;
    const slug =
      body.slug?.trim() || slugifyCar({ year: body.year!, brand: body.brand!, model: body.model!, variant: body.variant });

    const result = await query(
      `INSERT INTO cars (
        id, slug, brand, model, variant, year, price, mileage, transmission,
        fuel_type, body_type, color, status, location, images, featured,
        spotlight, highlight_label, description, features, date_added
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15,
        $16, $17, $18, $19, $20, $21
      )
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

    return Response.json({ car: mapCarRow(result.rows[0]) }, { status: 201 });
  } catch (err) {
    console.error("POST /api/admin/cars", err);
    return Response.json({ error: "Failed to create vehicle listing." }, { status: 500 });
  }
}