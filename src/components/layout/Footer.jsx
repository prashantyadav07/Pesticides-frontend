import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, Facebook, Twitter, Instagram, Linkedin, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-primary text-white pt-24 pb-12 relative overflow-hidden">

      {/* Decorative Gradient/Mesh */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-black/20 to-transparent pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-8 xl:gap-16 mb-20">

          {/* Logo & Tagline */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-2 group inline-block">
              <Sprout className="h-8 w-8 text-secondary" strokeWidth={1.5} />
              <span className="text-3xl font-serif font-semibold tracking-tight text-white drop-shadow-sm">
                Agro<span className="text-secondary italic">Sci</span>
              </span>
            </Link>
            <p className="text-white/70 text-[15px] leading-relaxed max-w-sm font-sans font-light">
              Elevating agricultural standards through cutting-edge, sustainable chemistry. Engineered for the farmers of tomorrow.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="#" className="h-10 w-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-secondary hover:border-secondary hover:text-primary transition-all duration-300 group"><Facebook className="h-4 w-4" /></a>
              <a href="#" className="h-10 w-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-secondary hover:border-secondary hover:text-primary transition-all duration-300 group"><Twitter className="h-4 w-4" /></a>
              <a href="#" className="h-10 w-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-secondary hover:border-secondary hover:text-primary transition-all duration-300 group"><Instagram className="h-4 w-4" /></a>
              <a href="#" className="h-10 w-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-secondary hover:border-secondary hover:text-primary transition-all duration-300 group"><Linkedin className="h-4 w-4" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:pl-8">
            <h3 className="font-serif text-xl mb-6 text-white border-b border-white/10 pb-4">Company</h3>
            <ul className="space-y-4 font-sans font-light">
              <li><Link to="/about" className="text-white/70 hover:text-secondary hover:tracking-wide transition-all duration-300 flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-secondary opacity-0 group-hover:opacity-100 transition-opacity" /> About Us</Link></li>
              <li><Link to="/sustainability" className="text-white/70 hover:text-secondary hover:tracking-wide transition-all duration-300 flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-secondary opacity-0 group-hover:opacity-100 transition-opacity" /> Sustainability</Link></li>
              <li><Link to="/careers" className="text-white/70 hover:text-secondary hover:tracking-wide transition-all duration-300 flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-secondary opacity-0 group-hover:opacity-100 transition-opacity" /> Careers</Link></li>
              <li><Link to="/contact" className="text-white/70 hover:text-secondary hover:tracking-wide transition-all duration-300 flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-secondary opacity-0 group-hover:opacity-100 transition-opacity" /> Contact</Link></li>
            </ul>
          </div>

          {/* Products Links */}
          <div>
            <h3 className="font-serif text-xl mb-6 text-white border-b border-white/10 pb-4">Solutions</h3>
            <ul className="space-y-4 font-sans font-light">
              <li><Link to="/products?category=insecticides" className="text-white/70 hover:text-secondary hover:tracking-wide transition-all duration-300 flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-secondary opacity-0 group-hover:opacity-100 transition-opacity" /> Insecticides</Link></li>
              <li><Link to="/products?category=herbicides" className="text-white/70 hover:text-secondary hover:tracking-wide transition-all duration-300 flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-secondary opacity-0 group-hover:opacity-100 transition-opacity" /> Herbicides</Link></li>
              <li><Link to="/products?category=fungicides" className="text-white/70 hover:text-secondary hover:tracking-wide transition-all duration-300 flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-secondary opacity-0 group-hover:opacity-100 transition-opacity" /> Fungicides</Link></li>
              <li><Link to="/products" className="text-white/70 hover:text-secondary hover:tracking-wide transition-all duration-300 flex items-center gap-2 group"><span className="w-1.5 h-1.5 rounded-full bg-secondary opacity-0 group-hover:opacity-100 transition-opacity" /> View Catalog</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="bg-white/5 border border-white/10 p-8">
            <h3 className="font-serif text-xl mb-3 text-white">Subscribe</h3>
            <p className="text-white/70 text-sm mb-6 font-light">The latest insights, agro research, and updates straight to your inbox.</p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Email address..."
                className="w-full bg-transparent border-b border-white/30 py-3 pr-12 text-white placeholder:text-white/50 focus:outline-none focus:border-secondary transition-colors font-light"
              />
              <button
                type="submit"
                className="absolute right-0 top-1/2 -translate-y-1/2 text-white/50 hover:text-secondary transition-colors"
                aria-label="Subscribe"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        </div>

        {/* Copyright & Legal */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white/50 text-sm font-light tracking-wide">
            &copy; {new Date().getFullYear()} AgroSci. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm text-white/50 font-light">
            <a href="#" className="hover:text-secondary transition-colors">Privacy</a>
            <a href="#" className="hover:text-secondary transition-colors">Terms</a>
            <a href="#" className="hover:text-secondary transition-colors">Legal</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
