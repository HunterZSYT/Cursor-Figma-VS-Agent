'use client';

import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import Image from 'next/image';
import { Card } from './ui/card';
import { ProductCard } from './ProductCard';
import { Product, formatPrice } from '@/lib/utils';

// Types
interface ComponentCategory {
  id: string;
  name: string;
  slug: string;
  icon: string;
  required: boolean;
}

interface PCComponentSelectorProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (component: Product) => void;
  category: ComponentCategory | null;
  products: Product[];
}

export function PCComponentSelector({
  isOpen,
  onClose,
  onSelect,
  category,
  products
}: PCComponentSelectorProps) {
  const [sortOption, setSortOption] = useState("price-asc");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState<{ min: number | null; max: number | null }>({ min: null, max: null });
  const [showBrandDropdown, setShowBrandDropdown] = useState(true); // Default to expanded

  // Get unique brands from products
  const uniqueBrands = [...new Set(products.map(product => product.brand))].sort();

  // Reset filters when component is opened
  useEffect(() => {
    if (isOpen) {
      setSortOption("price-asc");
      setSelectedBrands([]);
      setSearchQuery("");
      setPriceRange({ min: null, max: null });
    }
  }, [isOpen]);

  // Filter and sort products
  const filteredProducts = products
    .filter(product => 
      // Brand filter
      (selectedBrands.length === 0 || selectedBrands.includes(product.brand ?? "")) &&
      // Search query
      (searchQuery === "" || product.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
      // Price range filter
      (priceRange.min === null || product.price >= priceRange.min) &&
      (priceRange.max === null || product.price <= priceRange.max)
    )
    .sort((a, b) => {
      switch (sortOption) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

  // Clear all filters
  const clearFilters = () => {
    setSortOption("price-asc");
    setSelectedBrands([]);
    setSearchQuery("");
    setPriceRange({ min: null, max: null });
  };

  // Handle button click to add component
  const handleAddComponent = (component: Product) => {
    onSelect(component);
  };

  if (!isOpen || !category) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-neutral-200 flex justify-between items-center sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold">Select {category.name}</h2>
          <button 
            onClick={onClose}
            className="text-neutral-500 hover:text-neutral-800 transition-colors"
            aria-label="Close"
          >
            <span className="text-2xl">×</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-grow overflow-hidden">
          {/* Filters Sidebar - Made wider */}
          <div className="w-64 border-r border-neutral-200 overflow-y-auto p-5 bg-neutral-50 flex-shrink-0">
            <div className="mb-6">
              <h3 className="font-medium text-sm mb-2 text-neutral-700">Sort by</h3>
              <select 
                value={sortOption} 
                onChange={(e) => setSortOption(e.target.value)}
                className="w-full border border-neutral-300 rounded-md p-2 bg-white"
              >
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
            </div>

            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-sm text-neutral-700">Brand</h3>
                <button 
                  onClick={() => setShowBrandDropdown(prev => !prev)}
                  className="text-xs text-blue-600"
                >
                  {showBrandDropdown ? 'Hide' : 'Show'}
                </button>
              </div>
              
              {showBrandDropdown && (
                <div className="space-y-1 max-h-40 overflow-y-auto border border-neutral-200 rounded-md p-3 bg-white">
                  {uniqueBrands.map(brand => (
                    <div key={brand} className="flex items-center">
                      <input 
                        type="checkbox" 
                        id={`brand-${brand}`} 
                        checked={selectedBrands.includes(brand ?? "")}
                        onChange={() => {
                          if (selectedBrands.includes(brand ?? "")) {
                            setSelectedBrands(selectedBrands.filter(b => b !== (brand ?? "")));
                          } else {
                            setSelectedBrands([...selectedBrands, brand ?? ""]);
                          }
                        }}
                        className="mr-2 cursor-pointer"
                      />
                      <label htmlFor={`brand-${brand}`} className="text-sm text-neutral-700 cursor-pointer">
                        {brand}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mb-6">
              <h3 className="font-medium text-sm mb-2 text-neutral-700">Price Range</h3>
              <div className="flex flex-col space-y-2">
                <input
                  type="number"
                  placeholder="Min"
                  className="w-full p-2 border border-neutral-300 rounded-md text-sm"
                  value={priceRange.min ?? ''}
                  onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value ? Number(e.target.value) : null })}
                />
                <input
                  type="number"
                  placeholder="Max"
                  className="w-full p-2 border border-neutral-300 rounded-md text-sm"
                  value={priceRange.max ?? ''}
                  onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value ? Number(e.target.value) : null })}
                />
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-medium text-sm mb-2 text-neutral-700">Search</h3>
              <input
                type="text"
                placeholder="Search products..."
                className="w-full p-2 border border-neutral-300 rounded-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Clear Filters Button */}
            <Button 
              onClick={clearFilters} 
              variant="outline" 
              className="w-full"
            >
              Clear All Filters
            </Button>
          </div>

          {/* Product Grid */}
          <div className="flex-grow overflow-y-auto p-4">
            {filteredProducts.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <p className="text-neutral-600">No products match your filters.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id?.toString() ?? ""}
                    id={product.id?.toString() ?? ""}
                    title={product.name}
                    price={product.price}
                    image={product.image || "/next.svg"}
                    category={product.category ?? ""}
                    emoji={product.emoji ?? ""}
                    buttonText="Add"
                    onButtonClick={() => handleAddComponent(product)}
                    buttonVariant="default"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}