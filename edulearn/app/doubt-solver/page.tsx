'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, Camera, Image as ImageIcon, Send, Bot, User, Loader2, Sparkles, Wand2 } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";

export default function DoubtSolver() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', content: string, image?: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async () => {
    if (!input.trim() && !selectedImage) return;

    const userMsg = { role: 'user' as const, content: input, image: selectedImage || undefined };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setSelectedImage(null);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY! });
      
      let prompt = input;
      let parts: any[] = [{ text: prompt || "Solve this problem from the image." }];
      
      if (userMsg.image) {
        const base64Data = userMsg.image.split(',')[1];
        parts.push({
          inlineData: {
            data: base64Data,
            mimeType: "image/png"
          }
        });
      }

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: { parts },
        config: {
          systemInstruction: "You are an expert academic tutor. Provide clear, step-by-step solutions to student doubts. Use simple language and encouraging tone.",
        }
      });

      setMessages(prev => [...prev, { role: 'ai', content: response.text || "I couldn't solve that. Please try again." }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'ai', content: "Sorry, I'm having trouble connecting to my brain right now. Please try again later!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-bg-page">
      {/* Header */}
      <div className="bg-bg-card border-b border-border-main px-4 py-4 flex items-center gap-4 sticky top-0 z-10">
        <Link href="/" className="p-2 -ml-2 hover:bg-bg-page rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-text-main" />
        </Link>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-text-main leading-tight">AI Doubt Solver</h1>
            <p className="text-[10px] text-primary font-bold uppercase tracking-wider">Powered by Gemini</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-6">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6">
              <Sparkles className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-xl font-bold text-text-main mb-2">Snap & Solve!</h2>
            <p className="text-sm text-text-muted mb-8">Upload a photo of your question or type it below. I can help with Math, Physics, Chemistry, and more!</p>
            
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center gap-3 p-6 bg-bg-card border-2 border-dashed border-border-main rounded-2xl hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <Camera className="w-8 h-8 text-text-muted group-hover:text-primary" />
                <span className="text-xs font-bold text-text-main">Take Photo</span>
              </button>
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center gap-3 p-6 bg-bg-card border-2 border-dashed border-border-main rounded-2xl hover:border-primary hover:bg-primary/5 transition-all group"
              >
                <ImageIcon className="w-8 h-8 text-text-muted group-hover:text-primary" />
                <span className="text-xs font-bold text-text-main">Gallery</span>
              </button>
            </div>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-primary/10 text-primary' : 'bg-bg-card border border-border-main text-primary'}`}>
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`flex flex-col gap-2 max-w-[80%] ${msg.role === 'user' ? 'items-end' : ''}`}>
                {msg.image && (
                  <div className="relative w-48 h-48 rounded-xl overflow-hidden border-2 border-primary/20 shadow-sm">
                    <img src={msg.image} alt="User doubt" className="object-cover w-full h-full" />
                  </div>
                )}
                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-bg-card border border-border-main text-text-main rounded-tl-none shadow-sm'}`}>
                  {msg.content}
                </div>
              </div>
            </motion.div>
          ))
        )}
        {isLoading && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-full bg-bg-card border border-border-main flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4 text-primary" />
            </div>
            <div className="p-4 rounded-2xl bg-bg-card border border-border-main text-text-muted rounded-tl-none shadow-sm flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span className="text-xs font-bold">Solving...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-bg-card border-t border-border-main">
        <AnimatePresence>
          {selectedImage && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mb-4 relative inline-block"
            >
              <img src={selectedImage} alt="Preview" className="w-20 h-20 object-cover rounded-xl border-2 border-primary" />
              <button 
                onClick={() => setSelectedImage(null)}
                className="absolute -top-2 -right-2 bg-accent text-white rounded-full p-1 shadow-md"
              >
                <X className="w-3 h-3" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-2 bg-bg-page border border-border-main rounded-2xl p-2 focus-within:border-primary transition-colors">
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-text-muted hover:text-primary transition-colors"
          >
            <Camera className="w-5 h-5" />
          </button>
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your doubt here..." 
            className="flex-1 bg-transparent p-2 outline-none text-sm text-text-main"
            disabled={isLoading}
          />
          <button 
            onClick={handleSend} 
            disabled={isLoading || (!input.trim() && !selectedImage)}
            className="w-10 h-10 bg-primary text-white rounded-xl flex items-center justify-center shrink-0 hover:opacity-90 disabled:opacity-50 transition-all shadow-md shadow-primary/20"
          >
            <Send className="w-5 h-5 ml-0.5" />
          </button>
        </div>
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleImageSelect} 
          accept="image/*" 
          className="hidden" 
        />
      </div>
    </div>
  );
}

function X({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
