export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'outerwear' | 'knitwear' | 'tailoring' | 'dresses' | 'trousers' | 'accessories';
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  images: string[];
  description: string;
  details: string[];
  composition: string;
  fit: string;
  care: string;
  colors: {
    name: string;
    hex: string;
    bgClass?: string;
  }[];
  sizes: string[];
  inStock: boolean;
  stockCount?: number;
  isNew?: boolean;
  isFeatured?: boolean;
}

export interface CartItem {
  id: string; // unique item id based on product.id + size + color
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

export type CurrencyCode = 'USD' | 'EUR' | 'GBP';

export interface Currency {
  code: CurrencyCode;
  symbol: string;
  rate: number; // relative to USD
}
