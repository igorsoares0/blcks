import { Calendar, Plus, Wrench, Bug, Zap, AlertCircle, ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ChangelogItem {
  type: 'added' | 'fixed' | 'improved' | 'changed' | 'removed';
  text: string;
}

interface ChangelogEntry {
  version: string;
  date: string;
  changes: ChangelogItem[];
}

interface Changelog2Props {
  title?: string;
  subtitle?: string;
  entries?: ChangelogEntry[];
}

const changeTypeConfig = {
  added: {
    icon: Plus,
    label: 'Added',
    color: 'text-green-600 dark:text-green-400',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    borderColor: 'border-green-200 dark:border-green-800'
  },
  fixed: {
    icon: Bug,
    label: 'Fixed',
    color: 'text-red-600 dark:text-red-400',
    bgColor: 'bg-red-100 dark:bg-red-900/30',
    borderColor: 'border-red-200 dark:border-red-800'
  },
  improved: {
    icon: Zap,
    label: 'Improved',
    color: 'text-blue-600 dark:text-blue-400',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
    borderColor: 'border-blue-200 dark:border-blue-800'
  },
  changed: {
    icon: Wrench,
    label: 'Changed',
    color: 'text-yellow-600 dark:text-yellow-400',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
    borderColor: 'border-yellow-200 dark:border-yellow-800'
  },
  removed: {
    icon: AlertCircle,
    label: 'Removed',
    color: 'text-gray-600 dark:text-gray-400',
    bgColor: 'bg-gray-100 dark:bg-gray-900/30',
    borderColor: 'border-gray-200 dark:border-gray-800'
  }
};

export default function Changelog2({
  title = 'Changelog',
  subtitle = 'All notable changes to this project will be documented here',
  entries = [
    {
      version: '2.1.0',
      date: 'March 15, 2024',
      changes: [
        { type: 'added', text: 'New dark mode toggle with smooth transitions' },
        { type: 'added', text: 'Keyboard shortcuts for quick navigation' },
        { type: 'improved', text: 'Performance optimization for large datasets' },
        { type: 'fixed', text: 'Login form validation error messages' }
      ]
    },
    {
      version: '2.0.0',
      date: 'March 1, 2024',
      changes: [
        { type: 'added', text: 'Complete UI redesign with modern interface' },
        { type: 'added', text: 'Real-time collaboration features' },
        { type: 'changed', text: 'Updated API endpoints structure' },
        { type: 'removed', text: 'Deprecated legacy authentication system' },
        { type: 'fixed', text: 'Memory leaks in data synchronization' }
      ]
    },
    {
      version: '1.5.2',
      date: 'February 20, 2024',
      changes: [
        { type: 'fixed', text: 'Critical security vulnerability in file upload' },
        { type: 'fixed', text: 'Date picker timezone issues' },
        { type: 'improved', text: 'Error handling and user feedback' }
      ]
    },
    {
      version: '1.5.0',
      date: 'February 10, 2024',
      changes: [
        { type: 'added', text: 'Export data to CSV and PDF formats' },
        { type: 'added', text: 'Advanced filtering and search capabilities' },
        { type: 'improved', text: 'Mobile responsive design' },
        { type: 'changed', text: 'Updated dependencies to latest versions' }
      ]
    }
  ]
}: Changelog2Props) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
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

        {/* Changelog Entries - Card Layout */}
        <div className="max-w-4xl mx-auto space-y-6">
          {entries.map((entry, entryIndex) => {
            const isMajorVersion = entry.version.split('.')[1] === '0' && entry.version.split('.')[2] === '0';

            return (
              <div
                key={entryIndex}
                className={`group relative bg-white dark:bg-gray-900 rounded-2xl border-2 transition-all duration-300 hover:shadow-lg ${
                  isMajorVersion
                    ? 'border-primary shadow-md'
                    : 'border-gray-200 dark:border-gray-800 hover:border-primary/50'
                }`}
              >
                {/* Card Header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-800">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Badge
                        variant={isMajorVersion ? 'default' : 'secondary'}
                        className="text-lg font-bold px-4 py-1"
                      >
                        v{entry.version}
                      </Badge>
                      {isMajorVersion && (
                        <Badge variant="outline" className="text-xs border-primary text-primary">
                          Major Release
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <Calendar className="h-4 w-4" />
                      <span>{entry.date}</span>
                    </div>
                  </div>
                </div>

                {/* Card Body - Changes */}
                <div className="p-6">
                  <div className="space-y-3">
                    {entry.changes.map((change, changeIndex) => {
                      const config = changeTypeConfig[change.type];
                      const Icon = config.icon;

                      return (
                        <div
                          key={changeIndex}
                          className={`flex items-start gap-3 p-4 rounded-lg border transition-all duration-200 hover:scale-[1.02] ${config.bgColor} ${config.borderColor}`}
                        >
                          {/* Icon */}
                          <div className={`shrink-0 mt-0.5 ${config.color}`}>
                            <Icon className="h-5 w-5" />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className={`text-xs font-semibold uppercase tracking-wide ${config.color}`}>
                                {config.label}
                              </span>
                            </div>
                            <p className="text-sm text-gray-900 dark:text-gray-100 leading-relaxed">
                              {change.text}
                            </p>
                          </div>

                          {/* Arrow indicator */}
                          <ChevronRight className={`shrink-0 h-5 w-5 opacity-0 group-hover:opacity-100 transition-opacity ${config.color}`} />
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Decorative gradient bar */}
                {isMajorVersion && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/60 to-primary rounded-b-2xl" />
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-800">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 text-center">
              Change Types
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {Object.entries(changeTypeConfig).map(([type, config]) => {
                const Icon = config.icon;
                return (
                  <div
                    key={type}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800"
                  >
                    <Icon className={`h-4 w-4 ${config.color}`} />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {config.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
