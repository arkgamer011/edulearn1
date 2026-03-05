'use client';

import { ChevronLeft, Search, MessageSquare, ArrowUp, ArrowDown, Clock, Plus } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function ForumPage() {
  const [activeTab, setActiveTab] = useState('trending');

  const posts = [
    {
      id: 1,
      title: 'How to manage time between board exams and JEE preparation?',
      author: 'Rahul S.',
      time: '2 hours ago',
      category: 'JEE Strategy',
      upvotes: 145,
      replies: 32,
    },
    {
      id: 2,
      title: 'Doubt in Rotational Motion - Moment of Inertia of a solid sphere',
      author: 'Priya M.',
      time: '5 hours ago',
      category: 'Physics Doubt',
      upvotes: 89,
      replies: 15,
    },
    {
      id: 3,
      title: 'Best books for organic chemistry for NEET?',
      author: 'Amit K.',
      time: '1 day ago',
      category: 'Study Material',
      upvotes: 210,
      replies: 45,
    }
  ];

  return (
    <div className="flex-1 flex flex-col bg-gray-50 min-h-screen">
      <div className="bg-white p-4 flex items-center justify-between border-b border-gray-100 sticky top-0 z-10">
        <div className="flex items-center">
          <Link href="/" className="text-gray-900 mr-4">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <h1 className="text-lg font-bold text-gray-900">Discussion Forum</h1>
        </div>
        <button className="text-gray-600">
          <Search className="w-5 h-5" />
        </button>
      </div>

      {/* Categories */}
      <div className="bg-white border-b border-gray-100 px-4 py-3">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {['All', 'JEE Strategy', 'NEET Strategy', 'Physics Doubt', 'Math Doubt', 'Study Material'].map((cat, idx) => (
            <button 
              key={idx}
              className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium ${idx === 0 ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-white border-b border-gray-200 px-4 pt-2">
        <button 
          onClick={() => setActiveTab('trending')}
          className={`pb-3 px-2 text-sm font-bold mr-6 border-b-2 ${activeTab === 'trending' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500'}`}
        >
          Trending
        </button>
        <button 
          onClick={() => setActiveTab('recent')}
          className={`pb-3 px-2 text-sm font-bold border-b-2 ${activeTab === 'recent' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-gray-500'}`}
        >
          Recent
        </button>
      </div>

      <div className="p-4 flex-1 overflow-y-auto pb-24 space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
            <div className="flex items-start gap-3">
              {/* Voting */}
              <div className="flex flex-col items-center bg-gray-50 rounded-lg p-1 shrink-0">
                <button className="p-1 text-gray-400 hover:text-indigo-600"><ArrowUp className="w-4 h-4" /></button>
                <span className="text-xs font-bold text-gray-700 my-1">{post.upvotes}</span>
                <button className="p-1 text-gray-400 hover:text-red-600"><ArrowDown className="w-4 h-4" /></button>
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">{post.category}</span>
                  <span className="text-[10px] text-gray-400 flex items-center gap-1"><Clock className="w-3 h-3" /> {post.time}</span>
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-2 leading-snug">{post.title}</h3>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-gray-500">By {post.author}</span>
                  <button className="flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-indigo-600">
                    <MessageSquare className="w-3.5 h-3.5" /> {post.replies} Replies
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* FAB */}
      <button className="fixed bottom-6 right-4 w-14 h-14 bg-indigo-600 rounded-full shadow-lg shadow-indigo-200 flex items-center justify-center text-white hover:bg-indigo-700 transition-colors z-50">
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
}
