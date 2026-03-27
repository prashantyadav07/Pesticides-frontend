import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { toast } from 'sonner';
import {
  Send, MapPin, Phone, Mail, Loader2, ArrowRight
} from 'lucide-react';

// UI Components
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

// Media Assets
import contactVideo from '../assets/Agrochemical_Brand_Video_Generation_Request.mp4';

gsap.registerPlugin(ScrollTrigger);

// --- Content Constants ---
const CONTACT_METHODS = [
  {
    icon: <MapPin className="size-5" />,
    title: 'Visit Us',
    value: 'Delhi Agro Hub, 110001',
    color: 'bg-emerald-50 text-emerald-600'
  },
  {
    icon: <Phone className="size-5" />,
    title: 'Call Us',
    value: '+91 98765 43210',
    color: 'bg-blue-50 text-blue-600'
  },
  {
    icon: <Mail className="size-5" />,
    title: 'Email Us',
    value: 'info@CropLand.in',
    color: 'bg-orange-50 text-orange-600'
  }
];

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const contactRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation for left side elements
      gsap.from(".left-element", {
        x: -40,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: contactRef.current,
          start: "top 80%",
        }
      });
    }, contactRef);
    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(r => setTimeout(r, 1800)); // Fake submit
    toast.success("Query Received! We'll get back shortly.");
    setIsSubmitting(false);
    e.target.reset();
  };

  return (
    <main ref={contactRef} className="min-h-screen bg-[#fafaf9] text-[#1c1917] selection:bg-emerald-100 selection:text-emerald-900">

      {/* --- HERO SECTION --- */}
      <section className="relative pt-24 md:pt-32 pb-12 md:pb-16 overflow-hidden">
        {/* Video Background Layer */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-70 transition-opacity duration-1000"
          >
            <source src={contactVideo} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#fafaf9]/10 via-[#fafaf9]/40 to-[#fafaf9]" />
        </div>

        <div className="container px-6 mx-auto relative z-10">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Badge className="mb-4 md:mb-6 bg-emerald-100/80 backdrop-blur-sm text-emerald-700 hover:bg-emerald-100 border-none px-4 py-1 rounded-full uppercase tracking-widest text-[10px] font-bold shadow-sm">
              Connect With CropLand
            </Badge>
            <h1 className="text-3xl md:text-5xl font-serif font-medium tracking-tight leading-[1.1] md:leading-[0.9] mb-6 md:mb-8">
              Let's grow <span className="italic text-emerald-600">something</span> <br />
              extraordinary.
            </h1>
          </motion.div>
        </div>
      </section>

      {/* --- MAIN CONTENT GRID --- */}
      <section className="pb-16 md:pb-32 container px-6 mx-auto">
        <div className="grid lg:grid-cols-12 gap-6 md:gap-16 items-start">

          {/* LEFT SIDE */}
          <div className="lg:col-span-5 space-y-4 md:space-y-10 lg:pr-8">
            <div className="left-element">
              <p className="text-base md:text-lg text-stone-600 max-w-xl leading-relaxed">
                Have a question about sustainable farming? Our experts are standing by to help you optimize your yield. Choose your preferred method to reach out.
              </p>
            </div>

            {/* Trusted Highlights */}
            <div className="left-element grid grid-cols-3 gap-4 py-2 border-y border-stone-100/50">
              {[
                { label: '50k+', desc: 'Farmers' },
                { label: '100+', desc: 'Experts' },
                { label: '24/7', desc: 'Support' }
              ].map((stat) => (
                <div key={stat.label} className="space-y-0.5">
                  <p className="text-lg md:text-xl font-serif font-bold text-emerald-600 tracking-tight">{stat.label}</p>
                  <p className="text-[9px] uppercase tracking-wider text-stone-400 font-bold leading-none">{stat.desc}</p>
                </div>
              ))}
            </div>

            {/* Our Commitment (Fills middle whitespace on mobile) */}
            <div className="left-element p-4 md:p-6 bg-emerald-50/40 rounded-[2rem] border border-emerald-100/30">
              <h4 className="text-[10px] font-bold uppercase tracking-widest text-emerald-800 mb-4 flex items-center gap-2">
                <span className="w-4 h-px bg-emerald-300" /> Professional Standards
              </h4>
              <div className="grid gap-4">
                {[
                  { title: 'Lab Certified', desc: 'All solutions are ICAR lab-tested.' },
                  { title: 'Expert Guided', desc: 'Direct access to senior agronomists.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="size-6 rounded-lg bg-white shadow-sm flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold text-emerald-600 border border-emerald-50">0{i + 1}</div>
                    <div>
                      <p className="text-sm font-bold text-stone-800">{item.title}</p>
                      <p className="text-[11px] text-stone-500 mt-0.5 font-medium leading-tight">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Contact Cards */}
            <div className="grid gap-3 md:gap-5">
              {CONTACT_METHODS.map((item, i) => (
                <div key={i} className="left-element flex items-center gap-4 md:gap-5 p-3.5 md:p-6 bg-white border border-stone-200 rounded-2xl md:rounded-3xl transition-all hover:shadow-xl hover:shadow-emerald-900/5 hover:-translate-y-0.5 shadow-sm shadow-stone-200/50">
                  <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl ${item.color} flex items-center justify-center`}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">{item.title}</p>
                    <h4 className="text-base md:text-lg font-semibold mt-0.5 md:mt-1">{item.value}</h4>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* RIGHT SIDE: PREMIUM FORM */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-white/80 backdrop-blur-md border border-stone-200 rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-14 shadow-xl shadow-stone-200/40 relative mt-2 md:mt-0"
          >
            <div className="mb-10">
              <h2 className="text-2xl font-serif font-medium tracking-tight">Send us a message</h2>
              <p className="text-stone-500 mt-1.5">A dedicated agronomist will review your request and get back to you.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400 ml-1">Full Name</label>
                  <Input placeholder="John Doe" className="border-0 border-b border-stone-200 rounded-none px-1 focus-visible:ring-0 focus-visible:border-emerald-600 transition-colors bg-transparent text-base h-11" required />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400 ml-1">Email Address</label>
                  <Input type="email" placeholder="john@agro.com" className="border-0 border-b border-stone-200 rounded-none px-1 focus-visible:ring-0 focus-visible:border-emerald-600 transition-colors bg-transparent text-base h-11" required />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-stone-400 ml-1">Your Message</label>
                <Textarea
                  placeholder="Tell us about your farm or inquiry..."
                  className="min-h-[160px] border-stone-200 rounded-2xl p-4 focus-visible:ring-emerald-600/20 focus-visible:border-emerald-600 transition-all bg-stone-50/50 text-base"
                  required
                />
              </div>

              <Button
                disabled={isSubmitting}
                className="w-full h-16 rounded-2xl bg-stone-950 hover:bg-emerald-700 text-white font-bold transition-all group relative"
              >
                <AnimatePresence mode="wait">
                  {isSubmitting ? (
                    <motion.div key="loader" initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: -20 }} className="flex items-center gap-2">
                      <Loader2 className="animate-spin size-5" /> Transmission in Progress
                    </motion.div>
                  ) : (
                    <motion.div key="text" initial={{ y: 20 }} animate={{ y: 0 }} exit={{ y: -20 }} className="flex items-center gap-2 text-base">
                      Securely Send Message <ArrowRight className="size-5 group-hover:translate-x-1.5 transition-transform" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </Button>
            </form>
          </motion.div>

        </div>
      </section>

      {/* --- PREMIUM HEADQUARTERS SECTION --- */}
      <section className="container px-6 mx-auto pb-16 md:pb-32">
        <div className="group h-[450px] md:h-[520px] w-full rounded-[2.5rem] md:rounded-[4rem] overflow-hidden relative shadow-2xl shadow-emerald-900/10">

          {/* Stylized Google Map Iframe */}
          <div className="absolute inset-0 z-0 after:absolute after:inset-0 after:bg-emerald-950/[0.02] after:pointer-events-none">
            <iframe
              title="Headquarters Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14030.83584511855!2d77.06571!3d28.45949!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d1921575ca277%3A0xe539659f81d5854b!2sSector%2018%2C%20Gurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1711585800000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{
                border: 0,
                filter: 'grayscale(0.3) contrast(1.1) brightness(1) hue-rotate(130deg) saturate(0.9)'
              }}
              allowFullScreen=""
              loading="lazy"
              className="opacity-100 transition-opacity duration-700"
            ></iframe>
          </div>

          {/* Minimal Floating Location Chip */}
          <div className="absolute bottom-6 left-6 z-10">
            <div className="p-3 bg-white/90 backdrop-blur-md rounded-2xl border border-stone-200 shadow-xl flex items-center gap-3">
              <div className="size-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <MapPin className="size-4" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">Headquarters</p>
                <p className="text-xs font-semibold text-stone-900">Sector 18, Gurugram</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}