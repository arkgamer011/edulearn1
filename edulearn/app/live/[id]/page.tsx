'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { ChevronLeft, Users, MessageSquare, Heart, Share2, Send, Bot, User } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';

export default function LiveClass() {
  const params = useParams();
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { user: 'Rahul', text: 'Sir, please explain the conservation of angular momentum again.' },
    { user: 'Sneha', text: 'This is so clear now! Thank you sir.' },
    { user: 'Amit', text: 'Is this class recorded?' },
  ]);

  const handleSend = () => {
    if (!chatInput.trim()) return;
    setMessages([...messages, { user: 'Me', text: chatInput }]);
    setChatInput('');
  };

  return (
    <div className="flex flex-col h-screen bg-black">
      {/* Video Player Area */}
      <div className="relative aspect-video bg-gray-900 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
            <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[15px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
          </div>
        </div>
        
        {/* Top Controls */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
          <Link href="/" className="p-2 bg-black/40 backdrop-blur-md rounded-full text-white">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <div className="flex items-center gap-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider animate-pulse">
            <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
            Live
          </div>
        </div>

        {/* Bottom Info */}
        <div className="absolute bottom-4 left-4 flex items-center gap-3">
          <div className="flex items-center gap-1 bg-black/40 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-lg">
            <Users className="w-3 h-3" /> 12,450
          </div>
        </div>
      </div>

      {/* Class Info */}
      <div className="bg-bg-card p-4 border-b border-border-main">
        <h1 className="text-lg font-bold text-text-main mb-1">Rotational Motion - L1 | Physics</h1>
        <p className="text-xs text-text-muted flex items-center gap-2">
          <span className="font-bold text-primary">Alakh Pandey Sir</span> • Physics Wallah
        </p>
      </div>

      {/* Live Chat */}
      <div className="flex-1 flex flex-col bg-bg-page overflow-hidden">
        <div className="p-3 border-b border-border-main flex items-center justify-between bg-bg-card">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-primary" />
            <span className="text-xs font-bold text-text-main">Live Chat</span>
          </div>
          <div className="flex gap-4">
            <Heart className="w-4 h-4 text-accent" />
            <Share2 className="w-4 h-4 text-text-muted" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold ${msg.user === 'Me' ? 'text-primary' : 'text-text-muted'}`}>
                  {msg.user}
                </span>
              </div>
              <p className="text-sm text-text-main bg-bg-card p-2 rounded-lg border border-border-main inline-block max-w-[90%]">
                {msg.text}
              </p>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-bg-card border-t border-border-main">
          <div className="flex items-center gap-2 bg-bg-page border border-border-main rounded-xl p-1 focus-within:border-primary transition-colors">
            <input 
              type="text" 
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Say something..." 
              className="flex-1 bg-transparent p-2 outline-none text-sm text-text-main"
            />
            <button 
              onClick={handleSend}
              className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center shrink-0"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
