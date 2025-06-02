'use client';
import { useEffect, useState } from 'react';
import GroupsMain from '../_components/groups/GroupsMain';
import { loadGroups } from './groupHelpers'; // Importar la función para cargar grupos

/**
 * @function GroupsPage
 * @description Página para visualizar y gestionar grupos
 */
export default function GroupsPage() {
  const [suggestedGroups, setSuggestedGroups] = useState([]);

  useEffect(() => {
    const groups = loadGroups();
    const currentGroups = []; // Aquí deberías definir los grupos actuales, por ejemplo, desde un estado o props
    setSuggestedGroups(groups.filter(g => !currentGroups.includes(g.id)));
  }, []);

  return (
    <main className="flex flex-col min-h-screen bg-gray-50">
      <GroupsMain suggestedGroups={suggestedGroups} />
    </main>
  );
} 