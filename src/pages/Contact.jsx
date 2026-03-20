import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, Globe, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { toast } from 'sonner';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate network request
    setTimeout(() => {
      toast.success('Inquiry Received', {
        description: 'An AgroSci representative will contact you within 24 hours.',
        duration: 5000,
        className: 'border-l-4 border-l-secondary'
      });
      setIsSubmitting(false);
      e.target.reset();
    }, 1500);
  };

  const contactCards = [
    { icon: <MapPin className="h-6 w-6" />, title: "Headquarters", content: "123 Agrotech Valley\nGreen City, GC 40592\nUnited States" },
    { icon: <Phone className="h-6 w-6" />, title: "Direct Line", content: "+1 (800) 123-4567\nMon-Fri, 08:00 - 18:00 EST" },
    { icon: <Mail className="h-6 w-6" />, title: "Electronic Mail", content: "inquiries@agrosci.com\nsales.global@agrosci.com" },
  ];

  return (
    <div className="w-full bg-background pt-32 pb-32">
      
      <div className="container mx-auto px-6 md:px-12">
        
        {/* EDITORIAL HEADER */}
        <div className="max-w-4xl mb-24">
           <motion.p 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             className="text-sm font-bold tracking-[0.2em] text-secondary uppercase mb-6"
           >
              Global Presence
           </motion.p>
           <motion.h1 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.1 }}
             className="text-5xl md:text-7xl lg:text-8xl font-serif text-foreground leading-[1.05] tracking-tight mb-8"
           >
             Let's elevate your <br/> <i className="text-primary italic">agricultural yield.</i>
           </motion.h1>
           <motion.p 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ delay: 0.2 }}
             className="text-xl text-muted-foreground font-light max-w-2xl leading-relaxed"
           >
             Consult with our elite panel of agronomists, request detailed safety data sheets, or discuss strategic global partnerships.
           </motion.p>
        </div>

        {/* INFO CARDS (Top Row) */}
        <div className="grid md:grid-cols-3 gap-8 mb-32 border-t border-border pt-16">
          {contactCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="flex items-start gap-6 group"
            >
              <div className="h-14 w-14 rounded-none bg-background-alt border border-border flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-colors duration-500 shrink-0">
                {card.icon}
              </div>
              <div>
                <h3 className="text-xl font-serif text-foreground mb-3">{card.title}</h3>
                <p className="text-muted-foreground whitespace-pre-line font-light leading-relaxed">{card.content}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* TWO COLUMN: FORM & MAP */}
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7"
          >
            <div className="bg-white p-10 md:p-14 border border-border shadow-xl">
               <h3 className="text-3xl font-serif text-foreground mb-8">Direct Inquiry</h3>
               
               <form onSubmit={handleSubmit} className="space-y-8">
                 <div className="grid sm:grid-cols-2 gap-8">
                   <div className="relative border-b border-border focus-within:border-primary transition-colors pb-2">
                     <label htmlFor="firstName" className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-2 block">First Name</label>
                     <input id="firstName" required className="w-full bg-transparent border-none outline-none text-foreground placeholder-muted font-light" placeholder="John" />
                   </div>
                   <div className="relative border-b border-border focus-within:border-primary transition-colors pb-2">
                     <label htmlFor="lastName" className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-2 block">Last Name</label>
                     <input id="lastName" required className="w-full bg-transparent border-none outline-none text-foreground placeholder-muted font-light" placeholder="Doe" />
                   </div>
                 </div>
                 
                 <div className="relative border-b border-border focus-within:border-primary transition-colors pb-2">
                   <label htmlFor="email" className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-2 block">Corporate Email</label>
                   <input id="email" type="email" required className="w-full bg-transparent border-none outline-none text-foreground placeholder-muted font-light" placeholder="john.doe@enterprise.com" />
                 </div>
                 
                 <div className="relative border-b border-border focus-within:border-primary transition-colors pb-2">
                   <label htmlFor="subject" className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-2 block">Nature of Inquiry</label>
                   <select id="subject" className="w-full bg-transparent border-none outline-none text-foreground font-light appearance-none cursor-pointer">
                     <option>Product & Formulation Details</option>
                     <option>Bulk Purchasing & Logistics</option>
                     <option>Technical Agronomy Support</option>
                     <option>Press & Media Relations</option>
                   </select>
                 </div>
                 
                 <div className="relative border-b border-border focus-within:border-primary transition-colors pb-2">
                   <label htmlFor="message" className="text-xs font-bold tracking-widest uppercase text-muted-foreground mb-4 block">Detailed Message</label>
                   <textarea id="message" required className="w-full min-h-[120px] bg-transparent border-none outline-none text-foreground placeholder-muted font-light resize-none" placeholder="Elaborate on your requirements..." />
                 </div>
                 
                 <Button 
                    type="submit" 
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-[#123122] text-white rounded-none py-7 text-lg uppercase tracking-widest font-bold group transition-all"
                 >
                   {isSubmitting ? 'Transmitting...' : 'Submit Inquiry'} 
                   {!isSubmitting && <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-2 transition-transform" /> }
                 </Button>
               </form>
            </div>
          </motion.div>

          {/* Editorial Map & Context */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 space-y-12"
          >
            {/* Premium Map Section */}
            <div>
               <h4 className="font-serif text-2xl text-foreground mb-6">Global Command Center</h4>
               <div className="w-full h-[450px] overflow-hidden bg-background-alt relative group">
                  <div className="absolute inset-0 bg-[#e0ded8] opacity-60 mix-blend-multiply" />
                  <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')] mix-blend-overlay" />
                  
                  {/* Subtle map imagery */}
                  <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop" className="absolute inset-0 w-full h-full object-cover mix-blend-luminosity opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-1000" />
                  
                  <div className="absolute inset-0 z-10 flex items-center justify-center">
                     {/* The Pin */}
                     <div className="relative">
                        <div className="absolute -inset-4 bg-secondary/30 rounded-full animate-ping" />
                        <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center shadow-2xl relative z-10 border-2 border-white">
                           <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                     </div>
                  </div>
               </div>
            </div>

            <div className="bg-primary text-white p-10 relative overflow-hidden">
               <Globe className="absolute -right-10 -top-10 text-white/10 w-64 h-64" />
               <h4 className="font-serif text-2xl mb-4 relative z-10">Worldwide Logistics</h4>
               <p className="text-white/80 font-light leading-relaxed relative z-10">
                  AgroSci maintains a sophisticated global logistics network, guaranteeing that our highly sensitive chemical formulations arrive at your facility with absolute structural integrity, regardless of the destination continent.
               </p>
            </div>
            
          </motion.div>
        
        </div>
      </div>
    </div>
  );
}
