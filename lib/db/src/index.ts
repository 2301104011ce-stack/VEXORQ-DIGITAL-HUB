import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema";

const { Pool } = pg;

const connectionString = process.env.DATABASE_URL || "";
const sslRequired =
  process.env.DATABASE_SSL === "true" ||
  connectionString.includes("sslmode=require") ||
  connectionString.includes("render.com");

export const pool = connectionString
  ? new Pool({
      connectionString,
      ssl: sslRequired ? { rejectUnauthorized: false } : undefined,
    })
  : null;
export const db = pool ? drizzle(pool, { schema }) : (null as any);

export * from "./schema";
