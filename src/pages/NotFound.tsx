import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search, ShoppingBag } from 'lucide-react';

export function NotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center px-4">
        {/* 404 Illustration */}
        <div className="mb-8">
          <div className="relative">
            <div className="text-9xl font-bold text-gray-200 select-none">404</div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-20 h-20 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Error Message */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Oops! Page Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          The page you're looking for seems to have wandered off. 
          Don't worry, let's get you back to discovering amazing fashion!
        </p>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all transform hover:scale-105"
          >
            <Home className="w-5 h-5 mr-2" />
            Go Home
          </Link>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/shop"
              className="inline-flex items-center border-2 border-purple-500 text-purple-500 px-6 py-3 rounded-xl font-semibold hover:bg-purple-50 transition-colors"
            >
              <Search className="w-5 h-5 mr-2" />
              Browse Shop
            </Link>
            
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Go Back
            </button>
          </div>
        </div>

        {/* Helpful Links */}
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 mb-4">Looking for something specific?</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link to="/about" className="text-purple-600 hover:text-purple-700 hover:underline">
              About Us
            </Link>
            <Link to="/contact" className="text-purple-600 hover:text-purple-700 hover:underline">
              Contact Support
            </Link>
            <Link to="/become-vendor" className="text-purple-600 hover:text-purple-700 hover:underline">
              Become a Vendor
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}