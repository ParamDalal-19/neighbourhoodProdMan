-- Neighbourhood — Supabase schema, indexes, and Row Level Security policies.
-- Run this once in the Supabase SQL Editor for a new project (or via the CLI).

-- ==========================================================================
-- EXTENSIONS
-- ==========================================================================
create extension if not exists "uuid-ossp";

-- ==========================================================================
-- TABLES
-- ==========================================================================

-- One row per authenticated user, keyed to auth.users.id.
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  neighbourhood text not null,
  avatar_url text,
  created_at timestamptz not null default now()
);

-- Places that can be discovered/recommended. Publicly readable.
create table if not exists public.listings (
  id text primary key,
  name text not null,
  category text not null check (
    category in ('cafes', 'restaurants', 'gyms', 'salons', 'doctors', 'grocery', 'services')
  ),
  description text not null,
  location text not null,
  rating numeric(2, 1) not null default 0,
  recommendation_count integer not null default 0,
  created_at timestamptz not null default now()
);

-- User-submitted recommendations for a listing.
create table if not exists public.recommendations (
  id uuid primary key default uuid_generate_v4(),
  listing_id text not null references public.listings(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  rating smallint not null check (rating between 1 and 5),
  comment text not null,
  created_at timestamptz not null default now()
);

-- A user's bookmarked listings.
create table if not exists public.saved_listings (
  id uuid primary key default uuid_generate_v4(),
  listing_id text not null references public.listings(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, listing_id)
);

-- ==========================================================================
-- INDEXES
-- ==========================================================================
create index if not exists idx_listings_category on public.listings(category);
create index if not exists idx_recommendations_listing_id on public.recommendations(listing_id);
create index if not exists idx_recommendations_user_id on public.recommendations(user_id);
create index if not exists idx_saved_listings_user_id on public.saved_listings(user_id);
create index if not exists idx_saved_listings_listing_id on public.saved_listings(listing_id);

-- ==========================================================================
-- ROW LEVEL SECURITY
-- ==========================================================================
alter table public.profiles enable row level security;
alter table public.listings enable row level security;
alter table public.recommendations enable row level security;
alter table public.saved_listings enable row level security;

-- profiles: anyone signed in can view profiles (needed to show recommender
-- names), but users may only insert/update their own row.
create policy "Profiles are viewable by authenticated users"
  on public.profiles for select
  to authenticated
  using (true);

create policy "Users can insert their own profile"
  on public.profiles for insert
  to authenticated
  with check (auth.uid() = id);

create policy "Users can update their own profile"
  on public.profiles for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- listings: publicly readable (even by anon, for a future public browse
-- experience); no client-side writes — content is seeded/managed directly.
create policy "Listings are viewable by everyone"
  on public.listings for select
  to authenticated, anon
  using (true);

-- recommendations: publicly readable by authenticated users; users may only
-- create/edit/delete their own recommendation rows.
create policy "Recommendations are viewable by authenticated users"
  on public.recommendations for select
  to authenticated
  using (true);

create policy "Users can insert their own recommendations"
  on public.recommendations for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can update their own recommendations"
  on public.recommendations for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own recommendations"
  on public.recommendations for delete
  to authenticated
  using (auth.uid() = user_id);

-- saved_listings: users may only see/modify their own saved rows.
create policy "Users can view their own saved listings"
  on public.saved_listings for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Users can save listings for themselves"
  on public.saved_listings for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Users can unsave their own saved listings"
  on public.saved_listings for delete
  to authenticated
  using (auth.uid() = user_id);

-- Note: listings has no client-facing update policy. Rating and
-- recommendation_count are kept in sync automatically by the trigger below,
-- which runs as SECURITY DEFINER and bypasses RLS for that single operation
-- only — clients can never update listings directly.

-- ==========================================================================
-- AGGREGATE TRIGGER
-- ==========================================================================
-- Recalculates a listing's average rating and recommendation_count whenever
-- its recommendations change, so the app never has to (and never needs
-- write access to) the listings table directly.
create or replace function public.recalculate_listing_rating()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  target_id text := coalesce(new.listing_id, old.listing_id);
begin
  update public.listings
  set
    recommendation_count = (
      select count(*) from public.recommendations where listing_id = target_id
    ),
    rating = coalesce(
      (select round(avg(rating)::numeric, 1) from public.recommendations where listing_id = target_id),
      0
    )
  where id = target_id;
  return coalesce(new, old);
end;
$$;

drop trigger if exists trg_recommendations_after_change on public.recommendations;
create trigger trg_recommendations_after_change
after insert or update or delete on public.recommendations
for each row execute function public.recalculate_listing_rating();
