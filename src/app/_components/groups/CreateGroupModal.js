import React, { useState } from 'react';

// Clase para el modelo de grupo
class GroupModel {
  constructor({ name, description, activityType, isPublic }) {
    this.name = name;
    this.description = description;
    this.activityType = activityType;
    this.isPublic = isPublic;
  }
}

const activityTypes = [
  'Running',
  'Yoga',
  'Basketball',
  'Cycling',
  'HIIT',
  'Weight Training',
  'Other',
];

export default function CreateGroupModal({ open, onClose, onCreate }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [activityType, setActivityType] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [touched, setTouched] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (!name || !description || !activityType) return;
    const newGroup = new GroupModel({ name, description, activityType, isPublic });
    setSuccess(true);
    if (onCreate) onCreate({ name, description, activityType, isPublic });
    setTimeout(() => {
      setSuccess(false);
      setName('');
      setDescription('');
      setActivityType('');
      setIsPublic(true);
      setTouched(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-8 relative animate-fade-in">
        {/* Close button */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold">×</button>
        <h2 className="text-2xl font-bold text-gray-900 mb-1">Create New Group</h2>
        <p className="text-gray-500 text-base mb-6">Create a new group to connect with friends who share your fitness interests.</p>
        {success ? (
          <div className="mb-4 w-full flex items-center justify-center">
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-semibold flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d='M5 13l4 4L19 7' stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Group created successfully
            </div>
          </div>
        ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-800 font-semibold mb-1">Group Name *</label>
            <input
              className={`w-full rounded-xl border px-4 py-3 text-gray-700 text-base bg-white focus:outline-none focus:ring-2 focus:ring-green-200 placeholder-gray-400 ${touched && !name ? 'border-red-400' : 'border-gray-200'} transition`}
              placeholder="e.g., Morning Runners"
              value={name}
              onChange={e => setName(e.target.value)}
              onBlur={() => setTouched(true)}
              autoFocus
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-800 font-semibold mb-1">Description *</label>
            <textarea
              className={`w-full rounded-xl border px-4 py-3 text-gray-700 text-base bg-white focus:outline-none focus:ring-2 focus:ring-green-200 placeholder-gray-400 resize-none ${touched && !description ? 'border-red-400' : 'border-gray-200'} transition`}
              placeholder="What is this group about?"
              value={description}
              onChange={e => setDescription(e.target.value)}
              onBlur={() => setTouched(true)}
              rows={3}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-800 font-semibold mb-1">Activity Type *</label>
            <select
              className={`w-full rounded-xl border px-4 py-3 text-gray-700 text-base bg-white focus:outline-none focus:ring-2 focus:ring-green-200 ${touched && !activityType ? 'border-red-400' : 'border-gray-200'} transition`}
              value={activityType}
              onChange={e => setActivityType(e.target.value)}
              onBlur={() => setTouched(true)}
            >
              <option value="">Select a type</option>
              {activityTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center mb-2">
            <input
              id="public-group"
              type="checkbox"
              checked={isPublic}
              onChange={e => setIsPublic(e.target.checked)}
              className="accent-green-500 w-5 h-5 mr-2"
            />
            <label htmlFor="public-group" className="text-gray-800 font-medium select-none">Make this group public</label>
          </div>
          <div className="text-xs text-gray-500 mb-6 ml-1">Public groups can be discovered by other users</div>
          <div className="flex justify-end gap-4 mt-2">
            <button type="button" className="text-gray-600 font-semibold px-4 py-2 rounded-lg hover:bg-gray-100 transition" onClick={onClose}>Cancel</button>
            <button type="submit" className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-lg text-base transition">Create Group</button>
          </div>
        </form>
        )}
      </div>
    </div>
  );
} 