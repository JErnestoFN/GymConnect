/**
 * @class Notification
 * @description Clase que representa una notificación en el sistema
 */
export class Notification {
  /**
   * @constructor
   * @param {Object} notificationData - Datos de la notificación
   */
  constructor(notificationData = {}) {
    this.id = notificationData.id || null;
    this.type = notificationData.type || 'GENERAL'; // MENTION, LIKE, COMMENT, CHALLENGE, INVITE, GENERAL
    this.content = notificationData.content || '';
    this.read = notificationData.read !== undefined ? notificationData.read : false;
    this.userId = notificationData.userId || null;
    this.createdAt = notificationData.createdAt || new Date();
    this.relatedEntityId = notificationData.relatedEntityId || null; // ID de la entidad relacionada (post, challenge, etc.)
    this.relatedEntityType = notificationData.relatedEntityType || null; // Tipo de entidad relacionada
    this.senderName = notificationData.senderName || null; // Nombre de quien envía la notificación
    this.senderImage = notificationData.senderImage || null; // Imagen de quien envía la notificación
  }

  /**
   * @method markAsRead
   * @description Marca la notificación como leída
   * @returns {Notification} - La instancia actual
   */
  markAsRead() {
    this.read = true;
    return this;
  }

  /**
   * @method markAsUnread
   * @description Marca la notificación como no leída
   * @returns {Notification} - La instancia actual
   */
  markAsUnread() {
    this.read = false;
    return this;
  }

  /**
   * @method getTimeAgo
   * @description Calcula el tiempo transcurrido desde la creación de la notificación
   * @returns {string} - Texto descriptivo del tiempo transcurrido
   */
  getTimeAgo() {
    const now = new Date();
    const diff = now - this.createdAt;
    
    // Convertir diferencia de tiempo a minutos, horas, etc.
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
      return days === 1 ? 'hace 1 día' : `hace ${days} días`;
    } else if (hours > 0) {
      return hours === 1 ? 'hace 1 hora' : `hace ${hours} horas`;
    } else if (minutes > 0) {
      return minutes === 1 ? 'hace 1 minuto' : `hace ${minutes} minutos`;
    } else {
      return 'ahora mismo';
    }
  }

  /**
   * @method getIcon
   * @description Obtiene el icono correspondiente al tipo de notificación
   * @returns {string} - Nombre del icono
   */
  getIcon() {
    const icons = {
      'MENTION': 'at',
      'LIKE': 'heart',
      'COMMENT': 'message',
      'CHALLENGE': 'trophy',
      'INVITE': 'user-plus',
      'GENERAL': 'bell'
    };
    
    return icons[this.type] || 'bell';
  }

  /**
   * @method toJSON
   * @description Convierte el objeto Notification a un objeto plano para serialización
   * @returns {Object} - Objeto plano con los datos de la notificación
   */
  toJSON() {
    return {
      id: this.id,
      type: this.type,
      content: this.content,
      read: this.read,
      userId: this.userId,
      createdAt: this.createdAt,
      relatedEntityId: this.relatedEntityId,
      relatedEntityType: this.relatedEntityType,
      senderName: this.senderName,
      senderImage: this.senderImage
    };
  }

  /**
   * @method fromJSON
   * @description Crea una instancia de Notification a partir de un objeto plano
   * @param {Object} json - Objeto con datos de la notificación
   * @returns {Notification} - Nueva instancia de Notification
   */
  static fromJSON(json) {
    return new Notification(json);
  }
} 