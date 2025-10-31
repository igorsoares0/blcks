import { Zap, Shield, Target, BarChart3, RefreshCw, MessageCircle } from 'lucide-react';

interface Feature {
  icon: 'zap' | 'shield' | 'target' | 'barchart' | 'refresh' | 'message';
  title: string;
  description: string;
}

interface Features4Props {
  badge?: string;
  title?: string;
  subtitle?: string;
  features?: Feature[];
}

export default function Features4({
  badge = 'Features',
  title = 'Why choose us',
  subtitle = 'Discover the features that make our product stand out from the competition',
  features = [
    {
      icon: 'zap',
      title: 'Lightning Fast Performance',
      description: 'Experience blazing-fast load times and seamless interactions. Our optimized infrastructure ensures your applications run smoothly even under heavy load.'
    },
    {
      icon: 'shield',
      title: 'Enterprise-Grade Security',
      description: 'Your data is protected with industry-leading encryption and security protocols. We maintain SOC 2 compliance and regular security audits to keep your information safe.'
    },
    {
      icon: 'target',
      title: 'Intuitive User Interface',
      description: 'Navigate effortlessly through our clean and intuitive interface. Designed with user experience in mind, every feature is just a click away.'
    },
    {
      icon: 'barchart',
      title: 'Advanced Analytics',
      description: 'Gain valuable insights with our comprehensive analytics dashboard. Track metrics, visualize data, and make informed decisions with real-time reporting.'
    },
    {
      icon: 'refresh',
      title: 'Seamless Integrations',
      description: 'Connect with your favorite tools and services. Our platform integrates with hundreds of third-party applications to fit perfectly into your workflow.'
    },
    {
      icon: 'message',
      title: '24/7 Premium Support',
      description: 'Get help whenever you need it. Our dedicated support team is available around the clock to assist you with any questions or issues.'
    }
  ]
}: Features4Props) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'zap':
        return <Zap className="h-6 w-6" />;
      case 'shield':
        return <Shield className="h-6 w-6" />;
      case 'target':
        return <Target className="h-6 w-6" />;
      case 'barchart':
        return <BarChart3 className="h-6 w-6" />;
      case 'refresh':
        return <RefreshCw className="h-6 w-6" />;
      case 'message':
        return <MessageCircle className="h-6 w-6" />;
      default:
        return <Zap className="h-6 w-6" />;
    }
  };
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
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

        {/* Features List */}
        <div className="max-w-4xl mx-auto space-y-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex gap-6 p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 hover:shadow-md transition-all"
            >
              {/* Icon */}
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 text-blue-600 dark:text-blue-400">
                  {getIcon(feature.icon)}
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 space-y-2">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
