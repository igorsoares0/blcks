import { Check, X, Zap } from 'lucide-react';

interface PricingPlan {
  name: string;
  monthlyPrice: string;
  annualPrice: string;
  description: string;
  popular?: boolean;
  features: {
    [key: string]: boolean | string;
  };
}

interface FeatureRow {
  name: string;
  category?: string;
}

interface Pricing5Props {
  badge?: string;
  title?: string;
  subtitle?: string;
  billingToggle?: {
    monthly: string;
    annual: string;
    savings: string;
  };
  plans?: PricingPlan[];
  featureRows?: FeatureRow[];
}

export default function Pricing5({
  badge = 'Pricing Plans',
  title = 'Choose the perfect plan for your team',
  subtitle = 'Compare all features and find the best fit for your needs',
  billingToggle = {
    monthly: 'Monthly',
    annual: 'Annual',
    savings: 'Save 20%'
  },
  plans = [
    {
      name: 'Starter',
      monthlyPrice: '$29',
      annualPrice: '$23',
      description: 'Perfect for individuals and small projects',
      features: {
        'users': '5 users',
        'storage': '10 GB',
        'projects': '10 projects',
        'api': false,
        'support': 'Email',
        'analytics': 'Basic',
        'integrations': '5',
        'customDomain': false,
        'sso': false,
        'priority': false
      }
    },
    {
      name: 'Professional',
      monthlyPrice: '$79',
      annualPrice: '$63',
      description: 'For growing teams and businesses',
      popular: true,
      features: {
        'users': '25 users',
        'storage': '100 GB',
        'projects': 'Unlimited',
        'api': true,
        'support': 'Priority',
        'analytics': 'Advanced',
        'integrations': 'Unlimited',
        'customDomain': true,
        'sso': false,
        'priority': true
      }
    },
    {
      name: 'Enterprise',
      monthlyPrice: '$199',
      annualPrice: '$159',
      description: 'For large organizations with advanced needs',
      features: {
        'users': 'Unlimited',
        'storage': 'Unlimited',
        'projects': 'Unlimited',
        'api': true,
        'support': '24/7 Phone',
        'analytics': 'Custom',
        'integrations': 'Unlimited',
        'customDomain': true,
        'sso': true,
        'priority': true
      }
    }
  ],
  featureRows = [
    { name: 'Team Members', category: 'Core Features' },
    { name: 'Storage', category: 'Core Features' },
    { name: 'Projects', category: 'Core Features' },
    { name: 'API Access', category: 'Core Features' },
    { name: 'Support', category: 'Support & Service' },
    { name: 'Analytics', category: 'Support & Service' },
    { name: 'Integrations', category: 'Advanced' },
    { name: 'Custom Domain', category: 'Advanced' },
    { name: 'SSO', category: 'Advanced' },
    { name: 'Priority Support', category: 'Advanced' }
  ]
}: Pricing5Props) {
  const featureKeys = ['users', 'storage', 'projects', 'api', 'support', 'analytics', 'integrations', 'customDomain', 'sso', 'priority'];

  const renderFeatureValue = (value: boolean | string) => {
    if (typeof value === 'boolean') {
      return value ? (
        <Check className="h-5 w-5 text-green-600 dark:text-green-500 mx-auto" />
      ) : (
        <X className="h-5 w-5 text-gray-300 dark:text-gray-700 mx-auto" />
      );
    }
    return <span className="text-sm text-gray-900 dark:text-white font-medium">{value}</span>;
  };

  let currentCategory = '';
  let categoryIndex = 0;

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <div className="inline-flex items-center rounded-full border border-gray-200 dark:border-gray-800 px-4 py-1.5 text-sm font-medium bg-gray-50 dark:bg-gray-900">
            {badge}
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl max-w-3xl">
            {title}
          </h2>
          <p className="max-w-2xl text-gray-600 md:text-xl dark:text-gray-400">
            {subtitle}
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center gap-3 mt-8">
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {billingToggle.monthly}
            </span>
            <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-primary transition-colors">
              <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
            </button>
            <span className="text-sm font-medium text-gray-900 dark:text-white">
              {billingToggle.annual}
            </span>
            <span className="inline-flex items-center rounded-full bg-green-100 dark:bg-green-900 px-2.5 py-0.5 text-xs font-semibold text-green-800 dark:text-green-100">
              {billingToggle.savings}
            </span>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-800">
                <th className="text-left py-6 px-4 w-1/4">
                  <span className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Features
                  </span>
                </th>
                {plans.map((plan, index) => (
                  <th key={index} className="py-6 px-4 text-center relative">
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                          <Zap className="h-3 w-3" />
                          Most Popular
                        </span>
                      </div>
                    )}
                    <div className="space-y-2">
                      <div className="text-lg font-bold text-gray-900 dark:text-white">
                        {plan.name}
                      </div>
                      <div className="flex items-baseline justify-center gap-1">
                        <span className="text-4xl font-bold text-gray-900 dark:text-white">
                          {plan.annualPrice}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          /month
                        </span>
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 line-through">
                        {plan.monthlyPrice}/mo billed monthly
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 px-2">
                        {plan.description}
                      </p>
                      <button
                        className={`w-full mt-4 inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all h-10 px-4 ${
                          plan.popular
                            ? 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg'
                            : 'bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-primary dark:hover:border-primary text-gray-900 dark:text-white'
                        }`}
                      >
                        Get Started
                      </button>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {featureRows.map((row, rowIndex) => {
                const showCategoryHeader = row.category && row.category !== currentCategory;
                if (showCategoryHeader && row.category) {
                  currentCategory = row.category;
                  categoryIndex++;
                }

                const fragments = [];
                if (showCategoryHeader) {
                  fragments.push(
                    <tr key={`category-${categoryIndex}`} className="bg-gray-50 dark:bg-gray-900/50">
                      <td colSpan={plans.length + 1} className="py-3 px-4">
                        <span className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">
                          {row.category}
                        </span>
                      </td>
                    </tr>
                  );
                }
                fragments.push(
                  <tr key={`row-${rowIndex}`} className="border-b border-gray-100 dark:border-gray-900 hover:bg-gray-50 dark:hover:bg-gray-900/30 transition-colors">
                    <td className="py-4 px-4">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {row.name}
                      </span>
                    </td>
                    {plans.map((plan, planIndex) => (
                      <td key={planIndex} className="py-4 px-4 text-center">
                        {renderFeatureValue(plan.features[featureKeys[rowIndex]])}
                      </td>
                    ))}
                  </tr>
                );
                return fragments;
              })}
            </tbody>
          </table>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            Need a custom plan? <a href="#" className="text-primary font-semibold hover:underline">Contact sales</a>
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            All plans include a 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
}
