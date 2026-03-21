import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Menu, X, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Products', path: '/products' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileOpen]);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  return (
    <nav
      role="navigation"
      aria-label="Main navigation"
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300 ease-out',
        isScrolled
          ? 'glassmorphism border-b border-[rgba(10,124,92,0.08)]'
          : 'bg-transparent border-b border-transparent'
      )}
    >
      <div className="container-custom flex items-center justify-between h-16">
        {/* Logo */}
        <Link to="/" aria-label="AgroShield Home">
          <motion.div
            className="flex items-center gap-2.5"
            whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          >
            <div className="w-9 h-9 rounded-full bg-[var(--primary)] flex items-center justify-center">
              <Leaf className="size-5 text-white" />
            </div>
            <span className="font-serif font-bold text-xl text-[var(--foreground)]">
              AgroShield
            </span>
          </motion.div>
        </Link>

        {/* Desktop Links */}
        <motion.div
          className="hidden md:flex items-center gap-1"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.08 } },
          }}
        >
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <motion.div
                key={link.path}
                variants={{
                  hidden: { opacity: 0, y: -10 },
                  visible: { opacity: 1, y: 0 },
                }}
              >
                <Link
                  to={link.path}
                  className={cn(
                    'relative px-4 py-2 text-sm font-medium font-sans transition-colors duration-200 group',
                    isActive
                      ? 'text-[var(--primary)] font-semibold'
                      : 'text-[var(--foreground)]/80 hover:text-[var(--primary)]'
                  )}
                >
                  {link.name}
                  <span
                    className={cn(
                      'absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] bg-[var(--primary)] rounded-full transition-all duration-300 ease-out',
                      isActive ? 'w-[60%]' : 'w-0 group-hover:w-[60%]'
                    )}
                  />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Desktop CTA */}
        <motion.div
          className="hidden md:flex items-center gap-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <Link to="/contact">
            <Button variant="primary" size="md">
              Get Quote
            </Button>
          </Link>
        </motion.div>

        {/* Mobile Hamburger */}
        <motion.button
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-[var(--radius)] text-[var(--foreground)] hover:bg-[var(--accent)] transition-colors"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
          aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
        >
          <AnimatePresence mode="wait" initial={false}>
            {isMobileOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="size-5" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="size-5" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
            />
            <motion.div
              className="fixed right-0 top-0 bottom-0 w-[280px] z-50 glassmorphism-dark text-white flex flex-col p-6 gap-8"
              initial={{ x: '100%' }}
              animate={{ x: '0%' }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[var(--primary)] flex items-center justify-center">
                    <Leaf className="size-4 text-white" />
                  </div>
                  <span className="font-serif font-bold text-lg">AgroShield</span>
                </div>
                <motion.button
                  className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  onClick={() => setIsMobileOpen(false)}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close menu"
                >
                  <X className="size-4" />
                </motion.button>
              </div>

              {/* Drawer Links */}
              <div className="flex flex-col gap-2">
                {navLinks.map((link, i) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.06, duration: 0.35 }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => setIsMobileOpen(false)}
                        className={cn(
                          'block px-4 py-3 text-lg font-semibold rounded-xl transition-all duration-200',
                          isActive
                            ? 'text-[var(--primary)] bg-white/10'
                            : 'text-white/80 hover:text-white hover:bg-white/5'
                        )}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Divider */}
              <div className="h-px bg-white/10" />

              {/* CTA */}
              <Link to="/contact" onClick={() => setIsMobileOpen(false)}>
                <Button variant="primary" size="lg" className="w-full">
                  Get Quote
                </Button>
              </Link>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}

export { Navbar };
export default Navbar;
