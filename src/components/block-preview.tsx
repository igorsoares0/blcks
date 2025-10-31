'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CodeBlock } from './code-block';
import { Card } from '@/components/ui/card';
import { BlockMetadata } from '@/lib/blocks-registry';
import { PremiumGate } from './premium-gate';

interface BlockPreviewProps {
  block: BlockMetadata;
  children: React.ReactNode;
}

export function BlockPreview({ block, children }: BlockPreviewProps) {
  // Different layouts based on block category
  const isNavbar = block.category === 'navbar';
  const previewClasses = isNavbar
    ? "w-full min-h-[200px] bg-gray-50 dark:bg-gray-950"
    : "w-full min-h-[400px] flex items-center justify-center bg-gray-50 dark:bg-gray-950";

  return (
    <Card className="overflow-hidden">
      <Tabs defaultValue="preview" className="w-full">
        <div className="border-b border-gray-200 dark:border-gray-800 px-4">
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
        </div>

        <TabsContent value="preview" className="p-0 m-0">
          <PremiumGate isPremium={block.isPremium} blockName={block.name}>
            <div className={previewClasses}>
              {children}
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