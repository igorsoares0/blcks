import { X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Announcement1Props {
  message?: string;
  linkText?: string;
  linkHref?: string;
  variant?: 'default' | 'gradient' | 'dark';
}

export default function Announcement1({
  message = 'News: We just launched our new version 2.0',
  linkText = 'Learn more',
  linkHref = '#',
  variant = 'default'
}: Announcement1Props) {
  const variantClasses = {
    default: 'bg-primary text-primary-foreground',
    gradient: 'bg-gradient-to-r from-purple-600 to-pink-600 text-white',
    dark: 'bg-gray-900 dark:bg-gray-950 text-white'
  };

  return (
    <div className={`${variantClasses[variant]} py-3 px-4 relative`}>
      <div className="container mx-auto flex items-center justify-center gap-4">
        <p className="text-sm font-medium text-center flex-1 flex items-center justify-center gap-2 flex-wrap">
          <span>{message}</span>
          {linkText && (
            <a
              href={linkHref}
              className="inline-flex items-center underline underline-offset-4 hover:no-underline transition-all"
            >
              {linkText}
              <ArrowRight className="ml-1 h-3 w-3" />
            </a>
          )}
        </p>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 h-6 w-6 opacity-70 hover:opacity-100 hover:bg-transparent"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
