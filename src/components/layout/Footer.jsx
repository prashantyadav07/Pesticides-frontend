import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Instagram, Twitter, Linkedin, Youtube, ArrowRight, ShieldCheck, Mail, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

const fadeInUp = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

const companyLinks = [
  { name: 'About', path: '/about' },
  { name: 'Sustainability', path: '#' },
  { name: 'Careers', path: '#' },
];

const productLinks = ['Insecticides', 'Herbicides', 'Fungicides', 'Soil Health'];

const socialLinks = [
  { icon: Instagram, href: '#' },
  { icon: Twitter, href: '#' },
  { icon: Linkedin, href: '#' },
  { icon: Youtube, href: '#' },
];

function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <footer className="relative bg-[#050a14] pt-16 pb-8 overflow-hidden text-slate-400 border-t border-white/5">
      {/* Subtle Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent" />

      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
        className="container mx-auto px-6 max-w-7xl relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">

          {/* Brand Section */}
          <motion.div variants={fadeInUp} className="lg:col-span-4 space-y-4">
            <Link to="/" className="flex items-center gap-2 group">

              <span className="text-xl font-bold tracking-tight text-white">
                Crop<span className="text-emerald-500">Land</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-xs opacity-80">
              Smart crop protection and sustainable science for global agriculture.
            </p>
            <div className="flex gap-3 pt-2">
              {socialLinks.map((social, i) => (
                <a key={i} href={social.href} className="p-2 rounded-full bg-white/5 hover:bg-emerald-600 hover:text-white transition-all">
                  <social.icon className="size-4" />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links Grouped */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-4">
            <motion.div variants={fadeInUp} className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/90">Expertise</h4>
              <ul className="space-y-2 text-sm">
                {productLinks.map((name) => (
                  <li key={name}><Link to="#" className="hover:text-emerald-500 transition-colors">{name}</Link></li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={fadeInUp} className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-white/90">Company</h4>
              <ul className="space-y-2 text-sm">
                {companyLinks.map((link) => (
                  <li key={link.name}><Link to={link.path} className="hover:text-emerald-500 transition-colors">{link.name}</Link></li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Newsletter - Compact */}
          <motion.div variants={fadeInUp} className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/90">Stay Updated</h4>
            <div className="relative group max-w-sm">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-white/5 border border-white/10 rounded-full py-2.5 px-5 text-sm outline-none focus:border-emerald-500/50 transition-all"
              />
              <button className="absolute right-1 top-1 bottom-1 bg-emerald-600 hover:bg-emerald-500 text-white px-4 rounded-full transition-all group shrink-0">
                <ArrowRight className="size-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
            <div className="flex flex-col gap-1 text-[12px] opacity-60">
              <span className="flex items-center gap-2"><Mail size={12} className="text-emerald-500" /> contact@CropLand.com</span>
              <span className="flex items-center gap-2"><Phone size={12} className="text-emerald-500" /> 1800-AGRO-SAFE</span>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar - Ultra Compact */}
        <motion.div variants={fadeInUp} className="pt-6 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-medium opacity-50 uppercase tracking-tighter">
          <p>&copy; {new Date().getFullYear()} CropLand Sciences. All Rights Reserved.</p>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms of Use</Link>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}

export default Footer;