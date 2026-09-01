# Neighbourhood

Discover the places your neighbourhood actually recommends.

**Live app:** https://neighbourhood-prodman.vercel.app

## What is this, and why does it exist?

Every neighbourhood has an unofficial, word-of-mouth list of "the good places" — the cafe with the best filter coffee, the doctor who actually explains things, the electrician who shows up on time. That list usually lives scattered across group chats, or in someone's head, and is invisible to anyone who just moved in.

Anonymous review sites (Google, Yelp-style ratings) solve a different problem — they're built for strangers rating strangers, at scale, and are easy to game. Neighbourhood is built for the opposite case: a smaller, trust-based pool of people recommending places to their own neighbours, the way you'd trust a tip from someone who actually lives two streets away over a random 4.2-star average online.

**Target user:** someone new to a neighbourhood (just moved in, or just curious) who wants a trustworthy shortlist of cafes, restaurants, gyms, salons, doctors, grocery stores, and local services — recommended by real people, not anonymous crowds.

The MVP deliberately leaves out chat, payments, maps, notifications, and any ranking algorithm — it's just: discover places, read what neighbours say, save what you like, and add your own recommendation.

## Try it right now — no credentials needed

The live app above is connected to a real Supabase backend. You do not need any invite, API key, or pre-existing account:

1. Open the live app and click **Sign up**. Use any name, neighbourhood, email, and password (6+ characters) — there's no email verification step, so you're in immediately.
2. Browse categories, search, and open a place's details page.
3. **Save** a place, or **add a recommendation** (a star rating + a short comment) on any listing.
4. Log out, then log back in with the same email/password — everything you saved or recommended is still there. It's stored server-side in Postgres, not in your browser.
5. Sign up again with a **second, different email** (a different "person"). Open any listing the first account recommended — you'll see that recommendation too, with the first account's name on it. Recommendations are shared across everyone using the app, exactly like the real word-of-mouth list this app is trying to digitize. Each account only gets to edit/delete its *own* recommendations and saved places, but everyone can read everyone else's recommendations.

## Tech stack

- **Frontend:** React 18 + Vite 5, React Router 6, Tailwind CSS 3, lucide-react icons
- **Backend:** Supabase (Postgres + Auth), with Row Level Security
- **Deployment:** Vercel

## Running it locally

```bash
npm install
npm run dev
```

Open the printed local URL (default `http://localhost:5173`).

By default (no `.env.local`), local dev runs on a **local demo backend** (`src/lib/localBackend.js`) that mirrors the real Supabase API using your browser's `localStorage` — so it works immediately with zero setup, but data stays on your machine and isn't shared between browsers/accounts the way the live deployment is.

Every data-access call goes through `src/services/*.js` and `src/context/AuthContext.jsx`, which check `isSupabaseConfigured` (from `src/lib/supabase.js`) and transparently route to either Supabase or the local backend. The UI code never needs to know which one is active.

## Connecting your own Supabase project (optional, for local dev)

1. Create a project at [supabase.com](https://supabase.com).
2. In the Supabase SQL editor, run `supabase/schema.sql` (creates tables, indexes, RLS policies, and the trigger that recalculates listing ratings) followed by `supabase/seed.sql` (sample listings).
3. In **Authentication → Providers → Email**, turn **off** "Confirm email" (this app has no email-verification flow, so signups should be usable immediately).
4. Copy `.env.example` to `.env.local` and fill in your project's URL and anon/publishable key from **Project Settings → API**:
   ```
   VITE_SUPABASE_URL=https://your-project-ref.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-public-key
   ```
5. Restart the dev server. The app detects the env vars and switches to Supabase automatically — no code changes needed.

`.env` / `.env.local` are gitignored and must never be committed. Only the anon/publishable key is ever used client-side; no service-role key is required or referenced anywhere in the frontend.

## Database schema

- **profiles** — one row per user (full name, neighbourhood, avatar), linked to `auth.users`
- **listings** — places (name, category, location, description, aggregate `rating` and `recommendation_count`)
- **recommendations** — one row per user recommendation on a listing (rating + comment), readable by every authenticated user, writable only by its author
- **saved_listings** — a user's bookmarked places, readable/writable only by its owner

A `SECURITY DEFINER` trigger on `recommendations` recalculates the parent listing's `rating` and `recommendation_count` after every insert/update/delete, so the client never needs write access to `listings` directly.

## Build

```bash
npm run build
npm run preview
```

## Deploying to Vercel

This is a standard Vite project — Vercel auto-detects the framework. Import the repo in Vercel and set the two `VITE_SUPABASE_*` environment variables in the project settings (Production/Preview/Development) so it's backed by real, shared Supabase data; without them it falls back to the per-browser local demo backend.

- **Build command:** `vite build` (default)
- **Output directory:** `dist` (default)
