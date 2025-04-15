'use client';

import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/lib/CartContext";

// Define TypeScript interfaces for better type safety
interface ProductSpec {
  name: string;
  value: string | number | boolean | string[];
}

interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isDefault?: boolean;
}

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  images: ProductImage[];
  emoji?: string;
  category: string;
  brand: string;
  specs: ProductSpec[];
  stock: number;
  rating: number;
  reviews: number;
  features: string[];
  createdAt: string; // For sorting by newest
}

// This would typically come from an API
// Mock product data for demonstration
const allProducts: Product[] = [
  {
    id: 1,
    name: "NVIDIA RTX 4070 Graphics Card",
    description: "Next-gen ray tracing performance for gamers and creators",
    price: 599.99,
    images: [
      { id: '1-1', url: "/gpu.jpg", alt: "RTX 4070 front view", isDefault: true },
      { id: '1-2', url: "/gpu.jpg", alt: "RTX 4070 side view" },
      { id: '1-3', url: "/gpu.jpg", alt: "RTX 4070 back view" },
    ],
    emoji: "🎮",
    category: "graphics-cards",
    brand: "NVIDIA",
    specs: [
      { name: "Memory", value: "12GB GDDR6X" },
      { name: "Interface", value: "PCIe 4.0 x16" },
      { name: "Power Connector", value: "8-pin + 8-pin" },
      { name: "Recommended PSU", value: "650W" },
      { name: "Dimensions", value: "267mm x 112mm" },
      { name: "Ray Tracing", value: true },
      { name: "DLSS", value: "DLSS 3.0" },
      { name: "Ports", value: ["3x DisplayPort 1.4a", "1x HDMI 2.1"] }
    ],
    stock: 15,
    rating: 4.8,
    reviews: 124,
    features: [
      "Ray tracing technology for realistic lighting and reflections",
      "DLSS 3.0 AI-powered performance boost",
      "Efficient Ada Lovelace architecture",
      "Low temperature design for quiet operation",
      "NVIDIA Reflex for reduced system latency in games"
    ],
    createdAt: "2025-03-10"
  },
  {
    id: 2,
    name: "Intel Core i9-13900K Processor",
    description: "Unlocked 24-core, 32-thread for extreme performance",
    price: 549.99,
    images: [
      { id: '2-1', url: "/cpu.jpg", alt: "Intel Core i9 top view", isDefault: true },
      { id: '2-2', url: "/cpu.jpg", alt: "Intel Core i9 package" },
    ],
    emoji: "⚡",
    category: "processors",
    brand: "Intel",
    specs: [
      { name: "Cores", value: "24 (8P + 16E)" },
      { name: "Threads", value: 32 },
      { name: "Base Clock", value: "3.0 GHz" },
      { name: "Boost Clock", value: "5.8 GHz" },
      { name: "Cache", value: "36MB Intel Smart Cache" },
      { name: "TDP", value: "125W" },
      { name: "Socket", value: "LGA 1700" },
      { name: "Memory Support", value: "DDR5-5600, DDR4-3200" }
    ],
    stock: 8,
    rating: 4.9,
    reviews: 87,
    features: [
      "Hybrid core architecture with 8 Performance cores and 16 Efficient cores",
      "Up to 5.8 GHz max turbo frequency",
      "Compatible with 600 and 700 series chipset motherboards",
      "Supports PCIe 5.0 and DDR5 memory",
      "Unlocked for overclocking"
    ],
    createdAt: "2025-02-15"
  },
  {
    id: 3,
    name: "ASUS ROG Gaming Monitor 27\" 165Hz",
    description: "QHD IPS panel with 1ms response time",
    price: 349.99,
    images: [
      { id: '3-1', url: "/monitor.jpg", alt: "ASUS ROG Monitor front view", isDefault: true },
      { id: '3-2', url: "/monitor.jpg", alt: "ASUS ROG Monitor side view" },
      { id: '3-3', url: "/monitor.jpg", alt: "ASUS ROG Monitor back view" },
      { id: '3-4', url: "/monitor.jpg", alt: "ASUS ROG Monitor ports" },
    ],
    emoji: "🖥️",
    category: "peripherals",
    brand: "ASUS",
    specs: [
      { name: "Size", value: "27 inches" },
      { name: "Resolution", value: "2560 x 1440 (QHD)" },
      { name: "Panel Type", value: "IPS" },
      { name: "Refresh Rate", value: "165Hz" },
      { name: "Response Time", value: "1ms (GTG)" },
      { name: "HDR", value: "HDR10" },
      { name: "Adaptive Sync", value: "G-SYNC Compatible, FreeSync Premium" },
      { name: "Ports", value: ["2x HDMI 2.0", "1x DisplayPort 1.2", "1x USB 3.0 Hub", "3.5mm Audio Out"] }
    ],
    stock: 20,
    rating: 4.7,
    reviews: 156,
    features: [
      "WQHD (2560 x 1440) resolution for detailed visuals",
      "Ultra-fast 165Hz refresh rate with 1ms response time",
      "G-SYNC and FreeSync Premium compatible for tear-free gaming"
    ],
    createdAt: "2025-01-20"
  },
];

/**
 * Get related products from the same category, excluding the current product
 * In a real app, this would be an API call to get recommended products
 */
function getRelatedProducts(category: string, currentId: number) {
  return allProducts
    .filter(product => product.category === category && product.id !== currentId)
    .slice(0, 4); // Limit to 4 related products
}

/**
 * Format a value for display in the specs table
 * Handles different data types appropriately
 */
function formatSpecValue(value: string | number | boolean | string[]): string {
  if (typeof value === 'boolean') {
    return value ? 'Yes' : 'No';
  } else if (Array.isArray(value)) {
    return value.join(', ');
  } else {
    return value.toString();
  }
}

export default function ProductDetailPage() {
  const { addToCart } = useCart();
  const params = useParams();
  const router = useRouter();
  const category = params.category as string;
  const productId = parseInt(params.id as string);
  
  // State for selected product and UI
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  // In a real app, this would be an API fetch
  useEffect(() => {
    // Simulate API request delay
    const fetchTimeout = setTimeout(() => {
      try {
        const foundProduct = allProducts.find(p => p.id === productId);
        
        if (foundProduct) {
          setProduct(foundProduct);
          // Set the default selected image
          const defaultImage = foundProduct.images.find(img => img.isDefault)?.id || 
                             foundProduct.images[0]?.id || null;
          setSelectedImage(defaultImage);
        } else {
          setError('Product not found');
        }
        
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load product');
        setIsLoading(false);
      }
    }, 300); // Simulating a short delay
    
    return () => clearTimeout(fetchTimeout);
  }, [productId]);
  
  // Handle quantity changes with validation
  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };
  
  const increaseQuantity = () => {
    setQuantity(prev => (prev < (product?.stock || 10) ? prev + 1 : prev));
  };
  
  // Handle image selection
  const handleImageSelect = (imageId: string) => {
    setSelectedImage(imageId);
  };
  
  // Handle adding to cart
  const addToCartHandler = () => {
    if (product) {
      addToCart({
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        image: product.images[0]?.url || '',
        emoji: product.emoji || '',
        category: product.category
      });
    }
  };
  
  // Format price with BDT currency
  const formatPrice = (price: number) => {
    return `BDT ${price.toLocaleString()}`;
  };
  
  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="container mx-auto px-4 py-16 flex-grow">
          <div className="text-center">
            <div className="animate-pulse flex flex-col items-center">
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
              <div className="h-64 bg-gray-200 rounded w-full max-w-lg mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
            </div>
          </div>
        </main>
      </div>
    );
  }
  
  // Error state
  if (error || !product) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="container mx-auto px-4 py-16 flex-grow">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-neutral-800">Product Not Found</h1>
            <p className="mt-4 mb-8 text-neutral-600">The product you're looking for does not exist or has been removed.</p>
            <Link href="/products">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">Back to Products</Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }
  
  // Get related products
  const relatedProducts = getRelatedProducts(category, productId);
  
  // Get the currently selected image or default
  const currentImage = product.images.find(img => img.id === selectedImage) || 
                       product.images.find(img => img.isDefault) || 
                       product.images[0];
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="bg-neutral-100 py-3">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center text-sm">
            <Link href="/" className="text-blue-700 hover:text-blue-800">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/products" className="text-blue-700 hover:text-blue-800">
              Products
            </Link>
            <span className="mx-2">/</span>
            <Link href={`/products?category=${category}`} className="text-blue-700 hover:text-blue-800">
              {category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-neutral-600 truncate max-w-[200px] sm:max-w-none">{product.name}</span>
          </div>
        </div>
      </div>
      
      {/* Product Detail Section */}
      <main className="container mx-auto px-4 py-8 flex-grow">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Product Image */}
          <div className="lg:w-1/2">
            <div className="bg-blue-50 rounded-lg flex items-center justify-center h-[400px]">
              {currentImage?.url ? (
                <img 
                  src={currentImage.url} 
                  alt={currentImage.alt} 
                  className="object-contain max-h-full"
                />
              ) : (
                <span className="text-8xl">{product.emoji}</span>
              )}
            </div>
            
            {/* Thumbnail gallery - now functional */}
            {product.images.length > 1 && (
              <div className="flex justify-center mt-4 gap-2 flex-wrap">
                {product.images.map((image) => (
                  <button
                    key={image.id}
                    onClick={() => handleImageSelect(image.id)}
                    className={`w-16 h-16 bg-blue-50 rounded-md flex items-center justify-center overflow-hidden ${
                      selectedImage === image.id ? 'border-2 border-blue-500' : 'border border-neutral-200'
                    }`}
                  >
                    {image.url ? (
                      <img 
                        src={image.url} 
                        alt={image.alt} 
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <span className="text-2xl">{product.emoji}</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div className="lg:w-1/2">
            <div className="mb-2 flex flex-wrap gap-2">
              <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                {product.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </span>
              <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
              </span>
              <span className="inline-block px-2 py-1 bg-neutral-100 text-neutral-800 text-xs font-medium rounded-full">
                {product.brand}
              </span>
            </div>
            
            <h1 className="text-3xl font-bold text-blue-900 mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center mr-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span key={i} className="text-yellow-400 text-lg">
                    {i < Math.floor(product.rating) ? "★" : i < product.rating ? "⯪" : "☆"}
                  </span>
                ))}
              </div>
              <span className="text-blue-700 font-medium">{product.rating}</span>
              <span className="mx-2 text-neutral-300">|</span>
              <span className="text-neutral-600">{product.reviews} reviews</span>
            </div>
            
            <p className="text-neutral-600 mb-6">{product.description}</p>
            
            <div className="text-3xl font-bold text-blue-700 mb-6">{formatPrice(product.price)}</div>
            
            {/* Key Features - Now handles varying length */}
            {product.features && product.features.length > 0 && (
              <div className="mb-6">
                <h3 className="font-medium text-neutral-800 mb-2">Key Features:</h3>
                <ul className="list-disc pl-5 space-y-1 text-neutral-600">
                  {product.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="border-t border-b border-neutral-200 py-6 mb-6">
              {/* Only show quantity selector if in stock */}
              {product.stock > 0 ? (
                <div className="flex items-center mb-6">
                  <span className="text-neutral-800 mr-4">Quantity:</span>
                  <div className="flex border border-neutral-300 rounded-md">
                    <button 
                      onClick={decreaseQuantity}
                      className="px-3 py-1 border-r border-neutral-300 text-neutral-600 hover:bg-neutral-100"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="px-4 py-1 flex items-center justify-center min-w-[40px]">
                      {quantity}
                    </span>
                    <button 
                      onClick={increaseQuantity}
                      className="px-3 py-1 border-l border-neutral-300 text-neutral-600 hover:bg-neutral-100"
                      aria-label="Increase quantity"
                      disabled={quantity >= product.stock}
                    >
                      +
                    </button>
                  </div>
                </div>
              ) : (
                <p className="text-red-500 mb-6">This product is currently out of stock.</p>
              )}
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  className="bg-blue-600 hover:bg-blue-700 text-white transition-colors py-6 flex-grow"
                  onClick={addToCartHandler}
                  disabled={product.stock <= 0}
                >
                  {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
                </Button>
                <Button 
                  variant="outline" 
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors py-6"
                >
                  Add to Wishlist
                </Button>
              </div>
            </div>
            
            <div className="flex flex-col gap-4 text-neutral-700">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Free shipping on orders over BDT 10,000
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                30-day money-back guarantee
              </div>
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Manufacturer warranty included
              </div>
            </div>
          </div>
        </div>
        
        {/* Product Specifications */}
        {product.specs && product.specs.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Specifications</h2>
            <div className="overflow-hidden border border-neutral-200 rounded-lg">
              <table className="min-w-full divide-y divide-neutral-200">
                <tbody className="divide-y divide-neutral-200">
                  {product.specs.map((spec, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-neutral-50' : 'bg-white'}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 w-1/4">
                        {spec.name}
                      </td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-neutral-600">
                        {formatSpecValue(spec.value)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-blue-900 mb-6">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(product => (
                <ProductCard
                  key={product.id}
                  id={product.id.toString()}
                  title={product.name}
                  price={product.price}
                  image={product.images[0]?.url}
                  category={product.category}
                  buttonText="View Details"
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}