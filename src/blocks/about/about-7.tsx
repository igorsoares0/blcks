import { Users, Building2, MapPin, TrendingUp, Award, Shield, Star, Zap } from 'lucide-react';

interface Stat {
  icon: string;
  value: string;
  label: string;
  description: string;
}

interface Achievement {
  icon: string;
  title: string;
  year: string;
  description: string;
}

interface Certification {
  name: string;
  issuer: string;
  logo: string;
}

interface About7Props {
  badge?: string;
  title?: string;
  subtitle?: string;
  stats?: Stat[];
  achievements?: Achievement[];
  certifications?: Certification[];
}

export default function About7({
  badge = 'By The Numbers',
  title = 'Building trust through excellence',
  subtitle = 'Our commitment to quality and innovation is reflected in every metric, award, and certification we have earned.',
  stats = [
    {
      icon: 'Users',
      value: '500K+',
      label: 'Active Users',
      description: 'Worldwide customers trust our platform'
    },
    {
      icon: 'Building2',
      value: '1,200+',
      label: 'Enterprise Clients',
      description: 'Fortune 500 companies using our solutions'
    },
    {
      icon: 'MapPin',
      value: '150+',
      label: 'Countries',
      description: 'Global presence across all continents'
    },
    {
      icon: 'TrendingUp',
      value: '99.9%',
      label: 'Uptime',
      description: 'Industry-leading reliability and performance'
    }
  ],
  achievements = [
    {
      icon: 'Award',
      title: 'Best SaaS Product',
      year: '2024',
      description: 'Recognized by TechCrunch for innovation and user experience'
    },
    {
      icon: 'Star',
      title: 'Top Rated Platform',
      year: '2023',
      description: '4.9/5 stars from over 10,000 verified reviews on G2'
    },
    {
      icon: 'Zap',
      title: 'Fastest Growing Startup',
      year: '2023',
      description: 'Featured in Forbes 30 Under 30 list for technology'
    },
    {
      icon: 'Shield',
      title: 'Security Excellence',
      year: '2022',
      description: 'Awarded for best security practices and data protection'
    }
  ],
  certifications = [
    {
      name: 'ISO 27001',
      issuer: 'Information Security',
      logo: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=200&h=200&fit=crop'
    },
    {
      name: 'SOC 2 Type II',
      issuer: 'Data Security',
      logo: 'https://images.unsplash.com/photo-1614064548237-d3c8c7e8f7f6?w=200&h=200&fit=crop'
    },
    {
      name: 'GDPR Compliant',
      issuer: 'Data Privacy',
      logo: 'https://images.unsplash.com/photo-1614064549629-f4c8b3b5c92a?w=200&h=200&fit=crop'
    },
    {
      name: 'PCI DSS',
      issuer: 'Payment Security',
      logo: 'https://images.unsplash.com/photo-1614064642938-393fb7c04e83?w=200&h=200&fit=crop'
    }
  ]
}: About7Props) {
  const iconMap: Record<string, React.ReactElement> = {
    Users: <Users className="h-8 w-8" />,
    Building2: <Building2 className="h-8 w-8" />,
    MapPin: <MapPin className="h-8 w-8" />,
    TrendingUp: <TrendingUp className="h-8 w-8" />,
    Award: <Award className="h-6 w-6" />,
    Star: <Star className="h-6 w-6" />,
    Zap: <Zap className="h-6 w-6" />,
    Shield: <Shield className="h-6 w-6" />
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
            {badge}
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl max-w-3xl">
            {title}
          </h2>
          <p className="max-w-2xl text-gray-600 md:text-xl dark:text-gray-400">
            {subtitle}
          </p>
        </div>

        {/* Stats Grid - Large Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="relative group overflow-hidden rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-8 hover:border-primary/50 dark:hover:border-primary/50 transition-all hover:shadow-xl"
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Content */}
              <div className="relative z-10">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 text-primary mb-6 group-hover:scale-110 transition-transform">
                  {iconMap[stat.icon]}
                </div>
                <div className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {stat.label}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Achievements Section */}
        <div className="mb-20">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Awards & Recognition
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-primary/50 dark:hover:border-primary/50 transition-all hover:shadow-lg group"
              >
                {/* Icon */}
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20 flex items-center justify-center text-yellow-600 dark:text-yellow-500 mb-4 group-hover:scale-110 transition-transform">
                  {iconMap[achievement.icon]}
                </div>

                {/* Year Badge */}
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-xs font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  {achievement.year}
                </div>

                {/* Title */}
                <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {achievement.title}
                </h4>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {achievement.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Section */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12">
            Certifications & Compliance
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-6 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-primary/50 dark:hover:border-primary/50 transition-all hover:shadow-lg group"
              >
                {/* Logo */}
                <div className="w-16 h-16 rounded-lg bg-gray-100 dark:bg-gray-800 mb-4 overflow-hidden group-hover:scale-105 transition-transform">
                  <img
                    src={cert.logo}
                    alt={cert.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Name */}
                <div className="text-sm font-bold text-gray-900 dark:text-white text-center mb-1">
                  {cert.name}
                </div>

                {/* Issuer */}
                <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  {cert.issuer}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
