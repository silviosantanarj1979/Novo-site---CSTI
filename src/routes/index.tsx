import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Brand, SiteHeader } from "../components/site-shell";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "CSTI Brasil | Tecnologia para Comunicação Assertiva" },
    { name: "description", content: "Omnichannel, automação, inteligência artificial e integrações para estruturar a comunicação empresarial." },
    { property: "og:title", content: "CSTI Brasil | Tecnologia para Comunicação Assertiva" },
    { property: "og:description", content: "Tecnologia para conectar empresas, pessoas e canais com mais clareza e governança." },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "/hero-operacao-csti-v1.png" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: "/hero-operacao-csti-v1.png" },
  ]}), component: Home,
});

const pillars = [
  ["01", "Omnichannel", "Canais, equipes e históricos organizados em uma mesma operação."],
  ["02", "Inteligência Artificial", "Agentes inteligentes e IA generativa aplicados com contexto."],
  ["03", "Automação", "Fluxos, processos e jornadas desenhados para ganhar consistência."],
  ["04", "Comunicação Empresarial", "WhatsApp, Instagram, Messenger, Telegram, WebChat e voz."],
  ["05", "Integrações", "APIs conectando CRM, ERP, sistemas e dados da sua empresa."],
  ["06", "Consultoria", "Diagnóstico, conformidade e estruturação tecnológica da operação."],
];

const segmentData = [
  { name: "Varejo", code: "01", title: "Jornadas conectadas, da descoberta ao relacionamento.", text: "Organize conversas iniciadas nas redes sociais, distribua o atendimento e preserve o contexto durante toda a jornada.", flow: ["Instagram", "Atendimento", "WhatsApp", "Equipe", "Oportunidade", "Relacionamento"] },
  { name: "Drogarias e Farmácias", code: "02", title: "Agilidade no digital, continuidade no balcão.", text: "Estruture o atendimento entre canais digitais e loja física, mantendo pedidos e históricos acessíveis para a equipe.", flow: ["Cliente", "WhatsApp", "Atendimento", "Balcão", "Pedido", "Histórico"] },
  { name: "Serviços", code: "03", title: "Cada solicitação no fluxo certo.", text: "Centralize a entrada de demandas, automatize triagens e encaminhe cada conversa para a área responsável.", flow: ["Contato", "Triagem", "Qualificação", "Especialista", "Execução", "Retorno"] },
  { name: "Saúde", code: "04", title: "Comunicação organizada em jornadas sensíveis.", text: "Apoie agendamentos, orientações e retornos com processos claros, histórico e controle de acesso.", flow: ["Paciente", "Recepção", "Agendamento", "Unidade", "Atendimento", "Retorno"] },
  { name: "Educação", code: "05", title: "Informação consistente em cada etapa.", text: "Conecte captação, matrícula, atendimento e relacionamento em uma comunicação contínua com alunos e responsáveis.", flow: ["Interesse", "Secretaria", "Matrícula", "Atendimento", "Aluno", "Relacionamento"] },
  { name: "Empresas", code: "06", title: "Governança para operações com múltiplas equipes.", text: "Padronize canais, permissões, departamentos e indicadores sem perder a autonomia operacional.", flow: ["Canal", "Departamento", "Responsável", "Processo", "Indicador", "Gestão"] },
  { name: "Setor Público", code: "07", title: "Atendimento estruturado e rastreável.", text: "Organize demandas por área, preserve o histórico e estabeleça processos consistentes para comunicação com o cidadão.", flow: ["Cidadão", "Canal", "Protocolo", "Secretaria", "Resposta", "Histórico"] },
];

const Arrow = () => <span aria-hidden="true">↗</span>;
const Header = SiteHeader;
function SegmentExplorer() {
  const [active, setActive] = useState(0);
  const segment = segmentData[active];
  if (!segment) return null;
  return <div className="segment-explorer">
    <div className="segment-tabs" role="tablist" aria-label="Escolha um segmento">
      {segmentData.map((item, index) => <button key={item.name} role="tab" aria-selected={active === index} className={active === index ? "active" : ""} onClick={() => setActive(index)}><span>{item.code}</span>{item.name}</button>)}
    </div>
    <article className="segment-stage" role="tabpanel">
      <div className="segment-copy"><span className="segment-index">SEGMENTO / {segment.code}</span><h3>{segment.title}</h3><p>{segment.text}</p><a href={segment.name === "Drogarias e Farmácias" ? "/segmentos/drogarias-e-farmacias" : "/segmentos"} className="text-link">Explorar este segmento <Arrow /></a></div>
      <div className="journey" aria-label={`Jornada de comunicação para ${segment.name}`}><span className="journey-label">JORNADA OPERACIONAL</span>{segment.flow.map((step, index) => <div className="journey-step" key={step}><span>0{index + 1}</span><strong>{step}</strong>{index < segment.flow.length - 1 && <i aria-hidden="true">→</i>}</div>)}</div>
    </article>
  </div>;
}

function Home() {
  return <main id="inicio">
     <section className="hero dark" style={{ backgroundImage: "linear-gradient(90deg,#07131ff2 0%,#07131fdc 36%,#07131f4d 68%,#07131f18 100%),url('/hero-operacao-csti-v1.png')" }}><Header /><div className="hero-layout shell"><div className="hero-copy"><p className="eyebrow">TECNOLOGIA · AUTOMAÇÃO · INTELIGÊNCIA</p><h1>Tecnologia para uma comunicação mais assertiva<span>.</span></h1><p className="lead">Omnichannel, automação, inteligência artificial e integrações conectando empresas, pessoas e canais.</p><div className="actions"><a className="button" href="#solucoes">Conheça nossas soluções <Arrow /></a><a className="text-link" href="#contato">Fale com um especialista <Arrow /></a></div></div></div></section>
    <section className="capability-band dark"><div className="shell"><p>Da estratégia à operação, uma estrutura completa para sua comunicação.</p>{[["01","Estratégia e consultoria"],["02","Plataformas e tecnologia"],["03","Implementação e integrações"],["04","Suporte e evolução"]].map(([n,t])=><div key={n}><span>{n}</span><strong>{t}</strong></div>)}</div></section>

    <section className="thesis section shell" id="empresa"><div><p className="eyebrow ink">COMUNICAÇÃO NÃO É APENAS UM CANAL</p><h2>Não basta estar presente.<br/><em>É preciso estar conectado.</em></h2></div><div className="big-copy"><p>Pessoas, canais, dados, automações e inteligência precisam trabalhar dentro da mesma estratégia de comunicação.</p><div className="converge" aria-hidden="true"><span>WhatsApp</span><span>Dados</span><span>Instagram</span><i></i><i></i><i></i><b>CSTI<br/><small>CORE</small></b></div></div></section>

    <section className="editorial section"><div className="shell editorial-grid"><div><p className="eyebrow ink">TECNOLOGIA QUE AMPLIFICA RELAÇÕES</p><h2>Clareza para conectar estratégia, tecnologia e operação.</h2><p className="body">A CSTI não entrega apenas uma ferramenta. Estruturamos o ambiente para que canais, pessoas e sistemas trabalhem como uma operação única.</p><div className="editorial-points"><div><b>01</b><span><strong>Entender</strong>Mapeamos a realidade e os objetivos da operação.</span></div><div><b>02</b><span><strong>Estruturar</strong>Desenhamos canais, processos, dados e responsabilidades.</span></div><div><b>03</b><span><strong>Evoluir</strong>Acompanhamos tecnologia e operação em movimento.</span></div></div><a className="text-link dark-link" href="#solucoes">Explore o ecossistema CSTI <Arrow /></a></div><div className="editorial-image"><img src="/estrategia-csti-v1.png" alt="Equipe desenvolvendo uma estratégia de comunicação integrada"/><div className="image-caption"><span>ESTRATÉGIA · TECNOLOGIA · OPERAÇÃO</span><b>Comunicação desenhada para funcionar.</b></div></div></div></section>

    <section className="ecosystem section" id="solucoes"><div className="shell"><div className="heading"><p className="eyebrow ink">ECOSSISTEMA CSTI</p><h2>Uma estrutura.<br/><em>Múltiplas capacidades.</em></h2><p>A tecnologia certa não isola ferramentas. Ela organiza o fluxo completo da comunicação — da primeira mensagem à gestão da operação.</p></div><div className="ecosystem-layout"><div className="core-map" aria-hidden="true"><div className="core-ring ring-one"></div><div className="core-ring ring-two"></div><b>CSTI<small>CORE</small></b>{["Canais","Pessoas","Dados","IA","Processos","Integrações"].map((x,i)=><span key={x} className={`node node-${i+1}`}>{x}</span>)}</div><div className="pillars">{pillars.map(([n,t,d])=><article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p><Arrow /></article>)}</div></div></div></section>

    <section className="product section" id="produto"><div className="shell"><div className="heading"><p className="eyebrow ink">TECNOLOGIA EM OPERAÇÃO</p><h2>Uma visão única para uma operação <em>que não para.</em></h2><p>Conversas, equipes, processos e informações organizados para que cada atendimento avance com contexto.</p></div><div className="product-frame"><div className="product-rail"><span className="rail-brand">CSTI / OPERAÇÃO</span>{["Conversas","Filas","Atendentes","Departamentos","Automações","Histórico"].map((x,i)=><span key={x} className={i===0?"selected":""}><small>0{i+1}</small>{x}</span>)}</div><div className="product-workspace"><div className="workspace-top"><span>FLUXO DE COMUNICAÇÃO</span><i>AMBIENTE INTEGRADO</i></div><div className="workspace-flow"><div><small>ENTRADA</small><strong>Canais conectados</strong><p>WhatsApp · Instagram · WebChat · Voz</p></div><i>→</i><div><small>ORGANIZAÇÃO</small><strong>Contexto e distribuição</strong><p>Filas · Equipes · Histórico · Regras</p></div><i>→</i><div><small>EVOLUÇÃO</small><strong>Ação e relacionamento</strong><p>Atendimento · IA · Automação · Dados</p></div></div><div className="workspace-note"><span></span><p><strong>Visual conceitual da operação.</strong> A demonstração utiliza a plataforma real, de acordo com o ambiente de cada empresa.</p></div></div></div><div className="product-footer"><p>Sem telas fictícias ou promessas genéricas. A tecnologia é apresentada dentro do contexto real da operação.</p><a className="text-link dark-link" href="#contato">Solicitar uma demonstração <Arrow /></a></div></div></section>

    <section className="ai dark section" id="tecnologia"><div className="shell"><div className="heading dark-heading"><p className="eyebrow">INTELIGÊNCIA APLICADA</p><h2>Inteligência que entende <em>o contexto.</em></h2><p>IA generativa aplicada ao pré-atendimento, qualificação, suporte, conhecimento e automação de processos.</p></div><div className="ai-console"><div className="ai-intro"><span>FLUXO / 01</span><strong>Uma mensagem não precisa começar do zero.</strong><p>Contexto, conhecimento e regras orientam cada próxima ação.</p></div><ol>{["Mensagem do cliente","Identificação da intenção","Contexto e conhecimento","Agente de IA","Ação ou atendimento"].map((x,i)=><li key={x}><span>0{i+1}</span><strong>{x}</strong><i></i></li>)}</ol></div></div></section>

    <section className="manifesto section"><div className="shell"><span className="manifesto-mark">CSTI / PONTO DE VISTA</span><p>A tecnologia conecta os canais.</p><p>A estratégia conecta as pessoas.</p><strong>CSTI Brasil — Tecnologia para Comunicação Assertiva.</strong></div></section>

    <section className="segments section" id="segmentos"><div className="shell"><div className="heading dark-heading"><p className="eyebrow">SOLUÇÕES POR SEGMENTO</p><h2>Cada operação tem<br/><em>uma lógica própria.</em></h2><p>Não mudamos apenas a fotografia. Adaptamos jornadas, canais e processos ao contexto de cada mercado.</p></div><SegmentExplorer /></div></section>

    <section className="whatsapp section"><div className="shell"><div className="heading"><p className="eyebrow ink">WHATSAPP BUSINESS PLATFORM</p><h2>Sua operação começa pela <em>estrutura correta.</em></h2><p>O WhatsApp profissional exige arquitetura, titularidade, integração e governança — muito além de simplesmente ativar um número.</p></div><div className="platform-map">{["Meta","Portfólio empresarial","Conta do WhatsApp","API Oficial","CSTI","Equipe · IA · Automação"].map((x,i)=><div key={x} className={i===4 ? "highlight" : ""}><span>0{i+1}</span><strong>{x}</strong>{i<5&&<i>→</i>}</div>)}</div><a className="text-link dark-link" href="#contato">Conheça nossas soluções para WhatsApp <Arrow /></a></div></section>

    <section className="governance dark section"><div className="shell governance-grid"><div><p className="eyebrow">ESTRUTURA, CONTROLE E CONTINUIDADE</p><h2>Governança da comunicação digital.</h2><p className="body">Comunicação empresarial também precisa de estrutura, controle e governança. Organizamos os elementos que sustentam uma operação confiável.</p></div><div className="governance-board">{["Usuários","Permissões","Departamentos","Documentação","Histórico","Titularidade","Segurança","Conformidade","API Oficial","Processos","Métricas","Auditoria"].map((x,i)=><span key={x}><small>{String(i+1).padStart(2,"0")}</small>{x}</span>)}</div></div></section>

    <section className="consulting section" id="consultoria"><div className="shell consulting-grid"><div className="consulting-copy"><p className="eyebrow ink">CONSULTORIA CSTI</p><h2>Tecnologia sem estratégia é apenas ferramenta.</h2><p className="body">Analisamos canais, processos, documentação, atendimento e infraestrutura para identificar como a tecnologia pode ser aplicada à operação.</p><a className="button" href="#contato">Conheça nossa consultoria <Arrow /></a></div><div className="architecture"><span className="architecture-title">MAPA DE ESTRUTURAÇÃO</span>{["Diagnóstico da operação","Mapeamento de atendimento","Ambiente Meta","Automação e IA","Governança","Integrações e evolução"].map((x,i)=><div key={x}><span>0{i+1}</span><strong>{x}</strong><i>—</i></div>)}</div></div></section>

    <section className="insights section"><div className="shell"><div className="heading"><p className="eyebrow ink">CSTI INSIGHTS</p><h2>Conteúdo para decisões <em>mais bem estruturadas.</em></h2><p>Conceitos, orientações e análises sobre tecnologia aplicada à comunicação empresarial.</p></div><div className="insight-grid">{[["INTELIGÊNCIA ARTIFICIAL","Agente de IA ou chatbot: qual é a diferença?"],["OMNICHANNEL","Centralizar canais não significa ser omnichannel."],["WHATSAPP OFICIAL","O que sua empresa precisa saber antes de operar profissionalmente."]].map(([tag,title],i)=><article key={tag}><span>{tag}</span><div className={`insight-art art-${i+1}`}><b>0{i+1}</b></div><h3>{title}</h3><a href="#contato" aria-label={`Saiba mais: ${title}`}><Arrow /></a></article>)}</div></div></section>

    <section className="final dark" id="contato"><div className="shell"><p className="eyebrow">PRÓXIMO PASSO</p><h2>Sua empresa já se comunica.<br/><em>Nós ajudamos a transformar isso em estrutura.</em></h2><a className="button" href="mailto:contato@cstibrasil.com.br">Fale com um especialista <Arrow /></a></div></section><Footer />
    <a className="back-to-top" href="#inicio" aria-label="Voltar ao topo"><span>↑</span><small>TOPO</small></a>
  </main>;
}

function Footer(){return <footer className="footer dark"><div className="shell footer-grid"><div><Brand/><p>Tecnologia para Comunicação Assertiva.</p></div><div><strong>Soluções</strong><a href="#solucoes">Omnichannel</a><a href="#tecnologia">Inteligência Artificial</a><a href="#consultoria">Automação e Integrações</a></div><div><strong>Empresa</strong><a href="#empresa">CSTI Brasil</a><a href="#segmentos">Segmentos</a><a href="#consultoria">Consultoria</a></div><div><strong>Legal</strong><a href="#privacidade">Privacidade</a><a href="#termos">Termos de Uso</a><a href="#lgpd">LGPD</a></div></div><div className="shell footer-bottom"><span>© 2026 CSTI Brasil</span><span>Brasil · Tecnologia e Comunicação</span></div></footer>}
