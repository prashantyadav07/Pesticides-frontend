import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Leaf, Truck, Users, ArrowRight, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Link } from 'react-router-dom';
import ProductListing from '../components/products/ProductListing';
import productsData from '../data/products.json';

gsap.registerPlugin(ScrollTrigger);

export default function Products() {
  const containerRef = useRef(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'start' }, [Autoplay({ delay: 3000 })]);

  // Hide global nav/footer + Inject Font
  useEffect(() => {
    const styleId = 'premium-product-styles';
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

  // GSAP Animations
  useEffect(() => {
    let ctx = gsap.context(() => {
      // Hero Animation
      gsap.from(".hero-badge", { opacity: 0, y: -20, duration: 1, ease: "power3.out" });
      gsap.from(".hero-title .line", {
        y: 100, opacity: 0, duration: 1.2, stagger: 0.15, ease: "power4.out", delay: 0.2
      });
      gsap.from(".hero-desc", { opacity: 0, y: 30, duration: 1, delay: 0.6, ease: "power3.out" });

      // Parallax Background
      gsap.to(".hero-bg-shape", {
        yPercent: 30,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      // Trust Indicators Stagger
      gsap.from(".trust-card", {
        scrollTrigger: {
          trigger: ".trust-section",
          start: "top 80%",
        },
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "back.out(1.7)"
      });

      // Featured Section
      gsap.from(".featured-header", {
        scrollTrigger: { trigger: ".featured-section", start: "top 85%" },
        opacity: 0, x: -50, duration: 0.8
      });

      // CTA Banner Parallax
      gsap.fromTo(".cta-bg",
        { scale: 1.1, yPercent: -10 },
        {
          scale: 1, yPercent: 10, ease: "none",
          scrollTrigger: { trigger: ".cta-section", start: "top bottom", end: "bottom top", scrub: true }
        }
      );

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Get some featured products for the carousel (mix of categories)
  const featuredProducts = productsData.filter(p => [1, 5, 20, 21, 45, 50].includes(p.id));

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <div ref={containerRef} className="bg-[#F8FFFE] font-outfit text-[#0A1628] overflow-x-hidden min-h-screen">

      {/* Hero Section */}
      <section className="hero-section relative min-h-[90vh] flex items-center pt-32 pb-20 px-6 sm:px-12 lg:px-24 overflow-hidden">
        {/* Dynamic Abstract Background */}
        <div className="absolute inset-0 -z-10 bg-[#F8FFFE]">
          <div className="hero-bg-shape absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-gradient-to-br from-[#0A7C5C]/10 to-[#1E90A0]/10 blur-[120px] rounded-full" />
          <div className="hero-bg-shape absolute bottom-[-5%] left-[-10%] w-[500px] h-[500px] bg-[#1E90A0]/10 blur-[100px] rounded-full" />
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <div className="max-w-2xl">
            <div className="hero-badge inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#0A7C5C]/20 shadow-[0_8px_30px_rgb(10,124,92,0.1)] mb-8">
              <span className="w-2 h-2 rounded-full bg-[#F0C860] animate-pulse" />
              <span className="text-[11px] font-black text-[#0A7C5C] uppercase tracking-[0.2em]">Next-Gen Agri-Tech</span>
            </div>

            <h1 className="hero-title text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.05] mb-8 tracking-tight text-[#0A1628] overflow-hidden">
              <div className="line">Empowering</div>
              <div className="line text-[#0A7C5C]">Modern</div>
              <div className="line">Agriculture.</div>
            </h1>

            <p className="hero-desc text-lg sm:text-xl text-[#4A6670] font-medium leading-relaxed mb-10 max-w-xl">
              Discover laboratory-tested, high-performance crop protection and growth enhancers. Designed to maximize yield and safeguard your farming investments.
            </p>

            <motion.div
              className="hero-desc flex flex-col sm:flex-row gap-4"
              whileHover="hover"
            >
              <button
                onClick={() => document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' })}
                className="px-8 py-4 bg-[#0A1628] hover:bg-[#0A7C5C] text-white rounded-full font-bold tracking-wide transition-colors duration-500 shadow-xl shadow-[#0A7C5C]/20 flex items-center justify-center gap-3 overflow-hidden group relative"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                <span className="relative z-10">Explore Catalog</span>
                <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
              </button>

              <button className="px-8 py-4 bg-white text-[#0A1628] border border-[#0A1628]/10 hover:border-[#F0C860] rounded-full font-bold tracking-wide transition-all duration-300 flex items-center justify-center gap-3 shadow-sm hover:shadow-md">
                View Lab Reports
              </button>
            </motion.div>
          </div>

          {/* Hero Visuals */}
          <div className="relative hidden lg:block h-[600px]">
            <motion.div
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 right-0 w-3/4 h-[400px] rounded-[3rem] overflow-hidden shadow-2xl shadow-[#0A7C5C]/20 border-8 border-white"
            >
              <img src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&auto=format&fit=crop&q=80" alt="Farming" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/60 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white font-bold text-xl drop-shadow-md">Precision Spraying</div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-10 left-0 w-2/3 h-[300px] rounded-[3rem] overflow-hidden shadow-2xl shadow-[#1E90A0]/20 border-8 border-white z-10"
            >
              <img src="https://images.unsplash.com/photo-1592982537447-7440770cbfc9?w=800&auto=format&fit=crop&q=80" alt="Crops" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-[#0A7C5C]/20 mix-blend-overlay" />
            </motion.div>

            {/* Floating Stats Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="absolute top-[40%] -left-12 bg-white/90 backdrop-blur-xl p-5 rounded-3xl shadow-2xl border border-white/50 z-20 flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-[#F0C860]/20 rounded-full flex items-center justify-center text-[#F0C860]">
                <Star size={24} className="fill-[#F0C860]" />
              </div>
              <div>
                <div className="text-3xl font-black text-[#0A1628]">4.9/5</div>
                <div className="text-[10px] font-bold text-[#4A6670] uppercase tracking-widest">Farmer Rating</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Products Carousel */}
      <section className="featured-section py-24 bg-white relative">
        <div className="max-w-[90rem] mx-auto px-6 sm:px-12 xl:px-24">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6 featured-header">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-0.5 w-8 bg-[#0A7C5C]" />
                <span className="text-[#0A7C5C] font-bold text-[10px] uppercase tracking-[0.3em]">Top Picks</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-[#0A1628]">Featured Solutions</h2>
            </div>

            <div className="flex gap-3">
              <button onClick={scrollPrev} className="w-12 h-12 rounded-full border border-[#0A1628]/10 flex items-center justify-center text-[#0A1628] hover:bg-[#0A7C5C] hover:text-white hover:border-[#0A7C5C] transition-all">
                <ChevronLeft size={20} />
              </button>
              <button onClick={scrollNext} className="w-12 h-12 rounded-full border border-[#0A1628]/10 flex items-center justify-center text-[#0A1628] hover:bg-[#0A7C5C] hover:text-white hover:border-[#0A7C5C] transition-all">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          <div className="overflow-hidden cursor-grab active:cursor-grabbing" ref={emblaRef}>
            <div className="flex -ml-10 py-4">
              {featuredProducts.map((product) => (
                <div key={product.id} className="flex-[0_0_85%] sm:flex-[0_0_45%] lg:flex-[0_0_30%] min-w-0 pl-10">
                  <Link to={`/product/${product.id}`} className="block group">
                    <div className="relative aspect-[16/8] rounded-[2rem] overflow-hidden mb-5">
                      <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      <div className="absolute inset-0 bg-[#0A1628]/10 group-hover:bg-transparent transition-colors duration-500" />
                      <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-xl shadow-lg translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-[#0A7C5C]">View Formulation</span>
                          <ArrowRight size={16} className="text-[#0A1628]" />
                        </div>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-[#0A1628] mb-2 truncate group-hover:text-[#0A7C5C] transition-colors">{product.name}</h3>
                    <p className="text-[#4A6670] text-xs font-medium">{product.category}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Listing Section */}
      <section id="catalog" className="pt-24 pb-32 px-6 sm:px-12 lg:px-24 bg-[#EEF8F4] relative">
        <div className="max-w-[90rem] mx-auto">
          <div className="mb-16 text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl lg:text-5xl font-black text-[#0A1628] mb-6"
            >
              Complete <span className="text-[#0A7C5C]">Formulary</span>
            </motion.h2>
            <p className="text-[#4A6670] max-w-2xl mx-auto font-medium text-lg">
              Filter exactly what you need. From broad-spectrum insecticides to targeted plant growth regulators.
            </p>
          </div>
          <ProductListing />
        </div>
      </section>

      {/* Trust / Stats Section */}
      <section className="trust-section py-20 md:py-32 bg-[#0A1628] relative overflow-hidden">
        {/* Subtle glowing orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1E90A0]/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#0A7C5C]/20 blur-[150px] rounded-full" />

        <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 text-center">
            {[
              { icon: ShieldCheck, stat: "100%", label: "Lab Certified", desc: "Rigorous quality checks" },
              { icon: Leaf, stat: "Zero", label: "Residue Issues", desc: "Safe degradation profiles" },
              { icon: Users, stat: "50k+", label: "Active Farmers", desc: "Trusted nationwide" },
              { icon: Truck, stat: "24h", label: "Fast Dispatch", desc: "Direct to distributor" }
            ].map((stat, i) => (
              <div key={i} className="trust-card flex flex-col items-center group">
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-[1.5rem] md:rounded-[2rem] bg-white/5 flex items-center justify-center mb-6 group-hover:bg-[#0A7C5C] group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 border border-white/10 group-hover:border-[#0A7C5C]">
                  <stat.icon size={24} className="text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-3xl md:text-5xl font-black text-white mb-2 group-hover:text-[#F0C860] transition-colors">{stat.stat}</div>
                <h4 className="text-lg md:text-xl font-bold text-white/90 mb-2">{stat.label}</h4>
                <p className="text-[#4A6670] text-xs md:text-sm font-medium">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="cta-section py-20 md:py-32 px-6 sm:px-12 lg:px-24 bg-[#F8FFFE] overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-[3rem] overflow-hidden group">
            {/* Parallax Background Image inside CTA */}
            <div className="absolute inset-0">
              <div className="cta-bg w-full h-[120%] bg-[url('https://images.unsplash.com/photo-1589923188900-85dae523342b?w=1600&auto=format&fit=crop&q=80')] bg-cover bg-center" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628]/95 via-[#0A1628]/80 to-[#0A7C5C]/40" />
            </div>

            <div className="relative z-10 p-12 md:p-20 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="max-w-2xl text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1E90A0]/20 text-[10px] font-bold text-[#F0C860] uppercase tracking-[0.2em] mb-6 border border-[#1E90A0]/30 backdrop-blur-sm">
                  Distributor Connect
                </div>
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                  Scale your farm's <br /><span className="text-[#F0C860]">productivity.</span>
                </h2>
                <p className="text-[#EEF8F4] text-base md:text-lg font-medium opacity-90 max-w-xl">
                  Connect with our lead agronomists to get bulk pricing, specialized formulation requests, and dedicated soil testing.
                </p>
              </div>

              <div className="shrink-0 relative">
                <div className="absolute inset-0 bg-[#F0C860] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity duration-500 rounded-full" />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative px-10 py-6 bg-white text-[#0A1628] rounded-full font-black text-lg tracking-wide flex items-center justify-center gap-3 shadow-2xl transition-all"
                >
                  Partner With Us
                  <ArrowRight size={20} className="text-[#0A7C5C]" />
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}