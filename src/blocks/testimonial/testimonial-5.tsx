import { Star, TrendingUp, Users, Award, CheckCircle } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
  metric?: {
    value: string;
    label: string;
  };
}

interface Stat {
  icon: string;
  value: string;
  label: string;
}

interface Testimonial5Props {
  badge?: string;
  title?: string;
  subtitle?: string;
  stats?: Stat[];
  testimonials?: Testimonial[];
  bottomText?: string;
}

export default function Testimonial5({
  badge = 'Customer Stories',
  title = 'Trusted by industry leaders',
  subtitle = 'See how teams around the world are achieving amazing results with our platform',
  stats = [
    { icon: 'Users', value: '50K+', label: 'Active Users' },
    { icon: 'TrendingUp', value: '98%', label: 'Satisfaction Rate' },
    { icon: 'Award', value: '4.9/5', label: 'Average Rating' }
  ],
  testimonials = [
    {
      name: 'Alex Morgan',
      role: 'VP of Engineering',
      company: 'TechCorp',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
      content: 'This platform completely transformed our development workflow. We shipped features 3x faster and our team collaboration improved dramatically. The ROI was immediate and measurable.',
      rating: 5,
      metric: {
        value: '3x faster',
        label: 'Development Speed'
      }
    },
    {
      name: 'Sarah Williams',
      role: 'Product Manager',
      company: 'InnovateLab',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      content: 'The analytics and insights provided helped us make data-driven decisions that increased our conversion rate by 45%. Best investment we made this year.',
      rating: 5,
      metric: {
        value: '+45%',
        label: 'Conversion Rate'
      }
    },
    {
      name: 'David Chen',
      role: 'CTO',
      company: 'ScaleUp Inc',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      content: 'Security and reliability were our top concerns. This solution exceeded all our expectations with enterprise-grade features and 99.99% uptime.',
      rating: 5
    },
    {
      name: 'Maria Garcia',
      role: 'Marketing Director',
      company: 'GrowthHub',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
      content: 'Our marketing campaigns became so much more effective. The automation features saved us 20 hours per week and improved our campaign performance significantly.',
      rating: 5,
      metric: {
        value: '20hrs/week',
        label: 'Time Saved'
      }
    },
    {
      name: 'James Wilson',
      role: 'Founder',
      company: 'StartupXYZ',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
      content: 'As a startup, we needed a solution that could grow with us. This platform scaled perfectly from day one to thousands of users without any hiccups.',
      rating: 5
    },
    {
      name: 'Emma Thompson',
      role: 'Head of Design',
      company: 'CreativeStudio',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop',
      content: 'The design system and UI components are beautiful and highly customizable. Our designers love how easy it is to create stunning interfaces.',
      rating: 5
    }
  ],
  bottomText = 'Join thousands of satisfied customers'
}: Testimonial5Props) {
  const getStatIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users':
        return <Users className="h-5 w-5" />;
      case 'TrendingUp':
        return <TrendingUp className="h-5 w-5" />;
      case 'Award':
        return <Award className="h-5 w-5" />;
      default:
        return <Users className="h-5 w-5" />;
    }
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            <CheckCircle className="h-4 w-4" />
            {badge}
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {subtitle}
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-6 md:grid-cols-3 max-w-4xl mx-auto mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 dark:bg-primary/20 flex items-center justify-center text-primary mb-3">
                {getStatIcon(stat.icon)}
              </div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials - Bento Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={`group bg-white dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-800 hover:border-primary dark:hover:border-primary transition-all duration-300 hover:shadow-xl ${
                index === 0 ? 'md:col-span-2 lg:row-span-2' : ''
              }`}
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
              <p
                className={`text-gray-700 dark:text-gray-300 leading-relaxed mb-6 ${
                  index === 0 ? 'text-lg' : 'text-base'
                }`}
              >
                "{testimonial.content}"
              </p>

              {/* Metric Badge (if available) */}
              {testimonial.metric && (
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 dark:bg-primary/20 mb-6">
                  <TrendingUp className="h-4 w-4 text-primary" />
                  <div>
                    <div className="text-sm font-bold text-primary">
                      {testimonial.metric.value}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {testimonial.metric.label}
                    </div>
                  </div>
                </div>
              )}

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className={`rounded-full object-cover ${
                    index === 0 ? 'w-14 h-14' : 'w-12 h-12'
                  }`}
                />
                <div>
                  <p
                    className={`font-semibold text-gray-900 dark:text-white ${
                      index === 0 ? 'text-base' : 'text-sm'
                    }`}
                  >
                    {testimonial.name}
                  </p>
                  <p
                    className={`text-gray-600 dark:text-gray-400 ${
                      index === 0 ? 'text-sm' : 'text-xs'
                    }`}
                  >
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {bottomText}
          </p>
          <a
            href="#"
            className="inline-flex items-center justify-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 text-sm font-semibold transition-colors"
          >
            Get Started Today
          </a>
        </div>
      </div>
    </section>
  );
}
