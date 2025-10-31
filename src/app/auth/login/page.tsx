'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { LoginForm } from '@/components/auth/login-form';
import { GoogleSignInButton } from '@/components/auth/google-signin-button';
import { Card } from '@/components/ui/card';
import { CheckCircle2, Loader2 } from 'lucide-react';

function LoginContent() {
  const searchParams = useSearchParams();
  const reset = searchParams.get('reset');
  const inviteAccepted = searchParams.get('inviteAccepted');
  const ownerNames = searchParams.get('ownerNames');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-md p-8">
        {inviteAccepted === 'true' && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-green-900 dark:text-green-100 mb-1">
                  Account Created Successfully!
                </h3>
                <p className="text-sm text-green-800 dark:text-green-200">
                  You've joined {ownerNames ? `${ownerNames}'s team` : 'the team'} and now have access to all premium blocks. Sign in below to get started!
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Sign in to your account
          </p>
        </div>

        {reset === 'success' && (
          <div className="mb-4 bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400 p-3 rounded-md text-sm">
            Password reset successfully! You can now login with your new password.
          </div>
        )}

        <LoginForm />

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

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <LoginContent />
    </Suspense>
  );
}
