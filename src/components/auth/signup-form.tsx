'use client';

import { useState } from 'react';
import { signup } from '@/actions/signup';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface SignupFormProps {
  inviteEmail?: string | null;
  inviteToken?: string | null;
}

export function SignupForm({ inviteEmail, inviteToken }: SignupFormProps) {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const isInvite = inviteEmail && inviteToken;

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData(e.currentTarget);
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    if (password !== confirmPassword) {
      setError("Passwords don't match");
      setLoading(false);
      return;
    }

    const result = await signup(formData);

    if (result.error) {
      setError(result.error);
      setLoading(false);
    } else {
      // Use window.location for reliable navigation after successful signup
      if (result.inviteAccepted) {
        // Invite was auto-accepted, redirect to login with success message
        const ownerNames = result.ownerNames?.join(', ') || 'the team';
        window.location.href = `/auth/login?inviteAccepted=true&ownerNames=${encodeURIComponent(ownerNames)}`;
      } else {
        // Normal signup, go to email verification
        window.location.href = '/auth/verify-email?sent=true';
      }
      // Keep loading state true since page will navigate
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">
          Name
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="John Doe"
          required
          maxLength={100}
          disabled={loading}
        />
      </div>

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
          defaultValue={inviteEmail || ''}
          readOnly={isInvite}
          className={isInvite ? 'bg-gray-50 dark:bg-gray-900 cursor-not-allowed' : ''}
        />
        {isInvite && (
          <p className="text-xs text-blue-600 dark:text-blue-400">
            This email is from your team invite and cannot be changed
          </p>
        )}
      </div>

      {/* Hidden field for invite token */}
      {inviteToken && (
        <input type="hidden" name="inviteToken" value={inviteToken} />
      )}

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="••••••••"
          required
          minLength={8}
          maxLength={128}
          disabled={loading}
        />
        <p className="text-xs text-gray-500">At least 8 characters</p>
      </div>

      <div className="space-y-2">
        <label htmlFor="confirmPassword" className="text-sm font-medium">
          Confirm Password
        </label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          placeholder="••••••••"
          required
          minLength={8}
          maxLength={128}
          disabled={loading}
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Creating account...' : 'Create Account'}
      </Button>

      <p className="text-center text-sm text-gray-600 dark:text-gray-400">
        Already have an account?{' '}
        <Link href="/auth/login" className="text-black dark:text-white font-medium hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
}
