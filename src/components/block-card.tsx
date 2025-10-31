import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BlockMetadata } from '@/lib/blocks-registry';
import { Lock } from 'lucide-react';
import { BlockPreviewThumbnail } from '@/components/block-preview-thumbnail';

interface BlockCardProps {
  block: BlockMetadata;
  hasAccess?: boolean;
}

export function BlockCard({ block, hasAccess = true }: BlockCardProps) {
  const isLocked = block.isPremium && !hasAccess;

  return (
    <Link href={`/blocks/${block.category}/${block.id}`}>
      <Card className={`h-full transition-all hover:shadow-lg cursor-pointer group flex flex-col ${
        isLocked
          ? 'hover:border-yellow-500/50 border-yellow-500/20'
          : 'hover:border-primary/50'
      }`}>
        <div className={`aspect-video w-full bg-white dark:bg-gray-950 relative overflow-hidden border-b border-gray-200 dark:border-gray-800 ${
          isLocked ? 'opacity-60' : ''
        }`}>
          {/* Lock overlay for premium blocks without access */}
          {isLocked && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[2px] z-10">
              <div className="bg-yellow-500 text-white p-3 rounded-full shadow-lg">
                <Lock className="h-6 w-6" />
              </div>
            </div>
          )}

          {/* Live Preview */}
          <BlockPreviewThumbnail block={block} isLocked={isLocked} />
        </div>
        <CardHeader className="flex-1">
          <div className="flex items-start justify-between gap-3 mb-2">
            <CardTitle className="text-lg group-hover:text-primary transition-colors leading-tight">
              {block.name}
            </CardTitle>
            <div className="flex flex-col gap-1.5 shrink-0">
              <Badge variant="secondary" className="text-xs">
                {block.category}
              </Badge>
              {block.isPremium ? (
                <Badge
                  variant={isLocked ? "default" : "outline"}
                  className={`text-xs ${
                    isLocked
                      ? 'bg-yellow-500 hover:bg-yellow-600 text-white border-yellow-600'
                      : 'border-green-600 text-green-600'
                  }`}
                >
                  {isLocked ? '🔒 Premium' : '✓ Premium'}
                </Badge>
              ) : (
                <Badge variant="outline" className="text-xs border-blue-600 text-blue-600">
                  Free
                </Badge>
              )}
            </div>
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