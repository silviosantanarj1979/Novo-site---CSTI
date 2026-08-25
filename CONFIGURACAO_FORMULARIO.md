# Configuração do formulário de contato

O formulário envia uma mensagem de confirmação ao WhatsApp preenchido pelo visitante usando a API Chat System V1. A credencial fica apenas no servidor da Vercel.

## Variáveis na Vercel

No projeto, abra **Settings → Environment Variables** e crie:

- `APIDOSISTEMA_TOKEN`: token Bearer fornecido pela plataforma.
- `APIDOSISTEMA_CONNECTION_ID`: ID numérico da conexão WhatsApp que fará o envio.

Marque **Production**, **Preview** e **Development** conforme necessário. Depois, faça um novo deployment.

## Teste

1. Abra `/contato` no deployment.
2. Preencha um CNPJ válido e um WhatsApp de teste com DDD.
3. Finalize o cadastro.
4. Confirme o recebimento da mensagem e verifique os logs da função na Vercel.

Nunca coloque o token em arquivos públicos, no código do navegador ou no GitHub.
