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