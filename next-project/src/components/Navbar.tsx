'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { useCart } from "@/lib/CartContext";
import { CartDropdown } from "./CartDropdown";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

// Mock product data for search - in a real app, this would be fetched from an API
const searchProducts = [
  { id: 1, name: "NVIDIA RTX 4070 Graphics Card", category: "graphics-cards" },
  { id: 2, name: "Intel Core i9-13900K Processor", category: "processors" },
  { id: 3, name: "AMD Ryzen 5 5600X Processor", category: "processors" },
  { id: 4, name: "ASUS ROG Gaming Monitor 27\" 165Hz", category: "monitors" },
  { id: 5, name: "Corsair Vengeance 32GB DDR5 RAM", category: "memory" },
  { id: 6, name: "Samsung 970 EVO Plus 500GB NVMe SSD", category: "storage" },
  { id: 7, name: "WD Blue 1TB SATA SSD", category: "storage" },
  { id: 8, name: "ASUS PRIME B450M-A II AMD Motherboard", category: "motherboards" },
  { id: 9, name: "Cooler Master Hyper 212 CPU Cooler", category: "cooling" },
  { id: 10, name: "NZXT H510 Mid Tower Case", category: "cases" },
];

export function Navbar() {
  const { getCartCount, setIsCartOpen, isCartOpen } = useCart();
  const cartCount = getCartCount();
  const router = useRouter();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  
  // Filter products based on search term
  const suggestions = searchTerm 
    ? searchProducts.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      ).slice(0, 5) 
    : [];
  
  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
      setShowSuggestions(false);
    }
  };
  
  // Handle suggestion click
  const handleSuggestionClick = (product: typeof searchProducts[0]) => {
    router.push(`/products/${product.category}/${product.id}`);
    setSearchTerm("");
    setShowSuggestions(false);
  };
  
  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
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
                <span className="inline-flex items-center justify-center">🔧</span>
                PC Builder
              </Button>
            </Link>
          </nav>

          {/* Search, Cart and Account */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:block relative w-64" ref={searchRef}>
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <Input 
                    type="text" 
                    placeholder="Search products..." 
                    className="pl-10 border-neutral-300 focus:border-blue-500 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                  />
                  <button 
                    type="submit" 
                    className="absolute left-0 top-0 h-full px-3 flex items-center justify-center text-neutral-400 hover:text-blue-600"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>
              </form>
              
              {/* Search suggestions dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-50 w-full mt-1 bg-white border border-neutral-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                  {suggestions.map((product) => (
                    <div 
                      key={product.id} 
                      className="px-4 py-2 cursor-pointer hover:bg-blue-50 transition-colors"
                      onClick={() => handleSuggestionClick(product)}
                    >
                      <p className="text-sm">{product.name}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <div className="relative">
              <button 
                onClick={() => setIsCartOpen(!isCartOpen)}
                className="p-2 hover:bg-blue-50 text-blue-700 hover:text-blue-800 rounded-full relative transition-colors"
                aria-label="Cart"
              >
                <span className="inline-flex items-center justify-center text-xl">🛒</span>
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount > 99 ? '99+' : cartCount}
                  </span>
                )}
              </button>
              <CartDropdown />
            </div>
            
            <Link href="/account" className="p-2 hover:bg-blue-50 text-blue-700 hover:text-blue-800 rounded-full transition-colors" aria-label="Account">
              <span className="inline-flex items-center justify-center text-xl">👤</span>
            </Link>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 hover:bg-blue-50 text-blue-700 hover:text-blue-800 rounded-full transition-colors"
              aria-label="Menu"
            >
              <span className="inline-flex items-center justify-center text-xl">☰</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}