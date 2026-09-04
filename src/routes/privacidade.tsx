import { createFileRoute } from "@tanstack/react-router";
import { BackToTop, SiteFooter, SiteHeader } from "../components/site-shell";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      {
        title: "Política de Privacidade | CSTI Brasil",
      },
      {
        name: "description",
        content:
          "Política de Privacidade da CSTI Brasil sobre coleta, utilização, armazenamento e proteção de dados pessoais.",
      },
    ],
  }),
  component: PrivacidadePage,
});

function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SiteHeader />

      <main className="mx-auto max-w-4xl px-6 pb-20 pt-32">
        <header className="mb-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
            CSTI Brasil
          </p>

          <h1 className="text-3xl font-bold md:text-5xl">
            Política de Privacidade
          </h1>

          <p className="mt-4 text-sm text-slate-400">
            Última atualização: 03 de setembro de 2026
          </p>
        </header>

        <div className="space-y-9 leading-relaxed text-slate-300">
          <section>
            <p>
              A CSTI Brasil respeita a privacidade e a proteção dos dados
              pessoais dos usuários que acessam seus sites, sistemas,
              aplicações e demais ambientes digitais.
            </p>

            <p className="mt-4">
              Esta Política de Privacidade descreve como informações podem ser
              coletadas, utilizadas, armazenadas e protegidas durante a
              utilização de nossos serviços e integrações.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              1. Coleta de informações
            </h2>

            <p>
              Podemos coletar informações fornecidas voluntariamente pelo
              usuário, incluindo dados de identificação, contato e informações
              necessárias para atendimento, suporte e utilização das
              funcionalidades disponibilizadas.
            </p>

            <p className="mt-3">
              Também poderão ser coletados dados técnicos necessários ao
              funcionamento e à segurança dos serviços, como informações de
              acesso, navegador, dispositivo, registros técnicos e interações
              realizadas nos sistemas.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              2. Utilização das informações
            </h2>

            <p>As informações poderão ser utilizadas para:</p>

            <ul className="mt-3 list-disc space-y-2 pl-6">
              <li>Disponibilizar e operar nossos serviços;</li>
              <li>Realizar atendimento e suporte;</li>
              <li>Autenticar usuários e proteger contas;</li>
              <li>Permitir integrações solicitadas pelo usuário;</li>
              <li>Melhorar a segurança e o desempenho dos sistemas;</li>
              <li>Cumprir obrigações legais ou regulatórias;</li>
              <li>Prevenir fraudes, abusos e utilização indevida.</li>
            </ul>

            <p className="mt-4">
              Os dados pessoais não são comercializados como produto.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              3. Integrações com plataformas de terceiros
            </h2>

            <p>
              Nossos serviços podem utilizar integrações com plataformas,
              sistemas e APIs disponibilizados por terceiros.
            </p>

            <p className="mt-3">
              Quando uma integração é autorizada pelo usuário ou pela
              organização responsável pela conta, poderão ser processadas as
              informações necessárias para disponibilizar as funcionalidades
              relacionadas à integração.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              4. Meta, Facebook, Instagram e WhatsApp
            </h2>

            <p>
              Quando nossos sistemas utilizarem tecnologias, APIs ou recursos
              disponibilizados pela Meta Platforms, o acesso e o tratamento das
              informações ocorrerão de acordo com as permissões concedidas,
              funcionalidades utilizadas e políticas aplicáveis da Meta.
            </p>

            <p className="mt-3">
              A utilização dessas informações possui finalidade operacional,
              incluindo autenticação, integração de canais, gerenciamento de
              comunicações, atendimento e execução das funcionalidades
              disponibilizadas ao usuário.
            </p>

            <p className="mt-3">
              Não utilizamos dados obtidos por meio das plataformas da Meta
              para finalidades incompatíveis com as permissões concedidas ou
              com as políticas aplicáveis.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              5. Compartilhamento de informações
            </h2>

            <p>
              Informações poderão ser compartilhadas com fornecedores de
              infraestrutura, tecnologia ou processamento quando necessário
              para o funcionamento dos serviços, bem como para cumprimento de
              obrigação legal ou determinação de autoridade competente.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              6. Armazenamento e segurança
            </h2>

            <p>
              Adotamos medidas técnicas e administrativas destinadas à proteção
              das informações contra acessos não autorizados, perda, alteração,
              divulgação ou utilização indevida.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              7. Retenção e exclusão de dados
            </h2>

            <p>
              Os dados poderão ser mantidos pelo período necessário para
              execução das respectivas finalidades, cumprimento de obrigações
              legais, exercício de direitos ou manutenção da segurança dos
              serviços.
            </p>

            <p className="mt-3">
              Quando aplicável, o titular poderá solicitar correção, exclusão
              ou anonimização de seus dados por meio dos canais oficiais
              disponibilizados pela CSTI Brasil.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              8. Direitos do titular
            </h2>

            <p>
              Nos termos da Lei Geral de Proteção de Dados Pessoais — LGPD
              (Lei nº 13.709/2018), o titular poderá exercer os direitos
              previstos na legislação aplicável, incluindo confirmação da
              existência de tratamento, acesso, correção, anonimização,
              bloqueio ou eliminação de dados, quando cabível.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              9. Cookies
            </h2>

            <p>
              O site poderá utilizar cookies e tecnologias semelhantes
              necessários ao funcionamento, segurança, análise de desempenho e
              melhoria da experiência de navegação.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              10. Serviços de terceiros
            </h2>

            <p>
              Links, integrações e funcionalidades de terceiros eventualmente
              disponibilizados em nossos ambientes podem possuir políticas e
              termos próprios.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              11. Alterações desta Política
            </h2>

            <p>
              Esta Política poderá ser atualizada para refletir alterações
              legais, regulatórias, tecnológicas ou operacionais. A versão
              vigente permanecerá disponível publicamente neste endereço.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              12. Contato
            </h2>

            <p>
              Para dúvidas relacionadas à privacidade, proteção de dados ou
              solicitações referentes aos seus dados pessoais, utilize os
              canais oficiais de atendimento disponibilizados pela CSTI Brasil.
            </p>

            <div className="mt-5 border-l-2 border-cyan-400 pl-4">
              <p className="font-semibold text-white">CSTI Brasil</p>
              <p>Celebrar Soluções Tecnológicas do Brasil</p>
            </div>
          </section>
        </div>
      </main>

      <SiteFooter />
      <BackToTop />
    </div>
  );
}
