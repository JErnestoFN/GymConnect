import { User } from '../models/User';
import { prisma } from '../server/db';

/**
 * @class UserService
 * @description Servicio para gestionar usuarios en el sistema
 */
export class UserService {
  /**
   * @method getUserById
   * @description Obtiene un usuario por su ID
   * @param {string} id - ID del usuario
   * @returns {Promise<User|null>} - Usuario encontrado o null
   */
  async getUserById(id) {
    try {
      const userData = await prisma.user.findUnique({
        where: { id }
      });
      
      return userData ? new User(userData) : null;
    } catch (error) {
      console.error('Error al obtener usuario por ID:', error);
      throw error;
    }
  }

  /**
   * @method getUserByEmail
   * @description Obtiene un usuario por su email
   * @param {string} email - Email del usuario
   * @returns {Promise<User|null>} - Usuario encontrado o null
   */
  async getUserByEmail(email) {
    try {
      const userData = await prisma.user.findUnique({
        where: { email }
      });
      
      return userData ? new User(userData) : null;
    } catch (error) {
      console.error('Error al obtener usuario por email:', error);
      throw error;
    }
  }

  /**
   * @method updateUserProfile
   * @description Actualiza el perfil de un usuario
   * @param {string} id - ID del usuario
   * @param {Object} profileData - Datos a actualizar
   * @returns {Promise<User>} - Usuario actualizado
   */
  async updateUserProfile(id, profileData) {
    try {
      const userData = await prisma.user.update({
        where: { id },
        data: {
          name: profileData.name,
          bio: profileData.bio,
          weight: profileData.weight,
          height: profileData.height,
          fitnessLevel: profileData.fitnessLevel,
          birthDate: profileData.birthDate,
          image: profileData.image
        }
      });
      
      return new User(userData);
    } catch (error) {
      console.error('Error al actualizar perfil de usuario:', error);
      throw error;
    }
  }

  /**
   * @method getUserGroups
   * @description Obtiene los grupos a los que pertenece un usuario
   * @param {string} userId - ID del usuario
   * @returns {Promise<Array>} - Lista de grupos
   */
  async getUserGroups(userId) {
    try {
      const userGroups = await prisma.groupMember.findMany({
        where: { userId },
        include: {
          group: true
        }
      });
      
      return userGroups.map(membership => ({
        ...membership.group,
        role: membership.role
      }));
    } catch (error) {
      console.error('Error al obtener grupos del usuario:', error);
      throw error;
    }
  }

  /**
   * @method getUserActivities
   * @description Obtiene las actividades de un usuario
   * @param {string} userId - ID del usuario
   * @param {Object} options - Opciones de filtrado y paginación
   * @returns {Promise<Array>} - Lista de actividades
   */
  async getUserActivities(userId, options = {}) {
    const { page = 1, limit = 10, type } = options;
    const skip = (page - 1) * limit;
    
    try {
      const whereClause = {
        userId
      };
      
      if (type) {
        whereClause.type = type;
      }
      
      const activities = await prisma.activity.findMany({
        where: whereClause,
        skip,
        take: limit,
        orderBy: { date: 'desc' }
      });
      
      return activities;
    } catch (error) {
      console.error('Error al obtener actividades del usuario:', error);
      throw error;
    }
  }

  /**
   * @method getUserAchievements
   * @description Obtiene los logros de un usuario
   * @param {string} userId - ID del usuario
   * @returns {Promise<Array>} - Lista de logros
   */
  async getUserAchievements(userId) {
    try {
      const achievements = await prisma.userAchievement.findMany({
        where: { userId },
        include: {
          achievement: true
        }
      });
      
      return achievements.map(ua => ({
        ...ua.achievement,
        earnedAt: ua.earnedAt
      }));
    } catch (error) {
      console.error('Error al obtener logros del usuario:', error);
      throw error;
    }
  }

  /**
   * @method addPointsToUser
   * @description Añade puntos a un usuario
   * @param {string} userId - ID del usuario
   * @param {number} points - Puntos a añadir
   * @returns {Promise<User>} - Usuario actualizado
   */
  async addPointsToUser(userId, points) {
    try {
      const user = await this.getUserById(userId);
      if (!user) throw new Error('Usuario no encontrado');
      
      const updatedUserData = await prisma.user.update({
        where: { id: userId },
        data: {
          points: { increment: points }
        }
      });
      
      return new User(updatedUserData);
    } catch (error) {
      console.error('Error al añadir puntos al usuario:', error);
      throw error;
    }
  }
} 