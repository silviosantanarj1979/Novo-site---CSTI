# Blog CSTI Brasil — Sanity CMS + Lovable

> **Estado:** menu e interface implementados. A conexão com Sanity será ativada após configurar SANITY_PROJECT_ID no servidor. Sem essa variável, o blog continua lendo o Supabase.

> **Atenção:** o painel existente em /admin publica no Supabase, e NÃO no Sanity. Quando o Sanity for ativado, novos artigos devem ser publicados no Sanity Studio.

## Criar e publicar o Sanity Studio

1. Acesse https://www.sanity.io/manage e crie o projeto CSTI Brasil Blog.
2. Escolha o dataset público production e copie o Project ID.
3. No repositório, entre na pasta sanity-studio e execute npm install.
4. Copie sanity-studio/.env.example para sanity-studio/.env e preencha SANITY_STUDIO_PROJECT_ID e SANITY_STUDIO_DATASET.
5. Execute npm run dev para testar; em seguida npm run deploy para publicar o painel em endereço .sanity.studio.
6. No Studio, crie um documento Artigo do Blog com título, slug, resumo, capa, categoria, data e conteúdo, depois clique Publish.

## Vincular o site (Vercel ou hospedagem atual)

No ambiente de produção do site adicione:

```dotenv
SANITY_PROJECT_ID=SEU_PROJECT_ID
SANITY_DATASET=production
```

Esses dois valores não são senhas. Faça um novo deploy para que as variáveis cheguem ao servidor. A leitura usa a API oficial do Sanity e não exige token para dataset público. Não copie tokens de escrita para o código público.

As rotas existentes /api/blog e /api/blog/:slug passam a consultar os documentos publicados no Sanity, abastecendo /blog e /blog/:slug.

## Validação

1. Confira a navegação Blog nos menus desktop e mobile.
2. Publique um artigo real no Sanity Studio.
3. Abra https://cstibrasil.com.br/api/blog; deve aparecer source: sanity e o artigo criado.
4. Abra https://cstibrasil.com.br/blog/SEU-SLUG e confira capa, data, textos, links e celular.
5. Os sete assuntos do ZIP foram transformados em artigos editoriais originais e completos. Abra cada um e verifique textos, sumário, referências e tempo de leitura.

## Cuidados

- O site mantém o Supabase como opção anterior até que SANITY_PROJECT_ID seja configurado.
- Artigos do Supabase não são migrados automaticamente. O painel antigo em /admin não grava no Sanity.
- Os sete registros originados do ZIP são lidos de src/lib/blog-zip-seed.ts e dos textos originais em src/lib/blog-editorial-{a,b,c}.ts. Eles aparecem mesmo sem CMS e continuam visíveis ao lado de artigos reais, a menos que um artigo real use o mesmo slug.
- Esses sete artigos completos estão no código do site, mas NÃO estão cadastrados no Sanity: para editá-los pelo Studio, será preciso criar/importar documentos no projeto Sanity após sua configuração.
- O dataset configurado para leitura pública precisa ser público; datasets privados exigem backend com autenticação no servidor.
- Não coloque tokens, senhas e chaves privadas no repositório.
- O frontend faz as consultas ao Sanity pelo servidor (evitando necessidades de CORS no navegador para essa leitura).

---

## Painel Supabase anterior (legado)
O blog funciona com Supabase para permitir criar e publicar artigos sem Lovable, GitHub ou novo deploy.

## 1. Criar o projeto

1. Acesse `https://supabase.com/dashboard`.
2. Crie um projeto para o site da CSTI Brasil.
3. Abra **SQL Editor**.
4. Copie todo o conteúdo de `supabase/blog.sql`, cole no editor e clique em **Run**.

## 2. Criar o usuário administrador

1. No Supabase, abra **Authentication > Users**.
2. Clique em **Add user > Create new user**.
3. Cadastre o e-mail e a senha que serão utilizados em `/admin`.
4. Não divulgue essa senha e não a coloque no GitHub.

## 3. Configurar a Vercel

No projeto `csti-brasil-site`, abra **Settings > Environment Variables** e crie:

- `SUPABASE_URL`: URL exibida em **Supabase > Project Settings > API**.
- `SUPABASE_ANON_KEY`: chave pública `anon` exibida na mesma tela.

As duas variáveis devem ser habilitadas para **Production**. Depois, faça um novo deployment.

## 4. Usar

- Blog público: `https://www.cstibrasil.com.br/blog`
- Painel: `https://www.cstibrasil.com.br/admin`

O painel permite cadastrar título, endereço, categoria, resumo, imagem, conteúdo, tags, status e metadados de SEO.

## Segurança

- A sessão administrativa é mantida em cookie `HttpOnly`, `Secure` e `SameSite=Lax`.
- O navegador não recebe a senha nem a chave do banco.
- As regras RLS do Supabase permitem escrita somente para usuários autenticados.

## Revisão editorial de 11/11/2026

- Textos completos e originais gerados para sete temas do arquivo ZIP, com cerca de 700 a 940 palavras cada.
- Layout revisado: fontes menores, resumos, sumário navegável, listas formatadas, referências oficiais e artigos relacionados.
- Data editorial atualizada para novembro de 2026. As datas dos cards do ZIP foram substituídas para evitar atribuir textos recém-redigidos a 2025.
- API /api/blog retorna metadados leves para melhorar o carregamento; /api/blog/:slug retorna o conteúdo integral.
- As políticas e os preços da Meta mudam: os textos evitam valores fixos e indicam referências oficiais para consulta vigente.
- A hospedagem precisa compilar e publicar o commit atualizado. Valide navegação e links na URL oficial após o deploy.
