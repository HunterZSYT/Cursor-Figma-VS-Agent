import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility to combine Tailwind CSS classes with clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format price with BDT currency
 * @param price Price in number format
 * @returns Formatted price string with BDT currency
 */
export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'BDT',
    maximumFractionDigits: 0
  }).format(price);
};

/**
 * Format date into human-readable format
 * @param dateString ISO date string
 * @param options Options for date formatting
 * @returns Formatted date string
 */
export const formatDate = (
  dateString: string,
  options: Intl.DateTimeFormatOptions = { 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }
) => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', options).format(date);
  } catch (error) {
    console.error('Error formatting date:', error);
    return '';
  }
};

/**
 * Format a number to include thousands separators
 * @param number The number to format
 * @returns Formatted number string
 */
export const formatNumber = (number: number) => {
  return new Intl.NumberFormat('en-US').format(number);
};

/**
 * Format percentage with % sign
 * @param percent The percentage value (e.g., 10 for 10%)
 * @returns Formatted percentage string
 */
export const formatPercent = (percent: number) => {
  return `${percent}%`;
};