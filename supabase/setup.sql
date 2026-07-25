-- Wedding 2026 photo gallery setup
-- Run this in Supabase: SQL Editor -> New query -> paste -> Run

-- 1. Photos metadata table
create table if not exists public.photos (
  id uuid primary key default gen_random_uuid(),
  storage_path text not null unique,
  uploader_name text not null,
  guest_code text,
  source text not null check (source in ('guest', 'photographer')),
  media_type text not null check (media_type in ('photo', 'video')),
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists photos_approved_source_created_idx
  on public.photos (approved, source, created_at desc);

alter table public.photos enable row level security;

-- Drop existing policies if re-running this script
drop policy if exists "Guests can upload photos" on public.photos;
drop policy if exists "Public can view approved photos" on public.photos;

-- Guests can insert pending uploads only
create policy "Guests can upload photos"
on public.photos
for insert
to anon, authenticated
with check (
  source = 'guest'
  and approved = false
  and uploader_name is not null
  and length(trim(uploader_name)) > 0
);

-- Everyone can read approved gallery items
create policy "Public can view approved photos"
on public.photos
for select
to anon, authenticated
using (approved = true);

-- 2. Storage bucket policies
-- Create the bucket first in Dashboard: Storage -> New bucket
-- Name: wedding-media
-- Public bucket: ON

drop policy if exists "Allow guest uploads to wedding-media" on storage.objects;
drop policy if exists "Public read wedding-media" on storage.objects;

create policy "Allow guest uploads to wedding-media"
on storage.objects
for insert
to anon, authenticated
with check (
  bucket_id = 'wedding-media'
  and (storage.foldername(name))[1] = 'guest-uploads'
);

create policy "Public read wedding-media"
on storage.objects
for select
to public
using (bucket_id = 'wedding-media');
