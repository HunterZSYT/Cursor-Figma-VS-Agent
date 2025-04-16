'use client';

import { useState, useEffect } from 'react';
import { Navbar } from "@/components/Navbar";
import { formatPrice, Product } from "@/lib/utils";
import { getBundleById } from "@/lib/data/bundles";
import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/lib/CartContext";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";

// Bundle Deal Detail Page
export default function BundleDealDetailPage({
  params
}: {
  params: { id: string }
}) {
  const [deal, setDeal] = useState(null);
  const { addToCart } = useCart();
  const router = useRouter();
  
  // Load the bundle when component mounts
  useEffect(() => {
    const bundleData = getBundleById(params.id);
    setDeal(bundleData);
  }, [params.id]);
  
  // Redirect to deals page if deal not found
  useEffect(() => {
    if (deal === null) {
      // Don't redirect immediately, wait to see if the deal loads
      return;
    }
    
    if (deal === undefined) {
      router.push('/deals');
    }
  }, [deal, router]);

  // Show loading state while deal is being fetched
  if (deal === null) {
    return (
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-xl text-neutral-600">Loading bundle...</p>
        </div>
      </div>
    );
  }

  // If deal is undefined after loading, return null (will redirect in useEffect)
  if (!deal) {
    return null;
  }

  // Check if deal is active
  const isDealActive = deal.dealEndsAt 
    ? new Date(deal.dealEndsAt) > new Date() 
    : true;

  // Format deal end date
  const formatDealEndDate = (dateString?: string) => {
    if (!dateString) return null;
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric',
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  // Add entire bundle to cart
  const handleAddBundleToCart = () => {
    deal.products.forEach(product => {
      addToCart({
        id: product.id.toString(),
        name: product.name,
        price: product.price,
        image: product.image || '',
        emoji: product.emoji || '',
        category: product.category
      });
    });
  };

  // Calculate if the bundle has any products with additional discounts
  const hasDiscountedProducts = deal.products.some(p => p.discountEnabled && p.originalPrice);
  
  // Calculate total original prices of all products without bundle discount
  const totalOriginalPrice = deal.products.reduce((sum, p) => sum + (p.originalPrice || p.price), 0);
  
  // Calculate the additional savings from individual product discounts
  const additionalSavings = totalOriginalPrice > deal.totalPrice ? totalOriginalPrice - deal.totalPrice : 0;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Breadcrumb */}
      <div className="bg-neutral-100 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm">
            <Link href="/" className="text-blue-700 hover:text-blue-800">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/deals" className="text-blue-700 hover:text-blue-800">
              Deals
            </Link>
            <span className="mx-2">/</span>
            <span className="text-neutral-600">{deal.name}</span>
          </div>
        </div>
      </div>

      {/* Deal Header */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Deal Image (if available) */}
            {deal.featuredImageUrl && (
              <div className="w-full md:w-1/3 relative h-64 md:h-auto rounded-lg overflow-hidden bg-white border">
                <Image 
                  src={deal.featuredImageUrl} 
                  alt={deal.name}
                  fill
                  style={{ objectFit: "contain" }}
                  className="p-4"
                />
              </div>
            )}
            
            {/* Deal Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl md:text-3xl font-bold text-blue-900">{deal.name}</h1>
                <Badge variant={deal.dealType === 'bundle' ? 'default' : 'secondary'} className="uppercase">
                  {deal.dealType}
                </Badge>
              </div>
              
              {deal.dealCode && (
                <div className="mb-4">
                  <Badge variant="outline" className="text-sm font-mono bg-blue-50">
                    Deal Code: {deal.dealCode}
                  </Badge>
                </div>
              )}
              
              <p className="text-neutral-700 mb-6 text-lg">{deal.description}</p>
              
              {/* Pricing and Savings */}
              <div className="bg-white p-4 rounded-lg border mb-4">
                <div className="flex items-baseline gap-3 mb-2">
                  <span className="text-3xl font-bold text-blue-600">
                    {formatPrice(deal.discountedPrice)}
                  </span>
                  <span className="text-xl text-neutral-500 line-through">
                    {formatPrice(deal.totalPrice)}
                  </span>
                  <Badge variant="destructive" className="ml-auto text-sm">
                    Save {formatPrice(deal.savings)} ({deal.savingsPercent}%)
                  </Badge>
                </div>
                
                {hasDiscountedProducts && additionalSavings > 0 && (
                  <div className="text-sm text-green-600 font-medium mt-1">
                    Includes additional {formatPrice(additionalSavings)} in product discounts!
                  </div>
                )}
                
                {deal.dealEndsAt && (
                  <div className="mt-2 text-sm">
                    <span className={`font-medium ${isDealActive ? 'text-red-500' : 'text-neutral-500'}`}>
                      {isDealActive 
                        ? `Limited time offer - Ends: ${formatDealEndDate(deal.dealEndsAt)}` 
                        : 'This offer has expired'}
                    </span>
                  </div>
                )}
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Button 
                  className="flex-grow bg-blue-600 hover:bg-blue-700"
                  size="lg"
                  onClick={handleAddBundleToCart}
                  disabled={!isDealActive}
                >
                  {isDealActive ? 'Add Bundle to Cart' : 'Offer Expired'}
                </Button>
                
                <Button
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50"
                  size="lg"
                  onClick={() => router.push('/deals')}
                >
                  View More Deals
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Product List Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-2">Bundle Products</h2>
          <p className="text-neutral-600">
            This {deal.dealType} includes the following {deal.products.length} items:
          </p>
        </div>
        
        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {deal.products.map((product: Product) => (
            <ProductCard
              key={`${deal.id}-product-${product.id}`}
              id={product.id.toString()}
              title={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              image={product.image || '/next.svg'}
              category={product.category}
              emoji={product.emoji}
              discountEnabled={product.discountEnabled}
              discountPercent={product.discountPercent}
              showAddToCart={true}
            />
          ))}
        </div>
      </div>
      
      {/* Bundle Benefits Section */}
      <div className="bg-neutral-50 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Bundle Benefits</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <div className="text-3xl mb-4 text-blue-600">💰</div>
              <h3 className="text-xl font-bold mb-2">Save Money</h3>
              <p className="text-neutral-600">
                Get {deal.savingsPercent}% off compared to buying each product separately
              </p>
            </Card>
            
            <Card className="p-6 text-center">
              <div className="text-3xl mb-4 text-blue-600">✅</div>
              <h3 className="text-xl font-bold mb-2">Guaranteed Compatibility</h3>
              <p className="text-neutral-600">
                All products in this bundle are tested to work together perfectly
              </p>
            </Card>
            
            <Card className="p-6 text-center">
              <div className="text-3xl mb-4 text-blue-600">🛠️</div>
              <h3 className="text-xl font-bold mb-2">Technical Support</h3>
              <p className="text-neutral-600">
                Get priority technical support for your complete bundle
              </p>
            </Card>
          </div>
        </div>
      </div>
      
      {/* FAQ Section */}
      <div className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
        
        <div className="space-y-4 max-w-3xl">
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="font-bold text-lg mb-2">Can I customize this bundle?</h3>
            <p className="text-neutral-600">
              This is a pre-configured bundle designed for optimal performance and value. 
              For custom configurations, please use our PC Builder tool.
            </p>
          </div>
          
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="font-bold text-lg mb-2">What warranty is included?</h3>
            <p className="text-neutral-600">
              All products come with their standard manufacturer warranties. 
              PC Park also provides a 7-day satisfaction guarantee on the complete bundle.
            </p>
          </div>
          
          <div className="bg-white p-5 rounded-lg shadow-sm">
            <h3 className="font-bold text-lg mb-2">Can I return individual items from the bundle?</h3>
            <p className="text-neutral-600">
              For warranty issues, individual components can be serviced. 
              However, for returns, the entire bundle must be returned together to maintain the special pricing.
            </p>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-blue-900 text-neutral-200 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white font-bold text-lg mb-4">PC Park</h3>
              <p className="mb-4">Your one-stop solution for all computer hardware needs in Bangladesh.</p>
              <div className="flex gap-4">
                <a href="#" className="hover:text-white transition-colors">Facebook</a>
                <a href="#" className="hover:text-white transition-colors">Instagram</a>
                <a href="#" className="hover:text-white transition-colors">YouTube</a>
              </div>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Shop</h3>
              <ul className="space-y-2">
                <li><Link href="/products" className="hover:text-white transition-colors">All Products</Link></li>
                <li><Link href="/deals" className="hover:text-white transition-colors">Deals & Bundles</Link></li>
                <li><a href="#" className="hover:text-white transition-colors">Best Sellers</a></li>
                <li><Link href="/pc-builder" className="hover:text-white transition-colors">PC Builder</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-white transition-colors">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Warranty Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Service Center</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-white font-bold text-lg mb-4">Contact</h3>
              <address className="not-italic">
                <p className="mb-2">Shop- 100 & 101, 2nd floor, Syed Grand Center, Uttara, Dhaka, Bangladesh, 1230</p>
                <p className="mb-2">
                  <a href="tel:+8801979487483" className="hover:text-white transition-colors">01979-487483</a>
                </p>
                <p>
                  <a href="mailto:pcparkbd101@gmail.com" className="hover:text-white transition-colors">pcparkbd101@gmail.com</a>
                </p>
              </address>
            </div>
          </div>
          <div className="border-t border-blue-800 mt-8 pt-8 text-center">
            <p>&copy; 2025 PC Park. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}