'use client';

import { ChevronLeft, Star, Users, PlayCircle, Award, BookOpen, CheckCircle2, Briefcase, GraduationCap, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function EducatorProfile() {
  return (
    <div className="flex-1 flex flex-col bg-gray-50 min-h-screen pb-20">
      {/* Header */}
      <div className="relative h-48 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="absolute top-0 w-full p-4 flex items-center justify-between z-10">
          <Link href="/" className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white">
            <ChevronLeft className="w-6 h-6" />
          </Link>
        </div>
        <div className="absolute -bottom-12 left-6 flex items-end gap-4">
          <div className="w-24 h-24 rounded-2xl border-4 border-white overflow-hidden relative bg-white shadow-md">
            <Image src="https://picsum.photos/seed/alakh/200/200" alt="Educator" fill className="object-cover" referrerPolicy="no-referrer" />
          </div>
        </div>
      </div>

      <div className="px-6 pt-16 pb-6 bg-white border-b border-gray-100">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Alakh Pandey</h1>
            <p className="text-sm text-gray-500">Physics Expert • B.Tech Mechanical</p>
          </div>
          <button className="bg-indigo-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-sm hover:bg-indigo-700">
            Follow
          </button>
        </div>
        
        <p className="text-sm text-gray-600 mt-4 leading-relaxed">
          Passionate physics educator with 8+ years of experience. Known for making complex concepts easy to understand through real-life examples. Helped 10,000+ students clear JEE & NEET.
        </p>

        <div className="mt-6">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Expertise</h3>
          <div className="flex flex-wrap gap-2">
            {['Quantum Mechanics', 'Electromagnetism', 'Optics', 'Thermodynamics', 'JEE Advanced'].map((tag) => (
              <span key={tag} className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full text-xs font-medium border border-indigo-100">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-6 mt-8">
          <div className="flex flex-col">
            <span className="text-lg font-bold text-gray-900 flex items-center gap-1">
              4.9 <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            </span>
            <span className="text-xs text-gray-500">Rating</span>
          </div>
          <div className="w-px h-8 bg-gray-200"></div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-gray-900">5M+</span>
            <span className="text-xs text-gray-500">Watch Mins</span>
          </div>
          <div className="w-px h-8 bg-gray-200"></div>
          <div className="flex flex-col">
            <span className="text-lg font-bold text-gray-900">150K</span>
            <span className="text-xs text-gray-500">Followers</span>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* About More */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-3">About Alakh Sir</h3>
          <p className="text-sm text-gray-600 leading-relaxed mb-4">
            Alakh Pandey, popularly known as &quot;Physics Wallah,&quot; has revolutionized the way physics is taught in India. With a unique teaching style that blends humor with deep conceptual clarity, he has become a household name for JEE and NEET aspirants.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Students Mentored</p>
              <p className="text-sm font-bold text-gray-900">10 Lakh+</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-xl border border-gray-100">
              <p className="text-[10px] text-gray-500 uppercase font-bold mb-1">Selections</p>
              <p className="text-sm font-bold text-gray-900">15,000+ in IITs</p>
            </div>
          </div>
        </div>

        {/* Experience & Education */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-amber-50 text-amber-600 rounded-lg">
                <Briefcase className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-gray-900">Experience</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0"></div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Senior Physics Faculty</p>
                  <p className="text-xs text-gray-500">Allen Career Institute • 2018 - Present</p>
                </div>
              </li>
              <li className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-1.5 shrink-0"></div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Physics Educator</p>
                  <p className="text-xs text-gray-500">Unacademy • 2015 - 2018</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <GraduationCap className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-gray-900">Education</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0"></div>
                <div>
                  <p className="text-sm font-bold text-gray-900">B.Tech in Mechanical Engineering</p>
                  <p className="text-xs text-gray-500">IIT Kanpur • Class of 2014</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Certifications */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
              <Award className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-gray-900">Certifications & Awards</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              'Best Educator Award 2022',
              'Certified Physics Professional',
              'Top 1% Mentor - JEE Advanced',
              'Innovation in Teaching Award',
            ].map((award) => (
              <div key={award} className="flex items-center gap-2 p-3 bg-purple-50/30 border border-purple-100 rounded-xl">
                <CheckCircle2 className="w-4 h-4 text-purple-600" />
                <span className="text-xs font-bold text-gray-700">{award}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Ratings Breakdown */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-900">Student Reviews</h3>
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-4 h-4 fill-current" /> 4.9 (12.4k reviews)
            </div>
          </div>
          
          <div className="space-y-3">
            {[
              { label: 'Teaching Style', rating: 4.9 },
              { label: 'Doubt Resolution', rating: 4.7 },
              { label: 'Course Material', rating: 4.8 },
              { label: 'Engagement', rating: 5.0 },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-600 font-medium">{item.label}</span>
                  <span className="text-gray-900 font-bold">{item.rating}</span>
                </div>
                <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-500 rounded-full" 
                    style={{ width: `${(item.rating / 5) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Student Testimonials */}
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-4">What Students Say</h3>
          <div className="space-y-4">
            {[
              { name: 'Rahul Sharma', text: 'Alakh sir is the best! His physics lectures are so engaging and easy to understand.', rating: 5 },
              { name: 'Priya Verma', text: 'I was struggling with mechanics, but after watching sir\'s videos, everything became clear.', rating: 5 },
              { name: 'Amit Kumar', text: 'The way sir explains complex concepts is just amazing. Highly recommended!', rating: 4 },
            ].map((testimonial, i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-gray-900">{testimonial.name}</span>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className={`w-3 h-3 ${j < testimonial.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`} />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-gray-600 italic">&quot;{testimonial.text}&quot;</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-bold text-gray-900 mb-4 px-1">Batches by Alakh Sir</h2>
          
          <div className="space-y-4">
          {/* Course 1 */}
          <Link href="/course/lakshya-jee-2026" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
            <div className="relative h-36 w-full">
              <Image src="https://picsum.photos/seed/jee/400/225" alt="Course" fill className="object-cover" referrerPolicy="no-referrer" />
              <div className="absolute top-2 left-2 bg-indigo-600 text-white text-[10px] font-bold px-2 py-1 rounded">
                LIVE
              </div>
            </div>
            <div className="p-4">
              <h4 className="font-bold text-gray-900 mb-1">Lakshya JEE 2026</h4>
              <p className="text-xs text-gray-500 mb-3">Complete Class 12th + JEE Main & Advanced</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-gray-600">
                  <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> Physics</span>
                </div>
                <span className="font-bold text-indigo-600">₹4,500</span>
              </div>
            </div>
          </Link>

          {/* Course 2 */}
          <Link href="/course/yakeen-neet-2026" className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
            <div className="relative h-36 w-full">
              <Image src="https://picsum.photos/seed/neet/400/225" alt="Course" fill className="object-cover" referrerPolicy="no-referrer" />
            </div>
            <div className="p-4">
              <h4 className="font-bold text-gray-900 mb-1">Yakeen NEET 2026</h4>
              <p className="text-xs text-gray-500 mb-3">Dropper Batch for NEET 2026</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-xs text-gray-600">
                  <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" /> Physics</span>
                </div>
                <span className="font-bold text-indigo-600">₹4,000</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  </div>
);
}
