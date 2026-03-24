import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Leaf, Truck, Users, ArrowRight } from 'lucide-react';
import ProductListing from '../components/products/ProductListing';

export default function Products() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans overflow-x-hidden">
      {/* Hero / Header Section */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
          <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-green-500/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] bg-emerald-500/5 blur-[100px] rounded-full" />
          <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 text-[11px] font-bold text-green-700 uppercase tracking-[0.2em] mb-6 border border-green-100 shadow-sm shadow-green-100/50">
              <ShieldCheck size={14} className="animate-pulse" />
              Certified Agricultural Solutions
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 leading-[1.1] mb-8 tracking-tight">
              Premium <span className="text-green-600 bg-clip-text">Crop Protection</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-500">For Modern Farming</span>
            </h1>
            <p className="max-w-2xl mx-auto text-lg text-gray-500 font-medium leading-relaxed">
              Explore our laboratory-tested, high-performance pesticides and fertilizers designed to maximize your yield and protect your investments.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Listing Section */}
      <section className="pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <ProductListing />
        </div>
      </section>

      {/* Trust / Stats Section */}
      <section className="py-24 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 [mask-image:radial-gradient(circle_at_center,white,transparent)]">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center">
            {[
              { icon: ShieldCheck, title: "100% Certified", desc: "Rigorous quality checks" },
              { icon: Leaf, title: "Eco-Friendly", desc: "Sustainable solutions" },
              { icon: Users, title: "10k+ Farmers", desc: "Trusted nationwide" },
              { icon: Truck, title: "Fast Delivery", desc: "24-48h dispatch" }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center group"
              >
                <div className="w-16 h-16 rounded-[1.5rem] bg-white/5 flex items-center justify-center mb-6 group-hover:bg-green-600 transition-all duration-500 border border-white/10 group-hover:border-green-500">
                  <stat.icon size={28} className="text-white opacity-80 group-hover:opacity-100" />
                </div>
                <h4 className="text-xl font-bold text-white mb-2">{stat.title}</h4>
                <p className="text-gray-400 text-sm font-medium">{stat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="relative rounded-[3rem] bg-gradient-to-br from-green-600 to-emerald-700 p-12 md:p-20 overflow-hidden shadow-2xl shadow-green-200">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10 blur-sm">
              <div className="grid grid-cols-12 h-full w-full rotate-12 scale-150">
                {[...Array(144)].map((_, i) => (
                  <div key={i} className="border-[0.5px] border-white/20 aspect-square" />
                ))}
              </div>
            </div>

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="max-w-xl text-center md:text-left">
                <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                  Need a custom solution for your farm?
                </h2>
                <p className="text-green-50 text-lg font-medium opacity-90">
                  Our experts are ready to help you choose the right combination of products for your specific crop needs.
                </p>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-5 bg-white text-green-700 rounded-2xl font-black text-lg flex items-center gap-3 shadow-xl hover:shadow-2xl transition-all"
              >
                Consult an Expert
                <ArrowRight size={20} />
              </motion.button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}