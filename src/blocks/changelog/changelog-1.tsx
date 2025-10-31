import { Calendar, Plus, Wrench, Bug, Zap, AlertCircle } from 'lucide-react';

interface ChangelogItem {
  type: 'added' | 'fixed' | 'improved' | 'changed' | 'removed';
  text: string;
}

interface ChangelogEntry {
  version: string;
  date: string;
  changes: ChangelogItem[];
}

interface Changelog1Props {
  title?: string;
  description?: string;
  entries?: ChangelogEntry[];
}

const typeConfig = {
  added: {
    icon: Plus,
    label: 'Added',
    color: 'text-green-600 dark:text-green-400',
    bg: 'bg-green-50 dark:bg-green-950'
  },
  fixed: {
    icon: Bug,
    label: 'Fixed',
    color: 'text-red-600 dark:text-red-400',
    bg: 'bg-red-50 dark:bg-red-950'
  },
  improved: {
    icon: Zap,
    label: 'Improved',
    color: 'text-blue-600 dark:text-blue-400',
    bg: 'bg-blue-50 dark:bg-blue-950'
  },
  changed: {
    icon: Wrench,
    label: 'Changed',
    color: 'text-orange-600 dark:text-orange-400',
    bg: 'bg-orange-50 dark:bg-orange-950'
  },
  removed: {
    icon: AlertCircle,
    label: 'Removed',
    color: 'text-gray-600 dark:text-gray-400',
    bg: 'bg-gray-50 dark:bg-gray-950'
  }
};

export default function Changelog1({
  title = 'Changelog',
  description = 'Track all product updates, improvements and fixes',
  entries = [
    {
      version: '2.1.0',
      date: 'March 15, 2024',
      changes: [
        { type: 'added', text: 'New real-time notification system' },
        { type: 'added', text: 'Support for Google and GitHub authentication' },
        { type: 'improved', text: 'Dashboard performance increased by 40%' },
        { type: 'fixed', text: 'Fixed bug in large file upload' }
      ]
    },
    {
      version: '2.0.0',
      date: 'March 1, 2024',
      changes: [
        { type: 'added', text: 'Completely redesigned interface' },
        { type: 'added', text: 'Native dark mode' },
        { type: 'improved', text: 'REST API v2 with better documentation' },
        { type: 'changed', text: 'Migration to Next.js 15' },
        { type: 'removed', text: 'Deprecated support for older Node.js versions' }
      ]
    },
    {
      version: '1.5.2',
      date: 'February 20, 2024',
      changes: [
        { type: 'fixed', text: 'Fixed data synchronization issue' },
        { type: 'fixed', text: 'Resolved memory error on mobile devices' },
        { type: 'improved', text: 'Improvements in registration form accessibility' }
      ]
    },
    {
      version: '1.5.0',
      date: 'February 10, 2024',
      changes: [
        { type: 'added', text: 'Export reports in PDF and Excel' },
        { type: 'added', text: 'Advanced filters in user listing' },
        { type: 'improved', text: 'Loading speed optimized by 60%' },
        { type: 'changed', text: 'Updated button and input design' }
      ]
    }
  ]
}: Changelog1Props) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>

        {/* Changelog Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {entries.map((entry, index) => (
              <div key={index} className="relative">
                {/* Timeline line */}
                {index !== entries.length - 1 && (
                  <div className="absolute left-6 top-12 bottom-0 w-px bg-gradient-to-b from-primary/50 to-transparent" />
                )}

                <div className="relative">
                  {/* Version Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground font-bold shadow-lg">
                      {entry.version.split('.')[0]}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold">
                        Version {entry.version}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <Calendar className="h-4 w-4" />
                        <span>{entry.date}</span>
                      </div>
                    </div>
                  </div>

                  {/* Changes List */}
                  <div className="ml-16 space-y-3">
                    {entry.changes.map((change, changeIndex) => {
                      const config = typeConfig[change.type];
                      const Icon = config.icon;

                      return (
                        <div
                          key={changeIndex}
                          className={`flex items-start gap-3 p-4 rounded-lg ${config.bg} border border-transparent hover:border-gray-200 dark:hover:border-gray-700 transition-colors`}
                        >
                          <div className={`flex-shrink-0 ${config.color}`}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <span className={`text-xs font-semibold uppercase tracking-wide ${config.color} block mb-1`}>
                              {config.label}
                            </span>
                            <p className="text-gray-700 dark:text-gray-300">
                              {change.text}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="max-w-4xl mx-auto mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
          <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
            Legend
          </h4>
          <div className="flex flex-wrap gap-4">
            {Object.entries(typeConfig).map(([type, config]) => {
              const Icon = config.icon;
              return (
                <div key={type} className="flex items-center gap-2">
                  <Icon className={`h-4 w-4 ${config.color}`} />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {config.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
