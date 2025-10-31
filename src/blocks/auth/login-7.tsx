import { Mail, Lock, ArrowRight, QrCode, Smartphone, Fingerprint, Clock, Shield, Eye } from 'lucide-react';

interface Login7Props {
  title?: string;
  subtitle?: string;
  emailLabel?: string;
  emailPlaceholder?: string;
  passwordLabel?: string;
  passwordPlaceholder?: string;
  rememberMeText?: string;
  forgotPasswordText?: string;
  forgotPasswordHref?: string;
  loginButtonText?: string;
  signupText?: string;
  signupLinkText?: string;
  signupHref?: string;
  qrCodeText?: string;
  biometricText?: string;
  sessionTimeout?: string;
}

export default function Login7({
  title = 'Sign In',
  subtitle = 'Choose your preferred authentication method',
  emailLabel = 'Email',
  emailPlaceholder = 'you@example.com',
  passwordLabel = 'Password',
  passwordPlaceholder = 'Enter your password',
  rememberMeText = 'Remember me for 30 days',
  forgotPasswordText = 'Forgot password?',
  forgotPasswordHref = '#',
  loginButtonText = 'Sign In',
  signupText = "Don't have an account?",
  signupLinkText = 'Create account',
  signupHref = '#',
  qrCodeText = 'Scan QR code with your mobile app',
  biometricText = 'Use fingerprint or face ID',
  sessionTimeout = 'Session expires in 15:00'
}: Login7Props) {
  return (
    <section className="w-full min-h-screen flex items-center justify-center py-12 px-4 bg-gray-50 dark:bg-gray-950">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
            {title}
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Login Form */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
              {/* Header with Timer */}
              <div className="px-8 py-6 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 border-b border-gray-200 dark:border-gray-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Shield className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                        Secure Login
                      </h2>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Enter your credentials
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800">
                    <Clock className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
                    <span className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                      {sessionTimeout}
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <form className="space-y-6">
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
                        className="w-full pl-10 pr-12 py-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 text-gray-900 dark:text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                      />
                      <button
                        type="button"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      >
                        <Eye className="h-5 w-5" />
                      </button>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary focus:ring-offset-0"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {rememberMeText}
                      </span>
                    </label>
                    <a
                      href={forgotPasswordHref}
                      className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      {forgotPasswordText}
                    </a>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-lg bg-primary text-white text-base font-semibold hover:bg-primary/90 hover:shadow-lg transition-all duration-300"
                  >
                    {loginButtonText}
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </form>

                {/* Signup Link */}
                <div className="mt-8 text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {signupText}{' '}
                    <a
                      href={signupHref}
                      className="font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      {signupLinkText}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Alternative Login Methods */}
          <div className="space-y-6">
            {/* QR Code Login */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center mb-4 shadow-lg">
                  <QrCode className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  QR Code
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {qrCodeText}
                </p>
                {/* Mock QR Code */}
                <div className="w-32 h-32 bg-white border-4 border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-center mb-4">
                  <div className="grid grid-cols-4 gap-1">
                    {[...Array(16)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 ${
                          Math.random() > 0.5 ? 'bg-gray-900' : 'bg-white'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border-2 border-primary text-primary font-semibold hover:bg-primary hover:text-white transition-all duration-300">
                  <Smartphone className="h-4 w-4" />
                  Open App
                </button>
              </div>
            </div>

            {/* Biometric Login */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4 shadow-lg">
                  <Fingerprint className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  Biometric
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {biometricText}
                </p>
                <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300">
                  <Fingerprint className="h-4 w-4" />
                  Authenticate
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
