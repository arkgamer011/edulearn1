'use client';

import { Home, BookOpen, PlayCircle, User } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '@/lib/ThemeContext';
import { usePathname } from 'next/navigation';

export default function BottomNav() {
  const { theme } = useTheme();
  const pathname = usePathname();

  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/batches', icon: BookOpen, label: 'Batches' },
    { href: '/learn', icon: PlayCircle, label: 'Learn' },
    { href: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="absolute bottom-0 w-full bg-bg-card border-t-2 border-border-main flex justify-around items-center py-3 px-2 z-50 transition-colors duration-300">
      {navItems.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link 
            key={item.href} 
            href={item.href} 
            className={`flex flex-col items-center transition-colors ${isActive ? 'text-primary' : 'text-text-muted hover:text-primary'}`}
          >
            <item.icon className="w-6 h-6 mb-1" />
            <span className="text-[10px] font-bold">{item.label}</span>
          </Link>
        );
      })}
    </div>
  );
}
