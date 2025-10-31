'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { blocksRegistry, getAllCategories } from '@/lib/blocks-registry';
import { BlockCard } from '@/components/block-card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Search, Blocks, User, Sparkles, CheckCircle2, X } from 'lucide-react';
import Link from 'next/link';
import { useLicense } from '@/hooks/use-license';

export default function BlocksPage() {
  const { data: session, status } = useSession();
  const { hasLicense } = useLicense();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showInviteToast, setShowInviteToast] = useState(false);

  // Check if user just logged in after accepting invite
  useEffect(() => {
    const inviteAccepted = searchParams.get('inviteAccepted');
    if (inviteAccepted === 'true' && status === 'authenticated') {
      setShowInviteToast(true);
      // Auto-hide after 10 seconds
      const timer = setTimeout(() => setShowInviteToast(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [searchParams, status]);

  const categories = getAllCategories();

  const filteredBlocks = blocksRegistry.filter(block => {
    const matchesSearch = searchQuery === '' ||
      block.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      block.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      block.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = !selectedCategory || block.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const totalBlocks = blocksRegistry.length;
  const freeBlocks = blocksRegistry.filter(b => !b.isPremium).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Toast notification for auto-accepted invite */}
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
              <Link href="/blocks" className="text-sm font-medium text-primary">
                Browse Blocks
              </Link>
              <Link href="/pricing" className="text-sm font-medium hover:text-primary transition-colors">
                Pricing
              </Link>
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center gap-3">
              {status === 'loading' ? (
                <div className="h-9 w-20 bg-gray-200 dark:bg-gray-800 animate-pulse rounded-md"></div>
              ) : session ? (
                <div className="flex items-center gap-3">
                  <Link href="/dashboard">
                    <Button variant="outline" size="sm" className="gap-2">
                      <User className="h-4 w-4" />
                      Dashboard
                    </Button>
                  </Link>
                </div>
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

      {/* Page Title */}
      <section className="border-b border-gray-200 dark:border-gray-800 bg-gradient-to-b from-gray-50 to-background dark:from-gray-900/50 dark:to-background">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Browse All Blocks
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Explore {totalBlocks} ready-to-use React components. Copy, paste, customize.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 py-8">
          <div className="space-y-6">
            {/* Search */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Search blocks by name, description or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 justify-center max-w-4xl mx-auto">
              <Badge
                variant={selectedCategory === null ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(null)}
              >
                All ({blocksRegistry.length})
              </Badge>
              {categories.map((category) => {
                const count = blocksRegistry.filter(b => b.category === category).length;
                return (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    className="cursor-pointer capitalize"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category} ({count})
                  </Badge>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Premium Banner (show if user doesn't have license) */}
      {!hasLicense && (
        <section className="container mx-auto px-6 md:px-8 lg:px-12 py-8">
          <div className="bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-500 dark:from-yellow-600 dark:via-yellow-500 dark:to-yellow-600 rounded-xl p-6 md:p-8 shadow-lg">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-start gap-4">
                <div className="bg-white dark:bg-gray-900 p-3 rounded-lg">
                  <Sparkles className="h-6 w-6 text-yellow-500" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Unlock All Premium Blocks
                  </h3>
                  <p className="text-gray-800 dark:text-gray-100 text-sm md:text-base">
                    Get access to all <strong>{totalBlocks} blocks</strong> with a one-time payment. Currently viewing <strong>{freeBlocks} free blocks</strong>.
                  </p>
                </div>
              </div>
              <Link href="/pricing">
                <Button size="lg" variant="secondary" className="bg-white text-gray-900 hover:bg-gray-100 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800 shadow-md whitespace-nowrap">
                  View Pricing →
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Blocks Grid */}
      <section className="container mx-auto px-6 md:px-8 lg:px-12 py-12">
        {filteredBlocks.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              No blocks found. Try another search term.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredBlocks.map((block) => (
              <BlockCard
                key={block.id}
                block={block}
                hasAccess={!block.isPremium || hasLicense}
              />
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 mt-16">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 py-8">
          <div className="text-center text-sm text-gray-500">
            <p>Built with Next.js, Tailwind CSS and shadcn/ui</p>
            <p className="mt-2">Copy, paste, customize - It's that simple.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
