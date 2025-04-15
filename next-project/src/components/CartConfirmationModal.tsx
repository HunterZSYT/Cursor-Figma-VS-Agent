'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/CartContext';

export function CartConfirmationModal() {
  const { 
    showConfirmation, 
    setShowConfirmation, 
    lastAddedItem, 
    cartItems,
    getCartTotal,
    setIsCartOpen
  } = useCart();

  // Auto-hide the confirmation after 3 seconds
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (showConfirmation) {
      timer = setTimeout(() => {
        setShowConfirmation(false);
      }, 3000);
    }
    return () => clearTimeout(timer);
  }, [showConfirmation, setShowConfirmation]);

  if (!showConfirmation || !lastAddedItem) return null;

  // Format price with BDT currency
  const formatPrice = (price: number) => {
    return `BDT ${price.toLocaleString()}`;
  };

  // Find the quantity of this item in the cart
  const itemInCart = cartItems.find(item => item.id === lastAddedItem.id);
  const quantity = itemInCart?.quantity || 0;

  return (
    <div className="fixed top-24 right-4 z-50 w-80 shadow-lg animate-in slide-in-from-right">
      <Card className="p-4 border-2 border-green-500">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-medium text-green-700">Added to Cart!</h3>
          <button 
            onClick={() => setShowConfirmation(false)} 
            className="text-neutral-400 hover:text-neutral-700"
          >
            ×
          </button>
        </div>
        
        {lastAddedItem && (
          <div className="flex gap-3">
            <div className="w-16 h-16 bg-neutral-100 rounded flex items-center justify-center shrink-0">
              {lastAddedItem.image ? (
                <Image 
                  src={lastAddedItem.image} 
                  alt={lastAddedItem.name} 
                  width={60} 
                  height={60} 
                  style={{ objectFit: 'contain' }} 
                />
              ) : lastAddedItem.emoji ? (
                <span className="text-2xl">{lastAddedItem.emoji}</span>
              ) : (
                <span className="text-2xl">📦</span>
              )}
            </div>
            <div>
              <p className="font-medium text-sm line-clamp-2">{lastAddedItem.name}</p>
              <p className="text-sm text-neutral-500 mt-1">
                {quantity > 1 ? `${quantity}x ` : ''}{lastAddedItem.price > 0 ? formatPrice(lastAddedItem.price) : formatPrice(0)}
              </p>
            </div>
          </div>
        )}
        
        <div className="mt-4 text-sm text-neutral-600">
          Cart total: {formatPrice(getCartTotal())}
        </div>
        
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="text-sm"
            onClick={() => {
              setShowConfirmation(false);
              setIsCartOpen(true);
            }}
          >
            View Cart
          </Button>
          <Link href="/cart" className="w-full">
            <Button 
              size="sm" 
              className="w-full text-sm bg-blue-700 hover:bg-blue-800"
            >
              Checkout
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}