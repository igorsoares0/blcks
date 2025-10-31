import { Mail, Gift, Bell, Sparkles, ArrowRight } from 'lucide-react';

interface Feature {
  text: string;
  icon: string;
}

interface CTA4Props {
  badge?: string;
  title?: string;
  description?: string;
  features?: Feature[];
  placeholder?: string;
  buttonText?: string;
  privacyText?: string;
  socialProof?: string;
  avatars?: string[];
}

export default function CTA4({
  badge = 'Join our newsletter',
  title = 'Get exclusive updates delivered to your inbox',
  description = 'Subscribe now and be the first to know about new features, special offers, and insider tips.',
  features = [
    {
      text: 'Weekly insights and tips',
      icon: 'Mail'
    },
    {
      text: 'Exclusive discounts',
      icon: 'Gift'
    },
    {
      text: 'Early access to features',
      icon: 'Bell'
    },
    {
      text: 'No spam, unsubscribe anytime',
      icon: 'Sparkles'
    }
  ],
  placeholder = 'Enter your email address',
  buttonText = 'Subscribe Now',
  privacyText = 'We respect your privacy. Unsubscribe at any time.',
  socialProof = 'Join 25,000+ subscribers',
  avatars = [
    'https://i.pravatar.cc/150?img=1',
    'https://i.pravatar.cc/150?img=2',
    'https://i.pravatar.cc/150?img=3',
    'https://i.pravatar.cc/150?img=4'
  ]
}: CTA4Props) {
  const getIcon = (iconName: string) => {
    const icons: Record<string, React.ReactElement> = {
      Mail: <Mail className="h-5 w-5" />,
      Gift: <Gift className="h-5 w-5" />,
      Bell: <Bell className="h-5 w-5" />,
      Sparkles: <Sparkles className="h-5 w-5" />,
    };
    return icons[iconName] || <Mail className="h-5 w-5" />;
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-primary/5 dark:from-primary/10 dark:via-gray-950 dark:to-primary/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 dark:bg-primary/20 px-4 py-1.5 text-sm font-semibold text-primary">
              <Mail className="h-4 w-4" />
              {badge}
            </div>
          </div>

          {/* Main Content */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 text-gray-900 dark:text-white">
              {title}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {description}
            </p>
          </div>

          {/* Email Form */}
          <div className="max-w-xl mx-auto mb-8">
            <div className="flex flex-col sm:flex-row gap-3 p-2 rounded-xl bg-white dark:bg-gray-900 border-2 border-gray-200 dark:border-gray-800 shadow-lg">
              <input
                type="email"
                placeholder={placeholder}
                className="flex-1 px-4 py-3 rounded-lg bg-transparent border-0 focus:outline-none focus:ring-0 text-gray-900 dark:text-white placeholder-gray-500"
              />
              <button className="inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-6 whitespace-nowrap shadow-md hover:shadow-lg hover:scale-105">
                {buttonText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-500 text-center mt-3">
              {privacyText}
            </p>
          </div>

          {/* Social Proof */}
          <div className="flex items-center justify-center gap-3 mb-10">
            <div className="flex -space-x-2">
              {avatars.map((avatar, index) => (
                <img
                  key={index}
                  src={avatar}
                  alt={`Subscriber ${index + 1}`}
                  className="w-10 h-10 rounded-full border-2 border-white dark:border-gray-900"
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
              {socialProof}
            </span>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-4 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 dark:bg-primary/20 text-primary shrink-0">
                  {getIcon(feature.icon)}
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {feature.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
