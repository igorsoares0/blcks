'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { validateResetToken } from '@/actions/reset-password';
import { ResetPasswordForm } from '@/components/auth/reset-password-form';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [status, setStatus] = useState<'loading' | 'valid' | 'invalid'>('loading');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('invalid');
      setError('No reset token provided');
      return;
    }

    async function validate() {
      const result = await validateResetToken(token!);

      if (result.valid) {
        setStatus('valid');
      } else {
        setStatus('invalid');
        setError(result.error || 'Invalid reset link');
      }
    }

    validate();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-md p-8">
        {status === 'loading' && (
          <div className="text-center">
            <div className="mb-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black dark:border-white mx-auto"></div>
            </div>
            <h1 className="text-2xl font-bold mb-2">Validating link...</h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Please wait while we validate your reset link.
            </p>
          </div>
        )}

        {status === 'valid' && (
          <>
            <div className="mb-8 text-center">
              <h1 className="text-2xl font-bold mb-2">Reset your password</h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Enter your new password below.
              </p>
            </div>

            <ResetPasswordForm token={token!} />
          </>
        )}

        {status === 'invalid' && (
          <div className="text-center">
            <div className="mb-4 text-red-600 dark:text-red-400">
              <svg
                className="h-12 w-12 mx-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold mb-2">Invalid reset link</h1>
            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">{error}</p>

            <div className="space-y-3">
              <Link href="/auth/forgot-password">
                <Button className="w-full">Request new reset link</Button>
              </Link>
              <Link href="/auth/login">
                <Button variant="outline" className="w-full">
                  Back to Login
                </Button>
              </Link>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
