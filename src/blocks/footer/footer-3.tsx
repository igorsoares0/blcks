import { Mail, Phone, MapPin } from 'lucide-react';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface Footer3Props {
  logo?: string;
  description?: string;
  columns?: FooterColumn[];
  email?: string;
  phone?: string;
  address?: string;
  copyright?: string;
  legalLinks?: FooterLink[];
}

export default function Footer3({
  logo = 'Blcks',
  description = 'Building the future of web development with beautiful, reusable components.',
  columns = [
    {
      title: 'Platform',
      links: [
        { label: 'Overview', href: '#' },
        { label: 'Features', href: '#' },
        { label: 'Integrations', href: '#' },
        { label: 'Pricing', href: '#' },
        { label: 'Changelog', href: '#' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Press', href: '#' },
        { label: 'Partners', href: '#' },
        { label: 'Contact', href: '#' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Blog', href: '#' },
        { label: 'Documentation', href: '#' },
        { label: 'Help Center', href: '#' },
        { label: 'Tutorials', href: '#' },
        { label: 'API Reference', href: '#' }
      ]
    }
  ],
  email = 'hello@blcks.com',
  phone = '+1 (555) 123-4567',
  address = '123 Main Street, San Francisco, CA 94102',
  copyright = '© 2024 Blcks, Inc. All rights reserved.',
  legalLinks = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' }
  ]
}: Footer3Props) {
  return (
    <footer className="w-full bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 lg:py-20">
        {/* Main Footer Grid */}
        <div className="grid gap-8 lg:grid-cols-12">
          {/* Company Info - Takes 4 columns */}
          <div className="lg:col-span-4">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              {logo}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 max-w-sm">
              {description}
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-gray-500 dark:text-gray-400 mt-0.5" />
                <a
                  href={`mailto:${email}`}
                  className="text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {email}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-gray-500 dark:text-gray-400 mt-0.5" />
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="text-sm text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {phone}
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400 mt-0.5" />
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {address}
                </p>
              </div>
            </div>
          </div>

          {/* Link Columns - Takes 8 columns, distributed evenly */}
          <div className="lg:col-span-8">
            <div className="grid gap-8 sm:grid-cols-3">
              {columns.map((column, index) => (
                <div key={index}>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wider">
                    {column.title}
                  </h4>
                  <ul className="space-y-3">
                    {column.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a
                          href={link.href}
                          className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright */}
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center md:text-left">
              {copyright}
            </p>

            {/* Legal Links */}
            <div className="flex flex-wrap justify-center gap-6">
              {legalLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
