import { Check, DollarSign } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface PricingPlan {
  name: string;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  highlighted?: boolean;
  cta: string;
}

interface Pricing3Props {
  title?: string;
  subtitle?: string;
  plans?: PricingPlan[];
  annualDiscount?: number;
}

export default function Pricing3({
  title = 'Flexible Pricing Plans',
  subtitle = 'Save up to 20% with annual billing',
  annualDiscount = 20,
  plans = [
    {
      name: 'Basic',
      description: 'Essential features for getting started',
      monthlyPrice: 19,
      yearlyPrice: 182,
      cta: 'Get Started',
      features: [
        'Up to 5 team members',
        '10GB storage',
        'Basic support',
        'Standard features',
        'Monthly reports'
      ]
    },
    {
      name: 'Professional',
      description: 'Advanced features for growing teams',
      monthlyPrice: 49,
      yearlyPrice: 470,
      highlighted: true,
      cta: 'Start Free Trial',
      features: [
        'Up to 20 team members',
        '100GB storage',
        'Priority support',
        'All features',
        'Weekly reports',
        'Custom integrations',
        'Advanced analytics'
      ]
    },
    {
      name: 'Enterprise',
      description: 'Complete solution for large organizations',
      monthlyPrice: 149,
      yearlyPrice: 1430,
      cta: 'Contact Sales',
      features: [
        'Unlimited team members',
        'Unlimited storage',
        '24/7 dedicated support',
        'All features',
        'Real-time reports',
        'Custom integrations',
        'Advanced analytics',
        'SLA guarantee',
        'Dedicated account manager'
      ]
    }
  ]
}: Pricing3Props) {
  const renderPricingCards = (isAnnual: boolean) => (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
      {plans.map((plan, index) => {
        const price = isAnnual ? plan.yearlyPrice : plan.monthlyPrice;
        const periodPrice = isAnnual ? price / 12 : price;

        return (
          <div
            key={index}
            className={`relative flex flex-col p-8 bg-white dark:bg-gray-900 rounded-2xl border transition-all duration-300 ${
              plan.highlighted
                ? 'border-primary shadow-xl ring-2 ring-primary ring-opacity-50'
                : 'border-gray-200 dark:border-gray-800 hover:shadow-lg'
            }`}
          >
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
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-5xl font-bold text-gray-900 dark:text-white">
                  ${periodPrice.toFixed(0)}
                </span>
                <span className="text-gray-600 dark:text-gray-400">
                  /month
                </span>
              </div>
              {isAnnual && (
                <div className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                  <DollarSign className="h-3 w-3" />
                  <span>${price} billed annually</span>
                </div>
              )}
            </div>

            {/* CTA Button */}
            <Button
              className="w-full mb-8"
              variant={plan.highlighted ? 'default' : 'outline'}
            >
              {plan.cta}
            </Button>

            {/* Features List */}
            <div className="space-y-4 flex-1">
              <div className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                Everything in {plan.name}:
              </div>
              <ul className="space-y-3">
                {plan.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-start gap-3"
                  >
                    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <Check className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 dark:text-white">
            {title}
          </h2>
          <p className="max-w-[700px] text-lg text-gray-600 dark:text-gray-400">
            {subtitle}
          </p>

          {/* Billing Toggle with Tabs */}
          <Tabs defaultValue="monthly" className="mt-8 flex flex-col items-center">
            <TabsList className="grid w-[400px] grid-cols-2">
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="annual" className="relative">
                Annual
                <span className="ml-2 inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
                  Save {annualDiscount}%
                </span>
              </TabsTrigger>
            </TabsList>

            {/* Monthly Pricing */}
            <TabsContent value="monthly" className="mt-12">
              {renderPricingCards(false)}
            </TabsContent>

            {/* Annual Pricing */}
            <TabsContent value="annual" className="mt-12">
              {renderPricingCards(true)}
            </TabsContent>
          </Tabs>
        </div>

        {/* Bottom Note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            All plans include 30-day money-back guarantee. No questions asked.
          </p>
        </div>
      </div>
    </section>
  );
}
