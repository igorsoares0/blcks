import { Menu, X, Search, ChevronDown, Zap, Shield, Users, TrendingUp } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';

interface NavLink {
  label: string;
  href: string;
}

interface MegaMenuItem {
  icon: string;
  title: string;
  description: string;
  href: string;
}

interface MegaMenu {
  label: string;
  columns: {
    title: string;
    items: MegaMenuItem[];
  }[];
}

interface Navbar5Props {
  logo?: string;
  links?: NavLink[];
  megaMenu?: MegaMenu;
  searchPlaceholder?: string;
  ctaText?: string;
  ctaHref?: string;
}

export default function Navbar5({
  logo = 'Blcks',
  links = [
    { label: 'About', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Pricing', href: '#' }
  ],
  megaMenu = {
    label: 'Products',
    columns: [
      {
        title: 'Platform',
        items: [
          {
            icon: 'Zap',
            title: 'Analytics',
            description: 'Real-time insights and metrics',
            href: '#'
          },
          {
            icon: 'Shield',
            title: 'Security',
            description: 'Enterprise-grade protection',
            href: '#'
          }
        ]
      },
      {
        title: 'Solutions',
        items: [
          {
            icon: 'Users',
            title: 'Teams',
            description: 'Collaboration tools for teams',
            href: '#'
          },
          {
            icon: 'TrendingUp',
            title: 'Growth',
            description: 'Scale your business faster',
            href: '#'
          }
        ]
      }
    ]
  },
  searchPlaceholder = 'Search...',
  ctaText = 'Get Started',
  ctaHref = '#'
}: Navbar5Props) {
  const iconMap: Record<string, React.ReactElement> = {
    Zap: <Zap className="h-5 w-5" />,
    Shield: <Shield className="h-5 w-5" />,
    Users: <Users className="h-5 w-5" />,
    TrendingUp: <TrendingUp className="h-5 w-5" />
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-gray-800 dark:bg-gray-950/95">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-900 dark:text-white">
                {logo}
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-6">
              {/* Mega Menu */}
              <div className="group relative">
                <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors py-2">
                  {megaMenu.label}
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                </button>

                {/* Mega Menu Dropdown */}
                <div className="invisible group-hover:visible opacity-0 group-hover:opacity-100 absolute left-0 top-full pt-2 transition-all duration-200">
                  <div className="w-[600px] rounded-lg border border-gray-200 bg-white p-6 shadow-xl dark:border-gray-800 dark:bg-gray-950">
                    <div className="grid grid-cols-2 gap-8">
                      {megaMenu.columns.map((column, colIndex) => (
                        <div key={colIndex}>
                          <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
                            {column.title}
                          </h3>
                          <div className="space-y-3">
                            {column.items.map((item, itemIndex) => (
                              <a
                                key={itemIndex}
                                href={item.href}
                                className="flex items-start gap-3 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors group/item"
                              >
                                <div className="text-primary mt-0.5">
                                  {iconMap[item.icon]}
                                </div>
                                <div className="flex-1">
                                  <div className="text-sm font-semibold text-gray-900 dark:text-white group-hover/item:text-primary mb-1">
                                    {item.title}
                                  </div>
                                  <div className="text-xs text-gray-600 dark:text-gray-400">
                                    {item.description}
                                  </div>
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Regular Links */}
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Search Bar (Desktop) */}
            <div className="hidden md:flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 dark:border-gray-800 dark:bg-gray-900">
              <Search className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                className="w-48 bg-transparent text-sm text-gray-900 placeholder-gray-500 outline-none dark:text-white dark:placeholder-gray-400"
              />
            </div>

            {/* CTA Button (Desktop) */}
            <a
              href={ctaHref}
              className="hidden lg:inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
            >
              {ctaText}
            </a>

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col gap-6 mt-6">
                  {/* Mobile Search */}
                  <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 dark:border-gray-800 dark:bg-gray-900">
                    <Search className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                    <input
                      type="text"
                      placeholder={searchPlaceholder}
                      className="w-full bg-transparent text-sm text-gray-900 placeholder-gray-500 outline-none dark:text-white dark:placeholder-gray-400"
                    />
                  </div>

                  {/* Mobile Mega Menu */}
                  <div className="space-y-4">
                    <div className="text-sm font-semibold text-gray-900 dark:text-white">
                      {megaMenu.label}
                    </div>
                    {megaMenu.columns.map((column, colIndex) => (
                      <div key={colIndex} className="space-y-3">
                        <div className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                          {column.title}
                        </div>
                        <div className="space-y-2 pl-2">
                          {column.items.map((item, itemIndex) => (
                            <a
                              key={itemIndex}
                              href={item.href}
                              className="flex items-start gap-3 rounded-lg p-2 hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                            >
                              <div className="text-primary mt-0.5">
                                {iconMap[item.icon]}
                              </div>
                              <div className="flex-1">
                                <div className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                                  {item.title}
                                </div>
                                <div className="text-xs text-gray-600 dark:text-gray-400">
                                  {item.description}
                                </div>
                              </div>
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Mobile Links */}
                  <div className="flex flex-col gap-3 border-t border-gray-200 dark:border-gray-800 pt-4">
                    {links.map((link, index) => (
                      <a
                        key={index}
                        href={link.href}
                        className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white py-2"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>

                  {/* Mobile CTA */}
                  <a
                    href={ctaHref}
                    className="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    {ctaText}
                  </a>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
