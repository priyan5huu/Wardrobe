import React, { useState, useMemo } from 'react';
import { Search, Filter, SlidersHorizontal, Grid, List, MapPin, Star } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { SearchWithSuggestions } from '../components/SearchWithSuggestions';
import { IntersectionObserver } from '../components/IntersectionObserver';
import { mockProducts, categories, locations } from '../data/mockData';
import { Product } from '../types';

export function Shop() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [sortBy, setSortBy] = useState('latest');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 });
  const [rentalType, setRentalType] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [minRating, setMinRating] = useState(0);

  const filteredProducts = useMemo(() => {
    let filtered = mockProducts.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'All Categories' || product.category === selectedCategory;
      const matchesLocation = selectedLocation === 'All Locations' || product.location === selectedLocation;
      
      const price = product.buyPrice || product.rentPrice || 0;
      const matchesPrice = price >= priceRange.min && price <= priceRange.max;
      
      const matchesRentalType = rentalType === 'all' || 
                               (rentalType === 'buy' && product.buyPrice) ||
                               (rentalType === 'rent' && product.rentPrice);

      const matchesRating = product.rating >= minRating;

      return matchesSearch && matchesCategory && matchesLocation && matchesPrice && matchesRentalType && matchesRating;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => {
          const priceA = a.buyPrice || a.rentPrice || 0;
          const priceB = b.buyPrice || b.rentPrice || 0;
          return priceA - priceB;
        });
        break;
      case 'price-high':
        filtered.sort((a, b) => {
          const priceA = a.buyPrice || a.rentPrice || 0;
          const priceB = b.buyPrice || b.rentPrice || 0;
          return priceB - priceA;
        });
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'latest':
      default:
        break;
    }

    return filtered;
  }, [searchTerm, selectedCategory, selectedLocation, sortBy, priceRange, rentalType, minRating]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All Categories');
    setSelectedLocation('All Locations');
    setPriceRange({ min: 0, max: 50000 });
    setRentalType('all');
    setMinRating(0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <IntersectionObserver>
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Discover Amazing Fashion
              </h1>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                Explore {filteredProducts.length} curated items from verified vendors across India
              </p>
            </div>
          </IntersectionObserver>

          {/* Enhanced Search */}
          <div className="max-w-2xl mx-auto">
            <SearchWithSuggestions 
              onSearch={handleSearch}
              placeholder="Search for dresses, jackets, sarees..."
              className="w-full"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {['Designer Wear', 'Traditional', 'Casual', 'Formal', 'Wedding'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSearchTerm(filter.toLowerCase())}
                className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium hover:bg-white/30 transition-all border border-white/30"
              >
                {filter}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Enhanced Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-900 text-lg">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-purple-600 hover:text-purple-700 text-sm font-medium"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-6">
                {/* Category Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Location</label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>

                {/* Rental Type Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Type</label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { value: 'all', label: 'All' },
                      { value: 'buy', label: 'Buy' },
                      { value: 'rent', label: 'Rent' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setRentalType(option.value)}
                        className={`p-2 rounded-lg text-sm font-medium transition-all ${
                          rentalType === option.value
                            ? 'bg-purple-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Price Range: ₹{priceRange.min.toLocaleString()} - ₹{priceRange.max.toLocaleString()}
                  </label>
                  <div className="space-y-3">
                    <input
                      type="range"
                      min="0"
                      max="50000"
                      step="500"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: parseInt(e.target.value) }))}
                      className="w-full accent-purple-500"
                    />
                    <input
                      type="range"
                      min="0"
                      max="50000"
                      step="500"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) }))}
                      className="w-full accent-purple-500"
                    />
                  </div>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Minimum Rating</label>
                  <div className="flex space-x-2">
                    {[0, 3, 4, 4.5].map((rating) => (
                      <button
                        key={rating}
                        onClick={() => setMinRating(rating)}
                        className={`flex items-center px-3 py-2 rounded-lg text-sm transition-all ${
                          minRating === rating
                            ? 'bg-purple-500 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        <Star className="w-4 h-4 mr-1" />
                        {rating === 0 ? 'All' : `${rating}+`}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Enhanced Sort Bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <div className="flex items-center gap-4">
                <p className="text-gray-600 font-medium">
                  {filteredProducts.length} products found
                </p>
                
                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition-colors"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </button>
              </div>

              <div className="flex items-center gap-4">
                {/* View Mode Toggle */}
                <div className="hidden sm:flex bg-gray-100 rounded-xl p-1">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                    }`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-colors ${
                      viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                >
                  <option value="latest">Latest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Best Rated</option>
                  <option value="reviews">Most Reviewed</option>
                </select>
              </div>
            </div>

            {/* Active Filters */}
            {(searchTerm || selectedCategory !== 'All Categories' || selectedLocation !== 'All Locations' || rentalType !== 'all' || minRating > 0) && (
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {searchTerm && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800">
                      Search: {searchTerm}
                      <button
                        onClick={() => setSearchTerm('')}
                        className="ml-2 text-purple-600 hover:text-purple-800"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {selectedCategory !== 'All Categories' && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
                      {selectedCategory}
                      <button
                        onClick={() => setSelectedCategory('All Categories')}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {selectedLocation !== 'All Locations' && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800">
                      <MapPin className="w-3 h-3 mr-1" />
                      {selectedLocation}
                      <button
                        onClick={() => setSelectedLocation('All Locations')}
                        className="ml-2 text-green-600 hover:text-green-800"
                      >
                        ×
                      </button>
                    </span>
                  )}
                </div>
              </div>
            )}

            {/* Products */}
            {filteredProducts.length > 0 ? (
              <div className={`grid gap-8 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </div>
            ) : (
              <IntersectionObserver>
                <div className="text-center py-16">
                  <div className="text-gray-400 mb-6">
                    <Search className="w-24 h-24 mx-auto" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">No products found</h3>
                  <p className="text-gray-600 mb-8 max-w-md mx-auto">
                    We couldn't find any products matching your criteria. Try adjusting your filters or search terms.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="bg-purple-500 text-white px-6 py-3 rounded-xl hover:bg-purple-600 transition-colors"
                  >
                    Clear All Filters
                  </button>
                </div>
              </IntersectionObserver>
            )}

            {/* Load More Button */}
            {filteredProducts.length > 12 && (
              <div className="text-center mt-12">
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-xl hover:shadow-lg transition-all transform hover:scale-105 font-medium">
                  Load More Products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}