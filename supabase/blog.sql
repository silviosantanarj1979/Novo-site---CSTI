create extension if not exists pgcrypto;

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text not null unique,
  excerpt text not null default '',
  content text not null default '',
  cover_url text,
  category text not null default 'Tecnologia',
  tags text[] not null default '{}',
  status text not null default 'draft' check (status in ('draft', 'published')),
  seo_title text,
  seo_description text,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.blog_posts enable row level security;

create policy "Public can read published posts"
on public.blog_posts for select
using (status = 'published' and published_at <= now());

create policy "Authenticated editors can manage posts"
on public.blog_posts for all
to authenticated
using (true)
with check (true);

create or replace function public.touch_blog_post()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  if new.status = 'published' and new.published_at is null then
    new.published_at = now();
  end if;
  return new;
end;
$$;

drop trigger if exists blog_posts_touch on public.blog_posts;
create trigger blog_posts_touch before insert or update on public.blog_posts
for each row execute function public.touch_blog_post();

create index if not exists blog_posts_publication_idx
on public.blog_posts (status, published_at desc);
