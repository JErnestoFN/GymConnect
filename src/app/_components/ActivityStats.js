import { Activity } from '../../models/Activity';

/**
 * @function StatBox
 * @description Caja individual para mostrar una estadística
 * @param {Object} props - Propiedades del componente
 * @param {string} props.label - Etiqueta de la estadística
 * @param {string|number} props.value - Valor de la estadística
 * @param {string} props.unit - Unidad de la estadística
 * @param {string} props.icon - Icono a mostrar
 */
function StatBox({ label, value, unit = '', icon }) {
  return (
    <div className="bg-white border rounded-lg p-4 text-center">
      <div className="text-2xl mb-2">{icon}</div>
      <div className="text-lg font-bold text-gray-800">
        {value} <span className="text-sm font-normal text-gray-500">{unit}</span>
      </div>
      <div className="text-xs text-gray-500 mt-1">{label}</div>
    </div>
  );
}

/**
 * @function ActivityTypeDistribution
 * @description Muestra la distribución de tipos de actividades
 * @param {Object} props - Propiedades del componente
 * @param {Array} props.activities - Lista de actividades
 */
function ActivityTypeDistribution({ activities }) {
  // Agrupar actividades por tipo
  const typeCount = activities.reduce((acc, activity) => {
    const type = activity.type;
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});
  
  // Convertir a array y ordenar por cantidad (descendente)
  const sortedTypes = Object.entries(typeCount)
    .map(([type, count]) => ({ type, count }))
    .sort((a, b) => b.count - a.count);
  
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
  
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-gray-700">Tipos de actividad</h4>
      
      {sortedTypes.map(({ type, count }) => {
        const percentage = Math.round((count / activities.length) * 100);
        const icon = activityIcons[type] || '🏋️';
        
        return (
          <div key={type} className="flex items-center">
            <div className="w-6 text-center mr-2">{icon}</div>
            <div className="flex-1">
              <div className="flex justify-between text-xs mb-1">
                <span>{type}</span>
                <span>{count}x ({percentage}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className="bg-blue-600 h-1.5 rounded-full" 
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/**
 * @function ActivityStats
 * @description Componente que muestra estadísticas de actividades
 * @param {Object} props - Propiedades del componente
 * @param {string} props.userId - ID del usuario
 */
export default function ActivityStats({ userId }) {
  // Datos de ejemplo - en producción, estos datos vendrían de una API
  const mockActivities = [
    new Activity({
      id: '1',
      type: 'RUNNING',
      duration: 45,
      distance: 5.2,
      calories: 450,
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    }),
    new Activity({
      id: '2',
      type: 'RUNNING',
      duration: 30,
      distance: 3.5,
      calories: 320,
      date: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    }),
    new Activity({
      id: '3',
      type: 'WEIGHTLIFTING',
      duration: 60,
      calories: 300,
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    }),
    new Activity({
      id: '4',
      type: 'WEIGHTLIFTING',
      duration: 45,
      calories: 250,
      date: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
    }),
    new Activity({
      id: '5',
      type: 'CYCLING',
      duration: 90,
      distance: 25,
      calories: 600,
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    }),
    new Activity({
      id: '6',
      type: 'YOGA',
      duration: 45,
      calories: 180,
      date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    })
  ];
  
  // Calcular estadísticas generales
  const totalActivities = mockActivities.length;
  const totalDuration = mockActivities.reduce((sum, activity) => sum + activity.duration, 0);
  const totalDistance = mockActivities
    .filter(activity => activity.distance)
    .reduce((sum, activity) => sum + activity.distance, 0);
  const totalCalories = mockActivities
    .filter(activity => activity.calories)
    .reduce((sum, activity) => sum + activity.calories, 0);
  
  // Filtrar actividades de este mes
  const currentDate = new Date();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const activitiesThisMonth = mockActivities.filter(
    activity => new Date(activity.date) >= firstDayOfMonth
  );
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-3">
        <StatBox 
          label="Actividades"
          value={activitiesThisMonth.length}
          icon="🏋️"
        />
        <StatBox 
          label="Horas"
          value={(activitiesThisMonth.reduce((sum, a) => sum + a.duration, 0) / 60).toFixed(1)}
          unit="h"
          icon="⏱"
        />
        <StatBox 
          label="Distancia"
          value={activitiesThisMonth
            .filter(a => a.distance)
            .reduce((sum, a) => sum + a.distance, 0).toFixed(1)}
          unit="km"
          icon="📏"
        />
        <StatBox 
          label="Calorías"
          value={activitiesThisMonth
            .filter(a => a.calories)
            .reduce((sum, a) => sum + a.calories, 0)}
          unit="kcal"
          icon="🔥"
        />
      </div>
      
      <div className="border-t pt-4">
        <ActivityTypeDistribution activities={mockActivities} />
      </div>
      
      <div className="border-t pt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Totales acumulados</h4>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Actividades completadas</span>
            <span className="font-medium">{totalActivities}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tiempo total de entrenamiento</span>
            <span className="font-medium">{Math.floor(totalDuration / 60)} h {totalDuration % 60} min</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Distancia total recorrida</span>
            <span className="font-medium">{totalDistance.toFixed(1)} km</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Calorías totales quemadas</span>
            <span className="font-medium">{totalCalories} kcal</span>
          </div>
        </div>
      </div>
    </div>
  );
} 