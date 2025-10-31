# Como Criar Novos Blocos

Guia completo e passo a passo para adicionar novos blocos à biblioteca Blcks.

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Regras Importantes](#regras-importantes)
3. [Passo a Passo](#passo-a-passo)
4. [Exemplos Práticos](#exemplos-práticos)
5. [Checklist Final](#checklist-final)
6. [Troubleshooting](#troubleshooting)

---

## Visão Geral

Criar um novo bloco envolve 3 etapas principais:

1. **Criar o componente** do bloco em `src/blocks/[categoria]/`
2. **Registrar no registry** em `src/lib/blocks-registry.ts`
3. **Adicionar ao component map** em `src/app/blocks/[category]/[blockId]/page.tsx`

---

## Regras Importantes

### ✅ O QUE FAZER

- ✅ Usar componentes React puros (funcionam em qualquer projeto React/Next.js)
- ✅ Usar `<a>` em vez de `<Link>` do Next.js
- ✅ Usar `<img>` em vez de `<Image>` do Next.js
- ✅ Usar componentes shadcn/ui para interatividade (Sheet, Dialog, Accordion, etc)
- ✅ **SEMPRE usar ícones do lucide-react** (NUNCA emojis ou SVG inline)
- ✅ TypeScript com tipos explícitos
- ✅ Props com valores default
- ✅ Mobile-first (responsivo)
- ✅ Classes Tailwind CSS core

### ❌ O QUE EVITAR

- ❌ Não usar `'use client'` a menos que absolutamente necessário
- ❌ Não usar features específicas do Next.js (Image, Link, router, etc)
- ❌ Não usar `useState` manualmente - preferir componentes shadcn/ui
- ❌ Não usar classes Tailwind personalizadas
- ❌ Não criar componentes que dependem de contexto externo
- ❌ **NUNCA usar emojis (🚀, ✓, 💡, etc) - sempre usar lucide-react**
- ❌ **NUNCA usar SVG inline - sempre usar lucide-react (exceto logos de marcas como Google)**

### 🎯 Quando usar 'use client'

**Blocos ESTÁTICOS (NÃO precisam):**
- Hero sections
- Features sections
- CTA sections
- Footer
- Testimonials
- Pricing tables (sem interatividade)

**Blocos INTERATIVOS (usar shadcn/ui):**
- Navbar → Usar `<Sheet>` para menu mobile
- Modals → Usar `<Dialog>`
- Accordions → Usar `<Accordion>`
- Tabs → Usar `<Tabs>`
- Forms → Usar componentes shadcn/ui

**Apenas usar 'use client' se:**
- Não existe componente shadcn/ui equivalente
- Lógica muito customizada que não pode ser encapsulada

---

## Passo a Passo

### Passo 1: Criar o Componente

#### 1.1. Criar estrutura de pastas

```bash
# Exemplo: criar um bloco de pricing
mkdir -p src/blocks/pricing
```

#### 1.2. Criar arquivo do componente

**Arquivo:** `src/blocks/pricing/pricing1.tsx`

```tsx
// NÃO adicionar 'use client' se for bloco estático!
import { Check } from 'lucide-react'; // ✅ SEMPRE importar ícones do lucide-react

interface Pricing1Props {
  title?: string;
  subtitle?: string;
  plans?: {
    name: string;
    price: string;
    features: string[];
  }[];
}

export default function Pricing1({
  title = 'Escolha seu plano',
  subtitle = 'Preços simples e transparentes',
  plans = [
    {
      name: 'Básico',
      price: 'R$ 29',
      features: ['Feature 1', 'Feature 2', 'Feature 3']
    },
    {
      name: 'Pro',
      price: 'R$ 99',
      features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4']
    }
  ]
}: Pricing1Props) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {title}
          </h2>
          <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            {subtitle}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="flex flex-col p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-gray-500">/mês</span>
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    {/* ✅ CORRETO: usar ícone lucide-react */}
                    <Check className="h-4 w-4 text-green-500" />
                    {/* ❌ ERRADO: <span className="mr-2">✓</span> */}
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="mt-auto inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4">
                Começar
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Pontos importantes:**
- ✅ Interface com props tipadas
- ✅ Valores default em todas as props
- ✅ Classes Tailwind responsivas (`md:`, `lg:`)
- ✅ Dark mode (`dark:`)
- ✅ Sem 'use client' (é estático)
- ✅ **Ícones do lucide-react (NUNCA emojis)**

---

### Passo 2: Registrar no Registry

**Arquivo:** `src/lib/blocks-registry.ts`

Adicione o novo bloco no array `blocksRegistry`:

```typescript
export const blocksRegistry: BlockMetadata[] = [
  // ... blocos existentes

  {
    id: 'pricing-1',
    name: 'Pricing Table Simples',
    description: 'Tabela de preços com 3 planos, features e botão de ação. Design limpo e responsivo.',
    category: 'pricing',
    tags: ['pricing', 'plans', 'subscription', 'payment'],
    dependencies: [
      // Listar TODAS as dependências necessárias
    ],
    previewProps: {
      // Props que serão usadas no preview
      title: 'Escolha seu plano',
      subtitle: 'Preços simples e transparentes',
      plans: [
        {
          name: 'Básico',
          price: 'R$ 29',
          features: ['10 projetos', '5GB storage', 'Suporte por email']
        },
        {
          name: 'Pro',
          price: 'R$ 99',
          features: ['Projetos ilimitados', '50GB storage', 'Suporte prioritário', 'API access']
        },
        {
          name: 'Enterprise',
          price: 'R$ 299',
          features: ['Tudo do Pro', '500GB storage', 'Suporte 24/7', 'Custom integrations']
        }
      ]
    },
    props: [
      // Documentação das props
      { name: 'title', type: 'string', default: 'Escolha seu plano', description: 'Título da seção' },
      { name: 'subtitle', type: 'string', default: 'Preços simples e transparentes', description: 'Subtítulo da seção' },
      { name: 'plans', type: 'array', description: 'Array de planos com name, price e features' }
    ],
    code: `interface Pricing1Props {
  title?: string;
  subtitle?: string;
  plans?: {
    name: string;
    price: string;
    features: string[];
  }[];
}

export default function Pricing1({
  title = 'Escolha seu plano',
  subtitle = 'Preços simples e transparentes',
  plans = [
    {
      name: 'Básico',
      price: 'R$ 29',
      features: ['Feature 1', 'Feature 2', 'Feature 3']
    },
    {
      name: 'Pro',
      price: 'R$ 99',
      features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4']
    }
  ]
}: Pricing1Props) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      {/* Copiar TODO o código do componente aqui */}
    </section>
  );
}`
  }
];
```

**Dicas para o registry:**

- **id**: kebab-case, único (`pricing-1`, `hero-2`, `navbar-1`)
- **name**: Nome descritivo e claro
- **description**: 1-2 frases explicando o bloco
- **category**: Categoria do bloco (usa-se no filtro)
- **tags**: Tags para busca (seja generoso)
- **dependencies**: Liste TUDO que precisa instalar
- **previewProps**: Props realistas para o preview
- **props**: Documentação clara de cada prop
- **code**: Código COMPLETO como string (copie do arquivo .tsx)

---

### Passo 3: Adicionar ao Component Map

**Arquivo:** `src/app/blocks/[category]/[blockId]/page.tsx`

#### 3.1. Importar o componente

```typescript
import Pricing1 from '@/blocks/pricing/pricing1';
```

#### 3.2. Adicionar ao componentMap

```typescript
const componentMap: Record<string, React.ComponentType<any>> = {
  'navbar-1': Navbar1,
  'hero-1': Hero1,
  'hero-2': Hero2,
  'features-1': Features1,
  'cta-1': CTA1,
  'pricing-1': Pricing1, // ← Adicionar aqui
};
```

**⚠️ IMPORTANTE:** O ID no componentMap deve ser EXATAMENTE igual ao ID no registry!

---

### Passo 4: Instalar Dependências (se necessário)

Se o bloco usa componentes shadcn/ui que ainda não estão instalados:

```bash
# Exemplo: bloco usa Dialog
npx shadcn@latest add dialog

# Exemplo: bloco usa Select
npx shadcn@latest add select
```

Então adicione ao registry:

```typescript
dependencies: [
  { name: 'dialog', command: 'npx shadcn@latest add dialog' }
]
```

---

## Exemplos Práticos

### Exemplo 1: Bloco Estático (Footer)

**Arquivo:** `src/blocks/footer/footer1.tsx`

```tsx
// SEM 'use client' - é estático!

interface FooterLink {
  label: string;
  href: string;
}

interface Footer1Props {
  companyName?: string;
  links?: FooterLink[];
  copyright?: string;
}

export default function Footer1({
  companyName = 'Blcks',
  links = [
    { label: 'Sobre', href: '#' },
    { label: 'Contato', href: '#' },
    { label: 'Privacidade', href: '#' }
  ],
  copyright = '© 2024 Blcks. Todos os direitos reservados.'
}: Footer1Props) {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-xl font-bold">{companyName}</div>
          <div className="flex gap-6">
            {links.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
        <div className="text-center text-sm text-gray-500 mt-4">
          {copyright}
        </div>
      </div>
    </footer>
  );
}
```

**Registry:**

```typescript
{
  id: 'footer-1',
  name: 'Footer Simples',
  description: 'Footer minimalista com logo, links e copyright.',
  category: 'footer',
  tags: ['footer', 'navigation', 'links'],
  dependencies: [], // Sem dependências!
  previewProps: {
    companyName: 'Blcks',
    links: [
      { label: 'Sobre', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Contato', href: '#' },
      { label: 'Privacidade', href: '#' }
    ]
  },
  props: [
    { name: 'companyName', type: 'string', default: 'Blcks', description: 'Nome da empresa' },
    { name: 'links', type: 'FooterLink[]', description: 'Array de links com label e href' },
    { name: 'copyright', type: 'string', description: 'Texto de copyright' }
  ],
  code: `// Código completo aqui...`
}
```

---

### Exemplo 2: Bloco Interativo (FAQ com Accordion)

**Arquivo:** `src/blocks/faq/faq1.tsx`

```tsx
// SEM 'use client' - usa Accordion do shadcn/ui!

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQ1Props {
  title?: string;
  subtitle?: string;
  faqs?: FAQItem[];
}

export default function FAQ1({
  title = 'Perguntas Frequentes',
  subtitle = 'Tudo que você precisa saber',
  faqs = [
    {
      question: 'Como funciona?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    },
    {
      question: 'Quanto custa?',
      answer: 'Temos planos a partir de R$ 29/mês.'
    }
  ]
}: FAQ1Props) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {title}
          </h2>
          <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            {subtitle}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
```

**Registry:**

```typescript
{
  id: 'faq-1',
  name: 'FAQ com Accordion',
  description: 'Seção de perguntas frequentes com accordion expansível.',
  category: 'faq',
  tags: ['faq', 'questions', 'accordion', 'help'],
  dependencies: [
    { name: 'accordion', command: 'npx shadcn@latest add accordion' }
  ],
  previewProps: {
    title: 'Perguntas Frequentes',
    subtitle: 'Tudo que você precisa saber',
    faqs: [
      { question: 'Como funciona?', answer: 'É muito simples! Basta copiar o código e colar no seu projeto.' },
      { question: 'Preciso pagar?', answer: 'Não, todos os blocos são gratuitos e open source.' },
      { question: 'Posso customizar?', answer: 'Sim! Os blocos são 100% customizáveis com Tailwind CSS.' }
    ]
  },
  props: [
    { name: 'title', type: 'string', description: 'Título da seção' },
    { name: 'subtitle', type: 'string', description: 'Subtítulo da seção' },
    { name: 'faqs', type: 'FAQItem[]', description: 'Array de perguntas e respostas' }
  ],
  code: `// Código completo aqui...`
}
```

---

## Checklist Final

Antes de considerar o bloco completo, verifique:

### ✅ Componente

- [ ] Arquivo criado em `src/blocks/[categoria]/[nome].tsx`
- [ ] Interface TypeScript com todas as props
- [ ] Todas as props têm valores default
- [ ] Não usa features específicas do Next.js
- [ ] Não usa `'use client'` (a menos que necessário)
- [ ] Classes Tailwind responsivas (`md:`, `lg:`)
- [ ] Suporte a dark mode (`dark:`)
- [ ] **Ícones APENAS do lucide-react (ZERO emojis ou SVG inline)**
- [ ] Código limpo e comentado

### ✅ Registry

- [ ] Bloco adicionado ao `blocksRegistry` em `src/lib/blocks-registry.ts`
- [ ] ID único no formato kebab-case
- [ ] Nome descritivo
- [ ] Descrição clara (1-2 frases)
- [ ] Categoria correta
- [ ] Tags relevantes para busca
- [ ] Dependencies completas (npm + shadcn)
- [ ] previewProps com dados realistas
- [ ] props documentadas (nome, tipo, default, descrição)
- [ ] code com TODO o código do componente

### ✅ Component Map

- [ ] Componente importado em `src/app/blocks/[category]/[blockId]/page.tsx`
- [ ] Adicionado ao `componentMap` com ID correto

### ✅ Dependências

- [ ] Componentes shadcn/ui instalados (`npx shadcn@latest add ...`)
- [ ] Pacotes npm instalados (`npm install ...`)

### ✅ Teste

- [ ] Build passa sem erros (`npm run build`)
- [ ] Bloco aparece na home
- [ ] Filtro por categoria funciona
- [ ] Página individual carrega
- [ ] Preview renderiza corretamente
- [ ] Código é copiável
- [ ] Dependências estão listadas

---

## Troubleshooting

### Problema: Bloco não aparece na home

**Solução:**
- Verifique se foi adicionado ao `blocksRegistry`
- Confira se o ID está correto
- Certifique-se que a categoria existe

### Problema: Página individual mostra "not found"

**Solução:**
- Verifique se o componente foi importado em `page.tsx`
- Confira se foi adicionado ao `componentMap`
- Verifique se o ID no `componentMap` é igual ao do registry

### Problema: Build falha

**Solução:**
- Rode `npm run build` e veja o erro
- Geralmente é erro de tipo TypeScript
- Ou componente shadcn/ui não instalado

### Problema: Preview "achatado" ou mal renderizado

**Solução:**
- Para navbar/header: adicione a categoria ao layout adaptativo em `BlockPreview`
- Para outros: verifique classes Tailwind (w-full, py-12, etc)

### Problema: Erro de hidratação

**Solução:**
- Verifique se não está usando `Date.now()` ou `Math.random()`
- Confira se não tem diferença entre server/client render
- Adicione `suppressHydrationWarning` se necessário

### Problema: "Module not found" ao importar componente shadcn

**Solução:**
```bash
# Instale o componente
npx shadcn@latest add [nome-do-componente]
```

---

## Dicas Avançadas

### 1. Criar variações de um bloco

```
src/blocks/hero/
  ├── hero1.tsx    (com imagem à direita)
  ├── hero2.tsx    (com gradient)
  └── hero3.tsx    (com vídeo background)
```

Cada variação tem seu próprio ID no registry: `hero-1`, `hero-2`, `hero-3`

### 2. Blocos com sub-componentes

Se o bloco é muito complexo, crie componentes auxiliares:

```tsx
// Sub-componente (não precisa registrar)
function PricingCard({ plan }: { plan: Plan }) {
  return <div>...</div>;
}

// Bloco principal (este vai no registry)
export default function Pricing1({ plans }: Pricing1Props) {
  return (
    <section>
      {plans.map(plan => <PricingCard plan={plan} />)}
    </section>
  );
}
```

### 3. 🎨 SEMPRE usar ícones do lucide-react (NUNCA emojis)

**⚠️ REGRA OBRIGATÓRIA:** Todos os blocos devem usar ícones do lucide-react. Emojis e SVG inline são PROIBIDOS (exceto logos de marcas).

**✅ CORRETO:**
```tsx
import { Check, X, Star, Rocket, Zap, Heart } from 'lucide-react';

export default function MyBlock() {
  return (
    <div>
      {/* ✅ Usar lucide icons */}
      <Check className="h-5 w-5 text-green-500" />
      <Star className="h-6 w-6 text-yellow-500" />
      <Rocket className="h-8 w-8 text-blue-600 dark:text-blue-400" />
    </div>
  );
}
```

**❌ ERRADO:**
```tsx
export default function MyBlock() {
  return (
    <div>
      {/* ❌ NUNCA usar emojis */}
      <span>✓</span>
      <span>🚀</span>
      <span>⭐</span>

      {/* ❌ NUNCA usar SVG inline (exceto logos) */}
      <svg>...</svg>
    </div>
  );
}
```

**Como escolher o ícone certo:**
- Visite https://lucide.dev/ e busque o ícone
- Importe apenas os ícones que você vai usar
- Use tamanhos consistentes: `h-4 w-4`, `h-5 w-5`, `h-6 w-6`, `h-8 w-8`
- Adicione cores com dark mode: `text-blue-600 dark:text-blue-400`

**Lucide-react já está instalado**, não precisa adicionar ao dependencies do registry.

### 4. Props complexas (objetos, arrays)

Use interfaces claras:

```tsx
interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  socials?: {
    twitter?: string;
    linkedin?: string;
  };
}

interface Team1Props {
  title?: string;
  members?: TeamMember[];
}
```

### 5. Preview com altura customizada

Se seu bloco precisa de altura diferente no preview, edite `BlockPreview.tsx`:

```tsx
const previewClasses =
  block.category === 'navbar' ? "w-full min-h-[200px] bg-gray-50" :
  block.category === 'footer' ? "w-full min-h-[300px] bg-gray-50" :
  "w-full min-h-[400px] flex items-center justify-center bg-gray-50";
```

---

## Recursos Úteis

- **shadcn/ui docs**: https://ui.shadcn.com/
- **Tailwind CSS docs**: https://tailwindcss.com/
- **lucide-react icons**: https://lucide.dev/
- **TypeScript Handbook**: https://www.typescriptlang.org/docs/

---

## Resumo Rápido

```bash
# 1. Criar componente
touch src/blocks/[categoria]/[nome].tsx

# 2. Escrever código (sem 'use client' se possível)
# 3. Adicionar ao registry (src/lib/blocks-registry.ts)
# 4. Importar e adicionar ao componentMap (src/app/blocks/[category]/[blockId]/page.tsx)
# 5. Testar
npm run build

# 6. Visualizar
npm run dev
# Abrir http://localhost:3000
```

---

**Pronto! Agora você sabe criar blocos como um profissional! 🚀**

Se tiver dúvidas, consulte os blocos existentes como referência:
- `src/blocks/navbar/navbar1.tsx` - Exemplo de bloco interativo (com Sheet)
- `src/blocks/hero/hero1.tsx` - Exemplo de bloco estático simples
- `src/blocks/features/features1.tsx` - Exemplo com mapeamento de arrays