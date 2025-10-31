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
  title = 'Our Services',
  description = 'Complete solutions to transform your digital business',
  services = [
    {
      icon: 'Code',
      title: 'Web Development',
      description: 'We create modern, fast and scalable web applications using the best technologies on the market.',
      features: [
        'React & Next.js',
        'TypeScript',
        'RESTful API',
        'Responsive'
      ]
    },
    {
      icon: 'Smartphone',
      title: 'Mobile Development',
      description: 'Native and cross-platform applications that provide incredible experiences on any device.',
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
      description: 'Scalable and automated infrastructure to ensure performance and availability of your product.',
      features: [
        'AWS / Google Cloud',
        'Docker & Kubernetes',
        'CI/CD',
        'Monitoring'
      ]
    },
    {
      icon: 'Shield',
      title: 'Security',
      description: 'Protect your data and users with security and compliance best practices.',
      features: [
        'OAuth Authentication',
        'Encryption',
        'GDPR Compliance',
        'Penetration Testing'
      ]
    },
    {
      icon: 'Zap',
      title: 'Performance',
      description: 'We optimize every aspect of your application to ensure maximum speed and efficiency.',
      features: [
        'Code Splitting',
        'Lazy Loading',
        'CDN Integration',
        'Cache Strategy'
      ]
    },
    {
      icon: 'Users',
      title: 'Consulting',
      description: 'Strategic and technical guidance to ensure the success of your digital project.',
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
