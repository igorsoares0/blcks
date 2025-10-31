'use client';

import { BlockMetadata } from '@/lib/blocks-registry';
import Image from 'next/image';
import { useState } from 'react';

interface BlockPreviewThumbnailProps {
  block: BlockMetadata;
  isLocked?: boolean;
}

export function BlockPreviewThumbnail({ block, isLocked }: BlockPreviewThumbnailProps) {
  const [imageError, setImageError] = useState(false);

  // Try to load screenshot from public/previews folder
  const previewPath = `/previews/${block.category}/${block.id}.png`;

  if (imageError) {
    // Fallback to letter avatar if image fails to load
    return (
      <div className="absolute inset-0 flex items-center justify-center p-4 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <span className="text-2xl font-bold text-primary">
              {block.name.charAt(0)}
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 bg-white dark:bg-gray-950">
      <Image
        src={previewPath}
        alt={`Preview of ${block.name}`}
        fill
        className="object-cover object-top"
        onError={() => setImageError(true)}
      />
    </div>
  );
}
