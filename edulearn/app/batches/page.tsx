'use client';

import { useState, useEffect, Suspense } from 'react';
import { ChevronLeft, Search, Filter, Star, BookOpen, User, PlayCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useSearchParams, useRouter } from 'next/navigation';

const ALL_BATCHES = [
  {
    id: 'lakshya-jee-2026',
    title: 'Lakshya JEE 2026',
    category: 'JEE',
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
    category: 'NEET',
    description: 'Dropper Batch for NEET 2026',
    price: '₹4,000',
    originalPrice: '₹5,500',
    discount: '27% OFF',
    rating: 4.8,
    students: '80K+',
    image: 'https://picsum.photos/seed/neet/400/225',
  },
  {
    id: 'upsc-foundation-2026',
    title: 'UPSC Foundation 2026',
    category: 'UPSC',
    description: 'Comprehensive GS Course for Prelims & Mains',
    price: '₹12,500',
    originalPrice: '₹18,000',
    discount: '30% OFF',
    rating: 4.9,
    students: '25K+',
    image: 'https://picsum.photos/seed/upsc/400/225',
  },
  {
    id: 'bpsc-sankalp-2025',
    title: 'BPSC Sankalp 2025',
    category: 'BPSC',
    description: 'Targeted Batch for 71st BPSC CCE',
    price: '₹3,500',
    originalPrice: '₹5,000',
    discount: '30% OFF',
    rating: 4.7,
    students: '15K+',
    image: 'https://picsum.photos/seed/bpsc/400/225',
  },
  {
    id: 'ssc-cgl-target-2025',
    title: 'SSC CGL Target 2025',
    category: 'SSC',
    description: 'Complete Tier 1 + Tier 2 Preparation',
    price: '₹2,500',
    originalPrice: '₹4,000',
    discount: '37% OFF',
    rating: 4.8,
    students: '100K+',
    image: 'https://picsum.photos/seed/ssc/400/225',
  },
  {
    id: 'banking-ibps-po',
    title: 'IBPS PO/Clerk 2025',
    category: 'Banking',
    description: 'Complete Banking Awareness & Aptitude',
    price: '₹2,200',
    originalPrice: '₹3,500',
    discount: '37% OFF',
    rating: 4.6,
    students: '40K+',
    image: 'https://picsum.photos/seed/bank/400/225',
  },
];

const CATEGORIES = ['All', 'JEE', 'NEET', 'UPSC', 'BPSC', 'SSC', 'Banking'];

function BatchesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const categoryParam = searchParams.get('category');
  
  const selectedCategory = categoryParam && CATEGORIES.includes(categoryParam) ? categoryParam : 'All';
  const [searchQuery, setSearchQuery] = useState('');

  const setSelectedCategory = (cat: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (cat === 'All') {
      params.delete('category');
    } else {
      params.set('category', cat);
    }
    router.push(`/batches?${params.toString()}`);
  };

  const filteredBatches = ALL_BATCHES.filter(batch => {
    const matchesCategory = selectedCategory === 'All' || batch.category === selectedCategory;
    const matchesSearch = batch.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         batch.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white p-4 flex items-center gap-4 border-b border-gray-100 sticky top-0 z-30">
        <Link href="/" className="text-gray-900">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-lg font-bold text-gray-900">All Batches</h1>
      </div>

      {/* Search & Filter */}
      <div className="p-4 bg-white border-b border-gray-100 sticky top-[61px] z-20">
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search for batches, exams..." 
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-indigo-500 outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors ${
                selectedCategory === cat 
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100' 
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Batch List */}
      <div className="p-4 flex-1">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            {filteredBatches.length} Batches Found
          </span>
          <button className="flex items-center gap-1 text-xs font-bold text-indigo-600">
            <Filter className="w-3 h-3" /> Sort By
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filteredBatches.map((batch) => (
            <div key={batch.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col">
              <div className="relative h-44 w-full">
                <Image src={batch.image} alt={batch.title} fill className="object-cover" referrerPolicy="no-referrer" />
                <div className="absolute top-3 left-3 bg-indigo-600 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                  {batch.category}
                </div>
                <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-gray-900 text-[10px] font-bold px-2 py-1 rounded shadow-sm flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" /> {batch.rating}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-1">{batch.title}</h3>
                <p className="text-xs text-gray-500 mb-4 line-clamp-2">{batch.description}</p>
                
                <div className="flex items-center gap-4 text-xs text-gray-600 mb-5">
                  <span className="flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-indigo-500" /> 400+ Lectures
                  </span>
                  <span className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-indigo-500" /> {batch.students} Students
                  </span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-50">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xl font-bold text-gray-900">{batch.price}</span>
                      <span className="text-xs text-gray-400 line-through">{batch.originalPrice}</span>
                    </div>
                    <span className="text-[10px] text-green-600 font-bold">{batch.discount}</span>
                  </div>
                  <div className="flex gap-2">
                    <Link 
                      href={`/course/${batch.id}?demo=true`} 
                      className="flex items-center gap-1.5 bg-amber-50 text-amber-600 font-bold text-xs px-3 py-2.5 rounded-xl border border-amber-100 hover:bg-amber-100 transition-colors"
                    >
                      <PlayCircle className="w-3.5 h-3.5" /> Demo
                    </Link>
                    <Link 
                      href={`/course/${batch.id}`} 
                      className="bg-indigo-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-colors"
                    >
                      Explore
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredBatches.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Search className="w-12 h-12 mb-4 opacity-20" />
            <p className="text-sm font-medium">No batches found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function BatchesPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    }>
      <BatchesContent />
    </Suspense>
  );
}
