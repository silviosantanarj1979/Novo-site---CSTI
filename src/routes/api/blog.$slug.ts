import { createFileRoute } from "@tanstack/react-router";
import { supabaseRequest } from "../../lib/blog-server";
import { sanityConfigured, getSanityPost } from "../../lib/sanity-server";
import { getZipBlogPost } from "../../lib/blog-zip-seed";

export const Route = createFileRoute("/api/blog/$slug")({
  server: { handlers: {
    GET: async ({ params }) => {
      const zipPost = getZipBlogPost(params.slug);
      try {
        if (sanityConfigured()) {
          const post = await getSanityPost(params.slug);
          if (post) return Response.json({ ok: true, post, source: "sanity" });
        } else {
          const response = await supabaseRequest("/rest/v1/blog_posts?select=*&slug=eq." + encodeURIComponent(params.slug) + "&status=eq.published&limit=1");
          if (!response.ok) throw new Error("Supabase HTTP " + response.status);
          const posts = await response.json();
          if (posts[0]) return Response.json({ ok: true, post: posts[0], source: "supabase" });
        }
      } catch (error) {
        console.warn("CMS indisponível ao carregar artigo:", error);
      }
      if (zipPost) return Response.json({ ok: true, post: zipPost, source: "zip" });
      return Response.json({ ok: false, error: "Artigo não encontrado." }, { status: 404 });
    },
  } },
});
