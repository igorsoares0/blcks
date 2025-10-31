import { Quote, Star } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

interface Testimonial1Props {
  title?: string;
  description?: string;
  testimonials?: Testimonial[];
}

export default function Testimonial1({
  title = 'What our customers say',
  description = 'See feedback from those who already use our product',
  testimonials = [
    {
      name: 'Ana Silva',
      role: 'CEO',
      company: 'TechStart Inc',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      content: 'This product completely revolutionized the way our team works. Productivity increased by 40% and we were able to drastically reduce development time.',
      rating: 5
    },
    {
      name: 'Carlos Santos',
      role: 'Product Manager',
      company: 'Digital Solutions',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      content: 'Excellent tool! The interface is intuitive and the features perfectly meet our needs. Customer support is also exceptional.',
      rating: 5
    },
    {
      name: 'Marina Costa',
      role: 'Lead Developer',
      company: 'CodeCraft',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
      content: 'As a developer, I really appreciate the code quality and complete documentation. It made integration with our existing systems much easier.',
      rating: 5
    },
    {
      name: 'Pedro Oliveira',
      role: 'CTO',
      company: 'Innovation Labs',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
      content: 'The best decision we made this year. Positive ROI in less than 2 months. I strongly recommend it to any team looking for efficiency.',
      rating: 5
    },
    {
      name: 'Julia Ferreira',
      role: 'Design Lead',
      company: 'Creative Studio',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop',
      content: 'Impeccable design and top functionality. Our team adopted it quickly and now we can\'t work without it. Worth every penny invested.',
      rating: 5
    },
    {
      name: 'Ricardo Almeida',
      role: 'Founder',
      company: 'StartupXYZ',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
      content: 'Perfect for growing startups. Scalable, reliable and with unbeatable value for money. We\'ve been using it for 6 months and only have praise.',
      rating: 5
    }
  ]
}: Testimonial1Props) {
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

        {/* Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary transition-all duration-300 hover:shadow-lg"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg">
                <Quote className="h-6 w-6 text-primary-foreground" />
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
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
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
      </div>
    </section>
  );
}
