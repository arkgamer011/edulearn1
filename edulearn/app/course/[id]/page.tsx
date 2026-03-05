'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { ChevronLeft, Star, Users, BookOpen, Clock, Play, CheckCircle2, Share2, Heart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'motion/react';

const COURSES: Record<string, any> = {
  'lakshya-jee-2026': {
    title: 'Lakshya JEE 2026',
    description: 'Complete Class 12th + JEE Main & Advanced preparation with India\'s top educators.',
    price: '₹4,500',
    originalPrice: '₹6,000',
    rating: 4.9,
    students: '50,000+',
    image: 'https://picsum.photos/seed/jee/800/450',
    curriculum: [
      { title: 'Physics: Electrostatics', duration: '12 Lectures' },
      { title: 'Chemistry: Solid State', duration: '10 Lectures' },
      { title: 'Math: Relations & Functions', duration: '15 Lectures' },
    ]
  },
  'yakeen-neet-2026': {
    title: 'Yakeen NEET 2026',
    description: 'The ultimate dropper batch for NEET 2026. Zero to Hero level preparation.',
    price: '₹4,000',
    originalPrice: '₹5,500',
    rating: 4.8,
    students: '80,000+',
    image: 'https://picsum.photos/seed/neet/800/450',
    curriculum: [
      { title: 'Biology: Cell Biology', duration: '20 Lectures' },
      { title: 'Physics: Kinematics', duration: '15 Lectures' },
      { title: 'Chemistry: Mole Concept', duration: '12 Lectures' },
    ]
  }
};

export default function CourseDetail() {
  const params = useParams();
  const id = params.id as string;
  const course = COURSES[id] || COURSES['lakshya-jee-2026'];

  return (
    <div className="flex flex-col min-h-screen bg-bg-page pb-24">
      {/* Hero Section */}
      <div className="relative h-64 w-full">
        <Image src={course.image} alt={course.title} fill className="object-cover" referrerPolicy="no-referrer" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
          <Link href="/" className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <div className="flex gap-2">
            <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 bg-white/20 backdrop-blur-md rounded-full text-white">
              <Heart className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="absolute bottom-6 left-6 right-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Bestseller</span>
            <div className="flex items-center gap-1 text-yellow-400 text-xs font-bold">
              <Star className="w-3 h-3 fill-yellow-400" /> {course.rating}
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">{course.title}</h1>
          <p className="text-white/70 text-xs line-clamp-1">{course.description}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-bg-card p-3 rounded-2xl border border-border-main flex flex-col items-center">
            <Users className="w-5 h-5 text-primary mb-1" />
            <span className="text-xs font-bold text-text-main">{course.students}</span>
            <span className="text-[10px] text-text-muted uppercase">Students</span>
          </div>
          <div className="bg-bg-card p-3 rounded-2xl border border-border-main flex flex-col items-center">
            <BookOpen className="w-5 h-5 text-green-500 mb-1" />
            <span className="text-xs font-bold text-text-main">500+</span>
            <span className="text-[10px] text-text-muted uppercase">Lectures</span>
          </div>
          <div className="bg-bg-card p-3 rounded-2xl border border-border-main flex flex-col items-center">
            <Clock className="w-5 h-5 text-orange-500 mb-1" />
            <span className="text-xs font-bold text-text-main">2 Years</span>
            <span className="text-[10px] text-text-muted uppercase">Validity</span>
          </div>
        </div>

        {/* Description */}
        <div>
          <h3 className="font-bold text-text-main mb-2">About this course</h3>
          <p className="text-sm text-text-muted leading-relaxed">
            {course.description} This batch is designed to provide a comprehensive learning experience for students aiming for top ranks. Includes live classes, recorded lectures, DPPS, and test series.
          </p>
        </div>

        {/* Curriculum */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-text-main">Curriculum</h3>
            <span className="text-xs font-bold text-primary">View All</span>
          </div>
          <div className="space-y-3">
            {course.curriculum.map((item: any, idx: number) => (
              <div key={idx} className="bg-bg-card p-4 rounded-2xl border border-border-main flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-text-main">{item.title}</h4>
                    <p className="text-[10px] text-text-muted">{item.duration}</p>
                  </div>
                </div>
                <Play className="w-4 h-4 text-text-muted" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-bg-card border-t border-border-main flex items-center justify-between z-50">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-text-main">{course.price}</span>
            <span className="text-xs text-text-muted line-through">{course.originalPrice}</span>
          </div>
          <p className="text-[10px] text-green-600 font-bold">LIMITED TIME OFFER</p>
        </div>
        <button className="bg-primary text-white font-bold py-3 px-8 rounded-2xl shadow-lg shadow-primary/20 hover:opacity-90 transition-all active:scale-95">
          Buy Now
        </button>
      </div>
    </div>
  );
}
