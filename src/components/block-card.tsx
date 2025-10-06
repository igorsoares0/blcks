import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BlockMetadata } from '@/lib/blocks-registry';

interface BlockCardProps {
  block: BlockMetadata;
}

export function BlockCard({ block }: BlockCardProps) {
  return (
    <Link href={`/blocks/${block.category}/${block.id}`}>
      <Card className="h-full transition-all hover:shadow-lg hover:border-primary/50 cursor-pointer group flex flex-col">
        <div className="aspect-video w-full bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 relative overflow-hidden">
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <span className="text-2xl font-bold text-primary">
                  {block.name.charAt(0)}
                </span>
              </div>
            </div>
          </div>
        </div>
        <CardHeader className="flex-1">
          <div className="flex items-start justify-between gap-3 mb-2">
            <CardTitle className="text-lg group-hover:text-primary transition-colors leading-tight">
              {block.name}
            </CardTitle>
            <Badge variant="secondary" className="shrink-0 text-xs">
              {block.category}
            </Badge>
          </div>
          <CardDescription className="line-clamp-2 text-sm">
            {block.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex flex-wrap gap-1.5">
            {block.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {block.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{block.tags.length - 3}
              </Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}