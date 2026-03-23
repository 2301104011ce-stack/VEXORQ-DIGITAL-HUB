import { Router, type IRouter } from "express";
import { db, queriesTable } from "@workspace/db";
import { sql } from "drizzle-orm";
import { SubmitQueryBody } from "@workspace/api-zod";
import { sendQueryEmail } from "../lib/email";

const router: IRouter = Router();
let queriesTableReady = false;

async function ensureQueriesTable() {
  if (queriesTableReady) return;

  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS queries (
      id SERIAL PRIMARY KEY,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL,
      website_type TEXT NOT NULL,
      description TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
  `);

  queriesTableReady = true;
}

router.post("/queries", async (req, res) => {
  const parsed = SubmitQueryBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const { fullName, email, phone, websiteType, description } = parsed.data;

  let insertedId: number | null = null;
  let emailSent = false;

  try {
    await ensureQueriesTable();

    const [inserted] = await db
      .insert(queriesTable)
      .values({
        fullName,
        email,
        phone,
        websiteType,
        description,
      })
      .returning();

    insertedId = inserted.id;
  } catch (dbError) {
    console.error("[DB] Failed to save query, continuing with email-only flow:", dbError);
  }

  try {
    await sendQueryEmail(fullName, email, phone, websiteType, description);
    emailSent = true;
    console.log(`[EMAIL] Query email sent${insertedId ? ` for ID: ${insertedId}` : " (no DB record)"}`);
  } catch (emailError) {
    console.error("[EMAIL] Failed to send query email:", emailError);
  }

  if (insertedId || emailSent) {
    res.status(201).json({
      success: true,
      message: "Query submitted successfully. Our team will contact you soon!",
      id: insertedId,
    });
    return;
  }

  res.status(500).json({
    error: "Failed to submit query. Please try again later.",
  });
});

export default router;
