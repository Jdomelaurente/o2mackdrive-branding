import { query } from "@/lib/db";

export async function GET() {
  try {
    const result = await query(
      `SELECT id, vehicle_year, vehicle_make, vehicle_model, mileage,
              target_price, notes, name, phone, status, created_at
       FROM sell_trade_inquiries
       ORDER BY created_at DESC`,
    );
    return Response.json({
      inquiries: result.rows.map((row) => ({
        id: row.id,
        vehicleYear: row.vehicle_year,
        vehicleMake: row.vehicle_make,
        vehicleModel: row.vehicle_model,
        mileage: row.mileage,
        targetPrice: row.target_price,
        notes: row.notes,
        name: row.name,
        phone: row.phone,
        status: row.status,
        createdAt: row.created_at,
      })),
    });
  } catch (err) {
    console.error("GET /api/admin/inquiries/sell-trade", err);
    return Response.json({ error: "Failed to load inquiries." }, { status: 500 });
  }
}