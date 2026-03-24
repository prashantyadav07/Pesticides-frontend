import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shovel as Shield, Star, ExternalLink, Zap } from 'lucide-react';

const ProductCard = ({ product, index }) => {
  return (
    <Link to={`/product/${product.id}`} className="block h-full">
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
        whileHover={{ y: -8 }}
        className="group relative bg-white rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-green-100/50 transition-all duration-500 overflow-hidden flex flex-col h-full cursor-pointer"
      >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
        <motion.img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md text-[10px] font-bold uppercase tracking-wider text-green-700 rounded-full shadow-sm border border-white/20">
            {product.type || product.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-green-700 transition-colors duration-300">
            {product.name}
          </h3>
        </div>

        <div className="flex items-center gap-2 mb-3">
          <div className="flex -space-x-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
            ))}
          </div>
          <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-tighter">Premium Grade</span>
        </div>

        <p className="text-sm text-gray-500 line-clamp-2 mb-5 font-medium leading-relaxed">
          {product.desc}
        </p>

        <div className="mt-auto">
          <div className="flex flex-col gap-1.5 mb-5 p-3 bg-gray-50 rounded-2xl border border-gray-100/50">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Registration No:</span>
            <code className="text-xs font-mono font-bold text-gray-700 truncate">
              {product.regNo}
            </code>
          </div>

          <button className="w-full py-3.5 px-4 bg-gray-900 text-white rounded-2xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-green-600 transition-all duration-300 active:scale-95 shadow-lg shadow-gray-200 hover:shadow-green-200">
            View Details
            <ExternalLink size={14} />
          </button>
        </div>
      </div>

      {/* Subtle Glow Effect on Hover */}
      <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-[2rem] blur opacity-0 group-hover:opacity-10 transition duration-500 -z-10" />
    </motion.div>
    </Link>
  );
};

export default ProductCard;
