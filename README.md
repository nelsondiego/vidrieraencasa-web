# Vidriera en Casa

SaaS application for analyzing retail store window displays using AI-powered image analysis.

## Tech Stack

- **Framework**: Next.js 16 with App Router
- **Runtime**: Cloudflare Pages with Edge Runtime
- **Database**: Cloudflare D1 (SQLite) with Drizzle ORM
- **Storage**: Cloudflare R2
- **AI**: Google Gemini Vision API
- **Payments**: MercadoPago
- **UI**: ShadCN UI + Tabler Icons
- **Auth**: Custom session-based authentication

## 📚 Documentation

- **[PROJECT_STATUS.md](PROJECT_STATUS.md)** - 📊 Estado actual del proyecto y checklist de deployment
- **[GET_DATABASE_ID.md](GET_DATABASE_ID.md)** - 🔑 Cómo obtener el Database ID de Cloudflare D1
- **[QUICKSTART.md](QUICKSTART.md)** - 🚀 Guía rápida de deployment (30 minutos)
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - 📖 Guía completa de deployment paso a paso
- **[.kiro/specs/vidriera-en-casa/](/.kiro/specs/vidriera-en-casa/)** - 📋 Especificaciones técnicas completas

## Environment Setup

1. Copy `.env.local` and fill in the required values:

```bash
# Google Gemini Vision API
GEMINI_API_KEY=your-gemini-api-key-here

# MercadoPago
MERCADOPAGO_ACCESS_TOKEN=your-mercadopago-access-token-here
MERCADOPAGO_WEBHOOK_SECRET=your-mercadopago-webhook-secret-here

# Session
SESSION_SECRET=your-session-secret-here

# Application
APP_URL=http://localhost:3000
```

2. Configure Cloudflare bindings in `wrangler.toml`:
   - Update `database_id` with your D1 database ID
   - Update `bucket_name` with your R2 bucket name

## Getting Started

First, install dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Database Setup

This project uses Drizzle ORM with Cloudflare D1.

### ✅ Resources Already Created

- **D1 Database**: `vidrieraencasa-db` (already created in Cloudflare)
- **R2 Bucket**: `vidrieraencasa` (already created in Cloudflare)

### Setup Steps

**📖 Detailed Guide**: See [GET_DATABASE_ID.md](GET_DATABASE_ID.md) for complete instructions.

**Quick Setup**:

1. Get your D1 database ID:

   ```bash
   # Option 1: Use helper script
   ./scripts/get-database-id.sh

   # Option 2: Manual command
   wrangler d1 list
   ```

2. Update `wrangler.toml` with the actual database ID:

   ```toml
   [[d1_databases]]
   binding = "DB"
   database_name = "vidrieraencasa-db"
   database_id = "your-actual-database-id"  # Replace with real ID
   ```

3. Run migrations to create tables:

   ```bash
   # Option 1: Use helper script (recommended)
   ./scripts/run-migrations.sh

   # Option 2: Manual command
   wrangler d1 migrations apply vidrieraencasa-db --remote
   ```

4. Verify the schema:
   ```bash
   wrangler d1 execute vidrieraencasa-db --command "SELECT name FROM sqlite_master WHERE type='table'" --remote
   ```

## Deploy on Cloudflare Pages

### Prerequisites

- Cloudflare account with Pages enabled
- D1 database: `vidrieraencasa-db` ✅
- R2 bucket: `vidrieraencasa` ✅
- GitHub repository connected

### Deployment Steps

1. **Connect GitHub Repository**

   - Go to Cloudflare Dashboard → Pages
   - Click "Create a project"
   - Connect your GitHub repository

2. **Configure Build Settings**

   - Framework preset: `Next.js`
   - Build command: `npm run build`
   - Build output directory: `.next`
   - Root directory: `/` (leave empty)

3. **Add Environment Variables** (in Cloudflare Pages settings)

   ```
   GEMINI_API_KEY=your-gemini-api-key
   MERCADOPAGO_ACCESS_TOKEN=your-mercadopago-token
   MERCADOPAGO_WEBHOOK_SECRET=your-webhook-secret
   SESSION_SECRET=your-32-byte-random-string
   APP_URL=https://your-domain.pages.dev
   ```

4. **Configure Bindings** (in Cloudflare Pages settings)

   - D1 Database: `DB` → `vidrieraencasa-db`
   - R2 Bucket: `STORAGE` → `vidrieraencasa`

5. **Deploy**
   - Click "Save and Deploy"
   - Wait for build to complete
   - Test the deployment

### Post-Deployment

1. **Configure MercadoPago Webhook**

   - Go to MercadoPago dashboard
   - Set webhook URL: `https://your-domain.pages.dev/api/webhooks/mercadopago`
   - Copy webhook secret and add to environment variables

2. **Test Critical Flows**

   - User registration and login
   - Image upload
   - AI analysis
   - Payment processing
   - PDF generation

3. **Monitor**
   - Check Cloudflare Analytics
   - Monitor D1 database usage
   - Monitor R2 storage usage
   - Monitor Gemini API costs

## Project Structure

```
vidrieraencasa/
├── app/                    # Next.js App Router
├── components/            # React components
│   ├── ui/               # ShadCN components
│   └── theme-provider.tsx
├── actions/               # Server Actions (to be added)
├── lib/                   # Utilities and helpers
│   └── db/               # Drizzle schemas
├── drizzle/              # Database migrations
├── wrangler.toml         # Cloudflare configuration
└── .env.local            # Environment variables
```
