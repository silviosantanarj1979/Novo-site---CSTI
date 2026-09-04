import { createFileRoute } from "@tanstack/react-router";
import { BackToTop, SiteFooter, SiteHeader } from "../components/site-shell";

export const Route = createFileRoute("/termos-de-uso")({
  head: () => ({
    meta: [
      {
        title: "Termos de Uso | CSTI Brasil",
      },
      {
        name: "description",
        content:
          "Termos de Uso do site e dos ambientes digitais da CSTI Brasil.",
      },
    ],
  }),
  component: TermosDeUsoPage,
});

function TermosDeUsoPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <SiteHeader />

      <main className="mx-auto max-w-4xl px-6 pb-20 pt-32">
        <header className="mb-12">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
            CSTI Brasil
          </p>

          <h1 className="text-3xl font-bold md:text-5xl">
            Termos de Uso
          </h1>

          <p className="mt-4 text-sm text-slate-400">
            Última atualização: 03 de setembro de 2026
          </p>
        </header>

        <div className="space-y-9 leading-relaxed text-slate-300">

          <section>
            <p>
              Estes Termos de Uso estabelecem as condições gerais aplicáveis
              ao acesso e à utilização do site, páginas, aplicações e demais
              ambientes digitais disponibilizados pela CSTI Brasil.
            </p>

            <p className="mt-4">
              Ao acessar ou utilizar nossos ambientes digitais, o usuário
              declara estar ciente destes Termos de Uso e concorda em utilizar
              os recursos disponibilizados de maneira lícita e responsável.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              1. Sobre a CSTI Brasil
            </h2>

            <p>
              A CSTI Brasil atua no desenvolvimento e disponibilização de
              soluções tecnológicas voltadas à comunicação, automação,
              atendimento, integração de sistemas e infraestrutura operacional.
            </p>

            <p className="mt-3">
              Determinadas soluções poderão utilizar tecnologias, plataformas,
              APIs e serviços fornecidos por terceiros.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              2. Utilização do site
            </h2>

            <p>
              O usuário compromete-se a utilizar este site e seus recursos
              somente para finalidades legítimas, respeitando a legislação
              aplicável, estes Termos de Uso e os direitos de terceiros.
            </p>

            <p className="mt-3">
              É vedada a utilização dos ambientes digitais para atividades
              ilícitas, fraudulentas, abusivas ou que possam comprometer a
              segurança, estabilidade ou disponibilidade dos serviços.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              3. Informações fornecidas pelo usuário
            </h2>

            <p>
              O usuário é responsável pela veracidade e atualização das
              informações fornecidas voluntariamente por meio de formulários,
              solicitações de contato, cadastros ou outras funcionalidades.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              4. Serviços e funcionalidades
            </h2>

            <p>
              As informações apresentadas neste site possuem caráter
              institucional e informativo. A disponibilidade, características
              e condições específicas de determinados serviços poderão ser
              estabelecidas em propostas, contratos ou instrumentos próprios.
            </p>

            <p className="mt-3">
              A CSTI Brasil poderá atualizar, aperfeiçoar, substituir ou
              descontinuar funcionalidades quando necessário em razão de
              aspectos técnicos, operacionais, comerciais, legais ou de
              segurança.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              5. Integrações e serviços de terceiros
            </h2>

            <p>
              Algumas funcionalidades poderão depender de plataformas,
              sistemas, APIs ou serviços mantidos por terceiros.
            </p>

            <p className="mt-3">
              A disponibilidade dessas integrações poderá estar sujeita às
              regras, permissões, documentação técnica, políticas e condições
              estabelecidas pelos respectivos fornecedores.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              6. Meta, WhatsApp, Instagram e Facebook
            </h2>

            <p>
              Quando houver utilização de tecnologias ou integrações
              disponibilizadas pela Meta Platforms, o usuário deverá observar
              também os termos, políticas, requisitos e regras aplicáveis aos
              respectivos produtos e serviços.
            </p>

            <p className="mt-3">
              A disponibilidade de determinadas funcionalidades poderá depender
              de permissões, configurações, análise de contas, documentação e
              requisitos estabelecidos pela própria plataforma.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              7. Propriedade intelectual
            </h2>

            <p>
              Textos, elementos visuais, identidade institucional, sistemas,
              códigos, materiais e demais conteúdos próprios disponibilizados
              pela CSTI Brasil são protegidos pela legislação aplicável,
              ressalvados conteúdos, marcas e tecnologias pertencentes a
              terceiros.
            </p>

            <p className="mt-3">
              Nenhum conteúdo deverá ser interpretado como transferência de
              propriedade intelectual ao usuário.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              8. Segurança
            </h2>

            <p>
              O usuário não deverá tentar obter acesso não autorizado a
              sistemas, contas, servidores, bancos de dados ou áreas restritas,
              nem praticar atos capazes de prejudicar a segurança ou o
              funcionamento dos ambientes digitais.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              9. Privacidade e proteção de dados
            </h2>

            <p>
              O tratamento de dados pessoais relacionado aos nossos ambientes
              digitais está descrito em nossa Política de Privacidade.
            </p>

            <p className="mt-3">
              A Política de Privacidade integra estes Termos de Uso para todos
              os fins aplicáveis.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              10. Limitações e disponibilidade
            </h2>

            <p>
              Embora sejam adotadas medidas destinadas à manutenção e
              segurança dos ambientes digitais, não é possível garantir
              disponibilidade ininterrupta de sistemas ou serviços que dependam
              de infraestrutura tecnológica, internet ou fornecedores
              externos.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              11. Links externos
            </h2>

            <p>
              O site poderá apresentar links ou referências a ambientes de
              terceiros. Esses ambientes possuem termos, políticas e práticas
              próprias e não são controlados por estes Termos de Uso.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              12. Alterações destes Termos
            </h2>

            <p>
              Estes Termos de Uso poderão ser atualizados em razão de
              alterações legais, regulatórias, tecnológicas ou operacionais.
              A versão vigente permanecerá disponível publicamente neste
              endereço.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              13. Legislação aplicável
            </h2>

            <p>
              Estes Termos serão interpretados de acordo com a legislação
              brasileira, observadas as normas obrigatoriamente aplicáveis a
              cada relação jurídica.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-xl font-semibold text-white">
              14. Contato
            </h2>

            <p>
              Em caso de dúvidas relacionadas a estes Termos de Uso, utilize
              os canais oficiais de atendimento disponibilizados pela CSTI
              Brasil.
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
