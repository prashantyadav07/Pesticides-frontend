import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Leaf, MapPin, Phone, Mail, Instagram, Twitter, Linkedin, Youtube, ChevronRight } from 'lucide-react';
import { cn, staggerContainerVariants, fadeUpVariants } from '@/lib/utils';

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
  { name: 'Blog', path: '#' },
  { name: 'Careers', path: '#' },
];

const productLinks = [
  'Insecticides', 'Herbicides', 'Fungicides',
  'Fertilizers', 'Bio-Pesticides', 'Crop Seeds',
];

const socialLinks = [
  { icon: Instagram, label: 'Instagram', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Linkedin, label: 'LinkedIn', href: '#' },
  { icon: Youtube, label: 'YouTube', href: '#' },
];

function Footer() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const shouldReduceMotion = useReducedMotion();

  return (
    <footer className="bg-[#0A1628] text-white/90" role="contentinfo">
      <motion.div
        ref={ref}
        variants={shouldReduceMotion ? {} : staggerContainerVariants}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="container-custom section-padding"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1 — Brand */}
          <motion.div variants={fadeUpVariants}>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-full bg-[var(--primary)] flex items-center justify-center">
                <Leaf className="size-5 text-white" />
              </div>
              <span className="font-serif font-bold text-xl">AgroShield</span>
            </div>
            <p className="text-sm text-white/60 max-w-[220px] mt-2 leading-relaxed">
              Empowering farmers with science-backed crop protection solutions for a prosperous harvest.
            </p>
            <div className="flex items-center gap-2 mt-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:bg-[var(--primary)] hover:border-[var(--primary)] transition-all duration-200"
                  whileHover={shouldReduceMotion ? {} : { scale: 1.15 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.92 }}
                >
                  <social.icon className="size-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Column 2 — Quick Links */}
          <motion.div variants={fadeUpVariants}>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4 font-sans">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-sm text-white/70 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-1 group"
                  >
                    <ChevronRight className="size-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3 — Products */}
          <motion.div variants={fadeUpVariants}>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4 font-sans">
              Products
            </h4>
            <ul className="flex flex-col gap-2.5">
              {productLinks.map((name) => (
                <li key={name}>
                  <Link
                    to="/products"
                    className="text-sm text-white/70 hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-1 group"
                  >
                    <ChevronRight className="size-3 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all duration-200" />
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4 — Contact */}
          <motion.div variants={fadeUpVariants}>
            <h4 className="text-xs font-semibold tracking-widest uppercase text-white/40 mb-4 font-sans">
              Get In Touch
            </h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/8 flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="size-4 text-white/70" />
                </div>
                <p className="text-sm text-white/70 leading-relaxed">
                  123 Agro Hub, Delhi, India 110001
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/8 flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="size-4 text-white/70" />
                </div>
                <a href="tel:+919876543210" className="text-sm text-white/70 hover:text-white transition-colors">
                  +91 98765 43210
                </a>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-white/8 flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="size-4 text-white/70" />
                </div>
                <a href="mailto:info@agroshield.in" className="text-sm text-white/70 hover:text-white transition-colors">
                  info@agroshield.in
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <hr className="border-white/10 mt-12 mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/40">
          <p>&copy; 2024 AgroShield. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white/70 transition-colors">Privacy Policy</a>
            <span>&middot;</span>
            <a href="#" className="hover:text-white/70 transition-colors">Terms of Service</a>
            <span>&middot;</span>
            <a href="#" className="hover:text-white/70 transition-colors">Sitemap</a>
          </div>
        </div>
      </motion.div>
    </footer>
  );
}

export { Footer };
export default Footer;
