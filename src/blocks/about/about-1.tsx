interface TeamMember {
  name: string;
  role: string;
  imageUrl: string;
}

interface About1Props {
  title?: string;
  description?: string;
  mission?: string;
  stats?: Array<{
    value: string;
    label: string;
  }>;
  team?: TeamMember[];
}

export default function About1({
  title = 'About us',
  description = 'We are a team passionate about creating incredible digital experiences. Our mission is to help companies transform their ideas into products that people love.',
  mission = 'Democratize access to high-quality components for developers worldwide.',
  stats = [
    { value: '50+', label: 'Components' },
    { value: '10k+', label: 'Developers' },
    { value: '100%', label: 'Open Source' },
    { value: '24/7', label: 'Support' }
  ],
  team = [
    {
      name: 'Ana Silva',
      role: 'CEO & Founder',
      imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop'
    },
    {
      name: 'Carlos Santos',
      role: 'CTO',
      imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop'
    },
    {
      name: 'Marina Costa',
      role: 'Head of Design',
      imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop'
    },
    {
      name: 'Pedro Oliveira',
      role: 'Lead Developer',
      imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop'
    }
  ]
}: About1Props) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            {title}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>

        {/* Mission */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              {mission}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Team */}
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-12">Our Team</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-4 overflow-hidden rounded-xl">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h4 className="font-semibold text-lg mb-1">{member.name}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {member.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
