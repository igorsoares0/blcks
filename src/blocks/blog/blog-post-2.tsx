import { Calendar, Clock, Share2, Bookmark, ArrowLeft, Tag, User } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Author {
  name: string;
  avatar: string;
  role?: string;
  bio?: string;
}

interface RelatedPost {
  title: string;
  slug: string;
  imageUrl: string;
  readTime: string;
}

interface BlogPost2Props {
  title?: string;
  excerpt?: string;
  author?: Author;
  publishedDate?: string;
  readTime?: string;
  category?: string;
  tags?: string[];
  coverImage?: string;
  content?: string;
  relatedPosts?: RelatedPost[];
  backLink?: string;
}

export default function BlogPost2({
  title = 'The Complete Guide to Modern Web Development in 2024',
  excerpt = 'Learn everything you need to know about building modern web applications with the latest technologies and best practices.',
  author = {
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
    role: 'Senior Web Developer',
    bio: 'Passionate about building scalable web applications and sharing knowledge with the developer community.'
  },
  publishedDate = 'March 24, 2024',
  readTime = '12 min read',
  category = 'Web Development',
  tags = ['React', 'Next.js', 'TypeScript', 'Best Practices'],
  coverImage = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop',
  content = `
    <p>In the ever-evolving landscape of web development, staying current with the latest technologies and best practices is crucial. This comprehensive guide will walk you through everything you need to know to build modern, performant web applications in 2024.</p>

    <h2>Understanding Modern Web Architecture</h2>
    <p>Modern web applications are built on a foundation of robust architecture patterns. The shift towards component-based development, server-side rendering, and static site generation has transformed how we approach building for the web.</p>

    <p>Key considerations include:</p>
    <ul>
      <li>Component reusability and maintainability</li>
      <li>Performance optimization strategies</li>
      <li>SEO and accessibility best practices</li>
      <li>State management solutions</li>
    </ul>

    <h2>Choosing the Right Tech Stack</h2>
    <p>Your technology choices can make or break your project. We'll explore the most popular frameworks and tools, helping you make informed decisions based on your project requirements.</p>

    <blockquote>
      "The best framework is the one that solves your specific problems while maintaining developer productivity and user experience." - Industry Expert
    </blockquote>

    <h2>Best Practices for 2024</h2>
    <p>Following industry best practices ensures your applications are maintainable, scalable, and performant. Here are the key principles to follow...</p>

    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
  `,
  relatedPosts = [
    {
      title: 'Getting Started with Next.js 15',
      slug: '#',
      imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop',
      readTime: '8 min'
    },
    {
      title: 'TypeScript Best Practices',
      slug: '#',
      imageUrl: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=400&h=300&fit=crop',
      readTime: '10 min'
    },
    {
      title: 'Building Scalable React Apps',
      slug: '#',
      imageUrl: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=300&fit=crop',
      readTime: '15 min'
    }
  ],
  backLink = '/'
}: BlogPost2Props) {
  return (
    <article className="w-full bg-white dark:bg-gray-950">
      {/* Header with Back Button */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl py-4">
          <a
            href={backLink}
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Blog</span>
          </a>
        </div>
      </div>

      {/* Cover Image */}
      <div className="w-full h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden bg-gray-100 dark:bg-gray-900">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 max-w-7xl py-12 md:py-16 lg:py-20">
        <div className="grid lg:grid-cols-[1fr_300px] gap-12">
          {/* Main Content */}
          <div className="max-w-3xl">
            {/* Category Badge */}
            <div className="mb-6">
              <span className="inline-block px-3 py-1 text-sm font-semibold bg-primary text-primary-foreground rounded-full">
                {category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
              {title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              {excerpt}
            </p>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 pb-8 mb-8 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <img
                  src={author.avatar}
                  alt={author.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 dark:text-white">
                    <User className="h-3 w-3" />
                    {author.name}
                  </div>
                  {author.role && (
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {author.role}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{publishedDate}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{readTime}</span>
                </div>
              </div>
            </div>

            {/* Article Content */}
            <div
              className="prose prose-lg dark:prose-invert max-w-none mb-12"
              dangerouslySetInnerHTML={{ __html: content }}
            />

            {/* Tags */}
            <div className="pt-8 border-t border-gray-200 dark:border-gray-800">
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <a
                    key={index}
                    href="#"
                    className="inline-flex items-center gap-1 px-3 py-2 text-sm font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    <Tag className="h-3 w-3" />
                    {tag}
                  </a>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-8 mt-8 border-t border-gray-200 dark:border-gray-800">
              <Button variant="outline" className="gap-2">
                <Share2 className="h-4 w-4" />
                Share
              </Button>
              <Button variant="outline" className="gap-2">
                <Bookmark className="h-4 w-4" />
                Save
              </Button>
            </div>

            {/* Author Bio */}
            {author.bio && (
              <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800">
                <div className="flex items-start gap-4">
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="w-16 h-16 rounded-full object-cover flex-shrink-0"
                  />
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                      About {author.name}
                    </h3>
                    {author.role && (
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {author.role}
                      </p>
                    )}
                    <p className="text-gray-600 dark:text-gray-400">
                      {author.bio}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:sticky lg:top-8 h-fit space-y-8">
            {/* Related Posts */}
            {relatedPosts && relatedPosts.length > 0 && (
              <div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                  Related Articles
                </h3>
                <div className="space-y-4">
                  {relatedPosts.map((post, index) => (
                    <a
                      key={index}
                      href={post.slug}
                      className="group block bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-all"
                    >
                      <div className="relative h-32 overflow-hidden">
                        <img
                          src={post.imageUrl}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="p-3">
                        <h4 className="font-semibold text-sm text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h4>
                        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                          <Clock className="h-3 w-3" />
                          <span>{post.readTime}</span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Share Section */}
            <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Share this article
              </h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Share2 className="h-4 w-4" />
                  Share on Twitter
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Share2 className="h-4 w-4" />
                  Share on LinkedIn
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Share2 className="h-4 w-4" />
                  Copy Link
                </Button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </article>
  );
}
