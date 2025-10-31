import { User, Mail, Lock, Building, CreditCard, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface Signup2Props {
  title?: string;
  subtitle?: string;
  fullNameLabel?: string;
  fullNamePlaceholder?: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  passwordLabel?: string;
  passwordPlaceholder?: string;
  confirmPasswordLabel?: string;
  confirmPasswordPlaceholder?: string;
  companyLabel?: string;
  companyPlaceholder?: string;
  signupButtonText?: string;
  termsText?: string;
  termsLink?: string;
  loginText?: string;
  loginLinkText?: string;
  loginLink?: string;
  showCompanyField?: boolean;
  features?: string[];
}

export default function Signup2({
  title = 'Create your account',
  subtitle = 'Start your 14-day free trial. No credit card required.',
  fullNameLabel = 'Full Name',
  fullNamePlaceholder = 'John Doe',
  emailLabel = 'Email Address',
  emailPlaceholder = 'you@example.com',
  passwordLabel = 'Password',
  passwordPlaceholder = 'At least 8 characters',
  confirmPasswordLabel = 'Confirm Password',
  confirmPasswordPlaceholder = 'Re-enter your password',
  companyLabel = 'Company Name',
  companyPlaceholder = 'Your company',
  signupButtonText = 'Create Account',
  termsText = 'By signing up, you agree to our',
  termsLink = '#',
  loginText = 'Already have an account?',
  loginLinkText = 'Sign in',
  loginLink = '#',
  showCompanyField = true,
  features = [
    '14-day free trial',
    'No credit card required',
    'Cancel anytime',
    'Full access to all features'
  ]
}: Signup2Props) {
  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900 py-12 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Side - Form */}
          <div className="order-2 lg:order-1">
            <div className="bg-white dark:bg-gray-950 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-8 md:p-10">
              {/* Header */}
              <div className="mb-8">
                <Badge variant="secondary" className="mb-4">
                  Free Trial
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
                  {title}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {subtitle}
                </p>
              </div>

              {/* Form */}
              <form className="space-y-5">
                {/* Full Name */}
                <div className="space-y-2">
                  <label
                    htmlFor="fullName"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 block"
                  >
                    {fullNameLabel}
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="fullName"
                      type="text"
                      placeholder={fullNamePlaceholder}
                      className="pl-10 h-11"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 block"
                  >
                    {emailLabel}
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder={emailPlaceholder}
                      className="pl-10 h-11"
                    />
                  </div>
                </div>

                {/* Company (optional) */}
                {showCompanyField && (
                  <div className="space-y-2">
                    <label
                      htmlFor="company"
                      className="text-sm font-medium text-gray-700 dark:text-gray-300 block"
                    >
                      {companyLabel} <span className="text-gray-400">(optional)</span>
                    </label>
                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                      <Input
                        id="company"
                        type="text"
                        placeholder={companyPlaceholder}
                        className="pl-10 h-11"
                      />
                    </div>
                  </div>
                )}

                {/* Password */}
                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 block"
                  >
                    {passwordLabel}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder={passwordPlaceholder}
                      className="pl-10 h-11"
                    />
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <label
                    htmlFor="confirmPassword"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300 block"
                  >
                    {confirmPasswordLabel}
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder={confirmPasswordPlaceholder}
                      className="pl-10 h-11"
                    />
                  </div>
                </div>

                {/* Terms Checkbox */}
                <div className="pt-2">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 mt-1 rounded border-gray-300 text-primary focus:ring-primary"
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
                <Button type="submit" className="w-full h-12 text-base font-semibold" size="lg">
                  {signupButtonText}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </form>

              {/* Login Link */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {loginText}{' '}
                  <a
                    href={loginLink}
                    className="font-semibold text-primary hover:text-primary/80 transition-colors"
                  >
                    {loginLinkText}
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Features & Benefits */}
          <div className="order-1 lg:order-2">
            <div className="space-y-8">
              {/* Main Heading */}
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                  Join thousands of teams already growing with us
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                  Get started with our platform today and experience the difference. No commitments, no hidden fees.
                </p>
              </div>

              {/* Features List */}
              <div className="space-y-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-4 bg-white dark:bg-gray-900 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-gray-800">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Check className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-gray-900 dark:text-white font-medium">{feature}</p>
                  </div>
                ))}
              </div>

              {/* Trust Badge */}
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 rounded-xl p-6 border border-primary/20">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      No credit card required
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Start your free trial today. Add payment details only when you're ready to upgrade.
                    </p>
                  </div>
                </div>
              </div>

              {/* Mobile CTA - visible only on mobile */}
              <div className="lg:hidden p-6 bg-gray-100 dark:bg-gray-900 rounded-xl text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Trusted by 10,000+ teams worldwide
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Trust Indicators */}
        <div className="hidden lg:flex items-center justify-center gap-8 mt-12 pt-12 border-t border-gray-200 dark:border-gray-800">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">10,000+</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Active Users</div>
          </div>
          <div className="w-px h-12 bg-gray-200 dark:bg-gray-800" />
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">99.9%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Uptime</div>
          </div>
          <div className="w-px h-12 bg-gray-200 dark:bg-gray-800" />
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">24/7</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
}
