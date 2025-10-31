'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  ArrowLeft,
  Users,
  Mail,
  Trash2,
  CheckCircle2,
  Clock,
  XCircle,
  Loader2,
  Plus,
  Crown,
  Calendar,
  UserCheck,
  Sparkles,
  Award,
  Download,
  Package,
} from 'lucide-react';
import Link from 'next/link';
import { inviteTeamMember, removeTeamMember, getMyTeamLicense, getMyTeamMembership, getMyIndividualLicense } from '@/actions/team';
import { logout } from '@/actions/logout';

interface TeamMember {
  id: string;
  email: string;
  name: string | null;
  status: string;
  role: string;
  inviteExpiresAt: Date | null;
}

interface TeamLicense {
  id: string;
  type: string;
  teamSeats: number;
  purchasedAt: Date;
  members: TeamMember[];
}

interface TeamMembershipInfo {
  id: string;
  email: string;
  name: string | null;
  isMe: boolean;
}

interface TeamMembership {
  id: string;
  role: string;
  joinedAt: Date | null;
  teamOwner: {
    name: string | null;
    email: string;
  };
  license: {
    id: string;
    type: string;
    teamSeats: number;
    purchasedAt: Date;
  };
  teamMembers: TeamMembershipInfo[];
}

interface IndividualLicense {
  id: string;
  type: string;
  status: string;
  purchasedAt: Date;
}

interface TemplateInfo {
  id: string;
  name: string;
  description: string;
  hasAccess: boolean;
  reason?: string;
}

const TEMPLATES: Omit<TemplateInfo, 'hasAccess' | 'reason'>[] = [
  {
    id: 'dashboard',
    name: 'Modern Dashboard',
    description: 'Complete admin dashboard with authentication, charts, and tables',
  },
  {
    id: 'landing',
    name: 'SaaS Landing Page',
    description: 'High-converting landing page with 15+ sections',
  },
];

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [license, setLicense] = useState<TeamLicense | null>(null);
  const [membership, setMembership] = useState<TeamMembership | null>(null);
  const [individualLicense, setIndividualLicense] = useState<IndividualLicense | null>(null);
  const [loading, setLoading] = useState(true);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteLoading, setInviteLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [templates, setTemplates] = useState<TemplateInfo[]>([]);
  const [templatesLoading, setTemplatesLoading] = useState(true);
  const [downloadingTemplate, setDownloadingTemplate] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
      return;
    }

    if (status === 'authenticated') {
      loadData();
    }
  }, [status, router]);

  async function loadData() {
    setLoading(true);

    // Try to get team license (if user is owner)
    const licenseResult = await getMyTeamLicense();
    if (licenseResult.success && licenseResult.license) {
      setLicense(licenseResult.license);
      setLoading(false);
      checkTemplateAccess();
      return;
    }

    // If not team owner, try to get membership (if user is member)
    const membershipResult = await getMyTeamMembership();
    if (membershipResult.success && membershipResult.membership) {
      setMembership(membershipResult.membership);
      setLoading(false);
      checkTemplateAccess();
      return;
    }

    // If not team owner or member, try to get individual license
    const individualResult = await getMyIndividualLicense();
    if (individualResult.success && individualResult.license) {
      setIndividualLicense(individualResult.license);
    }

    setLoading(false);
    checkTemplateAccess();
  }

  async function checkTemplateAccess() {
    setTemplatesLoading(true);
    const accessChecks = await Promise.all(
      TEMPLATES.map(async (template) => {
        try {
          const response = await fetch(`/api/templates/check-access?templateId=${template.id}`);
          const data = await response.json();
          return { ...template, hasAccess: data.hasAccess, reason: data.reason };
        } catch (error) {
          return { ...template, hasAccess: false };
        }
      })
    );
    setTemplates(accessChecks);
    setTemplatesLoading(false);
  }

  async function handleDownloadTemplate(templateId: string) {
    try {
      setDownloadingTemplate(templateId);

      const response = await fetch(`/api/templates/download/${templateId}`);

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to download template');
      }

      // Create a blob from the response
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${templateId}-template.zip`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setSuccess(`Template downloaded successfully!`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      console.error('Download error:', error);
      setError(error instanceof Error ? error.message : 'Failed to download template');
      setTimeout(() => setError(''), 5000);
    } finally {
      setDownloadingTemplate(null);
    }
  }

  async function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSuccess('');
    setInviteLoading(true);

    const result = await inviteTeamMember(inviteEmail);

    if (result.success) {
      setSuccess('Invite sent successfully!');
      setInviteEmail('');
      loadData(); // Reload to show new member
    } else {
      setError(result.error || 'Failed to send invite');
    }

    setInviteLoading(false);
  }

  async function handleRemove(memberId: string) {
    if (!confirm('Are you sure you want to remove this team member?')) {
      return;
    }

    setError('');
    setSuccess('');

    const result = await removeTeamMember(memberId);

    if (result.success) {
      setSuccess('Team member removed successfully');
      loadData(); // Reload to update list
    } else {
      setError(result.error || 'Failed to remove team member');
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Show team owner dashboard
  if (license) {
    const activeMembers = license.members.filter((m) => m.status === 'active');
    const pendingMembers = license.members.filter((m) => m.status === 'invited');
    const availableSeats = license.teamSeats - activeMembers.length - pendingMembers.length;

    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-6 md:px-8 lg:px-12 py-6 flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Blocks
              </Button>
            </Link>
            <form action={logout}>
              <Button type="submit" variant="outline" size="sm">
                Logout
              </Button>
            </form>
          </div>
        </header>

        <div className="container mx-auto px-6 md:px-8 lg:px-12 py-12">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Team Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your team members and invites
            </p>
          </div>

          {/* Alerts */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-800 dark:text-red-200">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg text-green-800 dark:text-green-200">
              {success}
            </div>
          )}

          <div className="grid lg:grid-cols-3 gap-6">
            {/* License Info */}
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="h-5 w-5 text-yellow-500" />
                    License Info
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Type</div>
                    <Badge className="capitalize">{license.type}</Badge>
                  </div>

                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Team Seats</div>
                    <div className="text-2xl font-bold">
                      {activeMembers.length + pendingMembers.length} / {license.teamSeats}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {availableSeats} seat{availableSeats !== 1 ? 's' : ''} available
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Purchased
                    </div>
                    <div className="text-sm">
                      {new Date(license.purchasedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Team Members & Invites */}
            <div className="lg:col-span-2 space-y-6">
              {/* Invite Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Plus className="h-5 w-5" />
                    Invite Team Member
                  </CardTitle>
                  <CardDescription>
                    Send an invite to a new team member via email
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleInvite} className="flex gap-2">
                    <Input
                      type="email"
                      placeholder="teammate@example.com"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      disabled={inviteLoading || availableSeats === 0}
                      required
                    />
                    <Button
                      type="submit"
                      disabled={inviteLoading || availableSeats === 0}
                      className="gap-2 shrink-0"
                    >
                      {inviteLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Mail className="h-4 w-4" />
                          Send Invite
                        </>
                      )}
                    </Button>
                  </form>
                  {availableSeats === 0 && (
                    <p className="text-sm text-orange-600 dark:text-orange-400 mt-2">
                      Your team is full. Remove a member to invite someone new.
                    </p>
                  )}
                </CardContent>
              </Card>

              {/* Active Members */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Active Members ({activeMembers.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {activeMembers.length === 0 ? (
                    <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                      No active team members yet. Invite your first member above!
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {activeMembers.map((member) => (
                        <div
                          key={member.id}
                          className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900"
                        >
                          <div className="flex items-center gap-3">
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                            <div>
                              <div className="font-medium">{member.name || member.email}</div>
                              {member.name && (
                                <div className="text-sm text-gray-500">{member.email}</div>
                              )}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleRemove(member.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Pending Invites */}
              {pendingMembers.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Pending Invites ({pendingMembers.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {pendingMembers.map((member) => {
                        const isExpired =
                          member.inviteExpiresAt && new Date(member.inviteExpiresAt) < new Date();

                        return (
                          <div
                            key={member.id}
                            className="flex items-center justify-between p-4 rounded-lg border border-gray-200 dark:border-gray-800"
                          >
                            <div className="flex items-center gap-3">
                              {isExpired ? (
                                <XCircle className="h-5 w-5 text-red-600" />
                              ) : (
                                <Clock className="h-5 w-5 text-yellow-600" />
                              )}
                              <div>
                                <div className="font-medium">{member.email}</div>
                                {member.inviteExpiresAt && (
                                  <div className="text-sm text-gray-500">
                                    {isExpired ? 'Expired' : 'Expires'}{' '}
                                    {new Date(member.inviteExpiresAt).toLocaleDateString()}
                                  </div>
                                )}
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleRemove(member.id)}
                              className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show team member dashboard
  if (membership) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-6 md:px-8 lg:px-12 py-6 flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Blocks
              </Button>
            </Link>
            <form action={logout}>
              <Button type="submit" variant="outline" size="sm">
                Logout
              </Button>
            </form>
          </div>
        </header>

        <div className="container mx-auto px-6 md:px-8 lg:px-12 py-12">
          {/* Page Header with Badge */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl md:text-4xl font-bold">Team Member Dashboard</h1>
              <Badge variant="secondary" className="gap-1">
                <Sparkles className="h-3 w-3" />
                Premium Access
              </Badge>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              You're part of {membership.teamOwner.name || membership.teamOwner.email}'s team
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Your Membership Info */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserCheck className="h-5 w-5 text-green-500" />
                    Your Membership
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Status</div>
                    <Badge variant="default" className="gap-1">
                      <CheckCircle2 className="h-3 w-3" />
                      Active
                    </Badge>
                  </div>

                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Role</div>
                    <div className="text-sm font-medium capitalize">{membership.role}</div>
                  </div>

                  {membership.joinedAt && (
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Joined
                      </div>
                      <div className="text-sm">
                        {new Date(membership.joinedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-yellow-500" />
                    Premium Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      <span>Access to all <strong>110 premium blocks</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      <span><strong>Lifetime</strong> access to updates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      <span>19 categories of components</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      <span>Commercial use license</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Team Info */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Crown className="h-5 w-5 text-yellow-500" />
                    Team Owner
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900">
                    <div className="font-medium">{membership.teamOwner.name || 'Team Owner'}</div>
                    <div className="text-sm text-gray-500">{membership.teamOwner.email}</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Team Members ({membership.teamMembers.length} / {membership.license.teamSeats})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {membership.teamMembers.map((member) => (
                      <div
                        key={member.id}
                        className={`p-4 rounded-lg border ${
                          member.isMe
                            ? 'border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className={`h-5 w-5 ${member.isMe ? 'text-blue-600' : 'text-green-600'}`} />
                          <div className="flex-1">
                            <div className="font-medium flex items-center gap-2">
                              {member.name || member.email}
                              {member.isMe && (
                                <Badge variant="secondary" className="text-xs">You</Badge>
                              )}
                            </div>
                            {member.name && (
                              <div className="text-sm text-gray-500">{member.email}</div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* CTA to browse blocks */}
              <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-800">
                <CardHeader>
                  <CardTitle>Start Building!</CardTitle>
                  <CardDescription className="dark:text-gray-300">
                    Browse and use all premium blocks in your projects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/">
                    <Button size="lg" className="w-full gap-2">
                      <Sparkles className="h-4 w-4" />
                      Browse All Blocks
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show individual license dashboard
  if (individualLicense) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b border-gray-200 dark:border-gray-800">
          <div className="container mx-auto px-6 md:px-8 lg:px-12 py-6 flex items-center justify-between">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Blocks
              </Button>
            </Link>
            <form action={logout}>
              <Button type="submit" variant="outline" size="sm">
                Logout
              </Button>
            </form>
          </div>
        </header>

        <div className="container mx-auto px-6 md:px-8 lg:px-12 py-12">
          {/* Page Header with Badge */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl md:text-4xl font-bold">Dashboard</h1>
              <Badge variant="secondary" className="gap-1">
                <Sparkles className="h-3 w-3" />
                Premium Access
              </Badge>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              Welcome back! You have full access to all premium blocks
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* License Info */}
            <div className="lg:col-span-1 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-purple-500" />
                    Your License
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Type</div>
                    <Badge variant="default" className="capitalize">{individualLicense.type}</Badge>
                  </div>

                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">Status</div>
                    <Badge variant="default" className="gap-1 bg-green-600 hover:bg-green-700">
                      <CheckCircle2 className="h-3 w-3" />
                      {individualLicense.status.charAt(0).toUpperCase() + individualLicense.status.slice(1)}
                    </Badge>
                  </div>

                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Purchased
                    </div>
                    <div className="text-sm">
                      {new Date(individualLicense.purchasedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-yellow-500" />
                    Premium Benefits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      <span>Access to all <strong>110 premium blocks</strong></span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      <span><strong>Lifetime</strong> access with free updates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      <span>19 categories of components</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      <span>TypeScript support included</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      <span>Dark mode compatible</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      <span>Commercial use license</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Welcome Card */}
              <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border-purple-200 dark:border-purple-800">
                <CardHeader>
                  <CardTitle className="text-2xl">Welcome to Premium! 🎉</CardTitle>
                  <CardDescription className="dark:text-gray-300 text-base">
                    You now have lifetime access to all premium blocks. Start building amazing projects!
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Link href="/">
                    <Button size="lg" className="w-full gap-2">
                      <Sparkles className="h-4 w-4" />
                      Browse All Blocks
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              {/* Quick Stats */}
              <div className="grid md:grid-cols-3 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">110</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Premium Blocks</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">19</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Categories</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 dark:text-green-400">∞</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Lifetime Access</div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Templates Section */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    Premium Templates
                  </CardTitle>
                  <CardDescription>
                    Complete project templates included with your license
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {templatesLoading ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                    </div>
                  ) : templates.filter(t => t.hasAccess).length > 0 ? (
                    <div className="space-y-3">
                      {templates.filter(t => t.hasAccess).map((template) => (
                        <div
                          key={template.id}
                          className="flex items-start justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary/50 transition-colors"
                        >
                          <div className="flex-1">
                            <h4 className="font-semibold mb-1">{template.name}</h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{template.description}</p>
                          </div>
                          <Button
                            size="sm"
                            className="gap-2 ml-4"
                            onClick={() => handleDownloadTemplate(template.id)}
                            disabled={downloadingTemplate !== null}
                          >
                            {downloadingTemplate === template.id ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                Downloading...
                              </>
                            ) : (
                              <>
                                <Download className="h-4 w-4" />
                                Download
                              </>
                            )}
                          </Button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Package className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-3" />
                      <p className="text-gray-600 dark:text-gray-400 mb-4">
                        Premium templates are included with your Individual or Team license
                      </p>
                      <Link href="/templates">
                        <Button variant="outline" size="sm">
                          View Available Templates
                        </Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Upgrade Option */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Want to Share with Your Team?
                  </CardTitle>
                  <CardDescription>
                    Upgrade to a Team license and invite up to 5 members to access all premium blocks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href="/pricing">
                    <Button variant="outline" className="w-full gap-2">
                      <Crown className="h-4 w-4" />
                      View Team Plans
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show no license found
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 py-6 flex items-center justify-between">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Blocks
            </Button>
          </Link>
          <form action={logout}>
            <Button type="submit" variant="outline" size="sm">
              Logout
            </Button>
          </form>
        </div>
      </header>

      <div className="container mx-auto px-6 md:px-8 lg:px-12 py-16">
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <CardTitle>No Active License</CardTitle>
            <CardDescription>
              Get access to all premium blocks with a license
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-gray-600 dark:text-gray-400">
              Purchase a license to unlock all 110 premium blocks and start building amazing projects.
            </p>
            <Link href="/pricing">
              <Button size="lg">View Pricing</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
