import { Sparkles, Zap, Bug, Shield, TrendingUp, Wrench, Plus, ArrowRight, Calendar } from 'lucide-react';

interface ChangeItem {
  type: 'feature' | 'improvement' | 'fix' | 'security';
  title: string;
  description: string;
}

interface Release {
  version: string;
  date: string;
  title: string;
  highlights?: string;
  changes: ChangeItem[];
  featured?: boolean;
}

interface Changelog5Props {
  badge?: string;
  title?: string;
  subtitle?: string;
  releases?: Release[];
  viewAllText?: string;
}

export default function Changelog5({
  badge = 'Product Updates',
  title = 'What\'s new in our platform',
  subtitle = 'Stay up to date with the latest features, improvements, and fixes. We ship updates regularly to make your experience better.',
  releases = [
    {
      version: 'v2.5.0',
      date: '2024-01-15',
      title: 'Advanced Analytics & Performance Boost',
      highlights: 'Major update with new analytics dashboard and 40% performance improvement',
      featured: true,
      changes: [
        {
          type: 'feature',
          title: 'Real-time Analytics Dashboard',
          description: 'New comprehensive analytics dashboard with real-time metrics, custom date ranges, and exportable reports.'
        },
        {
          type: 'feature',
          title: 'Team Collaboration Tools',
          description: 'Invite team members, assign roles, and collaborate in real-time with comments and notifications.'
        },
        {
          type: 'improvement',
          title: 'Performance Optimization',
          description: 'Reduced load times by 40% with improved caching and code optimization.'
        },
        {
          type: 'security',
          title: 'Enhanced Security',
          description: 'Added two-factor authentication and improved encryption for sensitive data.'
        }
      ]
    },
    {
      version: 'v2.4.2',
      date: '2024-01-08',
      title: 'Bug Fixes & Stability',
      changes: [
        {
          type: 'fix',
          title: 'Fixed Export Issues',
          description: 'Resolved problems with CSV exports containing special characters.'
        },
        {
          type: 'fix',
          title: 'Mobile Responsiveness',
          description: 'Fixed layout issues on mobile devices for the settings page.'
        },
        {
          type: 'improvement',
          title: 'Improved Error Messages',
          description: 'Made error messages more descriptive and actionable for users.'
        }
      ]
    },
    {
      version: 'v2.4.0',
      date: '2024-01-01',
      title: 'API Integration & Webhooks',
      changes: [
        {
          type: 'feature',
          title: 'Webhooks Support',
          description: 'Configure webhooks to receive real-time notifications about events in your account.'
        },
        {
          type: 'feature',
          title: 'REST API v2',
          description: 'New API version with improved endpoints, better documentation, and rate limiting.'
        },
        {
          type: 'improvement',
          title: 'Faster Search',
          description: 'Implemented new search algorithm that is 3x faster for large datasets.'
        }
      ]
    },
    {
      version: 'v2.3.5',
      date: '2023-12-20',
      title: 'UI/UX Improvements',
      changes: [
        {
          type: 'improvement',
          title: 'Dark Mode Refinements',
          description: 'Improved contrast and readability in dark mode across all components.'
        },
        {
          type: 'feature',
          title: 'Keyboard Shortcuts',
          description: 'Added keyboard shortcuts for common actions to improve productivity.'
        },
        {
          type: 'fix',
          title: 'Form Validation',
          description: 'Fixed validation issues in multi-step forms.'
        }
      ]
    }
  ],
  viewAllText = 'View Full Changelog'
}: Changelog5Props) {
  const getChangeIcon = (type: string) => {
    switch (type) {
      case 'feature':
        return <Sparkles className="h-4 w-4" />;
      case 'improvement':
        return <TrendingUp className="h-4 w-4" />;
      case 'fix':
        return <Bug className="h-4 w-4" />;
      case 'security':
        return <Shield className="h-4 w-4" />;
      default:
        return <Wrench className="h-4 w-4" />;
    }
  };

  const getChangeBadgeColor = (type: string) => {
    switch (type) {
      case 'feature':
        return 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'improvement':
        return 'bg-green-100 dark:bg-green-950 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800';
      case 'fix':
        return 'bg-orange-100 dark:bg-orange-950 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800';
      case 'security':
        return 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800';
      default:
        return 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700';
    }
  };

  const getChangeTypeLabel = (type: string) => {
    switch (type) {
      case 'feature':
        return 'New';
      case 'improvement':
        return 'Improved';
      case 'fix':
        return 'Fixed';
      case 'security':
        return 'Security';
      default:
        return 'Update';
    }
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
            <Zap className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">{badge}</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900 dark:text-white max-w-3xl">
            {title}
          </h2>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
            {subtitle}
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-0 md:left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent" />

            {/* Releases */}
            <div className="space-y-8 md:space-y-12">
              {releases.map((release, index) => (
                <div key={index} className="relative pl-8 md:pl-20">
                  {/* Timeline Dot */}
                  <div className="absolute left-0 md:left-8 top-0 w-0 h-0 flex items-center justify-center -translate-x-1/2">
                    <div className={`w-4 h-4 rounded-full border-4 ${
                      release.featured
                        ? 'bg-primary border-primary shadow-lg shadow-primary/50'
                        : 'bg-white dark:bg-gray-900 border-primary/50'
                    }`} />
                  </div>

                  {/* Release Card */}
                  <div className={`group bg-white dark:bg-gray-900 rounded-2xl p-6 md:p-8 border-2 transition-all duration-300 hover:shadow-xl ${
                    release.featured
                      ? 'border-primary shadow-lg shadow-primary/10'
                      : 'border-gray-200 dark:border-gray-800 hover:border-primary/50'
                  }`}>
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-semibold">
                            {release.version}
                          </span>
                          {release.featured && (
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary text-white text-xs font-semibold">
                              <Sparkles className="h-3 w-3" />
                              Latest
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white mb-2">
                          {release.title}
                        </h3>
                        {release.highlights && (
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                            {release.highlights}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="h-4 w-4" />
                        {release.date}
                      </div>
                    </div>

                    {/* Changes List */}
                    <div className="space-y-3">
                      {release.changes.map((change, changeIndex) => (
                        <div key={changeIndex} className="flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border ${getChangeBadgeColor(change.type)}`}>
                            {getChangeIcon(change.type)}
                            {getChangeTypeLabel(change.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                              {change.title}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                              {change.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <a
            href="#"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-medium border-2 border-gray-200 dark:border-gray-800 hover:border-primary dark:hover:border-primary transition-colors"
          >
            {viewAllText}
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
