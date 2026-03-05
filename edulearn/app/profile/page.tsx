'use client';

import { useState } from 'react';
import BottomNav from '@/components/BottomNav';
import { Settings, LogOut, ChevronRight, BookOpen, Award, Clock, PlayCircle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Profile() {
  const [isInstructor] = useState(true); // Mocking instructor privilege

  return (
    <div className="flex-1 overflow-y-auto pb-20 bg-bg-page/20">
      {/* Header */}
      <div className="bg-primary px-4 pt-8 pb-16 relative border-b-4 border-accent transition-colors duration-300">
        <div className="flex justify-between items-start mb-6">
          <h1 className="text-2xl font-bold text-white">Profile</h1>
          <Link href="/settings" className="text-white/80 hover:text-white p-2 -mr-2 bg-white/10 rounded-full backdrop-blur-md transition-colors">
            <Settings className="w-6 h-6" />
          </Link>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-bg-card border-4 border-primary/20 flex items-center justify-center text-primary text-2xl font-bold shadow-lg">
            JD
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">John Doe</h2>
            <p className="text-white/80 text-sm">john.doe@example.com</p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-4 -mt-8 relative z-10 mb-6">
        <div className="bg-bg-card rounded-2xl shadow-md border-2 border-border-main p-4 flex justify-between">
          <div className="flex flex-col items-center flex-1 border-r border-border-main">
            <span className="text-2xl font-bold text-primary">12</span>
            <span className="text-xs text-text-muted font-bold uppercase tracking-wider">Courses</span>
          </div>
          <div className="flex flex-col items-center flex-1 border-r border-border-main">
            <span className="text-2xl font-bold text-primary">45</span>
            <span className="text-xs text-text-muted font-bold uppercase tracking-wider">Hours</span>
          </div>
          <div className="flex flex-col items-center flex-1">
            <span className="text-2xl font-bold text-primary">3</span>
            <span className="text-xs text-text-muted font-bold uppercase tracking-wider">Certificates</span>
          </div>
        </div>
      </div>

      {/* Enrolled Courses */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-text-main">My Courses</h3>
          <Link href="/batches" className="text-primary text-sm font-bold">View All</Link>
        </div>
        
        <div className="space-y-3">
          {/* Course 1 */}
          <div className="bg-bg-card rounded-xl shadow-sm border-2 border-border-main p-3 flex gap-3">
            <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0">
              <Image src="https://picsum.photos/seed/jee/200/200" alt="Course" fill className="object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-sm text-text-main line-clamp-1">Lakshya JEE 2026</h4>
                <p className="text-xs text-text-muted">Physics, Chemistry, Math</p>
              </div>
              
              <div>
                <div className="flex justify-between text-[10px] mb-1">
                  <span className="font-bold text-text-muted uppercase">Progress</span>
                  <span className="font-bold text-primary">45%</span>
                </div>
                <div className="w-full bg-bg-page rounded-full h-2 overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Course 2 */}
          <div className="bg-bg-card rounded-xl shadow-sm border-2 border-border-main p-3 flex gap-3">
            <div className="relative w-24 h-24 rounded-lg overflow-hidden shrink-0">
              <Image src="https://picsum.photos/seed/neet/200/200" alt="Course" fill className="object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-sm text-text-main line-clamp-1">Yakeen NEET 2026</h4>
                <p className="text-xs text-text-muted">Physics, Chemistry, Biology</p>
              </div>
              
              <div>
                <div className="flex justify-between text-[10px] mb-1">
                  <span className="font-bold text-text-muted uppercase">Progress</span>
                  <span className="font-bold text-primary">12%</span>
                </div>
                <div className="w-full bg-bg-page rounded-full h-2 overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: '12%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Options */}
      <div className="px-4 mb-6">
        <div className="bg-bg-card rounded-2xl shadow-sm border-2 border-border-main overflow-hidden">
          {isInstructor && (
            <Link href="/instructor/dashboard" className="flex items-center justify-between p-4 border-b border-border-main hover:bg-bg-page transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
                <span className="font-bold text-text-main text-sm">Instructor Dashboard</span>
              </div>
              <ChevronRight className="w-5 h-5 text-text-muted" />
            </Link>
          )}
          <Link href="/referral" className="flex items-center justify-between p-4 border-b border-border-main hover:bg-bg-page transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center">
                <Award className="w-4 h-4" />
              </div>
              <span className="font-bold text-text-main text-sm">Refer & Earn</span>
            </div>
            <ChevronRight className="w-5 h-5 text-text-muted" />
          </Link>
          <Link href="/planner" className="flex items-center justify-between p-4 border-b border-border-main hover:bg-bg-page transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-primary flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <span className="font-bold text-text-main text-sm">Study Planner</span>
            </div>
            <ChevronRight className="w-5 h-5 text-text-muted" />
          </Link>
          <Link href="/history" className="w-full flex items-center justify-between p-4 border-b border-border-main hover:bg-bg-page transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-green-100 text-green-600 flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <span className="font-bold text-text-main text-sm">Watch History</span>
            </div>
            <ChevronRight className="w-5 h-5 text-text-muted" />
          </Link>
          <Link href="/login" className="w-full flex items-center justify-between p-4 hover:bg-red-50 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-red-100 text-accent flex items-center justify-center">
                <LogOut className="w-4 h-4" />
              </div>
              <span className="font-bold text-accent text-sm">Log Out</span>
            </div>
          </Link>
        </div>
      </div>

      <BottomNav />
    </div>
  );
}
