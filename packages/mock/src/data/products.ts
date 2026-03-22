import { Product, Category } from "../types";

export const mockProducts: Product[] = [
  {
    id: "prod-001",
    name: "Premium Cotton T-Shirt",
    slug: "premium-cotton-t-shirt",
    description: "High-quality cotton t-shirt with a comfortable fit.",
    price: {
      amount: 29.99,
      currency: "USD",
    },
    images: [
      {
        url: "https://placehold.co/600x400/e2e8f0/1e293b?text=T-Shirt",
        alt: "Premium Cotton T-Shirt",
      },
    ],
    category: {
      id: "cat-001",
      name: "Clothing",
      slug: "clothing",
      level: 0,
    },
    variants: [
      {
        id: "var-001",
        name: "Small / Black",
        sku: "TS-S-BLK",
        quantityAvailable: 50,
      },
      {
        id: "var-002",
        name: "Medium / Black",
        sku: "TS-M-BLK",
        quantityAvailable: 45,
      },
      {
        id: "var-003",
        name: "Large / Black",
        sku: "TS-L-BLK",
        quantityAvailable: 30,
      },
    ],
    attributes: [
      {
        name: "Material",
        values: ["100% Cotton"],
      },
      {
        name: "Care",
        values: ["Machine wash cold"],
      },
    ],
    isAvailable: true,
    rating: 4.5,
    reviewCount: 128,
  },
  {
    id: "prod-002",
    name: "Wireless Bluetooth Headphones",
    slug: "wireless-bluetooth-headphones",
    description: "Premium wireless headphones with noise cancellation.",
    price: {
      amount: 199.99,
      currency: "USD",
    },
    images: [
      {
        url: "https://placehold.co/600x400/e2e8f0/1e293b?text=Headphones",
        alt: "Wireless Bluetooth Headphones",
      },
    ],
    category: {
      id: "cat-002",
      name: "Electronics",
      slug: "electronics",
      level: 0,
    },
    variants: [
      {
        id: "var-004",
        name: "Black",
        sku: "WH-BLK",
        quantityAvailable: 25,
      },
      {
        id: "var-005",
        name: "White",
        sku: "WH-WHT",
        quantityAvailable: 20,
      },
    ],
    attributes: [
      {
        name: "Battery Life",
        values: ["30 hours"],
      },
      {
        name: "Connectivity",
        values: ["Bluetooth 5.0"],
      },
    ],
    isAvailable: true,
    rating: 4.8,
    reviewCount: 256,
  },
  {
    id: "prod-003",
    name: "Leather Wallet",
    slug: "leather-wallet",
    description: "Genuine leather wallet with multiple card slots.",
    price: {
      amount: 49.99,
      currency: "USD",
    },
    images: [
      {
        url: "https://placehold.co/600x400/e2e8f0/1e293b?text=Wallet",
        alt: "Leather Wallet",
      },
    ],
    category: {
      id: "cat-003",
      name: "Accessories",
      slug: "accessories",
      level: 0,
    },
    variants: [
      {
        id: "var-006",
        name: "Brown",
        sku: "LW-BRN",
        quantityAvailable: 40,
      },
      {
        id: "var-007",
        name: "Black",
        sku: "LW-BLK",
        quantityAvailable: 35,
      },
    ],
    attributes: [
      {
        name: "Material",
        values: ["Genuine Leather"],
      },
    ],
    isAvailable: true,
    rating: 4.3,
    reviewCount: 89,
  },
  {
    id: "prod-004",
    name: "Running Shoes",
    slug: "running-shoes",
    description: "Lightweight running shoes with cushioned sole.",
    price: {
      amount: 89.99,
      currency: "USD",
    },
    images: [
      {
        url: "https://placehold.co/600x400/e2e8f0/1e293b?text=Shoes",
        alt: "Running Shoes",
      },
    ],
    category: {
      id: "cat-004",
      name: "Footwear",
      slug: "footwear",
      level: 0,
    },
    variants: [
      {
        id: "var-008",
        name: "US 9 / Blue",
        sku: "RS-9-BLU",
        quantityAvailable: 15,
      },
      {
        id: "var-009",
        name: "US 10 / Blue",
        sku: "RS-10-BLU",
        quantityAvailable: 12,
      },
    ],
    attributes: [
      {
        name: "Weight",
        values: ["250g"],
      },
    ],
    isAvailable: true,
    rating: 4.6,
    reviewCount: 167,
  },
  {
    id: "prod-005",
    name: "Smart Watch",
    slug: "smart-watch",
    description: "Feature-rich smartwatch with health tracking.",
    price: {
      amount: 299.99,
      currency: "USD",
    },
    images: [
      {
        url: "https://placehold.co/600x400/e2e8f0/1e293b?text=Smart+Watch",
        alt: "Smart Watch",
      },
    ],
    category: {
      id: "cat-002",
      name: "Electronics",
      slug: "electronics",
      level: 0,
    },
    variants: [
      {
        id: "var-010",
        name: "Space Gray",
        sku: "SW-GRY",
        quantityAvailable: 18,
      },
      {
        id: "var-011",
        name: "Silver",
        sku: "SW-SLV",
        quantityAvailable: 22,
      },
    ],
    attributes: [
      {
        name: "Display",
        values: ["1.9\" OLED"],
      },
      {
        name: "Water Resistance",
        values: ["5ATM"],
      },
    ],
    isAvailable: true,
    rating: 4.7,
    reviewCount: 312,
  },
  {
    id: "prod-006",
    name: "Coffee Mug",
    slug: "coffee-mug",
    description: "Ceramic coffee mug with ergonomic handle.",
    price: {
      amount: 14.99,
      currency: "USD",
    },
    images: [
      {
        url: "https://placehold.co/600x400/e2e8f0/1e293b?text=Mug",
        alt: "Coffee Mug",
      },
    ],
    category: {
      id: "cat-005",
      name: "Home & Garden",
      slug: "home-garden",
      level: 0,
    },
    variants: [
      {
        id: "var-012",
        name: "White",
        sku: "CM-WHT",
        quantityAvailable: 100,
      },
    ],
    attributes: [
      {
        name: "Capacity",
        values: ["350ml"],
      },
    ],
    isAvailable: true,
    rating: 4.2,
    reviewCount: 45,
  },
];

export const mockCategories: Category[] = [
  {
    id: "cat-001",
    name: "Clothing",
    slug: "clothing",
    description: "Men's and women's clothing",
    level: 0,
    children: [
      {
        id: "cat-001-1",
        name: "Men's Clothing",
        slug: "mens-clothing",
        description: "Clothing for men",
        level: 1,
      },
      {
        id: "cat-001-2",
        name: "Women's Clothing",
        slug: "womens-clothing",
        description: "Clothing for women",
        level: 1,
      },
    ],
  },
  {
    id: "cat-002",
    name: "Electronics",
    slug: "electronics",
    description: "Electronic devices and accessories",
    level: 0,
    children: [
      {
        id: "cat-002-1",
        name: "Audio",
        slug: "audio",
        description: "Headphones, speakers, and more",
        level: 1,
      },
      {
        id: "cat-002-2",
        name: "Wearables",
        slug: "wearables",
        description: "Smartwatches and fitness trackers",
        level: 1,
      },
    ],
  },
  {
    id: "cat-003",
    name: "Accessories",
    slug: "accessories",
    description: "Fashion accessories",
    level: 0,
  },
  {
    id: "cat-004",
    name: "Footwear",
    slug: "footwear",
    description: "Shoes and sandals",
    level: 0,
  },
  {
    id: "cat-005",
    name: "Home & Garden",
    slug: "home-garden",
    description: "Home decor and garden supplies",
    level: 0,
  },
];

export function getProductById(id: string): Product | undefined {
  return mockProducts.find((p) => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return mockProducts.find((p) => p.slug === slug);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return mockProducts.filter((p) => p.category.slug === categorySlug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return mockCategories.find((c) => c.slug === slug);
}

export function searchProducts(query: string): Product[] {
  const lowercaseQuery = query.toLowerCase();
  return mockProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(lowercaseQuery) ||
      p.description.toLowerCase().includes(lowercaseQuery)
  );
}
