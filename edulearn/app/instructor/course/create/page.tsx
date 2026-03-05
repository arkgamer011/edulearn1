'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { ChevronLeft, Upload, Plus, GripVertical, Video, FileText, HelpCircle, X, CheckCircle2, Sparkles, Wand2, Loader2, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '@/lib/ThemeContext';
import { GoogleGenAI, Type } from "@google/genai";

export default function CreateCourse() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState('details');
  const [isPublished, setIsPublished] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadedVideos, setUploadedVideos] = useState<string[]>([]);
  const [uploadedMaterials, setUploadedMaterials] = useState<string[]>([]);
  const [modules, setModules] = useState([
    { 
      id: 1, 
      name: 'Module 1: Kinematics',
      lectures: [
        { id: 1, title: 'Introduction to Motion', type: 'video', duration: '45:00', status: 'ready' }
      ]
    }
  ]);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const [isGeneratingCurriculum, setIsGeneratingCurriculum] = useState(false);
  const [courseTitle, setCourseTitle] = useState('Lakshya JEE 2026');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const materialInputRef = useRef<HTMLInputElement>(null);
  const [activeModuleId, setActiveModuleId] = useState<number | null>(null);

  const generateCurriculum = async () => {
    setIsGeneratingCurriculum(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY! });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Suggest a 5-module curriculum for a course titled "${courseTitle}". Return only the module names as a JSON array of strings.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          }
        }
      });
      
      const suggestedModules = response.text ? JSON.parse(response.text) : [];
      setModules(suggestedModules.map((name: string, idx: number) => ({ 
        id: idx + 1, 
        name: `Module ${idx + 1}: ${name}`,
        lectures: []
      })));
    } catch (error) {
      console.error("Failed to generate curriculum:", error);
      alert("Could not generate curriculum. Please try again.");
    } finally {
      setIsGeneratingCurriculum(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && activeModuleId !== null) {
      simulateUpload(file.name, 'video', activeModuleId);
    }
  };

  const simulateUpload = (fileName: string, type: 'video' | 'material', moduleId: number) => {
    setUploading(true);
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploading(false);
          
          if (type === 'video') {
            const newModules = [...modules];
            const modIdx = newModules.findIndex(m => m.id === moduleId);
            newModules[modIdx].lectures.push({
              id: Date.now(),
              title: fileName.replace(/\.[^/.]+$/, ""),
              type: 'video',
              duration: '00:00',
              status: 'ready'
            });
            setModules(newModules);
          }
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  const addModule = () => {
    const newId = modules.length > 0 ? Math.max(...modules.map(m => m.id)) + 1 : 1;
    setModules([...modules, { id: newId, name: `Module ${newId}: New Module`, lectures: [] }]);
  };

  const handleSaveDraft = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 3000);
    }, 1500);
  };

  const handlePublish = () => {
    setIsPublished(true);
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('saved');
      alert('Course published successfully!');
      window.location.href = '/instructor/dashboard';
    }, 1500);
  };

  const removeVideo = (name: string) => {
    setUploadedVideos(uploadedVideos.filter(v => v !== name));
  };

  const removeMaterial = (name: string) => {
    setUploadedMaterials(uploadedMaterials.filter(m => m !== name));
  };

  const handleMaterialUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && activeModuleId !== null) {
      simulateUpload(file.name, 'material', activeModuleId);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-bg-page min-h-screen">
      <div className="bg-bg-card p-4 flex items-center border-b-2 border-border-main sticky top-0 z-10">
        <Link href="/instructor/dashboard" className="text-text-main mr-4">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-lg font-bold text-text-main">Create Course</h1>
        <div className="ml-auto flex items-center gap-3">
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${isPublished ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
            {isPublished ? 'PUBLISHED' : 'DRAFT'}
          </span>
          <div className="h-4 w-px bg-border-main"></div>
          <label className="relative inline-flex items-center cursor-pointer scale-90">
            <input type="checkbox" className="sr-only peer" checked={isPublished} onChange={() => setIsPublished(!isPublished)} />
            <div className="w-11 h-6 bg-border-main peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
          </label>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-bg-card border-b-2 border-border-main px-4 pt-2 sticky top-[61px] z-10">
        <button 
          onClick={() => setActiveTab('details')}
          className={`pb-3 px-2 text-sm font-bold mr-6 border-b-2 transition-colors ${activeTab === 'details' ? 'border-primary text-primary' : 'border-transparent text-text-muted'}`}
        >
          Details
        </button>
        <button 
          onClick={() => setActiveTab('curriculum')}
          className={`pb-3 px-2 text-sm font-bold border-b-2 transition-colors ${activeTab === 'curriculum' ? 'border-primary text-primary' : 'border-transparent text-text-muted'}`}
        >
          Curriculum
        </button>
      </div>

      <div className="p-4 pb-24 flex-1 overflow-y-auto">
        {activeTab === 'details' ? (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-text-main mb-1">Course Title</label>
              <input 
                type="text" 
                className="w-full p-3 border-2 border-border-main rounded-xl bg-bg-card text-text-main focus:border-primary outline-none transition-all" 
                placeholder="e.g. Complete Physics for JEE" 
                value={courseTitle}
                onChange={(e) => setCourseTitle(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-text-main mb-1">Description</label>
              <textarea 
                className="w-full p-3 border-2 border-border-main rounded-xl bg-bg-card text-text-main focus:border-primary outline-none h-32 transition-all" 
                placeholder="What will students learn?" 
                defaultValue="Complete syllabus coverage with daily practice problems, mock tests, and doubt solving sessions."
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-text-main mb-1">Price (₹)</label>
                <input 
                  type="number" 
                  className="w-full p-3 border-2 border-border-main rounded-xl bg-bg-card text-text-main focus:border-primary outline-none transition-all" 
                  placeholder="0" 
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-text-main mb-1">Category</label>
                <select className="w-full p-3 border-2 border-border-main rounded-xl bg-bg-card text-text-main focus:border-primary outline-none transition-all">
                  <option>JEE</option>
                  <option>NEET</option>
                  <option>UPSC</option>
                  <option>BPSC</option>
                  <option>SSC</option>
                  <option>Banking</option>
                  <option>Class 12</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Course Thumbnail</label>
              <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center bg-white text-gray-500 hover:bg-gray-50 cursor-pointer transition-colors">
                <Upload className="w-8 h-8 mb-2 text-indigo-500" />
                <span className="text-sm font-medium">Click to upload image</span>
                <span className="text-xs mt-1">16:9 aspect ratio recommended</span>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border border-indigo-100 rounded-xl bg-indigo-50/30">
              <div>
                <label className="block text-sm font-bold text-indigo-900">Course Visibility</label>
                <p className="text-xs text-indigo-600/70">Control if students can find and enroll in this course</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-gray-500">{isPublished ? 'Public' : 'Private'}</span>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={isPublished} onChange={() => setIsPublished(!isPublished)} />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-bold text-text-main">Course Curriculum</h2>
              <button 
                onClick={generateCurriculum}
                disabled={isGeneratingCurriculum}
                className="flex items-center gap-2 px-3 py-1.5 bg-primary/10 text-primary rounded-lg text-xs font-bold hover:bg-primary/20 transition-all disabled:opacity-50"
              >
                {isGeneratingCurriculum ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  <Sparkles className="w-3 h-3" />
                )}
                AI Suggest Modules
              </button>
            </div>

            {modules.map((module) => (
              <div key={module.id} className="bg-bg-card border-2 border-border-main rounded-2xl overflow-hidden shadow-sm">
                <div className="bg-bg-page p-4 flex items-center justify-between border-b-2 border-border-main">
                  <div className="flex items-center gap-3">
                    <GripVertical className="w-5 h-5 text-text-muted cursor-move" />
                    <input 
                      type="text" 
                      className="font-bold text-sm text-text-main bg-transparent border-none focus:ring-0 p-0 w-full"
                      value={module.name}
                      onChange={(e) => {
                        const newModules = [...modules];
                        const idx = newModules.findIndex(m => m.id === module.id);
                        newModules[idx].name = e.target.value;
                        setModules(newModules);
                      }}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => {
                        setActiveModuleId(module.id);
                        fileInputRef.current?.click();
                      }}
                      className="text-[10px] bg-primary text-white px-3 py-1.5 rounded-xl font-bold hover:opacity-90 flex items-center gap-1.5 shadow-sm shadow-primary/20"
                    >
                      <Plus className="w-3 h-3" /> ADD LECTURE
                    </button>
                  </div>
                </div>
                
                <div className="p-4 space-y-3">
                  {/* Lectures */}
                  {module.lectures.map((lecture) => (
                    <div key={lecture.id} className="flex items-center justify-between p-3 bg-bg-page/50 border border-border-main rounded-xl group hover:border-primary transition-colors">
                      <div className="flex items-center gap-3">
                        <GripVertical className="w-4 h-4 text-text-muted cursor-move opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                          <Video className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-sm font-bold text-text-main block">{lecture.title}</span>
                          <span className="text-[10px] text-text-muted font-bold uppercase tracking-wider">{lecture.type} • {lecture.duration}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button className="text-xs text-primary font-bold">Edit</button>
                        <button onClick={() => removeLecture(module.id, lecture.id)} className="text-xs text-accent font-bold">Delete</button>
                      </div>
                    </div>
                  ))}

                  {/* Uploading Progress for this module */}
                  {uploading && activeModuleId === module.id && (
                    <div className="p-4 border-2 border-primary/20 bg-primary/5 rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-primary rounded-full animate-ping"></div>
                          <span className="text-xs font-bold text-primary">Uploading Video...</span>
                        </div>
                        <span className="text-xs font-bold text-primary">{uploadProgress}%</span>
                      </div>
                      <div className="h-2 w-full bg-primary/10 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${uploadProgress}%` }}
                          className="h-full bg-primary" 
                        ></motion.div>
                      </div>
                    </div>
                  )}

                  {/* Video Upload Dropzone - Prominent Button & Drag-and-Drop Area */}
                  <div className="grid grid-cols-1 gap-3">
                    <div 
                      onClick={() => {
                        setActiveModuleId(module.id);
                        fileInputRef.current?.click();
                      }}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        setActiveModuleId(module.id);
                        const file = e.dataTransfer.files?.[0];
                        if (file) simulateUpload(file.name, 'video', module.id);
                      }}
                      className="border-2 border-dashed border-border-main rounded-xl p-8 flex flex-col items-center justify-center text-text-muted hover:border-primary hover:bg-primary/5 cursor-pointer transition-all group"
                    >
                      <div className="w-12 h-12 bg-bg-page rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                        <Upload className="w-6 h-6 text-text-muted group-hover:text-primary" />
                      </div>
                      <span className="text-sm font-bold text-text-main group-hover:text-primary mb-1">Upload Video Lecture</span>
                      <span className="text-[10px] text-text-muted uppercase font-bold tracking-widest">Drag & drop or click to browse</span>
                    </div>
                  </div>

                  {/* Add Material/Quiz Buttons */}
                  <div className="flex gap-2 pt-2">
                    <button 
                      onClick={() => {
                        setActiveModuleId(module.id);
                        materialInputRef.current?.click();
                      }}
                      className="flex-1 flex items-center justify-center gap-2 py-2 border-2 border-border-main rounded-xl text-[10px] font-bold text-text-muted hover:border-primary hover:text-primary transition-all"
                    >
                      <FileText className="w-3 h-3" /> ADD MATERIAL
                    </button>
                    <button 
                      onClick={() => setShowQuizModal(true)}
                      className="flex-1 flex items-center justify-center gap-2 py-2 border-2 border-border-main rounded-xl text-[10px] font-bold text-text-muted hover:border-primary hover:text-primary transition-all"
                    >
                      <HelpCircle className="w-3 h-3" /> ADD QUIZ
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            <input 
              type="file" 
              ref={fileInputRef} 
              className="hidden" 
              accept="video/*" 
              onChange={handleFileUpload}
            />

            <input 
              type="file" 
              ref={materialInputRef} 
              className="hidden" 
              accept=".pdf,.doc,.docx" 
              onChange={handleMaterialUpload}
            />

            <button 
              onClick={addModule}
              className="w-full py-4 border-2 border-dashed border-border-main rounded-2xl text-sm font-bold text-text-muted hover:border-primary hover:text-primary hover:bg-primary/5 transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" /> ADD NEW MODULE
            </button>
          </div>
        )}
      </div>

      {/* Bottom Action */}
      <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-200 p-4 z-50 flex gap-3">
        <button 
          onClick={handleSaveDraft}
          disabled={saveStatus === 'saving'}
          className={`flex-1 py-3 px-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
            saveStatus === 'saved' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {saveStatus === 'saving' ? (
            <>
              <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
              Saving...
            </>
          ) : saveStatus === 'saved' ? (
            <>
              <CheckCircle2 className="w-4 h-4" />
              Saved!
            </>
          ) : (
            'Save Draft'
          )}
        </button>
        <button 
          onClick={handlePublish}
          className="flex-1 py-3 px-4 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm"
        >
          Publish Course
        </button>
      </div>

      {/* Footer Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-bg-card border-t-2 border-border-main p-4 flex items-center justify-between z-20">
        <button 
          onClick={handleSaveDraft}
          disabled={saveStatus === 'saving'}
          className="px-6 py-2.5 border-2 border-border-main rounded-xl text-sm font-bold text-text-main hover:bg-bg-page transition-all flex items-center gap-2"
        >
          {saveStatus === 'saving' ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
          {saveStatus === 'saved' ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : 'SAVE DRAFT'}
        </button>
        <button 
          onClick={handlePublish}
          disabled={saveStatus === 'saving'}
          className="px-8 py-2.5 bg-primary text-white rounded-xl text-sm font-bold hover:opacity-90 transition-all shadow-lg shadow-primary/20"
        >
          PUBLISH COURSE
        </button>
      </div>

      {/* Quiz Modal Mockup */}
      {showQuizModal && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-sm overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-indigo-50/50">
              <h3 className="font-bold text-gray-900">Create New Quiz</h3>
              <button onClick={() => setShowQuizModal(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Quiz Title</label>
                <input type="text" className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="e.g. Kinematics Quiz 1" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Duration (mins)</label>
                <input type="number" className="w-full p-3 border border-gray-200 rounded-xl bg-gray-50 focus:ring-2 focus:ring-indigo-500 outline-none" placeholder="30" />
              </div>
              <div className="p-4 border border-dashed border-indigo-200 rounded-xl bg-indigo-50/30 flex flex-col items-center gap-2">
                <Plus className="w-6 h-6 text-indigo-400" />
                <span className="text-xs font-bold text-indigo-600">Add Questions</span>
              </div>
            </div>
            <div className="p-4 bg-gray-50 flex gap-3">
              <button onClick={() => setShowQuizModal(false)} className="flex-1 py-2.5 rounded-xl font-bold text-gray-600 hover:bg-gray-100">Cancel</button>
              <button onClick={() => setShowQuizModal(false)} className="flex-1 py-2.5 rounded-xl font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm">Create Quiz</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
