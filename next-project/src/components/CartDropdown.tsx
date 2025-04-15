'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/CartContext';
import { useEffect, useRef } from 'react';

export function CartDropdown() {
  const { 
    cartItems, 
    isCartOpen, 
    setIsCartOpen, 
    getCartTotal, 
    updateQuantity, 
    removeFromCart 
  } = useCart();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCartOpen(false);
      }
    };

    if (isCartOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCartOpen, setIsCartOpen]);

  // Format price with BDT currency
  const formatPrice = (price: number) => {
    return `BDT ${price.toLocaleString()}`;
  };

  if (!isCartOpen) return null;

  return (
    <div 
      ref={dropdownRef}
      className="absolute top-full right-0 mt-2 w-96 z-50 shadow-xl animate-in slide-in-from-top-5"
    >
      <Card className="p-4 border border-neutral-200">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-semibold text-lg">Shopping Cart</h3>
          <button 
            onClick={() => setIsCartOpen(false)} 
            className="text-neutral-400 hover:text-neutral-700 text-xl leading-none"
          >
            ×
          </button>
        </div>
        
        {cartItems.length === 0 ? (
          <div className="py-6 text-center">
            <div className="text-2xl mb-2">🛒</div>
            <p className="text-neutral-600">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="max-h-80 overflow-y-auto space-y-3">
              {cartItems.map(item => (
                <div key={item.id} className="flex gap-3 py-2 border-b border-neutral-100">
                  <div className="w-16 h-16 bg-neutral-100 rounded flex items-center justify-center shrink-0">
                    {item.image ? (
                      <Image 
                        src={item.image} 
                        alt={item.name} 
                        width={50} 
                        height={50} 
                        style={{ objectFit: 'contain' }} 
                      />
                    ) : item.emoji ? (
                      <span className="text-2xl">{item.emoji}</span>
                    ) : (
                      <span className="text-2xl">📦</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm line-clamp-2 mb-1">{item.name}</p>
                    <p className="text-sm text-neutral-600">
                      {item.price > 0 ? formatPrice(item.price) : formatPrice(0)}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center border rounded-md mb-1">
                      <button 
                        className="px-2 py-1 text-xs border-r hover:bg-neutral-100"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span className="px-2 py-1 text-xs">{item.quantity}</span>
                      <button 
                        className="px-2 py-1 text-xs border-l hover:bg-neutral-100"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </div>
                    <button 
                      className="text-red-600 text-xs hover:underline"
                      onClick={() => removeFromCart(item.id)}
                      aria-label="Remove item"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-3 border-t border-neutral-200">
              <div className="flex justify-between font-medium">
                <span>Subtotal:</span>
                <span>{formatPrice(getCartTotal())}</span>
              </div>
              <p className="text-xs text-neutral-500 mt-1">Shipping and taxes calculated at checkout</p>
            </div>
            
            <div className="mt-4 grid grid-cols-2 gap-2">
              <Link href="/cart" className="w-full">
                <Button 
                  variant="outline" 
                  className="w-full text-sm"
                  onClick={() => setIsCartOpen(false)}
                >
                  View Cart
                </Button>
              </Link>
              <Link href="/cart" className="w-full">
                <Button 
                  className="w-full text-sm bg-blue-700 hover:bg-blue-800"
                  onClick={() => setIsCartOpen(false)}
                >
                  Checkout
                </Button>
              </Link>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}