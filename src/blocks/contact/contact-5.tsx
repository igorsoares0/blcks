import { Mail, Phone, MessageCircle, Send, Shield, Zap, Users, HeadphonesIcon, Clock, CheckCircle2 } from 'lucide-react';

interface SupportChannel {
  icon: string;
  title: string;
  description: string;
  availability: string;
  responseTime: string;
}

interface TeamMember {
  name: string;
  role: string;
  avatar: string;
}

interface Contact5Props {
  title?: string;
  subtitle?: string;
  supportChannels?: SupportChannel[];
  teamMembers?: TeamMember[];
  guarantees?: string[];
  showTeam?: boolean;
  showGuarantees?: boolean;
}

export default function Contact5({
  title = 'We\'re Here to Help',
  subtitle = 'Choose the best way to reach our team. We\'re committed to providing you with exceptional support.',
  supportChannels = [
    {
      icon: 'MessageCircle',
      title: 'Live Chat',
      description: 'Chat with our support team in real-time',
      availability: '24/7',
      responseTime: 'Instant'
    },
    {
      icon: 'Mail',
      title: 'Email Support',
      description: 'Send us a detailed message',
      availability: 'Always open',
      responseTime: '< 2 hours'
    },
    {
      icon: 'Phone',
      title: 'Phone Support',
      description: 'Speak directly with our specialists',
      availability: 'Mon-Fri, 9am-6pm EST',
      responseTime: '< 5 min'
    }
  ],
  teamMembers = [
    {
      name: 'Sarah Johnson',
      role: 'Support Lead',
      avatar: 'https://i.pravatar.cc/150?img=1'
    },
    {
      name: 'Michael Chen',
      role: 'Technical Support',
      avatar: 'https://i.pravatar.cc/150?img=3'
    },
    {
      name: 'Emily Davis',
      role: 'Customer Success',
      avatar: 'https://i.pravatar.cc/150?img=5'
    }
  ],
  guarantees = [
    'Response within 2 hours',
    'No automated responses',
    'Expert human support',
    'Follow-up until resolved'
  ],
  showTeam = true,
  showGuarantees = true
}: Contact5Props) {
  const getIcon = (iconName: string) => {
    const icons: Record<string, React.ReactElement> = {
      MessageCircle: <MessageCircle className="h-6 w-6" />,
      Mail: <Mail className="h-6 w-6" />,
      Phone: <Phone className="h-6 w-6" />,
      HeadphonesIcon: <HeadphonesIcon className="h-5 w-5" />,
    };
    return icons[iconName] || <MessageCircle className="h-6 w-6" />;
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 dark:from-primary/10 dark:via-transparent dark:to-primary/20" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary mb-6">
              <HeadphonesIcon className="h-4 w-4" />
              24/7 Support Available
            </div>
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6">
              {title}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {subtitle}
            </p>
          </div>

          {/* Support Channels */}
          <div className="grid gap-6 md:grid-cols-3 mb-16">
            {supportChannels.map((channel, idx) => (
              <div
                key={idx}
                className="group relative bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-8 hover:border-primary transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/60 text-white group-hover:scale-110 transition-transform">
                    {getIcon(channel.icon)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{channel.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {channel.description}
                    </p>
                    <div className="space-y-2">
                      <div className="inline-flex items-center gap-2 text-xs font-medium bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-3 py-1 rounded-full">
                        <Clock className="h-3 w-3" />
                        {channel.availability}
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Avg. response: <strong>{channel.responseTime}</strong>
                      </p>
                    </div>
                  </div>
                  <button className="mt-4 inline-flex items-center justify-center gap-2 w-full rounded-lg text-sm font-semibold transition-all bg-primary/10 text-primary hover:bg-primary hover:text-white h-11 px-6">
                    Start Conversation
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-12 lg:grid-cols-5">
            {/* Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                    <Send className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Send a Message</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">We'll get back to you ASAP</p>
                  </div>
                </div>

                <form className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="John Doe"
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="john@example.com"
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Subject *
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      placeholder="How can we help you?"
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="priority" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Priority Level
                    </label>
                    <select
                      id="priority"
                      name="priority"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="low">Low - General inquiry</option>
                      <option value="medium">Medium - Need assistance</option>
                      <option value="high">High - Urgent issue</option>
                      <option value="critical">Critical - System down</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      placeholder="Please provide as much detail as possible so we can help you better..."
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    />
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                    <Shield className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-900 dark:text-blue-100">
                      <strong>Your privacy matters.</strong> All information is encrypted and will never be shared with third parties.
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-all bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] h-12 px-8 shadow-lg"
                  >
                    <Send className="h-4 w-4" />
                    Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-6">
              {/* Support Guarantees */}
              {showGuarantees && guarantees && guarantees.length > 0 && (
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-200 dark:border-green-800 p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-green-500 text-white">
                      <Zap className="h-5 w-5" />
                    </div>
                    <h3 className="text-lg font-bold text-green-900 dark:text-green-100">
                      Our Guarantee
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {guarantees.map((guarantee, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0" />
                        <p className="text-sm font-medium text-green-900 dark:text-green-100">
                          {guarantee}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Team Members */}
              {showTeam && teamMembers && teamMembers.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                      <Users className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold">Meet Our Team</h3>
                  </div>
                  <div className="space-y-4">
                    {teamMembers.map((member, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                        />
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-gray-100">
                            {member.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {member.role}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
                      <strong>Real humans</strong>, ready to help you succeed
                    </p>
                  </div>
                </div>
              )}

              {/* Quick Stats */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                <h3 className="text-lg font-bold mb-4">Support Stats</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-900">
                    <p className="text-3xl font-bold text-primary">98%</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Satisfaction</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-900">
                    <p className="text-3xl font-bold text-primary">2h</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Avg. Response</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-900">
                    <p className="text-3xl font-bold text-primary">24/7</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Availability</p>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-900">
                    <p className="text-3xl font-bold text-primary">50k+</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">Tickets Solved</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
