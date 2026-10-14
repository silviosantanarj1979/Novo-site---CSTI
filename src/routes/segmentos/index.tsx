import { createFileRoute } from "@tanstack/react-router";
import { BackToTop, SiteFooter, SiteHeader } from "../../components/site-shell";

export const Route = createFileRoute("/segmentos/")({
  head: () => ({
    meta: [
      { title: "Segmentos | CSTI Brasil" },
      { name: "description", content: "Tecnologia que entende cada cenário: varejo, drogarias e farmácias, serviços, saúde, educação, empresas e setor público." },
      { property: "og:title", content: "Segmentos | CSTI Brasil" },
      { property: "og:description", content: "Partimos da rotina, da linguagem e dos desafios reais de cada mercado." },
      { property: "og:url", content: "https://cstibrasil.com.br/segmentos" },
    ],
    links: [{ rel: "canonical", href: "https://cstibrasil.com.br/segmentos" }],
  }),
  component: SegmentosPage,
});

const markets = ["Varejo", "Drogarias e Farmácias", "Serviços", "Saúde", "Educação", "Empresas", "Setor Público"];
const captions = ["Varejo", "Saúde & varejo", "Serviços", "Saúde", "Educação", "Corporativo", "Setor público"];
const descriptions = [
  "Jornadas que convertem atendimento em relacionamento.",
  "Do WhatsApp ao balcão, com contexto e continuidade.",
  "Triagem, agenda e especialistas na mesma conversa.",
  "Orientação e retorno em jornadas mais humanas.",
  "Captação, matrícula e relacionamento com alunos.",
  "Canais, departamentos e governança conectados.",
  "Atendimento ao cidadão com rastreabilidade.",
];

function SegmentosPage() {
  return <main id="inicio" className="agency-home">
    <SiteHeader />
    <section className="agency-segments" id="segmentos">
      <div className="shell">
        <div className="agency-section-head segment-heading">
          <p className="agency-index">05 — SEGMENTOS</p>
          <h1>Tecnologia que entende cada cenário.</h1>
          <p>Partimos da rotina, da linguagem e dos desafios reais de cada mercado.</p>
          <div className="csti-photo-mark" aria-hidden="true"><i></i><b></b></div>
        </div>
        <div className="segment-showcase">
          {markets.map((market, i) => <a
            className={`segment-visual segment-visual-${i + 1}`}
            href={market === "Drogarias e Farmácias" ? "/segmentos/drogarias-e-farmacias" : "/contato"}
            key={market}
          >
            <span className="segment-number">0{i + 1}</span>
            <div>
              <p>{captions[i]}</p>
              <strong>{market}</strong>
              <small>{descriptions[i]}</small>
            </div>
            <span className="segment-arrow" aria-hidden="true">↗</span>
          </a>)}
        </div>
      </div>
    </section>
    <SiteFooter />
    <BackToTop />
  </main>;
}
