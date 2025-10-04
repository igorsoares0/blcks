import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Copy } from 'lucide-react';
import { getBlockById } from '@/lib/blocks-registry';
import { BlockPreview } from '@/components/block-preview';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Hero1 from '@/blocks/hero/hero1';
import Hero2 from '@/blocks/hero/hero2';
import Features1 from '@/blocks/features/features1';
import CTA1 from '@/blocks/cta/cta1';
import Navbar1 from '@/blocks/navbar/navbar1';
import Footer1 from '@/blocks/footer/footer-1';
import Announcement1 from '@/blocks/announcement/announcement-1';
import About1 from '@/blocks/about/about-1';
import Blog1 from '@/blocks/blog/blog-1';
import BlogPost1 from '@/blocks/blog/blog-post-1';
import Pricing1 from '@/blocks/pricing/pricing-1';
import Services1 from '@/blocks/services/services-1';
import Changelog1 from '@/blocks/changelog/changelog-1';
import Login1 from '@/blocks/auth/login-1';
import Signup1 from '@/blocks/auth/signup-1';
import Testimonial1 from '@/blocks/testimonial/testimonial-1';
import FAQ1 from '@/blocks/faq/faq-1';

interface PageProps {
  params: Promise<{
    category: string;
    blockId: string;
  }>;
}

// Mapa de componentes para renderização
const componentMap: Record<string, React.ComponentType<any>> = {
  'navbar-1': Navbar1,
  'hero-1': Hero1,
  'hero-2': Hero2,
  'features-1': Features1,
  'cta-1': CTA1,
  'footer-1': Footer1,
  'announcement-1': Announcement1,
  'about-1': About1,
  'blog-1': Blog1,
  'blog-post-1': BlogPost1,
  'pricing-1': Pricing1,
  'services-1': Services1,
  'changelog-1': Changelog1,
  'login-1': Login1,
  'signup-1': Signup1,
  'testimonial-1': Testimonial1,
  'faq-1': FAQ1,
};

export default async function BlockPage({ params }: PageProps) {
  const { blockId } = await params;
  const block = getBlockById(blockId);

  if (!block) {
    notFound();
  }

  const BlockComponent = componentMap[blockId];

  if (!BlockComponent) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 sticky top-0 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar
              </Button>
            </Link>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="capitalize">
                {block.category}
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Block Info */}
      <section className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              {block.name}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
              {block.description}
            </p>
            <div className="flex flex-wrap gap-2">
              {block.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Block Preview */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <BlockPreview block={block}>
            <BlockComponent {...block.previewProps} />
          </BlockPreview>
        </div>
      </section>

      {/* Props Documentation */}
      {block.props && block.props.length > 0 && (
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-6">Props</h2>
            <div className="border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-900">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nome
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tipo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Padrão
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Descrição
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-950 divide-y divide-gray-200 dark:divide-gray-800">
                    {block.props.map((prop) => (
                      <tr key={prop.name}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <code className="text-sm font-mono text-primary">
                            {prop.name}
                          </code>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <code className="text-sm font-mono text-gray-600 dark:text-gray-400">
                            {prop.type}
                          </code>
                        </td>
                        <td className="px-6 py-4">
                          {prop.default ? (
                            <code className="text-sm font-mono text-gray-600 dark:text-gray-400">
                              {prop.default}
                            </code>
                          ) : (
                            <span className="text-sm text-gray-400">-</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                          {prop.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Installation Instructions */}
      <section className="container mx-auto px-4 py-12 border-t border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Como usar</h2>
          <div className="space-y-4 prose dark:prose-invert max-w-none">
            <div>
              <h3 className="text-lg font-semibold mb-2">1. Instalar dependências</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-3">
                Primeiro, instale as dependências necessárias:
              </p>
              <div className="space-y-2">
                {block.dependencies.filter(dep => !dep.command).length > 0 && (
                  <div className="p-4 rounded-lg bg-gray-900 text-gray-100 font-mono text-sm">
                    npm install {block.dependencies.filter(dep => !dep.command).map(dep => dep.name).join(' ')}
                  </div>
                )}
                {block.dependencies.filter(dep => dep.command).map((dep, index) => (
                  <div key={index} className="p-4 rounded-lg bg-gray-900 text-gray-100 font-mono text-sm">
                    {dep.command}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">2. Copiar o código</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Copie o código do componente da aba "Code" acima e cole no seu projeto.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">3. Customizar</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Ajuste as cores, espaçamentos e textos de acordo com seu design system.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}