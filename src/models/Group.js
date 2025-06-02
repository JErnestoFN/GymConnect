/**
 * @class Group
 * @description Clase que representa un grupo en el sistema
 */
export class Group {
  /**
   * @constructor
   * @param {Object} groupData - Datos del grupo
   */
  constructor(groupData = {}) {
    this.id = groupData.id || null;
    this.name = groupData.name || '';
    this.description = groupData.description || '';
    this.image = groupData.image || null;
    this.isPrivate = groupData.isPrivate || false;
    this.createdAt = groupData.createdAt || new Date();
    this.updatedAt = groupData.updatedAt || new Date();
    this.members = groupData.members || [];
    this.posts = groupData.posts || [];
    this.challenges = groupData.challenges || [];
  }

  /**
   * @method addMember
   * @description Añade un miembro al grupo
   * @param {Object} member - Miembro a añadir
   * @returns {Array} - Lista actualizada de miembros
   */
  addMember(member) {
    if (!this.members.some(m => m.userId === member.userId)) {
      this.members.push(member);
    }
    return this.members;
  }

  /**
   * @method removeMember
   * @description Elimina un miembro del grupo
   * @param {string} userId - ID del usuario a eliminar
   * @returns {Array} - Lista actualizada de miembros
   */
  removeMember(userId) {
    this.members = this.members.filter(member => member.userId !== userId);
    return this.members;
  }

  /**
   * @method addPost
   * @description Añade una publicación al grupo
   * @param {Object} post - Publicación a añadir
   * @returns {Array} - Lista actualizada de publicaciones
   */
  addPost(post) {
    this.posts.push(post);
    return this.posts;
  }

  /**
   * @method removePost
   * @description Elimina una publicación del grupo
   * @param {string} postId - ID de la publicación a eliminar
   * @returns {Array} - Lista actualizada de publicaciones
   */
  removePost(postId) {
    this.posts = this.posts.filter(post => post.id !== postId);
    return this.posts;
  }

  /**
   * @method getMemberCount
   * @description Obtiene el número de miembros en el grupo
   * @returns {number} - Número de miembros
   */
  getMemberCount() {
    return this.members.length;
  }

  /**
   * @method toJSON
   * @description Convierte el objeto Group a un objeto plano para serialización
   * @returns {Object} - Objeto plano con los datos del grupo
   */
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      image: this.image,
      isPrivate: this.isPrivate,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      members: this.members,
      posts: this.posts,
      challenges: this.challenges
    };
  }

  /**
   * @method fromJSON
   * @description Crea una instancia de Group a partir de un objeto plano
   * @param {Object} json - Objeto con datos del grupo
   * @returns {Group} - Nueva instancia de Group
   */
  static fromJSON(json) {
    return new Group(json);
  }
} 