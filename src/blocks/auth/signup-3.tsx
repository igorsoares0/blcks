import { User, Mail, Lock, Github, Apple } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Signup3Props {
  title?: string;
  subtitle?: string;
  fullNamePlaceholder?: string;
  emailPlaceholder?: string;
  passwordPlaceholder?: string;
  signupButtonText?: string;
  termsText?: string;
  termsLink?: string;
  privacyLink?: string;
  orText?: string;
  showSocialSignup?: boolean;
  googleText?: string;
  githubText?: string;
  appleText?: string;
  loginText?: string;
  loginLinkText?: string;
  loginLink?: string;
}

export default function Signup3({
  title = 'Create your account',
  subtitle = 'Join us today and get started in seconds',
  fullNamePlaceholder = 'Full name',
  emailPlaceholder = 'Email address',
  passwordPlaceholder = 'Create a password',
  signupButtonText = 'Get Started',
  termsText = 'By creating an account, you agree to our',
  termsLink = '#',
  privacyLink = '#',
  orText = 'Or continue with',
  showSocialSignup = true,
  googleText = 'Google',
  githubText = 'GitHub',
  appleText = 'Apple',
  loginText = 'Already have an account?',
  loginLinkText = 'Sign in',
  loginLink = '#'
}: Signup3Props) {
  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 py-12 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {subtitle}
          </p>
        </div>

        {/* Card */}
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 p-8">
          {/* Social Signup Buttons */}
          {showSocialSignup && (
            <>
              <div className="grid grid-cols-3 gap-3 mb-6">
                <Button type="button" variant="outline" className="h-11">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span className="sr-only">{googleText}</span>
                </Button>
                <Button type="button" variant="outline" className="h-11">
                  <Github className="h-5 w-5" />
                  <span className="sr-only">{githubText}</span>
                </Button>
                <Button type="button" variant="outline" className="h-11">
                  <Apple className="h-5 w-5" />
                  <span className="sr-only">{appleText}</span>
                </Button>
              </div>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200 dark:border-gray-800" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                    {orText}
                  </span>
                </div>
              </div>
            </>
          )}

          {/* Form */}
          <form className="space-y-4">
            {/* Full Name */}
            <div className="space-y-2">
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

            {/* Password Requirements */}
            <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
              <p>Password must contain:</p>
              <ul className="list-disc list-inside space-y-0.5 ml-2">
                <li>At least 8 characters</li>
                <li>One uppercase and one lowercase letter</li>
                <li>One number</li>
              </ul>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full h-12 text-base font-semibold" size="lg">
              {signupButtonText}
            </Button>
          </form>

          {/* Terms */}
          <div className="mt-6">
            <p className="text-xs text-center text-gray-500 dark:text-gray-400 leading-relaxed">
              {termsText}{' '}
              <a
                href={termsLink}
                className="text-primary hover:text-primary/80 transition-colors underline"
              >
                Terms of Service
              </a>
              {' and '}
              <a
                href={privacyLink}
                className="text-primary hover:text-primary/80 transition-colors underline"
              >
                Privacy Policy
              </a>
            </p>
          </div>
        </div>

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

        {/* Security Badge */}
        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <Lock className="h-3 w-3" />
          <span>Your information is secure and encrypted</span>
        </div>
      </div>
    </section>
  );
}
