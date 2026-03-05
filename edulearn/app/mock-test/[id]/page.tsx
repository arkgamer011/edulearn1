'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, Clock, AlertCircle, CheckCircle, ChevronRight, Menu } from 'lucide-react';
import Link from 'next/link';

export default function TestInterface({ params }: { params: Promise<{ id: string }> }) {
  const [timeLeft, setTimeLeft] = useState(180 * 60); // 180 mins in seconds
  const [currentQuestion, setCurrentQuestion] = useState(1);
  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex-1 flex flex-col bg-white min-h-screen relative">
      {/* Header */}
      <div className="bg-gray-900 text-white p-3 flex items-center justify-between sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <Link href="/mock-test" className="text-gray-400 hover:text-white">
            <ChevronLeft className="w-6 h-6" />
          </Link>
          <div>
            <h1 className="text-sm font-bold line-clamp-1">AITS Full Syllabus Test - 1</h1>
            <p className="text-[10px] text-gray-400">JEE Main Pattern</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-gray-800 px-3 py-1.5 rounded-lg border border-gray-700">
            <Clock className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-mono font-bold text-amber-400">{formatTime(timeLeft)}</span>
          </div>
          <button onClick={() => setShowPanel(!showPanel)} className="p-1 bg-gray-800 rounded lg:hidden">
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Main Content */}
        <div className="flex-1 flex flex-col relative">
          {/* Subject Tabs */}
          <div className="flex border-b border-gray-200 bg-gray-50">
            <button className="flex-1 py-2 text-sm font-bold text-indigo-600 border-b-2 border-indigo-600 bg-white">Physics</button>
            <button className="flex-1 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100">Chemistry</button>
            <button className="flex-1 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100">Maths</button>
          </div>

          {/* Question Area */}
          <div className="flex-1 overflow-y-auto p-4 pb-24">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-bold text-gray-900">Question {currentQuestion}</span>
              <div className="flex items-center gap-2 text-xs font-medium">
                <span className="text-green-600 bg-green-50 px-2 py-1 rounded">+4</span>
                <span className="text-red-600 bg-red-50 px-2 py-1 rounded">-1</span>
              </div>
            </div>

            <div className="prose prose-sm max-w-none mb-8">
              <p className="text-gray-800 text-base leading-relaxed">
                A particle of mass m is moving in a circular path of constant radius r such that its centripetal acceleration ac is varying with time t as ac = k²rt², where k is a constant. The power delivered to the particle by the forces acting on it is:
              </p>
            </div>

            <div className="space-y-3">
              {['2πmk²r²t', 'mk²r²t', 'mk²r²t²/3', 'Zero'].map((opt, idx) => (
                <label key={idx} className="flex items-center p-4 border border-gray-200 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                  <input type="radio" name="q1" className="w-4 h-4 text-indigo-600 focus:ring-indigo-500" />
                  <span className="ml-3 text-sm text-gray-700">{opt}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="absolute bottom-0 w-full bg-white border-t border-gray-200 p-3 flex items-center justify-between gap-2 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
            <button className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50">
              Clear
            </button>
            <button className="px-4 py-2 text-sm font-medium text-amber-600 border border-amber-300 bg-amber-50 rounded-lg hover:bg-amber-100">
              Mark for Review
            </button>
            <button 
              onClick={() => setCurrentQuestion(prev => Math.min(prev + 1, 30))}
              className="px-6 py-2 text-sm font-bold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 flex items-center gap-1"
            >
              Save & Next <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Side Panel (Questions Palette) */}
        <div className={`absolute lg:relative right-0 top-0 h-full w-64 bg-gray-50 border-l border-gray-200 transform transition-transform duration-300 z-10 ${showPanel ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}`}>
          <div className="p-4 border-b border-gray-200 bg-white">
            <h3 className="font-bold text-sm text-gray-900 mb-3">Physics Palette</h3>
            <div className="grid grid-cols-2 gap-2 text-[10px] font-medium">
              <div className="flex items-center gap-1"><div className="w-4 h-4 rounded bg-green-500 text-white flex items-center justify-center">1</div> Answered</div>
              <div className="flex items-center gap-1"><div className="w-4 h-4 rounded bg-red-500 text-white flex items-center justify-center">2</div> Not Answered</div>
              <div className="flex items-center gap-1"><div className="w-4 h-4 rounded bg-gray-200 text-gray-600 flex items-center justify-center">25</div> Not Visited</div>
              <div className="flex items-center gap-1"><div className="w-4 h-4 rounded bg-amber-500 text-white flex items-center justify-center">2</div> Marked</div>
            </div>
          </div>
          <div className="p-4 overflow-y-auto h-[calc(100%-180px)]">
            <div className="grid grid-cols-5 gap-2">
              {Array.from({length: 30}).map((_, i) => (
                <button 
                  key={i}
                  onClick={() => setCurrentQuestion(i + 1)}
                  className={`w-8 h-8 rounded text-xs font-bold flex items-center justify-center
                    ${i + 1 === currentQuestion ? 'ring-2 ring-indigo-600 ring-offset-1' : ''}
                    ${i === 0 ? 'bg-green-500 text-white' : 
                      i === 1 || i === 2 ? 'bg-red-500 text-white' : 
                      i === 3 || i === 4 ? 'bg-amber-500 text-white' : 
                      'bg-white border border-gray-300 text-gray-600 hover:bg-gray-100'}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
          <div className="absolute bottom-0 w-full p-4 bg-white border-t border-gray-200">
            <button className="w-full py-2 bg-green-600 text-white text-sm font-bold rounded-lg hover:bg-green-700">
              Submit Test
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
