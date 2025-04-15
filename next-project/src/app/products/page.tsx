'use client';

import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { Navbar } from "@/components/Navbar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useCart } from "@/lib/CartContext";
import { productData, formatPrice } from "@/lib/utils";

// Price ranges
const priceRanges = [
  { id: "price-1", label: "Under BDT 10,000", min: 0, max: 9999 },
  { id: "price-2", label: "BDT 10,000 - 20,000", min: 10000, max: 20000 },
  { id: "price-3", label: "BDT 20,000 - 50,000", min: 20000, max: 50000 },
  { id: "price-4", label: "BDT 50,000 - 100,000", min: 50000, max: 100000 },
  { id: "price-5", label: "Over BDT 100,000", min: 100000, max: 10000000 }
];

// Categories for filtering
const categories = [
  { id: 1, name: "All Products", slug: "all" },
  { id: 2, name: "CPUs & Processors", slug: "processors" },
  { id: 3, name: "Graphics Cards", slug: "gpu" },
  { id: 4, name: "Motherboards", slug: "motherboard" },
  { id: 5, name: "Memory (RAM)", slug: "ram" },
  { id: 6, name: "Storage", slug: "storage" },
  { id: 7, name: "Power Supplies", slug: "power-supply" },
  { id: 8, name: "PC Cases", slug: "case" },
  { id: 9, name: "Cooling", slug: "cooler" },
  { id: 10, name: "Peripherals", slug: "peripherals" },
  { id: 11, name: "Laptops", slug: "laptops" },
];

// Get all unique brands from products
const brands = [...new Set(productData.map(product => product.brand))].sort();

export default function ProductsPage() {
  const { addToCart } = useCart();
  // Get URL parameters
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // State for filtering and sorting
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [sortOption, setSortOption] = useState("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState(productData);
  const [displayedProducts, setDisplayedProducts] = useState(productData);
  
  // Pagination settings
  const productsPerPage = 9;
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  
  // Initialize filters from URL parameters on first load
  useEffect(() => {
    const category = searchParams.get('category') || 'all';
    setActiveCategory(category);
    
    // We could also handle other URL parameters for prices, brands, sorting, etc.
  }, [searchParams]);
  
  // Apply filters and sorting whenever filter state changes
  useEffect(() => {
    let results = [...productData];
    
    // Filter by category
    if (activeCategory !== 'all') {
      results = results.filter(product => product.category === activeCategory);
    }
    
    // Filter by price ranges
    if (selectedPriceRanges.length > 0) {
      const priceFilters = priceRanges.filter(range => 
        selectedPriceRanges.includes(range.id)
      );
      
      results = results.filter(product => 
        priceFilters.some(filter => 
          product.price >= filter.min && product.price <= filter.max
        )
      );
    }
    
    // Filter by brands
    if (selectedBrands.length > 0) {
      results = results.filter(product => 
        selectedBrands.includes(product.brand)
      );
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'price-asc':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        // In a real app, you'd sort by date
        // Here we'll just reverse to simulate newest first
        results.reverse();
        break;
      default: // 'featured' - default order
        break;
    }
    
    setFilteredProducts(results);
    // Reset to first page when filters change
    setCurrentPage(1);
  }, [activeCategory, selectedPriceRanges, selectedBrands, sortOption]);
  
  // Update displayed products based on pagination
  useEffect(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    setDisplayedProducts(filteredProducts.slice(startIndex, endIndex));
  }, [filteredProducts, currentPage]);
  
  // Handle category selection
  const handleCategoryChange = (slug: string) => {
    setActiveCategory(slug);
    // Update URL to reflect the category filter
    if (slug === 'all') {
      router.push('/products');
    } else {
      router.push(`/products?category=${slug}`);
    }
  };
  
  // Handle price range selection
  const handlePriceRangeChange = (priceId: string) => {
    setSelectedPriceRanges(prev => {
      if (prev.includes(priceId)) {
        return prev.filter(id => id !== priceId);
      } else {
        return [...prev, priceId];
      }
    });
  };
  
  // Handle brand selection
  const handleBrandChange = (brand: string) => {
    setSelectedBrands(prev => {
      if (prev.includes(brand)) {
        return prev.filter(b => b !== brand);
      } else {
        return [...prev, brand];
      }
    });
  };
  
  // Handle sorting change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };
  
  // Handle pagination
  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
      // Scroll to top of products section
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

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
            <span className="text-neutral-600">All Products</span>
          </div>
        </div>
      </div>
      
      {/* Page Header */}
      <div className="bg-white py-8 border-b border-neutral-200">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-blue-900">All Products</h1>
          <p className="text-neutral-600 mt-2">
            Explore our extensive range of high-quality computer components and accessories.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-1/4">
            <div className="bg-white border border-neutral-200 rounded-lg p-5 sticky top-20">
              <h2 className="font-bold text-lg mb-4 text-blue-900">Categories</h2>
              <ul className="space-y-2">
                {categories.map((category) => (
                  <li key={category.id}>
                    <button 
                      onClick={() => handleCategoryChange(category.slug)}
                      className={`block w-full text-left py-2 px-3 rounded-md transition-colors ${
                        category.slug === activeCategory 
                          ? 'bg-blue-600 text-white' 
                          : 'text-neutral-700 hover:bg-blue-50 hover:text-blue-700'
                      }`}
                    >
                      {category.name}
                    </button>
                  </li>
                ))}
              </ul>

              <h2 className="font-bold text-lg mt-8 mb-4 text-blue-900">Price Range</h2>
              <div className="space-y-2">
                {priceRanges.map((range) => (
                  <div key={range.id} className="flex items-center">
                    <input 
                      type="checkbox" 
                      id={range.id} 
                      className="mr-2"
                      checked={selectedPriceRanges.includes(range.id)}
                      onChange={() => handlePriceRangeChange(range.id)}
                    />
                    <label htmlFor={range.id} className="text-neutral-700">{range.label}</label>
                  </div>
                ))}
              </div>

              <h2 className="font-bold text-lg mt-8 mb-4 text-blue-900">Brands</h2>
              <div className="space-y-2">
                {brands.map((brand, index) => (
                  <div key={index} className="flex items-center">
                    <input 
                      type="checkbox" 
                      id={`brand-${index}`} 
                      className="mr-2"
                      checked={selectedBrands.includes(brand)}
                      onChange={() => handleBrandChange(brand)}
                    />
                    <label htmlFor={`brand-${index}`} className="text-neutral-700">{brand}</label>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Button 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                  onClick={() => {
                    // Reset all filters
                    setActiveCategory('all');
                    setSelectedPriceRanges([]);
                    setSelectedBrands([]);
                    setSortOption('featured');
                    router.push('/products');
                  }}
                >
                  Reset Filters
                </Button>
              </div>
            </div>
          </div>
          
          {/* Product Grid */}
          <div className="lg:w-3/4">
            {/* Sort & Filter Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
              <div className="text-neutral-600">Showing {filteredProducts.length} products</div>
              <div className="flex items-center gap-4">
                <label htmlFor="sort" className="text-neutral-600">Sort by:</label>
                <select 
                  id="sort" 
                  className="border border-neutral-300 rounded-md px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                  value={sortOption}
                  onChange={handleSortChange}
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
            </div>
            
            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedProducts.length > 0 ? (
                displayedProducts.map((product) => (
                  <ProductCard
                    key={product.id.toString()}
                    id={product.id.toString()}
                    title={product.name}
                    price={product.price}
                    image={product.image || "/next.svg"}
                    category={product.category}
                    emoji={product.emoji}
                  />
                ))
              ) : (
                <div className="col-span-3 py-16 text-center">
                  <h3 className="text-xl font-medium text-neutral-600">No products found</h3>
                  <p className="mt-2 text-neutral-500">Try adjusting your filters or search criteria.</p>
                </div>
              )}
            </div>
            
            {/* Pagination */}
            {filteredProducts.length > 0 && (
              <div className="mt-10 flex justify-center">
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-neutral-300 text-neutral-700"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  
                  {/* Generate page numbers */}
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    // Show the first page, the last page, and pages around the current page
                    let pageToShow;
                    if (totalPages <= 5) {
                      // Show all pages if 5 or fewer
                      pageToShow = i + 1;
                    } else if (currentPage <= 3) {
                      // Near the start
                      pageToShow = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      // Near the end
                      pageToShow = totalPages - 4 + i;
                    } else {
                      // In the middle
                      pageToShow = currentPage - 2 + i;
                    }
                    
                    return (
                      <Button 
                        key={pageToShow}
                        size="sm" 
                        variant={currentPage === pageToShow ? "default" : "outline"}
                        className={currentPage === pageToShow 
                          ? "bg-blue-600 hover:bg-blue-700 text-white" 
                          : "border-neutral-300 text-neutral-700"}
                        onClick={() => handlePageChange(pageToShow)}
                      >
                        {pageToShow}
                      </Button>
                    );
                  })}
                  
                  {/* Show ellipsis if needed */}
                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <span className="text-neutral-400">...</span>
                  )}
                  
                  {/* Show last page if needed */}
                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="border-neutral-300 text-neutral-700"
                      onClick={() => handlePageChange(totalPages)}
                    >
                      {totalPages}
                    </Button>
                  )}
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-neutral-300 text-neutral-700"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Newsletter Section */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-6">Subscribe to receive notifications about new products, special offers, and tech tips.</p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="px-4 py-2 rounded-md border border-neutral-300 flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-colors">Subscribe</Button>
          </div>
        </div>
      </section>
      
      {/* Footer - This would typically be a component reused on all pages */}
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
                <li><a href="#" className="hover:text-white transition-colors">All Products</a></li>
                <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Best Sellers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">PC Builder</a></li>
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
                <p className="mb-2 flex items-start">
                  <span className="mr-2">📍</span> 
                  Shop- 100 & 101, 2nd floor, Syed Grand Center, Uttara, Dhaka, Bangladesh, 1230
                </p>
                <p className="mb-2 flex items-start">
                  <span className="mr-2">📱</span> 
                  <a href="tel:+8801979487483" className="hover:text-white transition-colors">01979-487483</a>
                </p>
                <p className="flex items-start">
                  <span className="mr-2">📧</span> 
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