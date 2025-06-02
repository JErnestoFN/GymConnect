/**
 * @class Activity
 * @description Clase que representa una actividad física en el sistema
 */
export class Activity {
  /**
   * @constructor
   * @param {Object} activityData - Datos de la actividad
   */
  constructor(activityData = {}) {
    this.id = activityData.id || null;
    this.type = activityData.type || '';
    this.duration = activityData.duration || 0; // en minutos
    this.distance = activityData.distance || null; // en kilómetros
    this.calories = activityData.calories || null;
    this.notes = activityData.notes || '';
    this.date = activityData.date ? new Date(activityData.date) : new Date();
    this.userId = activityData.userId || null;
    this.createdAt = activityData.createdAt || new Date();
    this.updatedAt = activityData.updatedAt || new Date();
  }

  /**
   * @method getCaloriesBurned
   * @description Calcula calorías quemadas si no están definidas
   * @param {number} weight - Peso del usuario en kg
   * @returns {number} - Calorías estimadas
   */
  getCaloriesBurned(weight) {
    if (this.calories) return this.calories;
    
    // Cálculo básico de calorías (estimación simplificada)
    const MET = this.getMETForActivityType();
    // Fórmula: MET * peso en kg * duración en horas
    return Math.round(MET * weight * (this.duration / 60));
  }

  /**
   * @method getMETForActivityType
   * @description Obtiene el valor MET (Metabolic Equivalent of Task) para el tipo de actividad
   * @returns {number} - Valor MET
   */
  getMETForActivityType() {
    // Valores MET aproximados para diferentes actividades
    const metValues = {
      'RUNNING': 8.0,
      'JOGGING': 7.0,
      'WALKING': 3.5,
      'CYCLING': 7.5,
      'SWIMMING': 6.0,
      'WEIGHTLIFTING': 3.5,
      'YOGA': 2.5,
      'HIIT': 8.0,
      'FOOTBALL': 7.0,
      'BASKETBALL': 6.5,
      'TENNIS': 7.0,
      'DANCING': 4.5
    };
    
    return metValues[this.type] || 4.0; // 4.0 como valor predeterminado
  }

  /**
   * @method getPace
   * @description Calcula el ritmo (minutos por kilómetro)
   * @returns {number|null} - Ritmo en min/km o null si no hay distancia
   */
  getPace() {
    if (!this.distance || this.distance === 0) return null;
    return this.duration / this.distance;
  }

  /**
   * @method getSpeed
   * @description Calcula la velocidad en km/h
   * @returns {number|null} - Velocidad en km/h o null si no hay distancia o duración
   */
  getSpeed() {
    if (!this.distance || this.duration === 0) return null;
    // Convertir duración de minutos a horas
    const durationInHours = this.duration / 60;
    return this.distance / durationInHours;
  }

  /**
   * @method getFormattedDuration
   * @description Formatea la duración en formato hh:mm
   * @returns {string} - Duración formateada
   */
  getFormattedDuration() {
    const hours = Math.floor(this.duration / 60);
    const minutes = this.duration % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
  }

  /**
   * @method toJSON
   * @description Convierte el objeto Activity a un objeto plano para serialización
   * @returns {Object} - Objeto plano con los datos de la actividad
   */
  toJSON() {
    return {
      id: this.id,
      type: this.type,
      duration: this.duration,
      distance: this.distance,
      calories: this.calories,
      notes: this.notes,
      date: this.date,
      userId: this.userId,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  /**
   * @method fromJSON
   * @description Crea una instancia de Activity a partir de un objeto plano
   * @param {Object} json - Objeto con datos de la actividad
   * @returns {Activity} - Nueva instancia de Activity
   */
  static fromJSON(json) {
    return new Activity(json);
  }
} 