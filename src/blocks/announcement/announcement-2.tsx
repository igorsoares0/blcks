interface Announcement2Props {
  badge?: string;
  message?: string;
  linkText?: string;
  linkHref?: string;
  icon?: string;
  showIcon?: boolean;
}

export default function Announcement2({
  badge = '🎉 New',
  message = 'Announcing our next round of funding and our new AI features',
  linkText = 'Read more',
  linkHref = '#',
  icon = '→',
  showIcon = true
}: Announcement2Props) {
  return (
    <div className="w-full bg-white dark:bg-gray-950 border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {/* Badge */}
          <span className="inline-flex items-center rounded-full bg-primary/10 dark:bg-primary/20 px-3 py-1 text-xs font-semibold text-primary">
            {badge}
          </span>

          {/* Message */}
          <p className="text-sm text-gray-700 dark:text-gray-300 text-center">
            {message}
          </p>

          {/* Link */}
          {linkText && (
            <a
              href={linkHref}
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary/80 transition-colors group"
            >
              {linkText}
              {showIcon && (
                <span className="transition-transform group-hover:translate-x-0.5">
                  {icon}
                </span>
              )}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
