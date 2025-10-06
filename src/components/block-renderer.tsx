'use client';

import Hero1 from '@/blocks/hero/hero1';
import Hero2 from '@/blocks/hero/hero2';
import Features1 from '@/blocks/features/features1';
import CTA1 from '@/blocks/cta/cta1';
import Navbar1 from '@/blocks/navbar/navbar1';
import Footer1 from '@/blocks/footer/footer-1';
import Announcement1 from '@/blocks/announcement/announcement-1';
import About1 from '@/blocks/about/about-1';
import Blog1 from '@/blocks/blog/blog-1';
import BlogPost1 from '@/blocks/blog/blog-post-1';
import Pricing1 from '@/blocks/pricing/pricing-1';
import Services1 from '@/blocks/services/services-1';
import Changelog1 from '@/blocks/changelog/changelog-1';
import Login1 from '@/blocks/auth/login-1';
import Signup1 from '@/blocks/auth/signup-1';
import Testimonial1 from '@/blocks/testimonial/testimonial-1';
import FAQ1 from '@/blocks/faq/faq-1';
import { BlockMetadata } from '@/lib/blocks-registry';

const componentMap: Record<string, React.ComponentType<any>> = {
  'navbar-1': Navbar1,
  'hero-1': Hero1,
  'hero-2': Hero2,
  'features-1': Features1,
  'cta-1': CTA1,
  'footer-1': Footer1,
  'announcement-1': Announcement1,
  'about-1': About1,
  'blog-1': Blog1,
  'blog-post-1': BlogPost1,
  'pricing-1': Pricing1,
  'services-1': Services1,
  'changelog-1': Changelog1,
  'login-1': Login1,
  'signup-1': Signup1,
  'testimonial-1': Testimonial1,
  'faq-1': FAQ1,
};

export default function BlockRenderer({ block }: { block: BlockMetadata }) {
  const Component = componentMap[block.id];

  if (!Component) {
    return <div>Component not found</div>;
  }

  return <Component {...block.previewProps} />;
}
