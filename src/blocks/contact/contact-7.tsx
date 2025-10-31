import { Mail, Phone, MapPin, Building2, User, MessageSquare, Send, CheckCircle2, Circle, ArrowRight, Users, Zap, Shield, Clock } from 'lucide-react';

interface Step {
  number: number;
  title: string;
  description: string;
}

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface Office {
  city: string;
  country: string;
  email: string;
  phone: string;
}

interface Contact7Props {
  title?: string;
  subtitle?: string;
  steps?: Step[];
  features?: Feature[];
  offices?: Office[];
  showFeatures?: boolean;
  showOffices?: boolean;
  responseTime?: string;
}

export default function Contact7({
  title = 'Get Started in 3 Easy Steps',
  subtitle = 'Tell us about your needs and we\'ll connect you with the right solutions. Our team will respond within 24 hours.',
  steps = [
    {
      number: 1,
      title: 'Your Information',
      description: 'Basic contact details'
    },
    {
      number: 2,
      title: 'Your Project',
      description: 'Tell us what you need'
    },
    {
      number: 3,
      title: 'Confirm',
      description: 'Review and submit'
    }
  ],
  features = [
    {
      icon: 'Zap',
      title: 'Fast Response',
      description: 'Get replies within 24 hours'
    },
    {
      icon: 'Shield',
      title: 'Secure & Private',
      description: 'Your data is encrypted'
    },
    {
      icon: 'Users',
      title: 'Expert Team',
      description: 'Dedicated specialists'
    }
  ],
  offices = [
    {
      city: 'San Francisco',
      country: 'USA',
      email: 'sf@example.com',
      phone: '+1 (415) 555-0100'
    },
    {
      city: 'London',
      country: 'UK',
      email: 'london@example.com',
      phone: '+44 20 7555 0200'
    },
    {
      city: 'Singapore',
      country: 'SG',
      email: 'sg@example.com',
      phone: '+65 6555 0300'
    }
  ],
  showFeatures = true,
  showOffices = true,
  responseTime = '24 hours'
}: Contact7Props) {
  const getIcon = (iconName: string) => {
    const icons: Record<string, React.ReactElement> = {
      Zap: <Zap className="h-5 w-5" />,
      Shield: <Shield className="h-5 w-5" />,
      Users: <Users className="h-5 w-5" />,
    };
    return icons[iconName] || <Zap className="h-5 w-5" />;
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden bg-white dark:bg-gray-950">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/10 dark:from-primary/10 dark:via-transparent dark:to-primary/20"></div>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 px-4 py-2 text-sm font-semibold text-primary mb-6">
              <Clock className="h-4 w-4" />
              Response in {responseTime}
            </div>
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6">
              {title}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              {subtitle}
            </p>
          </div>

          {/* Steps Progress (Premium Feature) */}
          <div className="mb-16">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-3 gap-4">
                {steps.map((step, idx) => (
                  <div key={idx} className="relative">
                    <div className="flex flex-col items-center text-center">
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-primary/60 text-white font-bold text-xl mb-4 shadow-lg">
                        {step.number}
                      </div>
                      <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {step.description}
                      </p>
                    </div>
                    {idx < steps.length - 1 && (
                      <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary to-primary/30"></div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main Form - Takes 2 columns */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-200 dark:border-gray-700 p-8 md:p-10 shadow-2xl">
                <div className="mb-8">
                  <h3 className="text-3xl font-bold mb-2">Let's Connect</h3>
                  <p className="text-gray-500 dark:text-gray-400">Complete the form below and we'll get back to you shortly.</p>
                </div>

                <form className="space-y-8">
                  {/* Step 1: Your Information */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                        1
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">Your Information</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Tell us about yourself</p>
                      </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label htmlFor="firstName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          First Name *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            placeholder="John"
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="lastName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Last Name *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            placeholder="Doe"
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid gap-6 sm:grid-cols-2">
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Email Address *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="john@example.com"
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder="+1 (555) 000-0000"
                            required
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="company" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Company Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <Building2 className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          id="company"
                          name="company"
                          placeholder="Acme Inc."
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Your Project */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                        2
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">Your Project</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">What can we help you with?</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="projectType" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Project Type *
                      </label>
                      <select
                        id="projectType"
                        name="projectType"
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="">Select project type</option>
                        <option value="web-development">Web Development</option>
                        <option value="mobile-app">Mobile App Development</option>
                        <option value="ui-ux-design">UI/UX Design</option>
                        <option value="consulting">Consulting Services</option>
                        <option value="digital-marketing">Digital Marketing</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="budget" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Budget Range *
                      </label>
                      <select
                        id="budget"
                        name="budget"
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="">Select budget range</option>
                        <option value="under-5k">Under $5,000</option>
                        <option value="5k-15k">$5,000 - $15,000</option>
                        <option value="15k-30k">$15,000 - $30,000</option>
                        <option value="30k-50k">$30,000 - $50,000</option>
                        <option value="50k-100k">$50,000 - $100,000</option>
                        <option value="100k-plus">$100,000+</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="timeline" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Expected Timeline *
                      </label>
                      <select
                        id="timeline"
                        name="timeline"
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="">Select timeline</option>
                        <option value="asap">ASAP (Within 1 month)</option>
                        <option value="1-3-months">1-3 months</option>
                        <option value="3-6-months">3-6 months</option>
                        <option value="6-plus-months">6+ months</option>
                        <option value="flexible">Flexible</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Project Details *
                      </label>
                      <div className="relative">
                        <div className="absolute top-3 left-3 pointer-events-none">
                          <MessageSquare className="h-5 w-5 text-gray-400" />
                        </div>
                        <textarea
                          id="message"
                          name="message"
                          rows={6}
                          placeholder="Tell us more about your project goals, requirements, and any specific details we should know..."
                          required
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Confirm */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 pb-4 border-b border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                        3
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">Confirm & Submit</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Review and send your request</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800">
                      <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                      <div className="text-sm text-green-900 dark:text-green-100">
                        <strong>Almost there!</strong> Click submit to send your request. We'll review your information and get back to you within {responseTime}.
                      </div>
                    </div>

                    <div className="flex items-start gap-2">
                      <input
                        type="checkbox"
                        id="terms"
                        name="terms"
                        required
                        className="mt-1 h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor="terms" className="text-sm text-gray-600 dark:text-gray-400">
                        I agree to the{' '}
                        <a href="#" className="text-primary hover:underline font-medium">
                          Terms of Service
                        </a>{' '}
                        and{' '}
                        <a href="#" className="text-primary hover:underline font-medium">
                          Privacy Policy
                        </a>
                      </label>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg text-base font-semibold transition-all bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] h-14 px-8 shadow-lg"
                  >
                    Submit Request
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar - Takes 1 column */}
            <div className="space-y-6">
              {/* Features (Premium Feature) */}
              {showFeatures && features && features.length > 0 && (
                <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent rounded-2xl border border-primary/20 p-6">
                  <h3 className="text-xl font-bold mb-6">Why Choose Us?</h3>
                  <div className="space-y-4">
                    {features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-4">
                        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 shrink-0">
                          {getIcon(feature.icon)}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                            {feature.title}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {feature.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Global Offices (Premium Feature) */}
              {showOffices && offices && offices.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <MapPin className="h-6 w-6 text-primary" />
                    <h3 className="text-xl font-bold">Global Presence</h3>
                  </div>
                  <div className="space-y-6">
                    {offices.map((office, idx) => (
                      <div
                        key={idx}
                        className="pb-6 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100">
                              {office.city}
                            </h4>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                              {office.country}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <a
                            href={`mailto:${office.email}`}
                            className="flex items-center gap-2 text-sm text-primary hover:underline"
                          >
                            <Mail className="h-4 w-4" />
                            {office.email}
                          </a>
                          <a
                            href={`tel:${office.phone}`}
                            className="flex items-center gap-2 text-sm text-primary hover:underline"
                          >
                            <Phone className="h-4 w-4" />
                            {office.phone}
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Response Time Info */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl border border-blue-200 dark:border-blue-800 p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500 text-white">
                    <Clock className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100">
                      Fast Response Time
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  We typically respond to all inquiries within <strong>{responseTime}</strong>. For urgent matters, please call our office directly.
                </p>
              </div>

              {/* Trust Badge */}
              <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-700 p-6 text-center">
                <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-2">
                  Your Privacy Matters
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  All information is encrypted and stored securely. We never share your data with third parties.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
