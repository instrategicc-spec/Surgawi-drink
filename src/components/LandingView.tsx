import { motion, useScroll, useTransform } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { Sparkles, MapPin, Clock, Star, Instagram, Twitter, Facebook, ChevronRight, Droplets, Zap, Heart, Home, Coffee, Info, Menu, ArrowUpRight, Mic, Send, Bookmark, MessageCircle, Music, Volume2, VolumeX } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { products } from '../data/products';

interface LandingViewProps {
  onStart: () => void;
  isDark: boolean;
  toggleTheme: () => void;
  key?: string;
}

export function LandingView({ onStart, isDark, toggleTheme }: LandingViewProps) {
  const containerRef = useRef(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (iframeRef.current) {
      const message = isMuted ? 'unMute' : 'mute';
      iframeRef.current.contentWindow?.postMessage(
        JSON.stringify({ event: 'command', func: message, args: [] }),
        '*'
      );
      setIsMuted(!isMuted);
    }
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  // Get top 4 regular products for floating showcase
  const regularProducts = products.filter(p => p.category !== 'Sedekah').slice(0, 4);
  const sedekahProducts = products.filter(p => p.category === 'Sedekah');
  const featuredProduct = products[0]; // Es Jeruk Peras

  const colors = [
    'from-orange-400 to-yellow-500',
    'from-emerald-400 to-teal-500',
    'from-amber-400 to-orange-500',
    'from-pink-400 to-rose-500'
  ];

  const floatingItems = regularProducts.map((product, index) => ({
    img: product.image,
    label: product.name,
    color: colors[index % colors.length],
    delay: index * 0.2
  }));

  return (
    <div ref={containerRef} className="relative w-full bg-aesthetic-light overflow-x-hidden font-sans selection:bg-primary-orange/30">
      {/* Hero Section - Immersive & Aesthetic */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-12 transition-colors duration-500 gpu-accelerate">
        {/* YouTube Background Video */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          {/* Theme-aware Overlay - Lightened to show video better */}
          <div className="absolute inset-0 bg-black/10 dark:bg-black/20 z-10 transition-colors duration-500" />
          
          {/* YouTube Embed - Attempting HD resolution */}
          <iframe
            ref={iframeRef}
            className="absolute top-1/2 left-1/2 w-[450%] h-[450%] md:w-[150%] md:h-[150%] -translate-x-1/2 -translate-y-1/2 aspect-video pointer-events-none gpu-accelerate"
            src="https://www.youtube.com/embed/8HDjaAV_12s?autoplay=1&mute=1&loop=1&playlist=8HDjaAV_12s&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&vq=hd1080&enablejsapi=1"
            title="Surgawi Hero Background"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        </div>

        {/* Volume Toggle Button */}
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={toggleMute}
          className="absolute bottom-8 right-8 z-30 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all shadow-lg"
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </motion.button>

        <div className="relative z-20 w-full px-6 md:px-16 lg:px-24 flex flex-col items-center text-center space-y-6 md:space-y-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/30 shadow-xl"
          >
            <Sparkles size={12} className="text-yellow-300 animate-pulse" fill="currentColor" />
            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-white">Semua Varian Cuma Rp 5.000</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="relative w-full"
          >
            {/* Floating 5RB Badge - Adjusted for mobile */}
            <motion.div 
              animate={{ rotate: [10, -10, 10], scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-10 -right-2 md:-top-16 md:-right-12 bg-primary-orange text-white w-20 h-20 md:w-32 md:h-32 rounded-full flex flex-col items-center justify-center shadow-2xl border-4 border-white/20 rotate-12 z-30"
            >
              <span className="text-2xl md:text-5xl font-black leading-none tracking-tighter">5<span className="text-lg md:text-2xl">RB</span></span>
              <span className="text-[8px] md:text-[11px] font-black uppercase tracking-widest mt-0.5">Aja Boss!</span>
            </motion.div>

            <div className="relative z-10">
              <h1 className="text-5xl md:text-9xl font-black text-white tracking-tighter leading-[0.9] uppercase drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)]">
                SEGERNYA <br />
                <span className="text-primary-orange drop-shadow-[0_10px_30px_rgba(242,125,38,0.5)]">SURGAWI</span>
              </h1>
              <p className="mt-6 md:mt-8 text-white text-[13px] md:text-xl max-w-lg md:max-w-5xl mx-auto font-bold leading-relaxed tracking-wide drop-shadow-lg px-2">
                Haus? Panas? Es Jeruk Peras asli & Kapucino Cincau andalan kami siap nyegerin hari kamu. 
                Gak pake mahal, dompet aman, cuma goceng kak!
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 pt-6"
          >
            <motion.button 
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              onClick={onStart}
              className="bg-primary-orange text-white px-12 py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-primary-orange/40 transition-all border border-white/20 glow-orange"
            >
              Sikat Bosku!
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white/10 backdrop-blur-md text-white px-12 py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] shadow-xl shadow-white/5 transition-all border border-white/20 hover:bg-white/20"
            >
              Liat Menu
            </motion.button>
          </motion.div>
        </div>

        {/* Aesthetic Scroll Indicator Replacement */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-20"
        >
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">Scroll Down</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-12 bg-gradient-to-b from-primary-orange to-transparent rounded-full"
          />
        </motion.div>
      </section>

      {/* Brutalist Marquee Ticker */}
      <div className="bg-primary-orange py-3 border-y border-black/10 overflow-hidden flex whitespace-nowrap relative z-30 shadow-xl">
        <motion.div 
          animate={{ x: [0, -1035] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 20 }}
          className="flex gap-8 items-center"
        >
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex items-center gap-8">
              <span className="text-white font-black text-xl md:text-2xl uppercase tracking-tighter">{regularProducts[0].name}</span>
              <Star size={16} className="text-yellow-300" fill="currentColor" />
              <span className="text-white font-black text-xl md:text-2xl uppercase tracking-tighter">CUMA {regularProducts[0].price.replace('Rp ', '').replace('.000', ' RIBU')}</span>
              <Star size={16} className="text-yellow-300" fill="currentColor" />
              <span className="text-white font-black text-xl md:text-2xl uppercase tracking-tighter">{regularProducts[1].name}</span>
              <Star size={16} className="text-yellow-300" fill="currentColor" />
              <span className="text-white font-black text-xl md:text-2xl uppercase tracking-tighter">JUMAT BERKAH</span>
              <Star size={16} className="text-yellow-300" fill="currentColor" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Organic Section Divider - Dark Mode Compatible */}
      <div className="relative h-40 -mt-20 z-20 pointer-events-none">
        <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-full fill-white dark:fill-bg-dark">
          <path d="M0,192L48,197.3C96,203,192,213,288,192C384,171,480,117,576,112C672,107,768,149,864,154.7C960,160,1056,128,1152,112C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>

      {/* Featured Menu - Clean & Minimal */}
      <section className="bg-transparent dark:bg-bg-dark py-24 px-6 text-center relative w-full transition-colors duration-500">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="w-full px-6 md:px-16 lg:px-24 space-y-16"
        >
            <div className="space-y-3">
              <h2 className="text-4xl md:text-7xl font-black text-gray-900 dark:text-white tracking-tighter uppercase">JAGOAN KITA</h2>
              <p className="text-primary-orange text-[10px] font-black uppercase tracking-[0.4em]">Paling Laris, Paling Seger</p>
              <div className="w-24 h-1.5 bg-gradient-to-r from-[#a2cf6d] to-primary-orange mx-auto rounded-full shadow-lg" />
            </div>

          <div className="grid md:grid-cols-2 gap-16 items-center text-left">
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="relative aspect-square rounded-[4rem] overflow-hidden shadow-4xl group bg-gray-50 dark:bg-surface-dark p-10 border border-gray-100 dark:border-white/5"
            >
              <img 
                src={featuredProduct.image} 
                alt={featuredProduct.name} 
                className="w-full h-full object-contain transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-8 right-8 w-20 h-20 bg-white dark:bg-bg-dark rounded-full flex flex-col items-center justify-center shadow-2xl border border-primary-orange/20">
                <span className="text-lg font-black text-primary-orange leading-none">{featuredProduct.price.replace('Rp ', '').replace('.000', 'rb')}</span>
                <span className="text-[7px] font-black uppercase text-gray-400">Cuma</span>
              </div>
            </motion.div>

            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-primary-orange bg-primary-orange/10 px-3 py-1.5 rounded-full">
                  <Star size={14} fill="currentColor" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">PALING LAKU</span>
                </div>
                <h3 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white uppercase leading-none tracking-tighter">{featuredProduct.name.split(' ').slice(0, 2).join(' ')} <br /> {featuredProduct.name.split(' ').slice(2).join(' ')}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-base font-medium leading-relaxed">
                  {featuredProduct.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-2">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-50 dark:bg-orange-900/20 rounded-xl flex items-center justify-center text-orange-500">
                    <Zap size={18} fill="currentColor" />
                  </div>
                  <div>
                    <span className="block text-base font-black text-gray-900 dark:text-white">Mantul</span>
                    <span className="text-[8px] font-black uppercase tracking-widest text-gray-400">Bikin Melek</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-pink-50 dark:bg-pink-900/20 rounded-xl flex items-center justify-center text-pink-500">
                    <Heart size={18} fill="currentColor" />
                  </div>
                  <div>
                    <span className="block text-base font-black text-gray-900 dark:text-white">Aman</span>
                    <span className="text-[8px] font-black uppercase tracking-widest text-gray-400">Di Dompet</span>
                  </div>
                </div>
              </div>

              <motion.button 
                whileHover={{ x: 10 }}
                onClick={onStart}
                className="group flex items-center gap-5 bg-gray-900 dark:bg-primary-orange text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] transition-all shadow-2xl shadow-black/20 dark:shadow-primary-orange/20"
              >
                GAS PESAN
                <div className="w-7 h-7 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
                  <ChevronRight size={16} />
                </div>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Immersive "Sedekah Jumat Berkah" Section - Dark Mode Aesthetic */}
      <section className="relative bg-[#0A0F0A] py-32 px-6 w-full overflow-hidden content-auto">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-primary-green/10 blur-[100px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[35rem] h-[35rem] bg-pink-500/10 blur-[90px] rounded-full" />
        </div>

        <div className="relative z-10 w-full px-6 md:px-16 lg:px-24 flex flex-col lg:flex-row items-center gap-20">
          <div className="flex-1 space-y-10 text-white">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full">
                <Heart size={14} className="text-pink-500" fill="currentColor" />
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/60">BAGI-BAGI SEGER</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] uppercase">
                PATUNGAN <br />
                <span className="text-[#a2cf6d]">SEDEKAH</span>
              </h2>
              <p className="text-white/60 text-sm md:text-lg font-medium leading-relaxed max-w-2xl">
                Yuk, sisihkan rezeki buat bagi-bagi minuman segar ke saudara kita yang butuh. 
                Pesan paketnya, kami yang antarkan langsung. Mulai dari 50 ribu aja kak!
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {sedekahProducts.map((product, idx) => {
                const cups = product.name.match(/\d+/)?.[0] || '10';
                const pkgName = product.name.split(' (')[0];
                const isPopular = idx === 1;
                return (
                  <div key={product.id} className="bg-white/5 border border-white/10 p-5 rounded-3xl backdrop-blur-sm relative overflow-hidden">
                    {isPopular && (
                      <div className="absolute top-0 right-0 bg-primary-orange text-white text-[7px] font-black px-2 py-1 rounded-bl-lg uppercase tracking-widest">Populer</div>
                    )}
                    <span className="block text-3xl font-black text-white mb-1">{cups}<span className="text-lg text-[#a2cf6d]">Cup</span></span>
                    <span className="block text-lg font-black text-primary-orange mb-2">{product.price}</span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-white/40">{pkgName}</span>
                  </div>
                );
              })}
            </div>

            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onStart}
              className="bg-[#a2cf6d] text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-[10px] shadow-xl shadow-emerald-500/20 flex items-center gap-3 w-fit"
            >
              Ikut Sedekah <Heart size={14} fill="currentColor" />
            </motion.button>
          </div>

          <div className="flex-1 relative w-full">
            <motion.div
              className="relative z-10 w-full aspect-square max-w-md mx-auto rounded-[4rem] overflow-hidden shadow-[0_40px_80px_rgba(0,0,0,0.5)] group border border-white/5"
            >
              <img 
                src="https://i.ibb.co.com/N2VpVRLw/1000199637.jpg" 
                alt="Sedekah Jumat Berkah" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Online Order Ticker - Aesthetic & Original Colors */}
      <div className="bg-transparent dark:bg-bg-dark py-12 border-y border-gray-100 dark:border-white/5 overflow-hidden relative w-full z-30 transition-colors duration-500">
        <motion.div 
          animate={{ x: [0, -2000] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 40 }}
          className="flex gap-24 items-center whitespace-nowrap"
        >
          {[...Array(12)].map((_, i) => (
            <div key={i} className="flex items-center gap-24 shrink-0">
              <span className="text-[11px] font-black uppercase tracking-[0.6em] text-primary-orange/60">PESEN ONLINE</span>
              
              <a href="https://gofood.link/a/T4vS9Sm" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-300 block shrink-0">
                <img src="https://i.ibb.co.com/HpfCBvVC/1774805961742.png" alt="GoFood" className="h-12 w-auto dark:hidden block" referrerPolicy="no-referrer" />
                <img src="https://i.ibb.co.com/1tZcNRyz/1774801686119.png" alt="GoFood" className="h-12 w-auto hidden dark:block" referrerPolicy="no-referrer" />
              </a>

              <a href="https://food.grab.com/id/id/restaurant/surgawi-drink---joglo/6-C73ZGYBEG35DWA?exp_src=share&itemID=IDITE2026031604580009896&sourceID=20260401_114436_e8085611e17f46b9a180f9e84dd2d4ff_MEXIS_IDITE2026031604580009896" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-300 block shrink-0">
                <img src="https://i.ibb.co.com/Y4hjkKQ5/1774805215236.png" alt="GrabFood" className="h-12 w-auto dark:hidden block" referrerPolicy="no-referrer" />
                <img src="https://i.ibb.co.com/gMXKfzNY/1774801633498.png" alt="GrabFood" className="h-12 w-auto hidden dark:block" referrerPolicy="no-referrer" />
              </a>

              <a href="https://shopee.co.id/universal-link/now-food/dish/22833263/3005540077023744?deep_and_deferred=1&shareChannel=whatsapp" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform duration-300 block shrink-0">
                <img src="https://i.ibb.co.com/ZR5BcPWj/1774801323291.png" alt="ShopeeFood" className="h-12 w-auto dark:hidden block" referrerPolicy="no-referrer" />
                <img src="https://i.ibb.co.com/S73XMKbp/1774801579594.png" alt="ShopeeFood" className="h-12 w-auto hidden dark:block" referrerPolicy="no-referrer" />
              </a>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Location Section */}
      <section className="py-24 px-6 md:px-16 lg:px-24 bg-transparent dark:bg-bg-dark w-full transition-colors duration-500">
        <div className="w-full flex flex-col lg:flex-row gap-12 items-center">
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-[#a2cf6d] bg-[#a2cf6d]/10 px-3 py-1.5 rounded-full">
                <MapPin size={14} fill="currentColor" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">MAMPIR SINI BOSKU</span>
              </div>
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">LOKASI <br/> KITA</h2>
            <p className="text-gray-500 dark:text-gray-400 text-base md:text-lg font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
              Mampir langsung ke lapak kami buat nikmatin kesegaran Surgawi Drink yang dibikin dadakan khusus buat kamu.
            </p>
            
            <div className="bg-gray-50 dark:bg-surface-dark p-6 rounded-3xl border border-gray-100 dark:border-white/5 inline-block text-left w-full max-w-md">
              <h4 className="font-black text-gray-900 dark:text-white mb-2">Surgawi Drink Joglo</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Joglo, Kec. Kembangan, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta
              </p>
              <a 
                href="https://maps.app.goo.gl/wqxB6tP8AsoE6xEu7" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary-orange font-bold text-sm hover:underline"
              >
                Buka di Google Maps <ChevronRight size={16} />
              </a>
            </div>
          </div>
          
          <div className="flex-1 w-full h-[400px] rounded-[2rem] overflow-hidden shadow-2xl border border-gray-100 dark:border-white/5">
            <iframe 
              src="https://maps.google.com/maps?q=Joglo,+Kec.+Kembangan,+Kota+Jakarta+Barat&t=&z=15&ie=UTF8&iwloc=&output=embed" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* Footer Section - Dark Mode Aesthetic */}
      <footer className="bg-[#0A0F0A] py-20 px-6 md:px-16 lg:px-24 border-t border-white/5 w-full content-auto">
        <div className="w-full space-y-16">
          <div className="flex flex-col md:flex-row justify-between items-start gap-12">
            <div className="space-y-6">
              <img 
                src={isDark ? "https://i.ibb.co.com/GfZrMpRk/1774857035375.png" : "https://i.ibb.co.com/j9yyyQyT/1774856961335.png"} 
                alt="Surgawi Logo" 
                className="h-24 w-auto object-contain"
                loading="lazy"
                decoding="async"
                referrerPolicy="no-referrer"
              />
              <p className="text-white/40 text-xs font-medium max-w-xs leading-relaxed">
                Kesegaran surgawi buat semua. Jeruk peras asli & kapucino cincau nikmat, harga merakyat.
              </p>
              <div className="flex gap-4">
                {[
                  { Icon: Instagram, url: "https://www.instagram.com/surgawidrink?igsh=MXNkNm9hZXQwaGh6Yg==" },
                  { Icon: MessageCircle, url: "https://wa.me/6281383158680" },
                  { Icon: Music, url: "https://tiktok.com/@surgawidrink" }
                ].map(({ Icon, url }, i) => (
                  <a 
                    key={i} 
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-white/40 hover:bg-primary-orange hover:text-white transition-all border border-white/5"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Lokasi & Jam Buka</span>
              <div className="space-y-4">
                <div className="flex items-start gap-3 text-white/40">
                  <MapPin size={16} className="mt-0.5 shrink-0 text-primary-orange" />
                  <span className="text-xs font-bold leading-relaxed">Joglo, Kec. Kembangan,<br/>Kota Jakarta Barat</span>
                </div>
                <div className="flex items-center gap-3 text-white/40">
                  <Clock size={16} className="text-primary-orange" />
                  <span className="text-xs font-bold">Setiap Hari: 09:00 - 23:00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Instant Digital Aesthetic CTA (Compact & Animated) */}
          <div className="relative py-12 md:py-20 px-4 sm:px-6 flex justify-center w-full">
            <div className="relative w-full rounded-[32px] md:rounded-[48px] overflow-hidden bg-gradient-to-br from-emerald-50/90 via-white/90 to-teal-50/90 dark:bg-[#030a07] dark:bg-none backdrop-blur-2xl dark:backdrop-blur-none border border-white/80 dark:border-white/[0.05] shadow-[0_20px_60px_-15px_rgba(16,185,129,0.2),inset_0_1px_0_rgba(255,255,255,1)] dark:shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_10px_40px_rgba(26,77,51,0.4)] p-8 md:p-14 lg:p-20 transition-all duration-500">
              
              {/* Animated Background Glows (Inside Card) */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.6, 0.3],
                  rotate: [0, 45, 0]
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-emerald-300/40 dark:bg-[#1a4d33] blur-[80px] md:blur-[120px] rounded-full pointer-events-none transition-colors duration-500" 
              />
              <motion.div 
                animate={{ 
                  scale: [1, 1.5, 1],
                  opacity: [0.2, 0.5, 0.2],
                  x: [0, 30, 0],
                  y: [0, -30, 0]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-0 right-0 translate-x-1/4 translate-y-1/4 w-[250px] md:w-[400px] h-[250px] md:h-[400px] bg-teal-300/30 dark:bg-[#236b46] blur-[60px] md:blur-[100px] rounded-full pointer-events-none transition-colors duration-500" 
              />

              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16 w-full text-center lg:text-left">
                
                {/* Left Side: Large Logo */}
                <div className="flex-1 flex justify-center lg:justify-end">
                  <motion.img 
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    src="https://4e6mknuclj.ucarecd.net/efe5e2fa-75da-4cb3-9a7f-40d52e3fa46c/1766952765013.png" 
                    alt="Instant Digital" 
                    className="h-20 md:h-32 lg:h-64 w-auto object-contain opacity-90 dark:opacity-100 brightness-0 dark:brightness-100 transition-all duration-500"
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Vertical Divider (Desktop Only) */}
                <div className="hidden lg:block w-px h-64 bg-gradient-to-b from-transparent via-emerald-900/20 dark:via-white/10 to-transparent self-center" />

                {/* Right Side: CTA Content */}
                <div className="flex-1 flex flex-col items-center lg:items-start max-w-xl">
                  {/* Main Text Container */}
                  <div className="flex flex-col items-center lg:items-start mb-8 md:mb-10">
                    <motion.h2 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                      className="text-2xl md:text-4xl lg:text-5xl font-black text-emerald-950 dark:text-white tracking-tight mb-4 transition-colors duration-500 leading-tight"
                    >
                      Bikin Bisnismu <br className="hidden lg:block" /> Naik Kelas.
                    </motion.h2>
                    <motion.p
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
                      className="text-sm md:text-base lg:text-lg text-emerald-800/80 dark:text-white/50 font-medium dark:font-light max-w-[280px] md:max-w-md leading-relaxed transition-colors duration-500"
                    >
                      Punya ide keren? Yuk kita wujudkan jadi website estetik dan branding yang ngena di hati pelanggan. Santai aja, konsultasi dulu gratis kok.
                    </motion.p>
                  </div>
                </div>
              </div>

              {/* Centered Large CTA Button */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                className="relative z-10 w-full flex justify-center mt-8 lg:mt-12"
              >
                <a 
                  href="https://wa.me/628990006063" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group relative flex items-center justify-between w-full max-w-2xl px-8 py-4 md:py-6 rounded-2xl md:rounded-3xl border border-white/20 dark:border-white/10 bg-white/10 dark:bg-white/5 backdrop-blur-3xl hover:bg-white/20 dark:hover:bg-white/10 transition-all duration-500 shadow-[0_20px_50px_-10px_rgba(16,185,129,0.3)] overflow-hidden"
                >
                  {/* Animated Inner Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="flex flex-col items-start relative z-10">
                    <span className="text-[10px] font-black tracking-[0.3em] text-emerald-800 dark:text-emerald-400 uppercase mb-1">Konsultasi Gratis</span>
                    <span className="text-lg md:text-2xl font-black text-emerald-950 dark:text-white tracking-tight group-hover:translate-x-1 transition-transform duration-500">Ngobrol Santai via WhatsApp</span>
                  </div>

                  <div className="relative z-10 w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-emerald-600 dark:bg-emerald-500 flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                    <ArrowUpRight className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                </a>
              </motion.div>

              {/* Footer branding */}
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-12 lg:mt-20 pt-6 w-full flex justify-center lg:justify-between items-center border-t border-emerald-900/10 dark:border-white/[0.05] transition-colors duration-500"
              >
                 <span className="text-emerald-900/50 dark:text-white/20 text-[9px] md:text-[10px] font-black tracking-[0.3em] uppercase transition-colors duration-500">INSTANT DIGITAL CREATIVE</span>
                 <span className="hidden lg:block text-emerald-900/30 dark:text-white/10 text-[8px] font-bold tracking-widest uppercase">Premium Web & Branding Studio</span>
              </motion.div>
            </div>
          </div>

        <div className="pt-8 pb-4 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-6 text-center md:text-left">
              <p className="text-[10px] font-medium text-white/40 uppercase tracking-[0.2em]">
                © {new Date().getFullYear()} Instant Digital
              </p>
              <div className="hidden md:block w-1 h-1 rounded-full bg-white/20" />
              <p className="text-[10px] font-medium text-white/30 uppercase tracking-[0.15em]">
                All Rights Reserved.
              </p>
            </div>
            
            <div className="flex flex-col-reverse md:flex-row items-center gap-6 md:gap-8">
              <div className="flex gap-6">
                <span className="text-[10px] font-medium text-white/30 uppercase tracking-[0.15em] cursor-pointer hover:text-white transition-colors">Privacy</span>
                <span className="text-[10px] font-medium text-white/30 uppercase tracking-[0.15em] cursor-pointer hover:text-white transition-colors">Terms</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                </span>
                <span className="text-[9px] font-medium text-white/60 uppercase tracking-widest">Available for work</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
