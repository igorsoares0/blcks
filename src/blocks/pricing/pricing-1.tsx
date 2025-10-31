import { Check, X } from 'lucide-react';

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingPlan {
  name: string;
  description: string;
  price: string;
  period: string;
  features: PricingFeature[];
  cta: string;
  popular?: boolean;
}

interface Pricing1Props {
  title?: string;
  description?: string;
  plans?: PricingPlan[];
}

export default function Pricing1({
  title = 'Simple and transparent pricing',
  description = 'Choose the perfect plan for your needs',
  plans = [
    {
      name: 'Starter',
      description: 'Perfect to get started',
      price: '$29',
      period: '/month',
      cta: 'Get started',
      features: [
        { text: '10 projects', included: true },
        { text: '5GB storage', included: true },
        { text: 'Email support', included: true },
        { text: 'API access', included: false },
        { text: 'Advanced integrations', included: false },
        { text: 'Priority support', included: false }
      ]
    },
    {
      name: 'Professional',
      description: 'For growing teams',
      price: '$99',
      period: '/month',
      cta: 'Get started',
      popular: true,
      features: [
        { text: 'Unlimited projects', included: true },
        { text: '50GB storage', included: true },
        { text: 'Email and chat support', included: true },
        { text: 'API access', included: true },
        { text: 'Advanced integrations', included: true },
        { text: 'Priority support', included: false }
      ]
    },
    {
      name: 'Enterprise',
      description: 'For large companies',
      price: '$299',
      period: '/month',
      cta: 'Talk to sales',
      features: [
        { text: 'Unlimited projects', included: true },
        { text: 'Unlimited storage', included: true },
        { text: '24/7 support', included: true },
        { text: 'API access', included: true },
        { text: 'Advanced integrations', included: true },
        { text: 'Priority support', included: true }
      ]
    }
  ]
}: Pricing1Props) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative rounded-2xl border ${
                plan.popular
                  ? 'border-primary shadow-xl scale-105'
                  : 'border-gray-200 dark:border-gray-800'
              } bg-white dark:bg-gray-900 p-8`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-block px-4 py-1 text-sm font-semibold bg-primary text-primary-foreground rounded-full">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {plan.description}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {plan.period}
                  </span>
                </div>
              </div>

              <button
                className={`w-full py-3 px-6 rounded-lg font-medium transition-colors mb-8 ${
                  plan.popular
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {plan.cta}
              </button>

              <ul className="space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    )}
                    <span
                      className={
                        feature.included
                          ? 'text-gray-700 dark:text-gray-300'
                          : 'text-gray-400 dark:text-gray-600'
                      }
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
