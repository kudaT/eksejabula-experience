
// Security-related utility functions

/**
 * Sanitize HTML to prevent XSS attacks
 */
export const sanitizeHtml = (html: string): string => {
  // Simple implementation - replace < and > characters
  return html
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate South African phone number
 */
export const isValidSAPhoneNumber = (phone: string): boolean => {
  // Accept formats: +27XXXXXXXXX, 27XXXXXXXXX, 0XXXXXXXXX
  const phoneRegex = /^(\+?27|0)[6-8][0-9]{8}$/;
  return phoneRegex.test(phone);
};

/**
 * Format South African phone number to standard format
 */
export const formatSAPhoneNumber = (phone: string): string => {
  // Remove any non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Convert to +27 format
  if (cleaned.startsWith('0')) {
    return '+27' + cleaned.substring(1);
  } else if (cleaned.startsWith('27')) {
    return '+' + cleaned;
  }
  
  return phone;
};

/**
 * Create a CSRF token
 */
export const generateCSRFToken = (): string => {
  // Generate a random string
  return Math.random().toString(36).substring(2, 15) + 
    Math.random().toString(36).substring(2, 15);
};

/**
 * Store CSRF token in session storage
 */
export const storeCSRFToken = (token: string): void => {
  sessionStorage.setItem('csrf_token', token);
};

/**
 * Get CSRF token from session storage
 */
export const getCSRFToken = (): string | null => {
  return sessionStorage.getItem('csrf_token');
};

/**
 * Validate user input
 */
export const validateInput = (
  value: string, 
  type: 'text' | 'email' | 'phone' | 'password' | 'postcode'
): boolean => {
  switch (type) {
    case 'email':
      return isValidEmail(value);
    case 'phone':
      return isValidSAPhoneNumber(value);
    case 'password':
      // At least 8 characters, one uppercase, one lowercase, one number
      return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(value);
    case 'postcode':
      // South African postal code
      return /^\d{4}$/.test(value);
    case 'text':
    default:
      // Not empty and reasonable length
      return value.trim().length > 0 && value.length < 256;
  }
};

/**
 * Rate limiting utility - can be used for form submissions
 */
type RateLimitEntry = {
  count: number;
  timestamp: number;
};

const rateLimitMap = new Map<string, RateLimitEntry>();

export const checkRateLimit = (
  key: string,
  maxAttempts: number = 5,
  windowMs: number = 60000 // 1 minute
): boolean => {
  const now = Date.now();
  const entry = rateLimitMap.get(key);
  
  // If no previous attempts or window expired, reset counter
  if (!entry || now - entry.timestamp > windowMs) {
    rateLimitMap.set(key, { count: 1, timestamp: now });
    return true;
  }
  
  // If within window but under limit, increment counter
  if (entry.count < maxAttempts) {
    rateLimitMap.set(key, {
      count: entry.count + 1,
      timestamp: entry.timestamp
    });
    return true;
  }
  
  // Rate limit exceeded
  return false;
};

/**
 * Clear expired rate limit entries
 */
export const cleanupRateLimits = (): void => {
  const now = Date.now();
  rateLimitMap.forEach((entry, key) => {
    if (now - entry.timestamp > 3600000) { // 1 hour
      rateLimitMap.delete(key);
    }
  });
};

// Run cleanup periodically
setInterval(cleanupRateLimits, 3600000); // Every hour
