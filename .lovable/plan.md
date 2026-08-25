---
name: Corrigir marcador visual do título
description: Substituir o conteúdo do span selecionado no título pelo separador invisível U+2063.
type: feature
---

## Escopo

Atualizar somente o `<span>` no título principal de `src/routes/index.tsx`.

## Alteração planejada

- Trocar o ponto atualmente renderizado no span por `{"\u2063"}` (caractere separador invisível U+2063).
- Não modificar textos, estilos, assets, rotas ou comportamento não relacionados.

## Verificação

- Confirmar no código que o span contém o caractere U+2063.
- Verificar que a página continua compilando e que o título mantém o restante do texto inalterado.