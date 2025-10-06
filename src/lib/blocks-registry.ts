export interface BlockDependency {
  name: string;
  version?: string;
  command?: string; // shadcn/ui command if applicable
}

export interface BlockMetadata {
  id: string;
  name: string;
  description: string;
  category: string;
  tags: string[];
  dependencies: BlockDependency[];
  code: string;
  previewProps?: Record<string, any>;
  props?: {
    name: string;
    type: string;
    default?: string;
    description: string;
  }[];
}

// Helper to generate block code from file
export const getBlockCode = (blockId: string): string => {
  // In production, this would be loaded dynamically or from the file system
  // For now, we return the inline code in the registry
  return blocksRegistry.find(b => b.id === blockId)?.code || '';
};

export const blocksRegistry: BlockMetadata[] = [
  {
    id: 'navbar-1',
    name: 'Responsive Navbar',
    description: 'Modern navigation bar with mobile menu, sticky header and backdrop blur. Fully responsive.',
    category: 'navbar',
    tags: ['navbar', 'navigation', 'menu', 'header', 'mobile'],
    dependencies: [
      { name: 'lucide-react', version: '^0.544.0' },
      { name: 'button', command: 'npx shadcn@latest add button' },
      { name: 'sheet', command: 'npx shadcn@latest add sheet' }
    ],
    previewProps: {
      logo: 'Blcks',
      items: [
        { label: 'Home', href: '#' },
        { label: 'Blocks', href: '#blocos' },
        { label: 'Documentation', href: '#docs' },
        { label: 'About', href: '#sobre' }
      ],
      ctaText: 'Get Started',
      ctaHref: '#'
    },
    props: [
      { name: 'logo', type: 'string', default: 'Blcks', description: 'Logo text/name' },
      { name: 'items', type: 'NavItem[]', description: 'Array of navigation items with label and href' },
      { name: 'ctaText', type: 'string', default: 'Get Started', description: 'CTA button text' },
      { name: 'ctaHref', type: 'string', default: '#', description: 'CTA button link' }
    ],
    code: `import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

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
    { label: 'Home', href: '#' },
    { label: 'Blocks', href: '#blocos' },
    { label: 'Documentation', href: '#docs' },
    { label: 'About', href: '#sobre' }
  ],
  ctaText = 'Get Started',
  ctaHref = '#'
}: Navbar1Props) {
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
            <Button asChild size="sm">
              <a href={ctaHref}>{ctaText}</a>
            </Button>
          </div>

          {/* Mobile menu */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>{logo}</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-4 mt-8">
                  {items.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      className="text-lg font-medium text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
                    >
                      {item.label}
                    </a>
                  ))}
                  <Button asChild className="mt-4">
                    <a href={ctaHref}>{ctaText}</a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}`
  },
  {
    id: 'hero-1',
    name: 'Hero with Image on Right',
    description: 'Modern hero section with text on the left and image on the right. Fully responsive and customizable.',
    category: 'hero',
    tags: ['hero', 'landing', 'cta', 'image'],
    dependencies: [
      { name: 'lucide-react', version: '^0.544.0' },
      { name: 'button', command: 'npx shadcn@latest add button' }
    ],
    previewProps: {
      title: 'Build your next project with our blocks',
      subtitle: 'Ready-to-use React components to copy and paste',
      description: 'A growing collection of beautiful and accessible components. Copy, paste, customize. It\'s that simple.',
      primaryCTA: 'Get started now',
      secondaryCTA: 'View examples',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop'
    },
    props: [
      { name: 'title', type: 'string', description: 'Hero main title' },
      { name: 'subtitle', type: 'string', description: 'Subtitle above title' },
      { name: 'description', type: 'string', description: 'Description below title' },
      { name: 'primaryCTA', type: 'string', description: 'Primary button text' },
      { name: 'secondaryCTA', type: 'string', description: 'Secondary button text' },
      { name: 'imageUrl', type: 'string', description: 'Image URL' }
    ],
    code: `import { ArrowRight } from 'lucide-react';

interface Hero1Props {
  title?: string;
  subtitle?: string;
  description?: string;
  primaryCTA?: string;
  secondaryCTA?: string;
  imageUrl?: string;
}

export default function Hero1({
  title = 'Build your next project with our blocks',
  subtitle = 'Ready-to-use React components to copy and paste',
  description = 'A growing collection of beautiful and accessible components. Copy, paste, customize. It\'s that simple.',
  primaryCTA = 'Get started now',
  secondaryCTA = 'View examples',
  imageUrl = 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=600&fit=crop'
}: Hero1Props) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-primary">{subtitle}</p>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                {title}
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                {description}
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8">
                {primaryCTA}
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-11 px-8">
                {secondaryCTA}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <img
              src={imageUrl}
              alt="Hero"
              className="rounded-xl object-cover w-full h-[400px] lg:h-[500px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}`
  },
  {
    id: 'hero-2',
    name: 'Hero with Gradient Background',
    description: 'Hero section with vibrant gradient background and modern visual effects.',
    category: 'hero',
    tags: ['hero', 'landing', 'gradient', 'modern'],
    dependencies: [
      { name: 'lucide-react', version: '^0.544.0' }
    ],
    previewProps: {
      title: 'Transform your ideas into reality',
      description: 'Complete platform to create, launch and scale your digital projects with speed and confidence.',
      primaryCTA: 'Start for free',
      secondaryCTA: 'Schedule demo'
    },
    props: [
      { name: 'title', type: 'string', description: 'Hero main title' },
      { name: 'description', type: 'string', description: 'Hero description' },
      { name: 'primaryCTA', type: 'string', description: 'Primary button text' },
      { name: 'secondaryCTA', type: 'string', description: 'Secondary button text' }
    ],
    code: `import { Sparkles } from 'lucide-react';

interface Hero2Props {
  title?: string;
  description?: string;
  primaryCTA?: string;
  secondaryCTA?: string;
}

export default function Hero2({
  title = 'Transform your ideas into reality',
  description = 'Complete platform to create, launch and scale your digital projects with speed and confidence.',
  primaryCTA = 'Start for free',
  secondaryCTA = 'Schedule demo'
}: Hero2Props) {
  return (
    <section className="relative w-full py-20 md:py-32 lg:py-40 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 dark:from-purple-900 dark:via-pink-900 dark:to-orange-900"></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Content */}
      <div className="relative container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8">
          <div className="inline-flex items-center rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 text-sm text-white">
            <Sparkles className="mr-2 h-4 w-4" />
            New: We launched version 2.0
          </div>

          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-white max-w-4xl">
            {title}
          </h1>

          <p className="max-w-2xl text-lg md:text-xl text-white/90">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-white text-black hover:bg-white/90 h-11 px-8">
              {primaryCTA}
            </button>
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border-2 border-white text-white hover:bg-white/10 h-11 px-8">
              {secondaryCTA}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}`
  },
  {
    id: 'features-1',
    name: 'Features Grid with Icons',
    description: 'Features grid with icons, title and description. Responsive 3-column layout.',
    category: 'features',
    tags: ['features', 'grid', 'icons', 'services'],
    dependencies: [
      { name: 'lucide-react', version: '^0.544.0' }
    ],
    previewProps: {
      title: 'Everything you need',
      description: 'Powerful tools to accelerate your development',
      features: [
        {
          icon: 'Zap',
          title: 'Extremely fast',
          description: 'Optimized for performance. Instant loading and smooth experience.'
        },
        {
          icon: 'Shield',
          title: 'Secure by default',
          description: 'Protection at all layers. Your data always safe and encrypted.'
        },
        {
          icon: 'Code',
          title: 'Developer First',
          description: 'Intuitive APIs and complete documentation. Start building in minutes.'
        },
        {
          icon: 'Layers',
          title: 'Highly scalable',
          description: 'Grows with your business. From startup to enterprise, we support your growth.'
        },
        {
          icon: 'Users',
          title: 'Collaboration',
          description: 'Work in teams with ease. Integrated collaborative tools.'
        },
        {
          icon: 'BarChart',
          title: 'Analytics',
          description: 'Real-time insights. Make decisions based on concrete data.'
        }
      ]
    },
    props: [
      { name: 'title', type: 'string', description: 'Section title' },
      { name: 'description', type: 'string', description: 'Section description' },
      { name: 'features', type: 'array', description: 'Array of features with icon, title and description' }
    ],
    code: `import { Zap, Shield, Code, Layers, Users, BarChart, LucideIcon } from 'lucide-react';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface Features1Props {
  title?: string;
  description?: string;
  features?: Feature[];
}

const iconMap: Record<string, LucideIcon> = {
  Zap,
  Shield,
  Code,
  Layers,
  Users,
  BarChart
};

export default function Features1({
  title = 'Everything you need',
  description = 'Powerful tools to accelerate your development',
  features = [
    {
      icon: 'Zap',
      title: 'Extremely fast',
      description: 'Optimized for performance. Instant loading and smooth experience.'
    },
    {
      icon: 'Shield',
      title: 'Secure by default',
      description: 'Protection at all layers. Your data always safe and encrypted.'
    },
    {
      icon: 'Code',
      title: 'Developer First',
      description: 'Intuitive APIs and complete documentation. Start building in minutes.'
    }
  ]
}: Features1Props) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {title}
          </h2>
          <p className="max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
            {description}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon] || Zap;
            return (
              <div key={index} className="flex flex-col items-center text-center space-y-3 p-6 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                <div className="p-3 rounded-full bg-primary/10">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{feature.title}</h3>
                <p className="text-gray-500 dark:text-gray-400">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}`
  },
  {
    id: 'cta-1',
    name: 'Simple CTA',
    description: 'Clean and direct call-to-action with title, description and action buttons.',
    category: 'cta',
    tags: ['cta', 'call-to-action', 'conversion'],
    dependencies: [
      { name: 'lucide-react', version: '^0.544.0' }
    ],
    previewProps: {
      title: 'Ready to get started?',
      description: 'Join thousands of developers who are already building amazing projects.',
      primaryCTA: 'Create free account',
      secondaryCTA: 'Talk to sales'
    },
    props: [
      { name: 'title', type: 'string', description: 'CTA title' },
      { name: 'description', type: 'string', description: 'CTA description' },
      { name: 'primaryCTA', type: 'string', description: 'Primary button text' },
      { name: 'secondaryCTA', type: 'string', description: 'Secondary button text' }
    ],
    code: `import { ArrowRight } from 'lucide-react';

interface CTA1Props {
  title?: string;
  description?: string;
  primaryCTA?: string;
  secondaryCTA?: string;
}

export default function CTA1({
  title = 'Ready to get started?',
  description = 'Join thousands of developers who are already building amazing projects.',
  primaryCTA = 'Create free account',
  secondaryCTA = 'Talk to sales'
}: CTA1Props) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-6 text-center bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-12 md:p-16">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-white">
              {title}
            </h2>
            <p className="mx-auto max-w-[600px] text-white/90 md:text-xl">
              {description}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-white text-black hover:bg-white/90 h-11 px-8">
              {primaryCTA}
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border-2 border-white text-white hover:bg-white/10 h-11 px-8">
              {secondaryCTA}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}`
  },
  {
    id: 'footer-1',
    name: 'Complete Footer',
    description: 'Footer with company information, link sections, social icons and copyright. Responsive layout.',
    category: 'footer',
    tags: ['footer', 'links', 'social', 'navigation', 'company'],
    dependencies: [],
    previewProps: {
      companyName: 'Blcks',
      description: 'Componentes React prontos para copiar e colar. Copy, paste, customize.',
      sections: [
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
      socialLinks: {
        twitter: '#',
        github: '#',
        linkedin: '#'
      },
      copyright: '© 2024 Blcks. All rights reserved.'
    },
    props: [
      { name: 'companyName', type: 'string', default: 'Blcks', description: 'Company name' },
      { name: 'description', type: 'string', description: 'Company description' },
      { name: 'sections', type: 'FooterSection[]', description: 'Array of link sections with title and links' },
      { name: 'socialLinks', type: 'object', description: 'Object with social media links (twitter, github, linkedin)' },
      { name: 'copyright', type: 'string', description: 'Copyright text' }
    ],
    code: `interface FooterLink {
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
  description = 'Componentes React prontos para copiar e colar. Copy, paste, customize.',
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
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              )}
              {socialLinks.github && (
                <a href={socialLinks.github} className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              )}
              {socialLinks.linkedin && (
                <a href={socialLinks.linkedin} className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
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
}`
  },
  {
    id: 'announcement-1',
    name: 'Announcement Bar',
    description: 'Fixed announcement bar at the top with message, link and close button using shadcn/ui Button. Includes 3 color variations.',
    category: 'announcement',
    tags: ['announcement', 'banner', 'notification', 'top-bar'],
    dependencies: [
      { name: 'lucide-react', version: '^0.544.0' },
      { name: 'shadcn/ui', version: 'latest', component: 'button' }
    ],
    previewProps: {
      message: 'New: We just launched our new version 2.0',
      linkText: 'Learn more',
      linkHref: '#',
      variant: 'default'
    },
    props: [
      { name: 'message', type: 'string', description: 'Announcement message' },
      { name: 'linkText', type: 'string', description: 'Link text' },
      { name: 'linkHref', type: 'string', description: 'Link URL' },
      { name: 'variant', type: "'default' | 'gradient' | 'dark'", default: 'default', description: 'Bar color variation' }
    ],
    code: `import { X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Announcement1Props {
  message?: string;
  linkText?: string;
  linkHref?: string;
  variant?: 'default' | 'gradient' | 'dark';
}

export default function Announcement1({
  message = 'New: We just launched our new version 2.0',
  linkText = 'Learn more',
  linkHref = '#',
  variant = 'default'
}: Announcement1Props) {
  const variantClasses = {
    default: 'bg-primary text-primary-foreground',
    gradient: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white',
    dark: 'bg-gray-900 dark:bg-gray-950 text-white'
  };

  return (
    <div className={\`\${variantClasses[variant]} py-3 px-4 relative\`}>
      <div className="container mx-auto flex items-center justify-center gap-4">
        <p className="text-sm font-medium text-center flex-1 flex items-center justify-center gap-2 flex-wrap">
          <span>{message}</span>
          {linkText && (
            <a
              href={linkHref}
              className="inline-flex items-center underline underline-offset-4 hover:no-underline transition-all"
            >
              {linkText}
              <ArrowRight className="ml-1 h-3 w-3" />
            </a>
          )}
        </p>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 h-6 w-6 opacity-70 hover:opacity-100 hover:bg-transparent"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}`
  },
  {
    id: 'about-1',
    name: 'About Section',
    description: 'Complete company section with description, mission, statistics and team. Responsive and modern layout.',
    category: 'about',
    tags: ['about', 'team', 'mission', 'company', 'stats'],
    dependencies: [],
    previewProps: {
      title: 'About us',
      description: 'We are a team passionate about creating amazing digital experiences. Our mission is to help companies transform their ideas into products that people love.',
      mission: 'Democratize access to high-quality components for developers around the world.',
      stats: [
        { value: '50+', label: 'Components' },
        { value: '10k+', label: 'Developers' },
        { value: '100%', label: 'Open Source' },
        { value: '24/7', label: 'Support' }
      ],
      team: [
        {
          name: 'Ana Silva',
          role: 'CEO & Founder',
          imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'
        },
        {
          name: 'Carlos Santos',
          role: 'CTO',
          imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
        },
        {
          name: 'Marina Costa',
          role: 'Head of Design',
          imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop'
        },
        {
          name: 'Pedro Oliveira',
          role: 'Lead Developer',
          imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop'
        }
      ]
    },
    props: [
      { name: 'title', type: 'string', default: 'About us', description: 'Section title' },
      { name: 'description', type: 'string', description: 'Main description' },
      { name: 'mission', type: 'string', description: 'Company mission text' },
      { name: 'stats', type: 'Array<{ value: string; label: string }>', description: 'Array of statistics' },
      { name: 'team', type: 'TeamMember[]', description: 'Array of team members with name, role and imageUrl' }
    ],
    code: `interface TeamMember {
  name: string;
  role: string;
  imageUrl: string;
}

interface About1Props {
  title?: string;
  description?: string;
  mission?: string;
  stats?: Array<{
    value: string;
    label: string;
  }>;
  team?: TeamMember[];
}

export default function About1({
  title = 'About us',
  description = 'We are a team passionate about creating amazing digital experiences. Our mission is to help companies transform their ideas into products that people love.',
  mission = 'Democratize access to high-quality components for developers around the world.',
  stats = [
    { value: '50+', label: 'Components' },
    { value: '10k+', label: 'Developers' },
    { value: '100%', label: 'Open Source' },
    { value: '24/7', label: 'Support' }
  ],
  team = [
    {
      name: 'Ana Silva',
      role: 'CEO & Founder',
      imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'
    },
    {
      name: 'Carlos Santos',
      role: 'CTO',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
    },
    {
      name: 'Marina Costa',
      role: 'Head of Design',
      imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop'
    },
    {
      name: 'Pedro Oliveira',
      role: 'Lead Developer',
      imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop'
    }
  ]
}: About1Props) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>

        {/* Mission */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              {mission}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Team */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-12">Our Team</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-4 overflow-hidden rounded-xl">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h4 className="font-semibold text-lg mb-1">{member.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}`
  },
  {
    id: 'blog-1',
    name: 'Blog Grid',
    description: 'Blog post grid with image, category, title, excerpt, meta information and author. Responsive 3-column layout.',
    category: 'blog',
    tags: ['blog', 'posts', 'articles', 'grid', 'content'],
    dependencies: [
      { name: 'lucide-react', version: '^0.544.0' }
    ],
    previewProps: {
      title: 'Blog',
      description: 'Articles, tutorials and news about development',
      posts: [
        {
          title: 'How to create reusable components with React',
          excerpt: 'Learn best practices for creating React components that can be reused in any project.',
          author: 'Ana Silva',
          date: '15 Mar 2024',
          readTime: '5 min',
          category: 'React',
          imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
          slug: '#'
        },
        {
          title: 'Complete TypeScript guide for beginners',
          excerpt: 'Discover how TypeScript can improve your code quality and increase your productivity.',
          author: 'Carlos Santos',
          date: '12 Mar 2024',
          readTime: '8 min',
          category: 'TypeScript',
          imageUrl: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop',
          slug: '#'
        },
        {
          title: 'Optimizing performance in Next.js 15',
          excerpt: 'Advanced techniques to improve the performance of your Next.js applications and provide an amazing experience.',
          author: 'Marina Costa',
          date: '10 Mar 2024',
          readTime: '6 min',
          category: 'Next.js',
          imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
          slug: '#'
        }
      ]
    },
    props: [
      { name: 'title', type: 'string', default: 'Blog', description: 'Section title' },
      { name: 'description', type: 'string', description: 'Section description' },
      { name: 'posts', type: 'BlogPost[]', description: 'Array of posts with title, excerpt, author, date, readTime, category, imageUrl and slug' }
    ],
    code: `import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface BlogPost {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  imageUrl: string;
  slug: string;
}

interface Blog1Props {
  title?: string;
  description?: string;
  posts?: BlogPost[];
}

export default function Blog1({
  title = 'Blog',
  description = 'Articles, tutorials and news about development',
  posts = [
    {
      title: 'How to create reusable components with React',
      excerpt: 'Learn best practices for creating React components that can be reused in any project.',
      author: 'Ana Silva',
      date: '15 Mar 2024',
      readTime: '5 min',
      category: 'React',
      imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
      slug: '#'
    },
    {
      title: 'Complete TypeScript guide for beginners',
      excerpt: 'Discover how TypeScript can improve your code quality and increase your productivity.',
      author: 'Carlos Santos',
      date: '12 Mar 2024',
      readTime: '8 min',
      category: 'TypeScript',
      imageUrl: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop',
      slug: '#'
    },
    {
      title: 'Optimizing performance in Next.js 15',
      excerpt: 'Advanced techniques to improve the performance of your Next.js applications and provide an amazing experience.',
      author: 'Marina Costa',
      date: '10 Mar 2024',
      readTime: '6 min',
      category: 'Next.js',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
      slug: '#'
    }
  ]
}: Blog1Props) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <article
              key={index}
              className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary text-primary-foreground rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  <a href={post.slug}>{post.title}</a>
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <a
                    href={post.slug}
                    className="text-primary hover:underline inline-flex items-center text-sm font-medium"
                  >
                    Ler mais
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </a>
                </div>

                {/* Author */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Por <span className="font-medium text-gray-900 dark:text-white">{post.author}</span>
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}`
  },
  {
    id: 'pricing-1',
    name: 'Pricing Table',
    description: 'Pricing table with 3 plans, features with check/x, highlight for popular plan. Responsive grid layout.',
    category: 'pricing',
    tags: ['pricing', 'plans', 'subscription', 'features', 'comparison'],
    dependencies: [
      { name: 'lucide-react', version: '^0.544.0' }
    ],
    previewProps: {
      title: 'Simple and transparent pricing',
      description: 'Escolha o plano perfeito para suas necessidades',
      plans: [
        {
          name: 'Starter',
          description: 'Perfect to get started',
          price: 'R$ 29',
          period: '/month',
          cta: 'Get started now',
          features: [
            { text: '10 projetos', included: true },
            { text: '5GB de armazenamento', included: true },
            { text: 'Suporte por email', included: true },
            { text: 'API access', included: false },
            { text: 'Advanced integrations', included: false },
            { text: 'Priority support', included: false }
          ]
        },
        {
          name: 'Professional',
          description: 'Para times em crescimento',
          price: 'R$ 99',
          period: '/month',
          cta: 'Get started now',
          popular: true,
          features: [
            { text: 'Unlimited projects', included: true },
            { text: '50GB de armazenamento', included: true },
            { text: 'Suporte por email e chat', included: true },
            { text: 'API access', included: true },
            { text: 'Advanced integrations', included: true },
            { text: 'Priority support', included: false }
          ]
        },
        {
          name: 'Enterprise',
          description: 'Para grandes empresas',
          price: 'R$ 299',
          period: '/month',
          cta: 'Talk to sales',
          features: [
            { text: 'Unlimited projects', included: true },
            { text: 'Armazenamento ilimitado', included: true },
            { text: 'Suporte 24/7', included: true },
            { text: 'API access', included: true },
            { text: 'Advanced integrations', included: true },
            { text: 'Priority support', included: true }
          ]
        }
      ]
    },
    props: [
      { name: 'title', type: 'string', default: 'Simple and transparent pricing', description: 'Section title' },
      { name: 'description', type: 'string', description: 'Section description' },
      { name: 'plans', type: 'PricingPlan[]', description: 'Array de planos com name, description, price, period, cta, features e popular (opcional)' }
    ],
    code: `import { Check, X } from 'lucide-react';

interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingPlan {
  name: string;
  description: string;
  price: string;
  period: string;
  features: PricingFeature[];
  cta: string;
  popular?: boolean;
}

interface Pricing1Props {
  title?: string;
  description?: string;
  plans?: PricingPlan[];
}

export default function Pricing1({
  title = 'Simple and transparent pricing',
  description = 'Escolha o plano perfeito para suas necessidades',
  plans = [
    {
      name: 'Starter',
      description: 'Perfect to get started',
      price: 'R$ 29',
      period: '/month',
      cta: 'Get started now',
      features: [
        { text: '10 projetos', included: true },
        { text: '5GB de armazenamento', included: true },
        { text: 'Suporte por email', included: true },
        { text: 'API access', included: false },
        { text: 'Advanced integrations', included: false },
        { text: 'Priority support', included: false }
      ]
    },
    {
      name: 'Professional',
      description: 'Para times em crescimento',
      price: 'R$ 99',
      period: '/month',
      cta: 'Get started now',
      popular: true,
      features: [
        { text: 'Unlimited projects', included: true },
        { text: '50GB de armazenamento', included: true },
        { text: 'Suporte por email e chat', included: true },
        { text: 'API access', included: true },
        { text: 'Advanced integrations', included: true },
        { text: 'Priority support', included: false }
      ]
    },
    {
      name: 'Enterprise',
      description: 'Para grandes empresas',
      price: 'R$ 299',
      period: '/month',
      cta: 'Talk to sales',
      features: [
        { text: 'Unlimited projects', included: true },
        { text: 'Armazenamento ilimitado', included: true },
        { text: 'Suporte 24/7', included: true },
        { text: 'API access', included: true },
        { text: 'Advanced integrations', included: true },
        { text: 'Priority support', included: true }
      ]
    }
  ]
}: Pricing1Props) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid gap-8 lg:grid-cols-3 max-w-7xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={\`relative rounded-2xl border \${
                plan.popular
                  ? 'border-primary shadow-xl scale-105'
                  : 'border-gray-200 dark:border-gray-800'
              } bg-white dark:bg-gray-900 p-8\`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-block px-4 py-1 text-sm font-semibold bg-primary text-primary-foreground rounded-full">
                    Mais Popular
                  </span>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {plan.description}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-bold">{plan.price}</span>
                  <span className="text-gray-600 dark:text-gray-400">
                    {plan.period}
                  </span>
                </div>
              </div>

              <button
                className={\`w-full py-3 px-6 rounded-lg font-medium transition-colors mb-8 \${
                  plan.popular
                    ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                }\`}
              >
                {plan.cta}
              </button>

              <ul className="space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    ) : (
                      <X className="h-5 w-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    )}
                    <span
                      className={
                        feature.included
                          ? 'text-gray-700 dark:text-gray-300'
                          : 'text-gray-400 dark:text-gray-600'
                      }
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`
  },
  {
    id: 'services-1',
    name: 'Services Grid',
    description: 'Services grid with icons, title, description and feature list. Responsive 3-column layout with hover effects.',
    category: 'services',
    tags: ['services', 'features', 'grid', 'icons', 'business'],
    dependencies: [
      { name: 'lucide-react', version: '^0.544.0' }
    ],
    previewProps: {
      title: 'Our Services',
      description: 'Complete solutions to transform your digital business',
      services: [
        {
          icon: 'Code',
          title: 'Web Development',
          description: 'We create modern, fast and scalable web applications using the best market technologies.',
          features: [
            'React & Next.js',
            'TypeScript',
            'API RESTful',
            'Responsivo'
          ]
        },
        {
          icon: 'Smartphone',
          title: 'Mobile Development',
          description: 'Native and cross-platform applications that provide amazing experiences on any device.',
          features: [
            'React Native',
            'iOS & Android',
            'Offline-first',
            'Push Notifications'
          ]
        },
        {
          icon: 'Cloud',
          title: 'Cloud & DevOps',
          description: 'Scalable and automated infrastructure to ensure performance and availability of your product.',
          features: [
            'AWS / Google Cloud',
            'Docker & Kubernetes',
            'CI/CD',
            'Monitoring'
          ]
        }
      ]
    },
    props: [
      { name: 'title', type: 'string', default: 'Our Services', description: 'Section title' },
      { name: 'description', type: 'string', description: 'Section description' },
      { name: 'services', type: 'Service[]', description: 'Array of services with icon, title, description and features' }
    ],
    code: `import { Code, Smartphone, Cloud, Shield, Zap, Users } from 'lucide-react';

interface Service {
  icon: string;
  title: string;
  description: string;
  features: string[];
}

interface Services1Props {
  title?: string;
  description?: string;
  services?: Service[];
}

const iconMap = {
  Code,
  Smartphone,
  Cloud,
  Shield,
  Zap,
  Users
};

export default function Services1({
  title = 'Our Services',
  description = 'Complete solutions to transform your digital business',
  services = [
    {
      icon: 'Code',
      title: 'Web Development',
      description: 'We create modern, fast and scalable web applications using the best market technologies.',
      features: [
        'React & Next.js',
        'TypeScript',
        'API RESTful',
        'Responsivo'
      ]
    },
    {
      icon: 'Smartphone',
      title: 'Mobile Development',
      description: 'Native and cross-platform applications that provide amazing experiences on any device.',
      features: [
        'React Native',
        'iOS & Android',
        'Offline-first',
        'Push Notifications'
      ]
    },
    {
      icon: 'Cloud',
      title: 'Cloud & DevOps',
      description: 'Scalable and automated infrastructure to ensure performance and availability of your product.',
      features: [
        'AWS / Google Cloud',
        'Docker & Kubernetes',
        'CI/CD',
        'Monitoring'
      ]
    }
  ]
}: Services1Props) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap] || Code;
            return (
              <div
                key={index}
                className="group relative bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary transition-all duration-300 hover:shadow-lg"
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <li
                      key={featureIndex}
                      className="flex items-center text-sm text-gray-600 dark:text-gray-400"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Hover Effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}`
  },
  {
    id: 'blog-post-1',
    name: 'Blog Post Article',
    description: 'Complete blog article layout with cover image, meta information, author, formatted content and tags. Typography optimized for reading.',
    category: 'blog',
    tags: ['blog', 'article', 'post', 'content', 'reading'],
    dependencies: [
      { name: 'lucide-react', version: '^0.544.0' }
    ],
    previewProps: {
      title: 'How to create reusable components with React',
      author: {
        name: 'Ana Silva',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
        bio: 'Senior Frontend Developer with 8+ years experience in React and TypeScript'
      },
      date: 'March 15, 2024',
      readTime: '8 min de leitura',
      category: 'React',
      coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=600&fit=crop',
      content: '<p class="lead">Creating reusable components is one of the most important skills for any React developer.</p><h2>Why reusable components?</h2><p>Reusable components save time and ensure consistency.</p>',
      tags: ['React', 'Components', 'Best Practices', 'TypeScript']
    },
    props: [
      { name: 'title', type: 'string', description: 'Article title' },
      { name: 'author', type: '{ name: string; avatar: string; bio?: string }', description: 'Author information' },
      { name: 'date', type: 'string', description: 'Publication date' },
      { name: 'readTime', type: 'string', description: 'Tempo estimado de leitura' },
      { name: 'category', type: 'string', description: 'Categoria do artigo' },
      { name: 'coverImage', type: 'string', description: 'URL da imagem de capa' },
      { name: 'content', type: 'string', description: 'Article HTML content' },
      { name: 'tags', type: 'string[]', description: 'Tags do artigo' }
    ],
    code: `import { Calendar, Clock, User, ArrowLeft, Share2 } from 'lucide-react';

interface BlogPost1Props {
  title?: string;
  author?: {
    name: string;
    avatar: string;
    bio?: string;
  };
  date?: string;
  readTime?: string;
  category?: string;
  coverImage?: string;
  content?: string;
  tags?: string[];
}

export default function BlogPost1({
  title = 'How to create reusable components with React',
  author = {
    name: 'Ana Silva',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    bio: 'Senior Frontend Developer with 8+ years experience in React and TypeScript'
  },
  date = 'March 15, 2024',
  readTime = '8 min de leitura',
  category = 'React',
  coverImage = 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=600&fit=crop',
  content = \`
    <p class="lead">Creating reusable components is one of the most important skills for any React developer.</p>
    <h2>Why are reusable components important?</h2>
    <p>Reusable components not only save development time, but also ensure consistency throughout your application.</p>
  \`,
  tags = ['React', 'Components', 'Best Practices', 'TypeScript']
}: BlogPost1Props) {
  return (
    <article className="w-full">
      {/* Header Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <a
            href="#"
            className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para o blog
          </a>
        </div>
      </div>

      {/* Cover Image */}
      <div className="w-full h-[400px] md:h-[500px] relative overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Category Badge */}
        <div className="mb-6">
          <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary text-primary-foreground rounded-full">
            {category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          {title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{readTime}</span>
          </div>
          <button className="flex items-center gap-2 hover:text-primary transition-colors">
            <Share2 className="h-4 w-4" />
            <span>Compartilhar</span>
          </button>
        </div>

        {/* Author Info */}
        <div className="flex items-center gap-4 mb-12 p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
          <img
            src={author.avatar}
            alt={author.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <User className="h-4 w-4 text-gray-400" />
              <p className="font-semibold text-gray-900 dark:text-white">
                {author.name}
              </p>
            </div>
            {author.bio && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {author.bio}
              </p>
            )}
          </div>
        </div>

        {/* Article Content */}
        <div
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <a
                  key={index}
                  href="#"
                  className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  {tag}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}`
  },
  {
    id: 'changelog-1',
    name: 'Changelog Timeline',
    description: 'Changelog timeline with versions, dates and change categorization (added, fixed, improved, changed, removed). Modern visual with icons and colors.',
    category: 'changelog',
    tags: ['changelog', 'updates', 'releases', 'versions', 'timeline'],
    dependencies: [
      { name: 'lucide-react', version: '^0.544.0' }
    ],
    previewProps: {
      title: 'Changelog',
      description: 'Follow all product updates, improvements and fixes',
      entries: [
        {
          version: '2.1.0',
          date: 'March 15, 2024',
          changes: [
            { type: 'added', text: 'New real-time notification system' },
            { type: 'added', text: 'Support for authentication via Google and GitHub' },
            { type: 'improved', text: 'Performance do dashboard aumentada em 40%' },
            { type: 'fixed', text: 'Fixed bug in large file upload' }
          ]
        },
        {
          version: '2.0.0',
          date: 'March 1, 2024',
          changes: [
            { type: 'added', text: 'Completely redesigned interface' },
            { type: 'improved', text: 'REST API v2 with better documentation' },
            { type: 'changed', text: 'Migration to Next.js 15' }
          ]
        }
      ]
    },
    props: [
      { name: 'title', type: 'string', default: 'Changelog', description: 'Section title' },
      { name: 'description', type: 'string', description: 'Section description' },
      { name: 'entries', type: 'ChangelogEntry[]', description: 'Array de entradas com version, date e changes' }
    ],
    code: `import { Calendar, Plus, Wrench, Bug, Zap, AlertCircle } from 'lucide-react';

interface ChangelogItem {
  type: 'added' | 'fixed' | 'improved' | 'changed' | 'removed';
  text: string;
}

interface ChangelogEntry {
  version: string;
  date: string;
  changes: ChangelogItem[];
}

interface Changelog1Props {
  title?: string;
  description?: string;
  entries?: ChangelogEntry[];
}

const typeConfig = {
  added: {
    icon: Plus,
    label: 'Adicionado',
    color: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-50 dark:bg-green-950'
  },
  fixed: {
    icon: Bug,
    label: 'Corrigido',
    color: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-50 dark:bg-red-950'
  },
  improved: {
    icon: Zap,
    label: 'Melhorado',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-950'
  },
  changed: {
    icon: Wrench,
    label: 'Alterado',
    color: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-50 dark:bg-orange-950'
  },
  removed: {
    icon: AlertCircle,
    label: 'Removido',
    color: 'text-gray-600 dark:text-gray-400',
    bg: 'bg-gray-50 dark:bg-gray-950'
  }
};

export default function Changelog1({
  title = 'Changelog',
  description = 'Follow all product updates, improvements and fixes',
  entries = [
    {
      version: '2.1.0',
      date: 'March 15, 2024',
      changes: [
        { type: 'added', text: 'New real-time notification system' },
        { type: 'improved', text: 'Performance do dashboard aumentada em 40%' },
        { type: 'fixed', text: 'Fixed bug in large file upload' }
      ]
    }
  ]
}: Changelog1Props) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>

        {/* Changelog Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {entries.map((entry, index) => (
              <div key={index} className="relative">
                {/* Timeline line */}
                {index !== entries.length - 1 && (
                  <div className="absolute left-6 top-12 bottom-0 w-px bg-gradient-to-b from-primary/50 to-transparent" />
                )}

                <div className="relative">
                  {/* Version Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold shadow-lg">
                      {entry.version.split('.')[0]}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">
                        Version {entry.version}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="h-4 w-4" />
                        <span>{entry.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Changes List */}
                  <div className="ml-16 space-y-3">
                    {entry.changes.map((change, changeIndex) => {
                      const config = typeConfig[change.type];
                      const Icon = config.icon;

                      return (
                        <div
                          key={changeIndex}
                          className={\`flex items-start gap-3 p-4 rounded-lg \${config.bg} border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-colors\`}
                        >
                          <div className={\`flex-shrink-0 \${config.color}\`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <span className={\`text-xs font-semibold uppercase tracking-wide \${config.color} block mb-1\`}>
                              {config.label}
                            </span>
                            <p className="text-gray-700 dark:text-gray-300">
                              {change.text}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="max-w-4xl mx-auto mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
            Legenda
          </h4>
          <div className="flex flex-wrap gap-4">
            {Object.entries(typeConfig).map(([type, config]) => {
              const Icon = config.icon;
              return (
                <div key={type} className="flex items-center gap-2">
                  <Icon className={\`h-4 w-4 \${config.color}\`} />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {config.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}`
  },
  {
    id: 'login-1',
    name: 'Login Form',
    description: 'Complete login form using shadcn/ui components (Input, Button, Checkbox), with email/password, social login (Google, GitHub), remember me and password recovery. Modern and responsive design.',
    category: 'auth',
    tags: ['login', 'authentication', 'form', 'social-login', 'auth'],
    dependencies: [
      { name: 'lucide-react', version: '^0.544.0' },
      { name: 'shadcn/ui', version: 'latest', component: 'input' },
      { name: 'shadcn/ui', version: 'latest', component: 'button' },
      { name: 'shadcn/ui', version: 'latest', component: 'checkbox' }
    ],
    previewProps: {
      title: 'Welcome back',
      subtitle: 'Entre com sua conta para continuar',
      brandName: 'Blcks',
      showSocialLogin: true
    },
    props: [
      { name: 'title', type: 'string', default: 'Welcome back', description: 'Form title' },
      { name: 'subtitle', type: 'string', description: 'Form subtitle' },
      { name: 'brandName', type: 'string', default: 'Blcks', description: 'Nome da marca' },
      { name: 'brandLogo', type: 'string', description: 'URL do logo (opcional)' },
      { name: 'showSocialLogin', type: 'boolean', default: 'true', description: 'Show social login options' }
    ],
    code: `import { Mail, Lock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

interface Login1Props {
  title?: string;
  subtitle?: string;
  brandName?: string;
  brandLogo?: string;
  showSocialLogin?: boolean;
}

export default function Login1({
  title = 'Welcome back',
  subtitle = 'Entre com sua conta para continuar',
  brandName = 'Blcks',
  brandLogo,
  showSocialLogin = true
}: Login1Props) {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          {brandLogo ? (
            <img src={brandLogo} alt={brandName} className="h-12 mx-auto mb-6" />
          ) : (
            <h1 className="text-3xl font-bold mb-2">{brandName}</h1>
          )}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {subtitle}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
          {/* Social Login */}
          {showSocialLogin && (
            <>
              <div className="space-y-3 mb-6">
                <Button variant="outline" className="w-full" type="button">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continuar com Google
                </Button>
                <Button variant="outline" className="w-full" type="button">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  Continuar com GitHub
                </Button>
              </div>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                    Ou continue com email
                  </span>
                </div>
              </div>
            </>
          )}

          {/* Login Form */}
          <form className="space-y-4">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="email"
                  type="email"
                  className="pl-10"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="password"
                  type="password"
                  className="pl-10"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Checkbox id="remember" />
                <label htmlFor="remember" className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-primary hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </form>

          {/* Sign Up Link */}
          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <a href="#" className="text-primary font-medium hover:underline">
              Criar conta
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}`
  },
  {
    id: 'signup-1',
    name: 'Signup Form',
    description: 'Complete signup form using shadcn/ui components (Input, Button, Checkbox), with name, email, password, terms acceptance and social signup (Google, GitHub). Modern and responsive design.',
    category: 'auth',
    tags: ['signup', 'register', 'authentication', 'form', 'social-signup'],
    dependencies: [
      { name: 'lucide-react', version: '^0.544.0' },
      { name: 'shadcn/ui', version: 'latest', component: 'input' },
      { name: 'shadcn/ui', version: 'latest', component: 'button' },
      { name: 'shadcn/ui', version: 'latest', component: 'checkbox' }
    ],
    previewProps: {
      title: 'Criar sua conta',
      subtitle: 'Start for free, no credit card required',
      brandName: 'Blcks',
      showSocialSignup: true
    },
    props: [
      { name: 'title', type: 'string', default: 'Criar sua conta', description: 'Form title' },
      { name: 'subtitle', type: 'string', description: 'Form subtitle' },
      { name: 'brandName', type: 'string', default: 'Blcks', description: 'Nome da marca' },
      { name: 'brandLogo', type: 'string', description: 'URL do logo (opcional)' },
      { name: 'showSocialSignup', type: 'boolean', default: 'true', description: 'Show social signup options' }
    ],
    code: `import { Mail, Lock, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';

interface Signup1Props {
  title?: string;
  subtitle?: string;
  brandName?: string;
  brandLogo?: string;
  showSocialSignup?: boolean;
}

export default function Signup1({
  title = 'Criar sua conta',
  subtitle = 'Start for free, no credit card required',
  brandName = 'Blcks',
  brandLogo,
  showSocialSignup = true
}: Signup1Props) {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          {brandLogo ? (
            <img src={brandLogo} alt={brandName} className="h-12 mx-auto mb-6" />
          ) : (
            <h1 className="text-3xl font-bold mb-2">{brandName}</h1>
          )}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {title}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            {subtitle}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8">
          {/* Social Signup */}
          {showSocialSignup && (
            <>
              <div className="space-y-3 mb-6">
                <Button variant="outline" className="w-full" type="button">
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continuar com Google
                </Button>
                <Button variant="outline" className="w-full" type="button">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  Continuar com GitHub
                </Button>
              </div>

              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                    Ou cadastre-se com email
                  </span>
                </div>
              </div>
            </>
          )}

          {/* Signup Form */}
          <form className="space-y-4">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Name completo
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="name"
                  type="text"
                  className="pl-10"
                  placeholder="John Silva"
                />
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="email"
                  type="email"
                  className="pl-10"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="password"
                  type="password"
                  className="pl-10"
                  placeholder="Minimum 8 characters"
                />
              </div>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Password must have at least 8 characters
              </p>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start space-x-2">
              <Checkbox id="terms" className="mt-1" />
              <label htmlFor="terms" className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                I agree to the{' '}
                <a href="#" className="text-primary hover:underline">
                  Termos de Uso
                </a>{' '}
                e a{' '}
                <a href="#" className="text-primary hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full">
              Criar conta
            </Button>
          </form>

          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <a href="#" className="text-primary font-medium hover:underline">
              Fazer login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}`
  },
  {
    id: 'testimonial-1',
    name: 'Testimonials Grid',
    description: 'Testimonials grid with avatar, name, role/company, star rating and quote. Responsive 3-column layout with quote icon.',
    category: 'testimonial',
    tags: ['testimonial', 'reviews', 'social-proof', 'ratings', 'feedback'],
    dependencies: [
      { name: 'lucide-react', version: '^0.544.0' }
    ],
    previewProps: {
      title: 'What our customers say',
      description: 'See feedback from people who already use our product',
      testimonials: [
        {
          name: 'Ana Silva',
          role: 'CEO',
          company: 'TechStart Inc',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
          content: 'Este produto revolucionou completamente a forma como nossa equipe trabalha. A produtividade aumentou em 40% e conseguimos reduzir drasticamente o tempo de desenvolvimento.',
          rating: 5
        },
        {
          name: 'Carlos Santos',
          role: 'Product Manager',
          company: 'Digital Solutions',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
          content: 'Excellent tool! The interface is intuitive and the features perfectly meet our needs. Customer support is also exceptional.',
          rating: 5
        },
        {
          name: 'Marina Costa',
          role: 'Lead Developer',
          company: 'CodeCraft',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
          content: 'As a developer, I really appreciate the code quality and complete documentation. It made integration with our existing systems much easier.',
          rating: 5
        }
      ]
    },
    props: [
      { name: 'title', type: 'string', default: 'What our customers say', description: 'Section title' },
      { name: 'description', type: 'string', description: 'Section description' },
      { name: 'testimonials', type: 'Testimonial[]', description: 'Array de depoimentos com name, role, company, avatar, content e rating' }
    ],
    code: `import { Quote, Star } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  avatar: string;
  content: string;
  rating: number;
}

interface Testimonial1Props {
  title?: string;
  description?: string;
  testimonials?: Testimonial[];
}

export default function Testimonial1({
  title = 'What our customers say',
  description = 'See feedback from people who already use our product',
  testimonials = [
    {
      name: 'Ana Silva',
      role: 'CEO',
      company: 'TechStart Inc',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      content: 'Este produto revolucionou completamente a forma como nossa equipe trabalha.',
      rating: 5
    }
  ]
}: Testimonial1Props) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="relative bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary transition-all duration-300 hover:shadow-lg"
            >
              {/* Quote Icon */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-primary rounded-full flex items-center justify-center shadow-lg">
                <Quote className="h-6 w-6 text-primary-foreground" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={\`h-5 w-5 \${
                      i < testimonial.rating
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300 dark:text-gray-600'
                    }\`}
                  />
                ))}
              </div>

              {/* Content */}
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}`
  },
  {
    id: 'faq-1',
    name: 'FAQ Accordion',
    description: 'FAQ with interactive accordion using shadcn/ui Accordion, smooth open/close animations and contact CTA. First item open by default.',
    category: 'faq',
    tags: ['faq', 'accordion', 'questions', 'help', 'support'],
    dependencies: [
      { name: 'shadcn/ui', version: 'latest', component: 'accordion' }
    ],
    previewProps: {
      title: 'Frequently Asked Questions',
      description: 'Find answers to the most common questions',
      faqs: [
        {
          question: 'How does the free trial period work?',
          answer: 'We offer a 14-day free trial with no credit card required. You will have full access to all premium features during this period.'
        },
        {
          question: 'Posso cancelar minha assinatura a qualquer momento?',
          answer: 'Yes! You can cancel your subscription at any time through your account settings. There are no cancellation fees.'
        },
        {
          question: 'What payment methods are accepted?',
          answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal and bank transfer for annual plans.'
        }
      ]
    },
    props: [
      { name: 'title', type: 'string', default: 'Frequently Asked Questions', description: 'Section title' },
      { name: 'description', type: 'string', description: 'Section description' },
      { name: 'faqs', type: 'FAQItem[]', description: 'Array de perguntas e respostas com question e answer' }
    ],
    code: `import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQ1Props {
  title?: string;
  description?: string;
  faqs?: FAQItem[];
}

export default function FAQ1({
  title = 'Frequently Asked Questions',
  description = 'Find answers to the most common questions',
  faqs = [
    {
      question: 'How does the free trial period work?',
      answer: 'We offer a 14-day free trial with no credit card required. You will have full access to all premium features during this period. After it ends, you can choose one of our plans or continue using the free version with limited features.'
    },
    {
      question: 'Posso cancelar minha assinatura a qualquer momento?',
      answer: 'Yes! You can cancel your subscription at any time through your account settings. There are no cancellation fees and you will continue to have access to paid features until the end of the period that has already been paid.'
    },
    {
      question: 'What payment methods are accepted?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal and bank transfer for annual plans. All transactions are processed securely through certified platforms.'
    }
  ]
}: FAQ1Props) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible defaultValue="item-0" className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={\`item-\${index}\`}
                className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden data-[state=open]:border-primary dark:data-[state=open]:border-primary"
              >
                <AccordionTrigger className="px-6 py-5 text-left hover:no-underline hover:bg-gray-50 dark:hover:bg-gray-800 [&[data-state=open]>svg]:rotate-180">
                  <span className="font-semibold text-lg text-gray-900 dark:text-white pr-4">
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-5 pt-2">
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact CTA */}
        <div className="max-w-4xl mx-auto mt-12 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Still have questions?{' '}
            <a href="#" className="text-primary font-medium hover:underline">
              Entre em contato conosco
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}`
  }
];

// Helper functions
export const getBlockById = (id: string): BlockMetadata | undefined => {
  return blocksRegistry.find(block => block.id === id);
};

export const getBlocksByCategory = (category: string): BlockMetadata[] => {
  return blocksRegistry.filter(block => block.category === category);
};

export const getAllCategories = (): string[] => {
  return Array.from(new Set(blocksRegistry.map(block => block.category)));
};

export const searchBlocks = (query: string): BlockMetadata[] => {
  const lowerQuery = query.toLowerCase();
  return blocksRegistry.filter(block =>
    block.name.toLowerCase().includes(lowerQuery) ||
    block.description.toLowerCase().includes(lowerQuery) ||
    block.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
};