'use server';

import bcrypt from 'bcryptjs';
import { db } from '@/lib/db';
import { sendVerificationEmail } from '@/lib/email/send';
import { isValidEmail, isValidName, isValidPassword, sanitizeString } from '@/lib/validation';
import { checkRateLimit, getClientIdentifier, RATE_LIMITS } from '@/lib/rate-limit';
import { headers } from 'next/headers';
import crypto from 'crypto';
import { autoAcceptPendingInvites } from './team';

export async function signup(formData: FormData) {
  // Rate limiting
  const headersList = await headers();
  const identifier = getClientIdentifier(headersList);
  const rateLimitResult = checkRateLimit({
    identifier,
    action: 'signup',
    maxRequests: RATE_LIMITS.SIGNUP.maxRequests,
    windowMs: RATE_LIMITS.SIGNUP.windowMs,
  });

  if (!rateLimitResult.success) {
    const resetMinutes = Math.ceil((rateLimitResult.resetAt - Date.now()) / 60000);
    return {
      error: `Too many signup attempts. Please try again in ${resetMinutes} minutes.`
    };
  }

  const rawName = formData.get('name') as string;
  const rawEmail = formData.get('email') as string;
  const password = formData.get('password') as string;
  const inviteToken = formData.get('inviteToken') as string | null;

  // Validate input
  if (!rawName || !rawEmail || !password) {
    return { error: 'All fields are required' };
  }

  // Sanitize inputs
  const name = sanitizeString(rawName, 100);
  const email = sanitizeString(rawEmail, 254).toLowerCase();

  // Validate name
  if (!isValidName(name)) {
    return { error: 'Invalid name. Must be between 1-100 characters' };
  }

  // Validate email
  if (!isValidEmail(email)) {
    return { error: 'Invalid email address' };
  }

  // Validate password
  if (!isValidPassword(password)) {
    return { error: 'Password must be between 8-128 characters' };
  }

  // Check if user already exists
  const existingUser = await db.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    return { error: 'Email already registered' };
  }

  // Check if signup is from a valid team invite
  let isValidInvite = false;
  if (inviteToken) {
    const invite = await db.teamMember.findFirst({
      where: {
        inviteToken,
        invitedEmail: email.toLowerCase().trim(),
        status: 'invited',
        inviteExpiresAt: {
          gte: new Date(),
        },
      },
    });
    isValidInvite = !!invite;
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user (auto-verify if from valid invite)
  const user = await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      emailVerified: isValidInvite ? new Date() : null,
    },
  });

  if (isValidInvite) {
    // Auto-accept the invite
    const acceptResult = await autoAcceptPendingInvites(user.id, email);

    console.log('Auto-accepted invites after signup:', acceptResult);

    return {
      success: true,
      autoVerified: true,
      inviteAccepted: true,
      message: 'Account created and team invite accepted! You can now log in.',
      ownerNames: acceptResult.ownerNames,
    };
  } else {
    // Regular signup flow - send verification email
    const token = crypto.randomUUID();
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    await db.verificationToken.create({
      data: {
        email,
        token,
        expires,
      },
    });

    // Send verification email
    const emailResult = await sendVerificationEmail(email, token);

    if (!emailResult.success) {
      // If email fails, delete the user and token
      await db.user.delete({ where: { id: user.id } });
      await db.verificationToken.delete({ where: { token } });
      return { error: 'Error sending verification email. Please try again.' };
    }

    return { success: true, message: 'Account created! Please check your email to verify your account.' };
  }
}
