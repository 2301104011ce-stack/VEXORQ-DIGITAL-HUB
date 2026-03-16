import { Router, type IRouter } from "express";
import { db, queriesTable } from "@workspace/db";
import { SubmitQueryBody } from "@workspace/api-zod";

const router: IRouter = Router();

router.post("/queries", async (req, res) => {
  const parsed = SubmitQueryBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request body" });
    return;
  }

  const { fullName, email, phone, websiteType, description } = parsed.data;

  const [inserted] = await db.insert(queriesTable).values({
    fullName,
    email,
    phone,
    websiteType,
    description,
  }).returning();

  res.status(201).json({ success: true, message: "Query submitted successfully. Our team will contact you soon!", id: inserted.id });
});

export default router;
