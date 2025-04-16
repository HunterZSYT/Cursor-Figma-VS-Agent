import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProductCard } from './ProductCard';
import { DealPackage, Product, formatPrice } from '@/lib/utils';
import { useCart } from "@/lib/CartContext";
import { Badge } from "@/components/ui/badge";
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface BundleDealCardProps {
  deal: DealPackage;
  showProducts?: boolean;
  maxProductsToShow?: number;
  variant?: 'compact' | 'full';
  className?: string;
}

export function BundleDealCard({
  deal,
  showProducts = true,
  maxProductsToShow = 4,
  variant = 'full',
  className = ''
}: BundleDealCardProps) {
  const { addToCart } = useCart();
  const router = useRouter();
  
  // Calculate if deal is active based on dealEndsAt date
  const isDealActive = deal.dealEndsAt 
    ? new Date(deal.dealEndsAt) > new Date() 
    : true;
  
  // Format deal ends date for display
  const formatDealEndDate = (dateString?: string) => {
    if (!dateString) return null;
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
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
  
  // Handle view bundle details
  const handleViewBundleDetails = () => {
    router.push(`/deals/${deal.id}`);
  };
  
  // The products to display (limited by maxProductsToShow)
  const displayProducts = deal.products.slice(0, maxProductsToShow);
  const hasMoreProducts = deal.products.length > maxProductsToShow;
  
  return (
    <Card className={`border overflow-hidden ${className}`}>
      {/* Bundle Header */}
      <div className="p-5 border-b bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-blue-900">{deal.name}</h3>
          <Badge variant={deal.dealType === 'bundle' ? 'default' : 'secondary'} className="uppercase">
            {deal.dealType}
          </Badge>
        </div>
        
        <p className="text-neutral-600 mb-4">{deal.description}</p>
        
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-blue-600">
              {formatPrice(deal.discountedPrice)}
            </span>
            <span className="text-neutral-500 line-through">
              {formatPrice(deal.totalPrice)}
            </span>
          </div>
          
          <Badge variant="destructive" className="ml-auto">
            Save {formatPrice(deal.savings)} ({deal.savingsPercent}%)
          </Badge>
        </div>
        
        {deal.dealEndsAt && (
          <div className="mt-3 flex items-center text-sm">
            <span className="text-red-500 font-medium">
              {isDealActive 
                ? `Offer ends: ${formatDealEndDate(deal.dealEndsAt)}` 
                : 'Offer expired'}
            </span>
          </div>
        )}
      </div>
      
      {/* Products in Bundle (if showProducts is true) */}
      {showProducts && (
        <div className="p-5">
          <h4 className="text-sm font-semibold mb-4 text-neutral-700">
            Bundle Includes {deal.products.length} Items:
          </h4>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {displayProducts.map((product: Product, index: number) => (
              <ProductCard
                key={`${deal.id}-product-${index}`}
                id={product.id.toString()}
                title={product.name}
                price={product.price}
                originalPrice={product.originalPrice}
                image={product.image || '/next.svg'}
                category={product.category}
                emoji={product.emoji}
                discountEnabled={product.discountEnabled}
                discountPercent={product.discountPercent}
                showAddToCart={false}
                buttonText="View"
                buttonVariant="outline"
              />
            ))}
            
            {hasMoreProducts && (
              <Card className="flex items-center justify-center p-4 border border-dashed">
                <p className="text-center text-neutral-600">
                  +{deal.products.length - maxProductsToShow} more items in this bundle
                </p>
              </Card>
            )}
          </div>
        </div>
      )}
      
      {/* Call to Action */}
      <div className="p-5 bg-neutral-50 border-t">
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            className="flex-grow bg-blue-600 hover:bg-blue-700"
            size="lg"
            onClick={handleAddBundleToCart}
            disabled={!isDealActive}
          >
            Add Bundle to Cart
          </Button>
          
          <Button
            variant="outline"
            className="border-blue-600 text-blue-600 hover:bg-blue-50"
            size="lg"
            onClick={handleViewBundleDetails}
          >
            View Bundle Details
          </Button>
        </div>
      </div>
    </Card>
  );
}