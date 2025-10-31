import { ArrowRight, Check, Users, Zap, Shield, Clock } from 'lucide-react';

interface Feature {
  icon: string;
  text: string;
}

interface CTA7Props {
  title?: string;
  description?: string;
  features?: Feature[];
  buttonText?: string;
  buttonHref?: string;
  secondaryText?: string;
  secondaryHref?: string;
  trustBadge?: string;
  avatars?: string[];
}

export default function CTA7({
  title = 'Ready to 10x Your Productivity?',
  description = 'Join over 50,000 teams already using our platform to streamline their workflow and boost performance.',
  features = [
    { icon: 'Zap', text: 'Setup in under 5 minutes' },
    { icon: 'Shield', text: 'Enterprise-grade security' },
    { icon: 'Users', text: 'Unlimited team members' },
    { icon: 'Clock', text: '24/7 priority support' }
  ],
  buttonText = 'Start Free Trial',
  buttonHref = '#',
  secondaryText = 'Book a Demo',
  secondaryHref = '#',
  trustBadge = 'No credit card required',
  avatars = [
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
  ]
}: CTA7Props) {
  const getIcon = (iconName: string) => {
    const icons = {
      Zap: Zap,
      Shield: Shield,
      Users: Users,
      Clock: Clock,
      Check: Check
    };
    return icons[iconName as keyof typeof icons] || Check;
  };

  return (
    <section className="w-full py-12 md:py-20 lg:py-24 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative">
          {/* Main Card */}
          <div className="relative bg-gradient-to-br from-primary via-primary to-primary/80 rounded-3xl shadow-2xl overflow-hidden">
            {/* Pattern Background */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }} />
            </div>

            <div className="relative px-8 py-12 md:px-12 md:py-16 lg:px-16 lg:py-20">
              <div className="max-w-4xl mx-auto">
                {/* Content */}
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                    {title}
                  </h2>
                  <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">
                    {description}
                  </p>

                  {/* User Avatars */}
                  <div className="flex items-center justify-center gap-4 mb-8">
                    <div className="flex -space-x-3">
                      {avatars.map((avatar, index) => (
                        <img
                          key={index}
                          src={avatar}
                          alt={`User ${index + 1}`}
                          className="w-10 h-10 rounded-full border-2 border-white object-cover"
                        />
                      ))}
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-semibold text-white">50,000+ Users</div>
                      <div className="text-xs text-white/80">Already transformed their workflow</div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                    <a
                      href={buttonHref}
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-white text-primary font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 w-full sm:w-auto"
                    >
                      {buttonText}
                      <ArrowRight className="h-5 w-5" />
                    </a>
                    <a
                      href={secondaryHref}
                      className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-white/10 backdrop-blur-sm text-white font-semibold hover:bg-white/20 transition-all duration-300 border border-white/20 w-full sm:w-auto"
                    >
                      {secondaryText}
                    </a>
                  </div>

                  {/* Trust Badge */}
                  <div className="flex items-center justify-center gap-2 text-white/90 text-sm">
                    <Check className="h-4 w-4" />
                    {trustBadge}
                  </div>
                </div>

                {/* Features Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {features.map((feature, index) => {
                    const IconComponent = getIcon(feature.icon);
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20"
                      >
                        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                          <IconComponent className="h-5 w-5 text-white" />
                        </div>
                        <div className="text-sm font-medium text-white">
                          {feature.text}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-6 -left-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl -z-10" />
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-3xl -z-10" />
        </div>
      </div>
    </section>
  );
}
