/**
 * Type definitions for the application
 */

// Category type literals
export type Category = 'cpu' | 'gpu' | 'ram' | 'storage' | 'motherboard' 
  | 'power-supply' | 'case' | 'cooler' | 'peripherals' | 'processors' 
  | 'power-supplies' | 'laptops' | 'all';

// Subcategory type literals
export type SubCategory = 'monitor' | 'keyboard' | 'mouse' | 'headset' | 'ups';

// Deal type literals
export type DealType = 'bundle' | 'combo' | 'package';

// Brand type literals
export type Brand = 'AMD' | 'Intel' | 'NVIDIA' | 'ASUS' | 'MSI' | 'Corsair' 
  | 'G.Skill' | 'Samsung' | 'Western Digital' | 'NZXT' | 'Cooler Master' 
  | 'Logitech' | 'Razer' | 'HyperX' | 'SteelSeries' | 'APC' | 'Microtek' 
  | 'CyberPower' | 'EVGA' | 'LG';

// Product interface
export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;  // Original price before discount
  discountEnabled?: boolean; // Whether this product has a discount
  discountPercent?: number; // Percentage of discount
  discountExpiry?: string;  // When the discount expires (ISO date string)
  image?: string;
  emoji?: string;  // For products without images
  stock?: number;
  rating?: number;  // Product rating (0-5)
  category?: string;
  subcategory?: string;
  specs?: string[];
  description?: string;
  brand?: string;
  compatibility?: string[];
}

// Deal Package interface for bundle deals
export interface DealPackage {
  id: string;
  name: string;
  description: string;
  products: Product[];
  totalPrice: number;
  discountedPrice: number;
  savings: number;
  savingsPercent: number;
  dealType: DealType;
  dealEndsAt?: string;
  featuredImageUrl?: string;
  dealCode?: string;
}

// Bundle stub interface for declarative bundle definition
export interface BundleStub {
  id: string;
  name: string;
  description: string;
  productIds: string[];
  discountedPrice: number;
  dealType: DealType;
  dealEndsAt?: string;
  featuredImageUrl?: string;
  dealCode?: string;
}

// Discount rule interface
export interface DiscountRule {
  id: string;
  discountPercent: number;
  discountExpiry: string;
}