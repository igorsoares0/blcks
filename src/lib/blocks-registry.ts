export interface BlockDependency {
  name: string;
  version?: string;
  command?: string; // comando shadcn/ui se aplicável
}

export interface BlockMetadata {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  dependencies: BlockDependency[];
  code: string;
  previewProps?: Record<string, any>;
  props?: {
    name: string;
    type: string;
    default?: string;
    description: string;
  }[];
}

// Helper para gerar código do bloco a partir do arquivo
export const getBlockCode = (blockId: string): string => {
  // Em produção, isso seria carregado dinamicamente ou do sistema de arquivos
  // Por enquanto, retornamos o código inline no registry
  return blocksRegistry.find(b => b.id === blockId)?.code || '';
};

export const blocksRegistry: BlockMetadata[] = [
  {
    id: 'navbar-1',
    name: 'Navbar Responsiva',
    description: 'Barra de navegação moderna com menu mobile, sticky header e backdrop blur. Totalmente responsiva.',
    category: 'navbar',
    tags: ['navbar', 'navigation', 'menu', 'header', 'mobile'],
    dependencies: [
      { name: 'lucide-react', version: '^0.544.0' },
      { name: 'button', command: 'npx shadcn@latest add button' },
      { name: 'sheet', command: 'npx shadcn@latest add sheet' }
    ],
    previewProps: {
      logo: 'Blcks',
      items: [
        { label: 'Início', href: '#' },
        { label: 'Blocos', href: '#blocos' },
        { label: 'Documentação', href: '#docs' },
        { label: 'Sobre', href: '#sobre' }
      ],
      ctaText: 'Começar',
      ctaHref: '#'
    },
    props: [
      { name: 'logo', type: 'string', default: 'Blcks', description: 'Texto/nome do logo' },
      { name: 'items', type: 'NavItem[]', description: 'Array de items de navegação com label e href' },
      { name: 'ctaText', type: 'string', default: 'Começar', description: 'Texto do botão CTA' },
      { name: 'ctaHref', type: 'string', default: '#', description: 'Link do botão CTA' }
    ],
    code: `import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface NavItem {
  label: string;
  href: string;
}

interface Navbar1Props {
  logo?: string;
  items?: NavItem[];
  ctaText?: string;
  ctaHref?: string;
}

export default function Navbar1({
  logo = 'Blcks',
  items = [
    { label: 'Início', href: '#' },
    { label: 'Blocos', href: '#blocos' },
    { label: 'Documentação', href: '#docs' },
    { label: 'Sobre', href: '#sobre' }
  ],
  ctaText = 'Começar',
  ctaHref = '#'
}: Navbar1Props) {
  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 backdrop-blur-sm bg-white/90 dark:bg-gray-900/90">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-xl font-bold text-gray-900 dark:text-white">
              {logo}
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button asChild size="sm">
              <a href={ctaHref}>{ctaText}</a>
            </Button>
          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>{logo}</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-8">
                  {items.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                  <Button asChild className="mt-4">
                    <a href={ctaHref}>{ctaText}</a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}`
  },
  {
    id: 'hero-1',
    name: 'Hero com Imagem à Direita',
    description: 'Seção hero moderna com texto à esquerda e imagem à direita. Totalmente responsivo e personalizável.',
    category: 'hero',
    tags: ['hero', 'landing', 'cta', 'image'],
    dependencies: [
      { name: 'lucide-react', version: '^0.544.0' },
      { name: 'button', command: 'npx shadcn@latest add button' }
    ],
    previewProps: {
      title: 'Construa seu próximo projeto com nossos blocos',
      subtitle: 'Componentes React prontos para copiar e colar',
      description: 'Uma coleção crescente de componentes bonitos e acessíveis. Copy, paste, customize. É simples assim.',
      primaryCTA: 'Começar agora',
      secondaryCTA: 'Ver exemplos',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop'
    },
    props: [
      { name: 'title', type: 'string', description: 'Título principal do hero' },
      { name: 'subtitle', type: 'string', description: 'Subtítulo acima do título' },
      { name: 'description', type: 'string', description: 'Descrição abaixo do título' },
      { name: 'primaryCTA', type: 'string', description: 'Texto do botão primário' },
      { name: 'secondaryCTA', type: 'string', description: 'Texto do botão secundário' },
      { name: 'imageUrl', type: 'string', description: 'URL da imagem' }
    ],
    code: `import { ArrowRight } from 'lucide-react';

interface Hero1Props {
  title?: string;
  subtitle?: string;
  description?: string;
  primaryCTA?: string;
  secondaryCTA?: string;
  imageUrl?: string;
}

export default function Hero1({
  title = 'Construa seu próximo projeto com nossos blocos',
  subtitle = 'Componentes React prontos para copiar e colar',
  description = 'Uma coleção crescente de componentes bonitos e acessíveis. Copy, paste, customize. É simples assim.',
  primaryCTA = 'Começar agora',
  secondaryCTA = 'Ver exemplos',
  imageUrl = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop'
}: Hero1Props) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-primary">{subtitle}</p>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                {title}
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                {description}
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8">
                {primaryCTA}
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8">
                {secondaryCTA}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <img
              src={imageUrl}
              alt="Hero"
              className="rounded-xl object-cover w-full h-[400px] lg:h-[500px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}`
  },
  {
    id: 'hero-2',
    name: 'Hero com Gradient Background',
    description: 'Hero section com background gradient vibrante e efeitos visuais modernos.',
    category: 'hero',
    tags: ['hero', 'landing', 'gradient', 'modern'],
    dependencies: [
      { name: 'lucide-react', version: '^0.544.0' }
    ],
    previewProps: {
      title: 'Transforme suas ideias em realidade',
      description: 'Plataforma completa para criar, lançar e escalar seus projetos digitais com velocidade e confiança.',
      primaryCTA: 'Começar gratuitamente',
      secondaryCTA: 'Agendar demo'
    },
    props: [
      { name: 'title', type: 'string', description: 'Título principal do hero' },
      { name: 'description', type: 'string', description: 'Descrição do hero' },
      { name: 'primaryCTA', type: 'string', description: 'Texto do botão primário' },
      { name: 'secondaryCTA', type: 'string', description: 'Texto do botão secundário' }
    ],
    code: `import { Sparkles } from 'lucide-react';

interface Hero2Props {
  title?: string;
  description?: string;
  primaryCTA?: string;
  secondaryCTA?: string;
}

export default function Hero2({
  title = 'Transforme suas ideias em realidade',
  description = 'Plataforma completa para criar, lançar e escalar seus projetos digitais com velocidade e confiança.',
  primaryCTA = 'Começar gratuitamente',
  secondaryCTA = 'Agendar demo'
}: Hero2Props) {
  return (
    <section className="relative w-full py-20 md:py-32 lg:py-40 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 dark:from-purple-900 dark:via-pink-900 dark:to-orange-900"></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Content */}
      <div className="relative container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 text-sm text-white">
            <Sparkles className="mr-2 h-4 w-4" />
            Novidade: Lançamos a versão 2.0
          </div>

          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-white max-w-4xl">
            {title}
          </h1>

          <p className="max-w-2xl text-lg md:text-xl text-white/90">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-white text-black hover:bg-white/90 h-11 px-8">
              {primaryCTA}
            </button>
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border-2 border-white text-white hover:bg-white/10 h-11 px-8">
              {secondaryCTA}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}`
  },
  {
    id: 'features-1',
    name: 'Features Grid com Ícones',
    description: 'Grade de features com ícones, título e descrição. Layout responsivo 3 colunas.',
    category: 'features',
    tags: ['features', 'grid', 'icons', 'services'],
    dependencies: [
      { name: 'lucide-react', version: '^0.544.0' }
    ],
    previewProps: {
      title: 'Tudo que você precisa',
      description: 'Ferramentas poderosas para acelerar seu desenvolvimento',
      features: [
        {
          icon: 'Zap',
          title: 'Extremamente rápido',
          description: 'Otimizado para performance. Carregamento instantâneo e experiência fluida.'
        },
        {
          icon: 'Shield',
          title: 'Seguro por padrão',
          description: 'Proteção em todas as camadas. Seus dados sempre seguros e criptografados.'
        },
        {
          icon: 'Code',
          title: 'Developer First',
          description: 'APIs intuitivas e documentação completa. Comece a construir em minutos.'
        },
        {
          icon: 'Layers',
          title: 'Altamente escalável',
          description: 'Cresce com seu negócio. De startup a enterprise, suportamos seu crescimento.'
        },
        {
          icon: 'Users',
          title: 'Colaboração',
          description: 'Trabalhe em equipe com facilidade. Ferramentas colaborativas integradas.'
        },
        {
          icon: 'BarChart',
          title: 'Analytics',
          description: 'Insights em tempo real. Tome decisões baseadas em dados concretos.'
        }
      ]
    },
    props: [
      { name: 'title', type: 'string', description: 'Título da seção' },
      { name: 'description', type: 'string', description: 'Descrição da seção' },
      { name: 'features', type: 'array', description: 'Array de features com icon, title e description' }
    ],
    code: `import { Zap, Shield, Code, Layers, Users, BarChart, LucideIcon } from 'lucide-react';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface Features1Props {
  title?: string;
  description?: string;
  features?: Feature[];
}

const iconMap: Record<string, LucideIcon> = {
  Zap,
  Shield,
  Code,
  Layers,
  Users,
  BarChart
};

export default function Features1({
  title = 'Tudo que você precisa',
  description = 'Ferramentas poderosas para acelerar seu desenvolvimento',
  features = [
    {
      icon: 'Zap',
      title: 'Extremamente rápido',
      description: 'Otimizado para performance. Carregamento instantâneo e experiência fluida.'
    },
    {
      icon: 'Shield',
      title: 'Seguro por padrão',
      description: 'Proteção em todas as camadas. Seus dados sempre seguros e criptografados.'
    },
    {
      icon: 'Code',
      title: 'Developer First',
      description: 'APIs intuitivas e documentação completa. Comece a construir em minutos.'
    }
  ]
}: Features1Props) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {title}
          </h2>
          <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            {description}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Zap;
            return (
              <div key={index} className="flex flex-col items-center text-center space-y-3 p-6 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <div className="p-3 rounded-full bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-gray-500 dark:text-gray-400">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}`
  },
  {
    id: 'cta-1',
    name: 'CTA Simples',
    description: 'Call-to-action limpo e direto com título, descrição e botões de ação.',
    category: 'cta',
    tags: ['cta', 'call-to-action', 'conversion'],
    dependencies: [
      { name: 'lucide-react', version: '^0.544.0' }
    ],
    previewProps: {
      title: 'Pronto para começar?',
      description: 'Junte-se a milhares de desenvolvedores que já estão construindo projetos incríveis.',
      primaryCTA: 'Criar conta grátis',
      secondaryCTA: 'Falar com vendas'
    },
    props: [
      { name: 'title', type: 'string', description: 'Título do CTA' },
      { name: 'description', type: 'string', description: 'Descrição do CTA' },
      { name: 'primaryCTA', type: 'string', description: 'Texto do botão primário' },
      { name: 'secondaryCTA', type: 'string', description: 'Texto do botão secundário' }
    ],
    code: `import { ArrowRight } from 'lucide-react';

interface CTA1Props {
  title?: string;
  description?: string;
  primaryCTA?: string;
  secondaryCTA?: string;
}

export default function CTA1({
  title = 'Pronto para começar?',
  description = 'Junte-se a milhares de desenvolvedores que já estão construindo projetos incríveis.',
  primaryCTA = 'Criar conta grátis',
  secondaryCTA = 'Falar com vendas'
}: CTA1Props) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-6 text-center bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-12 md:p-16">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
              {title}
            </h2>
            <p className="mx-auto max-w-[600px] text-white/90 md:text-xl">
              {description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-white text-black hover:bg-white/90 h-11 px-8">
              {primaryCTA}
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border-2 border-white text-white hover:bg-white/10 h-11 px-8">
              {secondaryCTA}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}`
  },
  {
    id: 'footer-1',
    name: 'Footer Completo',
    description: 'Footer com informações da empresa, seções de links, ícones sociais e copyright. Layout responsivo.',
    category: 'footer',
    tags: ['footer', 'links', 'social', 'navigation', 'company'],
    dependencies: [],
    previewProps: {
      companyName: 'Blcks',
      description: 'Componentes React prontos para copiar e colar. Copy, paste, customize.',
      sections: [
        {
          title: 'Produto',
          links: [
            { label: 'Features', href: '#' },
            { label: 'Preços', href: '#' },
            { label: 'Documentação', href: '#' }
          ]
        },
        {
          title: 'Empresa',
          links: [
            { label: 'Sobre', href: '#' },
            { label: 'Blog', href: '#' },
            { label: 'Carreiras', href: '#' }
          ]
        },
        {
          title: 'Suporte',
          links: [
            { label: 'Ajuda', href: '#' },
            { label: 'Contato', href: '#' },
            { label: 'Status', href: '#' }
          ]
        }
      ],
      socialLinks: {
        twitter: '#',
        github: '#',
        linkedin: '#'
      },
      copyright: '© 2024 Blcks. Todos os direitos reservados.'
    },
    props: [
      { name: 'companyName', type: 'string', default: 'Blcks', description: 'Nome da empresa' },
      { name: 'description', type: 'string', description: 'Descrição da empresa' },
      { name: 'sections', type: 'FooterSection[]', description: 'Array de seções de links com título e links' },
      { name: 'socialLinks', type: 'object', description: 'Objeto com links das redes sociais (twitter, github, linkedin)' },
      { name: 'copyright', type: 'string', description: 'Texto de copyright' }
    ],
    code: `interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface Footer1Props {
  companyName?: string;
  description?: string;
  sections?: FooterSection[];
  socialLinks?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
  copyright?: string;
}

export default function Footer1({
  companyName = 'Blcks',
  description = 'Componentes React prontos para copiar e colar. Copy, paste, customize.',
  sections = [
    {
      title: 'Produto',
      links: [
        { label: 'Features', href: '#' },
        { label: 'Preços', href: '#' },
        { label: 'Documentação', href: '#' }
      ]
    },
    {
      title: 'Empresa',
      links: [
        { label: 'Sobre', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Carreiras', href: '#' }
      ]
    },
    {
      title: 'Suporte',
      links: [
        { label: 'Ajuda', href: '#' },
        { label: 'Contato', href: '#' },
        { label: 'Status', href: '#' }
      ]
    }
  ],
  socialLinks = {
    twitter: '#',
    github: '#',
    linkedin: '#'
  },
  copyright = '© 2024 Blcks. Todos os direitos reservados.'
}: Footer1Props) {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              {companyName}
            </h3>
            <p className="max-w-md mb-6 text-gray-600 dark:text-gray-400">
              {description}
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.twitter && (
                <a href={socialLinks.twitter} className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              )}
              {socialLinks.github && (
                <a href={socialLinks.github} className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              )}
              {socialLinks.linkedin && (
                <a href={socialLinks.linkedin} className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Link Sections */}
          {sections.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8">
          <p className="text-sm text-center text-gray-500 dark:text-gray-400">
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}`
  },
  {
    id: 'announcement-1',
    name: 'Announcement Bar',
    description: 'Barra de anúncio fixa no topo com mensagem, link e botão de fechar. Inclui 3 variações de cores.',
    category: 'announcement',
    tags: ['announcement', 'banner', 'notification', 'top-bar'],
    dependencies: [
      { name: 'lucide-react', version: '^0.544.0' }
    ],
    previewProps: {
      message: 'Novidade: Acabamos de lançar nossa nova versão 2.0',
      linkText: 'Saiba mais',
      linkHref: '#',
      variant: 'default'
    },
    props: [
      { name: 'message', type: 'string', description: 'Mensagem do anúncio' },
      { name: 'linkText', type: 'string', description: 'Texto do link' },
      { name: 'linkHref', type: 'string', description: 'URL do link' },
      { name: 'variant', type: "'default' | 'gradient' | 'dark'", default: 'default', description: 'Variação de cor da barra' }
    ],
    code: `import { X, ArrowRight } from 'lucide-react';

interface Announcement1Props {
  message?: string;
  linkText?: string;
  linkHref?: string;
  variant?: 'default' | 'gradient' | 'dark';
}

export default function Announcement1({
  message = 'Novidade: Acabamos de lançar nossa nova versão 2.0',
  linkText = 'Saiba mais',
  linkHref = '#',
  variant = 'default'
}: Announcement1Props) {
  const variantClasses = {
    default: 'bg-primary text-primary-foreground',
    gradient: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white',
    dark: 'bg-gray-900 dark:bg-gray-950 text-white'
  };

  return (
    <div className={\`\${variantClasses[variant]} py-3 px-4 relative\`}>
      <div className="container mx-auto flex items-center justify-center gap-4">
        <p className="text-sm font-medium text-center flex-1 flex items-center justify-center gap-2 flex-wrap">
          <span>{message}</span>
          {linkText && (
            <a
              href={linkHref}
              className="inline-flex items-center underline underline-offset-4 hover:no-underline transition-all"
            >
              {linkText}
              <ArrowRight className="ml-1 h-3 w-3" />
            </a>
          )}
        </p>
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Fechar"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}`
  },
  {
    id: 'about-1',
    name: 'About Section',
    description: 'Seção completa sobre a empresa com descrição, missão, estatísticas e equipe. Layout responsivo e moderno.',
    category: 'about',
    tags: ['about', 'team', 'mission', 'company', 'stats'],
    dependencies: [],
    previewProps: {
      title: 'Sobre nós',
      description: 'Somos uma equipe apaixonada por criar experiências digitais incríveis. Nossa missão é ajudar empresas a transformar suas ideias em produtos que as pessoas amam.',
      mission: 'Democratizar o acesso a componentes de alta qualidade para desenvolvedores em todo o mundo.',
      stats: [
        { value: '50+', label: 'Componentes' },
        { value: '10k+', label: 'Desenvolvedores' },
        { value: '100%', label: 'Open Source' },
        { value: '24/7', label: 'Suporte' }
      ],
      team: [
        {
          name: 'Ana Silva',
          role: 'CEO & Founder',
          imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'
        },
        {
          name: 'Carlos Santos',
          role: 'CTO',
          imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
        },
        {
          name: 'Marina Costa',
          role: 'Head of Design',
          imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop'
        },
        {
          name: 'Pedro Oliveira',
          role: 'Lead Developer',
          imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop'
        }
      ]
    },
    props: [
      { name: 'title', type: 'string', default: 'Sobre nós', description: 'Título da seção' },
      { name: 'description', type: 'string', description: 'Descrição principal' },
      { name: 'mission', type: 'string', description: 'Texto da missão da empresa' },
      { name: 'stats', type: 'Array<{ value: string; label: string }>', description: 'Array de estatísticas' },
      { name: 'team', type: 'TeamMember[]', description: 'Array de membros da equipe com name, role e imageUrl' }
    ],
    code: `interface TeamMember {
  name: string;
  role: string;
  imageUrl: string;
}

interface About1Props {
  title?: string;
  description?: string;
  mission?: string;
  stats?: Array<{
    value: string;
    label: string;
  }>;
  team?: TeamMember[];
}

export default function About1({
  title = 'Sobre nós',
  description = 'Somos uma equipe apaixonada por criar experiências digitais incríveis. Nossa missão é ajudar empresas a transformar suas ideias em produtos que as pessoas amam.',
  mission = 'Democratizar o acesso a componentes de alta qualidade para desenvolvedores em todo o mundo.',
  stats = [
    { value: '50+', label: 'Componentes' },
    { value: '10k+', label: 'Desenvolvedores' },
    { value: '100%', label: 'Open Source' },
    { value: '24/7', label: 'Suporte' }
  ],
  team = [
    {
      name: 'Ana Silva',
      role: 'CEO & Founder',
      imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'
    },
    {
      name: 'Carlos Santos',
      role: 'CTO',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
    },
    {
      name: 'Marina Costa',
      role: 'Head of Design',
      imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop'
    },
    {
      name: 'Pedro Oliveira',
      role: 'Lead Developer',
      imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop'
    }
  ]
}: About1Props) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>

        {/* Mission */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl font-bold mb-4">Nossa Missão</h3>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              {mission}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Team */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-12">Nossa Equipe</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-4 overflow-hidden rounded-xl">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h4 className="font-semibold text-lg mb-1">{member.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}`
  },
  {
    id: 'blog-1',
    name: 'Blog Grid',
    description: 'Grade de posts de blog com imagem, categoria, título, excerpt, meta informações e autor. Layout responsivo com 3 colunas.',
    category: 'blog',
    tags: ['blog', 'posts', 'articles', 'grid', 'content'],
    dependencies: [
      { name: 'lucide-react', version: '^0.544.0' }
    ],
    previewProps: {
      title: 'Blog',
      description: 'Artigos, tutoriais e novidades sobre desenvolvimento',
      posts: [
        {
          title: 'Como criar componentes reutilizáveis com React',
          excerpt: 'Aprenda as melhores práticas para criar componentes React que podem ser reutilizados em qualquer projeto.',
          author: 'Ana Silva',
          date: '15 Mar 2024',
          readTime: '5 min',
          category: 'React',
          imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
          slug: '#'
        },
        {
          title: 'Guia completo de TypeScript para iniciantes',
          excerpt: 'Descubra como TypeScript pode melhorar a qualidade do seu código e aumentar sua produtividade.',
          author: 'Carlos Santos',
          date: '12 Mar 2024',
          readTime: '8 min',
          category: 'TypeScript',
          imageUrl: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop',
          slug: '#'
        },
        {
          title: 'Otimizando performance no Next.js 15',
          excerpt: 'Técnicas avançadas para melhorar o desempenho das suas aplicações Next.js e proporcionar uma experiência incrível.',
          author: 'Marina Costa',
          date: '10 Mar 2024',
          readTime: '6 min',
          category: 'Next.js',
          imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
          slug: '#'
        }
      ]
    },
    props: [
      { name: 'title', type: 'string', default: 'Blog', description: 'Título da seção' },
      { name: 'description', type: 'string', description: 'Descrição da seção' },
      { name: 'posts', type: 'BlogPost[]', description: 'Array de posts com title, excerpt, author, date, readTime, category, imageUrl e slug' }
    ],
    code: `import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface BlogPost {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  imageUrl: string;
  slug: string;
}

interface Blog1Props {
  title?: string;
  description?: string;
  posts?: BlogPost[];
}

export default function Blog1({
  title = 'Blog',
  description = 'Artigos, tutoriais e novidades sobre desenvolvimento',
  posts = [
    {
      title: 'Como criar componentes reutilizáveis com React',
      excerpt: 'Aprenda as melhores práticas para criar componentes React que podem ser reutilizados em qualquer projeto.',
      author: 'Ana Silva',
      date: '15 Mar 2024',
      readTime: '5 min',
      category: 'React',
      imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
      slug: '#'
    },
    {
      title: 'Guia completo de TypeScript para iniciantes',
      excerpt: 'Descubra como TypeScript pode melhorar a qualidade do seu código e aumentar sua produtividade.',
      author: 'Carlos Santos',
      date: '12 Mar 2024',
      readTime: '8 min',
      category: 'TypeScript',
      imageUrl: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop',
      slug: '#'
    },
    {
      title: 'Otimizando performance no Next.js 15',
      excerpt: 'Técnicas avançadas para melhorar o desempenho das suas aplicações Next.js e proporcionar uma experiência incrível.',
      author: 'Marina Costa',
      date: '10 Mar 2024',
      readTime: '6 min',
      category: 'Next.js',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
      slug: '#'
    }
  ]
}: Blog1Props) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <article
              key={index}
              className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary text-primary-foreground rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  <a href={post.slug}>{post.title}</a>
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <a
                    href={post.slug}
                    className="text-primary hover:underline inline-flex items-center text-sm font-medium"
                  >
                    Ler mais
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </a>
                </div>

                {/* Author */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Por <span className="font-medium text-gray-900 dark:text-white">{post.author}</span>
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}`
  },
  {
    id: 'pricing-1',
    name: 'Pricing Table',
    description: 'Tabela de preços com 3 planos, features com check/x, destaque para plano popular. Layout responsivo em grade.',
    category: 'pricing',
    tags: ['pricing', 'plans', 'subscription', 'features', 'comparison'],
    dependencies: [
      { name: 'lucide-react', version: '^0.544.0' }
    ],
    previewProps: {
      title: 'Preços simples e transparentes',
      description: 'Escolha o plano perfeito para suas necessidades',
      plans: [
        {
          name: 'Starter',
          description: 'Perfeito para começar',
          price: 'R$ 29',
          period: '/mês',
          cta: 'Começar agora',
          features: [
            { text: '10 projetos', included: true },
            { text: '5GB de armazenamento', included: true },
            { text: 'Suporte por email', included: true },
            { text: 'API access', included: false },
            { text: 'Integrações avançadas', included: false },
            { text: 'Suporte prioritário', included: false }
          ]
        },
        {
          name: 'Professional',
          description: 'Para times em crescimento',
          price: 'R$ 99',
          period: '/mês',
          cta: 'Começar agora',
          popular: true,
          features: [
            { text: 'Projetos ilimitados', included: true },
            { text: '50GB de armazenamento', included: true },
            { text: 'Suporte por email e chat', included: true },
            { text: 'API access', included: true },
            { text: 'Integrações avançadas', included: true },
            { text: 'Suporte prioritário', included: false }
          ]
        },
        {
          name: 'Enterprise',
          description: 'Para grandes empresas',
          price: 'R$ 299',
          period: '/mês',
          cta: 'Falar com vendas',
          features: [
            { text: 'Projetos ilimitados', included: true },
            { text: 'Armazenamento ilimitado', included: true },
            { text: 'Suporte 24/7', included: true },
            { text: 'API access', included: true },
            { text: 'Integrações avançadas', included: true },
            { text: 'Suporte prioritário', included: true }
          ]
        }
      ]
    },
    props: [
      { name: 'title', type: 'string', default: 'Preços simples e transparentes', description: 'Título da seção' },
      { name: 'description', type: 'string', description: 'Descrição da seção' },
      { name: 'plans', type: 'PricingPlan[]', description: 'Array de planos com name, description, price, period, cta, features e popular (opcional)' }
    ],
    code: `import { Check, X } from 'lucide-react';

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingPlan {
  name: string;
  description: string;
  price: string;
  period: string;
  features: PricingFeature[];
  cta: string;
  popular?: boolean;
}

interface Pricing1Props {
  title?: string;
  description?: string;
  plans?: PricingPlan[];
}

export default function Pricing1({
  title = 'Preços simples e transparentes',
  description = 'Escolha o plano perfeito para suas necessidades',
  plans = [
    {
      name: 'Starter',
      description: 'Perfeito para começar',
      price: 'R$ 29',
      period: '/mês',
      cta: 'Começar agora',
      features: [
        { text: '10 projetos', included: true },
        { text: '5GB de armazenamento', included: true },
        { text: 'Suporte por email', included: true },
        { text: 'API access', included: false },
        { text: 'Integrações avançadas', included: false },
        { text: 'Suporte prioritário', included: false }
      ]
    },
    {
      name: 'Professional',
      description: 'Para times em crescimento',
      price: 'R$ 99',
      period: '/mês',
      cta: 'Começar agora',
      popular: true,
      features: [
        { text: 'Projetos ilimitados', included: true },
        { text: '50GB de armazenamento', included: true },
        { text: 'Suporte por email e chat', included: true },
        { text: 'API access', included: true },
        { text: 'Integrações avançadas', included: true },
        { text: 'Suporte prioritário', included: false }
      ]
    },
    {
      name: 'Enterprise',
      description: 'Para grandes empresas',
      price: 'R$ 299',
      period: '/mês',
      cta: 'Falar com vendas',
      features: [
        { text: 'Projetos ilimitados', included: true },
        { text: 'Armazenamento ilimitado', included: true },
        { text: 'Suporte 24/7', included: true },
        { text: 'API access', included: true },
        { text: 'Integrações avançadas', included: true },
        { text: 'Suporte prioritário', included: true }
      ]
    }
  ]
}: Pricing1Props) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={\`relative rounded-2xl border \${
                plan.popular
                  ? 'border-primary shadow-xl scale-105'
                  : 'border-gray-200 dark:border-gray-800'
              } bg-white dark:bg-gray-900 p-8\`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-block px-4 py-1 text-sm font-semibold bg-primary text-primary-foreground rounded-full">
                    Mais Popular
                  </span>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {plan.description}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {plan.period}
                  </span>
                </div>
              </div>

              <button
                className={\`w-full py-3 px-6 rounded-lg font-medium transition-colors mb-8 \${
                  plan.popular
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                }\`}
              >
                {plan.cta}
              </button>

              <ul className="space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    )}
                    <span
                      className={
                        feature.included
                          ? 'text-gray-700 dark:text-gray-300'
                          : 'text-gray-400 dark:text-gray-600'
                      }
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`
  },
  {
    id: 'services-1',
    name: 'Services Grid',
    description: 'Grade de serviços com ícones, título, descrição e lista de features. Layout responsivo com 3 colunas e hover effects.',
    category: 'services',
    tags: ['services', 'features', 'grid', 'icons', 'business'],
    dependencies: [
      { name: 'lucide-react', version: '^0.544.0' }
    ],
    previewProps: {
      title: 'Nossos Serviços',
      description: 'Soluções completas para transformar seu negócio digital',
      services: [
        {
          icon: 'Code',
          title: 'Desenvolvimento Web',
          description: 'Criamos aplicações web modernas, rápidas e escaláveis usando as melhores tecnologias do mercado.',
          features: [
            'React & Next.js',
            'TypeScript',
            'API RESTful',
            'Responsivo'
          ]
        },
        {
          icon: 'Smartphone',
          title: 'Desenvolvimento Mobile',
          description: 'Aplicativos nativos e multiplataforma que proporcionam experiências incríveis em qualquer dispositivo.',
          features: [
            'React Native',
            'iOS & Android',
            'Offline-first',
            'Push Notifications'
          ]
        },
        {
          icon: 'Cloud',
          title: 'Cloud & DevOps',
          description: 'Infraestrutura escalável e automatizada para garantir performance e disponibilidade do seu produto.',
          features: [
            'AWS / Google Cloud',
            'Docker & Kubernetes',
            'CI/CD',
            'Monitoring'
          ]
        }
      ]
    },
    props: [
      { name: 'title', type: 'string', default: 'Nossos Serviços', description: 'Título da seção' },
      { name: 'description', type: 'string', description: 'Descrição da seção' },
      { name: 'services', type: 'Service[]', description: 'Array de serviços com icon, title, description e features' }
    ],
    code: `import { Code, Smartphone, Cloud, Shield, Zap, Users } from 'lucide-react';

interface Service {
  icon: string;
  title: string;
  description: string;
  features: string[];
}

interface Services1Props {
  title?: string;
  description?: string;
  services?: Service[];
}

const iconMap = {
  Code,
  Smartphone,
  Cloud,
  Shield,
  Zap,
  Users
};

export default function Services1({
  title = 'Nossos Serviços',
  description = 'Soluções completas para transformar seu negócio digital',
  services = [
    {
      icon: 'Code',
      title: 'Desenvolvimento Web',
      description: 'Criamos aplicações web modernas, rápidas e escaláveis usando as melhores tecnologias do mercado.',
      features: [
        'React & Next.js',
        'TypeScript',
        'API RESTful',
        'Responsivo'
      ]
    },
    {
      icon: 'Smartphone',
      title: 'Desenvolvimento Mobile',
      description: 'Aplicativos nativos e multiplataforma que proporcionam experiências incríveis em qualquer dispositivo.',
      features: [
        'React Native',
        'iOS & Android',
        'Offline-first',
        'Push Notifications'
      ]
    },
    {
      icon: 'Cloud',
      title: 'Cloud & DevOps',
      description: 'Infraestrutura escalável e automatizada para garantir performance e disponibilidade do seu produto.',
      features: [
        'AWS / Google Cloud',
        'Docker & Kubernetes',
        'CI/CD',
        'Monitoring'
      ]
    }
  ]
}: Services1Props) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap] || Code;
            return (
              <div
                key={index}
                className="group relative bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary transition-all duration-300 hover:shadow-lg"
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-sm text-gray-600 dark:text-gray-400"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}`
  },
  {
    id: 'blog-post-1',
    name: 'Blog Post Article',
    description: 'Layout completo de artigo de blog com imagem de capa, meta informações, autor, conteúdo formatado e tags. Tipografia otimizada para leitura.',
    category: 'blog',
    tags: ['blog', 'article', 'post', 'content', 'reading'],
    dependencies: [
      { name: 'lucide-react', version: '^0.544.0' }
    ],
    previewProps: {
      title: 'Como criar componentes reutilizáveis com React',
      author: {
        name: 'Ana Silva',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
        bio: 'Senior Frontend Developer com 8+ anos de experiência em React e TypeScript'
      },
      date: '15 de Março, 2024',
      readTime: '8 min de leitura',
      category: 'React',
      coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=600&fit=crop',
      content: '<p class="lead">Criar componentes reutilizáveis é uma das habilidades mais importantes para qualquer desenvolvedor React.</p><h2>Por que componentes reutilizáveis?</h2><p>Componentes reutilizáveis economizam tempo e garantem consistência.</p>',
      tags: ['React', 'Components', 'Best Practices', 'TypeScript']
    },
    props: [
      { name: 'title', type: 'string', description: 'Título do artigo' },
      { name: 'author', type: '{ name: string; avatar: string; bio?: string }', description: 'Informações do autor' },
      { name: 'date', type: 'string', description: 'Data de publicação' },
      { name: 'readTime', type: 'string', description: 'Tempo estimado de leitura' },
      { name: 'category', type: 'string', description: 'Categoria do artigo' },
      { name: 'coverImage', type: 'string', description: 'URL da imagem de capa' },
      { name: 'content', type: 'string', description: 'Conteúdo HTML do artigo' },
      { name: 'tags', type: 'string[]', description: 'Tags do artigo' }
    ],
    code: `import { Calendar, Clock, User, ArrowLeft, Share2 } from 'lucide-react';

interface BlogPost1Props {
  title?: string;
  author?: {
    name: string;
    avatar: string;
    bio?: string;
  };
  date?: string;
  readTime?: string;
  category?: string;
  coverImage?: string;
  content?: string;
  tags?: string[];
}

export default function BlogPost1({
  title = 'Como criar componentes reutilizáveis com React',
  author = {
    name: 'Ana Silva',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    bio: 'Senior Frontend Developer com 8+ anos de experiência em React e TypeScript'
  },
  date = '15 de Março, 2024',
  readTime = '8 min de leitura',
  category = 'React',
  coverImage = 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=600&fit=crop',
  content = \`
    <p class="lead">Criar componentes reutilizáveis é uma das habilidades mais importantes para qualquer desenvolvedor React.</p>
    <h2>Por que componentes reutilizáveis são importantes?</h2>
    <p>Componentes reutilizáveis não apenas economizam tempo de desenvolvimento, mas também garantem consistência em toda a sua aplicação.</p>
  \`,
  tags = ['React', 'Components', 'Best Practices', 'TypeScript']
}: BlogPost1Props) {
  return (
    <article className="w-full">
      {/* Header Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <a
            href="#"
            className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para o blog
          </a>
        </div>
      </div>

      {/* Cover Image */}
      <div className="w-full h-[400px] md:h-[500px] relative overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Category Badge */}
        <div className="mb-6">
          <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary text-primary-foreground rounded-full">
            {category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          {title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{readTime}</span>
          </div>
          <button className="flex items-center gap-2 hover:text-primary transition-colors">
            <Share2 className="h-4 w-4" />
            <span>Compartilhar</span>
          </button>
        </div>

        {/* Author Info */}
        <div className="flex items-center gap-4 mb-12 p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
          <img
            src={author.avatar}
            alt={author.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <User className="h-4 w-4 text-gray-400" />
              <p className="font-semibold text-gray-900 dark:text-white">
                {author.name}
              </p>
            </div>
            {author.bio && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {author.bio}
              </p>
            )}
          </div>
        </div>

        {/* Article Content */}
        <div
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <a
                  key={index}
                  href="#"
                  className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  {tag}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}`
  },
  {
    id: 'changelog-1',
    name: 'Changelog Timeline',
    description: 'Timeline de changelog com versões, datas e categorização de mudanças (adicionado, corrigido, melhorado, alterado, removido). Visual moderno com ícones e cores.',
    category: 'changelog',
    tags: ['changelog', 'updates', 'releases', 'versions', 'timeline'],
    dependencies: [
      { name: 'lucide-react', version: '^0.544.0' }
    ],
    previewProps: {
      title: 'Changelog',
      description: 'Acompanhe todas as atualizações, melhorias e correções do produto',
      entries: [
        {
          version: '2.1.0',
          date: '15 de Março, 2024',
          changes: [
            { type: 'added', text: 'Novo sistema de notificações em tempo real' },
            { type: 'added', text: 'Suporte para autenticação via Google e GitHub' },
            { type: 'improved', text: 'Performance do dashboard aumentada em 40%' },
            { type: 'fixed', text: 'Correção de bug no upload de arquivos grandes' }
          ]
        },
        {
          version: '2.0.0',
          date: '1 de Março, 2024',
          changes: [
            { type: 'added', text: 'Interface completamente redesenhada' },
            { type: 'improved', text: 'API REST v2 com melhor documentação' },
            { type: 'changed', text: 'Migração para Next.js 15' }
          ]
        }
      ]
    },
    props: [
      { name: 'title', type: 'string', default: 'Changelog', description: 'Título da seção' },
      { name: 'description', type: 'string', description: 'Descrição da seção' },
      { name: 'entries', type: 'ChangelogEntry[]', description: 'Array de entradas com version, date e changes' }
    ],
    code: `import { Calendar, Plus, Wrench, Bug, Zap, AlertCircle } from 'lucide-react';

interface ChangelogItem {
  type: 'added' | 'fixed' | 'improved' | 'changed' | 'removed';
  text: string;
}

interface ChangelogEntry {
  version: string;
  date: string;
  changes: ChangelogItem[];
}

interface Changelog1Props {
  title?: string;
  description?: string;
  entries?: ChangelogEntry[];
}

const typeConfig = {
  added: {
    icon: Plus,
    label: 'Adicionado',
    color: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-50 dark:bg-green-950'
  },
  fixed: {
    icon: Bug,
    label: 'Corrigido',
    color: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-50 dark:bg-red-950'
  },
  improved: {
    icon: Zap,
    label: 'Melhorado',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-950'
  },
  changed: {
    icon: Wrench,
    label: 'Alterado',
    color: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-50 dark:bg-orange-950'
  },
  removed: {
    icon: AlertCircle,
    label: 'Removido',
    color: 'text-gray-600 dark:text-gray-400',
    bg: 'bg-gray-50 dark:bg-gray-950'
  }
};

export default function Changelog1({
  title = 'Changelog',
  description = 'Acompanhe todas as atualizações, melhorias e correções do produto',
  entries = [
    {
      version: '2.1.0',
      date: '15 de Março, 2024',
      changes: [
        { type: 'added', text: 'Novo sistema de notificações em tempo real' },
        { type: 'improved', text: 'Performance do dashboard aumentada em 40%' },
        { type: 'fixed', text: 'Correção de bug no upload de arquivos grandes' }
      ]
    }
  ]
}: Changelog1Props) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>

        {/* Changelog Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {entries.map((entry, index) => (
              <div key={index} className="relative">
                {/* Timeline line */}
                {index !== entries.length - 1 && (
                  <div className="absolute left-6 top-12 bottom-0 w-px bg-gradient-to-b from-primary/50 to-transparent" />
                )}

                <div className="relative">
                  {/* Version Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold shadow-lg">
                      {entry.version.split('.')[0]}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">
                        Versão {entry.version}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="h-4 w-4" />
                        <span>{entry.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Changes List */}
                  <div className="ml-16 space-y-3">
                    {entry.changes.map((change, changeIndex) => {
                      const config = typeConfig[change.type];
                      const Icon = config.icon;

                      return (
                        <div
                          key={changeIndex}
                          className={\`flex items-start gap-3 p-4 rounded-lg \${config.bg} border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-colors\`}
                        >
                          <div className={\`flex-shrink-0 \${config.color}\`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <span className={\`text-xs font-semibold uppercase tracking-wide \${config.color} block mb-1\`}>
                              {config.label}
                            </span>
                            <p className="text-gray-700 dark:text-gray-300">
                              {change.text}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="max-w-4xl mx-auto mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
            Legenda
          </h4>
          <div className="flex flex-wrap gap-4">
            {Object.entries(typeConfig).map(([type, config]) => {
              const Icon = config.icon;
              return (
                <div key={type} className="flex items-center gap-2">
                  <Icon className={\`h-4 w-4 \${config.color}\`} />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {config.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}`
  },
  {
    id: 'login-1',
    name: 'Login Form',
    description: 'Formulário de login completo com email/senha, login social (Google, GitHub), mostrar/ocultar senha, lembrar-me e recuperação de senha. Design moderno e responsivo.',
    category: 'auth',
    tags: ['login', 'authentication', 'form', 'social-login', 'auth'],
    dependencies: [
      { name: 'lucide-react', version: '^0.544.0' }
    ],
    previewProps: {
      title: 'Bem-vindo de volta',
      subtitle: 'Entre com sua conta para continuar',
      brandName: 'Blcks',
      showSocialLogin: true
    },
    props: [
      { name: 'title', type: 'string', default: 'Bem-vindo de volta', description: 'Título do formulário' },
      { name: 'subtitle', type: 'string', description: 'Subtítulo do formulário' },
      { name: 'brandName', type: 'string', default: 'Blcks', description: 'Nome da marca' },
      { name: 'brandLogo', type: 'string', description: 'URL do logo (opcional)' },
      { name: 'showSocialLogin', type: 'boolean', default: 'true', description: 'Mostrar opções de login social' },
      { name: 'onSubmit', type: '(email: string, password: string) => void', description: 'Callback ao submeter o formulário' }
    ],
    code: `'use client';

import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

interface Login1Props {
  title?: string;
  subtitle?: string;
  brandName?: string;
  brandLogo?: string;
  showSocialLogin?: boolean;
  onSubmit?: (email: string, password: string) => void;
}

export default function Login1({
  title = 'Bem-vindo de volta',
  subtitle = 'Entre com sua conta para continuar',
  brandName = 'Blcks',
  brandLogo,
  showSocialLogin = true,
  onSubmit
}: Login1Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit(email, password);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          {brandLogo ? (
            <img src={brandLogo} alt={brandName} className="h-12 mx-auto mb-6" />
          ) : (
            <h1 className="text-3xl font-bold mb-2">{brandName}</h1>
          )}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {subtitle}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
          {/* Social Login */}
          {showSocialLogin && (
            <>
              <div className="space-y-3 mb-6">
                <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continuar com Google
                </button>
                <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  Continuar com GitHub
                </button>
              </div>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                    Ou continue com email
                  </span>
                </div>
              </div>
            </>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email & Password fields... */}
            <button
              type="submit"
              className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}`
  },
  {
    id: 'signup-1',
    name: 'Signup Form',
    description: 'Formulário de cadastro completo com nome, email, senha, aceite de termos, signup social (Google, GitHub) e validações. Design moderno e responsivo.',
    category: 'auth',
    tags: ['signup', 'register', 'authentication', 'form', 'social-signup'],
    dependencies: [
      { name: 'lucide-react', version: '^0.544.0' }
    ],
    previewProps: {
      title: 'Criar sua conta',
      subtitle: 'Comece gratuitamente, não precisa cartão de crédito',
      brandName: 'Blcks',
      showSocialSignup: true
    },
    props: [
      { name: 'title', type: 'string', default: 'Criar sua conta', description: 'Título do formulário' },
      { name: 'subtitle', type: 'string', description: 'Subtítulo do formulário' },
      { name: 'brandName', type: 'string', default: 'Blcks', description: 'Nome da marca' },
      { name: 'brandLogo', type: 'string', description: 'URL do logo (opcional)' },
      { name: 'showSocialSignup', type: 'boolean', default: 'true', description: 'Mostrar opções de cadastro social' },
      { name: 'onSubmit', type: '(name: string, email: string, password: string) => void', description: 'Callback ao submeter o formulário' }
    ],
    code: `'use client';

import { Mail, Lock, Eye, EyeOff, User } from 'lucide-react';
import { useState } from 'react';

interface Signup1Props {
  title?: string;
  subtitle?: string;
  brandName?: string;
  brandLogo?: string;
  showSocialSignup?: boolean;
  onSubmit?: (name: string, email: string, password: string) => void;
}

export default function Signup1({
  title = 'Criar sua conta',
  subtitle = 'Comece gratuitamente, não precisa cartão de crédito',
  brandName = 'Blcks',
  brandLogo,
  showSocialSignup = true,
  onSubmit
}: Signup1Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit && acceptTerms) {
      onSubmit(name, email, password);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Form content... */}
        <button
          type="submit"
          className="w-full py-3 px-4 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!acceptTerms}
        >
          Criar conta
        </button>
      </div>
    </div>
  );
}`
  },
  {
    id: 'testimonial-1',
    name: 'Testimonials Grid',
    description: 'Grade de depoimentos com avatar, nome, cargo/empresa, rating com estrelas e citação. Layout responsivo com 3 colunas e ícone de quote.',
    category: 'testimonial',
    tags: ['testimonial', 'reviews', 'social-proof', 'ratings', 'feedback'],
    dependencies: [
      { name: 'lucide-react', version: '^0.544.0' }
    ],
    previewProps: {
      title: 'O que nossos clientes dizem',
      description: 'Veja o feedback de quem já usa nosso produto',
      testimonials: [
        {
          name: 'Ana Silva',
          role: 'CEO',
          company: 'TechStart Inc',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
          content: 'Este produto revolucionou completamente a forma como nossa equipe trabalha. A produtividade aumentou em 40% e conseguimos reduzir drasticamente o tempo de desenvolvimento.',
          rating: 5
        },
        {
          name: 'Carlos Santos',
          role: 'Product Manager',
          company: 'Digital Solutions',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
          content: 'Excelente ferramenta! A interface é intuitiva e os recursos atendem perfeitamente nossas necessidades. O suporte ao cliente também é excepcional.',
          rating: 5
        },
        {
          name: 'Marina Costa',
          role: 'Lead Developer',
          company: 'CodeCraft',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
          content: 'Como desenvolvedora, aprecio muito a qualidade do código e a documentação completa. Facilitou muito a integração com nossos sistemas existentes.',
          rating: 5
        }
      ]
    },
    props: [
      { name: 'title', type: 'string', default: 'O que nossos clientes dizem', description: 'Título da seção' },
      { name: 'description', type: 'string', description: 'Descrição da seção' },
      { name: 'testimonials', type: 'Testimonial[]', description: 'Array de depoimentos com name, role, company, avatar, content e rating' }
    ],
    code: `import { Quote, Star } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

interface Testimonial1Props {
  title?: string;
  description?: string;
  testimonials?: Testimonial[];
}

export default function Testimonial1({
  title = 'O que nossos clientes dizem',
  description = 'Veja o feedback de quem já usa nosso produto',
  testimonials = [
    {
      name: 'Ana Silva',
      role: 'CEO',
      company: 'TechStart Inc',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      content: 'Este produto revolucionou completamente a forma como nossa equipe trabalha.',
      rating: 5
    }
  ]
}: Testimonial1Props) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary transition-all duration-300 hover:shadow-lg"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg">
                <Quote className="h-6 w-6 text-primary-foreground" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={\`h-5 w-5 \${
                      i < testimonial.rating
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300 dark:text-gray-600'
                    }\`}
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`
  },
  {
    id: 'faq-1',
    name: 'FAQ Accordion',
    description: 'FAQ com accordion interativo, animações suaves de abertura/fechamento, ícones de +/- e CTA de contato. Primeiro item aberto por padrão.',
    category: 'faq',
    tags: ['faq', 'accordion', 'questions', 'help', 'support'],
    dependencies: [
      { name: 'lucide-react', version: '^0.544.0' }
    ],
    previewProps: {
      title: 'Perguntas Frequentes',
      description: 'Encontre respostas para as dúvidas mais comuns',
      faqs: [
        {
          question: 'Como funciona o período de teste gratuito?',
          answer: 'Oferecemos 14 dias de teste gratuito sem necessidade de cartão de crédito. Você terá acesso completo a todos os recursos premium durante este período.'
        },
        {
          question: 'Posso cancelar minha assinatura a qualquer momento?',
          answer: 'Sim! Você pode cancelar sua assinatura a qualquer momento através das configurações da sua conta. Não há taxas de cancelamento.'
        },
        {
          question: 'Quais formas de pagamento são aceitas?',
          answer: 'Aceitamos todos os principais cartões de crédito (Visa, Mastercard, American Express), PayPal e transferência bancária para planos anuais.'
        }
      ]
    },
    props: [
      { name: 'title', type: 'string', default: 'Perguntas Frequentes', description: 'Título da seção' },
      { name: 'description', type: 'string', description: 'Descrição da seção' },
      { name: 'faqs', type: 'FAQItem[]', description: 'Array de perguntas e respostas com question e answer' }
    ],
    code: `'use client';

import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQ1Props {
  title?: string;
  description?: string;
  faqs?: FAQItem[];
}

export default function FAQ1({
  title = 'Perguntas Frequentes',
  description = 'Encontre respostas para as dúvidas mais comuns',
  faqs = [
    {
      question: 'Como funciona o período de teste gratuito?',
      answer: 'Oferecemos 14 dias de teste gratuito sem necessidade de cartão de crédito.'
    }
  ]
}: FAQ1Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden transition-all duration-200 hover:border-primary dark:hover:border-primary"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <span className="font-semibold text-lg text-gray-900 dark:text-white pr-4">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-primary/10">
                    {openIndex === index ? (
                      <Minus className="h-5 w-5 text-primary" />
                    ) : (
                      <Plus className="h-5 w-5 text-primary" />
                    )}
                  </div>
                </button>
                <div
                  className={\`transition-all duration-300 ease-in-out \${
                    openIndex === index
                      ? 'max-h-96 opacity-100'
                      : 'max-h-0 opacity-0'
                  } overflow-hidden\`}
                >
                  <div className="px-6 pb-5 pt-2">
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="max-w-4xl mx-auto mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Ainda tem dúvidas?{' '}
            <a href="#" className="text-primary font-medium hover:underline">
              Entre em contato conosco
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}`
  }
];

// Funções auxiliares
export const getBlockById = (id: string): BlockMetadata | undefined => {
  return blocksRegistry.find(block => block.id === id);
};

export const getBlocksByCategory = (category: string): BlockMetadata[] => {
  return blocksRegistry.filter(block => block.category === category);
};

export const getAllCategories = (): string[] => {
  return Array.from(new Set(blocksRegistry.map(block => block.category)));
};

export const searchBlocks = (query: string): BlockMetadata[] => {
  const lowerQuery = query.toLowerCase();
  return blocksRegistry.filter(block =>
    block.name.toLowerCase().includes(lowerQuery) ||
    block.description.toLowerCase().includes(lowerQuery) ||
    block.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};