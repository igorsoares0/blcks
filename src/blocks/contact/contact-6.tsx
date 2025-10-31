import { Mail, Phone, MapPin, Calendar, Clock, User, Building2, MessageSquare, CheckCircle2, Star, Award, TrendingUp } from 'lucide-react';

interface TimeSlot {
  time: string;
  available: boolean;
}

interface Service {
  name: string;
  duration: string;
  price: string;
}

interface Testimonial {
  name: string;
  role: string;
  rating: number;
  comment: string;
}

interface Contact6Props {
  title?: string;
  subtitle?: string;
  description?: string;
  services?: Service[];
  timeSlots?: TimeSlot[];
  testimonials?: Testimonial[];
  companyName?: string;
  email?: string;
  phone?: string;
  address?: string;
  showTestimonials?: boolean;
  showServices?: boolean;
}

export default function Contact6({
  title = 'Schedule Your Consultation',
  subtitle = 'Book a time that works for you',
  description = 'Choose a service, select your preferred time slot, and let us know how we can help. Our expert team is ready to assist you.',
  services = [
    {
      name: 'Strategy Session',
      duration: '30 min',
      price: 'Free'
    },
    {
      name: 'Full Consultation',
      duration: '60 min',
      price: '$199'
    },
    {
      name: 'VIP Package',
      duration: '90 min',
      price: '$399'
    }
  ],
  timeSlots = [
    { time: '9:00 AM', available: true },
    { time: '10:00 AM', available: true },
    { time: '11:00 AM', available: false },
    { time: '1:00 PM', available: true },
    { time: '2:00 PM', available: true },
    { time: '3:00 PM', available: false },
    { time: '4:00 PM', available: true },
    { time: '5:00 PM', available: true }
  ],
  testimonials = [
    {
      name: 'Alex Thompson',
      role: 'CEO, TechCorp',
      rating: 5,
      comment: 'Outstanding service and expertise. Highly recommend!'
    },
    {
      name: 'Maria Garcia',
      role: 'Founder, StartupXYZ',
      rating: 5,
      comment: 'Professional team that delivered beyond expectations.'
    }
  ],
  companyName = 'Your Company',
  email = 'appointments@example.com',
  phone = '+1 (555) 123-4567',
  address = '789 Business Ave, Suite 400, San Francisco, CA 94105',
  showTestimonials = true,
  showServices = true
}: Contact6Props) {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-primary/5 via-white to-primary/10 dark:from-primary/10 dark:via-gray-950 dark:to-primary/20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-semibold text-primary mb-6">
              <Calendar className="h-4 w-4" />
              Easy Online Booking
            </div>
            <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6">
              {title}
            </h2>
            <p className="text-xl font-medium text-primary mb-4">
              {subtitle}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              {description}
            </p>
          </div>

          {/* Services Cards (Premium Feature) */}
          {showServices && services && services.length > 0 && (
            <div className="grid gap-4 md:grid-cols-3 mb-12">
              {services.map((service, idx) => (
                <div
                  key={idx}
                  className="group relative bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 dark:border-gray-700 p-6 hover:border-primary transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/60 text-white">
                      <Award className="h-6 w-6" />
                    </div>
                    <span className="text-2xl font-bold text-primary">{service.price}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <Clock className="h-4 w-4" />
                    {service.duration}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="grid gap-12 lg:grid-cols-2 items-start">
            {/* Left Column - Booking Form */}
            <div className="order-2 lg:order-1">
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Book Your Appointment</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Fill in your details below</p>
                  </div>
                </div>

                <form className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        First Name *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        placeholder="John"
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        placeholder="Doe"
                        required
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      placeholder="+1 (555) 000-0000"
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="service" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Select Service *
                    </label>
                    <select
                      id="service"
                      name="service"
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Choose a service</option>
                      {services.map((service, idx) => (
                        <option key={idx} value={service.name}>
                          {service.name} - {service.duration} ({service.price})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="date" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  {/* Time Slots (Premium Feature) */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Select Time Slot *
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {timeSlots.map((slot, idx) => (
                        <button
                          key={idx}
                          type="button"
                          disabled={!slot.available}
                          className={`px-3 py-2 text-sm font-medium rounded-lg border-2 transition-all ${
                            slot.available
                              ? 'border-gray-300 dark:border-gray-600 hover:border-primary hover:bg-primary/10 text-gray-900 dark:text-gray-100'
                              : 'border-gray-200 dark:border-gray-800 bg-gray-100 dark:bg-gray-900 text-gray-400 dark:text-gray-600 cursor-not-allowed'
                          }`}
                        >
                          {slot.time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="notes" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Additional Notes
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={4}
                      placeholder="Tell us more about what you'd like to discuss..."
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    />
                  </div>

                  <div className="flex items-start gap-3 p-4 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
                    <CheckCircle2 className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <div className="text-sm text-blue-900 dark:text-blue-100">
                      <strong>Confirmation instant.</strong> You'll receive a confirmation email immediately after booking.
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 rounded-lg text-sm font-semibold transition-all bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-[1.02] h-12 px-8 shadow-lg"
                  >
                    <Calendar className="h-4 w-4" />
                    Confirm Booking
                  </button>
                </form>
              </div>
            </div>

            {/* Right Column - Info & Testimonials */}
            <div className="order-1 lg:order-2 space-y-6">
              {/* Company Contact Info */}
              <div className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground rounded-2xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold mb-6">{companyName}</h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/20 shrink-0">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium opacity-90 mb-1">Email</p>
                      <a href={`mailto:${email}`} className="font-semibold hover:underline">
                        {email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/20 shrink-0">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium opacity-90 mb-1">Phone</p>
                      <a href={`tel:${phone}`} className="font-semibold hover:underline">
                        {phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/20 shrink-0">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium opacity-90 mb-1">Address</p>
                      <p className="font-semibold">{address}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Why Book With Us */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8">
                <h3 className="text-xl font-bold mb-6">Why Book With Us?</h3>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400 shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">Expert Team</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Industry-leading professionals</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400 shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">Flexible Scheduling</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Book at your convenience</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400 shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">Free Cancellation</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Cancel up to 24h in advance</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-green-600 dark:text-green-400 shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-gray-100">Satisfaction Guaranteed</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">100% money-back guarantee</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonials (Premium Feature) */}
              {showTestimonials && testimonials && testimonials.length > 0 && (
                <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <MessageSquare className="h-6 w-6 text-primary" />
                    <h3 className="text-xl font-bold">What Clients Say</h3>
                  </div>

                  <div className="space-y-6">
                    {testimonials.map((testimonial, idx) => (
                      <div key={idx} className="pb-6 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0">
                        <div className="flex items-center gap-1 mb-3">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-3 italic">
                          "{testimonial.comment}"
                        </p>
                        <div>
                          <p className="font-semibold text-gray-900 dark:text-gray-100">
                            {testimonial.name}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Trust Indicators */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-2xl border border-green-200 dark:border-green-800 p-8">
                <div className="grid grid-cols-3 gap-6 text-center">
                  <div>
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white mx-auto mb-3">
                      <TrendingUp className="h-6 w-6" />
                    </div>
                    <p className="text-2xl font-bold text-green-900 dark:text-green-100">2.5k+</p>
                    <p className="text-xs text-green-700 dark:text-green-300">Appointments</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white mx-auto mb-3">
                      <Star className="h-6 w-6" />
                    </div>
                    <p className="text-2xl font-bold text-green-900 dark:text-green-100">4.9</p>
                    <p className="text-xs text-green-700 dark:text-green-300">Avg. Rating</p>
                  </div>
                  <div>
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white mx-auto mb-3">
                      <User className="h-6 w-6" />
                    </div>
                    <p className="text-2xl font-bold text-green-900 dark:text-green-100">98%</p>
                    <p className="text-xs text-green-700 dark:text-green-300">Satisfaction</p>
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
