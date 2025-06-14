import React, { useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { Star, MapPin, Shield, Truck, Calendar, ShoppingCart, Heart, Share2, ArrowLeft } from 'lucide-react';
import { mockProducts } from '../data/mockData';
import { useApp } from '../context/AppContext';

export function ProductDetail() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { dispatch } = useApp();
  
  const product = mockProducts.find(p => p.id === id);
  const initialType = searchParams.get('type') as 'buy' | 'rent' || 'buy';
  
  const [selectedType, setSelectedType] = useState<'buy' | 'rent'>(initialType);
  const [selectedImage, setSelectedImage] = useState(0);
  const [deliveryDate, setDeliveryDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product not found</h2>
          <button
            onClick={() => navigate('/shop')}
            className="text-purple-600 hover:text-purple-700"
          >
            Back to Shop
          </button>
        </div>
      </div>
    );
  }

  const calculateRentDays = () => {
    if (!deliveryDate || !returnDate) return 0;
    const delivery = new Date(deliveryDate);
    const returnD = new Date(returnDate);
    const diffTime = returnD.getTime() - delivery.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1;
    return Math.max(0, diffDays);
  };

  const rentDays = calculateRentDays();
  const rentTotal = rentDays * (product.rentPrice || 0);
  const securityDeposit = product.securityDeposit || 0;
  const totalAmount = selectedType === 'buy' 
    ? (product.buyPrice || 0) * quantity
    : rentTotal + securityDeposit;

  const handleAddToCart = () => {
    const cartItem = {
      product,
      type: selectedType,
      quantity,
      ...(selectedType === 'rent' && {
        deliveryDate,
        returnDate,
        rentDays
      })
    };

    dispatch({ type: 'ADD_TO_CART', payload: cartItem });
    
    // Show success message or redirect to cart
    navigate('/cart');
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  const getMinReturnDate = () => {
    if (!deliveryDate) return getTomorrowDate();
    const delivery = new Date(deliveryDate);
    delivery.setDate(delivery.getDate() + 2);
    return delivery.toISOString().split('T')[0];
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-2xl bg-white shadow-sm">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square rounded-lg overflow-hidden ${
                      selectedImage === index ? 'ring-2 ring-purple-500' : ''
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                {product.location} • {product.vendor}
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              <div className="flex items-center mb-6">
                <div className="flex items-center mr-4">
                  {renderStars(product.rating)}
                </div>
                <span className="text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags.map(tag => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Type Selection */}
            {product.rentalType === 'both' && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold mb-4">Choose Option</h3>
                <div className="grid grid-cols-2 gap-4">
                  {product.buyPrice && (
                    <button
                      onClick={() => setSelectedType('buy')}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        selectedType === 'buy'
                          ? 'border-green-500 bg-green-50'
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                    >
                      <div className="text-center">
                        <ShoppingCart className="w-6 h-6 mx-auto mb-2 text-green-600" />
                        <div className="font-semibold">Buy</div>
                        <div className="text-2xl font-bold text-green-600">
                          ₹{product.buyPrice.toLocaleString()}
                        </div>
                      </div>
                    </button>
                  )}
                  
                  {product.rentPrice && (
                    <button
                      onClick={() => setSelectedType('rent')}
                      className={`p-4 rounded-lg border-2 transition-colors ${
                        selectedType === 'rent'
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                    >
                      <div className="text-center">
                        <Calendar className="w-6 h-6 mx-auto mb-2 text-purple-600" />
                        <div className="font-semibold">Rent</div>
                        <div className="text-2xl font-bold text-purple-600">
                          ₹{product.rentPrice.toLocaleString()}/day
                        </div>
                      </div>
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Rent Configuration */}
            {selectedType === 'rent' && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold mb-4">Rental Details</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Delivery Date
                    </label>
                    <input
                      type="date"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      min={getTomorrowDate()}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Return Date
                    </label>
                    <input
                      type="date"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      min={getMinReturnDate()}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {deliveryDate && returnDate && rentDays > 0 && (
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span>Rental Period:</span>
                      <span className="font-semibold">{rentDays} days</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span>Rent Total:</span>
                      <span className="font-semibold">₹{rentTotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center mb-2">
                      <span>Security Deposit:</span>
                      <span className="font-semibold">₹{securityDeposit.toLocaleString()}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between items-center font-bold text-lg">
                      <span>Total Amount:</span>
                      <span>₹{totalAmount.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-2">
                      *Security deposit will be refunded after item return
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Quantity for Buy */}
            {selectedType === 'buy' && (
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold mb-4">Quantity</h3>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="text-xl font-semibold w-8 text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                  >
                    +
                  </button>
                </div>
                
                <div className="mt-4 p-4 bg-green-50 rounded-lg">
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Total Amount:</span>
                    <span>₹{totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleAddToCart}
                disabled={selectedType === 'rent' && (!deliveryDate || !returnDate || rentDays <= 0)}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {selectedType === 'buy' ? 'Add to Cart' : 'Rent Now'}
              </button>
              
              <div className="flex space-x-3">
                <button className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 flex items-center justify-center">
                  <Heart className="w-5 h-5 mr-2" />
                  Save
                </button>
                <button className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 flex items-center justify-center">
                  <Share2 className="w-5 h-5 mr-2" />
                  Share
                </button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              <div className="text-center">
                <Shield className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <div className="text-sm font-medium">Verified Vendor</div>
              </div>
              <div className="text-center">
                <Truck className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <div className="text-sm font-medium">Free Delivery</div>
              </div>
              <div className="text-center">
                <Calendar className="w-8 h-8 mx-auto mb-2 text-purple-600" />
                <div className="text-sm font-medium">Easy Returns</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}