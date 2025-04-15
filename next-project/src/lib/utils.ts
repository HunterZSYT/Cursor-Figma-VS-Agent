import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Product interface
export interface Product {
  id: string | number;
  name: string;
  description?: string;
  price: number;
  image: string;
  emoji: string;
  category: string;
  brand: string;
  subcategory?: string;
  compatibility?: string[];
}

// Centralized product data
export const productData: Product[] = [
  // Core Components
  {
    id: "1",
    name: "AMD Athlon PRO 300GE AM4 Socket Desktop Processor with Radeon Vega 3 Graphics",
    description: "Entry-level CPU with integrated graphics for basic computing",
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
    description: "Dual-core processor for basic computing tasks",
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
    description: "6-core, 12-thread processor with excellent gaming performance",
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
    description: "6-core processor with integrated Radeon graphics",
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
    description: "4-core, 8-thread processor for budget gaming builds",
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
    description: "Modern budget CPU for office and light computing",
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
    description: "Micro-ATX motherboard with solid features for AMD builds",
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
    description: "Feature-rich B550 motherboard with WiFi 6 connectivity",
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
    description: "Reliable DDR4 memory for desktop computers",
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
    description: "High-performance RGB memory for gaming PCs",
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
    description: "High-speed NVMe SSD with excellent reliability",
    price: 6500,
    image: "/storage.jpg",
    emoji: "💿",
    category: "storage",
    brand: "Samsung"
  },
  {
    id: "12",
    name: "WD Blue 1TB SATA SSD",
    description: "Reliable and fast storage for everyday computing",
    price: 7800,
    image: "/storage.jpg",
    emoji: "💿",
    category: "storage",
    brand: "Western Digital"
  },
  {
    id: "13",
    name: "NVIDIA GTX 1650 4GB Graphics Card",
    description: "Entry-level GPU for 1080p gaming and content creation",
    price: 17500,
    image: "/gpu.jpg",
    emoji: "🎮",
    category: "gpu",
    brand: "NVIDIA"
  },
  {
    id: "14",
    name: "AMD Radeon RX 6600 8GB Graphics Card",
    description: "Mid-range GPU with excellent 1080p gaming performance",
    price: 25000,
    image: "/gpu.jpg",
    emoji: "🎮",
    category: "gpu",
    brand: "AMD"
  },
  {
    id: "15",
    name: "Corsair RM650 80+ Gold Power Supply",
    description: "Reliable modular power supply with Gold efficiency",
    price: 8900,
    image: "/psu.jpg",
    emoji: "🔌",
    category: "power-supply",
    brand: "Corsair"
  },
  {
    id: "16",
    name: "NZXT H510 Mid Tower Case",
    description: "Sleek and modern PC case with excellent cable management",
    price: 7800,
    image: "/case.jpg",
    emoji: "🖥️",
    category: "case",
    brand: "NZXT"
  },
  {
    id: "17",
    name: "Cooler Master Hyper 212 CPU Cooler",
    description: "Popular air cooler with excellent cooling performance",
    price: 3600,
    image: "/cooler.jpg",
    emoji: "❄️",
    category: "cooler",
    brand: "Cooler Master"
  },
  
  // Peripherals
  {
    id: "18",
    name: "ASUS ROG Gaming Monitor 27\" 165Hz",
    description: "QHD IPS panel with 1ms response time",
    price: 34999,
    image: "/monitor.jpg",
    emoji: "🖥️",
    category: "peripherals",
    subcategory: "monitor",
    brand: "ASUS"
  },
  {
    id: "19",
    name: "Samsung Odyssey G5 32-inch 1440p 144Hz Gaming Monitor",
    description: "Curved gaming monitor with excellent immersion",
    price: 32500,
    image: "/monitor.jpg",
    emoji: "🖥️",
    category: "peripherals",
    subcategory: "monitor",
    brand: "Samsung"
  },
  {
    id: "20",
    name: "LG UltraGear 24-inch 1080p 144Hz Gaming Monitor",
    description: "Fast refresh rate monitor for competitive gaming",
    price: 21500,
    image: "/monitor.jpg",
    emoji: "🖥️",
    category: "peripherals",
    subcategory: "monitor",
    brand: "LG"
  },
  {
    id: "21",
    name: "Logitech G Pro X Mechanical Gaming Keyboard",
    description: "Pro-grade mechanical keyboard with hot-swappable switches",
    price: 12500,
    image: "/keyboard.jpg",
    emoji: "⌨️",
    category: "peripherals",
    subcategory: "keyboard",
    brand: "Logitech"
  },
  {
    id: "22",
    name: "Razer Huntsman V2 Mechanical Keyboard",
    description: "Optical switches with 8000Hz polling rate for competitive gaming",
    price: 18999,
    image: "/keyboard.jpg",
    emoji: "⌨️",
    category: "peripherals",
    subcategory: "keyboard",
    brand: "Razer"
  },
  {
    id: "23",
    name: "Corsair K70 RGB MK.2 Mechanical Gaming Keyboard",
    description: "Durable Cherry MX switches with per-key RGB lighting",
    price: 13800,
    image: "/keyboard.jpg",
    emoji: "⌨️",
    category: "peripherals",
    subcategory: "keyboard",
    brand: "Corsair"
  },
  {
    id: "24",
    name: "Logitech G502 Hero Gaming Mouse",
    description: "High-performance gaming mouse with HERO 25K sensor",
    price: 3800,
    image: "/mouse.jpg",
    emoji: "🖱️",
    category: "peripherals",
    subcategory: "mouse",
    brand: "Logitech"
  },
  {
    id: "25",
    name: "Logitech G Pro X Superlight Wireless Mouse",
    description: "Ultra-lightweight wireless gaming mouse with flawless tracking",
    price: 14999,
    image: "/mouse.jpg",
    emoji: "🖱️",
    category: "peripherals",
    subcategory: "mouse",
    brand: "Logitech"
  },
  {
    id: "26",
    name: "Razer DeathAdder V2 Gaming Mouse",
    description: "Ergonomic gaming mouse with optical switches",
    price: 4200,
    image: "/mouse.jpg",
    emoji: "🖱️",
    category: "peripherals",
    subcategory: "mouse",
    brand: "Razer"
  },
  {
    id: "27",
    name: "SteelSeries Rival 3 Gaming Mouse",
    description: "Budget-friendly gaming mouse with RGB lighting",
    price: 2900,
    image: "/mouse.jpg",
    emoji: "🖱️",
    category: "peripherals",
    subcategory: "mouse",
    brand: "SteelSeries"
  },
  {
    id: "28",
    name: "Logitech G Pro X Wireless Gaming Headset",
    description: "Premium wireless gaming headset with Blue VO!CE microphone technology",
    price: 15500,
    image: "/headset.jpg",
    emoji: "🎧",
    category: "peripherals",
    subcategory: "headset",
    brand: "Logitech"
  },
  {
    id: "29",
    name: "HyperX Cloud II Gaming Headset",
    description: "Comfortable gaming headset with virtual 7.1 surround sound",
    price: 7900,
    image: "/headset.jpg",
    emoji: "🎧",
    category: "peripherals",
    subcategory: "headset",
    brand: "HyperX"
  },
  {
    id: "30",
    name: "SteelSeries Arctis 7 Wireless Gaming Headset",
    description: "Award-winning wireless gaming audio with long battery life",
    price: 14800,
    image: "/headset.jpg",
    emoji: "🎧",
    category: "peripherals",
    subcategory: "headset",
    brand: "SteelSeries"
  },
  {
    id: "31",
    name: "APC Back-UPS 650VA UPS Battery Backup",
    description: "Essential battery backup for power protection",
    price: 6500,
    image: "/ups.jpg",
    emoji: "🔋",
    category: "peripherals",
    subcategory: "ups",
    brand: "APC"
  },
  {
    id: "32",
    name: "Microtek UPS SEBz 1100VA Pure Sine Wave Inverter",
    description: "Pure sine wave UPS for sensitive electronics",
    price: 9800,
    image: "/ups.jpg",
    emoji: "🔋",
    category: "peripherals",
    subcategory: "ups",
    brand: "Microtek"
  },
  {
    id: "33",
    name: "CyberPower CP1500EPFCLCD PFC Sinewave UPS System",
    description: "Advanced UPS with LCD display and management software",
    price: 14500,
    image: "/ups.jpg",
    emoji: "🔋",
    category: "peripherals",
    subcategory: "ups",
    brand: "CyberPower"
  },
  // Additional products that were in the products page
  {
    id: "34",
    name: "AMD Ryzen 9 7950X3D Processor",
    description: "16-core, 32-thread with 3D V-Cache for ultimate gaming performance",
    price: 64999,
    image: "/cpu.jpg",
    emoji: "⚡",
    category: "processors",
    brand: "AMD",
    compatibility: ["am5"]
  },
  {
    id: "35",
    name: "EVGA SuperNOVA 1000 G6 Power Supply",
    description: "1000W fully modular PSU with 80 PLUS Gold certification",
    price: 17999,
    image: "/psu.jpg",
    emoji: "🔌",
    category: "power-supplies",
    brand: "EVGA"
  },
  {
    id: "36",
    name: "MSI Katana 15 Gaming Laptop",
    description: "Intel Core i7, RTX 4060, 16GB RAM, 1TB SSD, 15.6\" 144Hz display",
    price: 129999,
    image: "/laptop.jpg",
    emoji: "💻",
    category: "laptops",
    brand: "MSI"
  }
];

// Helper function to get filtered products by category
export const getProductsByCategory = (category: string) => {
  if (category === 'all') {
    return productData;
  }
  
  return productData.filter(product => product.category === category);
};

// Helper function to get filtered products by subcategory
export const getProductsBySubcategory = (subcategory: string) => {
  return productData.filter(product => 
    'subcategory' in product && product.subcategory === subcategory
  );
};

// Format price with BDT currency
export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'BDT',
    maximumFractionDigits: 0
  }).format(price);
};
