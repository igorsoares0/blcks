import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
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
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
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
