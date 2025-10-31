import { auth } from '@/lib/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const pathname = req.nextUrl.pathname;

  // Protected routes
  const isProtectedRoute = pathname.startsWith('/dashboard');

  // Auth routes (login, signup, etc)
  const isAuthRoute = pathname.startsWith('/auth');

  // Redirect to dashboard if logged in and trying to access auth pages
  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  // Redirect to login if not logged in and trying to access protected routes
  if (!isLoggedIn && isProtectedRoute) {
    const loginUrl = new URL('/auth/login', req.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|public).*)'],
};
