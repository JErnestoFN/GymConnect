/**
 * @class Challenge
 * @description Clase que representa un reto fitness en el sistema
 */
export class Challenge {
  /**
   * @constructor
   * @param {Object} challengeData - Datos del reto
   */
  constructor(challengeData = {}) {
    this.id = challengeData.id || null;
    this.title = challengeData.title || '';
    this.description = challengeData.description || '';
    this.startDate = challengeData.startDate ? new Date(challengeData.startDate) : new Date();
    this.endDate = challengeData.endDate ? new Date(challengeData.endDate) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 1 semana por defecto
    this.goal = challengeData.goal || 0;
    this.goalType = challengeData.goalType || 'DISTANCE'; // DISTANCE, REPETITIONS, TIME
    this.isPublic = challengeData.isPublic !== undefined ? challengeData.isPublic : true;
    this.groupId = challengeData.groupId || null;
    this.participants = challengeData.participants || [];
    this.createdAt = challengeData.createdAt || new Date();
    this.updatedAt = challengeData.updatedAt || new Date();
  }

  /**
   * @method addParticipant
   * @description Añade un participante al reto
   * @param {Object} participant - Participante a añadir
   * @returns {Array} - Lista actualizada de participantes
   */
  addParticipant(participant) {
    if (!this.participants.some(p => p.userId === participant.userId)) {
      this.participants.push({
        ...participant,
        progress: participant.progress || 0,
        joinedAt: participant.joinedAt || new Date(),
        completedAt: participant.completedAt || null
      });
    }
    return this.participants;
  }

  /**
   * @method removeParticipant
   * @description Elimina un participante del reto
   * @param {string} userId - ID del usuario a eliminar
   * @returns {Array} - Lista actualizada de participantes
   */
  removeParticipant(userId) {
    this.participants = this.participants.filter(participant => participant.userId !== userId);
    return this.participants;
  }

  /**
   * @method updateParticipantProgress
   * @description Actualiza el progreso de un participante
   * @param {string} userId - ID del usuario
   * @param {number} progress - Nuevo progreso
   * @returns {Object|null} - Participante actualizado o null si no existe
   */
  updateParticipantProgress(userId, progress) {
    const participant = this.participants.find(p => p.userId === userId);
    if (!participant) return null;
    
    participant.progress = progress;
    
    // Marcar como completado si alcanzó la meta
    if (progress >= this.goal && !participant.completedAt) {
      participant.completedAt = new Date();
    }
    
    return participant;
  }

  /**
   * @method getRemainingDays
   * @description Calcula los días restantes del reto
   * @returns {number} - Días restantes o 0 si ya terminó
   */
  getRemainingDays() {
    const today = new Date();
    if (today > this.endDate) return 0;
    
    const diffTime = Math.abs(this.endDate - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  /**
   * @method isActive
   * @description Verifica si el reto está activo actualmente
   * @returns {boolean} - true si está activo, false si no
   */
  isActive() {
    const today = new Date();
    return today >= this.startDate && today <= this.endDate;
  }

  /**
   * @method getCompletionRate
   * @description Calcula el porcentaje de participantes que han completado el reto
   * @returns {number} - Porcentaje de completados (0-100)
   */
  getCompletionRate() {
    if (this.participants.length === 0) return 0;
    
    const completedCount = this.participants.filter(p => p.completedAt).length;
    return (completedCount / this.participants.length) * 100;
  }

  /**
   * @method toJSON
   * @description Convierte el objeto Challenge a un objeto plano para serialización
   * @returns {Object} - Objeto plano con los datos del reto
   */
  toJSON() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      startDate: this.startDate,
      endDate: this.endDate,
      goal: this.goal,
      goalType: this.goalType,
      isPublic: this.isPublic,
      groupId: this.groupId,
      participants: this.participants,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  /**
   * @method fromJSON
   * @description Crea una instancia de Challenge a partir de un objeto plano
   * @param {Object} json - Objeto con datos del reto
   * @returns {Challenge} - Nueva instancia de Challenge
   */
  static fromJSON(json) {
    return new Challenge(json);
  }
} 