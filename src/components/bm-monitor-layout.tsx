import type { ReactNode } from "react";
import { SiteFooter, SiteHeader } from "./site-shell";

export const BM_LINKS = [
  { href: "/bm-monitor", label: "Apresentação" },
  { href: "/bm-monitor/termos", label: "Termos de uso" },
  { href: "/bm-monitor/privacidade", label: "Privacidade" },
  { href: "/bm-monitor/exclusao-de-dados", label: "Exclusão de dados" },
];

export function BMLayout({ title, eyebrow = "BM MONITOR · CSTI BRASIL", description, children }: { title: string; eyebrow?: string; description?: string; children: ReactNode }) {
  return <div className="bm-page min-h-screen bg-[#06152a] text-white">
    <SiteHeader />
    <main className="mx-auto max-w-6xl px-5 pb-24 pt-32 md:px-10">
      <div className="mb-9 flex flex-wrap items-center gap-3 text-xs text-cyan-100/70">
        <a href="/bm-monitor" className="rounded-full border border-cyan-300/25 bg-cyan-400/10 px-4 py-2 font-semibold tracking-widest text-cyan-300">BM MONITOR</a>
        <span>Produto da CSTI Brasil · Ferramenta independente de monitoramento</span>
      </div>
      <nav aria-label="Navegação BM Monitor" className="mb-12 flex flex-wrap gap-2">
        {BM_LINKS.map(link => <a key={link.href} href={link.href} className="rounded-lg border border-white/15 px-4 py-2 text-sm text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300">{link.label}</a>)}
      </nav>
      <header className="mb-12 max-w-4xl">
        <p className="mb-4 text-xs font-bold uppercase tracking-[.22em] text-cyan-300">{eyebrow}</p>
        <h1 className="text-4xl font-bold leading-tight md:text-6xl">{title}</h1>
        {description && <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-300">{description}</p>}
      </header>
      {children}
    </main>
    <SiteFooter />
  </div>;
}

export function LegalSection({ title, children }: { title: string; children: ReactNode }) {
  return <section className="border-b border-white/10 py-7 last:border-0"><h2 className="mb-3 text-xl font-bold text-white">{title}</h2><div className="space-y-3 leading-7 text-slate-300">{children}</div></section>;
}

export function LegalLinks() {
  return <div className="mt-12 flex flex-wrap gap-4 border-t border-white/15 pt-8 text-sm text-cyan-300">
    {BM_LINKS.map(link => <a key={link.href} href={link.href} className="underline underline-offset-4 hover:text-white">{link.label}</a>)}
  </div>;
}
