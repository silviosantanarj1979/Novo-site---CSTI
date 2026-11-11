import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { BackToTop, SiteFooter, SiteHeader } from "../../components/site-shell";
import type { BlogPost } from "../../lib/blog-server";
import "../../blog-editorial.css";

export const Route = createFileRoute("/blog/$slug")({ component: ArticlePage });

type ContentBlock = NonNullable<BlogPost["content_blocks"]>[number];
type RelatedPost = Pick<BlogPost, "slug" | "title" | "category">;

const plainText = (block: ContentBlock) => (block.children || []).map((span) => span.text || "").join("");

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
  const blocks = post.content_blocks?.filter((block) => block._type === "block") || [];
  if (!blocks.length) return <>{(post.content || "").split(/\n{2,}/).filter(Boolean).map((paragraph, index) => <p key={index}>{paragraph}</p>)}</>;

  const content: ReactNode[] = [];
  for (let i = 0; i < blocks.length;) {
    const block = blocks[i]!;
    if (block.listItem === "bullet" || block.listItem === "number") {
      const start = i;
      const listType = block.listItem;
      const items: ReactNode[] = [];
      while (i < blocks.length && blocks[i]?.listItem === listType) {
        items.push(<li key={i}><BlockText block={blocks[i]!} /></li>);
        i++;
      }
      content.push(listType === "bullet" ? <ul key={start} className="csti-article-list">{items}</ul> : <ol key={start} className="csti-article-list">{items}</ol>);
      continue;
    }
    if (block.style === "h2") content.push(<h2 key={i} id={"article-section-" + i}>{plainText(block)}</h2>);
    else if (block.style === "h3") content.push(<h3 key={i}><BlockText block={block} /></h3>);
    else if (block.style === "blockquote") content.push(<blockquote key={i}><BlockText block={block} /></blockquote>);
    else content.push(<p key={i}><BlockText block={block} /></p>);
    i++;
  }
  return <>{content}</>;
}

function ArticlePage() {
  const { slug } = Route.useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [related, setRelated] = useState<RelatedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(false);
    setPost(null);
    setImageFailed(false);
    setCopied(false);
    fetch("/api/blog/" + encodeURIComponent(slug), { signal: controller.signal })
      .then(async (response) => {
        if (response.status === 404) return { post: null };
        if (!response.ok) throw new Error("Erro ao carregar artigo");
        return response.json();
      })
      .then((data) => { if (!controller.signal.aborted) setPost(data.post || null); })
      .catch((cause) => { if (!controller.signal.aborted && cause?.name !== "AbortError") setError(true); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [slug]);

  useEffect(() => {
    if (!post) return;
    const controller = new AbortController();
    fetch("/api/blog", { signal: controller.signal })
      .then((response) => response.json())
      .then((data) => {
        if (controller.signal.aborted || !Array.isArray(data.posts)) return;
        const others = (data.posts as RelatedPost[]).filter((item) => item.slug !== post.slug);
        const sameCategory = others.filter((item) => item.category === post.category);
        const differentCategory = others.filter((item) => item.category !== post.category);
        setRelated([...sameCategory, ...differentCategory].slice(0, 3));
      })
      .catch(() => undefined);
    return () => controller.abort();
  }, [post?.slug, post?.category]);

  useEffect(() => {
    if (!post) return;
    document.title = (post.seo_title || post.title) + " | CSTI Brasil";
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", post.seo_description || post.excerpt);
  }, [post]);

  const toc = useMemo(() => {
    const blocks = post?.content_blocks?.filter((block) => block._type === "block") || [];
    return blocks.map((block, i) => ({ block, i })).filter(({ block }) => block.style === "h2")
      .map(({ block, i }) => ({ label: plainText(block), id: "article-section-" + i }));
  }, [post]);

  if (loading) return <main className="dark article-loading"><SiteHeader /><p>Carregando artigo…</p></main>;
  if (error) return <main className="dark article-loading"><SiteHeader /><div><h1>Não foi possível carregar o artigo.</h1><a className="button" href="/blog">Voltar ao blog</a></div></main>;
  if (!post) return <main className="dark article-loading"><SiteHeader /><div><h1>Artigo não encontrado.</h1><a className="button" href="/blog">Voltar ao blog</a></div></main>;

  const dateLabel = post.published_at && !Number.isNaN(new Date(post.published_at).getTime())
    ? new Intl.DateTimeFormat("pt-BR", { dateStyle: "long" }).format(new Date(post.published_at))
    : "";

  return <main id="inicio" className="csti-article-page article-page">
    <article>
      <header className="article-hero dark csti-article-hero">
        <SiteHeader />
        <div className="shell article-title">
          <nav className="csti-article-breadcrumbs" aria-label="Navegação estrutural">
            <a href="/">Início</a><span aria-hidden="true">/</span>
            <a href="/blog">Blog</a><span aria-hidden="true">/</span><span>{post.category}</span>
          </nav>
          <p className="csti-article-category">{post.category}</p>
          <h1>{post.title}</h1>
          <p className="csti-article-deck">{post.excerpt}</p>
          <div className="csti-article-meta">
            <span>Por Equipe Editorial CSTI Brasil</span>
            <span className="csti-meta-dot" aria-hidden="true">·</span>
            <time>{dateLabel}</time>
            {post.reading_minutes && <><span className="csti-meta-dot" aria-hidden="true">·</span><span>{post.reading_minutes} min de leitura</span></>}
          </div>
        </div>
      </header>
      <div className="shell csti-article-cover-area">
        {post.cover_url && !imageFailed
          ? <img className="csti-article-cover-image" src={post.cover_url} alt="" onError={() => setImageFailed(true)} />
          : <div className="csti-article-cover-fallback"><img src="/csti-simbolo-ciano.png" alt="" /></div>}
      </div>

      <div className="shell csti-article-layout">
        <aside className="csti-article-sidebar">
          <div className="csti-article-sidebar-inner">
            {toc.length > 0 && <nav aria-label="Neste artigo">
              <p className="csti-article-aside-label">NESTE ARTIGO</p>
              {toc.map((item) => <a key={item.id} href={"#" + item.id}>{item.label}</a>)}
            </nav>}
            <a className="csti-article-back" href="/blog">← Todos os artigos</a>
          </div>
        </aside>
        <div className="csti-article-main">
          {post.editorial_takeaways?.length ? <section className="csti-article-summary" aria-labelledby="keypoints-heading">
            <p className="csti-article-overline">PARA LER EM UM MINUTO</p>
            <h2 id="keypoints-heading">O que você vai aprender</h2>
            <ul>{post.editorial_takeaways.map((item, index) => <li key={index}>{item}</li>)}</ul>
          </section> : null}
          <div className="article-body csti-article-prose"><ArticleContent post={post} /></div>
          {post.editorial_sources?.length ? <section className="csti-article-sources" aria-labelledby="sources-title">
            <h2 id="sources-title">Fontes e referências</h2>
            <p>Materiais oficiais para aprofundar os pontos técnicos abordados.</p>
            <ul>{post.editorial_sources.map((source) => <li key={source.url}><a href={source.url} target="_blank" rel="noopener noreferrer">{source.label} ↗</a></li>)}</ul>
          </section> : null}
          <div className="csti-article-end">
            <div><span>COMPARTILHE CONHECIMENTO</span><p>Este conteúdo foi útil? Compartilhe com sua equipe.</p></div>
            <button type="button" onClick={() => {
              if (typeof navigator !== "undefined" && navigator.clipboard) {
                navigator.clipboard.writeText(window.location.href).then(() => setCopied(true)).catch(() => setCopied(false));
              }
            }}>{copied ? "Link copiado" : "Copiar link do artigo"}</button>
          </div>
          {related.length > 0 && <section className="csti-article-related" aria-labelledby="related-heading">
            <h2 id="related-heading">Continue explorando</h2>
            <div>{related.map((item) => <a href={"/blog/" + item.slug} key={item.slug}><span>{item.category}</span><strong>{item.title}</strong><small>Ler artigo ↗</small></a>)}</div>
          </section>}
        </div>
      </div>
    </article>
    <section className="article-cta dark csti-article-cta"><div className="shell"><h2>Quer aplicar isso à sua operação?</h2><a className="button" href="/contato?origem=blog">Fale com um especialista ↗</a></div></section>
    <SiteFooter />
    <BackToTop />
  </main>;
}
