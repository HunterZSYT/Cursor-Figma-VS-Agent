import { Product } from "../types";

/**
 * Discount rule definition
 */
export interface DiscountRule {
  id: string;           // Product ID that the discount applies to
  discountPercent: number;  // Percentage discount (e.g., 15 means 15% off)
  discountExpiry: string;   // ISO date string when discount expires
}

/**
 * Discount rules for various products
 */
export const discountRules: DiscountRule[] = [
  { 
    id: "3", 
    discountPercent: 15, 
    discountExpiry: "2025-06-15T00:00:00Z" 
  },
  { 
    id: "7", 
    discountPercent: 10, 
    discountExpiry: "2025-06-01T00:00:00Z" 
  },
  { 
    id: "10", 
    discountPercent: 20, 
    discountExpiry: "2025-05-20T00:00:00Z" 
  },
  { 
    id: "14", 
    discountPercent: 25, 
    discountExpiry: "2025-07-10T00:00:00Z" 
  },
  { 
    id: "18", 
    discountPercent: 30, 
    discountExpiry: "2025-05-30T00:00:00Z" 
  }
];

/**
 * Applies discount rules to a list of products
 * @param products The product list to apply discounts to
 * @param rules Optional custom discount rules (defaults to predefined rules)
 * @returns A new array of products with discounts applied
 */
export function applyDiscounts(
  products: Product[], 
  rules: DiscountRule[] = discountRules
): Product[] {
  return products.map(product => {
    const rule = rules.find(r => r.id === product.id);
    
    // No discount rule found for this product
    if (!rule) return product;
    
    // Calculate the discounted price
    const discountedPrice = Math.round(product.price * (1 - rule.discountPercent / 100));
    
    // Return a new product with discount properties added
    return {
      ...product,
      discountEnabled: true,
      originalPrice: product.price,
      discountPercent: rule.discountPercent,
      price: discountedPrice,
      discountExpiry: rule.discountExpiry
    };
  });
}

/**
 * Check if a product has a valid discount
 * @param product The product to check
 * @returns True if the product has a valid non-expired discount
 */
export function hasValidDiscount(product: Product): boolean {
  if (!product.discountEnabled) return false;
  
  const now = new Date();
  const expiryDate = product.discountExpiry ? new Date(product.discountExpiry) : null;
  
  return !!expiryDate && now < expiryDate;
}

/**
 * Calculates time remaining until discount expires
 * @param expiryDateStr ISO date string of when discount expires
 * @returns Human-readable string of time remaining (e.g., "3 days left")
 */
export function getDiscountTimeRemaining(expiryDateStr: string): string {
  const now = new Date();
  const expiryDate = new Date(expiryDateStr);
  
  if (now >= expiryDate) return "Expired";
  
  const diffMs = expiryDate.getTime() - now.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
  if (diffDays > 0) {
    return `${diffDays} day${diffDays > 1 ? 's' : ''} left`;
  }
  
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  return `${diffHours} hour${diffHours > 1 ? 's' : ''} left`;
}