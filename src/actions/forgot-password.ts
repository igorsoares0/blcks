'use server';

import { db } from '@/lib/db';
import { sendPasswordResetEmail } from '@/lib/email/send';
import { isValidEmail, sanitizeString } from '@/lib/validation';
import { checkRateLimit, getClientIdentifier, RATE_LIMITS } from '@/lib/rate-limit';
import { headers } from 'next/headers';
import crypto from 'crypto';

export async function forgotPassword(formData: FormData) {
  // Rate limiting
  const headersList = await headers();
  const identifier = getClientIdentifier(headersList);
  const rateLimitResult = checkRateLimit({
    identifier,
    action: 'forgot_password',
    maxRequests: RATE_LIMITS.FORGOT_PASSWORD.maxRequests,
    windowMs: RATE_LIMITS.FORGOT_PASSWORD.windowMs,
  });

  if (!rateLimitResult.success) {
    const resetMinutes = Math.ceil((rateLimitResult.resetAt - Date.now()) / 60000);
    return {
      error: `Too many password reset requests. Please try again in ${resetMinutes} minutes.`
    };
  }

  const rawEmail = formData.get('email') as string;

  if (!rawEmail) {
    return { error: 'Email is required' };
  }

  // Sanitize and validate email
  const email = sanitizeString(rawEmail, 254).toLowerCase();

  if (!isValidEmail(email)) {
    return { error: 'Invalid email address' };
  }

  // Find user
  const user = await db.user.findUnique({
    where: { email },
  });

  // Always return success message for security (don't reveal if email exists)
  if (!user) {
    return {
      success: true,
      message: 'If an account with that email exists, we sent password reset instructions.',
    };
  }

  // Delete old tokens
  await db.passwordResetToken.deleteMany({
    where: { email },
  });

  // Generate reset token
  const token = crypto.randomUUID();
  const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });

  // Send email
  const emailResult = await sendPasswordResetEmail(email, token);

  if (!emailResult.success) {
    return { error: 'Error sending reset email. Please try again.' };
  }

  return {
    success: true,
    message: 'If an account with that email exists, we sent password reset instructions.',
  };
}
