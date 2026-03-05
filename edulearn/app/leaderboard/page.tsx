'use client';

import React from 'react';
import { ChevronLeft, Trophy, Star, User, Medal, Flame, Target } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react';

const RANKINGS = [
  { rank: 1, name: 'Rahul S.', score: 2450, avatar: 'https://picsum.photos/seed/u1/100/100' },
  { rank: 2, name: 'Sneha K.', score: 2320, avatar: 'https://picsum.photos/seed/u2/100/100' },
  { rank: 3, name: 'Amit P.', score: 2100, avatar: 'https://picsum.photos/seed/u3/100/100' },
  { rank: 4, name: 'John Doe', score: 1950, avatar: 'https://picsum.photos/seed/u4/100/100', isMe: true },
  { rank: 5, name: 'Priya M.', score: 1800, avatar: 'https://picsum.photos/seed/u5/100/100' },
];

export default function Leaderboard() {
  return (
    <div className="flex-1 overflow-y-auto pb-20 bg-bg-page">
      {/* Header */}
      <div className="bg-primary px-4 pt-8 pb-16 relative border-b-4 border-accent">
        <div className="flex items-center gap-4 mb-6">
          <Link href="/" className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-2xl font-bold text-white">Leaderboard</h1>
        </div>
        
        {/* Top 3 */}
        <div className="flex items-end justify-center gap-4 px-4">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full border-4 border-silver bg-bg-card flex items-center justify-center text-primary font-bold text-xl mb-2">2</div>
            <p className="text-[10px] font-bold text-white">Sneha K.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-20 h-20 rounded-full border-4 border-gold bg-bg-card flex items-center justify-center text-primary font-bold text-2xl mb-2 relative">
              1
              <Medal className="absolute -top-4 -right-2 w-8 h-8 text-yellow-400" />
            </div>
            <p className="text-xs font-bold text-white">Rahul S.</p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 rounded-full border-4 border-bronze bg-bg-card flex items-center justify-center text-primary font-bold text-xl mb-2">3</div>
            <p className="text-[10px] font-bold text-white">Amit P.</p>
          </div>
        </div>
      </div>

      {/* Rankings */}
      <div className="px-4 -mt-8 relative z-10 space-y-3">
        {RANKINGS.map((user, idx) => (
          <motion.div
            key={user.rank}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`p-4 rounded-2xl border-2 flex items-center justify-between ${user.isMe ? 'bg-primary/10 border-primary shadow-md' : 'bg-bg-card border-border-main shadow-sm'}`}
          >
            <div className="flex items-center gap-4">
              <span className={`font-bold text-lg ${user.rank <= 3 ? 'text-primary' : 'text-text-muted'}`}>{user.rank}</span>
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                {user.name.split(' ')[0][0]}
              </div>
              <div>
                <h4 className="font-bold text-sm text-text-main">{user.name} {user.isMe && '(You)'}</h4>
                <p className="text-[10px] text-text-muted">{user.score} Points</p>
              </div>
            </div>
            {user.isMe && <Flame className="w-5 h-5 text-accent" />}
          </motion.div>
        ))}
      </div>

      {/* Stats */}
      <div className="p-6 grid grid-cols-2 gap-4">
        <div className="bg-bg-card p-4 rounded-2xl border border-border-main flex flex-col items-center">
          <Target className="w-6 h-6 text-primary mb-2" />
          <span className="text-lg font-bold text-text-main">Top 5%</span>
          <span className="text-[10px] text-text-muted uppercase">Global Rank</span>
        </div>
        <div className="bg-bg-card p-4 rounded-2xl border border-border-main flex flex-col items-center">
          <Trophy className="w-6 h-6 text-yellow-500 mb-2" />
          <span className="text-lg font-bold text-text-main">12</span>
          <span className="text-[10px] text-text-muted uppercase">Badges Won</span>
        </div>
      </div>
    </div>
  );
}
