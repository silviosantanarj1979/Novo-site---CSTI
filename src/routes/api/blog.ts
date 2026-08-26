import { createFileRoute } from "@tanstack/react-router";
import { supabaseRequest } from "../../lib/blog-server";

export const Route = createFileRoute("/api/blog")({
  server: { handlers: {
    GET: async () => {
      try {
        const response = await supabaseRequest("/rest/v1/blog_posts?select=id,title,slug,excerpt,cover_url,category,tags,published_at&status=eq.published&published_at=lte.now()&order=published_at.desc");
        if (!response.ok) throw new Error(await response.text());
        return Response.json({ ok: true, posts: await response.json() });
      } catch (error) {
        console.error("Erro ao carregar blog:", error);
        return Response.json({ ok: false, posts: [], error: "Blog temporariamente indisponível." }, { status: 503 });
      }
    },
  } },
});
