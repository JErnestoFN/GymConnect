export function loadGroups() {
  if (typeof window !== 'undefined') {
    const groups = JSON.parse(localStorage.getItem('groups')) || [];
    return groups;
  }
  return [];
} 