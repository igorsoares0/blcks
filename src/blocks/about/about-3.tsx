interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  bio: string;
}

interface About3Props {
  badge?: string;
  title?: string;
  description?: string;
  story?: string;
  team?: TeamMember[];
  imageUrl?: string;
}

export default function About3({
  badge = 'Our Story',
  title = 'From a vision to reality',
  description = 'What started as a simple idea has grown into a platform trusted by thousands of users worldwide.',
  story = 'Founded in 2020, we set out to solve a problem that affected countless businesses: the lack of modern, accessible, and beautiful UI components. We believed that every developer, regardless of their design skills, should have access to professional-grade components that they could customize and integrate into their projects seamlessly.\n\nToday, we continue to push the boundaries of what\'s possible, building tools that empower creators and developers to build better products faster.',
  team = [
    {
      name: 'Alex Thompson',
      role: 'CEO & Co-Founder',
      avatar: 'AT',
      bio: 'Former engineer at leading tech companies, passionate about building developer tools.'
    },
    {
      name: 'Sarah Martinez',
      role: 'CTO & Co-Founder',
      avatar: 'SM',
      bio: 'Full-stack developer with 15+ years experience in scalable systems architecture.'
    },
    {
      name: 'David Kim',
      role: 'Head of Design',
      avatar: 'DK',
      bio: 'Award-winning designer focused on creating beautiful and functional user experiences.'
    },
    {
      name: 'Emma Wilson',
      role: 'Lead Developer',
      avatar: 'EW',
      bio: 'Open-source enthusiast and expert in modern web development frameworks.'
    }
  ],
  imageUrl = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=800&fit=crop'
}: About3Props) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center rounded-full border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950 px-4 py-2 text-sm font-medium text-blue-700 dark:text-blue-300">
            {badge}
          </div>
        </div>

        {/* Title and Description */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-gray-900 dark:text-white">
            {title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 md:text-xl">
            {description}
          </p>
        </div>

        {/* Hero Image */}
        <div className="mb-16 max-w-6xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-2xl">
            <img
              src={imageUrl}
              alt="Team working together"
              className="w-full h-auto object-cover aspect-[16/9]"
            />
          </div>
        </div>

        {/* Story Text */}
        <div className="max-w-4xl mx-auto mb-24">
          <div className="prose prose-lg dark:prose-invert mx-auto">
            {story.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6 text-lg">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">
              Meet the team
            </h3>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              The people behind our success
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <div
                key={index}
                className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow"
              >
                {/* Avatar */}
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold mb-4">
                  {member.avatar}
                </div>

                {/* Info */}
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                  {member.name}
                </h4>
                <p className="text-sm text-blue-600 dark:text-blue-400 font-medium mb-3">
                  {member.role}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
