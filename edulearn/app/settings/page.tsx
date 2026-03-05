'use client';

import { ChevronLeft, Bell, Lock, Eye, Globe, HelpCircle, Info, LogOut, Sun, Moon, Monitor, Bot } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '@/lib/ThemeContext';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  const themes = [
    { id: 'light', name: 'Light', icon: Sun, color: 'text-orange-500 bg-orange-50' },
    { id: 'dark', name: 'Dark', icon: Moon, color: 'text-blue-500 bg-blue-50' },
    { id: 'system', name: 'System', icon: Monitor, color: 'text-gray-500 bg-gray-50' },
    { id: 'dora', name: 'Dora Mode', icon: Bot, color: 'text-[#00A0E9] bg-blue-50' },
  ] as const;

  return (
    <div className="min-h-screen bg-bg-page pb-20">
      <div className="bg-bg-card border-b border-border-main px-4 py-4 flex items-center gap-4 sticky top-0 z-10">
        <Link href="/profile" className="p-2 -ml-2 hover:bg-bg-page rounded-full transition-colors">
          <ChevronLeft className="w-6 h-6 text-text-main" />
        </Link>
        <h1 className="text-xl font-bold text-text-main">Settings</h1>
      </div>

      <div className="p-4 space-y-6">
        {/* Account Section */}
        <div>
          <h2 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3 px-1">Account</h2>
          <div className="bg-bg-card rounded-2xl shadow-sm border border-border-main overflow-hidden">
            <button className="w-full flex items-center justify-between p-4 border-b border-border-main hover:bg-bg-page transition-colors">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-text-muted" />
                <span className="font-medium text-text-main">Notifications</span>
              </div>
              <span className="text-xs text-primary font-bold">On</span>
            </button>
            <button className="w-full flex items-center justify-between p-4 border-b border-border-main hover:bg-bg-page transition-colors">
              <div className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-text-muted" />
                <span className="font-medium text-text-main">Privacy & Security</span>
              </div>
            </button>
            <button className="w-full flex items-center justify-between p-4 hover:bg-bg-page transition-colors">
              <div className="flex items-center gap-3">
                <Globe className="w-5 h-5 text-text-muted" />
                <span className="font-medium text-text-main">Language</span>
              </div>
              <span className="text-xs text-text-muted">English</span>
            </button>
          </div>
        </div>

        {/* Theme Section */}
        <div>
          <h2 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3 px-1">Theme Preference</h2>
          <div className="grid grid-cols-2 gap-3">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => setTheme(t.id)}
                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                  theme === t.id 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border-main bg-bg-card hover:border-primary/50'
                }`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${t.color}`}>
                  <t.icon className="w-5 h-5" />
                </div>
                <span className={`text-xs font-bold ${theme === t.id ? 'text-primary' : 'text-text-main'}`}>
                  {t.name}
                </span>
                {theme === t.id && (
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Preferences Section */}
        <div>
          <h2 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3 px-1">Preferences</h2>
          <div className="bg-bg-card rounded-2xl shadow-sm border border-border-main overflow-hidden">
            <button className="w-full flex items-center justify-between p-4 hover:bg-bg-page transition-colors">
              <div className="flex items-center gap-3">
                <Bell className="w-5 h-5 text-text-muted" />
                <span className="font-medium text-text-main">Video Quality</span>
              </div>
              <span className="text-xs text-text-muted">Auto</span>
            </button>
          </div>
        </div>

        {/* Support Section */}
        <div>
          <h2 className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3 px-1">Support</h2>
          <div className="bg-bg-card rounded-2xl shadow-sm border border-border-main overflow-hidden">
            <button className="w-full flex items-center justify-between p-4 border-b border-border-main hover:bg-bg-page transition-colors">
              <div className="flex items-center gap-3">
                <HelpCircle className="w-5 h-5 text-text-muted" />
                <span className="font-medium text-text-main">Help Center</span>
              </div>
            </button>
            <button className="w-full flex items-center justify-between p-4 hover:bg-bg-page transition-colors">
              <div className="flex items-center gap-3">
                <Info className="w-5 h-5 text-text-muted" />
                <span className="font-medium text-text-main">About EduLearn</span>
              </div>
            </button>
          </div>
        </div>

        <Link href="/login" className="w-full bg-red-50 text-red-600 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 border border-red-100">
          <LogOut className="w-5 h-5" /> Log Out
        </Link>
      </div>
    </div>
  );
}
