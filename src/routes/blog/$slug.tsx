import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { BackToTop, SiteFooter, SiteHeader } from "../../components/site-shell";
import type { BlogPost } from "../../lib/blog-server";

export const Route = createFileRoute("/blog/$slug")({ component: ArticlePage });

type ContentBlock = NonNullable<BlogPost["content_blocks"]>[number];

function BlockText({ block }: { block: ContentBlock }) {
  return <>{block.children?.map((span, index) => {
    let content: ReactNode = span.text || "";
    if (span.marks?.includes("strong")) content = <strong>{content}</strong>;
    if (span.marks?.includes("em")) content = <em>{content}</em>;
    if (span.marks?.includes("code")) content = <code>{content}</code>;
    return <span key={index}>{content}</span>;
  })}</>;
}

function ArticleContent({ post }: { post: BlogPost }) {
  if (post.content_blocks?.length) return <>
    {post.content_blocks.filter((block) => block._type === "block").map((block, index) => {
      const children = <BlockText block={block} />;
      if (block.listItem === "bullet") return <ul className="article-list" key={index}><li>{children}</li></ul>;
      if (block.listItem === "number") return <ol className="article-list" key={index}><li>{children}</li></ol>;
      if (block.style === "h2") return <h2 key={index}>{children}</h2>;
      if (block.style === "h3") return <h3 key={index}>{children}</h3>;
      return <p key={index}>{children}</p>;
    })}
  </>;
  return <>{(post.content || "").split(/\n{2,}/).filter(Boolean).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</>;
}

function ArticlePage() {
  const { slug } = Route.useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(false);
    fetch("/api/blog/" + encodeURIComponent(slug), { signal: controller.signal })
      .then(async (r) => { if (r.status === 404) return { post: null }; if (!r.ok) throw new Error("Erro de leitura"); return r.json(); })
      .then((data) => { if (!controller.signal.aborted) setPost(data.post || null); })
      .catch((e) => { if (!controller.signal.aborted && e.name !== "AbortError") setError(true); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [slug]);

  useEffect(() => {
    if (post) {
      document.title = (post.seo_title || post.title) + " | CSTI Brasil";
      const meta = document.querySelector('meta[name="description"]');
      if (meta && (post.seo_description || post.excerpt)) meta.setAttribute("content", post.seo_description || post.excerpt);
    }
  }, [post]);

  if (loading) return <main className="dark article-loading"><SiteHeader /><p>Carregando artigo…</p></main>;
  if (error) return <main className="dark article-loading"><SiteHeader /><div><h1>Artigo indisponível.</h1><a className="button" href="/blog">Voltar ao blog</a></div></main>;
  if (!post) return <main className="dark article-loading"><SiteHeader /><div><h1>Artigo não encontrado.</h1><a className="button" href="/blog">Voltar ao blog</a></div></main>;

  const dateLabel = post.published_at && !Number.isNaN(new Date(post.published_at).getTime())
    ? new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(new Date(post.published_at))
    : "";

  return <main id="inicio" className="article-page">
    <article>
      <header className="article-hero dark">
        <SiteHeader />
        <div className="shell article-title">
          <a className="article-back-link" href="/blog">← Voltar ao blog</a>
          <p className="eyebrow">{post.category}</p>
          <h1>{post.title}</h1>
          <p>{post.excerpt}</p>
          <small>{dateLabel}</small>
        </div>
      </header>
      {post.cover_url && <div className="shell article-cover"><img src={post.cover_url} alt={post.title} /></div>}
      <div className="shell article-body">
        {post.sample_from_zip ? <div className="article-preview-note">
          <strong>Prévia editorial importada do arquivo ZIP</strong>
          <p>Este conteúdo foi recuperado do modelo enviado, que inclui título, resumo, categoria e imagem, mas não fornece o texto completo da matéria. O conteúdo integral poderá ser publicado pelo Sanity quando estiver disponível.</p>
        </div> : <ArticleContent post={post} />}
      </div>
    </article>
    <section className="article-cta dark"><div className="shell"><h2>Quer aplicar isso à sua operação?</h2><a className="button" href="/contato?origem=blog">Fale com um especialista ↗</a></div></section>
    <SiteFooter />
    <BackToTop />
  </main>;
}
