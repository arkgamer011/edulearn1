'use client';

import TopBar from '@/components/TopBar';
import BottomNav from '@/components/BottomNav';
import AIPocket from '@/components/AIPocket';
import { Play, Star, Clock, ChevronRight, BookOpen, User, FileText, MessageSquare, Gift, Trophy, Youtube, Bot, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'motion/react';
import { useTheme } from '@/lib/ThemeContext';

const CATEGORIES = [
  { id: 1, name: 'JEE', icon: '🚀', color: 'bg-orange-100 text-orange-600' },
  { id: 2, name: 'NEET', icon: '🧬', color: 'bg-blue-100 text-blue-600' },
  { id: 3, name: 'UPSC', icon: '🏛️', color: 'bg-green-100 text-green-600' },
  { id: 4, name: 'BPSC', icon: '📜', color: 'bg-red-100 text-red-600' },
  { id: 5, name: 'SSC', icon: '👮', color: 'bg-amber-100 text-amber-600' },
  { id: 6, name: 'Banking', icon: '💰', color: 'bg-indigo-100 text-indigo-600' },
  { id: 7, name: 'Class 12', icon: '📚', color: 'bg-purple-100 text-purple-600' },
];

const LIVE_CLASSES = [
  {
    id: 1,
    title: 'Rotational Motion - L1 | Physics',
    educator: 'Alakh Pandey',
    time: 'Live Now',
    viewers: '12K',
    thumbnail: 'https://picsum.photos/seed/physics/400/225',
  },
  {
    id: 2,
    title: 'Chemical Bonding | Chemistry',
    educator: 'Pankaj Sir',
    time: 'Starts at 6:00 PM',
    viewers: 'Waiting',
    thumbnail: 'https://picsum.photos/seed/chem/400/225',
  },
];

const POPULAR_BATCHES = [
  {
    id: 'lakshya-jee-2026',
    title: 'Lakshya JEE 2026',
    description: 'Complete Class 12th + JEE Main & Advanced',
    price: '₹4,500',
    originalPrice: '₹6,000',
    discount: '25% OFF',
    rating: 4.9,
    students: '50K+',
    image: 'https://picsum.photos/seed/jee/400/225',
  },
  {
    id: 'yakeen-neet-2026',
    title: 'Yakeen NEET 2026',
    description: 'Dropper Batch for NEET 2026',
    price: '₹4,000',
    originalPrice: '₹5,500',
    discount: '27% OFF',
    rating: 4.8,
    students: '80K+',
    image: 'https://picsum.photos/seed/neet/400/225',
  },
];

export default function Home() {
  const { theme } = useTheme();

  return (
    <div className="flex-1 overflow-y-auto pb-20 bg-bg-page/20">
      <TopBar />
      
      {/* Hero Banner - Doraemon Style */}
      <div className="p-4">
        <div className="bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-5 text-white shadow-lg relative overflow-hidden border-b-4 border-accent">
          <div className="relative z-10 w-2/3">
            <span className="bg-white/20 text-[10px] font-bold px-2 py-1 rounded-full mb-2 inline-block uppercase tracking-widest">
              {theme === 'dora' ? 'Anywhere Door to Success' : 'Welcome to EduLearn'}
            </span>
            <h2 className="text-xl font-bold mb-1 leading-tight">
              {theme === 'dora' ? 'Unlock Your Potential!' : 'Learn from the Best!'}
            </h2>
            <p className="text-xs text-white/80 mb-4">
              {theme === 'dora' ? 'Doraemon is here to help you study!' : 'AI-powered learning for everyone.'}
            </p>
            <Link href="/batches" className="bg-[#FFD700] text-blue-900 text-xs font-bold py-2.5 px-6 rounded-full shadow-md inline-block hover:scale-105 active:scale-95 transition-all">
              Start Learning
            </Link>
          </div>
          
          {/* Anywhere Door Graphic */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="absolute right-4 bottom-4 w-24 h-32 flex flex-col items-center cursor-pointer group"
          >
            {/* The Door Frame */}
            <div className="w-full h-full bg-[#FF69B4] rounded-t-lg border-4 border-[#D81B60] relative shadow-lg overflow-hidden group-hover:shadow-pink-500/50 transition-shadow">
              {/* Door Panel */}
              <div className="absolute inset-1 bg-[#FF80AB] rounded-t-sm flex items-center justify-center border-2 border-[#D81B60]/30">
                {/* Door Handle */}
                <div className="absolute right-2 top-1/2 w-3 h-3 bg-[#FFD700] rounded-full shadow-md border border-yellow-600"></div>
                {/* Door Window/Detail */}
                <div className="w-12 h-20 bg-white/20 rounded-sm"></div>
              </div>
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
            <div className="w-28 h-2 bg-[#D81B60] rounded-full -mt-1 shadow-md"></div>
            
            {/* Floating Sparkles around the door */}
            <motion.div
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-2 -left-2 text-xs"
            >
              ✨
            </motion.div>
            <motion.div
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.2, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              className="absolute top-4 -right-2 text-xs"
            >
              ✨
            </motion.div>
          </motion.div>

          {/* Floating Animations for Dora Theme */}
          {theme === 'dora' && (
            <>
              <motion.div
                animate={{ 
                  y: [0, -15, 0],
                  rotate: [0, 10, -10, 0]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-2 right-16 text-4xl opacity-30 pointer-events-none drop-shadow-md"
              >
                🚁
              </motion.div>
              <motion.div
                animate={{ 
                  x: [-10, 10, -10],
                  y: [0, 10, 0]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-12 left-1/2 text-3xl opacity-20 pointer-events-none"
              >
                ☁️
              </motion.div>
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.5, 0.2]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-4 left-1/4 text-2xl pointer-events-none"
              >
                🔔
              </motion.div>
            </>
          )}
          
          <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
        </div>
      </div>

      {/* Doraemon & Nobita Floating Characters (Visual Only) */}
      {theme === 'dora' && (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <motion.div
            initial={{ x: -100, y: 200, opacity: 0 }}
            animate={{ x: 20, y: 150, opacity: 0.1 }}
            transition={{ duration: 2, delay: 0.5 }}
            className="absolute left-0 top-1/2 text-6xl"
          >
            🤖
          </motion.div>
          <motion.div
            initial={{ x: 500, y: 400, opacity: 0 }}
            animate={{ x: 300, y: 350, opacity: 0.1 }}
            transition={{ duration: 2, delay: 1 }}
            className="absolute right-0 bottom-1/4 text-6xl"
          >
            👦
          </motion.div>
        </div>
      )}

      {/* Daily Study Goal - Unique Feature */}
      <div className="px-4 mb-6">
        <div className="bg-bg-card rounded-2xl p-5 border-2 border-border-main shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-center mb-4 relative z-10">
            <div>
              <h3 className="font-bold text-text-main text-sm">Daily Study Goal</h3>
              <p className="text-[10px] text-text-muted">You&apos;re doing great, John!</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
              60%
            </div>
          </div>
          
          <div className="space-y-3 relative z-10">
            <div className="w-full bg-bg-page rounded-full h-2.5 overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '60%' }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="bg-primary h-full rounded-full"
              ></motion.div>
            </div>
            <div className="flex justify-between text-[10px] font-bold text-text-muted">
              <span>3h 45m studied</span>
              <span>Goal: 6h</span>
            </div>
          </div>

          {/* Decorative background element */}
          <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-primary/5 rounded-full blur-xl"></div>
        </div>
      </div>

      {/* Dora's Tip of the Day - Unique Feature */}
      {theme === 'dora' && (
        <div className="px-4 mb-6">
          <motion.div 
            whileHover={{ y: -2 }}
            className="bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl p-4 border-2 border-accent/20 flex gap-4 items-start"
          >
            <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white shrink-0 shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-xs text-accent uppercase tracking-wider mb-1">Dora&apos;s Tip of the Day</h4>
              <p className="text-sm text-text-main leading-relaxed">
                &quot;Try the <strong>Pomodoro Technique</strong>! Study for 25 minutes, then take a 5-minute break. It helps you stay focused like Nobita when he&apos;s actually trying!&quot;
              </p>
            </div>
          </motion.div>
        </div>
      )}

      {/* AI Study Helper Section */}
      <div className="px-4 mb-6">
        <div className="bg-bg-card rounded-2xl p-4 border-2 border-border-main shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
            <Bot className="w-6 h-6 text-primary" />
          </div>
          <div className="flex-1">
            <h3 className="font-bold text-sm text-text-main">AI Study Helper</h3>
            <p className="text-[10px] text-text-muted">Ask any doubt, get instant solutions!</p>
          </div>
          <button 
            onClick={() => {
              const btn = document.querySelector('button.fixed.bottom-24.right-4') as HTMLButtonElement;
              btn?.click();
            }}
            className="bg-primary text-white text-[10px] font-bold py-1.5 px-3 rounded-lg shadow-sm hover:opacity-90 transition-opacity"
          >
            Try Now
          </button>
        </div>
      </div>

      {/* One-Tap Schedule - Unique Feature */}
      <div className="px-4 mb-6">
        <button className="w-full bg-gradient-to-r from-indigo-600 to-primary p-4 rounded-2xl text-white shadow-lg flex items-center justify-between group hover:scale-[1.02] transition-all active:scale-95">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
              <Play className="w-6 h-6 fill-white" />
            </div>
            <div className="text-left">
              <h3 className="font-bold text-sm">Start Today&apos;s Schedule</h3>
              <p className="text-[10px] text-white/70">Next: Physics - Rotational Motion</p>
            </div>
          </div>
          <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* AI 4D Pocket */}
      <AIPocket />

      {/* Voice Assistant Floating Button - Unique Feature */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-40 right-4 w-12 h-12 bg-accent rounded-full shadow-lg shadow-accent/20 flex items-center justify-center text-white z-40 border-2 border-white"
        onClick={() => {
          // Simulated voice assistant activation
          alert("Doraemon is listening... (Voice Assistant Feature Coming Soon!)");
        }}
      >
        <div className="relative">
          <Bot className="w-5 h-5" />
          <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -inset-2 bg-white rounded-full -z-10"
          ></motion.div>
        </div>
      </motion.button>

      {/* Quick Links */}
      <div className="px-4 mb-6 grid grid-cols-4 gap-3">
        <Link href="/mock-test" className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-red-100 text-[#E60012] flex items-center justify-center shadow-sm border border-red-50">
            <FileText className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-gray-700 text-center">Mock Tests</span>
        </Link>
        <Link href="/planner" className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-blue-100 text-[#00A0E9] flex items-center justify-center shadow-sm border border-blue-50">
            <Clock className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-gray-700 text-center">Planner</span>
        </Link>
        <Link href="/leaderboard" className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-yellow-100 text-[#FFD700] flex items-center justify-center shadow-sm border border-yellow-50">
            <Trophy className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-gray-700 text-center">Leaderboard</span>
        </Link>
        <Link href="/referral" className="flex flex-col items-center gap-2">
          <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center shadow-sm border border-purple-50">
            <Gift className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold text-gray-700 text-center">Refer & Earn</span>
        </Link>
      </div>

      {/* Categories */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900">Exams</h3>
          <Link href="/batches" className="text-indigo-600 text-sm font-medium flex items-center">
            See all <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <Link href={`/batches?category=${cat.name}`} key={cat.id} className="flex flex-col items-center gap-2 min-w-[72px] cursor-pointer hover:opacity-80">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${cat.color}`}>
                {cat.icon}
              </div>
              <span className="text-xs font-medium text-gray-700">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Live Classes */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            Live Classes
          </h3>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {LIVE_CLASSES.map((cls) => (
            <Link href={`/live/${cls.id}`} key={cls.id} className="min-w-[260px] bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden block">
              <div className="relative h-36 w-full">
                <Image src={cls.thumbnail} alt={cls.title} fill className="object-cover" referrerPolicy="no-referrer" />
                <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                  {cls.time}
                </div>
                <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm">
                  {cls.viewers} watching
                </div>
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <div className="w-12 h-12 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center">
                    <Play className="w-6 h-6 text-white fill-white" />
                  </div>
                </div>
              </div>
              <div className="p-3">
                <h4 className="font-semibold text-sm text-gray-900 line-clamp-1 mb-1">{cls.title}</h4>
                <p className="text-xs text-gray-500 flex items-center gap-1">
                  <User className="w-3 h-3" /> {cls.educator}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* NCERT Wallah Demo Videos */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-gray-900 flex items-center gap-2">
            <Youtube className="w-5 h-5 text-red-600" />
            NCERT Wallah Demos
          </h3>
          <Link href="https://www.youtube.com/@NCERTWallah" target="_blank" className="text-xs text-indigo-600 font-bold">Visit Channel</Link>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {[
            { id: 'ncert-wallah-demo-1', title: 'Light: Reflection & Refraction', class: 'Class 10', thumb: 'https://picsum.photos/seed/ncert1/400/225' },
            { id: 'ncert-wallah-demo-2', title: 'Solutions in 1 Shot', class: 'Class 12', thumb: 'https://picsum.photos/seed/ncert2/400/225' },
          ].map((video) => (
            <Link href={`/video/${video.id}`} key={video.id} className="min-w-[200px] bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden block group">
              <div className="relative h-28 w-full">
                <Image src={video.thumb} alt={video.title} fill className="object-cover group-hover:scale-105 transition-transform duration-300" referrerPolicy="no-referrer" />
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center shadow-lg">
                    <Play className="w-4 h-4 text-white fill-white" />
                  </div>
                </div>
                <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[8px] px-1 rounded">
                  Demo
                </div>
              </div>
              <div className="p-2">
                <h4 className="font-bold text-[11px] text-gray-900 line-clamp-1 mb-0.5">{video.title}</h4>
                <p className="text-[10px] text-gray-500">{video.class} • NCERT Wallah</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Batches */}
      <div className="px-4 mb-6">
        <h3 className="font-bold text-gray-900 mb-3">Popular Batches</h3>
        <div className="flex flex-col gap-4">
          {POPULAR_BATCHES.map((batch) => (
            <div key={batch.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
              <Link href={`/course/${batch.id}`} className="relative h-40 w-full block">
                <Image src={batch.image} alt={batch.title} fill className="object-cover" referrerPolicy="no-referrer" />
                <div className="absolute top-2 left-2 bg-indigo-600 text-white text-[10px] font-bold px-2 py-1 rounded">
                  BESTSELLER
                </div>
              </Link>
              <div className="p-4">
                <div className="flex justify-between items-start mb-1">
                  <Link href={`/course/${batch.id}`}>
                    <h4 className="font-bold text-gray-900 hover:text-indigo-600 transition-colors">{batch.title}</h4>
                  </Link>
                  <div className="flex items-center gap-1 text-xs font-medium text-amber-500 bg-amber-50 px-1.5 py-0.5 rounded">
                    <Star className="w-3 h-3 fill-amber-500" /> {batch.rating}
                  </div>
                </div>
                <p className="text-xs text-gray-500 mb-3">{batch.description}</p>
                
                <div className="flex items-center gap-3 text-xs text-gray-600 mb-4">
                  <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> 500+ Hrs</span>
                  <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {batch.students}</span>
                </div>

                <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg text-gray-900">{batch.price}</span>
                      <span className="text-xs text-gray-400 line-through">{batch.originalPrice}</span>
                    </div>
                    <span className="text-[10px] text-green-600 font-bold">{batch.discount}</span>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/course/${batch.id}?demo=true`} className="bg-amber-50 text-amber-600 font-semibold text-xs px-3 py-2 rounded-lg border border-amber-200">
                      Demo Class
                    </Link>
                    <Link href={`/course/${batch.id}`} className="bg-indigo-600 text-white font-semibold text-xs px-4 py-2 rounded-lg">
                      Explore
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
