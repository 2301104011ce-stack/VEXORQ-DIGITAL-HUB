# Render configuration for API Server

You can deploy the API server to Render.com with these steps:

## 1. Create account at https://render.com

## 2. Create new Web Service:
- Connect your GitHub repo (d2684066-s/VEXORQ-DIGITAL-HUB)
- Runtime: Node
- Build Command: `pnpm install && pnpm --filter @workspace/api-server run build`
- Start Command: `cd artifacts/api-server && node dist/index.cjs`

## 3. Environment Variables (Set in Render):
```
DATABASE_URL=your_postgresql_url
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

## 4. After deployment:
Update frontend API URL to point to your Render URL.

## Alternatively - Use Railway.app:
- Similar setup but even simpler
- Free tier with $5/month credit
