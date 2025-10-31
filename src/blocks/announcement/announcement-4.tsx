import { Zap, X, Clock, ArrowRight } from 'lucide-react';

interface Announcement4Props {
  badge?: string;
  title?: string;
  description?: string;
  primaryCTA?: string;
  primaryHref?: string;
  secondaryCTA?: string;
  secondaryHref?: string;
  showTimer?: boolean;
  timerLabel?: string;
  timerValue?: string;
  showClose?: boolean;
}

export default function Announcement4({
  badge = 'Limited Time',
  title = 'Special Launch Offer - Get 50% off Pro Plan',
  description = 'Upgrade now and unlock all premium features',
  primaryCTA = 'Claim Offer',
  primaryHref = '#',
  secondaryCTA = 'Learn More',
  secondaryHref = '#',
  showTimer = true,
  timerLabel = 'Ends in',
  timerValue = '23:59:45',
  showClose = true
}: Announcement4Props) {
  return (
    <div className="w-full bg-gradient-to-r from-primary via-primary to-primary/90 dark:from-primary dark:via-primary/90 dark:to-primary/80 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 py-5 relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Left Content */}
          <div className="flex flex-col sm:flex-row items-center gap-4 flex-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/20 dark:bg-white/10 backdrop-blur-sm px-4 py-1.5 border border-white/20">
              <Zap className="h-4 w-4 text-white" fill="currentColor" />
              <span className="text-xs font-bold text-white uppercase tracking-wide">
                {badge}
              </span>
            </div>

            {/* Text Content */}
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-base md:text-lg font-bold text-white mb-1">
                {title}
              </h3>
              <p className="text-xs md:text-sm text-white/90">
                {description}
              </p>
            </div>
          </div>

          {/* Right Content - CTAs and Timer */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            {/* Timer */}
            {showTimer && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20">
                <Clock className="h-4 w-4 text-white" />
                <div className="flex items-baseline gap-1.5">
                  <span className="text-xs text-white/80 font-medium">
                    {timerLabel}
                  </span>
                  <span className="text-sm font-mono font-bold text-white tabular-nums">
                    {timerValue}
                  </span>
                </div>
              </div>
            )}

            {/* CTAs */}
            <div className="flex items-center gap-2">
              <a
                href={primaryHref}
                className="inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all bg-white text-primary hover:bg-white/90 h-9 px-5 shadow-lg hover:shadow-xl hover:scale-105"
              >
                {primaryCTA}
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </a>
              {secondaryCTA && (
                <a
                  href={secondaryHref}
                  className="inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-colors border-2 border-white/30 bg-transparent text-white hover:bg-white/10 h-9 px-5"
                >
                  {secondaryCTA}
                </a>
              )}
            </div>
          </div>

          {/* Close Button */}
          {showClose && (
            <button
              className="absolute top-3 right-3 lg:relative lg:top-auto lg:right-auto p-1.5 rounded-md hover:bg-white/10 transition-colors group"
              aria-label="Close announcement"
            >
              <X className="h-4 w-4 text-white/70 group-hover:text-white transition-colors" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
