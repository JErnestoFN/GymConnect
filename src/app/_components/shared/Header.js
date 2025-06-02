// Componente Header con POO y mock user
'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

// POO: Clase User
class User {
  /**
   * @param {{ name: string }} params
   */
  constructor({ name }) {
    this.name = name;
  }
  getInitial() {
    return this.name ? this.name.charAt(0).toUpperCase() : '?';
  }
}

export default function Header() {
  const router = useRouter();
  // Estado mock del usuario (User o null)
  const [user, setUser] = useState(/** @type {User|null} */(new User({ name: 'John Doe' })));

  // Logout limpia el estado mock y redirige a login
  const handleLogout = () => {
    setUser(null);
    router.push('/login');
  };

  return (
    <header className="w-full bg-white border-b flex items-center justify-between px-12 py-4" style={{ borderTopLeftRadius: '8px' }}>
      {/* Logo */}
      <div className="flex items-center gap-2">
        <Image src="/logo-gymconnect.svg" alt="GymConnect Logo" width={32} height={32} />
        <span className="text-2xl font-extrabold text-green-600">GymConnect</span>
      </div>
      {/* Menú */}
      <nav className="flex gap-10">
        <Link href="/dashboard" className="text-gray-700 hover:text-green-600 font-medium">Dashboard</Link>
        <Link href="/activities" className="text-gray-700 hover:text-green-600 font-medium">Activities</Link>
        <Link href="/groups" className="text-gray-700 hover:text-green-600 font-medium">Groups</Link>
      </nav>
      {/* Usuario y acciones */}
      <div className="flex items-center gap-4">
        {/* Campana de notificaciones */}
        <button className="relative p-2 rounded-full hover:bg-gray-100" aria-label="Notificaciones" onClick={() => router.push('/notifications')}>
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
        </button>
        {/* Usuario mock */}
        {user && (
          <button onClick={() => router.push('/profile')} className="flex items-center gap-2 focus:outline-none group">
            <span className="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 text-green-600 font-bold text-lg group-hover:bg-green-200 transition">
              {user.getInitial()}
            </span>
            <span className="text-gray-700 font-medium group-hover:underline transition">{user.name}</span>
          </button>
        )}
        {/* Botón de logout */}
        <button onClick={handleLogout} className="ml-2 px-4 py-2 bg-white text-green-600 border border-green-600 rounded-lg font-semibold hover:bg-green-50 transition-colors">
          Log out
        </button>
      </div>
    </header>
  );
} 