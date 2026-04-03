/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { HomeView } from './components/HomeView';
import { MenuView } from './components/MenuView';
import { OrdersView } from './components/OrdersView';
import { CheckoutView } from './components/CheckoutView';
import { SearchOverlay } from './components/SearchOverlay';
import { SedekahView } from './components/SedekahView';
import { LandingView } from './components/LandingView';
import { MobileLayout } from './layouts/MobileLayout';
import { DesktopLayout } from './layouts/DesktopLayout';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState('beranda');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('Menu Utama');
  const [isLoading, setIsLoading] = useState(true);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [cart, setCart] = useState<{ id: string; name: string; price: string; quantity: number; image: string }[]>([]);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  useEffect(() => {
    // Splash screen timer
    const timer = setTimeout(() => setIsLoading(false), 2500);
    
    // PWA Install Prompt
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  const toggleTheme = () => setIsDark(!isDark);

  const addToCart = (product: { id: string; name: string; price: string; image: string }) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: string) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handleSelectProduct = (productName: string) => {
    console.log('Searching for:', productName);
    setIsSearchOpen(false);
    setActiveTab('menu');
  };

  const scrollToMenu = (category?: string) => {
    if (category) {
      setActiveCategory(category);
    }
    const menuElement = document.getElementById('menu-section');
    if (menuElement) {
      menuElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const renderContent = () => {
    switch (activeTab) {
      case 'beranda':
        return (
          <LandingView 
            key="beranda" 
            onStart={() => setActiveTab('menu')} 
            isDark={isDark}
            toggleTheme={toggleTheme}
          />
        );
      case 'menu':
        return (
          <div key="menu" className="flex flex-col">
            <HomeView 
              navigateToMenu={scrollToMenu} 
              setActiveTab={setActiveTab}
              onOpenSearch={() => setIsSearchOpen(true)} 
              isDark={isDark}
              toggleTheme={toggleTheme}
            />
            <MenuView 
              activeCategory={activeCategory} 
              setActiveCategory={setActiveCategory} 
              setActiveTab={setActiveTab}
              onOpenSearch={() => setIsSearchOpen(true)} 
              addToCart={addToCart}
            />
          </div>
        );
      case 'orders':
        return <OrdersView key="orders" isDark={isDark} />;
      case 'checkout':
        return (
          <CheckoutView 
            key="checkout"
            cart={cart}
            removeFromCart={removeFromCart}
            updateQuantity={updateQuantity}
            addToCart={addToCart}
            setActiveTab={setActiveTab}
            isDark={isDark}
            clearCart={clearCart}
          />
        );
      case 'sedekah':
        return <SedekahView key="sedekah" isDark={isDark} toggleTheme={toggleTheme} addToCart={addToCart} setActiveTab={setActiveTab} />;
      default:
        return (
          <LandingView 
            key="beranda" 
            onStart={() => setActiveTab('menu')} 
            isDark={isDark}
            toggleTheme={toggleTheme}
          />
        );
    }
  };

  return (
    <div className="bg-aesthetic-light min-h-screen font-sans selection:bg-primary-orange selection:text-white transition-colors duration-300">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[9999] bg-[#a2cf6d] flex flex-col items-center justify-center p-6 overflow-hidden"
          >
            {/* Animated Background Elements */}
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 90, 0],
                opacity: [0.1, 0.2, 0.1]
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute -top-20 -left-20 w-80 h-80 bg-white rounded-full blur-3xl"
            />
            <motion.div 
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, -120, 0],
                opacity: [0.1, 0.3, 0.1]
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute -bottom-40 -right-40 w-[30rem] h-[30rem] bg-white rounded-full blur-[100px]"
            />

            <div className="relative z-10 flex flex-col items-center">
              <motion.div
                initial={{ scale: 0.5, opacity: 0, rotate: -20 }}
                animate={{ scale: 1, opacity: 1, rotate: 0 }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2
                }}
                className="relative"
              >
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white/30 relative z-10">
                  <img 
                    src="https://i.ibb.co.com/DgWp6zmN/1774856629473-1.jpg" 
                    alt="Logo" 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <motion.div 
                  animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -inset-4 bg-white/20 blur-2xl rounded-full -z-10"
                />
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8 text-center"
              >
                <h1 className="text-white font-black text-4xl md:text-5xl tracking-tighter uppercase leading-none mb-2">
                  SURGAWI<br/>DRINK
                </h1>
                <div className="flex items-center justify-center gap-2">
                  <div className="h-1 w-12 bg-white/30 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      className="h-full w-full bg-white"
                    />
                  </div>
                  <span className="text-white/80 text-[10px] font-black uppercase tracking-[0.3em]">Loading Freshness</span>
                  <div className="h-1 w-12 bg-white/30 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ x: "-100%" }}
                      animate={{ x: "100%" }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.75 }}
                      className="h-full w-full bg-white"
                    />
                  </div>
                </div>
              </motion.div>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="absolute bottom-12 left-0 right-0 text-center"
            >
              <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest">Premium Beverage Experience</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PWA Install Banner */}
      <AnimatePresence>
        {deferredPrompt && !isLoading && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-24 left-4 right-4 z-50 md:bottom-8 md:left-auto md:right-8 md:w-80"
          >
            <div className="bg-white dark:bg-surface-dark p-4 rounded-3xl shadow-2xl border border-gray-100 dark:border-border-dark flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl overflow-hidden shadow-md flex-shrink-0">
                <img 
                  src="https://i.ibb.co.com/DgWp6zmN/1774856629473-1.jpg" 
                  alt="App Icon" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex-1">
                <h4 className="text-[11px] font-black text-gray-900 dark:text-white uppercase tracking-wider">Install Surgawi</h4>
                <p className="text-[9px] text-gray-500 dark:text-gray-400 font-medium">Akses lebih cepat & offline</p>
              </div>
              <button 
                onClick={handleInstall}
                className="bg-[#a2cf6d] text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-emerald-500/10 active:scale-95 transition-transform"
              >
                Install
              </button>
              <button 
                onClick={() => setDeferredPrompt(null)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <svg size={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Search Overlay */}
      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        onSelectProduct={handleSelectProduct}
      />

      {/* Desktop Layout */}
      <DesktopLayout 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        isDark={isDark}
        toggleTheme={toggleTheme}
        cartCount={cartCount}
      >
        {renderContent()}
      </DesktopLayout>

      {/* Mobile Layout */}
      <MobileLayout 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        cartCount={cartCount}
        isDark={isDark}
        toggleTheme={toggleTheme}
        onOpenSearch={() => setIsSearchOpen(true)}
      >
        {renderContent()}
      </MobileLayout>
      
    </div>
  );
}



