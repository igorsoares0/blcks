import { Menu, Search, ChevronDown } from 'lucide-react';
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

interface DropdownCategory {
  label: string;
  items: NavLink[];
}

interface Navbar3Props {
  logo?: string;
  navLinks?: NavLink[];
  dropdown?: DropdownCategory;
  showSearch?: boolean;
  searchPlaceholder?: string;
  ctaText?: string;
  ctaHref?: string;
}

export default function Navbar3({
  logo = 'Blcks',
  navLinks = [
    { label: 'Home', href: '#' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' }
  ],
  dropdown = {
    label: 'Products',
    items: [
      { label: 'Web Apps', href: '#web' },
      { label: 'Mobile Apps', href: '#mobile' },
      { label: 'Desktop Apps', href: '#desktop' },
      { label: 'API Services', href: '#api' }
    ]
  },
  showSearch = true,
  searchPlaceholder = 'Search...',
  ctaText = 'Sign In',
  ctaHref = '#signin'
}: Navbar3Props) {
  return (
    <nav className="w-full border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 sticky top-0 z-50 backdrop-blur-sm bg-white/95 dark:bg-gray-950/95">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <a
            href="/"
            className="text-xl font-bold text-gray-900 dark:text-white hover:text-gray-700 dark:hover:text-gray-300 transition-colors shrink-0"
          >
            {logo}
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}

            {/* Dropdown Menu */}
            <div className="relative group">
              <button className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors inline-flex items-center gap-1">
                {dropdown.label}
                <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
              </button>

              {/* Dropdown Content */}
              <div className="absolute top-full left-0 mt-2 w-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg shadow-lg overflow-hidden">
                {dropdown.items.map((item, index) => (
                  <a
                    key={index}
                    href={item.href}
                    className="block px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          {showSearch && (
            <div className="hidden md:flex flex-1 max-w-md">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder={searchPlaceholder}
                  className="w-full h-9 px-4 pl-10 text-sm bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white transition-all"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
          )}

          {/* Desktop CTA */}
          <div className="hidden lg:block shrink-0">
            <a
              href={ctaHref}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200 h-9 px-5"
            >
              {ctaText}
            </a>
          </div>

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

                {/* Search in mobile menu */}
                {showSearch && (
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={searchPlaceholder}
                      className="w-full h-10 px-4 pl-10 text-sm bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-white"
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                )}

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

                  {/* Dropdown items in mobile */}
                  <div className="border-t border-gray-200 dark:border-gray-800 pt-4">
                    <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                      {dropdown.label}
                    </div>
                    {dropdown.items.map((item, index) => (
                      <a
                        key={index}
                        href={item.href}
                        className="block text-base font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors mb-3"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                </div>

                {/* CTA in mobile menu */}
                <a
                  href={ctaHref}
                  className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-700 dark:hover:bg-gray-200 h-10 px-6"
                >
                  {ctaText}
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
