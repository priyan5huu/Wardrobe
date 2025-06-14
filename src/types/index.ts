export interface Product {
  id: string;
  name: string;
  description: string;
  images: string[];
  category: string;
  buyPrice?: number;
  rentPrice?: number;
  securityDeposit?: number;
  vendor: string;
  vendorId: string;
  rating: number;
  reviews: number;
  tags: string[];
  availability: 'available' | 'rented' | 'sold';
  location: string;
  rentalType: 'buy-only' | 'rent-only' | 'both';
}

export interface CartItem {
  product: Product;
  type: 'buy' | 'rent';
  quantity: number;
  deliveryDate?: string;
  returnDate?: string;
  rentDays?: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'vendor' | 'admin';
  isVendor: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'returned';
  createdAt: string;
  deliveryAddress: string;
}