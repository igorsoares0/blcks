import { ArrowRight, Sparkles, Star, Zap, TrendingUp } from 'lucide-react';

interface Stat {
  value: string;
  label: string;
}

interface CTA6Props {
  badge?: string;
  title?: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  stats?: Stat[];
  image?: string;
}

export default function CTA6({
  badge = 'Limited Time Offer',
  title = 'Transform Your Workflow Today',
  description = 'Join thousands of teams who have already revolutionized their productivity with our platform. Start your journey to success now.',
  primaryButtonText = 'Get Started Free',
  primaryButtonHref = '#',
  secondaryButtonText = 'Watch Demo',
  secondaryButtonHref = '#',
  stats = [
    { value: '50K+', label: 'Active Users' },
    { value: '4.9/5', label: 'Rating' },
    { value: '99.9%', label: 'Uptime' }
  ],
  image = 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=600&fit=crop'
}: CTA6Props) {
  return (
    <section className="w-full py-12 md:py-20 lg:py-24 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 dark:from-primary/10 dark:via-primary/20 dark:to-primary/10 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative">
          {/* Background decorative elements */}
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />

          <div className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-800">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Content Side */}
              <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6 w-fit">
                  <Sparkles className="h-4 w-4" />
                  {badge}
                </div>

                {/* Title */}
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
                  {title}
                </h2>

                {/* Description */}
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
                  {description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6 mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
                  {stats.map((stat, index) => (
                    <div key={index} className="text-center lg:text-left">
                      <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                        {stat.value}
                      </div>
                      <div className="text-xs md:text-sm text-gray-600 dark:text-gray-400">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href={primaryButtonHref}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-all duration-300 hover:shadow-lg hover:scale-105"
                  >
                    {primaryButtonText}
                    <ArrowRight className="h-5 w-5" />
                  </a>
                  <a
                    href={secondaryButtonHref}
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300"
                  >
                    {secondaryButtonText}
                  </a>
                </div>

                {/* Trust indicators */}
                <div className="flex items-center gap-2 mt-8 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span>Trusted by 50,000+ companies worldwide</span>
                </div>
              </div>

              {/* Image Side */}
              <div className="relative lg:min-h-[600px] bg-gradient-to-br from-primary/20 to-primary/5 dark:from-primary/30 dark:to-primary/10">
                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="relative w-full h-full">
                    <img
                      src={image}
                      alt="CTA"
                      className="w-full h-full object-cover rounded-2xl shadow-2xl"
                    />

                    {/* Floating elements */}
                    <div className="absolute -top-4 -right-4 bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-4 border border-gray-200 dark:border-gray-800 hidden lg:block">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                          <Zap className="h-6 w-6 text-green-600 dark:text-green-400" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900 dark:text-white">Fast Setup</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">Under 5 minutes</div>
                        </div>
                      </div>
                    </div>

                    <div className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-4 border border-gray-200 dark:border-gray-800 hidden lg:block">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                          <TrendingUp className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-gray-900 dark:text-white">Growing Fast</div>
                          <div className="text-xs text-gray-600 dark:text-gray-400">+127% this month</div>
                        </div>
                      </div>
                    </div>
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
