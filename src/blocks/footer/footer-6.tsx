import { Send, Facebook, Twitter, Instagram, Linkedin, Github, Globe } from 'lucide-react';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterColumn {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  name: string;
  href: string;
  icon: 'facebook' | 'twitter' | 'instagram' | 'linkedin' | 'github';
}

interface Footer6Props {
  logo?: string;
  tagline?: string;
  newsletterText?: string;
  emailPlaceholder?: string;
  columns?: FooterColumn[];
  socialLinks?: SocialLink[];
  footerText?: string;
  showLanguages?: boolean;
  languages?: string[];
  copyright?: string;
}

export default function Footer6({
  logo = 'Blcks',
  tagline = 'Build better, ship faster',
  newsletterText = 'Stay up to date with the latest news and updates',
  emailPlaceholder = 'Enter your email',
  columns = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '#' },
        { label: 'Pricing', href: '#' },
        { label: 'Security', href: '#' },
        { label: 'Enterprise', href: '#' }
      ]
    },
    {
      title: 'Platform',
      links: [
        { label: 'Developer API', href: '#' },
        { label: 'Partners', href: '#' },
        { label: 'Integrations', href: '#' },
        { label: 'Status', href: '#' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Docs', href: '#' },
        { label: 'Guides', href: '#' },
        { label: 'Help Center', href: '#' },
        { label: 'Community', href: '#' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Press', href: '#' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy', href: '#' },
        { label: 'Terms', href: '#' },
        { label: 'License', href: '#' },
        { label: 'Cookies', href: '#' }
      ]
    }
  ],
  socialLinks = [
    { name: 'Twitter', href: '#', icon: 'twitter' },
    { name: 'GitHub', href: '#', icon: 'github' },
    { name: 'LinkedIn', href: '#', icon: 'linkedin' },
    { name: 'Instagram', href: '#', icon: 'instagram' }
  ],
  footerText = 'Made with care by the Blcks team',
  showLanguages = true,
  languages = ['English', 'Español', 'Français', 'Deutsch', '日本語'],
  copyright = '© 2024 Blcks Inc.'
}: Footer6Props) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'facebook':
        return <Facebook className="h-5 w-5" />;
      case 'twitter':
        return <Twitter className="h-5 w-5" />;
      case 'instagram':
        return <Instagram className="h-5 w-5" />;
      case 'linkedin':
        return <Linkedin className="h-5 w-5" />;
      case 'github':
        return <Github className="h-5 w-5" />;
      default:
        return <Twitter className="h-5 w-5" />;
    }
  };

  return (
    <footer className="w-full bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        {/* Top Section - Newsletter */}
        <div className="py-12 md:py-16 border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
              {newsletterText}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {tagline}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder={emailPlaceholder}
                className="flex-1 h-11 px-4 text-sm rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 text-gray-900 dark:text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100 focus:border-transparent"
              />
              <button className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100 font-medium transition-colors">
                <Send className="h-4 w-4" />
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Middle Section - Links Grid */}
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12">
            {columns.map((column, index) => (
              <div key={index}>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
                  {column.title}
                </h3>
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

        {/* Bottom Section */}
        <div className="py-8 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Left - Logo & Text */}
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                <span className="text-lg font-bold text-gray-900 dark:text-white">
                  {logo}
                </span>
              </div>
              <div className="hidden md:block w-px h-4 bg-gray-300 dark:bg-gray-700" />
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {footerText}
              </p>
            </div>

            {/* Center - Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.name}
                  className="w-10 h-10 rounded-lg bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                >
                  {getIcon(social.icon)}
                </a>
              ))}
            </div>

            {/* Right - Language Selector */}
            {showLanguages && (
              <div>
                <select className="h-9 px-3 text-sm rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100">
                  {languages.map((lang, index) => (
                    <option key={index} value={lang}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Copyright */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-500">
              {copyright}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
