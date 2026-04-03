import { motion, AnimatePresence } from 'motion/react';
import { ShoppingBag, CheckCircle2, Trash2, FileText, Receipt, CupSoda, Check, Printer } from 'lucide-react';
import { useState, useEffect } from 'react';
import { generateInvoice } from '../services/pdfService';

interface Order {
  id: string;
  items: string[];
  totalItems?: number;
  estimatedMinutes?: number;
  total: string;
  timestamp: number;
  status: string;
  paymentMethod: string;
  customerName?: string;
  orderNote?: string;
}

interface OrdersViewProps {
  isDark: boolean;
  key?: string;
}

export function OrdersView({ isDark }: OrdersViewProps) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentTime, setCurrentTime] = useState(Date.now());

  useEffect(() => {
    const loadOrders = () => {
      const savedOrders = JSON.parse(localStorage.getItem('surgawi_orders') || '[]');
      
      // Auto-cleanup: Remove orders older than 30 days
      const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000;
      const now = Date.now();
      const validOrders = savedOrders.filter((order: Order) => (now - order.timestamp) < thirtyDaysInMs);
      
      if (validOrders.length !== savedOrders.length) {
        localStorage.setItem('surgawi_orders', JSON.stringify(validOrders));
      }
      
      setOrders(validOrders);
    };

    loadOrders();
  }, []);

  // Real-time progress and auto-completion
  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      setCurrentTime(now);
      
      setOrders(prevOrders => {
        let hasChanges = false;
        const updatedOrders = prevOrders.map(order => {
          if (order.status === 'Proses') {
            const estimatedMs = (order.estimatedMinutes || 5) * 60 * 1000;
            const elapsed = now - order.timestamp;
            if (elapsed >= estimatedMs) {
              hasChanges = true;
              return { ...order, status: 'Selesai' };
            }
          }
          return order;
        });
        
        if (hasChanges) {
          localStorage.setItem('surgawi_orders', JSON.stringify(updatedOrders));
          return updatedOrders;
        }
        return prevOrders;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const clearHistory = () => {
    if (window.confirm('Hapus semua riwayat jajan kamu?')) {
      localStorage.removeItem('surgawi_orders');
      setOrders([]);
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('id-ID', { 
      timeZone: 'Asia/Jakarta',
      day: 'numeric', 
      month: 'long', 
      year: 'numeric',
    });
  };

  const getProgress = (order: Order) => {
    const estimatedMs = (order.estimatedMinutes || 5) * 60 * 1000;
    const elapsed = currentTime - order.timestamp;
    return Math.min(100, Math.max(0, (elapsed / estimatedMs) * 100));
  };

  const getRemainingTime = (order: Order) => {
    const estimatedMs = (order.estimatedMinutes || 5) * 60 * 1000;
    const elapsed = currentTime - order.timestamp;
    const remainingMs = Math.max(0, estimatedMs - elapsed);
    const minutes = Math.ceil(remainingMs / 60000); // Use ceil so it doesn't show 0 until actually done
    return { minutes };
  };

  const handlePrintInvoice = (order: Order) => {
    generateInvoice(order);
  };

  const activeOrders = orders.filter(o => o.status === 'Proses');
  const pastOrders = orders.filter(o => o.status !== 'Proses');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 100, damping: 20 } }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      // Premium warm off-white for light mode, deep rich black for dark mode
      className="min-h-screen bg-aesthetic-light pb-32 pt-10 px-5 md:px-8 transition-colors duration-300 font-sans"
    >
      <div className="max-w-3xl mx-auto">
        {/* Minimalist Premium Header */}
        <header className="mb-14 flex justify-between items-end">
          <div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-[#2C2A25] dark:text-white mb-2">
              Riwayat <span className="text-primary-orange">Jajan.</span>
            </h1>
            <p className="text-sm font-medium text-[#5C5A55] dark:text-gray-400">
              Pantau pesanan dan histori jajan kamu hari ini.
            </p>
          </div>
          {orders.length > 0 && (
            <button 
              onClick={clearHistory}
              className="group flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-[#141414] border border-[#EAE8E0] dark:border-white/5 text-[#8C8980] dark:text-gray-500 hover:text-red-500 transition-all shadow-sm"
            >
              <Trash2 size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest hidden sm:block">Bersihkan</span>
            </button>
          )}
        </header>

        {/* Active Orders - Premium F&B Style */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-primary-orange animate-pulse" />
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#8C8980] dark:text-gray-500">Lagi Dibikin Nih</h2>
          </div>
          
          <AnimatePresence mode="popLayout">
            {activeOrders.length > 0 ? (
              <div className="grid gap-6">
                {activeOrders.map((order) => {
                  const progress = getProgress(order);
                  const { minutes } = getRemainingTime(order);
                  
                  let currentStage = "Diterima";
                  if (progress > 15 && progress <= 75) currentStage = "Diracik";
                  if (progress > 75) currentStage = "Siap";

                  const completionTime = new Date(order.timestamp + (order.estimatedMinutes || 5) * 60 * 1000);
                  const completionTimeStr = completionTime.toLocaleTimeString('id-ID', {
                    timeZone: 'Asia/Jakarta',
                    hour: '2-digit',
                    minute: '2-digit'
                  });

                  return (
                    <motion.div
                      key={order.id}
                      layout
                      variants={itemVariants}
                      className="bg-gradient-to-br from-white via-[#FFF9F2] to-[#FAF8F5] dark:from-[#1E1511] dark:via-[#140E0B] dark:to-[#0A0A0A] rounded-3xl p-6 md:p-8 border border-orange-100 dark:border-orange-900/30 shadow-[0_8px_30px_rgb(255,107,0,0.06)] dark:shadow-[0_8px_30px_rgb(255,107,0,0.02)] relative overflow-hidden"
                    >
                      {/* Decorative Background Glow */}
                      <div className="absolute -top-24 -right-24 w-48 h-48 bg-orange-500/10 dark:bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
                      
                      {/* Top Section: Order ID & Time */}
                      <div className="flex justify-between items-start mb-6 relative z-10">
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#8C8980] dark:text-gray-500 mb-1">Order ID</p>
                          <p className="text-lg font-bold text-[#2C2A25] dark:text-white font-mono">{order.id}</p>
                        </div>
                        <div className="text-right flex flex-col items-end">
                          <p className="text-[11px] font-semibold uppercase tracking-widest text-[#8C8980] dark:text-gray-500 mb-1">Estimasi Selesai</p>
                          <div className="flex items-baseline justify-end gap-1 mb-2">
                            <p className="text-2xl font-light text-[#2C2A25] dark:text-white tracking-tight">{completionTimeStr}</p>
                            <span className="text-xs font-medium text-primary-orange">({minutes} mnt)</span>
                          </div>
                          <button 
                            onClick={() => handlePrintInvoice(order)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 dark:bg-black/40 border border-orange-200 dark:border-orange-900/50 text-primary-orange hover:bg-primary-orange hover:text-white transition-colors shadow-sm backdrop-blur-sm"
                          >
                            <Printer size={12} />
                            <span className="text-[9px] font-bold uppercase tracking-widest">Cetak Nota</span>
                          </button>
                        </div>
                      </div>

                      {/* Divider */}
                      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-orange-200 dark:via-orange-900/30 to-transparent mb-6 relative z-10" />

                      {/* Customer & Items */}
                      <div className="mb-8">
                        <h3 className="text-xl font-medium text-[#2C2A25] dark:text-white mb-4 capitalize">
                          {order.customerName || 'Pelanggan Setia'}
                        </h3>
                        <ul className="space-y-3">
                          {order.items.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm text-[#5C5A55] dark:text-gray-400">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#D4D2CB] dark:bg-gray-700 mt-2 shrink-0" />
                              <span className="leading-relaxed">{item}</span>
                            </li>
                          ))}
                        </ul>
                        {order.orderNote && (
                          <div className="mt-4 p-3 bg-[#FAF8F5] dark:bg-white/5 rounded-xl border border-[#F0EFEA] dark:border-white/5 flex gap-2 items-start">
                            <FileText size={14} className="text-[#8C8980] dark:text-gray-500 mt-0.5 shrink-0" />
                            <p className="text-xs text-[#5C5A55] dark:text-gray-400 italic">"{order.orderNote}"</p>
                          </div>
                        )}
                      </div>

                      {/* Progress Stepper */}
                      <div className="bg-white/60 dark:bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-white/40 dark:border-white/5 relative z-10">
                        <div className="flex justify-between items-center relative px-2">
                          {/* Background Line */}
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-orange-100 dark:bg-orange-950/30 rounded-full" />
                          {/* Active Line */}
                          <motion.div 
                            className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary-orange rounded-full"
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ ease: "linear", duration: 1 }}
                          />
                          
                          {/* Steps */}
                          <div className="relative z-10 flex flex-col items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-500 ${progress >= 0 ? 'bg-primary-orange text-white shadow-lg shadow-primary-orange/20' : 'bg-[#EAE8E0] dark:bg-gray-800 text-[#8C8980] dark:text-gray-500'}`}>
                              <Receipt size={16} />
                            </div>
                            <span className={`text-[10px] font-bold uppercase tracking-wider ${progress >= 0 ? 'text-primary-orange' : 'text-[#8C8980] dark:text-gray-500'}`}>Diterima</span>
                          </div>
                          
                          <div className="relative z-10 flex flex-col items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-500 ${progress >= 15 ? 'bg-primary-orange text-white shadow-lg shadow-primary-orange/20' : 'bg-[#EAE8E0] dark:bg-[#1A1A1A] text-[#8C8980] dark:text-gray-600 border border-[#D4D2CB] dark:border-gray-800'}`}>
                              <CupSoda size={16} />
                            </div>
                            <span className={`text-[10px] font-bold uppercase tracking-wider ${progress >= 15 ? 'text-primary-orange' : 'text-[#8C8980] dark:text-gray-500'}`}>Diracik</span>
                          </div>

                          <div className="relative z-10 flex flex-col items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-500 ${progress >= 75 ? 'bg-primary-orange text-white shadow-lg shadow-primary-orange/20' : 'bg-[#EAE8E0] dark:bg-[#1A1A1A] text-[#8C8980] dark:text-gray-600 border border-[#D4D2CB] dark:border-gray-800'}`}>
                              <Check size={16} strokeWidth={3} />
                            </div>
                            <span className={`text-[10px] font-bold uppercase tracking-wider ${progress >= 75 ? 'text-primary-orange' : 'text-[#8C8980] dark:text-gray-500'}`}>Siap</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white dark:bg-[#141414] rounded-3xl p-10 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none border border-[#EAE8E0] dark:border-white/5"
              >
                <div className="w-16 h-16 bg-[#FAF8F5] dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-5">
                  <ShoppingBag className="text-[#D4D2CB] dark:text-gray-600" size={28} />
                </div>
                <h3 className="text-lg font-medium text-[#2C2A25] dark:text-white mb-2">Belum Ada Jajan Hari Ini</h3>
                <p className="text-sm text-[#5C5A55] dark:text-gray-400">Yuk pesen minuman seger buat nemenin aktivitas kamu!</p>
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Past Orders - Clean Minimalist List */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-2 rounded-full bg-[#D4D2CB] dark:bg-gray-700" />
            <h2 className="text-xs font-bold uppercase tracking-widest text-[#8C8980] dark:text-gray-500">Udah Selesai</h2>
          </div>
          
          <div className="flex flex-col">
            {pastOrders.length > 0 ? (
              pastOrders.map((order) => (
                <motion.div
                  key={order.id}
                  variants={itemVariants}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between py-5 border-b border-[#EAE8E0] dark:border-white/5 last:border-0 gap-4 hover:bg-white/50 dark:hover:bg-white/[0.02] px-3 -mx-3 rounded-2xl transition-colors cursor-default"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20 border border-emerald-100 dark:border-emerald-800/30 flex items-center justify-center text-emerald-500 shadow-sm shrink-0">
                      <CheckCircle2 size={20} />
                    </div>
                    <div className="pt-0.5">
                      <h4 className="text-sm font-medium text-[#2C2A25] dark:text-white mb-1 leading-snug">{order.items.join(', ')}</h4>
                      <div className="flex items-center gap-2 text-xs text-[#8C8980] dark:text-gray-500 font-medium">
                        <span>{formatDate(order.timestamp)}</span>
                        <span>•</span>
                        <span className="font-mono uppercase">{order.id}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-left sm:text-right pl-16 sm:pl-0 flex flex-col sm:items-end gap-2">
                    <div>
                      <p className="text-sm font-bold text-[#2C2A25] dark:text-white">{order.total}</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 mt-1">{order.status}</p>
                    </div>
                    <button 
                      onClick={() => handlePrintInvoice(order)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FAF8F5] dark:bg-[#141414] border border-[#EAE8E0] dark:border-white/5 text-[#8C8980] dark:text-gray-400 hover:text-primary-orange hover:border-orange-200 dark:hover:border-orange-900/50 transition-colors shadow-sm w-fit"
                    >
                      <Printer size={12} />
                      <span className="text-[9px] font-bold uppercase tracking-widest">Nota</span>
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-12 text-[#8C8980] dark:text-gray-500 text-sm font-medium">
                Belum ada riwayat pesanan yang selesai.
              </div>
            )}
          </div>
        </section>
      </div>
    </motion.div>
  );
}

