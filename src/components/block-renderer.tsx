'use client';

import { BlockMetadata } from '@/lib/blocks-registry';
import dynamic from 'next/dynamic';

// Dynamically import all blocks
const componentMap: Record<string, React.ComponentType<any>> = {
  // Navbar
  'navbar-1': dynamic(() => import('@/blocks/navbar/navbar1')),
  'navbar-2': dynamic(() => import('@/blocks/navbar/navbar-2')),
  'navbar-3': dynamic(() => import('@/blocks/navbar/navbar-3')),
  'navbar-4': dynamic(() => import('@/blocks/navbar/navbar-4')),
  'navbar-5': dynamic(() => import('@/blocks/navbar/navbar-5')),

  // Hero
  'hero-1': dynamic(() => import('@/blocks/hero/hero1')),
  'hero-2': dynamic(() => import('@/blocks/hero/hero2')),
  'hero-3': dynamic(() => import('@/blocks/hero/hero3')),
  'hero-4': dynamic(() => import('@/blocks/hero/hero4')),
  'hero-5': dynamic(() => import('@/blocks/hero/hero5')),
  'hero-6': dynamic(() => import('@/blocks/hero/hero6')),
  'hero-7': dynamic(() => import('@/blocks/hero/hero7')),
  'hero-8': dynamic(() => import('@/blocks/hero/hero8')),
  'hero-9': dynamic(() => import('@/blocks/hero/hero9')),
  'hero-10': dynamic(() => import('@/blocks/hero/hero10')),

  // Features
  'features-1': dynamic(() => import('@/blocks/features/features1')),
  'features-2': dynamic(() => import('@/blocks/features/features-2')),
  'features-3': dynamic(() => import('@/blocks/features/features-3')),
  'features-4': dynamic(() => import('@/blocks/features/features-4')),
  'features-5': dynamic(() => import('@/blocks/features/features-5')),

  // CTA
  'cta-1': dynamic(() => import('@/blocks/cta/cta1')),
  'cta-2': dynamic(() => import('@/blocks/cta/cta-2')),
  'cta-3': dynamic(() => import('@/blocks/cta/cta-3')),
  'cta-4': dynamic(() => import('@/blocks/cta/cta-4')),
  'cta-5': dynamic(() => import('@/blocks/cta/cta-5')),
  'cta-6': dynamic(() => import('@/blocks/cta/cta-6')),
  'cta-7': dynamic(() => import('@/blocks/cta/cta-7')),

  // Footer
  'footer-1': dynamic(() => import('@/blocks/footer/footer-1')),
  'footer-2': dynamic(() => import('@/blocks/footer/footer-2')),
  'footer-3': dynamic(() => import('@/blocks/footer/footer-3')),
  'footer-4': dynamic(() => import('@/blocks/footer/footer-4')),
  'footer-5': dynamic(() => import('@/blocks/footer/footer-5')),
  'footer-6': dynamic(() => import('@/blocks/footer/footer-6')),
  'footer-7': dynamic(() => import('@/blocks/footer/footer-7')),

  // Announcement
  'announcement-1': dynamic(() => import('@/blocks/announcement/announcement-1')),
  'announcement-2': dynamic(() => import('@/blocks/announcement/announcement-2')),
  'announcement-3': dynamic(() => import('@/blocks/announcement/announcement-3')),
  'announcement-4': dynamic(() => import('@/blocks/announcement/announcement-4')),
  'announcement-5': dynamic(() => import('@/blocks/announcement/announcement-5')),

  // About
  'about-1': dynamic(() => import('@/blocks/about/about-1')),
  'about-2': dynamic(() => import('@/blocks/about/about-2')),
  'about-3': dynamic(() => import('@/blocks/about/about-3')),
  'about-4': dynamic(() => import('@/blocks/about/about-4')),
  'about-5': dynamic(() => import('@/blocks/about/about-5')),
  'about-6': dynamic(() => import('@/blocks/about/about-6')),
  'about-7': dynamic(() => import('@/blocks/about/about-7')),

  // Blog
  'blog-1': dynamic(() => import('@/blocks/blog/blog-1')),
  'blog-2': dynamic(() => import('@/blocks/blog/blog-2')),
  'blog-3': dynamic(() => import('@/blocks/blog/blog-3')),
  'blog-4': dynamic(() => import('@/blocks/blog/blog-4')),
  'blog-5': dynamic(() => import('@/blocks/blog/blog-5')),
  'blog-post-1': dynamic(() => import('@/blocks/blog/blog-post-1')),
  'blog-post-2': dynamic(() => import('@/blocks/blog/blog-post-2')),
  'blog-post-3': dynamic(() => import('@/blocks/blog/blog-post-3')),
  'blog-post-4': dynamic(() => import('@/blocks/blog/blog-post-4')),
  'blog-post-5': dynamic(() => import('@/blocks/blog/blog-post-5')),

  // Pricing
  'pricing-1': dynamic(() => import('@/blocks/pricing/pricing-1')),
  'pricing-2': dynamic(() => import('@/blocks/pricing/pricing-2')),
  'pricing-3': dynamic(() => import('@/blocks/pricing/pricing-3')),
  'pricing-4': dynamic(() => import('@/blocks/pricing/pricing-4')),
  'pricing-5': dynamic(() => import('@/blocks/pricing/pricing-5')),
  'pricing-6': dynamic(() => import('@/blocks/pricing/pricing-6')),
  'pricing-7': dynamic(() => import('@/blocks/pricing/pricing-7')),

  // Services
  'services-1': dynamic(() => import('@/blocks/services/services-1')),
  'services-2': dynamic(() => import('@/blocks/services/services-2')),
  'services-3': dynamic(() => import('@/blocks/services/services-3')),
  'services-4': dynamic(() => import('@/blocks/services/services-4')),
  'services-5': dynamic(() => import('@/blocks/services/services-5')),
  'services-6': dynamic(() => import('@/blocks/services/services-6')),
  'services-7': dynamic(() => import('@/blocks/services/services-7')),

  // Changelog
  'changelog-1': dynamic(() => import('@/blocks/changelog/changelog-1')),
  'changelog-2': dynamic(() => import('@/blocks/changelog/changelog-2')),
  'changelog-3': dynamic(() => import('@/blocks/changelog/changelog-3')),
  'changelog-4': dynamic(() => import('@/blocks/changelog/changelog-4')),
  'changelog-5': dynamic(() => import('@/blocks/changelog/changelog-5')),

  // Contact
  'contact-1': dynamic(() => import('@/blocks/contact/contact-1')),
  'contact-2': dynamic(() => import('@/blocks/contact/contact-2')),
  'contact-3': dynamic(() => import('@/blocks/contact/contact-3')),
  'contact-4': dynamic(() => import('@/blocks/contact/contact-4')),
  'contact-5': dynamic(() => import('@/blocks/contact/contact-5')),
  'contact-6': dynamic(() => import('@/blocks/contact/contact-6')),
  'contact-7': dynamic(() => import('@/blocks/contact/contact-7')),

  // Auth - Login
  'login-1': dynamic(() => import('@/blocks/auth/login-1')),
  'login-2': dynamic(() => import('@/blocks/auth/login-2')),
  'login-3': dynamic(() => import('@/blocks/auth/login-3')),
  'login-4': dynamic(() => import('@/blocks/auth/login-4')),
  'login-5': dynamic(() => import('@/blocks/auth/login-5')),
  'login-6': dynamic(() => import('@/blocks/auth/login-6')),
  'login-7': dynamic(() => import('@/blocks/auth/login-7')),

  // Auth - Signup
  'signup-1': dynamic(() => import('@/blocks/auth/signup-1')),
  'signup-2': dynamic(() => import('@/blocks/auth/signup-2')),
  'signup-3': dynamic(() => import('@/blocks/auth/signup-3')),
  'signup-4': dynamic(() => import('@/blocks/auth/signup-4')),
  'signup-5': dynamic(() => import('@/blocks/auth/signup-5')),
  'signup-6': dynamic(() => import('@/blocks/auth/signup-6')),
  'signup-7': dynamic(() => import('@/blocks/auth/signup-7')),

  // Testimonial
  'testimonial-1': dynamic(() => import('@/blocks/testimonial/testimonial-1')),
  'testimonial-2': dynamic(() => import('@/blocks/testimonial/testimonial-2')),
  'testimonial-3': dynamic(() => import('@/blocks/testimonial/testimonial-3')),
  'testimonial-4': dynamic(() => import('@/blocks/testimonial/testimonial-4')),
  'testimonial-5': dynamic(() => import('@/blocks/testimonial/testimonial-5')),
  'testimonial-6': dynamic(() => import('@/blocks/testimonial/testimonial-6')),
  'testimonial-7': dynamic(() => import('@/blocks/testimonial/testimonial-7')),

  // FAQ
  'faq-1': dynamic(() => import('@/blocks/faq/faq-1')),
  'faq-2': dynamic(() => import('@/blocks/faq/faq-2')),
  'faq-3': dynamic(() => import('@/blocks/faq/faq-3')),
  'faq-4': dynamic(() => import('@/blocks/faq/faq-4')),
  'faq-5': dynamic(() => import('@/blocks/faq/faq-5')),
};

export default function BlockRenderer({ block }: { block: BlockMetadata }) {
  const Component = componentMap[block.id];

  if (!Component) {
    return (
      <div className="flex items-center justify-center h-full text-gray-400">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800">
            <span className="text-2xl font-bold">
              {block.name.charAt(0)}
            </span>
          </div>
          <p className="mt-2 text-sm">Preview unavailable</p>
        </div>
      </div>
    );
  }

  return <Component {...block.previewProps} />;
}
