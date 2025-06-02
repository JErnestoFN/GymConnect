/**
 * @class User
 * @description Clase que representa a un usuario en el sistema
 */
export class User {
  /**
   * @constructor
   * @param {Object} userData - Datos del usuario
   */
  constructor(userData = {}) {
    this.id = userData.id || null;
    this.name = userData.name || '';
    this.email = userData.email || '';
    this.emailVerified = userData.emailVerified || null;
    this.image = userData.image || null;
    this.bio = userData.bio || '';
    this.weight = userData.weight || null;
    this.height = userData.height || null;
    this.fitnessLevel = userData.fitnessLevel || 'BEGINNER';
    this.birthDate = userData.birthDate || null;
    this.role = userData.role || 'USER';
    this.points = userData.points || 0;
    this.createdAt = userData.createdAt || new Date();
    this.updatedAt = userData.updatedAt || new Date();
  }

  /**
   * @method getBMI
   * @description Calcula el índice de masa corporal del usuario
   * @returns {number|null} BMI calculado o null si no hay datos suficientes
   */
  getBMI() {
    if (!this.weight || !this.height) return null;
    // BMI = peso (kg) / (altura (m))²
    const heightInMeters = this.height / 100;
    return this.weight / (heightInMeters * heightInMeters);
  }

  /**
   * @method addPoints
   * @description Añade puntos al usuario
   * @param {number} points - Puntos a añadir
   * @returns {number} - Total de puntos después de la adición
   */
  addPoints(points) {
    this.points += points;
    return this.points;
  }

  /**
   * @method getAgeInYears
   * @description Calcula la edad del usuario en años
   * @returns {number|null} - Edad en años o null si no hay fecha de nacimiento
   */
  getAgeInYears() {
    if (!this.birthDate) return null;
    
    const today = new Date();
    const birthDate = new Date(this.birthDate);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    
    return age;
  }

  /**
   * @method toJSON
   * @description Convierte el objeto User a un objeto plano para serialización
   * @returns {Object} - Objeto plano con los datos del usuario
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      emailVerified: this.emailVerified,
      image: this.image,
      bio: this.bio,
      weight: this.weight,
      height: this.height,
      fitnessLevel: this.fitnessLevel,
      birthDate: this.birthDate,
      role: this.role,
      points: this.points,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  /**
   * @method fromJSON
   * @description Crea una instancia de User a partir de un objeto plano
   * @param {Object} json - Objeto con datos del usuario
   * @returns {User} - Nueva instancia de User
   */
  static fromJSON(json) {
    return new User(json);
  }
} 