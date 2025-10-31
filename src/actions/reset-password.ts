'use server';

import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { sendPasswordResetConfirmation } from '@/lib/email/send';
import { isValidPassword } from '@/lib/validation';
import { checkRateLimit, getClientIdentifier, RATE_LIMITS } from '@/lib/rate-limit';
import { headers } from 'next/headers';

export async function resetPassword(formData: FormData) {
  // Rate limiting
  const headersList = await headers();
  const identifier = getClientIdentifier(headersList);
  const rateLimitResult = checkRateLimit({
    identifier,
    action: 'reset_password',
    maxRequests: RATE_LIMITS.RESET_PASSWORD.maxRequests,
    windowMs: RATE_LIMITS.RESET_PASSWORD.windowMs,
  });

  if (!rateLimitResult.success) {
    const resetMinutes = Math.ceil((rateLimitResult.resetAt - Date.now()) / 60000);
    return {
      error: `Too many password reset attempts. Please try again in ${resetMinutes} minutes.`
    };
  }

  const token = formData.get('token') as string;
  const password = formData.get('password') as string;

  if (!token || !password) {
    return { error: 'Token and password are required' };
  }

  if (!isValidPassword(password)) {
    return { error: 'Password must be between 8-128 characters' };
  }

  // Find the token
  const resetToken = await db.passwordResetToken.findUnique({
    where: { token },
  });

  if (!resetToken) {
    return { error: 'Invalid reset link' };
  }

  // Check if token is expired
  if (new Date() > resetToken.expires) {
    await db.passwordResetToken.delete({
      where: { token },
    });
    return { error: 'Reset link has expired' };
  }

  // Find user
  const user = await db.user.findUnique({
    where: { email: resetToken.email },
  });

  if (!user) {
    return { error: 'User not found' };
  }

  // Hash new password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Update user password
  await db.user.update({
    where: { email: resetToken.email },
    data: { password: hashedPassword },
  });

  // Delete used token
  await db.passwordResetToken.delete({
    where: { token },
  });

  // Send confirmation email
  await sendPasswordResetConfirmation(resetToken.email);

  return { success: true, message: 'Password reset successfully! You can now login with your new password.' };
}

export async function validateResetToken(token: string) {
  if (!token) {
    return { valid: false, error: 'Token is required' };
  }

  const resetToken = await db.passwordResetToken.findUnique({
    where: { token },
  });

  if (!resetToken) {
    return { valid: false, error: 'Invalid reset link' };
  }

  if (new Date() > resetToken.expires) {
    await db.passwordResetToken.delete({
      where: { token },
    });
    return { valid: false, error: 'Reset link has expired' };
  }

  return { valid: true };
}
