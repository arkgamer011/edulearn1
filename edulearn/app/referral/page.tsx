'use client';

import React from 'react';
import { ChevronLeft, Gift, Share2, Copy, Users, Trophy, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react';

export default function Referral() {
  const referralCode = "DORA500";

  return (
    <div className="flex-1 overflow-y-auto pb-20 bg-bg-page">
      {/* Header */}
      <div className="bg-bg-card px-4 py-6 border-b border-border-main flex items-center gap-4 sticky top-0 z-10">
        <Link href="/" className="p-2 -ml-2 hover:bg-bg-page rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-text-main" />
        </Link>
        <h1 className="text-xl font-bold text-text-main">Refer & Earn</h1>
      </div>

      {/* Hero */}
      <div className="p-6 text-center">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 relative">
          <Gift className="w-12 h-12 text-primary" />
          <motion.div 
            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute -top-2 -right-2 bg-accent text-white p-2 rounded-full shadow-lg"
          >
            <Sparkles className="w-4 h-4" />
          </motion.div>
        </div>
        <h2 className="text-2xl font-bold text-text-main mb-2">Invite Friends, Get Rewards!</h2>
        <p className="text-sm text-text-muted px-6">Earn ₹500 for every friend who joins using your code. Your friend gets 20% OFF too!</p>
      </div>

      {/* Referral Code */}
      <div className="px-6 mb-8">
        <div className="bg-bg-card border-2 border-dashed border-primary/30 rounded-2xl p-6 flex flex-col items-center gap-4">
          <p className="text-[10px] font-bold text-text-muted uppercase tracking-widest">Your Referral Code</p>
          <div className="flex items-center gap-4 w-full">
            <div className="flex-1 bg-bg-page border border-border-main rounded-xl p-4 text-center font-mono text-xl font-bold text-primary tracking-widest">
              {referralCode}
            </div>
            <button 
              onClick={() => {
                navigator.clipboard.writeText(referralCode);
                alert("Code copied to clipboard!");
              }}
              className="w-14 h-14 bg-primary text-white rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 active:scale-95 transition-all"
            >
              <Copy className="w-6 h-6" />
            </button>
          </div>
          <button className="w-full bg-accent text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-accent/20 active:scale-95 transition-all">
            <Share2 className="w-5 h-5" />
            Share with Friends
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="px-6 grid grid-cols-2 gap-4 mb-8">
        <div className="bg-bg-card p-4 rounded-2xl border border-border-main flex flex-col items-center">
          <Users className="w-6 h-6 text-primary mb-2" />
          <span className="text-lg font-bold text-text-main">12</span>
          <span className="text-[10px] text-text-muted uppercase">Friends Joined</span>
        </div>
        <div className="bg-bg-card p-4 rounded-2xl border border-border-main flex flex-col items-center">
          <Trophy className="w-6 h-6 text-yellow-500 mb-2" />
          <span className="text-lg font-bold text-text-main">₹6,000</span>
          <span className="text-[10px] text-text-muted uppercase">Total Earned</span>
        </div>
      </div>

      {/* How it works */}
      <div className="px-6 space-y-4">
        <h3 className="font-bold text-text-main">How it works</h3>
        <div className="space-y-4">
          {[
            { step: 1, text: "Share your referral code with friends." },
            { step: 2, text: "Your friend signs up and buys a batch." },
            { step: 3, text: "You get ₹500 in your wallet instantly!" },
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-4">
              <div className="w-6 h-6 bg-primary/10 text-primary rounded-full flex items-center justify-center shrink-0 font-bold text-xs">
                {item.step}
              </div>
              <p className="text-sm text-text-muted">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
