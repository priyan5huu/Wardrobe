import React from 'react';
import { Users, Heart, Leaf, Award, Target, Eye } from 'lucide-react';

export function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            About Cloud Wardrobe
          </h1>
          <p className="text-xl opacity-90 leading-relaxed">
            We're revolutionizing fashion consumption by creating a sustainable, 
            community-driven marketplace where style meets responsibility.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-purple-100 p-3 rounded-xl mr-4">
                  <Target className="w-8 h-8 text-purple-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                To democratize fashion by making premium clothing accessible to everyone 
                through innovative rental models, while empowering local vendors and 
                promoting sustainable consumption practices.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We believe that everyone deserves to look and feel their best, regardless 
                of their budget. By connecting fashion lovers with local vendors, we're 
                building a community that values both style and sustainability.
              </p>
            </div>
            
            <div>
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-3 rounded-xl mr-4">
                  <Eye className="w-8 h-8 text-blue-600" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Our Vision</h2>
              </div>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                To become India's most trusted fashion marketplace, where sustainability 
                meets style, and where every individual has the opportunity to participate 
                in the fashion economy.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We envision a future where fashion is circular, communities are empowered, 
                and style is accessible to all. Through technology and community building, 
                we're making this vision a reality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              These principles guide everything we do and shape our commitment to our community.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Sustainability</h3>
              <p className="text-gray-600 text-sm">
                Promoting circular fashion and reducing environmental impact through 
                rental and reuse models.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Community</h3>
              <p className="text-gray-600 text-sm">
                Building a supportive ecosystem where vendors and customers 
                thrive together.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Accessibility</h3>
              <p className="text-gray-600 text-sm">
                Making fashion accessible to everyone, regardless of budget 
                or background.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Quality</h3>
              <p className="text-gray-600 text-sm">
                Ensuring every item meets our high standards for quality 
                and customer satisfaction.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Story
            </h2>
            <p className="text-xl text-gray-600">
              From idea to impact - how Cloud Wardrobe came to life
            </p>
          </div>

          <div className="space-y-8">
            <div className="bg-gray-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">The Problem We Saw</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                We noticed that many people had beautiful clothes they rarely wore, while others 
                couldn't afford to buy quality fashion items for special occasions. Simultaneously, 
                small fashion businesses struggled to reach customers and compete with large retailers.
              </p>
            </div>

            <div className="bg-purple-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Solution</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Cloud Wardrobe was born as a platform that connects fashion owners with fashion lovers. 
                We created a system where people can rent high-quality items for special occasions, 
                while vendors can earn from their existing inventory and build sustainable businesses.
              </p>
            </div>

            <div className="bg-green-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">The Impact Today</h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Today, Cloud Wardrobe serves thousands of customers across India, has empowered 
                hundreds of vendors to build successful businesses, and has contributed to reducing 
                fashion waste by promoting rental and reuse models.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-xl opacity-90">
              See how we're making a difference in the fashion industry
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">10,000+</div>
              <p className="text-lg opacity-90">Happy Customers</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">500+</div>
              <p className="text-lg opacity-90">Active Vendors</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">25,000+</div>
              <p className="text-lg opacity-90">Fashion Items</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">50+</div>
              <p className="text-lg opacity-90">Cities Served</p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Join Our Fashion Revolution
          </h2>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Whether you're looking to discover amazing fashion pieces or start your own 
            fashion business, Cloud Wardrobe is here to support your journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/shop"
              className="bg-purple-500 text-white px-8 py-4 rounded-xl font-semibold hover:bg-purple-600 transition-colors"
            >
              Start Shopping
            </a>
            <a
              href="/become-vendor"
              className="border-2 border-purple-500 text-purple-500 px-8 py-4 rounded-xl font-semibold hover:bg-purple-50 transition-colors"
            >
              Become a Vendor
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}