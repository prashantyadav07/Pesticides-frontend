import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, Star, ExternalLink, Activity } from 'lucide-react';

const ProductCard = ({ product, index }) => {
  return (
    <div className="h-full">
      <Link to={`/product/${product.id}`} className="block h-full outline-none focus:ring-4 focus:ring-[#0A7C5C]/20 rounded-[2.5rem]">
        <motion.div
          layout
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.5, delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="group relative bg-white rounded-[2.5rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] hover:shadow-[0_20px_40px_rgb(10,124,92,0.12)] transition-all duration-500 overflow-hidden flex flex-col h-full cursor-pointer isolate border border-transparent hover:border-[#1E90A0]/20"
        >
          {/* Top Image Section */}
          <div className="relative aspect-[16/8] w-full overflow-hidden bg-[#F8FFFE]">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/microbial-mat.png')]" />
            
            <motion.img
              src={product.image}
              alt={product.name}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              loading="lazy"
            />
            
            {/* Dark Gradient Overlay on Hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/80 via-[#0A1628]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />

            {/* Floating Badges */}
            <div className="absolute top-5 left-5 right-5 flex justify-between z-20">
              <span className="px-3.5 py-1.5 bg-white/90 backdrop-blur-md text-[10px] font-black uppercase tracking-widest text-[#0A7C5C] rounded-full shadow-sm border border-[#0A7C5C]/10">
                {product.category}
              </span>
              <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#F0C860] shadow-sm">
                <ShieldCheck size={16} />
              </div>
            </div>

            {/* Quick Hover Info */}
            <div className="absolute bottom-5 left-5 right-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 z-20 flex justify-between items-center delay-100">
               <div className="flex items-center gap-1.5 text-white">
                 <Activity size={14} className="text-[#F0C860]" />
                 <span className="text-xs font-bold tracking-wider uppercase">Active Formula</span>
               </div>
               <span className="text-[10px] font-bold text-white/80 bg-black/30 px-2 py-1 rounded backdrop-blur-sm">{product.type}</span>
            </div>
          </div>

          {/* Text Content */}
          <div className="p-4 md:p-5 flex flex-col flex-grow bg-white relative z-20">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5">
                <div className="flex -space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={8} className="fill-[#F0C860] text-[#F0C860]" />
                  ))}
                </div>
                <span className="text-[8px] font-black text-[#1E90A0] uppercase tracking-widest ml-1">Premium Grade</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#0A7C5C]">
                <ShieldCheck size={12} />
                <span className="text-[10px] font-mono font-bold tracking-tight">{product.regNo}</span>
              </div>
            </div>

            <h3 className="text-lg md:text-xl font-black text-[#0A1628] leading-tight mb-2 group-hover:text-[#0A7C5C] transition-colors duration-300 line-clamp-1">
              {product.name}
            </h3>

            <p className="text-xs text-[#4A6670] font-medium leading-relaxed mb-6 line-clamp-2">
              {product.desc}
            </p>

            <div className="mt-auto relative">
              {/* View Details Button - Morphing */}
              <div className="w-full h-[48px] bg-[#0A1628] group-hover:bg-[#0A7C5C] rounded-xl flex items-center justify-center gap-2 text-white font-bold text-sm tracking-wide transition-all duration-500 shadow-sm group-hover:shadow-[0_8px_25px_rgb(10,124,92,0.25)] overflow-hidden relative">
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-75 ease-out" />
                <span className="relative z-10">Discover More</span>
                <ExternalLink size={14} className="relative z-10 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </div>
            </div>
          </div>
        </motion.div>
      </Link>
    </div>
  );
};

export default ProductCard;
