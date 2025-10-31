import { Bell, ArrowRight } from 'lucide-react';

interface Announcement3Props {
  title?: string;
  message?: string;
  linkText?: string;
  linkHref?: string;
  variant?: 'blue' | 'green' | 'purple' | 'orange';
}

export default function Announcement3({
  title = 'Product Update',
  message = 'Check out the new features we just released',
  linkText = 'View details',
  linkHref = '#',
  variant = 'blue'
}: Announcement3Props) {
  const variantClasses = {
    blue: 'bg-blue-50 dark:bg-blue-950/30 border-blue-200 dark:border-blue-900',
    green: 'bg-green-50 dark:bg-green-950/30 border-green-200 dark:border-green-900',
    purple: 'bg-purple-50 dark:bg-purple-950/30 border-purple-200 dark:border-purple-900',
    orange: 'bg-orange-50 dark:bg-orange-950/30 border-orange-200 dark:border-orange-900'
  };

  const textVariantClasses = {
    blue: 'text-blue-900 dark:text-blue-100',
    green: 'text-green-900 dark:text-green-100',
    purple: 'text-purple-900 dark:text-purple-100',
    orange: 'text-orange-900 dark:text-orange-100'
  };

  const iconVariantClasses = {
    blue: 'text-blue-600 dark:text-blue-400',
    green: 'text-green-600 dark:text-green-400',
    purple: 'text-purple-600 dark:text-purple-400',
    orange: 'text-orange-600 dark:text-orange-400'
  };

  const linkVariantClasses = {
    blue: 'text-blue-700 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300',
    green: 'text-green-700 dark:text-green-400 hover:text-green-800 dark:hover:text-green-300',
    purple: 'text-purple-700 dark:text-purple-400 hover:text-purple-800 dark:hover:text-purple-300',
    orange: 'text-orange-700 dark:text-orange-400 hover:text-orange-800 dark:hover:text-orange-300'
  };

  return (
    <div className={`w-full border ${variantClasses[variant]}`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-start md:items-center gap-4 flex-col md:flex-row">
          {/* Icon */}
          <div className="flex-shrink-0">
            <Bell className={`h-5 w-5 ${iconVariantClasses[variant]}`} />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <h3 className={`text-sm font-semibold ${textVariantClasses[variant]}`}>
                {title}
              </h3>
              <span className="hidden sm:inline text-gray-400 dark:text-gray-600">•</span>
              <p className={`text-sm ${textVariantClasses[variant]} opacity-90`}>
                {message}
              </p>
            </div>
          </div>

          {/* Link */}
          {linkText && (
            <div className="flex-shrink-0">
              <a
                href={linkHref}
                className={`inline-flex items-center gap-1 text-sm font-medium ${linkVariantClasses[variant]} underline underline-offset-4 hover:no-underline transition-all`}
              >
                {linkText}
                <ArrowRight className="h-3 w-3" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
