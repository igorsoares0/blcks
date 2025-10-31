import { Star, Play, Quote, Twitter, Linkedin } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  type?: 'text' | 'video';
  videoThumbnail?: string;
  social?: {
    platform: 'twitter' | 'linkedin';
    handle: string;
  };
  featured?: boolean;
}

interface Testimonial6Props {
  title?: string;
  subtitle?: string;
  testimonials?: Testimonial[];
}

export default function Testimonial6({
  title = 'Wall of Love',
  subtitle = 'See what our customers are saying about us',
  testimonials = [
    {
      name: 'Jessica Miller',
      role: 'Product Manager',
      company: 'TechFlow',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      content: 'This is hands down the best tool we\'ve used. The interface is intuitive, the features are powerful, and the support team is incredibly responsive.',
      rating: 5,
      type: 'text',
      social: {
        platform: 'twitter',
        handle: '@jessicamiller'
      }
    },
    {
      name: 'Daniel Park',
      role: 'CTO',
      company: 'StartupHub',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      content: 'We increased our productivity by 60% after implementing this solution. The automation features alone are worth the investment.',
      rating: 5,
      type: 'video',
      videoThumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop',
      featured: true
    },
    {
      name: 'Sophie Chen',
      role: 'Marketing Director',
      company: 'GrowthLab',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
      content: 'Amazing ROI! We saw results within the first month. The analytics dashboard gives us insights we never had before.',
      rating: 5,
      type: 'text',
      social: {
        platform: 'linkedin',
        handle: 'Sophie Chen'
      }
    },
    {
      name: 'Marcus Johnson',
      role: 'Founder',
      company: 'InnovateCo',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
      content: 'Game changer for our startup. We went from concept to launch in half the time we expected.',
      rating: 5,
      type: 'text'
    },
    {
      name: 'Rachel Green',
      role: 'Designer',
      company: 'CreativeStudio',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop',
      content: 'The design is beautiful and everything just works. Our whole team adopted it immediately without any training needed.',
      rating: 5,
      type: 'text',
      social: {
        platform: 'twitter',
        handle: '@racheldesigns'
      }
    },
    {
      name: 'Alex Rodriguez',
      role: 'Engineer',
      company: 'DevTools Inc',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
      content: 'Clean API, great documentation, and excellent developer experience. Integration took less than an hour!',
      rating: 5,
      type: 'video',
      videoThumbnail: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=600&h=400&fit=crop'
    },
    {
      name: 'Emma Wilson',
      role: 'CEO',
      company: 'ScaleUp',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop',
      content: 'This platform scaled with us from 10 to 10,000 users without a single hiccup. Reliability is outstanding.',
      rating: 5,
      type: 'text',
      social: {
        platform: 'linkedin',
        handle: 'Emma Wilson'
      }
    },
    {
      name: 'Ryan Cooper',
      role: 'VP Sales',
      company: 'SalesForce Pro',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&fit=crop',
      content: 'Our sales team loves it! Conversion rates up 35% and our pipeline is more organized than ever.',
      rating: 5,
      type: 'text'
    }
  ]
}: Testimonial6Props) {
  // Split testimonials into 3 columns for masonry layout
  const columns = [
    testimonials.filter((_, i) => i % 3 === 0),
    testimonials.filter((_, i) => i % 3 === 1),
    testimonials.filter((_, i) => i % 3 === 2)
  ];

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 text-gray-900 dark:text-white">
            {title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {subtitle}
          </p>
        </div>

        {/* Masonry Grid - Desktop */}
        <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {columns.map((column, columnIndex) => (
            <div key={columnIndex} className="flex flex-col gap-6">
              {column.map((testimonial, index) => (
                <TestimonialCard key={index} testimonial={testimonial} />
              ))}
            </div>
          ))}
        </div>

        {/* Single Column - Mobile */}
        <div className="md:hidden flex flex-col gap-6 max-w-2xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-800">
          <div className="grid gap-8 md:grid-cols-3 max-w-3xl mx-auto text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">4.9/5</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Average Rating</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">15K+</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">99%</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Would Recommend</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const getSocialIcon = () => {
    if (!testimonial.social) return null;

    return testimonial.social.platform === 'twitter' ? (
      <Twitter className="h-3 w-3" />
    ) : (
      <Linkedin className="h-3 w-3" />
    );
  };

  if (testimonial.type === 'video') {
    return (
      <div className={`group relative overflow-hidden rounded-2xl ${
        testimonial.featured ? 'ring-2 ring-primary' : ''
      }`}>
        {/* Video Thumbnail */}
        <div className="relative aspect-video">
          <img
            src={testimonial.videoThumbnail}
            alt={`${testimonial.name} testimonial`}
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-transparent" />

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer shadow-xl">
              <Play className="h-7 w-7 text-gray-900 ml-1" fill="currentColor" />
            </div>
          </div>

          {/* Featured Badge */}
          {testimonial.featured && (
            <div className="absolute top-4 right-4">
              <div className="px-3 py-1 rounded-full bg-primary text-white text-xs font-semibold">
                Featured
              </div>
            </div>
          )}
        </div>

        {/* Content Below Video */}
        <div className="p-6 bg-white dark:bg-gray-900 border border-t-0 border-gray-200 dark:border-gray-800 rounded-b-2xl">
          {/* Rating */}
          <div className="flex gap-1 mb-3">
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

          {/* Quote */}
          <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-4">
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
              <p className="font-semibold text-gray-900 dark:text-white text-sm">
                {testimonial.name}
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                {testimonial.role} at {testimonial.company}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Text testimonial
  return (
    <div className="group relative bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800 hover:border-primary dark:hover:border-primary transition-all duration-300 hover:shadow-xl">
      {/* Quote Icon */}
      <div className="absolute -top-3 -left-3 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
        <Quote className="h-5 w-5 text-primary" />
      </div>

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
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
        "{testimonial.content}"
      </p>

      {/* Author */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <img
            src={testimonial.avatar}
            alt={testimonial.name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold text-gray-900 dark:text-white text-sm">
              {testimonial.name}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {testimonial.role} at {testimonial.company}
            </p>
          </div>
        </div>

        {/* Social Badge */}
        {testimonial.social && (
          <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400">
            {getSocialIcon()}
            <span className="text-xs font-medium">{testimonial.social.handle}</span>
          </div>
        )}
      </div>
    </div>
  );
}
