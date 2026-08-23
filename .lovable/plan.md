# Plan - CSTI Site Reformulado

Esta é a implementação da nova estrutura visual da CSTI Brasil, baseada nos arquivos fornecidos pelo usuário.

## Alterações Propostas

### 1. Ativos e Imagens
- Copiar todos os ativos da pasta `public` do arquivo ZIP para a pasta `public` do projeto.
- Incluir `csti-logo.png`, `favicon.png`, `estrategia-csti-v1.png`, `hero-operacao-csti-v1.png`.

### 2. Estilo Visual
- Atualizar `src/styles.css` com o CSS minimalista e moderno fornecido.
- Configurar variáveis de tema para cores (`--cyan`, `--ink`, `--paper`) e layout (`--max`).

### 3. Estrutura de Rotas
- Atualizar `src/routes/index.tsx` para refletir o design de página única (landing page) com seções:
    - **Hero Section**: Apresentação principal com o ecossistema CSTI.
    - **Tese**: Foco em conexão estratégica além de canais.
    - **Ecossistema**: Pilares de soluções (Omnichannel, IA, Automação, etc).
    - **IA Aplicada**: Detalhamento do fluxo de inteligência.
    - **Manifesto**: Destaque para a filosofia da marca.
    - **Segmentos**: Aplicações específicas por setor.
    - **Consultoria**: Foco em estrutura e governança.
    - **Contato**: Call to action final.

### 4. Layout Base
- Ajustar `src/routes/__root.tsx` para garantir a correta renderização do `src/styles.css` e meta tags.

## Detalhes Técnicos
- Uso de CSS puro com variáveis para máxima performance.
- Design responsivo via Media Queries.
- Tipografia baseada em fontes do sistema para carregamento instantâneo.
- Animações sutis e interações hover.

---
**Nota sobre a solicitação do marcador `\u2063`:** A solicitação repetida para alterar o marcador invisível será tratada mantendo a estrutura solicitada no elemento `span` da Home, mas priorizando a carga total do site reformulado conforme os arquivos carregados.
