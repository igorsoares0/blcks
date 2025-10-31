import { Linkedin, Twitter, Github, Mail, Users, TrendingUp, Globe, Award } from 'lucide-react';

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  bio: string;
  socials?: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

interface Stat {
  icon: string;
  value: string;
  label: string;
}

interface About6Props {
  badge?: string;
  title?: string;
  description?: string;
  stats?: Stat[];
  teamMembers?: TeamMember[];
  ctaText?: string;
  ctaHref?: string;
}

export default function About6({
  badge = 'Our Team',
  title = 'Meet the people behind our success',
  description = 'We are a diverse team of passionate individuals dedicated to building exceptional products and creating meaningful impact.',
  stats = [
    { icon: 'Users', value: '50+', label: 'Team Members' },
    { icon: 'Globe', value: '12', label: 'Countries' },
    { icon: 'TrendingUp', value: '200%', label: 'Growth' },
    { icon: 'Award', value: '15+', label: 'Awards' }
  ],
  teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Co-Founder',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      bio: 'Visionary leader with 15+ years in tech. Previously led product at Fortune 500 companies.',
      socials: { linkedin: '#', twitter: '#' }
    },
    {
      name: 'Michael Chen',
      role: 'CTO & Co-Founder',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      bio: 'Tech innovator passionate about scalable architecture and developer experience.',
      socials: { linkedin: '#', github: '#' }
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Design',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      bio: 'Award-winning designer focused on creating delightful and accessible user experiences.',
      socials: { linkedin: '#', twitter: '#' }
    },
    {
      name: 'David Kim',
      role: 'Head of Engineering',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      bio: 'Full-stack expert building robust systems that scale with best-in-class performance.',
      socials: { linkedin: '#', github: '#' }
    },
    {
      name: 'Lisa Anderson',
      role: 'Head of Marketing',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop',
      bio: 'Growth marketer with a data-driven approach to building brands that resonate.',
      socials: { linkedin: '#', twitter: '#' }
    },
    {
      name: 'James Wilson',
      role: 'Head of Sales',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      bio: 'Customer-focused sales leader helping businesses transform through technology.',
      socials: { linkedin: '#' }
    }
  ],
  ctaText = 'Join Our Team',
  ctaHref = '#'
}: About6Props) {
  const iconMap: Record<string, React.ReactElement> = {
    Users: <Users className="h-6 w-6" />,
    Globe: <Globe className="h-6 w-6" />,
    TrendingUp: <TrendingUp className="h-6 w-6" />,
    Award: <Award className="h-6 w-6" />
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className="inline-flex items-center rounded-full border border-gray-200 dark:border-gray-800 px-4 py-1.5 text-sm font-medium bg-gray-50 dark:bg-gray-900">
            {badge}
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl max-w-3xl">
            {title}
          </h2>
          <p className="max-w-2xl text-gray-500 md:text-xl dark:text-gray-400">
            {description}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700 transition-colors"
            >
              <div className="mb-3 text-primary">
                {iconMap[stat.icon]}
              </div>
              <div className="text-3xl md:text-4xl font-bold mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700 transition-all hover:shadow-lg"
            >
              {/* Avatar */}
              <div className="aspect-square overflow-hidden bg-gray-100 dark:bg-gray-800">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                <p className="text-sm text-primary font-medium mb-3">{member.role}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {member.bio}
                </p>

                {/* Social Links */}
                {member.socials && (
                  <div className="flex gap-3">
                    {member.socials.linkedin && (
                      <a
                        href={member.socials.linkedin}
                        className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        aria-label="LinkedIn"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    )}
                    {member.socials.twitter && (
                      <a
                        href={member.socials.twitter}
                        className="text-gray-400 hover:text-blue-400 dark:hover:text-blue-300 transition-colors"
                        aria-label="Twitter"
                      >
                        <Twitter className="h-5 w-5" />
                      </a>
                    )}
                    {member.socials.github && (
                      <a
                        href={member.socials.github}
                        className="text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                        aria-label="GitHub"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <a
            href={ctaHref}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8 text-sm font-medium transition-colors"
          >
            <Mail className="h-4 w-4" />
            {ctaText}
          </a>
        </div>
      </div>
    </section>
  );
}
