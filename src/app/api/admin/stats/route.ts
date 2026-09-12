import { query } from "@/lib/db";

export async function GET() {
  try {
    const result = await query(
      `SELECT
        (SELECT COUNT(*) FROM cars) AS cars,
        (SELECT COUNT(*) FROM cars WHERE status = 'Available') AS available,
        (SELECT COUNT(*) FROM cars WHERE status = 'Reserved') AS reserved,
        (SELECT COUNT(*) FROM cars WHERE status = 'Sold') AS sold,
        (SELECT COUNT(*) FROM contact_inquiries) AS contact_total,
        (SELECT COUNT(*) FROM contact_inquiries WHERE status = 'New') AS contact_new,
        (SELECT COUNT(*) FROM sell_trade_inquiries) AS sell_trade_total,
        (SELECT COUNT(*) FROM sell_trade_inquiries WHERE status = 'New') AS sell_trade_new,
        (SELECT COUNT(*) FROM faqs) AS faqs`,
    );
    const row = result.rows[0];

    const recent = await query(
      `SELECT kind, id, name, message, status, created_at
       FROM (
         SELECT 'contact' AS kind, id::text AS id, name, message, status, created_at
         FROM contact_inquiries
         UNION ALL
         SELECT 'sell-trade' AS kind, id::text AS id, name,
                COALESCE(
                  NULLIF(vehicle_year::text, '') || ' ',
                  ''
                ) ||
                COALESCE(vehicle_make || ' ', '') ||
                COALESCE(vehicle_model, '') AS message,
                status, created_at
         FROM sell_trade_inquiries
       ) t
       ORDER BY created_at DESC
       LIMIT 6`,
    );

    return Response.json({
      stats: {
        cars: Number(row.cars),
        available: Number(row.available),
        reserved: Number(row.reserved),
        sold: Number(row.sold),
        contactTotal: Number(row.contact_total),
        contactNew: Number(row.contact_new),
        sellTradeTotal: Number(row.sell_trade_total),
        sellTradeNew: Number(row.sell_trade_new),
        faqs: Number(row.faqs),
      },
      recent: recent.rows,
    });
  } catch (err) {
    console.error("GET /api/admin/stats", err);
    return Response.json({ error: "Failed to load analytics." }, { status: 500 });
  }
}