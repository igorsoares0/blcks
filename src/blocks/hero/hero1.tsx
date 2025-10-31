import { ArrowRight } from 'lucide-react';

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
  primaryCTA = 'Get Started',
  secondaryCTA = 'View Examples',
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
}