import { Zap, Shield, Users, TrendingUp, Globe, Lock, Smartphone, Cloud } from 'lucide-react';

interface Feature {
  icon: string;
  title: string;
  description: string;
  metrics?: {
    value: string;
    label: string;
  };
}

interface Features5Props {
  badge?: string;
  title?: string;
  subtitle?: string;
  features?: Feature[];
  ctaText?: string;
  ctaSecondaryText?: string;
}

export default function Features5({
  badge = 'Features',
  title = 'Everything you need to succeed',
  subtitle = 'Powerful features designed to help your business grow faster and smarter with real-time insights and automation.',
  features = [
    {
      icon: 'Zap',
      title: 'Lightning Fast',
      description: 'Optimized performance with sub-50ms response times for all operations.',
      metrics: {
        value: '<50ms',
        label: 'Response Time'
      }
    },
    {
      icon: 'Shield',
      title: 'Enterprise Security',
      description: 'Bank-level encryption and compliance with SOC 2, GDPR, and HIPAA standards.',
      metrics: {
        value: '99.99%',
        label: 'Uptime SLA'
      }
    },
    {
      icon: 'Users',
      title: 'Team Collaboration',
      description: 'Real-time collaboration tools with unlimited team members and workspaces.',
      metrics: {
        value: 'Unlimited',
        label: 'Team Members'
      }
    },
    {
      icon: 'TrendingUp',
      title: 'Advanced Analytics',
      description: 'Deep insights with customizable dashboards and automated reporting.',
      metrics: {
        value: '50+',
        label: 'Data Sources'
      }
    },
    {
      icon: 'Globe',
      title: 'Global CDN',
      description: 'Content delivery across 200+ locations worldwide for optimal performance.',
      metrics: {
        value: '200+',
        label: 'Edge Locations'
      }
    },
    {
      icon: 'Lock',
      title: 'Advanced Permissions',
      description: 'Granular access control with role-based permissions and audit logs.',
      metrics: {
        value: 'Role-Based',
        label: 'Access Control'
      }
    },
    {
      icon: 'Smartphone',
      title: 'Mobile Optimized',
      description: 'Native mobile experience with offline support and push notifications.',
      metrics: {
        value: 'iOS & Android',
        label: 'Native Apps'
      }
    },
    {
      icon: 'Cloud',
      title: 'Auto Backups',
      description: 'Automated daily backups with point-in-time recovery and data redundancy.',
      metrics: {
        value: '24/7',
        label: 'Auto Backup'
      }
    }
  ],
  ctaText = 'Get Started',
  ctaSecondaryText = 'View Documentation'
}: Features5Props) {
  const iconMap: Record<string, any> = {
    Zap,
    Shield,
    Users,
    TrendingUp,
    Globe,
    Lock,
    Smartphone,
    Cloud
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">{badge}</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white max-w-3xl">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
            {subtitle}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto mb-12">
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon] || Zap;
            return (
              <div
                key={index}
                className="group relative bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
              >
                {/* Icon */}
                <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <IconComponent className="h-6 w-6" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                  {feature.description}
                </p>

                {/* Metrics Badge */}
                {feature.metrics && (
                  <div className="inline-flex flex-col gap-0.5 px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <span className="text-xs font-semibold text-primary">
                      {feature.metrics.value}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {feature.metrics.label}
                    </span>
                  </div>
                )}

                {/* Hover Effect Border */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 via-primary/0 to-primary/0 group-hover:from-primary/5 group-hover:via-transparent group-hover:to-transparent transition-all duration-300 pointer-events-none" />
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
          >
            {ctaText}
            <TrendingUp className="h-4 w-4" />
          </a>
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-medium border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
          >
            {ctaSecondaryText}
          </a>
        </div>
      </div>
    </section>
  );
}
