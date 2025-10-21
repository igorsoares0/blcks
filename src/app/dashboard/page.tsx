import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { logout } from '@/actions/logout';

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect('/auth/login');
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950">
        <div className="container mx-auto px-6 md:px-8 lg:px-12 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <form action={logout}>
            <Button type="submit" variant="outline" size="sm">
              Logout
            </Button>
          </form>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 md:px-8 lg:px-12 py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Welcome Card */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">
              Welcome back, {session.user.name || 'User'}!
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              You&apos;ve successfully logged in to your Blcks account.
            </p>
          </Card>

          {/* User Info Card */}
          <Card className="p-8">
            <h3 className="text-lg font-semibold mb-4">Account Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                {session.user.image && (
                  <img
                    src={session.user.image}
                    alt={session.user.name || 'User'}
                    className="w-16 h-16 rounded-full"
                  />
                )}
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Name
                </label>
                <p className="text-base mt-1">{session.user.name || 'Not provided'}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Email
                </label>
                <p className="text-base mt-1">{session.user.email}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  User ID
                </label>
                <p className="text-base mt-1 font-mono text-sm">{session.user.id}</p>
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-8">
            <h3 className="text-lg font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              <Button asChild variant="outline" className="w-full justify-start">
                <a href="/">Browse Blocks</a>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <a href="/blocks/hero">Hero Sections</a>
              </Button>
              <Button asChild variant="outline" className="w-full justify-start">
                <a href="/blocks/features">Features</a>
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
}
