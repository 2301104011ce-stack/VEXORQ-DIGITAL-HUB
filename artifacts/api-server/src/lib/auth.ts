import type { Request, Response, NextFunction } from "express";

// Secret authentication key to lock down private endpoints from hackers, bots, and scrapers
export const VEXORQ_SECRET_KEY =
  process.env.VEXORQ_SECRET_KEY || "vxq_sec_8731f24e9b6a05c1d739e8";

export function requireAdminSecret(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["x-vexorq-secret-key"] || req.headers["authorization"];
  const queryKey = req.query.key as string | undefined;

  let providedKey = "";
  if (typeof authHeader === "string") {
    providedKey = authHeader.replace(/^Bearer\s+/i, "").trim();
  } else if (queryKey) {
    providedKey = queryKey.trim();
  }

  if (providedKey && providedKey === VEXORQ_SECRET_KEY) {
    return next();
  }

  res.status(403).json({
    success: false,
    error: "Unauthorized: Access denied. Protected path.",
  });
}
