-- ============================================================
-- Nano Signs — Supabase Setup SQL  (v2)
-- Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- ── 1. Orders Table ──────────────────────────────────────────
create table if not exists public.orders (
  id               uuid        primary key default gen_random_uuid(),
  user_id          uuid        references auth.users(id) on delete cascade not null,
  product_title    text        not null,
  product_size     text        not null default '',
  quantity         int         not null default 1,
  unit_price       numeric(10,2) not null,
  total_price      numeric(10,2) not null,
  design_url       text,
  design_filename  text,
  custom_options   jsonb       not null default '{}',
  shipping_name    text,
  shipping_address text,
  shipping_city    text,
  shipping_postal  text,
  status           text        not null default 'pending',
  created_at       timestamptz not null default now()
);

-- ── 2. Row Level Security ────────────────────────────────────
alter table public.orders enable row level security;

-- Drop existing policies to avoid conflicts on re-run
drop policy if exists "Users can view own orders"   on public.orders;
drop policy if exists "Users can insert own orders" on public.orders;
drop policy if exists "Admins can view all orders"  on public.orders;

create policy "Users can view own orders"
  on public.orders for select
  using (auth.uid() = user_id);

create policy "Users can insert own orders"
  on public.orders for insert
  with check (auth.uid() = user_id);

-- ── 3. Storage Bucket ────────────────────────────────────────
-- NOTE: If this errors with "row violates check constraint",
-- go to Storage in the dashboard and manually create a bucket
-- named "designs" and set it to Public.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
  values (
    'designs',
    'designs',
    true,
    52428800,  -- 50 MB limit
    array['application/pdf','image/png','image/jpeg','image/jpg','image/webp']
  )
  on conflict (id) do update set
    public             = true,
    file_size_limit    = 52428800,
    allowed_mime_types = array['application/pdf','image/png','image/jpeg','image/jpg','image/webp'];

-- ── 4. Storage Policies ──────────────────────────────────────
drop policy if exists "Auth users can upload designs"  on storage.objects;
drop policy if exists "Anyone can upload designs"      on storage.objects;
drop policy if exists "Anyone can read designs"        on storage.objects;
drop policy if exists "Users can delete own designs"   on storage.objects;

-- Allow any authenticated user to upload designs
create policy "Auth users can upload designs"
  on storage.objects for insert
  with check (
    bucket_id = 'designs'
    and auth.role() = 'authenticated'
  );

-- Allow public read (bucket is public)
create policy "Anyone can read designs"
  on storage.objects for select
  using (bucket_id = 'designs');

-- Allow users to delete their own uploads
create policy "Users can delete own designs"
  on storage.objects for delete
  using (
    bucket_id = 'designs'
    and auth.uid()::text = (storage.foldername(name))[1]
  );

-- ── Done! ────────────────────────────────────────────────────
-- Your orders table and designs storage bucket are ready.
-- Next step: configure Auth → Email settings (see README).

-- ── 5. User Profiles Table & Sync Trigger ────────────────────
-- Create a table for public profiles linked to auth.users
create table if not exists public.profiles (
  id          uuid        references auth.users on delete cascade primary key,
  email       text        unique not null,
  full_name   text,
  updated_at  timestamptz default now(),
  created_at  timestamptz default now()
);

-- Enable Row Level Security (RLS) on profiles
alter table public.profiles enable row level security;

-- Drop existing profile policies to prevent conflicts on re-run
drop policy if exists "Public profiles are viewable by everyone" on public.profiles;
drop policy if exists "Users can update their own profile"        on public.profiles;

create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using (true);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Create a postgres trigger function to sync signup data automatically
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', '')
  );
  return new;
end;
$$ language plpgsql security definer;

-- Bind trigger to auth.users insert event
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();


-- ── 6. Promotional Discount Claims Table ─────────────────────
-- Create table to track email addresses that claimed the 10% OFF discount
create table if not exists public.discount_claims (
  id          uuid        primary key default gen_random_uuid(),
  email       text        unique not null,
  claimed_at  timestamptz not null default now(),
  used_at     timestamptz
);

-- Enable Row Level Security (RLS)
alter table public.discount_claims enable row level security;

-- Drop existing policies if any to prevent conflicts on re-run
drop policy if exists "Anyone can insert discount claims" on public.discount_claims;
drop policy if exists "Anyone can view discount claims" on public.discount_claims;
drop policy if exists "Anyone can update discount claims" on public.discount_claims;

-- Create policies to allow public insertion and verification during checkout
create policy "Anyone can insert discount claims"
  on public.discount_claims for insert
  with check (true);

create policy "Anyone can view discount claims"
  on public.discount_claims for select
  using (true);

create policy "Anyone can update discount claims"
  on public.discount_claims for update
  using (true);


-- ── 7. Quote Requests Table ───────────────────────────────────
-- Create table to track custom quote requests
create table if not exists public.quote_requests (
  id          uuid        primary key default gen_random_uuid(),
  full_name   text        not null,
  email       text        not null,
  phone       text        not null,
  description text        not null,
  width       text,
  height      text,
  quantity    int         not null default 1,
  file_url    text,
  created_at  timestamptz not null default now()
);

-- Enable Row Level Security (RLS)
alter table public.quote_requests enable row level security;

-- Drop existing policies if any to prevent conflicts on re-run
drop policy if exists "Anyone can insert quote requests" on public.quote_requests;
drop policy if exists "Anyone can view quote requests"   on public.quote_requests;

-- Create policies to allow public insertion and viewing
create policy "Anyone can insert quote requests"
  on public.quote_requests for insert
  with check (true);

create policy "Anyone can view quote requests"
  on public.quote_requests for select
  using (true);


-- ── 8. Quote Attachments Storage Bucket ───────────────────────
-- Manually create this or run this script to ensure the bucket exists
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
  values (
    'quote-attachments',
    'quote-attachments',
    true,
    26214400,  -- 25 MB limit
    array['application/pdf','image/png','image/jpeg','image/jpg']
  )
  on conflict (id) do update set
    public             = true,
    file_size_limit    = 26214400,
    allowed_mime_types = array['application/pdf','image/png','image/jpeg','image/jpg'];


-- ── 9. Quote Attachments Storage Policies ─────────────────────
drop policy if exists "Anyone can upload quote attachments"   on storage.objects;
drop policy if exists "Auth users can upload quote attachments" on storage.objects;
drop policy if exists "Anyone can read quote attachments"     on storage.objects;

-- Allow any authenticated user to upload quote attachments
create policy "Auth users can upload quote attachments"
  on storage.objects for insert
  with check (
    bucket_id = 'quote-attachments'
    and auth.role() = 'authenticated'
  );

-- Allow public read
create policy "Anyone can read quote attachments"
  on storage.objects for select
  using (bucket_id = 'quote-attachments');
