import { Zap, Shield, Code, Layers, Users, BarChart, LucideIcon } from 'lucide-react';

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
}