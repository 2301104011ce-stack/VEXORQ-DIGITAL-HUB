import { Router, type IRouter, type Request, type Response } from "express";
import { db, queriesTable } from "@workspace/db";
import { sql } from "drizzle-orm";
import { SubmitQueryBody } from "@workspace/api-zod";
import { sendQueryEmail } from "../lib/email";
import {
  saveContactSubmission,
  getAllQueries,
  getAllUploads,
  getContactsExcelBuffer,
} from "../lib/storage";

const router: IRouter = Router();
let queriesTableReady = false;

async function ensureQueriesTable() {
  if (queriesTableReady || !db) return;

  try {
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
  } catch (err) {
    console.warn("[DB] Could not ensure queries table (may be running without PostgreSQL):", err);
  }
}

// POST /api/queries
router.post("/queries", async (req: Request, res: Response) => {
  const parsed = SubmitQueryBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body", details: parsed.error.issues });
    return;
  }

  const { fullName, email, phone, websiteType, description } = parsed.data;

  // 1. Always save to local/desktop persistent store and Excel
  let localRecord: any = null;
  try {
    localRecord = saveContactSubmission({
      fullName,
      email,
      phone,
      websiteType,
      description,
    });
  } catch (storageErr) {
    console.error("[Storage] Failed to save contact to Excel/JSON:", storageErr);
  }

  // 2. Save to Postgres DB if available
  let insertedId: number | null = null;
  if (db) {
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
      console.warn("[DB] Failed to save query to Postgres DB:", dbError);
    }
  }

  // 3. Send email notification if configured
  try {
    await sendQueryEmail(fullName, email, phone, websiteType, description);
    console.log(`[EMAIL] Query email dispatched for: ${fullName} <${email}>`);
  } catch (emailError) {
    console.warn("[EMAIL] Email notification not sent (SMTP may not be set):", emailError);
  }

  res.status(201).json({
    success: true,
    message: "Contact query submitted successfully! Our team will contact you shortly.",
    id: insertedId || localRecord?.id || 1,
    data: localRecord,
  });
});

// GET /api/queries - list all queries
router.get("/queries", (_req: Request, res: Response) => {
  const queries = getAllQueries();
  res.json({
    success: true,
    total: queries.length,
    data: queries,
  });
});

// GET /api/export/contacts - download Excel file directly
router.get("/export/contacts", (_req: Request, res: Response) => {
  try {
    const buffer = getContactsExcelBuffer();
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );
    res.setHeader(
      "Content-Disposition",
      'attachment; filename="VEXORQ_Contact_Submissions.xlsx"',
    );
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ error: "Failed to generate Excel file" });
  }
});

// GET /api/sync - unified sync endpoint for local MacBook script
router.get("/sync", (_req: Request, res: Response) => {
  const contacts = getAllQueries();
  const uploads = getAllUploads();
  res.json({
    success: true,
    timestamp: new Date().toISOString(),
    contacts,
    uploads,
  });
});

export default router;
