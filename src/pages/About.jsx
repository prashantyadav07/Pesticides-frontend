import React, { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Lightbulb, Heart, Leaf, Users, Globe, Sprout, ShieldCheck, ArrowRight, Activity
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn, staggerContainerVariants, fadeUpVariants } from '@/lib/utils';

// Register GSAP ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─── NEW 100% STABLE PEXELS IMAGE LINKS ─── */
const MILESTONES =[
  { year: '2009', title: 'The Genesis', desc: 'Started in a small research lab in Delhi with a vision to transform agriculture.', image: 'https://images.pexels.com/photos/256262/pexels-photo-256262.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { year: '2014', title: 'First 100 Products', desc: 'Expanded formulation line to serve diverse crop needs across multiple states.', image: 'https://images.pexels.com/photos/1112080/pexels-photo-1112080.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { year: '2019', title: 'Global Reach', desc: 'Commenced exports to over 15 countries, ensuring global food security.', image: 'https://images.pexels.com/photos/2226458/pexels-photo-2226458.jpeg?auto=compress&cs=tinysrgb&w=800' },
  { year: '2024', title: 'Sustainable Future', desc: 'Launched our 100% organic bio-stimulant range for zero-residue farming.', image: 'https://images.pexels.com/photos/1084540/pexels-photo-1084540.jpeg?auto=compress&cs=tinysrgb&w=800' },
];

const VALUES =[
  { icon: Lightbulb, title: 'Innovation', desc: 'Continuously researching and developing next-generation formulations.' },
  { icon: Heart, title: 'Integrity', desc: 'Transparent, compliant, and honest in everything we do.' },
  { icon: Leaf, title: 'Sustainability', desc: 'Every product designed with environmental responsibility in mind.' },
  { icon: Users, title: 'Farmer First', desc: 'Our decisions are guided by what genuinely benefits the farmer.' },
];

const STATS =[
  { icon: Globe, value: '15+', label: 'Countries Served' },
  { icon: Sprout, value: '250+', label: 'Agro-Products' },
  { icon: Activity, value: '1M+', label: 'Farmers Impacted' },
  { icon: ShieldCheck, value: '100%', label: 'Quality Assured' },
];

/* ─── OPTIMIZED SUB-COMPONENTS ─── */

const ValueCard = React.memo(({ v }) => (
  <motion.div
    className="relative bg-[var(--card)] rounded-3xl p-8 border border-[var(--border)] overflow-hidden group hover:shadow-2xl hover:shadow-[var(--primary)]/10 transition-all duration-500"
    variants={fadeUpVariants}
  >
    <div className="absolute -right-8 -top-8 opacity-5 group-hover:opacity-20 group-hover:rotate-12 transition-all duration-700 pointer-events-none">
      <v.icon className="w-40 h-40 text-[var(--primary)]" />
    </div>

    <div className="w-16 h-16 rounded-2xl bg-[var(--background-alt)] flex items-center justify-center mb-6 group-hover:bg-[var(--primary)] group-hover:scale-110 transition-all duration-500 z-10 relative">
      <v.icon className="size-8 text-[var(--primary)] group-hover:text-white transition-colors" />
    </div>
    <h3 className="font-serif text-2xl font-bold mb-3 relative z-10">{v.title}</h3>
    <p className="text-[var(--muted-foreground)] text-sm leading-relaxed relative z-10">{v.desc}</p>
  </motion.div>
));
ValueCard.displayName = 'ValueCard';

const TimelineEntry = React.memo(({ m, i }) => (
  <div className={cn('timeline-entry relative flex items-center gap-8 mb-32 md:flex-row', i % 2 !== 0 && 'md:flex-row-reverse')}>
    <div className={cn('flex-1 pl-12 md:pl-0', i % 2 === 0 ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16')}>
      <div className="inline-block text-left group w-full max-w-lg">
        <div className="font-serif text-6xl font-black text-[var(--primary)]/10 mb-4 transition-colors group-hover:text-[var(--primary)]/20">{m.year}</div>
        <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden mb-6 border border-[var(--border)] shadow-xl bg-[var(--background-alt)]">
          <div className="absolute inset-0 bg-[var(--primary)]/20 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-500" />
          <img src={m.image} alt={m.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
        </div>
        <h4 className="font-serif text-3xl font-black mb-3">{m.title}</h4>
        <p className="text-[var(--muted-foreground)] text-base leading-relaxed">{m.desc}</p>
      </div>
    </div>
    
    <div className="absolute left-4 md:left-1/2 top-1/2 w-8 h-8 rounded-full bg-[var(--background)] border-4 border-[var(--primary)] -translate-x-1/2 -translate-y-1/2 z-20 flex items-center justify-center shadow-[0_0_15px_rgba(var(--primary-rgb),0.5)]">
      <div className="w-2 h-2 rounded-full bg-[var(--primary)] animate-ping" />
    </div>
    
    <div className="hidden md:block flex-1" />
  </div>
));
TimelineEntry.displayName = 'TimelineEntry';

/* ─── MAIN COMPONENT ─── */

export default function About() {
  const shouldReduceMotion = useReducedMotion();
  const scope = useRef(null);
  
  const { scrollYProgress } = useScroll({ target: scope, offset:["start start", "end end"] });
  const heroY = useTransform(scrollYProgress, [0, 0.2],[0, 150]);
  const leafRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  useEffect(() => {
    if (shouldReduceMotion) return;

    let ctx = gsap.context(() => {
      ScrollTrigger.refresh();

      const entries = gsap.utils.toArray('.timeline-entry');
      entries.forEach((entry, i) => {
        gsap.from(entry, {
          opacity: 0,
          y: 50,
          x: i % 2 === 0 ? -50 : 50,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: entry,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      });
      
      gsap.from('.timeline-line', {
        scaleY: 0,
        transformOrigin: "top center",
        ease: "none",
        scrollTrigger: {
          trigger: '.timeline-container',
          start: 'top 50%',
          end: 'bottom 80%',
          scrub: 1,
        }
      });
    }, scope);

    const handleResize = () => ScrollTrigger.refresh();
    window.addEventListener('resize', handleResize);

    return () => {
      ctx.revert();
      window.removeEventListener('resize', handleResize);
    };
  }, [shouldReduceMotion]);

  return (
    <main ref={scope} role="main" className="overflow-x-hidden bg-[var(--background)]">
      
      {/* ─── 1. HERO SECTION (Image Fixed) ─── */}
      <section className="relative min-h-[90vh] flex items-center pt-32 pb-20 overflow-hidden">
        <motion.div style={{ rotate: leafRotate }} className="absolute -top-20 -right-20 text-[var(--primary)]/5 pointer-events-none z-0">
          <svg width="400" height="400" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 22C12 22 2 16 2 8C2 4.69 4.69 2 8 2C9.5 2 10.87 2.56 12 3.5C13.13 2.56 14.5 2 16 2C19.31 2 22 4.69 22 8C22 16 12 22 12 22Z" /></svg>
        </motion.div>

        <div className="container-custom relative z-10 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <Badge className="bg-[var(--primary)]/10 text-[var(--primary)] px-4 py-1.5 text-sm mb-8 border border-[var(--primary)]/20 rounded-full">
              Pioneering since 2009
            </Badge>
            <h1 className="font-serif text-6xl md:text-8xl font-black mb-6 leading-[1.05] tracking-tight text-[var(--foreground)]">
              The Science of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)]">
                Prosperous Harvests.
              </span>
            </h1>
            <p className="text-lg md:text-xl text-[var(--muted-foreground)] max-w-lg mb-10 leading-relaxed">
              We blend cutting-edge agronomy with sustainable practices to create formulations that empower farmers and heal the earth.
            </p>
            <div className="flex gap-4">
              <button className="px-8 py-4 rounded-full bg-[var(--primary)] text-white font-semibold hover:bg-[var(--primary)]/90 transition-all flex items-center gap-2 group">
                Discover Our Impact <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>

          <motion.div style={{ y: heroY }} className="relative aspect-[4/5] lg:aspect-square z-10">
             <div className="absolute inset-0 bg-gradient-to-tr from-[var(--primary)]/20 to-transparent rounded-[4rem] -rotate-3 scale-105 -z-10 blur-2xl" />
             {/* Pexels Image - Highly Stable */}
             <img 
               src="https://images.pexels.com/photos/2165688/pexels-photo-2165688.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
               alt="Agro field"
               fetchPriority="high"
               className="w-full h-full object-cover rounded-[4rem] shadow-2xl border-4 border-[var(--background)] bg-[var(--background-alt)]"
             />
          </motion.div>
        </div>
      </section>

      {/* ─── 2. GLOBAL IMPACT (Animated Stats) ─── */}
      <section className="py-16 border-y border-[var(--border)] bg-[var(--background-alt)] relative overflow-hidden">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x-0 md:divide-x divide-[var(--border)]">
            {STATS.map((stat, idx) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="flex flex-col items-center text-center px-4"
              >
                <div className="w-12 h-12 mb-4 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-[var(--primary)]" />
                </div>
                <h4 className="text-4xl md:text-5xl font-black font-serif text-[var(--foreground)] mb-2">{stat.value}</h4>
                <p className="text-[var(--muted-foreground)] font-medium text-sm md:text-base uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. VISION & MISSION (Images Fixed) ─── */}
      <section className="py-32 relative">
        <div className="container-custom grid lg:grid-cols-2 gap-20 items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Pexels Stable Images added below */}
              <img 
                src="https://images.pexels.com/photos/3825586/pexels-photo-3825586.jpeg?auto=compress&cs=tinysrgb&w=800" 
                className="rounded-3xl object-cover h-64 w-full mt-12 shadow-lg bg-[var(--background-alt)]" 
                alt="Lab Research" 
              />
              <img 
                src="https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg?auto=compress&cs=tinysrgb&w=800" 
                className="rounded-3xl object-cover h-64 w-full shadow-lg bg-[var(--background-alt)]" 
                alt="Happy Farmer" 
              />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[var(--card)] p-6 rounded-2xl shadow-2xl border border-[var(--border)] text-center w-48 z-20">
              <Sprout className="w-10 h-10 text-[var(--primary)] mx-auto mb-2" />
              <p className="font-bold text-[var(--foreground)]">Zero Harm</p>
              <p className="text-xs text-[var(--muted-foreground)]">Formulations</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-[var(--primary)] font-bold tracking-widest uppercase mb-4 text-sm">Our Vision</h2>
            <h3 className="font-serif text-4xl md:text-5xl font-black mb-6 leading-tight">
              Bridging the gap between <span className="italic text-[var(--primary)]">Nature</span> and <span className="italic text-[var(--secondary)]">Technology.</span>
            </h3>
            <p className="text-[var(--muted-foreground)] text-lg mb-6 leading-relaxed">
              We envision a world where agriculture is not just about high yields, but about preserving the soil for generations. By integrating bio-technology with traditional farming wisdom, we formulate solutions that protect crops while nurturing the ecosystem.
            </p>
            <ul className="space-y-4">
              {['Rigorous R&D Process', 'Eco-friendly Packaging', 'Ethical Sourcing'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-[var(--foreground)] font-medium">
                  <div className="w-6 h-6 rounded-full bg-[var(--primary)]/20 flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4 text-[var(--primary)]" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* ─── 4. CORE VALUES SECTION ─── */}
      <section className="py-32 bg-[var(--background-alt)] rounded-[4rem] mx-4 lg:mx-10 my-10 shadow-sm border border-[var(--border)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, var(--primary) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
        
        <div className="container-custom relative z-10 text-center mb-20">
          <h2 className="font-serif text-4xl md:text-5xl font-black mb-6">Pillars of Our <span className="text-[var(--primary)]">Excellence</span></h2>
          <p className="text-[var(--muted-foreground)] text-lg max-w-2xl mx-auto">The principles that guide every experiment in our labs and every product we deliver to the fields.</p>
        </div>

        <div className="container-custom relative z-10">
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {VALUES.map((v) => <ValueCard key={v.title} v={v} />)}
          </motion.div>
        </div>
      </section>

      {/* ─── 5. EVOLUTION (Timeline) SECTION ─── */}
      <section className="py-32 relative">
        <div className="container-custom text-center mb-24">
          <h2 className="font-serif text-4xl md:text-5xl font-black mb-6">Our Journey of <span className="text-[var(--secondary)]">Growth</span></h2>
          <p className="text-[var(--muted-foreground)] text-lg max-w-2xl mx-auto">From a modest beginning to a global footprint, our evolution is a testament to relentless innovation.</p>
        </div>

        <div className="container-custom timeline-container relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-[var(--primary)]/50 via-[var(--secondary)]/50 to-transparent -translate-x-1/2 timeline-line hidden md:block" />
           {MILESTONES.map((m, i) => (
             <TimelineEntry key={m.year} m={m} i={i} />
           ))}
        </div>
      </section>

      {/* ─── 6. CALL TO ACTION (CTA) ─── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[var(--primary)]" />
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay" />
        
        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="font-serif text-5xl md:text-6xl font-black text-white mb-8">
              Ready to Cultivate Success?
            </h2>
            <p className="text-white/80 text-xl mb-10 leading-relaxed">
              Partner with us to experience agricultural formulations that deliver unmatched yield and uncompromised safety.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="px-8 py-4 rounded-full bg-white text-[var(--primary)] font-bold text-lg hover:scale-105 transition-transform shadow-xl w-full sm:w-auto">
                Explore Products
              </button>
              <button className="px-8 py-4 rounded-full bg-transparent border-2 border-white text-white font-bold text-lg hover:bg-white/10 transition-colors w-full sm:w-auto">
                Contact Our Team
              </button>
            </div>
          </motion.div>
        </div>
      </section>

    </main>
  );
}