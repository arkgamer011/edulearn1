'use client';

import React from 'react';
import { ChevronLeft, FileText, Clock, CheckCircle2, Play, Star, Trophy } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react';

const TESTS = [
  { id: 1, title: 'JEE Mains Full Mock Test #1', questions: 90, time: '180 min', status: 'Available' },
  { id: 2, title: 'NEET Practice Test - Biology', questions: 100, time: '60 min', status: 'Completed', score: '92/100' },
  { id: 3, title: 'UPSC Prelims Mock #4', questions: 100, time: '120 min', status: 'Available' },
];

export default function MockTest() {
  return (
    <div className="flex-1 overflow-y-auto pb-20 bg-bg-page">
      {/* Header */}
      <div className="bg-bg-card px-4 py-6 border-b border-border-main flex items-center gap-4 sticky top-0 z-10">
        <Link href="/" className="p-2 -ml-2 hover:bg-bg-page rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-text-main" />
        </Link>
        <h1 className="text-xl font-bold text-text-main">Mock Tests</h1>
      </div>

      {/* Stats */}
      <div className="p-4 grid grid-cols-3 gap-3">
        <div className="bg-primary/10 p-3 rounded-2xl border border-primary/20 flex flex-col items-center">
          <Trophy className="w-5 h-5 text-primary mb-1" />
          <span className="text-sm font-bold text-primary">12</span>
          <span className="text-[10px] text-text-muted uppercase">Taken</span>
        </div>
        <div className="bg-green-100 p-3 rounded-2xl border border-green-200 flex flex-col items-center">
          <CheckCircle2 className="w-5 h-5 text-green-600 mb-1" />
          <span className="text-sm font-bold text-green-600">85%</span>
          <span className="text-[10px] text-text-muted uppercase">Avg. Score</span>
        </div>
        <div className="bg-orange-100 p-3 rounded-2xl border border-orange-200 flex flex-col items-center">
          <Clock className="w-5 h-5 text-orange-600 mb-1" />
          <span className="text-sm font-bold text-orange-600">45h</span>
          <span className="text-[10px] text-text-muted uppercase">Practice</span>
        </div>
      </div>

      {/* Test List */}
      <div className="p-4 space-y-4">
        <h3 className="font-bold text-text-main mb-2">Available Tests</h3>
        {TESTS.map((test) => (
          <motion.div
            key={test.id}
            whileHover={{ scale: 1.02 }}
            className="bg-bg-card p-5 rounded-2xl border-2 border-border-main shadow-sm flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${test.status === 'Completed' ? 'bg-green-100 text-green-600' : 'bg-primary/10 text-primary'}`}>
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-text-main mb-1">{test.title}</h4>
                <div className="flex items-center gap-3 text-[10px] text-text-muted font-bold">
                  <span className="flex items-center gap-1"><FileText className="w-3 h-3" /> {test.questions} Qs</span>
                  <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {test.time}</span>
                </div>
              </div>
            </div>
            {test.status === 'Completed' ? (
              <div className="text-right">
                <p className="text-xs font-bold text-green-600">{test.score}</p>
                <p className="text-[10px] text-text-muted uppercase">Score</p>
              </div>
            ) : (
              <button className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/20 group-hover:bg-accent transition-colors">
                <Play className="w-4 h-4 ml-0.5" />
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
