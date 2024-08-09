// This function sanitizes the class name (converts to lowercase, removes special characters, and replaces spaces with hyphens)
export const sanitizeClassName = (name: string | undefined): string => {
  if (!name) return '';
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
};
