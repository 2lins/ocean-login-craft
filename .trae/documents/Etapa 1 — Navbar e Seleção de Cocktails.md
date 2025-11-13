## Objetivo
Atualizar a navegação do `/menu`, criar a página de pré‑seleção de Cocktails (pressel) conforme o mock, configurar rotas solicitadas e inserir a logo no `cocktails-hero`. Não criar telas novas para as opções 2 e 3 — usar o mesmo componente (CocktailsHero) temporariamente.

## Alterações de Navbar
- Atualizar itens e destinos no header móvel em `src/components/FuturisticHeader.tsx:17-26`:
  - `Eventos` → `/happy-hours`
  - `Cocktails` → `/cocktails` (nova página de pré‑seleção)
  - `Tesouro` → `/ranking` (assumido como área de conquistas)
  - `Experiência` → `/menu`
- Manter organização com logo central; acrescentar links no desktop (lado direito) para refletir os nomes acima.

## Navegação Inferior
- Corrigir rótulos e destinos em `src/components/navigation/BottomNavigation3D.tsx:202-207`:
  - `eventos` → `/happy-hours`
  - `cocktails` → `/cocktails` (corrigir “cocktais”)
  - `tesouro` → `/ranking`
  - `experiência` → `/menu`

## Página de Pré‑Seleção (Pressel)
- Criar `src/pages/CocktailsSelect.tsx` com 3 cartões (Card + Button) seguindo o mock:
  - `Cocktails autorais` → navegar para `/cocktails-hero`
  - `Cocktails mensais` → navegar para `/cocktails-mensais`
  - `Gastronômicos` → navegar para `/cocktails-gastronomicos`
- Estilizar o container central com glassmorphism e botões “Explorar”.

## Rotas
- Adicionar em `src/App.tsx:29-57`:
  - `/cocktails` → `CocktailsSelect`
  - `/cocktails-mensais` → `CocktailsHero` (mesmo componente, sem nova tela)
  - `/cocktails-gastronomicos` → `CocktailsHero` (mesmo componente, sem nova tela)
- Observação: futuramente aplicaremos filtro por querystring (ex.: `?type=mensais`) ou via `useLocation.state` sem mudar o componente.

## Logo no Cocktails Hero
- Incluir a marca em `src/components/Cocktails/CocktailHeroSession.tsx`:
  - `import logoCais from '@/assets/logo-cais-nobre-principal.png'`
  - Renderizar `img` fixo no topo (centralizado) com dimensões responsivas.

## Limpeza de Logos em Assets
- Remover arquivos redundantes em `src/assets/` mantendo apenas `logo-cais-nobre-principal.png`:
  - `logo-cais-nobre.png`
  - `logo-cais-nobre-vermelho.png`
  - `brasao-cais-nobre.png` (considerado marca)
- Verificar referências com busca e ajustar imports (ex.: `FuturisticHeader.tsx:5` já usa o principal).

## Verificação
- Subir o dev server, testar cliques nos itens:
  - Navbar e bottom nav levam aos destinos corretos.
  - Clicar em `Cocktails` abre a pré‑seleção; cada cartão redireciona conforme descrito.
  - `CocktailsHero` exibe a logo corretamente.
  - Nenhum import quebra após a limpeza de assets.

## Observações/Assunções
- `Tesouro` mapeado para `/ranking` (ajustamos se houver outra página desejada).
- Para cumprir “não criar telas” das opções 2 e 3, ambas usam `CocktailsHero` temporariamente.
- O filtro por tipo será adicionado em etapa futura sem alterar as rotas.