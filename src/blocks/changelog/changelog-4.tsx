import { Calendar, Plus, Wrench, Bug, Zap, AlertCircle, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ChangelogItem {
  type: 'added' | 'fixed' | 'improved' | 'changed' | 'removed';
  text: string;
}

interface ChangelogEntry {
  version: string;
  date: string;
  tag?: string;
  changes: ChangelogItem[];
  link?: string;
}

interface Changelog4Props {
  title?: string;
  subtitle?: string;
  entries?: ChangelogEntry[];
}

const changeTypeConfig = {
  added: {
    icon: Plus,
    label: 'Added',
    color: 'text-green-600 dark:text-green-400',
    badgeVariant: 'default' as const
  },
  fixed: {
    icon: Bug,
    label: 'Fixed',
    color: 'text-red-600 dark:text-red-400',
    badgeVariant: 'destructive' as const
  },
  improved: {
    icon: Zap,
    label: 'Improved',
    color: 'text-blue-600 dark:text-blue-400',
    badgeVariant: 'default' as const
  },
  changed: {
    icon: Wrench,
    label: 'Changed',
    color: 'text-orange-600 dark:text-orange-400',
    badgeVariant: 'secondary' as const
  },
  removed: {
    icon: AlertCircle,
    label: 'Removed',
    color: 'text-gray-600 dark:text-gray-400',
    badgeVariant: 'outline' as const
  }
};

export default function Changelog4({
  title = 'Release Notes',
  subtitle = 'Track all the latest updates and improvements to our platform',
  entries = [
    {
      version: '4.2.0',
      date: 'May 1, 2024',
      tag: 'Latest',
      link: '#',
      changes: [
        { type: 'added', text: 'Introduced advanced search with filters and sorting' },
        { type: 'added', text: 'New dashboard widgets for better data visualization' },
        { type: 'improved', text: 'Enhanced loading speed by 40% across all pages' },
        { type: 'fixed', text: 'Resolved notification delivery issues' }
      ]
    },
    {
      version: '4.1.5',
      date: 'April 20, 2024',
      link: '#',
      changes: [
        { type: 'fixed', text: 'Fixed critical authentication bug affecting mobile users' },
        { type: 'fixed', text: 'Corrected timezone display issues in reports' },
        { type: 'improved', text: 'Optimized database queries for better performance' }
      ]
    },
    {
      version: '4.1.0',
      date: 'April 10, 2024',
      link: '#',
      changes: [
        { type: 'added', text: 'Multi-language support for 15 new languages' },
        { type: 'added', text: 'Integration with popular third-party tools' },
        { type: 'changed', text: 'Redesigned settings page with improved UX' },
        { type: 'improved', text: 'Better error messages and user feedback' }
      ]
    },
    {
      version: '4.0.0',
      date: 'March 28, 2024',
      tag: 'Major',
      link: '#',
      changes: [
        { type: 'added', text: 'Complete platform redesign with modern UI' },
        { type: 'added', text: 'New API v4 with improved performance' },
        { type: 'changed', text: 'Updated authentication system for better security' },
        { type: 'removed', text: 'Deprecated API v2 endpoints' }
      ]
    },
    {
      version: '3.9.8',
      date: 'March 15, 2024',
      link: '#',
      changes: [
        { type: 'fixed', text: 'Security patch for XSS vulnerability' },
        { type: 'improved', text: 'Reduced memory usage in background processes' }
      ]
    }
  ]
}: Changelog4Props) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900 dark:text-white">
            {title}
          </h2>
          <p className="max-w-[700px] text-lg text-gray-600 dark:text-gray-400">
            {subtitle}
          </p>
        </div>

        {/* Changelog List - Compact Style */}
        <div className="max-w-4xl mx-auto space-y-8">
          {entries.map((entry, entryIndex) => {
            // Group changes by type
            const groupedChanges = entry.changes.reduce((acc, change) => {
              if (!acc[change.type]) {
                acc[change.type] = [];
              }
              acc[change.type].push(change);
              return acc;
            }, {} as Record<string, ChangelogItem[]>);

            return (
              <div
                key={entryIndex}
                className="bg-white dark:bg-gray-950 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Entry Header */}
                <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        v{entry.version}
                      </h3>
                      {entry.tag && (
                        <Badge variant="default" className="text-xs">
                          {entry.tag}
                        </Badge>
                      )}
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <Calendar className="h-4 w-4" />
                        <span>{entry.date}</span>
                      </div>
                    </div>
                    {entry.link && (
                      <a
                        href={entry.link}
                        className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                      >
                        View details
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Entry Body - Grouped by Type */}
                <div className="p-6">
                  <div className="space-y-4">
                    {Object.entries(groupedChanges).map(([type, changes]) => {
                      const config = changeTypeConfig[type as keyof typeof changeTypeConfig];
                      const Icon = config.icon;

                      return (
                        <div key={type}>
                          {/* Type Header */}
                          <div className="flex items-center gap-2 mb-3">
                            <div className={`flex items-center justify-center w-6 h-6 rounded ${config.color.replace('text-', 'bg-').replace('600', '100').replace('400', '900/30')}`}>
                              <Icon className={`h-4 w-4 ${config.color}`} />
                            </div>
                            <span className={`text-sm font-semibold uppercase tracking-wide ${config.color}`}>
                              {config.label}
                            </span>
                            <Badge variant={config.badgeVariant} className="h-5 px-2 text-xs">
                              {changes.length}
                            </Badge>
                          </div>

                          {/* Changes List */}
                          <ul className="space-y-2 ml-8">
                            {changes.map((change, idx) => (
                              <li
                                key={idx}
                                className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed flex items-start gap-2"
                              >
                                <span className={`inline-block w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${config.color.replace('text-', 'bg-')}`} />
                                <span>{change.text}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Stats */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">{entries.length}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Releases</div>
            </div>
            <div className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 p-4 text-center">
              <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">
                {entries.reduce((sum, e) => sum + e.changes.filter(c => c.type === 'added').length, 0)}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Features Added</div>
            </div>
            <div className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 p-4 text-center">
              <div className="text-2xl font-bold text-red-600 dark:text-red-400 mb-1">
                {entries.reduce((sum, e) => sum + e.changes.filter(c => c.type === 'fixed').length, 0)}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Bugs Fixed</div>
            </div>
            <div className="bg-white dark:bg-gray-950 rounded-lg border border-gray-200 dark:border-gray-800 p-4 text-center">
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                {entries.reduce((sum, e) => sum + e.changes.filter(c => c.type === 'improved').length, 0)}
              </div>
              <div className="text-xs text-gray-600 dark:text-gray-400">Improvements</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
