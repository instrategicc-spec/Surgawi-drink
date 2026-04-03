import { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Star, Heart, ArrowRight } from 'lucide-react';
import { products } from '../data/products';

export function MenuView({ activeCategory, setActiveCategory, setActiveTab, onOpenSearch, addToCart }: { activeCategory: string, setActiveCategory: (cat: string) => void, setActiveTab: (tab: string) => void, onOpenSearch?: () => void, addToCart: (product: any) => void, key?: string }) {
  const categories = ['Menu Utama', 'Paket Bundling', 'Paket Sedekah'];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03
      }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const filteredProducts = products.filter(p => p.category === activeCategory);

  return (
    <motion.div 
      id="menu-section"
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, x: 20 }}
      variants={containerVariants}
      className="bg-aesthetic-light pb-24 md:pb-8 transition-colors duration-300"
    >
      {/* Categories */}
      <div className="sticky top-[56px] md:top-[80px] z-40 bg-bg-light/80 dark:bg-bg-dark/80 backdrop-blur-md py-4 px-4 border-b border-gray-100 dark:border-border-dark transition-colors duration-300">
        <div className="flex overflow-x-auto hide-scrollbar gap-1.5 pb-1">
          {categories.map(cat => (
            <motion.button
              key={cat}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                activeCategory === cat 
                  ? 'bg-primary-orange text-white shadow-lg shadow-primary-orange/20 glow-orange' 
                  : 'bg-white dark:bg-surface-dark border border-gray-100 dark:border-border-dark text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 shadow-sm'
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Sedekah Banner */}
      {activeCategory === 'Paket Sedekah' && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mx-4 mt-6 p-8 bg-gradient-to-br from-[#a2cf6d] to-emerald-800 dark:from-emerald-800 dark:to-emerald-950 rounded-[2rem] text-white relative overflow-hidden shadow-2xl glow-green"
        >
          <div className="relative z-10 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <Heart size={16} fill="currentColor" className="text-pink-400" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/80">Jumat Berkah</span>
            </div>
            <div>
              <h3 className="text-3xl font-black tracking-tighter leading-none uppercase mb-2">SEDEKAH <br /> BIKIN BERKAH</h3>
              <p className="text-[11px] font-medium text-white/70 leading-relaxed max-w-[220px]">
                Pesan kolektif buat jamaah masjid atau panti. Kami yang antarkan, kamu tinggal duduk manis dapat pahala.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab('sedekah')}
              className="bg-white dark:bg-emerald-600 text-[#a2cf6d] dark:text-white text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-2xl shadow-xl flex items-center gap-2"
            >
              IKUTAN SEDEKAH <ArrowRight size={14} />
            </motion.button>
          </div>
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          <motion.div 
            animate={{ rotate: [0, 10, 0], scale: [1, 1.1, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-4 top-1/2 -translate-y-1/2 opacity-10"
          >
            <Heart size={160} strokeWidth={1} />
          </motion.div>
        </motion.div>
      )}

      {/* Product List */}
      <div className="px-4 py-4 md:max-w-4xl md:mx-auto">
        <h2 className="text-xs font-black text-gray-400 dark:text-gray-500 mb-4 uppercase tracking-[0.2em] flex items-center gap-2">
          <div className="w-1.5 h-1.5 bg-primary-orange rounded-full glow-orange" />
          {activeCategory}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {filteredProducts.map((product) => (
            <motion.div 
              key={product.id} 
              variants={itemVariants}
              whileHover={{ y: -2 }}
              className="flex gap-3 bg-white dark:bg-surface-dark p-2.5 rounded-2xl shadow-md border border-gray-100 dark:border-border-dark group transition-colors"
            >
              <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 dark:bg-gray-800 shrink-0 shadow-sm relative">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-1 right-1 bg-white/90 dark:bg-black/50 backdrop-blur-sm px-1.5 py-0.5 rounded-md">
                   <Star size={8} className="text-yellow-500" fill="currentColor" />
                </div>
              </div>
              <div className="flex flex-col justify-between py-0.5 flex-1">
                <div>
                  <h3 className="font-black text-gray-900 dark:text-white leading-tight mb-0.5 text-sm tracking-tight">{product.name}</h3>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed font-medium">{product.description}</p>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-black text-gray-900 dark:text-white text-sm tracking-tighter">{product.price}</span>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        addToCart(product);
                        setActiveTab('checkout');
                      }}
                      className="px-3 py-1.5 rounded-full bg-[#a2cf6d] dark:bg-emerald-600 text-white text-[9px] font-black uppercase tracking-widest flex items-center gap-1 shadow-md shadow-emerald-500/10 transition-colors glow-green"
                    >
                      Sikat
                    </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

