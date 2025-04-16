'use client';

import { useState, useEffect } from 'react';
import { Navbar } from "@/components/Navbar";
import { BundleDealCard } from "@/components/BundleDealCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DealPackage } from "@/lib/utils";
import { getAllBundles } from "@/lib/data/bundles";
import { Badge } from "@/components/ui/badge";

// Deal types for filtering
const dealTypes = [
  { id: 'all', name: 'All Deals' },
  { id: 'bundle', name: 'PC Bundles' },
  { id: 'combo', name: 'Component Combos' },
  { id: 'package', name: 'Package Deals' }
];

export default function DealsPage() {
  const [activeDealType, setActiveDealType] = useState('all');
  const [sortOption, setSortOption] = useState('savings-desc');
  const [displayedDeals, setDisplayedDeals] = useState<DealPackage[]>([]);
  
  // Initialize deals on component mount
  useEffect(() => {
    const bundleDeals = getAllBundles();
    setDisplayedDeals(bundleDeals);
  }, []);
  
  // Filter and sort deals whenever filters change
  useEffect(() => {
    const bundleDeals = getAllBundles();
    let filteredDeals = [...bundleDeals];
    
    // Apply deal type filter
    if (activeDealType !== 'all') {
      filteredDeals = filteredDeals.filter(deal => deal.dealType === activeDealType);
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'savings-desc':
        filteredDeals.sort((a, b) => b.savings - a.savings);
        break;
      case 'price-asc':
        filteredDeals.sort((a, b) => a.discountedPrice - b.discountedPrice);
        break;
      case 'price-desc':
        filteredDeals.sort((a, b) => b.discountedPrice - a.discountedPrice);
        break;
      case 'savings-percent':
        filteredDeals.sort((a, b) => b.savingsPercent - a.savingsPercent);
        break;
    }
    
    setDisplayedDeals(filteredDeals);
  }, [activeDealType, sortOption]);

  // Handle filter change
  const handleDealTypeChange = (dealType: string) => {
    setActiveDealType(dealType);
  };
  
  // Handle sort change
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
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
            <span className="text-neutral-600">Deals & Promotions</span>
          </div>
        </div>
      </div>
      
      {/* Page Header */}
      <div className="bg-gradient-to-r from-blue-700 to-blue-900 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Exclusive PC Deals & Bundles</h1>
          <p className="text-xl mb-6 max-w-3xl mx-auto">
            Save big with our exclusive PC component bundles and special combo deals. 
            All bundles are carefully curated by our tech experts for maximum value and compatibility.
          </p>
          <Badge variant="destructive" className="text-lg py-1 px-4">
            Limited Time Offers
          </Badge>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Filters and Sort */}
        <div className="flex flex-col md:flex-row justify-between mb-8 gap-4">
          <div className="flex flex-wrap gap-2">
            {dealTypes.map(dealType => (
              <Button 
                key={dealType.id} 
                variant={activeDealType === dealType.id ? "default" : "outline"}
                className={activeDealType === dealType.id 
                  ? "bg-blue-600 hover:bg-blue-700" 
                  : "border-blue-300 text-blue-700 hover:bg-blue-50"
                }
                onClick={() => handleDealTypeChange(dealType.id)}
              >
                {dealType.name}
              </Button>
            ))}
          </div>
          
          <div className="flex items-center gap-2">
            <label htmlFor="sort" className="text-neutral-600">Sort by:</label>
            <select 
              id="sort" 
              className="border border-neutral-300 rounded-md px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
              value={sortOption}
              onChange={handleSortChange}
            >
              <option value="savings-desc">Biggest Savings</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="savings-percent">Discount Percentage</option>
            </select>
          </div>
        </div>
        
        {/* Deal Cards */}
        <div className="space-y-8">
          {displayedDeals.length > 0 ? (
            displayedDeals.map(deal => (
              <BundleDealCard 
                key={deal.id} 
                deal={deal}
                showProducts={true}
                maxProductsToShow={4}
                variant="full"
              />
            ))
          ) : (
            <div className="py-16 text-center bg-white rounded-lg border">
              <h3 className="text-xl font-medium text-neutral-600">No deals currently available</h3>
              <p className="mt-2 text-neutral-500">Check back soon for new deals and promotions.</p>
            </div>
          )}
        </div>
      </div>
      
      {/* FAQ Section */}
      <section className="py-12 bg-neutral-50 mt-8">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg mb-2">How do bundle deals work?</h3>
              <p className="text-neutral-600">Our bundle deals combine multiple products at a discounted price compared to buying each item separately. All items in a bundle are guaranteed to be compatible with each other.</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg mb-2">Can I customize a bundle?</h3>
              <p className="text-neutral-600">While our pre-configured bundles cannot be modified, you can use our PC Builder tool to create a custom configuration with similar components.</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg mb-2">How long are deals available?</h3>
              <p className="text-neutral-600">Most deals have a specific end date displayed on the deal card. Limited-time offers may end sooner if stock runs out.</p>
            </div>
            <div className="bg-white p-5 rounded-lg shadow-sm">
              <h3 className="font-bold text-lg mb-2">What's the warranty on bundle products?</h3>
              <p className="text-neutral-600">All products in our bundles carry their standard manufacturer warranty. PC Park also provides additional support for any compatibility issues.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-3xl font-bold mb-4">Get Deal Alerts</h2>
          <p className="mb-6">Subscribe to receive notifications about new deals, flash sales, and limited-time offers.</p>
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
                <li><Link href="#" className="hover:text-white transition-colors">Best Sellers</Link></li>
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