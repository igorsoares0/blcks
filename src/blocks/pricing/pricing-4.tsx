import { Check, Sparkles, Building2, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface PricingFeature {
  name: string;
  included: boolean;
}

interface PricingPlan {
  name: string;
  description: string;
  price: string;
  period: string;
  icon: 'sparkles' | 'zap' | 'building';
  features: PricingFeature[];
  popular?: boolean;
  cta: string;
}

interface Pricing4Props {
  title?: string;
  subtitle?: string;
  plans?: PricingPlan[];
}

const iconMap = {
  sparkles: Sparkles,
  zap: Zap,
  building: Building2
};

export default function Pricing4({
  title = 'Choose Your Plan',
  subtitle = 'Start free, upgrade when you need more power',
  plans = [
    {
      name: 'Starter',
      description: 'Perfect for trying out our service',
      price: 'Free',
      period: 'forever',
      icon: 'sparkles' as const,
      cta: 'Get Started',
      features: [
        { name: 'Up to 3 projects', included: true },
        { name: '1GB storage', included: true },
        { name: 'Community support', included: true },
        { name: 'Basic analytics', included: true },
        { name: 'API access', included: false },
        { name: 'Priority support', included: false },
        { name: 'Custom domain', included: false }
      ]
    },
    {
      name: 'Professional',
      description: 'For professionals and small teams',
      price: '$49',
      period: 'per month',
      icon: 'zap' as const,
      popular: true,
      cta: 'Start Free Trial',
      features: [
        { name: 'Unlimited projects', included: true },
        { name: '100GB storage', included: true },
        { name: 'Priority support', included: true },
        { name: 'Advanced analytics', included: true },
        { name: 'API access', included: true },
        { name: 'Custom domain', included: true },
        { name: 'Dedicated account manager', included: false }
      ]
    },
    {
      name: 'Enterprise',
      description: 'For large organizations',
      price: '$199',
      period: 'per month',
      icon: 'building' as const,
      cta: 'Contact Sales',
      features: [
        { name: 'Unlimited projects', included: true },
        { name: '1TB storage', included: true },
        { name: '24/7 dedicated support', included: true },
        { name: 'Advanced analytics', included: true },
        { name: 'API access', included: true },
        { name: 'Custom domain', included: true },
        { name: 'Dedicated account manager', included: true }
      ]
    }
  ]
}: Pricing4Props) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
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
          {plans.map((plan, index) => {
            const IconComponent = iconMap[plan.icon];

            return (
              <div
                key={index}
                className={`relative flex flex-col p-8 bg-white dark:bg-gray-900 rounded-2xl border transition-all duration-300 ${
                  plan.popular
                    ? 'border-primary shadow-2xl scale-105'
                    : 'border-gray-200 dark:border-gray-800 hover:shadow-lg'
                }`}
              >
                {/* Popular Badge */}
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1 text-sm font-semibold">
                      Most Popular
                    </Badge>
                  </div>
                )}

                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl mb-6 ${
                  plan.popular
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white'
                }`}>
                  <IconComponent className="h-6 w-6" />
                </div>

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
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-5xl font-bold text-gray-900 dark:text-white">
                      {plan.price}
                    </span>
                  </div>
                  <span className="text-gray-600 dark:text-gray-400">
                    {plan.period}
                  </span>
                </div>

                {/* CTA Button */}
                <Button
                  className="w-full mb-8"
                  variant={plan.popular ? 'default' : 'outline'}
                  size="lg"
                >
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
                        className="flex items-center gap-3"
                      >
                        <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                          feature.included
                            ? 'bg-green-100 dark:bg-green-900/30'
                            : 'bg-gray-100 dark:bg-gray-800'
                        }`}>
                          <Check className={`h-3 w-3 ${
                            feature.included
                              ? 'text-green-600 dark:text-green-400'
                              : 'text-gray-400 dark:text-gray-600'
                          }`} />
                        </div>
                        <span className={`text-sm ${
                          feature.included
                            ? 'text-gray-700 dark:text-gray-300'
                            : 'text-gray-500 dark:text-gray-500 line-through'
                        }`}>
                          {feature.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Note */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            All plans include a 14-day free trial. Cancel anytime, no questions asked.
          </p>
        </div>
      </div>
    </section>
  );
}
