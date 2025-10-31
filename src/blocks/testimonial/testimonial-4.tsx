import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

interface Testimonial4Props {
  title?: string;
  description?: string;
  testimonials?: Testimonial[];
}

export default function Testimonial4({
  title = 'Trusted by industry leaders',
  description = 'See what our clients have to say about their experience',
  testimonials = [
    {
      name: 'Robert Thompson',
      role: 'CEO & Founder',
      company: 'TechVision Global',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
      content: 'This platform transformed our entire workflow. The ROI was apparent within weeks, and our team productivity has skyrocketed. Best investment we made this year.',
      rating: 5
    },
    {
      name: 'Lisa Anderson',
      role: 'Head of Operations',
      company: 'NextGen Solutions',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
      content: 'Outstanding support and incredible features. The platform is intuitive, powerful, and has cut our operational costs by 40%. Highly recommend to any growing company.',
      rating: 5
    },
    {
      name: 'Marcus Johnson',
      role: 'CTO',
      company: 'DataStream Inc',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
      content: 'From a technical standpoint, this is exceptional. Clean architecture, robust API, and seamless integrations. Our deployment efficiency improved dramatically.',
      rating: 5
    },
    {
      name: 'Sophie Chen',
      role: 'Director of Product',
      company: 'InnovateLabs',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      content: 'The user experience is phenomenal. Our team adopted it instantly, and customer satisfaction scores went up by 42%. This is the gold standard for SaaS platforms.',
      rating: 5
    }
  ]
}: Testimonial4Props) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>

        {/* Testimonials Carousel/Grid */}
        <div className="max-w-6xl mx-auto">
          {/* Grid Layout - Shows 2 columns on desktop */}
          <div className="grid gap-8 md:grid-cols-2 mb-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="relative bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 shadow-md hover:shadow-xl transition-all duration-300"
              >
                {/* Quote Icon Background */}
                <div className="absolute top-6 right-6 opacity-10">
                  <Quote className="h-16 w-16 text-primary" />
                </div>

                {/* Content */}
                <div className="relative z-10">
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

                  {/* Testimonial Text */}
                  <blockquote className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                    "{testimonial.content}"
                  </blockquote>

                  {/* Author Info */}
                  <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/20"
                    />
                    <div>
                      <p className="font-bold text-gray-900 dark:text-white">
                        {testimonial.name}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {testimonial.role}
                      </p>
                      <p className="text-sm font-medium text-primary">
                        {testimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Hint */}
          <div className="flex items-center justify-center gap-4 text-gray-500 dark:text-gray-400">
            <button className="p-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex gap-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"></div>
              <div className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"></div>
            </div>
            <button className="p-2 rounded-full border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <div className="max-w-4xl mx-auto mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <p className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              10K+
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Happy Customers
            </p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              4.9/5
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Average Rating
            </p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              99.9%
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Uptime SLA
            </p>
          </div>
          <div>
            <p className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
              24/7
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Support Available
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
