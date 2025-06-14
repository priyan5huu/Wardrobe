import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, Calendar, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export function Cart() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    } else {
      dispatch({ 
        type: 'UPDATE_CART_ITEM', 
        payload: { productId, updates: { quantity: newQuantity } }
      });
    }
  };

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  const calculateItemTotal = (item: any) => {
    if (item.type === 'buy') {
      return (item.product.buyPrice || 0) * item.quantity;
    } else {
      const rentTotal = (item.rentDays || 0) * (item.product.rentPrice || 0);
      const securityDeposit = item.product.securityDeposit || 0;
      return rentTotal + securityDeposit;
    }
  };

  const totalAmount = state.cart.reduce((total, item) => total + calculateItemTotal(item), 0);
  const totalItems = state.cart.reduce((total, item) => total + item.quantity, 0);

  if (state.cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <ShoppingBag className="w-24 h-24 mx-auto text-gray-300 mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Discover amazing fashion items and add them to your cart</p>
          <Link
            to="/shop"
            className="inline-flex items-center bg-purple-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-purple-600 transition-colors"
          >
            Start Shopping
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-2">{totalItems} items in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.cart.map((item) => (
              <div key={`${item.product.id}-${item.type}`} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="p-6">
                  <div className="flex items-start space-x-4">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {item.product.name}
                          </h3>
                          <p className="text-sm text-gray-500 mb-2">
                            by {item.product.vendor} • {item.product.location}
                          </p>
                          
                          <div className="flex items-center space-x-2 mb-3">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              item.type === 'buy' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-purple-100 text-purple-800'
                            }`}>
                              {item.type === 'buy' ? 'Purchase' : 'Rental'}
                            </span>
                          </div>

                          {item.type === 'rent' && item.deliveryDate && item.returnDate && (
                            <div className="text-sm text-gray-600 mb-3">
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {new Date(item.deliveryDate).toLocaleDateString()} - {new Date(item.returnDate).toLocaleDateString()}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                {item.rentDays} days rental
                              </div>
                            </div>
                          )}
                        </div>

                        <button
                          onClick={() => removeItem(item.product.id)}
                          className="text-red-500 hover:text-red-700 p-2"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-semibold w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          {item.type === 'buy' ? (
                            <div className="text-xl font-bold text-gray-900">
                              ₹{((item.product.buyPrice || 0) * item.quantity).toLocaleString()}
                            </div>
                          ) : (
                            <div>
                              <div className="text-sm text-gray-600">
                                Rent: ₹{((item.rentDays || 0) * (item.product.rentPrice || 0)).toLocaleString()}
                              </div>
                              <div className="text-sm text-gray-600">
                                Deposit: ₹{(item.product.securityDeposit || 0).toLocaleString()}
                              </div>
                              <div className="text-xl font-bold text-gray-900">
                                ₹{calculateItemTotal(item).toLocaleString()}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-6">
                {state.cart.map((item) => (
                  <div key={`${item.product.id}-${item.type}`} className="flex justify-between text-sm">
                    <span className="text-gray-600">
                      {item.product.name} ({item.type}) x{item.quantity}
                    </span>
                    <span className="font-medium">
                      ₹{calculateItemTotal(item).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{totalAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-600">Delivery</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>₹{totalAmount.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-semibold hover:shadow-lg transition-all"
              >
                Proceed to Checkout
              </button>

              <Link
                to="/shop"
                className="block text-center text-purple-600 hover:text-purple-700 mt-4 font-medium"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}