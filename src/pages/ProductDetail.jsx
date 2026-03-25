import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, ShieldCheck, Zap, Sprout, Bug, Settings, Share2, Award, TestTube2, CheckCircle2, Activity } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import productsData from '../data/products.json';

gsap.registerPlugin(ScrollTrigger);

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const foundProduct = productsData.find(p => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      navigate('/products');
    }
    window.scrollTo(0, 0);
  }, [id, navigate]);

  // Hide global nav/footer & Inject Fonts
  useEffect(() => {
    const styleId = 'premium-pdp-styles';
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      style.innerHTML = `
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&display=swap');
        .font-outfit { font-family: 'Outfit', sans-serif; }
        body { background-color: #F8FFFE; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #EEF8F4; }
        ::-webkit-scrollbar-thumb { background: #0A7C5C; border-radius: 4px; }
      `;
      document.head.appendChild(style);
    }
    return () => {
      const styleEl = document.getElementById(styleId);
      if (styleEl) document.head.removeChild(styleEl);
    };
  }, []);

  // GSAP ScrollTrigger Animations
  useEffect(() => {
    if (!product || !containerRef.current) return;

    let ctx = gsap.context(() => {
      // Pin image section on desktop
      ScrollTrigger.matchMedia({
        "(min-width: 1024px)": function () {
          gsap.to(".sticky-image-container", {
            scrollTrigger: {
              trigger: ".product-layout",
              start: "top top",
              end: "bottom bottom",
              pin: ".sticky-image-container",
              pinSpacing: false,
            }
          });
        }
      });

      // Animate content sections fading in
      const sections = gsap.utils.toArray('.content-section');
      sections.forEach((section) => {
        gsap.from(section, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
          }
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, [product]);

  if (!product) return null;

  return (
    <div ref={containerRef} className="bg-[#F8FBFA] font-outfit text-[#1D2B36] min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-white md:rounded-3xl md:shadow-sm md:border border-gray-100 overflow-hidden">
        
        {/* Back Button Action Area */}
        <div className="py-4 md:py-6 border-b border-gray-100 flex items-center">
          <Link 
            to="/products" 
            className="flex items-center gap-1.5 text-xs md:text-sm font-bold text-gray-400 hover:text-[#0A7C5C] transition-colors shrink-0"
          >
            <ChevronLeft size={18} />
            <span className="uppercase tracking-[0.2em]">{product.category} CATALOGE</span>
          </Link>
          <div className="h-4 w-px bg-gray-200 mx-4 hidden sm:block" />
          <span className="text-xs md:text-sm text-[#1D2B36] font-bold truncate max-w-[150px] sm:max-w-none hidden sm:block">
            {product.name}
          </span>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 py-8 md:py-12">
          
          {/* Left Column: Image Gallery/Viewer */}
          <div className="flex flex-col gap-4">
            <div className="w-full aspect-square bg-[#F4F9F8] rounded-2xl md:rounded-3xl flex items-center justify-center p-8 border border-gray-50 group">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            {/* Minimalist Tech Specs purely for visual balance under image */}
            <div className="grid grid-cols-2 gap-3 mt-2">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex flex-col items-center justify-center text-center">
                <ShieldCheck size={20} className="text-[#0A7C5C] mb-2" />
                <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1">Registration</span>
                <span className="text-xs font-mono font-bold text-[#1D2B36]">{product.regNo}</span>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 flex flex-col items-center justify-center text-center">
                <Activity size={20} className="text-[#1E90A0] mb-2" />
                <span className="text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-1">Formulation</span>
                <span className="text-xs font-bold text-[#1D2B36]">{product.type}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Product Details */}
          <div className="flex flex-col">
            
            {/* Badges & Title */}
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="px-3 py-1 bg-[#E8F5F1] text-[#0A7C5C] text-xs font-bold uppercase tracking-wider rounded-md">
                  {product.category}
                </span>
                <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-bold uppercase tracking-wider rounded-md">
                  Premium Grade
                </span>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#1D2B36] leading-tight tracking-tight mb-4">
                {product.name}
              </h1>
              
              <p className="text-base md:text-lg text-gray-600 leading-relaxed">
                {product.desc}
              </p>
            </div>

            {/* Structured Information List */}
            <div className="space-y-4 mb-8">
              {/* Crops Segment */}
              <div className="border border-gray-100 rounded-2xl p-5 hover:border-[#0A7C5C]/30 transition-colors bg-white">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-[#E8F5F1] rounded-lg text-[#0A7C5C]">
                    <Sprout size={20} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-base">Recommended Crops</h3>
                </div>
                <div className="flex flex-wrap gap-2 pl-[52px]">
                  {product.details?.crops.split(',').map((crop, i) => (
                    <span key={i} className="text-sm font-medium text-gray-600 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded w-fit">
                      {crop.trim()}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pests Segment */}
              <div className="border border-gray-100 rounded-2xl p-5 hover:border-[#F0C860]/50 transition-colors bg-white">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-[#FEF8E6] rounded-lg text-[#D4A017]">
                    <Bug size={20} />
                  </div>
                  <h3 className="font-bold text-gray-900 text-base">Target Eradication</h3>
                </div>
                <div className="flex flex-wrap gap-2 pl-[52px]">
                  {product.details?.pests.split(',').map((pest, i) => (
                    <span key={i} className="text-sm font-medium text-gray-600 bg-gray-50 border border-gray-200 px-2.5 py-1 rounded w-fit">
                      {pest.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Area */}
            <div className="mt-auto flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-100">
              <button className="flex-1 flex items-center justify-center gap-2 bg-[#0A1628] hover:bg-[#0A7C5C] text-white py-4 px-6 rounded-xl font-bold text-sm transition-colors shadow-sm">
                Request Bulk Quote
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 text-[#1D2B36] py-4 px-6 rounded-xl font-bold text-sm transition-colors shadow-sm">
                <TestTube2 size={16} className="text-gray-500" />
                View Safety Data
              </button>
            </div>
            
          </div>
        </div>

        {/* Bottom Section: Application Guidelines */}
        <div className="border-t border-gray-100 py-10 md:py-16 mt-4">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            <div className="md:col-span-1">
              <h2 className="text-2xl md:text-3xl font-black text-[#1D2B36] mb-4">Application <br className="hidden md:block"/>Guidelines</h2>
              <p className="text-sm text-gray-500 mb-6">
                Standard operational protocols for achieving maximum efficiency and chemical stability. Always consult local agricultural authorities before application.
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm text-gray-700 font-medium">
                  <CheckCircle2 size={18} className="text-[#0A7C5C] shrink-0 mt-0.5" />
                  Ensure equipment is calibrated correctly prior to mixing.
                </li>
                <li className="flex items-start gap-3 text-sm text-gray-700 font-medium">
                  <CheckCircle2 size={18} className="text-[#0A7C5C] shrink-0 mt-0.5" />
                  Do not apply during high midday temperatures or strong winds.
                </li>
              </ul>
            </div>
            
            <div className="md:col-span-2">
              <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6 border-b border-gray-200 pb-4">
                  <Settings size={24} className="text-gray-400" />
                  <h3 className="text-lg md:text-xl font-bold text-[#1D2B36]">Usage Instructions & Dosage</h3>
                </div>
                <div className="prose prose-sm md:prose-base max-w-none text-gray-600 leading-relaxed font-medium">
                  {product.details?.usage}
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProductDetail;
