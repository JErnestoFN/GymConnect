'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Group, Event, Post, Author, loadGroups, saveGroups } from './groupHelpers';

// Example posts for each mock group
const examplePosts = {
  1: [ // Morning Runners
    new Post({
      id: 101,
      author: new Author({ name: 'Alice Smith', initials: 'AS' }),
      time: '1 hour ago',
      content: 'Great run this morning! 7km in 40 minutes. Thanks everyone for the motivation!',
      image: false,
      likes: 10,
      comments: 2,
      isAdmin: false,
      isAchievement: false
    }),
    new Post({
      id: 102,
      author: new Author({ name: 'John Doe', initials: 'JD' }),
      time: '3 hours ago',
      content: "Don't forget: tomorrow we meet at 6:30 AM at the park entrance! Bring water! 🏃‍♂️",
      image: false,
      likes: 7,
      comments: 1,
      isAdmin: true,
      isAchievement: false
    })
  ],
  2: [ // Gym Warriors
    new Post({
      id: 201,
      author: new Author({ name: 'Mike Strong', initials: 'MS' }),
      time: '2 hours ago',
      content: 'Leg day was brutal but worth it! Who\'s up for chest day tomorrow?',
      image: false,
      likes: 8,
      comments: 3,
      isAdmin: false,
      isAchievement: false
    }),
    new Post({
      id: 202,
      author: new Author({ name: 'Sarah Fit', initials: 'SF' }),
      time: '5 hours ago',
      content: 'Reminder: bring your own towel and water bottle. See you at 7 AM!',
      image: false,
      likes: 5,
      comments: 0,
      isAdmin: true,
      isAchievement: false
    })
  ],
  3: [ // Yoga Enthusiasts
    new Post({
      id: 301,
      author: new Author({ name: 'Emma Zen', initials: 'EZ' }),
      time: '30 minutes ago',
      content: 'Loved today\'s sunrise yoga session. Feeling relaxed and energized! 🧘‍♀️',
      image: false,
      likes: 12,
      comments: 4,
      isAdmin: false,
      isAchievement: false
    }),
    new Post({
      id: 302,
      author: new Author({ name: 'Liam Calm', initials: 'LC' }),
      time: '1 day ago',
      content: 'Don\'t forget: tomorrow we try a new breathing technique. Bring your mat!',
      image: false,
      likes: 6,
      comments: 1,
      isAdmin: true,
      isAchievement: false
    })
  ],
  4: [ // Local Basketball Team
    new Post({
      id: 401,
      author: new Author({ name: 'Chris Dunk', initials: 'CD' }),
      time: '2 hours ago',
      content: 'Great game last night! MVP goes to Alex for that amazing 3-pointer! 🏀',
      image: false,
      likes: 15,
      comments: 5,
      isAdmin: false,
      isAchievement: true
    }),
    new Post({
      id: 402,
      author: new Author({ name: 'Coach Lee', initials: 'CL' }),
      time: '6 hours ago',
      content: 'Practice tomorrow at 7 PM. Don\'t be late!',
      image: false,
      likes: 4,
      comments: 0,
      isAdmin: true,
      isAchievement: false
    })
  ]
};

const currentUser = 'You'; // Simulación de usuario actual

export default function GroupPage() {
  const params = useParams();
  const router = useRouter();
  const [group, setGroup] = useState(null);
  const [postContent, setPostContent] = useState('');
  const [posts, setPosts] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [commentInputs, setCommentInputs] = useState({});
  const [eventForm, setEventForm] = useState({ title: '', date: '', time: '', location: '' });
  const [refresh, setRefresh] = useState(false);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    const groups = loadGroups();
    const found = groups.find(g => String(g.id) === String(params.id));
    if (found) {
      // Convertir eventos a instancias de Event
      if (found.events && found.events.length > 0) {
        found.events = found.events.map(ev => Object.setPrototypeOf(ev, Event.prototype));
      }
      setGroup(found);
      if (examplePosts[found.id]) {
        setPosts([...(found.posts || []), ...examplePosts[found.id]]);
      } else {
        setPosts(found.posts || []);
      }
    }
  }, [params.id, refresh]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
  };

  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!postContent.trim() && !imagePreview) return;
    const newPost = new Post({
      id: Date.now(),
      author: new Author({ name: 'You', initials: 'YO' }),
      time: 'just now',
      content: postContent,
      image: imagePreview || false,
      likes: 0,
      comments: 0,
      isAdmin: false,
      isAchievement: false
    });
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    // Update group in localStorage
    const groups = loadGroups();
    const idx = groups.findIndex(g => String(g.id) === String(params.id));
    if (idx !== -1) {
      groups[idx].posts = updatedPosts;
      saveGroups(groups);
    }
    setPostContent('');
    setImageFile(null);
    setImagePreview(null);
  };

  // Like post
  const handleLike = (postId) => {
    const updatedPosts = posts.map(post =>
      post.id === postId ? { ...post, likes: (post.likes || 0) + (post.likedByUser ? -1 : 1), likedByUser: !post.likedByUser } : post
    );
    setPosts(updatedPosts);
    updateGroupPosts(updatedPosts);
  };

  // Add comment
  const handleAddComment = (postId) => {
    const text = commentInputs[postId]?.trim();
    if (!text) return;
    const updatedPosts = posts.map(post => {
      if (post.id === postId) {
        const newComments = post.commentsList ? [...post.commentsList, { user: 'You', text }] : [{ user: 'You', text }];
        return { ...post, comments: (post.comments || 0) + 1, commentsList: newComments };
      }
      return post;
    });
    setPosts(updatedPosts);
    setCommentInputs({ ...commentInputs, [postId]: '' });
    updateGroupPosts(updatedPosts);
  };

  // Eliminar post propio
  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter(post => post.id !== postId);
    setPosts(updatedPosts);
    updateGroupPosts(updatedPosts);
  };

  // Salir del grupo
  const handleLeaveGroup = () => {
    const groups = loadGroups();
    const filtered = groups.filter(g => String(g.id) !== String(params.id));
    saveGroups(filtered);
    router.push('/groups');
  };

  // --- EVENTOS ---
  const handleJoinEvent = (eventId) => {
    const groups = loadGroups();
    const idx = groups.findIndex(g => String(g.id) === String(params.id));
    if (idx !== -1) {
      let events = groups[idx].events || [];
      events = events.map(ev => {
        Object.setPrototypeOf(ev, Event.prototype);
        if (ev.id === eventId) {
          ev.participants = [...(ev.participants || []), currentUser];
        }
        return ev;
      });
      groups[idx].events = events;
      saveGroups(groups);
      setRefresh(r => !r);
      setFeedback('¡Te has unido al evento!');
      setTimeout(() => setFeedback(''), 2000);
    }
  };
  const handleLeaveEvent = (eventId) => {
    const groups = loadGroups();
    const idx = groups.findIndex(g => String(g.id) === String(params.id));
    if (idx !== -1) {
      let events = groups[idx].events || [];
      events = events.map(ev => {
        Object.setPrototypeOf(ev, Event.prototype);
        if (ev.id === eventId) {
          ev.participants = (ev.participants || []).filter(u => u !== currentUser);
        }
        return ev;
      });
      groups[idx].events = events;
      saveGroups(groups);
      setRefresh(r => !r);
      setFeedback('Has salido del evento.');
      setTimeout(() => setFeedback(''), 2000);
    }
  };
  const handleCreateEvent = (e) => {
    e.preventDefault();
    if (!eventForm.title || !eventForm.date || !eventForm.time || !eventForm.location) return;
    const groups = loadGroups();
    const idx = groups.findIndex(g => String(g.id) === String(params.id));
    if (idx !== -1) {
      const newEvent = new Event({
        title: eventForm.title,
        date: eventForm.date,
        time: eventForm.time,
        location: eventForm.location
      });
      newEvent.id = Date.now();
      newEvent.participants = [];
      groups[idx].events = [...(groups[idx].events || []), newEvent];
      saveGroups(groups);
      setEventForm({ title: '', date: '', time: '', location: '' });
      setRefresh(r => !r);
      setFeedback('Evento creado exitosamente.');
      setTimeout(() => setFeedback(''), 2000);
    }
  };

  function updateGroupPosts(updatedPosts) {
    const groups = loadGroups();
    const idx = groups.findIndex(g => String(g.id) === String(params.id));
    if (idx !== -1) {
      groups[idx].posts = updatedPosts;
      saveGroups(groups);
    }
  }

  if (!group) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Group not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <div className="max-w-3xl mx-auto px-4 pt-8">
        {feedback && (
          <div className="mb-4 p-3 bg-green-100 text-green-800 rounded-lg text-center font-semibold animate-fade-in">
            {feedback}
          </div>
        )}
        <div className="flex justify-between items-center mb-4">
          <button onClick={() => router.push('/groups')} className="text-green-600 font-semibold flex items-center gap-1 hover:underline text-base">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 19l-7-7 7-7" /></svg>
            Back
          </button>
          <button onClick={handleLeaveGroup} className="bg-red-100 text-red-600 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-red-200 transition">Leave Group</button>
        </div>
        {/* Tarjeta resumen de eventos próximos */}
        {group.events && group.events.length > 0 && (
          <div className="bg-green-100 rounded-xl px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <span className="flex items-center gap-2 text-green-700 font-bold text-lg">
              <svg className="w-6 h-6" fill="none" stroke="#22c55e" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
              {group.events.length} Upcoming Event{group.events.length > 1 ? 's' : ''}
            </span>
            <span className="text-gray-700 text-base font-medium">Next: {group.events[0].date} at {group.events[0].time}</span>
          </div>
        )}
        {/* Lista de eventos próximos usando solo POO */}
        {group.events && group.events.length > 0 && group.events.map(ev => (
          <div key={ev.id} className="bg-green-100 rounded-xl px-6 py-4 flex flex-col md:flex-row md:items-center md:justify-between m-4">
            <div>
              <div className="font-bold text-green-900 text-lg">{ev.title}</div>
              <div className="text-green-800 text-sm">{ev.date} a las {ev.time}</div>
              <div className="text-green-700 text-xs">{ev.location}</div>
            </div>
            <div className="mt-3 md:mt-0">
              {ev.participants && ev.participants.includes(currentUser) ? (
                <button onClick={() => handleLeaveEvent(ev.id)} className="bg-green-600 text-white font-semibold px-6 py-2 rounded-lg text-base transition">Leave</button>
              ) : (
                <button onClick={() => handleJoinEvent(ev.id)} className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg text-base transition">Unirse</button>
              )}
            </div>
          </div>
        ))}
        {/* Encabezado tipo tarjeta */}
        <div className="rounded-2xl mb-6 overflow-hidden shadow">
          <div className="bg-gradient-to-r from-green-600 to-green-400 p-8">
            <h1 className="text-3xl font-extrabold text-white mb-1">{group.name}</h1>
            <div className="text-lg text-green-100 mb-4">{group.description}</div>
          </div>
          <div className="bg-white flex flex-wrap justify-between items-center px-6 py-4 gap-6">
            <div className="flex flex-col items-center">
              <span className="flex items-center gap-2 text-green-700 font-bold text-lg"><svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0" /></svg> {group.members} members</span>
              <span className="text-xs text-gray-500">18 active</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="flex items-center gap-2 text-green-700 font-bold text-lg"><svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4" /><path d="M12 16v2" /><path d="M8 20h8" /></svg> Main location</span>
              <span className="text-xs text-gray-500">Main location</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="flex items-center gap-2 text-green-700 font-bold text-lg"><svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg> {group.events && group.events.length ? group.events.length : 0} workouts</span>
              <span className="text-xs text-gray-500">Total of the group</span>
            </div>
          </div>
          {/* Formulario para crear evento (solo owner) */}
          {group.owner === currentUser && (
            <form onSubmit={handleCreateEvent} className="bg-green-50 rounded-xl px-6 py-4 m-4 flex flex-col md:flex-row md:items-end gap-3">
              <input type="text" placeholder="Nombre del evento" value={eventForm.title} onChange={e => setEventForm({ ...eventForm, title: e.target.value })} className="rounded-lg border border-gray-200 px-4 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-green-200 flex-1" />
              <input type="date" value={eventForm.date} onChange={e => setEventForm({ ...eventForm, date: e.target.value })} className="rounded-lg border border-gray-200 px-4 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-green-200" />
              <input type="time" value={eventForm.time} onChange={e => setEventForm({ ...eventForm, time: e.target.value })} className="rounded-lg border border-gray-200 px-4 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-green-200" />
              <input type="text" placeholder="Lugar" value={eventForm.location} onChange={e => setEventForm({ ...eventForm, location: e.target.value })} className="rounded-lg border border-gray-200 px-4 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-green-200 flex-1" />
              <button type="submit" className="bg-green-600 text-white font-semibold px-6 py-2 rounded-lg text-base transition">Publicar evento</button>
            </form>
          )}
        </div>
        {/* Share */}
        <div className="bg-white rounded-2xl shadow border border-gray-200 p-4 mb-6">
          <div className="font-semibold text-gray-800 mb-2">Share with the group</div>
          <form onSubmit={handleCreatePost} className="flex flex-col gap-2">
            <input
              className="w-full rounded-lg border border-gray-200 px-4 py-2 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-green-200"
              placeholder="What do you want to share with the group?"
              value={postContent}
              onChange={e => setPostContent(e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="block text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
            />
            {imagePreview && (
              <div className="w-full flex justify-center mb-2">
                <img src={imagePreview} alt="Preview" className="max-h-48 rounded-xl border border-gray-200" />
              </div>
            )}
            <button type="submit" className="self-end bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg text-base transition">Post</button>
          </form>
        </div>
        {/* Group Activity */}
        <div className="mb-3 font-bold text-lg text-gray-900">Group Activity</div>
        <div className="flex flex-col gap-6">
          {posts.map(post => (
            <div key={post.id} className="bg-white rounded-2xl shadow border border-gray-200 p-5">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-700 text-lg">{post.author.initials}</span>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900 flex items-center gap-2">
                    {post.author.name}
                    {post.isAdmin && <span className="ml-1 bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded">Admin</span>}
                    {post.isAchievement && <span className="ml-1" title="Achievement"><svg className="w-4 h-4 inline" fill="none" stroke="#22C55E" strokeWidth="2" viewBox="0 0 32 32"><g><path d="M8 6V4h16v2" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M24 6v3a8 8 0 01-16 0V6" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 23v5" stroke="#22C55E" strokeWidth="2" strokeLinecap="round"/><path d="M12 28h8" stroke="#22C55E" strokeWidth="2" strokeLinecap="round"/><path d="M4 8v2a4 4 0 004 4" stroke="#22C55E" strokeWidth="2" strokeLinecap="round"/><path d="M28 8v2a4 4 0 01-4 4" stroke="#22C55E" strokeWidth="2" strokeLinecap="round"/></g></svg></span>}
                  </div>
                  <div className="text-xs text-gray-500">{post.time}</div>
                </div>
                {/* Botón borrar post propio */}
                {post.author.name === 'You' && (
                  <button onClick={() => handleDeletePost(post.id)} className="ml-2 text-red-500 hover:text-red-700 text-lg font-bold" title="Delete Post">×</button>
                )}
              </div>
              <div className="mb-2 text-gray-800">{post.content}</div>
              {post.image && (
                <div className="w-full flex justify-center mb-2">
                  <img src={post.image} alt="Post" className="max-h-48 rounded-xl border border-gray-200" />
                </div>
              )}
              <div className="flex items-center gap-6 text-gray-500 text-sm mt-2">
                <button onClick={() => handleLike(post.id)} className={`flex items-center gap-1 ${post.likedByUser ? 'text-red-500' : ''}`}>
                  <svg className="w-4 h-4" fill="none" stroke="#ef4444" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c2.04 0 3.81 1.23 4.5 3.09C13.19 4.23 14.96 3 17 3c3.08 0 5.5 2.42 5.5 5.5 0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg> {post.likes}
                </button>
                <span className="flex items-center gap-1"><svg className="w-4 h-4" fill="none" stroke="#22c55e" strokeWidth="2" viewBox="0 0 24 24"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg> {post.comments}</span>
                <span className="ml-auto flex items-center gap-1 cursor-pointer hover:underline"><svg className="w-4 h-4" fill="none" stroke="#64748b" strokeWidth="2" viewBox="0 0 24 24"><path d="M17 8h2a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V10a2 2 0 012-2h2" /><path d="M12 15v-6" /><path d="M9 12h6" /></svg> Share</span>
              </div>
              {/* Comments */}
              <div className="mt-2">
                {post.commentsList && post.commentsList.length > 0 && (
                  <div className="mb-2">
                    {post.commentsList.map((c, idx) => (
                      <div key={idx} className="flex items-center gap-2 mb-1 text-sm text-gray-700">
                        <span className="font-bold">{c.user}:</span> <span>{c.text}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div className="flex gap-2 mt-1">
                  <input
                    type="text"
                    value={commentInputs[post.id] || ''}
                    onChange={e => setCommentInputs({ ...commentInputs, [post.id]: e.target.value })}
                    placeholder="Add a comment..."
                    className="flex-1 rounded-lg border border-gray-200 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-200"
                  />
                  <button type="button" onClick={() => handleAddComment(post.id)} className="bg-green-100 text-green-700 font-semibold px-3 py-1 rounded-lg text-sm hover:bg-green-200 transition">Comment</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 