
import { describe, it, expect } from 'vitest';
import { 
  sanitizeHtml, 
  isValidEmail, 
  isValidSAPhoneNumber, 
  formatSAPhoneNumber,
  validateInput
} from './security';

describe('Security Utils', () => {
  describe('sanitizeHtml', () => {
    it('should sanitize HTML tags', () => {
      const input = '<script>alert("XSS")</script><div>Hello</div>';
      const sanitized = sanitizeHtml(input);
      expect(sanitized).not.toContain('<script>');
      expect(sanitized).not.toContain('</script>');
      expect(sanitized).not.toContain('<div>');
      expect(sanitized).not.toContain('</div>');
    });
  });

  describe('isValidEmail', () => {
    it('should validate correct email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('name.surname@domain.co.za')).toBe(true);
      expect(isValidEmail('user+tag@gmail.com')).toBe(true);
    });

    it('should reject invalid email addresses', () => {
      expect(isValidEmail('test@')).toBe(false);
      expect(isValidEmail('test@domain')).toBe(false);
      expect(isValidEmail('test.com')).toBe(false);
      expect(isValidEmail('')).toBe(false);
    });
  });

  describe('isValidSAPhoneNumber', () => {
    it('should validate correct South African phone numbers', () => {
      expect(isValidSAPhoneNumber('0821234567')).toBe(true);
      expect(isValidSAPhoneNumber('+27821234567')).toBe(true);
      expect(isValidSAPhoneNumber('27821234567')).toBe(true);
    });

    it('should reject invalid phone numbers', () => {
      expect(isValidSAPhoneNumber('082123456')).toBe(false); // Too short
      expect(isValidSAPhoneNumber('08212345678')).toBe(false); // Too long
      expect(isValidSAPhoneNumber('0121234567')).toBe(false); // Invalid prefix
      expect(isValidSAPhoneNumber('+1234567890')).toBe(false); // Not SA
      expect(isValidSAPhoneNumber('')).toBe(false);
    });
  });

  describe('formatSAPhoneNumber', () => {
    it('should format phone numbers to the standard +27 format', () => {
      expect(formatSAPhoneNumber('0821234567')).toBe('+27821234567');
      expect(formatSAPhoneNumber('27821234567')).toBe('+27821234567');
      expect(formatSAPhoneNumber('+27821234567')).toBe('+27821234567');
    });
  });

  describe('validateInput', () => {
    it('should validate text input', () => {
      expect(validateInput('Hello', 'text')).toBe(true);
      expect(validateInput('', 'text')).toBe(false);
      expect(validateInput('x'.repeat(300), 'text')).toBe(false);
    });

    it('should validate email input', () => {
      expect(validateInput('test@example.com', 'email')).toBe(true);
      expect(validateInput('invalid-email', 'email')).toBe(false);
    });

    it('should validate phone input', () => {
      expect(validateInput('0821234567', 'phone')).toBe(true);
      expect(validateInput('123456', 'phone')).toBe(false);
    });

    it('should validate password input', () => {
      expect(validateInput('Password123', 'password')).toBe(true);
      expect(validateInput('password', 'password')).toBe(false); // No uppercase
      expect(validateInput('PASSWORD', 'password')).toBe(false); // No lowercase
      expect(validateInput('Pass', 'password')).toBe(false); // Too short
    });

    it('should validate postcode input', () => {
      expect(validateInput('2000', 'postcode')).toBe(true);
      expect(validateInput('ABC', 'postcode')).toBe(false);
      expect(validateInput('12345', 'postcode')).toBe(false); // Too long
    });
  });
});
