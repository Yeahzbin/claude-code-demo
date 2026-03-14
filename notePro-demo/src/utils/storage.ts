import type { Note, Folder } from '../types';

const NOTES_KEY = 'notepro_notes';
const FOLDERS_KEY = 'notepro_folders';
const THEME_KEY = 'notepro_theme';

// Token 存储键名
const ACCESS_TOKEN_KEY = 'notepro_access_token';
const REFRESH_TOKEN_KEY = 'notepro_refresh_token';
const USER_KEY = 'notepro_user';

// Safe JSON parse with error handling
const safeJsonParse = <T>(data: string | null, defaultValue: T): T => {
  if (!data) return defaultValue;
  try {
    return JSON.parse(data) as T;
  } catch (error) {
    console.error('JSON parse error:', error);
    return defaultValue;
  }
};

export const storage = {
  // ========== 原有功能 ==========

  // Notes
  getNotes: (): Note[] => {
    return safeJsonParse<Note[]>(localStorage.getItem(NOTES_KEY), []);
  },

  saveNotes: (notes: Note[]): void => {
    localStorage.setItem(NOTES_KEY, JSON.stringify(notes));
  },

  // Folders
  getFolders: (): Folder[] => {
    const data = localStorage.getItem(FOLDERS_KEY);
    const folders = safeJsonParse<Folder[]>(data, []);
    
    if (folders.length === 0) {
      // Default folder
      const defaultFolder: Folder = {
        id: 'default',
        name: '我的笔记',
        parentId: null,
        color: '#1890ff',
        createdAt: new Date().toISOString(),
      };
      return [defaultFolder];
    }
    return folders;
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

  // ========== 认证相关功能 ==========

  // Token 存储和读取
  getAccessToken: (): string | null => {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  setAccessToken: (token: string): void => {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  },

  removeAccessToken: (): void => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  },

  getRefreshToken: (): string | null => {
    return localStorage.getItem(REFRESH_TOKEN_KEY);
  },

  setRefreshToken: (token: string): void => {
    localStorage.setItem(REFRESH_TOKEN_KEY, token);
  },

  removeRefreshToken: (): void => {
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  clearAllTokens: (): void => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },

  // 检测是否已登录
  isLoggedIn: (): boolean => {
    return !!localStorage.getItem(ACCESS_TOKEN_KEY);
  },

  // 用户信息存储
  getUser: (): any => {
    return safeJsonParse<any>(localStorage.getItem(USER_KEY), null);
  },

  setUser: (user: any): void => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  removeUser: (): void => {
    localStorage.removeItem(USER_KEY);
  },

  // 清除所有认证相关数据
  clearAuth: (): void => {
    storage.clearAllTokens();
    storage.removeUser();
  },
};
