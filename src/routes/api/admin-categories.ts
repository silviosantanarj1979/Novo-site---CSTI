import { createFileRoute } from "@tanstack/react-router";
import { sessionFromRequest, slugify, supabaseRequest } from "../../lib/blog-server";

const unauthorized = () => Response.json({ ok: false, error: "Sessão expirada." }, { status: 401 });
export const Route = createFileRoute("/api/admin-categories")({ server: { handlers: {
  GET: async ({ request }) => { const token = sessionFromRequest(request); if (!token) return unauthorized(); const response = await supabaseRequest("/rest/v1/blog_categories?select=*&order=name.asc", {}, token); return response.ok ? Response.json({ ok: true, categories: await response.json() }) : Response.json({ ok: false, error: "Atualize o banco de categorias." }, { status: 503 }); },
  POST: async ({ request }) => { const token = sessionFromRequest(request); if (!token) return unauthorized(); const { name: rawName } = await request.json() as { name?: string }; const name = String(rawName ?? "").trim().slice(0, 80); if (name.length < 2) return Response.json({ ok: false, error: "Informe o nome da categoria." }, { status: 400 }); const response = await supabaseRequest("/rest/v1/blog_categories", { method: "POST", headers: { Prefer: "return=representation" }, body: JSON.stringify({ name, slug: slugify(name) }) }, token); return response.ok ? Response.json({ ok: true, category: (await response.json())[0] }) : Response.json({ ok: false, error: "Essa categoria já existe." }, { status: 400 }); },
} } });
