import { Play, Calendar, CheckCircle2, Star, TrendingUp } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  rating: number;
}

interface CTA5Props {
  badge?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  videoThumbnail?: string;
  videoAlt?: string;
  primaryCTA?: string;
  primaryHref?: string;
  secondaryCTA?: string;
  secondaryHref?: string;
  benefits?: string[];
  testimonial?: Testimonial;
  stats?: {
    label: string;
    value: string;
  }[];
}

export default function CTA5({
  badge = 'Watch Demo',
  title = 'See it in action',
  subtitle = 'Experience the difference yourself',
  description = 'Watch our 2-minute demo and discover how our platform can transform your workflow. Book a personalized demo with our team today.',
  videoThumbnail = 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=800&fit=crop',
  videoAlt = 'Product demo preview',
  primaryCTA = 'Book a Demo',
  primaryHref = '#',
  secondaryCTA = 'Watch Video',
  secondaryHref = '#',
  benefits = [
    'No credit card required',
    'Free 30-day trial included',
    'Setup in under 10 minutes'
  ],
  testimonial = {
    name: 'Sarah Johnson',
    role: 'Marketing Director',
    avatar: 'https://i.pravatar.cc/150?img=5',
    rating: 5
  },
  stats = [
    { label: 'Customer Satisfaction', value: '98%' },
    { label: 'Setup Time', value: '< 10 min' },
    { label: 'ROI Increase', value: '3.5x' }
  ]
}: CTA5Props) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
          {/* Left Column - Video/Visual */}
          <div className="relative order-2 lg:order-1">
            {/* Video Thumbnail */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
              <img
                src={videoThumbnail}
                alt={videoAlt}
                className="w-full h-auto object-cover aspect-video"
              />

              {/* Play Button Overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/40 via-primary/20 to-transparent dark:from-primary/60 dark:via-primary/30 flex items-center justify-center">
                <button className="w-20 h-20 rounded-full bg-white dark:bg-gray-900 shadow-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Play className="h-8 w-8 text-primary ml-1" fill="currentColor" />
                </button>
              </div>

              {/* Floating Stats Card */}
              <div className="absolute bottom-4 left-4 right-4 bg-white dark:bg-gray-900 rounded-xl p-4 shadow-xl border border-gray-200 dark:border-gray-800">
                <div className="grid grid-cols-3 gap-4 text-center">
                  {stats.map((stat, index) => (
                    <div key={index}>
                      <div className="text-lg md:text-xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -z-10 -top-4 -left-4 w-32 h-32 bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl" />
            <div className="absolute -z-10 -bottom-4 -right-4 w-40 h-40 bg-primary/10 dark:bg-primary/20 rounded-full blur-3xl" />
          </div>

          {/* Right Column - Content */}
          <div className="flex flex-col justify-center space-y-6 order-1 lg:order-2">
            {/* Badge */}
            <div className="inline-flex items-center w-fit rounded-full bg-primary/10 dark:bg-primary/20 px-4 py-1.5 text-sm font-semibold text-primary">
              <Play className="h-4 w-4 mr-2" />
              {badge}
            </div>

            {/* Title */}
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 dark:text-white">
                {title}
              </h2>
              <p className="text-xl font-semibold text-primary">
                {subtitle}
              </p>
            </div>

            {/* Description */}
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {description}
            </p>

            {/* Benefits List */}
            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-100 dark:bg-green-950">
                    <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                  </div>
                  <span className="text-sm md:text-base text-gray-700 dark:text-gray-300">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <a
                href={primaryHref}
                className="inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <Calendar className="mr-2 h-5 w-5" />
                {primaryCTA}
              </a>
              <a
                href={secondaryHref}
                className="inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-colors border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800 h-12 px-8"
              >
                <Play className="mr-2 h-5 w-5" />
                {secondaryCTA}
              </a>
            </div>

            {/* Testimonial */}
            <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full border-2 border-white dark:border-gray-800 shadow-md"
              />
              <div className="flex-1">
                <div className="flex items-center gap-1 mb-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  {testimonial.name}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {testimonial.role}
                </p>
              </div>
              <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
