import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Leaf, FlaskConical, Target, Award } from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';

export default function About() {
  const { scrollYProgress } = useScroll();
  const yImage = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);

  const timeline = [
    { year: "1998", title: "Inception & Genesis", desc: "Started as an independent biochemical research lab focusing on botanical pest repellents." },
    { year: "2006", title: "Breakthrough Synthesis", desc: "Patented the targeted delivery mechanism that would become the foundation of our entire product line." },
    { year: "2015", title: "Global Operations", desc: "Expanded manufacturing to 3 continents, ensuring resilient supply chains for our partners." },
    { year: "2023", title: "The Sustainability Pledge", desc: "Committed to 100% biodegradable residues across all product lines by 2030." },
  ];

  const team = [
    { name: "Dr. Evelyn Vance", role: "Chief Scientific Officer", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop" },
    { name: "Marcus Thorne", role: "VP of Global Agronomy", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop" },
    { name: "Dr. Hassan El-Amin", role: "Head of Synthetic Biology", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800&auto=format&fit=crop" },
    { name: "Elena Rostova", role: "Director of Sustainability", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop" },
  ];

  return (
    <div className="w-full bg-background-alt pt-24 pb-0 overflow-hidden font-sans">
      
      {/* 1. EDITORIAL HEADER */}
      <section className="relative pt-20 pb-32">
         <div className="container mx-auto px-6 md:px-12 text-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="w-1 h-32 bg-secondary mx-auto mb-10"
            />
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-sm font-bold tracking-[0.2em] text-secondary uppercase mb-6"
            >
               Our Heritage
            </motion.p>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-7xl lg:text-8xl font-serif text-foreground leading-[1.1] tracking-tight max-w-5xl mx-auto"
            >
              Defining the next era of <br className="hidden md:block"/> <i className="text-primary text-gradient border-b border-primary pb-2">crop intelligence.</i>
            </motion.h1>
         </div>
      </section>

      {/* 2. SPLIT LAYOUT STORY */}
      <section className="bg-white py-32 border-t border-border relative">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
             
             {/* Left Text */}
             <motion.div 
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true, margin: "-100px" }}
               transition={{ duration: 0.8 }}
               className="space-y-8"
             >
               <h2 className="text-4xl md:text-5xl font-serif text-foreground leading-tight">We believe that superior chemistry is the key to global food security.</h2>
               <div className="w-12 h-1 bg-secondary" />
               <p className="text-lg text-muted-foreground font-light leading-relaxed">
                 Founded on the principle that agriculture need not be at odds with the environment, AgroSci has spent decades perfecting the balance between high-potency crop protection and ecological safety. 
               </p>
               <p className="text-lg text-muted-foreground font-light leading-relaxed">
                 Our laboratories employ state-of-the-art computational modeling to design molecules that target specific pest receptors, ensuring that beneficial pollinators and soil microbiomes remain completely unaffected.
               </p>
               
               <div className="grid grid-cols-2 gap-8 pt-8 border-t border-border">
                  <div>
                     <h4 className="text-4xl font-serif text-primary mb-2">200+</h4>
                     <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Ph.D Scientists</p>
                  </div>
                  <div>
                     <h4 className="text-4xl font-serif text-primary mb-2">40+</h4>
                     <p className="text-sm text-muted-foreground font-medium uppercase tracking-wider">Research Facilities</p>
                  </div>
               </div>
             </motion.div>

             {/* Right Image */}
             <div className="relative h-[700px] rounded-none overflow-hidden group">
                <motion.div style={{ y: yImage }} className="absolute inset-0 -top-20 -bottom-20">
                  <img src="https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=1200&auto=format&fit=crop" alt="Lab Research" className="w-full h-full object-cover scale-110" />
                </motion.div>
                <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors duration-700" />
             </div>

          </div>
        </div>
      </section>

      {/* 3. MISSION / VISION CARDS */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
         {/* Decorative Mesh */}
         <div className="absolute -top-[20%] -right-[10%] w-[800px] h-[800px] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-from)_0%,_transparent_70%)] from-[#1f563b] opacity-50" />
         
         <div className="container mx-auto px-6 md:px-12 relative z-10">
            <div className="grid md:grid-cols-2 gap-12">
               
               <motion.div 
                 initial={{ opacity: 0, y: 40 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8 }}
                 className="bg-white/5 backdrop-blur-md p-12 md:p-16 border border-white/10"
               >
                 <Target className="h-10 w-10 text-secondary mb-8" />
                 <h3 className="text-3xl font-serif mb-6">Our Mission</h3>
                 <p className="text-white/80 text-lg font-light leading-relaxed">
                   To engineer precision agricultural solutions that dramatically increase yield, eradicate disease, and elevate the profitability of modern farming operations without compromising the delicate balance of surrounding ecosystems.
                 </p>
               </motion.div>

               <motion.div 
                 initial={{ opacity: 0, y: 40 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.8, delay: 0.2 }}
                 className="bg-secondary p-12 md:p-16 text-primary"
               >
                 <FlaskConical className="h-10 w-10 text-primary mb-8" />
                 <h3 className="text-3xl font-serif mb-6">Our Vision</h3>
                 <p className="text-primary/90 text-lg font-medium leading-relaxed">
                   A global agricultural network fortified by intelligent chemistry, where total food security is achieved in absolute harmony with nature, ensuring prosperity for generations to come.
                 </p>
               </motion.div>

            </div>
         </div>
      </section>

      {/* 4. ANIMATED TIMELINE */}
      <section className="py-32 bg-background-alt">
        <div className="container mx-auto px-6 md:px-12">
           <div className="mb-20 text-center">
             <h2 className="text-4xl md:text-5xl font-serif text-foreground">A Legacy of Innovation</h2>
           </div>

           <div className="max-w-5xl mx-auto border-l-2 border-primary/20 pl-8 ml-4 md:ml-auto md:border-l-0 md:pl-0">
             {timeline.map((item, index) => (
               <motion.div 
                 key={index}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-100px" }}
                 transition={{ duration: 0.6 }}
                 className="relative mb-20 md:mb-32 last:mb-0"
               >
                  {/* Desktop layout: alternating left/right */}
                  <div className="hidden md:grid grid-cols-2 gap-16 items-center">
                    <div className={`${index % 2 === 0 ? 'text-right pr-6' : 'col-start-2 text-left pl-6'} relative`}>
                       <h3 className="text-3xl font-serif text-primary mb-4">{item.title}</h3>
                       <p className="text-muted-foreground text-lg font-light leading-relaxed">{item.desc}</p>
                    </div>
                    {/* Center Node */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-secondary rounded-full ring-8 ring-background-alt z-10" />
                    {/* Vertical line through center */}
                    <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-0.5 bg-primary/10 -z-0" />
                    
                    <div className={`${index % 2 === 0 ? 'col-start-2 text-left pl-6' : 'row-start-1 text-right pr-6'}`}>
                       <span className="text-7xl font-serif font-black text-primary/10 select-none tracking-tighter">{item.year}</span>
                    </div>
                  </div>

                  {/* Mobile layout */}
                  <div className="md:hidden">
                    <div className="absolute left-[-33px] top-6 w-3 h-3 bg-secondary rounded-full ring-4 ring-background-alt" />
                    <span className="text-5xl font-serif font-black text-primary/20 select-none mb-2 block">{item.year}</span>
                    <h3 className="text-2xl font-serif text-primary mb-3">{item.title}</h3>
                    <p className="text-muted-foreground font-light">{item.desc}</p>
                  </div>
               </motion.div>
             ))}
           </div>
        </div>
      </section>

      {/* 5. TEAM GRID WITH HOVER REVEAL */}
      <section className="py-32 bg-white border-t border-border">
        <div className="container mx-auto px-6 md:px-12">
           <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div className="max-w-xl">
                 <h2 className="text-sm font-bold tracking-[0.2em] text-secondary uppercase mb-4">Leadership</h2>
                 <h3 className="text-4xl md:text-5xl font-serif text-foreground">Minds Behind the Molecules</h3>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
             {team.map((member, i) => (
               <motion.div
                 key={i}
                 initial={{ opacity: 0, y: 30 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true, margin: "-50px" }}
                 transition={{ duration: 0.6, delay: i * 0.1 }}
                 className="group cursor-none"
               >
                 <div className="relative overflow-hidden aspect-[3/4] bg-muted">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover filter grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                    
                    {/* Hover Reveal Content */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-transparent translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] p-8 flex flex-col justify-end">
                       <h4 className="text-2xl font-serif text-white mb-1">{member.name}</h4>
                       <p className="text-secondary font-medium text-sm uppercase tracking-wider">{member.role}</p>
                    </div>
                 </div>
               </motion.div>
             ))}
           </div>
        </div>
      </section>

    </div>
  );
}
