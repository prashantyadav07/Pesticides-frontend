import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Bug, Wheat, Sprout, Droplets, Shield, Search, ArrowRight, Play, Star, Quote,
  MapPin, ChevronRight, Activity, Leaf, Tractor, Sun, ArrowUpRight, Check
} from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

gsap.registerPlugin(ScrollTrigger);

// --- Data Arrays ---
const CATEGORIES = [
  { id: 1, title: 'Herbicides', icon: Sprout, desc: 'Advanced weed control for maximum nutrient uptake and uninterrupted crop growth cycles.', image: 'https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=800&auto=format&fit=crop' },
  { id: 2, title: 'Insecticides', icon: Bug, desc: 'Protect your crops from devastating pest infestations with rapid-action defense mechanisms.', image: 'https://images.unsplash.com/photo-1605000755581-36ba9067b2d5?q=80&w=800&auto=format&fit=crop' },
  { id: 3, title: 'Fungicides', icon: Shield, desc: 'Prevent and cure fungal diseases to ensure spotless, healthier, and robust yields.', image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=800&auto=format&fit=crop' },
  { id: 4, title: 'Biostimulants', icon: Activity, desc: 'Naturally enhance plant metabolism, improve root structures, and increase stress tolerance.', image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?q=80&w=800&auto=format&fit=crop' },
];

const STATS = [
  { label: 'Acres Protected', value: '10', suffix: 'M+' },
  { label: 'Premium Products', value: '50', suffix: '+' },
  { label: 'Happy Farmers', value: '15', suffix: 'K+' },
  { label: 'Expert Agronomists', value: '24', suffix: '/7' },
];

const PROCESS = [
  { id: 1, title: 'Soil Analysis', icon: Search, desc: 'Expert testing of your plot to determine unique nutritional needs and prevent disease risks before planting.' },
  { id: 2, title: 'Smart Selection', icon: Leaf, desc: 'Algorithm-driven agricultural product recommendations customized specifically for your crop growth phase.' },
  { id: 3, title: 'Precision Application', icon: Droplets, desc: 'Guided dosage and perfectly timed schedules to maximize chemical efficacy while minimizing waste.' },
  { id: 4, title: 'Harvest Optimization', icon: Sun, desc: 'Continuous monitoring support to ensure you achieve peak market-ready yields every single season.' },
];

const PRODUCTS = [
  { id: 1, name: 'WeedGuard Pro', category: 'Herbicide', price: '₹1,250 / L', tag: 'Bestseller' },
  { id: 2, name: 'BioProtect Max', category: 'Biostimulant', price: '₹850 / 500ml', tag: 'Organic' },
  { id: 3, name: 'PestBlock Ultra', category: 'Insecticide', price: '₹2,100 / L', tag: 'New Phase' },
  { id: 4, name: 'FungiClear Gold', category: 'Fungicide', price: '₹1,600 / kg', tag: 'Featured' },
  { id: 5, name: 'NutriGrow Plus', category: 'Growth Regulator', price: '₹450 / 250ml', tag: '' },
];

const TESTIMONIALS = [
  { id: 1, name: 'Ramesh Kumar', location: 'Punjab', crop: 'Wheat', text: 'Since utilizing the advanced WeedGuard Pro treatments, my seasonal wheat yield has increased by over 20%. The expert agro-support from the team is fundamentally unmatched.' },
  { id: 2, name: 'Suresh Patel', location: 'Gujarat', crop: 'Cotton', text: 'PestBlock Ultra stopped the bollworm infestation in its tracks within 48 hours. It was an absolute lifesaver for my family farm and allowed us to recover our export grade.' },
  { id: 3, name: 'Anil Deshmukh', location: 'Maharashtra', crop: 'Sugarcane', text: 'The biostimulants line has profoundly transformed my soil health. The crop color and stem girth are the definitively best I have witnessed in the past decade of farming.' },
];

export default function Home() {
  const containerRef = useRef(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [phone, setPhone] = useState("");

  const [featuredRef, featuredApi] = useEmblaCarousel({ loop: true, align: 'start' }, [Autoplay({ delay: 3500, stopOnInteraction: false })]);
  const [testiRef, testiApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000, stopOnInteraction: false })]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.gsap-fade-up').forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none reverse' } });
      });

      gsap.utils.toArray('.gsap-stagger-parent').forEach((parent) => {
        const children = parent.querySelectorAll('.gsap-stagger-child');
        gsap.fromTo(children, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out', scrollTrigger: { trigger: parent, start: 'top 80%' } });
      });

      // Reduced parallax offset and fixed layout to prevent half-loading or cutoff images
      gsap.utils.toArray('.gsap-parallax').forEach((img) => {
        gsap.to(img, { yPercent: 15, ease: 'none', scrollTrigger: { trigger: img.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
      });

      gsap.utils.toArray('.gsap-text-reveal').forEach((el) => {
        gsap.fromTo(el, { clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)', y: 20 }, { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)', y: 0, duration: 1.2, ease: 'power4.out', scrollTrigger: { trigger: el, start: 'top 85%' } });
      });

      gsap.utils.toArray('.gsap-line-grow').forEach((line) => {
        gsap.fromTo(line, { width: 0 }, { width: '100%', duration: 1.5, ease: 'power3.inOut', scrollTrigger: { trigger: line, start: 'top 85%' } });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="relative bg-[#F8FFFE] text-[#0A1628] font-body overflow-x-hidden selection:bg-[#F0C860] selection:text-[#0A1628] w-full min-h-screen">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
        .font-heading { font-family: 'Outfit', sans-serif; }
        .font-body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .clip-slant { clip-path: polygon(0 0, 100% 0, 100% 92%, 0 100%); }
        .clip-slant-reverse { clip-path: polygon(0 8%, 100% 0, 100% 100%, 0 100%); }
        .embla { overflow: hidden; }
        .embla-container { display: flex; touch-action: pan-y pinch-zoom; }
        @keyframes shimmer { 100% { transform: translateX(100%); } }
      `}</style>

      {/* 1. Hero Section */}
      <section className="relative w-full h-[100vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-[#0A1628]">
        {/* Adjusted the wrapper size and GSAP translation to prevent image from being cut off at the bottom */}
        <div className="absolute inset-0 w-full h-[130%] -top-[15%] z-0">
          <img
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2000&auto=format&fit=crop"
            alt="Agriculture Field"
            className="w-full h-full object-cover opacity-40 gsap-parallax"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628] via-[#0A1628]/80 to-[#12A87C]/30 mix-blend-multiply" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#F8FFFE] via-transparent to-transparent opacity-10" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 flex flex-col items-start justify-center">
          <div className="max-w-3xl text-white">
            <div className="overflow-hidden mb-4">
              <motion.span
                initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.8 }}
                className="inline-block px-4 py-1.5 rounded-full border border-[#28B0C4]/30 bg-[#1E90A0]/20 text-[#28B0C4] text-xs font-semibold tracking-wider uppercase mb-6"
              >
                Pioneering Indian Agriculture
              </motion.span>
            </div>
            {/* Reduced from 7xl/8xl to 4xl/5xl/6xl for a premium cleaner look */}
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6 tracking-tight">
              <span className="block overflow-hidden pb-1"><motion.span initial={{ y: 80 }} animate={{ y: 0 }} transition={{ delay: 0.3, duration: 1.2, ease: [0.16, 1, 0.3, 1] }} className="block text-[#F8FFFE]">Cultivating</motion.span></span>
              <span className="block overflow-hidden pb-1"><motion.span initial={{ y: 80 }} animate={{ y: 0 }} transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }} className="block text-[#12A87C]">Tomorrow&apos;s</motion.span></span>
              <span className="block overflow-hidden"><motion.span initial={{ y: 80 }} animate={{ y: 0 }} transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }} className="block text-[#F0C860]">Bountiful Harvest.</motion.span></span>
            </h1>
            {/* Reduced text size for better readability and elegance */}
            <motion.p
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 1 }}
              className="text-base md:text-lg text-[#EEF8F4]/80 max-w-xl mb-10 font-light leading-relaxed"
            >
              Empowering farmers with advanced agro-chemicals, biostimulants, and precision farming solutions to maximize yield while protecting the soil for generations.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1, duration: 1 }} className="flex flex-wrap items-center gap-6">
              <button className="group relative px-6 py-3 bg-[#12A87C] overflow-hidden rounded-full font-semibold text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(18,168,124,0.3)]">
                <div className="absolute inset-0 w-0 bg-[#065C43] transition-all duration-500 ease-out group-hover:w-full" />
                <span className="relative z-10 flex items-center gap-2 text-sm md:text-base">Explore Solutions <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></span>
              </button>

              <button className="group flex items-center gap-3 text-white hover:text-[#F0C860] transition-colors duration-300 cursor-pointer">
                <div className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center bg-white/5 backdrop-blur-md group-hover:scale-105 group-hover:border-[#F0C860]/50 transition-all duration-300">
                  <Play className="w-4 h-4 fill-current" />
                </div>
                <span className="text-sm font-medium tracking-wide">Watch Documentary</span>
              </button>
            </motion.div>
          </div>
        </div>

        <motion.div
          animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 z-20"
        >
          <div className="w-[1px] h-10 bg-gradient-to-b from-white/0 via-white/50 to-white overflow-hidden relative">
            <motion.div animate={{ y: ['-100%', '100%'] }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} className="absolute top-0 w-full h-1/2 bg-[#12A87C]" />
          </div>
          <span className="text-[9px] tracking-[0.2em] uppercase font-bold text-white/50">Scroll</span>
        </motion.div>
      </section>

      {/* 2. Product Categories */}
      <section className="relative py-24 bg-[#F8FFFE] z-10 clip-slant-reverse -mt-8 pt-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-14 gap-8">
            <div className="max-w-xl">
              <h4 className="text-[#1E90A0] text-sm font-bold tracking-wider uppercase mb-2 flex items-center gap-2 gsap-fade-up">
                <Leaf className="w-4 h-4" /> Portfolio Categories
              </h4>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#0A1628] leading-tight pb-2 gsap-text-reveal">
                Comprehensive Crop <br /> <span className="text-[#0A7C5C] italic font-medium">Defense Systems</span>
              </h2>
            </div>
            <button className="text-[#0A1628] text-sm md:text-base font-bold flex items-center gap-3 group hover:text-[#0A7C5C] transition-colors gsap-fade-up tracking-wide">
              View All Categories
              <span className="w-10 h-10 rounded-full bg-[#EEF8F4] flex items-center justify-center group-hover:bg-[#12A87C] group-hover:text-white transition-all duration-300">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 gsap-stagger-parent">
            {CATEGORIES.map((cat) => (
              <div key={cat.id} className="group relative h-[400px] md:h-[450px] rounded-[1.5rem] overflow-hidden cursor-pointer gsap-stagger-child bg-[#EEF8F4]">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/40 to-transparent z-10 opacity-70 transition-opacity duration-500 group-hover:opacity-90" />
                <img src={cat.image} alt={cat.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />

                <div className="absolute inset-x-0 bottom-0 p-6 z-20 flex flex-col justify-end h-full">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center mb-4 text-white border border-white/30 translate-y-2 group-hover:translate-y-0 transition-all duration-500 group-hover:bg-[#12A87C] group-hover:border-[#12A87C]">
                    <cat.icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-white mb-2 translate-y-2 group-hover:translate-y-0 transition-all duration-500">{cat.title}</h3>
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                    <div className="overflow-hidden">
                      <p className="text-[#EEF8F4] text-sm leading-relaxed mt-2 pb-1 block line-clamp-3">{cat.desc}</p>
                      <div className="mt-3 flex items-center text-[#F0C860] text-xs font-bold uppercase tracking-wider">
                        Explore Line <ChevronRight className="w-3 h-3 ml-1" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. How It Works */}
      <section className="py-24 bg-[#0A1628] text-white px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0A7C5C] opacity-[0.06] rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h4 className="text-[#28B0C4] text-sm font-bold tracking-widest uppercase mb-3 gsap-fade-up">Methodology</h4>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 pb-2 gsap-text-reveal">
              The Protocol for <span className="text-[#F0C860] italic font-medium">Maximum Yield</span>
            </h2>
            <div className="w-16 h-1 bg-[#12A87C] mx-auto rounded-full gsap-line-grow" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 gsap-stagger-parent relative">
            <div className="hidden lg:block absolute top-[40px] left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-[#1E90A0]/0 via-[#1E90A0]/30 to-[#1E90A0]/0 z-0" />

            {PROCESS.map((step) => (
              <div key={step.id} className="relative z-10 flex flex-col items-center text-center gsap-stagger-child group">
                <div className="w-20 h-20 rounded-full bg-[#0A1628] border border-[#1E90A0]/30 shadow-[0_0_20px_rgba(30,144,160,0.05)] flex items-center justify-center mb-6 relative transition-transform duration-500 group-hover:-translate-y-2 group-hover:border-[#12A87C] group-hover:shadow-[0_15px_30px_rgba(18,168,124,0.15)]">
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#F0C860] text-[#0A1628] text-xs font-bold flex items-center justify-center border-4 border-[#0A1628]">0{step.id}</span>
                  <step.icon className="w-8 h-8 text-[#28B0C4] group-hover:text-[#12A87C] transition-colors" />
                </div>
                <h3 className="font-heading text-xl font-bold mb-3 text-[#EEF8F4]">{step.title}</h3>
                <p className="text-[#4A6670] leading-relaxed text-sm max-w-[260px] group-hover:text-[#EEF8F4]/80 transition-colors">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Stats */}
      <section className="py-20 bg-[#12A87C] px-6 lg:px-12 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 mix-blend-overlay" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        <div className="absolute left-0 top-0 w-1/3 h-full bg-gradient-to-r from-[#065C43]/20 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 divide-x-0 lg:divide-x divide-white/20 gsap-stagger-parent relative z-10">
          {STATS.map((stat, i) => (
            <div key={i} className="text-center px-4 py-4 gsap-stagger-child">
              <div className="font-heading text-5xl lg:text-6xl font-black text-white mb-2 flex items-center justify-center drop-shadow-md">
                {stat.value}<span className="text-[#F0C860]">{stat.suffix}</span>
              </div>
              <div className="text-[#EEF8F4] font-bold tracking-widest text-xs lg:text-sm uppercase">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Featured Products Carousel */}
      <section className="py-24 bg-[#EEF8F4] px-6 lg:px-12 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h4 className="text-[#0A7C5C] text-sm font-bold tracking-widest uppercase mb-3 gsap-fade-up">Premium Formulations</h4>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-[#0A1628] pb-2 gsap-text-reveal">Our Elite Catalog</h2>
            </div>
            <div className="flex gap-3 hidden md:flex gsap-fade-up">
              <button
                onClick={() => featuredApi?.scrollPrev()}
                className="w-12 h-12 rounded-full border border-[#0A7C5C]/20 flex items-center justify-center text-[#0A7C5C] hover:bg-[#0A7C5C] hover:text-white transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5 rotate-180" />
              </button>
              <button
                onClick={() => featuredApi?.scrollNext()}
                className="w-12 h-12 rounded-full border border-[#0A7C5C]/20 flex items-center justify-center text-[#0A7C5C] hover:bg-[#0A7C5C] hover:text-white transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="embla gsap-fade-up" ref={featuredRef}>
            <div className="embla-container -ml-6 py-6">
              {PRODUCTS.map((product) => (
                <div key={product.id} className="embla-slide pl-6 shrink-0 grow-0 basis-full md:basis-1/2 lg:basis-1/3 min-w-0">
                  <div className="bg-white p-6 rounded-[1.5rem] group relative transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(10,124,92,0.08)] border border-transparent hover:border-[#0A7C5C]/10 cursor-pointer">
                    {product.tag && (
                      <span className="absolute top-6 left-6 px-4 py-1.5 bg-[#F0C860] text-[#0A1628] text-[10px] font-bold uppercase tracking-wider rounded-full z-10 shadow-sm">
                        {product.tag}
                      </span>
                    )}
                    <button className="absolute top-6 right-6 w-10 h-10 rounded-full bg-[#F8FFFE] text-[#0A7C5C] flex items-center justify-center z-10 hover:bg-[#0A7C5C] hover:text-white transition-colors duration-300 shadow-sm border border-[#EEF8F4]">
                      <ArrowUpRight className="w-4 h-4" />
                    </button>

                    <div className="h-[260px] bg-[#F8FFFE] rounded-2xl mb-6 flex items-center justify-center overflow-hidden group-hover:bg-[#EEF8F4]/50 transition-colors w-full relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#12A87C]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="relative w-24 h-48 bg-gradient-to-br from-[#12A87C] to-[#0A1628] rounded-xl shadow-xl flex items-center justify-center transform group-hover:scale-105 group-hover:rotate-3 transition-transform duration-700 ease-out z-10">
                        <div className="absolute top-[-3px] w-10 h-6 bg-white/20 rounded-t-md backdrop-blur" />
                        <div className="absolute top-8 w-full px-2">
                          <div className="h-24 bg-white rounded flex flex-col justify-center items-center shadow-inner p-2">
                            <span className="text-[#0A7C5C] font-bold text-[8px] tracking-widest uppercase mb-1">{product.category}</span>
                            <span className="text-[#0A1628] font-heading font-bold text-xs leading-tight text-center">{product.name}</span>
                            <div className="mt-auto pt-1 border-t border-gray-100 flex gap-1 justify-center w-full">
                              <Leaf className="w-3 h-3 text-[#12A87C]" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="px-2 pb-2">
                      <p className="text-[#4A6670] text-[11px] font-bold uppercase tracking-wider mb-1">{product.category}</p>
                      <h3 className="font-heading text-xl font-bold text-[#0A1628] mb-4 group-hover:text-[#0A7C5C] transition-colors">{product.name}</h3>

                      <div className="flex justify-between items-center pt-4 border-t border-[#EEF8F4]/80">
                        <p className="text-lg font-bold text-[#1E90A0]">{product.price}</p>
                        <button className="text-[#0A7C5C] font-bold flex items-center gap-1.5 hover:gap-2 transition-all uppercase text-xs tracking-wider">
                          Details <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Testimonials */}
      <section className="py-24 bg-[#0A1628] text-white px-6 lg:px-12 relative clip-slant">
        <div className="max-w-7xl mx-auto flex flex-col xl:flex-row items-center gap-16 relative z-10 py-8">
          <div className="w-full xl:w-1/3 text-center xl:text-left">
            <h4 className="text-[#F0C860] text-sm font-bold tracking-widest uppercase mb-3 gsap-fade-up">Success Stories</h4>
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6 pb-2 gsap-text-reveal">Rooted in <br className="hidden xl:block" />Trust.</h2>
            <p className="text-[#EEF8F4]/70 mb-10 text-base leading-relaxed max-w-lg mx-auto xl:mx-0 gsap-fade-up">Hear from the forward-thinking farmers who have completely transformed their barren lands into bountiful harvests using our precision-engineered crop enhancement solutions.</p>
            <div className="flex gap-3 justify-center xl:justify-start gsap-fade-up">
              <button
                onClick={() => testiApi?.scrollPrev()}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#0A1628] hover:border-white transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5 rotate-180" />
              </button>
              <button
                onClick={() => testiApi?.scrollNext()}
                className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center hover:bg-white hover:text-[#0A1628] hover:border-white transition-all duration-300"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="w-full xl:w-2/3 embla cursor-grab active:cursor-grabbing gsap-fade-up" ref={testiRef}>
            <div className="embla-container flex">
              {TESTIMONIALS.map((testi) => (
                <div key={testi.id} className="embla-slide shrink-0 grow-0 basis-full lg:basis-[100%] min-w-0 pr-6">
                  <div className="bg-white/5 border border-white/10 p-8 md:p-12 rounded-[2rem] relative backdrop-blur-md hover:bg-white/10 transition-colors duration-500">
                    <Quote className="absolute top-8 right-8 w-16 h-16 text-white/5" />
                    <div className="flex gap-1 mb-6 text-[#F0C860]">
                      <Star className="w-5 h-5 fill-current" />
                      <Star className="w-5 h-5 fill-current" />
                      <Star className="w-5 h-5 fill-current" />
                      <Star className="w-5 h-5 fill-current" />
                      <Star className="w-5 h-5 fill-current" />
                    </div>
                    <p className="text-xl md:text-2xl font-heading font-light leading-relaxed mb-10 text-[#EEF8F4] relative z-10 italic">
                      &quot;{testi.text}&quot;
                    </p>
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#12A87C] to-[#1E90A0] flex items-center justify-center font-heading font-bold text-xl uppercase shadow-[0_5px_15px_rgba(18,168,124,0.3)]">
                        {testi.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-bold text-lg md:text-xl mb-1">{testi.name}</h4>
                        <p className="text-[#EEF8F4]/60 text-xs md:text-sm flex items-center gap-2 font-medium uppercase tracking-wider">
                          <MapPin className="w-3 h-3 text-[#F0C860]" /> {testi.location} &nbsp;|&nbsp; <Wheat className="w-3 h-3 text-[#F0C860]" /> {testi.crop}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. CTA Banner */}
      <section className="relative py-28 bg-[#F8FFFE] px-6 lg:px-12 overflow-hidden -mt-16 pt-36">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-[#0A7C5C] to-[#1E90A0] rounded-[2.5rem] p-10 md:p-20 relative overflow-hidden gsap-fade-up shadow-[0_20px_60px_rgba(10,124,92,0.25)]">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white opacity-5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#F0C860] opacity-[0.08] rounded-full blur-[60px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

          <div className="relative z-10 text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-8 backdrop-blur-md border border-white/20">
              <Tractor className="w-8 h-8 text-white" />
            </div>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight pb-1">
              Ready to Maximize <br className="hidden md:block" /><span className="text-[#F0C860]">Your Yield?</span>
            </h2>
            <p className="text-[#EEF8F4] text-base md:text-lg font-light mb-10 opacity-90 leading-relaxed max-w-xl mx-auto">
              Connect with our master agronomists today. Enter your contact details below, and we will architect a growth strategy tailored exclusively for your plot.
            </p>

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  className="bg-white/10 p-8 rounded-[1.5rem] backdrop-blur-md border border-white/20 max-w-md mx-auto text-white flex flex-col items-center relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full animate-[shimmer_2s_infinite]" />
                  <div className="w-16 h-16 bg-[#F0C860] rounded-full flex items-center justify-center text-[#0A1628] mb-5 shadow-xl relative z-10">
                    <Check className="w-8 h-8 font-bold" />
                  </div>
                  <h4 className="font-heading text-2xl font-bold mb-2 relative z-10">Request Confirmed.</h4>
                  <p className="text-white/80 text-sm md:text-base relative z-10 text-center">A dedicated expert will reach out to <span className="font-bold text-[#F0C860]">{phone}</span> within 2 hours.</p>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col sm:flex-row gap-3 justify-center bg-white/10 p-2 rounded-full backdrop-blur-md border border-white/30 max-w-xl mx-auto shadow-xl relative z-20"
                >
                  <input
                    type="tel"
                    placeholder="Enter phone number..."
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="flex-1 bg-transparent text-white placeholder-white/60 px-6 py-3 focus:outline-none focus:ring-0 rounded-full font-medium text-base w-full"
                  />
                  <button
                    onClick={() => { if (phone.length > 5) setIsSubmitted(true) }}
                    className="px-8 py-3 bg-[#F0C860] text-[#0A1628] font-bold rounded-full hover:bg-white transition-all duration-300 flex items-center justify-center gap-2 text-sm md:text-base whitespace-nowrap shadow-[0_5px_10px_rgba(0,0,0,0.1)] group cursor-pointer"
                  >
                    Consult Expert <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.p
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
              className="text-white/60 text-xs mt-6 flex items-center justify-center gap-2 font-medium tracking-wide uppercase"
            >
              <Shield className="w-3 h-3" /> 100% Data Privacy Guaranteed
            </motion.p>
          </div>
        </div>
      </section>
    </div>
  );
}