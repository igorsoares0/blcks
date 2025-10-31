import { Calendar, Clock, User, ArrowRight, Bookmark, Heart, MessageCircle, Eye, TrendingUp, Sparkles } from 'lucide-react';

interface Author {
  name: string;
  avatar: string;
  role?: string;
}

interface Post {
  title: string;
  excerpt: string;
  image: string;
  author: Author;
  date: string;
  readTime: string;
  category: string;
  href: string;
  views?: string;
  likes?: string;
  comments?: string;
  trending?: boolean;
}

interface Blog5Props {
  title?: string;
  subtitle?: string;
  posts?: Post[];
  ctaText?: string;
  viewAllText?: string;
  trendingText?: string;
}

export default function Blog5({
  title = 'Latest Stories',
  subtitle = 'Discover insights, tutorials, and stories from our community',
  posts = [
    {
      title: 'Mastering React Server Components',
      excerpt: 'A deep dive into React Server Components and how they revolutionize data fetching in modern web applications.',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=600&fit=crop',
      author: {
        name: 'Alex Rivera',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
        role: 'Tech Lead'
      },
      date: 'Mar 20, 2024',
      readTime: '10 min',
      category: 'React',
      href: '#',
      views: '2.4k',
      likes: '156',
      comments: '24',
      trending: true
    },
    {
      title: 'Building Accessible Design Systems',
      excerpt: 'Learn how to create inclusive design systems that work for everyone, with practical examples and best practices.',
      image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=600&fit=crop',
      author: {
        name: 'Maya Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
        role: 'Design Engineer'
      },
      date: 'Mar 18, 2024',
      readTime: '8 min',
      category: 'Design',
      href: '#',
      views: '1.8k',
      likes: '98',
      comments: '15',
      trending: true
    },
    {
      title: 'TypeScript 5.4: What\'s New',
      excerpt: 'Explore the latest features in TypeScript 5.4 and how they improve developer experience and type safety.',
      image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=600&fit=crop',
      author: {
        name: 'Jordan Lee',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
        role: 'Senior Developer'
      },
      date: 'Mar 15, 2024',
      readTime: '6 min',
      category: 'TypeScript',
      href: '#',
      views: '3.1k',
      likes: '203',
      comments: '31'
    },
    {
      title: 'Web Performance in 2024',
      excerpt: 'Essential performance optimization techniques that will make your websites blazing fast this year.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      author: {
        name: 'Sam Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop',
        role: 'Performance Expert'
      },
      date: 'Mar 12, 2024',
      readTime: '12 min',
      category: 'Performance',
      href: '#',
      views: '2.7k',
      likes: '178',
      comments: '42'
    },
    {
      title: 'CSS Grid Layout Patterns',
      excerpt: 'Master modern CSS Grid patterns for building complex, responsive layouts with ease.',
      image: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=600&fit=crop',
      author: {
        name: 'Taylor Kim',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
        role: 'CSS Specialist'
      },
      date: 'Mar 10, 2024',
      readTime: '9 min',
      category: 'CSS',
      href: '#',
      views: '1.5k',
      likes: '89',
      comments: '18'
    },
    {
      title: 'API Design Best Practices',
      excerpt: 'Learn how to design RESTful APIs that are intuitive, scalable, and easy to maintain.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=600&fit=crop',
      author: {
        name: 'Chris Martinez',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
        role: 'Backend Engineer'
      },
      date: 'Mar 8, 2024',
      readTime: '11 min',
      category: 'Backend',
      href: '#',
      views: '2.1k',
      likes: '134',
      comments: '28'
    }
  ],
  ctaText = 'Read Article',
  viewAllText = 'View All Articles',
  trendingText = 'Trending'
}: Blog5Props) {
  const trendingPosts = posts.filter(post => post.trending);
  const regularPosts = posts.filter(post => !post.trending);

  return (
    <section className="w-full py-12 md:py-20 lg:py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-2">
            <Sparkles className="h-4 w-4" />
            New Stories Every Week
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white max-w-3xl">
            {title}
          </h1>
          <p className="max-w-2xl text-xl text-gray-600 dark:text-gray-400">
            {subtitle}
          </p>
        </div>

        {/* Trending Section */}
        {trendingPosts.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-8">
              <TrendingUp className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {trendingText}
              </h2>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              {trendingPosts.map((post, index) => (
                <a
                  key={index}
                  href={post.href}
                  className="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-primary dark:hover:border-primary transition-all duration-300 hover:shadow-2xl"
                >
                  {/* Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-white text-xs font-bold shadow-lg">
                      <TrendingUp className="h-3 w-3" />
                      {trendingText}
                    </div>
                  </div>

                  {/* Image */}
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6 md:p-8">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
                      {post.category}
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-2">
                      {post.excerpt}
                    </p>

                    {/* Author & Meta */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={post.author.avatar}
                          alt={post.author.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white text-sm">
                            {post.author.name}
                          </div>
                          {post.author.role && (
                            <div className="text-xs text-gray-600 dark:text-gray-400">
                              {post.author.role}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {post.readTime}
                        </div>
                      </div>
                    </div>

                    {/* Engagement Stats */}
                    <div className="flex items-center gap-6 mt-6 pt-6 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <Eye className="h-4 w-4" />
                        {post.views}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Heart className="h-4 w-4" />
                        {post.likes}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <MessageCircle className="h-4 w-4" />
                        {post.comments}
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Regular Posts - Masonry Style */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {regularPosts.map((post, index) => (
            <a
              key={index}
              href={post.href}
              className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-primary dark:hover:border-primary transition-all duration-300 hover:shadow-xl flex flex-col"
            >
              {/* Image */}
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                    {post.category}
                  </span>
                  <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
                    <Bookmark className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 flex-1">
                  {post.excerpt}
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200 dark:border-gray-800">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {post.author.name}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Eye className="h-3.5 w-3.5" />
                      {post.views}
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-3.5 w-3.5" />
                      {post.likes}
                    </div>
                  </div>
                  <div className="flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                    Read
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gradient-to-r from-primary to-primary/80 text-white font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            {viewAllText}
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
