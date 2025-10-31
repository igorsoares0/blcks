'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useLicense } from '@/hooks/use-license';
import { Lock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Link from 'next/link';

interface PremiumGateProps {
  children: ReactNode;
  isPremium: boolean;
  blockName: string;
}

export function PremiumGate({ children, isPremium, blockName }: PremiumGateProps) {
  const { hasLicense, loading } = useLicense();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Show full content if block is free or user has license
  if (!isPremium || hasLicense) {
    return <>{children}</>;
  }

  // Show loading state
  if (loading || !mounted) {
    return <>{children}</>;
  }

  // Block is premium and user doesn't have license - show locked state
  return (
    <div className="relative">
      {/* Blurred content */}
      <div className="pointer-events-none select-none blur-sm opacity-50">
        {children}
      </div>

      {/* Overlay with upgrade prompt */}
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <Card className="max-w-md w-full p-8 text-center space-y-6 shadow-2xl border-yellow-500/50">
          <div className="flex justify-center">
            <div className="p-4 bg-yellow-500/10 rounded-full">
              <Lock className="h-12 w-12 text-yellow-500" />
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-bold mb-2">Premium Block</h3>
            <p className="text-gray-600 dark:text-gray-400">
              <strong>{blockName}</strong> is a premium block. Upgrade to access this and{' '}
              <strong>72 other premium blocks</strong>.
            </p>
          </div>

          <div className="bg-gradient-to-r from-yellow-500/10 via-yellow-400/10 to-yellow-500/10 rounded-lg p-4 space-y-2">
            <div className="flex items-center justify-center gap-2 text-sm font-medium">
              <Sparkles className="h-4 w-4 text-yellow-500" />
              <span>One-time payment • Lifetime access</span>
            </div>
            <div className="text-2xl font-bold">
              Starting at $49
            </div>
          </div>

          <div className="space-y-3">
            <Link href="/pricing">
              <Button size="lg" className="w-full">
                View Pricing & Unlock
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" size="sm" className="w-full">
                Browse Free Blocks
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
