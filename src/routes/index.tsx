import { createFileRoute } from "@tanstack/react-router";
import logoAsset from "@/assets/csti-logo.png.asset.json";
import estrategiaAsset from "@/assets/estrategia-csti-v1.png.asset.json";
import heroAsset from "@/assets/hero-operacao-csti-v1.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "CSTI Brasil | Tecnologia para Comunicação Assertiva" },
    { name: "description", content: "Omnichannel, automação, inteligência artificial e integrações para estruturar a comunicação empresarial." },
    { property: "og:title", content: "CSTI Brasil | Tecnologia para Comunicação Assertiva" },
    { property: "og:description", content: "Tecnologia para conectar empresas, pessoas e canais com mais clareza e governança." },
    { property: "og:type", content: "website" },
    { property: "og:image", content: heroAsset.url },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: heroAsset.url },
  ]}),
  component: Home,
});

const pillars = [
  ["01","Omnichannel","Canais, equipes e históricos organizados em uma mesma operação."],
  ["02","Inteligência Artificial","Agentes inteligentes e IA generativa aplicados com contexto."],
  ["03","Automação","Fluxos, processos e jornadas desenhados para ganhar consistência."],
  ["04","Comunicação Empresarial","WhatsApp, Instagram, Messenger, Telegram, WebChat e voz."],
  ["05","Integrações","APIs conectando CRM, ERP, sistemas e dados da sua empresa."],
  ["06","Consultoria","Diagnóstico, conformidade e estruturação tecnológica da operação."],
];
const segments = ["Varejo","Drogarias e Farmácias","Serviços","Saúde","Educação","Empresas","Setor Público"];
const Arrow = () => <span aria-hidden="true">↗</span>;
const Brand = () => <img className="brand" src={logoAsset.url} alt="CSTI Brasil" />;

function Header() {
  return <header className="site-header">
    <a href="#inicio" aria-label="CSTI Brasil — página inicial"><Brand /></a>
    <nav className="desktop-nav" aria-label="Navegação principal"><a href="#solucoes">Soluções</a><a href="#tecnologia">Tecnologia</a><a href="#segmentos">Segmentos</a><a href="#consultoria">Consultoria</a><a href="#empresa">CSTI Brasil</a></nav>
    <div className="header-actions"><a href="#cliente">Área do Cliente</a><a className="button small" href="#contato">Fale com um especialista <Arrow /></a></div>
    <details className="mobile-menu"><summary aria-label="Abrir menu"><i></i><i></i></summary><nav><a href="#solucoes">Soluções</a><a href="#tecnologia">Tecnologia</a><a href="#segmentos">Segmentos</a><a href="#consultoria">Consultoria</a><a href="#empresa">CSTI Brasil</a><a href="#contato">Fale com um especialista</a></nav></details>
  </header>;
}

function Home() {
  return <main id="inicio">
    <section className="hero dark" style={{ backgroundImage: `linear-gradient(90deg,#07131ff2 0%,#07131fdc 36%,#07131f4d 68%,#07131f18 100%),url('${heroAsset.url}')` }}><Header /><div className="hero-layout shell"><div className="hero-copy"><p className="eyebrow">TECNOLOGIA · AUTOMAÇÃO · INTELIGÊNCIA</p><h1>Tecnologia para uma comunicação mais assertiva<span>\u2063</span></h1><p className="lead">Omnichannel, automação, inteligência artificial e integrações conectando empresas, pessoas e canais.</p><div className="actions"><a className="button" href="#solucoes">Conheça nossas soluções <Arrow /></a><a className="text-link" href="#contato">Fale com um especialista <Arrow /></a></div></div></div></section>
    <section className="capability-band dark"><div className="shell"><p>Conectamos tecnologia e comunicação para gerar valor real aos negócios.</p>{[["01","Estratégia e consultoria"],["02","Plataformas e tecnologia"],["03","Implementação e integrações"],["04","Suporte e evolução"]].map(([n,t])=><div key={n}><div><span>{n}</span><strong>{t}</strong></div></div>)}</div></section>

    <section className="thesis section shell" id="empresa"><div><p className="eyebrow ink">COMUNICAÇÃO NÃO É APENAS UM CANAL</p><h2>Não basta estar presente.<br/>É preciso estar conectado.</h2></div><div className="big-copy"><p>Pessoas, canais, dados, automações e inteligência precisam trabalhar dentro da mesma estratégia de comunicação.</p><div className="converge"><i></i><i></i><i></i><b>CSTI</b></div></div></section>

    <section className="editorial section"><div className="shell editorial-grid"><div><p className="eyebrow ink">TECNOLOGIA QUE AMPLIFICA RELAÇÕES</p><h2>Soluções completas para comunicações inteligentes.</h2><p className="body">Da estratégia à operação, integramos soluções que conectam pessoas, canais e sistemas com mais clareza, eficiência e humanidade.</p><ul><li>Atendimento omnichannel e experiências consistentes</li><li>Automação e IA aplicadas à operação</li><li>Integrações seguras com sistemas e dados</li></ul><a className="text-link dark-link" href="#solucoes">Explore o ecossistema CSTI <Arrow /></a></div><div className="editorial-image"><img src={estrategiaAsset.url} alt="Equipe desenvolvendo uma estratégia de comunicação integrada"/><span>ESTRATÉGIA · TECNOLOGIA · OPERAÇÃO</span></div></div></section>

    <section className="ecosystem section" id="solucoes"><div className="shell"><div className="heading"><p className="eyebrow ink">ECOSSISTEMA CSTI</p><h2>Uma estrutura.<br/>Múltiplas capacidades.</h2><p>A tecnologia certa não isola ferramentas. Ela organiza o fluxo completo da comunicação.</p></div><div className="pillars">{pillars.map(([n,t,d])=><article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p><Arrow /></article>)}</div></div></section>

    <section className="ai dark section" id="tecnologia"><div className="shell split"><div><p className="eyebrow">INTELIGÊNCIA APLICADA</p><h2>Inteligência que entende o contexto.</h2><p className="body">IA generativa aplicada ao pré-atendimento, qualificação, suporte, conhecimento e automação de processos.</p></div><ol>{["Mensagem do cliente","Identificação da intenção","Contexto e base de conhecimento","Agente de IA","Ação ou atendimento"].map((x,i)=><li key={x}><span>0{i+1}</span><strong>{x}</strong></li>)}</ol></div></section>

    <section className="manifesto section"><div className="shell"><p>A tecnologia conecta os canais.</p><p>A estratégia conecta as pessoas.</p><strong>CSTI Brasil — Tecnologia para Comunicação Assertiva.</strong></div></section>

    <section className="segments section" id="segmentos"><div className="shell"><div className="heading"><p className="eyebrow ink">SOLUÇÕES POR SEGMENTO</p><h2>Tecnologia adaptada à realidade da sua operação.</h2><p>Cada mercado tem jornadas, canais e desafios próprios. A CSTI estrutura soluções específicas para cada contexto.</p></div><div className="segment-cards">{segments.map((x,i)=><a href="#contato" key={x}><span>0{i+1}</span><h3>{x}</h3><p>Conhecer o segmento</p><Arrow /></a>)}</div></div></section>

    <section className="consulting section" id="consultoria"><div className="shell split"><div><p className="eyebrow ink">ESTRUTURA E GOVERNANÇA</p><h2>Tecnologia sem estratégia é apenas ferramenta.</h2><p className="body">Analisamos canais, processos, documentação, atendimento e infraestrutura para identificar como a tecnologia pode ser aplicada à operação.</p><a className="text-link dark-link" href="#contato">Conheça nossa consultoria <Arrow /></a></div><div className="architecture">{["Diagnóstico","Processos","Ambiente Meta","Automação","Governança","Integrações"].map((x,i)=><div key={x}><span>0{i+1}</span><strong>{x}</strong></div>)}</div></div></section>

    <section className="final dark" id="contato"><div className="shell"><p className="eyebrow">PRÓXIMO PASSO</p><h2>Sua empresa já se comunica.<br/>Nós ajudamos a transformar isso em estrutura.</h2><a className="button" href="mailto:contato@cstibrasil.com.br">Fale com um especialista <Arrow /></a></div></section><Footer />
  </main>;
}

function Footer(){return <footer className="footer dark"><div className="shell footer-grid"><div><Brand/><p>Tecnologia para Comunicação Assertiva.</p></div><div><strong>Soluções</strong><a href="#solucoes">Omnichannel</a><a href="#tecnologia">Inteligência Artificial</a><a href="#consultoria">Automação e Integrações</a></div><div><strong>Empresa</strong><a href="#empresa">CSTI Brasil</a><a href="#segmentos">Segmentos</a><a href="#consultoria">Consultoria</a></div><div><strong>Legal</strong><a href="#privacidade">Privacidade</a><a href="#termos">Termos de Uso</a><a href="#lgpd">LGPD</a></div></div><div className="shell footer-bottom"><span>© 2026 CSTI Brasil</span><span>Brasil · Tecnologia e Comunicação</span></div></footer>}