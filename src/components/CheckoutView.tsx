import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, Trash2, Plus, Minus, MessageSquare, QrCode, Heart, CheckCircle2, ChevronRight, MapPin, CreditCard, ReceiptText, User, FileText, Star, Sparkles, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { products } from '../data/products';

interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
  image: string;
}

interface CheckoutViewProps {
  cart: CartItem[];
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  addToCart: (product: any) => void;
  setActiveTab: (tab: string) => void;
  isDark: boolean;
  clearCart: () => void;
  key?: string;
}

export function CheckoutView({ cart, removeFromCart, updateQuantity, addToCart, setActiveTab, isDark, clearCart }: CheckoutViewProps) {
  const [showQRIS, setShowQRIS] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'wa' | 'gofood' | 'grabfood' | 'shopeefood'>('wa');
  const [address, setAddress] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [orderNote, setOrderNote] = useState('');

  const calculateTotal = () => {
    const total = cart.reduce((sum, item) => {
      const price = parseInt(item.price.replace(/[^0-9]/g, ''));
      return sum + (price * item.quantity);
    }, 0);
    return total;
  };

  const formatPrice = (price: number) => `Rp${price.toLocaleString('id-ID')}`;

  const saveOrderToHistory = () => {
    // Calculate estimated time:
    // Regular items: roughly 1-2 minutes per item.
    // Paket Sedekah: Since it's a package (usually 10-20 pcs), we assign a fixed longer time per package (e.g. 15 mins).
    let estimatedMinutes = 0;
    let totalItems = 0;

    cart.forEach(item => {
      totalItems += item.quantity;
      const lowerName = item.name.toLowerCase();
      if (lowerName.includes('paket') || lowerName.includes('sedekah')) {
        estimatedMinutes += item.quantity * 20; // 20 mins per package (since it contains 10-20 pcs)
      } else {
        estimatedMinutes += item.quantity * (1 + Math.random() * 1); // 1-2 mins per regular item
      }
    });

    // Minimum 5 minutes, round to nearest integer
    estimatedMinutes = Math.max(5, Math.floor(estimatedMinutes));

    const order = {
      id: `ORD-${Math.floor(Math.random() * 9000) + 1000}`,
      items: cart.map(item => `${item.name} x${item.quantity}`),
      totalItems,
      estimatedMinutes,
      total: formatPrice(calculateTotal()),
      timestamp: Date.now(),
      status: 'Proses',
      paymentMethod: paymentMethod === 'wa' ? 'WhatsApp (QRIS/Cash)' : paymentMethod.toUpperCase(),
      customerName,
      orderNote
    };

    const existingOrders = JSON.parse(localStorage.getItem('surgawi_orders') || '[]');
    const updatedOrders = [order, ...existingOrders];
    localStorage.setItem('surgawi_orders', JSON.stringify(updatedOrders));
  };

  const handleWhatsAppOrder = () => {
    const orderDetails = cart.map(item => `${item.name} x${item.quantity} (${item.price})`).join('\n');
    const total = formatPrice(calculateTotal());
    const message = `Halo Surgawi Drink! Saya ingin memesan:\n\nNama: ${customerName || 'Pelanggan Setia'}\n\n${orderDetails}\n\nTotal: ${total}\n\nAlamat: ${address || 'Ambil di Tempat'}\nCatatan: ${orderNote || '-'}\n\nTolong diproses ya, makasih banyak!`;
    const encodedMessage = encodeURIComponent(message);
    
    saveOrderToHistory();
    window.open(`https://wa.me/6281383158680?text=${encodedMessage}`, '_blank');
    setShowQRIS(true);
    clearCart();
  };

  const onlineFoodPlatforms = [
    {
      id: 'gofood',
      name: 'GoFood',
      link: 'https://gofood.link/a/T4vS9Sm',
      logoLight: 'https://i.ibb.co.com/0RFn3YFR/1774806289675.png',
      logoDark: 'https://i.ibb.co.com/1tZcNRyz/1774801686119.png',
      color: 'bg-[#00AA13]'
    },
    {
      id: 'grabfood',
      name: 'GrabFood',
      link: 'https://food.grab.com/id/id/restaurant/surgawi-drink---joglo/6-C73ZGYBEG35DWA?exp_src=share&itemID=IDITE2026031604580009896&sourceID=20260401_114436_e8085611e17f46b9a180f9e84dd2d4ff_MEXIS_IDITE2026031604580009896',
      logoLight: 'https://i.ibb.co.com/Y4hjkKQ5/1774805215236.png',
      logoDark: 'https://i.ibb.co.com/gMXKfzNY/1774801633498.png',
      color: 'bg-[#00B14F]'
    },
    {
      id: 'shopeefood',
      name: 'ShopeeFood',
      link: 'https://shopee.co.id/universal-link/now-food/dish/22833263/3005540077023744?deep_and_deferred=1&shareChannel=whatsapp',
      logoLight: 'https://i.ibb.co.com/ZR5BcPWj/1774801323291.png',
      logoDark: 'https://i.ibb.co.com/S73XMKbp/1774801579594.png',
      color: 'bg-[#EE4D2D]'
    }
  ];

  if (cart.length === 0 && !showQRIS) {
    const recommendations = products.slice(0, 3); // Top 3 items

    return (
      <div className="min-h-screen bg-aesthetic-light pb-32 pt-12 px-6 transition-colors duration-300">
        <div className="max-w-md mx-auto space-y-12">
          {/* Empty State Hero */}
          <div className="flex flex-col items-center text-center">
            <motion.div 
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              className="w-28 h-28 bg-white dark:bg-surface-dark rounded-[2.5rem] flex items-center justify-center mb-8 shadow-2xl relative"
            >
              <div className="absolute inset-0 bg-[#a2cf6d]/20 rounded-[2.5rem] blur-2xl animate-pulse" />
              <ShoppingBag size={40} className="text-[#a2cf6d] relative z-10" />
            </motion.div>
            <h2 className="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-3 leading-none">
              KERANJANG<br/><span className="text-[#a2cf6d]">KOSONG MELONG</span>
            </h2>
            <p className="text-[11px] text-gray-500 dark:text-gray-400 max-w-[220px] font-medium leading-relaxed">
              Perut haus, hati gundah? Yuk, isi keranjangmu dengan kesegaran Surgawi!
            </p>
          </div>

          {/* Recommendations Section */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-primary-orange" />
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">REKOMENDASI BUAT LU</h3>
              </div>
              <button 
                onClick={() => setActiveTab('menu')}
                className="text-[10px] font-black text-[#a2cf6d] uppercase tracking-widest flex items-center gap-1 hover:underline"
              >
                LIHAT SEMUA <ArrowRight size={12} />
              </button>
            </div>

            <div className="grid gap-4">
              {recommendations.map((item) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-white dark:bg-surface-dark p-3 rounded-[1.5rem] shadow-xl border border-gray-100 dark:border-border-dark flex gap-4 group"
                >
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-50 dark:bg-gray-800 shrink-0 border border-gray-100 dark:border-gray-700">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <h4 className="font-black text-gray-900 dark:text-white text-xs tracking-tight mb-0.5">{item.name}</h4>
                      <div className="flex items-center gap-1">
                        <Star size={10} className="text-yellow-500" fill="currentColor" />
                        <span className="text-[9px] font-bold text-gray-400">{item.rating}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-[11px] font-black text-[#a2cf6d] uppercase tracking-widest">{item.price}</span>
                      <motion.button 
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          addToCart(item);
                        }}
                        className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg"
                      >
                        Sikat
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab('menu')}
            className="w-full bg-primary-orange text-white py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl shadow-primary-orange/30 glow-orange"
          >
            Mulai Belanja Sekarang
          </motion.button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-aesthetic-light pb-40 pt-6 px-4 transition-colors duration-300">
      <div className="max-w-2xl mx-auto">
        
        {/* Editorial Header */}
        {!showQRIS && (
          <header className="mb-10 flex justify-between items-end">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-[1px] bg-[#a2cf6d]" />
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#a2cf6d]">CHECKOUT</span>
              </div>
              <h1 className="text-5xl font-black text-gray-900 dark:text-white tracking-tighter uppercase leading-[0.85]">
                PESANAN<br/>
                <span className="text-[#a2cf6d]">SURGAWI</span>
              </h1>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={clearCart}
              className="group flex flex-col items-center gap-1 mb-1"
            >
              <div className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-900/20 flex items-center justify-center text-red-500 group-hover:bg-red-500 group-hover:text-white transition-all">
                <Trash2 size={18} />
              </div>
              <span className="text-[8px] font-black uppercase tracking-widest text-red-500/50 group-hover:text-red-500">Kosongkan</span>
            </motion.button>
          </header>
        )}

        {!showQRIS && (
          <div className="space-y-12">
            {/* 01. Order Summary */}
            <section className="relative">
              <div className="absolute -left-4 top-0 h-full w-[1px] bg-gray-100 dark:bg-gray-800" />
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl font-black text-gray-200 dark:text-gray-800 font-mono">01</span>
                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2">
                  <ReceiptText size={14} /> Ringkasan Pesanan
                </h2>
              </div>
              
              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {cart.map((item) => (
                    <motion.div 
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="bg-white dark:bg-surface-dark p-4 rounded-[2rem] shadow-xl border border-gray-100 dark:border-border-dark flex gap-4 group relative overflow-hidden"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#a2cf6d]/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-[#a2cf6d]/10 transition-colors" />
                      
                      <div className="w-20 h-20 rounded-2xl overflow-hidden bg-gray-50 dark:bg-gray-800 shrink-0 border border-gray-100 dark:border-gray-700 relative z-10">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-0.5 relative z-10">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-black text-gray-900 dark:text-white text-sm tracking-tight mb-0.5">{item.name}</h3>
                            <span className="text-[10px] font-black text-[#a2cf6d] uppercase tracking-widest">{item.price}</span>
                          </div>
                          <motion.button 
                            whileTap={{ scale: 0.9 }}
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                          >
                            <Trash2 size={16} />
                          </motion.button>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800/50 px-3 py-1.5 rounded-full border border-gray-100 dark:border-gray-700">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="text-gray-400 hover:text-[#a2cf6d] transition-colors"
                            >
                              <Minus size={12} strokeWidth={3} />
                            </button>
                            <span className="text-xs font-black text-gray-900 dark:text-white min-w-[12px] text-center font-mono">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="text-gray-400 hover:text-[#a2cf6d] transition-colors"
                            >
                              <Plus size={12} strokeWidth={3} />
                            </button>
                          </div>
                          <span className="text-xs font-black text-gray-900 dark:text-white font-mono">
                            {formatPrice(parseInt(item.price.replace(/[^0-9]/g, '')) * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </section>

            {/* 02. Customer Info */}
            <section className="relative">
              <div className="absolute -left-4 top-0 h-full w-[1px] bg-gray-100 dark:bg-gray-800" />
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl font-black text-gray-200 dark:text-gray-800 font-mono">02</span>
                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2">
                  <User size={14} /> Informasi Pemesan
                </h2>
              </div>
              
              <div className="space-y-4">
                <div className="relative group">
                  <div className="absolute top-1/2 -translate-y-1/2 left-4 text-[#a2cf6d] opacity-50 group-focus-within:opacity-100 transition-opacity">
                    <User size={18} />
                  </div>
                  <input 
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Nama Kamu (Boleh Kosong)"
                    className="w-full bg-white dark:bg-surface-dark p-4 pl-12 rounded-2xl border border-gray-100 dark:border-border-dark text-xs font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-[#a2cf6d]/10 transition-all shadow-xl placeholder:text-gray-300 dark:placeholder:text-gray-600"
                  />
                </div>

                <div className="relative group">
                  <div className="absolute top-4 left-4 text-[#a2cf6d] opacity-50 group-focus-within:opacity-100 transition-opacity">
                    <FileText size={18} />
                  </div>
                  <textarea 
                    value={orderNote}
                    onChange={(e) => setOrderNote(e.target.value)}
                    placeholder="Catatan Pesanan (Contoh: Kurangi es batu ya!)"
                    className="w-full bg-white dark:bg-surface-dark p-4 pl-12 rounded-2xl border border-gray-100 dark:border-border-dark text-xs font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-[#a2cf6d]/10 transition-all min-h-[80px] shadow-xl placeholder:text-gray-300 dark:placeholder:text-gray-600"
                  />
                </div>
              </div>
            </section>

            {/* 03. Delivery Address */}
            <section className="relative">
              <div className="absolute -left-4 top-0 h-full w-[1px] bg-gray-100 dark:bg-gray-800" />
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl font-black text-gray-200 dark:text-gray-800 font-mono">03</span>
                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2">
                  <MapPin size={14} /> Alamat Pengiriman
                </h2>
              </div>
              
              <div className="relative group">
                <div className="absolute top-4 left-4 text-[#a2cf6d] opacity-50 group-focus-within:opacity-100 transition-opacity">
                  <MapPin size={18} />
                </div>
                <textarea 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Tulis alamat lengkap atau 'Ambil di Tempat' ya..."
                  className="w-full bg-white dark:bg-surface-dark p-4 pl-12 rounded-[2rem] border border-gray-100 dark:border-border-dark text-xs font-bold text-gray-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-[#a2cf6d]/10 transition-all min-h-[100px] shadow-xl placeholder:text-gray-300 dark:placeholder:text-gray-600"
                />
              </div>
            </section>

            {/* 04. Payment Method */}
            <section className="relative">
              <div className="absolute -left-4 top-0 h-full w-[1px] bg-gray-100 dark:bg-gray-800" />
              <div className="flex items-center gap-3 mb-6">
                <span className="text-2xl font-black text-gray-200 dark:text-gray-800 font-mono">04</span>
                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 flex items-center gap-2">
                  <CreditCard size={14} /> Metode Pembayaran
                </h2>
              </div>

              <div className="space-y-4">
                {/* WhatsApp Option */}
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setPaymentMethod('wa')}
                  className={`w-full p-6 rounded-[2.5rem] shadow-2xl flex items-center justify-between group relative overflow-hidden transition-all border-2 ${
                    paymentMethod === 'wa' 
                      ? 'bg-[#25D366] text-white border-white/20' 
                      : 'bg-white dark:bg-surface-dark text-gray-900 dark:text-white border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-4 relative z-10">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors ${paymentMethod === 'wa' ? 'bg-white/20' : 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-500'}`}>
                      <MessageSquare size={28} fill={paymentMethod === 'wa' ? 'currentColor' : 'none'} />
                    </div>
                    <div className="text-left">
                      <span className="block text-base font-black uppercase tracking-tight leading-none mb-1">WhatsApp Direct</span>
                      <span className="text-[10px] font-bold opacity-70 uppercase tracking-widest">QRIS / Cash / Transfer</span>
                    </div>
                  </div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${paymentMethod === 'wa' ? 'bg-white text-[#25D366] scale-100' : 'bg-gray-100 dark:bg-gray-800 scale-75 opacity-0'}`}>
                    <CheckCircle2 size={20} />
                  </div>
                </motion.button>

                <div className="flex items-center gap-4 py-2">
                  <div className="flex-1 h-[1px] bg-gray-100 dark:bg-gray-800" />
                  <span className="text-[9px] font-black text-gray-300 dark:text-gray-700 uppercase tracking-[0.5em]">ATAU PESAN LEWAT OJOL</span>
                  <div className="flex-1 h-[1px] bg-gray-100 dark:bg-gray-800" />
                </div>

                {/* Ojol Bento Grid */}
                <div className="grid grid-cols-3 gap-4">
                  {onlineFoodPlatforms.map((platform) => (
                    <motion.button
                      key={platform.id}
                      onClick={() => {
                        if (platform.link !== '#') {
                          setPaymentMethod(platform.id as any);
                          saveOrderToHistory();
                          window.open(platform.link, '_blank');
                          clearCart();
                          setActiveTab('orders');
                        }
                      }}
                      whileHover={{ y: -4 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-4 rounded-[2rem] shadow-xl border-2 flex flex-col items-center justify-center gap-3 relative overflow-hidden transition-all aspect-square ${
                        paymentMethod === platform.id 
                          ? 'border-primary-orange bg-primary-orange/5' 
                          : 'bg-white dark:bg-surface-dark border-transparent'
                      }`}
                    >
                      <div className="w-12 h-12 relative flex items-center justify-center">
                        <img 
                          src={isDark ? platform.logoDark : platform.logoLight} 
                          alt={platform.name} 
                          className={`w-full h-full object-contain transition-all duration-500 ${paymentMethod === platform.id ? 'scale-110' : 'opacity-60 grayscale group-hover:grayscale-0'}`}
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <span className={`text-[8px] font-black uppercase tracking-widest transition-colors ${paymentMethod === platform.id ? 'text-primary-orange' : 'text-gray-400'}`}>
                        {platform.name}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </div>
            </section>

            {/* Slim Aesthetic Floating Summary Bar */}
            <motion.div 
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, type: 'spring', damping: 20 }}
              className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[92%] max-w-md z-50"
            >
              <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-2 pl-6 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.2)] border border-white/20 dark:border-white/5 flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[8px] font-black text-gray-400 uppercase tracking-[0.2em]">Total</span>
                  <span className="text-lg font-black text-gray-900 dark:text-white tracking-tighter font-mono leading-none">
                    {formatPrice(calculateTotal())}
                  </span>
                </div>
                <motion.button
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleWhatsAppOrder}
                  className="bg-[#a2cf6d] text-white h-12 px-8 rounded-full font-black uppercase tracking-[0.1em] text-[10px] shadow-lg glow-green flex items-center gap-2"
                >
                  PESAN SEKARANG <ChevronRight size={14} strokeWidth={3} />
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}

        {/* QRIS Success State */}
        {showQRIS && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-surface-dark p-10 rounded-[3rem] shadow-2xl border border-gray-100 dark:border-border-dark text-center space-y-10 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-primary-orange via-primary-green to-primary-orange animate-gradient-x" />
            
            <div className="space-y-4">
              <div className="w-20 h-20 bg-emerald-50 dark:bg-emerald-900/20 rounded-[2rem] flex items-center justify-center mx-auto mb-6 relative">
                <div className="absolute inset-0 bg-emerald-500/20 blur-xl rounded-full animate-pulse" />
                <CheckCircle2 size={40} className="text-emerald-500 relative z-10" />
              </div>
              <h2 className="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tighter leading-none">PESANAN<br/><span className="text-primary-green">OTW!</span></h2>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium max-w-[260px] mx-auto leading-relaxed">
                Tinggal selangkah lagi. Scan QRIS di bawah ini, terus kirim bukti transfernya ke WhatsApp kita ya.
              </p>
            </div>

            <div className="relative group max-w-[300px] mx-auto">
              <div className="absolute -inset-6 bg-gradient-to-r from-primary-orange to-primary-green opacity-20 blur-3xl rounded-full group-hover:opacity-40 transition-opacity duration-700" />
              <div className="relative bg-white p-6 rounded-[3rem] shadow-2xl border-8 border-gray-50 dark:border-gray-800">
                <img 
                  src="https://i.ibb.co.com/pVYLRzt/IMG-20260329-WA0008.jpg" 
                  alt="QRIS Barcode" 
                  className="w-full rounded-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[8px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-xl border border-white/20">
                SCAN QRIS DI SINI
              </div>
            </div>

            <div className="pt-6 space-y-4">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setShowQRIS(false);
                  setActiveTab('orders');
                }}
                className="w-full bg-primary-orange text-white py-5 rounded-[2rem] font-black uppercase tracking-[0.2em] text-[10px] shadow-2xl glow-orange"
              >
                Lihat Pesanan Kamu
              </motion.button>
              
              <button 
                onClick={() => setShowQRIS(false)}
                className="text-[9px] font-black text-gray-400 uppercase tracking-[0.4em] hover:text-primary-orange transition-colors"
              >
                BALIK KE DEPAN
              </button>
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
}
