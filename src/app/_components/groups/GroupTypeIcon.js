// Ícono de trofeo (para tipo de grupo)
export default function GroupTypeIcon({ className = "" }) {
  return (
    <svg className={className} width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g>
        <path d="M8 6V4h16v2" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M24 6v3a8 8 0 01-16 0V6" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M16 23v5" stroke="#22C55E" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 28h8" stroke="#22C55E" strokeWidth="2" strokeLinecap="round"/>
        <path d="M4 8v2a4 4 0 004 4" stroke="#22C55E" strokeWidth="2" strokeLinecap="round"/>
        <path d="M28 8v2a4 4 0 01-4 4" stroke="#22C55E" strokeWidth="2" strokeLinecap="round"/>
      </g>
    </svg>
  );
} 