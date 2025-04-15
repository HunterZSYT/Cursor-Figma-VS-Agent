'use client';

import { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/CartContext';

// Coupon interface
interface Coupon {
  code: string;
  discountPercent: number;
}

// Available coupons (in a real app, this would be stored in a database)
const availableCoupons: Coupon[] = [
  { code: 'WELCOME10', discountPercent: 10 },
  { code: 'SUMMER25', discountPercent: 25 },
  { code: 'NEWCUSTOMER15', discountPercent: 15 },
];

// Shipping options
const shippingOptions = [
  { id: 'free', label: 'Standard Shipping (Free, 3-5 days)', price: 0 },
  { id: 'express', label: 'Express Shipping (2 days)', price: 200 },
  { id: 'same-day', label: 'Same Day Delivery (Dhaka Only)', price: 300 }
];

// Payment methods
const paymentMethods = [
  { id: 'bkash', name: 'bKash', image: '/bkash.svg', description: 'Pay securely with bKash' },
  { id: 'cod', name: 'Cash on Delivery', image: '/cash.svg', description: 'Pay when your order arrives' },
];

export default function CartPage() {
  // Get cart state from CartContext instead of local state
  const { cartItems, updateQuantity, removeFromCart, clearCart, getCartTotal } = useCart();
  const [loading, setLoading] = useState(true);
  
  // Checkout states
  const [step, setStep] = useState(1);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [shippingMethod, setShippingMethod] = useState('free');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Form states for checkout
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Dhaka',
    postalCode: '',
    saveInfo: false,
  });
  
  // Simulate loading and check login status
  useEffect(() => {
    // Simulate login check
    const checkLogin = () => {
      const userLoggedIn = localStorage.getItem('user-logged-in') === 'true';
      setIsLoggedIn(userLoggedIn);
    };
    
    checkLogin();
    setLoading(false);
  }, []);
  
  // Apply coupon code
  const applyCoupon = () => {
    const coupon = availableCoupons.find(
      c => c.code.toLowerCase() === couponCode.toLowerCase()
    );
    
    if (coupon) {
      setAppliedCoupon(coupon);
      alert(`Coupon "${coupon.code}" applied! ${coupon.discountPercent}% discount`);
    } else {
      setAppliedCoupon(null);
      alert('Invalid coupon code.');
    }
  };
  
  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    
    setFormData(prev => ({
      ...prev,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value
    }));
  };
  
  // Move to next checkout step
  const nextStep = () => {
    // Basic validation for each step
    if (step === 1 && cartItems.length === 0) {
      alert('Your cart is empty! Add items before proceeding.');
      return;
    }
    
    if (step === 2) {
      // Validate contact and shipping information
      const { firstName, lastName, email, phone, address, city, postalCode } = formData;
      if (!firstName || !lastName || !email || !phone || !address || !city || !postalCode) {
        alert('Please fill in all required fields.');
        return;
      }
      
      // Validate email format
      if (!/\S+@\S+\.\S+/.test(email)) {
        alert('Please enter a valid email address.');
        return;
      }
      
      // Validate BD phone number (simple check)
      if (!/^01\d{9}$/.test(phone)) {
        alert('Please enter a valid Bangladesh phone number.');
        return;
      }
    }
    
    if (step === 3 && !paymentMethod) {
      alert('Please select a payment method.');
      return;
    }
    
    if (step < 4) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };
  
  // Go back to previous step
  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
      window.scrollTo(0, 0);
    }
  };
  
  // Place order
  const placeOrder = () => {
    // In a real app, this would send the order to a backend
    alert('Thank you for your order! Your order has been placed successfully.');
    clearCart();
    setStep(4);  // Show order confirmation
  };
  
  // Calculate subtotal from CartContext
  const subtotal = getCartTotal();
  
  // Calculate discount amount if coupon is applied
  const discountAmount = appliedCoupon ? (subtotal * appliedCoupon.discountPercent / 100) : 0;
  
  // Get shipping cost
  const shippingCost = shippingOptions.find(option => option.id === shippingMethod)?.price || 0;
  
  // Calculate cart total
  const total = subtotal - discountAmount + shippingCost;
  
  // Format price with BDT currency
  const formatPrice = (price: number) => {
    return `BDT ${price.toLocaleString()}`;
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
            <span className="text-neutral-600">Shopping Cart</span>
          </div>
        </div>
      </div>
      
      {/* Page Header */}
      <div className="bg-white py-6 border-b border-neutral-200">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold text-blue-900">
            {step === 1 && 'Shopping Cart'}
            {step === 2 && 'Shipping Information'}
            {step === 3 && 'Payment Method'}
            {step === 4 && 'Order Confirmation'}
          </h1>
        </div>
      </div>
      
      {/* Checkout Progress */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="hidden sm:flex justify-between w-full max-w-3xl mx-auto">
            {['Cart', 'Shipping', 'Payment', 'Confirmation'].map((label, index) => (
              <div 
                key={label} 
                className="flex flex-col items-center"
              >
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    index + 1 === step ? 'bg-blue-600 text-white' : 
                    index + 1 < step ? 'bg-green-500 text-white' : 'bg-neutral-200 text-neutral-500'
                  }`}
                >
                  {index + 1 < step ? '✓' : index + 1}
                </div>
                <div className={`text-sm ${index + 1 === step ? 'font-semibold' : 'text-neutral-500'}`}>
                  {label}
                </div>
              </div>
            ))}
          </div>
          <div className="sm:hidden text-center text-sm text-neutral-500">
            Step {step} of 4
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content - Changes based on checkout step */}
          <div className="lg:w-2/3">
            {step === 1 && (
              <>
                {/* Shopping Cart Items */}
                {loading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700 mx-auto mb-4"></div>
                    <p className="text-neutral-600">Loading your cart...</p>
                  </div>
                ) : cartItems.length > 0 ? (
                  <div className="space-y-4">
                    {/* Cart Header - Desktop */}
                    <div className="hidden md:grid grid-cols-12 gap-4 py-3 font-medium text-neutral-600 bg-neutral-100 px-4 rounded-md">
                      <div className="col-span-6">Product</div>
                      <div className="col-span-2 text-center">Price</div>
                      <div className="col-span-2 text-center">Quantity</div>
                      <div className="col-span-2 text-center">Total</div>
                    </div>
                    
                    {/* Cart Items */}
                    {cartItems.map(item => (
                      <div 
                        key={item.id}
                        className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center border border-neutral-200 rounded-lg p-4 bg-white"
                      >
                        {/* Product Info */}
                        <div className="col-span-1 md:col-span-6">
                          <div className="flex gap-4 items-center">
                            <div className="w-16 h-16 bg-neutral-100 rounded flex items-center justify-center">
                              {item.image ? (
                                <Image 
                                  src={item.image} 
                                  alt={item.name} 
                                  width={50} 
                                  height={50} 
                                  style={{ objectFit: 'contain' }} 
                                />
                              ) : (
                                <span className="text-2xl">{item.emoji}</span>
                              )}
                            </div>
                            <div>
                              <h3 className="font-medium line-clamp-2">{item.name}</h3>
                              <button 
                                className="text-red-600 text-sm hover:underline mt-1"
                                onClick={() => removeFromCart(item.id)}
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        {/* Price */}
                        <div className="md:col-span-2 text-left md:text-center">
                          <div className="flex justify-between md:block">
                            <span className="md:hidden font-medium">Price:</span>
                            <span className="font-medium">{formatPrice(item.price)}</span>
                          </div>
                        </div>
                        
                        {/* Quantity */}
                        <div className="md:col-span-2 text-left md:text-center">
                          <div className="flex justify-between md:justify-center items-center">
                            <span className="md:hidden font-medium mr-2">Quantity:</span>
                            <div className="flex items-center border rounded-md">
                              <button 
                                className="px-3 py-1 border-r hover:bg-neutral-100"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                -
                              </button>
                              <span className="px-3 py-1">{item.quantity}</span>
                              <button 
                                className="px-3 py-1 border-l hover:bg-neutral-100"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                        
                        {/* Total */}
                        <div className="md:col-span-2 text-left md:text-center">
                          <div className="flex justify-between md:block">
                            <span className="md:hidden font-medium">Total:</span>
                            <span className="font-medium text-blue-700">{formatPrice(item.price * item.quantity)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {/* Clear Cart Button */}
                    <div className="mt-6 flex justify-end">
                      <Button 
                        variant="outline" 
                        className="border-red-600 text-red-600 hover:bg-red-50"
                        onClick={clearCart}
                      >
                        Clear Cart
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-12 bg-white rounded-lg border border-neutral-200">
                    <div className="text-4xl mb-4">🛒</div>
                    <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
                    <p className="text-neutral-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
                    <Link href="/products">
                      <Button className="bg-blue-600">Browse Products</Button>
                    </Link>
                  </div>
                )}
              </>
            )}
            
            {step === 2 && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">Contact & Shipping Information</h2>
                
                {/* Contact Information */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3 text-neutral-700">Contact Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-neutral-700 mb-1">
                        First Name *
                      </label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-neutral-700 mb-1">
                        Last Name *
                      </label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-neutral-700 mb-1">
                        Phone Number *
                      </label>
                      <Input
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="01XXXXXXXXX"
                        required
                      />
                    </div>
                  </div>
                </div>
                
                {/* Shipping Address */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3 text-neutral-700">Shipping Address</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label htmlFor="address" className="block text-sm font-medium text-neutral-700 mb-1">
                        Street Address *
                      </label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-neutral-700 mb-1">
                          City *
                        </label>
                        <select
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={(e) => setFormData({...formData, city: e.target.value})}
                          className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          required
                        >
                          <option value="Dhaka">Dhaka</option>
                          <option value="Chittagong">Chittagong</option>
                          <option value="Khulna">Khulna</option>
                          <option value="Rajshahi">Rajshahi</option>
                          <option value="Sylhet">Sylhet</option>
                          <option value="Barisal">Barisal</option>
                          <option value="Rangpur">Rangpur</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="postalCode" className="block text-sm font-medium text-neutral-700 mb-1">
                          Postal Code *
                        </label>
                        <Input
                          id="postalCode"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Shipping Method */}
                <div className="mb-6">
                  <h3 className="font-medium mb-3 text-neutral-700">Shipping Method</h3>
                  <div className="space-y-3">
                    {shippingOptions.map(option => (
                      <div 
                        key={option.id} 
                        className={`border rounded-md p-3 cursor-pointer ${
                          shippingMethod === option.id ? 'border-blue-600 bg-blue-50' : 'border-neutral-200'
                        }`}
                        onClick={() => setShippingMethod(option.id)}
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            id={`shipping-${option.id}`}
                            checked={shippingMethod === option.id}
                            onChange={() => setShippingMethod(option.id)}
                            className="mr-3"
                          />
                          <label htmlFor={`shipping-${option.id}`} className="flex-1 cursor-pointer">
                            <div className="font-medium">{option.label}</div>
                            <div className="text-neutral-600 text-sm">{option.price > 0 ? formatPrice(option.price) : 'Free'}</div>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Save Information */}
                <div className="mt-6">
                  <div className="flex items-center">
                    <input
                      id="saveInfo"
                      name="saveInfo"
                      type="checkbox"
                      checked={formData.saveInfo}
                      onChange={handleInputChange}
                      className="mr-2"
                    />
                    <label htmlFor="saveInfo" className="text-sm text-neutral-700">
                      Save this information for faster checkout next time
                    </label>
                  </div>
                </div>
              </Card>
            )}
            
            {step === 3 && (
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-6">Payment Method</h2>
                
                <div className="space-y-4">
                  {paymentMethods.map(method => (
                    <div 
                      key={method.id} 
                      className={`border rounded-md p-4 cursor-pointer ${
                        paymentMethod === method.id ? 'border-blue-600 bg-blue-50' : 'border-neutral-200'
                      }`}
                      onClick={() => setPaymentMethod(method.id)}
                    >
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id={`payment-${method.id}`}
                          checked={paymentMethod === method.id}
                          onChange={() => setPaymentMethod(method.id)}
                          className="mr-4"
                        />
                        <label htmlFor={`payment-${method.id}`} className="flex items-center flex-1 cursor-pointer">
                          <div className="w-12 h-12 bg-white rounded-md border border-neutral-200 p-2 mr-3 flex items-center justify-center">
                            {method.image ? (
                              <Image
                                src={method.image}
                                alt={method.name}
                                width={32}
                                height={32}
                              />
                            ) : (
                              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                                {method.id === 'bkash' ? 'B' : 'C'}
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-medium">{method.name}</div>
                            <div className="text-neutral-600 text-sm">{method.description}</div>
                          </div>
                        </label>
                      </div>
                      
                      {/* bKash payment details */}
                      {paymentMethod === 'bkash' && method.id === 'bkash' && (
                        <div className="mt-4 ml-8 pl-4 border-l-2 border-blue-500">
                          <p className="text-sm text-neutral-700 mb-3">
                            Please complete the payment at checkout. You'll receive instructions for payment via bKash.
                          </p>
                        </div>
                      )}
                      
                      {/* Cash on Delivery details */}
                      {paymentMethod === 'cod' && method.id === 'cod' && (
                        <div className="mt-4 ml-8 pl-4 border-l-2 border-blue-500">
                          <p className="text-sm text-neutral-700 mb-3">
                            You will pay for your order when it's delivered to your address.
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                {/* Order note */}
                <div className="mt-6">
                  <label htmlFor="note" className="block text-sm font-medium text-neutral-700 mb-1">
                    Order Notes (Optional)
                  </label>
                  <textarea
                    id="note"
                    rows={3}
                    className="w-full border border-neutral-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Special instructions for delivery"
                  ></textarea>
                </div>
              </Card>
            )}
            
            {step === 4 && (
              <Card className="p-6 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-green-600 text-2xl">✓</span>
                </div>
                <h2 className="text-2xl font-semibold mb-2">Thank You for Your Order!</h2>
                <p className="text-neutral-600 mb-6">Your order has been placed successfully.</p>
                
                <div className="bg-neutral-50 rounded-lg p-4 mb-6 text-left">
                  <div className="font-medium mb-2">Order Summary</div>
                  <div className="flex justify-between mb-1">
                    <span className="text-neutral-600">Order Number:</span>
                    <span>BD{Math.floor(Math.random() * 100000)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Date:</span>
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    className="bg-blue-600"
                    onClick={() => window.location.href = '/products'}
                  >
                    Continue Shopping
                  </Button>
                  <Button
                    variant="outline"
                    className="border-blue-600 text-blue-600"
                    onClick={() => window.print()}
                  >
                    Print Receipt
                  </Button>
                </div>
              </Card>
            )}
            
            {/* Navigation Buttons */}
            {step < 4 && (
              <div className="mt-8 flex justify-between">
                {step > 1 ? (
                  <Button 
                    variant="outline" 
                    className="border-neutral-300"
                    onClick={prevStep}
                  >
                    Back
                  </Button>
                ) : (
                  <div></div> // Empty div to maintain flex layout
                )}
                
                {step === 3 ? (
                  <Button 
                    className="bg-blue-600" 
                    onClick={placeOrder}
                    disabled={!paymentMethod}
                  >
                    Place Order
                  </Button>
                ) : (
                  <Button 
                    className="bg-blue-600" 
                    onClick={nextStep}
                    disabled={step === 1 && cartItems.length === 0}
                  >
                    {step === 1 ? 'Proceed to Checkout' : 'Continue'}
                  </Button>
                )}
              </div>
            )}
          </div>
          
          {/* Order Summary */}
          {step < 4 && (
            <div className="lg:w-1/3">
              <Card className="p-6 sticky top-20">
                <h2 className="text-xl font-semibold border-b pb-3 mb-3">Order Summary</h2>
                
                {/* Order items - collapsed view */}
                <div className="space-y-3 mb-4">
                  {cartItems.length > 0 ? (
                    <>
                      <div className="max-h-60 overflow-auto">
                        {cartItems.map(item => (
                          <div key={item.id} className="flex justify-between items-start py-2">
                            <div className="flex items-start">
                              <div className="text-neutral-500 mr-2 leading-none">{item.quantity} <span className="leading-none">×</span></div>
                              <div className="pr-6">
                                <div className="font-medium line-clamp-1">{item.name}</div>
                              </div>
                            </div>
                            <div className="whitespace-nowrap">{formatPrice(item.price * item.quantity)}</div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Show more items link if needed */}
                      {cartItems.length > 3 && (
                        <button 
                          className="text-sm text-blue-600 hover:underline"
                          onClick={() => setStep(1)}
                        >
                          View all items
                        </button>
                      )}
                    </>
                  ) : (
                    <div className="text-center text-neutral-500 py-3">No items in cart</div>
                  )}
                </div>
                
                {/* Coupon Code */}
                <div className="border-t border-b py-4 my-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                    />
                    <Button 
                      variant="outline" 
                      className="border-blue-600 text-blue-600 whitespace-nowrap"
                      onClick={applyCoupon}
                    >
                      Apply
                    </Button>
                  </div>
                  {appliedCoupon && (
                    <div className="mt-2 text-sm text-green-600 flex items-center">
                      <span className="mr-1">✓</span>
                      <span>{appliedCoupon.code} ({appliedCoupon.discountPercent}% off) applied!</span>
                      <button 
                        className="ml-auto text-neutral-500 hover:text-red-600" 
                        onClick={() => setAppliedCoupon(null)}
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
                
                {/* Price summary */}
                <div className="space-y-2 text-sm mb-4">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Subtotal:</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount:</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Shipping:</span>
                    <span>{shippingCost === 0 ? 'Free' : formatPrice(shippingCost)}</span>
                  </div>
                </div>
                
                {/* Total */}
                <div className="flex justify-between font-bold text-lg border-t pt-3">
                  <span>Total:</span>
                  <span>{formatPrice(total)}</span>
                </div>
                
                {!isLoggedIn && step === 1 && (
                  <div className="mt-6 text-center">
                    <p className="text-sm text-neutral-600 mb-3">Already have an account?</p>
                    <Button 
                      variant="outline"
                      className="border-blue-600 text-blue-600 w-full"
                      onClick={() => alert('Login functionality would be here')}
                    >
                      Sign in for a faster checkout
                    </Button>
                  </div>
                )}
                
                {/* Secure checkout notice */}
                <div className="mt-6 flex items-center justify-center text-xs text-neutral-500">
                  <span className="mr-1">🔒</span>
                  Secure checkout
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
      
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
                <li><a href="/products" className="hover:text-white transition-colors">All Products</a></li>
                <li><a href="#" className="hover:text-white transition-colors">New Arrivals</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Best Sellers</a></li>
                <li><a href="/pc-builder" className="hover:text-white transition-colors">PC Builder</a></li>
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