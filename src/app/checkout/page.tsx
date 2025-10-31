'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const plan = searchParams.get('plan');

  useEffect(() => {
    // This will be replaced with actual Stripe checkout in Phase 4
    // For now, just show a placeholder
  }, [plan]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="max-w-md w-full p-8">
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
          </div>

          <div>
            <h1 className="text-2xl font-bold mb-2">
              Checkout Coming Soon
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Stripe checkout integration is being implemented. This page will redirect you to secure payment in the next phase.
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 text-left">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              <strong>Selected Plan:</strong> {plan === 'team' ? 'Team' : 'Individual'}
            </p>
            <p className="text-sm text-blue-800 dark:text-blue-200 mt-2">
              <strong>Price:</strong> ${plan === 'team' ? '149' : '49'} (one-time)
            </p>
          </div>

          <div className="pt-4 space-y-3">
            <Link href="/pricing" className="block">
              <Button variant="outline" className="w-full gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Pricing
              </Button>
            </Link>
            <Link href="/" className="block">
              <Button variant="ghost" className="w-full">
                Go to Homepage
              </Button>
            </Link>
          </div>

          <p className="text-xs text-gray-500 dark:text-gray-400 pt-4">
            Phase 4 will integrate Stripe for secure payments
          </p>
        </div>
      </Card>
    </div>
  );
}
