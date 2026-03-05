'use client';

import { Plus, BookOpen, Users, DollarSign, BarChart3, ChevronRight, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function InstructorDashboard() {
  return (
    <div className="flex-1 overflow-y-auto pb-20 bg-gray-50">
      <div className="bg-white p-4 border-b border-gray-100 flex justify-between items-center sticky top-0 z-10">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Instructor Panel</h1>
          <p className="text-xs text-gray-500">Manage your courses & earnings</p>
        </div>
        <Link href="/profile" className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-bold">
          JD
        </Link>
      </div>

      <div className="p-4">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 text-gray-500 mb-2">
              <Users className="w-4 h-4" />
              <span className="text-xs font-medium">Total Students</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">12.5K</div>
            <div className="text-[10px] text-green-600 font-medium mt-1">+15% this month</div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 text-gray-500 mb-2">
              <DollarSign className="w-4 h-4" />
              <span className="text-xs font-medium">Earnings</span>
            </div>
            <div className="text-2xl font-bold text-gray-900">₹2.4L</div>
            <div className="text-[10px] text-green-600 font-medium mt-1">+8% this month</div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mb-6">
          <Link href="/instructor/course/create" className="flex-1 bg-indigo-600 text-white flex flex-col items-center justify-center py-4 rounded-xl shadow-sm hover:bg-indigo-700 transition-colors">
            <Plus className="w-6 h-6 mb-1" />
            <span className="text-sm font-bold">Create Course</span>
          </Link>
          <button 
            onClick={() => alert('Analytics feature coming soon!')}
            className="flex-1 bg-white text-gray-700 border border-gray-200 flex flex-col items-center justify-center py-4 rounded-xl shadow-sm hover:bg-gray-50 transition-colors"
          >
            <BarChart3 className="w-6 h-6 mb-1 text-indigo-600" />
            <span className="text-sm font-bold">Analytics</span>
          </button>
        </div>

        {/* My Courses */}
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-bold text-gray-900">My Courses</h2>
        </div>

        <div className="space-y-4">
          {/* Course Item */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex p-3 gap-3 border-b border-gray-50">
              <div className="relative w-24 h-16 rounded-lg overflow-hidden shrink-0">
                <Image src="https://picsum.photos/seed/jee/200/150" alt="Course" fill className="object-cover" referrerPolicy="no-referrer" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-sm text-gray-900 line-clamp-1">Lakshya JEE 2026</h3>
                  <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded">Published</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">₹4,500 • 50K Students</p>
              </div>
            </div>
            <div className="flex divide-x divide-gray-100 bg-gray-50/50">
              <Link href="/instructor/course/create?edit=lakshya-jee-2026" className="flex-1 py-2 flex items-center justify-center gap-1 text-xs font-medium text-gray-600 hover:text-indigo-600">
                <Edit className="w-3.5 h-3.5" /> Edit
              </Link>
              <button 
                onClick={() => alert('Curriculum management coming soon!')}
                className="flex-1 py-2 flex items-center justify-center gap-1 text-xs font-medium text-gray-600 hover:text-indigo-600"
              >
                <BookOpen className="w-3.5 h-3.5" /> Content
              </button>
              <button 
                onClick={() => {
                  if(confirm('Are you sure you want to delete this course?')) {
                    alert('Course deleted');
                  }
                }}
                className="flex-1 py-2 flex items-center justify-center gap-1 text-xs font-medium text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Course Item 2 */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex p-3 gap-3 border-b border-gray-50">
              <div className="relative w-24 h-16 rounded-lg overflow-hidden shrink-0 bg-gray-100 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-gray-400" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-sm text-gray-900 line-clamp-1">Crash Course Physics</h3>
                  <span className="bg-amber-100 text-amber-700 text-[10px] font-bold px-2 py-0.5 rounded">Draft</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">₹1,999 • 0 Students</p>
              </div>
            </div>
            <div className="flex divide-x divide-gray-100 bg-gray-50/50">
              <Link href="/instructor/course/create?edit=crash-course-physics" className="flex-1 py-2 flex items-center justify-center gap-1 text-xs font-medium text-gray-600 hover:text-indigo-600">
                <Edit className="w-3.5 h-3.5" /> Edit
              </Link>
              <button 
                onClick={() => alert('Curriculum management coming soon!')}
                className="flex-1 py-2 flex items-center justify-center gap-1 text-xs font-medium text-gray-600 hover:text-indigo-600"
              >
                <BookOpen className="w-3.5 h-3.5" /> Content
              </button>
              <button 
                onClick={() => {
                  if(confirm('Are you sure you want to delete this course?')) {
                    alert('Course deleted');
                  }
                }}
                className="flex-1 py-2 flex items-center justify-center gap-1 text-xs font-medium text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
