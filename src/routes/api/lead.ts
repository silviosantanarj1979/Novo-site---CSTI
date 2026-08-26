import { createFileRoute } from "@tanstack/react-router";

const digits = (value: unknown) => String(value ?? "").replace(/\D/g, "");

export const Route = createFileRoute("/api/lead")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const reply = (data: unknown, status = 200) => Response.json(data, { status });

        try {
          const body = (await request.json()) as Record<string, unknown>;
          const text = (key: string, limit: number) => String(body[key] ?? "").trim().slice(0, limit);
          const nome = text("nome", 100);
          const segmento = text("segmento", 80);
          const selectedSubject = text("assunto", 100);
          const assunto = selectedSubject === "Outro" ? text("outroAssunto", 120) : selectedSubject;
          const cnpj = digits(body.cnpj);
          const telefone = digits(body.whatsapp);
          const mensagem = text("mensagem", 1500);
          const origem = text("origem", 240);

          if (text("empresa", 120)) return reply({ ok: true });
          if (!nome || !segmento || !assunto || !mensagem || body.consentimento !== true) {
            return reply({ ok: false, error: "Preencha todos os campos obrigatórios." }, 400);
          }
          if (cnpj.length !== 14 || telefone.length < 10 || telefone.length > 11) {
            return reply({ ok: false, error: "Confira o CNPJ e o WhatsApp informado." }, 400);
          }

          const token = process.env.APIDOSISTEMA_TOKEN;
          const connectionId = Number(process.env.APIDOSISTEMA_CONNECTION_ID);
          if (!token || !Number.isInteger(connectionId) || connectionId <= 0) {
            console.error("Variáveis APIDOSISTEMA não configuradas corretamente.");
            return reply({ ok: false, error: "A integração de atendimento ainda não está configurada." }, 503);
          }

          const brasiliaDateTime = new Intl.DateTimeFormat("pt-BR", {
            timeZone: "America/Sao_Paulo",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false,
          }).format(new Date());

          const content = [
            "Olá! Recebemos seu contato pelo site da CSTI Brasil.",
            "",
            `Nome: ${nome}`,
            `CNPJ: ${cnpj}`,
            `Segmento: ${segmento}`,
            `Assunto: ${assunto}`,
            `WhatsApp: ${telefone}`,
            `Mensagem: ${mensagem}`,
            origem ? `Origem: ${origem}` : "",
            "",
            "Nossa equipe dará continuidade ao atendimento por este canal.",
            `Data e hora: ${brasiliaDateTime} (horário de Brasília)`,
          ].filter(Boolean).join("\n");

          const apiResponse = await fetch("https://cloud.apidosistema.com/api/mensagem", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
              Accept: "application/json",
            },
            body: JSON.stringify({
              numero: `55${telefone}`,
              id_conexao: connectionId,
              tipo: "texto",
              conteudo: content,
              tipo_api: 1,
              enviar_digitando: 1,
              historico_chat: false,
            }),
          });

          if (!apiResponse.ok) {
            const apiText = await apiResponse.text();
            console.error("API Chat System recusou o envio Bearer:", apiResponse.status, apiText.slice(0, 300));

            // A coleção oficial também oferece o formato DEFAULT, que autentica
            // o envio nos parâmetros da própria requisição.
            if (apiResponse.status === 403) {
              const fallbackUrl = new URL("https://cloud.apidosistema.com/api/mensagem");
              fallbackUrl.search = new URLSearchParams({
                template: "1",
                token,
                conexao: String(connectionId),
                api: "1",
                text: content,
                numero: `55${telefone}`,
              }).toString();
              const fallbackResponse = await fetch(fallbackUrl, {
                method: "GET",
                headers: { Accept: "application/json" },
              });
              if (fallbackResponse.ok) return reply({ ok: true });
              const fallbackText = await fallbackResponse.text();
              console.error("API Chat System recusou o envio DEFAULT:", fallbackResponse.status, fallbackText.slice(0, 300));
            }

            return reply({ ok: false, error: "A plataforma não aceitou o envio. Confira a autorização e a conexão da API." }, 502);
          }

          return reply({ ok: true });
        } catch (error) {
          console.error("Erro ao processar formulário:", error);
          return reply({ ok: false, error: "Não foi possível processar a solicitação." }, 500);
        }
      },
    },
  },
});
