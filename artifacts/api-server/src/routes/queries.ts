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

  try {
    await ensureQueriesTable();

    // Save to database
    const [inserted] = await db.insert(queriesTable).values({
      fullName,
      email,
      phone,
      websiteType,
      description,
    }).returning();

    // Send email notification
    try {
      await sendQueryEmail(fullName, email, phone, websiteType, description);
      console.log(`[EMAIL] Query email sent for ID: ${inserted.id}`);
    } catch (emailError) {
      console.error(`[EMAIL] Failed to send email for query ${inserted.id}:`, emailError);
      // Don't fail the response if email fails, just log it
    }

    res.status(201).json({ 
      success: true, 
      message: "Query submitted successfully. Our team will contact you soon!", 
      id: inserted.id 
    });
  } catch (error) {
    console.error("[API] Error submitting query:", error);
    res.status(500).json({ 
      error: "Failed to submit query. Please try again later." 
    });
  }
});

export default router;
