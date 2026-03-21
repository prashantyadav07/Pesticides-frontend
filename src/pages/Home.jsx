import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import {
  Leaf, TrendingUp, CheckCircle, Award, Users, PlayCircle,
  Shield, FlaskConical, Truck, Headphones, Recycle,
  ChevronDown, ArrowRight, Star, MapPin, Calendar, BookOpen,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn, staggerContainerVariants, fadeUpVariants } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const marqueeText = '🌱 AgroShield · Premium Crop Protection · ISO Certified · 15+ Years · 10,000+ Farmers · Pan-India Delivery · Expert Agronomy Support · ';

const features = [
  { icon: Shield, title: 'Proven Protection', desc: 'Lab-tested formulations that deliver consistent results across diverse Indian climatic conditions and crop types.', stat: '99.2% Efficacy' },
  { icon: FlaskConical, title: 'Research-Backed', desc: 'Developed at IARI-certified labs with rigorous field trials spanning multiple seasons and geographies.', stat: '50+ R&D Patents' },
  { icon: Truck, title: 'Pan-India Delivery', desc: 'Express delivery network covering 18,000+ pin codes with temperature-controlled logistics.', stat: '3–5 Day Delivery' },
  { icon: Headphones, title: '24/7 Expert Help', desc: 'Dedicated agronomy helpline staffed by qualified experts fluent in 12 Indian languages.', stat: '< 2 Min Response' },
  { icon: Recycle, title: 'Eco-Friendly', desc: 'Sustainable formulations that protect crops while preserving soil health and biodiversity.', stat: '60% Less Residue' },
  { icon: Award, title: 'ISO Certified', desc: 'ISO 9001:2015 quality management system ensuring every batch meets international standards.', stat: '15+ Certifications' },
];

const stats = [
  { value: 10000, suffix: '+', label: 'Farmers Served' },
  { value: 500, suffix: '+', label: 'Products' },
  { value: 15, suffix: '+', label: 'Years Experience' },
  { value: 98, suffix: '%', label: 'Satisfaction Rate' },
];

const products = [
  { name: 'CropGuard Pro', category: 'Insecticides', desc: 'Broad-spectrum protection against aphids, bollworms, and whiteflies with extended residual action.' },
  { name: 'WeedOut Ultra', category: 'Herbicides', desc: 'Fast-acting selective herbicide for pre- and post-emergence weed control in cereal crops.' },
  { name: 'FungiShield', category: 'Fungicides', desc: 'Systemic action against powdery mildew, rust, and blight with preventive and curative modes.' },
  { name: 'NitroBoost', category: 'Fertilizers', desc: 'High-nitrogen formulation for rapid vegetative growth and deep green foliage development.' },
  { name: 'BioDefend Plus', category: 'Bio-Pesticides', desc: 'Neem-based organic solution for eco-conscious farmers seeking chemical-free pest management.' },
  { name: 'RootMax Gold', category: 'Fertilizers', desc: 'Phosphorus-rich root developer that strengthens root systems and improves nutrient uptake.' },
];

const categoryEmoji = {
  Insecticides: '🛡️',
  Herbicides: '🌿',
  Fungicides: '🍄',
  Fertilizers: '🧪',
  'Bio-Pesticides': '🌱',
};

const testimonials = [
  { name: 'Ramesh Kumar', location: 'Haryana', quote: 'CropGuard Pro completely saved my wheat harvest this season. The results were visible within days and my yield increased by 40%.', initials: 'RK' },
  { name: 'Priya Patel', location: 'Gujarat', quote: 'FungiShield works better than anything I\'ve tried in 15 years of farming. My cotton crop has never looked healthier.', initials: 'PP' },
  { name: 'Suresh Reddy', location: 'Andhra Pradesh', quote: 'Fast delivery and incredible support team. They helped me choose the right product for my specific soil type.', initials: 'SR' },
  { name: 'Anita Singh', location: 'Punjab', quote: 'My yield increased by 35% using NitroBoost. The quality of grains improved dramatically and I got better market prices.', initials: 'AS' },
  { name: 'Mohan Lal', location: 'Rajasthan', quote: 'BioDefend is perfect for my organic farm. Finally a natural solution that actually works against major pests.', initials: 'ML' },
];

const blogPosts = [
  { title: '5 Signs Your Crops Need Fungicide Treatment', category: 'Crop Health', date: 'Mar 15, 2024', desc: 'Learn to identify early signs of fungal infection and prevent crop losses with timely intervention.' },
  { title: 'Organic vs Chemical Pesticides: What\'s Best for 2024?', category: 'Guides', date: 'Mar 10, 2024', desc: 'A comprehensive comparison to help you make the right choice for your farm and your budget.' },
  { title: 'How to Read Pesticide Labels Correctly', category: 'Tips & Tricks', date: 'Mar 5, 2024', desc: 'Understanding dosage, safety instructions, and application methods for maximum effectiveness.' },
];

const tabs = ['All', 'Insecticides', 'Herbicides', 'Fungicides', 'Fertilizers'];

function Home() {
  const shouldReduceMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState('All');
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const particlesRef = useRef(null);

  const filteredProducts = activeTab === 'All'
    ? products
    : products.filter((p) => p.category === activeTab);

  /* GSAP — Hero parallax + particles */
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to('.hero-visual-col', {
        y: -50,
        scrollTrigger: {
          trigger: '.hero-section',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      gsap.utils.toArray('.hero-particle').forEach((el) => {
        gsap.to(el, {
          y: `random(-15, 15)`,
          x: `random(-10, 10)`,
          duration: `random(2.5, 4.5)`,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: Math.random() * 2,
        });
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  /* GSAP — Stats counter */
  useEffect(() => {
    const ctx = gsap.context(() => {
      const counters = document.querySelectorAll('.stat-counter');
      counters.forEach((counter) => {
        const target = parseInt(counter.dataset.target, 10);
        gsap.fromTo(
          counter,
          { innerText: 0 },
          {
            innerText: target,
            duration: 2.5,
            ease: 'power2.out',
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: counter,
              start: 'top 85%',
              once: true,
            },
          }
        );
      });
    }, statsRef);
    return () => ctx.revert();
  }, []);

  /* Embla Carousel */
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, dragFree: true, align: 'center' },
    [Autoplay({ delay: 3500, stopOnInteraction: true })]
  );
  const [selectedDot, setSelectedDot] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelectedDot(emblaApi.selectedScrollSnap());
    emblaApi.on('select', onSelect);
    onSelect();
    return () => emblaApi.off('select', onSelect);
  }, [emblaApi]);

  return (
    <main role="main">
      {/* ═══════ SECTION 1: HERO ═══════ */}
      <section ref={heroRef} className="hero-section hero-glow bg-hero-mesh grid-background min-h-screen flex items-center pt-16 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute -top-[10%] -right-[10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-[#0A7C5C]/10 to-[#1E90A0]/6 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[5%] -left-[8%] w-[350px] h-[350px] rounded-full bg-[#1E90A0]/8 blur-3xl pointer-events-none" />

        {/* Floating particles */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="hero-particle absolute w-2 h-2 rounded-full bg-[var(--primary)]/30"
            style={{
              top: `${15 + Math.random() * 60}%`,
              left: `${50 + Math.random() * 45}%`,
            }}
          />
        ))}

        <div className="container-custom grid md:grid-cols-2 items-center gap-12 relative z-10">
          {/* Left Column */}
          <div>
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge variant="default" icon={Leaf}>
                🌿 Trusted by 10,000+ Farmers Across India
              </Badge>
            </motion.div>

            <motion.h1
              className="mt-6 font-serif font-bold text-4xl md:text-5xl lg:text-6xl leading-[1.1]"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.1 } },
              }}
            >
              {['Protecting', 'Crops,'].map((word, i) => (
                <motion.span
                  key={i}
                  className="inline-block mr-3"
                  variants={{
                    hidden: { opacity: 0, y: 50, filter: 'blur(6px)' },
                    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
                  }}
                >
                  {word}
                </motion.span>
              ))}
              <br />
              {['Empowering', 'Farmers'].map((word, i) => (
                <motion.span
                  key={`g-${i}`}
                  className="inline-block mr-3 text-gradient"
                  variants={{
                    hidden: { opacity: 0, y: 50, filter: 'blur(6px)' },
                    visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] } },
                  }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              className="mt-6 text-lg text-[var(--muted-foreground)] max-w-md leading-relaxed"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Science-backed crop protection solutions trusted by farmers from Kashmir to Kanyakumari. Better yields, healthier crops.
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap gap-4"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <Link to="/products">
                <Button variant="primary" size="lg">
                  Explore Products <ArrowRight className="size-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                <PlayCircle className="size-5" /> Watch Demo
              </Button>
            </motion.div>

            <motion.div
              className="mt-8 flex flex-wrap gap-6"
              initial="hidden"
              animate="visible"
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15, delayChildren: 0.9 } } }}
            >
              {[
                { icon: CheckCircle, text: 'ISO 9001:2015 Certified' },
                { icon: Award, text: '15+ Years Experience' },
                { icon: Users, text: '500+ Products' },
              ].map((item) => (
                <motion.div
                  key={item.text}
                  className="flex items-center gap-2 text-sm font-medium text-[var(--muted-foreground)]"
                  variants={{
                    hidden: { opacity: 0, y: 15 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
                  }}
                >
                  <item.icon className="size-4 text-[var(--primary)]" />
                  {item.text}
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right Column — Hero Visual */}
          <div className="hero-visual-col relative w-full aspect-square max-w-[540px] mx-auto hidden md:block">
            {/* Big circle background */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#E8F7F2] to-[#D1EAE3] animate-float" style={{ animationDuration: '6s' }} />

            {/* Inner illustration */}
            <div className="absolute inset-[15%] flex items-center justify-center">
              <svg viewBox="0 0 200 200" className="w-full h-full" aria-hidden="true">
                {/* Sun rays */}
                {Array.from({ length: 8 }).map((_, i) => (
                  <line
                    key={i}
                    x1="100" y1="35"
                    x2={100 + 30 * Math.cos((i * Math.PI) / 4)}
                    y2={35 + 30 * Math.sin((i * Math.PI) / 4)}
                    stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" opacity="0.5"
                  />
                ))}
                <circle cx="100" cy="35" r="14" fill="#FBBF24" opacity="0.3" />
                <circle cx="100" cy="35" r="8" fill="#FBBF24" opacity="0.6" />
                {/* Field */}
                <ellipse cx="100" cy="165" rx="85" ry="25" fill="#0A7C5C" opacity="0.15" />
                <ellipse cx="100" cy="160" rx="70" ry="18" fill="#0A7C5C" opacity="0.1" />
                {/* Central plant */}
                <line x1="100" y1="155" x2="100" y2="75" stroke="#0A7C5C" strokeWidth="3" strokeLinecap="round" />
                <path d="M100 130 Q120 115 115 95" stroke="#12A87C" strokeWidth="2" fill="none" />
                <ellipse cx="118" cy="105" rx="18" ry="12" fill="#12A87C" opacity="0.7" transform="rotate(-25 118 105)" />
                <path d="M100 110 Q80 95 85 75" stroke="#0A7C5C" strokeWidth="2" fill="none" />
                <ellipse cx="82" cy="85" rx="16" ry="11" fill="#0A7C5C" opacity="0.7" transform="rotate(20 82 85)" />
                <path d="M100 95 Q115 85 112 72" stroke="#12A87C" strokeWidth="1.5" fill="none" />
                <ellipse cx="114" cy="76" rx="12" ry="8" fill="#12A87C" opacity="0.5" transform="rotate(-30 114 76)" />
                {/* Small plants */}
                <line x1="55" y1="158" x2="55" y2="128" stroke="#0A7C5C" strokeWidth="2" opacity="0.5" />
                <ellipse cx="48" cy="132" rx="10" ry="7" fill="#0A7C5C" opacity="0.3" transform="rotate(15 48 132)" />
                <line x1="145" y1="158" x2="145" y2="125" stroke="#12A87C" strokeWidth="2" opacity="0.5" />
                <ellipse cx="152" cy="130" rx="10" ry="7" fill="#12A87C" opacity="0.3" transform="rotate(-15 152 130)" />
              </svg>
            </div>

            {/* Floating Stat Card A — Top Left */}
            <div className="absolute -left-4 top-1/4 glassmorphism rounded-2xl px-4 py-3 shadow-lg animate-float z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--accent)] flex items-center justify-center">
                  <TrendingUp className="size-5 text-[var(--primary)]" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-[var(--primary)] font-serif">↑ 40%</div>
                  <div className="text-xs text-[var(--muted-foreground)]">Crop Yield Increase</div>
                </div>
              </div>
            </div>

            {/* Floating Stat Card B — Bottom Right */}
            <div className="absolute -right-4 bottom-1/4 glassmorphism rounded-2xl px-4 py-3 shadow-lg animate-float animate-float-delay-1 z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[var(--secondary)]/10 flex items-center justify-center">
                  <Star className="size-5 text-[var(--secondary)]" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-[var(--secondary)] font-serif">₹2.4Cr</div>
                  <div className="text-xs text-[var(--muted-foreground)]">Farmer Revenue Saved</div>
                </div>
              </div>
            </div>

            {/* Card C — Top Right pill */}
            <div className="absolute top-4 right-4 bg-[var(--primary)] text-white px-3 py-1.5 rounded-full text-xs font-semibold animate-float animate-float-delay-2 z-10">
              🌱 100% Organic Options
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown className="size-6 text-[var(--muted-foreground)]" />
        </motion.div>
      </section>

      {/* ═══════ SECTION 2: MARQUEE STRIP ═══════ */}
      <div className="h-12 bg-[var(--primary)] overflow-hidden flex items-center">
        <div className="animate-marquee text-white/90 text-sm font-medium tracking-wide">
          {marqueeText.repeat(4)}
        </div>
      </div>

      {/* ═══════ SECTION 3: FEATURES ═══════ */}
      <FeaturesSection shouldReduceMotion={shouldReduceMotion} />

      {/* ═══════ SECTION 4: STATS BAR ═══════ */}
      <section ref={statsRef} className="bg-green-gradient text-white py-16">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className={cn(
                  'text-center px-8 py-4',
                  i < stats.length - 1 && 'border-r border-white/10'
                )}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="text-4xl md:text-5xl font-bold font-serif">
                  <span className="stat-counter" data-target={stat.value}>0</span>
                  <span>{stat.suffix}</span>
                </div>
                <div className="text-white/70 text-sm mt-1 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ SECTION 5: PRODUCTS PREVIEW ═══════ */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="Our Products"
            title="Protection for Every Crop"
            subtitle="Browse our range of scientifically formulated crop protection solutions designed for Indian agriculture."
            shouldReduceMotion={shouldReduceMotion}
          />

          {/* Filter Tabs */}
          <div className="flex gap-1 bg-[var(--muted)] p-1 rounded-full max-w-fit mx-auto mt-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={cn(
                  'relative px-5 py-2 text-sm font-medium rounded-full transition-colors duration-200',
                  activeTab === tab
                    ? 'text-white'
                    : 'text-[var(--muted-foreground)] hover:text-[var(--foreground)]'
                )}
                onClick={() => setActiveTab(tab)}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="tab-pill"
                    className="absolute inset-0 bg-[var(--primary)] rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10"
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
          >
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.name}
                className="bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius-lg)] overflow-hidden shadow-[var(--shadow-sm)] transition-all duration-350 ease-out hover:border-[var(--primary)]/30 hover:shadow-[var(--shadow-lg)] hover:-translate-y-2 group"
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
              >
                {/* Card Media */}
                <div className="relative aspect-[4/3] bg-[var(--accent)] flex items-center justify-center overflow-hidden">
                  <span className="text-7xl" role="img" aria-label={product.category}>
                    {categoryEmoji[product.category] || '🌾'}
                  </span>
                  <div className="absolute inset-0 bg-[var(--primary)]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button variant="outline" size="md" className="border-white text-white hover:bg-white/20 hover:border-white">
                      View Details
                    </Button>
                  </div>
                </div>
                {/* Card Body */}
                <div className="p-5">
                  <Badge variant="default" size="sm">{product.category}</Badge>
                  <h3 className="font-serif text-lg font-semibold mt-2">{product.name}</h3>
                  <p className="text-sm text-[var(--muted-foreground)] mt-1 line-clamp-2">{product.desc}</p>
                  <div className="flex justify-between items-center mt-4">
                    <span className="text-xs text-[var(--muted-foreground)]">Contact for Price</span>
                    <Link to="/contact">
                      <Button variant="outline" size="sm">Inquire Now</Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* View All */}
          <div className="text-center mt-10">
            <Link to="/products">
              <Button variant="outline" size="lg">
                View All Products <ArrowRight className="size-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════ SECTION 6: TESTIMONIALS ═══════ */}
      <section className="section-padding bg-[var(--background-alt)]">
        <div className="container-custom">
          <SectionHeader
            badge="Testimonials"
            title="What Farmers Say"
            subtitle="Real stories from farmers who transformed their yields with AgroShield products."
            shouldReduceMotion={shouldReduceMotion}
          />

          <div className="mt-12 overflow-hidden rounded-2xl" ref={emblaRef}>
            <div className="flex gap-6">
              {testimonials.map((t, i) => (
                <div
                  key={i}
                  className="flex-[0_0_85%] md:flex-[0_0_45%] lg:flex-[0_0_32%] min-w-0"
                >
                  <div className="glassmorphism rounded-2xl p-6 flex flex-col gap-4 h-full min-h-[280px]">
                    <div className="flex items-center justify-between">
                      <span className="font-serif text-6xl text-[var(--primary)]/20 leading-none">&ldquo;</span>
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, j) => (
                          <Star key={j} className="size-4 fill-[#FBBF24] text-[#FBBF24]" />
                        ))}
                      </div>
                    </div>
                    <p className="font-serif italic text-base text-[var(--foreground)] leading-relaxed flex-1">
                      {t.quote}
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[var(--accent)] flex items-center justify-center">
                        <span className="text-sm font-bold text-[var(--primary)]">{t.initials}</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{t.name}</p>
                        <p className="text-xs text-[var(--muted-foreground)] flex items-center gap-1">
                          <MapPin className="size-3" /> {t.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={cn(
                  'h-2 rounded-full transition-all duration-300',
                  selectedDot === i
                    ? 'w-5 bg-[var(--primary)]'
                    : 'w-2 bg-[var(--border)]'
                )}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ═══════ SECTION 7: CTA BANNER ═══════ */}
      <section className="relative overflow-hidden bg-green-gradient py-24">
        {/* Decorative bg */}
        <div className="absolute right-0 top-0 opacity-10 w-64 pointer-events-none">
          <svg viewBox="0 0 200 200" fill="white" aria-hidden="true">
            <path d="M100 20 Q150 60 140 120 Q130 160 100 180 Q70 160 60 120 Q50 60 100 20Z" />
            <path d="M100 50 Q120 40 135 55 Q115 65 100 50Z" opacity="0.5" />
            <path d="M100 50 Q80 40 65 55 Q85 65 100 50Z" opacity="0.5" />
          </svg>
        </div>
        <div className="absolute left-0 bottom-0 opacity-10 pointer-events-none">
          <svg viewBox="0 0 100 100" className="w-32" aria-hidden="true">
            {Array.from({ length: 5 }).map((_, r) =>
              Array.from({ length: 5 }).map((_, c) => (
                <circle key={`${r}-${c}`} cx={10 + c * 20} cy={10 + r * 20} r="2" fill="white" />
              ))
            )}
          </svg>
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="text-center max-w-2xl mx-auto relative z-10 px-6">
          <motion.h2
            className="text-white font-serif text-3xl md:text-4xl font-bold"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Ready to Boost Your Harvest?
          </motion.h2>
          <motion.p
            className="text-white/70 mt-4 text-lg"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            Join 10,000+ farmers who trust AgroShield for their crop protection needs.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mt-8"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-white/15 border border-white/30 text-white placeholder-white/60 rounded-full px-6 py-3 flex-1 outline-none focus:bg-white/20 focus:border-white/50 transition-all text-sm"
              aria-label="Your email address"
            />
            <Button className="bg-white text-[var(--primary)] hover:bg-white/90 shimmer rounded-full px-6 py-3 font-semibold">
              Get Free Consultation
            </Button>
          </motion.div>
          <p className="mt-4 text-white/50 text-xs">
            ✓ Free agronomy consultation &nbsp; ✓ No spam &nbsp; ✓ Reply within 24hrs
          </p>
        </div>
      </section>

      {/* ═══════ SECTION 8: BLOG TEASER ═══════ */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader
            badge="From Our Blog"
            title="Latest Insights"
            subtitle="Expert tips, research updates, and practical farming advice from our agronomy team."
            shouldReduceMotion={shouldReduceMotion}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {blogPosts.map((post, i) => (
              <motion.article
                key={post.title}
                className="bg-[var(--card)] border border-[var(--border)] rounded-[var(--radius-lg)] overflow-hidden shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)] hover:-translate-y-2 transition-all duration-350 group"
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <div className="aspect-[16/9] bg-[var(--accent)] overflow-hidden flex items-center justify-center">
                  <BookOpen className="size-12 text-[var(--primary)]/30 group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" size="sm">{post.category}</Badge>
                    <span className="text-xs text-[var(--muted-foreground)] flex items-center gap-1">
                      <Calendar className="size-3" /> {post.date}
                    </span>
                  </div>
                  <h3 className="font-serif font-semibold text-base leading-snug">{post.title}</h3>
                  <p className="text-sm text-[var(--muted-foreground)] mt-2 line-clamp-2">{post.desc}</p>
                  <button className="text-sm text-[var(--primary)] font-semibold mt-3 flex items-center gap-1 hover:gap-2 transition-all">
                    Read More <ArrowRight className="size-4" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

/* ─── SUB-COMPONENTS ─── */

function SectionHeader({ badge, title, subtitle, shouldReduceMotion }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      className="text-center max-w-xl mx-auto"
      variants={staggerContainerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
    >
      <motion.div variants={fadeUpVariants}>
        <Badge variant="secondary">{badge}</Badge>
      </motion.div>
      <motion.h2
        className="font-serif text-3xl md:text-4xl font-bold mt-4"
        variants={fadeUpVariants}
      >
        {title}
      </motion.h2>
      <motion.p
        className="text-[var(--muted-foreground)] mt-3 leading-relaxed"
        variants={fadeUpVariants}
      >
        {subtitle}
      </motion.p>
    </motion.div>
  );
}

function FeaturesSection({ shouldReduceMotion }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section className="section-padding bg-[var(--background-alt)] relative">
      <div className="container-custom">
        <SectionHeader
          badge="Why Choose Us"
          title="Everything Your Crops Need"
          subtitle="Comprehensive crop protection backed by 15+ years of research and real-world results."
          shouldReduceMotion={shouldReduceMotion}
        />

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16"
          variants={staggerContainerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 cursor-default transition-all"
              variants={fadeUpVariants}
              whileHover={shouldReduceMotion ? {} : { y: -6, boxShadow: 'var(--shadow-xl)' }}
            >
              <div className="w-12 h-12 rounded-xl bg-[var(--accent)] flex items-center justify-center mb-4">
                <feature.icon className="size-6 text-[var(--primary)]" />
              </div>
              <h3 className="text-lg font-semibold font-serif mb-2">{feature.title}</h3>
              <p className="text-sm text-[var(--muted-foreground)] leading-relaxed">{feature.desc}</p>
              <div className="mt-4">
                <Badge variant="success" size="sm">{feature.stat}</Badge>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export { Home };
export default Home;
