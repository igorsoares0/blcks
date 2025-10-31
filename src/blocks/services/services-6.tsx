import { Target, Lightbulb, Settings, BarChart } from 'lucide-react';

interface Service {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  benefits: string[];
}

interface Services6Props {
  title?: string;
  description?: string;
  services?: Service[];
}

const iconMap = {
  Target,
  Lightbulb,
  Settings,
  BarChart
};

export default function Services6({
  title = 'How We Help You Succeed',
  description = 'Our proven methodology combines strategy, creativity, and technology to deliver exceptional results',
  services = [
    {
      icon: 'Target',
      title: 'Strategic Planning',
      subtitle: 'Define your vision',
      description: 'We work closely with you to understand your business goals and create a roadmap for success. Our strategic approach ensures every decision is aligned with your objectives.',
      benefits: [
        'Market analysis and competitive research',
        'Clear objectives and KPI definition',
        'Actionable roadmap with milestones'
      ]
    },
    {
      icon: 'Lightbulb',
      title: 'Creative Solutions',
      subtitle: 'Stand out from the crowd',
      description: 'Our creative team brings fresh ideas and innovative approaches to solve complex challenges. We design experiences that captivate your audience and drive engagement.',
      benefits: [
        'User-centered design thinking',
        'Brand identity and storytelling',
        'Innovative problem-solving'
      ]
    },
    {
      icon: 'Settings',
      title: 'Technical Excellence',
      subtitle: 'Built to last',
      description: 'Leveraging cutting-edge technologies and best practices, we build robust, scalable solutions that grow with your business and adapt to changing needs.',
      benefits: [
        'Modern tech stack and architecture',
        'Automated testing and quality assurance',
        'Continuous optimization and updates'
      ]
    },
    {
      icon: 'BarChart',
      title: 'Measurable Results',
      subtitle: 'Data-driven success',
      description: 'We track every metric that matters and provide transparent reporting. Our data-driven approach ensures continuous improvement and measurable ROI.',
      benefits: [
        'Real-time analytics dashboards',
        'Regular performance reports',
        'Ongoing optimization based on insights'
      ]
    }
  ]
}: Services6Props) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 text-gray-900 dark:text-white">
            {title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>

        {/* Services List - Zigzag Layout */}
        <div className="max-w-6xl mx-auto space-y-16 md:space-y-24">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap] || Target;
            const isEven = index % 2 === 0;

            return (
              <div
                key={index}
                className={`flex flex-col gap-8 ${
                  isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                } items-center`}
              >
                {/* Icon Section */}
                <div className="w-full md:w-5/12 flex justify-center">
                  <div className="relative group">
                    {/* Decorative background circles */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 rounded-full blur-3xl group-hover:blur-2xl transition-all duration-500" />
                    <div className="absolute inset-4 bg-gradient-to-tr from-primary/30 to-transparent rounded-full blur-2xl group-hover:blur-xl transition-all duration-500" />

                    {/* Icon container */}
                    <div className="relative flex items-center justify-center w-48 h-48 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-primary to-primary/70 shadow-2xl shadow-primary/20 group-hover:shadow-primary/40 group-hover:scale-105 transition-all duration-500">
                      <Icon className="h-24 w-24 md:h-28 md:w-28 text-white" strokeWidth={1.5} />
                    </div>

                    {/* Number badge */}
                    <div className="absolute -bottom-2 -right-2 flex items-center justify-center w-12 h-12 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold text-lg shadow-lg">
                      {index + 1}
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <div className="w-full md:w-7/12 space-y-4">
                  <div>
                    <div className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
                      {service.subtitle}
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Benefits */}
                  <div className="space-y-3 pt-2">
                    {service.benefits.map((benefit, benefitIndex) => (
                      <div
                        key={benefitIndex}
                        className="flex items-start gap-3 group/item"
                      >
                        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mt-0.5 group-hover/item:bg-primary/20 transition-colors">
                          <div className="w-2 h-2 rounded-full bg-primary" />
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                          {benefit}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 md:mt-24 text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center justify-center">
            <a
              href="#"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors shadow-lg shadow-primary/25"
            >
              Start Your Project
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center px-8 py-4 rounded-lg border-2 border-gray-200 dark:border-gray-800 text-gray-900 dark:text-white font-semibold hover:border-primary hover:text-primary dark:hover:text-primary transition-colors"
            >
              View Case Studies
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
