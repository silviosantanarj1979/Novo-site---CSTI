# Configuração do Blog CSTI Brasil

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
