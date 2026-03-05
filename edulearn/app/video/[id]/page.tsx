'use client';

import { ChevronDown, MessageCircle, Share2, ThumbsUp, ArrowLeft, Play, Pause, Maximize, Volume2, Settings, FileText, Youtube } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useRef, useEffect, use } from 'react';

export default function VideoPlayerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [isFollowing, setIsFollowing] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Mock video data mapping
  const videoData: Record<string, { title: string, youtubeId?: string, educator: string, category: string }> = {
    'lakshya-jee-2026-0-0': {
      title: 'Kinematics L-1 | Motion in 1D',
      educator: 'Alakh Pandey',
      category: 'Lakshya JEE 2026 • Physics'
    },
    'ncert-wallah-demo-1': {
      title: 'Class 10 Physics | Light Reflection & Refraction',
      youtubeId: 'X03879-X6e4', // Example NCERT Wallah ID
      educator: 'NCERT Wallah',
      category: 'NCERT Wallah • Class 10'
    },
    'ncert-wallah-demo-2': {
      title: 'Class 12 Chemistry | Solutions in 1 Shot',
      youtubeId: 'X03879-X6e4', // Placeholder
      educator: 'NCERT Wallah',
      category: 'NCERT Wallah • Class 12'
    }
  };

  const currentVideo = videoData[id] || videoData['lakshya-jee-2026-0-0'];

  const handlePlayPause = () => {
    const nextPlaying = !isPlaying;
    setIsPlaying(nextPlaying);
    if (!nextPlaying) {
      setShowControls(true);
    }
  };

  const handleInteraction = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 3000);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Kinematics L-1 | Motion in 1D',
        text: 'Check out this lecture on EduLearn',
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  useEffect(() => {
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => setShowControls(false), 3000);
    }
    return () => {
      if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    };
  }, [isPlaying]);

  return (
    <div className="flex-1 flex flex-col bg-white min-h-screen">
      {/* Video Player Area */}
      <div 
        className="relative w-full aspect-video bg-black"
        onMouseMove={handleInteraction}
        onTouchStart={handleInteraction}
        onClick={handleInteraction}
      >
        {currentVideo.youtubeId ? (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${currentVideo.youtubeId}?autoplay=1&rel=0`}
            title={currentVideo.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        ) : (
          <>
            {/* Mock Video Content */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Image 
                src="https://picsum.photos/seed/physics-lecture/800/450" 
                alt="Video Thumbnail" 
                fill 
                className={`object-cover ${isPlaying ? 'opacity-50' : 'opacity-80'}`}
                referrerPolicy="no-referrer"
              />
              {isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3/4 h-3/4 border-2 border-white/20 rounded-lg flex items-center justify-center text-white/50 font-mono text-2xl">
                    [Video Playing...]
                  </div>
                </div>
              )}
            </div>

            {/* Video Controls Overlay */}
            <div className={`absolute inset-0 bg-black/40 transition-opacity duration-300 flex flex-col justify-between ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              {/* Top Bar */}
              <div className="p-4 flex items-center justify-between bg-gradient-to-b from-black/80 to-transparent">
                <Link href="/course/lakshya-jee-2026" className="text-white p-1">
                  <ArrowLeft className="w-6 h-6" />
                </Link>
                <div className="flex gap-4">
                  <button onClick={() => alert('Settings opened')}><Settings className="w-5 h-5 text-white" /></button>
                  <button onClick={handleShare}><Share2 className="w-5 h-5 text-white" /></button>
                </div>
              </div>

              {/* Center Play/Pause */}
              <div className="flex items-center justify-center flex-1">
                <button 
                  onClick={(e) => { e.stopPropagation(); handlePlayPause(); }}
                  className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center text-white backdrop-blur-sm hover:bg-black/70 transition-colors"
                >
                  {isPlaying ? <Pause className="w-8 h-8 fill-white" /> : <Play className="w-8 h-8 fill-white ml-1" />}
                </button>
              </div>

              {/* Bottom Controls */}
              <div className="p-4 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center gap-2 text-white text-xs font-medium mb-2">
                  <span>12:45</span>
                  <div className="flex-1 h-1 bg-white/30 rounded-full relative cursor-pointer">
                    <div className="absolute top-0 left-0 h-full w-1/3 bg-indigo-500 rounded-full"></div>
                    <div className="absolute top-1/2 left-1/3 w-3 h-3 bg-white rounded-full -translate-y-1/2 -translate-x-1/2 shadow"></div>
                  </div>
                  <span>45:00</span>
                </div>
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-4">
                    <button><Volume2 className="w-5 h-5" /></button>
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="text-sm font-medium">1.0x</button>
                    <button><Maximize className="w-5 h-5" /></button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Tabs & Content */}
      <div className="flex-1 flex flex-col">
        <div className="flex border-b border-gray-200">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`flex-1 py-3 text-sm font-bold ${activeTab === 'overview' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Overview
          </button>
          <button 
            onClick={() => setActiveTab('notes')}
            className={`flex-1 py-3 text-sm font-bold ${activeTab === 'notes' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Notes
          </button>
          <button 
            onClick={() => setActiveTab('qa')}
            className={`flex-1 py-3 text-sm font-bold ${activeTab === 'qa' ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}
          >
            Q&A
          </button>
        </div>

        <div className="p-4 flex-1 overflow-y-auto">
          {activeTab === 'overview' && (
            <>
              <h1 className="text-xl font-bold text-gray-900 mb-2">{currentVideo.title}</h1>
              <p className="text-sm text-gray-500 mb-4">{currentVideo.category}</p>

              <div className="flex items-center justify-between py-3 border-y border-gray-100 mb-6">
                <Link href="/educator/alakh-pandey" className="flex items-center gap-3 group">
                  <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden relative">
                    <Image src={currentVideo.educator === 'NCERT Wallah' ? 'https://picsum.photos/seed/ncert/100/100' : 'https://picsum.photos/seed/alakh/100/100'} alt="Educator" fill className="object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-gray-900 group-hover:text-indigo-600 transition-colors">{currentVideo.educator}</h3>
                    <p className="text-xs text-gray-500">{currentVideo.educator === 'NCERT Wallah' ? 'NCERT Expert' : 'Physics Expert'}</p>
                  </div>
                </Link>
                <button 
                  onClick={() => setIsFollowing(!isFollowing)}
                  className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${isFollowing ? 'bg-gray-100 text-gray-700' : 'text-indigo-600 bg-indigo-50'}`}
                >
                  {isFollowing ? 'Following' : 'Follow'}
                </button>
              </div>

              <div className="flex gap-4 mb-6">
                <button 
                  onClick={() => setIsLiked(!isLiked)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${isLiked ? 'text-indigo-600 bg-indigo-50' : 'text-gray-600 bg-gray-50'}`}
                >
                  <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-indigo-600' : ''}`} /> Like ({isLiked ? '12.1K' : '12K'})
                </button>
                <button 
                  onClick={() => setActiveTab('qa')}
                  className="flex items-center gap-2 text-gray-600 bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium"
                >
                  <MessageCircle className="w-4 h-4" /> Comment
                </button>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-3">Up Next</h3>
                <div className="space-y-3">
                  {[2, 3, 4].map((num) => (
                    <Link href={`/video/kinematics-${num}`} key={num} className="flex gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer block">
                      <div className="relative w-32 h-20 rounded-lg overflow-hidden shrink-0">
                        <Image src={`https://picsum.photos/seed/kinematics${num}/300/200`} alt="Thumbnail" fill className="object-cover" referrerPolicy="no-referrer" />
                        <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1 rounded">
                          45:00
                        </div>
                      </div>
                      <div className="flex flex-col justify-center">
                        <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1">Kinematics L-{num} | Equations of Motion</h4>
                        <p className="text-xs text-gray-500">Physics • Alakh Pandey</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </>
          )}
          {activeTab === 'notes' && (
            <div className="text-center py-10 text-gray-500">
              <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>No notes available for this lecture yet.</p>
            </div>
          )}
          {activeTab === 'qa' && (
            <div className="text-center py-10 text-gray-500">
              <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>Be the first to ask a question!</p>
              <button className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium">Ask Question</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
