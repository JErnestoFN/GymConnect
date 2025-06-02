'use client';
import React, { useState, useRef, useEffect } from 'react';
import GroupTypeIcon from './GroupTypeIcon';
import InviteMemberIcon from './InviteMemberIcon';

// Clase para eventos próximos
class GroupEvent {
  constructor({ id, title, date, time }) {
    this.id = id;
    this.title = title;
    this.date = date;
    this.time = time;
  }
}

// Clase para grupo
class GroupModel {
  constructor({ id, name, description, type, members, owner, isOwner, upcomingEvents, isJoined }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.type = type;
    this.members = members;
    this.owner = owner;
    this.isOwner = isOwner;
    this.upcomingEvents = upcomingEvents;
    this.isJoined = isJoined;
  }
}

// Clase para opción de menú
class GroupMenuOption {
  constructor(id, label, icon) {
    this.id = id;
    this.label = label;
    this.icon = icon;
  }
}

const menuOptions = [
  new GroupMenuOption('invite', 'Invite Member', <InviteMemberIcon className="w-5 h-5 mr-2" />),
  new GroupMenuOption('message', 'Message Group', <svg className="w-5 h-5 mr-2" fill="none" stroke="#222" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>),
];

export default function GroupCard({ group }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  return (
    <div className="bg-white rounded-2xl shadow border border-gray-200 p-5 flex flex-col min-w-[320px] max-w-[350px] relative">
      {/* Menú de 3 puntos */}
      <div className="absolute top-4 right-4">
        <button onClick={() => setMenuOpen(v => !v)} className="text-gray-400 hover:text-gray-600 focus:outline-none">
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><circle cx="5" cy="12" r="2" fill="#9ca3af"/><circle cx="12" cy="12" r="2" fill="#9ca3af"/><circle cx="19" cy="12" r="2" fill="#9ca3af"/></svg>
        </button>
        {menuOpen && (
          <div ref={menuRef} className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-xl shadow-lg z-20 py-2 animate-fade-in">
            {menuOptions.map(opt => (
              <button key={opt.id} className="w-full flex items-center px-4 py-2 text-gray-900 hover:bg-gray-50 text-base" onClick={() => setMenuOpen(false)}>
                {opt.icon}
                {opt.label}
              </button>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center gap-2 mb-1">
        <h3 className="font-extrabold text-lg text-gray-900 leading-tight">{group.name}</h3>
        {group.isOwner && (
          <span className="ml-1 bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded">Owner</span>
        )}
      </div>
      <p className="text-gray-500 text-sm mb-2">{group.description}</p>
      <div className="flex gap-6 mb-2 text-sm">
        <span className="flex items-center gap-1 text-gray-700">
          <svg className="w-4 h-4" fill="none" stroke="#22c55e" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" /></svg>
          Members <span className="font-bold ml-1">{group.members}</span>
        </span>
        <span className="flex flex-col items-start gap-0 min-w-[110px]">
          <span className="flex items-center gap-1 text-gray-400 text-sm mb-0.5">
            <GroupTypeIcon className="w-5 h-5" />
            Type of Group
          </span>
          <span className="text-black font-bold text-base leading-tight">{group.type}</span>
        </span>
      </div>
      {/* Eventos próximos */}
      {group.upcomingEvents && group.upcomingEvents.length > 0 ? (
        <div className="bg-green-100 rounded-xl px-3 py-2 flex items-center justify-between mb-2">
          <span className="flex items-center gap-1 text-green-800 text-sm">
            <svg className="w-5 h-5" fill="none" stroke="#22c55e" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
            {group.upcomingEvents.length} Upcoming Event{group.upcomingEvents.length > 1 ? 's' : ''}
          </span>
          <span className="text-xs text-gray-700">Next: {group.upcomingEvents[0].date} at {group.upcomingEvents[0].time}</span>
        </div>
      ) : (
        <div className="bg-gray-100 rounded-xl px-3 py-2 text-gray-400 text-sm mb-2">No upcoming events</div>
      )}
      <div className="flex justify-end">
        {group.upcomingEvents && group.upcomingEvents.length > 0 && (
          <button className="bg-green-100 text-green-700 font-semibold px-4 py-1.5 rounded-lg text-sm hover:bg-green-200 transition">
            Join
          </button>
        )}
      </div>
    </div>
  );
}

// Exportar las clases para uso en mock data
export { GroupModel, GroupEvent }; 