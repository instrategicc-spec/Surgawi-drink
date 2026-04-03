import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Plus, Heart, ShoppingBag, Bike, Utensils, Gift, Crown, MessageCircle, Zap, Clock, ChevronRight, ClipboardList, Droplets, Star } from 'lucide-react';

interface HomeViewProps {
  navigateToMenu: (cat?: string) => void;
  setActiveTab: (tab: string) => void;
  onOpenSearch: () => void;
  isDark: boolean;
  toggleTheme: () => void;
  key?: string;
}

export function HomeView({ navigateToMenu, setActiveTab, onOpenSearch, isDark, toggleTheme }: HomeViewProps) {
  const [deliveryMode, setDeliveryMode] = useState<'delivery' | 'pickup'>('delivery');
  const [grabSoon, setGrabSoon] = useState(false);
  const [currentPromo, setCurrentPromo] = useState(0);

  const carouselItems = [
    { id: 'new-banner' },
    { id: 'our-brand' },
    { id: 'aesthetic-promo' },
    { id: 'freshness' },
    { id: 'benefit' },
    { id: 'delivery' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % carouselItems.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleGrabClick = () => {
    setGrabSoon(true);
    setTimeout(() => setGrabSoon(false), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 10, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 120 } }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, x: -20 }}
      variants={containerVariants}
      className="bg-aesthetic-light transition-colors duration-300 relative"
    >
      {/* Top Header Background (for the rounded bottom and location card) */}
      <div className="bg-[#a2cf6d] dark:bg-emerald-900 pb-16 px-4 relative rounded-b-[1.5rem] transition-colors duration-300 z-10 -mt-1 pt-4">
        {/* Location Card */}
        <motion.div 
          variants={itemVariants}
          className="relative z-10 bg-white dark:bg-surface-dark rounded-xl p-2.5 shadow-xl shadow-black/5 transition-colors duration-300 border border-gray-100 dark:border-border-dark"
        >
          <div className="flex justify-between items-center mb-1.5">
            <div>
              <h2 className="font-black text-xs text-gray-900 dark:text-white flex items-center gap-1">
                Lapak Surgawi - Jakarta
                <motion.div animate={{ y: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 2 }}>
                  <ChevronDown size={12} className="text-gray-400" />
                </motion.div>
              </h2>
              <a 
                href="https://maps.app.goo.gl/wqxB6tP8AsoE6xEu7" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[9px] text-gray-500 dark:text-gray-400 line-clamp-1 hover:text-[#a2cf6d] transition-colors block mt-0.5"
              >
                Joglo, Kec. Kembangan, Kota Jakarta Barat
              </a>
            </div>
            <motion.div 
              whileHover={{ x: 2 }}
              className="w-7 h-7 bg-orange-50 dark:bg-orange-900/30 rounded-lg flex items-center justify-center text-primary-orange dark:text-orange-400 glow-orange shrink-0 ml-2"
            >
              <Bike size={14} />
            </motion.div>
          </div>
          
          <div className="flex gap-2 border-t border-gray-50 dark:border-border-dark pt-1.5">
            <span className="text-[9px] font-medium text-gray-400 dark:text-gray-500">Lagi pengen apa?</span>
            <label className="flex items-center gap-1 cursor-pointer group" onClick={() => setDeliveryMode('delivery')}>
              <motion.div whileTap={{ scale: 1.5 }} className={`w-2 h-2 rounded-full border ${deliveryMode === 'delivery' ? 'bg-[#a2cf6d] border-[#a2cf6d] dark:bg-emerald-500 dark:border-emerald-500' : 'border-[#a2cf6d] dark:border-emerald-500 bg-white dark:bg-bg-dark'}`} />
              <span className="text-[9px] font-black text-gray-900 dark:text-white">Diantarin</span>
            </label>
            <label className="flex items-center gap-1 cursor-pointer group" onClick={() => setDeliveryMode('pickup')}>
              <motion.div whileTap={{ scale: 1.5 }} className={`w-2 h-2 rounded-full border ${deliveryMode === 'pickup' ? 'bg-teal-500 border-teal-500' : 'border-teal-500 bg-white dark:bg-bg-dark'}`} />
              <span className="text-[9px] font-black text-gray-900 dark:text-white">Ambil Sendiri</span>
            </label>
          </div>

          <AnimatePresence>
            {deliveryMode === 'delivery' && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-3 p-3 bg-gradient-to-br from-orange-100/90 via-emerald-50/80 to-teal-100/90 dark:from-orange-900/40 dark:via-emerald-900/20 dark:to-teal-900/40 rounded-xl border border-white/60 dark:border-gray-700/50 shadow-sm relative overflow-hidden">
                  {/* Decorative background blobs */}
                  <div className="absolute -top-6 -right-6 w-20 h-20 bg-primary-orange/20 dark:bg-primary-orange/10 rounded-full blur-xl animate-pulse" />
                  <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-[#a2cf6d]/20 dark:bg-[#a2cf6d]/10 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />

                  <p className="text-[10px] text-gray-800 dark:text-gray-200 mb-3 font-bold flex items-center gap-1.5 relative z-10">
                    <Bike size={12} className="text-primary-orange" /> Pesan lewat sini aja, praktis!
                  </p>
                  <div className="grid grid-cols-3 gap-2.5 relative z-10">
                    {/* GoFood */}
                    <motion.a 
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      href="https://gofood.link/a/T4vS9Sm" target="_blank" rel="noopener noreferrer" 
                      className="flex justify-center items-center h-14 bg-white/90 dark:bg-surface-dark/90 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md border border-white/50 dark:border-gray-700/50"
                    >
                      <img src="https://i.ibb.co.com/0RFn3YFR/1774806289675.png" alt="GoFood" className="h-7 object-contain dark:hidden" referrerPolicy="no-referrer" />
                      <img src="https://i.ibb.co.com/1tZcNRyz/1774801686119.png" alt="GoFood" className="h-7 object-contain hidden dark:block" referrerPolicy="no-referrer" />
                    </motion.a>
                    {/* GrabFood */}
                    <motion.a 
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      href="https://food.grab.com/id/id/restaurant/surgawi-drink---joglo/6-C73ZGYBEG35DWA?exp_src=share&itemID=IDITE2026031604580009896&sourceID=20260401_114436_e8085611e17f46b9a180f9e84dd2d4ff_MEXIS_IDITE2026031604580009896" target="_blank" rel="noopener noreferrer" 
                      className="relative flex justify-center items-center h-14 bg-white/90 dark:bg-surface-dark/90 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md border border-white/50 dark:border-gray-700/50 overflow-hidden"
                    >
                      <img src="https://i.ibb.co.com/Y4hjkKQ5/1774805215236.png" alt="GrabFood" className="h-7 object-contain dark:hidden" referrerPolicy="no-referrer" />
                      <img src="https://i.ibb.co.com/gMXKfzNY/1774801633498.png" alt="GrabFood" className="h-7 object-contain hidden dark:block" referrerPolicy="no-referrer" />
                    </motion.a>
                    {/* ShopeeFood */}
                    <motion.a 
                      whileHover={{ scale: 1.05, y: -2 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      href="https://shopee.co.id/universal-link/now-food/dish/22833263/3005540077023744?deep_and_deferred=1&shareChannel=whatsapp" target="_blank" rel="noopener noreferrer" 
                      className="flex justify-center items-center h-14 bg-white/90 dark:bg-surface-dark/90 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md border border-white/50 dark:border-gray-700/50"
                    >
                      <img src="https://i.ibb.co.com/ZR5BcPWj/1774801323291.png" alt="ShopeeFood" className="h-7 object-contain dark:hidden" referrerPolicy="no-referrer" />
                      <img src="https://i.ibb.co.com/S73XMKbp/1774801579594.png" alt="ShopeeFood" className="h-7 object-contain hidden dark:block" referrerPolicy="no-referrer" />
                    </motion.a>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Main Content Area */}
      <div className="px-4 -mt-10 relative z-20 space-y-3">
        
        {/* Creative Content Carousel */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
          className="relative w-full aspect-[16/7] rounded-xl overflow-hidden shadow-lg bg-gray-900"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPromo}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0"
            >
              {currentPromo === 0 && (
                <div className="absolute inset-0 bg-white overflow-hidden">
                  <motion.img 
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    src="https://i.ibb.co.com/N2wgCs3g/1000201096.png" 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}

              {currentPromo === 1 && (
                <div className="absolute inset-0 bg-white overflow-hidden">
                  <motion.img 
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    src="https://i.ibb.co.com/ycDcWcPC/Our-brand-1.png" 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}

              {currentPromo === 2 && (
                <div className="absolute inset-0 bg-[#0A0A0A] overflow-hidden">
                  <motion.img 
                    initial={{ scale: 1.05 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    src="https://i.ibb.co.com/Fb9vrHJM/20260331-033306-0000.png" 
                    className="w-full h-full object-cover" 
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}

              {currentPromo === 3 && (
                <div className="absolute inset-0 bg-[#FF6B00] overflow-hidden flex items-center">
                  <div className="absolute -right-10 top-0 w-64 h-full bg-yellow-400/20 skew-x-12" />
                  <div className="relative z-10 p-5 w-2/3">
                    <p className="text-yellow-200 font-bold text-[10px] tracking-widest mb-1">SEGERNYA JUARA</p>
                    <h2 className="text-white font-black text-4xl leading-[0.85] tracking-tighter mb-2 transform -skew-x-6">JERUK<br/>ASLI<br/>100%</h2>
                    <p className="text-white/90 text-xs font-medium leading-tight">Gak pake sirup, gak pake perisa. Diperas dadakan pas kamu pesen.</p>
                  </div>
                  <motion.img 
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    src="https://i.ibb.co.com/4wymfdh4/1000199638.jpg" 
                    className="absolute right-0 top-0 w-1/2 h-full object-cover mask-image-gradient" 
                    style={{ WebkitMaskImage: 'linear-gradient(to right, transparent, black 40%)' }} 
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}

              {currentPromo === 4 && (
                <div className="absolute inset-0 bg-[#F4F4F5] overflow-hidden flex items-center p-4">
                  <div className="w-[55%] pr-2 z-10">
                    <div className="flex items-center gap-1 mb-2">
                      <div className="w-2 h-2 rounded-full bg-orange-500" />
                      <span className="text-[9px] font-bold text-gray-500 tracking-wider uppercase">Biar Kamu Tahu</span>
                    </div>
                    <h2 className="text-gray-900 font-bold text-xl leading-tight mb-2">Bikin Badan<br/>Gak Gampang Tumbang</h2>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2"><Zap size={10} className="text-orange-500"/><span className="text-[10px] text-gray-600 font-medium">Vitamin C-nya melimpah</span></div>
                      <div className="flex items-center gap-2"><Heart size={10} className="text-orange-500"/><span className="text-[10px] text-gray-600 font-medium">Bikin kulit makin seger</span></div>
                      <div className="flex items-center gap-2"><Droplets size={10} className="text-orange-500"/><span className="text-[10px] text-gray-600 font-medium">Haus langsung ilang</span></div>
                    </div>
                  </div>
                  <div className="w-[45%] h-full relative right-0 absolute flex items-center justify-end pr-2">
                    <div className="absolute inset-y-2 right-2 left-4 bg-orange-200 rounded-xl transform rotate-3" />
                    <motion.img 
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      src="https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&q=80&w=800" 
                      className="relative w-full h-[90%] object-cover rounded-xl transform -rotate-3 shadow-md" 
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              )}

              {currentPromo === 5 && (
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-600 overflow-hidden flex items-center">
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)', backgroundSize: '16px 16px' }} />
                  <div className="w-1/2 p-5 relative z-10">
                    <h2 className="text-white font-bold text-2xl leading-tight mb-1">Lagi Males<br/>Keluar?</h2>
                    <p className="text-emerald-50 text-[10px] mb-3 leading-tight">Tenang, biar abang ojol yang anterin ke tempat kamu.</p>
                    <div className="flex gap-2">
                       <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md"><Bike size={14} className="text-emerald-600"/></div>
                       <div className="w-7 h-7 bg-white rounded-full flex items-center justify-center shadow-md"><ShoppingBag size={14} className="text-emerald-600"/></div>
                    </div>
                  </div>
                  <div className="w-1/2 h-full relative flex items-center justify-center">
                     <div className="absolute w-32 h-32 bg-white/20 rounded-full blur-xl" />
                     <motion.div 
                       initial={{ rotate: 0 }}
                       animate={{ rotate: [0, 5, 0, -5, 0] }}
                       transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                       className="relative bg-white/10 backdrop-blur-md border border-white/30 p-3 rounded-2xl shadow-xl"
                     >
                        <div className="flex flex-col gap-2">
                           <div className="bg-white px-3 py-1.5 rounded-lg text-[10px] font-bold text-green-600 shadow-sm flex items-center gap-1.5"><img src="https://i.ibb.co.com/ZR5BcPWj/1774801323291.png" className="h-3" referrerPolicy="no-referrer"/> GoFood</div>
                           <div className="bg-white px-3 py-1.5 rounded-lg text-[10px] font-bold text-orange-500 shadow-sm flex items-center gap-1.5"><img src="https://i.ibb.co.com/S73XMKbp/1774801579594.png" className="h-3" referrerPolicy="no-referrer"/> ShopeeFood</div>
                        </div>
                     </motion.div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Carousel Indicators */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-20">
            {carouselItems.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPromo(idx)}
                className={`h-1 rounded-full transition-all duration-300 ${currentPromo === idx ? 'w-4 bg-white' : 'w-1.5 bg-white/40 hover:bg-white/60'}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Action Grid - Bento Style Web 2026 */}
        <motion.div variants={itemVariants} className="grid grid-cols-3 gap-2.5">
          {/* Sikat Sekarang - Main Action (Large) */}
          <motion.button 
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigateToMenu()}
            className="col-span-2 flex items-center justify-between bg-gradient-to-br from-primary-orange to-orange-600 p-4 rounded-2xl shadow-lg shadow-orange-500/20 relative overflow-hidden group"
          >
            <div className="relative z-10 text-left">
              <span className="text-[10px] font-black text-orange-100 uppercase tracking-widest mb-1 block">Haus Banget?</span>
              <h3 className="text-lg font-black text-white leading-tight">SIKAT<br/>SEKARANG</h3>
            </div>
            <div className="relative z-10 bg-white/20 backdrop-blur-md p-2.5 rounded-xl border border-white/30">
              <ShoppingBag size={24} className="text-white" />
            </div>
            {/* Decorative background circle */}
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-500" />
          </motion.button>

          {/* Riwayat Jajan - Status Action */}
          <motion.button 
            whileHover={{ y: -2, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('orders')}
            className="col-span-1 flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-50 dark:from-[#1A1A1A] dark:to-[#0F0F0F] p-3 rounded-2xl shadow-sm border border-gray-100 dark:border-white/5 relative group overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-gray-100/50 dark:via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="mb-2 p-2.5 bg-gray-50 dark:bg-black/40 rounded-xl text-gray-600 dark:text-gray-400 shadow-[inset_0_1px_2px_rgba(0,0,0,0.02)] dark:shadow-[inset_0_1px_2px_rgba(0,0,0,0.2)] border border-gray-200/50 dark:border-white/5 relative z-10 group-hover:text-primary-orange dark:group-hover:text-orange-400 transition-colors duration-300">
              <Clock size={18} strokeWidth={2.5} />
            </div>
            <span className="text-[9px] font-black text-gray-800 dark:text-gray-200 uppercase tracking-widest text-center leading-tight relative z-10">
              Riwayat<br/>Jajan
            </span>
          </motion.button>


        </motion.div>



        {/* Jumat Berkah / Sedekah Section */}
        <motion.div 
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
          className="bg-gradient-to-br from-[#a2cf6d] to-emerald-800 rounded-2xl p-4 shadow-xl relative overflow-hidden group cursor-pointer"
          onClick={() => setActiveTab('sedekah')}
        >
          <div className="relative z-10 flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5">
                <Heart size={12} className="text-pink-400" fill="currentColor" />
                <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white/80">Ayo Berbagi</span>
              </div>
              <h3 className="text-xl font-black text-white uppercase tracking-tighter leading-none">JUMAT BERBAGI</h3>
              <p className="text-[9px] text-white/60 font-medium max-w-[180px]">Yuk, sisihin dikit buat bagi-bagi kesegaran ke sesama.</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md p-2 rounded-xl border border-white/20">
              <ChevronRight size={20} className="text-white" />
            </div>
          </div>
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-white/10 transition-colors" />
        </motion.div>

      </div>
    </motion.div>
  );
}
