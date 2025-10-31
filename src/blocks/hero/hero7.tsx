import { ArrowRight, Mail } from 'lucide-react';

interface Hero7Props {
  badge?: string;
  title?: string;
  description?: string;
  emailPlaceholder?: string;
  ctaText?: string;
  disclaimer?: string;
  trustedByText?: string;
  logos?: {
    name: string;
    text: string;
  }[];
}

export default function Hero7({
  badge = 'Now in Beta',
  title = 'The modern way to build your product',
  description = 'Join thousands of developers who are already building faster with our platform. Get early access and exclusive benefits.',
  emailPlaceholder = 'Enter your email',
  ctaText = 'Get Started',
  disclaimer = 'No credit card required. 14-day free trial.',
  trustedByText = 'Trusted by teams from',
  logos = [
    { name: 'Company A', text: 'VERCEL' },
    { name: 'Company B', text: 'NEXTJS' },
    { name: 'Company C', text: 'STRIPE' },
    { name: 'Company D', text: 'GITHUB' }
  ]
}: Hero7Props) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
            {badge}
          </div>

          {/* Title */}
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl text-gray-900 dark:text-white">
            {title}
          </h1>

          {/* Description */}
          <p className="max-w-2xl text-lg md:text-xl text-gray-600 dark:text-gray-400">
            {description}
          </p>

          {/* Newsletter Form */}
          <div className="w-full max-w-md space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  placeholder={emailPlaceholder}
                  className="w-full h-12 pl-10 pr-4 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
              <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 whitespace-nowrap">
                {ctaText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
            </div>

            {/* Disclaimer */}
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {disclaimer}
            </p>
          </div>

          {/* Trusted By Section */}
          <div className="pt-8 space-y-4 w-full">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {trustedByText}
            </p>

            {/* Logo Grid */}
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {logos.map((logo, index) => (
                <div
                  key={index}
                  className="flex items-center justify-center"
                >
                  <span className="text-xl font-bold text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-400 transition-colors">
                    {logo.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Indicators */}
          <div className="flex items-center gap-6 pt-6 text-sm text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <span>Live support</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <span>99.9% uptime</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-500"></div>
              <span>SOC 2 certified</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
