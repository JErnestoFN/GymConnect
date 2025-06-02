'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    localStorage.clear(); // Limpiar el localStorage al iniciar la aplicación
    router.replace('/login');
  }, [router]);
  return null;
} 