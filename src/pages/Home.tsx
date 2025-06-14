import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Users, ShoppingBag, Sparkles, TrendingUp, Shield, Heart } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { IntersectionObserver } from '../components/IntersectionObserver';
import { ParallaxSection } from '../components/ParallaxSection';
import { mockProducts } from '../data/mockData';
import { useNotificationActions } from '../hooks/useNotificationActions';

export function Home() {
  const { success, info } = useNotificationActions();
  const featuredProducts = mockProducts.slice(0, 4);

  useEffect(() => {
    // Welcome notification for new users
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setTimeout(() => {
        info(
          'Welcome to Cloud Wardrobe! 👋',
          'Discover amazing fashion items from verified vendors across India.',
          {
            duration: 8000,
            action: {
              label: 'Explore Now',
              onClick: () => window.location.href = '/shop'
            }
          }
        );
      }, 2000);
      localStorage.setItem('hasVisited', 'true');
    }
  }, [info]);

  const handleGetStarted = () => {
    success(
      'Ready to explore! 🎉',
      'Browse thousands of fashion items from trusted vendors.',
      { duration: 4000 }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-purple-600 via-purple-500 to-pink-500 dark:from-purple-800 dark:via-purple-700 dark:to-pink-700">
        <div className="absolute inset-0 bg-black/10 dark:bg-black/20" />
        <ParallaxSection speed={0.3}>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <IntersectionObserver animationClass="animate-fade-in-left">
                <div className="text-white">
                  <div className="inline-flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                    <Sparkles className="w-4 h-4 mr-2" />
                    <span className="text-sm font-medium">India's Premier Fashion Marketplace</span>
                  </div>
                  
                  <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
                    Fashion That
                    <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                      Fits Your Life
                    </span>
                  </h1>
                  
                  <p className="text-xl lg:text-2xl mb-8 text-white/90 leading-relaxed">
                    Rent or buy premium fashion from verified vendors. 
                    From designer wear to everyday essentials, find your perfect style.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-4 mb-12">
                    <Link
                      to="/shop"
                      onClick={handleGetStarted}
                      className="inline-flex items-center bg-white text-purple-600 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
                    >
                      Start Shopping
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                    <Link
                      to="/become-vendor"
                      className="inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-purple-600 transition-all"
                    >
                      Become a Vendor
                    </Link>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-8">
                    <div className="text-center">
                      <div className="text-3xl lg:text-4xl font-bold mb-2">
                        <AnimatedCounter end={10000} suffix="+" />
                      </div>
                      <div className="text-white/80">Happy Customers</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl lg:text-4xl font-bold mb-2">
                        <AnimatedCounter end={500} suffix="+" />
                      </div>
                      <div className="text-white/80">Verified Vendors</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl lg:text-4xl font-bold mb-2">
                        <AnimatedCounter end={25000} suffix="+" />
                      </div>
                      <div className="text-white/80">Fashion Items</div>
                    </div>
                  </div>
                </div>
              </IntersectionObserver>

              <IntersectionObserver animationClass="animate-fade-in-right">
                <div className="relative">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-4">
                      <img
                        src="https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=400"
                        alt="Fashion 1"
                        className="w-full h-64 object-cover rounded-2xl shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500"
                      />
                      <img
                        src="https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg?auto=compress&cs=tinysrgb&w=400"
                        alt="Fashion 2"
                        className="w-full h-48 object-cover rounded-2xl shadow-2xl transform -rotate-2 hover:rotate-0 transition-transform duration-500"
                      />
                    </div>
                    <div className="space-y-4 mt-8">
                      <img
                        src="https://images.pexels.com/photos/3621104/pexels-photo-3621104.jpeg?auto=compress&cs=tinysrgb&w=400"
                        alt="Fashion 3"
                        className="w-full h-48 object-cover rounded-2xl shadow-2xl transform -rotate-3 hover:rotate-0 transition-transform duration-500"
                      />
                      <img
                        src="https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400"
                        alt="Fashion 4"
                        className="w-full h-64 object-cover rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500"
                      />
                    </div>
                  </div>
                  
                  {/* Floating elements */}
                  <div className="absolute -top-4 -left-4 bg-white/20 backdrop-blur-sm rounded-full p-4 animate-float">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -bottom-4 -right-4 bg-white/20 backdrop-blur-sm rounded-full p-4 animate-float" style={{ animationDelay: '1s' }}>
                    <Star className="w-6 h-6 text-white" />
                  </div>
                </div>
              </IntersectionObserver>
            </div>
          </div>
        </ParallaxSection>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <IntersectionObserver>
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Why Choose Cloud Wardrobe?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Experience fashion like never before with our innovative platform that connects you with the best vendors across India.
              </p>
            </div>
          </IntersectionObserver>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Shield,
                title: 'Verified Vendors',
                description: 'All our vendors are thoroughly verified for quality and authenticity.',
                color: 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400'
              },
              {
                icon: TrendingUp,
                title: 'Best Prices',
                description: 'Competitive pricing with flexible rental and purchase options.',
                color: 'bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
              },
              {
                icon: Users,
                title: 'Community Driven',
                description: 'Join thousands of fashion enthusiasts in our growing community.',
                color: 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400'
              },
              {
                icon: ShoppingBag,
                title: 'Easy Shopping',
                description: 'Seamless shopping experience with secure payments and fast delivery.',
                color: 'bg-pink-100 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400'
              }
            ].map((feature, index) => (
              <IntersectionObserver key={index} animationClass="animate-fade-in-up">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-2xl p-8 text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                  <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
                </div>
              </IntersectionObserver>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <IntersectionObserver>
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Featured Collections
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Discover our handpicked selection of trending fashion items from top-rated vendors.
              </p>
            </div>
          </IntersectionObserver>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          <IntersectionObserver>
            <div className="text-center">
              <Link
                to="/shop"
                className="inline-flex items-center bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-xl transition-all transform hover:scale-105"
              >
                View All Products
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
          </IntersectionObserver>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-800 dark:to-pink-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <IntersectionObserver>
            <div className="text-white">
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                Ready to Transform Your Wardrobe?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of fashion lovers who have already discovered their perfect style with Cloud Wardrobe.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/shop"
                  className="inline-flex items-center bg-white text-purple-600 px-8 py-4 rounded-2xl font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-xl"
                >
                  Start Shopping Now
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  to="/become-vendor"
                  className="inline-flex items-center border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-purple-600 transition-all"
                >
                  Become a Partner
                </Link>
              </div>
            </div>
          </IntersectionObserver>
        </div>
      </section>
    </div>
  );
}