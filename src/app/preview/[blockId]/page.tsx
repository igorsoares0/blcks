import { blocksRegistry } from '@/lib/blocks-registry';
import BlockRenderer from '@/components/block-renderer';
import { notFound } from 'next/navigation';
import { themes } from '@/lib/themes';
import { PreviewThemeWrapper } from '@/components/preview-theme-wrapper';

export default async function PreviewPage({
  params,
  searchParams,
}: {
  params: Promise<{ blockId: string }>;
  searchParams: Promise<{ theme?: string }>;
}) {
  const { blockId } = await params;
  const { theme: themeId } = await searchParams;
  const block = blocksRegistry.find(b => b.id === blockId);

  if (!block) {
    notFound();
  }

  const theme = themes.find(t => t.id === themeId) || themes[0];

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

      <PreviewThemeWrapper themeColors={theme.colors}>
        <div className="min-h-screen bg-white dark:bg-gray-950">
          <BlockRenderer block={block} />
        </div>
      </PreviewThemeWrapper>
    </>
  );
}

export async function generateStaticParams() {
  return blocksRegistry.map((block) => ({
    blockId: block.id,
  }));
}
