import { Product } from "./types";

/**
 * Filter products by category
 * @param category The category to filter by
 * @param products Array of products to filter
 * @returns Filtered products that match the category
 */
export const getProductsByCategory = (category: string, products: Product[]) => {
  if (category === 'all') {
    return products;
  }
  
  return products.filter(product => product.category === category);
};

/**
 * Filter products by subcategory
 * @param subcategory The subcategory to filter by
 * @param products Array of products to filter
 * @returns Filtered products that match the subcategory
 */
export const getProductsBySubcategory = (subcategory: string, products: Product[]) => {
  return products.filter(product => 
    'subcategory' in product && product.subcategory === subcategory
  );
};

/**
 * Filter products by brand
 * @param brand The brand to filter by
 * @param products Array of products to filter
 * @returns Filtered products that match the brand
 */
export const getProductsByBrand = (brand: string, products: Product[]) => {
  return products.filter(product => product.brand === brand);
};

/**
 * Filter products by price range
 * @param minPrice Minimum price (inclusive)
 * @param maxPrice Maximum price (inclusive)
 * @param products Array of products to filter
 * @returns Filtered products within the price range
 */
export const getProductsByPriceRange = (
  minPrice: number,
  maxPrice: number,
  products: Product[]
) => {
  return products.filter(
    product => product.price >= minPrice && product.price <= maxPrice
  );
};

/**
 * Filter products that have active discounts
 * @param products Array of products to filter
 * @returns Products with active discounts
 */
export const getDiscountedProducts = (products: Product[]) => {
  return products.filter(product => product.discountEnabled === true);
};

/**
 * Filter products by compatibility
 * @param compatibilityTag The compatibility tag to filter by (e.g., "am4", "ddr4")
 * @param products Array of products to filter
 * @returns Products that are compatible with the given tag
 */
export const getProductsByCompatibility = (compatibilityTag: string, products: Product[]) => {
  return products.filter(
    product => product.compatibility?.includes(compatibilityTag)
  );
};

/**
 * Search products by keyword in name or description
 * @param keyword The keyword to search for
 * @param products Array of products to search through
 * @returns Products that match the keyword
 */
export const searchProducts = (keyword: string, products: Product[]) => {
  const lowerKeyword = keyword.toLowerCase();
  
  return products.filter(product => 
    product.name.toLowerCase().includes(lowerKeyword) || 
    product.description?.toLowerCase().includes(lowerKeyword)
  );
};

/**
 * Get related products based on category and excluding current product
 * @param product The current product
 * @param products Array of all products
 * @param limit Maximum number of related products to return
 * @returns Related products with the same category
 */
export const getRelatedProducts = (
  product: Product,
  products: Product[],
  limit: number = 4
) => {
  if (!product.category) return [];
  
  return products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, limit);
};