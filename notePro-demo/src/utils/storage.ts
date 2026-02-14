import type { Note, Folder } from '../types';

const NOTES_KEY = 'notepro_notes';
const FOLDERS_KEY = 'notepro_folders';
const THEME_KEY = 'notepro_theme';

export const storage = {
  // Notes
  getNotes: (): Note[] => {
    const data = localStorage.getItem(NOTES_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveNotes: (notes: Note[]): void => {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  },

  // Folders
  getFolders: (): Folder[] => {
    const data = localStorage.getItem(FOLDERS_KEY);
    if (data) {
      return JSON.parse(data);
    }
    // Default folder
    const defaultFolder: Folder = {
      id: 'default',
      name: '我的笔记',
      parentId: null,
      color: '#1890ff',
      createdAt: new Date().toISOString(),
    };
    return [defaultFolder];
  },

  saveFolders: (folders: Folder[]): void => {
    localStorage.setItem(FOLDERS_KEY, JSON.stringify(folders));
  },

  // Theme
  getTheme: (): 'light' | 'dark' => {
    return (localStorage.getItem(THEME_KEY) as 'light' | 'dark') || 'light';
  },

  saveTheme: (theme: 'light' | 'dark'): void => {
    localStorage.setItem(THEME_KEY, theme);
  },
};
