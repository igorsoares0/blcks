import { Check, X, Star, ArrowRight, Shield, Zap } from 'lucide-react';

interface PricingPlan {
  name: string;
  price: string;
  period: string;
  description: string;
  recommended?: boolean;
  cta: string;
  ctaVariant?: 'primary' | 'secondary';
}

interface Feature {
  name: string;
  tier: 'basic' | 'standard' | 'premium' | 'all';
  values: {
    starter: boolean | string;
    business: boolean | string;
    enterprise: boolean | string;
  };
}

interface FeatureCategory {
  name: string;
  icon: string;
  features: Feature[];
}

interface Pricing7Props {
  badge?: string;
  title?: string;
  subtitle?: string;
  plans?: PricingPlan[];
  featureCategories?: FeatureCategory[];
  note?: string;
}

export default function Pricing7({
  badge = 'Simple Pricing',
  title = 'Choose your plan',
  subtitle = 'Get started with a plan that fits your needs. Upgrade or downgrade at any time.',
  plans = [
    {
      name: 'Starter',
      price: '$19',
      period: 'per month',
      description: 'Essential features for individuals',
      cta: 'Start Free Trial',
      ctaVariant: 'secondary'
    },
    {
      name: 'Business',
      price: '$49',
      period: 'per month',
      description: 'Advanced features for teams',
      recommended: true,
      cta: 'Start Free Trial',
      ctaVariant: 'primary'
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: 'per month',
      description: 'Custom solutions for organizations',
      cta: 'Contact Sales',
      ctaVariant: 'secondary'
    }
  ],
  featureCategories = [
    {
      name: 'Core Features',
      icon: 'Zap',
      features: [
        {
          name: 'Projects',
          tier: 'all',
          values: { starter: '3', business: '15', enterprise: 'Unlimited' }
        },
        {
          name: 'Team Members',
          tier: 'all',
          values: { starter: '3', business: '10', enterprise: 'Unlimited' }
        },
        {
          name: 'Storage',
          tier: 'all',
          values: { starter: '5 GB', business: '50 GB', enterprise: '500 GB' }
        },
        {
          name: 'File Upload Size',
          tier: 'all',
          values: { starter: '10 MB', business: '100 MB', enterprise: '1 GB' }
        }
      ]
    },
    {
      name: 'Collaboration',
      icon: 'Star',
      features: [
        {
          name: 'Real-time Collaboration',
          tier: 'standard',
          values: { starter: false, business: true, enterprise: true }
        },
        {
          name: 'Comments & Mentions',
          tier: 'standard',
          values: { starter: false, business: true, enterprise: true }
        },
        {
          name: 'Activity Feed',
          tier: 'standard',
          values: { starter: false, business: true, enterprise: true }
        },
        {
          name: 'Guest Access',
          tier: 'premium',
          values: { starter: false, business: false, enterprise: true }
        }
      ]
    },
    {
      name: 'Security & Compliance',
      icon: 'Shield',
      features: [
        {
          name: '2FA Authentication',
          tier: 'standard',
          values: { starter: false, business: true, enterprise: true }
        },
        {
          name: 'SSO (SAML)',
          tier: 'premium',
          values: { starter: false, business: false, enterprise: true }
        },
        {
          name: 'Advanced Permissions',
          tier: 'premium',
          values: { starter: false, business: false, enterprise: true }
        },
        {
          name: 'Audit Logs',
          tier: 'premium',
          values: { starter: false, business: false, enterprise: true }
        }
      ]
    }
  ],
  note = 'All plans include a 14-day free trial. No credit card required.'
}: Pricing7Props) {
  const iconMap: Record<string, React.ReactElement> = {
    Zap: <Zap className="h-5 w-5" />,
    Star: <Star className="h-5 w-5" />,
    Shield: <Shield className="h-5 w-5" />
  };

  const renderFeatureValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="h-5 w-5 text-green-600 dark:text-green-500" />
      ) : (
        <X className="h-5 w-5 text-gray-300 dark:text-gray-700" />
      );
    }
    return <span className="text-sm font-semibold text-gray-900 dark:text-white">{value}</span>;
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
          <p className="max-w-2xl text-gray-600 md:text-xl dark:text-gray-400">
            {subtitle}
          </p>
        </div>

        {/* Plans Header */}
        <div className="grid lg:grid-cols-4 gap-8 mb-8">
          <div className="hidden lg:block"></div>
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-6 text-center ${
                plan.recommended
                  ? 'bg-primary text-primary-foreground shadow-xl ring-2 ring-primary'
                  : 'bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800'
              }`}
            >
              {plan.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white dark:bg-gray-900 px-3 py-1 text-xs font-semibold text-primary border border-primary">
                    <Star className="h-3 w-3" />
                    Recommended
                  </span>
                </div>
              )}
              <h3 className={`text-xl font-bold mb-2 ${plan.recommended ? '' : 'text-gray-900 dark:text-white'}`}>
                {plan.name}
              </h3>
              <div className="mb-4">
                <div className="flex items-baseline justify-center gap-1">
                  <span className={`text-4xl font-bold ${plan.recommended ? '' : 'text-gray-900 dark:text-white'}`}>
                    {plan.price}
                  </span>
                </div>
                <p className={`text-sm ${plan.recommended ? 'opacity-90' : 'text-gray-600 dark:text-gray-400'}`}>
                  {plan.period}
                </p>
              </div>
              <p className={`text-sm mb-6 ${plan.recommended ? 'opacity-90' : 'text-gray-600 dark:text-gray-400'}`}>
                {plan.description}
              </p>
              <button
                className={`w-full inline-flex items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-all h-11 px-6 ${
                  plan.ctaVariant === 'primary'
                    ? 'bg-white text-primary hover:bg-gray-100'
                    : plan.recommended
                    ? 'bg-white/10 backdrop-blur hover:bg-white/20 border border-white/20'
                    : 'bg-primary text-primary-foreground hover:bg-primary/90'
                }`}
              >
                {plan.cta}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Feature Categories */}
        {featureCategories.map((category, catIndex) => (
          <div key={catIndex} className="mb-8">
            {/* Category Header */}
            <div className="bg-gradient-to-r from-gray-100 to-gray-50 dark:from-gray-900 dark:to-gray-900/50 border-y border-gray-200 dark:border-gray-800 py-4 mb-4">
              <div className="grid lg:grid-cols-4 gap-8">
                <div className="flex items-center gap-3 px-6">
                  <div className="text-primary">
                    {iconMap[category.icon]}
                  </div>
                  <h4 className="font-bold text-gray-900 dark:text-white">
                    {category.name}
                  </h4>
                </div>
                <div className="hidden lg:block"></div>
                <div className="hidden lg:block"></div>
                <div className="hidden lg:block"></div>
              </div>
            </div>

            {/* Features in Category */}
            {category.features.map((feature, featureIndex) => (
              <div
                key={featureIndex}
                className="grid lg:grid-cols-4 gap-8 py-4 border-b border-gray-100 dark:border-gray-900 hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors"
              >
                <div className="px-6">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {feature.name}
                    </span>
                    {feature.tier === 'premium' && (
                      <span className="inline-flex items-center rounded-full bg-purple-100 dark:bg-purple-900/30 px-2 py-0.5 text-xs font-medium text-purple-700 dark:text-purple-400">
                        Premium
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-center lg:justify-center">
                  {renderFeatureValue(feature.values.starter)}
                </div>
                <div className="flex items-center justify-center lg:justify-center">
                  {renderFeatureValue(feature.values.business)}
                </div>
                <div className="flex items-center justify-center lg:justify-center">
                  {renderFeatureValue(feature.values.enterprise)}
                </div>
              </div>
            ))}
          </div>
        ))}

        {/* Bottom Note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {note}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
            Questions? <a href="#" className="text-primary font-semibold hover:underline">Contact our sales team</a>
          </p>
        </div>
      </div>
    </section>
  );
}
