import { Star, Quote, ChevronLeft, ChevronRight, BadgeCheck, Building2 } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  companyLogo?: string;
  avatar: string;
  content: string;
  rating: number;
  verified?: boolean;
  impact?: string;
}

interface Testimonial7Props {
  badge?: string;
  title?: string;
  subtitle?: string;
  testimonials?: Testimonial[];
}

export default function Testimonial7({
  badge = 'Customer Success Stories',
  title = 'Trusted by industry leaders',
  subtitle = 'Hear from companies that transformed their business with our platform',
  testimonials = [
    {
      name: 'Jennifer Adams',
      role: 'VP of Product',
      company: 'TechCorp Inc',
      companyLogo: 'https://ui-avatars.com/api/?name=TC&background=6366f1&color=fff&size=64',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      content: 'Implementing this solution was the best decision we made this year. Our team productivity increased by 85% and customer satisfaction scores went through the roof. The ROI was immediate.',
      rating: 5,
      verified: true,
      impact: '85% productivity increase'
    },
    {
      name: 'Michael Torres',
      role: 'CTO',
      company: 'DataFlow Systems',
      companyLogo: 'https://ui-avatars.com/api/?name=DF&background=ec4899&color=fff&size=64',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      content: 'The scalability and reliability are outstanding. We went from 1,000 to 100,000 users without any performance issues. Their support team is incredibly knowledgeable and responsive.',
      rating: 5,
      verified: true,
      impact: '100x scale achieved'
    },
    {
      name: 'Sarah Mitchell',
      role: 'Head of Operations',
      company: 'CloudScale',
      companyLogo: 'https://ui-avatars.com/api/?name=CS&background=10b981&color=fff&size=64',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
      content: 'We reduced our operational costs by 60% while improving service quality. The automation features alone saved us hundreds of hours every month. Absolutely game-changing!',
      rating: 5,
      verified: true,
      impact: '60% cost reduction'
    },
    {
      name: 'David Kim',
      role: 'Founder & CEO',
      company: 'StartupHub',
      companyLogo: 'https://ui-avatars.com/api/?name=SH&background=f59e0b&color=fff&size=64',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
      content: 'As a fast-growing startup, we needed a solution that could scale with us. This platform exceeded all expectations. Our time-to-market decreased by 50%.',
      rating: 5,
      verified: true,
      impact: '50% faster launches'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Marketing Director',
      company: 'GrowthLabs',
      companyLogo: 'https://ui-avatars.com/api/?name=GL&background=8b5cf6&color=fff&size=64',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop',
      content: 'The insights we get from the analytics dashboard have transformed our marketing strategy. We\'re making data-driven decisions that deliver real results.',
      rating: 5,
      verified: true,
      impact: '3x campaign ROI'
    },
    {
      name: 'Alex Johnson',
      role: 'Engineering Lead',
      company: 'DevTools Pro',
      companyLogo: 'https://ui-avatars.com/api/?name=DP&background=06b6d4&color=fff&size=64',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
      content: 'Clean APIs, excellent documentation, and a developer-first approach. Integration took less than a day. Our engineering team loves working with this platform.',
      rating: 5,
      verified: true,
      impact: 'Same-day integration'
    }
  ]
}: Testimonial7Props) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <BadgeCheck className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">{badge}</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 text-gray-900 dark:text-white">
            {title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {subtitle}
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white dark:from-gray-950 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white dark:from-gray-950 to-transparent z-10 pointer-events-none" />

          {/* Testimonials Scroll */}
          <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors shadow-sm"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </button>
            <button
              className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 flex items-center justify-center transition-colors shadow-sm"
              aria-label="Next testimonial"
            >
              <ChevronRight className="h-5 w-5 text-gray-700 dark:text-gray-300" />
            </button>
          </div>
        </div>

        {/* Company Logos Strip */}
        <div className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-8">
            Trusted by teams at
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60">
            {testimonials.slice(0, 5).map((testimonial, index) => (
              <div key={index} className="flex items-center gap-2">
                {testimonial.companyLogo && (
                  <img
                    src={testimonial.companyLogo}
                    alt={testimonial.company}
                    className="w-8 h-8 rounded"
                  />
                )}
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {testimonial.company}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex-shrink-0 w-[90%] md:w-[520px] snap-center">
      <div className="group relative bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-950 rounded-2xl p-8 border-2 border-gray-200 dark:border-gray-800 hover:border-primary dark:hover:border-primary transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 h-full">
        {/* Quote Icon Background */}
        <div className="absolute top-6 right-6 opacity-5 dark:opacity-10">
          <Quote className="h-24 w-24 text-gray-900 dark:text-white" />
        </div>

        {/* Header with Avatar and Company */}
        <div className="relative flex items-start gap-4 mb-6">
          <div className="relative">
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-16 h-16 rounded-full object-cover ring-4 ring-white dark:ring-gray-900"
            />
            {testimonial.verified && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center ring-2 ring-white dark:ring-gray-900">
                <BadgeCheck className="h-4 w-4 text-white" />
              </div>
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="font-bold text-gray-900 dark:text-white">
                {testimonial.name}
              </h3>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {testimonial.role}
            </p>
            {testimonial.companyLogo ? (
              <div className="flex items-center gap-2 mt-2">
                <img
                  src={testimonial.companyLogo}
                  alt={testimonial.company}
                  className="w-6 h-6 rounded"
                />
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {testimonial.company}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 mt-2">
                <Building2 className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  {testimonial.company}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Rating */}
        <div className="flex gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < testimonial.rating
                  ? 'text-yellow-400 fill-yellow-400'
                  : 'text-gray-300 dark:text-gray-600'
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <p className="relative text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-lg">
          "{testimonial.content}"
        </p>

        {/* Impact Badge */}
        {testimonial.impact && (
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 border border-primary/20">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-semibold text-primary">
              {testimonial.impact}
            </span>
          </div>
        )}

        {/* Hover Gradient Effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/0 via-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </div>
    </div>
  );
}
