import { blocksRegistry } from '@/lib/blocks-registry';
import BlockRenderer from '@/components/block-renderer';
import { notFound } from 'next/navigation';

export default async function PreviewPage({ params }: { params: Promise<{ blockId: string }> }) {
  const { blockId } = await params;
  const block = blocksRegistry.find(b => b.id === blockId);

  if (!block) {
    notFound();
  }

  return (
    <>
      {/* Hide Next.js dev indicator for screenshots */}
      <style dangerouslySetInnerHTML={{
        __html: `
          #__next-build-watcher,
          nextjs-portal,
          [data-nextjs-dialog],
          [data-nextjs-toast],
          iframe[title*="Next"],
          [class*="__nextjs"] {
            display: none !important;
          }
        `
      }} />

      <div className="min-h-screen bg-white dark:bg-gray-950">
        <BlockRenderer block={block} />
      </div>
    </>
  );
}

export async function generateStaticParams() {
  return blocksRegistry.map((block) => ({
    blockId: block.id,
  }));
}
