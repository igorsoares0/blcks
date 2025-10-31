import { Zap, Lock, Palette, Rocket, BarChart3, Plug } from 'lucide-react';

interface Feature {
  icon: 'zap' | 'lock' | 'palette' | 'rocket' | 'barchart' | 'plug';
  title: string;
  description: string;
}

interface Features2Props {
  badge?: string;
  title?: string;
  subtitle?: string;
  features?: Feature[];
  imageUrl?: string;
  imagePosition?: 'left' | 'right';
}

export default function Features2({
  badge = 'Features',
  title = 'Everything you need to succeed',
  subtitle = 'Powerful features designed to help you build better products faster',
  features = [
    {
      icon: 'zap',
      title: 'Lightning Fast',
      description: 'Built for speed with optimized performance and minimal load times'
    },
    {
      icon: 'lock',
      title: 'Secure by Default',
      description: 'Enterprise-grade security with end-to-end encryption and compliance'
    },
    {
      icon: 'palette',
      title: 'Beautiful Design',
      description: 'Pixel-perfect UI components with dark mode and responsive layouts'
    },
    {
      icon: 'rocket',
      title: 'Easy to Deploy',
      description: 'One-click deployment to any platform with automatic scaling'
    },
    {
      icon: 'barchart',
      title: 'Analytics Built-in',
      description: 'Real-time insights and metrics to track your product growth'
    },
    {
      icon: 'plug',
      title: 'API First',
      description: 'RESTful API with comprehensive documentation and SDKs'
    }
  ],
  imageUrl = 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop',
  imagePosition = 'right'
}: Features2Props) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'zap':
        return <Zap className="h-7 w-7" />;
      case 'lock':
        return <Lock className="h-7 w-7" />;
      case 'palette':
        return <Palette className="h-7 w-7" />;
      case 'rocket':
        return <Rocket className="h-7 w-7" />;
      case 'barchart':
        return <BarChart3 className="h-7 w-7" />;
      case 'plug':
        return <Plug className="h-7 w-7" />;
      default:
        return <Zap className="h-7 w-7" />;
    }
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <span className="inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-800 px-3 py-1 text-xs font-medium text-gray-600 dark:text-gray-400">
            {badge}
          </span>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 dark:text-white">
            {title}
          </h2>
          <p className="max-w-[700px] text-gray-600 dark:text-gray-400 md:text-xl">
            {subtitle}
          </p>
        </div>

        {/* Content */}
        <div className={`grid gap-8 lg:grid-cols-2 lg:gap-12 items-center ${imagePosition === 'left' ? 'lg:grid-flow-dense' : ''}`}>
          {/* Features Grid */}
          <div className={`grid gap-6 sm:grid-cols-2 ${imagePosition === 'left' ? 'lg:col-start-2' : ''}`}>
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex flex-col gap-2 p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-blue-600 dark:text-blue-400">
                    {getIcon(feature.icon)}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          {/* Image */}
          <div className={`${imagePosition === 'left' ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800">
              <img
                src={imageUrl}
                alt="Features illustration"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
