'use client';

import React from 'react';
import Link from 'next/link';

const actions = [
  {
    id: 'log-activity',
    title: 'Log Activity',
    href: '/activities/new',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    ),
    color: 'green'
  },
  {
    id: 'join-group',
    title: 'Join Group',
    href: '/groups',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    color: 'blue'
  },
  {
    id: 'set-timer',
    title: 'Set Timer',
    href: '#',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
      </svg>
    ),
    color: 'purple'
  },
  {
    id: 'send-nudge',
    title: 'Send Nudge',
    href: '#',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10l9-6 9 6-9 6-9-6zm9 6v6" />
      </svg>
    ),
    color: 'orange'
  },
  {
    id: 'view-stats',
    title: 'View Stats',
    href: '/stats',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    color: 'teal'
  }
];

function QuickActionButton({ action }) {
  return (
    <Link 
      href={action.href}
      className="bg-white rounded-lg shadow-sm p-6 border border-gray-100 flex flex-col items-center hover:shadow-md transition-shadow"
    >
      <div className={`p-3 rounded-full bg-green-50 text-green-600 mb-3`}>{action.icon}</div>
      <span className="text-sm font-medium text-gray-700">{action.title}</span>
    </Link>
  );
}

export default function QuickActionsContainer() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {actions.map((action) => (
        <QuickActionButton key={action.id} action={action} />
      ))}
    </div>
  );
} 