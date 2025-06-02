import React from 'react';

// Clase para grupo sugerido
class SuggestedGroupModel {
  constructor({ id, name, members, description }) {
    this.id = id;
    this.name = name;
    this.members = members;
    this.description = description;
  }
}

export default function SuggestedGroupCard({ group, onJoin }) {
  return (
    <div className="bg-white rounded-2xl shadow border border-gray-200 p-6 flex flex-col min-w-[300px] max-w-[350px]">
      <div className="flex flex-col gap-1 mb-2">
        <span className="text-xs text-gray-400">{group.members} members</span>
        <h4 className="font-bold text-lg text-gray-900 leading-tight">{group.name}</h4>
        <p className="text-gray-500 text-sm mb-2">{group.description}</p>
      </div>
      <button onClick={onJoin} className="mt-auto bg-white border border-green-500 text-green-600 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-green-50 transition">
        Join
      </button>
    </div>
  );
}

export { SuggestedGroupModel }; 