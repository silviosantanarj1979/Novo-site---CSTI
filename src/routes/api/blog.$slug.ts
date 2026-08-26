import { createFileRoute } from "@tanstack/react-router";
import { supabaseRequest } from "../../lib/blog-server";

export const Route = createFileRoute("/api/blog/$slug")({
  server: { handlers: {
    GET: async ({ params }) => {
      try {
        const response = await supabaseRequest(`/rest/v1/blog_posts?select=*&slug=eq.${encodeURIComponent(params.slug)}&status=eq.published&limit=1`);
        const posts = response.ok ? await response.json() : [];
        return posts[0] ? Response.json({ ok: true, post: posts[0] }) : Response.json({ ok: false, error: "Artigo não encontrado." }, { status: 404 });
      } catch (error) {
        console.error("Erro ao carregar artigo:", error);
        return Response.json({ ok: false, error: "Artigo indisponível." }, { status: 503 });
      }
    },
  } },
});
