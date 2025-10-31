'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Loader2, XCircle, ArrowRight, LogIn } from 'lucide-react';
import Link from 'next/link';
import { acceptInvite } from '@/actions/team';

function AcceptInviteContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const token = searchParams.get('token');

  const [state, setState] = useState<'loading' | 'success' | 'error' | 'needs_auth'>('loading');
  const [message, setMessage] = useState('Processing your invite...');
  const [ownerName, setOwnerName] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setState('error');
      setMessage('Invalid invite link. No token provided.');
      return;
    }

    if (status === 'loading') {
      return;
    }

    if (status === 'unauthenticated') {
      setState('needs_auth');
      setMessage('Please log in to accept this invite');
      return;
    }

    if (status === 'authenticated') {
      processInvite();
    }
  }, [token, status]);

  async function processInvite() {
    if (!token) return;

    try {
      const result = await acceptInvite(token);

      if (result.success) {
        setState('success');
        setMessage(result.message || 'Successfully joined the team!');
        setOwnerName(result.ownerName || null);
      } else {
        setState('error');
        setMessage(result.error || 'Failed to accept invite');
      }
    } catch (error) {
      console.error('Error accepting invite:', error);
      setState('error');
      setMessage('An unexpected error occurred');
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="max-w-2xl w-full p-8 md:p-12">
        {state === 'loading' && (
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <Loader2 className="h-16 w-16 text-primary animate-spin" />
            </div>
            <div>
              <h1 className="text-2xl font-bold mb-2">Processing Invite</h1>
              <p className="text-gray-600 dark:text-gray-400">{message}</p>
            </div>
          </div>
        )}

        {state === 'needs_auth' && (
          <div className="text-center space-y-8">
            <div className="flex justify-center">
              <div className="bg-blue-100 dark:bg-blue-900/20 p-4 rounded-full">
                <LogIn className="h-16 w-16 text-blue-600 dark:text-blue-400" />
              </div>
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">
                Authentication Required
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">{message}</p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 text-left">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                To accept this team invite, you need to:
              </p>
              <ol className="list-decimal list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>Log in with the email address that received the invite</li>
                <li>Or create a new account with that email</li>
                <li>You'll be automatically redirected back to accept the invite</li>
              </ol>
            </div>

            <div className="space-y-3 pt-4">
              <Link
                href={`/auth/login?callbackUrl=/team/accept-invite?token=${token}`}
                className="block"
              >
                <Button size="lg" className="w-full gap-2">
                  <LogIn className="h-4 w-4" />
                  Log In
                </Button>
              </Link>
              <Link
                href={`/auth/signup?callbackUrl=/team/accept-invite?token=${token}`}
                className="block"
              >
                <Button variant="outline" size="lg" className="w-full gap-2">
                  Create Account
                </Button>
              </Link>
            </div>
          </div>
        )}

        {state === 'success' && (
          <div className="text-center space-y-8">
            <div className="flex justify-center">
              <div className="bg-green-100 dark:bg-green-900/20 p-4 rounded-full">
                <CheckCircle2 className="h-16 w-16 text-green-600 dark:text-green-400" />
              </div>
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">
                🎉 Welcome to the Team!
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">{message}</p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-left space-y-4">
              <h2 className="font-semibold text-lg mb-3">What's Next?</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                  <span className="text-sm">
                    You now have access to all <strong>110 premium blocks</strong>
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                  <span className="text-sm">
                    Your access is <strong>lifetime</strong> as part of this team
                  </span>
                </li>
                {ownerName && (
                  <li className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                    <span className="text-sm">
                      You joined <strong>{ownerName}'s</strong> team
                    </span>
                  </li>
                )}
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                  <span className="text-sm">
                    Start browsing and using blocks in your projects
                  </span>
                </li>
              </ul>
            </div>

            <div className="space-y-3 pt-4">
              <Link href="/" className="block">
                <Button size="lg" className="w-full gap-2">
                  Browse All Blocks
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        )}

        {state === 'error' && (
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="bg-red-100 dark:bg-red-900/20 p-4 rounded-full">
                <XCircle className="h-16 w-16 text-red-600 dark:text-red-400" />
              </div>
            </div>

            <div>
              <h1 className="text-2xl font-bold mb-2">Unable to Accept Invite</h1>
              <p className="text-gray-600 dark:text-gray-400">{message}</p>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 text-left">
              <h3 className="font-semibold mb-2">Common reasons:</h3>
              <ul className="list-disc list-inside space-y-2 text-sm text-gray-700 dark:text-gray-300">
                <li>The invite link has expired (invites are valid for 7 days)</li>
                <li>The invite has already been accepted</li>
                <li>You're logged in with a different email than the one invited</li>
                <li>The team is already full</li>
                <li>The team license is no longer active</li>
              </ul>
            </div>

            <div className="space-y-3">
              <Link href="/">
                <Button size="lg" className="w-full">Go to Homepage</Button>
              </Link>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                If you believe this is an error, contact the person who invited you or reach out to{' '}
                <a href="mailto:support@blcks.com" className="text-primary hover:underline">
                  support@blcks.com
                </a>
              </p>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

export default function AcceptInvitePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <AcceptInviteContent />
    </Suspense>
  );
}
