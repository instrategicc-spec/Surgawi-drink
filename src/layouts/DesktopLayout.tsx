import React from 'react';
import { TopNav } from '../components/TopNav';
import { AnimatePresence } from 'motion/react';

interface DesktopLayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDark: boolean;
  toggleTheme: () => void;
  cartCount: number;
}

export function DesktopLayout({ children, activeTab, setActiveTab, isDark, toggleTheme, cartCount }: DesktopLayoutProps) {
  return (
    <div className="hidden md:flex flex-col min-h-screen w-full bg-aesthetic-light transition-colors duration-300">
      <TopNav activeTab={activeTab} setActiveTab={setActiveTab} isDark={isDark} toggleTheme={toggleTheme} cartCount={cartCount} />
      <main className="flex-1 w-full">
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
      </main>
    </div>
  );
}
