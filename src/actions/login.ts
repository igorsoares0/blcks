'use server';

import { signIn, auth } from '@/lib/auth';
import { AuthError } from 'next-auth';
import { isValidEmail, sanitizeString } from '@/lib/validation';
import { checkRateLimit, getClientIdentifier, RATE_LIMITS } from '@/lib/rate-limit';
import { headers } from 'next/headers';
import { autoAcceptPendingInvites } from './team';

export async function login(formData: FormData) {
  // Rate limiting
  const headersList = await headers();
  const identifier = getClientIdentifier(headersList);
  const rateLimitResult = checkRateLimit({
    identifier,
    action: 'login',
    maxRequests: RATE_LIMITS.LOGIN.maxRequests,
    windowMs: RATE_LIMITS.LOGIN.windowMs,
  });

  if (!rateLimitResult.success) {
    const resetMinutes = Math.ceil((rateLimitResult.resetAt - Date.now()) / 60000);
    return {
      error: `Too many login attempts. Please try again in ${resetMinutes} minutes.`
    };
  }

  const rawEmail = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!rawEmail || !password) {
    return { error: 'Email and password are required' };
  }

  // Sanitize and validate email
  const email = sanitizeString(rawEmail, 254).toLowerCase();

  if (!isValidEmail(email)) {
    return { error: 'Invalid email address' };
  }

  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false,
    });

    // After successful login, check for pending invites
    const session = await auth();
    if (session?.user?.id && session?.user?.email) {
      const acceptResult = await autoAcceptPendingInvites(session.user.id, session.user.email);

      if (acceptResult.accepted && acceptResult.accepted > 0) {
        console.log(`Auto-accepted ${acceptResult.accepted} team invite(s) after login`);
        return {
          success: true,
          inviteAccepted: true,
          inviteCount: acceptResult.accepted
        };
      }
    }

    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.message.includes('verify your email')) {
        return { error: 'Please verify your email before logging in.', needsVerification: true };
      }
      return { error: 'Invalid email or password' };
    }
    return { error: 'Something went wrong. Please try again.' };
  }
}
