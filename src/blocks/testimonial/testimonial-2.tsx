import { Quote, Star, ArrowLeft, ArrowRight } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

interface Testimonial2Props {
  title?: string;
  description?: string;
  testimonials?: Testimonial[];
}

export default function Testimonial2({
  title = 'Loved by thousands of users',
  description = 'Join our growing community of satisfied customers',
  testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Marketing Director',
      company: 'GrowthCo',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      content: 'This platform has transformed how we approach our marketing campaigns. The analytics are incredibly detailed and the automation features save us hours every week. Highly recommended!',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'Software Engineer',
      company: 'TechVentures',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      content: 'As a developer, I appreciate clean code and good documentation. This product exceeds expectations on both fronts. Integration was seamless and support has been outstanding.',
      rating: 5
    },
    {
      name: 'Emily Rodriguez',
      role: 'CEO',
      company: 'Innovate Inc',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
      content: 'We tried several solutions before finding this one. The difference is night and day. Our team productivity increased by 50% and customer satisfaction has never been higher.',
      rating: 5
    }
  ]
}: Testimonial2Props) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-primary/5">
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

        {/* Featured Testimonial - Large Card */}
        <div className="max-w-5xl mx-auto mb-12">
          <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-12 shadow-xl border border-gray-200 dark:border-gray-700">
            {/* Large Quote Icon */}
            <div className="absolute -top-6 left-8 w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg rotate-12">
              <Quote className="h-8 w-8 text-primary-foreground" />
            </div>

            {/* Content */}
            <div className="mt-4">
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-6 w-6 ${
                      i < testimonials[0].rating
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                ))}
              </div>

              {/* Testimonial Text */}
              <blockquote className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8 font-medium">
                "{testimonials[0].content}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center gap-4">
                <img
                  src={testimonials[0].avatar}
                  alt={testimonials[0].name}
                  className="w-16 h-16 rounded-full object-cover ring-4 ring-primary/20"
                />
                <div>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    {testimonials[0].name}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400">
                    {testimonials[0].role} at {testimonials[0].company}
                  </p>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <div className="absolute bottom-8 right-8 flex gap-2">
              <button className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center transition-colors">
                <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </button>
              <button className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 flex items-center justify-center transition-colors">
                <ArrowRight className="h-5 w-5 text-gray-600 dark:text-gray-300" />
              </button>
            </div>
          </div>
        </div>

        {/* Secondary Testimonials - Smaller Cards */}
        <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
          {testimonials.slice(1).map((testimonial, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary transition-all duration-300 hover:shadow-lg"
            >
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < testimonial.rating
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="text-center mt-12">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Trusted by over <span className="font-bold text-primary">10,000+</span> companies worldwide
          </p>
        </div>
      </div>
    </section>
  );
}
