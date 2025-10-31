import { User, Mail, Lock, ArrowRight, Check, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Signup4Props {
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
  imageUrl?: string;
  imageAlt?: string;
  benefits?: string[];
}

export default function Signup4({
  title = 'Start your journey today',
  subtitle = 'Create your account and join thousands of users already growing with us.',
  fullNameLabel = 'Full Name',
  fullNamePlaceholder = 'John Doe',
  emailLabel = 'Email',
  emailPlaceholder = 'you@example.com',
  passwordLabel = 'Password',
  passwordPlaceholder = 'Create a strong password',
  signupButtonText = 'Create Account',
  termsText = 'By signing up, you agree to our',
  termsLink = '#',
  loginText = 'Already have an account?',
  loginLinkText = 'Sign in here',
  loginLink = '#',
  imageUrl = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000',
  imageAlt = 'Team collaboration',
  benefits = [
    'Free 14-day trial, no credit card required',
    'Access to all premium features',
    '24/7 customer support',
    'Cancel anytime, no questions asked'
  ]
}: Signup4Props) {
  return (
    <section className="w-full min-h-screen flex">
      {/* Left Side - Image & Benefits */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary to-primary/90 relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={imageUrl}
            alt={imageAlt}
            className="w-full h-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/95 via-primary/90 to-primary/95" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16 text-white">
          <div className="mb-12">
            <h1 className="text-4xl xl:text-5xl font-bold mb-4 leading-tight">
              Join our growing community
            </h1>
            <p className="text-lg text-white/95 leading-relaxed">
              Everything you need to succeed in one powerful platform. Get started in minutes and see results immediately.
            </p>
          </div>

          {/* Benefits List */}
          <div className="space-y-5">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white/20 flex items-center justify-center mt-0.5">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <p className="text-white/95 text-lg leading-relaxed">{benefit}</p>
              </div>
            ))}
          </div>

          {/* Trust Badge */}
          <div className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-xl border border-white/20">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-white mb-1">
                  Secure & Private
                </h3>
                <p className="text-sm text-white/90 leading-relaxed">
                  Your data is encrypted and protected with enterprise-grade security. We never share your information.
                </p>
              </div>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mb-32 -ml-32" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mt-48 -mr-48" />
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 bg-white dark:bg-gray-950">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              {title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
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
                  className="pl-10 h-12 text-base"
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
                  className="pl-10 h-12 text-base"
                />
              </div>
            </div>

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
                  className="pl-10 h-12 text-base"
                />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Must be at least 8 characters with letters and numbers
              </p>
            </div>

            {/* Terms Checkbox */}
            <div className="pt-1">
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

          {/* Mobile Benefits (visible only on small screens) */}
          <div className="lg:hidden mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              What you get:
            </h3>
            <div className="space-y-3">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <Check className="h-3 w-3 text-primary" />
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
