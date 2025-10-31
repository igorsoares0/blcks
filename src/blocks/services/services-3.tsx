import { Target, Lightbulb, Rocket, Users, BarChart, HeartHandshake } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Service {
  icon: string;
  title: string;
  description: string;
  badge?: string;
}

interface Services3Props {
  title?: string;
  subtitle?: string;
  services?: Service[];
}

const iconMap = {
  Target,
  Lightbulb,
  Rocket,
  Users,
  BarChart,
  HeartHandshake
};

export default function Services3({
  title = 'How We Help You Succeed',
  subtitle = 'Our comprehensive approach ensures your business reaches its full potential',
  services = [
    {
      icon: 'Target',
      title: 'Strategic Planning',
      description: 'We analyze your market, define clear objectives, and create actionable roadmaps to achieve your business goals with precision.',
      badge: 'Core'
    },
    {
      icon: 'Lightbulb',
      title: 'Innovation & Design',
      description: 'Transform ideas into reality with cutting-edge design thinking and innovative solutions that set you apart from competitors.',
      badge: 'Popular'
    },
    {
      icon: 'Rocket',
      title: 'Growth Acceleration',
      description: 'Scale your business rapidly with proven strategies, marketing automation, and performance optimization techniques.',
      badge: 'Premium'
    },
    {
      icon: 'Users',
      title: 'Team Development',
      description: 'Build high-performing teams through training, mentorship, and culture development programs tailored to your needs.',
    },
    {
      icon: 'BarChart',
      title: 'Analytics & Insights',
      description: 'Make data-driven decisions with comprehensive analytics, reporting, and business intelligence solutions.',
    },
    {
      icon: 'HeartHandshake',
      title: 'Partnership Success',
      description: 'Long-term support and strategic partnership to ensure sustained growth and continuous improvement.',
    }
  ]
}: Services3Props) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 dark:text-white">
            {title}
          </h2>
          <p className="max-w-[900px] text-lg text-gray-600 dark:text-gray-400">
            {subtitle}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap] || Target;

            return (
              <div
                key={index}
                className="group relative bg-white dark:bg-gray-900 rounded-2xl p-8 border-2 border-gray-100 dark:border-gray-800 hover:border-primary dark:hover:border-primary transition-all duration-300 hover:-translate-y-1"
              >
                {/* Badge */}
                {service.badge && (
                  <div className="absolute top-6 right-6">
                    <Badge
                      variant="secondary"
                      className="bg-primary/10 text-primary hover:bg-primary/20"
                    >
                      {service.badge}
                    </Badge>
                  </div>
                )}

                {/* Icon with animated background */}
                <div className="mb-6 relative">
                  <div className="absolute inset-0 bg-primary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20">
                    <Icon className="h-8 w-8 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {service.description}
                </p>

                {/* Decorative element */}
                <div className="mt-6 h-1 w-12 bg-gradient-to-r from-primary to-primary/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            );
          })}
        </div>

        {/* Bottom Stats/Info */}
        <div className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-800">
          <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto text-center">
            <div>
              <div className="text-3xl font-bold text-primary mb-2">500+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Projects Completed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">98%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Client Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary mb-2">10+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Years Experience</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
