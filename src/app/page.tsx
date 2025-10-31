'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { blocksRegistry } from '@/lib/blocks-registry';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
  Blocks,
  User,
  CheckCircle2,
  X,
  Zap,
  Copy,
  Palette,
  Code,
  Rocket,
  Shield,
  Users,
  ArrowRight,
  Star,
  CheckCircle,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { useLicense } from '@/hooks/use-license';

export default function Home() {
  const { data: session, status } = useSession();
  const { hasLicense } = useLicense();
  const searchParams = useSearchParams();
  const [showInviteToast, setShowInviteToast] = useState(false);

  // Check if user just logged in after accepting invite
  useEffect(() => {
    const inviteAccepted = searchParams.get('inviteAccepted');
    if (inviteAccepted === 'true' && status === 'authenticated') {
      setShowInviteToast(true);
      const timer = setTimeout(() => setShowInviteToast(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [searchParams, status]);

  const totalBlocks = blocksRegistry.length;
  const freeBlocks = blocksRegistry.filter(b => !b.isPremium).length;
  const premiumBlocks = totalBlocks - freeBlocks;

  return (
    <div className="min-h-screen bg-background">
      {/* Toast notification */}
      {showInviteToast && (
        <div className="fixed top-4 right-4 z-50 max-w-md animate-in slide-in-from-top-5">
          <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 shadow-lg">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-green-900 dark:text-green-100 mb-1">
                  Welcome to the Team!
                </h3>
                <p className="text-sm text-green-800 dark:text-green-200">
                  Your team invite has been automatically accepted. You now have access to all premium blocks!
                </p>
              </div>
              <button
                onClick={() => setShowInviteToast(false)}
                className="text-green-600 dark:text-green-400 hover:text-green-700 dark:hover:text-green-300"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 backdrop-blur-sm bg-background/80 sticky top-0 z-40">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
                <Blocks className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Blcks</h1>
              </div>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link href="/blocks" className="text-sm font-medium hover:text-primary transition-colors">
                Browse Blocks
              </Link>
              <Link href="/templates" className="text-sm font-medium hover:text-primary transition-colors">
                Templates
              </Link>
              <Link href="/pricing" className="text-sm font-medium hover:text-primary transition-colors">
                Pricing
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              {status === 'loading' ? (
                <div className="h-9 w-20 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-md"></div>
              ) : session ? (
                <Link href="/dashboard">
                  <Button variant="outline" size="sm" className="gap-2">
                    <User className="h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/auth/login">
                    <Button variant="ghost" size="sm">
                      Login
                    </Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button size="sm">
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 via-background to-background dark:from-gray-900/50 dark:via-background dark:to-background">
        <div className="absolute inset-0 bg-grid-gray-200/50 dark:bg-grid-gray-800/50 [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>
        <div className="container relative mx-auto px-6 md:px-8 lg:px-12 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-sm font-medium text-primary mb-4">
              <Sparkles className="h-4 w-4" />
              <span>{totalBlocks}+ Premium React Components</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Build Beautiful Websites
              <span className="block mt-2 bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
                10x Faster
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Copy, paste, and customize production-ready React components. Built with Tailwind CSS and shadcn/ui.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link href="/blocks">
                <Button size="lg" className="gap-2 text-lg px-8">
                  Browse {totalBlocks} Blocks
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/pricing">
                <Button size="lg" variant="outline" className="gap-2 text-lg px-8">
                  View Pricing
                </Button>
              </Link>
            </div>

            <div className="flex items-center justify-center gap-8 pt-8 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>{freeBlocks} Free Blocks</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>{premiumBlocks} Premium Blocks</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <span>One-time Payment</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 md:px-8 lg:px-12 py-20 md:py-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Everything You Need to Ship Fast
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Production-ready components designed for modern web applications
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="p-6 hover:shadow-lg transition-shadow border-2">
            <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center mb-4">
              <Copy className="h-6 w-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Copy & Paste</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Simply copy the code and paste it into your project. No complex setup or configuration required.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow border-2">
            <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center mb-4">
              <Palette className="h-6 w-6 text-purple-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Fully Customizable</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Built with Tailwind CSS. Easily customize colors, spacing, and styles to match your brand.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow border-2">
            <div className="w-12 h-12 rounded-lg bg-green-500/10 flex items-center justify-center mb-4">
              <Code className="h-6 w-6 text-green-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">TypeScript Ready</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Written in TypeScript with full type safety. Get autocomplete and type checking out of the box.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow border-2">
            <div className="w-12 h-12 rounded-lg bg-orange-500/10 flex items-center justify-center mb-4">
              <Rocket className="h-6 w-6 text-orange-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Production Ready</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Battle-tested components optimized for performance, accessibility, and responsiveness.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow border-2">
            <div className="w-12 h-12 rounded-lg bg-red-500/10 flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-red-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Accessible</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Built with accessibility in mind. ARIA labels, keyboard navigation, and screen reader support.
            </p>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow border-2">
            <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center mb-4">
              <Users className="h-6 w-6 text-yellow-500" />
            </div>
            <h3 className="text-xl font-bold mb-2">Team Licenses</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Share access with your entire team. Invite unlimited members to collaborate on projects.
            </p>
          </Card>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 py-16">
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">{totalBlocks}+</div>
              <div className="text-gray-600 dark:text-gray-400">Components</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">15+</div>
              <div className="text-gray-600 dark:text-gray-400">Categories</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">100%</div>
              <div className="text-gray-600 dark:text-gray-400">Responsive</div>
            </div>
            <div>
              <div className="text-4xl md:text-5xl font-bold mb-2">1x</div>
              <div className="text-gray-600 dark:text-gray-400">Payment</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 md:px-8 lg:px-12 py-20 md:py-32">
        <div className="max-w-4xl mx-auto">
          <Card className="relative overflow-hidden border-2 bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10 p-12 text-center">
            <div className="absolute inset-0 bg-grid-white/10 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <div className="relative z-10 space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/30 text-sm font-medium text-primary mb-2">
                <Zap className="h-4 w-4" />
                <span>Limited Time Offer</span>
              </div>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                Start Building Today
              </h2>

              <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Get lifetime access to all {totalBlocks} components with a one-time payment. No subscriptions, no recurring fees.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Link href="/pricing">
                  <Button size="lg" className="gap-2 text-lg px-8">
                    View Pricing
                    <Star className="h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="lg" variant="outline" className="gap-2 text-lg px-8">
                    Get Started Free
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
                  <Blocks className="h-6 w-6 text-primary-foreground" />
                </div>
                <h2 className="text-xl font-bold">Blcks</h2>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Premium React components for modern web applications.
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><Link href="/blocks" className="hover:text-primary transition-colors">Browse Blocks</Link></li>
                <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><Link href="/blocks" className="hover:text-primary transition-colors">Documentation</Link></li>
                <li><Link href="/blocks" className="hover:text-primary transition-colors">Components</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                <li><Link href="/pricing" className="hover:text-primary transition-colors">License</Link></li>
                <li><Link href="/pricing" className="hover:text-primary transition-colors">Terms</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-800 pt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>Built with Next.js, Tailwind CSS and shadcn/ui</p>
            <p className="mt-2">Copy, paste, customize - It's that simple.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}