'use client';

import { useState } from 'react';
import { blocksRegistry, getAllCategories } from '@/lib/blocks-registry';
import { BlockCard } from '@/components/block-card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Blocks } from 'lucide-react';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = getAllCategories();

  const filteredBlocks = blocksRegistry.filter(block => {
    const matchesSearch = searchQuery === '' ||
      block.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      block.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      block.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = !selectedCategory || block.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
              <Blocks className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Blcks</h1>
              <p className="text-sm text-gray-500">React Blocks Library</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="border-b border-gray-200 dark:border-gray-800 bg-gradient-to-b from-gray-50 to-background dark:from-gray-900 dark:to-background">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Ready-to-use React components
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Copy, paste, customize. A growing collection of beautiful and accessible components built with Tailwind CSS and shadcn/ui.
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-8">
          <div className="space-y-4">
            {/* Search */}
            <div className="relative max-w-xl mx-auto">
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
            <div className="flex flex-wrap gap-2 justify-center">
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

      {/* Blocks Grid */}
      <section className="container mx-auto px-4 py-12">
        {filteredBlocks.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">
              No blocks found. Try another search term.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredBlocks.map((block) => (
              <BlockCard key={block.id} block={block} />
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-gray-500">
            <p>Built with Next.js, Tailwind CSS and shadcn/ui</p>
            <p className="mt-2">Copy, paste, customize - It's that simple.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}