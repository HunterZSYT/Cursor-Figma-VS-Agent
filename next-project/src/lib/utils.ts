import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { formatPrice, formatDate } from "./format"
import { 
  Product, 
  DealPackage, 
  BundleStub, 
  DiscountRule
} from "./types"
import { 
  getProductsByCategory,
  getProductsBySubcategory,
  getProductById,
  getProductsByBrand,
  getProductsByIds,
  getCompatibleProducts
} from "./data/products"

// Re-export types
export type { Product, DealPackage, BundleStub, DiscountRule }

// Re-export utility functions
export { 
  formatPrice, 
  formatDate, 
  getProductsByCategory,
  getProductsBySubcategory,
  getProductById,
  getProductsByBrand,
  getProductsByIds,
  getCompatibleProducts
}

// Define DealType which is used in bundle-related components
export type DealType = "bundle" | "package" | "combo"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Utility functions for the application
 */

/**
 * Simple delay function that returns a promise that resolves after a specified time
 * @param ms Milliseconds to delay
 * @returns Promise that resolves after the delay
 */
export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Generate a random unique ID (simplified version)
 * @returns Random ID string
 */
export function generateId(): string {
  return Math.random().toString(36).substring(2, 9);
}

/**
 * Check if value is defined (not null or undefined)
 * @param value Any value to check
 * @returns Boolean indicating if value is defined
 */
export function isDefined<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

/**
 * Get a random integer between min and max (inclusive)
 * @param min Minimum value
 * @param max Maximum value
 * @returns Random integer
 */
export function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Check if a string is empty or whitespace only
 * @param str String to check
 * @returns Boolean indicating if string is empty
 */
export function isEmptyString(str: string | null | undefined): boolean {
  return !str || str.trim() === '';
}
