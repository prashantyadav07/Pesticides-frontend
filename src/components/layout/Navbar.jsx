import { useState, useEffect, useCallback, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Leaf, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const NavItem = memo(({ link, isActive }) => (
  <Link
    to={link.path}
    className={cn(
      'relative px-5 py-2 text-sm font-semibold transition-all duration-300 rounded-full',
      isActive
        ? 'text-emerald-600 bg-emerald-50'
        : 'text-slate-600 hover:text-emerald-600 hover:bg-emerald-50/50'
    )}
  >
    {link.name}
  </Link>
));

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
  }, [isMobileOpen]);

  const toggleMobileMenu = useCallback(() => setIsMobileOpen(prev => !prev), []);

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center pointer-events-none p-4">
      <nav
        className={cn(
          'pointer-events-auto transition-all duration-500 ease-in-out flex items-center justify-between',
          isScrolled
            ? 'w-[90%] max-w-4xl rounded-full bg-white/80 backdrop-blur-xl border border-slate-200 shadow-xl py-2 px-6'
            : 'w-full max-w-6xl rounded-[2.5rem] bg-white/40 backdrop-blur-md border border-white/40 py-4 px-10 shadow-sm'
        )}
      >
        {/* Logo Section with Green Leaf */}
        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
          <div className={cn(
            "flex items-center justify-center rounded-2xl bg-emerald-50 transition-all duration-500 shadow-inner border border-emerald-100",
            isScrolled ? "size-9" : "size-11"
          )}>
            <Leaf className={cn(
              "transition-all duration-500 text-emerald-600 fill-emerald-600/10",
              isScrolled ? "size-5" : "size-6"
            )} />
          </div>
          <span className={cn(
            "font-bold tracking-tight text-slate-900 transition-all duration-500",
            isScrolled ? "text-lg" : "text-2xl"
          )}>
            Crop<span className="text-emerald-600">Land</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className={cn(
          "hidden md:flex items-center gap-1 transition-all duration-500",
          isScrolled ? "scale-95 opacity-90" : "scale-100 opacity-100"
        )}>
          {navLinks.map((link) => (
            <NavItem
              key={link.path}
              link={link}
              isActive={location.pathname === link.path}
            />
          ))}
        </div>

        {/* Desktop CTA - Clean Green Button */}
        <div className="hidden md:flex items-center shrink-0">
          <Button asChild
            className={cn(
              "rounded-full font-bold transition-all duration-500 shadow-md hover:shadow-emerald-200 hover:-translate-y-0.5 bg-emerald-600 hover:bg-emerald-700 text-white border-none",
              isScrolled ? "h-9 px-6 text-xs" : "h-11 px-8 text-sm"
            )}>
            <Link to="/contact">Join Us</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2.5 rounded-full hover:bg-emerald-50 text-slate-600 transition-colors" onClick={toggleMobileMenu}>
          {isMobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMobileMenu}
              className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[60] pointer-events-auto"
            />
            <motion.div
              initial={{ y: -20, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -20, opacity: 0, scale: 0.95 }}
              className="fixed top-24 inset-x-6 max-w-sm mx-auto bg-white rounded-[2.5rem] z-[70] shadow-2xl p-6 pointer-events-auto border border-slate-100"
            >
              <div className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={toggleMobileMenu}
                    className={cn(
                      'flex items-center justify-between p-4 rounded-3xl font-bold transition-all',
                      location.pathname === link.path
                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200'
                        : 'hover:bg-emerald-50 text-slate-600'
                    )}
                  >
                    {link.name} <ChevronRight size={18} opacity={0.5} />
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Navbar;