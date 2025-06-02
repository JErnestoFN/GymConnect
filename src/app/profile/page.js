'use client';
import React, { useState } from 'react';

// Modelo orientado a objetos para el usuario
class UserProfile {
  constructor({ firstName, lastName, email, bio, joined, workoutTime, calories, height, weight, goal, activityLevel, memberSince }) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.bio = bio;
    this.joined = joined;
    this.workoutTime = workoutTime;
    this.calories = calories;
    this.height = height;
    this.weight = weight;
    this.goal = goal;
    this.activityLevel = activityLevel;
    this.memberSince = memberSince;
  }
  get initials() {
    return `${this.firstName[0]}${this.lastName[0]}`;
  }
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

class Achievement {
  constructor({ icon, color, title, desc, date }) {
    this.icon = icon;
    this.color = color;
    this.title = title;
    this.desc = desc;
    this.date = date;
  }
}

const user = new UserProfile({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  bio: 'Fitness enthusiast and marathon runner. Love outdoor activities and pushing my limits.',
  joined: '248 days ago',
  workoutTime: '187 hours',
  calories: '124,350',
  height: `5'10"`,
  weight: '165 lbs',
  goal: 'Build muscle and improve endurance',
  activityLevel: 'Very Active (5-7 days per week)',
  memberSince: 'October 2024',
});

const stats = [
  { label: 'Achievements', value: 12, color: 'text-yellow-500', icon: (
    <svg className="w-8 h-8" fill="none" stroke="#eab308" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>
  ) },
  { label: 'Badges', value: 5, color: 'text-green-600', icon: (
    <svg className="w-8 h-8" fill="none" stroke="#22c55e" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M16 2v4M8 2v4M3 10h18"/></svg>
  ) },
  { label: 'Challenges Won', value: 3, color: 'text-blue-500', icon: (
    <svg className="w-8 h-8" fill="none" stroke="#3b82f6" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M16 2v4M8 2v4M3 10h18"/></svg>
  ) },
  { label: 'Goals Completed', value: 8, color: 'text-purple-500', icon: (
    <svg className="w-8 h-8" fill="none" stroke="#a78bfa" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M16 2v4M8 2v4M3 10h18"/></svg>
  ) },
];

const achievements = [
  new Achievement({
    icon: <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="#eab308" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>, color: 'border-yellow-200', title: '100 Day Streak', desc: 'Logged workouts for 100 consecutive days', date: '2025-03-15' }),
  new Achievement({
    icon: <svg className="w-6 h-6 text-blue-500" fill="none" stroke="#3b82f6" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M16 2v4M8 2v4M3 10h18"/></svg>, color: 'border-blue-200', title: 'Marathon Finisher', desc: 'Completed a full marathon', date: '2025-02-28' }),
  new Achievement({
    icon: <svg className="w-6 h-6 text-green-500" fill="none" stroke="#22c55e" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M16 2v4M8 2v4M3 10h18"/></svg>, color: 'border-green-200', title: 'Weight Goal Achieved', desc: 'Reached target weight of 165 lbs', date: '2025-01-10' }),
  new Achievement({
    icon: <svg className="w-6 h-6 text-purple-500" fill="none" stroke="#a78bfa" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M16 2v4M8 2v4M3 10h18"/></svg>, color: 'border-purple-200', title: '1000 Mile Club', desc: 'Ran a total of 1000 miles', date: '2024-12-20' }),
];

export default function ProfilePage() {
  const [tab, setTab] = useState('details');
  // Estado para secciones colapsables en Settings
  const [openSections, setOpenSections] = useState({ account: true, privacy: false, data: false });
  const [emailPrefs, setEmailPrefs] = useState({ reminders: true, group: true, marketing: false });
  const [profileVisibility, setProfileVisibility] = useState('public');
  const [activitySharing, setActivitySharing] = useState({ shareWorkouts: true, showAchievements: false });

  const toggleSection = (key) => setOpenSections(s => ({ ...s, [key]: !s[key] }));

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header verde */}
      <div className="rounded-2xl bg-green-100 max-w-6xl mx-auto mt-8 mb-8 px-8 py-8 flex flex-col md:flex-row items-center justify-between relative">
        <div className="flex items-center gap-8 w-full">
          <div className="flex flex-col items-center justify-center mr-8">
            <div className="w-24 h-24 rounded-full bg-green-200 flex items-center justify-center text-5xl font-bold text-green-700 mb-2">
              {user.initials}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-4xl font-extrabold text-gray-800 mb-1">{user.fullName}</h1>
            <div className="text-lg text-green-900 mb-2">Member since {user.memberSince}</div>
            <div className="flex flex-wrap gap-8 mt-2">
              <div className="flex items-center gap-2 text-green-900 font-semibold">
                <svg className="w-6 h-6" fill="none" stroke="#22c55e" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                <span>Joined</span>
                <span className="font-normal text-green-800">{user.joined}</span>
              </div>
              <div className="flex items-center gap-2 text-green-900 font-semibold">
                <svg className="w-6 h-6" fill="none" stroke="#22c55e" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                <span>Workout Time</span>
                <span className="font-normal text-green-800">{user.workoutTime}</span>
              </div>
              <div className="flex items-center gap-2 text-green-900 font-semibold">
                <svg className="w-6 h-6" fill="none" stroke="#22c55e" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 2v4M8 2v4M3 10h18"/><path d="M12 8v8"/></svg>
                <span>Calories Burned</span>
                <span className="font-normal text-green-800">{user.calories}</span>
              </div>
            </div>
          </div>
        </div>
        <button className="absolute top-6 right-6 bg-white text-green-700 font-semibold px-5 py-2 rounded-lg border border-green-200 hover:bg-green-50 flex items-center gap-2 transition">
          <svg className="w-5 h-5" fill="none" stroke="#22c55e" strokeWidth="2" viewBox="0 0 24 24"><path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 11l5 5 5-5"/></svg>
          Edit Profile
        </button>
      </div>
      {/* Tabs */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex gap-2 mb-6">
          <button onClick={() => setTab('details')} className={`px-5 py-2 rounded-lg font-semibold text-base transition ${tab === 'details' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>Profile Details</button>
          <button onClick={() => setTab('achievements')} className={`px-5 py-2 rounded-lg font-semibold text-base transition ${tab === 'achievements' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>Achievements</button>
          <button onClick={() => setTab('settings')} className={`px-5 py-2 rounded-lg font-semibold text-base transition ${tab === 'settings' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}>Settings</button>
        </div>
        {/* Contenido de los tabs */}
        {tab === 'details' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information */}
            <div className="bg-white rounded-2xl p-6 shadow border border-gray-100">
              <div className="flex items-center gap-2 mb-4 text-green-700 font-bold text-lg">
                <svg className="w-5 h-5" fill="none" stroke="#22c55e" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                Personal Information
              </div>
              <div className="mb-2">
                <label className="block text-sm text-gray-600 mb-1">First Name</label>
                <input className="w-full rounded-lg border border-gray-200 px-4 py-2 text-gray-700 bg-gray-50" value={user.firstName} readOnly />
              </div>
              <div className="mb-2">
                <label className="block text-sm text-gray-600 mb-1">Last Name</label>
                <input className="w-full rounded-lg border border-gray-200 px-4 py-2 text-gray-700 bg-gray-50" value={user.lastName} readOnly />
              </div>
              <div className="mb-2">
                <label className="block text-sm text-gray-600 mb-1">Email</label>
                <input className="w-full rounded-lg border border-gray-200 px-4 py-2 text-gray-700 bg-gray-50" value={user.email} readOnly />
              </div>
              <div className="mb-2">
                <label className="block text-sm text-gray-600 mb-1">Bio</label>
                <textarea className="w-full rounded-lg border border-gray-200 px-4 py-2 text-gray-700 bg-gray-50" value={user.bio} readOnly rows={2} />
              </div>
            </div>
            {/* Fitness Information */}
            <div className="bg-white rounded-2xl p-6 shadow border border-gray-100">
              <div className="flex items-center gap-2 mb-4 text-green-700 font-bold text-lg">
                <svg className="w-5 h-5" fill="none" stroke="#22c55e" strokeWidth="2" viewBox="0 0 24 24"><path d="M16 2v4M8 2v4M3 10h18"/><path d="M12 8v8"/></svg>
                Fitness Information
              </div>
              <div className="mb-2 grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Height</label>
                  <input className="w-full rounded-lg border border-gray-200 px-4 py-2 text-gray-700 bg-gray-50" value={user.height} readOnly />
                </div>
                <div>
                  <label className="block text-sm text-gray-600 mb-1">Weight</label>
                  <input className="w-full rounded-lg border border-gray-200 px-4 py-2 text-gray-700 bg-gray-50" value={user.weight} readOnly />
                </div>
              </div>
              <div className="mb-2">
                <label className="block text-sm text-gray-600 mb-1">Fitness Goal</label>
                <input className="w-full rounded-lg border border-gray-200 px-4 py-2 text-gray-700 bg-gray-50" value={user.goal} readOnly />
              </div>
              <div className="mb-2">
                <label className="block text-sm text-gray-600 mb-1">Activity Level</label>
                <input className="w-full rounded-lg border border-gray-200 px-4 py-2 text-gray-700 bg-gray-50" value={user.activityLevel} readOnly />
              </div>
            </div>
          </div>
        )}
        {tab === 'achievements' && (
          <div>
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              {stats.map((s, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-200 flex flex-col items-center justify-center py-8 px-2 text-center shadow-sm">
                  <div className={`mb-2 ${s.color}`}>{s.icon}</div>
                  <div className="text-3xl font-extrabold text-gray-800 mb-1">{s.value}</div>
                  <div className="text-gray-500 font-semibold text-base">{s.label}</div>
                </div>
              ))}
            </div>
            {/* Recent Achievements */}
            <div className="mb-3 font-bold text-lg text-gray-900">Recent Achievements</div>
            <div className="flex flex-col gap-3 mb-6">
              {achievements.map((a, i) => (
                <div key={i} className={`flex items-center bg-white rounded-xl border border-gray-200 px-6 py-4 shadow-sm justify-between`}>
                  <div className="flex items-center gap-4">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-50 border border-gray-200">{a.icon}</span>
                    <div>
                      <div className="font-semibold text-gray-900">{a.title}</div>
                      <div className="text-sm text-gray-500">{a.desc}</div>
                    </div>
                  </div>
                  <div className="text-xs text-gray-400 text-right min-w-[90px]">Achieved<br /><span className="font-semibold text-gray-500">{a.date}</span></div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <button className="px-6 py-2 rounded-lg border border-green-400 text-green-700 font-semibold bg-white hover:bg-green-50 transition">View All Achievements</button>
            </div>
          </div>
        )}
        {tab === 'settings' && (
          <div className="bg-white rounded-2xl p-8 shadow border border-gray-100">
            {/* Account Settings */}
            <div>
              <button onClick={() => toggleSection('account')} className="flex items-center gap-2 text-green-700 font-bold text-lg mb-4 w-full text-left">
                <svg className="w-5 h-5" fill="none" stroke="#22c55e" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                Account Settings
                <span className="ml-auto">{openSections.account ? '▲' : '▼'}</span>
              </button>
              {openSections.account && (
                <div className="mb-6 pl-6">
                  <div className="mb-4">
                    <label className="block text-sm text-gray-600 mb-1">Change Password</label>
                    <input className="w-full rounded-lg border border-gray-200 px-4 py-2 text-gray-700 bg-gray-50" type="password" value="" placeholder="Update Password" readOnly />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Email Preferences</label>
                    <div className="flex flex-col gap-2 mt-2">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" checked={emailPrefs.reminders} readOnly /> Workout Reminders
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" checked={emailPrefs.group} readOnly /> Group Notifications
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" checked={emailPrefs.marketing} readOnly /> Marketing Communications
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* Privacy Settings */}
            <div>
              <button onClick={() => toggleSection('privacy')} className="flex items-center gap-2 text-green-700 font-bold text-lg mb-4 w-full text-left">
                <svg className="w-5 h-5" fill="none" stroke="#22c55e" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                Privacy Settings
                <span className="ml-auto">{openSections.privacy ? '▲' : '▼'}</span>
              </button>
              {openSections.privacy && (
                <div className="mb-6 pl-6">
                  <div className="mb-4">
                    <label className="block text-sm text-gray-600 mb-1">Profile Visibility</label>
                    <div className="flex flex-col gap-2 mt-2">
                      <label className="flex items-center gap-2">
                        <input type="radio" checked={profileVisibility === 'public'} readOnly /> Public - Anyone can view your profile
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="radio" checked={profileVisibility === 'friends'} readOnly /> Friends Only - Only approved connections
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="radio" checked={profileVisibility === 'private'} readOnly /> Private - Only you can view your profile
                      </label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Activity Sharing</label>
                    <div className="flex flex-col gap-2 mt-2">
                      <label className="flex items-center gap-2">
                        <input type="checkbox" checked={activitySharing.shareWorkouts} readOnly /> Share workouts on my profile
                      </label>
                      <label className="flex items-center gap-2">
                        <input type="checkbox" checked={activitySharing.showAchievements} readOnly /> Show my achievements publicly
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* Data & Storage */}
            <div>
              <button onClick={() => toggleSection('data')} className="flex items-center gap-2 text-green-700 font-bold text-lg mb-4 w-full text-left">
                <svg className="w-5 h-5" fill="none" stroke="#22c55e" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M16 2v4M8 2v4M3 10h18"/></svg>
                Data & Storage
                <span className="ml-auto">{openSections.data ? '▲' : '▼'}</span>
              </button>
              {openSections.data && (
                <div className="mb-6 pl-6">
                  <div className="mb-4">
                    <label className="block text-sm text-gray-600 mb-1">Download Your Data</label>
                    <button className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 font-semibold bg-white hover:bg-gray-50 transition">Export Data</button>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Account Deletion</label>
                    <button className="px-4 py-2 rounded-lg border border-red-400 text-red-600 font-semibold bg-white hover:bg-red-50 transition">Delete Account</button>
                    <div className="text-xs text-gray-400 mt-2">This action cannot be undone and will permanently delete your account and all data.</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </main>
  );
} 