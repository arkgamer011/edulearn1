'use client';

import React from 'react';
import { Sparkles, FileText, Languages, Calculator, BookOpen, Clock, Trophy, Gift, Bot, Wand2 } from 'lucide-react';
import { motion } from 'motion/react';
import Link from 'next/link';

const TOOLS = [
  { id: 'summarize', name: 'Summarize', icon: FileText, color: 'bg-blue-100 text-blue-600', href: '/doubt-solver' },
  { id: 'translate', name: 'Translate', icon: Languages, color: 'bg-green-100 text-green-600', href: '/doubt-solver' },
  { id: 'math', name: 'Math Solver', icon: Calculator, color: 'bg-red-100 text-red-600', href: '/doubt-solver' },
  { id: 'mock', name: 'Mock Tests', icon: FileText, color: 'bg-orange-100 text-orange-600', href: '/mock-test' },
  { id: 'planner', name: 'Planner', icon: Clock, color: 'bg-indigo-100 text-indigo-600', href: '/planner' },
  { id: 'leaderboard', name: 'Leaderboard', icon: Trophy, color: 'bg-yellow-100 text-yellow-600', href: '/leaderboard' },
];

export default function AIPocket() {
  return (
    <div className="px-4 mb-6">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold text-text-main flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#FFD700]" />
          AI 4D Pocket
        </h3>
        <Link href="/doubt-solver" className="text-[10px] font-bold text-primary flex items-center gap-1">
          <Wand2 className="w-3 h-3" />
          MAGIC TOOLS
        </Link>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        {TOOLS.map((tool) => (
          <Link
            key={tool.id}
            href={tool.href}
            className="flex flex-col items-center gap-2 p-3 bg-bg-card rounded-2xl border border-border-main shadow-sm hover:border-primary hover:shadow-md transition-all group"
          >
            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${tool.color} group-hover:scale-110 transition-transform`}>
              <tool.icon className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-bold text-text-main">{tool.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
