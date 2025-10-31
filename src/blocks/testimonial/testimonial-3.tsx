import { Quote, Star } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

interface Testimonial3Props {
  title?: string;
  description?: string;
  testimonials?: Testimonial[];
}

export default function Testimonial3({
  title = 'Customer success stories',
  description = 'Real experiences from our valued customers',
  testimonials = [
    {
      name: 'Jessica Williams',
      role: 'VP of Marketing',
      company: 'TechFlow Inc',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      content: 'Implementing this solution was a game-changer for our team. The intuitive interface and powerful features allowed us to streamline our workflow and boost productivity by 60%. The support team is incredibly responsive and helpful.',
      rating: 5
    },
    {
      name: 'David Martinez',
      role: 'Engineering Manager',
      company: 'BuildRight Solutions',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      content: 'After evaluating multiple platforms, this was the clear winner. The development experience is outstanding, documentation is comprehensive, and the API is well-designed. Our deployment time was cut in half.',
      rating: 5
    },
    {
      name: 'Amanda Chen',
      role: 'Product Designer',
      company: 'Creative Labs',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
      content: 'The attention to detail in the design is remarkable. Every interaction feels polished and intentional. Our users love the new experience, and our NPS score increased by 35 points since we made the switch.',
      rating: 5
    }
  ]
}: Testimonial3Props) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
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

        {/* Testimonials List - Vertical Layout */}
        <div className="max-w-4xl mx-auto space-y-12">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 md:p-10 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              {/* Quote Icon - Top Left */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center">
                <Quote className="h-6 w-6 text-primary" />
              </div>

              <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                {/* Avatar & Info - Left Side */}
                <div className="flex md:flex-col items-center md:items-start gap-4 md:gap-3 shrink-0">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover ring-4 ring-primary/10"
                  />
                  <div className="md:text-center">
                    <p className="font-bold text-lg text-gray-900 dark:text-white">
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

                {/* Divider - Hidden on mobile */}
                <div className="hidden md:block w-px bg-gray-200 dark:bg-gray-700" />

                {/* Content - Right Side */}
                <div className="flex-1 space-y-4">
                  {/* Rating */}
                  <div className="flex gap-1">
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
                  <blockquote className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                    "{testimonial.content}"
                  </blockquote>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Join thousands of satisfied customers
          </p>
          <a
            href="#"
            className="inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
          >
            Get Started Today
          </a>
        </div>
      </div>
    </section>
  );
}
