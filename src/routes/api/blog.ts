import { createFileRoute } from "@tanstack/react-router";
import { supabaseRequest } from "../../lib/blog-server";
import { sanityConfigured, listSanityPosts } from "../../lib/sanity-server";
import { mergeZipWithCmsPosts, zipBlogPosts } from "../../lib/blog-zip-seed";

export const Route = createFileRoute("/api/blog")({
  server: { handlers: {
    GET: async () => {
      try {
        if (sanityConfigured()) {
          const posts = await listSanityPosts();
          return Response.json({ ok: true, posts: mergeZipWithCmsPosts(posts), source: "sanity+zip" });
        }
        const response = await supabaseRequest("/rest/v1/blog_posts?select=id,title,slug,excerpt,cover_url,category,tags,published_at&status=eq.published&published_at=lte.now()&order=published_at.desc");
        if (!response.ok) throw new Error("Supabase HTTP " + response.status);
        const posts = await response.json();
        return Response.json({ ok: true, posts: mergeZipWithCmsPosts(posts), source: "supabase+zip" });
      } catch (error) {
        // Os sete conteúdos do ZIP devem ser exibidos mesmo que o CMS ainda não esteja configurado.
        console.warn("CMS indisponível; utilizando conteúdos do ZIP.", error);
        return Response.json({ ok: true, posts: zipBlogPosts, source: "zip", cmsUnavailable: true });
      }
    },
  } },
});
