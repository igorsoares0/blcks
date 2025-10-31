import { Target, Eye, Heart, Users2, TrendingUp, Lightbulb } from 'lucide-react';

interface CoreValue {
  icon: string;
  title: string;
  description: string;
}

interface About5Props {
  badge?: string;
  title?: string;
  description?: string;
  mission?: {
    title: string;
    description: string;
  };
  vision?: {
    title: string;
    description: string;
  };
  coreValues?: CoreValue[];
  backgroundImage?: string;
}

export default function About5({
  badge = 'Who We Are',
  title = 'Committed to making a difference',
  description = 'We believe in creating products that not only serve a purpose but also inspire and empower people to achieve more.',
  mission = {
    title: 'Our Mission',
    description: 'To provide developers and creators with the best tools and components to build exceptional digital experiences that make a real impact.'
  },
  vision = {
    title: 'Our Vision',
    description: 'A world where every team has access to world-class design resources, enabling them to focus on what truly matters—innovation and creativity.'
  },
  coreValues = [
    {
      icon: 'Heart',
      title: 'Customer First',
      description: 'We put our users at the center of everything we do'
    },
    {
      icon: 'Lightbulb',
      title: 'Innovation',
      description: 'Constantly pushing boundaries and exploring new possibilities'
    },
    {
      icon: 'Users2',
      title: 'Collaboration',
      description: 'Building together with our community for mutual success'
    },
    {
      icon: 'TrendingUp',
      title: 'Excellence',
      description: 'Committed to delivering the highest quality in all we do'
    }
  ],
  backgroundImage = 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&h=800&fit=crop'
}: About5Props) {
  const getIcon = (iconName: string) => {
    const icons: Record<string, React.ReactElement> = {
      Target: <Target className="h-8 w-8" />,
      Eye: <Eye className="h-8 w-8" />,
      Heart: <Heart className="h-8 w-8" />,
      Users2: <Users2 className="h-8 w-8" />,
      TrendingUp: <TrendingUp className="h-8 w-8" />,
      Lightbulb: <Lightbulb className="h-8 w-8" />,
    };
    return icons[iconName] || <Target className="h-8 w-8" />;
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center rounded-full border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-4 py-2 text-sm font-medium text-gray-900 dark:text-gray-100 mb-6">
            {badge}
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-white mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 md:text-xl">
            {description}
          </p>
        </div>

        {/* Mission & Vision Cards with Background Image */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Mission Card */}
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl group">
              {/* Background Image with Overlay */}
              <div className="absolute inset-0">
                <img
                  src={backgroundImage}
                  alt="Mission background"
                  className="w-full h-full object-cover opacity-20 dark:opacity-10 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-blue-900/40 dark:to-purple-900/40" />
              </div>

              {/* Content */}
              <div className="relative p-8 md:p-10">
                <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6">
                  <Target className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {mission.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {mission.description}
                </p>
              </div>
            </div>

            {/* Vision Card */}
            <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xl group">
              {/* Background Image with Overlay */}
              <div className="absolute inset-0">
                <img
                  src={backgroundImage}
                  alt="Vision background"
                  className="w-full h-full object-cover opacity-20 dark:opacity-10 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 dark:from-purple-900/40 dark:to-pink-900/40" />
              </div>

              {/* Content */}
              <div className="relative p-8 md:p-10">
                <div className="w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-900 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6">
                  <Eye className="h-8 w-8" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {vision.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {vision.description}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Core Values Section */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
              Our Core Values
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              The principles that guide everything we do
            </p>
          </div>

          {/* Values Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((value, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 rounded-xl bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:border-primary/50 dark:hover:border-primary/50 transition-all duration-300 group"
              >
                {/* Icon */}
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/10 to-primary/20 dark:from-primary/20 dark:to-primary/30 flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                  {getIcon(value.icon)}
                </div>

                {/* Title */}
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {value.title}
                </h4>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="max-w-4xl mx-auto mt-20">
          <div className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 dark:from-primary/10 dark:via-primary/20 dark:to-primary/10 p-8 md:p-12 text-center">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />

            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Want to join our journey?
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                We're always looking for talented people to join our team
              </p>
              <a
                href="#"
                className="inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 shadow-lg hover:shadow-xl hover:scale-105"
              >
                View Open Positions
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
