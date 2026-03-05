'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Home, BookOpen, PlayCircle, User, Settings, HelpCircle, Info, LogOut, Bell, Trophy, Gift } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '@/lib/ThemeContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const { theme } = useTheme();

  const menuItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/batches', icon: BookOpen, label: 'My Batches' },
    { href: '/learn', icon: PlayCircle, label: 'Free Classes' },
    { href: '/leaderboard', icon: Trophy, label: 'Leaderboard' },
    { href: '/referral', icon: Gift, label: 'Refer & Earn' },
    { href: '/notifications', icon: Bell, label: 'Notifications' },
    { href: '/profile', icon: User, label: 'My Profile' },
    { href: '/settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-[60] backdrop-blur-sm"
          />

          {/* Sidebar Content */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 left-0 bottom-0 w-72 bg-bg-card z-[70] shadow-2xl flex flex-col border-r-4 border-primary"
          >
            {/* Header */}
            <div className="p-6 bg-primary text-white border-b-4 border-accent relative overflow-hidden">
              <button 
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-primary font-bold text-xl border-2 border-white shadow-lg">
                  {theme === 'dora' ? 'D' : 'E'}
                </div>
                <div>
                  <h2 className="font-bold text-lg leading-tight">
                    {theme === 'dora' ? 'DoraLearn' : 'EduLearn'}
                  </h2>
                  <p className="text-xs text-white/70">Learning is fun!</p>
                </div>
              </div>

              {/* User Info */}
              <div className="flex items-center gap-3 mt-6 p-3 bg-white/10 rounded-xl backdrop-blur-md">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-primary font-bold">
                  JD
                </div>
                <div>
                  <p className="font-bold text-sm">John Doe</p>
                  <p className="text-[10px] text-white/60">john.doe@example.com</p>
                </div>
              </div>

              {/* Decorative Whiskers for Dora theme */}
              {theme === 'dora' && (
                <div className="absolute -bottom-2 -right-2 opacity-20 pointer-events-none">
                  <div className="w-16 h-0.5 bg-white mb-1 transform -rotate-12"></div>
                  <div className="w-16 h-0.5 bg-white mb-1"></div>
                  <div className="w-16 h-0.5 bg-white transform rotate-12"></div>
                </div>
              )}
            </div>

            {/* Menu Items */}
            <div className="flex-1 overflow-y-auto py-4">
              <div className="px-4 mb-2">
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest px-2">Main Menu</p>
              </div>
              <nav className="space-y-1 px-2">
                {menuItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center gap-3 p-3 rounded-xl text-text-main hover:bg-primary/10 hover:text-primary transition-all group"
                  >
                    <item.icon className="w-5 h-5 text-text-muted group-hover:text-primary transition-colors" />
                    <span className="font-bold text-sm">{item.label}</span>
                  </Link>
                ))}
              </nav>

              <div className="mt-6 px-4 mb-2">
                <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest px-2">Others</p>
              </div>
              <nav className="space-y-1 px-2">
                <Link href="/help" onClick={onClose} className="flex items-center gap-3 p-3 rounded-xl text-text-main hover:bg-primary/10 hover:text-primary transition-all group">
                  <HelpCircle className="w-5 h-5 text-text-muted group-hover:text-primary" />
                  <span className="font-bold text-sm">Help Center</span>
                </Link>
                <Link href="/about" onClick={onClose} className="flex items-center gap-3 p-3 rounded-xl text-text-main hover:bg-primary/10 hover:text-primary transition-all group">
                  <Info className="w-5 h-5 text-text-muted group-hover:text-primary" />
                  <span className="font-bold text-sm">About Us</span>
                </Link>
              </nav>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-border-main">
              <Link href="/login" onClick={onClose} className="flex items-center gap-3 p-3 rounded-xl text-accent hover:bg-red-50 transition-all">
                <LogOut className="w-5 h-5" />
                <span className="font-bold text-sm">Log Out</span>
              </Link>
              <p className="text-[10px] text-center text-text-muted mt-4">Version 1.0.4 - Made with ❤️</p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
