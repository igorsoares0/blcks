import { ArrowRight, Check } from 'lucide-react';

interface Hero5Props {
  badge?: string;
  title?: string;
  description?: string;
  primaryCTA?: string;
  secondaryCTA?: string;
  features?: string[];
  imageUrl?: string;
  stats?: {
    value: string;
    label: string;
  }[];
}

export default function Hero5({
  badge = 'New Release',
  title = 'Build better products faster',
  description = 'Everything you need to ship your next product. From design to deployment, we provide the tools and infrastructure to help you build faster.',
  primaryCTA = 'Get Started',
  secondaryCTA = 'View Demo',
  features = [
    'No credit card required',
    'Free 14-day trial',
    'Cancel anytime'
  ],
  imageUrl = 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
  stats = [
    { value: '50K+', label: 'Active users' },
    { value: '99.9%', label: 'Uptime' },
    { value: '24/7', label: 'Support' }
  ]
}: Hero5Props) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <div className="flex flex-col justify-center space-y-6">
            {/* Badge */}
            <div className="inline-flex self-start">
              <div className="inline-flex items-center rounded-full border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-3 py-1 text-sm font-medium text-gray-900 dark:text-gray-100">
                {badge}
              </div>
            </div>

            {/* Title */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-gray-900 dark:text-white">
                {title}
              </h1>
              <p className="max-w-[600px] text-gray-600 dark:text-gray-400 text-lg md:text-xl">
                {description}
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-3 min-[400px]:flex-row">
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8">
                {primaryCTA}
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-gray-300 dark:border-gray-700 bg-transparent hover:bg-gray-50 dark:hover:bg-gray-800 h-11 px-8">
                {secondaryCTA}
              </button>
            </div>

            {/* Features */}
            <div className="flex flex-col gap-2 pt-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10 text-primary">
                    <Check className="h-3 w-3" />
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {feature}
                  </span>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-8 pt-4 border-t border-gray-200 dark:border-gray-800">
              {stats.map((stat, index) => (
                <div key={index} className="flex flex-col">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Image/Mockup */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[600px]">
              {/* Main Image */}
              <div className="relative rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900 p-2 shadow-2xl">
                <img
                  src={imageUrl}
                  alt="Product Dashboard"
                  className="w-full h-auto rounded-lg object-cover"
                />
              </div>

              {/* Floating Card 1 - Top Right */}
              <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-lg p-4 hidden sm:block">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      Deploy Success
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Just now
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating Card 2 - Bottom Left */}
              <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 shadow-lg p-4 hidden sm:block">
                <div className="flex flex-col gap-1">
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    Performance
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    98.5%
                  </p>
                  <div className="flex items-center gap-1">
                    <div className="w-12 h-1.5 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                      <div className="w-[98.5%] h-full bg-primary rounded-full"></div>
                    </div>
                    <span className="text-xs text-green-600 dark:text-green-400">
                      +2.5%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
