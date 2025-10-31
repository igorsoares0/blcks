import { Mail, Lock, Github, Twitter, Facebook, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface Login3Props {
  title?: string;
  subtitle?: string;
  loginTabLabel?: string;
  signupTabLabel?: string;
  emailPlaceholder?: string;
  passwordPlaceholder?: string;
  namePlaceholder?: string;
  loginButtonText?: string;
  signupButtonText?: string;
  rememberMeText?: string;
  forgotPasswordText?: string;
  forgotPasswordLink?: string;
  termsText?: string;
  termsLink?: string;
  orText?: string;
  showSocialLogin?: boolean;
  githubText?: string;
  twitterText?: string;
  facebookText?: string;
}

export default function Login3({
  title = 'Welcome',
  subtitle = 'Sign in to your account or create a new one',
  loginTabLabel = 'Login',
  signupTabLabel = 'Sign Up',
  emailPlaceholder = 'Email',
  passwordPlaceholder = 'Password',
  namePlaceholder = 'Full Name',
  loginButtonText = 'Sign In',
  signupButtonText = 'Create Account',
  rememberMeText = 'Remember me',
  forgotPasswordText = 'Forgot password?',
  forgotPasswordLink = '#',
  termsText = 'I agree to the Terms & Conditions',
  termsLink = '#',
  orText = 'Or continue with',
  showSocialLogin = true,
  githubText = 'GitHub',
  twitterText = 'Twitter',
  facebookText = 'Facebook'
}: Login3Props) {
  return (
    <section className="w-full min-h-screen flex items-center justify-center bg-white dark:bg-gray-950 py-12 px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            {title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {subtitle}
          </p>
        </div>

        {/* Tabs Card */}
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">{loginTabLabel}</TabsTrigger>
            <TabsTrigger value="signup">{signupTabLabel}</TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
              <form className="space-y-4">
                {/* Email Input */}
                <div className="space-y-2">
                  <label
                    htmlFor="login-email"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="login-email"
                      type="email"
                      placeholder={emailPlaceholder}
                      className="pl-10 h-11"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <label
                    htmlFor="login-password"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="login-password"
                      type="password"
                      placeholder={passwordPlaceholder}
                      className="pl-10 h-11"
                    />
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {rememberMeText}
                    </span>
                  </label>
                  <a
                    href={forgotPasswordLink}
                    className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                  >
                    {forgotPasswordText}
                  </a>
                </div>

                {/* Login Button */}
                <Button type="submit" className="w-full h-11" size="lg">
                  <LogIn className="mr-2 h-4 w-4" />
                  {loginButtonText}
                </Button>
              </form>

              {/* Social Login */}
              {showSocialLogin && (
                <>
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300 dark:border-gray-700" />
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-2 bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                        {orText}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <Button type="button" variant="outline" size="sm">
                      <Github className="h-4 w-4" />
                      <span className="sr-only">{githubText}</span>
                    </Button>
                    <Button type="button" variant="outline" size="sm">
                      <Twitter className="h-4 w-4" />
                      <span className="sr-only">{twitterText}</span>
                    </Button>
                    <Button type="button" variant="outline" size="sm">
                      <Facebook className="h-4 w-4" />
                      <span className="sr-only">{facebookText}</span>
                    </Button>
                  </div>
                </>
              )}
            </div>
          </TabsContent>

          {/* Sign Up Tab */}
          <TabsContent value="signup">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6">
              <form className="space-y-4">
                {/* Name Input */}
                <div className="space-y-2">
                  <label
                    htmlFor="signup-name"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Full Name
                  </label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder={namePlaceholder}
                    className="h-11"
                  />
                </div>

                {/* Email Input */}
                <div className="space-y-2">
                  <label
                    htmlFor="signup-email"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder={emailPlaceholder}
                      className="pl-10 h-11"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-2">
                  <label
                    htmlFor="signup-password"
                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder={passwordPlaceholder}
                      className="pl-10 h-11"
                    />
                  </div>
                </div>

                {/* Terms Checkbox */}
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 mt-1 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {termsText}{' '}
                    <a
                      href={termsLink}
                      className="text-primary hover:text-primary/80 transition-colors"
                    >
                      Terms & Conditions
                    </a>
                  </span>
                </label>

                {/* Sign Up Button */}
                <Button type="submit" className="w-full h-11" size="lg">
                  {signupButtonText}
                </Button>
              </form>

              {/* Social Sign Up */}
              {showSocialLogin && (
                <>
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300 dark:border-gray-700" />
                    </div>
                    <div className="relative flex justify-center text-xs">
                      <span className="px-2 bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400">
                        {orText}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <Button type="button" variant="outline" size="sm">
                      <Github className="h-4 w-4" />
                      <span className="sr-only">{githubText}</span>
                    </Button>
                    <Button type="button" variant="outline" size="sm">
                      <Twitter className="h-4 w-4" />
                      <span className="sr-only">{twitterText}</span>
                    </Button>
                    <Button type="button" variant="outline" size="sm">
                      <Facebook className="h-4 w-4" />
                      <span className="sr-only">{facebookText}</span>
                    </Button>
                  </div>
                </>
              )}
            </div>
          </TabsContent>
        </Tabs>

        {/* Footer Note */}
        <p className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </section>
  );
}
