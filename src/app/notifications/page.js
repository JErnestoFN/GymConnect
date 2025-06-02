'use client';
import { useState } from 'react';
import { Notification } from '../../models/Notification';
import ToggleSwitch from '../_components/ToggleSwitch';

const mockNotifications = [
  new Notification({
    id: 1,
    type: 'REMINDER',
    content: 'Your scheduled workout "Upper Body Strength" starts in 30 minutes',
    read: false,
    createdAt: new Date(Date.now() - 25 * 60 * 1000)
  }),
  new Notification({
    id: 2,
    type: 'INVITE',
    content: 'Sarah Johnson invited you to join the "Morning Joggers" group',
    read: false,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
  }),
  new Notification({
    id: 3,
    type: 'CHALLENGE',
    content: 'Congratulations! You\'ve earned the "7-Day Streak" badge',
    read: false,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000)
  }),
  new Notification({
    id: 4,
    type: 'REMINDER',
    content: 'Don\'t forget to log your workout from yesterday',
    read: true,
    createdAt: new Date(Date.now() - 25 * 60 * 60 * 1000)
  }),
  new Notification({
    id: 5,
    type: 'COMMENT',
    content: 'Michael Baker commented on your recent workout',
    read: true,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
  })
];

const preferencesInit = {
  reminders: true,
  achievements: true,
  groupActivity: true,
  comments: true
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [tab, setTab] = useState('all');
  const [prefs, setPrefs] = useState(preferencesInit);

  const filterTabs = [
    { key: 'all', label: 'All' },
    { key: 'unread', label: 'Unread' },
    { key: 'REMINDER', label: 'Reminders' },
    { key: 'INVITE', label: 'Social' },
    { key: 'CHALLENGE', label: 'Achievements' },
    { key: 'COMMENT', label: 'Comments' }
  ];

  const filtered = notifications.filter(n => {
    if (tab === 'all') return true;
    if (tab === 'unread') return !n.read;
    return n.type === tab;
  });

  const handleDelete = id => setNotifications(notifications.filter(n => n.id !== id));
  const handleMarkAllRead = () => setNotifications(notifications.map(n => {
    const notif = new Notification(n);
    notif.markAsRead();
    return notif;
  }));
  const handleTogglePref = key => setPrefs({ ...prefs, [key]: !prefs[key] });

  const iconMap = {
    REMINDER: <span className="inline-block w-7 h-7 rounded-full bg-green-100 text-green-600 flex items-center justify-center"><svg className="w-5 h-5" fill="none" stroke="#22c55e" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg></span>,
    INVITE: <span className="inline-block w-7 h-7 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center"><svg className="w-5 h-5" fill="none" stroke="#a78bfa" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg></span>,
    CHALLENGE: <span className="inline-block w-7 h-7 rounded-full bg-yellow-100 text-yellow-600 flex items-center justify-center"><svg className="w-5 h-5" fill="none" stroke="#eab308" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg></span>,
    COMMENT: <span className="inline-block w-7 h-7 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center"><svg className="w-5 h-5" fill="none" stroke="#ec4899" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg></span>,
    GENERAL: <span className="inline-block w-7 h-7 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center"><svg className="w-5 h-5" fill="none" stroke="#64748b" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg></span>
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <div className="max-w-3xl mx-auto px-4 pt-8">
        <div className="flex items-center gap-2 mb-2">
          <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
          <h1 className="text-3xl font-extrabold text-gray-900">Notifications</h1>
        </div>
        <div className="text-gray-500 mb-6">Stay updated with your fitness activities</div>
        <div className="flex gap-2 mb-6">
          {filterTabs.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition ${tab === t.key ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>{t.label}</button>
          ))}
        </div>
        <div className="flex justify-end gap-2 mb-4">
          <button onClick={handleMarkAllRead} className="bg-white border border-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-gray-100 transition">Mark All Read</button>
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg> Add Reminder</button>
        </div>
        <div className="flex flex-col gap-2 mb-8">
          {filtered.map(n => {
            const notif = n instanceof Notification ? n : new Notification(n);
            return (
              <div key={notif.id} className={`flex items-center gap-4 bg-white rounded-xl px-5 py-4 shadow-sm border border-gray-100 ${!notif.read ? 'border-l-4 border-green-400' : ''}`}>
                {iconMap[notif.type] || iconMap.GENERAL}
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{notif.content}</div>
                  <div className="text-xs text-gray-500 mt-1">{notif.getTimeAgo()}</div>
                </div>
                <button onClick={() => handleDelete(notif.id)} className="text-gray-300 hover:text-red-400 text-xl"><svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" /></svg></button>
              </div>
            );
          })}
        </div>
        <div className="bg-green-50 rounded-2xl p-6">
          <div className="font-bold text-gray-800 mb-4">Notification Preferences</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between bg-white rounded-lg px-4 py-3 mb-2">
              <span className="flex items-center gap-2 text-blue-700 font-semibold"><svg className="w-5 h-5" fill="none" stroke="#22c55e" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg> Workout Reminders</span>
              <ToggleSwitch enabled={prefs.reminders} setEnabled={() => handleTogglePref('reminders')} color="green" ariaLabel="Toggle workout reminders" />
            </div>
            <div className="flex items-center justify-between bg-white rounded-lg px-4 py-3 mb-2">
              <span className="flex items-center gap-2 text-yellow-700 font-semibold"><svg className="w-5 h-5" fill="none" stroke="#eab308" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg> Achievements</span>
              <ToggleSwitch enabled={prefs.achievements} setEnabled={() => handleTogglePref('achievements')} color="yellow" ariaLabel="Toggle achievements" />
            </div>
            <div className="flex items-center justify-between bg-white rounded-lg px-4 py-3 mb-2">
              <span className="flex items-center gap-2 text-purple-700 font-semibold"><svg className="w-5 h-5" fill="none" stroke="#a78bfa" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/></svg> Group Activity</span>
              <ToggleSwitch enabled={prefs.groupActivity} setEnabled={() => handleTogglePref('groupActivity')} color="purple" ariaLabel="Toggle group activity" />
            </div>
            <div className="flex items-center justify-between bg-white rounded-lg px-4 py-3 mb-2">
              <span className="flex items-center gap-2 text-green-700 font-semibold"><svg className="w-5 h-5" fill="none" stroke="#22c55e" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg> Comments & Mentions</span>
              <ToggleSwitch enabled={prefs.comments} setEnabled={() => handleTogglePref('comments')} color="green" ariaLabel="Toggle comments and mentions" />
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-4">You can customize your notification preferences at any time from settings.</div>
        </div>
      </div>
    </div>
  );
} 