import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { BackToTop, SiteFooter, SiteHeader } from "../../components/site-shell";
import type { BlogPost } from "../../lib/blog-server";
import "../../blog-editorial.css";

type PostCard = Pick<BlogPost, "id" | "title" | "slug" | "excerpt" | "cover_url" | "category" | "tags" | "published_at">;

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog CSTI Brasil | Tecnologia, IA e Atendimento" },
      { name: "description", content: "Artigos sobre WhatsApp API, omnichannel, automação, inteligência artificial e gestão empresarial. Conhecimento para operações mais eficientes." },
      { property: "og:title", content: "Blog CSTI Brasil" },
      { property: "og:description", content: "Tecnologia e comunicação para negócios que querem evoluir." },
    ],
    links: [{ rel: "canonical", href: "https://cstibrasil.com.br/blog" }],
  }),
  component: BlogPage,
});

const dateLabel = (date?: string | null) => {
  if (!date) return "";
  const parsed = new Date(date);
  return Number.isNaN(parsed.getTime()) ? "" : new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric" }).format(parsed);
};

function ArticleImage({ post, priority = false }: { post: PostCard; priority?: boolean }) {
  return post.cover_url
    ? <img src={post.cover_url} alt="" loading={priority ? "eager" : "lazy"} />
    : <div className="csti-blog-placeholder"><img src="/csti-simbolo-ciano.png" alt="" /></div>;
}

function BlogPage() {
  const [posts, setPosts] = useState<PostCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [category, setCategory] = useState("Todas");
  const [search, setSearch] = useState("");
  const [visibleCount, setVisibleCount] = useState(9);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/blog", { signal: controller.signal })
      .then(async (response) => {
        if (!response.ok) throw new Error("Não foi possível carregar o blog.");
        return response.json();
      })
      .then((data) => { if (!controller.signal.aborted) setPosts(Array.isArray(data.posts) ? data.posts : []); })
      .catch((error) => { if (!controller.signal.aborted && error?.name !== "AbortError") setHasError(true); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, []);

  const categories = useMemo(() => ["Todas", ...Array.from(new Set(posts.map((post) => post.category).filter(Boolean)))], [posts]);
  const featured = posts[0];
  const filtered = useMemo(() => posts.filter((post) => {
    const matchesCategory = category === "Todas" || post.category === category;
    const haystack = [post.title, post.excerpt, post.category, ...(post.tags || [])].join(" ").toLocaleLowerCase("pt-BR");
    return matchesCategory && haystack.includes(search.trim().toLocaleLowerCase("pt-BR"));
  }), [posts, search, category]);
  const latest = filtered.slice(0, visibleCount);

  return (
    <main id="inicio" className="csti-blog-page">
      <section className="csti-blog-banner dark">
        <SiteHeader />
        <div className="shell csti-blog-banner-content">
          <span className="csti-blog-kicker">CSTI BRASIL / CONTEÚDO & INOVAÇÃO</span>
          <h1>Ideias que conectam.<br /><span>Tecnologia que transforma.</span></h1>
          <p>Notícias, tendências e orientações práticas para empresas que querem melhorar a comunicação e o atendimento.</p>
        </div>
      </section>

      {featured && !search && category === "Todas" && (
        <section className="csti-blog-featured dark" aria-label="Artigo em destaque">
          <div className="shell csti-blog-featured-grid">
            <a className="csti-blog-featured-image" href={"/blog/" + featured.slug}><ArticleImage post={featured} priority /></a>
            <div className="csti-blog-featured-body">
              <span className="csti-blog-kicker">EM DESTAQUE · {featured.category}</span>
              <h2><a href={"/blog/" + featured.slug}>{featured.title}</a></h2>
              <p>{featured.excerpt}</p>
              <div className="csti-blog-featured-bottom"><time>{dateLabel(featured.published_at)}</time><a href={"/blog/" + featured.slug}>Ler artigo <span aria-hidden="true">↗</span></a></div>
            </div>
          </div>
        </section>
      )}

      <section className="csti-blog-editorial shell" aria-label="Artigos publicados">
        <div className="csti-blog-topline">
          <div>
            <span className="csti-blog-kicker dark-text">EDITORIAL CSTI BRASIL</span>
            <h2>Artigos e análises</h2>
          </div>
          <label className="csti-blog-search">
            <span className="sr-only">Buscar artigos</span>
            <span aria-hidden="true">⌕</span>
            <input value={search} onChange={(event) => { setSearch(event.target.value); setVisibleCount(9); }} placeholder="Buscar no blog" type="search" />
          </label>
        </div>
        <nav className="csti-blog-categories" aria-label="Categorias do blog">
          {categories.map((item) => (
            <button key={item} type="button" className={item === category ? "active" : ""} onClick={() => { setCategory(item); setVisibleCount(9); }} aria-pressed={item === category}>{item}</button>
          ))}
        </nav>

        {loading ? <p className="csti-blog-feedback" role="status">Carregando publicações…</p> :
          hasError ? <div className="csti-blog-feedback" role="alert"><strong>Não foi possível carregar os artigos.</strong><p>Tente novamente em alguns instantes.</p></div> :
          posts.length === 0 ? <div className="csti-blog-feedback"><strong>Novos conteúdos em preparação.</strong><p>Em breve, artigos e análises da CSTI Brasil estarão disponíveis aqui.</p></div> :
          latest.length === 0 ? <div className="csti-blog-feedback"><strong>Nenhum artigo encontrado.</strong><p>Experimente outra busca ou categoria.</p></div> :
          <>
            <div className="csti-blog-cards">
              {latest.map((post) => (
                <article className="csti-blog-tile" key={post.id}>
                  <a className="csti-blog-tile-image" href={"/blog/" + post.slug} aria-label={"Ler " + post.title}><ArticleImage post={post} /></a>
                  <div className="csti-blog-tile-copy">
                    <div className="csti-blog-tile-meta"><span>{post.category}</span><time>{dateLabel(post.published_at)}</time></div>
                    <h3><a href={"/blog/" + post.slug}>{post.title}</a></h3>
                    <p>{post.excerpt}</p>
                    <a className="csti-blog-read" href={"/blog/" + post.slug}>Continuar lendo <span aria-hidden="true">↗</span></a>
                  </div>
                </article>
              ))}
            </div>
            {filtered.length > visibleCount && <button className="csti-blog-more" type="button" onClick={() => setVisibleCount((value) => value + 9)}>Carregar mais artigos <span aria-hidden="true">↓</span></button>}
          </>
        }
      </section>

      <section className="csti-blog-cta dark">
        <div className="shell">
          <div><span className="csti-blog-kicker">CSTI BRASIL</span><h2>Transforme conhecimento em resultado.</h2><p>Conheça nossas soluções em comunicação, automação e inteligência artificial.</p></div>
          <a className="button" href="/contato?origem=blog">Fale com um especialista <span aria-hidden="true">↗</span></a>
        </div>
      </section>
      <SiteFooter />
      <BackToTop />
    </main>
  );
}
