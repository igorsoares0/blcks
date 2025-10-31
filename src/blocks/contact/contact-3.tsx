import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Users, Briefcase } from 'lucide-react';

interface ContactMethod {
  icon: string;
  title: string;
  description: string;
  link: string;
  linkText: string;
}

interface Department {
  name: string;
  email: string;
  description: string;
}

interface Contact3Props {
  title?: string;
  subtitle?: string;
  contactMethods?: ContactMethod[];
  departments?: Department[];
  officeAddress?: string;
  officeHours?: string;
  showDepartments?: boolean;
}

export default function Contact3({
  title = 'Let\'s Start a Conversation',
  subtitle = 'Whether you have a question, feedback, or just want to say hello, we\'re here to help. Choose your preferred way to reach out.',
  contactMethods = [
    {
      icon: 'Mail',
      title: 'Email Us',
      description: 'Get in touch via email for general inquiries',
      link: 'mailto:support@example.com',
      linkText: 'support@example.com'
    },
    {
      icon: 'Phone',
      title: 'Call Us',
      description: 'Speak directly with our team',
      link: 'tel:+15551234567',
      linkText: '+1 (555) 123-4567'
    },
    {
      icon: 'MessageSquare',
      title: 'Live Chat',
      description: 'Chat with us in real-time',
      link: '#',
      linkText: 'Start Chat'
    }
  ],
  departments = [
    {
      name: 'Sales',
      email: 'sales@example.com',
      description: 'Questions about pricing and plans'
    },
    {
      name: 'Support',
      email: 'support@example.com',
      description: 'Technical help and assistance'
    },
    {
      name: 'Partnerships',
      email: 'partners@example.com',
      description: 'Business collaboration opportunities'
    }
  ],
  officeAddress = '789 Innovation Drive, Tech Hub, Austin, TX 78701',
  officeHours = 'Monday - Friday: 8am - 7pm CST, Saturday: 10am - 4pm CST',
  showDepartments = true
}: Contact3Props) {
  const getIcon = (iconName: string) => {
    const icons: Record<string, React.ReactElement> = {
      Mail: <Mail className="h-6 w-6" />,
      Phone: <Phone className="h-6 w-6" />,
      MessageSquare: <MessageSquare className="h-6 w-6" />,
      Users: <Users className="h-6 w-6" />,
      Briefcase: <Briefcase className="h-6 w-6" />,
    };
    return icons[iconName] || <Mail className="h-6 w-6" />;
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col items-center text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary mb-2">
            <MessageSquare className="h-4 w-4" />
            Contact Us
          </div>
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl max-w-3xl">
            {title}
          </h2>
          <p className="max-w-[800px] text-gray-500 md:text-xl lg:text-2xl dark:text-gray-400">
            {subtitle}
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-12">
          {/* Contact Methods Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            {contactMethods.map((method, idx) => (
              <div
                key={idx}
                className="group relative bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:border-primary transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 group-hover:from-primary/30 group-hover:to-primary/10 transition-all">
                    {getIcon(method.icon)}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{method.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                      {method.description}
                    </p>
                    <a
                      href={method.link}
                      className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
                    >
                      {method.linkText}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Contact Form */}
            <div className="bg-gradient-to-br from-primary/5 to-transparent rounded-xl border border-gray-200 dark:border-gray-700 p-8">
              <h3 className="text-2xl font-bold mb-6">Send a Message</h3>

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
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="company" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Company
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      placeholder="Acme Inc."
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
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
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Subject *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    placeholder="What's this about?"
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="department" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Department
                  </label>
                  <select
                    id="department"
                    name="department"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select a department</option>
                    <option value="sales">Sales</option>
                    <option value="support">Support</option>
                    <option value="partnerships">Partnerships</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    placeholder="Tell us more about your inquiry..."
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg text-sm font-medium transition-all bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 h-12 px-8 shadow-lg shadow-primary/20"
                >
                  <Send className="h-4 w-4" />
                  Send Message
                </button>
              </form>
            </div>

            {/* Info & Departments */}
            <div className="space-y-6">
              {/* Office Info */}
              <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8 space-y-6">
                <h3 className="text-2xl font-bold mb-6">Office Information</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 shrink-0">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Address</p>
                      <p className="text-gray-900 dark:text-gray-100">
                        {officeAddress}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 shrink-0">
                      <Clock className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">Business Hours</p>
                      <p className="text-gray-900 dark:text-gray-100">
                        {officeHours}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Departments */}
              {showDepartments && departments && departments.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-8">
                  <h3 className="text-2xl font-bold mb-6">Departments</h3>

                  <div className="space-y-4">
                    {departments.map((dept, idx) => (
                      <div
                        key={idx}
                        className="pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 shrink-0">
                            <Briefcase className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                              {dept.name}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                              {dept.description}
                            </p>
                            <a
                              href={`mailto:${dept.email}`}
                              className="text-sm text-primary hover:underline font-medium"
                            >
                              {dept.email}
                            </a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
