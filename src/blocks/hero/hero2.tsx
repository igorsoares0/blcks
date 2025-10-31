import { Sparkles } from 'lucide-react';

interface Hero2Props {
  title?: string;
  description?: string;
  primaryCTA?: string;
  secondaryCTA?: string;
}

export default function Hero2({
  title = 'Transform your ideas into reality',
  description = 'Complete platform to create, launch and scale your digital projects with speed and confidence.',
  primaryCTA = 'Get Started Free',
  secondaryCTA = 'Schedule Demo'
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
}