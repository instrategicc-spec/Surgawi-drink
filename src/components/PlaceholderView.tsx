import { motion } from 'motion/react';

interface PlaceholderViewProps {
  title: string;
  description?: string;
  key?: string;
}

export function PlaceholderView({ title, description }: PlaceholderViewProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -10 }} 
      className="flex flex-col items-center justify-center h-full text-gray-400 font-medium min-h-[60vh] text-center px-8"
    >
      <div className="w-16 h-16 bg-gray-100 dark:bg-surface-dark rounded-full flex items-center justify-center mb-4 glow-white">
        <span className="text-2xl">☕</span>
      </div>
      <h2 className="text-lg font-black text-gray-900 dark:text-white mb-2 tracking-tight">Halaman {title}</h2>
      <p className="text-sm leading-relaxed">
        {description || "Fitur ini sedang dalam pengembangan. Nantikan update selanjutnya!"}
      </p>
    </motion.div>
  );
}
