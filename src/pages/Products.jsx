import React, { useState, useMemo, useCallback, memo } from 'react';
import { Search, Star, Eye, Package, X, Loader2, Shield, Leaf, Truck } from 'lucide-react';

// 1. STATIC DATA (Sample Data)
const CATEGORIES = ['All', 'Insecticides', 'Herbicides', 'Fungicides', 'Bio-Pesticides', 'Plant Growth Regulators', 'Soil Health'];

const ALL_PRODUCTS = [
  { id: 1, name: 'Terminator Plus', category: 'Insecticides', desc: 'Precision control for sucking and chewing pests.', rating: 5, image: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?w=400' },
  { id: 2, name: 'WeedShield Max', category: 'Herbicides', desc: 'Effective weed management for paddy and wheat.', rating: 5, image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=400' },
  { id: 3, name: 'BlastGuard Pro', category: 'Fungicides', desc: 'Systemic protection against fungal diseases.', rating: 5, image: 'https://images.unsplash.com/photo-1591130901921-3f0652bb3915?w=400' },
  { id: 4, name: 'EcoDefend Bio', category: 'Bio-Pesticides', desc: 'Nature-derived solutions for organic farming.', rating: 4, image: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?w=400' },
  { id: 5, name: 'YieldBooster Gold', category: 'Plant Growth Regulators', desc: 'Maximize fruit set and quality.', rating: 5, image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400' },
  { id: 6, name: 'SoilVitalize Prime', category: 'Soil Health', desc: 'Restore soil biology and water retention.', rating: 4, image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=400' },
];

// 2. OPTIMIZED CARD COMPONENT (Memoized to prevent re-renders)
const ProductCard = memo(({ product, onQuickView }) => {
  return (
    <div className="group bg-white rounded-2xl p-4 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/400?text=No+Image'; }}
        />
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button
            onClick={() => onQuickView(product)}
            className="bg-white p-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300"
          >
            <Eye className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>

      <div className="mt-4 text-left">
        <span className="text-[10px] font-bold uppercase tracking-wider text-green-700 bg-green-50 px-2 py-1 rounded">
          {product.category}
        </span>
        <h3 className="text-lg font-bold mt-2 text-gray-900 truncate">{product.name}</h3>
        <p className="text-xs text-gray-500 line-clamp-2 mt-1 min-h-[32px]">{product.desc}</p>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100">
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} className={i < product.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'} />
            ))}
          </div>
          <button className="text-xs font-bold text-green-600 hover:text-green-800 transition-colors">Inquire</button>
        </div>
      </div>
    </div>
  );
});

// 3. MAIN COMPONENT
export default function Products() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredData = useMemo(() => {
    return ALL_PRODUCTS.filter(item => {
      const matchCat = activeCategory === 'All' || item.category === activeCategory;
      const matchSearch = item.name.toLowerCase().includes(query.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [query, activeCategory]);

  const handleQuickView = useCallback((p) => setSelectedProduct(p), []);

  return (
    // YAHAN CHANGE KIYA HAI: py-12 ko hata kar pt-32 pb-12 lagaya hai navbar se bachne ke liye
    <div className="min-h-screen bg-gray-50 pt-32 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">

        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            Our <span className="text-green-600">Premium Range</span>
          </h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            High-quality agricultural solutions for sustainable farming and better crop yields.
          </p>

          {/* Search Bar */}
          <div className="mt-8 relative max-w-md mx-auto">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-4 border border-gray-200 rounded-2xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm shadow-sm transition-all"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 mb-10 pb-2 justify-start md:justify-center">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-6 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-200 ${activeCategory === cat
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-white text-gray-500 hover:bg-gray-100 border border-gray-100'
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredData.length > 0 ? (
            filteredData.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={handleQuickView}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
              <Package className="mx-auto h-12 w-12 text-gray-300" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No products found</h3>
              <p className="mt-1 text-sm text-gray-500">Try adjusting your search or category filter.</p>
            </div>
          )}
        </div>

        {/* SECTION 1: Features / Why Choose Us */}
        <div className="mt-24 mb-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900">Why Choose Us?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center flex flex-col items-center">
              <div className="bg-green-50 p-4 rounded-full mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Certified Quality</h3>
              <p className="text-gray-500 mt-2 text-sm">All our products are rigorously tested and certified for safe agricultural use.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center flex flex-col items-center">
              <div className="bg-green-50 p-4 rounded-full mb-4">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Eco-Friendly</h3>
              <p className="text-gray-500 mt-2 text-sm">Providing a wide range of bio-pesticides and organic solutions for sustainable farming.</p>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center flex flex-col items-center">
              <div className="bg-green-50 p-4 rounded-full mb-4">
                <Truck className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Fast Delivery</h3>
              <p className="text-gray-500 mt-2 text-sm">Nationwide quick delivery network ensuring your crops get protected right on time.</p>
            </div>
          </div>
        </div>

        {/* SECTION 2: Newsletter / Call to Action */}
        <div className="mt-16 mb-8 bg-green-700 rounded-[2.5rem] p-8 md:p-12 text-center text-white shadow-xl">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-extrabold mb-4">Grow Better With Us</h2>
            <p className="text-green-100 mb-8">Subscribe to our newsletter to receive the latest updates on modern agricultural solutions, new products, and seasonal tips.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <input
                type="email"
                placeholder="Enter your email address"
                className="px-6 py-4 rounded-full text-gray-900 w-full max-w-sm focus:outline-none focus:ring-4 focus:ring-green-400 shadow-sm"
              />
              <button className="bg-yellow-400 text-yellow-900 font-bold px-8 py-4 rounded-full hover:bg-yellow-300 transition-colors shadow-sm whitespace-nowrap">
                Subscribe Now
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Simplified Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl overflow-hidden max-w-lg w-full shadow-2xl relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-10"
            >
              <X size={20} className="text-gray-600" />
            </button>

            <div className="aspect-video bg-gray-100">
              <img src={selectedProduct.image} className="w-full h-full object-cover" alt={selectedProduct.name} />
            </div>

            <div className="p-8 text-left">
              <h2 className="text-2xl font-bold text-gray-900">{selectedProduct.name}</h2>
              <span className="inline-block mt-2 text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                {selectedProduct.category}
              </span>
              <p className="mt-4 text-gray-600 leading-relaxed text-sm">
                {selectedProduct.desc}
              </p>

              <div className="mt-8 flex gap-3">
                <button className="flex-1 bg-green-600 text-white py-3 rounded-xl font-bold hover:bg-green-700 transition-colors shadow-lg shadow-green-200">
                  Inquire Now
                </button>
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="px-6 py-3 border border-gray-200 rounded-xl font-bold text-gray-600 hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}