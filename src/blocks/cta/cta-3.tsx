import { Clock, Zap, Shield, CheckCircle, ArrowRight } from 'lucide-react';

interface Benefit {
  title: string;
  description: string;
  icon: string;
}

interface CTA3Props {
  urgencyText?: string;
  title?: string;
  description?: string;
  highlightText?: string;
  benefits?: Benefit[];
  primaryCTA?: string;
  primaryHref?: string;
  secondaryCTA?: string;
  secondaryHref?: string;
  guaranteeText?: string;
}

export default function CTA3({
  urgencyText = 'Limited Time Offer - 50% OFF',
  title = "Don't miss out on this exclusive opportunity",
  description = 'Join over 10,000 successful businesses that have transformed their operations with our platform.',
  highlightText = 'Start your 14-day free trial today. No credit card required.',
  benefits = [
    {
      title: 'Instant Setup',
      description: 'Get started in less than 5 minutes',
      icon: 'Zap'
    },
    {
      title: 'Secure & Reliable',
      description: 'Bank-level encryption and 99.9% uptime',
      icon: 'Shield'
    },
    {
      title: 'Full Access',
      description: 'All premium features included in trial',
      icon: 'CheckCircle'
    }
  ],
  primaryCTA = 'Start Free Trial',
  primaryHref = '#',
  secondaryCTA = 'View Pricing',
  secondaryHref = '#',
  guaranteeText = '30-day money-back guarantee'
}: CTA3Props) {
  const getIcon = (iconName: string) => {
    const icons: Record<string, React.ReactElement> = {
      Clock: <Clock className="h-6 w-6" />,
      Zap: <Zap className="h-6 w-6" />,
      Shield: <Shield className="h-6 w-6" />,
      CheckCircle: <CheckCircle className="h-6 w-6" />,
    };
    return icons[iconName] || <Zap className="h-6 w-6" />;
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto">
          {/* Urgency Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 rounded-full bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900 px-6 py-2">
              <Clock className="h-4 w-4 text-red-600 dark:text-red-400" />
              <span className="text-sm font-semibold text-red-600 dark:text-red-400">
                {urgencyText}
              </span>
            </div>
          </div>

          {/* Main Content */}
          <div className="text-center space-y-6 mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-white">
              {title}
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {description}
            </p>
            <p className="text-base md:text-lg font-semibold text-primary">
              {highlightText}
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid gap-6 md:grid-cols-3 mb-12">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-primary dark:hover:border-primary transition-all duration-300 hover:shadow-lg"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary mb-4">
                  {getIcon(benefit.icon)}
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {benefit.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <a
              href={primaryHref}
              className="inline-flex items-center justify-center rounded-lg text-base font-semibold transition-all bg-primary text-primary-foreground hover:bg-primary/90 h-14 px-10 shadow-lg hover:shadow-xl hover:scale-105 w-full sm:w-auto"
            >
              {primaryCTA}
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
            <a
              href={secondaryHref}
              className="inline-flex items-center justify-center rounded-lg text-base font-semibold transition-colors border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 h-14 px-10 w-full sm:w-auto"
            >
              {secondaryCTA}
            </a>
          </div>

          {/* Guarantee */}
          <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
            <span>{guaranteeText}</span>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-center">
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">10,000+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Active Users</div>
              </div>
              <div className="hidden md:block w-px h-12 bg-gray-200 dark:bg-gray-800" />
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">4.9/5</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Customer Rating</div>
              </div>
              <div className="hidden md:block w-px h-12 bg-gray-200 dark:bg-gray-800" />
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white">99.9%</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Uptime SLA</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
