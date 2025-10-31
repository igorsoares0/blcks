'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Loader2, ArrowRight, Home } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

export default function PurchaseSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: session, update } = useSession();
  const sessionId = searchParams.get('session_id');

  const [status, setStatus] = useState<'verifying' | 'success' | 'error'>('verifying');
  const [message, setMessage] = useState('Verifying your purchase...');
  const [planType, setPlanType] = useState<string | null>(null);
  const [isTemplate, setIsTemplate] = useState(false);
  const [templateName, setTemplateName] = useState<string>('');

  useEffect(() => {
    if (!sessionId) {
      setStatus('error');
      setMessage('No session ID provided');
      return;
    }

    let attempts = 0;
    const MAX_ATTEMPTS = 10; // Max 30 seconds (10 attempts * 3 seconds)
    let timeoutId: NodeJS.Timeout;

    async function verifyPayment() {
      try {
        attempts++;

        const response = await fetch(`/api/checkout/verify-session?session_id=${sessionId}`);
        const data = await response.json();

        if (!response.ok) {
          setStatus('error');
          setMessage(data.error || 'Failed to verify payment');
          return;
        }

        // Check if this is a template purchase
        const isTemplatePurchase = data.isTemplate;
        setIsTemplate(isTemplatePurchase);

        if (isTemplatePurchase) {
          // Template purchase
          const templateId = data.plan?.replace('template-', '');
          const name = templateId === 'dashboard' ? 'Modern Dashboard' : 'SaaS Landing Page';
          setTemplateName(name);

          if (data.status === 'paid' && data.templatePurchased) {
            setStatus('success');
            setMessage('Template purchase successful!');
            setPlanType(data.plan);
          } else if (data.status === 'paid' && !data.templatePurchased) {
            if (attempts >= MAX_ATTEMPTS) {
              setStatus('success');
              setMessage('Template purchase successful! Processing your download...');
              setPlanType(data.plan);
            } else {
              setMessage(`Processing template purchase... (${attempts}/${MAX_ATTEMPTS})`);
              timeoutId = setTimeout(verifyPayment, 3000);
            }
          } else {
            setStatus('error');
            setMessage('Payment was not completed');
          }
        } else {
          // License purchase
          if (data.status === 'paid' && data.licenseCreated) {
            setStatus('success');
            setMessage('Purchase successful!');
            setPlanType(data.plan);

            // Update session to reflect new license
            if (update) {
              await update();
            }
          } else if (data.status === 'paid' && !data.licenseCreated) {
            // Payment successful but license not created yet (webhook processing)
            if (attempts >= MAX_ATTEMPTS) {
              // Timed out, but payment was successful - show success anyway
              setStatus('success');
              setMessage('Purchase successful! Your license will be activated shortly.');
              setPlanType(data.plan);

              if (update) {
                await update();
              }
            } else {
              setMessage(`Payment successful! Activating your license... (${attempts}/${MAX_ATTEMPTS})`);
              // Retry after a delay
              timeoutId = setTimeout(verifyPayment, 3000);
            }
          } else {
            setStatus('error');
            setMessage('Payment was not completed');
          }
        }
      } catch (error) {
        console.error('Verification error:', error);

        if (attempts >= MAX_ATTEMPTS) {
          setStatus('error');
          setMessage('Failed to verify purchase. Please contact support with your session ID.');
        } else {
          // Retry on network error
          timeoutId = setTimeout(verifyPayment, 3000);
        }
      }
    }

    verifyPayment();

    // Cleanup timeout on unmount
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [sessionId, update]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <Card className="max-w-2xl w-full p-8 md:p-12">
        {status === 'verifying' && (
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <Loader2 className="h-16 w-16 text-primary animate-spin" />
            </div>
            <div>
              <h1 className="text-2xl font-bold mb-2">Verifying Your Purchase</h1>
              <p className="text-gray-600 dark:text-gray-400">
                Please wait while we confirm your payment...
              </p>
            </div>
          </div>
        )}

        {status === 'success' && (
          <div className="text-center space-y-8">
            <div className="flex justify-center">
              <div className="bg-green-100 dark:bg-green-900/20 p-4 rounded-full">
                <CheckCircle2 className="h-16 w-16 text-green-600 dark:text-green-400" />
              </div>
            </div>

            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3">
                🎉 Purchase Successful!
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-400">
                {isTemplate ? `${templateName} Template` : 'Welcome to Blcks Premium'}
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 text-left space-y-4">
              <h2 className="font-semibold text-lg mb-3">What's Next?</h2>
              <ul className="space-y-3">
                {isTemplate ? (
                  <>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-sm">
                        Your <strong>{templateName}</strong> template is ready to download
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-sm">
                        <strong>Lifetime access</strong> with unlimited downloads and updates
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-sm">
                        A confirmation email has been sent to{' '}
                        <strong>{session?.user?.email}</strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-sm">
                        Download from your <strong>Dashboard</strong> anytime
                      </span>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-sm">
                        You now have access to all <strong>110 premium blocks</strong>
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-sm">
                        <strong>2 premium templates</strong> included for free
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-sm">
                        Your license is <strong>lifetime</strong> with free updates
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-sm">
                        A confirmation email has been sent to{' '}
                        <strong>{session?.user?.email}</strong>
                      </span>
                    </li>
                    {planType === 'team' && (
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                        <span className="text-sm">
                          Invite up to <strong>5 team members</strong> from your dashboard
                        </span>
                      </li>
                    )}
                  </>
                )}
              </ul>
            </div>

            {planType === 'team' && !isTemplate && (
              <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6 text-left">
                <h3 className="font-semibold mb-2 text-purple-900 dark:text-purple-100">
                  🎯 Next Step: Invite Your Team
                </h3>
                <p className="text-sm text-purple-800 dark:text-purple-200">
                  Go to your Team Dashboard to invite up to 5 members. They'll receive an email with instructions to join your team and access all premium blocks.
                </p>
              </div>
            )}

            {isTemplate && (
              <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6 text-left">
                <h3 className="font-semibold mb-2 text-purple-900 dark:text-purple-100">
                  💡 Want More?
                </h3>
                <p className="text-sm text-purple-800 dark:text-purple-200 mb-3">
                  Get both templates + 110 premium blocks with an Individual license for just $49 (you save $45!)
                </p>
                <Link href="/pricing">
                  <Button variant="outline" size="sm" className="w-full">
                    View License Plans
                  </Button>
                </Link>
              </div>
            )}

            <div className="space-y-3 pt-4">
              {isTemplate ? (
                <>
                  <Link href="/dashboard" className="block">
                    <Button size="lg" className="w-full gap-2">
                      <ArrowRight className="h-4 w-4" />
                      Download Template Now
                    </Button>
                  </Link>
                  <Link href="/templates" className="block">
                    <Button variant="outline" size="lg" className="w-full gap-2">
                      View All Templates
                    </Button>
                  </Link>
                </>
              ) : planType === 'team' ? (
                <>
                  <Link href="/dashboard" className="block">
                    <Button size="lg" className="w-full gap-2">
                      <Home className="h-4 w-4" />
                      Go to Team Dashboard
                    </Button>
                  </Link>
                  <Link href="/" className="block">
                    <Button variant="outline" size="lg" className="w-full gap-2">
                      Browse All Blocks
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/" className="block">
                    <Button size="lg" className="w-full gap-2">
                      Browse All Blocks
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/dashboard" className="block">
                    <Button variant="outline" size="lg" className="w-full gap-2">
                      Download Templates
                    </Button>
                  </Link>
                </>
              )}
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 pt-4">
              Session ID: <code className="text-xs">{sessionId?.slice(0, 20)}...</code>
            </p>
          </div>
        )}

        {status === 'error' && (
          <div className="text-center space-y-6">
            <div className="flex justify-center">
              <div className="bg-red-100 dark:bg-red-900/20 p-4 rounded-full">
                <CheckCircle2 className="h-16 w-16 text-red-600 dark:text-red-400" />
              </div>
            </div>

            <div>
              <h1 className="text-2xl font-bold mb-2">Verification Error</h1>
              <p className="text-gray-600 dark:text-gray-400">{message}</p>
            </div>

            <div className="space-y-3">
              <Link href="/pricing">
                <Button size="lg" className="w-full">
                  Back to Pricing
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" size="lg" className="w-full">
                  Go to Homepage
                </Button>
              </Link>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
