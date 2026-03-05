'use client';

import { PlayCircle, BookOpen, Clock, Search, Calendar, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import BottomNav from '@/components/BottomNav';
import { useTheme } from '@/lib/ThemeContext';

const ENROLLED_COURSES = [
  {
    id: 'lakshya-jee-2026',
    title: 'Lakshya JEE 2026',
    educator: 'Physics Wallah Team',
    progress: 45,
    lastWatched: 'Rotational Motion - L1',
    image: 'https://picsum.photos/seed/jee/400/225',
  },
  {
    id: 'yakeen-neet-2026',
    title: 'Yakeen NEET 2026',
    educator: 'NEET Experts',
    progress: 12,
    lastWatched: 'Chemical Bonding Intro',
    image: 'https://picsum.photos/seed/neet/400/225',
  },
];

const UPCOMING_DEADLINES = [
  {
    id: 'd1',
    title: 'Rotational Motion Assignment',
    course: 'Lakshya JEE 2026',
    date: 'Today, 11:59 PM',
    type: 'assignment',
    urgent: true,
  },
  {
    id: 'd2',
    title: 'Chemical Bonding Quiz',
    course: 'Yakeen NEET 2026',
    date: 'Tomorrow, 10:00 AM',
    type: 'quiz',
    urgent: false,
  },
  {
    id: 'd3',
    title: 'Physics Mock Test 1',
    course: 'Lakshya JEE 2026',
    date: 'Sunday, 2:00 PM',
    type: 'test',
    urgent: false,
  }
];

export default function LearnPage() {
  const { theme } = useTheme();

  return (
    <div className={`flex-1 flex flex-col min-h-screen pb-20 ${theme === 'dora' ? 'bg-blue-50' : 'bg-gray-50'}`}>
      <div className={`p-4 border-b sticky top-0 z-10 ${theme === 'dora' ? 'bg-white border-blue-100' : 'bg-white border-gray-100'}`}>
        <h1 className={`text-xl font-bold ${theme === 'dora' ? 'text-blue-900' : 'text-gray-900'}`}>Student Dashboard</h1>
        <p className={`text-xs ${theme === 'dora' ? 'text-blue-600' : 'text-gray-500'}`}>Track your progress and deadlines</p>
      </div>

      <div className="p-4 space-y-6">
        {/* Progress Overview */}
        <section>
          <div className="grid grid-cols-2 gap-3">
            <div className={`p-4 rounded-2xl border ${theme === 'dora' ? 'bg-white border-blue-100 shadow-sm' : 'bg-white border-gray-100 shadow-sm'}`}>
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className={`w-4 h-4 ${theme === 'dora' ? 'text-blue-500' : 'text-indigo-500'}`} />
                <span className={`text-xs font-bold ${theme === 'dora' ? 'text-blue-900' : 'text-gray-600'}`}>Enrolled</span>
              </div>
              <div className={`text-2xl font-black ${theme === 'dora' ? 'text-blue-900' : 'text-gray-900'}`}>
                {ENROLLED_COURSES.length}
              </div>
            </div>
            <div className={`p-4 rounded-2xl border ${theme === 'dora' ? 'bg-white border-blue-100 shadow-sm' : 'bg-white border-gray-100 shadow-sm'}`}>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className={`w-4 h-4 ${theme === 'dora' ? 'text-green-500' : 'text-green-500'}`} />
                <span className={`text-xs font-bold ${theme === 'dora' ? 'text-blue-900' : 'text-gray-600'}`}>Completed</span>
              </div>
              <div className={`text-2xl font-black ${theme === 'dora' ? 'text-blue-900' : 'text-gray-900'}`}>
                0
              </div>
            </div>
          </div>
        </section>

        {/* Upcoming Deadlines */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className={`font-bold ${theme === 'dora' ? 'text-blue-900' : 'text-gray-900'}`}>Upcoming Deadlines</h2>
            <Link href="#" className={`text-xs font-bold ${theme === 'dora' ? 'text-blue-600' : 'text-indigo-600'}`}>View All</Link>
          </div>
          <div className="space-y-3">
            {UPCOMING_DEADLINES.map((deadline) => (
              <div key={deadline.id} className={`flex items-start gap-3 p-3 rounded-xl border ${theme === 'dora' ? 'bg-white border-blue-100' : 'bg-white border-gray-100'}`}>
                <div className={`mt-0.5 p-2 rounded-lg ${deadline.urgent ? 'bg-red-50 text-red-500' : theme === 'dora' ? 'bg-blue-50 text-blue-500' : 'bg-indigo-50 text-indigo-500'}`}>
                  {deadline.urgent ? <AlertCircle className="w-4 h-4" /> : <Calendar className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <h3 className={`font-bold text-sm ${theme === 'dora' ? 'text-blue-900' : 'text-gray-900'}`}>{deadline.title}</h3>
                  <p className={`text-[10px] ${theme === 'dora' ? 'text-blue-600' : 'text-gray-500'}`}>{deadline.course}</p>
                  <div className={`flex items-center gap-1 mt-1.5 text-[10px] font-bold ${deadline.urgent ? 'text-red-600' : theme === 'dora' ? 'text-blue-700' : 'text-gray-600'}`}>
                    <Clock className="w-3 h-3" />
                    {deadline.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Enrolled Courses */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className={`font-bold ${theme === 'dora' ? 'text-blue-900' : 'text-gray-900'}`}>My Courses</h2>
          </div>
          
          {/* Search */}
          <div className="relative mb-4">
            <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${theme === 'dora' ? 'text-blue-400' : 'text-gray-400'}`} />
            <input 
              type="text" 
              placeholder="Search your courses..." 
              className={`w-full pl-10 pr-4 py-2.5 bg-white border rounded-xl text-sm focus:ring-2 outline-none transition-all ${
                theme === 'dora' 
                  ? 'border-blue-200 focus:ring-blue-500 text-blue-900 placeholder-blue-300' 
                  : 'border-gray-200 focus:ring-indigo-500 text-gray-900 placeholder-gray-400'
              }`}
            />
          </div>

          {/* Course List */}
          <div className="space-y-4">
            {ENROLLED_COURSES.map((course) => (
              <div key={course.id} className={`bg-white rounded-2xl shadow-sm border overflow-hidden ${theme === 'dora' ? 'border-blue-100' : 'border-gray-100'}`}>
                <div className="flex p-3 gap-3">
                  <div className="relative w-28 h-20 rounded-xl overflow-hidden shrink-0">
                    <Image src={course.image} alt={course.title} fill className="object-cover" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <PlayCircle className="w-8 h-8 text-white fill-white/20 backdrop-blur-sm rounded-full" />
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col justify-between py-0.5">
                    <div>
                      <h3 className={`font-bold text-sm line-clamp-1 ${theme === 'dora' ? 'text-blue-900' : 'text-gray-900'}`}>{course.title}</h3>
                      <p className={`text-[10px] mb-1 ${theme === 'dora' ? 'text-blue-600' : 'text-gray-500'}`}>{course.educator}</p>
                    </div>
                    <div className={`flex items-center gap-1.5 text-[10px] font-bold ${theme === 'dora' ? 'text-red-500' : 'text-indigo-600'}`}>
                      <Clock className="w-3 h-3" />
                      Last: {course.lastWatched}
                    </div>
                  </div>
                </div>
                
                <div className="px-3 pb-3">
                  <div className="flex justify-between text-[10px] mb-1.5">
                    <span className={`font-bold ${theme === 'dora' ? 'text-blue-600' : 'text-gray-500'}`}>Overall Progress</span>
                    <span className={`font-bold ${theme === 'dora' ? 'text-red-500' : 'text-indigo-600'}`}>{course.progress}%</span>
                  </div>
                  <div className={`w-full rounded-full h-1.5 mb-3 ${theme === 'dora' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                    <div className={`h-1.5 rounded-full transition-all duration-500 ${theme === 'dora' ? 'bg-red-500' : 'bg-indigo-600'}`} style={{ width: `${course.progress}%` }}></div>
                  </div>
                  <Link href={`/course/${course.id}`} className={`w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center transition-colors ${
                    theme === 'dora'
                      ? 'bg-blue-50 text-blue-700 hover:bg-blue-100'
                      : 'bg-indigo-50 text-indigo-600 hover:bg-indigo-100'
                  }`}>
                    Continue Learning
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {ENROLLED_COURSES.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-4 ${theme === 'dora' ? 'bg-blue-50' : 'bg-gray-100'}`}>
                <BookOpen className={`w-10 h-10 ${theme === 'dora' ? 'text-blue-200' : 'text-gray-300'}`} />
              </div>
              <h3 className={`font-bold mb-1 ${theme === 'dora' ? 'text-blue-900' : 'text-gray-900'}`}>No courses yet</h3>
              <p className={`text-sm mb-6 ${theme === 'dora' ? 'text-blue-600' : 'text-gray-500'}`}>Explore our batches to start learning.</p>
              <Link href="/batches" className={`text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg ${
                theme === 'dora'
                  ? 'bg-red-500 shadow-red-200'
                  : 'bg-indigo-600 shadow-indigo-100'
              }`}>
                Browse Batches
              </Link>
            </div>
          )}
        </section>
      </div>

      <BottomNav />
    </div>
  );
}
