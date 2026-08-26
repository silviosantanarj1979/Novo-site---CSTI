import { createFileRoute } from "@tanstack/react-router";
import { BackToTop, SiteFooter, SiteHeader } from "../components/site-shell";

export const Route = createFileRoute("/optinfarma")({
  head: () => ({
    meta: [
      { title: "Optinfarma | E-commerce para Drogarias e Farmácias | CSTI Brasil" },
      { name: "description", content: "Conheça a demonstração da Optinfarma: uma experiência de e-commerce para drogarias com catálogo, ofertas, serviços, relacionamento e jornadas digitais." },
      { property: "og:title", content: "Optinfarma — uma nova experiência digital para drogarias" },
      { property: "og:description", content: "Veja como catálogo, atendimento e serviços podem fazer parte de uma jornada digital integrada para drogarias." },
      { property: "og:url", content: "https://cstibrasil.com.br/optinfarma" },
      { property: "og:image", content: "https://cstibrasil.com.br/og-csti-brasil-oficial.png" },
    ],
    links: [{ rel: "canonical", href: "https://cstibrasil.com.br/optinfarma" }],
  }),
  component: OptinfarmaPage,
});

const features = [
  ["01", "Catálogo organizado", "Departamentos, categorias, busca e páginas de produto para facilitar a descoberta."],
  ["02", "Ofertas e relacionamento", "Campanhas, descontos, clube, pontos e vantagens apresentados durante a jornada."],
  ["03", "Compra e conveniência", "Sacola, checkout demonstrativo, cálculo de entrega e opção de retirada em loja."],
  ["04", "Saúde conectada", "Espaço para receita digital, serviços farmacêuticos, vacinas e teleatendimento."],
  ["05", "Recorrência", "Jornadas como dose contínua podem apoiar recompra e relacionamento com o cliente."],
  ["06", "Atendimento", "WhatsApp, assistente virtual e direcionamento para atendimento humano na mesma experiência."],
];

const faqs = [
  ["O que é a Optinfarma?", "É uma proposta de experiência de e-commerce voltada ao contexto de drogarias e farmácias. A versão pública analisada é demonstrativa e mostra como produtos, serviços e relacionamento podem ser organizados em uma loja digital."],
  ["A loja demonstrada já está pronta para vender?", "A demonstração permite visualizar a jornada, mas o próprio ambiente informa que preços e pedidos são fictícios. A operação comercial real depende de implantação, catálogo, pagamentos, logística, regras e integrações definidas para cada empresa."],
  ["É possível usar a marca da minha drogaria?", "A identidade, os conteúdos, as categorias e a comunicação podem ser definidos durante o projeto. Escopo, prazo e nível de personalização precisam ser confirmados com a CSTI."],
  ["Pode integrar estoque, preço e pedidos?", "Essas integrações dependem do sistema utilizado pela drogaria, da disponibilidade de APIs e das regras operacionais. A viabilidade é avaliada tecnicamente antes da contratação."],
  ["Quais formas de entrega podem ser consideradas?", "A demonstração apresenta entrega e retirada em loja. Transportadoras, raio de atendimento, prazo, frete e disponibilidade são configurados conforme a operação real."],
  ["Receita digital e medicamentos controlados estão incluídos?", "A página demonstra uma jornada de receita digital. A implementação e a venda de medicamentos devem respeitar legislação, prescrição, validações e procedimentos farmacêuticos aplicáveis. O escopo precisa ser validado para cada operação."],
  ["A Optinfarma funciona no celular?", "A proposta é oferecer experiência responsiva para computador, tablet e celular. A validação final é feita no projeto implantado, considerando catálogo, integrações e identidade escolhida."],
  ["Há atendimento pelo WhatsApp?", "A demonstração oferece acesso ao WhatsApp e a uma assistente virtual. Os canais, números, fluxos e integrações efetivamente utilizados são definidos na implantação."],
  ["Como saber preço e prazo?", "Preço e prazo variam conforme personalização, quantidade de lojas, catálogo, integrações, meios de pagamento, logística e serviços contratados. A CSTI realiza um diagnóstico antes da proposta."],
  ["Como posso conhecer a experiência?", "Você pode abrir a demonstração pública ou solicitar uma conversa com a CSTI para entender o que se aplica à sua drogaria."],
];

function OptinfarmaPage() {
  return <main id="inicio" className="inner-page optinfarma-page">
    <section className="optinfarma-hero dark">
      <SiteHeader />
      <div className="shell optinfarma-hero-grid">
        <div className="optinfarma-copy">
          <p className="eyebrow">CSTI BRASIL · VAREJO FARMACÊUTICO</p>
          <h1>Uma experiência digital para a drogaria <em>vender, atender e se relacionar.</em></h1>
          <p className="lead">A Optinfarma demonstra como catálogo, conveniência, serviços de saúde e relacionamento podem conviver numa jornada de e-commerce pensada para o setor farmacêutico.</p>
          <div className="actions"><a className="button" href="/contato?assunto=Optinfarma">Quero conhecer a solução <span>↗</span></a><a className="text-link" href="https://loja.optinfarma.com.br/sales/#/" target="_blank" rel="noreferrer">Abrir demonstração <span>↗</span></a></div>
          <small className="optinfarma-disclaimer">Ambiente demonstrativo. Recursos comerciais, integrações e disponibilidade são definidos em projeto.</small>
        </div>
        <div className="optinfarma-window" aria-label="Representação da experiência Optinfarma">
          <div className="optinfarma-browser"><i></i><i></i><i></i><span>loja.optinfarma.com.br</span></div>
          <div className="optinfarma-store-head"><b>OPTIN<span>FARMA</span></b><small>SUA DROGARIA ONLINE</small></div>
          <div className="optinfarma-search">O que você está procurando? <span>⌕</span></div>
          <div className="optinfarma-tags"><span>Medicamentos</span><span>Beleza</span><span>Saúde</span><span>Ofertas</span></div>
          <div className="optinfarma-stage"><div><small>EXPERIÊNCIA DIGITAL</small><strong>Cuidado e conveniência em uma só jornada.</strong><span>Explorar produtos →</span></div><div className="optinfarma-orbit"><b>360°</b><i>Catálogo</i><i>Serviços</i><i>Relacionamento</i></div></div>
        </div>
      </div>
    </section>

    <section className="optinfarma-intro section"><div className="shell optinfarma-intro-grid"><div><p className="eyebrow ink">DA VITRINE À OPERAÇÃO</p><h2>Não é apenas colocar produtos na internet.</h2></div><div><p>Uma operação farmacêutica digital precisa organizar descoberta, confiança, disponibilidade, entrega, atendimento e continuidade. A demonstração da Optinfarma reúne essas possibilidades em uma experiência única.</p><strong>A interface apresenta a visão.<br/>A implantação conecta a realidade.</strong></div></div></section>

    <section className="optinfarma-capabilities section dark"><div className="shell"><div className="heading dark-heading"><p className="eyebrow">O QUE A DEMONSTRAÇÃO APRESENTA</p><h2>Uma jornada completa, organizada em <em>seis frentes.</em></h2><p>Os recursos abaixo foram identificados na versão pública enviada. A disponibilidade real depende do escopo contratado.</p></div><div className="optinfarma-feature-grid">{features.map(([n,t,d])=><article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div></div></section>

    <section className="optinfarma-flow section"><div className="shell"><div className="heading"><p className="eyebrow ink">COMO O PROJETO AVANÇA</p><h2>Da demonstração à loja da sua drogaria.</h2></div><div className="optinfarma-steps">{[["01","Diagnóstico","Entendemos marca, lojas, catálogo, sistemas e operação."],["02","Escopo","Definimos recursos, integrações, regras e responsabilidades."],["03","Experiência","Aplicamos identidade, conteúdo e jornadas do negócio."],["04","Integrações","Conectamos o que for tecnicamente validado no projeto."],["05","Validação","Testamos compra, atendimento, segurança e dispositivos."],["06","Evolução","Acompanhamos dados e oportunidades após a entrada em operação."]].map(([n,t,d])=><article key={n}><span>{n}</span><h3>{t}</h3><p>{d}</p></article>)}</div></div></section>

    <section className="optinfarma-faq section"><div className="shell optinfarma-faq-grid"><div><p className="eyebrow ink">DÚVIDAS FREQUENTES</p><h2>Antes de escolher, entenda o que está sendo demonstrado.</h2><p>Estas respostas separam a experiência visual pública do escopo técnico de uma implantação comercial.</p></div><div className="optinfarma-accordion">{faqs.map(([q,a],i)=><details key={q} open={i===0}><summary><span>{String(i+1).padStart(2,"0")}</span>{q}<i>+</i></summary><p>{a}</p></details>)}</div></div></section>

    <section className="final dark"><div className="shell"><p className="eyebrow">OPTINFARMA + CSTI BRASIL</p><h2>Quer avaliar uma experiência de e-commerce para <em>sua drogaria?</em></h2><div className="actions"><a className="button" href="/contato?assunto=Optinfarma">Fale com um especialista <span>↗</span></a><a className="text-link" href="https://loja.optinfarma.com.br/sales/#/" target="_blank" rel="noreferrer">Ver demonstração <span>↗</span></a></div></div></section>
    <SiteFooter /><BackToTop />
  </main>;
}
