import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ShieldCheck, Zap, Info, Sprout, Bug, Settings, Share2 } from 'lucide-react';
import productsData from '../data/products.json';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const foundProduct = productsData.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      // If product not found, redirect to products list
      navigate('/products');
    }
    // Scroll to top on load
    window.scrollTo(0, 0);
  }, [id, navigate]);

  if (!product) return null;

  return (
    <div className="min-h-screen bg-[#F8FFFE] pt-24 pb-20">
      <div className="container-custom">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-green-700 font-bold hover:text-green-800 transition-colors group"
          >
            <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:shadow-md transition-all">
              <ChevronLeft size={20} />
            </div>
            Back to Products
          </Link>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Left: Sticky Image Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full lg:w-1/2"
          >
            <div className="relative aspect-square md:aspect-[4/3] lg:aspect-square rounded-[3rem] overflow-hidden shadow-2xl shadow-green-100/50 bg-white">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-6 left-6">
                <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-xs font-black text-green-700 uppercase tracking-widest shadow-sm">
                  {product.category}
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right: Content Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="w-full lg:w-1/2"
          >
            <div className="flex flex-col gap-10">
              {/* Title & Badge */}
              <div>
                <div className="flex items-center gap-3 mb-4">
                   <div className="h-1 w-10 bg-green-500 rounded-full" />
                   <span className="text-green-600 font-bold text-[10px] uppercase tracking-[0.3em]">Official Listing</span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 leading-tight mb-6 mt-2">
                  {product.name}
                </h1>
                
                {/* Registration Info */}
                <div className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-gray-100 shadow-sm inline-flex">
                  <div className="w-12 h-12 rounded-xl bg-green-50 flex items-center justify-center text-green-700 shadow-inner">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <p className="text-[9px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">Registration Number</p>
                    <p className="font-mono font-bold text-gray-900 text-base tracking-wider">
                      {product.regNo}
                    </p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="relative p-6 md:p-8 bg-green-50/50 rounded-[2rem] border border-green-100/50">
                <div className="absolute -top-3 -left-3 w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-green-600">
                  <Info size={20} />
                </div>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-semibold italic">
                  "{product.desc}"
                </p>
              </div>

              {/* Usage Details Grid */}
              <div className="grid grid-cols-1 gap-12">
                {/* Recommended Crops */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center text-green-700">
                      <Sprout size={20} />
                    </div>
                    <h3 className="font-bold uppercase tracking-widest text-sm text-gray-900">Recommended Crops</h3>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {product.details?.crops.split(',').map((crop, i) => (
                      <span key={i} className="px-6 py-3 bg-white text-green-700 rounded-2xl text-sm font-bold shadow-sm border border-gray-100 hover:border-green-200 hover:shadow-md transition-all">
                        {crop.trim()}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Target Pests */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center text-orange-700">
                        <Bug size={20} />
                      </div>
                      <h3 className="font-bold uppercase tracking-widest text-sm text-gray-900">Target Pests / Diseases</h3>
                    </div>
                    <div className="p-6 md:p-8 bg-white rounded-2xl border border-gray-100 shadow-sm leading-relaxed text-gray-600 font-semibold text-base md:text-lg">
                      {product.details?.pests}
                    </div>
                  </div>

                  {/* Application Guide */}
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700">
                        <Settings size={20} />
                      </div>
                      <h3 className="font-bold uppercase tracking-widest text-sm text-gray-900">Application Guide</h3>
                    </div>
                    <div className="p-6 md:p-8 bg-gradient-to-br from-gray-900 to-gray-800 rounded-[2rem] text-white shadow-xl shadow-gray-200">
                      <p className="text-base md:text-lg leading-relaxed opacity-90 font-medium font-sans">
                        {product.details?.usage}
                      </p>
                      <div className="mt-6 flex items-center justify-between">
                         <button className="px-5 py-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all flex items-center gap-2">
                           Download Manual
                           <Zap size={14} />
                         </button>
                         <button className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl transition-all">
                           <Share2 size={16} />
                         </button>
                      </div>
                    </div>
                  </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
