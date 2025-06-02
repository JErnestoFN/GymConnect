import { Activity } from '../../models/Activity';

/**
 * @function StatCard
 * @description Tarjeta individual para mostrar una estadística
 * @param {Object} props - Propiedades del componente
 * @param {string} props.title - Título de la estadística
 * @param {string|number} props.value - Valor de la estadística
 * @param {string} props.unit - Unidad de medida (opcional)
 * @param {string} props.icon - Clase del icono (opcional)
 * @param {string} props.color - Color del borde y fondo (opcional)
 */
function StatCard({ title, value, unit = '', icon, color = 'blue' }) {
  const colorClasses = {
    blue: 'border-blue-200 bg-blue-50 text-blue-700',
    green: 'border-green-200 bg-green-50 text-green-700',
    purple: 'border-purple-200 bg-purple-50 text-purple-700',
    orange: 'border-orange-200 bg-orange-50 text-orange-700'
  };
  
  return (
    <div className={`border rounded-lg p-5 ${colorClasses[color]}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-medium text-sm">{title}</h3>
        {icon && (
          <span className="text-xl">{icon}</span>
        )}
      </div>
      <div className="flex items-baseline">
        <span className="text-2xl font-bold mr-1">{value}</span>
        {unit && <span className="text-sm opacity-70">{unit}</span>}
      </div>
    </div>
  );
}

/**
 * @function ProgressBar
 * @description Barra de progreso para mostrar logros hacia una meta
 * @param {Object} props - Propiedades del componente
 * @param {number} props.current - Valor actual
 * @param {number} props.goal - Valor objetivo
 * @param {string} props.label - Etiqueta descriptiva
 * @param {string} props.color - Color de la barra (opcional)
 */
function ProgressBar({ current, goal, label, color = 'blue' }) {
  const percentage = Math.min((current / goal) * 100, 100);
  
  const colorClasses = {
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    purple: 'bg-purple-600',
    orange: 'bg-orange-600'
  };
  
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600">{label}</span>
        <span className="font-medium">{current}/{goal} ({Math.round(percentage)}%)</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full ${colorClasses[color]}`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}

/**
 * @function UserStats
 * @description Componente que muestra estadísticas del usuario
 * @param {Object} props - Propiedades del componente
 * @param {string} props.userId - ID del usuario
 */
export default function UserStats({ userId }) {
  // Datos de ejemplo - en producción, estos datos vendrían de una API
  const mockActivities = [
    new Activity({
      id: '1',
      type: 'RUNNING',
      duration: 45,
      distance: 5.2,
      calories: 450,
      date: new Date(Date.now() - 24 * 60 * 60 * 1000), // Ayer
    }),
    new Activity({
      id: '2',
      type: 'WEIGHTLIFTING',
      duration: 60,
      calories: 300,
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // Hace 3 días
    }),
    new Activity({
      id: '3',
      type: 'CYCLING',
      duration: 90,
      distance: 25,
      calories: 600,
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) // Hace 5 días
    }),
    new Activity({
      id: '4',
      type: 'RUNNING',
      duration: 30,
      distance: 3.5,
      calories: 320,
      date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // Hace 7 días
    })
  ];
  
  // Calcular estadísticas
  const totalActivities = mockActivities.length;
  const totalDuration = mockActivities.reduce((sum, activity) => sum + activity.duration, 0);
  const totalDistance = mockActivities
    .filter(activity => activity.distance)
    .reduce((sum, activity) => sum + activity.distance, 0);
  const totalCalories = mockActivities
    .filter(activity => activity.calories)
    .reduce((sum, activity) => sum + activity.calories, 0);
  
  // Datos para las barras de progreso
  const progressData = [
    { current: totalDistance, goal: 50, label: "Distancia semanal", color: "blue" },
    { current: totalActivities, goal: 6, label: "Actividades semanales", color: "green" },
    { current: totalCalories, goal: 2000, label: "Calorías quemadas", color: "orange" }
  ];

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard 
          title="Actividades" 
          value={totalActivities} 
          icon="🏋️" 
          color="blue" 
        />
        <StatCard 
          title="Duración" 
          value={Math.round(totalDuration / 60 * 10) / 10} 
          unit="horas" 
          icon="⏱" 
          color="purple" 
        />
        <StatCard 
          title="Distancia" 
          value={Math.round(totalDistance * 10) / 10} 
          unit="km" 
          icon="🏃" 
          color="green" 
        />
        <StatCard 
          title="Calorías" 
          value={totalCalories} 
          unit="kcal" 
          icon="🔥" 
          color="orange" 
        />
      </div>
      
      <div className="space-y-6">
        <h3 className="text-lg font-medium text-gray-700 mb-4">Progreso hacia tus metas</h3>
        
        {progressData.map((progress, index) => (
          <ProgressBar 
            key={index}
            current={progress.current}
            goal={progress.goal}
            label={progress.label}
            color={progress.color}
          />
        ))}
      </div>
    </div>
  );
} 