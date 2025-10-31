import formData from 'form-data';
import Mailgun from 'mailgun.js';

const mailgun = new Mailgun(formData);

export const mg = mailgun.client({
  username: 'api',
  key: process.env.MAILGUN_API_KEY || '',
  url: 'https://api.mailgun.net',
});

export const MAILGUN_DOMAIN = process.env.MAILGUN_DOMAIN || '';
export const MAILGUN_FROM = process.env.MAILGUN_FROM || 'Blcks <noreply@blcks.com>';
