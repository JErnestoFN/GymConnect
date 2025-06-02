import React, { useState } from 'react';

// Clases mock para tipos y usuarios
class NudgeType {
  constructor(id, label, icon) {
    this.id = id;
    this.label = label;
    this.icon = icon;
  }
}
class NudgeUser {
  constructor(id, name, initials) {
    this.id = id;
    this.name = name;
    this.initials = initials;
  }
}

const nudgeTypes = [
  new NudgeType('gym', 'Gym Session', <svg className="w-7 h-7" fill="none" stroke="#222" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#e6f4ea"/><path d="M15.5 9.5l-5 5M9.5 9.5l5 5" stroke="#22c55e" strokeWidth="2" strokeLinecap="round"/><path d="M9 10c0-1.1.9-2 2-2s2 .9 2 2" stroke="#222" strokeWidth="1.5"/></svg>),
  new NudgeType('workout', 'Workout Session', <svg className="w-7 h-7" fill="none" stroke="#222" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#f3f4f6"/><path d="M8 12h8" stroke="#222" strokeWidth="2" strokeLinecap="round"/><path d="M12 8v8" stroke="#222" strokeWidth="2" strokeLinecap="round"/></svg>),
  new NudgeType('challenge', 'Group Challenge', <svg className="w-7 h-7" fill="none" stroke="#222" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#f3f4f6"/><path d="M12 8v4l3 3" stroke="#222" strokeWidth="2" strokeLinecap="round"/></svg>),
];

const mockUsers = [
  new NudgeUser(1, 'Sarah Johnson', 'SJ'),
  new NudgeUser(2, 'Michael Baker', 'MB'),
  new NudgeUser(3, 'Emma Wilson', 'EW'),
];

export default function SendNudgeModal({ open, onClose }) {
  const [selectedType, setSelectedType] = useState(nudgeTypes[0].id);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  if (!open) return null;

  const toggleUser = (id) => {
    setSelectedUsers((prev) =>
      prev.includes(id) ? prev.filter((uid) => uid !== id) : [...prev, id]
    );
  };

  const handleSend = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-7 relative animate-fade-in">
        {/* Cerrar */}
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl font-bold">×</button>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Nudge</h2>
        {success && (
          <div className="mb-4 w-full flex items-center justify-center">
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-semibold flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d='M5 13l4 4L19 7' stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Nudge sent successfully!
            </div>
          </div>
        )}
        {!success && <>
        <div className="mb-5">
          <div className="text-sm font-semibold text-gray-700 mb-2">Nudge Type</div>
          <div className="flex gap-3">
            {nudgeTypes.map((type) => (
              <button
                key={type.id}
                className={`flex flex-col items-center justify-center px-5 py-3 rounded-xl border transition-all ${selectedType === type.id ? 'bg-green-50 border-green-400 text-green-700 shadow' : 'bg-white border-gray-200 text-gray-700'}`}
                onClick={() => setSelectedType(type.id)}
                type="button"
              >
                <div className="mb-1">{type.icon}</div>
                <span className="font-semibold text-base">{type.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="mb-5">
          <div className="text-sm font-semibold text-gray-700 mb-2">Select Recipients</div>
          <div className="bg-gray-50 rounded-xl border border-gray-200 max-h-40 overflow-y-auto mb-1">
            {mockUsers.map((user) => (
              <label key={user.id} className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-green-50">
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user.id)}
                  onChange={() => toggleUser(user.id)}
                  className="accent-green-500 w-4 h-4"
                />
                <span className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center font-bold text-green-700 text-lg">{user.initials}</span>
                <span className="text-gray-800 font-medium">{user.name}</span>
              </label>
            ))}
          </div>
          <div className="text-xs text-gray-500 ml-1 mb-1">Selected: {selectedUsers.length} user(s)</div>
        </div>
        <div className="mb-6">
          <div className="text-sm font-semibold text-gray-700 mb-2">Custom Message (Optional)</div>
          <textarea
            className="w-full rounded-xl border border-gray-200 p-3 text-gray-700 bg-gray-50 resize-none focus:outline-none focus:ring-2 focus:ring-green-200"
            rows={2}
            placeholder="Hey! Want to hit the gym together today?"
            value={message}
            onChange={e => setMessage(e.target.value)}
          />
        </div>
        <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 text-lg transition" onClick={handleSend}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" /></svg>
          Send Nudge Now
        </button>
        </>}
      </div>
    </div>
  );
} 