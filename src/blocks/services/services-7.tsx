import { ArrowRight, Code, Palette, Megaphone, LineChart, Users, Wrench } from 'lucide-react';

interface Service {
  icon: string;
  title: string;
  description: string;
  image: string;
  featured?: boolean;
}

interface Services7Props {
  badge?: string;
  title?: string;
  subtitle?: string;
  services?: Service[];
}

const iconMap = {
  Code,
  Palette,
  Megaphone,
  LineChart,
  Users,
  Wrench
};

export default function Services7({
  badge = 'What We Do',
  title = 'Services That Drive Success',
  subtitle = 'From strategy to execution, we deliver comprehensive solutions tailored to your business needs',
  services = [
    {
      icon: 'Code',
      title: 'Web Development',
      description: 'Custom web applications built with modern frameworks and best practices for performance and scalability.',
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
      featured: true
    },
    {
      icon: 'Palette',
      title: 'UI/UX Design',
      description: 'Beautiful, intuitive interfaces that enhance user experience and drive engagement.',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop'
    },
    {
      icon: 'Megaphone',
      title: 'Digital Marketing',
      description: 'Data-driven campaigns that increase visibility and convert visitors into customers.',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop'
    },
    {
      icon: 'LineChart',
      title: 'Analytics & SEO',
      description: 'Optimize your online presence with comprehensive analytics and search engine optimization.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop'
    },
    {
      icon: 'Users',
      title: 'Consulting',
      description: 'Strategic guidance to help you navigate digital transformation and achieve your goals.',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop'
    }
  ]
}: Services7Props) {
  const featuredService = services.find(s => s.featured);
  const regularServices = services.filter(s => !s.featured);

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-sm font-medium text-primary">{badge}</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 dark:text-white max-w-3xl">
            {title}
          </h2>
          <p className="max-w-[700px] text-lg text-gray-600 dark:text-gray-400">
            {subtitle}
          </p>
        </div>

        {/* Services Grid with Featured */}
        <div className="max-w-7xl mx-auto">
          <div className="grid gap-6 lg:grid-cols-2 mb-6">
            {/* Featured Service - Large Card */}
            {featuredService && (
              <div className="lg:row-span-2">
                <ServiceCard service={featuredService} large />
              </div>
            )}

            {/* Regular Services */}
            <div className="grid gap-6">
              {regularServices.slice(0, 2).map((service, index) => (
                <ServiceCard key={index} service={service} />
              ))}
            </div>
          </div>

          {/* Bottom Row */}
          {regularServices.length > 2 && (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {regularServices.slice(2).map((service, index) => (
                <ServiceCard key={index} service={service} />
              ))}
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
          >
            Explore All Services
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, large = false }: { service: Service; large?: boolean }) {
  const Icon = iconMap[service.icon as keyof typeof iconMap] || Code;

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl transition-all duration-500 hover:shadow-2xl ${
        large ? 'h-full min-h-[400px] lg:min-h-[600px]' : 'h-full min-h-[280px]'
      }`}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-gray-900/20 group-hover:from-gray-900/95 group-hover:via-gray-900/90 transition-all duration-500" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
        {/* Icon */}
        <div className="mb-4 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
          <Icon className="h-6 w-6 text-white" />
        </div>

        {/* Title */}
        <h3
          className={`font-bold text-white mb-3 ${
            large ? 'text-2xl md:text-3xl lg:text-4xl' : 'text-xl md:text-2xl'
          }`}
        >
          {service.title}
        </h3>

        {/* Description */}
        <p
          className={`text-gray-200 mb-6 ${
            large ? 'text-base md:text-lg max-w-lg' : 'text-sm md:text-base'
          }`}
        >
          {service.description}
        </p>

        {/* CTA Link */}
        <a
          href="#"
          className="inline-flex items-center gap-2 text-white font-medium group/link w-fit"
        >
          <span className="group-hover:underline">Learn More</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
        </a>

        {/* Featured Badge */}
        {service.featured && (
          <div className="absolute top-6 right-6">
            <div className="px-3 py-1 rounded-full bg-primary text-white text-xs font-semibold">
              Featured
            </div>
          </div>
        )}

        {/* Hover Border Effect */}
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/50 rounded-2xl transition-colors duration-300 pointer-events-none" />
      </div>
    </div>
  );
}
