# Neighbourhood

Discover the places your neighbourhood actually recommends.

Neighbourhood is a local discovery app where people share and browse trusted, first-hand recommendations for places near them — cafes, restaurants, gyms, salons, doctors, grocery stores, and local services — from real neighbours instead of anonymous review sites.

## Tech stack

- **Frontend:** React 18 + Vite 5, React Router 6, Tailwind CSS 3, lucide-react icons
- **Backend:** Supabase (Postgres + Auth), with Row Level Security
- **Deployment:** Vercel

## Demo mode (works instantly, no setup)

The app ships with a fully functional **local demo backend** (`src/lib/localBackend.js`) that mirrors the real Supabase API using `localStorage`. If no Supabase credentials are configured, the app automatically falls back to this backend — so `npm install && npm run dev` gives you a completely working app (auth, listings, search, save, recommendations) with no external services required.

Every data-access call goes through `src/services/*.js` and `src/context/AuthContext.jsx`, which check `isSupabaseConfigured` (from `src/lib/supabase.js`) and transparently route to either Supabase or the local backend. The UI code never needs to know which one is active.

## Local development

```bash
npm install
npm run dev
```

Open the printed local URL (default `http://localhost:5173`). Sign up with any email/password to try the full flow — data is stored in your browser's `localStorage` under `nh_demo_*` keys.

## Connecting a real Supabase project

1. Create a project at [supabase.com](https://supabase.com).
2. In the Supabase SQL editor, run `supabase/schema.sql` (creates tables, indexes, RLS policies, and the trigger that recalculates listing ratings) followed by `supabase/seed.sql` (sample listings).
3. Copy `.env.example` to `.env.local` and fill in your project's URL and anon key from **Project Settings → API**:
   ```
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   ```
4. Restart the dev server. The app detects the env vars and switches to Supabase automatically — no code changes needed.

`.env` / `.env.local` are gitignored and must never be committed. Only the anon public key is ever used client-side; no service-role key is required or referenced anywhere in the frontend.

## Database schema

- **profiles** — one row per user (full name, neighbourhood, avatar), linked to `auth.users`
- **listings** — places (name, category, location, description, aggregate `rating` and `recommendation_count`)
- **recommendations** — one row per user recommendation on a listing (rating + comment)
- **saved_listings** — join table for a user's saved places

A `SECURITY DEFINER` trigger on `recommendations` recalculates the parent listing's `rating` and `recommendation_count` after every insert/update/delete, so the client never needs write access to `listings` directly.

## Build

```bash
npm run build
npm run preview
```

## Deploying to Vercel

This is a standard Vite project — Vercel auto-detects the framework. Just import the repo in Vercel and set the two `VITE_SUPABASE_*` environment variables in the project settings (Production/Preview/Development) if you want it backed by real Supabase data; otherwise it will run in demo mode.

- **Build command:** `vite build` (default)
- **Output directory:** `dist` (default)
