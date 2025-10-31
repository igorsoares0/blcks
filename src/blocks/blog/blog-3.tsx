import { Calendar, Clock, ArrowRight, Tag } from 'lucide-react';

interface BlogPost {
  title: string;
  excerpt: string;
  author: {
    name: string;
    avatar: string;
    role?: string;
  };
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  imageUrl: string;
  slug: string;
}

interface Blog3Props {
  title?: string;
  description?: string;
  posts?: BlogPost[];
}

export default function Blog3({
  title = 'From the Blog',
  description = 'Latest news, articles and resources from our team',
  posts = [
    {
      title: 'How to Build a Modern Web Application with Next.js 15',
      excerpt: 'Discover the latest features in Next.js 15 and learn how to leverage them to build faster, more efficient web applications. From App Router to Server Components, we cover everything you need to know.',
      author: {
        name: 'Alex Rivera',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
        role: 'Senior Developer'
      },
      date: 'Mar 24, 2024',
      readTime: '15 min',
      category: 'Development',
      tags: ['Next.js', 'React', 'Web Dev'],
      imageUrl: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=1200&h=600&fit=crop',
      slug: '#'
    },
    {
      title: 'Design Systems: Building Consistency at Scale',
      excerpt: 'Learn how to create and maintain a design system that scales with your organization. We share practical tips and real-world examples from companies that got it right.',
      author: {
        name: 'Maria Santos',
        avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop',
        role: 'Design Lead'
      },
      date: 'Mar 22, 2024',
      readTime: '12 min',
      category: 'Design',
      tags: ['Design System', 'UI/UX', 'Figma'],
      imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=600&fit=crop',
      slug: '#'
    },
    {
      title: 'Mastering TypeScript: Advanced Types and Patterns',
      excerpt: 'Take your TypeScript skills to the next level with advanced type techniques. From conditional types to mapped types, explore patterns that will make your code more robust and maintainable.',
      author: {
        name: 'James Chen',
        avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop',
        role: 'Tech Lead'
      },
      date: 'Mar 20, 2024',
      readTime: '10 min',
      category: 'Programming',
      tags: ['TypeScript', 'JavaScript', 'Best Practices'],
      imageUrl: 'https://images.unsplash.com/photo-1587620962725-abab7fe55159?w=1200&h=600&fit=crop',
      slug: '#'
    },
    {
      title: 'The Future of Web Performance: Core Web Vitals and Beyond',
      excerpt: 'Performance is more important than ever. Understand Core Web Vitals, learn optimization techniques, and discover how to measure and improve your website\'s performance metrics.',
      author: {
        name: 'Sophie Turner',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
        role: 'Performance Engineer'
      },
      date: 'Mar 18, 2024',
      readTime: '8 min',
      category: 'Performance',
      tags: ['Web Performance', 'SEO', 'Optimization'],
      imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=600&fit=crop',
      slug: '#'
    }
  ]
}: Blog3Props) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 md:px-6 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4 text-gray-900 dark:text-white">
            {title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* Posts List */}
        <div className="space-y-8">
          {posts.map((post, index) => (
            <article
              key={index}
              className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-xl transition-all duration-300"
            >
              <a href={post.slug} className="grid md:grid-cols-[300px_1fr] lg:grid-cols-[400px_1fr] gap-6">
                {/* Image */}
                <div className="relative h-64 md:h-full overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary text-primary-foreground rounded-full">
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 lg:p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-2xl lg:text-3xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {post.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md"
                        >
                          <Tag className="h-3 w-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Author & Meta */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-800">
                    <div className="flex items-center gap-3">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <div className="text-sm font-semibold text-gray-900 dark:text-white">
                          {post.author.name}
                        </div>
                        {post.author.role && (
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {post.author.role}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span className="hidden sm:inline">{post.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                      <div className="hidden sm:flex items-center gap-1 text-primary font-medium group-hover:gap-2 transition-all">
                        Read
                        <ArrowRight className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
