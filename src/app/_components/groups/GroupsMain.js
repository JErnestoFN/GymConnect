'use client';
import React, { useState, useEffect } from 'react';
import GroupCard, { GroupModel, GroupEvent } from './GroupCard';
import SuggestedGroupCard, { SuggestedGroupModel } from './SuggestedGroupCard';
import SendNudgeModal from '../nudge/SendNudgeModal';
import GroupTypeIcon from './GroupTypeIcon';
import CreateGroupModal from './CreateGroupModal';
import { useRouter } from 'next/navigation';

// Datos mock para grupos del usuario
const userGroups = [
  new GroupModel({
    id: 1,
    name: 'Morning Runners',
    description: 'Early morning running group for all levels',
    type: 'Running',
    members: 8,
    owner: 'user1',
    isOwner: true,
    isJoined: true,
    upcomingEvents: [
      new GroupEvent({ id: 1, title: 'Morning Run', date: 'Mañana', time: '7:00 AM' }),
      new GroupEvent({ id: 2, title: 'Long Run', date: 'Sábado', time: '6:30 AM' })
    ]
  }),
  new GroupModel({
    id: 2,
    name: 'Gym Warriors',
    description: 'Dedicated weight lifters and bodybuilders',
    type: 'Weight Training',
    members: 15,
    owner: 'user2',
    isOwner: false,
    isJoined: true,
    upcomingEvents: [
      new GroupEvent({ id: 3, title: 'Leg Day', date: 'Mañana', time: '7:00 AM' })
    ]
  }),
  new GroupModel({
    id: 3,
    name: 'Yoga Enthusiasts',
    description: 'Share yoga routines and wellness tips',
    type: 'Yoga',
    members: 12,
    owner: 'user1',
    isOwner: true,
    isJoined: true,
    upcomingEvents: []
  }),
  new GroupModel({
    id: 4,
    name: 'Local Basketball Team',
    description: 'Weekly basketball games at the community court',
    type: 'Basketball',
    members: 10,
    owner: 'user3',
    isOwner: false,
    isJoined: true,
    upcomingEvents: [
      new GroupEvent({ id: 4, title: 'Game Night', date: 'Mañana', time: '7:00 AM' })
    ]
  })
];

// Datos mock para grupos sugeridos
const initialSuggestedGroups = [
  new SuggestedGroupModel({
    id: 1,
    name: 'Cycling Enthusiasts',
    members: 32,
    description: 'Weekend cycling group for all skill levels'
  }),
  new SuggestedGroupModel({
    id: 2,
    name: 'HIIT Warriors',
    members: 48,
    description: 'High intensity interval training group'
  }),
  new SuggestedGroupModel({
    id: 3,
    name: 'Downtown Runners',
    members: 26,
    description: 'Urban running group for all paces'
  })
];

// Convertir los datos de grupos a estado
const initialGroups = [
  new GroupModel({
    id: 1,
    name: 'Morning Runners',
    description: 'Early morning running group for all levels',
    type: 'Running',
    members: 8,
    owner: 'user1',
    isOwner: true,
    isJoined: true,
    upcomingEvents: [
      new GroupEvent({ id: 1, title: 'Morning Run', date: 'Tomorrow', time: '7:00 AM' }),
      new GroupEvent({ id: 2, title: 'Long Run', date: 'Saturday', time: '6:30 AM' })
    ]
  }),
  new GroupModel({
    id: 2,
    name: 'Gym Warriors',
    description: 'Dedicated weight lifters and bodybuilders',
    type: 'Weight Training',
    members: 15,
    owner: 'user2',
    isOwner: false,
    isJoined: true,
    upcomingEvents: [
      new GroupEvent({ id: 3, title: 'Leg Day', date: 'Tomorrow', time: '7:00 AM' })
    ]
  }),
  new GroupModel({
    id: 3,
    name: 'Yoga Enthusiasts',
    description: 'Share yoga routines and wellness tips',
    type: 'Yoga',
    members: 12,
    owner: 'user1',
    isOwner: true,
    isJoined: true,
    upcomingEvents: []
  }),
  new GroupModel({
    id: 4,
    name: 'Local Basketball Team',
    description: 'Weekly basketball games at the community court',
    type: 'Basketball',
    members: 10,
    owner: 'user3',
    isOwner: false,
    isJoined: true,
    upcomingEvents: [
      new GroupEvent({ id: 4, title: 'Game Night', date: 'Tomorrow', time: '7:00 AM' })
    ]
  })
];

const GROUPS_KEY = 'gymconnect_groups';

function loadGroups() {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(GROUPS_KEY);
    if (data) return JSON.parse(data);
  }
  return initialGroups;
}
function saveGroups(groups) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(GROUPS_KEY, JSON.stringify(groups));
  }
}

export default function GroupsMain() {
  const [showNudge, setShowNudge] = useState(false);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [groups, setGroups] = useState(loadGroups());
  const [suggested, setSuggested] = useState(initialSuggestedGroups);
  const [groupEvents, setGroupEvents] = useState([]);
  const router = useRouter();

  useEffect(() => { saveGroups(groups); }, [groups]);

  // On mount, load from localStorage
  useEffect(() => {
    setGroups(loadGroups());
  }, []);

  // On create group
  const handleCreateGroup = (groupData) => {
    const newId = groups.length ? Math.max(...groups.map(g => g.id)) + 1 : 1;
    const newGroup = new GroupModel({
      id: newId,
      name: groupData.name,
      description: groupData.description,
      type: groupData.activityType,
      members: 1,
      owner: 'currentUser',
      isOwner: true,
      isJoined: true,
      upcomingEvents: []
    });
    setGroups([newGroup, ...groups]);
  };

  // Join suggested group
  const handleJoinSuggested = (suggestedGroup) => {
    // Convert to GroupModel
    const newId = groups.length ? Math.max(...groups.map(g => g.id)) + 1 : 1;
    const newGroup = new GroupModel({
      id: newId,
      name: suggestedGroup.name,
      description: suggestedGroup.description,
      type: suggestedGroup.name.includes('Cycling') ? 'Cycling' : suggestedGroup.name.includes('HIIT') ? 'HIIT' : 'Running',
      members: suggestedGroup.members,
      owner: suggestedGroup.owner || '',
      isOwner: false,
      isJoined: true,
      upcomingEvents: [
        new GroupEvent({ id: 1, title: 'Group Event', date: 'Tomorrow', time: '8:00 AM' })
      ],
      posts: []
    });
    setGroups([newGroup, ...groups]);
    setSuggested(suggested.filter(g => g.id !== suggestedGroup.id));
  };

  // Función para postear un evento
  const handlePostEvent = (groupId, eventData) => {
    setGroups(prevGroups => prevGroups.map(g => {
      if (g.id === groupId) {
        const updatedEvents = [...(g.upcomingEvents || []), eventData];
        return { ...g, upcomingEvents: updatedEvents };
      }
      return g;
    }));
  };

  // Función para unirse/salirse de un evento
  const handleToggleJoinEvent = (groupId, eventId, userId = 'currentUser') => {
    setGroups(prevGroups => prevGroups.map(g => {
      if (g.id === groupId) {
        const updatedEvents = (g.upcomingEvents || []).map(ev => {
          if (ev.id === eventId) {
            const isJoined = ev.participants?.includes(userId);
            return {
              ...ev,
              participants: isJoined
                ? ev.participants.filter(uid => uid !== userId)
                : [...(ev.participants || []), userId]
            };
          }
          return ev;
        });
        return { ...g, upcomingEvents: updatedEvents };
      }
      return g;
    }));
  };

  return (
    <div className="w-full max-w-[1300px] mx-auto px-4 py-6">
      {/* Header superior con títulos y acciones alineadas */}
      <div className="flex flex-row items-start justify-between mb-8 gap-4">
        <div>
          {/* <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Your Groups</h1> */}
          <div className="flex items-center gap-2">
            <svg className="w-7 h-7 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" /></svg>
            <h2 className="text-3xl font-extrabold text-gray-900">My Groups</h2>
          </div>
        </div>
        <div className="flex flex-col items-end gap-3 min-w-[180px] max-w-[180px]">
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 w-full justify-center text-base" onClick={() => setShowNudge(true)}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
            Send Nudge
          </button>
          <div className="relative w-full">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
            </span>
            <input type="text" placeholder="Search groups..." className="pl-9 pr-3 py-2 w-full rounded-lg border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-200" />
          </div>
          <button className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg flex items-center gap-2 w-full justify-center text-base" onClick={() => setShowCreateGroup(true)}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" /></svg>
            Create Group
          </button>
        </div>
      </div>
      <SendNudgeModal open={showNudge} onClose={() => setShowNudge(false)} />
      <CreateGroupModal open={showCreateGroup} onClose={() => setShowCreateGroup(false)} onCreate={handleCreateGroup} />
      {/* Grid de grupos del usuario */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
        {groups.map(group => (
          <div key={group.id} onClick={() => router.push(`/groups/${group.id}`)} className="cursor-pointer">
            <GroupCard group={group} />
          </div>
        ))}
      </div>
      {/* Grupos sugeridos */}
      <div className="flex items-center justify-between mb-2 mt-10">
        <h3 className="text-xl font-bold text-gray-800">Suggested Groups</h3>
        <a href="#" className="text-green-600 font-semibold flex items-center gap-1 hover:underline">See all <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 5l7 7-7 7" /></svg></a>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {suggested.map(group => (
          <SuggestedGroupCard key={group.id} group={group} onJoin={() => handleJoinSuggested(group)} />
        ))}
      </div>
    </div>
  );
} 