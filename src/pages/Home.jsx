import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { Leaf, ShieldCheck, Sprout, TrendingUp, ChevronRight, Star, ChevronLeft, ArrowUpRight, ArrowRight } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';

// Animated Counter Hook
const AnimatedCounter = ({ from = 0, to, duration = 2.5 }) => {
  const [count, setCount] = useState(from);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (inView) {
      let startTimestamp = null;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
        const easeOut = 1 - Math.pow(1 - progress, 4); // Quartic ease out
        setCount(Math.floor(easeOut * (to - from) + from));
        if (progress < 1) {
          window.requestAnimationFrame(step);
        }
      };
      window.requestAnimationFrame(step);
    }
  }, [inView, from, to, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacityHero = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  
  const [testimonialsRef, testimonialsApi] = useEmblaCarousel({ loop: true, align: 'start' }, [Autoplay({ delay: 5000, stopOnInteraction: true })]);
  const [productsRef, productsApi] = useEmblaCarousel({ loop: true, align: 'start', dragFree: true });

  const scrollPrev = () => productsApi && productsApi.scrollPrev();
  const scrollNext = () => productsApi && productsApi.scrollNext();

  const features = [
    { icon: <ShieldCheck className="h-6 w-6 text-primary" />, title: "Precision Protection", desc: "Advanced molecular structures targeting specific threats without collateral damage." },
    { icon: <Sprout className="h-6 w-6 text-primary" />, title: "Accelerated Growth", desc: "Bio-stimulants engineered to unlock genetic yield potential in challenging soils." },
    { icon: <Leaf className="h-6 w-6 text-primary" />, title: "Sustainable Future", desc: "Zero-residue formulas committed to protecting local ecosystems and waterways." },
  ];

  const partners = ["Monsanto Labs", "Corteva", "Syngenta Group", "Bayer CropScience", "BASF Agricultural", "FMC Corp", "Nufarm"];

  return (
    <div className="w-full bg-background overflow-hidden selection:bg-secondary/30 selection:text-primary">
      
      {/* 1. HERO SECTION (Magazine Editorial Style) */}
      <section className="relative min-h-[95vh] flex items-center pt-24 pb-12 overflow-hidden bg-background">
        {/* Background Texture & Particles */}
        <div className="absolute inset-0 z-0 opacity-40">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#E9F2ED_0%,transparent_60%)]" />
           {/* Particle Dots */}
           {[...Array(20)].map((_, i) => (
             <motion.div
               key={i}
               className="absolute w-1.5 h-1.5 bg-primary/20 rounded-full"
               initial={{ 
                 x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), 
                 y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800) 
               }}
               animate={{ 
                 y: [null, Math.random() * -100 - 50],
                 opacity: [0, 0.5, 0]
               }}
               transition={{ 
                 duration: Math.random() * 5 + 5, 
                 repeat: Infinity, 
                 ease: "linear" 
               }}
             />
           ))}
        </div>
        
        <div className="container mx-auto px-6 md:px-12 relative z-20">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div 
               style={{ y: yHero, opacity: opacityHero }}
               className="lg:col-span-7 space-y-8"
            >
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-white/50 backdrop-blur-md"
              >
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span className="text-sm font-medium tracking-wide text-primary uppercase">Next-Gen Crop Science</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-6xl md:text-8xl font-serif font-medium text-foreground leading-[1.05] tracking-tight"
              >
                Protecting <br/> <i className="text-gradient">Yields.</i><br/> Preserving <i className="text-secondary opacity-90">Earth.</i>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-xl md:text-2xl text-muted-foreground max-w-2xl font-light leading-relaxed font-sans"
              >
                Premium agrochemical solutions engineered for modern agriculture. Uncompromising performance meets radical sustainability.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-wrap gap-6 pt-4 items-center"
              >
                <Button className="bg-primary text-white hover:bg-[#123122] rounded-none px-10 h-14 text-lg border border-primary relative overflow-hidden group shadow-xl shadow-primary/10">
                  <span className="relative z-10 flex items-center gap-2">
                    Explore Catalog
                    <ArrowUpRight className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0" />
                </Button>
                
                <a href="#science" className="font-medium text-primary border-b border-primary pb-1 hover:text-secondary hover:border-secondary transition-colors group flex items-center gap-2">
                  Discover Our Science
                  <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            </motion.div>
            
            {/* Right Visuals (Floating Blobs) */}
            <div className="lg:col-span-5 relative h-[600px] hidden lg:block perspective-1000">
               {/* Main Product Blob */}
               <motion.div 
                 initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
                 animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                 transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                 className="absolute top-10 right-10 w-80 h-[500px] rounded-[3rem] overflow-hidden bg-primary/5 border border-white shadow-2xl z-20 glassmorphism"
               >
                 <img src="https://images.unsplash.com/photo-1599940824399-b87987207ea1?q=80&w=800&auto=format&fit=crop" alt="Agro Product" className="w-full h-full object-cover mix-blend-multiply opacity-80" />
                 <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent p-8 flex flex-col justify-end">
                    <span className="text-secondary font-serif italic text-xl mb-1">New Formula</span>
                    <h3 className="text-white font-sans text-2xl font-medium tracking-wide">Nexus YieldPro</h3>
                    <p className="text-white/70 font-light mt-2">Revolutionary bio-stimulant</p>
                 </div>
               </motion.div>

               {/* Secondary Floating Card */}
               <motion.div 
                 initial={{ opacity: 0, x: 50, y: 50 }}
                 animate={{ opacity: 1, x: 0, y: 0 }}
                 transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                 className="absolute -bottom-10 -left-10 bg-white p-6 rounded-2xl shadow-2xl border border-gray-100 z-30 max-w-[250px]"
                 style={{ y: useTransform(scrollYProgress, [0, 1], [0, -100]) }}
               >
                 <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mb-4">
                   <TrendingUp className="text-secondary h-6 w-6" />
                 </div>
                 <h4 className="font-serif text-xl border-b pb-2 mb-2">34% Increase</h4>
                 <p className="text-sm text-muted-foreground font-light leading-relaxed">Average yield growth verified across 500+ global field trials.</p>
               </motion.div>
            </div>
            
          </div>
        </div>
      </section>

      {/* 2. MARQUEE STRIP */}
      <section className="py-8 bg-primary overflow-hidden border-y border-[#265e43]">
        <div className="flex whitespace-nowrap">
           <motion.div 
             animate={{ x: ["0%", "-50%"] }}
             transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
             className="flex items-center gap-16 md:gap-32 px-8"
           >
              {[...partners, ...partners].map((partner, i) => (
                <div key={i} className="flex items-center gap-4 text-white/50 text-xl font-serif italic tracking-wider uppercase">
                  <span className="w-2 h-2 rounded-full bg-secondary" />
                  {partner}
                </div>
              ))}
           </motion.div>
        </div>
      </section>

      {/* 3. STATS HIGHLIGHT */}
      <section className="py-24 bg-background-alt relative overflow-hidden">
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
            {[
              { label: "Products in Market", to: 154, suffix: "+", desc: "Specialized formulas" },
              { label: "Hectares Protected", to: 12, suffix: "M", desc: "Across 5 continents" },
              { label: "R&D Investment", to: 45, suffix: "%", desc: "Of annual revenue" },
              { label: "Global Patents", to: 89, suffix: "", desc: "In chemical synthesis" }
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative"
              >
                <div className="absolute -left-4 top-4 w-1 h-12 bg-secondary" />
                <div className="text-5xl md:text-7xl font-serif text-primary mb-2 tracking-tighter">
                  <AnimatedCounter to={stat.to} duration={2} />{stat.suffix}
                </div>
                <div className="text-lg font-medium text-foreground tracking-wide">{stat.label}</div>
                <div className="text-sm text-muted-foreground font-light mt-1">{stat.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE US - STAGGER CARDS */}
      <section id="science" className="py-32 bg-background relative z-10">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="max-w-2xl"
            >
              <h2 className="text-sm font-bold tracking-widest text-secondary uppercase mb-4">Our Methodology</h2>
              <h3 className="text-4xl md:text-6xl font-serif tracking-tight text-foreground leading-[1.1]">
                Science that respects <br/> the <i className="text-primary">Ecosystem.</i>
              </h3>
            </motion.div>
            <motion.p 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="max-w-md text-lg text-muted-foreground font-light"
            >
              We reject the shotgun approach to chemistry. Every compound is rigorously targeted to preserve beneficial insects and soil microbial health.
            </motion.p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: i * 0.2, type: "spring" }}
              >
                <Card className="h-full bg-background-alt border-none shadow-none rounded-none group hover:bg-white transition-all duration-500 overflow-hidden relative">
                  <div className="absolute top-0 left-0 w-full h-1 bg-secondary scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500" />
                  <CardContent className="p-10">
                    <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center mb-8 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                      {feature.icon}
                    </div>
                    <h4 className="text-2xl font-serif text-foreground mb-4">{feature.title}</h4>
                    <p className="text-muted-foreground font-light leading-relaxed group-hover:text-foreground transition-colors">{feature.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. PRODUCT HIGHLIGHTS CAROUSEL */}
      <section className="py-32 bg-primary text-white overflow-hidden relative">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/10 rounded-full" />
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] border border-white/5 rounded-full" />
         
         <div className="container mx-auto px-6 md:px-12 relative z-10 mb-16">
            <div className="flex justify-between items-end">
               <div>
                  <h2 className="text-sm font-bold tracking-widest text-secondary uppercase mb-4">Premium Catalog</h2>
                  <h3 className="text-4xl md:text-6xl font-serif tracking-tight">Featured Solutions</h3>
               </div>
               <div className="hidden md:flex gap-4">
                 <button onClick={scrollPrev} className="w-14 h-14 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-primary transition-all group">
                    <ChevronLeft className="h-6 w-6 group-hover:-translate-x-1 transition-transform" />
                 </button>
                 <button onClick={scrollNext} className="w-14 h-14 rounded-full border border-white/30 flex items-center justify-center hover:bg-white hover:text-primary transition-all group">
                    <ChevronRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                 </button>
               </div>
            </div>
         </div>

         <div className="pl-6 md:pl-12 w-full overflow-hidden" ref={productsRef}>
            <div className="flex gap-8">
               {[1,2,3,4,5].map(item => (
                 <div className="flex-[0_0_85%] md:flex-[0_0_40%] lg:flex-[0_0_30%] min-w-0" key={item}>
                    <motion.div 
                      whileHover={{ y: -10 }}
                      className="bg-white text-foreground p-2 group cursor-pointer"
                    >
                       <div className="h-80 bg-background-alt relative overflow-hidden">
                          <img src={`https://images.unsplash.com/photo-${1580000000000 + item * 10000}?auto=format&fit=crop&q=80&w=600`} alt="Product" className="w-full h-full object-cover mix-blend-multiply opacity-50 group-hover:scale-110 transition-transform duration-700" />
                          <div className="absolute top-4 left-4 bg-secondary text-primary text-xs font-bold uppercase tracking-wider px-3 py-1">Top Tier</div>
                       </div>
                       <div className="p-8">
                          <p className="text-sm text-primary font-bold uppercase tracking-widest mb-2">Herbicide Selection</p>
                          <h4 className="text-2xl font-serif mb-4">Aegis Prime {item}X</h4>
                          <span className="text-primary font-medium flex items-center gap-2">View Technical Data <ArrowRight className="h-4 w-4" /></span>
                       </div>
                    </motion.div>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* 6. TESTIMONIALS SLIDER - EDITORIAL */}
      <section className="py-32 bg-background relative overflow-hidden">
        <div className="absolute left-[10%] top-[20%] text-[20rem] font-serif leading-none text-muted opacity-30 select-none font-bold">"</div>
        <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-5xl">
          <div className="embla" ref={testimonialsRef}>
             <div className="flex">
               {[
                 { name: "Julian Thorne", role: "Owner, Thorne Vineyards", content: "The level of sophistication in their fungicide lines has elevated our entire operation. Disease pressure was neutralized entirely without compromising the organic profile of our harvest." },
                 { name: "Maria Deschamps", role: "Director of Agronomy, Terra Corp", content: "AgroSci isn't just a supplier; they are a critical research partner. Their custom herbicide protocols drastically improved our yield metrics while adhering to EU regulations." }
               ].map((test, i) => (
                 <div className="flex-[0_0_100%] min-w-0" key={i}>
                    <div className="text-center">
                       <h3 className="text-3xl md:text-5xl font-serif text-foreground leading-tight italic mb-12">"{test.content}"</h3>
                       <div className="w-16 h-1 bg-secondary mx-auto mb-8" />
                       <h4 className="text-xl font-bold tracking-wide uppercase">{test.name}</h4>
                       <p className="text-muted-foreground font-serif italic mt-2 text-lg">{test.role}</p>
                    </div>
                 </div>
               ))}
             </div>
          </div>
        </div>
      </section>

    </div>
  );
}
