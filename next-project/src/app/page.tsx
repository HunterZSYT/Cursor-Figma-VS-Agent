import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { ProductCard } from "@/components/ProductCard";

// Mock data for featured products
const featuredProducts = [
  {
    id: 1,
    name: "NVIDIA RTX 4070 Graphics Card",
    description: "Next-gen ray tracing performance for gamers and creators",
    price: 59999,
    image: "/gpu.jpg",
    emoji: "🎮"
  },
  {
    id: 2,
    name: "Intel Core i9-13900K Processor",
    description: "Unlocked 24-core, 32-thread for extreme performance",
    price: 54999,
    image: "/cpu.jpg",
    emoji: "⚡"
  },
  {
    id: 3,
    name: "ASUS ROG Gaming Monitor 27\" 165Hz",
    description: "QHD IPS panel with 1ms response time",
    price: 34999,
    image: "/monitor.jpg",
    emoji: "🖥️"
  },
  {
    id: 4,
    name: "Corsair Vengeance 32GB DDR5 RAM",
    description: "High-performance memory for gaming and productivity",
    price: 18999,
    image: "/ram.jpg",
    emoji: "💾"
  },
];

// PC Categories (dynamic - could be fetched from backend/admin dashboard)
const categories = [
  { id: 1, name: "CPUs & Processors", icon: "⚡", slug: "processors" },
  { id: 2, name: "Graphics Cards", icon: "🎮", slug: "graphics-cards" },
  { id: 3, name: "Motherboards", icon: "🔄", slug: "motherboards" },
  { id: 4, name: "Memory (RAM)", icon: "💾", slug: "memory" },
  { id: 5, name: "Storage", icon: "💿", slug: "storage" },
  { id: 6, name: "Power Supplies", icon: "🔌", slug: "power-supplies" },
  { id: 7, name: "PC Cases", icon: "🖥️", slug: "cases" },
  { id: 8, name: "Cooling", icon: "❄️", slug: "cooling" },
  { id: 9, name: "Peripherals", icon: "🖱️", slug: "peripherals" },
  { id: 10, name: "Laptops", icon: "💻", slug: "laptops" },
  { id: 11, name: "Networking", icon: "📡", slug: "networking" },
  { id: 12, name: "Accessories", icon: "🔧", slug: "accessories" },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Build Your Dream PC</h1>
          <p className="text-xl mb-8 max-w-2xl">Bangladesh's premier computer hardware store with the latest components and expert build services. Free delivery within Dhaka.</p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/products">
              <Button size="lg" className="bg-white text-blue-800 hover:bg-neutral-100 hover:text-blue-900 transition-colors font-medium">
                Shop Products
              </Button>
            </Link>
            <Link href="/pc-builder">
              <Button size="lg" variant="outline" className="border-white text-white bg-blue-700/70 hover:bg-white hover:text-blue-800 transition-colors font-medium">
                Custom PC Builder
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-neutral-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id.toString()} 
                title={product.name}
                price={product.price}
                image={product.image}
                category="featured"
                buttonText="View Details"
                emoji={product.emoji}
              />
            ))}
          </div>
          <div className="text-center mt-10">
            <Link href="/products">
              <Button variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors px-8">
                View All Products
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4 text-center">Shop by Category</h2>
          <p className="text-center mb-10 text-neutral-600 max-w-2xl mx-auto">Find exactly what you need from our extensive range of computer hardware, components, and accessories</p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link href={`/category/${category.slug}`} key={category.id} className="block">
                <Card className="text-center hover:shadow-md transition-shadow h-full border-neutral-200 hover:border-blue-200">
                  <CardContent className="pt-6">
                    <span className="text-4xl block mb-4">{category.icon}</span>
                    <h3 className="font-medium text-blue-800">{category.name}</h3>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Custom PC Building Service */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-4 text-blue-900">Custom PC Building Service</h2>
              <p className="mb-6 text-neutral-700">Not sure how to build your own PC? Let our experts help you create the perfect system tailored to your needs and budget.</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span> 
                  Expert component selection for your specific use case
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span> 
                  Professional assembly and cable management
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span> 
                  Thorough testing and quality assurance
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span> 
                  Extended warranty options available
                </li>
              </ul>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-colors">Design Your Custom PC</Button>
            </div>
            <div className="lg:w-1/2 flex justify-center">
              <div className="h-80 w-80 bg-white rounded-lg shadow-lg flex items-center justify-center">
                <span className="text-8xl">💻</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-10 text-center">Why Shop With PC Park</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-block p-4 rounded-full bg-white text-blue-900 mb-4">
                <span className="text-3xl">🚚</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Fast Delivery</h3>
              <p>Same-day delivery in Dhaka and express shipping nationwide for all computer hardware.</p>
            </div>
            <div className="text-center">
              <div className="inline-block p-4 rounded-full bg-white text-blue-900 mb-4">
                <span className="text-3xl">💯</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Genuine Products</h3>
              <p>All components are 100% authentic with manufacturer warranty and local support.</p>
            </div>
            <div className="text-center">
              <div className="inline-block p-4 rounded-full bg-white text-blue-900 mb-4">
                <span className="text-3xl">🛠️</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Technical Support</h3>
              <p>Free lifetime technical support and troubleshooting for all your hardware purchases.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-12 bg-neutral-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center">Trusted Brands We Carry</h2>
          <div className="flex flex-wrap justify-center gap-8 items-center">
            <div className="w-24 h-16 bg-white rounded-md flex items-center justify-center shadow-sm text-2xl font-bold text-neutral-400">ASUS</div>
            <div className="w-24 h-16 bg-white rounded-md flex items-center justify-center shadow-sm text-2xl font-bold text-neutral-400">MSI</div>
            <div className="w-24 h-16 bg-white rounded-md flex items-center justify-center shadow-sm text-2xl font-bold text-neutral-400">INTEL</div>
            <div className="w-24 h-16 bg-white rounded-md flex items-center justify-center shadow-sm text-2xl font-bold text-neutral-400">AMD</div>
            <div className="w-24 h-16 bg-white rounded-md flex items-center justify-center shadow-sm text-2xl font-bold text-neutral-400">NVIDIA</div>
            <div className="w-24 h-16 bg-white rounded-md flex items-center justify-center shadow-sm text-2xl font-bold text-neutral-400">CORSAIR</div>
          </div>
        </div>
      </section>

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
