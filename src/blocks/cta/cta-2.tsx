import { ArrowRight, Users, TrendingUp, Award } from 'lucide-react';

interface Stat {
  value: string;
  label: string;
  icon: string;
}

interface CTA2Props {
  badge?: string;
  title?: string;
  description?: string;
  primaryCTA?: string;
  primaryHref?: string;
  secondaryCTA?: string;
  secondaryHref?: string;
  imageUrl?: string;
  imageAlt?: string;
  stats?: Stat[];
}

export default function CTA2({
  badge = 'Start Today',
  title = 'Ready to transform your business?',
  description = 'Join thousands of companies already using our platform to streamline their operations, boost productivity, and drive growth. Start your free trial today and see the difference.',
  primaryCTA = 'Start Free Trial',
  primaryHref = '#',
  secondaryCTA = 'Schedule Demo',
  secondaryHref = '#',
  imageUrl = 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop',
  imageAlt = 'Team collaboration',
  stats = [
    {
      value: '10K+',
      label: 'Active Users',
      icon: 'Users'
    },
    {
      value: '98%',
      label: 'Satisfaction Rate',
      icon: 'Award'
    },
    {
      value: '3x',
      label: 'Faster Results',
      icon: 'TrendingUp'
    }
  ]
}: CTA2Props) {
  const getIcon = (iconName: string) => {
    const icons: Record<string, React.ReactElement> = {
      Users: <Users className="h-5 w-5" />,
      Award: <Award className="h-5 w-5" />,
      TrendingUp: <TrendingUp className="h-5 w-5" />,
    };
    return icons[iconName] || <Users className="h-5 w-5" />;
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-primary/10 via-primary/5 to-background dark:from-primary/20 dark:via-primary/10 dark:to-gray-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <div className="flex flex-col justify-center space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center w-fit rounded-full bg-primary/10 dark:bg-primary/20 px-4 py-1.5 text-sm font-semibold text-primary">
              {badge}
            </div>

            {/* Title */}
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-white">
              {title}
            </h2>

            {/* Description */}
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-xl">
              {description}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href={primaryHref}
                className="inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 shadow-lg hover:shadow-xl"
              >
                {primaryCTA}
                <ArrowRight className="ml-2 h-5 w-5" />
              </a>
              <a
                href={secondaryHref}
                className="inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-colors border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 h-12 px-8"
              >
                {secondaryCTA}
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="flex flex-col items-start gap-1"
                >
                  <div className="flex items-center gap-2">
                    <div className="text-primary">
                      {getIcon(stat.icon)}
                    </div>
                    <span className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </span>
                  </div>
                  <span className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={imageUrl}
                alt={imageAlt}
                className="w-full h-auto object-cover aspect-[4/3]"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent dark:from-primary/40" />
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
}
