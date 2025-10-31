# Prompt: Criar Template de Biblioteca de Blocos/Componentes

Crie um template completo para uma biblioteca de blocos de componentes React (estilo shadcnblocks.com) que permite desenvolvedores copiarem e colarem componentes em seus projetos.

## Requisitos Técnicos

### Stack Base
- **Next.js 14+** com App Router (para o showcase/site)
- **TypeScript** 
- **Tailwind CSS**
- **shadcn/ui** como base dos componentes
- **lucide-react** para ícones

### Importante: Compatibilidade React/Next.js
Os **blocos/componentes** devem ser escritos como componentes React puros e universais que funcionam tanto em:
- Projetos React puro (Vite, CRA)
- Projetos Next.js (App Router ou Pages Router)

**Regras para os blocos:**
- Não usar features específicas do Next.js (Image, Link, etc) dentro dos blocos
- Usar `<a>` em vez de `<Link>` do Next.js
- Usar `<img>` em vez de `<Image>` do Next.js
- **IMPORTANTE:** Evitar 'use client' nos blocos sempre que possível
  - ✅ **Blocos estáticos (hero, features, cta, etc):** NÃO usar 'use client'
  - ✅ **Blocos interativos (navbar, modals, forms):** Usar componentes shadcn/ui (Sheet, Dialog, etc) em vez de implementar useState manualmente
  - ❌ Apenas usar 'use client' se absolutamente necessário (casos muito específicos)
- Componentes devem ser standalone e copiáveis
- **Preferir componentes shadcn/ui** para funcionalidades interativas (a interatividade fica encapsulada nos componentes da lib)

**O showcase/site** pode usar todas as features do Next.js normalmente.

### Estrutura do Projeto

```
src/
├── app/
│   ├── page.tsx (homepage com grid de blocos)
│   ├── blocks/
│   │   └── [category]/
│   │       └── [blockId]/
│   │           └── page.tsx (página individual do bloco)
│   └── layout.tsx
├── blocks/
│   ├── hero/
│   │   ├── hero1.tsx
│   │   └── hero2.tsx
│   ├── features/
│   │   └── features1.tsx
│   ├── cta/
│   │   └── cta1.tsx
│   └── navbar/
│       └── navbar1.tsx
├── components/
│   ├── ui/ (shadcn components)
│   ├── block-preview.tsx
│   ├── code-block.tsx
│   ├── copy-button.tsx
│   └── block-card.tsx
├── lib/
│   ├── blocks-registry.ts
│   └── utils.ts
└── styles/
    └── globals.css
```

## Funcionalidades Necessárias

### 1. Registry de Blocos
Crie um sistema de registro centralizado (`blocks-registry.ts`) que contenha:
- ID único do bloco
- Nome e descrição
- Categoria
- Código fonte do componente (como string)
- Dependências necessárias (shadcn components, pacotes npm)
- Tags para busca
- Preview props (props padrão para demo)

### 2. Componente BlockPreview
- Renderiza o componente visualmente
- Mostra o código formatado com syntax highlighting
- Botão "Copy Code" funcional com feedback visual
- Abas: Preview / Code / Dependencies
- Responsivo e com tema claro/escuro
- **Layout adaptativo:** Diferentes layouts de preview baseados na categoria do bloco
  - Navbar: altura menor (min-h-[200px]), sem centralização
  - Outros blocos: altura padrão (min-h-[400px]), centralizado

### 3. Componente CodeBlock
- Syntax highlighting (usando Shiki ou react-syntax-highlighter)
- Suporte a tema dark/light
- Números de linha
- Botão de copiar integrado
- Formatação automática do código

### 4. Página Home
- Grid de cards mostrando todos os blocos
- Filtro por categoria
- Busca por nome/tag
- Card preview com:
  - Thumbnail/miniatura do componente
  - Nome e descrição curta
  - Categoria badge
  - Link para página detalhada

### 5. Página Individual do Bloco
- Preview grande e interativo do componente
- Código completo do componente
- Lista de dependências necessárias
- Comandos de instalação (ex: `npx shadcn@latest add button`)
- Props documentation (tabela com nome, tipo, default, descrição)
- Exemplos de variações do componente

### 6. Blocos Iniciais (criar pelo menos 5)

**Navbar (1 variação)**
- Navbar responsiva com menu mobile usando Sheet do shadcn/ui
- Sticky header com backdrop blur
- Desktop navigation + CTA button
- Mobile menu com Sheet component

**Hero Section (2 variações)**
- Hero com imagem à direita
- Hero com background gradient

**Features Section**
- Grid de features com ícones

**CTA Section**
- Call-to-action simples com botões

Cada bloco deve:
- Ser totalmente tipado com TypeScript
- Ter props com valores default
- Ser responsivo (mobile-first)
- Usar apenas classes Tailwind core
- Funcionar de forma standalone (copiável)
- **Não usar 'use client' a menos que absolutamente necessário**
- **Usar componentes shadcn/ui** para funcionalidades interativas (Sheet, Dialog, Accordion, etc)

## Especificações de Design

### Estilo Geral
- Design moderno e minimalista
- Espaçamento generoso
- Tipografia clara e hierarquizada
- Suporte a dark mode nativo

### Cores
- Use o tema padrão do shadcn/ui
- Background neutro (slate/zinc)
- Destaques com cor primária
- Código com tema de syntax highlighting suave

### Layout
- Container responsivo (max-width)
- Grid system para organizar blocos
- Navegação simples e clara
- Footer com créditos/links

## Funcionalidades Extras (Bônus)

- [ ] Sistema de busca em tempo real
- [ ] Filtros múltiplos (categoria + tags)
- [ ] Contagem de "copys" por bloco
- [ ] Botão "Open in StackBlitz/CodeSandbox"
- [ ] Sistema de favoritos (localStorage)
- [ ] Modo de comparação (ver 2 blocos lado a lado)
- [ ] Export múltiplos blocos de uma vez

## Critérios de Qualidade

### Código
- Clean code e bem comentado
- Tipos TypeScript explícitos
- Sem erros no console
- Performance otimizada (lazy loading)

### UX
- Transições suaves
- Estados de loading
- Feedback visual em ações
- Acessibilidade (ARIA labels, keyboard navigation)

### DX (Developer Experience)
- README detalhado
- Instruções claras de setup
- Fácil adicionar novos blocos
- Sistema de registry extensível

## Output Esperado

Crie os seguintes arquivos principais:

1. **blocks-registry.ts** - Sistema de registro completo
2. **block-preview.tsx** - Componente de preview interativo com layout adaptativo
3. **code-block.tsx** - Componente de código com syntax highlighting (react-syntax-highlighter)
4. **copy-button.tsx** - Botão de copiar com feedback visual
5. **block-card.tsx** - Card para grid de blocos
6. **app/page.tsx** - Homepage com grid de blocos, busca e filtros
7. **app/blocks/[category]/[blockId]/page.tsx** - Página dinâmica individual
8. **blocks/navbar/navbar1.tsx** - Exemplo de bloco Navbar (usando Sheet)
9. **blocks/hero/hero1.tsx** - Exemplo de bloco Hero
10. **blocks/hero/hero2.tsx** - Hero variação 2
11. **blocks/features/features1.tsx** - Bloco de features
12. **blocks/cta/cta1.tsx** - Bloco de CTA
13. **app/layout.tsx** - Layout com suppressHydrationWarning
14. **README.md** - Documentação completa do projeto

## Instruções Finais

- Use apenas classes Tailwind CSS core (não personalizadas)
- **Priorizar Server Components:** Evite 'use client' sempre que possível
  - Blocos estáticos devem ser Server Components
  - Para interatividade, use componentes shadcn/ui (Sheet, Dialog, Tabs, etc) que já encapsulam o 'use client'
  - Apenas use 'use client' manualmente em casos muito específicos onde não há alternativa
- Priorize simplicidade e facilidade de manutenção
- Código deve ser facilmente copiável e funcionar standalone
- Inclua comentários explicativos em pontos-chave do código
- **Adicionar suppressHydrationWarning no layout.tsx** (html e body tags) para evitar warnings de hidratação com fontes Next.js

**O resultado final deve ser um projeto que eu possa:**
1. Clonar e rodar imediatamente
2. Adicionar novos blocos facilmente
3. Customizar para minha marca/design
4. Deploy em produção (Vercel/Netlify)