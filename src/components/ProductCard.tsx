import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, MapPin, ShoppingCart, Calendar, Heart, Eye } from 'lucide-react';
import { Product } from '../types';
import { ImageWithFallback } from './ImageWithFallback';
import { IntersectionObserver } from './IntersectionObserver';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export function ProductCard({ product, index = 0 }: ProductCardProps) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const animationDelay = `${index * 100}ms`;

  return (
    <IntersectionObserver 
      className="group"
      animationClass="animate-fade-in-up"
    >
      <div 
        className="bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
        style={{ animationDelay }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Link to={`/product/${product.id}`}>
          <div className="relative overflow-hidden aspect-[4/5]">
            <ImageWithFallback
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            
            {/* Overlay on hover */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`} />
            
            {/* Quick actions */}
            <div className={`absolute top-4 right-4 space-y-2 transition-all duration-300 ${
              isHovered ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
            }`}>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setIsWishlisted(!isWishlisted);
                }}
                className={`w-10 h-10 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all ${
                  isWishlisted 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white/20 text-white hover:bg-white hover:text-gray-900'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
              
              <button className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/20 text-white hover:bg-white hover:text-gray-900 flex items-center justify-center transition-all">
                <Eye className="w-5 h-5" />
              </button>
            </div>

            {/* Rental type badge */}
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm border ${
                product.rentalType === 'both' 
                  ? 'bg-purple-500/90 text-white border-purple-400/50' 
                  : product.rentalType === 'rent-only'
                  ? 'bg-blue-500/90 text-white border-blue-400/50'
                  : 'bg-green-500/90 text-white border-green-400/50'
              }`}>
                {product.rentalType === 'both' ? 'Buy/Rent' : 
                 product.rentalType === 'rent-only' ? 'Rent Only' : 'Buy Only'}
              </span>
            </div>

            {/* Quick view button */}
            <div className={`absolute bottom-4 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${
              isHovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
            }`}>
              <button className="bg-white text-gray-900 px-4 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors shadow-lg">
                Quick View
              </button>
            </div>
          </div>
        </Link>

        <div className="p-6">
          <div className="flex items-center text-sm text-gray-500 mb-3">
            <MapPin className="w-3 h-3 mr-1" />
            {product.location}
            <span className="mx-2">•</span>
            <span className="text-purple-600 font-medium">{product.vendor}</span>
          </div>

          <Link to={`/product/${product.id}`}>
            <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 hover:text-purple-600 transition-colors text-lg">
              {product.name}
            </h3>
          </Link>

          <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
            {product.description}
          </p>

          <div className="flex items-center mb-4">
            <div className="flex items-center mr-3">
              {renderStars(product.rating)}
            </div>
            <span className="text-sm text-gray-600">
              {product.rating} ({product.reviews})
            </span>
          </div>

          <div className="space-y-3 mb-6">
            {product.buyPrice && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Buy Price:</span>
                <span className="font-bold text-xl text-green-600">₹{product.buyPrice.toLocaleString()}</span>
              </div>
            )}
            {product.rentPrice && (
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Rent/day:</span>
                <span className="font-bold text-xl text-purple-600">₹{product.rentPrice.toLocaleString()}</span>
              </div>
            )}
          </div>

          <div className="flex space-x-2">
            {product.buyPrice && (
              <Link
                to={`/product/${product.id}?type=buy`}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white px-4 py-3 rounded-xl text-sm font-medium hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 flex items-center justify-center shadow-lg"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Buy
              </Link>
            )}
            {product.rentPrice && (
              <Link
                to={`/product/${product.id}?type=rent`}
                className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-3 rounded-xl text-sm font-medium hover:from-purple-600 hover:to-purple-700 transition-all transform hover:scale-105 flex items-center justify-center shadow-lg"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Rent
              </Link>
            )}
          </div>
        </div>
      </div>
    </IntersectionObserver>
  );
}