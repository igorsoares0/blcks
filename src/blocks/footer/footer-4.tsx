import { Twitter, Github, MessageSquare, Youtube, Heart } from 'lucide-react';

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
  icon: 'twitter' | 'github' | 'discord' | 'youtube';
}

interface Footer4Props {
  logo?: string;
  tagline?: string;
  sections?: FooterSection[];
  socialLinks?: SocialLink[];
  showLanguageSelector?: boolean;
  languages?: { code: string; label: string }[];
  copyright?: string;
  badge?: string;
}

export default function Footer4({
  logo = 'Blcks',
  tagline = 'Build faster with beautiful components',
  sections = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '#' },
        { label: 'Pricing', href: '#' },
        { label: 'Security', href: '#' },
        { label: 'Roadmap', href: '#' }
      ]
    },
    {
      title: 'Developers',
      links: [
        { label: 'Documentation', href: '#' },
        { label: 'API Reference', href: '#' },
        { label: 'Changelog', href: '#' },
        { label: 'GitHub', href: '#' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Press Kit', href: '#' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', href: '#' },
        { label: 'Community', href: '#' },
        { label: 'Contact Us', href: '#' },
        { label: 'Status', href: '#' }
      ]
    }
  ],
  socialLinks = [
    { name: 'Twitter', href: '#', icon: 'twitter' },
    { name: 'GitHub', href: '#', icon: 'github' },
    { name: 'Discord', href: '#', icon: 'discord' },
    { name: 'YouTube', href: '#', icon: 'youtube' }
  ],
  showLanguageSelector = true,
  languages = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'pt', label: 'Português' },
    { code: 'fr', label: 'Français' }
  ],
  copyright = '© 2024 Blcks. All rights reserved.',
  badge = 'Made with love in San Francisco'
}: Footer4Props) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'twitter':
        return <Twitter className="h-4 w-4" />;
      case 'github':
        return <Github className="h-4 w-4" />;
      case 'discord':
        return <MessageSquare className="h-4 w-4" />;
      case 'youtube':
        return <Youtube className="h-4 w-4" />;
      default:
        return <Twitter className="h-4 w-4" />;
    }
  };

  return (
    <footer className="w-full bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 md:px-6">
        {/* Main Footer Content */}
        <div className="py-12 md:py-16 lg:py-20">
          <div className="grid gap-8 lg:grid-cols-6">
            {/* Brand Column - Takes 2 columns */}
            <div className="lg:col-span-2">
              <div className="mb-4">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {logo}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  {tagline}
                </p>
              </div>

              {/* Social Links */}
              <div className="flex gap-2 mb-6">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    aria-label={social.name}
                    className="w-9 h-9 rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-700 flex items-center justify-center text-gray-700 dark:text-gray-300 transition-colors"
                  >
                    {getIcon(social.icon)}
                  </a>
                ))}
              </div>

              {/* Language Selector */}
              {showLanguageSelector && (
                <div>
                  <label className="text-xs font-medium text-gray-700 dark:text-gray-300 mb-2 block">
                    Language
                  </label>
                  <select className="w-full max-w-[200px] h-9 px-3 text-sm rounded-md border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-gray-900 dark:focus:ring-gray-100">
                    {languages.map((lang) => (
                      <option key={lang.code} value={lang.code}>
                        {lang.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>

            {/* Link Sections - Takes 4 columns */}
            <div className="lg:col-span-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-gray-200 dark:border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {copyright}
              </p>
              {badge && (
                <span className="text-xs text-gray-500 dark:text-gray-500">
                  {badge}
                </span>
              )}
            </div>

            <div className="flex flex-wrap justify-center gap-6">
              <a
                href="#"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Terms
              </a>
              <a
                href="#"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Cookies
              </a>
              <a
                href="#"
                className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
