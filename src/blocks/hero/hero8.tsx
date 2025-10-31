import { Rocket, Zap, Lock, BarChart3, Target } from 'lucide-react';

interface Benefit {
  icon: 'zap' | 'lock' | 'barchart' | 'target';
  title: string;
  description: string;
}

interface Hero8Props {
  badge?: string;
  title?: string;
  highlight?: string;
  description?: string;
  primaryCTA?: string;
  secondaryCTA?: string;
  benefits?: Benefit[];
  trustIndicator?: string;
}

export default function Hero8({
  badge = 'New Launch',
  title = 'Transform your workflow with',
  highlight = 'intelligent automation',
  description = 'Streamline your processes, boost productivity, and achieve more with our powerful platform designed for modern teams.',
  primaryCTA = 'Get Started Free',
  secondaryCTA = 'View Demo',
  benefits = [
    {
      icon: 'zap',
      title: 'Lightning Fast',
      description: 'Deploy in seconds, not hours'
    },
    {
      icon: 'lock',
      title: 'Secure by Default',
      description: 'Enterprise-grade security built-in'
    },
    {
      icon: 'barchart',
      title: 'Real-time Analytics',
      description: 'Track performance as it happens'
    },
    {
      icon: 'target',
      title: 'Easy Integration',
      description: 'Connect with your favorite tools'
    }
  ],
  trustIndicator = 'Trusted by 50,000+ teams worldwide'
}: Hero8Props) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'zap':
        return <Zap className="h-8 w-8" />;
      case 'lock':
        return <Lock className="h-8 w-8" />;
      case 'barchart':
        return <BarChart3 className="h-8 w-8" />;
      case 'target':
        return <Target className="h-8 w-8" />;
      default:
        return <Zap className="h-8 w-8" />;
    }
  };
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-900 dark:text-gray-100">
            <Rocket className="h-4 w-4" />
            {badge}
          </div>
        </div>

        {/* Title and Description */}
        <div className="flex flex-col items-center text-center space-y-6 mb-12">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl">
            {title}{' '}
            <span className="text-blue-600 dark:text-blue-400">
              {highlight}
            </span>
          </h1>
          <p className="max-w-2xl text-lg text-gray-600 dark:text-gray-400 md:text-xl">
            {description}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <button className="inline-flex items-center justify-center rounded-lg text-base font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 h-12 px-8 shadow-lg">
            {primaryCTA}
          </button>
          <button className="inline-flex items-center justify-center rounded-lg text-base font-medium transition-colors border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 h-12 px-8">
            {secondaryCTA}
          </button>
        </div>

        {/* Trust Indicator */}
        <div className="flex justify-center mb-12">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {trustIndicator}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="flex flex-col p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="text-blue-600 dark:text-blue-400 mb-4">
                {getIcon(benefit.icon)}
              </div>
              <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
                {benefit.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
