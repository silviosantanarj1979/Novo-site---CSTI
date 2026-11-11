import { defineField, defineType } from "sanity";

export const blogPost = defineType({
  name: "blogPost",
  title: "Artigo do Blog",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Título do artigo", type: "string", validation: (r) => r.required().max(140) }),
    defineField({ name: "slug", title: "Endereço do artigo (slug)", type: "slug", options: { source: "title", maxLength: 100 }, validation: (r) => r.required() }),
    defineField({ name: "excerpt", title: "Resumo para os cards", type: "text", rows: 3, validation: (r) => r.required().max(320) }),
    defineField({ name: "cover", title: "Imagem de capa", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", title: "Descrição acessível", type: "string" })] }),
    defineField({
      name: "category", title: "Categoria", type: "string", initialValue: "Tecnologia",
      options: { list: ["Tecnologia", "Inteligência Artificial", "WhatsApp API", "Omnichannel", "Automação", "Drogarias e Farmácias", "Governança e LGPD", "Gestão Empresarial"] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "tags", title: "Tags", type: "array", of: [{ type: "string" }], options: { layout: "tags" } }),
    defineField({ name: "publishedAt", title: "Data de publicação", type: "datetime", initialValue: () => new Date().toISOString(), validation: (r) => r.required() }),
    defineField({
      name: "body", title: "Conteúdo completo", type: "array",
      of: [{ type: "block", styles: [{ title: "Normal", value: "normal" }, { title: "Título de seção", value: "h2" }, { title: "Subtítulo", value: "h3" }], lists: [{ title: "Marcadores", value: "bullet" }, { title: "Numeração", value: "number" }] }],
      validation: (r) => r.required().min(1),
    }),
    defineField({ name: "seoTitle", title: "SEO | Título", type: "string", validation: (r) => r.max(70) }),
    defineField({ name: "seoDescription", title: "SEO | Descrição", type: "text", rows: 2, validation: (r) => r.max(170) }),
  ],
  preview: { select: { title: "title", subtitle: "category", media: "cover" } },
  orderings: [{ title: "Mais recentes", name: "dateDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
});
