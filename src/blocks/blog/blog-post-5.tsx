import { Calendar, Clock, User, Eye, ThumbsUp, MessageSquare, Share2, Bookmark, ArrowLeft, ArrowRight, Twitter, Linkedin, Facebook, Link2, Mail, TrendingUp } from 'lucide-react';

interface Author {
  name: string;
  avatar: string;
  twitter?: string;
}

interface Tag {
  label: string;
  href: string;
}

interface Comment {
  id: string;
  author: string;
  avatar: string;
  content: string;
  timestamp: string;
  likes: number;
}

interface RelatedPost {
  title: string;
  image: string;
  href: string;
  readTime: string;
  views: string;
}

interface BlogPost5Props {
  title?: string;
  author?: Author;
  publishDate?: string;
  readTime?: string;
  views?: string;
  likes?: number;
  commentsCount?: number;
  coverImage?: string;
  tags?: Tag[];
  content?: string;
  comments?: Comment[];
  relatedPosts?: RelatedPost[];
  backText?: string;
  likeText?: string;
  saveText?: string;
  shareText?: string;
  commentsTitle?: string;
  relatedTitle?: string;
}

export default function BlogPost5({
  title = 'Building a Design System from Scratch: Lessons Learned',
  author = {
    name: 'Emily Chen',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    twitter: '@emilychen'
  },
  publishDate = 'March 25, 2024',
  readTime = '10 min read',
  views = '12.5K',
  likes = 342,
  commentsCount = 28,
  coverImage = 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=600&fit=crop',
  tags = [
    { label: 'Design Systems', href: '#' },
    { label: 'UI/UX', href: '#' },
    { label: 'Component Library', href: '#' }
  ],
  content = `
    <p className="lead">Creating a design system is one of the most impactful projects a design or engineering team can undertake. It's also one of the most challenging. Here's what we learned building ours from the ground up.</p>

    <h2>Start with the Fundamentals</h2>
    <p>Before jumping into components, establish your foundation: colors, typography, spacing, and elevation. These primitives will inform every design decision that follows.</p>

    <p>We started by auditing our existing products to identify patterns and inconsistencies. This revealed that we were using 47 different shades of gray across our applications. By consolidating to a well-defined scale of 10 grays, we immediately improved visual consistency.</p>

    <h3>Typography That Scales</h3>
    <p>Your type scale needs to work across different contexts—from marketing pages to dense data tables. We adopted a modular scale with a 1.25 ratio, giving us enough variety without overwhelming designers with too many options.</p>

    <blockquote>
      "A design system isn't just a component library—it's a shared language that enables teams to move faster while maintaining quality and consistency."
    </blockquote>

    <h2>Build Components Iteratively</h2>
    <p>Don't try to build everything at once. We prioritized components based on frequency of use and impact on consistency. Buttons, form fields, and cards came first. Complex patterns like data tables and calendars came later.</p>

    <p>Each component went through multiple iterations, informed by real usage across our products. We learned that documentation is just as important as code—components that weren't well-documented simply weren't adopted.</p>

    <h3>The Importance of Variants</h3>
    <p>Every component needs thoughtful variant design. Too few variants and teams create one-offs. Too many and the system becomes overwhelming. We settled on a principle: provide common variants out of the box, but make customization possible.</p>

    <h2>Governance and Evolution</h2>
    <p>A design system is never done. It needs to evolve with your product and organization. We established a working group that meets weekly to review proposals, discuss issues, and plan the roadmap.</p>

    <p>The key is balancing stability with innovation. Major changes require broader buy-in and migration paths. Minor improvements can ship more quickly.</p>
  `,
  comments = [
    {
      id: '1',
      author: 'Marcus Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
      content: 'Great insights! We\'re just starting our design system journey and this is incredibly helpful. The point about starting with primitives really resonates.',
      timestamp: '2 hours ago',
      likes: 12
    },
    {
      id: '2',
      author: 'Sarah Thompson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
      content: 'How did you handle versioning and breaking changes? That\'s been our biggest challenge.',
      timestamp: '5 hours ago',
      likes: 8
    },
    {
      id: '3',
      author: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
      content: 'The documentation point is so important. We\'ve found that investing in great examples and usage guidelines dramatically improves adoption.',
      timestamp: '1 day ago',
      likes: 15
    }
  ],
  relatedPosts = [
    {
      title: 'Component API Design: Best Practices',
      image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?w=400&h=300&fit=crop',
      href: '#',
      readTime: '7 min',
      views: '8.2K'
    },
    {
      title: 'Documenting Your Design System',
      image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=300&fit=crop',
      href: '#',
      readTime: '6 min',
      views: '6.5K'
    },
    {
      title: 'Scaling Design Tokens Across Platforms',
      image: 'https://images.unsplash.com/photo-1557853197-aefb550b6fdc?w=400&h=300&fit=crop',
      href: '#',
      readTime: '9 min',
      views: '9.1K'
    }
  ],
  backText = 'Back to Blog',
  likeText = 'Like',
  saveText = 'Save',
  shareText = 'Share',
  commentsTitle = 'Comments',
  relatedTitle = 'Related Articles'
}: BlogPost5Props) {
  return (
    <article className="w-full bg-white dark:bg-gray-950">
      {/* Navigation Bar */}
      <div className="sticky top-0 z-40 border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-950/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {backText}
            </a>
            <div className="flex items-center gap-2">
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors">
                <ThumbsUp className="h-4 w-4" />
                <span className="hidden sm:inline">{likeText}</span>
                <span className="text-gray-500 dark:text-gray-500">{likes}</span>
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors">
                <Bookmark className="h-4 w-4" />
                <span className="hidden sm:inline">{saveText}</span>
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-900 transition-colors">
                <Share2 className="h-4 w-4" />
                <span className="hidden sm:inline">{shareText}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
            {title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 mb-8">
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
                {author.twitter && (
                  <a
                    href={`https://twitter.com/${author.twitter.replace('@', '')}`}
                    className="text-sm text-primary hover:underline"
                  >
                    {author.twitter}
                  </a>
                )}
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {publishDate}
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {readTime}
              </div>
              <div className="flex items-center gap-1.5">
                <Eye className="h-4 w-4" />
                {views} views
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-8">
            {tags.map((tag, index) => (
              <a
                key={index}
                href={tag.href}
                className="px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-900 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              >
                {tag.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Cover Image */}
      <div className="mb-12">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-auto object-cover max-h-[600px]"
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 md:px-6 pb-12">
        <div className="max-w-3xl mx-auto">
          <div
            className="prose prose-lg dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6 prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 prose-blockquote:italic prose-blockquote:text-gray-600 dark:prose-blockquote:text-gray-400 prose-lead:text-xl prose-lead:text-gray-600 dark:prose-lead:text-gray-400"
            dangerouslySetInnerHTML={{ __html: content }}
          />

          {/* Social Share Bar */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Share this article:
                </span>
                <div className="flex items-center gap-2">
                  <button className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary hover:text-white transition-all">
                    <Twitter className="h-4 w-4" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary hover:text-white transition-all">
                    <Linkedin className="h-4 w-4" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary hover:text-white transition-all">
                    <Facebook className="h-4 w-4" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary hover:text-white transition-all">
                    <Mail className="h-4 w-4" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-primary hover:text-white transition-all">
                    <Link2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600 dark:text-gray-400">
                <span className="flex items-center gap-1.5">
                  <ThumbsUp className="h-4 w-4" />
                  {likes}
                </span>
                <span className="flex items-center gap-1.5">
                  <MessageSquare className="h-4 w-4" />
                  {commentsCount}
                </span>
              </div>
            </div>
          </div>

          {/* Author Bio */}
          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
            <div className="flex items-start gap-6">
              <img
                src={author.avatar}
                alt={author.name}
                className="w-20 h-20 rounded-full object-cover flex-shrink-0"
              />
              <div>
                <div className="text-sm font-semibold text-primary mb-1">
                  About the author
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  {author.name}
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  Design system architect and UX engineer. Passionate about creating scalable, accessible component libraries that empower teams to build better products faster.
                </p>
                {author.twitter && (
                  <a
                    href={`https://twitter.com/${author.twitter.replace('@', '')}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                  >
                    <Twitter className="h-4 w-4" />
                    Follow on Twitter
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              {commentsTitle} ({commentsCount})
            </h2>
            <div className="space-y-6">
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="p-6 rounded-xl bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={comment.avatar}
                      alt={comment.author}
                      className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {comment.author}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-500">
                          {comment.timestamp}
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                        {comment.content}
                      </p>
                      <button className="inline-flex items-center gap-1.5 text-sm text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                        <ThumbsUp className="h-3.5 w-3.5" />
                        {comment.likes}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      <div className="border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
              {relatedTitle}
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
                  <div className="p-6">
                    <h3 className="font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {post.readTime}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <TrendingUp className="h-3.5 w-3.5" />
                        {post.views}
                      </div>
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
