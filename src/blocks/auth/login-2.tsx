import { Mail, Lock, Eye, EyeOff, ArrowRight, Chrome } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface Login2Props {
  title?: string;
  subtitle?: string;
  emailLabel?: string;
  passwordLabel?: string;
  loginButtonText?: string;
  forgotPasswordText?: string;
  forgotPasswordLink?: string;
  signupText?: string;
  signupLinkText?: string;
  signupLink?: string;
  googleButtonText?: string;
  showSocialLogin?: boolean;
}

export default function Login2({
  title = 'Welcome Back',
  subtitle = 'Enter your credentials to access your account',
  emailLabel = 'Email Address',
  passwordLabel = 'Password',
  loginButtonText = 'Sign In',
  forgotPasswordText = 'Forgot password?',
  forgotPasswordLink = '#',
  signupText = "Don't have an account?",
  signupLinkText = 'Sign up',
  signupLink = '#',
  googleButtonText = 'Continue with Google',
  showSocialLogin = true
}: Login2Props) {
  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-white to-primary/10 dark:from-primary/10 dark:via-gray-950 dark:to-primary/5 py-12 px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white dark:bg-gray-950 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          {/* Header with Badge */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-primary/10 p-8 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/10 rounded-full blur-2xl" />

            <div className="relative">
              <Badge variant="secondary" className="mb-4">
                Secure Login
              </Badge>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                {title}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {subtitle}
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="p-8">
            <form className="space-y-5">
              {/* Email Input */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
                >
                  <Mail className="h-4 w-4 text-primary" />
                  {emailLabel}
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="h-11"
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2"
                >
                  <Lock className="h-4 w-4 text-primary" />
                  {passwordLabel}
                </label>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="h-11 pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    <EyeOff className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Forgot Password */}
              <div className="flex items-center justify-end">
                <a
                  href={forgotPasswordLink}
                  className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                >
                  {forgotPasswordText}
                </a>
              </div>

              {/* Login Button */}
              <Button type="submit" className="w-full h-11 text-base font-semibold" size="lg">
                {loginButtonText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>

            {/* Social Login */}
            {showSocialLogin && (
              <>
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200 dark:border-gray-800" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white dark:bg-gray-950 text-gray-500 dark:text-gray-400">
                      Or continue with
                    </span>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  className="w-full h-11 text-base font-medium"
                  size="lg"
                >
                  <Chrome className="mr-2 h-5 w-5" />
                  {googleButtonText}
                </Button>
              </>
            )}

            {/* Sign Up Link */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {signupText}{' '}
                <a
                  href={signupLink}
                  className="font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  {signupLinkText}
                </a>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-800">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
              <Lock className="h-3 w-3" />
              <span>Your data is secure and encrypted</span>
            </div>
          </div>
        </div>

        {/* Bottom Links */}
        <div className="mt-6 text-center space-x-4">
          <a
            href="#"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            Privacy Policy
          </a>
          <span className="text-gray-300 dark:text-gray-700">•</span>
          <a
            href="#"
            className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </section>
  );
}
