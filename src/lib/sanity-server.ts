/**
 * Adaptador de leitura do Sanity para o modelo já utilizado no blog CSTI.
 * O Content Lake é consultado somente no servidor; nenhuma credencial vai ao navegador.
 * Não altera o painel /admin (Supabase), que permanece disponível como legado.
 */
import type { BlogPost } from "./blog-server";

type Block = { _type?: string; style?: string; listItem?: string; level?: number; children?: Array<{ text?: string; marks?: string[] }> };
type Doc = {
  _id: string; _createdAt: string; _updatedAt: string;
  title?: string; slug?: string; excerpt?: string; coverUrl?: string | null;
  category?: string; tags?: string[]; publishedAt?: string | null;
  seoTitle?: string | null; seoDescription?: string | null; body?: Block[];
};
const projectId = process.env["SANITY_PROJECT_ID"]?.trim();
const dataset = process.env["SANITY_DATASET"]?.trim() || "production";
const version = "v2025-02-19";
export const sanityConfigured = () => Boolean(projectId);

const projection = '{_id,_createdAt,_updatedAt,title,"slug":slug.current,excerpt,"coverUrl":coalesce(cover.asset->url,coverUrl),category,tags,publishedAt,seoTitle,seoDescription,body}';
const publicFilter = '_type == "blogPost" && defined(slug.current) && (!defined(publishedAt) || publishedAt <= now())';

async function sanityQuery<T>(query: string, slug?: string): Promise<T> {
  if (!projectId || !/^[a-z0-9-]+$/.test(projectId) || !/^[a-zA-Z0-9_-]+$/.test(dataset)) {
    throw new Error("SANITY_PROJECT_ID ou SANITY_DATASET ausente/inválido.");
  }
  const params = new URLSearchParams({ query });
  if (slug !== undefined) params.set("$slug", JSON.stringify(slug));
  const url = "https://" + projectId + ".api.sanity.io/" + version + "/data/query/" + dataset + "?" + params.toString();
  const response = await fetch(url, { headers: { Accept: "application/json" }, cache: "no-store" });
  if (!response.ok) throw new Error("Sanity HTTP " + response.status);
  const data = await response.json() as { result?: T; error?: unknown };
  if (data.result === undefined) throw new Error("Resposta do Sanity sem campo result.");
  return data.result;
}

function toPlainText(blocks: Block[] | undefined): string {
  if (!Array.isArray(blocks)) return "";
  return blocks
    .filter((block) => block._type === "block" && Array.isArray(block.children))
    .map((block) => block.children!.map((child) => child.text || "").join(""))
    .filter(Boolean)
    .join("\n\n");
}

function toPost(doc: Doc): BlogPost {
  return {
    id: doc._id,
    title: doc.title || "Sem título",
    slug: doc.slug || "",
    excerpt: doc.excerpt || "",
    cover_url: doc.coverUrl || null,
    category: doc.category || "Tecnologia",
    tags: Array.isArray(doc.tags) ? doc.tags : [],
    published_at: doc.publishedAt || doc._createdAt,
    status: "published",
    content: toPlainText(doc.body),
    content_blocks: Array.isArray(doc.body) ? doc.body : undefined,
    seo_title: doc.seoTitle || null,
    seo_description: doc.seoDescription || null,
    created_at: doc._createdAt,
    updated_at: doc._updatedAt,
  };
}

export async function listSanityPosts(): Promise<BlogPost[]> {
  const query = "*[" + publicFilter + "] | order(coalesce(publishedAt,_createdAt) desc)" + projection;
  const result = await sanityQuery<Doc[]>(query);
  return (Array.isArray(result) ? result : []).map(toPost);
}

export async function getSanityPost(slug: string): Promise<BlogPost | null> {
  const query = "*[" + publicFilter + ' && slug.current == $slug][0]' + projection;
  const doc = await sanityQuery<Doc | null>(query, slug);
  return doc ? toPost(doc) : null;
}
