import { Check, Info, DollarSign, TrendingUp, Users, Database } from 'lucide-react';

interface PricingTier {
  name: string;
  basePrice: number;
  description: string;
  included: {
    users: number;
    storage: number;
    requests: number;
  };
  overageRates: {
    perUser: number;
    perGB: number;
    perRequest: number;
  };
  features: string[];
  highlight?: boolean;
}

interface UsageMetric {
  icon: string;
  label: string;
  unit: string;
  estimatedValue: number;
}

interface Pricing6Props {
  badge?: string;
  title?: string;
  subtitle?: string;
  tiers?: PricingTier[];
  usageMetrics?: UsageMetric[];
  faqNote?: string;
}

export default function Pricing6({
  badge = 'Flexible Pricing',
  title = 'Pay only for what you use',
  subtitle = 'Start small and scale as you grow. No hidden fees, no surprises.',
  tiers = [
    {
      name: 'Starter',
      basePrice: 29,
      description: 'Perfect for small teams getting started',
      included: {
        users: 5,
        storage: 50,
        requests: 10000
      },
      overageRates: {
        perUser: 5,
        perGB: 0.50,
        perRequest: 0.001
      },
      features: [
        'Email support',
        'Basic analytics',
        '99.5% uptime SLA',
        'API access'
      ]
    },
    {
      name: 'Professional',
      basePrice: 99,
      description: 'For growing businesses with higher needs',
      highlight: true,
      included: {
        users: 25,
        storage: 250,
        requests: 100000
      },
      overageRates: {
        perUser: 4,
        perGB: 0.40,
        perRequest: 0.0008
      },
      features: [
        'Priority support',
        'Advanced analytics',
        '99.9% uptime SLA',
        'API access',
        'Custom integrations',
        'Dedicated account manager'
      ]
    },
    {
      name: 'Enterprise',
      basePrice: 299,
      description: 'For large organizations with custom needs',
      included: {
        users: 100,
        storage: 1000,
        requests: 1000000
      },
      overageRates: {
        perUser: 3,
        perGB: 0.30,
        perRequest: 0.0005
      },
      features: [
        '24/7 phone support',
        'Custom analytics',
        '99.99% uptime SLA',
        'API access',
        'Custom integrations',
        'Dedicated account manager',
        'SLA guarantees',
        'Custom contracts'
      ]
    }
  ],
  usageMetrics = [
    { icon: 'Users', label: 'Team Members', unit: 'users', estimatedValue: 10 },
    { icon: 'Database', label: 'Storage', unit: 'GB', estimatedValue: 100 },
    { icon: 'TrendingUp', label: 'API Requests', unit: 'k/month', estimatedValue: 50 }
  ],
  faqNote = 'All plans include a 14-day free trial. Usage is calculated monthly and billed in arrears.'
}: Pricing6Props) {
  const iconMap: Record<string, React.ReactElement> = {
    Users: <Users className="h-5 w-5" />,
    Database: <Database className="h-5 w-5" />,
    TrendingUp: <TrendingUp className="h-5 w-5" />
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

        {/* Usage Estimator */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-8 shadow-lg">
            <div className="flex items-center gap-2 mb-6">
              <DollarSign className="h-5 w-5 text-primary" />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Estimate Your Monthly Cost
              </h3>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {usageMetrics.map((metric, index) => (
                <div key={index} className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    <span className="text-primary">{iconMap[metric.icon]}</span>
                    {metric.label}
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      defaultValue={metric.estimatedValue}
                      className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500 dark:text-gray-400">
                      {metric.unit}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-primary/10 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Estimated Monthly Cost
                </span>
                <span className="text-2xl font-bold text-primary">
                  $99/mo
                </span>
              </div>
              <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                Based on Professional plan with your estimated usage
              </p>
            </div>
          </div>
        </div>

        {/* Pricing Tiers */}
        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`relative rounded-2xl p-8 ${
                tier.highlight
                  ? 'bg-primary text-primary-foreground shadow-2xl scale-105 border-2 border-primary'
                  : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800'
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-white dark:bg-gray-900 px-4 py-1 text-xs font-semibold text-primary border border-primary">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Header */}
              <div className="mb-6">
                <h3 className={`text-2xl font-bold mb-2 ${tier.highlight ? '' : 'text-gray-900 dark:text-white'}`}>
                  {tier.name}
                </h3>
                <p className={`text-sm ${tier.highlight ? 'opacity-90' : 'text-gray-600 dark:text-gray-400'}`}>
                  {tier.description}
                </p>
              </div>

              {/* Base Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1 mb-1">
                  <span className={`text-4xl font-bold ${tier.highlight ? '' : 'text-gray-900 dark:text-white'}`}>
                    ${tier.basePrice}
                  </span>
                  <span className={`text-sm ${tier.highlight ? 'opacity-90' : 'text-gray-600 dark:text-gray-400'}`}>
                    /month
                  </span>
                </div>
                <p className={`text-xs ${tier.highlight ? 'opacity-80' : 'text-gray-500 dark:text-gray-500'}`}>
                  base price + usage overages
                </p>
              </div>

              {/* What's Included */}
              <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-800">
                <h4 className={`text-sm font-semibold mb-3 ${tier.highlight ? 'opacity-90' : 'text-gray-900 dark:text-white'}`}>
                  Included per month:
                </h4>
                <ul className="space-y-2">
                  <li className={`text-sm flex items-center gap-2 ${tier.highlight ? 'opacity-90' : 'text-gray-700 dark:text-gray-300'}`}>
                    <Check className="h-4 w-4 flex-shrink-0" />
                    <span>{tier.included.users} users</span>
                  </li>
                  <li className={`text-sm flex items-center gap-2 ${tier.highlight ? 'opacity-90' : 'text-gray-700 dark:text-gray-300'}`}>
                    <Check className="h-4 w-4 flex-shrink-0" />
                    <span>{tier.included.storage} GB storage</span>
                  </li>
                  <li className={`text-sm flex items-center gap-2 ${tier.highlight ? 'opacity-90' : 'text-gray-700 dark:text-gray-300'}`}>
                    <Check className="h-4 w-4 flex-shrink-0" />
                    <span>{tier.included.requests.toLocaleString()} API requests</span>
                  </li>
                </ul>
              </div>

              {/* Overage Rates */}
              <div className="mb-6 pb-6 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center gap-2 mb-3">
                  <h4 className={`text-sm font-semibold ${tier.highlight ? 'opacity-90' : 'text-gray-900 dark:text-white'}`}>
                    Overage rates:
                  </h4>
                  <Info className="h-3.5 w-3.5 opacity-60" />
                </div>
                <ul className="space-y-1.5">
                  <li className={`text-xs ${tier.highlight ? 'opacity-80' : 'text-gray-600 dark:text-gray-400'}`}>
                    ${tier.overageRates.perUser}/user
                  </li>
                  <li className={`text-xs ${tier.highlight ? 'opacity-80' : 'text-gray-600 dark:text-gray-400'}`}>
                    ${tier.overageRates.perGB}/GB
                  </li>
                  <li className={`text-xs ${tier.highlight ? 'opacity-80' : 'text-gray-600 dark:text-gray-400'}`}>
                    ${tier.overageRates.perRequest}/1k requests
                  </li>
                </ul>
              </div>

              {/* Features */}
              <div className="mb-8">
                <h4 className={`text-sm font-semibold mb-3 ${tier.highlight ? 'opacity-90' : 'text-gray-900 dark:text-white'}`}>
                  Features:
                </h4>
                <ul className="space-y-2">
                  {tier.features.map((feature, fIndex) => (
                    <li key={fIndex} className={`text-sm flex items-start gap-2 ${tier.highlight ? 'opacity-90' : 'text-gray-700 dark:text-gray-300'}`}>
                      <Check className="h-4 w-4 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <button
                className={`w-full py-3 px-6 rounded-lg font-semibold transition-all ${
                  tier.highlight
                    ? 'bg-white text-primary hover:bg-gray-100'
                    : 'bg-primary text-primary-foreground hover:bg-primary/90'
                }`}
              >
                Get Started
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {faqNote}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
            Need a custom plan? <a href="#" className="text-primary font-semibold hover:underline">Contact our sales team</a>
          </p>
        </div>
      </div>
    </section>
  );
}
