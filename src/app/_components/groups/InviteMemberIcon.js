// Ícono de invitar miembro (persona con símbolo '+')
export default function InviteMemberIcon({ className = "" }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g>
        <circle cx="10" cy="10" r="6" stroke="#111827" strokeWidth="2" />
        <path d="M4 20c0-3.314 3.134-6 8-6" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
        <path d="M19 8v6" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
        <path d="M16 11h6" stroke="#111827" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  );
} 