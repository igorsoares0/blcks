import { Sparkles, Zap, Lock, Globe, BarChart3 } from 'lucide-react';

interface Feature {
  icon: 'zap' | 'lock' | 'globe' | 'barchart';
  text: string;
}

interface Hero10Props {
  badge?: string;
  title?: string;
  description?: string;
  primaryCTA?: string;
  secondaryCTA?: string;
  features?: Feature[];
  codeSnippet?: string;
  stats?: {
    value: string;
    label: string;
  }[];
}

export default function Hero10({
  badge = 'New in v2.0',
  title = 'Build and deploy faster than ever',
  description = 'A powerful development platform that helps you ship products faster. Write code, deploy instantly, and scale effortlessly.',
  primaryCTA = 'Start Building',
  secondaryCTA = 'View Documentation',
  features = [
    { icon: 'zap', text: 'Deploy in seconds' },
    { icon: 'lock', text: 'Secure by default' },
    { icon: 'globe', text: 'Global CDN' },
    { icon: 'barchart', text: 'Real-time analytics' }
  ],
  codeSnippet = `npm install @blcks/cli
npx blcks deploy

✓ Building project...
✓ Deploying to production...
✓ Done! https://your-app.blcks.app`,
  stats = [
    { value: '100K+', label: 'Deployments' },
    { value: '99.99%', label: 'Uptime' },
    { value: '<100ms', label: 'Response time' }
  ]
}: Hero10Props) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'zap':
        return <Zap className="h-4 w-4" />;
      case 'lock':
        return <Lock className="h-4 w-4" />;
      case 'globe':
        return <Globe className="h-4 w-4" />;
      case 'barchart':
        return <BarChart3 className="h-4 w-4" />;
      default:
        return <Zap className="h-4 w-4" />;
    }
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 md:px-6">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 dark:bg-blue-950 border border-blue-100 dark:border-blue-900 px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-300">
            <Sparkles className="h-4 w-4" />
            {badge}
          </div>
        </div>

        {/* Title and Description */}
        <div className="flex flex-col items-center text-center space-y-6 mb-12 max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-gray-900 dark:text-white">
            {title}
          </h1>
          <p className="max-w-2xl text-lg text-gray-600 dark:text-gray-400 md:text-xl">
            {description}
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <button className="inline-flex items-center justify-center rounded-lg text-base font-medium transition-colors bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 h-12 px-8 shadow-lg">
            {primaryCTA}
          </button>
          <button className="inline-flex items-center justify-center rounded-lg text-base font-medium transition-colors border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 h-12 px-8">
            {secondaryCTA}
          </button>
        </div>

        {/* Features */}
        <div className="flex flex-wrap justify-center gap-6 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300"
            >
              <span className="text-blue-600 dark:text-blue-400">
                {getIcon(feature.icon)}
              </span>
              <span>{feature.text}</span>
            </div>
          ))}
        </div>

        {/* Code Preview Window */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden shadow-2xl bg-white dark:bg-gray-950">
            {/* Window Header */}
            <div className="bg-gray-100 dark:bg-gray-900 px-4 py-3 flex items-center gap-2 border-b border-gray-200 dark:border-gray-800">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 text-center">
                <span className="text-xs text-gray-600 dark:text-gray-400 font-mono">
                  terminal
                </span>
              </div>
            </div>
            {/* Code Content */}
            <div className="bg-gray-950 dark:bg-black p-6">
              <pre className="text-sm font-mono text-gray-100 whitespace-pre-wrap">
                {codeSnippet}
              </pre>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
