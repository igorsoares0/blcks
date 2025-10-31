import { Menu } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

interface NavLink {
  label: string;
  href: string;
}

interface Navbar4Props {
  logo?: string;
  logoHref?: string;
  navLinks?: NavLink[];
  primaryCTA?: string;
  primaryCTAHref?: string;
  secondaryCTA?: string;
  secondaryCTAHref?: string;
  showCTAs?: boolean;
}

export default function Navbar4({
  logo = 'Blcks',
  logoHref = '/',
  navLinks = [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Resources', href: '#resources' },
    { label: 'Docs', href: '#docs' }
  ],
  primaryCTA = 'Sign Up',
  primaryCTAHref = '#signup',
  secondaryCTA = 'Sign In',
  secondaryCTAHref = '#signin',
  showCTAs = true
}: Navbar4Props) {
  return (
    <nav className="w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <a
            href={logoHref}
            className="text-xl font-bold text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors shrink-0"
          >
            {logo}
          </a>

          {/* Desktop Navigation - Centered */}
          <div className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          {showCTAs && (
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              <a
                href={secondaryCTAHref}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white h-9 px-4"
              >
                {secondaryCTA}
              </a>
              <a
                href={primaryCTAHref}
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200 h-9 px-5"
              >
                {primaryCTA}
              </a>
            </div>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger className="lg:hidden inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 hover:bg-gray-100 dark:hover:bg-gray-800 h-9 w-9 shrink-0">
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetTitle className="text-xl font-bold text-gray-900 dark:text-white">
                {logo}
              </SheetTitle>
              <div className="flex flex-col gap-6 mt-6">
                {/* Nav Links */}
                <div className="flex flex-col gap-4">
                  {navLinks.map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className="text-base font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>

                {/* CTAs in mobile menu */}
                {showCTAs && (
                  <div className="flex flex-col gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                    <a
                      href={secondaryCTAHref}
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 hover:bg-gray-100 dark:hover:bg-gray-800 h-10 px-6"
                    >
                      {secondaryCTA}
                    </a>
                    <a
                      href={primaryCTAHref}
                      className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200 h-10 px-6"
                    >
                      {primaryCTA}
                    </a>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
