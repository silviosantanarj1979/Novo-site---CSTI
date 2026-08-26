create table if not exists public.blog_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  created_at timestamptz not null default now()
);

alter table public.blog_categories enable row level security;

drop policy if exists "Public can read blog categories" on public.blog_categories;
create policy "Public can read blog categories" on public.blog_categories for select using (true);

drop policy if exists "Authenticated editors can manage blog categories" on public.blog_categories;
create policy "Authaenticated editors can manage blog categories" on public.blog_categories for all to authenticated using (true) with check (true);

insert into public.blog_categories (name, slug) values
  ('Tecnologia', 'tecnologia'), ('Omnichannel', 'omnichannel'),
  ('Automação', 'automacao'), ('Inteligência Artificial', 'inteligencia-artificial'),
  ('WhatsApp para empresas', 'whatsapp-para-empresas'), ('Experiência do Cliente', 'experiencia-do-cliente')
on conflict (slug) do nothing;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('blog-images', 'blog-images', true, 5242880, array['image/jpeg','image/png','image/webp','image/avif'])
on conflict (id) do update set public = true, file_size_limit = 5242880, allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Public can view blog images" on storage.objects;
create policy "Public can view blog images" on storage.objects for select using (bucket_id = 'blog-images');

drop policy if exists "Editors can upload blog images" on storage.objects;
create policy "Editors can upload blog images" on storage.objects for insert to authenticated with check (bucket_id = 'blog-images');

drop policy if exists "Editors can update blog images" on storage.objects;
create policy "Editors can update blog images" on storage.objects for update to authenticated using (bucket_id = 'blog-images');

drop policy if exists "Editors can delete blog images" on storage.objects;
create policy "Editors can delete blog images" on storage.objects for delete to authenticated using (bucket_id = 'blog-images');
