import { lazy, Suspense, memo, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'sonner';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// Lazy-load all pages - gives Vite automatic per-route code splitting.
// Each page becomes its own JS chunk (downloaded only when navigated to).
const Home = lazy(() => import('./pages/Home'));
const Products = lazy(() => import('./pages/Products'));
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
}

const PageTransition = memo(function PageTransition({ children }) {
  return (
    <div style={{ transform: 'translateZ(0)' }}>
      {children}
    </div>
  );
});

// Minimal fallback — invisible; prevents layout shift during lazy load
function PageFallback() {
  return <div style={{ minHeight: '100vh' }} aria-hidden="true" />;
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route
        path="/"
        element={
          <PageTransition>
            <Suspense fallback={<PageFallback />}>
              <Home />
            </Suspense>
          </PageTransition>
        }
      />
      <Route
        path="/products"
        element={
          <PageTransition>
            <Suspense fallback={<PageFallback />}>
              <Products />
            </Suspense>
          </PageTransition>
        }
      />
      <Route
        path="/about"
        element={
          <PageTransition>
            <Suspense fallback={<PageFallback />}>
              <About />
            </Suspense>
          </PageTransition>
        }
      />
      <Route
        path="/contact"
        element={
          <PageTransition>
            <Suspense fallback={<PageFallback />}>
              <Contact />
            </Suspense>
          </PageTransition>
        }
      />
      <Route
        path="/product/:id"
        element={
          <PageTransition>
            <Suspense fallback={<PageFallback />}>
              <ProductDetail />
            </Suspense>
          </PageTransition>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:bg-[var(--primary)] focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
      >
        Skip to content
      </a>
      <Navbar />
      <div id="main-content">
        <AnimatedRoutes />
      </div>
      <Footer />
      <Toaster
        position="top-right"
        richColors
        expand={false}
        closeButton
        toastOptions={{
          style: {
            fontFamily: 'Plus Jakarta Sans, sans-serif',
            fontSize: '14px',
          },
        }}
      />
    </BrowserRouter>
  );
}

export default App;
