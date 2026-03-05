'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Clock, TrendingUp, BookOpen, Play } from 'lucide-react';
import Link from 'next/link';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const RECENT_SEARCHES = ['Rotational Motion', 'Organic Chemistry', 'JEE Mains 2026', 'Calculus'];
const SUGGESTIONS = [
  { title: 'Physics: Laws of Motion', type: 'Video' },
  { title: 'Chemistry: Periodic Table', type: 'Notes' },
  { title: 'Math: Integration', type: 'Quiz' },
];

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-bg-page z-[100] flex flex-col"
        >
          {/* Search Header */}
          <div className="bg-bg-card p-4 border-b border-border-main flex items-center gap-3">
            <div className="flex-1 bg-bg-page border border-border-main rounded-xl flex items-center px-3 focus-within:border-primary transition-colors">
              <Search className="w-5 h-5 text-text-muted" />
              <input
                autoFocus
                type="text"
                placeholder="Search courses, topics, or teachers..."
                className="flex-1 bg-transparent p-3 outline-none text-text-main text-sm"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                <button onClick={() => setQuery('')}>
                  <X className="w-4 h-4 text-text-muted" />
                </button>
              )}
            </div>
            <button 
              onClick={onClose}
              className="text-sm font-bold text-primary px-2"
            >
              Cancel
            </button>
          </div>

          {/* Search Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {!query ? (
              <>
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold text-sm text-text-main flex items-center gap-2">
                      <Clock className="w-4 h-4 text-text-muted" />
                      Recent Searches
                    </h3>
                    <button className="text-[10px] font-bold text-accent uppercase">Clear</button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {RECENT_SEARCHES.map((s) => (
                      <button 
                        key={s}
                        onClick={() => setQuery(s)}
                        className="px-4 py-2 bg-bg-card border border-border-main rounded-full text-xs text-text-main hover:border-primary transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-bold text-sm text-text-main flex items-center gap-2 mb-4">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    Trending Now
                  </h3>
                  <div className="space-y-4">
                    {SUGGESTIONS.map((s, idx) => (
                      <button 
                        key={idx}
                        onClick={() => setQuery(s.title)}
                        className="w-full flex items-center justify-between p-3 bg-bg-card rounded-xl border border-border-main hover:bg-primary/5 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                            {s.type === 'Video' ? <Play className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-bold text-text-main">{s.title}</p>
                            <p className="text-[10px] text-text-muted uppercase font-bold tracking-wider">{s.type}</p>
                          </div>
                        </div>
                        <Search className="w-4 h-4 text-text-muted" />
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-4">
                <p className="text-xs text-text-muted">Showing results for &quot;{query}&quot;</p>
                {/* Mock Results */}
                {[1, 2, 3].map((i) => (
                  <Link 
                    key={i}
                    href="/batches"
                    onClick={onClose}
                    className="flex gap-4 p-3 bg-bg-card rounded-2xl border border-border-main"
                  >
                    <div className="w-20 h-20 bg-primary/10 rounded-xl shrink-0 flex items-center justify-center text-primary text-2xl">
                      📚
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm text-text-main mb-1">Advanced {query} Course</h4>
                      <p className="text-xs text-text-muted mb-2">Master the concepts with Alakh Sir</p>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold bg-primary/10 text-primary px-2 py-0.5 rounded">JEE</span>
                        <span className="text-[10px] font-bold bg-accent/10 text-accent px-2 py-0.5 rounded">LIVE</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
