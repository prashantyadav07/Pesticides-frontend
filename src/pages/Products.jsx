import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Shield, FlaskConical, X, Plus, CheckCircle2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';

const categories = [
  { id: 'all', name: 'Full Catalog' },
  { id: 'insecticides', name: 'Insecticides', icon: <Shield className="h-4 w-4" /> },
  { id: 'herbicides', name: 'Herbicides', icon: <Leaf className="h-4 w-4" /> },
  { id: 'fungicides', name: 'Fungicides', icon: <FlaskConical className="h-4 w-4" /> },
];

const productsData = [
  { id: 1, name: 'Nexus YieldPro', category: 'insecticides', tag: 'Bestseller', desc: 'Next-generation systemic control.', longDesc: 'An advanced systemic formula providing up to 45 days of residual protection against over 60 common agricultural pests. Engineered to break down naturally in soil.', focus: ['Aphids', 'Whiteflies', 'Thrips'], image: 'https://images.unsplash.com/photo-1599940824399-b87987207ea1?q=80&w=800&auto=format&fit=crop' },
  { id: 2, name: 'Aegis Prime 4X', category: 'herbicides', tag: 'New', desc: 'Selective broadleaf eradication.', longDesc: 'A patented selective herbicide that targets enzymes unique to broadleaf weeds without affecting corn, wheat, or sugarcane. Rapid visible results within 48 hours.', focus: ['Broadleaf Weeds', 'Crabgrass'], image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?q=80&w=800&auto=format&fit=crop' },
  { id: 3, name: 'MycoShield Ultra', category: 'fungicides', tag: '', desc: 'Curative fungal defense matrix.', longDesc: 'A dual-action preventive and curative fungicide. Forms an active barrier on the leaf surface while systemically seeking and destroying existing fungal structures.', focus: ['Powdery Mildew', 'Rust', 'Blight'], image: 'https://images.unsplash.com/photo-1628101683917-7096e1913f01?q=80&w=800&auto=format&fit=crop' },
  { id: 4, name: 'Botanica BioGuard', category: 'insecticides', tag: 'Organic', desc: 'OMRI-listed botanical extraction.', longDesc: 'Derived from specialized Pyrethrum extracts, delivering immediate knockdown of soft-bodied pests. Completely safe for beneficial pollinators when used as directed.', focus: ['Caterpillars', 'Mites'], image: 'https://images.unsplash.com/photo-1530836369250-ef71a3f5f3e4?q=80&w=800&auto=format&fit=crop' },
  { id: 5, name: 'RhizoTech Foundation', category: 'fungicides', tag: 'Bestseller', desc: 'Subterranean root zone defense.', longDesc: 'Applied at planting, this unique formula coats emerging roots to prevent damping-off and soil-borne diseases. Enhances early-stage vigor and nutrient uptake.', focus: ['Root Rot', 'Damping-off'], image: 'https://images.unsplash.com/photo-1585421514284-efb74c2b69ba?q=80&w=800&auto=format&fit=crop' },
  { id: 6, name: 'ClearField Catalyst', category: 'herbicides', tag: '', desc: 'Total pre-emergent vegetation control.', longDesc: 'Industrial-strength pre-emergent herbicide for maintaining pristine, weed-free zones around facilities, fence lines, and pre-plant agricultural fields.', focus: ['All vegetation'], image: 'https://images.unsplash.com/photo-1622383563227-04401ab4e5b6?q=80&w=800&auto=format&fit=crop' },
];

export default function Products() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const filteredProducts = activeTab === 'all' ? productsData : productsData.filter(p => p.category === activeTab);

  return (
    <div className="w-full bg-background pt-24 pb-32 min-h-screen">
      
      {/* 1. PAGE HEADER (Editorial) */}
      <section className="py-20 mb-12">
        <div className="container mx-auto px-6 md:px-12 text-center max-w-4xl">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}
            className="w-1 h-20 bg-secondary mx-auto mb-8"
          />
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-serif text-foreground mb-6 tracking-tight"
          >
            The <i className="text-primary italic">Catalog.</i>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-muted-foreground font-light leading-relaxed"
          >
            An uncompromising collection of the world's most advanced agricultural chemistry. Engineered for peak performance.
          </motion.p>
        </div>
      </section>

      <div className="container mx-auto px-6 md:px-12">
        
        {/* 2. FILTER TABS (Minimalist) */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-20 border-b border-border pb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`flex items-center gap-2 px-6 py-2 rounded-full font-serif text-lg transition-all relative ${
                activeTab === category.id 
                  ? 'text-primary' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {category.icon}
              {category.name}
              {/* Active Pill Indicator */}
              {activeTab === category.id && (
                <motion.div 
                  layoutId="activeTabBadge"
                  className="absolute inset-0 bg-primary/5 rounded-full -z-10 border border-primary/20"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* 3. PRODUCT GRID */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-16 relative z-10">
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <motion.div
                layoutId={`card-container-${product.id}`}
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5 }}
                className="group cursor-none h-full"
                onClick={() => setSelectedProduct(product)}
              >
                {/* Modern Image Card */}
                <div className="relative aspect-[4/5] overflow-hidden bg-background-alt mb-6">
                  {/* Subtle Background Pattern */}
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#1A4731_1px,transparent_1px)] [background-size:16px_16px]" />
                  
                  <motion.img 
                    layoutId={`img-${product.id}`}
                    src={product.image} 
                    alt={product.name} 
                    className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-70 group-hover:scale-105 group-hover:opacity-90 transition-all duration-700"
                  />
                  
                  {/* Badges */}
                  {product.tag && (
                    <div className="absolute top-6 left-6 z-20">
                      <Badge variant={product.tag === 'Organic' ? 'outline' : 'default'} className={`px-4 py-1 font-serif text-xs uppercase tracking-widest ${product.tag === 'Bestseller' ? 'bg-secondary text-primary hover:bg-secondary border-none' : 'border-primary text-primary bg-white'}`}>
                        {product.tag}
                      </Badge>
                    </div>
                  )}

                  {/* Hover Overlay with Quick View */}
                  <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out flex items-center justify-center z-10">
                     <div className="translate-y-8 group-hover:translate-y-0 transition-transform duration-500 ease-out flex items-center justify-center w-16 h-16 rounded-full bg-white text-primary shadow-2xl">
                        <Plus className="h-8 w-8" />
                     </div>
                  </div>
                </div>

                {/* Typography details */}
                <div className="px-2">
                  <p className="text-secondary text-xs uppercase tracking-[0.2em] font-bold mb-3">
                    {categories.find(c => c.id === product.category)?.name}
                  </p>
                  <motion.h3 layoutId={`title-${product.id}`} className="text-3xl font-serif text-foreground mb-3 leading-tight group-hover:text-primary transition-colors">
                    {product.name}
                  </motion.h3>
                  <motion.p layoutId={`desc-${product.id}`} className="text-muted-foreground font-light text-lg">
                    {product.desc}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* 4. EXPANDABLE DETAIL MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12 overflow-hidden pointer-events-none">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} 
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md pointer-events-auto"
            />
            
            {/* Modal Content */}
            <motion.div 
              layoutId={`card-container-${selectedProduct.id}`}
              className="relative w-full max-w-6xl bg-background shadow-2xl overflow-hidden flex flex-col md:flex-row z-10 max-h-full rounded-none pointer-events-auto"
            >
              {/* Image Side */}
              <div className="w-full md:w-5/12 h-[30vh] md:h-auto relative bg-primary/5">
                <motion.img 
                  layoutId={`img-${selectedProduct.id}`}
                  src={selectedProduct.image} 
                  alt={selectedProduct.name} 
                  className="absolute inset-0 w-full h-full object-cover mix-blend-multiply opacity-80"
                />
              </div>
              
              {/* Content Side */}
              <div className="w-full md:w-7/12 p-8 md:p-16 flex flex-col justify-center bg-white overflow-y-auto relative">
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-8 right-8 p-3 bg-muted hover:bg-secondary hover:text-primary rounded-full transition-colors z-20"
                >
                  <X className="h-6 w-6" strokeWidth={1.5} />
                </button>

                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <p className="text-secondary text-sm uppercase tracking-[0.2em] font-bold">
                      {categories.find(c => c.id === selectedProduct.category)?.name}
                    </p>
                    {selectedProduct.tag && (
                      <Badge className="bg-primary/10 text-primary border-none hover:bg-primary/20">{selectedProduct.tag}</Badge>
                    )}
                  </div>
                  
                  <motion.h2 layoutId={`title-${selectedProduct.id}`} className="text-4xl md:text-6xl font-serif text-foreground mb-6">
                    {selectedProduct.name}
                  </motion.h2>
                  
                  <motion.p layoutId={`desc-${selectedProduct.id}`} className="text-xl text-primary font-serif italic mb-8 border-l-2 border-secondary pl-6">
                    "{selectedProduct.desc}"
                  </motion.p>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                    className="space-y-6 text-muted-foreground font-light leading-relaxed mb-12"
                  >
                    <p>{selectedProduct.longDesc}</p>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                    className="mb-12"
                  >
                    <h4 className="font-sans font-bold text-foreground mb-4 uppercase tracking-wider text-sm">Primary Targets</h4>
                    <div className="flex flex-wrap gap-3">
                      {selectedProduct.focus.map((f, i) => (
                        <div key={i} className="flex items-center gap-2 bg-background-alt border border-border px-4 py-2 rounded-full text-sm font-medium text-foreground">
                          <CheckCircle2 className="h-4 w-4 text-secondary" /> {f}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 mt-auto pt-8 border-t border-border"
                  >
                    <Button className="bg-primary text-white hover:bg-[#123122] rounded-none px-8 h-14 text-lg border-none">
                      Request Technical Data
                    </Button>
                    <Button variant="outline" className="rounded-none px-8 h-14 text-lg border-border hover:bg-background-alt font-medium">
                      Contact Sales Rep
                    </Button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
