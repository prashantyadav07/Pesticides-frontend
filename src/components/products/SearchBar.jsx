import React, { useState, useEffect } from 'react';
import { Search, X, SlidersHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SearchBar = ({ onSearch, placeholder = "Search formulation, registration, or pest..." }) => {
  const [value, setValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(value);
    }, 300); // 300ms debounce
    return () => clearTimeout(timer);
  }, [value, onSearch]);

  return (
    <div className="relative w-full max-w-3xl mx-auto z-30">
      <motion.div 
        animate={{ 
          scale: isFocused ? 1.02 : 1,
          boxShadow: isFocused ? "0 25px 50px -12px rgb(10 124 92 / 0.15)" : "0 10px 30px -10px rgb(0 0 0 / 0.05)"
        }}
        transition={{ duration: 0.3 }}
        className="relative group bg-white rounded-full p-2 border border-[#0A7C5C]/10 flex items-center"
      >
        <div className="pl-6 pointer-events-none">
          <Search className={`h-6 w-6 transition-colors duration-300 ${isFocused ? 'text-[#0A7C5C]' : 'text-[#4A6670]'}`} />
        </div>
        
        <input
          type="text"
          className="block w-full pl-4 pr-12 py-4 bg-transparent text-[#0A1628] font-medium text-lg placeholder:text-[#4A6670]/60 focus:outline-none transition-all duration-300"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />

        <AnimatePresence>
          {value ? (
            <motion.button
              initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 90 }}
              onClick={() => setValue('')}
              className="absolute right-20 w-10 h-10 rounded-full flex items-center justify-center bg-[#EEF8F4] text-[#0A7C5C] hover:bg-[#0A7C5C] hover:text-white transition-colors"
            >
              <X size={18} strokeWidth={3} />
            </motion.button>
          ) : null}
        </AnimatePresence>

        <div className="w-14 h-14 rounded-full bg-[#0A1628] flex items-center justify-center text-white ml-2 flex-shrink-0 cursor-pointer shadow-lg">
          <SlidersHorizontal size={20} />
        </div>
      </motion.div>
    </div>
  );
};

export default SearchBar;
