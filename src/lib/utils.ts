
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format a number or string as currency
 * @param amount The amount to format
 * @param currency The currency code (default: ZAR)
 * @returns Formatted currency string
 */
export function formatCurrency(amount: string | number, currency = 'ZAR'): string {
  const numericAmount = typeof amount === 'string' ? parseFloat(amount) : amount;
  
  if (isNaN(numericAmount)) {
    return '—';
  }
  
  return new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(numericAmount);
}

/**
 * Subscribe a user to the newsletter
 * @param email User's email address
 * @returns Promise with the result of the operation
 */
export async function subscribeToNewsletter(email: string): Promise<{ success: boolean; message: string }> {
  try {
    const res = await fetch('/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.error || 'Failed to subscribe');
    }
    
    return { success: true, message: 'Thank you for subscribing!' };
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    return { 
      success: false, 
      message: error instanceof Error ? error.message : 'An unexpected error occurred'
    };
  }
}
