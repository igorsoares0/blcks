import { ArrowRight } from 'lucide-react';

interface CTA1Props {
  title?: string;
  description?: string;
  primaryCTA?: string;
  secondaryCTA?: string;
}

export default function CTA1({
  title = 'Ready to get started?',
  description = 'Join thousands of developers who are already building incredible projects.',
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
}