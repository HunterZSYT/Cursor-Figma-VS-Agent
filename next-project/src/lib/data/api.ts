import { Product, DealPackage } from "../utils";
import { productData as rawProductData } from "./products"; // Fixed import name
import { applyDiscounts } from "./discounts";
import { getAllBundles, getBundleById } from "./bundles";

// The processed product data with discounts applied
const productData = applyDiscounts(rawProductData);

/**
 * Simulates fetching all products from an API
 * @returns Promise resolving to an array of products with discounts applied
 */
export async function getProducts(): Promise<Product[]> {
  // Simulate network delay
  return new Promise(resolve => 
    setTimeout(() => resolve(productData), 500)
  );
}

/**
 * Simulates fetching a product by its ID
 * @param id The product ID to fetch
 * @returns Promise resolving to the product or undefined if not found
 */
export async function getProductById(id: string): Promise<Product | undefined> {
  // Simulate network delay
  return new Promise(resolve => 
    setTimeout(() => resolve(productData.find(p => p.id === id)), 300)
  );
}

/**
 * Simulates fetching products by category
 * @param category The category to filter by
 * @returns Promise resolving to filtered products
 */
export async function getProductsByCategory(category: string): Promise<Product[]> {
  // Simulate network delay
  return new Promise(resolve => {
    setTimeout(() => {
      const filtered = category === 'all' 
        ? productData 
        : productData.filter(p => p.category === category);
      resolve(filtered);
    }, 400);
  });
}

/**
 * Simulates fetching products by subcategory
 * @param subcategory The subcategory to filter by
 * @returns Promise resolving to filtered products
 */
export async function getProductsBySubcategory(subcategory: string): Promise<Product[]> {
  // Simulate network delay
  return new Promise(resolve => {
    setTimeout(() => {
      const filtered = productData.filter(p => 
        'subcategory' in p && p.subcategory === subcategory
      );
      resolve(filtered);
    }, 400);
  });
}

/**
 * Simulates fetching all bundles
 * @returns Promise resolving to all bundles
 */
export async function getBundles(): Promise<DealPackage[]> {
  // Simulate network delay
  return new Promise(resolve => 
    setTimeout(() => resolve(getAllBundles(productData)), 600)
  );
}

/**
 * Simulates fetching a bundle by ID
 * @param id The bundle ID to fetch
 * @returns Promise resolving to the bundle or undefined if not found
 */
export async function getBundleByIdAsync(id: string): Promise<DealPackage | undefined> {
  // Simulate network delay
  return new Promise(resolve => 
    setTimeout(() => resolve(getBundleById(id, productData)), 300)
  );
}

/**
 * Simulates searching products by name or description
 * @param query The search query
 * @returns Promise resolving to matching products
 */
export async function searchProducts(query: string): Promise<Product[]> {
  // Simulate network delay
  return new Promise(resolve => {
    setTimeout(() => {
      const lowercaseQuery = query.toLowerCase();
      const results = productData.filter(p => 
        p.name.toLowerCase().includes(lowercaseQuery) || 
        (p.description?.toLowerCase().includes(lowercaseQuery) ?? false)
      );
      resolve(results);
    }, 500);
  });
}