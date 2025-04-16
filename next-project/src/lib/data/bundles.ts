import { BundleStub, DealPackage, DealType, Product } from "../utils";
import { productData as rawProductData } from "./products"; // Fixed import name

// Bundle packages defined declaratively with product IDs
export const bundleStubs: BundleStub[] = [
  {
    id: "bundle-1",
    name: "Budget Gaming PC Bundle",
    description: "Perfect starter gaming PC with everything you need to get started",
    productIds: ["3", "7", "10", "11"],
    discountedPrice: 24500,
    dealType: "bundle",
    dealEndsAt: "2025-06-30T00:00:00Z",
    dealCode: "BUDGET-GAMING"
  },
  {
    id: "bundle-2",
    name: "Streaming Setup Bundle",
    description: "Complete streaming setup with high-quality peripherals",
    productIds: ["18", "21", "25", "28"],
    discountedPrice: 67000,
    dealType: "package",
    dealEndsAt: "2025-07-15T00:00:00Z",
    dealCode: "STREAM-SETUP"
  },
  {
    id: "bundle-3",
    name: "Pro Gaming Peripheral Bundle",
    description: "High-end peripherals for competitive gaming",
    productIds: ["25", "22", "28", "19"],
    discountedPrice: 76000,
    dealType: "combo",
    dealEndsAt: "2025-05-30T00:00:00Z",
    dealCode: "PRO-GAMING"
  },
  {
    id: "bundle-4",
    name: "Home Office Productivity Bundle",
    description: "Everything you need for a productive home office setup",
    productIds: ["20", "23", "26", "31"],
    discountedPrice: 42000,
    dealType: "package",
    dealEndsAt: "2025-06-20T00:00:00Z",
    dealCode: "HOME-OFFICE"
  },
  {
    id: "bundle-5",
    name: "Content Creator's Dream Bundle",
    description: "Powerful setup for video editing, streaming, and content creation",
    productIds: ["3", "14", "8", "11", "15"],
    discountedPrice: 56500,
    dealType: "bundle",
    dealEndsAt: "2025-07-10T00:00:00Z",
    dealCode: "CREATOR-DREAM"
  }
];

/**
 * Resolves a bundle stub into a full DealPackage with product details and calculated savings
 * @param bundle The bundle stub with product IDs
 * @param products Array of products to resolve from
 * @returns A fully populated DealPackage with product details and calculated savings
 */
export function resolveBundle(bundle: BundleStub, products: Product[] = rawProductData): DealPackage {
  const bundleProducts = bundle.productIds
    .map(id => products.find(p => p.id === id))
    .filter((p): p is Product => p !== undefined);
  
  const totalPrice = bundleProducts.reduce((sum, p) => sum + p.price, 0);
  const savings = totalPrice - bundle.discountedPrice;

  return {
    ...bundle,
    products: bundleProducts,
    totalPrice,
    savings,
    savingsPercent: Math.round((savings / totalPrice) * 100)
  };
}

/**
 * Get all bundles as fully resolved DealPackages
 * @param products Optional array of products to use for resolution
 * @returns Array of fully resolved DealPackages
 */
export function getAllBundles(products: Product[] = rawProductData): DealPackage[] {
  return bundleStubs.map(bundle => resolveBundle(bundle, products));
}

/**
 * Get a specific bundle by ID
 * @param id Bundle ID to search for
 * @param products Optional array of products to use for resolution
 * @returns The resolved bundle or undefined if not found
 */
export function getBundleById(id: string, products: Product[] = rawProductData): DealPackage | undefined {
  const bundle = bundleStubs.find(b => b.id === id);
  if (!bundle) return undefined;
  
  return resolveBundle(bundle, products);
}

/**
 * Filter bundles by deal type
 * @param dealType Type of deal to filter by
 * @param products Optional array of products to use for resolution
 * @returns Array of matching bundles
 */
export function getBundlesByDealType(dealType: DealType, products: Product[] = rawProductData): DealPackage[] {
  return bundleStubs
    .filter(bundle => bundle.dealType === dealType)
    .map(bundle => resolveBundle(bundle, products));
}