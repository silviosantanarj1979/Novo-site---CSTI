import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BackToTop, SiteFooter, SiteHeader } from "../../components/site-shell";
import type { BlogPost } from "../../lib/blog-server";

type PostCard = Pick<BlogPost, "id" | "title" | "slug" | "excerpt" | "cover_url" | "category" | "tags" | "published_at">;

export const Route = createFileRoute("/blog/")({
  head: () => ({ meta: [{ title: "Conteúdos sobre tecnologia e atendimento | Blog CSTI Brasil" }, { name: "description", content: "Estratégias, tendências e aplicações de omnichannel, WhatsApp, automação e inteligência artificial para empresas." }], links: [{ rel: "canonical", href: "https://cstibrasil.com.br/blog" }] }),
  component: BlogPage,
});

function BlogPage() {
  const [posts, setPosts] = useState<PostCard[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => { fetch("/api/blog").then((r) => r.json()).then((data) => setPosts(data.posts ?? [])).finally(() => setLoading(false)); }, []);
  return <main id="inicio" className="blog-page"><section className="blog-hero dark"><SiteHeader/><div className="shell"><p className="eyebrow">CONHECIMENTO CSTI</p><h1>Ideias para operações que querem <span>evoluir.</span></h1><p className="lead">Conteúdo editorial sobre comunicação, atendimento, automação, inteligência artificial e transformação digital.</p></div></section><section className="section"><div className="shell"><div className="blog-heading"><div><p className="eyebrow ink">ARTIGOS E ANÁLISES</p><h2>Conteúdo com contexto.<br/><em>Sem respostas genéricas.</em></h2></div></div>{loading ? <p className="blog-state">Carregando publicações…</p> : posts.length === 0 ? <div className="blog-empty"><strong>O conteúdo está sendo preparado.</strong><p>Em breve, novos artigos da CSTI Brasil estarão disponíveis aqui.</p></div> : <div className="blog-grid">{posts.map((post, index) => <a className={`blog-card ${index === 0 ? "featured" : ""}`} href={`/blog/${post.slug}`} key={post.id}>{post.cover_url ? <img src={post.cover_url} alt="" loading={index ? "lazy" : "eager"}/> : <div className="blog-card-symbol"><img src="/csti-simbolo-ciano.png" alt=""/></div>}<div className="blog-card-copy"><span>{post.category}</span><h3>{post.title}</h3><p>{post.excerpt}</p><small>{post.published_at ? new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(new Date(post.published_at)) : ""} · Ler artigo ↗</small></div></a>)}</div>}</div></section><SiteFooter/><BackToTop/></main>;
}
