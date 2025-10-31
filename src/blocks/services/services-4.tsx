import { Boxes, Layers, Compass, PenTool, Settings, LineChart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Service {
  icon: string;
  title: string;
  description: string;
  number: string;
}

interface Services4Props {
  title?: string;
  subtitle?: string;
  services?: Service[];
  ctaText?: string;
  ctaLink?: string;
}

const iconMap = {
  Boxes,
  Layers,
  Compass,
  PenTool,
  Settings,
  LineChart
};

export default function Services4({
  title = 'Our Expertise',
  subtitle = 'We combine creativity, technology, and strategy to deliver exceptional results',
  ctaText = 'View All Services',
  ctaLink = '#',
  services = [
    {
      icon: 'Boxes',
      number: '01',
      title: 'Product Design',
      description: 'From concept to completion, we create products that users love and businesses value.'
    },
    {
      icon: 'Layers',
      number: '02',
      title: 'Brand Identity',
      description: 'Crafting memorable brands that stand out and resonate with your target audience.'
    },
    {
      icon: 'Compass',
      number: '03',
      title: 'Strategy & Planning',
      description: 'Data-driven strategies that align with your goals and drive measurable growth.'
    },
    {
      icon: 'PenTool',
      number: '04',
      title: 'Creative Direction',
      description: 'Innovative creative solutions that capture attention and inspire action.'
    },
    {
      icon: 'Settings',
      number: '05',
      title: 'Development',
      description: 'Building robust, scalable solutions with cutting-edge technologies.'
    },
    {
      icon: 'LineChart',
      number: '06',
      title: 'Growth Marketing',
      description: 'Performance-focused campaigns that maximize ROI and accelerate growth.'
    }
  ]
}: Services4Props) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 dark:text-white mb-4">
              {title}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {subtitle}
            </p>
          </div>
          <Button size="lg" className="shrink-0">
            <a href={ctaLink}>{ctaText}</a>
          </Button>
        </div>

        {/* Services Grid */}
        <div className="grid gap-px bg-gray-200 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap] || Boxes;

            return (
              <div
                key={index}
                className="group relative bg-white dark:bg-gray-950 p-8 transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-900"
              >
                {/* Number */}
                <div className="absolute top-6 right-6 text-6xl font-bold text-gray-100 dark:text-gray-900 group-hover:text-gray-200 dark:group-hover:text-gray-800 transition-colors">
                  {service.number}
                </div>

                {/* Icon */}
                <div className="relative mb-6 inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <Icon className="h-7 w-7 text-primary group-hover:text-white transition-colors" />
                </div>

                {/* Content */}
                <h3 className="relative text-xl font-bold mb-3 text-gray-900 dark:text-white">
                  {service.title}
                </h3>
                <p className="relative text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {service.description}
                </p>

                {/* Hover indicator */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-primary group-hover:w-full transition-all duration-300" />
              </div>
            );
          })}
        </div>

        {/* Bottom Feature */}
        <div className="mt-16 p-8 rounded-2xl bg-gradient-to-r from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/5 border border-primary/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Ready to start your project?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Let's discuss how we can help you achieve your goals with our expertise.
              </p>
            </div>
            <Button size="lg" variant="default" className="shrink-0">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
