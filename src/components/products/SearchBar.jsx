import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SearchBar = ({ onSearch, placeholder = "Search products name or reg no..." }) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value);
    }, 400); // 400ms debounce

    return () => clearTimeout(timer);
  }, [value, onSearch]);

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400 group-focus-within:text-green-500 transition-colors duration-300" />
        </div>
        <input
          type="text"
          className="block w-full pl-12 pr-12 py-5 bg-white border border-gray-100 rounded-[2rem] text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-4 focus:ring-green-500/10 focus:border-green-500/30 transition-all duration-300 shadow-xl shadow-gray-100/50"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <AnimatePresence>
          {value && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setValue('')}
              className="absolute inset-y-0 right-0 pr-5 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-5 w-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Decorative accent */}
      <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-[90%] h-px bg-gradient-to-r from-transparent via-green-500/20 to-transparent blur-sm" />
    </div>
  );
};

export default SearchBar;
