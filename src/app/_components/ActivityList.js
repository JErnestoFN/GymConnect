import { Activity } from '../../models/Activity';

/**
 * @function ActivityListItem
 * @description Elemento individual que muestra una actividad en la lista
 * @param {Object} props - Propiedades del componente
 * @param {Activity} props.activity - Objeto de actividad
 */
function ActivityListItem({ activity }) {
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
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const pace = activity.getPace();
  const speed = activity.getSpeed();

  return (
    <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="p-4">
        <div className="flex items-center">
          <div className="text-3xl mr-4">{icon}</div>
          <div className="flex-1">
            <div className="flex justify-between">
              <h3 className="font-bold text-gray-800">{activity.type}</h3>
              <span className="text-sm text-gray-500">{formattedDate}</span>
            </div>
            <div className="flex mt-1">
              <span className="text-sm text-gray-600 mr-3">
                {activity.getFormattedDuration()}
              </span>
              {activity.distance && (
                <span className="text-sm text-gray-600 mr-3">
                  {activity.distance} km
                </span>
              )}
              {activity.calories && (
                <span className="text-sm text-gray-600">
                  {activity.calories} kcal
                </span>
              )}
            </div>
          </div>
        </div>
        
        {activity.notes && (
          <p className="mt-3 text-gray-700 bg-gray-50 p-3 rounded-lg">
            {activity.notes}
          </p>
        )}
      </div>
      
      <div className="bg-gray-50 px-4 py-3 border-t">
        <div className="flex flex-wrap gap-3 text-xs text-gray-500">
          {pace && (
            <div>
              <span className="font-medium">Ritmo:</span> {Math.floor(pace)} min {Math.round((pace % 1) * 60)} seg/km
            </div>
          )}
          {speed && (
            <div>
              <span className="font-medium">Velocidad:</span> {speed.toFixed(1)} km/h
            </div>
          )}
          <div className="ml-auto">
            <button className="text-blue-600 hover:text-blue-800">
              Ver detalles
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * @function ActivityList
 * @description Componente que muestra una lista de actividades
 * @param {Object} props - Propiedades del componente
 * @param {string} props.userId - ID del usuario
 */
export default function ActivityList({ userId }) {
  // Datos de ejemplo - en producción, estos datos vendrían de una API
  const mockActivities = [
    new Activity({
      id: '1',
      type: 'RUNNING',
      duration: 45,
      distance: 5.2,
      calories: 450,
      notes: 'Buen ritmo constante en el parque. El clima estaba perfecto.',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    }),
    new Activity({
      id: '2',
      type: 'WEIGHTLIFTING',
      duration: 60,
      calories: 300,
      notes: 'Entrenamiento de fuerza, enfoque en piernas y core.',
      date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    }),
    new Activity({
      id: '3',
      type: 'CYCLING',
      duration: 90,
      distance: 25,
      calories: 600,
      date: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    }),
    new Activity({
      id: '4',
      type: 'RUNNING',
      duration: 30,
      distance: 3.5,
      calories: 320,
      notes: 'Carrera corta pero intensa. Trabajé en intervalos de velocidad.',
      date: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
    }),
    new Activity({
      id: '5',
      type: 'YOGA',
      duration: 45,
      calories: 180,
      notes: 'Sesión de yoga para recuperación y flexibilidad.',
      date: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
    })
  ];

  return (
    <div>
      {mockActivities.length > 0 ? (
        <div className="space-y-4">
          {mockActivities.map(activity => (
            <ActivityListItem key={activity.id} activity={activity} />
          ))}
          
          <div className="text-center mt-6">
            <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
              Cargar más actividades
            </button>
          </div>
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-gray-500">No hay actividades registradas aún.</p>
          <button className="mt-2 text-blue-600 hover:text-blue-800">
            Registrar una nueva actividad
          </button>
        </div>
      )}
    </div>
  );
} 