'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CodeBlock } from './code-block';
import { Card } from '@/components/ui/card';
import { BlockMetadata } from '@/lib/blocks-registry';
import { PremiumGate } from './premium-gate';
import { ThemeSelector } from './theme-selector';
import { themes, type Theme } from '@/lib/themes';
import { Monitor, Tablet, Smartphone } from 'lucide-react';

type ViewportSize = 'desktop' | 'tablet' | 'mobile';

const viewportConfig: Record<ViewportSize, { width: number; label: string }> = {
  desktop: { width: 1280, label: 'Desktop' },
  tablet: { width: 768, label: 'Tablet' },
  mobile: { width: 375, label: 'Mobile' },
};

interface BlockPreviewProps {
  block: BlockMetadata;
  children: React.ReactNode;
}

export function BlockPreview({ block, children }: BlockPreviewProps) {
  const [selectedTheme, setSelectedTheme] = useState<Theme>(themes[0]);
  const [viewport, setViewport] = useState<ViewportSize>('desktop');
  const [iframeHeight, setIframeHeight] = useState(400);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const iframeSrc = `/preview/${block.id}${selectedTheme.id !== 'default' ? `?theme=${selectedTheme.id}` : ''}`;

  // Measure iframe content height
  const updateHeight = useCallback(() => {
    try {
      const iframe = iframeRef.current;
      if (iframe?.contentDocument?.body) {
        const height = iframe.contentDocument.body.scrollHeight;
        if (height > 0) {
          setIframeHeight(height);
        }
      }
    } catch {
      // Cross-origin or not ready yet
    }
  }, []);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      updateHeight();
      // Also observe for dynamic content changes
      try {
        if (iframe.contentDocument?.body) {
          const observer = new ResizeObserver(() => updateHeight());
          observer.observe(iframe.contentDocument.body);
          return () => observer.disconnect();
        }
      } catch {
        // Cross-origin
      }
    };

    iframe.addEventListener('load', handleLoad);
    return () => iframe.removeEventListener('load', handleLoad);
  }, [updateHeight, iframeSrc]);

  const isResized = viewport !== 'desktop';
  const containerWidth = containerRef.current?.clientWidth ?? 1280;
  const targetWidth = viewportConfig[viewport].width;
  // Scale down if the target viewport is wider than the container
  const scale = isResized ? Math.min(1, (containerWidth - 32) / targetWidth) : 1;

  return (
    <Card className="overflow-hidden">
      <Tabs defaultValue="preview" className="w-full">
        <div className="border-b border-gray-200 dark:border-gray-800 px-4 flex items-center justify-between">
          <TabsList className="w-full justify-start border-none bg-transparent p-0">
            <TabsTrigger
              value="preview"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Preview
            </TabsTrigger>
            <TabsTrigger
              value="code"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Code
            </TabsTrigger>
            <TabsTrigger
              value="dependencies"
              className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Dependencies
            </TabsTrigger>
          </TabsList>
          <div className="flex items-center gap-1">
            <div className="flex items-center border border-gray-200 dark:border-gray-700 rounded-md p-0.5">
              <button
                onClick={() => setViewport('desktop')}
                className={`p-1.5 rounded-sm transition-colors ${viewport === 'desktop' ? 'bg-gray-100 dark:bg-gray-800 text-foreground' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
                title="Desktop"
              >
                <Monitor className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setViewport('tablet')}
                className={`p-1.5 rounded-sm transition-colors ${viewport === 'tablet' ? 'bg-gray-100 dark:bg-gray-800 text-foreground' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
                title="Tablet"
              >
                <Tablet className="h-3.5 w-3.5" />
              </button>
              <button
                onClick={() => setViewport('mobile')}
                className={`p-1.5 rounded-sm transition-colors ${viewport === 'mobile' ? 'bg-gray-100 dark:bg-gray-800 text-foreground' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}
                title="Mobile"
              >
                <Smartphone className="h-3.5 w-3.5" />
              </button>
            </div>
            <ThemeSelector
              currentTheme={selectedTheme}
              onThemeChange={setSelectedTheme}
            />
          </div>
        </div>

        <TabsContent value="preview" className="p-0 m-0">
          <PremiumGate isPremium={block.isPremium} blockName={block.name}>
            <div
              ref={containerRef}
              className={`w-full ${isResized ? 'flex justify-center bg-gray-100 dark:bg-gray-900 py-6' : ''}`}
            >
              <div
                style={isResized ? {
                  width: `${targetWidth}px`,
                  height: `${iframeHeight * scale}px`,
                } : undefined}
                className={isResized ? 'relative overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm bg-white dark:bg-gray-950' : ''}
              >
                <iframe
                  ref={iframeRef}
                  src={iframeSrc}
                  title={`Preview of ${block.name}`}
                  className="border-0"
                  style={isResized ? {
                    width: `${targetWidth}px`,
                    height: `${iframeHeight}px`,
                    transform: `scale(${scale})`,
                    transformOrigin: 'top left',
                  } : {
                    width: '100%',
                    height: `${iframeHeight}px`,
                  }}
                />
              </div>
            </div>
          </PremiumGate>
        </TabsContent>

        <TabsContent value="code" className="p-4 m-0">
          <PremiumGate isPremium={block.isPremium} blockName={block.name}>
            <CodeBlock code={block.code} language="tsx" />
          </PremiumGate>
        </TabsContent>

        <TabsContent value="dependencies" className="p-6 m-0">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-3">NPM Dependencies</h3>
              <div className="space-y-2">
                {block.dependencies
                  .filter(dep => !dep.command)
                  .map((dep, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900"
                    >
                      <code className="text-sm">{dep.name}</code>
                      {dep.version && (
                        <span className="text-sm text-gray-500">{dep.version}</span>
                      )}
                    </div>
                  ))}
              </div>
              <div className="mt-4 p-4 rounded-lg bg-gray-900 text-gray-100">
                <code className="text-sm">
                  npm install{' '}
                  {block.dependencies
                    .filter(dep => !dep.command)
                    .map(dep => dep.name)
                    .join(' ')}
                </code>
              </div>
            </div>

            {block.dependencies.some(dep => dep.command) && (
              <div>
                <h3 className="text-lg font-semibold mb-3">shadcn/ui Components</h3>
                <div className="space-y-2">
                  {block.dependencies
                    .filter(dep => dep.command)
                    .map((dep, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
                          <code className="text-sm">{dep.name}</code>
                        </div>
                        <div className="p-4 rounded-lg bg-gray-900 text-gray-100">
                          <code className="text-sm">{dep.command}</code>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </Card>
  );
}
