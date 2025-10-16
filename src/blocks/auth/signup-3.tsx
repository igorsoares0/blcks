import { User, Mail, Lock, Github, Chrome, Apple } from 'lucide-react';
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
                  <Chrome className="h-5 w-5" />
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
