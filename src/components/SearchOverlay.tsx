import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Search, Droplets, ShoppingBag, ArrowRight, Crown, Gift, Star, Coffee } from 'lucide-react';
import { products } from '../data/products';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (productName: string) => void;
}

export function SearchOverlay({ isOpen, onClose, onSelectProduct }: SearchOverlayProps) {
  const [query, setQuery] = useState('');
  
  const suggestions = [
    'Jeruk Peras Segar',
    'Capuccino Cincau',
    'Jeruk Peras Madu',
    'Cincau Susu Gula Aren',
    'Jeruk Peras Yakult'
  ];

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    return products.filter(p => 
      p.name.toLowerCase().includes(query.toLowerCase()) || 
      p.description.toLowerCase().includes(query.toLowerCase())
    );
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-aesthetic-light flex flex-col"
        >
          {/* Dynamic Island Search Header */}
          <div className="pt-12 pb-6 px-6">
            <div className="flex items-center gap-3">
              <motion.div 
                layoutId="search-bar"
                initial={{ width: '100%', height: 48 }}
                animate={{ height: 56 }}
                className="flex-1 relative bg-black dark:bg-surface-dark rounded-[2rem] shadow-2xl flex items-center px-6 gap-4 border border-white/10"
              >
                <Search size={20} className="text-white/60" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Cari minuman segar kamu..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="flex-1 bg-transparent text-white text-sm font-bold focus:outline-none placeholder:text-white/30"
                />
                {query && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={() => setQuery('')}
                    className="w-6 h-6 bg-white/10 rounded-full flex items-center justify-center text-white/60"
                  >
                    <X size={12} />
                  </motion.button>
                )}
              </motion.div>
              
              <motion.button 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={onClose}
                className="text-xs font-black uppercase tracking-widest text-gray-400 hover:text-primary-orange transition-colors"
              >
                Batal
              </motion.button>
            </div>
          </div>

          {/* Search Content */}
          <div className="flex-1 overflow-y-auto px-4 py-6 space-y-8">
            {/* Search Results */}
            {query.trim() && (
              <section>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Hasil Pencarian ({filteredProducts.length})</h3>
                {filteredProducts.length > 0 ? (
                  <div className="space-y-3">
                    {filteredProducts.map((p) => (
                      <motion.div
                        key={p.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        onClick={() => onSelectProduct(p.name)}
                        className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-surface-dark rounded-2xl border border-gray-100 dark:border-border-dark cursor-pointer active:scale-95 transition-transform"
                      >
                        <img src={p.image} alt={p.name} className="w-12 h-12 rounded-xl object-cover" />
                        <div className="flex-1">
                          <h4 className="text-xs font-black text-gray-900 dark:text-white">{p.name}</h4>
                          <p className="text-[10px] text-gray-500 dark:text-gray-400 line-clamp-1">{p.price}</p>
                        </div>
                        <Star size={14} className="text-yellow-500" fill="currentColor" />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                    <p className="text-sm text-gray-400 font-medium">Menu tidak ditemukan :(</p>
                  </div>
                )}
              </section>
            )}

            {/* Suggestions */}
            {!query.trim() && (
              <section>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Saran Pencarian</h3>
                <div className="flex flex-wrap gap-2">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      onClick={() => setQuery(s)}
                      className="px-4 py-2 bg-gray-50 dark:bg-surface-dark border border-gray-100 dark:border-border-dark rounded-full text-[10px] font-black text-gray-700 dark:text-gray-300 hover:border-primary-orange transition-colors uppercase tracking-wider"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </section>
            )}

            {/* Quick Categories */}
            {!query.trim() && (
              <section>
                <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4">Kategori Populer</h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: 'Jeruk', icon: Droplets, color: 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400' },
                    { name: 'Capuccino', icon: Coffee, color: 'bg-amber-50 text-amber-600 dark:bg-amber-900/20 dark:text-amber-400' },
                    { name: 'Signature', icon: Crown, color: 'bg-yellow-50 text-yellow-600 dark:bg-yellow-900/20 dark:text-yellow-400' },
                    { name: 'Snacks', icon: ShoppingBag, color: 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400' }
                  ].map((cat) => (
                    <button
                      key={cat.name}
                      onClick={() => onSelectProduct(cat.name)}
                      className={`flex items-center justify-between p-4 rounded-2xl ${cat.color} transition-transform active:scale-95`}
                    >
                      <div className="flex items-center gap-3">
                        <cat.icon size={18} />
                        <span className="font-black text-xs uppercase tracking-wider">{cat.name}</span>
                      </div>
                      <ArrowRight size={14} />
                    </button>
                  ))}
                </div>
              </section>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
