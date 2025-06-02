import { Group } from '../models/Group';
import { prisma } from '../server/db';

/**
 * @class GroupService
 * @description Servicio para gestionar grupos en el sistema
 */
export class GroupService {
  /**
   * @method getGroupById
   * @description Obtiene un grupo por su ID
   * @param {string} id - ID del grupo
   * @returns {Promise<Group|null>} - Grupo encontrado o null
   */
  async getGroupById(id) {
    try {
      const groupData = await prisma.group.findUnique({
        where: { id },
        include: {
          members: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  image: true
                }
              }
            }
          },
          _count: {
            select: {
              posts: true,
              challenges: true
            }
          }
        }
      });
      
      if (!groupData) return null;
      
      const group = new Group({
        ...groupData,
        members: groupData.members.map(m => ({
          id: m.id,
          role: m.role,
          joinedAt: m.joinedAt,
          userId: m.userId,
          user: m.user
        })),
        postCount: groupData._count.posts,
        challengeCount: groupData._count.challenges
      });
      
      return group;
    } catch (error) {
      console.error('Error al obtener grupo por ID:', error);
      throw error;
    }
  }

  /**
   * @method createGroup
   * @description Crea un nuevo grupo
   * @param {Object} groupData - Datos del grupo
   * @param {string} creatorId - ID del usuario creador
   * @returns {Promise<Group>} - Grupo creado
   */
  async createGroup(groupData, creatorId) {
    try {
      const newGroup = await prisma.group.create({
        data: {
          name: groupData.name,
          description: groupData.description,
          image: groupData.image,
          isPrivate: groupData.isPrivate,
          members: {
            create: {
              userId: creatorId,
              role: 'OWNER'
            }
          }
        }
      });
      
      return await this.getGroupById(newGroup.id);
    } catch (error) {
      console.error('Error al crear grupo:', error);
      throw error;
    }
  }

  /**
   * @method updateGroup
   * @description Actualiza un grupo existente
   * @param {string} groupId - ID del grupo
   * @param {Object} groupData - Nuevos datos del grupo
   * @returns {Promise<Group>} - Grupo actualizado
   */
  async updateGroup(groupId, groupData) {
    try {
      await prisma.group.update({
        where: { id: groupId },
        data: {
          name: groupData.name,
          description: groupData.description,
          image: groupData.image,
          isPrivate: groupData.isPrivate
        }
      });
      
      return await this.getGroupById(groupId);
    } catch (error) {
      console.error('Error al actualizar grupo:', error);
      throw error;
    }
  }

  /**
   * @method addMemberToGroup
   * @description Añade un miembro a un grupo
   * @param {string} groupId - ID del grupo
   * @param {string} userId - ID del usuario
   * @param {string} role - Rol del miembro (MEMBER por defecto)
   * @returns {Promise<Object>} - Registro de membresía creado
   */
  async addMemberToGroup(groupId, userId, role = 'MEMBER') {
    try {
      const membership = await prisma.groupMember.create({
        data: {
          userId,
          groupId,
          role
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true
            }
          }
        }
      });
      
      return membership;
    } catch (error) {
      console.error('Error al añadir miembro al grupo:', error);
      throw error;
    }
  }

  /**
   * @method removeMemberFromGroup
   * @description Elimina un miembro de un grupo
   * @param {string} groupId - ID del grupo
   * @param {string} userId - ID del usuario
   * @returns {Promise<boolean>} - true si se eliminó correctamente
   */
  async removeMemberFromGroup(groupId, userId) {
    try {
      await prisma.groupMember.delete({
        where: {
          userId_groupId: {
            userId,
            groupId
          }
        }
      });
      
      return true;
    } catch (error) {
      console.error('Error al eliminar miembro del grupo:', error);
      return false;
    }
  }

  /**
   * @method getGroupPosts
   * @description Obtiene las publicaciones de un grupo
   * @param {string} groupId - ID del grupo
   * @param {Object} options - Opciones de paginación
   * @returns {Promise<Array>} - Lista de publicaciones
   */
  async getGroupPosts(groupId, options = {}) {
    const { page = 1, limit = 10 } = options;
    const skip = (page - 1) * limit;
    
    try {
      const posts = await prisma.post.findMany({
        where: { groupId },
        include: {
          author: {
            select: {
              id: true,
              name: true,
              image: true
            }
          },
          _count: {
            select: {
              comments: true,
              likes: true
            }
          }
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      });
      
      return posts.map(post => ({
        ...post,
        commentCount: post._count.comments,
        likeCount: post._count.likes
      }));
    } catch (error) {
      console.error('Error al obtener publicaciones del grupo:', error);
      throw error;
    }
  }

  /**
   * @method searchGroups
   * @description Busca grupos por nombre o descripción
   * @param {string} query - Texto de búsqueda
   * @returns {Promise<Array<Group>>} - Lista de grupos encontrados
   */
  async searchGroups(query) {
    try {
      const groups = await prisma.group.findMany({
        where: {
          OR: [
            { name: { contains: query, mode: 'insensitive' } },
            { description: { contains: query, mode: 'insensitive' } }
          ]
        },
        include: {
          _count: {
            select: {
              members: true
            }
          }
        },
        take: 20
      });
      
      return groups.map(group => ({
        ...group,
        memberCount: group._count.members
      }));
    } catch (error) {
      console.error('Error al buscar grupos:', error);
      throw error;
    }
  }
} 