import { motion } from 'motion/react';
import { Search, ShoppingBag, Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { ThemeToggle } from './ThemeToggle';

interface MobileHeaderProps {
  isDark: boolean;
  toggleTheme: () => void;
  onOpenSearch: () => void;
  activeTab: string;
  cartCount: number;
  setActiveTab: (tab: string) => void;
}

export function MobileHeader({ isDark, toggleTheme, onOpenSearch, activeTab, cartCount, setActiveTab }: MobileHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isLanding = activeTab === 'beranda';

  return (
    <div className={`${isLanding ? 'h-0' : 'h-[56px]'} md:hidden transition-all duration-300`}>
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 flex items-center gap-2 px-3 py-2 ${
        isScrolled 
          ? 'bg-primary-green/80 dark:bg-emerald-950/80 backdrop-blur-md shadow-md' 
          : isLanding 
            ? 'bg-transparent' 
            : 'bg-primary-green dark:bg-emerald-950 shadow-sm'
      }`}>
        {/* Logo */}
        <motion.img 
          whileHover={{ rotate: 360 }}
          transition={{ duration: 1 }}
          onClick={() => setActiveTab('beranda')}
          src={isDark ? "https://i.ibb.co.com/GfZrMpRk/1774857035375.png" : "https://i.ibb.co.com/j9yyyQyT/1774856961335.png"} 
          alt="Surgawi Logo" 
          className="h-9 w-auto drop-shadow-2xl shrink-0 cursor-pointer" 
          referrerPolicy="no-referrer"
        />

        {/* Dynamic Island Search Bar */}
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={onOpenSearch}
          className="flex-1 h-9 bg-black/20 backdrop-blur-2xl rounded-full border border-white/10 flex items-center px-3 gap-2 shadow-inner transition-all hover:bg-black/30 group overflow-hidden"
        >
          <Search size={14} className="text-white/60 group-hover:text-white transition-colors shrink-0" />
          <span className="text-white/40 text-[10px] font-medium tracking-tight truncate">Cari...</span>
        </motion.button>

        {/* Action Icons */}
        <div className="flex items-center gap-1.5 shrink-0">
          {/* Sedekah Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setActiveTab('sedekah')}
            className={`p-2 rounded-full transition-all ${
              activeTab === 'sedekah' 
                ? 'bg-primary-orange text-white shadow-lg glow-orange' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Heart size={16} fill={activeTab === 'sedekah' ? "currentColor" : "none"} />
          </motion.button>

          {/* Cart Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setActiveTab('checkout')}
            className={`p-2 rounded-full transition-all relative ${
              activeTab === 'checkout' 
                ? 'bg-primary-orange text-white shadow-lg glow-orange' 
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <ShoppingBag size={16} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary-orange text-white text-[8px] font-black rounded-full flex items-center justify-center shadow-lg border border-white/20">
                {cartCount}
              </span>
            )}
          </motion.button>

          <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
        </div>
      </div>
    </div>
  );
}
