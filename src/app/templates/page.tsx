'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Check, ArrowLeft, Loader2, ExternalLink, Layout, LayoutDashboard, Github, X, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useLicense } from '@/hooks/use-license';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Template {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  price: number;
  image: string;
  demoUrl: string;
  features: string[];
  tags: string[];
  icon: React.ElementType;
}

const templates: Template[] = [
  {
    id: 'dashboard',
    name: 'Modern Dashboard',
    description: 'Complete admin dashboard with authentication, charts, tables, and more',
    longDescription: 'A fully-featured modern admin dashboard template built with Next.js 15, TypeScript, and Tailwind CSS. Includes authentication, data visualization, responsive tables, dark mode, and 20+ pre-built pages.',
    price: 47,
    image: '/templates/dashboard-preview.png',
    demoUrl: 'https://demo.blcks.com/dashboard',
    features: [
      'Complete authentication system',
      '20+ pre-built dashboard pages',
      'Advanced data tables with sorting & filtering',
      'Beautiful charts and analytics',
      'Dark mode support',
      'Fully responsive design',
      'TypeScript + Next.js 15',
      'Ready for production',
    ],
    tags: ['Dashboard', 'Admin', 'SaaS', 'Analytics'],
    icon: LayoutDashboard,
  },
  {
    id: 'landing',
    name: 'SaaS Landing Page',
    description: 'High-converting landing page template with 15+ sections',
    longDescription: 'A stunning SaaS landing page template designed to convert visitors into customers. Includes hero sections, pricing tables, testimonials, FAQ, and everything you need to launch your product.',
    price: 47,
    image: '/templates/landing-preview.png',
    demoUrl: 'https://demo.blcks.com/landing',
    features: [
      '15+ customizable sections',
      'Multiple hero variations',
      'Pricing tables with Stripe integration',
      'Testimonials and social proof',
      'FAQ and contact forms',
      'SEO optimized',
      'Mobile-first responsive',
      'One-click deployment',
    ],
    tags: ['Landing Page', 'Marketing', 'SaaS', 'Conversion'],
    icon: Layout,
  },
];

interface InviteModalState {
  isOpen: boolean;
  templateId: string | null;
  templateName: string;
}

interface InviteResult {
  success: boolean;
  message: string;
  repoUrl?: string;
}

export default function TemplatesPage() {
  const { hasLicense } = useLicense();
  const { data: session } = useSession();
  const router = useRouter();
  const [checkoutLoading, setCheckoutLoading] = useState<string | null>(null);
  const [templateAccess, setTemplateAccess] = useState<Record<string, { hasAccess: boolean; reason?: string }>>({});
  const [checkingAccess, setCheckingAccess] = useState(true);

  // GitHub invite modal state
  const [inviteModal, setInviteModal] = useState<InviteModalState>({
    isOpen: false,
    templateId: null,
    templateName: '',
  });
  const [githubUsername, setGithubUsername] = useState('');
  const [inviteLoading, setInviteLoading] = useState(false);
  const [inviteResult, setInviteResult] = useState<InviteResult | null>(null);

  // Check access for each template
  useEffect(() => {
    if (!session) {
      setCheckingAccess(false);
      return;
    }

    const checkAccess = async () => {
      const accessChecks = await Promise.all(
        templates.map(async (template) => {
          try {
            const response = await fetch(`/api/templates/check-access?templateId=${template.id}`);
            const data = await response.json();
            return { id: template.id, ...data };
          } catch (error) {
            return { id: template.id, hasAccess: false };
          }
        })
      );

      const accessMap = accessChecks.reduce((acc, check) => {
        acc[check.id] = { hasAccess: check.hasAccess, reason: check.reason };
        return acc;
      }, {} as Record<string, { hasAccess: boolean; reason?: string }>);

      setTemplateAccess(accessMap);
      setCheckingAccess(false);
    };

    checkAccess();
  }, [session]);

  const openInviteModal = (templateId: string, templateName: string) => {
    setInviteModal({ isOpen: true, templateId, templateName });
    setGithubUsername('');
    setInviteResult(null);
  };

  const closeInviteModal = () => {
    setInviteModal({ isOpen: false, templateId: null, templateName: '' });
    setGithubUsername('');
    setInviteResult(null);
  };

  const handleInvite = async () => {
    if (!inviteModal.templateId || !githubUsername.trim()) return;

    try {
      setInviteLoading(true);
      setInviteResult(null);

      const response = await fetch(`/api/templates/invite/${inviteModal.templateId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ githubUsername: githubUsername.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        setInviteResult({
          success: false,
          message: data.error || 'Failed to send invitation',
        });
        return;
      }

      setInviteResult({
        success: true,
        message: data.message,
        repoUrl: data.repoUrl,
      });
    } catch (error) {
      console.error('Invite error:', error);
      setInviteResult({
        success: false,
        message: 'Failed to send invitation. Please try again.',
      });
    } finally {
      setInviteLoading(false);
    }
  };

  const handlePurchase = async (templateId: string) => {
    if (!session) {
      router.push('/auth/login?callbackUrl=/templates');
      return;
    }

    try {
      setCheckoutLoading(templateId);

      const response = await fetch('/api/checkout/create-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ plan: `template-${templateId}` }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert(error instanceof Error ? error.message : 'Failed to start checkout. Please try again.');
      setCheckoutLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* GitHub Username Modal */}
      {inviteModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeInviteModal}
          />
          <div className="relative bg-background border rounded-lg shadow-xl w-full max-w-md mx-4 p-6">
            <button
              onClick={closeInviteModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              <X className="h-5 w-5" />
            </button>

            {inviteResult?.success ? (
              // Success state
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Invitation Sent!</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {inviteResult.message}
                </p>
                {inviteResult.repoUrl && (
                  <Button asChild className="mt-2">
                    <a href={inviteResult.repoUrl} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-2" />
                      Open Repository
                    </a>
                  </Button>
                )}
                <Button variant="outline" onClick={closeInviteModal} className="mt-4 ml-2">
                  Close
                </Button>
              </div>
            ) : (
              // Form state
              <>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                    <Github className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">Get Repository Access</h3>
                    <p className="text-sm text-gray-500">{inviteModal.templateName}</p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  Enter your GitHub username to receive an invitation to the private repository.
                  You'll get an email from GitHub to accept the invitation.
                </p>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="github-username" className="block text-sm font-medium mb-2">
                      GitHub Username
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">@</span>
                      <Input
                        id="github-username"
                        type="text"
                        placeholder="username"
                        value={githubUsername}
                        onChange={(e) => setGithubUsername(e.target.value)}
                        className="pl-8"
                        disabled={inviteLoading}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && githubUsername.trim()) {
                            handleInvite();
                          }
                        }}
                      />
                    </div>
                  </div>

                  {inviteResult && !inviteResult.success && (
                    <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                      <p className="text-sm text-red-600 dark:text-red-400">
                        {inviteResult.message}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <Button
                      variant="outline"
                      onClick={closeInviteModal}
                      className="flex-1"
                      disabled={inviteLoading}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={handleInvite}
                      className="flex-1"
                      disabled={!githubUsername.trim() || inviteLoading}
                    >
                      {inviteLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Github className="h-4 w-4 mr-2" />
                          Send Invite
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 py-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 md:px-8 lg:px-12 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
          <Badge variant="secondary" className="mb-4">
            Premium Templates • Full Projects
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Complete Project Templates
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Skip the setup and start building. Get production-ready templates with everything you need to launch faster.
          </p>
        </div>

        {/* License Banner */}
        {hasLicense && (
          <div className="max-w-5xl mx-auto mb-12">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 text-center">
              <p className="text-green-800 dark:text-green-200 font-medium">
                You have an active license! Templates are included - just enter your GitHub username to get access.
              </p>
            </div>
          </div>
        )}

        {/* Templates Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {templates.map((template) => {
            return (
              <Card
                key={template.id}
                className="relative flex flex-col overflow-hidden hover:shadow-xl transition-shadow border-2"
              >
                {/* Template Preview Image */}
                <div className="relative w-full aspect-[4/3] bg-gray-100 dark:bg-gray-800 overflow-hidden">
                  <img
                    src={template.image}
                    alt={template.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-primary text-primary-foreground">
                      ${template.price}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <CardTitle className="text-2xl">{template.name}</CardTitle>
                  </div>
                  <CardDescription className="text-base">
                    {template.description}
                  </CardDescription>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {template.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                    {template.longDescription}
                  </p>

                  <div className="mb-6">
                    <h4 className="text-sm font-semibold mb-3">What's included:</h4>
                    <ul className="space-y-2">
                      {template.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm">
                          <Check className="h-4 w-4 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                          <span className="text-gray-700 dark:text-gray-300">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex gap-3 mt-auto">
                    {checkingAccess ? (
                      <Button size="lg" className="flex-1" disabled>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Checking access...
                      </Button>
                    ) : templateAccess[template.id]?.hasAccess ? (
                      <Button
                        size="lg"
                        className="flex-1 gap-2"
                        onClick={() => openInviteModal(template.id, template.name)}
                      >
                        <Github className="h-4 w-4" />
                        Get Access
                      </Button>
                    ) : (
                      <Button
                        size="lg"
                        className="flex-1"
                        onClick={() => handlePurchase(template.id)}
                        disabled={checkoutLoading !== null}
                      >
                        {checkoutLoading === template.id ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            Buy for ${template.price}
                          </>
                        )}
                      </Button>
                    )}
                    <Button
                      size="lg"
                      variant="outline"
                      asChild
                    >
                      <a href={template.demoUrl} target="_blank" rel="noopener noreferrer" className="gap-2">
                        <ExternalLink className="h-4 w-4" />
                        Demo
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Why Templates Section */}
        <div className="max-w-4xl mx-auto mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Our Templates?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Check className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Production Ready</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Fully tested and optimized for production deployment. No placeholder content or dummy data.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Check className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Easy Customization</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Clean, well-documented code that's easy to understand and customize to your needs.
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Check className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Lifetime Updates</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Get all future updates and improvements for free. One-time payment, lifetime access.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto mt-24">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-semibold mb-2">What's the difference between blocks and templates?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Blocks are individual components you can copy and paste. Templates are complete, production-ready projects with multiple pages, authentication, and full functionality.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Can I use templates in commercial projects?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes! Once purchased, you can use templates in unlimited personal and commercial projects.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Do I need a blocks license to buy templates?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                No, templates are sold separately. However, if you have a blocks license, you get special member pricing.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">How do I access the template after purchase?</h3>
              <p className="text-gray-600 dark:text-gray-400">
                After purchase, click "Get Access" and enter your GitHub username. You'll receive an invitation to the private repository with full source code and documentation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 mt-16">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 py-8">
          <div className="text-center text-sm text-gray-500">
            <p>Built with Next.js, Tailwind CSS and shadcn/ui</p>
            <p className="mt-2">Have questions? Contact us at support@blcks.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
