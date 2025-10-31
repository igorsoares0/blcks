interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

interface Metric {
  value: string;
  label: string;
}

interface Hero9Props {
  badge?: string;
  title?: string;
  description?: string;
  primaryCTA?: string;
  secondaryCTA?: string;
  testimonials?: Testimonial[];
  metrics?: Metric[];
  imageUrl?: string;
}

export default function Hero9({
  badge = 'Trusted by thousands',
  title = 'The platform teams love to use',
  description = 'Join thousands of teams who have transformed their workflow. Our intuitive platform helps you ship faster and collaborate better.',
  primaryCTA = 'Start Free Trial',
  secondaryCTA = 'Book a Demo',
  testimonials = [
    {
      quote: 'This platform has completely transformed how our team works together.',
      author: 'Sarah Johnson',
      role: 'Product Manager at TechCo',
      avatar: 'SJ'
    },
    {
      quote: 'The best tool we\'ve used for project management. Highly recommended!',
      author: 'Michael Chen',
      role: 'CTO at StartupXYZ',
      avatar: 'MC'
    }
  ],
  metrics = [
    { value: '50K+', label: 'Active users' },
    { value: '99.9%', label: 'Uptime SLA' },
    { value: '4.9/5', label: 'User rating' }
  ],
  imageUrl = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop'
}: Hero9Props) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Column - Content */}
          <div className="flex flex-col space-y-8">
            {/* Badge */}
            <div className="inline-flex w-fit items-center rounded-full border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-3 py-1 text-sm text-gray-600 dark:text-gray-400">
              {badge}
            </div>

            {/* Title and Description */}
            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-gray-900 dark:text-white">
                {title}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 md:text-xl max-w-xl">
                {description}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="inline-flex items-center justify-center rounded-lg text-base font-medium transition-colors bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 h-12 px-8">
                {primaryCTA}
              </button>
              <button className="inline-flex items-center justify-center rounded-lg text-base font-medium transition-colors border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800 h-12 px-8">
                {secondaryCTA}
              </button>
            </div>

            {/* Metrics */}
            <div className="flex flex-wrap gap-8 pt-4">
              {metrics.map((metric, index) => (
                <div key={index} className="flex flex-col">
                  <span className="text-3xl font-bold text-gray-900 dark:text-white">
                    {metric.value}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {metric.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Image and Testimonials */}
          <div className="relative">
            {/* Main Image */}
            <div className="rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-xl">
              <img
                src={imageUrl}
                alt="Team collaboration"
                className="w-full h-auto object-cover aspect-[4/3]"
              />
            </div>

            {/* Floating Testimonial Cards */}
            <div className="absolute -bottom-8 -left-4 right-4 md:-left-12 md:right-12 space-y-4">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 shadow-lg"
                >
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 line-clamp-2">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-semibold">
                      {testimonial.avatar}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {testimonial.author}
                      </span>
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {testimonial.role}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
