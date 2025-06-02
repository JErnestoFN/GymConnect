'use client';

import { Activity } from '../../models/Activity';
import { useState } from 'react';
import Header from '../_components/Header';

/**
 * @function CalendarHeader
 * @description Encabezado del calendario con controles de navegación
 * @param {Object} props - Propiedades del componente
 * @param {Date} props.currentDate - Fecha actual mostrada
 * @param {Function} props.onPrevMonth - Función para ir al mes anterior
 * @param {Function} props.onNextMonth - Función para ir al mes siguiente
 */
function CalendarHeader({ currentDate, onPrevMonth, onNextMonth }) {
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];
  
  return (
    <div className="flex justify-between items-center mb-4">
      <button 
        onClick={onPrevMonth}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      
      <h3 className="font-bold text-xl text-gray-800">
        {months[currentDate.getMonth()]} {currentDate.getFullYear()}
      </h3>
      
      <button 
        onClick={onNextMonth}
        className="p-2 hover:bg-gray-100 rounded-full"
      >
        <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
}

/**
 * @function DayCell
 * @description Celda individual que representa un día en el calendario
 * @param {Object} props - Propiedades del componente
 * @param {number} props.day - Número del día
 * @param {boolean} props.isCurrentMonth - Si el día pertenece al mes actual
 * @param {boolean} props.isToday - Si el día es hoy
 * @param {Activity[]} props.activities - Actividades para este día
 * @param {Function} props.onDayClick - Función para manejar clic en un día
 */
function DayCell({ day, isCurrentMonth, isToday, activities, onDayClick }) {
  // No renderizar días vacíos (0)
  if (day === 0) return <div className="h-24 border border-transparent"></div>;
  
  // Calcular clases CSS basadas en las propiedades
  const dayClasses = `
    relative h-24 border border-gray-200 p-1 
    ${isCurrentMonth ? 'bg-white' : 'bg-gray-50 text-gray-400'}
    ${isToday ? 'font-bold' : ''}
    ${activities.length > 0 ? 'cursor-pointer hover:bg-blue-50' : ''}
  `;
  
  return (
    <div 
      className={dayClasses}
      onClick={() => activities.length > 0 && onDayClick(day)}
    >
      <div className={`text-right mb-1 ${isToday ? 'text-blue-600' : ''}`}>
        {day}
      </div>
      
      {activities.length > 0 && (
        <div className="absolute bottom-1 left-1 right-1">
          {activities.slice(0, 2).map((activity, idx) => (
            <div 
              key={idx}
              className="text-xs mb-1 px-1 py-0.5 rounded truncate"
              style={{ 
                backgroundColor: getActivityColor(activity.type, 0.2),
                color: getActivityColor(activity.type, 1)
              }}
            >
              {activity.type}
            </div>
          ))}
          
          {activities.length > 2 && (
            <div className="text-xs text-gray-500 pl-1">
              +{activities.length - 2} más
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * @function getActivityColor
 * @description Obtiene el color correspondiente a un tipo de actividad
 * @param {string} type - Tipo de actividad
 * @param {number} opacity - Opacidad del color (0-1)
 * @returns {string} - Color en formato rgba
 */
function getActivityColor(type, opacity = 1) {
  const colors = {
    'RUNNING': `rgba(59, 130, 246, ${opacity})`, // Azul
    'CYCLING': `rgba(16, 185, 129, ${opacity})`, // Verde
    'SWIMMING': `rgba(14, 165, 233, ${opacity})`, // Azul claro
    'WEIGHTLIFTING': `rgba(168, 85, 247, ${opacity})`, // Morado
    'YOGA': `rgba(236, 72, 153, ${opacity})`, // Rosa
    'HIIT': `rgba(249, 115, 22, ${opacity})`, // Naranja
    'WALKING': `rgba(132, 204, 22, ${opacity})`, // Verde claro
    'DANCING': `rgba(244, 114, 182, ${opacity})`, // Rosa claro
    'FOOTBALL': `rgba(34, 197, 94, ${opacity})`, // Verde
    'BASKETBALL': `rgba(234, 88, 12, ${opacity})`, // Naranja oscuro
    'TENNIS': `rgba(251, 191, 36, ${opacity})` // Amarillo
  };
  
  return colors[type] || `rgba(107, 114, 128, ${opacity})`;
}

/**
 * @function ActivityCalendar
 * @description Componente que muestra un calendario con actividades
 * @param {Object} props - Propiedades del componente
 * @param {string} props.userId - ID del usuario
 */
export default function ActivityCalendar({ userId }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState(null);
  
  // Datos de ejemplo - en producción, estos datos vendrían de una API
  const mockActivities = [
    new Activity({
      id: '1',
      type: 'RUNNING',
      duration: 45,
      distance: 5.2,
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 5),
    }),
    new Activity({
      id: '2',
      type: 'WEIGHTLIFTING',
      duration: 60,
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 8),
    }),
    new Activity({
      id: '3',
      type: 'CYCLING',
      duration: 90,
      distance: 25,
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 12),
    }),
    new Activity({
      id: '4',
      type: 'RUNNING',
      duration: 30,
      distance: 3.5,
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 15),
    }),
    new Activity({
      id: '5',
      type: 'YOGA',
      duration: 45,
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 18),
    }),
    new Activity({
      id: '6',
      type: 'SWIMMING',
      duration: 40,
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 18),
    }),
    new Activity({
      id: '7',
      type: 'HIIT',
      duration: 25,
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 22),
    }),
    new Activity({
      id: '8',
      type: 'RUNNING',
      duration: 50,
      distance: 6,
      date: new Date(currentDate.getFullYear(), currentDate.getMonth(), 25),
    })
  ];
  
  // Funciones para navegar entre meses
  const goToPrevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setCurrentDate(newDate);
    setSelectedDay(null);
  };
  
  const goToNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setCurrentDate(newDate);
    setSelectedDay(null);
  };
  
  // Función para manejar clic en un día
  const handleDayClick = (day) => {
    setSelectedDay(day);
  };
  
  // Generar la cuadrícula del calendario
  const generateCalendarGrid = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    
    const daysInMonth = lastDayOfMonth.getDate();
    const firstDayOfWeek = firstDayOfMonth.getDay(); // 0 = Domingo, 1 = Lunes, etc.
    
    // Ajustar el primer día para que la semana comience en lunes (1)
    const startOffset = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1;
    
    const today = new Date();
    const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;
    const currentDay = isCurrentMonth ? today.getDate() : -1;
    
    const days = [];
    
    // Añadir celdas vacías para el inicio del mes
    for (let i = 0; i < startOffset; i++) {
      days.push(0);
    }
    
    // Añadir días del mes
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    // Agrupar actividades por día
    const activitiesByDay = {};
    mockActivities.forEach(activity => {
      const activityDate = new Date(activity.date);
      if (activityDate.getMonth() === month && activityDate.getFullYear() === year) {
        const day = activityDate.getDate();
        if (!activitiesByDay[day]) {
          activitiesByDay[day] = [];
        }
        activitiesByDay[day].push(activity);
      }
    });
    
    return days.map((day, index) => (
      <DayCell 
        key={index}
        day={day}
        isCurrentMonth={true}
        isToday={day === currentDay}
        activities={activitiesByDay[day] || []}
        onDayClick={handleDayClick}
      />
    ));
  };
  
  // Obtener actividades del día seleccionado
  const getSelectedDayActivities = () => {
    if (!selectedDay) return [];
    
    return mockActivities.filter(activity => {
      const activityDate = new Date(activity.date);
      return activityDate.getDate() === selectedDay &&
             activityDate.getMonth() === currentDate.getMonth() &&
             activityDate.getFullYear() === currentDate.getFullYear();
    });
  };
  
  const selectedActivities = getSelectedDayActivities();
  
  return (
    <>
      <Header />
      <div>
        <CalendarHeader 
          currentDate={currentDate}
          onPrevMonth={goToPrevMonth}
          onNextMonth={goToNextMonth}
        />
        
        {/* Días de la semana */}
        <div className="grid grid-cols-7 mb-2">
          {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map((day, idx) => (
            <div key={idx} className="text-center text-sm font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>
        
        {/* Cuadrícula del calendario */}
        <div className="grid grid-cols-7 gap-1">
          {generateCalendarGrid()}
        </div>
        
        {/* Actividades del día seleccionado */}
        {selectedDay && selectedActivities.length > 0 && (
          <div className="mt-4 p-4 border rounded-lg bg-gray-50">
            <h4 className="font-medium text-gray-800 mb-2">
              Actividades del {selectedDay} de {
                ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 
                 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
                ][currentDate.getMonth()]
              }
            </h4>
            
            <div className="space-y-2">
              {selectedActivities.map((activity, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center p-2 bg-white rounded border"
                >
                  <div 
                    className="w-2 h-full mr-3 rounded-full" 
                    style={{ backgroundColor: getActivityColor(activity.type) }}
                  ></div>
                  <div className="flex-1">
                    <div className="font-medium">{activity.type}</div>
                    <div className="text-sm text-gray-500">
                      {activity.duration} min
                      {activity.distance && ` • ${activity.distance} km`}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
} 