/**
 * Títulos e capas preservados do blog.zip, agora com artigos editoriais originais
 * desenvolvidos pela CSTI Brasil para leitura integral. O conteúdo não foi enviado
 * dentro do ZIP: foi redigido e enriquecido nesta atualização.
 * Os documentos podem ser substituídos no futuro pelo Sanity com o mesmo slug.
 */
import type { BlogPost } from "./blog-server";
import { blocksFromEditorial, readingMinutes, richArticles } from "./blog-rich-content";

const images = {
  ops: "https://cdn.magicpatterns.com/patterns/generated-images/f575d64c-ee61-40c4-a34f-f2ccfbfd7c46.jpg",
  phone: "https://cdn.magicpatterns.com/patterns/generated-images/57184162-06f9-47fb-a770-4fdaeb92e9a3.jpg",
  pharmacy: "https://cdn.magicpatterns.com/patterns/generated-images/86ec8601-790d-4b85-b966-5425802a7287.jpg",
  servers: "https://cdn.magicpatterns.com/patterns/generated-images/fdcec0ff-496c-4ea3-a5e1-f8925476abb5.jpg",
};
type ZipEntry = Pick<BlogPost, "slug" | "title" | "excerpt" | "category" | "tags"> & {
  cover: string;
  date: string;
  readingMinutes: number;
  featured?: boolean;
};

export const zipCategoryDetails = [
  { slug: "inteligencia-artificial", title: "Inteligência Artificial", description: "Agentes, modelos e IA aplicada ao atendimento e à operação." },
  { slug: "whatsapp-api", title: "WhatsApp API", description: "API oficial da Meta, templates, verificação e boas práticas." },
  { slug: "omnichannel", title: "Omnichannel", description: "Canais, filas e históricos integrados numa única operação." },
  { slug: "automacao", title: "Automação", description: "Fluxos, integrações e processos que rodam sozinhos." },
  { slug: "farmacias", title: "Farmácias", description: "Do WhatsApp ao balcão: tecnologia para drogarias." },
  { slug: "governanca", title: "Governança & LGPD", description: "Segurança, rastreabilidade e conformidade de dados." },
] as const;

const zipEntries: ZipEntry[] = [
  {
    slug: "agentes-de-ia-no-atendimento",
    title: "Agentes de IA no atendimento: o que muda quando o bot passa a entender contexto",
    excerpt: "Chatbots de árvore de decisão resolvem perguntas. Agentes resolvem problemas. Veja como estruturar conhecimento, regras e limites antes de colocar IA na linha de frente.",
    cover: images.ops, category: "Inteligência Artificial", tags: ["agentes-ia", "chatbot", "atendimento"],
    date: "2025-05-12", readingMinutes: 9, featured: true,
  },
  {
    slug: "whatsapp-api-oficial-guia",
    title: "WhatsApp API oficial: guia completo para sair do número pessoal",
    excerpt: "Verificação, mensagens de template, regras atuais de cobrança e o que muda na rotina de uma operação profissional.",
    cover: images.phone, category: "WhatsApp API", tags: ["meta-business", "templates"],
    date: "2025-05-08", readingMinutes: 12,
  },
  {
    slug: "farmacias-whatsapp-balcao",
    title: "Do WhatsApp ao balcão: como drogarias estão unificando o atendimento",
    excerpt: "Pedidos, receitas e retirada com o mesmo histórico, do primeiro \"oi\" ao caixa.",
    cover: images.pharmacy, category: "Farmácias", tags: ["varejo", "atendimento"],
    date: "2025-05-02", readingMinutes: 7,
  },
  {
    slug: "integracoes-crm-erp",
    title: "Integrações que importam: CRM, ERP e atendimento na mesma conversa",
    excerpt: "Quais dados devem acompanhar a jornada e como evitar integrações frágeis.",
    cover: images.servers, category: "Automação", tags: ["integracoes", "crm"],
    date: "2025-04-28", readingMinutes: 8,
  },
  {
    slug: "lgpd-no-whatsapp",
    title: "LGPD no WhatsApp: consentimento, retenção e trilha de auditoria",
    excerpt: "O mínimo que toda operação precisa documentar antes de escalar canais digitais.",
    cover: images.servers, category: "Governança & LGPD", tags: ["lgpd", "atendimento"],
    date: "2025-04-22", readingMinutes: 6,
  },
  {
    slug: "filas-e-departamentos",
    title: "Filas e departamentos: o desenho que evita cliente perdido entre setores",
    excerpt: "Regras de distribuição, SLAs e transferências sem perder o histórico.",
    cover: images.ops, category: "Omnichannel", tags: ["atendimento", "nps"],
    date: "2025-04-15", readingMinutes: 5,
  },
  {
    slug: "templates-que-convertem",
    title: "12 modelos de WhatsApp para atendimento e vendas: como usar corretamente",
    excerpt: "Modelos prontos para confirmação, recuperação de carrinho e pesquisa de satisfação.",
    cover: images.phone, category: "WhatsApp API", tags: ["templates", "varejo"],
    date: "2025-04-09", readingMinutes: 10,
  },
];

export const zipBlogPosts: BlogPost[] = zipEntries.map((entry) => {
  const editorial = richArticles[entry.slug];
  if (!editorial) throw new Error("Falta artigo completo: " + entry.slug);
  return {
  id: "zip-" + entry.slug,
  slug: entry.slug,
  title: entry.title,
  excerpt: entry.excerpt,
  content: editorial.body,
  content_blocks: blocksFromEditorial(editorial.body),
  editorial_takeaways: editorial.takeaways,
  editorial_sources: editorial.sources,
  editorial_updated_at: "2026-11-11",
  cover_url: entry.cover,
  category: entry.category,
  tags: entry.tags,
  status: "published",
  seo_title: null,
  seo_description: null,
  published_at: "2026-11-11T12:00:00.000Z",
  created_at: entry.date + "T12:00:00.000Z",
  updated_at: entry.date + "T12:00:00.000Z",
  sample_from_zip: false,
  reading_minutes: readingMinutes(editorial.body),
  featured: Boolean(entry.featured),
  };
});

export const getZipBlogPost = (slug: string) => zipBlogPosts.find((post) => post.slug === slug) ?? null;

/** Prioriza itens reais do CMS e mantém todas as prévias do ZIP sem duplicar slugs. */
export function mergeZipWithCmsPosts(posts: BlogPost[]): BlogPost[] {
  const normalized = Array.isArray(posts) ? posts : [];
  const existing = new Set(normalized.map((post) => post.slug));
  return [...normalized, ...zipBlogPosts.filter((post) => !existing.has(post.slug))];
}
