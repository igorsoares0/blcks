# Blcks - Biblioteca de Blocos React

Uma biblioteca de componentes React prontos para copiar e colar, construída com Next.js 15, TypeScript, Tailwind CSS e shadcn/ui.

## ✨ Características

- 🎨 **Componentes Bonitos**: Design moderno e minimalista
- 📋 **Copy & Paste**: Copie o código e cole no seu projeto
- 🎯 **TypeScript**: Totalmente tipado
- 🌙 **Dark Mode**: Suporte nativo a tema escuro
- 📱 **Responsivo**: Mobile-first design
- ⚡ **Performance**: Otimizado com Next.js 15
- 🔍 **Busca e Filtros**: Encontre blocos facilmente
- 📦 **Componentes Standalone**: Funcionam em qualquer projeto React

## 🚀 Início Rápido

### Pré-requisitos

- Node.js 18+
- npm, yarn, pnpm ou bun

### Instalação

```bash
# Clonar o repositório
git clone <seu-repo>
cd blcks

# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── page.tsx                    # Homepage com grid de blocos
│   ├── blocks/
│   │   └── [category]/
│   │       └── [blockId]/
│   │           └── page.tsx        # Página individual do bloco
│   └── layout.tsx
├── blocks/                         # Blocos/Componentes
│   ├── hero/
│   │   ├── hero1.tsx
│   │   └── hero2.tsx
│   ├── features/
│   │   └── features1.tsx
│   └── cta/
│       └── cta1.tsx
├── components/
│   ├── ui/                         # Componentes shadcn/ui
│   ├── block-preview.tsx           # Preview interativo
│   ├── code-block.tsx              # Syntax highlighting
│   ├── copy-button.tsx             # Botão de copiar
│   └── block-card.tsx              # Card do bloco
└── lib/
    ├── blocks-registry.ts          # Registry centralizado
    └── utils.ts
```

## 🎯 Como Usar os Blocos

### No Site

1. Navegue até o bloco desejado
2. Visualize o preview interativo
3. Veja o código na aba "Code"
4. Copie o código com um clique
5. Cole no seu projeto

### Nos Seus Projetos

Os blocos são **componentes React puros** que funcionam em:
- ✅ Next.js (App Router ou Pages Router)
- ✅ React + Vite
- ✅ Create React App
- ✅ Remix, Gatsby, etc.

**Importante**: Os blocos NÃO usam features específicas do Next.js (como `<Image>` ou `<Link>`), portanto são totalmente portáveis.

## 📦 Blocos Disponíveis

### Hero Sections (2)
- **hero-1**: Hero com imagem à direita
- **hero-2**: Hero com gradient background

### Features Sections (1)
- **features-1**: Grid de features com ícones

### CTA Sections (1)
- **cta-1**: Call-to-action simples com botões

## 🔧 Como Adicionar Novos Blocos

### 1. Criar o Componente

Crie o arquivo do bloco em `src/blocks/[categoria]/[nome].tsx`:

```tsx
interface MeuBlocoProps {
  title?: string;
  // ... outras props
}

export default function MeuBloco({
  title = 'Título padrão',
  // ... props com valores default
}: MeuBlocoProps) {
  return (
    <section className="w-full py-12">
      {/* Seu componente aqui */}
    </section>
  );
}
```

**Regras importantes:**
- ❌ Não use `<Image>` ou `<Link>` do Next.js
- ✅ Use `<img>` e `<a>` nativos
- ✅ Componentes devem ser standalone
- ✅ Use apenas classes Tailwind core
- ✅ Props devem ter valores default

### 2. Registrar no Registry

Adicione o bloco em `src/lib/blocks-registry.ts`:

```typescript
{
  id: 'meu-bloco-1',
  name: 'Meu Bloco Incrível',
  description: 'Descrição curta do bloco',
  category: 'categoria',
  tags: ['tag1', 'tag2'],
  dependencies: [
    { name: 'lucide-react', version: '^0.544.0' },
    { name: 'button', command: 'npx shadcn@latest add button' }
  ],
  previewProps: {
    title: 'Título de exemplo',
    // ... props para o preview
  },
  props: [
    { name: 'title', type: 'string', description: 'Título do bloco' },
    // ... documentação das props
  ],
  code: `// Cole o código do componente aqui como string`
}
```

### 3. Adicionar ao Component Map

Em `src/app/blocks/[category]/[blockId]/page.tsx`:

```typescript
const componentMap: Record<string, React.ComponentType<any>> = {
  'hero-1': Hero1,
  'meu-bloco-1': MeuBloco1, // Adicione aqui
  // ...
};
```

## 🎨 Customização

### Cores e Tema

O projeto usa as variáveis CSS do shadcn/ui. Personalize em `src/app/globals.css`:

```css
:root {
  --primary: 240 5.9% 10%;
  --background: 0 0% 100%;
  /* ... outras variáveis */
}
```

### Componentes shadcn/ui

Adicione mais componentes conforme necessário:

```bash
npx shadcn@latest add [component-name]
```

## 🛠️ Tecnologias

- **Next.js 15** - Framework React
- **TypeScript** - Tipagem estática
- **Tailwind CSS 4** - Estilização
- **shadcn/ui** - Componentes base
- **lucide-react** - Ícones
- **react-syntax-highlighter** - Syntax highlighting

## 📝 Scripts

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Rodar build
npm run start
```

## 🚀 Deploy

### Vercel (Recomendado)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Outros Hosts

O projeto é um Next.js padrão e pode ser deployado em:
- Vercel
- Netlify
- Railway
- Render
- AWS Amplify
- Cloudflare Pages

## 💡 Dicas

### Performance
- Componentes são otimizados para tree-shaking
- Use lazy loading para blocos pesados
- Imagens otimizadas com dimensões especificadas

### Acessibilidade
- Use cores com contraste adequado
- Adicione `aria-labels` quando necessário
- Teste navegação por teclado

### Manutenção
- Mantenha dependências atualizadas
- Documente props claramente
- Escreva código limpo e comentado

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Add: nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## 🎯 Roadmap

- [ ] Sistema de busca em tempo real
- [ ] Mais blocos (Pricing, Testimonials, FAQ, etc)
- [ ] Exportar múltiplos blocos
- [ ] Favoritos com localStorage
- [ ] Comparação de blocos lado a lado
- [ ] Integração com StackBlitz/CodeSandbox
- [ ] Themes personalizados
- [ ] CLI para instalar blocos

## 📞 Suporte

Se tiver dúvidas ou problemas, abra uma issue no repositório.

---

Construído com ❤️ usando Next.js, Tailwind CSS e shadcn/ui