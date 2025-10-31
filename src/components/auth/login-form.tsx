'use client';

import { useState } from 'react';
import { login } from '@/actions/login';
import { resendVerificationEmail } from '@/actions/verify-email';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function LoginForm() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [needsVerification, setNeedsVerification] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [resendLoading, setResendLoading] = useState(false);
  const [resendMessage, setResendMessage] = useState('');
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setLoading(true);
    setNeedsVerification(false);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    setUserEmail(email);

    const result = await login(formData);

    if (result.error) {
      setError(result.error);
      if (result.needsVerification) {
        setNeedsVerification(true);
      }
      setLoading(false);
    } else {
      // Use window.location for reliable navigation after successful login
      if (result.inviteAccepted) {
        window.location.href = '/?inviteAccepted=true';
      } else {
        window.location.href = '/dashboard';
      }
      // Keep loading state true since page will navigate
    }
  }

  async function handleResendVerification() {
    setResendLoading(true);
    setResendMessage('');
    const result = await resendVerificationEmail(userEmail);

    if (result.error) {
      setResendMessage(result.error);
    } else {
      setResendMessage(result.message || 'Verification email sent!');
    }
    setResendLoading(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-md text-sm">
          {error}
          {needsVerification && (
            <div className="mt-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleResendVerification}
                disabled={resendLoading}
              >
                {resendLoading ? 'Sending...' : 'Resend verification email'}
              </Button>
            </div>
          )}
        </div>
      )}

      {resendMessage && (
        <div className="bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 p-3 rounded-md text-sm">
          {resendMessage}
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="john@example.com"
          required
          maxLength={254}
          disabled={loading}
        />
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <Link
            href="/auth/forgot-password"
            className="text-xs text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
          >
            Forgot password?
          </Link>
        </div>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          required
          maxLength={128}
          disabled={loading}
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Signing in...' : 'Sign In'}
      </Button>

      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Don&apos;t have an account?{' '}
        <Link href="/auth/signup" className="text-black dark:text-white font-medium hover:underline">
          Sign up
        </Link>
      </p>
    </form>
  );
}
