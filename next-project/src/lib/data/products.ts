import { Product } from "../types";
import { applyDiscounts } from "./discounts";

// Raw product data without discounts applied
const rawProductData: Product[] = [
  {
    id: "1",
    name: "AMD Ryzen 9 7950X",
    category: "cpu",
    subcategory: "desktop",
    price: 699,
    stock: 15,
    specs: [
      "16 cores",
      "32 threads",
      "4.5 GHz base clock",
      "5.7 GHz boost clock",
      "80MB cache",
      "170W TDP"
    ],
    image: "https://example.com/ryzen9-7950x.jpg",
    brand: "AMD",
    description: "The AMD Ryzen 9 7950X is a high-performance desktop processor with 16 cores and 32 threads."
  },
  {
    id: "2",
    name: "Intel Core i9-13900K",
    category: "cpu",
    subcategory: "desktop",
    price: 589,
    stock: 10,
    specs: [
      "24 cores (8P+16E)",
      "32 threads",
      "3.0 GHz base clock",
      "5.8 GHz boost clock",
      "68MB cache",
      "125W TDP"
    ],
    image: "https://example.com/i9-13900k.jpg",
    brand: "Intel",
    description: "The Intel Core i9-13900K is a high-end desktop processor with a hybrid architecture featuring 8 performance cores and 16 efficiency cores."
  },
  {
    id: "3",
    name: "NVIDIA GeForce RTX 4090",
    category: "gpu",
    subcategory: "gaming",
    price: 1599,
    stock: 5,
    specs: [
      "24GB GDDR6X memory",
      "2.52 GHz boost clock",
      "16384 CUDA cores",
      "128 RT cores",
      "512 tensor cores",
      "450W TDP"
    ],
    image: "https://example.com/rtx-4090.jpg",
    brand: "NVIDIA",
    description: "The NVIDIA GeForce RTX 4090 is a flagship graphics card featuring next-generation ray tracing and AI capabilities."
  },
  {
    id: "4",
    name: "AMD Radeon RX 7900 XTX",
    category: "gpu",
    subcategory: "gaming",
    price: 999,
    stock: 8,
    rating: 4.7,
    specs: [
      "24GB GDDR6 memory",
      "2.5 GHz boost clock",
      "12288 stream processors",
      "96 ray accelerators",
      "355W TDP"
    ],
    image: "https://example.com/rx-7900xtx.jpg",
    brand: "AMD",
    description: "The AMD Radeon RX 7900 XTX is a high-performance graphics card built on AMD's RDNA 3 architecture."
  },
  {
    id: "5",
    name: "Samsung 990 PRO 2TB NVMe SSD",
    category: "storage",
    subcategory: "ssd",
    price: 199,
    stock: 25,
    rating: 4.8,
    specs: [
      "2TB capacity",
      "PCIe 4.0 x4 interface",
      "7450 MB/s read speed",
      "6900 MB/s write speed",
      "M.2 2280 form factor"
    ],
    image: "https://example.com/samsung-990pro.jpg",
    brand: "Samsung",
    description: "The Samsung 990 PRO is a high-performance NVMe SSD designed for gaming and professional workflows."
  },
  {
    id: "6",
    name: "Corsair Vengeance RGB 32GB DDR5-6000",
    category: "ram",
    subcategory: "ddr5",
    price: 189,
    stock: 20,
    rating: 4.7,
    specs: [
      "32GB (2x16GB) capacity",
      "6000MHz speed",
      "CL36 timing",
      "1.35V voltage"
    ],
    image: "https://example.com/corsair-vengeance-ddr5.jpg",
    brand: "Corsair",
    description: "Corsair Vengeance RGB DDR5 memory delivers the higher frequencies and greater capacities of DDR5 technology."
  },
  {
    id: "7",
    name: "ASUS ROG Strix Z790-E Gaming WiFi",
    category: "motherboard",
    subcategory: "intel",
    price: 499,
    stock: 12,
    rating: 4.8,
    specs: [
      "LGA 1700 socket",
      "Z790 chipset",
      "4 DDR5 memory slots",
      "128GB max memory",
      "4 PCI slots",
      "5 M.2 slots"
    ],
    image: "https://example.com/asus-z790e.jpg",
    brand: "ASUS",
    description: "The ASUS ROG Strix Z790-E Gaming WiFi motherboard is designed for 12th and 13th Gen Intel Core processors."
  },
  {
    id: "8",
    name: "MSI MAG X670E Tomahawk WiFi",
    category: "motherboard",
    subcategory: "amd",
    price: 349,
    stock: 15,
    rating: 4.7,
    specs: [
      "AM5 socket",
      "X670E chipset",
      "4 DDR5 memory slots",
      "128GB max memory",
      "3 PCI slots",
      "4 M.2 slots"
    ],
    image: "https://example.com/msi-x670e.jpg",
    brand: "MSI",
    description: "The MSI MAG X670E Tomahawk WiFi motherboard offers excellent performance for AMD Ryzen 7000 series processors."
  },
  {
    id: "9",
    name: "NZXT H7 Flow",
    category: "case",
    subcategory: "atx",
    price: 129,
    stock: 18,
    rating: 4.6,
    specs: [
      "Mid Tower type",
      "Mini-ITX, Micro-ATX, ATX, E-ATX support",
      "230mm x 505mm x 480mm dimensions",
      "400mm GPU clearance",
      "185mm cooler clearance",
      "Up to 7 fans"
    ],
    image: "https://example.com/nzxt-h7-flow.jpg",
    brand: "NZXT",
    description: "The NZXT H7 Flow is a high-airflow mid-tower case designed for optimal cooling performance."
  },
  {
    id: "10",
    name: "Corsair RM850x",
    category: "power",
    subcategory: "psu",
    price: 149,
    stock: 22,
    rating: 4.9,
    specs: [
      "850W wattage",
      "80+ Gold efficiency",
      "Fully Modular",
      "10 Years warranty"
    ],
    image: "https://example.com/corsair-rm850x.jpg",
    brand: "Corsair",
    description: "The Corsair RM850x power supply offers reliable, efficient power delivery with fully modular cabling."
  },
  {
    id: "11",
    name: "NZXT Kraken X73 RGB",
    category: "cooling",
    subcategory: "liquid",
    price: 199,
    stock: 14,
    rating: 4.7,
    specs: [
      "AIO Liquid Cooler type",
      "360mm radiator size",
      "3x 120mm fans",
      "Intel LGA 1700/1200/115X, AMD AM5/AM4 socket support"
    ],
    image: "https://example.com/nzxt-kraken-x73.jpg",
    brand: "NZXT",
    description: "The NZXT Kraken X73 RGB is a 360mm all-in-one liquid cooler with customizable RGB lighting."
  },
  {
    id: "12",
    name: "Noctua NH-D15",
    category: "cooling",
    subcategory: "air",
    price: 99,
    stock: 30,
    rating: 4.9,
    specs: [
      "Air Cooler type",
      "165mm height",
      "2x 140mm fans",
      "Intel LGA 1700/1200/115X, AMD AM5/AM4 socket support"
    ],
    image: "https://example.com/noctua-nhd15.jpg",
    brand: "Noctua",
    description: "The Noctua NH-D15 is a high-performance dual-tower CPU air cooler known for its exceptional cooling capabilities and quiet operation."
  },
  {
    id: "13",
    name: "Samsung Odyssey G9 G95T",
    category: "monitor",
    subcategory: "ultrawide",
    price: 1299,
    stock: 8,
    rating: 4.7,
    specs: [
      "49 inch size",
      "5120 x 1440 resolution",
      "240Hz refresh rate",
      "OLED panel type",
      "0.03ms response time",
      "HDR10+"
    ],
    image: "https://example.com/samsung-odyssey-g9.jpg",
    brand: "Samsung",
    description: "The Samsung Odyssey G9 G95T is a massive 49-inch curved OLED gaming monitor with a 32:9 aspect ratio."
  },
  {
    id: "14",
    name: "LG UltraGear 27GR95QE",
    category: "monitor",
    subcategory: "gaming",
    price: 899,
    stock: 12,
    rating: 4.8,
    specs: [
      "27 inch size",
      "2560 x 1440 resolution",
      "240Hz refresh rate",
      "OLED panel type",
      "0.03ms response time",
      "HDR10"
    ],
    image: "https://example.com/lg-ultragear-oled.jpg",
    brand: "LG",
    description: "The LG UltraGear 27GR95QE is a 27-inch OLED gaming monitor with a fast 240Hz refresh rate and 0.03ms response time."
  },
  {
    id: "15",
    name: "Logitech G Pro X Superlight",
    category: "peripheral",
    subcategory: "mouse",
    price: 159,
    stock: 35,
    rating: 4.8,
    specs: [
      "HERO 25K sensor",
      "25,600 DPI",
      "5 buttons",
      "63g weight",
      "Wireless connection",
      "70 hours battery life"
    ],
    image: "https://example.com/logitech-superlight.jpg",
    brand: "Logitech",
    description: "The Logitech G Pro X Superlight is an ultra-lightweight wireless gaming mouse designed for competitive gaming."
  },
  {
    id: "16",
    name: "SteelSeries Apex Pro TKL",
    category: "peripheral",
    subcategory: "keyboard",
    price: 189,
    stock: 28,
    rating: 4.7,
    specs: [
      "Mechanical type",
      "OmniPoint Adjustable switches",
      "Tenkeyless form factor",
      "RGB lighting",
      "Wired connectivity"
    ],
    image: "https://example.com/steelseries-apex-pro.jpg",
    brand: "SteelSeries",
    description: "The SteelSeries Apex Pro TKL is a tenkeyless mechanical gaming keyboard with adjustable actuation switches."
  },
  {
    id: "17",
    name: "Razer BlackShark V2 Pro",
    category: "peripheral",
    subcategory: "headset",
    price: 179,
    stock: 25,
    rating: 4.6,
    specs: [
      "Over-ear type",
      "Wireless connectivity",
      "50mm TriForce Titanium drivers",
      "24 hours battery life",
      "Detachable microphone"
    ],
    image: "https://example.com/razer-blackshark.jpg",
    brand: "Razer",
    description: "The Razer BlackShark V2 Pro is a wireless gaming headset featuring THX Spatial Audio and a detachable microphone."
  },
  {
    id: "18",
    name: "WD_BLACK 5TB P10 Game Drive",
    category: "storage",
    subcategory: "external",
    price: 149,
    stock: 40,
    rating: 4.5,
    specs: [
      "5TB capacity",
      "USB 3.2 Gen 1 interface",
      "130MB/s speed",
      "PC, PlayStation, Xbox compatibility",
      "118mm x 88mm x 20.8mm dimensions"
    ],
    image: "https://example.com/wd-black-p10.jpg",
    brand: "Western Digital",
    description: "The WD_BLACK P10 Game Drive is a portable external hard drive designed specifically for gamers."
  },
  {
    id: "19",
    name: "Elgato Stream Deck MK.2",
    category: "peripheral",
    subcategory: "streaming",
    price: 149,
    stock: 20,
    rating: 4.8,
    specs: [
      "15 customizable buttons",
      "LCD display",
      "USB-C interface",
      "118mm x 84mm x 25mm dimensions"
    ],
    image: "https://example.com/elgato-streamdeck.jpg",
    brand: "Elgato",
    description: "The Elgato Stream Deck MK.2 is a customizable control panel with 15 LCD keys for streamers and content creators."
  },
  {
    id: "20",
    name: "Microsoft Xbox Elite Series 2 Controller",
    category: "peripheral",
    subcategory: "controller",
    price: 179,
    stock: 18,
    rating: 4.7,
    specs: [
      "Bluetooth, USB-C connectivity",
      "40 hours battery life",
      "Adjustable-tension thumbsticks, paddles customization",
      "Xbox, Windows compatibility"
    ],
    image: "https://example.com/xbox-elite-controller.jpg",
    brand: "Microsoft",
    description: "The Xbox Elite Series 2 is a premium controller with customizable components and extended battery life."
  }
];

// Apply discounts to the raw product data
export const productData = applyDiscounts(rawProductData);

/**
 * Get all products, optionally filtered by category
 * @param category Optional category to filter by
 * @returns Filtered array of products
 */
export function getProductsByCategory(category?: string): Product[] {
  if (!category || category === 'all') {
    return productData;
  }
  return productData.filter(product => product.category === category);
}

/**
 * Get products by subcategory
 * @param subcategory The subcategory to filter by
 * @returns Filtered array of products
 */
export function getProductsBySubcategory(subcategory: string): Product[] {
  return productData.filter(product => product.subcategory === subcategory);
}

/**
 * Get products by brand
 * @param brand The brand to filter by
 * @returns Filtered array of products
 */
export function getProductsByBrand(brand: string): Product[] {
  return productData.filter(product => product.brand === brand);
}

/**
 * Find a product by ID
 * @param id The product ID to find
 * @returns The found product or undefined
 */
export function getProductById(id: string): Product | undefined {
  return productData.find(product => product.id === id);
}

/**
 * Find multiple products by their IDs
 * @param ids Array of product IDs to find
 * @returns Array of found products
 */
export function getProductsByIds(ids: string[]): Product[] {
  return productData.filter(product => ids.includes(product.id));
}

/**
 * Get compatible products for a given product
 * @param productId The product ID to find compatible products for
 * @returns Array of compatible products
 */
export function getCompatibleProducts(productId: string): Product[] {
  // This is a simplified implementation - in a real app, this would use
  // more sophisticated compatibility logic based on product attributes
  const product = getProductById(productId);
  if (!product) return [];
  
  // Example: For a CPU, return compatible motherboards
  if (product.category === 'cpu') {
    const socketType = product.brand === 'AMD' ? 'amd' : 'intel';
    return getProductsBySubcategory(socketType).filter(p => p.category === 'motherboard');
  }
  
  // For a motherboard, return compatible CPUs
  if (product.category === 'motherboard') {
    const socketType = product.subcategory;
    const cpuBrand = socketType === 'amd' ? 'AMD' : 'Intel';
    return getProductsByCategory('cpu').filter(p => p.brand === cpuBrand);
  }
  
  // Default: return some products from different categories
  return productData.filter(p => p.category !== product.category).slice(0, 5);
}