import { Code, Smartphone, Cloud, Database, Shield, Zap, Users, Rocket, ArrowRight, CheckCircle } from 'lucide-react';

interface ServiceFeature {
  text: string;
}

interface Service {
  icon: string;
  title: string;
  description: string;
  features: ServiceFeature[];
  price?: string;
  popular?: boolean;
}

interface Services5Props {
  badge?: string;
  title?: string;
  subtitle?: string;
  services?: Service[];
  ctaText?: string;
}

export default function Services5({
  badge = 'Our Services',
  title = 'Comprehensive solutions for your business',
  subtitle = 'From strategy to execution, we provide end-to-end services designed to accelerate your digital transformation and drive measurable results.',
  services = [
    {
      icon: 'Code',
      title: 'Custom Development',
      description: 'Tailored software solutions built with cutting-edge technologies to meet your unique business requirements.',
      features: [
        { text: 'Full-stack development' },
        { text: 'API integration' },
        { text: 'Code optimization' },
        { text: 'Legacy modernization' }
      ],
      price: 'From $5,000',
      popular: false
    },
    {
      icon: 'Smartphone',
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications that deliver exceptional user experiences on iOS and Android.',
      features: [
        { text: 'iOS & Android apps' },
        { text: 'Cross-platform solutions' },
        { text: 'App store deployment' },
        { text: 'Ongoing maintenance' }
      ],
      price: 'From $8,000',
      popular: true
    },
    {
      icon: 'Cloud',
      title: 'Cloud Infrastructure',
      description: 'Scalable cloud architecture and migration services to optimize performance, security, and cost efficiency.',
      features: [
        { text: 'Cloud migration' },
        { text: 'Auto-scaling setup' },
        { text: 'Cost optimization' },
        { text: '24/7 monitoring' }
      ],
      price: 'From $3,000',
      popular: false
    },
    {
      icon: 'Database',
      title: 'Data Engineering',
      description: 'Build robust data pipelines and analytics platforms to unlock insights and drive data-driven decisions.',
      features: [
        { text: 'ETL pipelines' },
        { text: 'Data warehousing' },
        { text: 'Real-time analytics' },
        { text: 'Data governance' }
      ],
      price: 'From $6,000',
      popular: false
    },
    {
      icon: 'Shield',
      title: 'Security Consulting',
      description: 'Comprehensive security audits and implementation of best practices to protect your applications and data.',
      features: [
        { text: 'Security audits' },
        { text: 'Penetration testing' },
        { text: 'Compliance consulting' },
        { text: 'Incident response' }
      ],
      price: 'From $4,000',
      popular: false
    },
    {
      icon: 'Zap',
      title: 'Performance Optimization',
      description: 'Identify bottlenecks and optimize your applications for maximum speed, efficiency, and user satisfaction.',
      features: [
        { text: 'Performance audits' },
        { text: 'Code profiling' },
        { text: 'Database tuning' },
        { text: 'CDN implementation' }
      ],
      price: 'From $2,500',
      popular: false
    }
  ],
  ctaText = 'Schedule Consultation'
}: Services5Props) {
  const iconMap: Record<string, any> = {
    Code,
    Smartphone,
    Cloud,
    Database,
    Shield,
    Zap,
    Users,
    Rocket
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
            <Rocket className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">{badge}</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white max-w-4xl">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
            {subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto mb-12">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Code;
            return (
              <div
                key={index}
                className={`group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 rounded-2xl p-8 border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
                  service.popular
                    ? 'border-primary shadow-lg shadow-primary/10'
                    : 'border-gray-200 dark:border-gray-800 hover:border-primary/50'
                }`}
              >
                {/* Popular Badge */}
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-primary text-white text-xs font-semibold shadow-lg">
                      <CheckCircle className="h-3 w-3" />
                      Most Popular
                    </div>
                  </div>
                )}

                {/* Icon */}
                <div className="mb-6 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <IconComponent className="h-7 w-7" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
                  {service.description}
                </p>

                {/* Features List */}
                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2.5">
                      <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* Price & CTA */}
                <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
                  {service.price && (
                    <div className="mb-4">
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">
                        {service.price}
                      </span>
                    </div>
                  )}
                  <a
                    href="#"
                    className={`inline-flex items-center justify-center gap-2 w-full px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                      service.popular
                        ? 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/25'
                        : 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100'
                    }`}
                  >
                    Get Started
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                </div>

                {/* Hover Gradient Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-transparent group-hover:to-transparent transition-all duration-300 pointer-events-none" />
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
            Need a custom solution? Let&apos;s discuss your project.
          </p>
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
          >
            {ctaText}
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
