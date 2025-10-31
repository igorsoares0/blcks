import { Mail, Lock, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Login4Props {
  title?: string;
  subtitle?: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  passwordLabel?: string;
  passwordPlaceholder?: string;
  loginButtonText?: string;
  forgotPasswordText?: string;
  forgotPasswordLink?: string;
  signupText?: string;
  signupLinkText?: string;
  signupLink?: string;
  imageUrl?: string;
  imageAlt?: string;
  benefits?: string[];
}

export default function Login4({
  title = 'Sign in to continue',
  subtitle = 'Welcome back! Please enter your credentials to access your account.',
  emailLabel = 'Email',
  emailPlaceholder = 'you@example.com',
  passwordLabel = 'Password',
  passwordPlaceholder = '••••••••',
  loginButtonText = 'Sign In',
  forgotPasswordText = 'Forgot your password?',
  forgotPasswordLink = '#',
  signupText = "Don't have an account?",
  signupLinkText = 'Create one now',
  signupLink = '#',
  imageUrl = 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000',
  imageAlt = 'Modern office workspace',
  benefits = [
    'Access to all premium features',
    'Priority customer support',
    'Advanced analytics dashboard',
    'Unlimited team members'
  ]
}: Login4Props) {
  return (
    <section className="w-full min-h-screen flex">
      {/* Left Side - Image & Benefits */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src={imageUrl}
            alt={imageAlt}
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/95 to-primary/90" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16 text-white">
          <div className="mb-12">
            <h1 className="text-4xl xl:text-5xl font-bold mb-4 leading-tight">
              The modern way to manage your business
            </h1>
            <p className="text-lg text-white/90 leading-relaxed">
              Join thousands of teams already using our platform to streamline their workflow and boost productivity.
            </p>
          </div>

          {/* Benefits List */}
          <div className="space-y-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center mt-0.5">
                  <Check className="h-4 w-4 text-white" />
                </div>
                <p className="text-white/95 leading-relaxed">{benefit}</p>
              </div>
            ))}
          </div>

          {/* Decorative Elements */}
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mb-32 -ml-32" />
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -mt-48 -mr-48" />
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 md:p-12 bg-white dark:bg-gray-950">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
              {title}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* Form */}
          <form className="space-y-5">
            {/* Email Input */}
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

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {passwordLabel}
                </label>
                <a
                  href={forgotPasswordLink}
                  className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  {forgotPasswordText}
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder={passwordPlaceholder}
                  className="pl-10 h-12 text-base"
                />
              </div>
            </div>

            {/* Login Button */}
            <Button type="submit" className="w-full h-12 text-base font-semibold" size="lg">
              {loginButtonText}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center gap-4">
            <div className="flex-1 border-t border-gray-200 dark:border-gray-800" />
            <span className="text-sm text-gray-500 dark:text-gray-400">or</span>
            <div className="flex-1 border-t border-gray-200 dark:border-gray-800" />
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-gray-600 dark:text-gray-400">
              {signupText}{' '}
              <a
                href={signupLink}
                className="font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                {signupLinkText}
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
