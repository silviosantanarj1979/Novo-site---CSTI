export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_url: string | null;
  category: string;
  tags: string[];
  status: "draft" | "published";
  seo_title: string | null;
  seo_description: string | null;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

const config = () => {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const anonKey = process.env.SUPABASE_ANON_KEY;
  if (!url || !anonKey) throw new Error("Supabase do blog ainda não configurado.");
  return { url, anonKey };
};

export const sessionFromRequest = (request: Request) => {
  const cookie = request.headers.get("cookie") ?? "";
  return cookie.match(/(?:^|;\s*)csti_blog_session=([^;]+)/)?.[1]
    ? decodeURIComponent(cookie.match(/(?:^|;\s*)csti_blog_session=([^;]+)/)![1])
    : null;
};

export async function supabaseRequest(path: string, init: RequestInit = {}, accessToken?: string) {
  const { url, anonKey } = config();
  return fetch(`${url}${path}`, {
    ...init,
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${accessToken || anonKey}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
}

export const slugify = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 100);
