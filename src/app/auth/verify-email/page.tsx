'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { verifyEmail, resendVerificationEmail } from '@/actions/verify-email';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  const sent = searchParams.get('sent');

  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState('');

  useEffect(() => {
    if (sent) {
      setStatus('success');
      setMessage('Account created! Please check your email to verify your account.');
      return;
    }

    if (!token) {
      setStatus('error');
      setMessage('No verification token provided');
      return;
    }

    async function verify() {
      const result = await verifyEmail(token!);

      if (result.error) {
        setStatus('error');
        setMessage(result.error);
      } else {
        setStatus('success');
        setMessage(result.message || 'Email verified successfully!');
        setTimeout(() => {
          router.push('/auth/login');
        }, 2000);
      }
    }

    verify();
  }, [token, sent, router]);

  async function handleResend() {
    // This would need the email - for now we'll show a message
    setResendMessage('Please try signing up again or contact support.');
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center">
          {status === 'loading' && (
            <>
              <div className="mb-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black dark:border-white mx-auto"></div>
              </div>
              <h1 className="text-2xl font-bold mb-2">Verifying your email...</h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Please wait while we verify your email address.
              </p>
            </>
          )}

          {status === 'success' && (
            <>
              <div className="mb-4 text-green-600 dark:text-green-400">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold mb-2">
                {sent ? 'Check your email' : 'Email verified!'}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">{message}</p>
              {!sent && (
                <p className="text-sm text-gray-500 mb-4">Redirecting to login...</p>
              )}
              <Link href="/auth/login">
                <Button className="w-full">Go to Login</Button>
              </Link>
            </>
          )}

          {status === 'error' && (
            <>
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
              <h1 className="text-2xl font-bold mb-2">Verification failed</h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">{message}</p>

              {resendMessage && (
                <p className="text-sm text-gray-500 mb-4">{resendMessage}</p>
              )}

              <div className="space-y-3">
                <Link href="/auth/signup">
                  <Button className="w-full">Try signing up again</Button>
                </Link>
                <Link href="/auth/login">
                  <Button variant="outline" className="w-full">
                    Back to Login
                  </Button>
                </Link>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}
