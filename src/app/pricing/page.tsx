'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Sparkles, Users, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useLicense } from '@/hooks/use-license';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function PricingPage() {
  const { hasLicense, licenseType } = useLicense();
  const { data: session } = useSession();
  const router = useRouter();
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);

  const handleCheckout = async (planId: string) => {
    // Check if user is logged in
    if (!session) {
      router.push('/auth/login?callbackUrl=/pricing');
      return;
    }

    try {
      setCheckoutLoading(planId);

      const response = await fetch('/api/checkout/create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan: planId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert(error instanceof Error ? error.message : 'Failed to start checkout. Please try again.');
      setCheckoutLoading(null);
    }
  };

  const plans = [
    {
      id: 'individual',
      name: 'Individual',
      price: 49,
      description: 'Perfect for solo developers and freelancers',
      icon: Sparkles,
      features: [
        'Access to all 110 blocks',
        'Lifetime updates',
        'Copy & paste ready code',
        'TypeScript included',
        'Dark mode support',
        'Mobile responsive',
        'Commercial use license',
        'Priority email support',
      ],
      popular: false,
      cta: 'Buy Individual',
    },
    {
      id: 'team',
      name: 'Team',
      price: 149,
      description: 'Best for small teams and agencies',
      icon: Users,
      features: [
        'Everything in Individual',
        'Up to 5 team members',
        'Shared team workspace',
        'Team collaboration',
        'Centralized billing',
        'Admin dashboard',
        'Priority team support',
        'Dedicated account manager',
      ],
      popular: true,
      cta: 'Buy Team',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 py-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Blocks
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 md:px-8 lg:px-12 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
          <Badge variant="secondary" className="mb-4">
            One-time Payment • Lifetime Access
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Simple, transparent pricing
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Get lifetime access to all premium blocks with a single payment. No subscriptions, no hidden fees.
          </p>
        </div>

        {/* Current License Status */}
        {hasLicense && (
          <div className="max-w-2xl mx-auto mb-12">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 text-center">
              <p className="text-green-800 dark:text-green-200 font-medium">
                ✓ You currently have an active <strong className="capitalize">{licenseType}</strong> license
              </p>
            </div>
          </div>
        )}

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const hasThisLicense = hasLicense && licenseType === plan.id;

            return (
              <Card
                key={plan.id}
                className={`relative flex flex-col ${
                  plan.popular
                    ? 'border-primary shadow-lg scale-105 md:scale-105'
                    : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-8">
                  <div className="mb-4 flex justify-center">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <CardTitle className="text-2xl mb-2">{plan.name}</CardTitle>
                  <CardDescription className="text-base">
                    {plan.description}
                  </CardDescription>
                  <div className="mt-4">
                    <div className="flex items-baseline justify-center gap-2">
                      <span className="text-5xl font-bold tracking-tight">
                        ${plan.price}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        one-time
                      </span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col">
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {hasThisLicense ? (
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full"
                      disabled
                    >
                      ✓ Current Plan
                    </Button>
                  ) : hasLicense ? (
                    <Button
                      size="lg"
                      variant="outline"
                      className="w-full"
                      disabled
                    >
                      Already Have License
                    </Button>
                  ) : (
                    <Button
                      size="lg"
                      variant={plan.popular ? 'default' : 'outline'}
                      className="w-full"
                      onClick={() => handleCheckout(plan.id)}
                      disabled={checkoutLoading !== null}
                    >
                      {checkoutLoading === plan.id ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        plan.cta
                      )}
                    </Button>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto mt-16 pt-16 border-t border-gray-200 dark:border-gray-800">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">110</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Total Blocks</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">19</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Categories</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">∞</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Lifetime Updates</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">24/7</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Support</div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">Is this a one-time payment?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes! You pay once and get lifetime access to all blocks, including future updates and new blocks we add.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Can I use these blocks in commercial projects?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Absolutely! Once you purchase a license, you can use the blocks in unlimited personal and commercial projects.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">What's the difference between Individual and Team?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Individual is for solo developers, while Team allows up to 5 team members to share access to all blocks.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Do you offer refunds?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes, we offer a 30-day money-back guarantee. If you're not satisfied, contact us for a full refund.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Can I upgrade from Individual to Team later?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Currently, licenses are fixed. However, we're working on an upgrade path. Contact support if you need to upgrade.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 mt-16">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 py-8">
          <div className="text-center text-sm text-gray-500">
            <p>Built with Next.js, Tailwind CSS and shadcn/ui</p>
            <p className="mt-2">Have questions? Contact us at support@blcks.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
