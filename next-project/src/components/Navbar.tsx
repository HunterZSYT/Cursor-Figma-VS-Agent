'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useCart } from "@/lib/CartContext";
import { CartDropdown } from "./CartDropdown";

export function Navbar() {
  const { getCartCount, setIsCartOpen, isCartOpen } = useCart();
  const cartCount = getCartCount();
  
  return (
    <header className="bg-white border-b border-neutral-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="font-bold text-xl text-blue-700 hover:text-blue-800 transition-colors">
            PC Park
          </Link>

          {/* Main Navigation - Desktop */}
          <nav className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
            <Link href="/products" className="hover:text-blue-600 transition-colors">
              All Products
            </Link>
            <Link href="/deals" className="hover:text-blue-600 transition-colors">
              Deals
            </Link>
            <Link href="/support" className="hover:text-blue-600 transition-colors">
              Support
            </Link>
            <Link href="/pc-builder">
              <Button className="bg-blue-700 hover:bg-blue-800 text-white flex items-center gap-2 px-4">
                <span className="text-sm">🔧</span>
                PC Builder
              </Button>
            </Link>
          </nav>

          {/* Search, Cart and Account */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block relative w-64">
              <Input 
                type="text" 
                placeholder="Search products..." 
                className="pl-10 border-neutral-300 focus:border-blue-500 focus:ring-blue-500"
              />
              <span className="absolute left-3 top-2.5 text-neutral-400">
                🔍
              </span>
            </div>
            
            <div className="relative">
              <button 
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="p-2 hover:bg-blue-50 text-blue-700 hover:text-blue-800 rounded-full relative transition-colors"
              >
                <span className="text-xl">🛒</span>
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </button>
              <CartDropdown />
            </div>
            
            <Link href="/account" className="p-2 hover:bg-blue-50 text-blue-700 hover:text-blue-800 rounded-full transition-colors">
              <span className="text-xl">👤</span>
            </Link>
            
            {/* Mobile menu button */}
            <button className="md:hidden p-2 hover:bg-blue-50 text-blue-700 hover:text-blue-800 rounded-full transition-colors">
              <span className="text-xl">☰</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}