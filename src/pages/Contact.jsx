import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { toast } from 'sonner';
import {
  Send, MapPin, Phone, Mail, Loader2, Clock, ArrowRight, Globe, Award, Leaf
} from 'lucide-react';

// UI Components
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

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
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="container px-6 mx-auto relative z-10">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Badge className="mb-6 bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-none px-4 py-1 rounded-full uppercase tracking-widest text-[10px] font-bold">
              Connect With CropLand
            </Badge>
            <h1 className="text-4xl md:text-5xl font-serif font-medium tracking-tight leading-[0.9] mb-8">
              Let's grow <span className="italic text-emerald-600">something</span> <br />
              extraordinary.
            </h1>
          </motion.div>
        </div>
      </section>

      {/* --- MAIN CONTENT GRID (Now Balanced) --- */}
      <section className="pb-32 container px-6 mx-auto">
        <div className="grid lg:grid-cols-12 gap-16 items-start">

          {/* LEFT SIDE: Ab Yeh Blank Nahi Hai!
            Humne blank space ko direct contact cards aur trust signals se bhar diya hai.
          */}
          <div className="lg:col-span-5 space-y-10 pr-8">
            <div className="left-element">
              <p className="text-lg text-stone-600 max-w-xl leading-relaxed">
                Have a question about sustainable farming? Our experts are standing by to help you optimize your yield. Choose your preferred method to reach out.
              </p>
            </div>

            {/* Quick Contact Cards */}
            <div className="grid gap-5">
              {CONTACT_METHODS.map((item, i) => (
                <div key={i} className="left-element flex items-center gap-5 p-6 bg-white border border-stone-200 rounded-3xl transition-all hover:shadow-lg hover:shadow-emerald-900/5 hover:-translate-y-0.5">
                  <div className={`w-12 h-12 rounded-2xl ${item.color} flex items-center justify-center`}>
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-stone-400">{item.title}</p>
                    <h4 className="text-lg font-semibold mt-1">{item.value}</h4>
                  </div>
                </div>
              ))}
            </div>

            {/* Trust Signals & Availability (Replaces the dark blob) */}
            <div className="left-element p-8 bg-stone-950 rounded-[2rem] text-white flex items-center justify-between overflow-hidden relative group">
              <div className="relative z-10">
                <Badge variant="outline" className="text-emerald-400 border-emerald-900 mb-3 rounded-full text-[10px] uppercase font-bold pr-3">
                  <Clock className="size-3.5 mr-1.5" /> Online Support
                </Badge>
                <h4 className="text-2xl font-serif font-medium leading-snug">Average Response <br />Time: 2 Hours</h4>
                <p className="text-stone-400 text-sm mt-3">Excluding Sundays and National Holidays.</p>
              </div>
              <Globe className="size-32 absolute -right-8 -bottom-8 opacity-5 text-emerald-500 group-hover:scale-110 transition-transform duration-500" />
            </div>

            {/* Certified Badge (Extra Design Element) */}
            <div className="left-element flex items-center gap-3 p-4 border border-stone-200 rounded-full w-fit bg-stone-50">
              <Leaf className="size-5 text-emerald-600" />
              <p className="text-sm font-medium text-stone-700">ICAR Certified Sustainable Practices</p>
            </div>
          </div>

          {/* RIGHT SIDE: PREMIUM FORM (Slightly more compact to match) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-7 bg-white border border-stone-200 rounded-[3.5rem] p-10 md:p-14 shadow-2xl shadow-stone-200/50 relative"
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

      {/* --- MAP PLACEHOLDER SECTION (Remains the same) --- */}
      <section className="container px-6 mx-auto pb-32">
        <div className="h-[480px] w-full bg-stone-200 rounded-[4rem] overflow-hidden grayscale contrast-125 relative">
          <div className="absolute inset-0 flex items-center justify-center bg-stone-950/5">
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl shadow-2xl text-center max-w-sm">
              <Award className="size-10 text-emerald-600 mx-auto mb-4" />
              <h4 className="text-xl font-bold">Main Headquarters</h4>
              <p className="text-sm text-stone-600 mt-2 mb-4 leading-relaxed">CropLand House, Sector 18, Gurugram. Open for consultations.</p>
              <Button size="lg" className="rounded-full bg-emerald-600 hover:bg-emerald-700 px-8 text-sm">Open in Maps</Button>
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80"
            className="w-full h-full object-cover opacity-50"
            alt="Farm Map"
          />
        </div>
      </section>

    </main>
  );
}