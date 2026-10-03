import express, { type Express } from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import router from "./routes";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Security headers: Block scrapers, AI indexers, and clickjacking
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  if (req.path.startsWith("/api") || req.path.startsWith("/upload")) {
    res.setHeader("X-Robots-Tag", "noindex, nofollow, noarchive, nosnippet");
  }
  next();
});

app.get("/robots.txt", (_req, res) => {
  res.type("text/plain");
  res.send(
    "User-agent: *\nDisallow: /api/\nDisallow: /upload\nDisallow: /database/\nDisallow: /uploads/\n\nUser-agent: GPTBot\nDisallow: /\n\nUser-agent: CCBot\nDisallow: /\n\nUser-agent: Google-Extended\nDisallow: /\n\nUser-agent: Claude-Web\nDisallow: /\n"
  );
});

app.use("/api", router);

// Check if frontend build exists to serve both web app and API in one unified service
const candidateDistPaths = [
  path.resolve(process.cwd(), "artifacts/vexorq/dist"),
  path.resolve(__dirname, "../../vexorq/dist"),
  path.resolve(__dirname, "../../../artifacts/vexorq/dist"),
];

const distPath = candidateDistPaths.find((p) => fs.existsSync(p));

if (distPath) {
  app.use(express.static(distPath));
  app.use((req, res, next) => {
    if (req.method === "GET" && !req.path.startsWith("/api")) {
      return res.sendFile(path.join(distPath, "index.html"));
    }
    next();
  });
}

export default app;
