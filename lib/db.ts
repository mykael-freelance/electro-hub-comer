// Mock database for the e-commerce application
import { Product, Category, Brand, User, Order } from './types';

// Mock categories
export const categories: Category[] = [
  {
    id: '1',
    name: 'Smartphones',
    slug: 'smartphones',
    image: 'https://images.pexels.com/photos/47261/pexels-photo-47261.jpeg',
    description: 'Latest smartphones from top brands',
    featured: true,
  },
  {
    id: '2',
    name: 'Laptops',
    slug: 'laptops',
    image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg',
    description: 'Powerful laptops for work and play',
    featured: true,
  },
  {
    id: '3',
    name: 'Audio',
    slug: 'audio',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg',
    description: 'Headphones, earbuds, and speakers',
    featured: true,
  },
  {
    id: '4',
    name: 'Wearables',
    slug: 'wearables',
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg',
    description: 'Smartwatches and fitness trackers',
    featured: false,
  },
  {
    id: '5',
    name: 'Cameras',
    slug: 'cameras',
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg',
    description: 'Digital cameras and accessories',
    featured: false,
  },
  {
    id: '6',
    name: 'Gaming',
    slug: 'gaming',
    image: 'https://images.pexels.com/photos/275033/pexels-photo-275033.jpeg',
    description: 'Consoles, games, and accessories',
    featured: true,
  },
];

// Mock brands
export const brands: Brand[] = [
  {
    id: '1',
    name: 'Apple',
    slug: 'apple',
    logo: 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg',
  },
  {
    id: '2',
    name: 'Samsung',
    slug: 'samsung',
    logo: 'https://images.pexels.com/photos/1482061/pexels-photo-1482061.jpeg',
  },
  {
    id: '3',
    name: 'Sony',
    slug: 'sony',
    logo: 'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg',
  },
  {
    id: '4',
    name: 'Microsoft',
    slug: 'microsoft',
    logo: 'https://images.pexels.com/photos/1187578/pexels-photo-1187578.jpeg',
  },
  {
    id: '5',
    name: 'Google',
    slug: 'google',
    logo: 'https://images.pexels.com/photos/218717/pexels-photo-218717.jpeg',
  },
  {
    id: '6',
    name: 'Dell',
    slug: 'dell',
    logo: 'https://images.pexels.com/photos/1006293/pexels-photo-1006293.jpeg',
  },
];

// Mock products
export const products: Product[] = [
  {
    id: '1',
    name: 'iPhone 14 Pro',
    slug: 'iphone-14-pro',
    description: 'The latest iPhone with a stunning display, powerful A16 chip, and advanced camera system.',
    price: 999,
    originalPrice: 1099,
    images: [
      'https://images.pexels.com/photos/5750001/pexels-photo-5750001.jpeg',
      'https://images.pexels.com/photos/13089455/pexels-photo-13089455.jpeg',
    ],
    category: 'Smartphones',
    brand: 'Apple',
    rating: 4.8,
    reviewCount: 245,
    inStock: true,
    features: [
      '6.1-inch Super Retina XDR display',
      'A16 Bionic chip',
      'Pro camera system',
      'Up to 29 hours of video playback',
    ],
    specifications: {
      'Display': '6.1-inch Super Retina XDR',
      'Processor': 'A16 Bionic chip',
      'Storage': '128GB, 256GB, 512GB, 1TB',
      'Camera': '48MP main, 12MP ultra wide, 12MP telephoto',
      'Battery': 'Up to 29 hours of video playback',
    },
    isFeatured: true,
    isNew: true,
    discount: 9,
    createdAt: '2023-08-15T12:00:00Z',
  },
  {
    id: '2',
    name: 'Samsung Galaxy S23 Ultra',
    slug: 'samsung-galaxy-s23-ultra',
    description: 'The ultimate Samsung phone with a built-in S Pen, powerful camera, and stunning display.',
    price: 1199,
    images: [
      'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg',
      'https://images.pexels.com/photos/214487/pexels-photo-214487.jpeg',
    ],
    category: 'Smartphones',
    brand: 'Samsung',
    rating: 4.7,
    reviewCount: 189,
    inStock: true,
    features: [
      '6.8-inch Dynamic AMOLED display',
      'Snapdragon 8 Gen 2 processor',
      '200MP main camera',
      'Built-in S Pen',
    ],
    specifications: {
      'Display': '6.8-inch Dynamic AMOLED 2X',
      'Processor': 'Snapdragon 8 Gen 2',
      'Storage': '256GB, 512GB, 1TB',
      'Camera': '200MP main, 12MP ultra wide, 10MP telephoto',
      'Battery': '5000mAh',
    },
    isFeatured: true,
    isNew: true,
    createdAt: '2023-09-01T12:00:00Z',
  },
  {
    id: '3',
    name: 'MacBook Pro 16"',
    slug: 'macbook-pro-16',
    description: 'Incredibly powerful MacBook Pro with M2 Pro or M2 Max chip and stunning Liquid Retina XDR display.',
    price: 2499,
    originalPrice: 2699,
    images: [
      'https://images.pexels.com/photos/303383/pexels-photo-303383.jpeg',
      'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg',
    ],
    category: 'Laptops',
    brand: 'Apple',
    rating: 4.9,
    reviewCount: 132,
    inStock: true,
    features: [
      '16-inch Liquid Retina XDR display',
      'M2 Pro or M2 Max chip',
      'Up to 22 hours of battery life',
      'Up to 96GB unified memory',
    ],
    specifications: {
      'Display': '16-inch Liquid Retina XDR',
      'Processor': 'M2 Pro or M2 Max',
      'Memory': 'Up to 96GB unified memory',
      'Storage': 'Up to 8TB SSD',
      'Battery': 'Up to 22 hours',
    },
    isFeatured: true,
    isNew: false,
    discount: 7,
    createdAt: '2023-07-10T12:00:00Z',
  },
  {
    id: '4',
    name: 'Sony WH-1000XM5',
    slug: 'sony-wh-1000xm5',
    description: 'Industry-leading noise cancellation headphones with exceptional sound quality.',
    price: 399,
    originalPrice: 449,
    images: [
      'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg',
      'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg',
    ],
    category: 'Audio',
    brand: 'Sony',
    rating: 4.8,
    reviewCount: 285,
    inStock: true,
    features: [
      'Industry-leading noise cancellation',
      'Up to 30 hours of battery life',
      'Precise Voice Pickup technology',
      'Multipoint connection',
    ],
    specifications: {
      'Type': 'Over-ear wireless headphones',
      'Battery Life': 'Up to 30 hours',
      'Charging': 'USB-C',
      'Weight': '250g',
      'Connectivity': 'Bluetooth 5.2',
    },
    isFeatured: true,
    isNew: false,
    discount: 11,
    createdAt: '2023-06-20T12:00:00Z',
  },
  {
    id: '5',
    name: 'Apple Watch Series 8',
    slug: 'apple-watch-series-8',
    description: 'Advanced health features, a temperature sensor, and crash detection in a stunning design.',
    price: 399,
    images: [
      'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg',
      'https://images.pexels.com/photos/1682821/pexels-photo-1682821.jpeg',
    ],
    category: 'Wearables',
    brand: 'Apple',
    rating: 4.7,
    reviewCount: 165,
    inStock: true,
    features: [
      'Always-On Retina display',
      'Temperature sensor',
      'Crash detection',
      'ECG app',
    ],
    specifications: {
      'Display': 'Always-On Retina LTPO OLED display',
      'Sizes': '41mm or 45mm',
      'Water Resistance': '50 meters',
      'Sensors': 'Temperature, Blood Oxygen, ECG',
      'Battery': 'Up to 18 hours',
    },
    isFeatured: false,
    isNew: false,
    createdAt: '2023-04-15T12:00:00Z',
  },
  {
    id: '6',
    name: 'PlayStation 5',
    slug: 'playstation-5',
    description: 'Experience lightning-fast loading, deeper immersion with haptic feedback, and stunning games.',
    price: 499,
    originalPrice: 549,
    images: [
      'https://images.pexels.com/photos/15273413/pexels-photo-15273413.jpeg',
      'https://images.pexels.com/photos/14641893/pexels-photo-14641893.jpeg',
    ],
    category: 'Gaming',
    brand: 'Sony',
    rating: 4.9,
    reviewCount: 320,
    inStock: false,
    features: [
      'Ultra-high speed SSD',
      'Ray tracing support',
      'Haptic feedback',
      '4K gaming up to 120fps',
    ],
    specifications: {
      'CPU': 'AMD Zen 2-based CPU',
      'GPU': 'AMD RDNA 2-based graphics engine',
      'Storage': '825GB SSD',
      'Resolution': 'Up to 8K',
      'Frame Rate': 'Up to 120fps',
    },
    isFeatured: true,
    isNew: false,
    discount: 9,
    createdAt: '2023-02-10T12:00:00Z',
  },
  {
    id: '7',
    name: 'Sony Alpha A7 IV',
    slug: 'sony-alpha-a7-iv',
    description: 'A powerful hybrid camera with 33MP full-frame sensor and 4K 60p video capabilities.',
    price: 2499,
    images: [
      'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg',
      'https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg',
    ],
    category: 'Cameras',
    brand: 'Sony',
    rating: 4.8,
    reviewCount: 98,
    inStock: true,
    features: [
      '33MP full-frame Exmor R sensor',
      '4K 60p video recording',
      '10-bit 4:2:2 color depth',
      'Advanced autofocus with real-time tracking',
    ],
    specifications: {
      'Sensor': '33MP full-frame Exmor R CMOS sensor',
      'Processor': 'BIONZ XR',
      'AF Points': '759 phase-detection points',
      'ISO Range': '100-51200 (expandable to 50-204800)',
      'Video': '4K 60p, Full HD 120p',
    },
    isFeatured: false,
    isNew: true,
    createdAt: '2023-05-20T12:00:00Z',
  },
  {
    id: '8',
    name: 'Dell XPS 15',
    slug: 'dell-xps-15',
    description: 'A premium Windows laptop with stunning display, powerful performance, and sleek design.',
    price: 1999,
    originalPrice: 2199,
    images: [
      'https://images.pexels.com/photos/205421/pexels-photo-205421.jpeg',
      'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg',
    ],
    category: 'Laptops',
    brand: 'Dell',
    rating: 4.7,
    reviewCount: 112,
    inStock: true,
    features: [
      '15.6-inch 4K UHD+ display',
      'Intel Core i9 processor',
      'NVIDIA GeForce RTX 3050 Ti',
      'Up to 64GB RAM',
    ],
    specifications: {
      'Display': '15.6-inch 4K UHD+ (3840 x 2400)',
      'Processor': 'Up to Intel Core i9-12900HK',
      'Graphics': 'Up to NVIDIA GeForce RTX 3050 Ti',
      'Memory': 'Up to 64GB DDR5',
      'Storage': 'Up to 2TB SSD',
    },
    isFeatured: false,
    isNew: false,
    discount: 9,
    createdAt: '2023-03-05T12:00:00Z',
  },
];

// Get all products with optional filters
export function getProducts(filters?: {
  category?: string;
  brand?: string;
  featured?: boolean;
  new?: boolean;
  limit?: number;
}) {
  let filteredProducts = [...products];
  
  if (filters?.category) {
    filteredProducts = filteredProducts.filter(
      product => product.category.toLowerCase() === filters.category?.toLowerCase()
    );
  }
  
  if (filters?.brand) {
    filteredProducts = filteredProducts.filter(
      product => product.brand.toLowerCase() === filters.brand?.toLowerCase()
    );
  }
  
  if (filters?.featured) {
    filteredProducts = filteredProducts.filter(product => product.isFeatured);
  }
  
  if (filters?.new) {
    filteredProducts = filteredProducts.filter(product => product.isNew);
  }
  
  if (filters?.limit) {
    filteredProducts = filteredProducts.slice(0, filters.limit);
  }
  
  return filteredProducts;
}

// Get a single product by ID
export function getProductById(id: string) {
  return products.find(product => product.id === id);
}

// Get a single product by slug
export function getProductBySlug(slug: string) {
  return products.find(product => product.slug === slug);
}

// Get all categories
export function getCategories() {
  return categories;
}

// Get featured categories
export function getFeaturedCategories() {
  return categories.filter(category => category.featured);
}

// Get all brands
export function getBrands() {
  return brands;
}

// Get related products
export function getRelatedProducts(productId: string, limit = 4) {
  const product = getProductById(productId);
  if (!product) return [];
  
  return products
    .filter(p => p.id !== productId && p.category === product.category)
    .slice(0, limit);
}