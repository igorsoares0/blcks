import { Search, ArrowRight, Star } from 'lucide-react';

interface Category {
  name: string;
  icon?: string;
}

interface Hero6Props {
  title?: string;
  subtitle?: string;
  description?: string;
  searchPlaceholder?: string;
  searchButtonText?: string;
  categories?: Category[];
  trustedBy?: string;
  rating?: {
    value: string;
    count: string;
  };
}

export default function Hero6({
  title = 'Find the perfect solution',
  subtitle = 'for your business',
  description = 'Discover thousands of high-quality templates, components and tools to accelerate your development workflow.',
  searchPlaceholder = 'Search for components, templates...',
  searchButtonText = 'Search',
  categories = [
    { name: 'Landing Pages' },
    { name: 'Dashboards' },
    { name: 'E-commerce' },
    { name: 'Marketing' },
    { name: 'SaaS' }
  ],
  trustedBy = 'Trusted by 50,000+ developers worldwide',
  rating = {
    value: '4.9',
    count: '12,500'
  }
}: Hero6Props) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
          {/* Title */}
          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-gray-900 dark:text-white">
              {title}
            </h1>
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
              {subtitle}
            </h2>
          </div>

          {/* Description */}
          <p className="max-w-2xl text-lg md:text-xl text-gray-600 dark:text-gray-400">
            {description}
          </p>

          {/* Search Bar */}
          <div className="w-full max-w-2xl">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  className="w-full h-12 pl-10 pr-4 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 whitespace-nowrap">
                {searchButtonText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Popular Categories */}
          <div className="flex flex-col items-center gap-3 pt-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Popular categories:
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category, index) => (
                <button
                  key={index}
                  className="inline-flex items-center rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-1.5 text-sm font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col sm:flex-row items-center gap-6 pt-4 border-t border-gray-200 dark:border-gray-800 w-full max-w-2xl">
            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className="h-5 w-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <div className="flex items-center gap-1 text-sm">
                <span className="font-semibold text-gray-900 dark:text-white">
                  {rating.value}
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  ({rating.count} reviews)
                </span>
              </div>
            </div>

            {/* Divider */}
            <div className="hidden sm:block h-4 w-px bg-gray-200 dark:bg-gray-800"></div>

            {/* Trusted By */}
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {trustedBy}
            </p>
          </div>

          {/* Visual Elements - Avatars or Logos */}
          <div className="flex items-center gap-2 pt-2">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-950 bg-gradient-to-br from-blue-400 to-blue-600"></div>
              <div className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-950 bg-gradient-to-br from-purple-400 to-purple-600"></div>
              <div className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-950 bg-gradient-to-br from-pink-400 to-pink-600"></div>
              <div className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-950 bg-gradient-to-br from-orange-400 to-orange-600"></div>
              <div className="w-8 h-8 rounded-full border-2 border-white dark:border-gray-950 bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">
                  50K+
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
