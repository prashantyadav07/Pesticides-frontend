import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Search, Star, ShoppingCart, Eye, Package, ArrowRight, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn, staggerContainerVariants, fadeUpVariants } from '@/lib/utils';

const categories = ['All', 'Insecticides', 'Herbicides', 'Fungicides', 'Fertilizers', 'Bio-Pesticides', 'Seeds'];

const allProducts = [
  { id: 1, name: 'CropGuard Pro', category: 'Insecticides', desc: 'Broad-spectrum insecticide effective against aphids, bollworms, and whiteflies.', rating: 5, stock: 'In Stock', emoji: '🛡️' },
  { id: 2, name: 'PestAway Max', category: 'Insecticides', desc: 'Contact and systemic action for controlling sucking and chewing insects.', rating: 4, stock: 'In Stock', emoji: '🐛' },
  { id: 3, name: 'BugShield 360', category: 'Insecticides', desc: 'Long-lasting protection with low-dose application for economical pest management.', rating: 5, stock: 'Low Stock', emoji: '🔬' },
  { id: 4, name: 'WeedOut Ultra', category: 'Herbicides', desc: 'Fast-acting selective herbicide for pre- and post-emergence weed control.', rating: 5, stock: 'In Stock', emoji: '🌿' },
  { id: 5, name: 'HerbiClean Pro', category: 'Herbicides', desc: 'Non-selective herbicide for fallow land and pre-planting weed management.', rating: 4, stock: 'In Stock', emoji: '🧹' },
  { id: 6, name: 'FungiShield', category: 'Fungicides', desc: 'Systemic fungicide against powdery mildew, rust, and blight diseases.', rating: 5, stock: 'In Stock', emoji: '🍄' },
  { id: 7, name: 'BlightStop', category: 'Fungicides', desc: 'Preventive and curative action against late blight in potato and tomato crops.', rating: 4, stock: 'In Stock', emoji: '🧫' },
  { id: 8, name: 'NitroBoost', category: 'Fertilizers', desc: 'High-nitrogen formulation for rapid vegetative growth and deep green foliage.', rating: 5, stock: 'In Stock', emoji: '🧪' },
  { id: 9, name: 'RootMax Gold', category: 'Fertilizers', desc: 'Phosphorus-rich root developer strengthening root systems and nutrient uptake.', rating: 4, stock: 'In Stock', emoji: '🌱' },
  { id: 10, name: 'MicroNute Plus', category: 'Fertilizers', desc: 'Complete micronutrient blend with zinc, boron, and manganese for balanced growth.', rating: 5, stock: 'Low Stock', emoji: '💊' },
  { id: 11, name: 'BioDefend Plus', category: 'Bio-Pesticides', desc: 'Neem-based organic pest management solution for eco-conscious farming.', rating: 5, stock: 'In Stock', emoji: '🌿' },
  { id: 12, name: 'BioGrow Natural', category: 'Bio-Pesticides', desc: 'Trichoderma-based bio-fungicide for organic crop disease management.', rating: 4, stock: 'In Stock', emoji: '🦠' },
  { id: 13, name: 'HybridMax Wheat', category: 'Seeds', desc: 'High-yield hybrid wheat variety resistant to rust and drought conditions.', rating: 5, stock: 'In Stock', emoji: '🌾' },
  { id: 14, name: 'GoldSeed Rice', category: 'Seeds', desc: 'Premium basmati rice seed with superior grain quality and aroma.', rating: 5, stock: 'In Stock', emoji: '🍚' },
];

const stockColors = {
  'In Stock': 'success',
  'Low Stock': 'warning',
  'Out of Stock': 'danger',
};

function Products() {
  const shouldReduceMotion = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [visibleCount, setVisibleCount] = useState(8);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filtered = allProducts
    .filter((p) => activeCategory === 'All' || p.category === activeCategory)
    .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.desc.toLowerCase().includes(searchQuery.toLowerCase()));

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  const handleLoadMore = () => {
    setIsLoading(true);
    setTimeout(() => {
      setVisibleCount((c) => c + 4);
      setIsLoading(false);
    }, 800);
  };

  useEffect(() => {
    setVisibleCount(8);
  }, [activeCategory, searchQuery]);

  return (
    <main role="main">
      {/* Mini Hero */}
      <section className="bg-green-gradient min-h-[220px] flex items-center pt-16">
        <div className="container-custom flex flex-col md:flex-row justify-between items-start md:items-center gap-6 py-8">
          <div>
            <p className="text-xs text-white/50 mb-2">
              <Link to="/" className="hover:text-white/70">Home</Link> &gt; Products
            </p>
            <h1 className="text-white font-serif text-3xl md:text-4xl font-bold">Our Product Range</h1>
            <div className="mt-3">
              <Badge variant="solid" size="lg">500+ Products Available</Badge>
            </div>
          </div>
          <div className="hidden md:block opacity-40">
            <svg viewBox="0 0 120 120" className="w-28 h-28" aria-hidden="true">
              <circle cx="60" cy="60" r="50" fill="none" stroke="white" strokeWidth="1" opacity="0.3" />
              <path d="M60 30 Q80 50 75 80 Q70 100 60 110 Q50 100 45 80 Q40 50 60 30Z" fill="white" opacity="0.2" />
              <circle cx="40" cy="50" r="8" fill="white" opacity="0.15" />
              <circle cx="80" cy="70" r="5" fill="white" opacity="0.15" />
            </svg>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="bg-[var(--background)] py-8 border-b border-[var(--border)]">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            {/* Category Tabs */}
            <div className="flex gap-1 bg-[var(--muted)] p-1 rounded-full overflow-x-auto scrollbar-hide max-w-full">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={cn(
                    'relative px-4 py-2 text-xs md:text-sm font-medium rounded-full whitespace-nowrap transition-colors duration-200',
                    activeCategory === cat ? 'text-white' : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                  )}
                  onClick={() => setActiveCategory(cat)}
                >
                  {activeCategory === cat && (
                    <motion.div
                      layoutId="product-tab-pill"
                      className="absolute inset-0 bg-[var(--primary)] rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[var(--muted-foreground)]" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2.5 border border-[var(--border)] rounded-full text-sm bg-[var(--card)] w-48 focus:w-72 transition-[width] duration-300 ease-out focus:border-[var(--primary)] focus:ring-2 focus:ring-[var(--primary)]/20 outline-none"
                aria-label="Search products"
              />
            </div>
          </div>
          <p className="text-sm text-[var(--muted-foreground)] mt-3">
            Showing {Math.min(visibleCount, filtered.length)} of {filtered.length} products
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="container-custom py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + searchQuery}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {visible.map((product, i) => (
              <motion.div
                key={product.id}
                className="bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius-lg)] overflow-hidden shadow-[var(--shadow-sm)] transition-all duration-350 ease-out hover:border-[var(--primary)]/30 hover:shadow-[var(--shadow-lg)] hover:-translate-y-2 group"
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.4 }}
              >
                {/* Image */}
                <div className="relative aspect-[4/3] bg-[var(--accent)] flex items-center justify-center overflow-hidden">
                  <span className="text-6xl transition-transform duration-500 group-hover:scale-110" role="img" aria-label={product.category}>
                    {product.emoji}
                  </span>
                  <div className="absolute inset-0 bg-[var(--primary)]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                    <button
                      onClick={() => setSelectedProduct(product)}
                      className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                      aria-label="Quick view"
                    >
                      <Eye className="size-5" />
                    </button>
                  </div>
                  {/* Stock badge */}
                  <div className="absolute top-3 right-3">
                    <Badge variant={stockColors[product.stock]} size="sm">{product.stock}</Badge>
                  </div>
                </div>

                {/* Body */}
                <div className="p-4">
                  <Badge variant="default" size="sm">{product.category}</Badge>
                  <h3 className="font-serif font-semibold text-base mt-2">{product.name}</h3>
                  <p className="text-xs text-[var(--muted-foreground)] mt-1 line-clamp-2">{product.desc}</p>

                  {/* Rating */}
                  <div className="flex items-center gap-0.5 mt-2">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        className={cn(
                          'size-3',
                          j < product.rating ? 'fill-[#FBBF24] text-[#FBBF24]' : 'text-[var(--border)]'
                        )}
                      />
                    ))}
                    <span className="text-xs text-[var(--muted-foreground)] ml-1">{product.rating}.0</span>
                  </div>

                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-[var(--muted-foreground)]">Contact for Price</span>
                  </div>
                  <Link to="/contact" className="block mt-3">
                    <Button variant="primary" size="sm" className="w-full">
                      <ShoppingCart className="size-3.5" /> Add to Inquiry
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Package className="size-16 text-[var(--muted-foreground)]/30 mx-auto" />
            <p className="text-[var(--muted-foreground)] mt-4">No products found matching your search.</p>
          </div>
        )}

        {/* Load More */}
        {hasMore && (
          <div className="text-center mt-10">
            <Button variant="outline" size="lg" onClick={handleLoadMore} disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="size-5 animate-spin" /> Loading...
                </>
              ) : (
                <>
                  Load More Products <ArrowRight className="size-5" />
                </>
              )}
            </Button>
          </div>
        )}
      </section>

      {/* Quick View Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
            />
            <motion.div
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90vw] max-w-lg"
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
            >
              <div className="bg-[var(--card)] border border-[var(--border)] rounded-2xl overflow-hidden shadow-2xl">
                <div className="aspect-[16/9] bg-[var(--accent)] flex items-center justify-center">
                  <span className="text-8xl" role="img" aria-label={selectedProduct.category}>
                    {selectedProduct.emoji}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="default">{selectedProduct.category}</Badge>
                    <Badge variant={stockColors[selectedProduct.stock]} size="sm">{selectedProduct.stock}</Badge>
                  </div>
                  <h2 className="font-serif text-2xl font-bold">{selectedProduct.name}</h2>
                  <div className="flex items-center gap-1 mt-2">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star
                        key={j}
                        className={cn(
                          'size-4',
                          j < selectedProduct.rating ? 'fill-[#FBBF24] text-[#FBBF24]' : 'text-[var(--border)]'
                        )}
                      />
                    ))}
                  </div>
                  <p className="text-[var(--muted-foreground)] mt-3 leading-relaxed">{selectedProduct.desc}</p>
                  <div className="flex gap-3 mt-6">
                    <Link to="/contact" className="flex-1">
                      <Button variant="primary" size="lg" className="w-full">
                        <ShoppingCart className="size-5" /> Inquire Now
                      </Button>
                    </Link>
                    <Button variant="outline" size="lg" onClick={() => setSelectedProduct(null)}>
                      Close
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}

export { Products };
export default Products;
