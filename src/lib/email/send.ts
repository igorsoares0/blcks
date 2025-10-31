import { mg, MAILGUN_DOMAIN, MAILGUN_FROM } from './mailgun';
import {
  getVerificationEmailTemplate,
  getPasswordResetEmailTemplate,
  getPasswordResetConfirmationTemplate,
} from './templates';

export async function sendVerificationEmail(email: string, token: string) {
  const verificationLink = `${process.env.APP_URL}/auth/verify-email?token=${token}`;

  try {
    await mg.messages.create(MAILGUN_DOMAIN, {
      from: MAILGUN_FROM,
      to: [email],
      subject: 'Confirme seu email - Blcks',
      html: getVerificationEmailTemplate(verificationLink),
      text: `Confirme seu email clicando no link: ${verificationLink}`,
    });
    return { success: true };
  } catch (error) {
    console.error('Error sending verification email:', error);
    return { success: false, error };
  }
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetLink = `${process.env.APP_URL}/auth/reset-password?token=${token}`;

  try {
    await mg.messages.create(MAILGUN_DOMAIN, {
      from: MAILGUN_FROM,
      to: [email],
      subject: 'Recuperação de senha - Blcks',
      html: getPasswordResetEmailTemplate(resetLink),
      text: `Redefina sua senha clicando no link: ${resetLink}`,
    });
    return { success: true };
  } catch (error) {
    console.error('Error sending password reset email:', error);
    return { success: false, error };
  }
}

export async function sendPasswordResetConfirmation(email: string) {
  try {
    await mg.messages.create(MAILGUN_DOMAIN, {
      from: MAILGUN_FROM,
      to: [email],
      subject: 'Senha alterada com sucesso - Blcks',
      html: getPasswordResetConfirmationTemplate(),
      text: 'Sua senha foi alterada com sucesso.',
    });
    return { success: true };
  } catch (error) {
    console.error('Error sending password reset confirmation:', error);
    return { success: false, error };
  }
}

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail({ to, subject, html, text }: SendEmailOptions) {
  try {
    await mg.messages.create(MAILGUN_DOMAIN, {
      from: MAILGUN_FROM,
      to: [to],
      subject,
      html,
      text: text || '',
    });
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error };
  }
}
