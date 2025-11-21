export const normalizeEmail = (v: string) => v.trim().toLowerCase();
export const normalizeName = (v: string) =>
  v
    .trim()
    .replace(/\s+/g, ' ');
