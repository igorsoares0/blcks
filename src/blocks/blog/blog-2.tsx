import { Calendar, Clock, ArrowRight, User } from 'lucide-react';

interface BlogPost {
  title: string;
  excerpt: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  readTime: string;
  category: string;
  imageUrl: string;
  slug: string;
  featured?: boolean;
}

interface Blog2Props {
  title?: string;
  description?: string;
  posts?: BlogPost[];
}

export default function Blog2({
  title = 'Latest Articles',
  description = 'Insights, tutorials and best practices from our team',
  posts = [
    {
      title: 'Building Scalable React Applications',
      excerpt: 'Learn the best practices for building large-scale React applications that can grow with your team and business needs.',
      author: {
        name: 'Sarah Johnson',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
      },
      date: 'Mar 20, 2024',
      readTime: '12 min',
      category: 'React',
      imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=1200&h=600&fit=crop',
      slug: '#',
      featured: true
    },
    {
      title: 'Understanding TypeScript Generics',
      excerpt: 'Deep dive into TypeScript generics and how they can make your code more reusable and type-safe.',
      author: {
        name: 'Michael Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
      },
      date: 'Mar 18, 2024',
      readTime: '8 min',
      category: 'TypeScript',
      imageUrl: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop',
      slug: '#'
    },
    {
      title: 'CSS Grid vs Flexbox: When to Use Each',
      excerpt: 'A practical guide to choosing between CSS Grid and Flexbox for your layout needs.',
      author: {
        name: 'Emma Wilson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
      },
      date: 'Mar 15, 2024',
      readTime: '6 min',
      category: 'CSS',
      imageUrl: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=400&fit=crop',
      slug: '#'
    },
    {
      title: 'Getting Started with Next.js 15',
      excerpt: 'Explore the new features in Next.js 15 and learn how to migrate your existing applications.',
      author: {
        name: 'David Kim',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop'
      },
      date: 'Mar 12, 2024',
      readTime: '10 min',
      category: 'Next.js',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
      slug: '#'
    }
  ]
}: Blog2Props) {
  const featuredPost = posts.find(post => post.featured);
  const regularPosts = posts.filter(post => !post.featured);

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 text-gray-900 dark:text-white">
            {title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <article className="mb-16">
            <a
              href={featuredPost.slug}
              className="group grid gap-8 lg:grid-cols-2 items-center bg-gray-50 dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-64 lg:h-full overflow-hidden">
                <img
                  src={featuredPost.imageUrl}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary text-primary-foreground rounded-full">
                    Featured
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 lg:p-12">
                <div className="inline-block px-3 py-1 text-xs font-medium bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full mb-4">
                  {featuredPost.category}
                </div>

                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                  {featuredPost.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 mb-6 line-clamp-3">
                  {featuredPost.excerpt}
                </p>

                {/* Author & Meta */}
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={featuredPost.author.avatar}
                    alt={featuredPost.author.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 text-sm text-gray-900 dark:text-white font-medium">
                      <User className="h-3 w-3" />
                      {featuredPost.author.name}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{featuredPost.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{featuredPost.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="inline-flex items-center text-primary font-medium text-sm group-hover:gap-3 transition-all">
                  Read article
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </a>
          </article>
        )}

        {/* Regular Posts Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {regularPosts.map((post, index) => (
            <article
              key={index}
              className="group bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all duration-300"
            >
              {/* Image */}
              <a href={post.slug} className="relative block h-48 overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-white/90 dark:bg-gray-900/90 text-gray-900 dark:text-white rounded-full backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>
              </a>

              {/* Content */}
              <div className="p-6">
                <a href={post.slug}>
                  <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                </a>

                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 text-sm">
                  {post.excerpt}
                </p>

                {/* Author & Meta */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {post.author.name}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
