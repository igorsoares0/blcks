import { Mail, MapPin, Phone, Twitter, Linkedin, Github, Youtube, Instagram, Facebook, ArrowRight, Zap } from 'lucide-react';

interface FooterLink {
  label: string;
  href: string;
}

interface FooterSection {
  title: string;
  links: FooterLink[];
}

interface SocialLink {
  icon: string;
  href: string;
  label: string;
}

interface ContactInfo {
  icon: string;
  text: string;
  href?: string;
}

interface Footer7Props {
  logo?: string;
  tagline?: string;
  description?: string;
  sections?: FooterSection[];
  contactInfo?: ContactInfo[];
  socialLinks?: SocialLink[];
  newsletterTitle?: string;
  newsletterDescription?: string;
  emailPlaceholder?: string;
  subscribeText?: string;
  bottomText?: string;
  bottomLinks?: FooterLink[];
}

export default function Footer7({
  logo = 'Blcks',
  tagline = 'Build faster, ship smarter',
  description = 'Beautiful, responsive components for your next project. Copy, paste, and customize to fit your needs.',
  sections = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '#' },
        { label: 'Pricing', href: '#' },
        { label: 'Documentation', href: '#' },
        { label: 'Changelog', href: '#' },
        { label: 'Roadmap', href: '#' }
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Press', href: '#' },
        { label: 'Contact', href: '#' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { label: 'Help Center', href: '#' },
        { label: 'API Reference', href: '#' },
        { label: 'Community', href: '#' },
        { label: 'Templates', href: '#' },
        { label: 'Support', href: '#' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
        { label: 'Cookie Policy', href: '#' },
        { label: 'Security', href: '#' },
        { label: 'GDPR', href: '#' }
      ]
    }
  ],
  contactInfo = [
    { icon: 'Mail', text: 'hello@blcks.com', href: 'mailto:hello@blcks.com' },
    { icon: 'Phone', text: '+1 (555) 123-4567', href: 'tel:+15551234567' },
    { icon: 'MapPin', text: 'San Francisco, CA 94102' }
  ],
  socialLinks = [
    { icon: 'Twitter', href: '#', label: 'Twitter' },
    { icon: 'Linkedin', href: '#', label: 'LinkedIn' },
    { icon: 'Github', href: '#', label: 'GitHub' },
    { icon: 'Youtube', href: '#', label: 'YouTube' },
    { icon: 'Instagram', href: '#', label: 'Instagram' }
  ],
  newsletterTitle = 'Subscribe to our newsletter',
  newsletterDescription = 'Get the latest updates, articles, and resources delivered to your inbox weekly.',
  emailPlaceholder = 'Enter your email',
  subscribeText = 'Subscribe',
  bottomText = '© 2024 Blcks. All rights reserved.',
  bottomLinks = [
    { label: 'Privacy', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Cookies', href: '#' }
  ]
}: Footer7Props) {
  const iconMap: Record<string, any> = {
    Mail,
    Phone,
    MapPin,
    Twitter,
    Linkedin,
    Github,
    Youtube,
    Instagram,
    Facebook
  };

  return (
    <footer className="w-full bg-gray-900 dark:bg-black text-white">
      {/* Main Content */}
      <div className="border-b border-gray-800 dark:border-gray-900">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 lg:py-20">
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Brand & Newsletter Column */}
            <div className="lg:col-span-4">
              {/* Logo & Description */}
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-2xl font-bold">{logo}</span>
                </div>
                <p className="text-sm text-gray-400 dark:text-gray-500 mb-1 font-medium">
                  {tagline}
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500 leading-relaxed">
                  {description}
                </p>
              </div>

              {/* Newsletter */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold mb-3">{newsletterTitle}</h3>
                <p className="text-sm text-gray-400 dark:text-gray-500 mb-4">
                  {newsletterDescription}
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    placeholder={emailPlaceholder}
                    className="flex-1 px-4 py-2.5 rounded-lg bg-gray-800 dark:bg-gray-900 border border-gray-700 dark:border-gray-800 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm"
                  />
                  <button className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-white font-medium hover:bg-primary/90 transition-colors text-sm whitespace-nowrap">
                    {subscribeText}
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                {contactInfo.map((contact, index) => {
                  const IconComponent = iconMap[contact.icon] || Mail;
                  const content = (
                    <div className="flex items-center gap-3 text-sm text-gray-400 dark:text-gray-500 hover:text-white transition-colors">
                      <IconComponent className="h-4 w-4 flex-shrink-0" />
                      <span>{contact.text}</span>
                    </div>
                  );

                  return contact.href ? (
                    <a key={index} href={contact.href}>
                      {content}
                    </a>
                  ) : (
                    <div key={index}>{content}</div>
                  );
                })}
              </div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {sections.map((section, index) => (
                  <div key={index}>
                    <h3 className="text-sm font-semibold mb-4">{section.title}</h3>
                    <ul className="space-y-3">
                      {section.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <a
                            href={link.href}
                            className="text-sm text-gray-400 dark:text-gray-500 hover:text-white transition-colors"
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
      </div>

      {/* Bottom Bar */}
      <div className="container mx-auto px-4 md:px-6 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-sm text-gray-400 dark:text-gray-500">
            {bottomText}
          </p>

          {/* Bottom Links */}
          <div className="flex items-center gap-6">
            {bottomLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-sm text-gray-400 dark:text-gray-500 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social, index) => {
              const IconComponent = iconMap[social.icon] || Twitter;
              return (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-lg bg-gray-800 dark:bg-gray-900 flex items-center justify-center text-gray-400 dark:text-gray-500 hover:bg-primary hover:text-white transition-all duration-300"
                >
                  <IconComponent className="h-4 w-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}
