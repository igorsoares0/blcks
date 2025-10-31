import { Check, X, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PricingFeature {
  name: string;
  included: boolean;
}

interface PricingPlan {
  name: string;
  description: string;
  price: string;
  period: string;
  features: PricingFeature[];
  popular?: boolean;
  cta: string;
  highlighted?: boolean;
}

interface Pricing2Props {
  title?: string;
  subtitle?: string;
  plans?: PricingPlan[];
}

export default function Pricing2({
  title = 'Simple, Transparent Pricing',
  subtitle = 'Choose the perfect plan for your needs. Always know what you will pay.',
  plans = [
    {
      name: 'Starter',
      description: 'Perfect for individuals and small projects',
      price: '$29',
      period: 'per month',
      cta: 'Get Started',
      features: [
        { name: 'Up to 10 projects', included: true },
        { name: '5GB storage', included: true },
        { name: 'Basic analytics', included: true },
        { name: 'Email support', included: true },
        { name: 'Custom domain', included: false },
        { name: 'Priority support', included: false },
        { name: 'Advanced analytics', included: false },
        { name: 'API access', included: false }
      ]
    },
    {
      name: 'Professional',
      description: 'Best for growing teams and businesses',
      price: '$99',
      period: 'per month',
      popular: true,
      highlighted: true,
      cta: 'Start Free Trial',
      features: [
        { name: 'Unlimited projects', included: true },
        { name: '50GB storage', included: true },
        { name: 'Basic analytics', included: true },
        { name: 'Email support', included: true },
        { name: 'Custom domain', included: true },
        { name: 'Priority support', included: true },
        { name: 'Advanced analytics', included: true },
        { name: 'API access', included: false }
      ]
    },
    {
      name: 'Enterprise',
      description: 'For large organizations with advanced needs',
      price: '$299',
      period: 'per month',
      cta: 'Contact Sales',
      features: [
        { name: 'Unlimited projects', included: true },
        { name: '500GB storage', included: true },
        { name: 'Basic analytics', included: true },
        { name: 'Email support', included: true },
        { name: 'Custom domain', included: true },
        { name: 'Priority support', included: true },
        { name: 'Advanced analytics', included: true },
        { name: 'API access', included: true }
      ]
    }
  ]
}: Pricing2Props) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 dark:text-white">
            {title}
          </h2>
          <p className="max-w-[700px] text-lg text-gray-600 dark:text-gray-400">
            {subtitle}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative flex flex-col p-8 bg-white dark:bg-gray-900 rounded-2xl border transition-all duration-300 ${
                plan.highlighted
                  ? 'border-primary shadow-2xl scale-105 md:scale-110'
                  : 'border-gray-200 dark:border-gray-800 hover:shadow-lg'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <div className="inline-flex items-center gap-1 px-4 py-1.5 bg-primary text-primary-foreground text-sm font-semibold rounded-full shadow-lg">
                    <Star className="h-3 w-3 fill-current" />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {plan.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-8">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-gray-900 dark:text-white">
                    {plan.price}
                  </span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {plan.period}
                  </span>
                </div>
              </div>

              {/* CTA Button */}
              <Button
                className={`w-full mb-8 ${
                  plan.highlighted
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : ''
                }`}
                variant={plan.highlighted ? 'default' : 'outline'}
              >
                {plan.highlighted && <Zap className="h-4 w-4 mr-2" />}
                {plan.cta}
              </Button>

              {/* Features List */}
              <div className="space-y-4 flex-1">
                <div className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                  What's included:
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-start gap-3"
                    >
                      {feature.included ? (
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mt-0.5">
                          <Check className="h-3 w-3 text-green-600 dark:text-green-400" />
                        </div>
                      ) : (
                        <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mt-0.5">
                          <X className="h-3 w-3 text-gray-400 dark:text-gray-600" />
                        </div>
                      )}
                      <span
                        className={`text-sm ${
                          feature.included
                            ? 'text-gray-700 dark:text-gray-300'
                            : 'text-gray-500 dark:text-gray-500'
                        }`}
                      >
                        {feature.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            All plans include 14-day free trial. No credit card required.
          </p>
        </div>
      </div>
    </section>
  );
}
