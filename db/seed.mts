import { cars } from "../src/data/cars.ts";
import { faqs } from "../src/data/faqs.ts";
import { financing } from "../src/data/financing.ts";
import { site } from "../src/data/site.ts";
import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function run() {
  console.log("Seeding cars...");
  for (const car of cars) {
    const { rowCount } = await pool.query(
      `INSERT INTO cars (
        id, slug, brand, model, variant, year, price, mileage, transmission,
        fuel_type, body_type, color, status, location, images, featured,
        spotlight, highlight_label, description, features, date_added
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15,
        $16, $17, $18, $19, $20, $21
      )
      ON CONFLICT (id) DO UPDATE SET
        slug = EXCLUDED.slug,
        brand = EXCLUDED.brand,
        model = EXCLUDED.model,
        variant = EXCLUDED.variant,
        year = EXCLUDED.year,
        price = EXCLUDED.price,
        mileage = EXCLUDED.mileage,
        transmission = EXCLUDED.transmission,
        fuel_type = EXCLUDED.fuel_type,
        body_type = EXCLUDED.body_type,
        color = EXCLUDED.color,
        status = EXCLUDED.status,
        location = EXCLUDED.location,
        images = EXCLUDED.images,
        featured = EXCLUDED.featured,
        spotlight = EXCLUDED.spotlight,
        highlight_label = EXCLUDED.highlight_label,
        description = EXCLUDED.description,
        features = EXCLUDED.features,
        date_added = EXCLUDED.date_added,
        updated_at = NOW()`,
      [
        car.id, car.slug, car.brand, car.model, car.variant ?? null,
        car.year, car.price, car.mileage, car.transmission, car.fuelType,
        car.bodyType, car.color, car.status, car.location, car.images,
        car.featured, car.spotlight ?? false, car.highlightLabel ?? null,
        car.description, car.features, car.dateAdded,
      ],
    );
    console.log(`  -> ${rowCount} ${car.slug} ${car.status}`);
  }

  console.log("Seeding faqs...");
  await pool.query("DELETE FROM faqs");
  for (const [index, faq] of faqs.entries()) {
    await pool.query(
      `INSERT INTO faqs (question, answer, sort_order) VALUES ($1, $2, $3)`,
      [faq.question, faq.answer, index],
    );
  }

  console.log("Seeding settings...");
  const settings: Record<string, string> = {
    business_name: site.businessName,
    tagline: site.tagline,
    description: site.description,
    phone: site.phone,
    email: site.email,
    location: site.location,
    messenger_link: site.messengerLink,
    facebook_link: site.facebookLink,
    primary_cta_label: site.primaryCtaLabel,
    financing_explanation: financing.explanation,
    financing_disclaimer: financing.disclaimer,
    financing_requirements: JSON.stringify(financing.requirements),
  };
  for (const [key, value] of Object.entries(settings)) {
    await pool.query(
      `INSERT INTO settings (key, value) VALUES ($1, $2)
       ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = NOW()`,
      [key, value],
    );
  }

  const counts = await pool.query(
    `SELECT
      (SELECT COUNT(*) FROM cars) AS cars,
      (SELECT COUNT(*) FROM faqs) AS faqs,
      (SELECT COUNT(*) FROM settings) AS settings`,
  );
  console.log("Done.", counts.rows[0]);
  await pool.end();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});