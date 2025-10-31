'use client';

import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle, ArrowLeft, Home } from 'lucide-react';
import Link from 'next/link';

export default function PurchaseCancelledPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="max-w-2xl w-full p-8 md:p-12">
        <div className="text-center space-y-8">
          <div className="flex justify-center">
            <div className="bg-orange-100 dark:bg-orange-900/20 p-4 rounded-full">
              <XCircle className="h-16 w-16 text-orange-600 dark:text-orange-400" />
            </div>
          </div>

          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-3">
              Purchase Cancelled
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Your payment was not processed
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 text-left space-y-3">
            <h2 className="font-semibold text-lg mb-2">What happened?</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              You cancelled the checkout process or closed the payment window before completing your purchase.
              No charges were made to your account.
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              If you experienced any issues during checkout, please try again or contact our support team.
            </p>
          </div>

          <div className="space-y-3 pt-4">
            <Link href="/pricing" className="block">
              <Button size="lg" className="w-full gap-2">
                <ArrowLeft className="h-4 w-4" />
                Try Again
              </Button>
            </Link>
            <Link href="/" className="block">
              <Button variant="outline" size="lg" className="w-full gap-2">
                <Home className="h-4 w-4" />
                Back to Homepage
              </Button>
            </Link>
          </div>

          <div className="pt-4 border-t">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Have questions? Contact us at{' '}
              <a
                href="mailto:support@blcks.com"
                className="text-primary hover:underline"
              >
                support@blcks.com
              </a>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
