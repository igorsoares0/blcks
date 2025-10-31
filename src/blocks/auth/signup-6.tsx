import { User, Mail, Lock, ArrowRight, Star, Users, TrendingUp, Award } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  rating: number;
  comment: string;
}

interface Stat {
  icon: string;
  value: string;
  label: string;
}

interface Signup6Props {
  title?: string;
  subtitle?: string;
  fullNameLabel?: string;
  fullNamePlaceholder?: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  passwordLabel?: string;
  passwordPlaceholder?: string;
  signupButtonText?: string;
  termsText?: string;
  termsLink?: string;
  loginText?: string;
  loginLinkText?: string;
  loginLink?: string;
  testimonials?: Testimonial[];
  stats?: Stat[];
  trustBadge?: string;
}

export default function Signup6({
  title = 'Join 50,000+ Users',
  subtitle = 'Start building amazing things today. No credit card required.',
  fullNameLabel = 'Full Name',
  fullNamePlaceholder = 'John Doe',
  emailLabel = 'Email',
  emailPlaceholder = 'you@example.com',
  passwordLabel = 'Password',
  passwordPlaceholder = 'At least 8 characters',
  signupButtonText = 'Get Started Free',
  termsText = 'By signing up, you agree to our',
  termsLink = '#',
  loginText = 'Already have an account?',
  loginLinkText = 'Sign in',
  loginLink = '#',
  testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Product Designer',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
      rating: 5,
      comment: 'Best decision for our team. Setup took less than 5 minutes!'
    },
    {
      name: 'Michael Chen',
      role: 'Developer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      rating: 5,
      comment: 'The features are incredible. Highly recommend to everyone.'
    }
  ],
  stats = [
    { icon: 'Users', value: '50K+', label: 'Active Users' },
    { icon: 'TrendingUp', value: '99.9%', label: 'Uptime' },
    { icon: 'Award', value: '4.9/5', label: 'Rating' }
  ],
  trustBadge = 'Trusted by teams at Google, Meta, and Netflix'
}: Signup6Props) {
  const getIcon = (iconName: string) => {
    const icons: Record<string, any> = {
      Users: Users,
      TrendingUp: TrendingUp,
      Award: Award
    };
    return icons[iconName] || Users;
  };

  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black py-12 px-4 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2306b6d4' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl" />

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Social Proof & Stats */}
          <div className="space-y-8">
            {/* Header */}
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                {title}
              </h1>
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                {subtitle}
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-4">
              {stats.map((stat, index) => {
                const IconComponent = getIcon(stat.icon);
                return (
                  <div
                    key={index}
                    className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-primary/50 transition-all duration-300"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mb-3">
                        <IconComponent className="h-5 w-5 text-primary" />
                      </div>
                      <div className="text-2xl font-bold text-white mb-1">
                        {stat.value}
                      </div>
                      <div className="text-xs text-gray-400">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Testimonials */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">
                What users say
              </h3>
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 hover:border-primary/30 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-primary/50"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex gap-0.5">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-300 mb-2 leading-relaxed">
                        {testimonial.comment}
                      </p>
                      <div>
                        <div className="text-sm font-semibold text-white">
                          {testimonial.name}
                        </div>
                        <div className="text-xs text-gray-400">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Badge */}
            <div className="flex items-center gap-3 text-sm text-gray-400">
              <Award className="h-5 w-5 text-primary" />
              <span>{trustBadge}</span>
            </div>
          </div>

          {/* Right Side - Signup Form */}
          <div>
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 p-8 md:p-10">
              {/* Form Header */}
              <div className="mb-8 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                  <Star className="h-4 w-4" />
                  Free 14-day trial
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Create your account
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  No credit card required
                </p>
              </div>

              <form className="space-y-5">
                {/* Full Name */}
                <div className="space-y-2">
                  <label
                    htmlFor="fullName"
                    className="text-sm font-medium text-gray-900 dark:text-white block"
                  >
                    {fullNameLabel}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="fullName"
                      type="text"
                      placeholder={fullNamePlaceholder}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-900 dark:text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-900 dark:text-white block"
                  >
                    {emailLabel}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="email"
                      type="email"
                      placeholder={emailPlaceholder}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-900 dark:text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-900 dark:text-white block"
                  >
                    {passwordLabel}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      id="password"
                      type="password"
                      placeholder={passwordPlaceholder}
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-900 dark:text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Terms */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 mt-1 rounded border-gray-300 text-primary focus:ring-primary focus:ring-offset-0"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {termsText}{' '}
                      <a
                        href={termsLink}
                        className="font-medium text-primary hover:text-primary/80 transition-colors"
                      >
                        Terms of Service
                      </a>
                      {' and '}
                      <a
                        href={termsLink}
                        className="font-medium text-primary hover:text-primary/80 transition-colors"
                      >
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-gradient-to-r from-primary via-primary to-cyan-600 text-white text-base font-semibold hover:shadow-2xl hover:shadow-primary/50 hover:scale-105 transition-all duration-300"
                >
                  {signupButtonText}
                  <ArrowRight className="h-5 w-5" />
                </button>
              </form>

              {/* Login Link */}
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {loginText}{' '}
                  <a
                    href={loginLink}
                    className="font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    {loginLinkText}
                  </a>
                </p>
              </div>

              {/* Security Badge */}
              <div className="mt-6 flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <Lock className="h-3.5 w-3.5" />
                <span>256-bit SSL encryption. Your data is safe with us.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
