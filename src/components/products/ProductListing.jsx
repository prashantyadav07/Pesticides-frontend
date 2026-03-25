import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PackageSearch, RefreshCcw, ChevronLeft, ChevronRight, Filter } from 'lucide-react';
import ProductCard from './ProductCard';
import SearchBar from './SearchBar';
import ProductSkeleton from './ProductSkeleton';
import productsData from '../../data/products.json';

const ITEMS_PER_PAGE = 12;

// Extract unique categories (or define strictly based on requirements)
const CATEGORIES = ["All", "Insecticides", "Fungicides", "Herbicides", "Plant Growth Regulators", "Combined Solution"];

const ProductListing = () => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [isFilterSticky, setIsFilterSticky] = useState(false);

  // Simulate premium loading shimmer
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [activeCategory, searchQuery]);

  // Handle sticky filter strip
  useEffect(() => {
    const handleScroll = () => {
      const listingSection = document.getElementById('catalog');
      if (listingSection) {
        setIsFilterSticky(window.scrollY > listingSection.offsetTop - 80);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      const matchesSearch = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.regNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.desc.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = activeCategory === "All" || product.category === activeCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, activeCategory]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      document.getElementById('catalog').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="w-full relative">
      {/* Search & Categories */}
      <div className="mb-16">
        <SearchBar onSearch={setSearchQuery} />

        {/* Categories Strip */}
        <div className={`mt-10 transition-all duration-300 z-40 ${isFilterSticky ? 'fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-b border-[#0A7C5C]/10 shadow-[0_10px_30px_rgb(0,0,0,0.05)] py-4 px-6 md:px-12 flex justify-center' : ''}`}>
          <div className="flex items-center justify-start md:justify-center gap-2 overflow-x-auto pb-4 md:pb-0 scrollbar-hide w-full max-w-[90rem]">
            <div className={`mr-4 items-center gap-2 text-[#4A6670] font-bold text-sm tracking-widest uppercase hidden md:flex ${isFilterSticky ? 'hidden' : ''}`}>
               <Filter size={16} /> Filters
            </div>
            {CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`flex-shrink-0 px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 ${
                  activeCategory === category 
                    ? 'bg-[#0A1628] text-white shadow-[0_10px_20px_rgb(10,22,40,0.2)] scale-105' 
                    : 'bg-white text-[#4A6670] hover:bg-[#EEF8F4] hover:text-[#0A7C5C] shadow-sm'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
        
        {/* Results Info */}
        {!isFilterSticky && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-8 flex justify-between items-center bg-white px-8 py-4 rounded-2xl shadow-sm border border-[#EEF8F4]"
          >
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#0A7C5C] animate-pulse" />
              <span className="text-[#0A1628] font-bold">
                 Showing <span className="text-[#0A7C5C]">{filteredProducts.length}</span> Results
              </span>
            </div>
            {activeCategory !== 'All' && (
              <span className="text-xs font-bold px-3 py-1 bg-[#F0C860]/20 text-[#0A1628] rounded-full uppercase tracking-widest">
                {activeCategory}
              </span>
            )}
          </motion.div>
        )}
      </div>

      {/* Grid Section */}
      <div className="min-h-[500px]">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="skeleton"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {[...Array(8)].map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </motion.div>
          ) : filteredProducts.length > 0 ? (
            <motion.div
              key={`page-${currentPage}-${activeCategory}`}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
                {paginatedProducts.map((product, index) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    index={index} 
                  />
                ))}
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="flex flex-col items-center justify-center py-32 px-6 text-center bg-white rounded-[3rem] shadow-[0_4px_20px_rgb(0,0,0,0.02)] border border-[#EEF8F4]"
            >
              <div className="w-24 h-24 bg-[#0A7C5C]/5 rounded-full flex items-center justify-center mb-8 relative">
                 <div className="absolute inset-0 bg-[#0A7C5C] rounded-full blur-xl opacity-20" />
                 <PackageSearch size={48} className="text-[#0A7C5C] relative z-10" />
              </div>
              <h3 className="text-2xl font-black text-[#0A1628] mb-4">No Formulations Found</h3>
              <p className="text-[#4A6670] max-w-md mx-auto mb-10 text-sm leading-relaxed">
                We couldn't find any products matching your criteria. Try adjusting the category or search terms.
              </p>
              <button 
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('All');
                }}
                className="px-8 py-4 bg-[#0A1628] hover:bg-[#0A7C5C] text-white rounded-full font-bold tracking-wide transition-all duration-300 shadow-xl flex items-center gap-2"
              >
                <RefreshCcw size={18} />
                Reset Filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-20 flex justify-center items-center gap-3"
          >
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-[#0A1628] shadow-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#EEF8F4] hover:text-[#0A7C5C] transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            
            <div className="flex items-center gap-2 px-6 py-3 bg-white rounded-full shadow-[0_10px_30px_rgb(0,0,0,0.03)] border border-[#EEF8F4]">
              {[...Array(totalPages)].map((_, i) => {
                const isCurrent = currentPage === i + 1;
                return (
                  <button
                    key={i + 1}
                    onClick={() => handlePageChange(i + 1)}
                    className={`w-10 h-10 rounded-full font-black text-sm transition-all duration-300 ${
                      isCurrent
                        ? 'bg-[#0A7C5C] text-white shadow-[0_8px_20px_rgb(10,124,92,0.3)] scale-110'
                        : 'text-[#4A6670] hover:bg-[#EEF8F4] hover:text-[#0A1628]'
                    }`}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-14 h-14 rounded-full bg-white flex items-center justify-center text-[#0A1628] shadow-sm disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[#EEF8F4] hover:text-[#0A7C5C] transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProductListing;
