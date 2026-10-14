import { createFileRoute } from "@tanstack/react-router";
import { BMLayout, LegalLinks } from "../components/bm-monitor-layout";

export const Route = createFileRoute("/bm-monitor/")({
  head: () => ({ meta: [
    { title: "BM Monitor | Gestão centralizada de Business Managers | CSTI Brasil" },
    { name: "description", content: "Conheça o BM Monitor: central de acompanhamento de Business Managers, contas WABA, números de WhatsApp, permissões, alertas e dados operacionais disponíveis." },
  ], links: [{ rel: "canonical", href: "https://www.cstibrasil.com.br/bm-monitor" }] }),
  component: BMHome
});

const resources = [
  ["01", "Business Managers em um só lugar", "Organize portfólios empresariais de diferentes titulares, sem exigir que as contas pertençam à CSTI Brasil."],
  ["02", "Contas WABA e números", "Visualize as contas WhatsApp Business e os números que cada empresa autorizar e que estiverem disponíveis por integração."],
  ["03", "Pagamentos e cartões", "Acompanhe informações financeiras acessíveis e possíveis alertas. A substituição de cartões e a execução de pagamentos dependem das permissões e das interfaces disponibilizadas pela Meta ou pelo provedor."],
  ["04", "Mensagens versus custos", "Compare volumes de mensagens enviadas com gastos e informações de cobrança quando esses dados estiverem disponíveis pelas APIs autorizadas."],
  ["05", "Falhas e ocorrências", "Concentre sinais de falha de integração, restrições, expiração de permissões e alertas suportados pelas fontes conectadas."],
  ["06", "Múltiplos provedores", "A conexão com uma BM pode funcionar independentemente do BSP. O acesso a determinadas WABAs, cobranças e métricas pode exigir autorização adicional do provedor."],
];

function BMHome() {
 return <BMLayout title="Suas Business Managers. Uma visão organizada." description="O BM Monitor é uma solução da CSTI Brasil concebida para reunir, em um só ambiente, informações de gestão de portfólios empresariais da Meta e operações do WhatsApp Business Platform — mesmo quando são administradas por diferentes provedores.">
   <div className="grid items-center gap-8 rounded-3xl border border-cyan-300/20 bg-[#0b2542] p-6 md:grid-cols-2 md:p-10">
     <div><img src="/bm-monitor-logo.webp" width="112" height="112" alt="Logotipo do BM Monitor" className="mb-5 h-24 w-24 rounded-2xl object-contain bg-white p-2" /><p className="mb-3 text-sm font-bold tracking-widest text-cyan-300">CENTRAL DE MONITORAMENTO</p><h2 className="text-3xl font-bold leading-tight md:text-4xl">Menos caminhos para consultar. Mais clareza para decidir.</h2><p className="mt-5 leading-7 text-slate-300">Em vez de alternar entre diferentes gerenciadores, o objetivo é oferecer uma visão consolidada da situação das BMs, suas contas e seus indicadores autorizados.</p><div className="mt-7 flex flex-wrap gap-3"><a className="rounded-lg bg-cyan-400 px-5 py-3 font-bold text-slate-950 hover:bg-cyan-300" href="/contato?assunto=BM%20Monitor">Conhecer o BM Monitor ↗</a><a className="rounded-lg border border-white/25 px-5 py-3 font-semibold" href="/bm-monitor/privacidade">Como tratamos os dados</a></div></div>
     <div className="grid gap-4"><div className="rounded-2xl border border-white/10 bg-[#06152a] p-5"><p className="text-xs tracking-widest text-cyan-300">DADOS E INTEGRAÇÕES</p><div className="mt-4 grid grid-cols-2 gap-3">{["Business Managers","Contas WABA","Números","Alertas"].map(s=><div key={s} className="rounded-xl border border-white/10 bg-white/5 p-4"><span className="text-sm font-semibold">{s}</span><p className="mt-2 text-xs text-slate-400">Conforme acesso autorizado</p></div>)}</div></div><div className="rounded-xl border border-amber-400/20 bg-amber-400/5 p-4 text-sm text-slate-300">Apresentação conceitual. Não representa dados conectados nem funcionalidades financeiras já habilitadas.</div></div>
   </div>
   <section className="py-16"><p className="text-sm font-semibold tracking-widest text-cyan-300">PARA QUEM ADMINISTRA VÁRIAS CONTAS</p><h2 className="mt-3 max-w-3xl text-3xl font-bold md:text-4xl">O que a ferramenta foi pensada para centralizar</h2><div className="mt-9 grid gap-4 md:grid-cols-2 lg:grid-cols-3">{resources.map(([n,title,description])=><article key={n} className="rounded-2xl border border-white/10 bg-white/5 p-6"><span className="text-sm font-bold text-cyan-300">{n}</span><h3 className="mt-4 text-lg font-bold">{title}</h3><p className="mt-3 text-sm leading-6 text-slate-300">{description}</p></article>)}</div></section>
   <section className="rounded-2xl border border-white/10 bg-white/5 p-8"><h2 className="text-2xl font-bold">Como funciona a conexão?</h2><p className="mt-4 max-w-4xl leading-7 text-slate-300">Cada organização deverá autorizar o BM Monitor por meio do fluxo oficial da Meta. A plataforma poderá consultar somente os ativos e dados liberados ao aplicativo. A titularidade das BMs permanece com seus respectivos proprietários; não é necessário transferir as contas para a CSTI Brasil.</p><p className="mt-3 text-sm text-slate-400">Recursos, indicadores e disponibilidade dependem da homologação técnica, permissões da Meta e APIs dos provedores envolvidos. O BM Monitor não é um produto oficial da Meta e não é afiliado ou endossado por ela.</p></section>
   <LegalLinks />
 </BMLayout>;
}
