'use client';

import React from 'react';
import { ChevronLeft, Bell, CheckCircle2, Clock, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'motion/react';

const NOTIFICATIONS = [
  {
    id: 1,
    title: 'Class Starting Soon!',
    message: 'Your Physics class "Rotational Motion" starts in 15 minutes. Join now!',
    time: '15 mins ago',
    type: 'class',
    isRead: false,
  },
  {
    id: 2,
    title: 'New Batch Launched',
    message: 'Lakshya JEE 2026 batch is now live. Enroll now to get early bird discount!',
    time: '2 hours ago',
    type: 'promotion',
    isRead: false,
  },
  {
    id: 3,
    title: 'Quiz Result Out',
    message: 'You scored 85% in the Mathematics weekly quiz. Check your rank on the leaderboard.',
    time: '5 hours ago',
    type: 'result',
    isRead: true,
  },
  {
    id: 4,
    title: 'Doubt Resolved',
    message: 'Your doubt regarding "Chemical Bonding" has been resolved by Alakh Sir.',
    time: '1 day ago',
    type: 'doubt',
    isRead: true,
  },
];

export default function NotificationsPage() {
  return (
    <div className="flex-1 overflow-y-auto pb-20 bg-bg-page">
      {/* Header */}
      <div className="bg-bg-card border-b border-border-main px-4 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-4">
          <Link href="/" className="p-2 -ml-2 hover:bg-bg-page rounded-full transition-colors">
            <ChevronLeft className="w-6 h-6 text-text-main" />
          </Link>
          <h1 className="text-xl font-bold text-text-main">Notifications</h1>
        </div>
        <button className="text-xs font-bold text-primary hover:underline">
          Mark all as read
        </button>
      </div>

      <div className="p-4 space-y-3">
        {NOTIFICATIONS.length > 0 ? (
          NOTIFICATIONS.map((notif, idx) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className={`p-4 rounded-2xl border-2 transition-all ${
                notif.isRead 
                ? 'bg-bg-card border-border-main' 
                : 'bg-primary/5 border-primary/20 shadow-sm'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-2">
                  {!notif.isRead && <div className="w-2 h-2 bg-primary rounded-full"></div>}
                  <h3 className={`font-bold text-sm ${notif.isRead ? 'text-text-main' : 'text-primary'}`}>
                    {notif.title}
                  </h3>
                </div>
                <span className="text-[10px] font-bold text-text-muted flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {notif.time}
                </span>
              </div>
              <p className="text-xs text-text-muted leading-relaxed mb-3">
                {notif.message}
              </p>
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  <button className="text-[10px] font-bold text-primary bg-primary/10 px-3 py-1 rounded-full hover:bg-primary/20 transition-colors">
                    View Details
                  </button>
                </div>
                <button className="p-1.5 text-text-muted hover:text-accent transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-20 h-20 bg-bg-card rounded-full flex items-center justify-center mb-4 border-2 border-border-main">
              <Bell className="w-10 h-10 text-text-muted opacity-20" />
            </div>
            <h3 className="font-bold text-text-main mb-1">No notifications yet</h3>
            <p className="text-xs text-text-muted">We&apos;ll notify you when something important happens.</p>
          </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="px-4 py-8 text-center">
        <p className="text-[10px] text-text-muted font-bold uppercase tracking-widest">
          End of notifications
        </p>
      </div>
    </div>
  );
}
