import { Rocket, Target, Wrench, Smartphone, Moon, Zap } from 'lucide-react';

interface Feature {
  icon: 'rocket' | 'target' | 'wrench' | 'smartphone' | 'moon' | 'zap';
  title: string;
  description: string;
  span?: 'single' | 'double'; // Define se o card ocupa 1 ou 2 colunas
}

interface Features3Props {
  badge?: string;
  title?: string;
  subtitle?: string;
  features?: Feature[];
}

export default function Features3({
  badge = 'Features',
  title = 'Everything you need in one place',
  subtitle = 'Powerful tools and features to help you build amazing products',
  features = [
    {
      icon: 'rocket',
      title: 'Fast Performance',
      description: 'Optimized for speed with cutting-edge technology and best practices',
      span: 'double'
    },
    {
      icon: 'target',
      title: 'Precision',
      description: 'Pixel-perfect designs and accurate implementations',
      span: 'single'
    },
    {
      icon: 'wrench',
      title: 'Customizable',
      description: 'Fully customizable to match your brand',
      span: 'single'
    },
    {
      icon: 'smartphone',
      title: 'Mobile Ready',
      description: 'Responsive design that works on all devices',
      span: 'single'
    },
    {
      icon: 'moon',
      title: 'Dark Mode',
      description: 'Beautiful dark mode support out of the box',
      span: 'single'
    },
    {
      icon: 'zap',
      title: 'Real-time Updates',
      description: 'Stay synchronized with instant updates and live data across all your devices',
      span: 'double'
    }
  ]
}: Features3Props) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'rocket':
        return <Rocket className="h-8 w-8" />;
      case 'target':
        return <Target className="h-8 w-8" />;
      case 'wrench':
        return <Wrench className="h-8 w-8" />;
      case 'smartphone':
        return <Smartphone className="h-8 w-8" />;
      case 'moon':
        return <Moon className="h-8 w-8" />;
      case 'zap':
        return <Zap className="h-8 w-8" />;
      default:
        return <Rocket className="h-8 w-8" />;
    }
  };
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <span className="inline-flex items-center rounded-full bg-gray-200 dark:bg-gray-800 px-3 py-1 text-xs font-medium text-gray-700 dark:text-gray-300">
            {badge}
          </span>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 dark:text-white">
            {title}
          </h2>
          <p className="max-w-[700px] text-gray-600 dark:text-gray-400 md:text-xl">
            {subtitle}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-6 transition-all hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-700 ${
                feature.span === 'double' ? 'sm:col-span-2' : 'sm:col-span-1'
              }`}
            >
              {/* Icon */}
              <div className="mb-4 text-blue-600 dark:text-blue-400">
                {getIcon(feature.icon)}
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>

              {/* Decorative gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-transparent dark:from-gray-900 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
