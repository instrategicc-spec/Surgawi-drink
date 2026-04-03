import { motion } from 'motion/react';
import { ShoppingBag, Search, Heart, Crown } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

interface TopNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDark: boolean;
  toggleTheme: () => void;
  cartCount: number;
}

export function TopNav({ activeTab, setActiveTab, isDark, toggleTheme, cartCount }: TopNavProps) {
  const navItems = [
    { id: 'beranda', label: 'Beranda' },
    { id: 'menu', label: 'Menu' },
    { id: 'checkout', label: 'Keranjang' },
    { id: 'sedekah', label: 'Sedekah' },
  ];

  return (
    <nav className={`hidden md:flex sticky top-0 z-50 w-full backdrop-blur-md border-b px-6 py-4 items-center justify-between transition-all duration-300 bg-primary-green/80 dark:bg-emerald-950/80 border-primary-green/20 dark:border-emerald-900/20 shadow-sm`}>
      <div className="flex items-center gap-8">
        <motion.div 
          whileHover={{ scale: 1.05, rotate: 5 }}
          className="flex items-center cursor-pointer" 
          onClick={() => setActiveTab('beranda')}
        >
          <img src={isDark ? "https://i.ibb.co.com/GfZrMpRk/1774857035375.png" : "https://i.ibb.co.com/j9yyyQyT/1774856961335.png"} alt="Surgawi Logo" className="h-12 w-auto drop-shadow-lg" />
        </motion.div>
        
        <div className="flex gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`font-semibold text-sm transition-colors ${
                activeTab === item.id 
                  ? 'text-primary-orange dark:text-orange-400 border-b-2 border-primary-orange dark:border-orange-400 pb-1' 
                  : 'text-gray-900 dark:text-white/70 hover:text-white dark:hover:text-emerald-400'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
        <button className="p-2 rounded-full transition-colors text-gray-900 dark:text-gray-300 hover:bg-white/20">
          <Search size={20} />
        </button>
        <button 
          onClick={() => setActiveTab('checkout')}
          className="p-2 rounded-full transition-colors relative text-gray-900 dark:text-gray-300 hover:bg-white/20"
        >
          <ShoppingBag size={20} />
          {cartCount > 0 && (
            <span className="absolute top-1 right-1 w-4 h-4 bg-primary-orange text-white text-[8px] font-black rounded-full flex items-center justify-center shadow-lg glow-orange">
              {cartCount}
            </span>
          )}
        </button>
        <button 
          onClick={() => setActiveTab('sedekah')}
          className="flex items-center gap-2 px-4 py-2 bg-primary-orange hover:bg-primary-orange/90 text-white rounded-full text-sm font-bold transition-colors shadow-lg glow-orange"
        >
          <Heart size={16} fill="currentColor" />
          <span>Sedekah</span>
        </button>
      </div>
    </nav>
  );
}
