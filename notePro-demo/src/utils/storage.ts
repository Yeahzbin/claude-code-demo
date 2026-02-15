import type { Note, Folder } from '../types';

const NOTES_KEY = 'notepro_notes';
const FOLDERS_KEY = 'notepro_folders';
const THEME_KEY = 'notepro_theme';

// Token 存储键名
const ACCESS_TOKEN_KEY = 'notepro_access_token';
const REFRESH_TOKEN_KEY = 'notepro_refresh_token';
const USER_KEY = 'notepro_user';

export const storage = {
  // ========== 原有功能 ==========

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
    const data = localStorage.getItem(USER_KEY);
    return data ? JSON.parse(data) : null;
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
