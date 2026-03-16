import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const queriesTable = pgTable("queries", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  websiteType: text("website_type").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertQuerySchema = createInsertSchema(queriesTable).omit({ id: true, createdAt: true });
export type InsertQuery = z.infer<typeof insertQuerySchema>;
export type Query = typeof queriesTable.$inferSelect;
