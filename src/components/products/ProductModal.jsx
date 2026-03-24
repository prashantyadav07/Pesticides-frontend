import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Zap, Info, Sprout, Bug, Settings } from 'lucide-react';

const ProductModal = ({ product, isOpen, onClose }) => {
  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 lg:p-8 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-[10px]"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl bg-white rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-10 p-3 bg-white/10 hover:bg-white/20 md:bg-gray-100 md:hover:bg-gray-200 text-white md:text-gray-900 rounded-full transition-all active:scale-90 shadow-lg"
            >
              <X size={24} />
            </button>

            {/* Left: Image Section */}
            <div className="md:w-5/12 relative min-h-[300px] md:min-h-full overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white">
                <span className="px-3 py-1 bg-green-500 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3 inline-block">
                  {product.category}
                </span>
                <h2 className="text-3xl font-black leading-tight text-white">{product.name}</h2>
              </div>
            </div>

            {/* Right: Content Section */}
            <div className="md:w-7/12 p-8 md:p-12 overflow-y-auto bg-white custom-scrollbar">
              <div className="flex flex-col gap-8">
                {/* Registration Info */}
                <div className="flex items-center gap-4 p-5 bg-gray-50 rounded-3xl border border-gray-100 shadow-sm">
                  <div className="w-12 h-12 rounded-2xl bg-green-100 flex items-center justify-center text-green-700 shadow-inner">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-0.5">Registration Number</p>
                    <p className="font-mono font-bold text-gray-900 tracking-wider">
                      {product.regNo}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <div className="flex items-center gap-2 mb-4 text-green-700">
                    <Info size={18} />
                    <h3 className="font-bold uppercase tracking-widest text-[11px]">Product Ovenview</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed font-medium text-lg italic">
                    "{product.desc}"
                  </p>
                </div>

                {/* Dynamic Details */}
                <div className="grid grid-cols-1 gap-8">
                  {/* Recommended Crops */}
                  <div>
                    <div className="flex items-center gap-2 mb-4 text-green-700">
                      <Sprout size={18} />
                      <h3 className="font-bold uppercase tracking-widest text-[11px]">Recommended Crops</h3>
                    </div>
                    <div className="flex flex-wrap gap-2.5">
                       {product.details?.crops.split(',').map((crop, i) => (
                         <span key={i} className="px-4 py-2 bg-green-50 text-green-700 rounded-xl text-xs font-bold border border-green-100/50 shadow-sm hover:bg-green-100 transition-colors">
                           {crop.trim()}
                         </span>
                       ))}
                    </div>
                  </div>

                  {/* Target Pests */}
                  <div>
                    <div className="flex items-center gap-2 mb-4 text-green-700">
                      <Bug size={18} />
                      <h3 className="font-bold uppercase tracking-widest text-[11px]">Target Pests / Diseases</h3>
                    </div>
                    <p className="text-gray-600 font-semibold leading-relaxed text-sm bg-gray-50/50 p-4 rounded-2xl border border-gray-100">
                      {product.details?.pests}
                    </p>
                  </div>

                  {/* Usage Guide */}
                  <div>
                    <div className="flex items-center gap-2 mb-4 text-green-700">
                      <Settings size={18} />
                      <h3 className="font-bold uppercase tracking-widest text-[11px]">Application Guide</h3>
                    </div>
                    <div className="p-5 bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl border border-emerald-100/50 text-emerald-900 text-sm font-semibold leading-relaxed shadow-sm">
                      {product.details?.usage}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="pt-8 mt-4 border-t border-gray-100">
                   <button 
                    className="w-full py-5 bg-gray-900 text-white rounded-3xl font-black text-lg flex items-center justify-center gap-4 hover:bg-green-600 transition-all active:scale-95 shadow-2xl shadow-gray-200 hover:shadow-green-200 uppercase tracking-widest"
                    onClick={onClose}
                   >
                     Close Product View
                     <Zap size={20} className="fill-current" />
                   </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProductModal;
