import app from "./app";

const rawPort = process.env["PORT"] || "5000";
const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);

  // Automated 24/7 Keep-Alive Engine:
  // Render Free instances spin down after 15 minutes of inactivity.
  // Pinging every 8 minutes keeps the container warm so visitors never see
  // the "Welcome to Render / Initializing setup" spin-down splash screen.
  const KEEP_ALIVE_URL = process.env.KEEP_ALIVE_URL || "https://vexorq.onrender.com/api/healthz";
  const PING_INTERVAL_MS = 8 * 60 * 1000; // 8 minutes

  if (process.env.NODE_ENV === "production") {
    setInterval(async () => {
      try {
        const res = await fetch(KEEP_ALIVE_URL);
        console.log(`[KEEP-ALIVE] Pinged ${KEEP_ALIVE_URL} - status: ${res.status}`);
      } catch (err) {
        console.warn(`[KEEP-ALIVE] Ping failed:`, err);
      }
    }, PING_INTERVAL_MS);
  }
});
