// Group helpers and POO classes
export class Group {
  constructor({ id, name, description, members, location, totalWorkouts, events, posts }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.members = members;
    this.location = location;
    this.totalWorkouts = totalWorkouts;
    this.events = events;
    this.posts = posts;
  }
}
export class Event {
  constructor({ title, date, time, location }) {
    this.title = title;
    this.date = date;
    this.time = time;
    this.location = location;
  }
}
export class Post {
  constructor({ id, author, time, content, image, likes, comments, isAdmin, isAchievement }) {
    this.id = id;
    this.author = author;
    this.time = time;
    this.content = content;
    this.image = image;
    this.likes = likes;
    this.comments = comments;
    this.isAdmin = isAdmin;
    this.isAchievement = isAchievement;
  }
}
export class Author {
  constructor({ name, initials }) {
    this.name = name;
    this.initials = initials;
  }
}

const GROUPS_KEY = 'gymconnect_groups';
export function loadGroups() {
  if (typeof window !== 'undefined') {
    const data = localStorage.getItem(GROUPS_KEY);
    if (data) return JSON.parse(data);
  }
  return [];
}
export function saveGroups(groups) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(GROUPS_KEY, JSON.stringify(groups));
  }
} 