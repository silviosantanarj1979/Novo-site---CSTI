import { createFileRoute } from "@tanstack/react-router";
import { sessionFromRequest, slugify, supabaseRequest } from "../../lib/blog-server";

const unauthorized = () => Response.json({ ok: false, error: "Sessão expirada." }, { status: 401 });

export const Route = createFileRoute("/api/admin-posts")({ server: { handlers: {
  GET: async ({ request }) => {
    const token = sessionFromRequest(request); if (!token) return unauthorized();
    const response = await supabaseRequest("/rest/v1/blog_posts?select=*&order=updated_at.desc", {}, token);
    return response.ok ? Response.json({ ok: true, posts: await response.json() }) : unauthorized();
  },
  POST: async ({ request }) => {
    const token = sessionFromRequest(request); if (!token) return unauthorized();
    const body = await request.json() as Record<string, unknown>;
    const title = String(body.title ?? "").trim();
    if (!title) return Response.json({ ok: false, error: "Informe o título." }, { status: 400 });
    const payload = { title, slug: slugify(String(body.slug || title)), excerpt: String(body.excerpt ?? "").trim(), content: String(body.content ?? "").trim(), cover_url: String(body.cover_url ?? "").trim() || null, category: String(body.category ?? "Tecnologia").trim(), tags: String(body.tags ?? "").split(",").map((tag) => tag.trim()).filter(Boolean), status: body.status === "published" ? "published" : "draft", seo_title: String(body.seo_title ?? "").trim() || null, seo_description: String(body.seo_description ?? "").trim() || null };
    const response = await supabaseRequest("/rest/v1/blog_posts", { method: "POST", headers: { Prefer: "return=representation" }, body: JSON.stringify(payload) }, token);
    if (!response.ok) return Response.json({ ok: false, error: "Não foi possível salvar. Verifique se o endereço já existe." }, { status: 400 });
    return Response.json({ ok: true, post: (await response.json())[0] });
  },
} } });
