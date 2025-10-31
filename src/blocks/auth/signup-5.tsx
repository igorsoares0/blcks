import { User, Mail, Lock, ArrowRight, CheckCircle2, Sparkles, Zap, Shield } from 'lucide-react';

interface Step {
  number: number;
  title: string;
  icon: string;
}

interface Feature {
  icon: string;
  text: string;
}

interface Signup5Props {
  title?: string;
  subtitle?: string;
  currentStep?: number;
  steps?: Step[];
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
  features?: Feature[];
  badge?: string;
}

export default function Signup5({
  title = 'Create Your Account',
  subtitle = 'Get started with your free account in less than a minute',
  currentStep = 1,
  steps = [
    { number: 1, title: 'Account Info', icon: 'User' },
    { number: 2, title: 'Verification', icon: 'Mail' },
    { number: 3, title: 'Complete', icon: 'CheckCircle2' }
  ],
  fullNameLabel = 'Full Name',
  fullNamePlaceholder = 'John Doe',
  emailLabel = 'Email Address',
  emailPlaceholder = 'you@example.com',
  passwordLabel = 'Password',
  passwordPlaceholder = 'Create a strong password',
  signupButtonText = 'Continue',
  termsText = 'By signing up, you agree to our',
  termsLink = '#',
  loginText = 'Already have an account?',
  loginLinkText = 'Sign in',
  loginLink = '#',
  features = [
    { icon: 'Zap', text: 'Instant setup' },
    { icon: 'Shield', text: 'Secure & encrypted' },
    { icon: 'Sparkles', text: 'Premium features' }
  ],
  badge = '14-day free trial'
}: Signup5Props) {
  const getIcon = (iconName: string) => {
    const icons: Record<string, any> = {
      User: User,
      Mail: Mail,
      CheckCircle2: CheckCircle2,
      Zap: Zap,
      Shield: Shield,
      Sparkles: Sparkles
    };
    return icons[iconName] || User;
  };

  return (
    <section className="w-full min-h-screen flex items-center justify-center py-12 px-4 bg-white dark:bg-gray-950 relative overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234f46e5' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3Ccircle cx='0' cy='0' r='2'/%3E%3Ccircle cx='60' cy='60' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="w-full max-w-5xl relative z-10">
        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Side - Progress & Features */}
          <div className="lg:col-span-2 space-y-8">
            {/* Header */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
                <Sparkles className="h-4 w-4" />
                {badge}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                {title}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {subtitle}
              </p>
            </div>

            {/* Progress Steps */}
            <div className="space-y-4">
              {steps.map((step, index) => {
                const IconComponent = getIcon(step.icon);
                const isActive = currentStep === step.number;
                const isCompleted = currentStep > step.number;

                return (
                  <div key={step.number} className="flex items-center gap-4">
                    {/* Step Circle */}
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                        isActive
                          ? 'border-primary bg-primary text-white shadow-lg shadow-primary/30'
                          : isCompleted
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 text-gray-400'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="h-6 w-6" />
                      ) : (
                        <IconComponent className="h-6 w-6" />
                      )}
                    </div>

                    {/* Step Info */}
                    <div className="flex-1">
                      <div
                        className={`text-sm font-medium transition-colors ${
                          isActive || isCompleted
                            ? 'text-gray-900 dark:text-white'
                            : 'text-gray-500 dark:text-gray-500'
                        }`}
                      >
                        Step {step.number}
                      </div>
                      <div
                        className={`text-base font-semibold transition-colors ${
                          isActive || isCompleted
                            ? 'text-gray-900 dark:text-white'
                            : 'text-gray-400 dark:text-gray-600'
                        }`}
                      >
                        {step.title}
                      </div>
                    </div>

                    {/* Connector Line */}
                    {index < steps.length - 1 && (
                      <div
                        className={`absolute left-6 w-0.5 h-8 mt-16 transition-colors ${
                          currentStep > step.number
                            ? 'bg-primary'
                            : 'bg-gray-200 dark:bg-gray-800'
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Features */}
            <div className="hidden lg:block space-y-3 pt-6 border-t border-gray-200 dark:border-gray-800">
              {features.map((feature, index) => {
                const IconComponent = getIcon(feature.icon);
                return (
                  <div key={index} className="flex items-center gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <IconComponent className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {feature.text}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 p-8 md:p-10">
              <form className="space-y-6">
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
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    At least 8 characters with letters, numbers and symbols
                  </p>
                </div>

                {/* Password Strength Indicator */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-600 dark:text-gray-400">
                    <span>Password strength</span>
                    <span className="font-medium text-yellow-600 dark:text-yellow-400">Medium</span>
                  </div>
                  <div className="flex gap-1 h-1.5">
                    <div className="flex-1 rounded-full bg-primary" />
                    <div className="flex-1 rounded-full bg-primary" />
                    <div className="flex-1 rounded-full bg-gray-200 dark:bg-gray-800" />
                    <div className="flex-1 rounded-full bg-gray-200 dark:bg-gray-800" />
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
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-primary/80 text-white font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300"
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

              {/* Mobile Features */}
              <div className="lg:hidden mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 grid grid-cols-3 gap-4">
                {features.map((feature, index) => {
                  const IconComponent = getIcon(feature.icon);
                  return (
                    <div key={index} className="text-center">
                      <div className="inline-flex w-10 h-10 rounded-lg bg-primary/10 items-center justify-center mb-2">
                        <IconComponent className="h-5 w-5 text-primary" />
                      </div>
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        {feature.text}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
