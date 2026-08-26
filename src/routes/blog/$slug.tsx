import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BackToTop, SiteFooter, SiteHeader } from "../../components/site-shell";
import type { BlogPost } from "../../lib/blog-server";

export const Route = createFileRoute("/blog/$slug")({ component: ArticlePage });

function ArticlePage() {
  const { slug } = Route.useParams(); const [post, setPost] = useState<BlogPost | null>(null); const [loading, setLoading] = useState(true);
  useEffect(() => { fetch(`/api/blog/${encodeURIComponent(slug)}`).then((r) => r.json()).then((data) => setPost(data.post ?? null)).finally(() => setLoading(false)); }, [slug]);
  if (loading) return <main className="dark article-loading"><SiteHeader/><p>Carregando artigo…</p></main>;
  if (!post) return <main className="dark article-loading"><SiteHeader/><div><h1>Artigo não encontrado.</h1><a className="button" href="/blog">Voltar ao blog</a></div></main>;
  return <main id="inicio" className="article-page"><article><header className="article-hero dark"><SiteHeader/><div className="shell article-title"><p className="eyebrow">{post.category}</p><h1>{post.title}</h1><p>{post.excerpt}</p><small>{post.published_at ? new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(new Date(post.published_at)) : ""}</small></div></header>{post.cover_url && <div className="shell article-cover"><img src={post.cover_url} alt={post.title}/></div>}<div className="shell article-body">{post.content.split(/\n{2,}/).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div></article><section className="article-cta dark"><div className="shell"><h2>Quer aplicar isso à sua operação?</h2><a className="button" href="/contato?origem=blog">Fale com um especialista ↗</a></div></section><SiteFooter/><BackToTop/></main>;
}
