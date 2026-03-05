'use client';

import { useState } from 'react';
import { Bell, Search, Menu, X } from 'lucide-react';
import { useTheme } from '@/lib/ThemeContext';
import Sidebar from './Sidebar';
import SearchOverlay from './SearchOverlay';
import Link from 'next/link';

export default function TopBar() {
  const { theme } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <div className="bg-bg-card px-4 py-3 flex items-center justify-between sticky top-0 z-50 border-b-2 border-border-main transition-colors duration-300">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="text-text-main p-1 hover:bg-primary/10 rounded-lg transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-lg border-2 border-white shadow-sm">
              {theme === 'dora' ? 'D' : 'E'}
            </div>
            <span className="font-bold text-xl tracking-tight text-primary">
              {theme === 'dora' ? 'DoraLearn' : 'EduLearn'}
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="text-text-muted p-1 hover:bg-primary/10 rounded-lg transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
          <Link href="/notifications" className="text-text-muted p-1 hover:bg-primary/10 rounded-lg transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full border border-white"></span>
          </Link>
        </div>
      </div>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
