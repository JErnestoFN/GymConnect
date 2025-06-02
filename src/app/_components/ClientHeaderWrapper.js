"use client";
import { usePathname } from 'next/navigation';
import Header from './Header';

export default function ClientHeaderWrapper() {
  const pathname = usePathname();
  const hideHeader = pathname.startsWith('/login') || pathname.startsWith('/sign-up');
  if (hideHeader) return null;
  return <Header />;
} 