/**
 * Simple in-memory rate limiter
 * For production with multiple servers, use Redis (Upstash, etc)
 */

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

// Store for rate limiting (in-memory)
const rateLimitStore = new Map<string, RateLimitEntry>();

// Cleanup old entries every 10 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (entry.resetAt < now) {
      rateLimitStore.delete(key);
    }
  }
}, 10 * 60 * 1000);

export type RateLimitConfig = {
  /**
   * Maximum number of requests allowed
   */
  maxRequests: number;
  /**
   * Time window in milliseconds
   */
  windowMs: number;
  /**
   * Unique identifier (e.g., IP address, user ID, email)
   */
  identifier: string;
  /**
   * Action type for better tracking
   */
  action: string;
};

export type RateLimitResult = {
  success: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
};

/**
 * Check if request is rate limited
 * Returns { success: true } if allowed, { success: false } if rate limited
 */
export function checkRateLimit(config: RateLimitConfig): RateLimitResult {
  const { maxRequests, windowMs, identifier, action } = config;
  const key = `${action}:${identifier}`;
  const now = Date.now();

  const entry = rateLimitStore.get(key);

  // No entry or expired entry - allow request
  if (!entry || entry.resetAt < now) {
    const resetAt = now + windowMs;
    rateLimitStore.set(key, {
      count: 1,
      resetAt,
    });

    return {
      success: true,
      limit: maxRequests,
      remaining: maxRequests - 1,
      resetAt,
    };
  }

  // Entry exists and not expired
  if (entry.count >= maxRequests) {
    // Rate limited
    return {
      success: false,
      limit: maxRequests,
      remaining: 0,
      resetAt: entry.resetAt,
    };
  }

  // Increment count
  entry.count += 1;
  rateLimitStore.set(key, entry);

  return {
    success: true,
    limit: maxRequests,
    remaining: maxRequests - entry.count,
    resetAt: entry.resetAt,
  };
}

/**
 * Get client identifier from headers
 * Uses IP address or falls back to a default
 */
export function getClientIdentifier(headers: Headers): string {
  // Try to get real IP from common headers (Vercel, Cloudflare, etc)
  const forwardedFor = headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }

  const realIp = headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }

  // Fallback to a default identifier
  return 'unknown';
}

/**
 * Rate limit configurations for different actions
 */
export const RATE_LIMITS = {
  LOGIN: {
    maxRequests: 5,
    windowMs: 15 * 60 * 1000, // 15 minutes
  },
  SIGNUP: {
    maxRequests: 3,
    windowMs: 60 * 60 * 1000, // 1 hour
  },
  FORGOT_PASSWORD: {
    maxRequests: 3,
    windowMs: 60 * 60 * 1000, // 1 hour
  },
  VERIFY_EMAIL: {
    maxRequests: 5,
    windowMs: 60 * 60 * 1000, // 1 hour
  },
  RESET_PASSWORD: {
    maxRequests: 5,
    windowMs: 60 * 60 * 1000, // 1 hour
  },
} as const;
