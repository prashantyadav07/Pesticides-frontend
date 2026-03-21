import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Shield, Zap, Leaf, Award, ArrowUpRight, Play,
  ChevronRight, Star, Globe, Beaker, Users, CheckCircle2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll();

  // Parallax effects
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal animations for all sections
      gsap.utils.toArray('.reveal').forEach((el) => {
        gsap.fromTo(el,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
            }
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-white text-slate-900 selection:bg-emerald-200 selection:text-emerald-900 font-sans">

      {/* ─── SECTION 1: CINEMATIC HERO ─── */}
      <section className="relative min-h-[85svh] flex flex-col justify-start overflow-hidden bg-slate-50 pt-16 md:pt-20 pb-16 md:pb-20">
        <motion.div style={{ y: bgY }} className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white/30 to-slate-50 z-10" />
          <img
            src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2000"
            className="w-full h-full object-cover opacity-90 scale-105"
            alt="Hero Background"
          />
        </motion.div>

        {/* Removed the negative margin (-mt) and added positive margin to bring the text lower, away from the navbar */}
        <div className="container mx-auto px-4 sm:px-6 relative z-20 text-center flex flex-col mt-12 md:mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-5xl mx-auto"
          >
            <Badge className="bg-emerald-50 text-[#059669] border border-emerald-200 px-5 py-2 mb-8 md:mb-10 backdrop-blur-md text-xs font-bold tracking-[0.15em] shadow-sm uppercase rounded-full">
              Est. 1999 • CIB&RC Registered
            </Badge>

            <h1 className="text-6xl sm:text-7xl md:text-[100px] lg:text-[130px] font-black tracking-tighter leading-[0.9] mb-6 text-[#0b132b]">
              DEFENDING <br /> <span className="text-[#059669] bg-clip-text">YOUR  HARVEST.</span>
            </h1>

            <p className="max-w-2xl mx-auto text-slate-600 text-base sm:text-lg md:text-xl font-medium mb-12 px-2 sm:px-6 leading-relaxed">
              Empowering 1.5 Million farmers with elite-grade crop protection chemistry and sustainable agronomy.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              <Button className="w-full sm:w-auto bg-[#0b132b] text-white hover:bg-[#059669] rounded-full px-10 py-7 md:py-8 text-base md:text-lg font-semibold transition-all duration-300 shadow-xl shadow-slate-200/50">
                Browse Solutions
              </Button>
              <button className="flex items-center justify-center gap-4 group text-[#0b132b] font-bold hover:text-[#059669] transition-colors w-full sm:w-auto mt-2 sm:mt-0">
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full border border-slate-200 flex items-center justify-center group-hover:bg-emerald-50 group-hover:border-emerald-200 transition-all shadow-sm bg-white">
                  <Play size={20} fill="currentColor" className="ml-1 text-slate-700 group-hover:text-[#059669]" />
                </div>
                <span className="text-lg">Our Impact Story</span>
              </button>
            </div>
          </motion.div>
        </div>

        <div className="hidden sm:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-3 opacity-60">
          <div className="w-[1px] h-16 bg-gradient-to-b from-[#059669] to-transparent animate-pulse" />
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-slate-500">Scroll</span>
        </div>
      </section>

      {/* ─── SECTION 2: BENTO TRUST GRID ─── */}
      <section className="py-12 md:py-20 px-4 sm:px-6 container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 md:auto-rows-[280px]">

          {/* Main Trust Card */}
          <div className="md:col-span-8 md:row-span-2 bg-white border border-slate-200/80 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 relative overflow-hidden reveal shadow-sm hover:shadow-xl transition-all duration-500">

            <div className="absolute top-0 right-0 w-[80%] md:w-[65%] h-full pointer-events-none z-0">

              {/* Solid white fade to smoothly blend the image border with the white left section */}
              <div className="absolute inset-y-0 left-0 w-[50%] bg-gradient-to-r from-white via-white/80 to-transparent z-10" />

              {/* The BLUR overlay applied strictly on the left side of the image fading to clear on the right */}
              <div className="absolute inset-y-0 left-0 w-[60%] backdrop-blur-md[mask-image:linear-gradient(to_right,black,transparent)] z-10" />

              <img
                src="https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=800"
                className="w-full h-full object-cover object-center"
                alt="Green Crop Background"
              />
            </div>

            <div className="absolute top-8 md:top-10 right-8 md:right-10 flex items-center gap-3 z-20">
              <div className="hidden sm:flex items-center gap-1.5 bg-[#f0fdf4]/90 px-4 py-2 rounded-full border border-emerald-200/80 backdrop-blur-md text-[#059669]">
                <CheckCircle2 size={16} />
                <span className="text-xs font-bold uppercase tracking-wider">100% Certified</span>
              </div>
              <div className="bg-[#059669] w-12 h-12 rounded-full flex items-center justify-center hover:bg-emerald-700 transition-colors shadow-md cursor-pointer pointer-events-auto">
                <ArrowUpRight className="size-6 text-white" strokeWidth={2.5} />
              </div>
            </div>

            <div className="relative z-20 flex flex-col h-full justify-between gap-8 md:gap-0">
              <Shield className="size-14 md:size-16 text-[#059669]" />
              <div className="max-w-full md:max-w-[65%]">
                <h2 className="text-5xl sm:text-6xl md:text-[72px] font-black mb-4 md:mb-6 leading-[1.05] text-[#0b132b] tracking-tighter">
                  Elite <br /> Compliance. <br /> Zero <br className="hidden sm:block" /> Compromise.
                </h2>
                <p className="text-slate-600 text-base md:text-xl font-medium leading-relaxed max-w-[90%] sm:max-w-full">
                  Every CropLand formulation is rigorously tested and ISO 9001:2015 certified for global safety standards.
                </p>
              </div>
            </div>
          </div>

          {/* Stat Card 1 */}
          <div className="md:col-span-4 bg-white border border-slate-200/80 rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-10 reveal shadow-sm flex flex-col justify-center relative overflow-hidden">
            <h4 className="text-[#059669] font-bold mb-4 flex items-center gap-2 italic uppercase tracking-wider text-xs md:text-sm">
              <Zap size={16} /> Performance
            </h4>
            <div className="text-5xl md:text-6xl lg:text-7xl font-black mb-2 tracking-tighter text-[#0b132b]">25+</div>
            <p className="text-slate-400 font-bold tracking-wide uppercase text-xs">Years of Innovation</p>
          </div>

          {/* Stat Card 2 (Vibrant Green) */}
          <div className="md:col-span-4 bg-[#059669] rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-10 reveal text-white group hover:bg-emerald-700 transition-colors duration-300 shadow-xl shadow-emerald-600/20 relative overflow-hidden flex flex-col justify-center">
            <div className="relative z-10">
              <div className="text-5xl md:text-6xl lg:text-7xl font-black mb-2 tracking-tighter">1.5M</div>
              <p className="font-semibold tracking-wider uppercase text-xs text-emerald-100">Farmers Empowered</p>
            </div>
            <Users className="absolute -bottom-4 -right-4 size-32 opacity-10 group-hover:scale-110 transition-transform duration-500" />
          </div>

          {/* Technical Card */}
          <div className="md:col-span-12 bg-blue-50/40 border border-blue-100/60 rounded-[2rem] md:rounded-[2.5rem] p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 reveal shadow-sm">
            <div className="flex flex-wrap sm:flex-nowrap gap-8 md:gap-16 w-full md:w-auto">
              <div>
                <div className="text-3xl md:text-5xl font-black italic text-[#0b132b] tracking-tight">18+</div>
                <div className="text-slate-500 text-[10px] md:text-xs uppercase tracking-[0.2em] mt-2 font-bold">States Covered</div>
              </div>
              <div className="w-[1px] h-16 bg-slate-300 hidden sm:block" />
              <div>
                <div className="text-3xl md:text-5xl font-black italic text-[#0b132b] tracking-tight">80+</div>
                <div className="text-slate-500 text-[10px] md:text-xs uppercase tracking-[0.2em] mt-2 font-bold">Registrations</div>
              </div>
            </div>
            <div className="text-left md:text-right w-full md:w-auto">
              <p className="text-slate-600 max-w-md mb-5 font-medium text-sm md:text-base leading-relaxed">
                Our R&D lab is equipped with high-performance liquid chromatography for purity checks.
              </p>
              <Link to="/about" className="inline-flex items-center gap-2 text-[#059669] font-bold text-xs md:text-sm uppercase tracking-widest hover:gap-3 transition-all underline decoration-emerald-200 underline-offset-4">
                Laboratory Tour <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: PRODUCT SLIDER ─── */}
      <section className="py-12 md:py-20 bg-[#FAFAFA] rounded-t-[3rem] md:rounded-t-[4rem] border-t border-slate-200/50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-0 mb-8 md:mb-12 reveal">
            <div>
              <Badge className="bg-[#0b132b] text-white px-5 py-2 mb-6 text-xs font-bold tracking-widest uppercase rounded-full">PORTFOLIO</Badge>
              <h2 className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter text-[#0b132b] leading-[0.95]">
                SCIENCE BEHIND <br className="hidden sm:block" />THE SHIELD.
              </h2>
            </div>
            <Button variant="outline" className="w-full md:w-auto text-[#059669] border-slate-300 rounded-full px-8 py-6 hover:bg-[#059669] hover:text-white hover:border-[#059669] transition-all duration-300 font-bold text-sm bg-white">
              View All Products <ChevronRight className="ml-2 size-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10">
            {[
              { name: 'Terminator Plus', cat: 'Insecticide', img: 'https://images.unsplash.com/photo-1628352081506-83c43123ed6d?q=80&w=800' },
              { name: 'WeedShield Max', cat: 'Herbicide', img: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=800' },
              { name: 'BlastGuard Pro', cat: 'Fungicide', img: 'https://images.unsplash.com/photo-1591130901921-3f0652bb3915?q=80&w=800' }
            ].map((p, i) => (
              <div key={i} className="reveal group cursor-pointer flex flex-col items-center md:items-start">
                <div className="aspect-[4/5] md:aspect-[3/4] w-full rounded-[2rem] overflow-hidden mb-6 relative shadow-sm group-hover:shadow-2xl transition-all duration-500 bg-slate-200">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0b132b]/90 via-[#0b132b]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-8 flex flex-col justify-end">
                    <p className="text-white text-sm md:text-base font-medium leading-relaxed translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      Advanced systemic protection with 14-day residual activity across all major cash crops.
                    </p>
                  </div>
                </div>
                <div className="px-2 text-center md:text-left w-full">
                  <p className="text-[#059669] font-bold uppercase tracking-widest text-[11px] mb-2">{p.cat}</p>
                  <h3 className="text-xl md:text-2xl font-black tracking-tight text-[#0b132b]">{p.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: INNOVATION CTA ─── */}
      <section className="py-16 md:py-20 relative overflow-hidden bg-white">
        <div className="container mx-auto px-4 sm:px-6 relative z-10 flex flex-col items-center text-center">
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-[1.5rem] md:rounded-[2rem] bg-emerald-50 border border-emerald-100 flex items-center justify-center mb-8 md:mb-10 reveal rotate-3 shadow-sm">
            <Beaker className="text-[#059669] size-10 md:size-12" />
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 reveal text-[#0b132b] tracking-tighter leading-tight">
            Ready to upgrade <br className="hidden sm:block" /> your farm tech?
          </h2>
          <p className="text-slate-500 max-w-xl text-base md:text-lg mb-10 reveal font-medium px-4 leading-relaxed">
            Connect with our field experts for a customized crop protection calendar tailored to your soil and season.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 reveal w-full max-w-lg mx-auto">
            <input
              placeholder="Your Phone Number"
              className="bg-slate-50 border border-slate-200 rounded-full px-6 md:px-8 py-4 w-full focus:outline-none focus:border-emerald-400 focus:bg-white focus:ring-4 focus:ring-emerald-50 transition-all shadow-inner text-slate-900 font-medium placeholder:text-slate-400"
            />
            <Button className="bg-[#059669] hover:bg-emerald-700 text-white font-bold rounded-full px-8 py-6 shadow-lg shadow-emerald-600/20 w-full sm:w-auto shrink-0 transition-colors">
              Get Consultation
            </Button>
          </div>
        </div>

        {/* Abstract Background Blobs */}
        <div className="absolute top-1/2 left-0 w-72 h-72 md:w-96 md:h-96 bg-emerald-100/40 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-96 h-96 md:w-[500px] md:h-[500px] bg-blue-50/60 rounded-full blur-[100px] md:blur-[120px] translate-y-1/3 translate-x-1/3 pointer-events-none" />
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="pt-12 md:pt-20 pb-8 border-t border-slate-200/60 bg-slate-50/50">
        <div className="container mx-auto px-4 sm:px-6 flex flex-col md:flex-row justify-between items-center gap-10 md:gap-12 text-center md:text-left">
          <div>
            <h2 className="text-2xl md:text-3xl font-black italic text-[#059669] mb-1 md:mb-2 tracking-tight">CropLand.</h2>
            <p className="text-slate-500 text-xs md:text-sm font-semibold tracking-wide">Innovating Protection Since 1999.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-[#0b132b] text-xs md:text-sm font-bold uppercase tracking-widest">
            <Link to="/products" className="hover:text-[#059669] transition-colors">Products</Link>
            <Link to="/quality" className="hover:text-[#059669] transition-colors">Quality</Link>
            <Link to="/contact" className="hover:text-[#059669] transition-colors">Contact</Link>
          </div>

          <div className="flex gap-4">
            <div className="size-10 md:size-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-[#059669] hover:text-white cursor-pointer transition-colors shadow-sm text-slate-600 hover:border-transparent">
              <Globe size={18} />
            </div>
            <div className="size-10 md:size-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center hover:bg-[#059669] hover:text-white cursor-pointer transition-colors uppercase text-[10px] md:text-xs font-black shadow-sm text-slate-600 hover:border-transparent">
              IN
            </div>
          </div>
        </div>
        <div className="container mx-auto px-6 mt-10 md:mt-12">
          <p className="text-center text-slate-400 text-[10px] md:text-xs uppercase tracking-widest font-bold">
            © {new Date().getFullYear()} CropLand Industries Pvt Ltd. All Rights Reserved.
          </p>
        </div>
      </footer>

    </div>
  );
};

export default Home;