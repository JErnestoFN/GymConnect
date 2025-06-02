import { Group } from '../../models/Group';
import Link from 'next/link';
import Image from 'next/image';

/**
 * @function GroupCard
 * @description Tarjeta individual que muestra un grupo
 * @param {Object} props - Propiedades del componente
 * @param {Group} props.group - Objeto de grupo
 */
function GroupCard({ group }) {
  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="h-32 bg-gray-200 relative">
        {group.image ? (
          <Image 
            src={group.image} 
            alt={group.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center bg-indigo-100">
            <span className="text-3xl text-indigo-600 font-bold">
              {group.name.charAt(0)}
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="font-bold text-gray-800">{group.name}</h3>
          {group.isPrivate && (
            <span className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded">
              Privado
            </span>
          )}
        </div>
        
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {group.description || 'Sin descripción'}
        </p>
        
        <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
          <span>{group.members.length} miembros</span>
          <span className="text-indigo-600 font-medium">{group.role}</span>
        </div>
      </div>
      
      <div className="px-4 py-3 bg-gray-50 border-t">
        <Link 
          href={`/groups/${group.id}`}
          className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
        >
          Ver grupo →
        </Link>
      </div>
    </div>
  );
}

/**
 * @function GroupsList
 * @description Componente que muestra la lista de grupos del usuario
 * @param {Object} props - Propiedades del componente
 * @param {string} props.userId - ID del usuario
 */
export default function GroupsList({ userId }) {
  // Datos de ejemplo - en producción, estos datos vendrían de una API
  const mockGroups = [
    new Group({
      id: '1',
      name: 'Runners Club',
      description: 'Grupo para amantes del running en la ciudad. Organizamos carreras semanales y compartimos rutas.',
      image: null,
      isPrivate: false,
      members: [
        { userId: '1', role: 'OWNER' },
        { userId: '2', role: 'MEMBER' },
        { userId: '3', role: 'MEMBER' }
      ],
      role: 'OWNER'
    }),
    new Group({
      id: '2',
      name: 'Yoga & Meditación',
      description: 'Espacio para compartir prácticas de yoga, meditación y bienestar.',
      image: null,
      isPrivate: false,
      members: [
        { userId: '2', role: 'OWNER' },
        { userId: '1', role: 'MEMBER' },
        { userId: '4', role: 'MEMBER' },
        { userId: '5', role: 'MEMBER' }
      ],
      role: 'MEMBER'
    }),
    new Group({
      id: '3',
      name: 'Ciclistas Urbanos',
      description: 'Grupo de ciclismo urbano para recorrer la ciudad y compartir rutas seguras.',
      image: null,
      isPrivate: true,
      members: [
        { userId: '6', role: 'OWNER' },
        { userId: '1', role: 'ADMIN' },
        { userId: '7', role: 'MEMBER' }
      ],
      role: 'ADMIN'
    })
  ];

  return (
    <div>
      {mockGroups.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockGroups.map(group => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No perteneces a ningún grupo aún.</p>
          <Link 
            href="/groups/discover" 
            className="mt-2 text-indigo-600 hover:text-indigo-800 inline-block"
          >
            Explorar grupos disponibles
          </Link>
        </div>
      )}
    </div>
  );
} 