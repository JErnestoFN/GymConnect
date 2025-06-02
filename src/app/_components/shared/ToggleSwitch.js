import React from 'react';

export default function ToggleSwitch({ enabled, setEnabled, color = 'green', ariaLabel }) {
  const colorMap = {
    green: 'bg-green-500',
    yellow: 'bg-yellow-400',
    purple: 'bg-purple-500',
    blue: 'bg-blue-500',
    pink: 'bg-pink-500',
    gray: 'bg-gray-400',
  };
  return (
    <button
      type="button"
      aria-label={ariaLabel}
      onClick={() => setEnabled(!enabled)}
      className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-300 relative focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${color}-400
        ${enabled ? colorMap[color] : 'bg-gray-200 border border-gray-200'}`}
      style={{ minWidth: 44 }}
    >
      <span
        className={`h-5 w-5 bg-white rounded-full shadow transition-transform duration-300 absolute top-0.5 left-1
          ${enabled ? 'translate-x-5' : 'translate-x-0'}`}
      />
    </button>
  );
} 