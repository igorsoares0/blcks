import { User, Mail, Lock, ArrowRight, Check, X, Shield, Zap, Crown, Sparkles } from 'lucide-react';

interface PlanOption {
  name: string;
  price: string;
  period: string;
  features: string[];
  recommended?: boolean;
  icon: string;
}

interface Signup7Props {
  title?: string;
  subtitle?: string;
  fullNameLabel?: string;
  fullNamePlaceholder?: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  passwordLabel?: string;
  passwordPlaceholder?: string;
  planLabel?: string;
  signupButtonText?: string;
  termsText?: string;
  termsLink?: string;
  loginText?: string;
  loginLinkText?: string;
  loginLink?: string;
  plans?: PlanOption[];
}

export default function Signup7({
  title = 'Create Your Account',
  subtitle = 'Choose your plan and get started in minutes',
  fullNameLabel = 'Full Name',
  fullNamePlaceholder = 'John Doe',
  emailLabel = 'Work Email',
  emailPlaceholder = 'you@company.com',
  passwordLabel = 'Password',
  passwordPlaceholder = 'At least 8 characters',
  planLabel = 'Select Your Plan',
  signupButtonText = 'Create Account',
  termsText = 'By signing up, you agree to our',
  termsLink = '#',
  loginText = 'Already have an account?',
  loginLinkText = 'Sign in',
  loginLink = '#',
  plans = [
    {
      name: 'Starter',
      price: '$29',
      period: '/month',
      icon: 'Zap',
      features: ['Up to 5 users', '10 GB storage', 'Email support']
    },
    {
      name: 'Pro',
      price: '$99',
      period: '/month',
      icon: 'Crown',
      recommended: true,
      features: ['Up to 50 users', '100 GB storage', 'Priority support', 'Advanced analytics']
    },
    {
      name: 'Enterprise',
      price: '$299',
      period: '/month',
      icon: 'Shield',
      features: ['Unlimited users', 'Unlimited storage', '24/7 dedicated support', 'Custom integrations']
    }
  ]
}: Signup7Props) {
  const getIcon = (iconName: string) => {
    const icons: Record<string, any> = {
      Zap: Zap,
      Crown: Crown,
      Shield: Shield
    };
    return icons[iconName] || Zap;
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center py-12 px-4 bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <div className="w-full max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            <Sparkles className="h-4 w-4" />
            Start your free trial today
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            {title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {subtitle}
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          {/* Plan Selection */}
          <div className="p-8 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
            <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-4">
              {planLabel}
            </label>
            <div className="grid md:grid-cols-3 gap-4">
              {plans.map((plan, index) => {
                const IconComponent = getIcon(plan.icon);
                return (
                  <div
                    key={index}
                    className={`relative p-5 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:scale-105 ${
                      plan.recommended
                        ? 'border-primary bg-primary/5 shadow-lg shadow-primary/20'
                        : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-primary/50'
                    }`}
                  >
                    {plan.recommended && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-white text-xs font-semibold">
                          <Crown className="h-3 w-3" />
                          Recommended
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        plan.recommended ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'
                      }`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 dark:text-white">
                          {plan.name}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          <span className="text-xl font-bold text-gray-900 dark:text-white">{plan.price}</span>
                          {plan.period}
                        </div>
                      </div>
                    </div>
                    <ul className="space-y-2">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <Check className={`h-4 w-4 flex-shrink-0 ${
                            plan.recommended ? 'text-primary' : 'text-green-500'
                          }`} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <div className="p-8">
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
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
                      className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-900 dark:text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <Check className="h-5 w-5 text-green-500" />
                    </div>
                  </div>
                  <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                    <Check className="h-3 w-3" />
                    Valid work email
                  </p>
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
                {/* Password Requirements Checklist */}
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <div className="flex items-center gap-2 text-xs">
                    <Check className="h-3.5 w-3.5 text-green-500" />
                    <span className="text-green-600 dark:text-green-400">At least 8 characters</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Check className="h-3.5 w-3.5 text-green-500" />
                    <span className="text-green-600 dark:text-green-400">Contains number</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <Check className="h-3.5 w-3.5 text-green-500" />
                    <span className="text-green-600 dark:text-green-400">Contains uppercase</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <X className="h-3.5 w-3.5 text-gray-400" />
                    <span className="text-gray-500 dark:text-gray-500">Contains symbol</span>
                  </div>
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
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-gradient-to-r from-primary to-primary/80 text-white text-base font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
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
          </div>

          {/* Trust Indicators Footer */}
          <div className="px-8 py-6 bg-gray-50 dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-primary" />
                <span>SSL Encrypted</span>
              </div>
              <div className="w-px h-4 bg-gray-300 dark:bg-gray-700" />
              <div className="flex items-center gap-2">
                <Check className="h-4 w-4 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="w-px h-4 bg-gray-300 dark:bg-gray-700" />
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary" />
                <span>Start in 2 minutes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
