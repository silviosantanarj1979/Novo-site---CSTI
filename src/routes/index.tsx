import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "CSTI Brasil | Tecnologia para Comunicação Assertiva" },
    { name: "description", content: "Omnichannel, automação, inteligência artificial e integrações para estruturar a comunicação empresarial." },
    { property: "og:title", content: "CSTI Brasil | Tecnologia para Comunicação Assertiva" },
    { property: "og:description", content: "Tecnologia para conectar empresas, pessoas e canais com mais clareza e governança." },
    { property: "og:type", content: "website" },
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
const Brand = () => <img className="brand" src="/csti-logo.png" alt="CSTI Brasil" />;

function Header() {
  return <header className="site-header">
    <a href="#inicio" aria-label="CSTI Brasil — página inicial"><Brand /></a>
    <nav className="desktop-nav" aria-label="Navegação principal"><a href="#solucoes">Soluções</a><a href="#tecnologia">Tecnologia</a><a href="#segmentos">Segmentos</a><a href="#consultoria">Consultoria</a><a href="#empresa">CSTI Brasil</a></nav>
    <div className="header-actions"><a href="#cliente">Área do Cliente</a><a className="button small" href="#contato">Fale com um especialista <Arrow /></a></div>
    <details className="mobile-menu"><summary aria-label="Abrir menu"><i></i><i></i></summary><nav><a href="#solucoes">Soluções</a><a href="#tecnologia">Tecnologia</a><a href="#segmentos">Segmentos</a><a href="#consultoria">Consultoria</a><a href="#empresa">CSTI Brasil</a><a href="#contato">Fale com um especialista</a></nav></details>
  </header>;
}

function Network() {
  return <div className="network" aria-label="Ecossistema CSTI conectando canais, dados, automação e inteligência">
    <span className="node n1">WhatsApp</span><span className="node n2">Instagram</span><span className="node n3">WebChat</span><span className="node n4">Voz</span><span className="node n5">Dados</span>
    <div className="core"><strong>CSTI</strong><small>CORE</small></div><p>IA · AUTOMAÇÃO · INTEGRAÇÕES</p>
  </div>;
}

function Home() {
  return <main id="inicio">
    <section className="hero dark"><Header /><div className="hero-layout shell"><div><p className="eyebrow">TECNOLOGIA · AUTOMAÇÃO · INTELIGÊNCIA</p><h1>Tecnologia para uma comunicação mais assertiva.</h1><p className="lead">Omnichannel, automação, inteligência artificial e integrações conectando empresas, pessoas e canais.</p><div className="actions"><a className="button" href="#solucoes">Conheça nossas soluções <Arrow /></a><a className="text-link" href="#contato">Fale com um especialista <Arrow /></a></div></div><Network /></div></section>

    <section className="thesis section shell" id="empresa"><div><p className="eyebrow ink">COMUNICAÇÃO NÃO É APENAS UM CANAL</p><h2>Não basta estar presente.<br/>É preciso estar conectado.</h2></div><div className="big-copy"><p>Pessoas, canais, dados, automações e inteligência precisam trabalhar dentro da mesma estratégia de comunicação.</p><div className="converge"><i></i><i></i><i></i><b>CSTI</b></div></div></section>

    <section className="ecosystem section" id="solucoes"><div className="shell"><div className="heading"><p className="eyebrow ink">ECOSSISTEMA CSTI</p><h2>Uma estrutura.<br/>Múltiplas capacidades.</h2><p>A tecnologia certa não isola ferramentas. Ela organiza o fluxo completo da comunicação.</p></div><div className="pillars">{pillars.map(([n,t,d])=><article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p><Arrow /></article>)}</div></div></section>

    <section className="ai dark section" id="tecnologia"><div className="shell split"><div><p className="eyebrow">INTELIGÊNCIA APLICADA</p><h2>Inteligência que entende o contexto.</h2><p className="body">IA generativa aplicada ao pré-atendimento, qualificação, suporte, conhecimento e automação de processos.</p></div><ol>{["Mensagem do cliente","Identificação da intenção","Contexto e base de conhecimento","Agente de IA","Ação ou atendimento"].map((x,i)=><li key={x}><span>0{i+1}</span><strong>{x}</strong></li>)}</ol></div></section>

    <section className="manifesto section"><div className="shell"><p>A tecnologia conecta os canais.</p><p>A estratégia conecta as pessoas.</p><strong>CSTI Brasil — Tecnologia para Comunicação Assertiva.</strong></div></section>

    <section className="segments section shell" id="segmentos"><div className="heading"><p className="eyebrow ink">SEGMENTOS</p><h2>Tecnologia adaptada à realidade da sua operação.</h2></div><div className="segment-layout"><div className="tabs">{segments.map((x,i)=><button className={i===0?"active":""} key={x}><span>0{i+1}</span>{x}</button>)}</div><div className="case"><p>EXEMPLO DE FLUXO · VAREJO</p><div><span>Instagram</span>→<span>Atendimento</span>→<span>WhatsApp</span>→<span>Equipe</span>→<span>Relacionamento</span></div><small>A arquitetura é desenhada conforme os canais, processos e objetivos de cada operação.</small></div></div></section>

    <section className="consulting section" id="consultoria"><div className="shell split"><div><p className="eyebrow ink">ESTRUTURA E GOVERNANÇA</p><h2>Tecnologia sem estratégia é apenas ferramenta.</h2><p className="body">Analisamos canais, processos, documentação, atendimento e infraestrutura para identificar como a tecnologia pode ser aplicada à operação.</p><a className="text-link dark-link" href="#contato">Conheça nossa consultoria <Arrow /></a></div><div className="architecture">{["Diagnóstico","Processos","Ambiente Meta","Automação","Governança","Integrações"].map((x,i)=><div key={x}><span>0{i+1}</span><strong>{x}</strong></div>)}</div></div></section>

    <section className="final dark" id="contato"><div className="shell"><p className="eyebrow">PRÓXIMO PASSO</p><h2>Sua empresa já se comunica.<br/>Nós ajudamos a transformar isso em estrutura.</h2><a className="button" href="mailto:contato@cstibrasil.com.br">Fale com um especialista <Arrow /></a></div></section><Footer />
  </main>;
}

function Footer(){return <footer className="footer dark"><div className="shell footer-grid"><div><Brand/><p>Tecnologia para Comunicação Assertiva.</p></div><div><strong>Soluções</strong><a href="#solucoes">Omnichannel</a><a href="#tecnologia">Inteligência Artificial</a><a href="#consultoria">Automação e Integrações</a></div><div><strong>Empresa</strong><a href="#empresa">CSTI Brasil</a><a href="#segmentos">Segmentos</a><a href="#consultoria">Consultoria</a></div><div><strong>Legal</strong><a href="#privacidade">Privacidade</a><a href="#termos">Termos de Uso</a><a href="#lgpd">LGPD</a></div></div><div className="shell footer-bottom"><span>© 2026 CSTI Brasil</span><span>Brasil · Tecnologia e Comunicação</span></div></footer>}
