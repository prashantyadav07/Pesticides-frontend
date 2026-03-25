import React from 'react';
import { motion } from 'framer-motion';

const ProductSkeleton = () => {
  return (
    <div className="bg-white rounded-[2.5rem] p-6 md:p-8 flex flex-col h-full overflow-hidden relative shadow-[0_4px_20px_rgb(0,0,0,0.02)] border border-[#EEF8F4]">
      {/* Shimmer Effect */}
      <motion.div 
        animate={{ x: ["-100%", "200%"] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 z-10 w-full h-full bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-12"
      />
      
      <div className="w-full aspect-[4/3] bg-[#EEF8F4] rounded-[1.5rem] mb-8" />
      
      <div className="flex gap-2 mb-4">
        <div className="h-3 bg-[#EEF8F4] rounded-full w-12" />
        <div className="h-3 bg-[#EEF8F4] rounded-full w-8" />
      </div>
      
      <div className="h-6 bg-[#EEF8F4] rounded-lg w-3/4 mb-4" />
      <div className="h-4 bg-[#EEF8F4] rounded-lg w-full mb-2" />
      <div className="h-4 bg-[#EEF8F4] rounded-lg w-5/6" />
      
      <div className="mt-auto pt-8">
        <div className="h-[52px] bg-[#EEF8F4] rounded-2xl w-full" />
      </div>
    </div>
  );
};

export default ProductSkeleton;
