import { Calendar, Plus, Wrench, Bug, Zap, AlertCircle, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ChangelogItem {
  type: 'added' | 'fixed' | 'improved' | 'changed' | 'removed';
  text: string;
}

interface ChangelogEntry {
  version: string;
  date: string;
  changes: ChangelogItem[];
  featured?: boolean;
}

interface Changelog3Props {
  title?: string;
  subtitle?: string;
  entries?: ChangelogEntry[];
  ctaText?: string;
  ctaLink?: string;
}

const changeTypeConfig = {
  added: {
    icon: Plus,
    label: 'New',
    color: 'text-emerald-600 dark:text-emerald-400',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950',
    dotColor: 'bg-emerald-500'
  },
  fixed: {
    icon: Bug,
    label: 'Fix',
    color: 'text-rose-600 dark:text-rose-400',
    bgColor: 'bg-rose-50 dark:bg-rose-950',
    dotColor: 'bg-rose-500'
  },
  improved: {
    icon: Zap,
    label: 'Improved',
    color: 'text-sky-600 dark:text-sky-400',
    bgColor: 'bg-sky-50 dark:bg-sky-950',
    dotColor: 'bg-sky-500'
  },
  changed: {
    icon: Wrench,
    label: 'Changed',
    color: 'text-amber-600 dark:text-amber-400',
    bgColor: 'bg-amber-50 dark:bg-amber-950',
    dotColor: 'bg-amber-500'
  },
  removed: {
    icon: AlertCircle,
    label: 'Removed',
    color: 'text-slate-600 dark:text-slate-400',
    bgColor: 'bg-slate-50 dark:bg-slate-950',
    dotColor: 'bg-slate-500'
  }
};

export default function Changelog3({
  title = 'Product Updates',
  subtitle = 'Stay up to date with the latest features and improvements',
  ctaText = 'Subscribe to Updates',
  ctaLink = '#',
  entries = [
    {
      version: '3.0.0',
      date: 'April 1, 2024',
      featured: true,
      changes: [
        { type: 'added', text: 'Revolutionary AI-powered code suggestions' },
        { type: 'added', text: 'Real-time collaboration with team members' },
        { type: 'improved', text: 'Complete redesign of the user interface' },
        { type: 'changed', text: 'New pricing model with flexible plans' }
      ]
    },
    {
      version: '2.8.5',
      date: 'March 25, 2024',
      changes: [
        { type: 'fixed', text: 'Memory leak in background sync process' },
        { type: 'fixed', text: 'Performance issues with large files' },
        { type: 'improved', text: 'Faster startup time' }
      ]
    },
    {
      version: '2.8.0',
      date: 'March 15, 2024',
      changes: [
        { type: 'added', text: 'Dark mode support for all components' },
        { type: 'added', text: 'Export to multiple file formats' },
        { type: 'improved', text: 'Better mobile responsive design' },
        { type: 'fixed', text: 'Email notification settings not saving' }
      ]
    },
    {
      version: '2.7.2',
      date: 'March 5, 2024',
      changes: [
        { type: 'fixed', text: 'Critical security vulnerability patched' },
        { type: 'improved', text: 'API response time optimization' },
        { type: 'changed', text: 'Updated third-party dependencies' }
      ]
    }
  ]
}: Changelog3Props) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
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

        {/* Timeline Layout */}
        <div className="max-w-5xl mx-auto">
          <div className="space-y-12">
            {entries.map((entry, entryIndex) => {
              return (
                <div key={entryIndex} className="relative">
                  {/* Version Header */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                    <div className="flex items-center gap-3">
                      <Badge
                        variant={entry.featured ? 'default' : 'secondary'}
                        className="text-base font-bold px-3 py-1"
                      >
                        v{entry.version}
                      </Badge>
                      {entry.featured && (
                        <Badge variant="outline" className="text-xs border-primary text-primary">
                          Featured Release
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                      <Calendar className="h-4 w-4" />
                      <span>{entry.date}</span>
                    </div>
                  </div>

                  {/* Changes List */}
                  <div className={`grid gap-4 ${entry.featured ? 'md:grid-cols-2' : 'md:grid-cols-1'}`}>
                    {entry.changes.map((change, changeIndex) => {
                      const config = changeTypeConfig[change.type];
                      const Icon = config.icon;

                      return (
                        <div
                          key={changeIndex}
                          className={`group relative flex items-start gap-4 p-5 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-200 ${config.bgColor}`}
                        >
                          {/* Icon Circle */}
                          <div className={`shrink-0 flex items-center justify-center w-10 h-10 rounded-full ${config.bgColor} border-2 border-gray-200 dark:border-gray-800`}>
                            <Icon className={`h-5 w-5 ${config.color}`} />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0 pt-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className={`text-xs font-bold uppercase tracking-wider ${config.color}`}>
                                {config.label}
                              </span>
                              <div className={`h-1 w-1 rounded-full ${config.dotColor}`} />
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
                              {change.text}
                            </p>
                          </div>

                          {/* Hover Arrow */}
                          <ArrowRight className={`shrink-0 h-5 w-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200 ${config.color}`} />
                        </div>
                      );
                    })}
                  </div>

                  {/* Divider Line (except for last entry) */}
                  {entryIndex < entries.length - 1 && (
                    <div className="mt-12 w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
                  )}
                </div>
              );
            })}
          </div>

          {/* CTA Section */}
          <div className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/20">
              <div className="flex-1 text-center md:text-left">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Never miss an update
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Get notified when we ship new features and improvements
                </p>
              </div>
              <Button size="lg" className="shrink-0">
                <a href={ctaLink} className="flex items-center gap-2">
                  {ctaText}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
