/**
 * @interface UserProps
 * @description Interfaz para las propiedades de un usuario
 */
export interface UserProps {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  bio?: string;
  level?: string;
  points?: number;
  memberSince?: Date;
}

/**
 * @class User
 * @description Clase que representa a un usuario en la aplicación
 */
export class User {
  id: string;
  name: string | null;
  email: string | null;
  image: string | null;
  bio: string | null;
  level: string;
  points: number;
  memberSince: Date;

  constructor(props: UserProps) {
    this.id = props.id;
    this.name = props.name;
    this.email = props.email;
    this.image = props.image;
    this.bio = props.bio || null;
    this.level = props.level || 'Beginner';
    this.points = props.points || 0;
    this.memberSince = props.memberSince || new Date();
  }

  /**
   * @method getDisplayName
   * @description Obtiene el nombre para mostrar del usuario
   * @returns {string} Nombre para mostrar
   */
  getDisplayName(): string {
    return this.name || this.email?.split('@')[0] || 'User';
  }

  /**
   * @method getInitials
   * @description Obtiene las iniciales del nombre del usuario
   * @returns {string} Iniciales del usuario
   */
  getInitials(): string {
    if (!this.name) return '?';
    
    const nameParts = this.name.split(' ');
    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase();
    }
    
    return (
      nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)
    ).toUpperCase();
  }

  /**
   * @method getMembershipDuration
   * @description Obtiene la duración de la membresía en meses
   * @returns {number} Duración en meses
   */
  getMembershipDuration(): number {
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - this.memberSince.getTime());
    const diffMonths = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 30));
    return diffMonths;
  }

  /**
   * @method getMemberSinceText
   * @description Obtiene un texto con la fecha de membresía formateada
   * @returns {string} Texto de fecha de membresía
   */
  getMemberSinceText(): string {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    return `${months[this.memberSince.getMonth()]} ${this.memberSince.getFullYear()}`;
  }
} 