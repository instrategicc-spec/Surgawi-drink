import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Gift, Share2, ChevronRight, Info, Star, CheckCircle2, Users, MapPin, MessageSquare, ArrowRight, ShoppingBag, ChevronDown } from 'lucide-react';
import { products } from '../data/products';
import { ThemeToggle } from './ThemeToggle';

interface SedekahViewProps {
  isDark: boolean;
  toggleTheme: () => void;
  addToCart: (product: any) => void;
  setActiveTab: (tab: string) => void;
  key?: string;
}

export function SedekahView({ isDark, toggleTheme, addToCart, setActiveTab }: SedekahViewProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showToast, setShowToast] = useState(false);
  const sedekahProducts = products.filter(p => p.category === 'Paket Sedekah');

  const handleShare = async () => {
    const shareData = {
      title: 'Ikutan Sedekah Jumat Berkah di Lapak Surgawi',
      text: 'Halo! Aku baru aja ikutan patungan sedekah minuman segar buat Jumat Berkah di Lapak Surgawi. Mulai 50rb udah bisa senengin orang jalanan. Yuk ikutan bareng aku, biar makin banyak yang ngerasain seger dan berkahnya!',
      url: window.location.origin,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      try {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 3000);
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="bg-aesthetic-light min-h-screen pb-32 pt-4 transition-colors duration-300"
    >
      <div className="px-4 space-y-10 md:max-w-4xl md:mx-auto mt-6">
        {/* Hero Section - Editorial Style */}
        <motion.div 
          variants={itemVariants}
          className="relative h-[400px] rounded-[2.5rem] overflow-hidden shadow-2xl group"
        >
          <img 
            src="https://i.ibb.co.com/N2VpVRLw/1000199637.jpg" 
            alt="Sedekah" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-8 flex flex-col justify-end">
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-2 mb-4"
            >
              <div className="bg-[#a2cf6d] dark:bg-emerald-600 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg glow-green">JUMAT BERKAH</div>
            </motion.div>
            <h2 className="text-5xl font-black text-white leading-[0.85] uppercase tracking-tighter mb-4">
              BERBAGI<br/>
              <span className="text-[#a2cf6d] dark:text-emerald-400">KESEGARAN</span><br/>
              BIKIN BERKAH
            </h2>
            <p className="text-xs text-white/70 font-medium max-w-[280px] leading-relaxed mb-6">
              Tiap cup yang kamu sedekahkan bakal kami salurkan ke masjid, panti asuhan, atau pejuang jalanan di sekitaran Jakarta.
            </p>
          </div>
        </motion.div>

        {/* Impact Stats - Minimalist Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-3 gap-4">
          {[
            { label: 'Total Cup', value: '85+', icon: <Star size={14} className="text-yellow-500" /> },
            { label: 'Penerima', value: '3+', icon: <Users size={14} className="text-primary-orange" /> },
            { label: 'Orang Baik', value: '12+', icon: <Heart size={14} className="text-pink-500" /> },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white dark:bg-surface-dark p-5 rounded-3xl shadow-md border border-gray-100 dark:border-border-dark flex flex-col items-center text-center transition-transform hover:scale-105">
              <div className="mb-2 w-10 h-10 rounded-2xl bg-gray-50 dark:bg-gray-800 flex items-center justify-center">{stat.icon}</div>
              <span className="text-lg font-black text-gray-900 dark:text-white tracking-tighter leading-none mb-1">{stat.value}</span>
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</span>
            </div>
          ))}
        </motion.div>

        {/* Donation Packages Section */}
        <div className="space-y-6">
          <div className="flex items-end justify-between px-2">
            <div>
              <h3 className="text-xs font-black text-[#a2cf6d] dark:text-emerald-400 uppercase tracking-[0.2em] mb-1">PILIHAN PAKET</h3>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-none">SEDEKAH TERBAIK</h2>
            </div>
            <button className="text-[10px] font-black text-primary-orange dark:text-orange-400 flex items-center gap-1 uppercase tracking-widest hover:gap-2 transition-all">
              LIHAT SEMUA <ArrowRight size={12} />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {sedekahProducts.map((product) => (
              <motion.div
                key={product.id}
                variants={itemVariants}
                whileHover={{ y: -4 }}
                className="bg-white dark:bg-surface-dark p-5 rounded-[2rem] shadow-xl border border-gray-50 dark:border-border-dark flex items-center gap-6 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#a2cf6d]/5 dark:bg-emerald-500/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150" />
                
                <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 shadow-lg relative z-10">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1 relative z-10">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#a2cf6d] dark:bg-emerald-500 animate-pulse" />
                    <span className="text-[8px] font-black text-[#a2cf6d] dark:text-emerald-400 uppercase tracking-widest">PALING LAKU</span>
                  </div>
                  <h4 className="font-black text-gray-900 dark:text-white text-lg tracking-tight leading-none mb-1">{product.name}</h4>
                  <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium mb-3 line-clamp-2 leading-relaxed">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[8px] font-bold text-gray-400 uppercase tracking-widest">Mulai Dari</span>
                      <span className="text-xl font-black text-[#a2cf6d] dark:text-emerald-400 tracking-tighter leading-none">{product.price}</span>
                    </div>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        addToCart(product);
                        setActiveTab('checkout');
                      }}
                      className="bg-[#a2cf6d] hover:bg-emerald-600 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-2xl shadow-lg glow-green transition-all"
                    >
                      IKUTAN
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* How it Works - Step by Step */}
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="text-center">
            <h3 className="text-xs font-black text-primary-orange uppercase tracking-[0.2em] mb-1">ALUR PROGRAM</h3>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-none">CARA IKUTAN</h2>
          </div>
          
          <div className="grid grid-cols-1 gap-4">
            {[
              { step: '01', title: 'Pilih Paket', desc: 'Pilih paket sedekah yang kamu mau.', icon: <ShoppingBag size={20} /> },
              { step: '02', title: 'Bayar', desc: 'Selesaikan pembayaran pakai metode yang tersedia.', icon: <CheckCircle2 size={20} /> },
              { step: '03', title: 'Kami Antarkan', desc: 'Tim Surgawi bakal salurkan sedekah kamu ke target penerima.', icon: <MapPin size={20} /> },
              { step: '04', title: 'Laporan', desc: 'Dapat laporan dokumentasi via WhatsApp.', icon: <MessageSquare size={20} /> },
            ].map((item, idx) => (
              <div key={idx} className="flex items-start gap-4 bg-gray-50 dark:bg-gray-800/50 p-5 rounded-3xl border border-transparent hover:border-[#a2cf6d]/20 dark:hover:border-emerald-500/20 transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-white dark:bg-surface-dark shadow-sm flex items-center justify-center text-[#a2cf6d] dark:text-emerald-400 shrink-0 group-hover:bg-[#a2cf6d] dark:group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-black text-[#a2cf6d] dark:text-emerald-400 tracking-widest">{item.step}</span>
                    <h4 className="font-black text-gray-900 dark:text-white text-sm uppercase tracking-tight">{item.title}</h4>
                  </div>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 font-medium leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Distribution Gallery */}
        <motion.div variants={itemVariants} className="space-y-6">
          <div className="flex items-end justify-between px-2">
            <div>
              <h3 className="text-xs font-black text-[#a2cf6d] uppercase tracking-[0.2em] mb-1">DOKUMENTASI</h3>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-none">GALERI PENYALURAN</h2>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {[
              "https://i.ibb.co.com/Q7JVwdy0/1775187655982.jpg",
              "https://i.ibb.co.com/jPMZqMf8/1775187677200.jpg",
              "https://i.ibb.co.com/QFN7YGNp/1775187665494.jpg",
              "https://i.ibb.co.com/xZxVyHL/1775187990224.jpg"
            ].map((img, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="aspect-square rounded-3xl overflow-hidden shadow-md"
              >
                <img src={img} alt="Distribution" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Transparency Section - Enhanced */}
        <motion.div 
          variants={itemVariants}
          className="bg-primary-orange/5 dark:bg-orange-900/10 rounded-[2.5rem] p-8 border border-primary-orange/20 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Info size={120} className="text-primary-orange" />
          </div>
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-primary-orange flex items-center justify-center mb-4 shadow-xl glow-orange">
              <Info size={32} className="text-white" />
            </div>
            <h4 className="font-black text-gray-900 dark:text-white text-xl uppercase tracking-tight mb-3">Transparan Bosku</h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed font-medium max-w-xs">
              Laporan penyaluran bakal dikirim via WhatsApp setiap hari Sabtu. Kamu juga bisa cek dokumentasinya di IG kami @surgawidrink.
            </p>
            <div className="mt-6 flex gap-3">
              <button className="bg-white dark:bg-surface-dark text-gray-900 dark:text-white text-[9px] font-black uppercase tracking-widest px-6 py-3 rounded-2xl shadow-sm border border-gray-100 dark:border-border-dark">
                CEK LAPORAN
              </button>
              <a 
                href="https://www.instagram.com/surgawidrink?igsh=MXNkNm9hZXQwaGh6Yg==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#a2cf6d] text-white text-[9px] font-black uppercase tracking-widest px-6 py-3 rounded-2xl shadow-lg glow-green flex items-center justify-center"
              >
                INSTAGRAM
              </a>
            </div>
          </div>
        </motion.div>

        {/* Share Action - Enhanced */}
        <div className="relative">
          <motion.button
            variants={itemVariants}
            whileTap={{ scale: 0.98 }}
            onClick={handleShare}
            className="w-full bg-white dark:bg-surface-dark border-2 border-dashed border-gray-200 dark:border-border-dark rounded-[2rem] p-8 flex flex-col items-center justify-center gap-4 group transition-all hover:border-[#a2cf6d] dark:hover:border-emerald-500 hover:bg-[#a2cf6d]/5 dark:hover:bg-emerald-500/5 relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#a2cf6d]/0 to-[#a2cf6d]/10 dark:from-emerald-500/0 dark:to-emerald-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="w-14 h-14 rounded-full bg-gray-50 dark:bg-gray-800 flex items-center justify-center group-hover:bg-[#a2cf6d] dark:group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm group-hover:shadow-md group-hover:shadow-[#a2cf6d]/30 relative z-10">
              <Share2 size={24} className="text-gray-400 group-hover:text-white transition-colors" />
            </div>
            <div className="text-center relative z-10">
              <span className="block text-sm font-black text-gray-900 dark:text-white uppercase tracking-widest mb-1">Ajak Teman Berbagi</span>
              <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium tracking-wide">Sebarkan info kebaikan ini ke circle kamu.</span>
            </div>
          </motion.button>

          {/* Toast Notification for Copy */}
          <AnimatePresence>
            {showToast && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-2 rounded-full text-[10px] font-bold tracking-widest shadow-xl flex items-center gap-2 z-50 whitespace-nowrap"
              >
                <CheckCircle2 size={14} className="text-[#a2cf6d]" />
                LINK BERHASIL DISALIN!
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* FAQ Section - Interactive */}
        <motion.div variants={itemVariants} className="space-y-4">
          <h3 className="text-xs font-black text-gray-900 dark:text-white uppercase tracking-widest text-center">Yang Sering Ditanyain</h3>
          <div className="space-y-2">
            {[
              {
                q: "Kapan sedekahku disalurkan?",
                a: "Penyaluran sedekah rutin kami lakukan setiap hari Jumat (Jumat Berkah). Kalau kamu pesan sebelum hari Kamis sore, insyaAllah langsung disalurkan di Jumat minggu itu juga."
              },
              {
                q: "Bisa request tempat penyaluran ga?",
                a: "Bisa banget kak! Kamu bisa tambahkan catatan pas checkout kalau ada panti asuhan atau masjid spesifik yang ingin dituju (khusus area yang terjangkau sama tim kami)."
              },
              {
                q: "Gimana cara lihat bukti penyaluran?",
                a: "Tenang aja, kami transparan 100%. Tim kami bakal kirim dokumentasi foto/video penyaluran langsung ke nomor WhatsApp kamu. Kami juga update di story Instagram @surgawidrink."
              },
              {
                q: "Minimal sedekah berapa cup?",
                a: "Mulai dari 10 cup aja kamu udah bisa ikutan program sedekah ini. Makin banyak makin berkah!"
              }
            ].map((faq, i) => (
              <div 
                key={i} 
                className="bg-white dark:bg-surface-dark rounded-2xl shadow-sm border border-gray-50 dark:border-border-dark overflow-hidden transition-all"
              >
                <button 
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full p-4 flex items-center justify-between text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <span className="text-[11px] font-bold text-gray-700 dark:text-gray-300">{faq.q}</span>
                  <motion.div
                    animate={{ rotate: openFaq === i ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={14} className="text-gray-400" />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 pt-0 text-[11px] text-gray-500 dark:text-gray-400 font-medium leading-relaxed border-t border-gray-50 dark:border-gray-800">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
