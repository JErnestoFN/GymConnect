import { Challenge } from '../../models/Challenge';

/**
 * @function ChallengeCard
 * @description Tarjeta que muestra un reto individual
 * @param {Object} props - Propiedades del componente
 * @param {Challenge} props.challenge - Objeto de reto
 * @param {Function} props.onJoin - Función para unirse al reto
 */
function ChallengeCard({ challenge, onJoin }) {
  const remainingDays = challenge.getRemainingDays();
  const progress = challenge.participants.find(p => p.userId === 'currentUser')?.progress || 0;
  const progressPercentage = Math.min((progress / challenge.goal) * 100, 100);
  
  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="bg-indigo-600 p-4 text-white">
        <h3 className="font-bold text-lg">{challenge.title}</h3>
        <p className="text-indigo-100 text-sm">{remainingDays} días restantes</p>
      </div>
      
      <div className="p-4">
        <p className="text-gray-700 mb-4">{challenge.description}</p>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Progreso: {progress}/{challenge.goal} {challenge.goalType.toLowerCase()}</span>
            <span className="font-medium">{Math.round(progressPercentage)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-indigo-600 h-2 rounded-full" 
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">
            {challenge.participants.length} participantes
          </span>
          {!challenge.participants.some(p => p.userId === 'currentUser') ? (
            <button 
              onClick={() => onJoin(challenge.id)} 
              className="px-4 py-1 bg-indigo-100 text-indigo-700 rounded-full hover:bg-indigo-200 transition-colors"
            >
              Unirme
            </button>
          ) : (
            <span className="px-4 py-1 bg-green-100 text-green-700 rounded-full">
              Participando
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * @function FeaturedChallenges
 * @description Componente que muestra los retos destacados
 * @param {Object} props - Propiedades del componente
 * @param {string} props.userId - ID del usuario
 */
export default function FeaturedChallenges({ userId }) {
  // Datos de ejemplo - en producción, estos datos vendrían de una API
  const mockChallenges = [
    new Challenge({
      id: '1',
      title: 'Desafío 5K',
      description: 'Corre 5 kilómetros en menos de 30 minutos',
      startDate: new Date(),
      endDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // 14 días
      goal: 5,
      goalType: 'DISTANCE',
      participants: [
        { userId: 'user1', progress: 3, joinedAt: new Date(), completedAt: null },
        { userId: 'user2', progress: 5, joinedAt: new Date(), completedAt: new Date() }
      ]
    }),
    new Challenge({
      id: '2',
      title: '100 Flexiones',
      description: 'Realiza 100 flexiones cada día durante una semana',
      startDate: new Date(),
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 días
      goal: 100,
      goalType: 'REPETITIONS',
      participants: [
        { userId: 'currentUser', progress: 40, joinedAt: new Date(), completedAt: null },
        { userId: 'user3', progress: 75, joinedAt: new Date(), completedAt: null }
      ]
    })
  ];

  // Función simulada para unirse a un reto
  const handleJoinChallenge = (challengeId) => {
    console.log(`Unirse al reto ${challengeId}`);
    // Aquí iría la lógica para unirse al reto
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {mockChallenges.length > 0 ? (
        mockChallenges.map(challenge => (
          <ChallengeCard 
            key={challenge.id} 
            challenge={challenge} 
            onJoin={handleJoinChallenge} 
          />
        ))
      ) : (
        <div className="col-span-2 text-center py-8">
          <p className="text-gray-500">No hay retos disponibles actualmente.</p>
          <button className="mt-2 text-blue-600 hover:text-blue-800">
            Crear un nuevo reto
          </button>
        </div>
      )}
    </div>
  );
} 