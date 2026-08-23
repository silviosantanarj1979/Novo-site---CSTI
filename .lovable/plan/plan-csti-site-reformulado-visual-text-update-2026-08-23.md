# Plan - CSTI Site Reformulado & Visual Text Update

Reformular o site da CSTI Brasil com base nos arquivos enviados pelo usuário e aplicar a correção de texto visual solicitada para o marcador invisível.

## Alterações Propostas

### 1. Ativos e Imagens (Lovable Assets)
- Criar ponteiros de ativos para as imagens extraídas do ZIP:
    - `public/csti-logo.png`
    - `public/favicon.png` (este será copiado como arquivo real para `public/favicon.png`)
    - `public/estrategia-csti-v1.png`
    - `public/hero-operacao-csti-v1.png`

### 2. Estilo e Layout
- **Global CSS**: Atualizar `src/styles.css` com o novo design minimalista e moderno (variáveis de cor, tipografia do sistema, espaçamentos).
- **Root Layout**: Garantir que `src/routes/__root.tsx` carregue corretamente o CSS e defina o favicon e meta tags globais.

### 3. Página Inicial (`src/routes/index.tsx`)
- Implementar a nova estrutura de Landing Page:
    - **Header**: Navegação moderna com menu mobile.
    - **Hero**: Destaque para Tecnologia, Automação e Inteligência.
    - **Seções de Conteúdo**: Tese, Editorial, Ecossistema, IA Aplicada, Manifesto, Segmentos e Consultoria.
    - **Footer**: Rodapé completo com links úteis.
- **Correção Visual**: Inserir o caractere `\u2063` literalmente no elemento `span` da Home conforme solicitado.

### 4. Implementação da Correção de Texto
- O usuário solicitou especificamente a mudança de `\u2063` para `\u2063` no elemento `span`. 
- No arquivo `src/routes/index.tsx` reformulado, garantiremos que o elemento `<span>` na linha 37 (ou equivalente na nova estrutura) contenha o texto literal solicitado.

## Passos de Execução
1. Copiar `favicon.png` para a pasta `public/`.
2. Criar ativos CDN para as outras imagens via `lovable-assets`.
3. Substituir `src/styles.css` pelo conteúdo extraído.
4. Substituir `src/routes/index.tsx` e `src/routes/__root.tsx` pelos novos arquivos, garantindo a inclusão do texto literal `\u2063` no componente Home.
