import { Calendar, Award, Users, Globe, CheckCircle } from 'lucide-react';

interface Milestone {
  year: string;
  title: string;
  description: string;
  icon: string;
}

interface Achievement {
  metric: string;
  label: string;
}

interface About4Props {
  badge?: string;
  title?: string;
  description?: string;
  milestones?: Milestone[];
  achievements?: Achievement[];
  quote?: string;
  quoteAuthor?: string;
  quoteRole?: string;
}

export default function About4({
  badge = 'Our Journey',
  title = 'Growing together since 2020',
  description = 'From a small startup to a global platform, here\'s how we\'ve evolved and what we\'ve achieved along the way.',
  milestones = [
    {
      year: '2020',
      title: 'The Beginning',
      description: 'Founded with a mission to democratize access to beautiful UI components',
      icon: 'Calendar'
    },
    {
      year: '2021',
      title: 'First Milestone',
      description: 'Reached 1,000 users and launched our first major component library',
      icon: 'Users'
    },
    {
      year: '2022',
      title: 'Going Global',
      description: 'Expanded to serve developers in over 100 countries worldwide',
      icon: 'Globe'
    },
    {
      year: '2023',
      title: 'Recognition',
      description: 'Won Best Developer Tool award and reached 50,000 active users',
      icon: 'Award'
    }
  ],
  achievements = [
    { metric: '100K+', label: 'Active Users' },
    { metric: '500K+', label: 'Components Installed' },
    { metric: '150+', label: 'Countries' },
    { metric: '4.9/5', label: 'User Rating' }
  ],
  quote = 'Building tools that empower developers to create exceptional experiences is not just our business—it\'s our passion. Every line of code we write is aimed at making your work easier and more enjoyable.',
  quoteAuthor = 'Sarah Johnson',
  quoteRole = 'CEO & Co-Founder'
}: About4Props) {
  const getIcon = (iconName: string) => {
    const icons: Record<string, React.ReactElement> = {
      Calendar: <Calendar className="h-6 w-6" />,
      Award: <Award className="h-6 w-6" />,
      Users: <Users className="h-6 w-6" />,
      Globe: <Globe className="h-6 w-6" />,
      CheckCircle: <CheckCircle className="h-6 w-6" />,
    };
    return icons[iconName] || <Calendar className="h-6 w-6" />;
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 dark:bg-primary/20 px-4 py-2 text-sm font-medium text-primary mb-6">
            {badge}
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-white mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 md:text-xl">
            {description}
          </p>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20 max-w-5xl mx-auto">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-6 rounded-xl bg-gradient-to-br from-primary/5 to-primary/10 dark:from-primary/10 dark:to-primary/20 border border-primary/20"
            >
              <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                {achievement.metric}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
                {achievement.label}
              </div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto mb-20">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />

            {/* Milestones */}
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex items-start gap-8 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Icon Circle */}
                  <div className="absolute left-8 md:left-1/2 -ml-4 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground shadow-lg z-10">
                    {getIcon(milestone.icon)}
                  </div>

                  {/* Content Card */}
                  <div className={`flex-1 ml-20 md:ml-0 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                    <div className="p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-md hover:shadow-lg transition-shadow">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-primary text-primary-foreground">
                          {milestone.year}
                        </span>
                        <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {milestone.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {milestone.description}
                      </p>
                    </div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quote Section */}
        <div className="max-w-4xl mx-auto">
          <div className="relative p-8 md:p-12 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent dark:from-primary/20 dark:via-primary/10 dark:to-transparent border border-primary/20">
            {/* Quote Mark */}
            <div className="absolute top-6 left-6 text-6xl text-primary/20 font-serif leading-none">
              "
            </div>

            {/* Quote Text */}
            <div className="relative z-10">
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 italic mb-6 leading-relaxed">
                {quote}
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white font-bold text-lg">
                  {quoteAuthor.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-semibold text-gray-900 dark:text-white">
                    {quoteAuthor}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {quoteRole}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
