import { Calendar, Clock, User, Tag, Share2, Twitter, Linkedin, Facebook, Link2, ArrowLeft, ArrowRight, Bookmark, Heart, MessageCircle } from 'lucide-react';

interface Author {
  name: string;
  avatar: string;
  bio?: string;
  role?: string;
}

interface Tag {
  label: string;
  href: string;
}

interface RelatedPost {
  title: string;
  excerpt: string;
  image: string;
  href: string;
  readTime: string;
}

interface BlogPost3Props {
  title?: string;
  excerpt?: string;
  author?: Author;
  publishDate?: string;
  readTime?: string;
  coverImage?: string;
  tags?: Tag[];
  content?: string;
  relatedPosts?: RelatedPost[];
  backText?: string;
  shareText?: string;
  commentsCount?: number;
  likesCount?: number;
  bookmarked?: boolean;
}

export default function BlogPost3({
  title = 'The Complete Guide to Building Modern Web Applications',
  excerpt = 'Learn how to build scalable, performant web applications using the latest technologies and best practices in 2024.',
  author = {
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    bio: 'Senior Software Engineer and Technical Writer',
    role: 'Lead Developer'
  },
  publishDate = 'March 15, 2024',
  readTime = '12 min read',
  coverImage = 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=600&fit=crop',
  tags = [
    { label: 'Web Development', href: '#' },
    { label: 'React', href: '#' },
    { label: 'TypeScript', href: '#' },
    { label: 'Performance', href: '#' }
  ],
  content = `
    <p>Modern web development has evolved significantly over the past few years. With the rise of frameworks like React, Vue, and Angular, developers now have powerful tools at their disposal to build complex, interactive applications.</p>

    <h2>Getting Started</h2>
    <p>Before diving into building your application, it's crucial to understand the foundational concepts that will guide your development process. This includes understanding component architecture, state management, and performance optimization techniques.</p>

    <h3>Component Architecture</h3>
    <p>A well-structured component architecture is the backbone of any successful web application. By breaking down your UI into smaller, reusable components, you create a more maintainable and scalable codebase.</p>

    <blockquote>
      "The best code is no code at all. The second best is code that's simple, clear, and easy to understand." - Anonymous
    </blockquote>

    <h3>State Management</h3>
    <p>Managing state effectively is one of the most challenging aspects of web development. Whether you choose Redux, MobX, or React's built-in Context API, understanding how data flows through your application is essential.</p>

    <h2>Performance Optimization</h2>
    <p>Performance is not just a feature—it's a fundamental requirement. Users expect fast, responsive applications, and even a delay of a few hundred milliseconds can impact user experience and conversion rates.</p>

    <ul>
      <li>Implement code splitting to reduce initial bundle size</li>
      <li>Use lazy loading for images and components</li>
      <li>Optimize render performance with React.memo and useMemo</li>
      <li>Leverage CDN for static assets</li>
      <li>Implement proper caching strategies</li>
    </ul>

    <h2>Conclusion</h2>
    <p>Building modern web applications requires a combination of technical knowledge, best practices, and continuous learning. By following the principles outlined in this guide, you'll be well-equipped to create applications that are not only functional but also performant and maintainable.</p>
  `,
  relatedPosts = [
    {
      title: 'Advanced React Patterns You Should Know',
      excerpt: 'Discover powerful React patterns that will improve your code quality and developer experience.',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
      href: '#',
      readTime: '8 min read'
    },
    {
      title: 'TypeScript Best Practices for 2024',
      excerpt: 'Learn how to leverage TypeScript to write safer, more maintainable code.',
      image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=300&fit=crop',
      href: '#',
      readTime: '10 min read'
    },
    {
      title: 'Performance Optimization Techniques',
      excerpt: 'Master the art of building lightning-fast web applications with these proven techniques.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop',
      href: '#',
      readTime: '15 min read'
    }
  ],
  backText = 'Back to Blog',
  shareText = 'Share this article',
  commentsCount = 24,
  likesCount = 156,
  bookmarked = false
}: BlogPost3Props) {
  return (
    <article className="w-full bg-white dark:bg-gray-950">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 md:px-6 py-6">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {backText}
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tags.map((tag, index) => (
              <a
                key={index}
                href={tag.href}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors"
              >
                <Tag className="h-3 w-3" />
                {tag.label}
              </a>
            ))}
          </div>

          {/* Title & Excerpt */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
            {excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-3">
              <img
                src={author.avatar}
                alt={author.name}
                className="w-12 h-12 rounded-full object-cover"
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

          {/* Cover Image */}
          <div className="mb-12 rounded-2xl overflow-hidden">
            <img
              src={coverImage}
              alt={title}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-8">
              <div
                className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:italic prose-ul:list-disc prose-ul:pl-6 prose-li:text-gray-700 dark:prose-li:text-gray-300"
                dangerouslySetInnerHTML={{ __html: content }}
              />

              {/* Engagement Actions */}
              <div className="flex items-center gap-6 mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
                <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
                  <Heart className="h-5 w-5" />
                  <span className="font-medium">{likesCount}</span>
                </button>
                <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
                  <MessageCircle className="h-5 w-5" />
                  <span className="font-medium">{commentsCount}</span>
                </button>
                <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors">
                  <Bookmark className={`h-5 w-5 ${bookmarked ? 'fill-current' : ''}`} />
                  Save
                </button>
              </div>

              {/* Author Bio */}
              <div className="mt-12 p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                <div className="flex items-start gap-4">
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                  />
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                      Written by
                    </div>
                    <div className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {author.name}
                    </div>
                    {author.bio && (
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {author.bio}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-8 space-y-8">
                {/* Share */}
                <div className="p-6 rounded-2xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">
                    {shareText}
                  </h3>
                  <div className="flex flex-col gap-2">
                    <button className="inline-flex items-center gap-3 px-4 py-2.5 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm font-medium border border-gray-200 dark:border-gray-700">
                      <Twitter className="h-4 w-4" />
                      Share on Twitter
                    </button>
                    <button className="inline-flex items-center gap-3 px-4 py-2.5 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm font-medium border border-gray-200 dark:border-gray-700">
                      <Linkedin className="h-4 w-4" />
                      Share on LinkedIn
                    </button>
                    <button className="inline-flex items-center gap-3 px-4 py-2.5 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm font-medium border border-gray-200 dark:border-gray-700">
                      <Facebook className="h-4 w-4" />
                      Share on Facebook
                    </button>
                    <button className="inline-flex items-center gap-3 px-4 py-2.5 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-sm font-medium border border-gray-200 dark:border-gray-700">
                      <Link2 className="h-4 w-4" />
                      Copy Link
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      <div className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-8">
              Related Articles
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedPosts.map((post, index) => (
                <a
                  key={index}
                  href={post.href}
                  className="group bg-white dark:bg-gray-950 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-primary dark:hover:border-primary transition-all duration-300 hover:shadow-lg"
                >
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
