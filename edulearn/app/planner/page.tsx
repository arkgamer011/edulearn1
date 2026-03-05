'use client';

import React from 'react';
import { ChevronLeft, Calendar, Clock, CheckCircle2, Plus, Bell, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react';

const SCHEDULE = [
  { time: '09:00 AM', title: 'Physics: Rotational Motion', type: 'Live Class', status: 'Upcoming' },
  { time: '11:30 AM', title: 'Chemistry: Organic Reaction Mechanism', type: 'Self Study', status: 'Upcoming' },
  { time: '02:00 PM', title: 'Math: Integration Practice', type: 'Quiz', status: 'Upcoming' },
  { time: '04:30 PM', title: 'Biology: Cell Division', type: 'Revision', status: 'Upcoming' },
];

export default function Planner() {
  return (
    <div className="flex-1 overflow-y-auto pb-20 bg-bg-page">
      {/* Header */}
      <div className="bg-bg-card px-4 py-6 border-b border-border-main flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 -ml-2 hover:bg-bg-page rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6 text-text-main" />
          </Link>
          <h1 className="text-xl font-bold text-text-main">Study Planner</h1>
        </div>
        <button className="p-2 bg-primary/10 text-primary rounded-full">
          <Plus className="w-6 h-6" />
        </button>
      </div>

      {/* Calendar Strip */}
      <div className="p-4 bg-bg-card border-b border-border-main flex gap-3 overflow-x-auto no-scrollbar">
        {[1, 2, 3, 4, 5, 6, 7].map((d) => (
          <div key={d} className={`flex flex-col items-center gap-1 p-3 rounded-2xl min-w-[50px] border-2 ${d === 4 ? 'bg-primary text-white border-primary shadow-lg shadow-primary/20' : 'bg-bg-page border-border-main text-text-muted'}`}>
            <span className="text-[10px] font-bold uppercase tracking-wider">Wed</span>
            <span className="text-sm font-bold">{d + 10}</span>
          </div>
        ))}
      </div>

      {/* AI Suggestion */}
      <div className="p-4">
        <div className="bg-gradient-to-br from-indigo-600 to-primary p-5 rounded-2xl text-white shadow-lg relative overflow-hidden">
          <div className="flex items-center gap-3 mb-3">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <h3 className="font-bold text-sm">AI Study Tip</h3>
          </div>
          <p className="text-xs text-white/80 leading-relaxed mb-4">
            &quot;Based on your last mock test, you should spend 30 more minutes on <strong>Electrostatics</strong> today.&quot;
          </p>
          <button className="bg-white/20 backdrop-blur-md text-white text-[10px] font-bold py-2 px-4 rounded-full uppercase tracking-widest border border-white/30">
            Update Schedule
          </button>
          <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        </div>
      </div>

      {/* Schedule List */}
      <div className="p-4 space-y-6">
        <h3 className="font-bold text-text-main flex items-center gap-2">
          <Clock className="w-4 h-4 text-primary" />
          Today&apos;s Schedule
        </h3>
        <div className="space-y-4">
          {SCHEDULE.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex gap-4"
            >
              <div className="flex flex-col items-center gap-2">
                <span className="text-[10px] font-bold text-text-muted whitespace-nowrap">{item.time}</span>
                <div className="w-0.5 flex-1 bg-border-main"></div>
              </div>
              <div className="flex-1 bg-bg-card p-4 rounded-2xl border border-border-main shadow-sm flex items-center justify-between group hover:border-primary transition-colors">
                <div>
                  <h4 className="font-bold text-sm text-text-main mb-1">{item.title}</h4>
                  <p className="text-[10px] text-text-muted font-bold uppercase tracking-wider">{item.type}</p>
                </div>
                <button className="w-8 h-8 rounded-full border border-border-main flex items-center justify-center text-text-muted group-hover:text-primary group-hover:border-primary transition-colors">
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
