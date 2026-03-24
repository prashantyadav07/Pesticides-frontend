import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PackageSearch, RefreshCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import SearchBar from './SearchBar';
import ProductSkeleton from './ProductSkeleton';
import productsData from '../../data/products.json';

const ITEMS_PER_PAGE = 12;

const ProductListing = () => {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  
  // Simulate initial loading for premium feel
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const filteredProducts = useMemo(() => {
    return productsData.filter((product) => {
      const searchLower = searchQuery.toLowerCase();
      return (
        product.name.toLowerCase().includes(searchLower) ||
        product.regNo.toLowerCase().includes(searchLower) ||
        product.category.toLowerCase().includes(searchLower)
      );
    });
  }, [searchQuery]);

  // Reset to first page when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredProducts.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProducts, currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo({ top: 400, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full">
      {/* Search Section */}
      <div className="mb-16">
        <SearchBar onSearch={setSearchQuery} />
        
        {/* Quick Stats */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 flex justify-center items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400"
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
            Showing {filteredProducts.length} Products
          </div>
          <div className="w-px h-3 bg-gray-200" />
          <div className="flex items-center gap-2">
            Professional Grade Solutions
          </div>
        </motion.div>
      </div>

      {/* Grid Section */}
      <div className="relative min-h-[400px]">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="skeleton-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              {[...Array(8)].map((_, i) => (
                <ProductSkeleton key={i} />
              ))}
            </motion.div>
          ) : filteredProducts.length > 0 ? (
            <div key="results-container">
              <motion.div
                key={`page-${currentPage}`}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              >
                  {paginatedProducts.map((product, index) => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      index={index} 
                    />
                  ))}
              </motion.div>

              {/* Pagination UI */}
              {totalPages > 1 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-20 flex justify-center items-center gap-2"
                >
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-3 rounded-2xl bg-white border border-gray-100 text-gray-400 hover:text-green-600 hover:border-green-100 disabled:opacity-30 disabled:hover:text-gray-400 disabled:hover:border-gray-100 transition-all duration-300 shadow-sm"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  
                  <div className="flex items-center gap-2 px-6 py-2 bg-white rounded-2xl border border-gray-100 shadow-sm">
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => handlePageChange(i + 1)}
                        className={`w-10 h-10 rounded-xl font-bold text-sm transition-all duration-300 ${
                          currentPage === i + 1
                            ? 'bg-green-600 text-white shadow-lg shadow-green-200 scale-110'
                            : 'text-gray-400 hover:text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-3 rounded-2xl bg-white border border-gray-100 text-gray-400 hover:text-green-600 hover:border-green-100 disabled:opacity-30 disabled:hover:text-gray-400 disabled:hover:border-gray-100 transition-all duration-300 shadow-sm"
                  >
                    <ChevronRight size={20} />
                  </button>
                </motion.div>
              )}
            </div>
          ) : (
            <motion.div
              key="empty-state"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center py-24 px-6 text-center bg-white rounded-[3rem] border border-dashed border-gray-200 shadow-sm"
            >
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-green-50 rounded-full blur-2xl opacity-60 scale-150" />
                <PackageSearch size={64} className="relative text-green-600/20" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No matching products</h3>
              <p className="text-gray-500 max-w-sm mb-8">
                We couldn't find any products matching "{searchQuery}". Try using different keywords or registration numbers.
              </p>
              <button 
                onClick={() => setSearchQuery('')}
                className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-2xl font-bold transition-all duration-300"
              >
                <RefreshCcw size={18} />
                Reset Search
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default ProductListing;
