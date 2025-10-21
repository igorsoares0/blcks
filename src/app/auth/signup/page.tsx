import { SignupForm } from '@/components/auth/signup-form';
import { GoogleSignInButton } from '@/components/auth/google-signin-button';
import { Card } from '@/components/ui/card';

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-md p-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold mb-2">Create your account</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Get started with Blcks today
          </p>
        </div>

        <SignupForm />

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-950 text-gray-500">or</span>
          </div>
        </div>

        <GoogleSignInButton />
      </Card>
    </div>
  );
}
