import { Calendar, Clock, User, ArrowRight, Search, Filter, Tag, TrendingUp } from 'lucide-react';

interface Author {
  name: string;
  avatar: string;
}

interface Post {
  title: string;
  excerpt: string;
  image: string;
  author: Author;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  href: string;
  featured?: boolean;
}

interface Category {
  name: string;
  count: number;
  href: string;
}

interface Blog4Props {
  title?: string;
  subtitle?: string;
  posts?: Post[];
  categories?: Category[];
  featuredTitle?: string;
  searchPlaceholder?: string;
  filterText?: string;
  allCategoriesText?: string;
  readMoreText?: string;
  loadMoreText?: string;
}

export default function Blog4({
  title = 'Our Blog',
  subtitle = 'Insights, stories and ideas from our team',
  posts = [
    {
      title: 'Building Scalable Applications with Next.js 15',
      excerpt: 'Learn how to leverage the latest features in Next.js 15 to build performant and scalable web applications.',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=500&fit=crop',
      author: {
        name: 'Alex Thompson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop'
      },
      date: 'Mar 18, 2024',
      readTime: '8 min read',
      category: 'Development',
      tags: ['Next.js', 'React', 'Performance'],
      href: '#',
      featured: true
    },
    {
      title: 'The Future of Web Design: Trends for 2024',
      excerpt: 'Explore the emerging design trends that are shaping the future of web development and user experience.',
      image: 'https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=500&fit=crop',
      author: {
        name: 'Sarah Miller',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
      },
      date: 'Mar 15, 2024',
      readTime: '6 min read',
      category: 'Design',
      tags: ['UI/UX', 'Trends', 'Design'],
      href: '#'
    },
    {
      title: 'TypeScript Best Practices for Large Projects',
      excerpt: 'Discover essential TypeScript patterns and practices that will help you maintain clean code in large-scale applications.',
      image: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=500&fit=crop',
      author: {
        name: 'Michael Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
      },
      date: 'Mar 12, 2024',
      readTime: '10 min read',
      category: 'Development',
      tags: ['TypeScript', 'Best Practices', 'Code Quality'],
      href: '#'
    },
    {
      title: 'Optimizing Web Performance: A Complete Guide',
      excerpt: 'Deep dive into performance optimization techniques that will make your web applications lightning fast.',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
      author: {
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
      },
      date: 'Mar 10, 2024',
      readTime: '12 min read',
      category: 'Performance',
      tags: ['Performance', 'Optimization', 'Web Vitals'],
      href: '#'
    },
    {
      title: 'Introduction to Server Components in React',
      excerpt: 'Understanding React Server Components and how they can improve your application architecture.',
      image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=500&fit=crop',
      author: {
        name: 'David Park',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop'
      },
      date: 'Mar 8, 2024',
      readTime: '7 min read',
      category: 'Development',
      tags: ['React', 'Server Components', 'Architecture'],
      href: '#'
    },
    {
      title: 'Designing Accessible Web Interfaces',
      excerpt: 'Learn the principles of accessible design and how to create inclusive experiences for all users.',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=500&fit=crop',
      author: {
        name: 'Lisa Anderson',
        avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop'
      },
      date: 'Mar 5, 2024',
      readTime: '9 min read',
      category: 'Design',
      tags: ['Accessibility', 'UX', 'Inclusive Design'],
      href: '#'
    }
  ],
  categories = [
    { name: 'All', count: 42, href: '#' },
    { name: 'Development', count: 18, href: '#' },
    { name: 'Design', count: 12, href: '#' },
    { name: 'Performance', count: 8, href: '#' },
    { name: 'Business', count: 4, href: '#' }
  ],
  featuredTitle = 'Featured Post',
  searchPlaceholder = 'Search articles...',
  filterText = 'Filter by category',
  allCategoriesText = 'All Categories',
  readMoreText = 'Read More',
  loadMoreText = 'Load More Articles'
}: Blog4Props) {
  const featuredPost = posts.find(post => post.featured);
  const regularPosts = posts.filter(post => !post.featured);

  return (
    <section className="w-full py-12 md:py-20 lg:py-24 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h1>
          <p className="max-w-2xl text-xl text-gray-600 dark:text-gray-400">
            {subtitle}
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder={searchPlaceholder}
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="relative min-w-[200px]">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
              <select className="w-full appearance-none pl-12 pr-10 py-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                <option>{allCategoriesText}</option>
                {categories.slice(1).map((category, index) => (
                  <option key={index}>{category.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Categories Pills */}
          <div className="flex flex-wrap gap-2 mt-6">
            {categories.map((category, index) => (
              <a
                key={index}
                href={category.href}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white transition-all duration-300 text-sm font-medium"
              >
                {category.name}
                <span className="text-xs opacity-75">({category.count})</span>
              </a>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-16">
            <div className="flex items-center gap-2 mb-6">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {featuredTitle}
              </h2>
            </div>
            <a
              href={featuredPost.href}
              className="group block bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-primary dark:hover:border-primary transition-all duration-300 hover:shadow-2xl"
            >
              <div className="grid md:grid-cols-2 gap-0">
                <div className="aspect-video md:aspect-auto overflow-hidden">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-8 md:p-10 flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4 w-fit">
                    {featuredPost.category}
                  </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-primary transition-colors">
                    {featuredPost.title}
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex flex-wrap items-center gap-6 mb-6">
                    <div className="flex items-center gap-3">
                      <img
                        src={featuredPost.author.avatar}
                        alt={featuredPost.author.name}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="text-sm">
                        <div className="font-medium text-gray-900 dark:text-white">
                          {featuredPost.author.name}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="h-4 w-4" />
                        {featuredPost.date}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4" />
                        {featuredPost.readTime}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {featuredPost.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-medium"
                      >
                        <Tag className="h-3 w-3" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-4 transition-all">
                    {readMoreText}
                    <ArrowRight className="h-5 w-5" />
                  </div>
                </div>
              </div>
            </a>
          </div>
        )}

        {/* Regular Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {regularPosts.map((post, index) => (
            <a
              key={index}
              href={post.href}
              className="group block bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:border-primary dark:hover:border-primary transition-all duration-300 hover:shadow-xl"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
                  {post.category}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200 dark:border-gray-800">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {post.author.name}
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" />
                    {post.readTime}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center">
          <button className="inline-flex items-center gap-2 px-8 py-4 rounded-lg bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold hover:bg-gray-800 dark:hover:bg-gray-100 transition-all duration-300 hover:shadow-lg">
            {loadMoreText}
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
