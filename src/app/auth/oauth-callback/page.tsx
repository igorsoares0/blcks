'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

export default function OAuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    async function checkInvites() {
      try {
        const response = await fetch('/api/auth/check-invites');
        const data = await response.json();

        if (data.accepted && data.accepted > 0) {
          // Redirect to homepage with invite notification
          router.push('/?inviteAccepted=true');
        } else {
          // No invites, go to dashboard
          router.push('/dashboard');
        }
      } catch (error) {
        console.error('Error checking invites:', error);
        // On error, just go to dashboard
        router.push('/dashboard');
      }
    }

    // Wait a bit for session to be established
    const timer = setTimeout(checkInvites, 1000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
        <p className="text-gray-600 dark:text-gray-400">Setting up your account...</p>
      </div>
    </div>
  );
}
