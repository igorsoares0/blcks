import { Play, Star, Users, Zap } from 'lucide-react';

interface Stat {
  icon: 'users' | 'star' | 'zap';
  value: string;
  label: string;
}

interface Hero3Props {
  badge?: string;
  title?: string;
  description?: string;
  primaryCTA?: string;
  secondaryCTA?: string;
  videoUrl?: string;
  stats?: Stat[];
}

export default function Hero3({
  badge = 'Trusted by 10,000+ companies',
  title = 'Ship faster with our component library',
  description = 'Beautiful, accessible components that you can copy and paste into your apps. Made with Tailwind CSS and ready to use.',
  primaryCTA = 'Start Building',
  secondaryCTA = 'Watch Demo',
  videoUrl = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=800&fit=crop',
  stats = [
    { icon: 'users', value: '10K+', label: 'Active Users' },
    { icon: 'star', value: '4.9/5', label: 'Rating' },
    { icon: 'zap', value: '99.9%', label: 'Uptime' }
  ]
}: Hero3Props) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'users':
        return <Users className="h-5 w-5" />;
      case 'star':
        return <Star className="h-5 w-5" />;
      case 'zap':
        return <Zap className="h-5 w-5" />;
      default:
        return <Zap className="h-5 w-5" />;
    }
  };

  return (
    <section className="relative w-full py-16 md:py-24 lg:py-32 overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-gray-900/[0.04] dark:bg-grid-white/[0.02]" style={{
        backgroundImage: 'linear-gradient(to right, rgb(0 0 0 / 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgb(0 0 0 / 0.05) 1px, transparent 1px)',
        backgroundSize: '64px 64px'
      }}></div>

      {/* Content Container */}
      <div className="relative container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center rounded-full border border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm px-4 py-2 text-sm font-medium text-gray-900 dark:text-gray-100">
            {badge}
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent">
            {title}
          </h1>

          {/* Description */}
          <p className="max-w-2xl text-lg md:text-xl text-gray-600 dark:text-gray-400">
            {description}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 shadow-lg shadow-primary/20">
              {primaryCTA}
            </button>
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8">
              <Play className="mr-2 h-4 w-4" />
              {secondaryCTA}
            </button>
          </div>

          {/* Video/Image Preview */}
          <div className="relative w-full max-w-5xl mt-12">
            <div className="relative rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-2 shadow-2xl">
              <img
                src={videoUrl}
                alt="Product preview"
                className="w-full h-auto rounded-lg object-cover"
              />
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="flex items-center justify-center w-16 h-16 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm shadow-lg hover:scale-110 transition-transform">
                  <Play className="h-6 w-6 text-gray-900 dark:text-white ml-1" />
                </button>
              </div>
            </div>

            {/* Floating Stats Cards */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-full max-w-3xl px-4">
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow-lg"
                  >
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary mb-2">
                      {getIcon(stat.icon)}
                    </div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Spacer for floating cards */}
          <div className="h-16"></div>
        </div>
      </div>
    </section>
  );
}
