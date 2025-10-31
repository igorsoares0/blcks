import { Calendar, Clock, User, ArrowLeft, ChevronRight, Hash, CheckCircle, ExternalLink, Download } from 'lucide-react';

interface Author {
  name: string;
  avatar: string;
  role?: string;
}

interface TableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

interface Stat {
  label: string;
  value: string;
}

interface NextPost {
  title: string;
  excerpt: string;
  image: string;
  href: string;
  category: string;
}

interface BlogPost4Props {
  title?: string;
  excerpt?: string;
  author?: Author;
  publishDate?: string;
  readTime?: string;
  category?: string;
  coverImage?: string;
  tableOfContents?: TableOfContentsItem[];
  content?: string;
  stats?: Stat[];
  keyTakeaways?: string[];
  nextPost?: NextPost;
  backText?: string;
  downloadText?: string;
}

export default function BlogPost4({
  title = 'Mastering Server-Side Rendering in Modern Web Applications',
  excerpt = 'A comprehensive deep dive into SSR techniques, performance optimization, and best practices for building fast, SEO-friendly web applications.',
  author = {
    name: 'Alex Martinez',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
    role: 'Principal Engineer'
  },
  publishDate = 'March 20, 2024',
  readTime = '18 min read',
  category = 'Engineering',
  coverImage = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop',
  tableOfContents = [
    { id: 'introduction', title: 'Introduction', level: 1 },
    { id: 'why-ssr', title: 'Why Server-Side Rendering?', level: 1 },
    { id: 'performance', title: 'Performance Benefits', level: 2 },
    { id: 'seo', title: 'SEO Advantages', level: 2 },
    { id: 'implementation', title: 'Implementation Guide', level: 1 },
    { id: 'nextjs', title: 'Next.js Approach', level: 2 },
    { id: 'caching', title: 'Caching Strategies', level: 2 },
    { id: 'optimization', title: 'Advanced Optimization', level: 1 },
    { id: 'conclusion', title: 'Conclusion', level: 1 }
  ],
  content = `
    <h2 id="introduction">Introduction</h2>
    <p>Server-side rendering has become an essential technique in modern web development. In this comprehensive guide, we'll explore why SSR matters and how to implement it effectively in your applications.</p>

    <h2 id="why-ssr">Why Server-Side Rendering?</h2>
    <p>Understanding the benefits of SSR is crucial for making informed architectural decisions. Let's explore the main advantages.</p>

    <h3 id="performance">Performance Benefits</h3>
    <p>SSR delivers fully rendered HTML to the client, resulting in faster initial page loads and improved perceived performance. Users see content immediately, rather than waiting for JavaScript to download and execute.</p>

    <h3 id="seo">SEO Advantages</h3>
    <p>Search engines can easily crawl and index server-rendered content. This is particularly important for content-heavy sites where discoverability is critical.</p>

    <h2 id="implementation">Implementation Guide</h2>
    <p>Let's walk through implementing SSR in a modern application. We'll use Next.js as our framework of choice.</p>

    <h3 id="nextjs">Next.js Approach</h3>
    <p>Next.js provides built-in SSR capabilities that make implementation straightforward. Here's what you need to know.</p>

    <h3 id="caching">Caching Strategies</h3>
    <p>Effective caching is essential for SSR performance. We'll explore different caching strategies and when to use each.</p>

    <h2 id="optimization">Advanced Optimization</h2>
    <p>Once you have SSR working, there are numerous optimizations you can apply to further improve performance and user experience.</p>

    <h2 id="conclusion">Conclusion</h2>
    <p>Server-side rendering is a powerful technique that can significantly improve your application's performance and SEO. By following the best practices outlined in this guide, you'll be well-equipped to implement SSR effectively.</p>
  `,
  stats = [
    { label: 'Time to First Byte', value: '< 200ms' },
    { label: 'Lighthouse Score', value: '98/100' },
    { label: 'Core Web Vitals', value: 'All Green' }
  ],
  keyTakeaways = [
    'SSR improves initial page load performance by 40-60%',
    'Server-rendered content is immediately crawlable by search engines',
    'Implement caching strategies to reduce server load',
    'Use streaming SSR for even better perceived performance',
    'Monitor Core Web Vitals to track real-world performance'
  ],
  nextPost = {
    title: 'Progressive Web Apps: The Complete Guide',
    excerpt: 'Learn how to build PWAs that work offline and provide native-like experiences.',
    image: 'https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=300&fit=crop',
    href: '#',
    category: 'Mobile'
  },
  backText = 'Back to Articles',
  downloadText = 'Download PDF'
}: BlogPost4Props) {
  return (
    <article className="w-full bg-white dark:bg-gray-950">
      {/* Top Bar */}
      <div className="border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {backText}
            </a>
            <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <Download className="h-4 w-4" />
              {downloadText}
            </button>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-6">
            {category}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {title}
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
            {excerpt}
          </p>

          <div className="flex flex-wrap items-center gap-6 pb-8 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <img
                src={author.avatar}
                alt={author.name}
                className="w-14 h-14 rounded-full object-cover ring-2 ring-gray-200 dark:ring-gray-800"
              />
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {author.name}
                </div>
                {author.role && (
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {author.role}
                  </div>
                )}
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {publishDate}
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {readTime}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      <div className="container mx-auto px-4 md:px-6 mb-12">
        <div className="max-w-5xl mx-auto rounded-2xl overflow-hidden">
          <img
            src={coverImage}
            alt={title}
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-gray-50 dark:bg-gray-900 border-y border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 md:px-6 py-8">
          <div className="max-w-4xl mx-auto grid grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Table of Contents Sidebar */}
            <aside className="lg:col-span-3 order-2 lg:order-1">
              <div className="lg:sticky lg:top-8">
                <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                  <div className="flex items-center gap-2 mb-4">
                    <Hash className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                      Table of Contents
                    </h3>
                  </div>
                  <nav className="space-y-2">
                    {tableOfContents.map((item, index) => (
                      <a
                        key={index}
                        href={`#${item.id}`}
                        className={`block text-sm hover:text-primary transition-colors ${
                          item.level === 2 ? 'pl-4 text-gray-500 dark:text-gray-500' : 'text-gray-700 dark:text-gray-300 font-medium'
                        }`}
                      >
                        {item.title}
                      </a>
                    ))}
                  </nav>
                </div>

                {/* Key Takeaways */}
                <div className="mt-6 p-6 rounded-2xl bg-primary/5 border border-primary/20">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                    Key Takeaways
                  </h3>
                  <ul className="space-y-3">
                    {keyTakeaways.map((takeaway, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                        <CheckCircle className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </aside>

            {/* Article Content */}
            <div className="lg:col-span-9 order-1 lg:order-2">
              <div
                className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-gray-200 dark:prose-h2:border-gray-800 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 dark:prose-strong:text-white"
                dangerouslySetInnerHTML={{ __html: content }}
              />

              {/* Author Card at Bottom */}
              <div className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 border border-gray-200 dark:border-gray-800">
                <div className="flex items-start gap-6">
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="w-20 h-20 rounded-full object-cover flex-shrink-0 ring-2 ring-gray-200 dark:ring-gray-800"
                  />
                  <div className="flex-1">
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Written by
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {author.name}
                    </div>
                    {author.role && (
                      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        {author.role}
                      </div>
                    )}
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                      Writing about web performance, architecture, and developer experience.
                      Helping teams build faster, more reliable applications.
                    </p>
                    <a
                      href="#"
                      className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                    >
                      View all articles
                      <ChevronRight className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Next Article */}
      {nextPost && (
        <div className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-4 md:px-6 py-12">
            <div className="max-w-4xl mx-auto">
              <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-4">
                Read Next
              </div>
              <a
                href={nextPost.href}
                className="group block bg-white dark:bg-gray-950 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-primary dark:hover:border-primary transition-all duration-300 hover:shadow-lg"
              >
                <div className="grid md:grid-cols-5 gap-6">
                  <div className="md:col-span-2">
                    <div className="aspect-video md:aspect-square overflow-hidden">
                      <img
                        src={nextPost.image}
                        alt={nextPost.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>
                  <div className="md:col-span-3 p-6 md:py-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
                      {nextPost.category}
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors">
                      {nextPost.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {nextPost.excerpt}
                    </p>
                    <div className="inline-flex items-center gap-2 text-sm font-medium text-primary">
                      Read article
                      <ExternalLink className="h-4 w-4" />
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
