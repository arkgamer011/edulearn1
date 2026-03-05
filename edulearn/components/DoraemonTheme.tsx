'use client';

import { motion } from 'motion/react';
import { useTheme } from '@/lib/ThemeContext';

export default function DoraemonTheme() {
  const { theme } = useTheme();

  if (theme !== 'dora') return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Main Blue Background */}
      <div className="absolute inset-0 bg-[#00A0E9] opacity-5"></div>
      
      {/* Subtle Doraemon Patterns */}
      <div className="absolute top-10 -left-10 w-40 h-40 border-4 border-blue-200 rounded-full opacity-10"></div>
      <div className="absolute bottom-20 -right-10 w-60 h-60 border-4 border-blue-200 rounded-full opacity-10"></div>
      
      {/* Floating Doraemon Bells */}
      <motion.div 
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 10, 0]
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-10 text-4xl opacity-10"
      >
        🔔
      </motion.div>
      
      <motion.div 
        animate={{ 
          y: [0, 20, 0],
          rotate: [0, -10, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/3 left-10 text-4xl opacity-10"
      >
        🔔
      </motion.div>

      {/* Subtle Whiskers in corners */}
      <div className="absolute top-0 right-0 p-8 opacity-5">
        <div className="w-12 h-0.5 bg-blue-900 mb-2 transform -rotate-12"></div>
        <div className="w-12 h-0.5 bg-blue-900 mb-2"></div>
        <div className="w-12 h-0.5 bg-blue-900 transform rotate-12"></div>
      </div>

      <div className="absolute bottom-0 left-0 p-8 opacity-5">
        <div className="w-12 h-0.5 bg-blue-900 mb-2 transform rotate-12"></div>
        <div className="w-12 h-0.5 bg-blue-900 mb-2"></div>
        <div className="w-12 h-0.5 bg-blue-900 transform -rotate-12"></div>
      </div>
    </div>
  );
}
