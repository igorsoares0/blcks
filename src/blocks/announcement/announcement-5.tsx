import { Megaphone, Users, Sparkles, TrendingUp, ArrowRight, X } from 'lucide-react';

interface Highlight {
  icon: string;
  text: string;
}

interface Announcement5Props {
  title?: string;
  message?: string;
  highlights?: Highlight[];
  ctaText?: string;
  ctaHref?: string;
  backgroundColor?: string;
  showClose?: boolean;
}

export default function Announcement5({
  title = 'Big News!',
  message = 'We just hit 100K users and launched 5 new features',
  highlights = [
    { icon: 'Users', text: '100K+ Users' },
    { icon: 'Sparkles', text: '5 New Features' },
    { icon: 'TrendingUp', text: '99% Uptime' }
  ],
  ctaText = 'See what\'s new',
  ctaHref = '#',
  backgroundColor = 'bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-700 dark:via-indigo-700 dark:to-purple-700',
  showClose = true
}: Announcement5Props) {
  const getIcon = (iconName: string) => {
    const icons: Record<string, React.ReactElement> = {
      Users: <Users className="h-4 w-4" />,
      Sparkles: <Sparkles className="h-4 w-4" />,
      TrendingUp: <TrendingUp className="h-4 w-4" />,
      Megaphone: <Megaphone className="h-4 w-4" />,
    };
    return icons[iconName] || <Sparkles className="h-4 w-4" />;
  };

  return (
    <div className={`w-full ${backgroundColor} relative overflow-hidden`}>
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] animate-[slide_20s_linear_infinite]" />
      </div>

      {/* Floating Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-2 h-2 bg-white/20 rounded-full animate-pulse" />
      <div className="absolute bottom-0 right-1/3 w-3 h-3 bg-white/20 rounded-full animate-pulse delay-75" />

      <div className="container mx-auto px-4 py-4 relative">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          {/* Left Section - Icon & Message */}
          <div className="flex items-center gap-4 flex-1">
            {/* Megaphone Icon */}
            <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex-shrink-0">
              <Megaphone className="h-6 w-6 text-white" />
            </div>

            {/* Text Content */}
            <div className="text-center lg:text-left">
              <div className="flex items-center gap-2 justify-center lg:justify-start mb-1">
                <h3 className="text-sm md:text-base font-bold text-white">
                  {title}
                </h3>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-white/30 text-white backdrop-blur-sm">
                  NEW
                </span>
              </div>
              <p className="text-xs md:text-sm text-white/90">
                {message}
              </p>
            </div>
          </div>

          {/* Middle Section - Highlights */}
          <div className="hidden md:flex items-center gap-3">
            {highlights.map((highlight, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20"
              >
                <div className="text-white/80">
                  {getIcon(highlight.icon)}
                </div>
                <span className="text-xs font-semibold text-white whitespace-nowrap">
                  {highlight.text}
                </span>
              </div>
            ))}
          </div>

          {/* Right Section - CTA */}
          <div className="flex items-center gap-3">
            <a
              href={ctaHref}
              className="inline-flex items-center justify-center rounded-lg text-sm font-semibold transition-all bg-white text-blue-600 hover:bg-white/90 h-9 px-5 shadow-lg hover:shadow-xl hover:scale-105"
            >
              {ctaText}
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>

            {/* Close Button */}
            {showClose && (
              <button
                className="p-1.5 rounded-md hover:bg-white/10 transition-colors group flex-shrink-0"
                aria-label="Close announcement"
              >
                <X className="h-4 w-4 text-white/70 group-hover:text-white transition-colors" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Highlights */}
        <div className="flex md:hidden items-center justify-center gap-2 mt-3">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-white/10 backdrop-blur-sm border border-white/20"
            >
              <div className="text-white/80">
                {getIcon(highlight.icon)}
              </div>
              <span className="text-xs font-semibold text-white">
                {highlight.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
