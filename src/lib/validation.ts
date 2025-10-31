/**
 * Email validation using a robust regex pattern
 * Covers most valid email formats
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false;
  }

  // Trim whitespace
  email = email.trim();

  // Check length (RFC 5321)
  if (email.length > 254) {
    return false;
  }

  // Email regex - covers most valid formats
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    return false;
  }

  // Additional checks
  const parts = email.split('@');
  if (parts.length !== 2) {
    return false;
  }

  const [local, domain] = parts;

  // Local part (before @) max 64 chars
  if (local.length > 64) {
    return false;
  }

  // Domain part max 255 chars
  if (domain.length > 255) {
    return false;
  }

  return true;
}

/**
 * Validates name field
 */
export function isValidName(name: string): boolean {
  if (!name || typeof name !== 'string') {
    return false;
  }

  const trimmed = name.trim();

  // Check length
  if (trimmed.length < 1 || trimmed.length > 100) {
    return false;
  }

  return true;
}

/**
 * Validates password strength
 */
export function isValidPassword(password: string): boolean {
  if (!password || typeof password !== 'string') {
    return false;
  }

  // Minimum 8 characters
  if (password.length < 8) {
    return false;
  }

  // Maximum 128 characters (bcrypt limit)
  if (password.length > 128) {
    return false;
  }

  return true;
}

/**
 * Sanitizes string input by trimming and limiting length
 */
export function sanitizeString(input: string, maxLength: number = 1000): string {
  if (!input || typeof input !== 'string') {
    return '';
  }

  return input.trim().slice(0, maxLength);
}
