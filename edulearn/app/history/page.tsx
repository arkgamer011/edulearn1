'use client';

import { useState, useMemo } from 'react';
import { ChevronLeft, PlayCircle, Clock, Search, Filter, Trash2, Calendar } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const WATCH_HISTORY = [
  {
    id: 1,
    title: 'Rotational Motion - L1 | Physics',
    educator: 'Alakh Pandey',
    date: '2026-03-04',
    time: '10:30 AM',
    progress: 85,
    thumbnail: 'https://picsum.photos/seed/physics/400/225',
    category: 'Physics'
  },
  {
    id: 2,
    title: 'Chemical Bonding | Chemistry',
    educator: 'Pankaj Sir',
    date: '2026-03-03',
    time: '04:15 PM',
    progress: 100,
    thumbnail: 'https://picsum.photos/seed/chem/400/225',
    category: 'Chemistry'
  },
  {
    id: 3,
    title: 'Mole Concept - L2 | Chemistry',
    educator: 'Pankaj Sir',
    date: '2026-03-02',
    time: '11:00 AM',
    progress: 45,
    thumbnail: 'https://picsum.photos/seed/chem2/400/225',
    category: 'Chemistry'
  },
  {
    id: 4,
    title: 'Kinematics - L3 | Physics',
    educator: 'Alakh Pandey',
    date: '2026-03-01',
    time: '02:30 PM',
    progress: 20,
    thumbnail: 'https://picsum.photos/seed/physics2/400/225',
    category: 'Physics'
  },
];

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [history, setHistory] = useState(WATCH_HISTORY);

  const filteredHistory = useMemo(() => {
    return history.filter(item => {
      const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           item.educator.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, history]);

  const removeHistoryItem = (id: number) => {
    if (confirm('Remove this video from history?')) {
      setHistory(prev => prev.filter(item => item.id !== id));
    }
  };

  const clearHistory = () => {
    if (confirm('Are you sure you want to clear all watch history?')) {
      setHistory([]);
    }
  };

  const categories = ['All', ...Array.from(new Set(WATCH_HISTORY.map(item => item.category)))];

  return (
    <div className="min-h-screen bg-blue-50/20 pb-20">
      {/* Doraemon Themed Header */}
      <div className="bg-[#00A0E9] px-4 pt-4 pb-6 sticky top-0 z-20 shadow-md border-b-4 border-[#E60012]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Link href="/profile" className="p-2 -ml-2 bg-white/20 rounded-full backdrop-blur-md text-white hover:bg-white/30 transition-all">
              <ChevronLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-xl font-bold text-white">Watch History</h1>
          </div>
          {history.length > 0 && (
            <button 
              onClick={clearHistory}
              className="text-[10px] font-bold bg-[#E60012] text-white px-3 py-1.5 rounded-full shadow-sm hover:scale-105 transition-transform"
            >
              Clear All
            </button>
          )}
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search your history..." 
            className="w-full bg-white rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none shadow-inner"
          />
        </div>
      </div>

      <div className="p-4">
        {/* Category Filters */}
        <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border-2 ${
                selectedCategory === cat 
                ? 'bg-[#00A0E9] text-white border-[#00A0E9] shadow-md' 
                : 'bg-white text-blue-600 border-blue-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* History List */}
        <div className="space-y-4">
          {filteredHistory.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl shadow-sm border-2 border-blue-50 overflow-hidden group">
              <div className="flex p-3 gap-4">
                <Link href={`/video/${item.id}`} className="relative w-32 h-20 rounded-xl overflow-hidden shrink-0">
                  <Image src={item.thumbnail} alt={item.title} fill className="object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <PlayCircle className="w-8 h-8 text-white fill-white/20 backdrop-blur-sm rounded-full" />
                  </div>
                  <div className="absolute bottom-1 right-1 bg-[#00A0E9] text-white text-[8px] font-bold px-1.5 py-0.5 rounded">
                    {item.progress}% watched
                  </div>
                </Link>
                
                <div className="flex-1 flex flex-col justify-between py-0.5">
                  <div className="flex justify-between items-start">
                    <Link href={`/video/${item.id}`} className="flex-1">
                      <h3 className="font-bold text-sm text-gray-900 line-clamp-1 hover:text-[#00A0E9] transition-colors">{item.title}</h3>
                      <p className="text-xs text-gray-500 mb-1">{item.educator}</p>
                    </Link>
                    <button 
                      onClick={() => removeHistoryItem(item.id)}
                      className="p-1.5 text-gray-300 hover:text-[#E60012] transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[10px] text-gray-400">
                      <Calendar className="w-3 h-3" />
                      {item.date} • {item.time}
                    </div>
                    <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${
                      item.progress === 100 ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-[#00A0E9]'
                    }`}>
                      {item.progress === 100 ? 'Completed' : 'In Progress'}
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="h-1 w-full bg-gray-100">
                <div 
                  className={`h-full transition-all duration-500 ${item.progress === 100 ? 'bg-green-500' : 'bg-[#00A0E9]'}`} 
                  style={{ width: `${item.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredHistory.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6 border-2 border-dashed border-blue-200">
              <Clock className="w-10 h-10 text-blue-200" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">No history found</h3>
            <p className="text-sm text-gray-500 max-w-[200px]">
              {searchQuery ? `No results for "${searchQuery}"` : "You haven't watched any videos yet."}
            </p>
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-4 text-[#00A0E9] text-xs font-bold"
              >
                Clear search
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
