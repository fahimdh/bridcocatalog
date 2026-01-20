
export type MainCategory = 
  | 'GROCERY' 
  | 'TOILETRY' 
  | 'NON-FOOD' 
  | 'CONFECTIONERY' 
  | 'STATIONARY' 
  | 'HOMECARE' 
  | 'ACCESSORIES' 
  | 'FRAGRANCE' 
  | 'MISCELLANEOUS' 
  | 'ASSORTED';

export type PriceListId = 'STANDARD' | 'WHOLESALE' | 'VIP';

export interface User {
  id: string;
  name: string;
  email: string;
  isApproved: boolean;
  priceListId: PriceListId;
  avatar?: string;
  isAdmin?: boolean;
}

export interface Product {
  id: string;
  name: string;
  prices: Record<PriceListId, number>;
  mainCategory: MainCategory;
  subCategory: string;
  image: string;
  description: string;
  packagingTypes: string[];
}

export interface CartItem extends Omit<Product, 'prices'> {
  price: number;
  quantity: number;
  selectedPackaging: string;
}

export type View = 'catalog' | 'categories' | 'search' | 'cart' | 'account' | 'details' | 'login' | 'pending' | 'admin' | 'order-success';
