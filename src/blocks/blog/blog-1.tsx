import { Calendar, Clock, ArrowRight } from 'lucide-react';

interface BlogPost {
  title: string;
  excerpt: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  imageUrl: string;
  slug: string;
}

interface Blog1Props {
  title?: string;
  description?: string;
  posts?: BlogPost[];
}

export default function Blog1({
  title = 'Blog',
  description = 'Articles, tutorials and news about development',
  posts = [
    {
      title: 'How to create reusable components with React',
      excerpt: 'Learn best practices for creating React components that can be reused in any project.',
      author: 'Ana Silva',
      date: '15 Mar 2024',
      readTime: '5 min',
      category: 'React',
      imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
      slug: '#'
    },
    {
      title: 'Complete TypeScript guide for beginners',
      excerpt: 'Discover how TypeScript can improve your code quality and increase your productivity.',
      author: 'Carlos Santos',
      date: '12 Mar 2024',
      readTime: '8 min',
      category: 'TypeScript',
      imageUrl: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop',
      slug: '#'
    },
    {
      title: 'Optimizing performance in Next.js 15',
      excerpt: 'Advanced techniques to improve the performance of your Next.js applications and provide an amazing experience.',
      author: 'Marina Costa',
      date: '10 Mar 2024',
      readTime: '6 min',
      category: 'Next.js',
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop',
      slug: '#'
    },
    {
      title: 'Design Systems: From zero to implementation',
      excerpt: 'Learn how to create and maintain a scalable design system that grows with your product.',
      author: 'Pedro Oliveira',
      date: '08 Mar 2024',
      readTime: '10 min',
      category: 'Design',
      imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=400&fit=crop',
      slug: '#'
    },
    {
      title: 'Tailwind CSS: Beyond the basics',
      excerpt: 'Explore advanced Tailwind CSS features to create unique and performant interfaces.',
      author: 'Ana Silva',
      date: '05 Mar 2024',
      readTime: '7 min',
      category: 'CSS',
      imageUrl: 'https://images.unsplash.com/photo-1507721999472-8ed4421c4af2?w=800&h=400&fit=crop',
      slug: '#'
    },
    {
      title: 'State Management in React: Which one to choose?',
      excerpt: 'Compare the main state management solutions and choose the best one for your project.',
      author: 'Carlos Santos',
      date: '01 Mar 2024',
      readTime: '12 min',
      category: 'React',
      imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop',
      slug: '#'
    }
  ]
}: Blog1Props) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>

        {/* Posts Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <article
              key={index}
              className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary text-primary-foreground rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  <a href={post.slug}>{post.title}</a>
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <a
                    href={post.slug}
                    className="text-primary hover:underline inline-flex items-center text-sm font-medium"
                  >
                    Read more
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </a>
                </div>

                {/* Author */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    By <span className="font-medium text-gray-900 dark:text-white">{post.author}</span>
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
