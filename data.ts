
import { Product, MainCategory, User } from './types';

export const MOCK_USERS: User[] = [
  {
    id: 'u1',
    name: 'Demo Admin',
    email: 'admin@demo.com',
    isApproved: true,
    priceListId: 'STANDARD',
    avatar: 'https://i.pravatar.cc/150?u=admin',
    isAdmin: true
  },
  {
    id: 'u2',
    name: 'Wholesale Partner',
    email: 'vip@wholesale.com',
    isApproved: true,
    priceListId: 'VIP',
    avatar: 'https://i.pravatar.cc/150?u=u2'
  }
];

export const CATEGORY_STRUCTURE: { main: MainCategory; subs: string[] }[] = [
  {
    main: 'GROCERY',
    subs: ['RICE', 'OIL & GHEE', 'SPICES', 'TEA & COFFEE', 'CEREALS', 'NOODLES & PASTA']
  },
  {
    main: 'TOILETRY',
    subs: ['SHAMPOO', 'SOAP', 'DENTAL CARE', 'BODY LOTION']
  },
  {
    main: 'CONFECTIONERY',
    subs: ['DRINKS & BEVERAGES', 'CHOCOLATES', 'BISCUITS', 'SNACKS']
  },
  {
    main: 'HOMECARE',
    subs: ['LAUNDRY', 'DISINFECTANT']
  }
];

export const PRODUCTS: Product[] = [
  // GROCERY
  {
    id: 'g1',
    name: 'Golden Sella Basmati',
    prices: { STANDARD: 18.50, WHOLESALE: 16.00, VIP: 14.50 },
    mainCategory: 'GROCERY',
    subCategory: 'RICE',
    image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=400',
    description: 'Extra long grain premium parboiled rice.',
    packagingTypes: ['5kg Bag', '10kg Bag', '20kg Sack']
  },
  {
    id: 'g2',
    name: 'Pure Sunflower Oil',
    prices: { STANDARD: 12.00, WHOLESALE: 10.50, VIP: 9.00 },
    mainCategory: 'GROCERY',
    subCategory: 'OIL & GHEE',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?q=80&w=400',
    description: 'High quality refined sunflower oil for cooking.',
    packagingTypes: ['1L Bottle', '5L Jerrycan']
  },
  {
    id: 'g3',
    name: 'Organic Turmeric Powder',
    prices: { STANDARD: 4.50, WHOLESALE: 3.80, VIP: 3.20 },
    mainCategory: 'GROCERY',
    subCategory: 'SPICES',
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?q=80&w=400',
    description: '100% pure organic ground turmeric.',
    packagingTypes: ['100g Pouch', '500g Jar']
  },
  {
    id: 'g4',
    name: 'Arabica Coffee Beans',
    prices: { STANDARD: 22.00, WHOLESALE: 19.50, VIP: 17.00 },
    mainCategory: 'GROCERY',
    subCategory: 'TEA & COFFEE',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=400',
    description: 'Medium roast hand-picked coffee beans.',
    packagingTypes: ['250g Pack', '1kg Bag']
  },
  
  // TOILETRY
  {
    id: 't1',
    name: 'Argan Oil Shampoo',
    prices: { STANDARD: 14.00, WHOLESALE: 12.00, VIP: 10.50 },
    mainCategory: 'TOILETRY',
    subCategory: 'SHAMPOO',
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?q=80&w=400',
    description: 'Deep repair shampoo with Moroccan Argan oil.',
    packagingTypes: ['400ml Bottle']
  },
  {
    id: 't2',
    name: 'Ocean Mist Body Wash',
    prices: { STANDARD: 8.50, WHOLESALE: 7.20, VIP: 6.00 },
    mainCategory: 'TOILETRY',
    subCategory: 'BODY LOTION',
    image: 'https://images.unsplash.com/photo-1559591937-e68fb3305540?q=80&w=400',
    description: 'Refreshing body wash with mineral salts.',
    packagingTypes: ['500ml Pump']
  },
  {
    id: 't3',
    name: 'Charcoal Toothpaste',
    prices: { STANDARD: 6.00, WHOLESALE: 5.10, VIP: 4.50 },
    mainCategory: 'TOILETRY',
    subCategory: 'DENTAL CARE',
    image: 'https://images.unsplash.com/photo-1559591937-e68fb3305540?q=80&w=400',
    description: 'Natural whitening with activated charcoal.',
    packagingTypes: ['75ml Tube']
  },

  // CONFECTIONERY
  {
    id: 'c1',
    name: 'Dark Cocoa Selection',
    prices: { STANDARD: 5.50, WHOLESALE: 4.80, VIP: 4.00 },
    mainCategory: 'CONFECTIONERY',
    subCategory: 'CHOCOLATES',
    image: 'https://images.unsplash.com/photo-1548907040-4baa42d10919?q=80&w=400',
    description: '70% dark chocolate with sea salt flakes.',
    packagingTypes: ['100g Bar', 'Box of 12']
  },
  {
    id: 'c2',
    name: 'Sparkling Lemonade',
    prices: { STANDARD: 2.50, WHOLESALE: 2.10, VIP: 1.80 },
    mainCategory: 'CONFECTIONERY',
    subCategory: 'DRINKS & BEVERAGES',
    image: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?q=80&w=400',
    description: 'Carbonated drink with real lemon juice.',
    packagingTypes: ['330ml Can', '6-Pack']
  },
  {
    id: 'c3',
    name: 'Butter Shortbread',
    prices: { STANDARD: 7.00, WHOLESALE: 6.20, VIP: 5.50 },
    mainCategory: 'CONFECTIONERY',
    subCategory: 'BISCUITS',
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=400',
    description: 'Traditional Scottish butter shortbread biscuits.',
    packagingTypes: ['200g Box']
  },

  // HOMECARE
  {
    id: 'h1',
    name: 'Bio-Active Laundry Pods',
    prices: { STANDARD: 19.00, WHOLESALE: 16.50, VIP: 14.00 },
    mainCategory: 'HOMECARE',
    subCategory: 'LAUNDRY',
    image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?q=80&w=400',
    description: 'Concentrated laundry pods for tough stains.',
    packagingTypes: ['30 Pods', '60 Pods Pack']
  }
];
