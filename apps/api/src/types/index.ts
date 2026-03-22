// API Types

export interface Money {
  amount: number;
  currency: string;
}

export interface ProductImage {
  url: string;
  alt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  level: number;
  children?: Category[];
}

export interface ProductVariant {
  id: string;
  name: string;
  sku: string;
  quantityAvailable: number;
}

export interface ProductAttribute {
  name: string;
  values: string[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: Money;
  images: ProductImage[];
  category: Category;
  variants: ProductVariant[];
  attributes: ProductAttribute[];
  isAvailable: boolean;
  rating?: number;
  reviewCount?: number;
}

export interface Address {
  firstName: string;
  lastName: string;
  companyName?: string;
  streetAddress1: string;
  streetAddress2?: string;
  city: string;
  postalCode: string;
  country: string;
  countryArea?: string;
  phone?: string;
}

export interface ShippingMethod {
  id: string;
  name: string;
  price: Money;
}

export interface CheckoutLine {
  id: string;
  variant: {
    id: string;
    name: string;
    sku: string;
  };
  quantity: number;
  unitPrice: Money;
  totalPrice: Money;
}

export interface Checkout {
  id: string;
  email: string;
  lines: CheckoutLine[];
  shippingAddress: Address | null;
  billingAddress: Address | null;
  shippingMethod: ShippingMethod | null;
  subtotalPrice: Money;
  shippingPrice: Money;
  totalPrice: Money;
  isShippingRequired: boolean;
  availableShippingMethods: ShippingMethod[];
}

export interface Order {
  id: string;
  number: string;
  status: string;
  createdAt: string;
  userEmail: string;
  shippingAddress: Address | null;
  billingAddress: Address | null;
  lines: CheckoutLine[];
  subtotal: Money;
  shippingPrice: Money;
  total: Money;
  paymentStatus: string;
  paymentMethod: string;
}

export interface Payment {
  id: string;
  status: "PENDING" | "SUCCESS" | "FAILED" | "CANCELLED";
  amount: number;
  currency: string;
  paymentMethod: string;
  redirectUrl?: string;
  createdAt: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

export interface PageInfo {
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  startCursor?: string;
  endCursor?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  pageInfo: PageInfo;
}
