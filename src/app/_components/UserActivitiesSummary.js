import { Activity } from "../../models/Activity";

/**
 * @function ActivitySummaryItem
 * @description Elemento individual que muestra una actividad resumida
 * @param {Object} props - Propiedades del componente
 * @param {Activity} props.activity - Objeto de actividad
 */
function ActivitySummaryItem({ activity }) {
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
    day: 'numeric',
    month: 'short'
  });

  return (
    <div className="flex items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
      <div className="text-2xl mr-4">{icon}</div>
      <div className="flex-1">
        <div className="flex justify-between">
          <span className="font-medium text-gray-800">{activity.type}</span>
          <span className="text-sm text-gray-500">{formattedDate}</span>
        </div>
        <div className="flex mt-1 text-sm text-gray-600">
          <span className="mr-4">{activity.duration} min</span>
          {activity.distance && <span className="mr-4">{activity.distance} km</span>}
          {activity.calories && <span>{activity.calories} kcal</span>}
        </div>
      </div>
    </div>
  );
}

/**
 * @function GroupedActivities
 * @description Agrupa actividades por tipo
 * @param {Object} props - Propiedades del componente
 * @param {Activity[]} props.activities - Lista de actividades
 */
function GroupedActivities({ activities }) {
  // Agrupar actividades por tipo
  const groupedActivities = activities.reduce((acc, activity) => {
    const type = activity.type;
    if (!acc[type]) {
      acc[type] = [];
    }
    acc[type].push(activity);
    return acc;
  }, {});

  // Calcular totales por tipo
  const typeTotals = Object.keys(groupedActivities).map(type => {
    const activities = groupedActivities[type];
    const count = activities.length;
    const totalDuration = activities.reduce((sum, activity) => sum + activity.duration, 0);
    const totalDistance = activities
      .filter(activity => activity.distance)
      .reduce((sum, activity) => sum + activity.distance, 0);
    
    return {
      type,
      count,
      totalDuration,
      totalDistance: totalDistance > 0 ? Math.round(totalDistance * 10) / 10 : null
    };
  }).sort((a, b) => b.count - a.count); // Ordenar por cantidad (descendente)

  return (
    <div className="space-y-6">
      {typeTotals.map(typeData => (
        <div key={typeData.type} className="bg-gray-50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium text-gray-800">{typeData.type}</h4>
            <span className="text-sm text-gray-500">{typeData.count} actividades</span>
          </div>
          
          <div className="flex flex-wrap text-sm text-gray-600 mb-3">
            <span className="mr-4">Total: {Math.round(typeData.totalDuration / 60 * 10) / 10} horas</span>
            {typeData.totalDistance && (
              <span>Distancia: {typeData.totalDistance} km</span>
            )}
          </div>
          
          <div className="mt-2">
            {/* Mostrar solo las 2 actividades más recientes de cada tipo */}
            {groupedActivities[typeData.type]
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .slice(0, 2)
              .map(activity => (
                <ActivitySummaryItem key={activity.id} activity={activity} />
              ))
            }
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * @function UserActivitiesSummary
 * @description Componente que muestra un resumen de las actividades del usuario
 * @param {Object} props - Propiedades del componente
 * @param {string} props.userId - ID del usuario
 */
export default function UserActivitiesSummary({ userId }) {
  // Datos de ejemplo - en producción, estos datos vendrían de una API
  const mockActivities = [
    new Activity({
      id: '1',
      type: 'RUNNING',
      duration: 45,
      distance: 5.2,
      calories: 450,
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    }),
    new Activity({
      id: '2',
      type: 'RUNNING',
      duration: 30,
      distance: 3.5,
      calories: 320,
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    }),
    new Activity({
      id: '3',
      type: 'WEIGHTLIFTING',
      duration: 60,
      calories: 300,
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    }),
    new Activity({
      id: '4',
      type: 'WEIGHTLIFTING',
      duration: 45,
      calories: 250,
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    }),
    new Activity({
      id: '5',
      type: 'CYCLING',
      duration: 90,
      distance: 25,
      calories: 600,
      date: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    })
  ];

  // Obtener tipos de actividades únicas
  const activityTypes = [...new Set(mockActivities.map(activity => activity.type))];

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-6">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium">
          Todas
        </button>
        {activityTypes.map(type => (
          <button 
            key={type} 
            className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-50"
          >
            {type}
          </button>
        ))}
      </div>
      
      {mockActivities.length > 0 ? (
        <GroupedActivities activities={mockActivities} />
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