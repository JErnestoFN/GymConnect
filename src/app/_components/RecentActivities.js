import { Activity } from '../../models/Activity';

/**
 * @function ActivityCard
 * @description Tarjeta que muestra una actividad individual
 * @param {Object} props - Propiedades del componente
 * @param {Activity} props.activity - Objeto de actividad
 */
function ActivityCard({ activity }) {
  // Iconos para diferentes tipos de actividades
  const activityIcons = {
    'RUNNING': '🏃',
    'CYCLING': '🚴',
    'SWIMMING': '🏊',
    'WEIGHTLIFTING': '🏋️',
    'YOGA': '🧘',
    'HIIT': '⚡',
    'WALKING': '🚶',
    'DANCING': '💃',
    'FOOTBALL': '⚽',
    'BASKETBALL': '🏀',
    'TENNIS': '🎾'
  };

  const icon = activityIcons[activity.type] || '🏋️';
  const formattedDate = new Date(activity.date).toLocaleDateString('es-ES', {
    weekday: 'long',
    month: 'short',
    day: 'numeric'
  });

  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center">
        <div className="text-3xl mr-4">{icon}</div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-800">{activity.type}</h3>
          <p className="text-sm text-gray-500">{formattedDate}</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold text-gray-800">
            {activity.duration} min
          </p>
          {activity.distance && (
            <p className="text-sm text-gray-600">{activity.distance} km</p>
          )}
        </div>
      </div>
      
      {activity.notes && (
        <p className="mt-2 text-sm text-gray-600">{activity.notes}</p>
      )}
      
      <div className="mt-3 flex justify-between text-xs text-gray-500">
        <span>
          {activity.calories ? `${activity.calories} calorías` : 'Calorías no registradas'}
        </span>
        <span>
          {activity.getSpeed() ? `${activity.getSpeed().toFixed(1)} km/h` : ''}
        </span>
      </div>
    </div>
  );
}

/**
 * @function RecentActivities
 * @description Componente que muestra las actividades recientes del usuario
 * @param {Object} props - Propiedades del componente
 * @param {string} props.userId - ID del usuario
 */
export default function RecentActivities({ userId }) {
  // Datos de ejemplo - en producción, estos datos vendrían de una API
  const mockActivities = [
    new Activity({
      id: '1',
      type: 'RUNNING',
      duration: 45,
      distance: 5.2,
      calories: 450,
      date: new Date(Date.now() - 24 * 60 * 60 * 1000), // Ayer
      notes: 'Buen ritmo constante en el parque'
    }),
    new Activity({
      id: '2',
      type: 'WEIGHTLIFTING',
      duration: 60,
      calories: 300,
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // Hace 3 días
      notes: 'Entrenamiento de fuerza, enfoque en piernas'
    }),
    new Activity({
      id: '3',
      type: 'CYCLING',
      duration: 90,
      distance: 25,
      calories: 600,
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // Hace 5 días
    })
  ];

  return (
    <div className="space-y-4">
      {mockActivities.length > 0 ? (
        mockActivities.map(activity => (
          <ActivityCard key={activity.id} activity={activity} />
        ))
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No hay actividades recientes.</p>
          <button className="mt-2 text-blue-600 hover:text-blue-800">
            Registrar una nueva actividad
          </button>
        </div>
      )}
    </div>
  );
} 