import { Calendar, Clock, User, ArrowLeft, Share2 } from 'lucide-react';

interface BlogPost1Props {
  title?: string;
  author?: {
    name: string;
    avatar: string;
    bio?: string;
  };
  date?: string;
  readTime?: string;
  category?: string;
  coverImage?: string;
  content?: string;
  tags?: string[];
}

export default function BlogPost1({
  title = 'Como criar componentes reutilizáveis com React',
  author = {
    name: 'Ana Silva',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    bio: 'Senior Frontend Developer com 8+ anos de experiência em React e TypeScript'
  },
  date = '15 de Março, 2024',
  readTime = '8 min de leitura',
  category = 'React',
  coverImage = 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=600&fit=crop',
  content = `
    <p class="lead">Criar componentes reutilizáveis é uma das habilidades mais importantes para qualquer desenvolvedor React. Neste guia completo, vamos explorar as melhores práticas e padrões.</p>

    <h2>Por que componentes reutilizáveis são importantes?</h2>
    <p>Componentes reutilizáveis não apenas economizam tempo de desenvolvimento, mas também garantem consistência em toda a sua aplicação. Quando bem projetados, eles se tornam os blocos de construção fundamentais do seu sistema de design.</p>

    <h2>Princípios fundamentais</h2>
    <p>Ao criar componentes reutilizáveis, você deve sempre considerar:</p>
    <ul>
      <li><strong>Composição sobre herança:</strong> Use composição para criar componentes complexos a partir de componentes simples</li>
      <li><strong>Props bem definidas:</strong> Tenha uma interface clara e intuitiva</li>
      <li><strong>Responsabilidade única:</strong> Cada componente deve fazer uma coisa e fazê-la bem</li>
      <li><strong>Flexibilidade:</strong> Permita customização através de props, sem comprometer a simplicidade</li>
    </ul>

    <h2>Exemplo prático</h2>
    <p>Vamos criar um botão reutilizável que pode ser usado em diferentes contextos:</p>
    <pre><code>interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  onClick
}: ButtonProps) {
  return (
    &lt;button
      className={\`btn btn-\${variant} btn-\${size}\`}
      onClick={onClick}
    &gt;
      {children}
    &lt;/button&gt;
  );
}</code></pre>

    <h2>Conclusão</h2>
    <p>Criar componentes reutilizáveis é uma arte que melhora com a prática. Comece com componentes simples, itere baseado no feedback, e sempre pense em como seu componente será usado por outros desenvolvedores.</p>
  `,
  tags = ['React', 'Components', 'Best Practices', 'TypeScript']
}: BlogPost1Props) {
  return (
    <article className="w-full">
      {/* Header Navigation */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <a
            href="#"
            className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar para o blog
          </a>
        </div>
      </div>

      {/* Cover Image */}
      <div className="w-full h-[400px] md:h-[500px] relative overflow-hidden bg-gray-100 dark:bg-gray-800">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Content */}
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Category Badge */}
        <div className="mb-6">
          <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary text-primary-foreground rounded-full">
            {category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          {title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 dark:text-gray-400 mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{readTime}</span>
          </div>
          <button className="flex items-center gap-2 hover:text-primary transition-colors">
            <Share2 className="h-4 w-4" />
            <span>Compartilhar</span>
          </button>
        </div>

        {/* Author Info */}
        <div className="flex items-center gap-4 mb-12 p-6 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
          <img
            src={author.avatar}
            alt={author.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <div className="flex items-center gap-2 mb-1">
              <User className="h-4 w-4 text-gray-400" />
              <p className="font-semibold text-gray-900 dark:text-white">
                {author.name}
              </p>
            </div>
            {author.bio && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {author.bio}
              </p>
            )}
          </div>
        </div>

        {/* Article Content */}
        <div
          className="prose prose-lg dark:prose-invert max-w-none
            prose-headings:font-bold prose-headings:tracking-tight
            prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
            prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
            prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-strong:text-gray-900 dark:prose-strong:text-white
            prose-ul:my-6 prose-li:my-2
            prose-code:text-primary prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
            prose-pre:bg-gray-900 prose-pre:text-gray-100
            prose-lead:text-xl prose-lead:text-gray-600 dark:prose-lead:text-gray-400 prose-lead:mb-8"
          dangerouslySetInnerHTML={{ __html: content }}
        />

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
              Tags
            </h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <a
                  key={index}
                  href="#"
                  className="px-3 py-1 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  {tag}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
