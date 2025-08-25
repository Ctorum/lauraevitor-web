// Shared type definitions for the application

export interface ShoppingItem {
  id: string;
  name: string;
  price: number;
  description?: string;
  image: string;
}

export interface CartItem extends ShoppingItem {
  quantity: number;
}

// Legacy interface for backwards compatibility
// TODO: Remove this once all components are updated
export interface LegacyItem {
  id: number;
  name: string;
  price: number;
  inCart: boolean;
}

export interface LegacyCartItem extends LegacyItem {
  quantity: number;
}
