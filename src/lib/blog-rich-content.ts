import type { BlogPost } from "./blog-server";
import type { ArticleDraft } from "./blog-rich-types";
import { editorialA } from "./blog-editorial-a";
import { editorialB } from "./blog-editorial-b";
import { editorialC } from "./blog-editorial-c";

/**
 * Artigos redigidos para o blog CSTI Brasil com base nas temáticas do ZIP.
 * Conteúdo editorial próprio, distinto dos resumos e cards enviados.
 * Sem dependência de CMS para leitura; pode ser substituído por um documento do Sanity com o mesmo slug.
 */
export const richArticles: Record<string, ArticleDraft> = {
  ...editorialA,
  ...editorialB,
  ...editorialC,
};

type ContentBlock = NonNullable<BlogPost["content_blocks"]>[number];

function parseInline(text: string): NonNullable<ContentBlock["children"]> {
  return text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean).map((part) => part.startsWith("**") && part.endsWith("**")
    ? { text: part.slice(2, -2), marks: ["strong"] }
    : { text: part });
}

/** Parser limitado para o Markdown editorial local, sem HTML arbitrário e sem bibliotecas externas. */
export function blocksFromEditorial(markdown: string): ContentBlock[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const result: ContentBlock[] = [];
  let pending: string[] = [];

  const flush = () => {
    const paragraph = pending.join(" ").trim();
    if (paragraph) result.push({ _type: "block", style: "normal", children: parseInline(paragraph) });
    pending = [];
  };

  for (const raw of lines) {
    const line = raw.trim();
    if (!line) { flush(); continue; }
    const heading = line.match(/^(#{2,3})\s+(.+)$/);
    if (heading) {
      flush();
      result.push({ _type: "block", style: heading[1]!.length === 2 ? "h2" : "h3", children: parseInline(heading[2]!) });
      continue;
    }
    const bullet = line.match(/^-\s+(.+)$/);
    if (bullet) {
      flush();
      result.push({ _type: "block", listItem: "bullet", level: 1, children: parseInline(bullet[1]!) });
      continue;
    }
    const numbered = line.match(/^\d+[.)]\s+(.+)$/);
    if (numbered) {
      flush();
      result.push({ _type: "block", listItem: "number", level: 1, children: parseInline(numbered[1]!) });
      continue;
    }
    const quote = line.match(/^>\s+(.+)$/);
    if (quote) {
      flush();
      result.push({ _type: "block", style: "blockquote", children: parseInline(quote[1]!) });
      continue;
    }
    pending.push(line);
  }
  flush();
  return result;
}

export function readingMinutes(text: string): number {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(3, Math.ceil(words / 220));
}
