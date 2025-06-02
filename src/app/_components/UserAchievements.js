/**
 * @function AchievementCard
 * @description Tarjeta individual que muestra un logro
 * @param {Object} props - Propiedades del componente
 * @param {Object} props.achievement - Datos del logro
 * @param {boolean} props.earned - Si el logro ha sido obtenido
 */
function AchievementCard({ achievement, earned = false }) {
  return (
    <div className={`border rounded-lg p-4 ${earned ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50 border-gray-200'}`}>
      <div className="flex items-center">
        <div className={`text-2xl mr-3 ${earned ? '' : 'opacity-50'}`}>
          {achievement.icon}
        </div>
        <div className="flex-1">
          <h4 className={`font-medium ${earned ? 'text-gray-800' : 'text-gray-500'}`}>
            {achievement.name}
          </h4>
          <p className="text-sm text-gray-500">
            {achievement.description}
          </p>
        </div>
        <div className="ml-4">
          {earned ? (
            <div className="bg-yellow-400 text-yellow-800 text-xs font-bold py-1 px-2 rounded">
              +{achievement.points} pts
            </div>
          ) : (
            <div className="bg-gray-200 text-gray-500 text-xs font-bold py-1 px-2 rounded">
              Bloqueado
            </div>
          )}
        </div>
      </div>
      
      {earned && achievement.earnedAt && (
        <div className="mt-2 text-xs text-gray-500">
          Conseguido el {new Date(achievement.earnedAt).toLocaleDateString('es-ES')}
        </div>
      )}
    </div>
  );
}

/**
 * @function UserAchievements
 * @description Componente que muestra los logros del usuario
 * @param {Object} props - Propiedades del componente
 * @param {string} props.userId - ID del usuario
 */
export default function UserAchievements({ userId }) {
  // Datos de ejemplo - en producción, estos datos vendrían de una API
  const mockAchievements = [
    {
      id: '1',
      name: 'Primeros Pasos',
      description: 'Registrar tu primera actividad',
      icon: '🏅',
      points: 10,
      earned: true,
      earnedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) // Hace 30 días
    },
    {
      id: '2',
      name: 'Madrugador',
      description: 'Completar una actividad antes de las 8 AM',
      icon: '🌅',
      points: 15,
      earned: true,
      earnedAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000) // Hace 15 días
    },
    {
      id: '3',
      name: 'Corredor 5K',
      description: 'Correr 5 kilómetros en una sesión',
      icon: '🏃',
      points: 25,
      earned: true,
      earnedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // Hace 5 días
    },
    {
      id: '4',
      name: 'Constante',
      description: 'Registrar actividades 5 días seguidos',
      icon: '📆',
      points: 30,
      earned: false
    },
    {
      id: '5',
      name: 'Ciclista Pro',
      description: 'Recorrer 50 kilómetros en bicicleta',
      icon: '🚴',
      points: 35,
      earned: false
    }
  ];
  
  // Separar logros obtenidos y no obtenidos
  const earnedAchievements = mockAchievements.filter(a => a.earned);
  const lockedAchievements = mockAchievements.filter(a => !a.earned);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
          <span className="text-3xl font-bold text-yellow-500">{earnedAchievements.length}</span>
          <span className="text-gray-500 ml-2">de {mockAchievements.length} logros</span>
        </div>
        <div className="text-sm text-gray-500">
          {earnedAchievements.reduce((sum, a) => sum + a.points, 0)} puntos
        </div>
      </div>
      
      <div className="space-y-3">
        <h3 className="text-base font-medium text-gray-700 mb-2">Logros obtenidos</h3>
        
        {earnedAchievements.length > 0 ? (
          earnedAchievements.map(achievement => (
            <AchievementCard 
              key={achievement.id} 
              achievement={achievement} 
              earned={true} 
            />
          ))
        ) : (
          <p className="text-sm text-gray-500 py-2">
            Aún no has conseguido ningún logro. ¡Sigue entrenando!
          </p>
        )}
        
        {lockedAchievements.length > 0 && (
          <>
            <h3 className="text-base font-medium text-gray-700 mt-6 mb-2">Próximos logros</h3>
            
            {lockedAchievements.slice(0, 2).map(achievement => (
              <AchievementCard 
                key={achievement.id} 
                achievement={achievement} 
                earned={false} 
              />
            ))}
            
            {lockedAchievements.length > 2 && (
              <button className="w-full mt-2 text-sm text-blue-600 hover:text-blue-800">
                Ver más logros ({lockedAchievements.length - 2} restantes)
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
} 