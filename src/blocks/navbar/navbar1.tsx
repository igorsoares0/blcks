'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
}

interface Navbar1Props {
  logo?: string;
  items?: NavItem[];
  ctaText?: string;
  ctaHref?: string;
}

export default function Navbar1({
  logo = 'Blcks',
  items = [
    { label: 'Início', href: '#' },
    { label: 'Blocos', href: '#blocos' },
    { label: 'Documentação', href: '#docs' },
    { label: 'Sobre', href: '#sobre' }
  ],
  ctaText = 'Começar',
  ctaHref = '#'
}: Navbar1Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-50 backdrop-blur-sm bg-white/90 dark:bg-gray-900/90">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="text-xl font-bold text-gray-900 dark:text-white">
              {logo}
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            {items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <a
              href={ctaHref}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 transition-colors"
            >
              {ctaText}
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {items.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href={ctaHref}
              className="block px-3 py-2 rounded-md text-base font-medium text-white bg-primary hover:bg-primary/90 transition-colors text-center"
            >
              {ctaText}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}