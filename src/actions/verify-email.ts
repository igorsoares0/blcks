'use server';

import { db } from '@/lib/db';
import { checkRateLimit, getClientIdentifier, RATE_LIMITS } from '@/lib/rate-limit';
import { headers } from 'next/headers';

export async function verifyEmail(token: string) {
  // Rate limiting
  const headersList = await headers();
  const identifier = getClientIdentifier(headersList);
  const rateLimitResult = checkRateLimit({
    identifier,
    action: 'verify_email',
    maxRequests: RATE_LIMITS.VERIFY_EMAIL.maxRequests,
    windowMs: RATE_LIMITS.VERIFY_EMAIL.windowMs,
  });

  if (!rateLimitResult.success) {
    const resetMinutes = Math.ceil((rateLimitResult.resetAt - Date.now()) / 60000);
    return {
      error: `Too many verification attempts. Please try again in ${resetMinutes} minutes.`
    };
  }

  if (!token) {
    return { error: 'Token is required' };
  }

  // Find the token
  const verificationToken = await db.verificationToken.findUnique({
    where: { token },
  });

  if (!verificationToken) {
    return { error: 'Invalid verification link' };
  }

  // Check if token is expired
  if (new Date() > verificationToken.expires) {
    // Delete expired token
    await db.verificationToken.delete({
      where: { token },
    });
    return { error: 'Verification link has expired' };
  }

  // Find user and update emailVerified
  const user = await db.user.findUnique({
    where: { email: verificationToken.email },
  });

  if (!user) {
    return { error: 'User not found' };
  }

  if (user.emailVerified) {
    return { error: 'Email already verified' };
  }

  // Update user
  await db.user.update({
    where: { email: verificationToken.email },
    data: { emailVerified: new Date() },
  });

  // Delete used token
  await db.verificationToken.delete({
    where: { token },
  });

  return { success: true, message: 'Email verified successfully! You can now login.' };
}

export async function resendVerificationEmail(email: string) {
  const { sendVerificationEmail } = await import('@/lib/email/send');
  const { isValidEmail, sanitizeString } = await import('@/lib/validation');
  const crypto = await import('crypto');

  // Sanitize and validate email
  const sanitizedEmail = sanitizeString(email, 254).toLowerCase();

  if (!isValidEmail(sanitizedEmail)) {
    return { error: 'Invalid email address' };
  }

  const user = await db.user.findUnique({
    where: { email: sanitizedEmail },
  });

  if (!user) {
    return { error: 'User not found' };
  }

  if (user.emailVerified) {
    return { error: 'Email already verified' };
  }

  // Delete old tokens
  await db.verificationToken.deleteMany({
    where: { email: sanitizedEmail },
  });

  // Generate new token
  const token = crypto.randomUUID();
  const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

  await db.verificationToken.create({
    data: {
      email: sanitizedEmail,
      token,
      expires,
    },
  });

  const emailResult = await sendVerificationEmail(sanitizedEmail, token);

  if (!emailResult.success) {
    return { error: 'Error sending verification email. Please try again.' };
  }

  return { success: true, message: 'Verification email sent!' };
}
