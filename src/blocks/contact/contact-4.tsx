import { Mail, Phone, MapPin, Send, Globe, Calendar, ArrowRight, CheckCircle } from 'lucide-react';

interface ContactFeature {
  icon: string;
  title: string;
  description: string;
}

interface OfficeLocation {
  city: string;
  address: string;
  phone: string;
  isPrimary?: boolean;
}

interface Contact4Props {
  title?: string;
  subtitle?: string;
  description?: string;
  features?: ContactFeature[];
  locations?: OfficeLocation[];
  responseTime?: string;
  email?: string;
  showLocations?: boolean;
}

export default function Contact4({
  title = 'Ready to Get Started?',
  subtitle = 'Let\'s bring your ideas to life',
  description = 'Fill out the form below and our team will get back to you within 24 hours. We\'re excited to learn more about your project and how we can help.',
  features = [
    {
      icon: 'CheckCircle',
      title: 'Quick Response',
      description: 'Get a response within 24 hours'
    },
    {
      icon: 'Globe',
      title: 'Global Support',
      description: 'Support across multiple timezones'
    },
    {
      icon: 'Calendar',
      title: 'Free Consultation',
      description: 'Schedule a free 30-min call'
    }
  ],
  locations = [
    {
      city: 'San Francisco',
      address: '100 Market Street, Suite 300, CA 94105',
      phone: '+1 (415) 555-0100',
      isPrimary: true
    },
    {
      city: 'New York',
      address: '350 Fifth Avenue, Floor 20, NY 10118',
      phone: '+1 (212) 555-0200'
    },
    {
      city: 'London',
      address: '1 Finsbury Square, EC2A 1AE',
      phone: '+44 20 7555 0300'
    }
  ],
  responseTime = 'Average response time: 2-4 hours',
  email = 'hello@example.com',
  showLocations = true
}: Contact4Props) {
  const getIcon = (iconName: string) => {
    const icons: Record<string, React.ReactElement> = {
      CheckCircle: <CheckCircle className="h-5 w-5" />,
      Globe: <Globe className="h-5 w-5" />,
      Calendar: <Calendar className="h-5 w-5" />,
    };
    return icons[iconName] || <CheckCircle className="h-5 w-5" />;
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50 dark:from-gray-950 dark:to-gray-900">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-4">
              {title}
            </h2>
            <p className="text-xl text-primary font-semibold mb-6">
              {subtitle}
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {description}
            </p>
          </div>

          {/* Features Bar */}
          <div className="grid gap-4 md:grid-cols-3 mb-12">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 shrink-0">
                  {getIcon(feature.icon)}
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="grid gap-12 lg:grid-cols-2 items-start">
            {/* Left Column - Form */}
            <div className="order-2 lg:order-1">
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-xl">
                <h3 className="text-2xl font-bold mb-2">Send us a message</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-8">{responseTime}</p>

                <form className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="John"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Doe"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Work Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      placeholder="john@company.com"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="projectType" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Project Type
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    >
                      <option value="">Select project type</option>
                      <option value="web">Web Development</option>
                      <option value="mobile">Mobile App</option>
                      <option value="design">Design Services</option>
                      <option value="consulting">Consulting</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="budget" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Estimated Budget
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    >
                      <option value="">Select budget range</option>
                      <option value="5k-10k">$5,000 - $10,000</option>
                      <option value="10k-25k">$10,000 - $25,000</option>
                      <option value="25k-50k">$25,000 - $50,000</option>
                      <option value="50k+">$50,000+</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Project Details
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder="Tell us about your project, goals, and timeline..."
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    className="group w-full inline-flex items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-all bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 shadow-lg hover:shadow-xl hover:scale-[1.02]"
                  >
                    Submit Request
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                    By submitting this form, you agree to our{' '}
                    <a href="#" className="text-primary hover:underline">
                      Privacy Policy
                    </a>{' '}
                    and{' '}
                    <a href="#" className="text-primary hover:underline">
                      Terms of Service
                    </a>
                    .
                  </p>
                </form>
              </div>
            </div>

            {/* Right Column - Info */}
            <div className="order-1 lg:order-2 space-y-8">
              {/* Direct Contact */}
              <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl border border-primary/20 p-8">
                <h3 className="text-2xl font-bold mb-6">Prefer to talk directly?</h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground shrink-0">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Email us at
                      </p>
                      <a
                        href={`mailto:${email}`}
                        className="text-lg font-semibold text-gray-900 dark:text-gray-100 hover:text-primary transition-colors"
                      >
                        {email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-primary-foreground shrink-0">
                      <Calendar className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">
                        Schedule a call
                      </p>
                      <a
                        href="#"
                        className="inline-flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-gray-100 hover:text-primary transition-colors"
                      >
                        Book a meeting
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Office Locations */}
              {showLocations && locations && locations.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <MapPin className="h-6 w-6 text-primary" />
                    <h3 className="text-2xl font-bold">Our Offices</h3>
                  </div>

                  <div className="space-y-6">
                    {locations.map((location, idx) => (
                      <div
                        key={idx}
                        className={`pb-6 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0 ${
                          location.isPrimary ? 'relative pl-4 border-l-4 border-primary' : ''
                        }`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                            {location.city}
                          </h4>
                          {location.isPrimary && (
                            <span className="text-xs font-semibold text-primary bg-primary/10 px-2 py-1 rounded">
                              HQ
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {location.address}
                        </p>
                        <a
                          href={`tel:${location.phone}`}
                          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                        >
                          <Phone className="h-4 w-4" />
                          {location.phone}
                        </a>
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
