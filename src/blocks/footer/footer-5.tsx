import { ArrowRight, Twitter, Github, Linkedin, Youtube, Shield, Award, Star, Mail } from 'lucide-react';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  name: string;
  href: string;
  icon: 'twitter' | 'github' | 'linkedin' | 'youtube';
}

interface Badge {
  icon: string;
  title: string;
  subtitle: string;
}

interface Footer5Props {
  logo?: string;
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButtonText?: string;
  ctaButtonHref?: string;
  sections?: FooterSection[];
  socialLinks?: SocialLink[];
  newsletterTitle?: string;
  newsletterPlaceholder?: string;
  newsletterButtonText?: string;
  badges?: Badge[];
  copyright?: string;
  legalLinks?: FooterLink[];
}

export default function Footer5({
  logo = 'Blcks',
  ctaTitle = 'Ready to get started?',
  ctaDescription = 'Join thousands of developers building beautiful products with our components.',
  ctaButtonText = 'Start Building',
  ctaButtonHref = '#',
  sections = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '#' },
        { label: 'Pricing', href: '#' },
        { label: 'Integrations', href: '#' },
        { label: 'Changelog', href: '#' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '#' },
        { label: 'Guides', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Help Center', href: '#' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Press', href: '#' },
        { label: 'Contact', href: '#' }
      ]
    }
  ],
  socialLinks = [
    { name: 'Twitter', href: '#', icon: 'twitter' },
    { name: 'GitHub', href: '#', icon: 'github' },
    { name: 'LinkedIn', href: '#', icon: 'linkedin' },
    { name: 'YouTube', href: '#', icon: 'youtube' }
  ],
  newsletterTitle = 'Subscribe to our newsletter',
  newsletterPlaceholder = 'Enter your email',
  newsletterButtonText = 'Subscribe',
  badges = [
    { icon: 'Shield', title: 'SOC 2', subtitle: 'Certified' },
    { icon: 'Award', title: 'ISO 27001', subtitle: 'Compliant' },
    { icon: 'Star', title: '4.9/5', subtitle: 'Rating' }
  ],
  copyright = '© 2024 Blcks. All rights reserved.',
  legalLinks = [
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Cookies', href: '#' }
  ]
}: Footer5Props) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'twitter':
        return <Twitter className="h-4 w-4" />;
      case 'github':
        return <Github className="h-4 w-4" />;
      case 'linkedin':
        return <Linkedin className="h-4 w-4" />;
      case 'youtube':
        return <Youtube className="h-4 w-4" />;
      default:
        return <Twitter className="h-4 w-4" />;
    }
  };

  const getBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case 'Shield':
        return <Shield className="h-6 w-6" />;
      case 'Award':
        return <Award className="h-6 w-6" />;
      case 'Star':
        return <Star className="h-6 w-6" />;
      default:
        return <Shield className="h-6 w-6" />;
    }
  };

  return (
    <footer className="w-full bg-white dark:bg-gray-950">
      {/* CTA Section */}
      <div className="border-t border-b border-gray-200 dark:border-gray-800 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {ctaTitle}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              {ctaDescription}
            </p>
            <a
              href={ctaButtonHref}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 font-semibold transition-colors"
            >
              {ctaButtonText}
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="grid gap-8 lg:grid-cols-6">
          {/* Brand & Newsletter Column - Takes 2 columns */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              {logo}
            </h3>

            {/* Newsletter */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                {newsletterTitle}
              </h4>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <input
                    type="email"
                    placeholder={newsletterPlaceholder}
                    className="w-full h-10 pl-10 pr-3 text-sm rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100"
                  />
                </div>
                <button className="px-4 h-10 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 text-sm font-medium transition-colors">
                  {newsletterButtonText}
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-2">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.name}
                  className="w-9 h-9 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center text-gray-700 dark:text-gray-300 transition-colors"
                >
                  {getIcon(social.icon)}
                </a>
              ))}
            </div>
          </div>

          {/* Link Sections - Takes 3 columns */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {sections.map((section, index) => (
                <div key={index}>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                    {section.title}
                  </h4>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
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

          {/* Badges Column - Takes 1 column */}
          <div className="lg:col-span-1">
            <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Trusted & Secure
            </h4>
            <div className="space-y-3">
              {badges.map((badge, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900"
                >
                  <div className="text-gray-700 dark:text-gray-300">
                    {getBadgeIcon(badge.icon)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-gray-900 dark:text-white">
                      {badge.title}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {badge.subtitle}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 md:px-6 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {copyright}
            </p>
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
