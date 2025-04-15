'use client';

import { Navbar } from '@/components/Navbar';
import { PCComponentSelector } from '@/components/PCComponentSelector';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useCart } from '@/lib/CartContext';
import { Product, getProductsByCategory, getProductsBySubcategory, formatPrice } from '@/lib/utils';

// Component categories for PC building
const componentCategories = [
  {
    id: "processors",
    name: "Processor",
    slug: "processor",
    icon: "⚡",
    required: true
  },
  {
    id: "motherboard",
    name: "Motherboard",
    slug: "motherboard",
    icon: "🔄",
    required: true
  },
  {
    id: "ram",
    name: "Memory",
    slug: "memory",
    icon: "💾",
    required: true
  },
  {
    id: "storage",
    name: "Storage",
    slug: "storage",
    icon: "💿",
    required: true
  },
  {
    id: "gpu",
    name: "Graphics Card",
    slug: "graphics-card",
    icon: "🎮",
    required: false
  },
  {
    id: "power-supply",
    name: "Power Supply",
    slug: "power-supply",
    icon: "🔌",
    required: true
  },
  {
    id: "case",
    name: "Case",
    slug: "case",
    icon: "🖥️",
    required: true
  },
  {
    id: "cooler",
    name: "CPU Cooler",
    slug: "cpu-cooler",
    icon: "❄️",
    required: true
  }
];

// Peripheral categories
const peripheralCategories = [
  {
    id: "monitor",
    name: "Monitor",
    slug: "monitor",
    icon: "🖥️",
    required: false
  },
  {
    id: "keyboard",
    name: "Keyboard",
    slug: "keyboard",
    icon: "⌨️",
    required: false
  },
  {
    id: "mouse",
    name: "Mouse",
    slug: "mouse",
    icon: "🖱️",
    required: false
  },
  {
    id: "headset",
    name: "Headset",
    slug: "headset",
    icon: "🎧",
    required: false
  },
  {
    id: "ups",
    name: "UPS",
    slug: "ups",
    icon: "🔋",
    required: false
  }
];

// All categories
const allCategories = [...componentCategories, ...peripheralCategories];

export default function PCBuilderPage() {
  const { addToCart, cartItems } = useCart();
  const [selectedComponents, setSelectedComponents] = useState<{ [key: string]: Product | null }>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<typeof componentCategories[0] | null>(null);
  
  // Calculate total price
  const totalPrice = Object.values(selectedComponents)
    .filter(comp => comp !== null)
    .reduce((sum, comp) => sum + (comp?.price || 0), 0);
  
  // Calculate number of selected core components
  const coreComponentsSelected = componentCategories
    .filter(cat => cat.required)
    .filter(cat => selectedComponents[cat.id] !== undefined && selectedComponents[cat.id] !== null)
    .length;
  
  // Total required core components
  const requiredCoreComponents = componentCategories.filter(cat => cat.required).length;
  
  // Open component selection modal
  const openComponentSelector = (category: typeof componentCategories[0]) => {
    setActiveCategory(category);
    setModalOpen(true);
  };
  
  // Close modal
  const closeModal = () => {
    setModalOpen(false);
    setActiveCategory(null);
  };
  
  // Handle component selection
  const handleSelectComponent = (component: Product) => {
    if (activeCategory) {
      setSelectedComponents(prev => ({
        ...prev,
        [activeCategory.id]: component
      }));
      closeModal();
    }
  };
  
  // Remove a component
  const removeComponent = (categoryId: string) => {
    setSelectedComponents(prev => ({
      ...prev,
      [categoryId]: null
    }));
  };
  
  // Add all selected components to cart
  const addAllToCart = () => {
    Object.values(selectedComponents)
      .filter(Boolean)
      .forEach(component => {
        if (component) {
          // Convert the component to match CartItem type by ensuring id is a string
          addToCart({
            ...component,
            id: component.id.toString() // Convert id to string to match CartItem type
          });
        }
      });
      
    // Redirect to cart page or show confirmation
    window.location.href = '/cart';
  };
  
  // Get products for the active category using our centralized data
  const getComponentsByCategory = (categoryId: string): Product[] => {
    // For core components, use the direct category matching
    if (componentCategories.some(cat => cat.id === categoryId)) {
      return getProductsByCategory(categoryId) as Product[];
    }
    
    // For peripherals, use the subcategory matching
    return getProductsBySubcategory(categoryId) as Product[];
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Header with progress */}
        <div className="bg-blue-900 text-white py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold mb-2">Build Your PC</h1>
            <p className="text-blue-200 mb-4">Select components to create your custom PC build</p>
            
            {/* Progress bar */}
            <div className="bg-blue-800 rounded-full h-4 mb-2">
              <div 
                className="bg-blue-500 h-4 rounded-full transition-all duration-300"
                style={{ width: `${(coreComponentsSelected / requiredCoreComponents) * 100}%` }}
              ></div>
            </div>
            <p className="text-sm text-blue-200">
              {coreComponentsSelected} of {requiredCoreComponents} required components selected
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          {/* Core Components Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-neutral-800">Core Components</h2>
            
            <div className="grid gap-4">
              {componentCategories.map((category) => (
                <div 
                  key={category.id}
                  className={`p-4 border rounded-lg flex items-center justify-between ${
                    selectedComponents[category.id] 
                      ? 'bg-blue-50 border-blue-200' 
                      : 'bg-white border-neutral-200'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-4">{category.icon}</span>
                    <div>
                      <h3 className="font-medium">{category.name}</h3>
                      {category.required && (
                        <span className="text-sm text-red-500">Required</span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    {selectedComponents[category.id] ? (
                      <>
                        <div className="mr-6 text-right">
                          <p className="font-medium">{selectedComponents[category.id]?.name}</p>
                          <p className="text-blue-600">{formatPrice(selectedComponents[category.id]?.price || 0)}</p>
                        </div>
                        <button 
                          onClick={() => removeComponent(category.id)}
                          className="text-red-500 hover:text-red-700 mr-2"
                          aria-label={`Remove ${category.name}`}
                        >
                          Remove
                        </button>
                        <Button 
                          onClick={() => openComponentSelector(category)}
                          variant="outline"
                        >
                          Change
                        </Button>
                      </>
                    ) : (
                      <Button 
                        onClick={() => openComponentSelector(category)}
                        variant={category.required ? "default" : "outline"}
                      >
                        Add {category.name}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Peripherals Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-neutral-800">Peripherals (Optional)</h2>
            
            <div className="grid gap-4">
              {peripheralCategories.map((category) => (
                <div 
                  key={category.id}
                  className={`p-4 border rounded-lg flex items-center justify-between ${
                    selectedComponents[category.id] 
                      ? 'bg-blue-50 border-blue-200' 
                      : 'bg-white border-neutral-200'
                  }`}
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-4">{category.icon}</span>
                    <div>
                      <h3 className="font-medium">{category.name}</h3>
                      <span className="text-sm text-neutral-500">Optional</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    {selectedComponents[category.id] ? (
                      <>
                        <div className="mr-6 text-right">
                          <p className="font-medium">{selectedComponents[category.id]?.name}</p>
                          <p className="text-blue-600">{formatPrice(selectedComponents[category.id]?.price || 0)}</p>
                        </div>
                        <button 
                          onClick={() => removeComponent(category.id)}
                          className="text-red-500 hover:text-red-700 mr-2"
                          aria-label={`Remove ${category.name}`}
                        >
                          Remove
                        </button>
                        <Button 
                          onClick={() => openComponentSelector(category)}
                          variant="outline"
                        >
                          Change
                        </Button>
                      </>
                    ) : (
                      <Button 
                        onClick={() => openComponentSelector(category)}
                        variant="outline"
                      >
                        Add {category.name}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="bg-neutral-50 border border-neutral-200 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-6">
              {Object.entries(selectedComponents)
                .filter(([_, component]) => component !== null)
                .map(([categoryId, component]) => {
                  const category = allCategories.find(cat => cat.id === categoryId);
                  return (
                    <div key={categoryId} className="flex justify-between">
                      <span className="text-neutral-600">
                        {category?.name}: {component?.name}
                      </span>
                      <span className="font-medium">{formatPrice(component?.price || 0)}</span>
                    </div>
                  );
                })}
                
              {Object.values(selectedComponents).filter(Boolean).length === 0 && (
                <p className="text-neutral-500 italic">No components selected yet</p>
              )}
            </div>
            
            <div className="border-t border-neutral-200 pt-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="font-bold">Total</span>
                <span className="font-bold text-xl text-blue-600">{formatPrice(totalPrice)}</span>
              </div>
            </div>
            
            <div className="flex flex-col space-y-3">
              <Button
                onClick={addAllToCart}
                disabled={coreComponentsSelected < requiredCoreComponents}
                className="w-full py-3"
              >
                {coreComponentsSelected < requiredCoreComponents
                  ? `Select All Required Components (${coreComponentsSelected}/${requiredCoreComponents})`
                  : 'Add All to Cart'}
              </Button>
              
              <Link href="/products" passHref>
                <Button variant="outline" className="w-full">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      {/* Component Selector Modal */}
      <PCComponentSelector
        isOpen={modalOpen}
        onClose={closeModal}
        onSelect={handleSelectComponent}
        category={activeCategory}
        products={activeCategory ? getComponentsByCategory(activeCategory.id) : []}
      />
    </div>
  );
}