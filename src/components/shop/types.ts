
export interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  isNew?: boolean;
  isFeatured?: boolean;
  isSoldOut?: boolean;
  discount?: number;
  priceToBeUpdated?: boolean;
}

export interface AvailabilityFilters {
  inStock: boolean;
  newArrivals: boolean;
  onSale: boolean;
  featured: boolean;
}

export interface PriceRange {
  min: number;
  max: number;
}

// Now matches the definition in CartContext.tsx
export interface CartProduct extends Omit<Product, 'category' | 'isNew' | 'isFeatured'> {
  quantity: number;
  variant?: string;
}
