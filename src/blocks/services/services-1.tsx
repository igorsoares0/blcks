import { Code, Smartphone, Cloud, Shield, Zap, Users } from 'lucide-react';

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
    },
    {
      icon: 'Shield',
      title: 'Segurança',
      description: 'Proteja seus dados e usuários com as melhores práticas de segurança e compliance.',
      features: [
        'Autenticação OAuth',
        'Criptografia',
        'LGPD Compliance',
        'Penetration Testing'
      ]
    },
    {
      icon: 'Zap',
      title: 'Performance',
      description: 'Otimizamos cada aspecto da sua aplicação para garantir velocidade e eficiência máximas.',
      features: [
        'Code Splitting',
        'Lazy Loading',
        'CDN Integration',
        'Cache Strategy'
      ]
    },
    {
      icon: 'Users',
      title: 'Consultoria',
      description: 'Orientação estratégica e técnica para garantir o sucesso do seu projeto digital.',
      features: [
        'Tech Assessment',
        'Code Review',
        'Architecture Design',
        'Team Training'
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
}
