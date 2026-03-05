'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export default function AITutor() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Hi! I am your AI Tutor. How can I help you with your studies today?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY! });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [
          {
            role: "user",
            parts: [{ text: `You are a helpful AI Tutor for an educational platform called EduLearn. 
            The user is asking: ${userMessage}. 
            Provide a concise, helpful, and educational response. 
            If it's a academic question, explain it clearly.` }]
          }
        ],
        config: {
          systemInstruction: "You are a friendly and encouraging AI tutor for students. Keep your answers clear, accurate, and easy to understand for students of various grades.",
        }
      });

      const aiResponse = response.text || "I'm sorry, I couldn't process that. Could you try rephrasing?";
      setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: 'ai', content: "Sorry, I'm having trouble connecting to my brain right now. Please try again later!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-24 right-4 w-14 h-14 bg-primary rounded-full shadow-lg shadow-primary/20 flex items-center justify-center text-white hover:opacity-90 transition-all z-40 ${isOpen ? 'scale-0' : 'scale-100'}`}
      >
        <Bot className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <div className={`fixed bottom-20 right-4 w-80 sm:w-96 bg-bg-card rounded-2xl shadow-2xl border border-border-main flex flex-col transition-all duration-300 z-50 origin-bottom-right ${isOpen ? 'scale-100 opacity-100' : 'scale-0 opacity-0 pointer-events-none'}`} style={{ height: '500px', maxHeight: '80vh' }}>
        <div className="bg-primary p-4 rounded-t-2xl flex items-center justify-between text-white">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-sm">EduLearn AI Tutor</h3>
              <p className="text-[10px] text-white/70">Always here to help</p>
            </div>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-bg-page/50">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.role === 'user' ? 'bg-primary/10 text-primary' : 'bg-bg-card border border-border-main text-primary'}`}>
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              <div className={`p-3 rounded-2xl max-w-[75%] text-sm ${msg.role === 'user' ? 'bg-primary text-white rounded-tr-none' : 'bg-bg-card border border-border-main text-text-main rounded-tl-none shadow-sm'}`}>
                {msg.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-bg-card border border-border-main flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-primary" />
              </div>
              <div className="p-3 rounded-2xl bg-bg-card border border-border-main text-text-muted rounded-tl-none shadow-sm">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-3 border-t border-border-main bg-bg-card rounded-b-2xl">
          <div className="flex items-center gap-2 bg-bg-page border border-border-main rounded-xl p-1 focus-within:border-primary transition-colors">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask anything about your studies..." 
              className="flex-1 bg-transparent p-2 outline-none text-sm text-text-main"
              disabled={isLoading}
            />
            <button 
              onClick={handleSend} 
              disabled={isLoading || !input.trim()}
              className="w-8 h-8 bg-primary text-white rounded-lg flex items-center justify-center shrink-0 hover:opacity-90 disabled:opacity-50 transition-colors"
            >
              <Send className="w-4 h-4 ml-0.5" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
