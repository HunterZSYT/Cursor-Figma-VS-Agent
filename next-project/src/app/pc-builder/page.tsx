'use client';

import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PCComponentSelector, PCComponent } from "@/components/PCComponentSelector";
import { useCart } from "@/lib/CartContext";

interface ComponentCategory {
  id: string;
  name: string;
  slug: string;
  icon: string;
  required: boolean;
}

// Mock data for products (in a real app, this would come from an API)
const products: PCComponent[] = [
  {
    id: "1",
    name: "AMD Athlon PRO 300GE AM4 Socket Desktop Processor with Radeon Vega 3 Graphics",
    price: 4900,
    image: "/cpu.jpg",
    emoji: "⚡",
    category: "cpu",
    brand: "AMD",
    compatibility: ["am4"]
  },
  {
    id: "2",
    name: "Intel Pentium Gold G6400 10th gen Coffee Lake Processor",
    price: 7300,
    image: "/cpu.jpg",
    emoji: "⚡",
    category: "cpu",
    brand: "Intel",
    compatibility: ["lga1200"]
  },
  {
    id: "3",
    name: "AMD Ryzen 5 5600X Processor with Radeon RX Vega 11 Graphics",
    price: 6900,
    image: "/cpu.jpg",
    emoji: "⚡",
    category: "cpu",
    brand: "AMD",
    compatibility: ["am4"]
  },
  {
    id: "4",
    name: "AMD Ryzen 5 5600G Processor",
    price: 7500,
    image: "/cpu.jpg",
    emoji: "⚡",
    category: "cpu",
    brand: "AMD",
    compatibility: ["am4"]
  },
  {
    id: "5",
    name: "Intel 10th Gen Core i3-10100F Processor",
    price: 7200,
    image: "/cpu.jpg",
    emoji: "⚡",
    category: "cpu",
    brand: "Intel",
    compatibility: ["lga1200"]
  },
  {
    id: "6",
    name: "Intel Pentium Gold G7400 Coffee Lake Processor",
    price: 7600,
    image: "/cpu.jpg",
    emoji: "⚡",
    category: "cpu",
    brand: "Intel",
    compatibility: ["lga1700"]
  },
  {
    id: "7",
    name: "ASUS PRIME B450M-A II AMD Motherboard",
    price: 9500,
    image: "/motherboard.jpg",
    emoji: "🔄",
    category: "motherboard",
    brand: "ASUS",
    compatibility: ["am4", "ddr4"]
  },
  {
    id: "8",
    name: "MSI MAG B550M MORTAR WIFI Gaming Motherboard",
    price: 16800,
    image: "/motherboard.jpg",
    emoji: "🔄",
    category: "motherboard",
    brand: "MSI",
    compatibility: ["am4", "ddr4"]
  },
  {
    id: "9",
    name: "Corsair Vengeance LPX 8GB DDR4 RAM",
    price: 2600,
    image: "/ram.jpg",
    emoji: "💾",
    category: "ram",
    brand: "Corsair",
    compatibility: ["ddr4"]
  },
  {
    id: "10",
    name: "G.Skill Trident Z RGB 16GB DDR4 RAM",
    price: 5800,
    image: "/ram.jpg",
    emoji: "💾",
    category: "ram",
    brand: "G.Skill",
    compatibility: ["ddr4"]
  },
  {
    id: "11",
    name: "Samsung 970 EVO Plus 500GB NVMe SSD",
    price: 6500,
    image: "/storage.jpg",
    emoji: "💿",
    category: "storage",
    brand: "Samsung"
  },
  {
    id: "12",
    name: "WD Blue 1TB SATA SSD",
    price: 7800,
    image: "/storage.jpg",
    emoji: "💿",
    category: "storage",
    brand: "Western Digital"
  },
  {
    id: "13",
    name: "NVIDIA GTX 1650 4GB Graphics Card",
    price: 17500,
    image: "/gpu.jpg",
    emoji: "🎮",
    category: "gpu",
    brand: "NVIDIA"
  },
  {
    id: "14",
    name: "AMD Radeon RX 6600 8GB Graphics Card",
    price: 25000,
    image: "/gpu.jpg",
    emoji: "🎮",
    category: "gpu",
    brand: "AMD"
  },
  {
    id: "15",
    name: "Corsair RM650 80+ Gold Power Supply",
    price: 8900,
    image: "/psu.jpg",
    emoji: "🔌",
    category: "power-supply",
    brand: "Corsair"
  },
  {
    id: "16",
    name: "NZXT H510 Mid Tower Case",
    price: 7800,
    image: "/case.jpg",
    emoji: "🖥️",
    category: "case",
    brand: "NZXT"
  },
  {
    id: "17",
    name: "Cooler Master Hyper 212 CPU Cooler",
    price: 3600,
    image: "/cooler.jpg",
    emoji: "❄️",
    category: "cooler",
    brand: "Cooler Master"
  }
];

// PC Builder component categories
const componentCategories: ComponentCategory[] = [
  { id: "cpu", name: "CPU", slug: "cpu", icon: "⚡", required: true },
  { id: "motherboard", name: "Motherboard", slug: "motherboard", icon: "🔄", required: true },
  { id: "ram", name: "RAM/Memory", slug: "ram", icon: "💾", required: true },
  { id: "storage", name: "Storage", slug: "storage", icon: "💿", required: true },
  { id: "gpu", name: "Graphics Card", slug: "gpu", icon: "🎮", required: false },
  { id: "power-supply", name: "Power Supply", slug: "power-supply", icon: "🔌", required: true },
  { id: "case", name: "Case", slug: "case", icon: "🖥️", required: true },
  { id: "cooler", name: "CPU Cooler", slug: "cooler", icon: "❄️", required: false }
];

// Peripherals & Others categories
const peripheralCategories: ComponentCategory[] = [
  { id: "monitor", name: "Monitor", slug: "monitor", icon: "🖥️", required: false },
  { id: "keyboard", name: "Keyboard", slug: "keyboard", icon: "⌨️", required: false },
  { id: "mouse", name: "Mouse", slug: "mouse", icon: "🖱️", required: false },
  { id: "headset", name: "Headphones", slug: "headset", icon: "🎧", required: false },
  { id: "ups", name: "UPS", slug: "ups", icon: "🔋", required: false }
];

export default function PCBuilderPage() {
  // Get cart functionality from CartContext
  const { addToCart } = useCart();
  
  // State for tracking selected components
  const [selectedComponents, setSelectedComponents] = useState<Record<string, PCComponent | null>>({});
  
  // State for the component selection modal
  const [modalOpen, setModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<ComponentCategory | null>(null);
  
  // Calculate total price
  const totalPrice = Object.values(selectedComponents)
    .filter(Boolean)
    .reduce((sum, component) => sum + (component?.price || 0), 0);

  // Handle component selection
  const handleSelectComponent = (component: PCComponent) => {
    if (!activeCategory) return;
    
    setSelectedComponents({
      ...selectedComponents,
      [activeCategory.id]: component
    });
    
    setModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Open component selection modal
  const openComponentSelection = (category: ComponentCategory) => {
    setActiveCategory(category);
    setModalOpen(true);
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
  };
  
  // Close modal and restore body scrolling
  const closeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = 'auto';
  };

  // Get products for the active category
  const getProductsByCategory = (categoryId: string): PCComponent[] => {
    return products.filter(product => product.category === categoryId);
  };
  
  // Check if the build is ready (all required components are selected)
  const isBuildReady = componentCategories
    .filter(cat => cat.required)
    .every(cat => selectedComponents[cat.id]);
  
  // Format price as currency
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'BDT',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Clean up effect to restore body scrolling
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  // Save PC configuration to local storage
  const handleSavePc = () => {
    const pcBuild = {
      components: selectedComponents,
      totalPrice: totalPrice,
      date: new Date().toISOString(),
    };
    
    // Save to local storage
    localStorage.setItem('saved-pc-build', JSON.stringify(pcBuild));
    alert('PC configuration saved successfully!');
  };

  // Add to cart functionality - Updated to use CartContext
  const handleAddToCart = () => {
    // Add all selected components to cart
    Object.values(selectedComponents).forEach(component => {
      if (component) {
        addToCart({
          id: component.id,
          name: component.name,
          price: component.price,
          image: component.image || '',
          emoji: component.emoji || '',
          category: component.category
        });
      }
    });
    
    // Add a custom PC build item that represents the full build
    addToCart({
      id: `pc-build-${Date.now()}`,
      name: `Custom PC Build (${Object.values(selectedComponents).filter(Boolean).length} components)`,
      price: 0, // Price is 0 since we're already adding each component individually
      image: '',
      emoji: '🖥️',
      category: 'pc-build'
    });
  };

  // Print PC configuration
  const handlePrint = () => {
    window.print();
  };

  // Screenshot functionality
  const handleScreenshot = () => {
    // Alert user about how to take a screenshot since we can't do it programmatically
    alert('To take a screenshot:\n\nOn Windows: Press Windows+Shift+S\nOn Mac: Press Command+Shift+4\nOn Linux: Press PrintScreen');
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
            <span className="text-neutral-600">PC Builder</span>
          </div>
        </div>
      </div>
      
      {/* Page Header */}
      <div className="bg-white py-6 border-b border-neutral-200">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-blue-900">PC Builder - Build Your Own Computer</h1>
              <div className="flex items-center mt-2">
                <input 
                  type="checkbox" 
                  id="hide-incompatible" 
                  className="mr-2" 
                />
                <label htmlFor="hide-incompatible" className="text-sm text-neutral-600">
                  Hide Incompatible Components
                </label>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-lg font-medium">Total: {formatPrice(totalPrice)}</p>
              </div>
              
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-blue-700 text-blue-700"
                  onClick={handleSavePc}
                >
                  Save PC
                </Button>
                <Button 
                  className="bg-blue-700 text-white"
                  disabled={!isBuildReady}
                  size="sm"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </Button>
                <Button 
                  variant="outline"
                  size="sm" 
                  className="border-blue-700 text-blue-700"
                  onClick={handlePrint}
                >
                  Print
                </Button>
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-blue-700 text-blue-700"
                  onClick={handleScreenshot}
                >
                  Screenshot
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Core Components Section */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-4 bg-neutral-100 p-3 text-neutral-800">Core Components</h2>
          
          <div className="space-y-4">
            {componentCategories.map((category) => (
              <div 
                key={category.id}
                className="flex items-center justify-between border border-neutral-200 rounded-lg p-4 bg-white hover:border-neutral-300 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-2xl">{category.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-medium">{category.name}</h3>
                    {category.required && !selectedComponents[category.id] && (
                      <span className="inline-block px-2 py-0.5 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                        Required
                      </span>
                    )}
                    {selectedComponents[category.id] && (
                      <div className="mt-1">
                        <p className="text-sm text-neutral-600">{selectedComponents[category.id]?.name}</p>
                        <p className="text-sm font-medium text-blue-700">{formatPrice(selectedComponents[category.id]?.price || 0)}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <Button 
                  variant={selectedComponents[category.id] ? "outline" : "default"}
                  className={selectedComponents[category.id] 
                    ? "border-blue-600 text-blue-600" 
                    : "bg-blue-600 text-white"
                  }
                  onClick={() => openComponentSelection(category)}
                >
                  {selectedComponents[category.id] ? "Change" : "Choose"}
                </Button>
              </div>
            ))}
          </div>
        </div>
        
        {/* Peripherals & Others Section */}
        <div>
          <h2 className="text-xl font-bold mb-4 bg-neutral-100 p-3 text-neutral-800">Peripherals & Others</h2>
          
          <div className="space-y-4">
            {peripheralCategories.map((category) => (
              <div 
                key={category.id}
                className="flex items-center justify-between border border-neutral-200 rounded-lg p-4 bg-white hover:border-neutral-300 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-3 rounded-lg">
                    <span className="text-2xl">{category.icon}</span>
                  </div>
                  <div>
                    <h3 className="font-medium">{category.name}</h3>
                    {selectedComponents[category.id] && (
                      <div className="mt-1">
                        <p className="text-sm text-neutral-600">{selectedComponents[category.id]?.name}</p>
                        <p className="text-sm font-medium text-blue-700">{formatPrice(selectedComponents[category.id]?.price || 0)}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <Button 
                  variant={selectedComponents[category.id] ? "outline" : "default"}
                  className={selectedComponents[category.id] 
                    ? "border-blue-600 text-blue-600" 
                    : "bg-blue-600 text-white"
                  }
                  onClick={() => openComponentSelection(category)}
                >
                  {selectedComponents[category.id] ? "Change" : "Choose"}
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Component Selection Modal */}
      {activeCategory && (
        <PCComponentSelector
          isOpen={modalOpen}
          onClose={closeModal}
          onSelect={handleSelectComponent}
          category={activeCategory}
          products={activeCategory ? getProductsByCategory(activeCategory.id) : []}
        />
      )}
      
      {/* Footer */}
      <footer className="mt-auto bg-blue-900 text-neutral-200 py-12">
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