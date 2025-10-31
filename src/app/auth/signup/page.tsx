'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { SignupForm } from '@/components/auth/signup-form';
import { GoogleSignInButton } from '@/components/auth/google-signin-button';
import { Card } from '@/components/ui/card';
import { Users, Loader2 } from 'lucide-react';

function SignupContent() {
  const searchParams = useSearchParams();
  const inviteEmail = searchParams.get('inviteEmail');
  const inviteToken = searchParams.get('inviteToken');
  const isInvite = inviteEmail && inviteToken;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-md p-8">
        {isInvite && (
          <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <div className="flex items-start gap-3">
              <Users className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                  Team Invite
                </h3>
                <p className="text-sm text-blue-800 dark:text-blue-200">
                  Create your account to join the team and get access to all premium blocks!
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold mb-2">
            {isInvite ? 'Join the Team' : 'Create your account'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            {isInvite ? `Sign up with ${inviteEmail}` : 'Get started with Blcks today'}
          </p>
        </div>

        <SignupForm inviteEmail={inviteEmail} inviteToken={inviteToken} />

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

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <SignupContent />
    </Suspense>
  );
}
