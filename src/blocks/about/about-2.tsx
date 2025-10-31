import { Target, Rocket, Handshake, Lightbulb } from 'lucide-react';

interface Value {
  icon: 'target' | 'rocket' | 'handshake' | 'lightbulb';
  title: string;
  description: string;
}

interface Stat {
  value: string;
  label: string;
}

interface About2Props {
  badge?: string;
  title?: string;
  description?: string;
  values?: Value[];
  stats?: Stat[];
  imageUrl?: string;
}

export default function About2({
  badge = 'About Us',
  title = 'Building the future of digital products',
  description = 'We are a team of passionate creators, designers, and developers dedicated to crafting exceptional digital experiences. Our mission is to help businesses thrive in the digital age through innovative solutions and cutting-edge technology.',
  values = [
    {
      icon: 'target',
      title: 'Mission Driven',
      description: 'Every decision we make is guided by our commitment to delivering value'
    },
    {
      icon: 'rocket',
      title: 'Innovation First',
      description: 'We push boundaries and embrace new technologies to stay ahead'
    },
    {
      icon: 'handshake',
      title: 'Customer Focused',
      description: 'Your success is our success. We put customers at the heart of everything'
    },
    {
      icon: 'lightbulb',
      title: 'Creative Solutions',
      description: 'We think outside the box to solve complex problems elegantly'
    }
  ],
  stats = [
    { value: '10+', label: 'Years Experience' },
    { value: '500+', label: 'Projects Completed' },
    { value: '50+', label: 'Team Members' },
    { value: '98%', label: 'Client Satisfaction' }
  ],
  imageUrl = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop'
}: About2Props) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'target':
        return <Target className="h-8 w-8" />;
      case 'rocket':
        return <Rocket className="h-8 w-8" />;
      case 'handshake':
        return <Handshake className="h-8 w-8" />;
      case 'lightbulb':
        return <Lightbulb className="h-8 w-8" />;
      default:
        return <Target className="h-8 w-8" />;
    }
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4 md:px-6">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center rounded-full border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 px-4 py-2 text-sm font-medium text-gray-900 dark:text-gray-100">
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

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 max-w-5xl mx-auto">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <span className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-2">
                {stat.value}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </span>
            </div>
          ))}
        </div>

        {/* Split Content */}
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center mb-16">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-xl">
              <img
                src={imageUrl}
                alt="Team collaboration"
                className="w-full h-auto object-cover aspect-[4/3]"
              />
            </div>
          </div>

          {/* Values Grid */}
          <div className="order-1 lg:order-2">
            <div className="grid gap-6">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="flex gap-4 p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 hover:shadow-md transition-shadow"
                >
                  <div className="flex-shrink-0 text-blue-600 dark:text-blue-400">
                    {getIcon(value.icon)}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-gray-900 dark:text-white">
                      {value.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {value.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
