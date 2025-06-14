import { Product } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Designer Evening Gown',
    description: 'Elegant black evening gown perfect for special occasions. Features intricate beadwork and flowing silhouette.',
    images: [
      'https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Dresses',
    buyPrice: 15000,
    rentPrice: 2500,
    securityDeposit: 5000,
    vendor: 'Elegant Boutique',
    vendorId: 'v1',
    rating: 4.8,
    reviews: 24,
    tags: ['evening', 'formal', 'party', 'designer'],
    availability: 'available',
    location: 'Mumbai',
    rentalType: 'both'
  },
  {
    id: '2',
    name: 'Premium Leather Jacket',
    description: 'High-quality genuine leather jacket with modern design. Perfect for casual and semi-formal occasions.',
    images: [
      'https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1035685/pexels-photo-1035685.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Jackets',
    buyPrice: 8000,
    rentPrice: 800,
    securityDeposit: 2000,
    vendor: 'Urban Style Co.',
    vendorId: 'v2',
    rating: 4.6,
    reviews: 18,
    tags: ['leather', 'casual', 'winter', 'trendy'],
    availability: 'available',
    location: 'Delhi',
    rentalType: 'both'
  },
  {
    id: '3',
    name: 'Traditional Silk Saree',
    description: 'Beautiful handwoven silk saree with traditional motifs. Perfect for weddings and cultural events.',
    images: [
      'https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3649765/pexels-photo-3649765.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Sarees',
    buyPrice: 12000,
    rentPrice: 1500,
    securityDeposit: 3000,
    vendor: 'Heritage Textiles',
    vendorId: 'v3',
    rating: 4.9,
    reviews: 32,
    tags: ['traditional', 'silk', 'wedding', 'ethnic'],
    availability: 'available',
    location: 'Bangalore',
    rentalType: 'both'
  },
  {
    id: '4',
    name: 'Designer Blazer Set',
    description: 'Professional blazer set with matching pants. Perfect for business meetings and formal events.',
    images: [
      'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1040173/pexels-photo-1040173.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Suits',
    buyPrice: 6000,
    rentPrice: 600,
    securityDeposit: 1500,
    vendor: 'Professional Wear',
    vendorId: 'v4',
    rating: 4.5,
    reviews: 15,
    tags: ['professional', 'formal', 'business', 'blazer'],
    availability: 'available',
    location: 'Chennai',
    rentalType: 'both'
  },
  {
    id: '5',
    name: 'Boho Maxi Dress',
    description: 'Flowing bohemian maxi dress with floral prints. Perfect for summer occasions and beach events.',
    images: [
      'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1759622/pexels-photo-1759622.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Dresses',
    buyPrice: 4000,
    rentPrice: 400,
    securityDeposit: 1000,
    vendor: 'Boho Chic',
    vendorId: 'v5',
    rating: 4.7,
    reviews: 28,
    tags: ['boho', 'casual', 'summer', 'floral'],
    availability: 'available',
    location: 'Goa',
    rentalType: 'both'
  },
  {
    id: '6',
    name: 'Vintage Denim Jacket',
    description: 'Classic vintage denim jacket with distressed details. A timeless piece for any wardrobe.',
    images: [
      'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    category: 'Jackets',
    rentPrice: 300,
    securityDeposit: 800,
    vendor: 'Vintage Vibes',
    vendorId: 'v6',
    rating: 4.4,
    reviews: 12,
    tags: ['vintage', 'denim', 'casual', 'retro'],
    availability: 'available',
    location: 'Pune',
    rentalType: 'rent-only'
  }
];

export const categories = [
  'All Categories',
  'Dresses',
  'Jackets',
  'Sarees',
  'Suits',
  'Accessories',
  'Shoes',
  'Bags'
];

export const locations = [
  'All Locations',
  'Mumbai',
  'Delhi',
  'Bangalore',
  'Chennai',
  'Kolkata',
  'Hyderabad',
  'Pune',
  'Goa'
];