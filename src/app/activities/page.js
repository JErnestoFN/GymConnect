'use client';

import Link from 'next/link';
import { useState, useRef } from 'react';
import Image from 'next/image';
import React from 'react';
import SendNudgeModal from '../_components/nudge/SendNudgeModal';

// POO: Modelo de actividad
/**
 * @typedef {Object} ActivityParams
 * @property {number} id
 * @property {string} type
 * @property {string} category
 * @property {string} date
 * @property {string} title
 * @property {string} description
 * @property {number} calories
 * @property {string} intensity
 * @property {number} score
 */

class Activity {
  /**
   * @param {ActivityParams} param0
   */
  constructor({ id, type, category, date, title, description, calories, intensity, score }) {
    this.id = id;
    this.type = type;
    this.category = category;
    this.date = date;
    this.title = title;
    this.description = description;
    this.calories = calories;
    this.intensity = intensity;
    this.score = score;
  }
}

// POO: Servicio de actividades
class ActivityService {
  static getMockActivities() {
    return [
      new Activity({
        id: 1,
        type: 'Cardio',
        category: 'Strength',
        date: '2025-04-25',
        title: 'Morning Run',
        description: 'Felt great, increased pace in the last mile',
        calories: 420,
        intensity: 'High',
        score: 45
      }),
      new Activity({
        id: 2,
        type: 'Strength',
        category: 'Strength',
        date: '2025-04-24',
        title: 'Upper Body Workout',
        description: 'Focused on chest and arms, increased weight on bench press',
        calories: 380,
        intensity: 'Medium',
        score: 60
      }),
      new Activity({
        id: 3,
        type: 'Flexibility',
        category: 'Flexibility',
        date: '2025-04-23',
        title: 'Yoga Session',
        description: 'Morning session, focused on deep stretching',
        calories: 150,
        intensity: 'Low',
        score: 30
      }),
      new Activity({
        id: 4,
        type: 'Sports',
        category: 'Sports',
        date: '2025-04-22',
        title: 'Basketball Game',
        description: 'Team game at the local court, won 72-68',
        calories: 650,
        intensity: 'High',
        score: 90
      }),
      new Activity({
        id: 5,
        type: 'Recovery',
        category: 'Recovery',
        date: '2025-04-21',
        title: 'Recovery Session',
        description: "Foam rolling and light stretching after yesterday's intense workout",
        calories: 120,
        intensity: 'Low',
        score: 45
      })
    ];
  }
}

const FILTERS = ['All', 'Strength', 'Cardio', 'Flexibility', 'Sports', 'Recovery'];

/**
 * @param {{ activity: Activity, onEdit: Function, onDelete: Function }} props
 */
function ActivityCard({ activity, onEdit, onDelete }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Cerrar menú al hacer clic fuera
  React.useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuOpen]);

  // Colores para badges
  const badgeColors = {
    Strength: 'bg-blue-100 text-blue-600',
    Cardio: 'bg-green-100 text-green-600',
    Flexibility: 'bg-purple-100 text-purple-600',
    Sports: 'bg-yellow-100 text-yellow-600',
    Recovery: 'bg-gray-100 text-gray-600',
  };
  const intensityColor = activity.intensity === 'High' ? 'text-red-600' : activity.intensity === 'Medium' ? 'text-yellow-600' : 'text-green-600';
  const intensityArrow = activity.intensity === 'High' ? (
    <span className="ml-1 text-xs">↑</span>
  ) : null;

  return (
    <div className="bg-white border border-gray-200 rounded-xl px-8 py-5 flex flex-col gap-2 mb-4 shadow-sm">
      <div className="flex items-center gap-4">
        {/* Score */}
        <span className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600 font-bold text-lg mr-2 border-2 border-green-200">{activity.score}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`px-2 py-0.5 rounded text-xs font-semibold ${badgeColors[activity.type] || 'bg-gray-100 text-gray-600'}`}>{activity.type}</span>
            <span className="text-xs text-gray-400">{activity.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <h3 className="font-bold text-gray-800 text-lg leading-tight truncate">{activity.title}</h3>
            {/* Botón de 3 puntos al lado del nombre */}
            <div className="relative">
              <button
                className="p-1 rounded-full hover:bg-gray-100 focus:outline-none"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label="Options"
              >
                <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                  <circle cx="10" cy="4" r="1.5" />
                  <circle cx="10" cy="10" r="1.5" />
                  <circle cx="10" cy="16" r="1.5" />
                </svg>
              </button>
              {menuOpen && (
                <div ref={menuRef} className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-xl shadow-lg z-10 py-2">
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-800 hover:bg-gray-50"
                    onClick={() => { setMenuOpen(false); onEdit && onEdit(activity); }}
                  >
                    <svg className="w-4 h-4 mr-2 text-gray-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M15.232 5.232l3.536 3.536M9 11l6 6M3 21h6l11-11a2.828 2.828 0 00-4-4L5 17v4z" /></svg>
                    Edit
                  </button>
                  <button
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    onClick={() => { setMenuOpen(false); onDelete && onDelete(activity); }}
                  >
                    <svg className="w-4 h-4 mr-2 text-red-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2" /></svg>
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
          <p className="text-gray-500 text-sm mt-1 truncate">{activity.description}</p>
        </div>
      </div>
      <div className="flex flex-row flex-wrap justify-end gap-8 mt-2 pr-2">
        <div className="flex flex-col items-end">
          <span className="text-xs text-gray-500">Calories</span>
          <span className="font-bold text-lg text-gray-800">{activity.calories}</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs text-gray-500">Intensity</span>
          <span className={`font-semibold ${intensityColor} flex items-center`}>{activity.intensity}{intensityArrow}</span>
        </div>
      </div>
    </div>
  );
}

export default function ActivityLogPage() {
  const [filter, setFilter] = useState('All');
  const [search, setSearch] = useState('');
  const [activities, setActivities] = useState(ActivityService.getMockActivities());
  const [showNudgeModal, setShowNudgeModal] = useState(false);

  // Handlers para editar y eliminar (mock)
  const handleEdit = (activity) => {
    alert('Edit activity: ' + activity.title);
  };
  const handleDelete = (activity) => {
    if (window.confirm('Are you sure you want to delete this activity?')) {
      setActivities(acts => acts.filter(a => a.id !== activity.id));
    }
  };

  const filtered = activities.filter(a =>
    (filter === 'All' || a.type === filter) &&
    (a.title.toLowerCase().includes(search.toLowerCase()) || a.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <main className="min-h-screen bg-gray-50 pb-10">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-6 justify-between">
          <div className="flex items-center gap-2">
            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            <h2 className="text-xl font-bold text-gray-700">Activity Log</h2>
          </div>
          <button
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg transition text-base shadow"
            onClick={() => setShowNudgeModal(true)}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
            Send Nudges
          </button>
        </div>
        <SendNudgeModal open={showNudgeModal} onClose={() => setShowNudgeModal(false)} />
        <div className="flex flex-wrap gap-2 mb-6">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded-full text-sm font-semibold border ${filter === f ? 'bg-green-500 text-white border-green-500' : 'bg-white text-gray-600 border-gray-200 hover:bg-green-50'}`}
            >
              {f}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 mb-6">
          <input
            type="text"
            placeholder="Search activities..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="flex-1 px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button className="px-4 py-2 border border-gray-200 rounded-lg text-gray-600 font-semibold hover:bg-gray-100 flex items-center gap-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v16a1 1 0 01-1 1H4a1 1 0 01-1-1V4z" /></svg>
            Filter
          </button>
        </div>
        <div>
          {filtered.map(activity => (
            <ActivityCard key={activity.id} activity={activity} onEdit={handleEdit} onDelete={handleDelete} />
          ))}
        </div>
        <div className="flex items-center justify-between mt-8 text-gray-500 text-sm">
          <button className="p-2 rounded hover:bg-gray-100">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          </button>
          <span>April 2025</span>
          <button className="p-2 rounded hover:bg-gray-100">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
          </button>
        </div>
        <div className="text-center text-gray-400 text-xs mt-2">Showing recent activities</div>
      </div>
    </main>
  );
} 