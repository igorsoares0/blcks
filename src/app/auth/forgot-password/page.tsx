import { ForgotPasswordForm } from '@/components/auth/forgot-password-form';
import { Card } from '@/components/ui/card';

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-md p-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold mb-2">Forgot your password?</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            No worries, we&apos;ll send you reset instructions.
          </p>
        </div>

        <ForgotPasswordForm />
      </Card>
    </div>
  );
}
