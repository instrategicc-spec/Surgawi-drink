import { Home, ShoppingBag, Crown, User, ClipboardList, Heart, Coffee } from 'lucide-react';
import { motion } from 'motion/react';

interface BottomNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
}

export function BottomNav({ activeTab, setActiveTab, cartCount }: BottomNavProps) {
  const navItems = [
    { id: 'beranda', icon: Home, label: 'Beranda' },
    { id: 'menu', icon: Coffee, label: 'Menu' },
    { id: 'checkout', icon: ShoppingBag, label: 'Keranjang' },
    { id: 'orders', icon: ClipboardList, label: 'Riwayat' },
    { id: 'sedekah', icon: Heart, label: 'Sedekah' },
  ];

  return (
    <div className="md:hidden fixed bottom-0 left-0 w-full bg-primary-green dark:bg-emerald-950 backdrop-blur-3xl rounded-t-[2.5rem] px-6 py-3 pb-safe z-50 flex justify-between items-center transition-all duration-300 shadow-[0_-10px_40px_rgba(0,0,0,0.15)] border-t border-white/10">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className="relative flex flex-col items-center group min-w-[50px]"
          >
            <motion.div
              animate={isActive ? { 
                scale: 1.15, 
                y: -4,
                color: '#FFFFFF'
              } : { 
                scale: 1, 
                y: 0,
                color: 'rgba(255, 255, 255, 0.6)'
              }}
              transition={{ type: 'spring', stiffness: 500, damping: 20 }}
              className="relative z-10"
            >
              <div className={`p-2 rounded-2xl transition-all duration-300 ${isActive ? 'bg-white/20 shadow-lg' : ''}`}>
                <Icon 
                  size={20} 
                  strokeWidth={isActive ? 3 : 2} 
                  className={`transition-colors duration-300 ${isActive ? 'drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]' : ''}`}
                />
              </div>
              {item.id === 'checkout' && cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary-orange text-white text-[8px] font-black rounded-full flex items-center justify-center shadow-lg glow-orange border-2 border-primary-green dark:border-emerald-950">
                  {cartCount}
                </span>
              )}
            </motion.div>
            
            <motion.span 
              initial={false}
              animate={isActive ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0.7, y: 0, scale: 0.9 }}
              className={`text-[7px] font-black uppercase tracking-[0.2em] mt-1 transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/60'}`}
            >
              {item.label}
            </motion.span>

            {isActive && (
              <motion.div 
                layoutId="nav-indicator"
                className="absolute -bottom-1 w-1 h-1 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.8)]"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
          </button>
        );
      })}
    </div>
  );
}
