import { Twitter, Github, Linkedin } from 'lucide-react';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface Footer1Props {
  companyName?: string;
  description?: string;
  sections?: FooterSection[];
  socialLinks?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
  copyright?: string;
}

export default function Footer1({
  companyName = 'Blcks',
  description = 'Ready-to-use React components to copy and paste. Copy, paste, customize.',
  sections = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '#' },
        { label: 'Pricing', href: '#' },
        { label: 'Documentation', href: '#' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Careers', href: '#' }
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Help', href: '#' },
        { label: 'Contact', href: '#' },
        { label: 'Status', href: '#' }
      ]
    }
  ],
  socialLinks = {
    twitter: '#',
    github: '#',
    linkedin: '#'
  },
  copyright = '© 2024 Blcks. All rights reserved.'
}: Footer1Props) {
  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
              {companyName}
            </h3>
            <p className="max-w-md mb-6 text-gray-600 dark:text-gray-400">
              {description}
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.twitter && (
                <a href={socialLinks.twitter} className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {socialLinks.github && (
                <a href={socialLinks.github} className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                  <Github className="w-5 h-5" />
                </a>
              )}
              {socialLinks.linkedin && (
                <a href={socialLinks.linkedin} className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>

          {/* Link Sections */}
          {sections.map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-4 text-gray-900 dark:text-white">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 dark:border-gray-800 mt-12 pt-8">
          <p className="text-sm text-center text-gray-500 dark:text-gray-400">
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  );
}