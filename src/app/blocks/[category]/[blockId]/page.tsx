import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Copy } from 'lucide-react';
import { getBlockById } from '@/lib/blocks-registry';
import { BlockPreview } from '@/components/block-preview';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Hero1 from '@/blocks/hero/hero1';
import Hero2 from '@/blocks/hero/hero2';
import Hero3 from '@/blocks/hero/hero3';
import Hero4 from '@/blocks/hero/hero4';
import Hero5 from '@/blocks/hero/hero5';
import Hero6 from '@/blocks/hero/hero6';
import Hero7 from '@/blocks/hero/hero7';
import Hero8 from '@/blocks/hero/hero8';
import Hero9 from '@/blocks/hero/hero9';
import Hero10 from '@/blocks/hero/hero10';
import Features1 from '@/blocks/features/features1';
import Features2 from '@/blocks/features/features-2';
import Features3 from '@/blocks/features/features-3';
import Features4 from '@/blocks/features/features-4';
import Features5 from '@/blocks/features/features-5';
import CTA1 from '@/blocks/cta/cta1';
import CTA2 from '@/blocks/cta/cta-2';
import CTA3 from '@/blocks/cta/cta-3';
import CTA4 from '@/blocks/cta/cta-4';
import CTA5 from '@/blocks/cta/cta-5';
import CTA6 from '@/blocks/cta/cta-6';
import CTA7 from '@/blocks/cta/cta-7';
import Navbar1 from '@/blocks/navbar/navbar1';
import Navbar2 from '@/blocks/navbar/navbar-2';
import Navbar3 from '@/blocks/navbar/navbar-3';
import Navbar4 from '@/blocks/navbar/navbar-4';
import Navbar5 from '@/blocks/navbar/navbar-5';
import Footer1 from '@/blocks/footer/footer-1';
import Footer2 from '@/blocks/footer/footer-2';
import Footer3 from '@/blocks/footer/footer-3';
import Footer4 from '@/blocks/footer/footer-4';
import Footer5 from '@/blocks/footer/footer-5';
import Footer6 from '@/blocks/footer/footer-6';
import Footer7 from '@/blocks/footer/footer-7';
import Announcement1 from '@/blocks/announcement/announcement-1';
import Announcement2 from '@/blocks/announcement/announcement-2';
import Announcement3 from '@/blocks/announcement/announcement-3';
import Announcement4 from '@/blocks/announcement/announcement-4';
import Announcement5 from '@/blocks/announcement/announcement-5';
import About1 from '@/blocks/about/about-1';
import About2 from '@/blocks/about/about-2';
import About3 from '@/blocks/about/about-3';
import About4 from '@/blocks/about/about-4';
import About5 from '@/blocks/about/about-5';
import About6 from '@/blocks/about/about-6';
import About7 from '@/blocks/about/about-7';
import Blog1 from '@/blocks/blog/blog-1';
import Blog2 from '@/blocks/blog/blog-2';
import Blog3 from '@/blocks/blog/blog-3';
import Blog4 from '@/blocks/blog/blog-4';
import Blog5 from '@/blocks/blog/blog-5';
import BlogPost1 from '@/blocks/blog/blog-post-1';
import BlogPost2 from '@/blocks/blog/blog-post-2';
import BlogPost3 from '@/blocks/blog/blog-post-3';
import BlogPost4 from '@/blocks/blog/blog-post-4';
import BlogPost5 from '@/blocks/blog/blog-post-5';
import Pricing1 from '@/blocks/pricing/pricing-1';
import Pricing2 from '@/blocks/pricing/pricing-2';
import Pricing3 from '@/blocks/pricing/pricing-3';
import Pricing4 from '@/blocks/pricing/pricing-4';
import Pricing5 from '@/blocks/pricing/pricing-5';
import Pricing6 from '@/blocks/pricing/pricing-6';
import Pricing7 from '@/blocks/pricing/pricing-7';
import Services1 from '@/blocks/services/services-1';
import Services2 from '@/blocks/services/services-2';
import Services3 from '@/blocks/services/services-3';
import Services4 from '@/blocks/services/services-4';
import Services5 from '@/blocks/services/services-5';
import Services6 from '@/blocks/services/services-6';
import Services7 from '@/blocks/services/services-7';
import Changelog1 from '@/blocks/changelog/changelog-1';
import Changelog2 from '@/blocks/changelog/changelog-2';
import Changelog3 from '@/blocks/changelog/changelog-3';
import Changelog4 from '@/blocks/changelog/changelog-4';
import Changelog5 from '@/blocks/changelog/changelog-5';
import Login1 from '@/blocks/auth/login-1';
import Login2 from '@/blocks/auth/login-2';
import Login3 from '@/blocks/auth/login-3';
import Login4 from '@/blocks/auth/login-4';
import Login5 from '@/blocks/auth/login-5';
import Login6 from '@/blocks/auth/login-6';
import Login7 from '@/blocks/auth/login-7';
import Signup1 from '@/blocks/auth/signup-1';
import Signup2 from '@/blocks/auth/signup-2';
import Signup3 from '@/blocks/auth/signup-3';
import Signup4 from '@/blocks/auth/signup-4';
import Signup5 from '@/blocks/auth/signup-5';
import Signup6 from '@/blocks/auth/signup-6';
import Signup7 from '@/blocks/auth/signup-7';
import Testimonial1 from '@/blocks/testimonial/testimonial-1';
import Testimonial2 from '@/blocks/testimonial/testimonial-2';
import Testimonial3 from '@/blocks/testimonial/testimonial-3';
import Testimonial4 from '@/blocks/testimonial/testimonial-4';
import Testimonial5 from '@/blocks/testimonial/testimonial-5';
import Testimonial6 from '@/blocks/testimonial/testimonial-6';
import Testimonial7 from '@/blocks/testimonial/testimonial-7';
import FAQ1 from '@/blocks/faq/faq-1';
import FAQ2 from '@/blocks/faq/faq-2';
import FAQ3 from '@/blocks/faq/faq-3';
import FAQ4 from '@/blocks/faq/faq-4';
import FAQ5 from '@/blocks/faq/faq-5';
import Contact1 from '@/blocks/contact/contact-1';
import Contact2 from '@/blocks/contact/contact-2';
import Contact3 from '@/blocks/contact/contact-3';
import Contact4 from '@/blocks/contact/contact-4';
import Contact5 from '@/blocks/contact/contact-5';
import Contact6 from '@/blocks/contact/contact-6';
import Contact7 from '@/blocks/contact/contact-7';

interface PageProps {
  params: Promise<{
    category: string;
    blockId: string;
  }>;
}

// Component map for rendering
const componentMap: Record<string, React.ComponentType<any>> = {
  'navbar-1': Navbar1,
  'navbar-2': Navbar2,
  'navbar-3': Navbar3,
  'navbar-4': Navbar4,
  'navbar-5': Navbar5,
  'hero-1': Hero1,
  'hero-2': Hero2,
  'hero-3': Hero3,
  'hero-4': Hero4,
  'hero-5': Hero5,
  'hero-6': Hero6,
  'hero-7': Hero7,
  'hero-8': Hero8,
  'hero-9': Hero9,
  'hero-10': Hero10,
  'features-1': Features1,
  'features-2': Features2,
  'features-3': Features3,
  'features-4': Features4,
  'features-5': Features5,
  'cta-1': CTA1,
  'cta-2': CTA2,
  'cta-3': CTA3,
  'cta-4': CTA4,
  'cta-5': CTA5,
  'cta-6': CTA6,
  'cta-7': CTA7,
  'footer-1': Footer1,
  'footer-2': Footer2,
  'footer-3': Footer3,
  'footer-4': Footer4,
  'footer-5': Footer5,
  'footer-6': Footer6,
  'footer-7': Footer7,
  'announcement-1': Announcement1,
  'announcement-2': Announcement2,
  'announcement-3': Announcement3,
  'announcement-4': Announcement4,
  'announcement-5': Announcement5,
  'about-1': About1,
  'about-2': About2,
  'about-3': About3,
  'about-4': About4,
  'about-5': About5,
  'about-6': About6,
  'about-7': About7,
  'blog-1': Blog1,
  'blog-2': Blog2,
  'blog-3': Blog3,
  'blog-4': Blog4,
  'blog-5': Blog5,
  'blog-post-1': BlogPost1,
  'blog-post-2': BlogPost2,
  'blog-post-3': BlogPost3,
  'blog-post-4': BlogPost4,
  'blog-post-5': BlogPost5,
  'pricing-1': Pricing1,
  'pricing-2': Pricing2,
  'pricing-3': Pricing3,
  'pricing-4': Pricing4,
  'pricing-5': Pricing5,
  'pricing-6': Pricing6,
  'pricing-7': Pricing7,
  'services-1': Services1,
  'services-2': Services2,
  'services-3': Services3,
  'services-4': Services4,
  'services-5': Services5,
  'services-6': Services6,
  'services-7': Services7,
  'changelog-1': Changelog1,
  'changelog-2': Changelog2,
  'changelog-3': Changelog3,
  'changelog-4': Changelog4,
  'changelog-5': Changelog5,
  'login-1': Login1,
  'login-2': Login2,
  'login-3': Login3,
  'login-4': Login4,
  'login-5': Login5,
  'login-6': Login6,
  'login-7': Login7,
  'signup-1': Signup1,
  'signup-2': Signup2,
  'signup-3': Signup3,
  'signup-4': Signup4,
  'signup-5': Signup5,
  'signup-6': Signup6,
  'signup-7': Signup7,
  'testimonial-1': Testimonial1,
  'testimonial-2': Testimonial2,
  'testimonial-3': Testimonial3,
  'testimonial-4': Testimonial4,
  'testimonial-5': Testimonial5,
  'testimonial-6': Testimonial6,
  'testimonial-7': Testimonial7,
  'faq-1': FAQ1,
  'faq-2': FAQ2,
  'faq-3': FAQ3,
  'faq-4': FAQ4,
  'faq-5': FAQ5,
  'contact-1': Contact1,
  'contact-2': Contact2,
  'contact-3': Contact3,
  'contact-4': Contact4,
  'contact-5': Contact5,
  'contact-6': Contact6,
  'contact-7': Contact7,
};

export default async function BlockPage({ params }: PageProps) {
  const { blockId } = await params;
  const block = getBlockById(blockId);

  if (!block) {
    notFound();
  }

  const BlockComponent = componentMap[blockId];

  if (!BlockComponent) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="capitalize">
                {block.category}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Block Info */}
      <section className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 py-12">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              {block.name}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
              {block.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {block.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Block Preview */}
      <section className="container mx-auto px-6 md:px-8 lg:px-12 py-12">
        <div className="max-w-7xl mx-auto">
          <BlockPreview block={block}>
            <BlockComponent {...block.previewProps} />
          </BlockPreview>
        </div>
      </section>

      {/* Props Documentation */}
      {block.props && block.props.length > 0 && (
        <section className="container mx-auto px-6 md:px-8 lg:px-12 py-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Props</h2>
            <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Default
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-950 divide-y divide-gray-200 dark:divide-gray-800">
                    {block.props.map((prop) => (
                      <tr key={prop.name}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <code className="text-sm font-mono text-primary">
                            {prop.name}
                          </code>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <code className="text-sm font-mono text-gray-600 dark:text-gray-400">
                            {prop.type}
                          </code>
                        </td>
                        <td className="px-6 py-4">
                          {prop.default ? (
                            <code className="text-sm font-mono text-gray-600 dark:text-gray-400">
                              {prop.default}
                            </code>
                          ) : (
                            <span className="text-sm text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                          {prop.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Installation Instructions */}
      <section className="container mx-auto px-6 md:px-8 lg:px-12 py-12 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">How to use</h2>
          <div className="space-y-4 prose dark:prose-invert max-w-none">
            <div>
              <h3 className="text-lg font-semibold mb-2">1. Install dependencies</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                First, install the required dependencies:
              </p>
              <div className="space-y-2">
                {block.dependencies.filter(dep => !dep.command).length > 0 && (
                  <div className="p-4 rounded-lg bg-gray-900 text-gray-100 font-mono text-sm">
                    npm install {block.dependencies.filter(dep => !dep.command).map(dep => dep.name).join(' ')}
                  </div>
                )}
                {block.dependencies.filter(dep => dep.command).map((dep, index) => (
                  <div key={index} className="p-4 rounded-lg bg-gray-900 text-gray-100 font-mono text-sm">
                    {dep.command}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">2. Copy the code</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Copy the component code from the "Code" tab above and paste it into your project.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">3. Customize</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Adjust colors, spacing and text according to your design system.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}