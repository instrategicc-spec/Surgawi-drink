import React from 'react';
import { BottomNav } from '../components/BottomNav';
import { MobileHeader } from '../components/MobileHeader';
import { AnimatePresence } from 'motion/react';

interface MobileLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  isDark: boolean;
  toggleTheme: () => void;
  onOpenSearch: () => void;
}

export function MobileLayout({ 
  children, 
  activeTab, 
  setActiveTab, 
  cartCount, 
  isDark, 
  toggleTheme, 
  onOpenSearch 
}: MobileLayoutProps) {
  return (
    <div className="md:hidden flex flex-col min-h-screen bg-aesthetic-light transition-colors duration-300">
      <MobileHeader 
        isDark={isDark} 
        toggleTheme={toggleTheme} 
        onOpenSearch={onOpenSearch} 
        activeTab={activeTab}
        cartCount={cartCount}
        setActiveTab={setActiveTab}
      />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
      </main>
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} cartCount={cartCount} />
    </div>
  );
}
