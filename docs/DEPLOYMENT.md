# Deployment & Operations Guide

[<- Back to Documentation Index](./README.md)

This guide covers building, testing, verifying, and deploying the RKLT platform to production environments.

---

## 1. Prerequisites

- **Node.js**: `v18.18.0` or higher (Node 20 LTS recommended).
- **Package Manager**: `npm` (v9 or higher).

---

## 2. Environment Variables

Create a `.env.local` file in the project root for local testing. See [`.env.example`](file:///c:/Users/Ahmed/OneDrive/Rklt/.env.example) for reference:

```bash
# Canonical site URL (Used for generating sitemaps, canonical tags, and OpenGraph URLs)
NEXT_PUBLIC_SITE_URL=https://rklt.jo

# Primary operations desk WhatsApp dispatch number (Format: International without '+')
NEXT_PUBLIC_WHATSAPP_NUMBER=962795320624

# Primary operations desk direct phone line
NEXT_PUBLIC_PHONE=+962 7 9532 0624

# Senior operations desk email address
NEXT_PUBLIC_EMAIL=operations@rklt.jo
```

---

## 3. Development & Verification Workflow

### Run Local Development Server
```bash
npm run dev
```
The server will start at `http://localhost:3000`. You can inspect routes in both languages:
- English: `http://localhost:3000/en`
- Arabic: `http://localhost:3000/ar`

### Production Build Verification
To ensure 100% type safety and zero missing dependencies, run the full production build pipeline:
```bash
npm run build
```
This command:
1. Validates all TypeScript types across `.tsx` and `.ts` files (`tsc --noEmit`).
2. Runs ESLint checks across the codebase.
3. Compiles and minifies CSS and JavaScript bundles.
4. Statically generates all 18 routes across `en` and `ar`.

---

## 4. Production Hosting Targets

### Target A: Vercel (Recommended)
1. Push the repository to your Git provider (GitHub, GitLab, or Bitbucket).
2. Import the project into Vercel. Next.js App Router will be automatically detected.
3. Add the production environment variables (`NEXT_PUBLIC_SITE_URL`, etc.).
4. Deploy. Vercel automatically deploys edge middleware and static edge caching.

### Target B: Node.js Standalone Server
For hosting in private cloud environments (AWS EC2, Google Cloud Run, DigitalOcean):
1. In `next.config.mjs`, verify `output: "standalone"`.
2. Build the application: `npm run build`.
3. Copy `.next/standalone`, `.next/static`, and `public` into your runtime container.
4. Start the server:
   ```bash
   node server.js
   ```

### Target C: Docker Containerization
A standard production `Dockerfile` pattern:
```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
ENV PORT=3000
CMD ["node", "server.js"]
```
