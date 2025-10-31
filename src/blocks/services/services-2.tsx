import { Palette, TrendingUp, Globe, MessageSquare, Database, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Service {
  icon: string;
  title: string;
  description: string;
  link?: string;
}

interface Services2Props {
  title?: string;
  subtitle?: string;
  services?: Service[];
  ctaText?: string;
}

const iconMap = {
  Palette,
  TrendingUp,
  Globe,
  MessageSquare,
  Database,
  Lock
};

export default function Services2({
  title = 'What We Do',
  subtitle = 'Comprehensive services to help your business grow and succeed in the digital world',
  ctaText = 'Learn More',
  services = [
    {
      icon: 'Palette',
      title: 'UI/UX Design',
      description: 'Beautiful and intuitive interfaces that users love. We design experiences that convert visitors into customers.',
      link: '#'
    },
    {
      icon: 'TrendingUp',
      title: 'Digital Marketing',
      description: 'Strategic campaigns that drive results. SEO, SEM, social media, and content marketing to grow your brand.',
      link: '#'
    },
    {
      icon: 'Globe',
      title: 'Web Solutions',
      description: 'Custom websites and web applications built with modern technologies. Fast, secure, and scalable.',
      link: '#'
    },
    {
      icon: 'MessageSquare',
      title: 'Content Strategy',
      description: 'Engaging content that tells your story and connects with your audience across all channels.',
      link: '#'
    },
    {
      icon: 'Database',
      title: 'Data Analytics',
      description: 'Turn data into insights. We help you understand your metrics and make informed business decisions.',
      link: '#'
    },
    {
      icon: 'Lock',
      title: 'Cybersecurity',
      description: 'Protect your business with enterprise-grade security solutions and compliance management.',
      link: '#'
    }
  ]
}: Services2Props) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 dark:text-white">
            {title}
          </h2>
          <p className="max-w-[800px] text-lg text-gray-600 dark:text-gray-400">
            {subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap] || Palette;

            return (
              <div
                key={index}
                className="group relative flex flex-col p-6 bg-gray-50 dark:bg-gray-900 rounded-lg hover:bg-white dark:hover:bg-gray-800 border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-all duration-300"
              >
                {/* Icon with gradient background */}
                <div className="mb-4">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/60 shadow-sm group-hover:shadow-md transition-shadow">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-1">
                  {service.description}
                </p>

                {/* CTA Link */}
                {service.link && (
                  <a
                    href={service.link}
                    className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors group-hover:translate-x-1 transform duration-300"
                  >
                    {ctaText}
                    <svg
                      className="ml-1 h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </a>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Need something else? We offer custom solutions tailored to your needs.
          </p>
          <Button size="lg" variant="outline">
            Get in Touch
          </Button>
        </div>
      </div>
    </section>
  );
}
