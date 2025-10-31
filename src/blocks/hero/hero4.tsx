import { ArrowRight, Check, Sparkles, Zap, Shield } from 'lucide-react';

interface Feature {
  icon: 'check' | 'sparkles' | 'zap' | 'shield';
  text: string;
}

interface Hero4Props {
  badge?: string;
  title?: string;
  highlight?: string;
  description?: string;
  primaryCTA?: string;
  secondaryCTA?: string;
  features?: Feature[];
  avatars?: string[];
  socialProof?: string;
}

export default function Hero4({
  badge = 'Introducing v2.0',
  title = 'Build amazing products',
  highlight = 'faster than ever',
  description = 'The complete platform for modern teams. Ship products your customers love with powerful features and beautiful design.',
  primaryCTA = 'Start Free Trial',
  secondaryCTA = 'Book a Demo',
  features = [
    { icon: 'zap', text: 'Lightning fast performance' },
    { icon: 'shield', text: 'Enterprise-grade security' },
    { icon: 'sparkles', text: 'AI-powered workflows' },
    { icon: 'check', text: 'No credit card required' }
  ],
  avatars = [
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
  ],
  socialProof = 'Join 10,000+ teams already using our platform'
}: Hero4Props) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'check':
        return <Check className="h-4 w-4" />;
      case 'sparkles':
        return <Sparkles className="h-4 w-4" />;
      case 'zap':
        return <Zap className="h-4 w-4" />;
      case 'shield':
        return <Shield className="h-4 w-4" />;
      default:
        return <Check className="h-4 w-4" />;
    }
  };

  return (
    <section className="relative w-full py-16 md:py-24 lg:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-blue-950"></div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-72 h-72 bg-purple-400/20 rounded-full blur-3xl"></div>

      {/* Content */}
      <div className="relative container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-1.5 text-sm font-medium text-white shadow-lg">
              <Sparkles className="h-4 w-4" />
              {badge}
            </div>

            {/* Title */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-gray-900 dark:text-white">
                {title}
              </h1>
              <h2 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {highlight}
              </h2>
            </div>

            {/* Description */}
            <p className="max-w-2xl text-lg md:text-xl text-gray-600 dark:text-gray-400">
              {description}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="inline-flex items-center justify-center rounded-lg text-base font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:opacity-90 h-12 px-8 shadow-lg hover:shadow-xl">
                {primaryCTA}
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
              <button className="inline-flex items-center justify-center rounded-lg text-base font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 h-12 px-8">
                {secondaryCTA}
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-4xl mt-8">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 p-3 rounded-lg bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-sm"
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white flex-shrink-0">
                    {getIcon(feature.icon)}
                  </div>
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {feature.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Social Proof */}
            <div className="flex flex-col items-center gap-4 mt-8">
              {/* Avatars */}
              <div className="flex -space-x-3">
                {avatars.map((avatar, index) => (
                  <img
                    key={index}
                    src={avatar}
                    alt={`User ${index + 1}`}
                    className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-900 object-cover"
                  />
                ))}
              </div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {socialProof}
              </p>
            </div>

            {/* Decorative bottom cards */}
            <div className="relative w-full max-w-5xl mt-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1 */}
                <div className="p-6 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white mb-4">
                    <Zap className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Fast Setup
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Get started in minutes with our intuitive setup wizard
                  </p>
                </div>

                {/* Card 2 */}
                <div className="p-6 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white mb-4">
                    <Shield className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Secure by Default
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Enterprise-grade security and compliance built in
                  </p>
                </div>

                {/* Card 3 */}
                <div className="p-6 rounded-xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white mb-4">
                    <Sparkles className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    AI Powered
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Intelligent automation to boost your productivity
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
