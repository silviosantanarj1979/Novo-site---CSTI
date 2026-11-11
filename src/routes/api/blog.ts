import { createFileRoute } from "@tanstack/react-router";
import type { BlogPost } from "../../lib/blog-server";
import { supabaseRequest } from "../../lib/blog-server";
import { sanityConfigured, listSanityPosts } from "../../lib/sanity-server";
import { mergeZipWithCmsPosts, zipBlogPosts } from "../../lib/blog-zip-seed";

/** API leve para a listagem: o corpo completo fica somente em /api/blog/:slug. */
const toCards = (posts: BlogPost[]) => posts.map((post) => ({
  id: post.id,
  title: post.title,
  slug: post.slug,
  excerpt: post.excerpt,
  cover_url: post.cover_url,
  category: post.category,
  tags: post.tags,
  published_at: post.published_at,
  featured: post.featured || false,
  reading_minutes: post.reading_minutes || undefined,
}));

export const Route = createFileRoute("/api/blog")({
  server: { handlers: {
    GET: async () => {
      try {
        if (sanityConfigured()) {
          const posts = await listSanityPosts();
          return Response.json({ ok: true, posts: toCards(mergeZipWithCmsPosts(posts)), source: "sanity+editorial" });
        }
        const response = await supabaseRequest("/rest/v1/blog_posts?select=id,title,slug,excerpt,cover_url,category,tags,published_at&status=eq.published&published_at=lte.now()&order=published_at.desc");
        if (!response.ok) throw new Error("Supabase HTTP " + response.status);
        const posts = await response.json() as BlogPost[];
        return Response.json({ ok: true, posts: toCards(mergeZipWithCmsPosts(posts)), source: "supabase+editorial" });
      } catch (error) {
        console.warn("CMS indisponível; utilizando artigos editoriais locais.", error);
        return Response.json({ ok: true, posts: toCards(zipBlogPosts), source: "editorial", cmsUnavailable: true });
      }
    },
  } },
});
