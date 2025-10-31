import { Mail, Lock, ArrowRight, Fingerprint, Shield, Clock, CheckCircle2, Eye } from 'lucide-react';

interface RecentUser {
  name: string;
  email: string;
  avatar: string;
}

interface QuickStat {
  icon: string;
  label: string;
  value: string;
}

interface Login6Props {
  title?: string;
  subtitle?: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  passwordLabel?: string;
  passwordPlaceholder?: string;
  rememberMeText?: string;
  forgotPasswordText?: string;
  forgotPasswordHref?: string;
  loginButtonText?: string;
  signupText?: string;
  signupLinkText?: string;
  signupHref?: string;
  recentUsers?: RecentUser[];
  quickStats?: QuickStat[];
  securityBadge?: string;
}

export default function Login6({
  title = 'Welcome Back',
  subtitle = 'Sign in to continue to your dashboard',
  emailLabel = 'Email Address',
  emailPlaceholder = 'you@example.com',
  passwordLabel = 'Password',
  passwordPlaceholder = 'Enter your password',
  rememberMeText = 'Keep me signed in',
  forgotPasswordText = 'Forgot password?',
  forgotPasswordHref = '#',
  loginButtonText = 'Sign In',
  signupText = "Don't have an account?",
  signupLinkText = 'Create one',
  signupHref = '#',
  recentUsers = [
    {
      name: 'Sarah Chen',
      email: 'sarah@company.com',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop'
    },
    {
      name: 'Alex Kim',
      email: 'alex@company.com',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
    },
    {
      name: 'Jordan Lee',
      email: 'jordan@company.com',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop'
    }
  ],
  quickStats = [
    { icon: 'Shield', label: 'Secure', value: '256-bit SSL' },
    { icon: 'Clock', label: 'Fast', value: '<100ms' },
    { icon: 'CheckCircle2', label: 'Reliable', value: '99.9%' }
  ],
  securityBadge = 'Your connection is secure and encrypted'
}: Login6Props) {
  const getIcon = (iconName: string) => {
    const icons: Record<string, any> = {
      Shield: Shield,
      Clock: Clock,
      CheckCircle2: CheckCircle2
    };
    return icons[iconName] || Shield;
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-950 dark:via-blue-950 dark:to-purple-950 relative overflow-hidden">
      {/* Floating Orbs Background */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/30 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

      <div className="w-full max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-5 gap-8 items-center">
          {/* Left Side - Info & Quick Stats */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                {title}
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                {subtitle}
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              {quickStats.map((stat, index) => {
                const IconComponent = getIcon(stat.icon);
                return (
                  <div
                    key={index}
                    className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50 dark:border-gray-800/50 shadow-lg hover:scale-105 transition-all duration-300"
                  >
                    <div className="flex flex-col items-center text-center">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                        <IconComponent className="h-5 w-5 text-primary" />
                      </div>
                      <div className="text-xs font-semibold text-gray-900 dark:text-white mb-1">
                        {stat.label}
                      </div>
                      <div className="text-xs text-gray-600 dark:text-gray-400">
                        {stat.value}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Recent Users */}
            <div className="hidden lg:block">
              <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
                Recent sign-ins
              </h3>
              <div className="space-y-3">
                {recentUsers.map((user, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/60 dark:bg-gray-900/60 backdrop-blur-sm border border-gray-200/50 dark:border-gray-800/50 hover:bg-white/80 dark:hover:bg-gray-900/80 transition-all duration-300 cursor-pointer group"
                  >
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-primary/30 group-hover:border-primary transition-all"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                        {user.name}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                        {user.email}
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Side - Login Card */}
          <div className="lg:col-span-3">
            <div className="relative">
              {/* 3D Card Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-2xl blur-xl transform translate-y-2" />

              <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
                {/* Card Header with Fingerprint Icon */}
                <div className="p-8 pb-6 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg">
                      <Fingerprint className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <Shield className="h-3.5 w-3.5" />
                      <span>Secure login</span>
                    </div>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    Sign in to your account
                  </h2>
                </div>

                <div className="p-8">
                  <form className="space-y-6">
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
                          className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-900 dark:text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        />
                        <button
                          type="button"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        >
                          <Eye className="h-5 w-5" />
                        </button>
                      </div>
                    </div>

                    {/* Remember Me & Forgot Password */}
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary focus:ring-offset-0"
                        />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {rememberMeText}
                        </span>
                      </label>
                      <a
                        href={forgotPasswordHref}
                        className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                      >
                        {forgotPasswordText}
                      </a>
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-gradient-to-r from-primary via-purple-600 to-primary text-white text-base font-semibold hover:shadow-2xl hover:shadow-primary/50 hover:scale-105 transition-all duration-300"
                    >
                      {loginButtonText}
                      <ArrowRight className="h-5 w-5" />
                    </button>
                  </form>

                  {/* Signup Link */}
                  <div className="mt-8 text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {signupText}{' '}
                      <a
                        href={signupHref}
                        className="font-medium text-primary hover:text-primary/80 transition-colors"
                      >
                        {signupLinkText}
                      </a>
                    </p>
                  </div>
                </div>

                {/* Security Footer */}
                <div className="px-8 py-4 bg-gray-50 dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800">
                  <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <Shield className="h-3.5 w-3.5 text-green-500" />
                    <span>{securityBadge}</span>
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
