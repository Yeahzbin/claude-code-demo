import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { authApi, User, LoginParams, RegisterParams } from '../api/auth';
import { tokenStorage, isAuthenticated } from '../api';

// 用户设置类型
export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  language: string;
  editorMode: 'rich' | 'markdown';
  autoSaveInterval: number;
  defaultNotebook?: string;
}

// 认证状态类型定义
interface AuthState {
  // 状态
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  // 操作
  login: (params: LoginParams) => Promise<void>;
  register: (params: RegisterParams) => Promise<void>;
  logout: () => Promise<void>;
  fetchCurrentUser: () => Promise<void>;
  updateUser: (data: Partial<User>) => void;
  updateSettings: (settings: Partial<UserSettings>) => void;
  setError: (error: string | null) => void;
  clearError: () => void;
}

// 创建认证 Store
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      // 初始状态
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      // 登录
      login: async (params: LoginParams) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authApi.login(params);
          const { user, accessToken, refreshToken } = response.data.data;

          // 存储 Token
          tokenStorage.setAccessToken(accessToken);
          tokenStorage.setRefreshToken(refreshToken);

          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error: any) {
          const errorMessage = error.response?.data?.error?.message || '登录失败，请稍后重试';
          set({ error: errorMessage, isLoading: false });
          throw error;
        }
      },

      // 注册
      register: async (params: RegisterParams) => {
        set({ isLoading: true, error: null });
        try {
          const response = await authApi.register(params);
          const { user, accessToken, refreshToken } = response.data.data;

          // 存储 Token
          tokenStorage.setAccessToken(accessToken);
          tokenStorage.setRefreshToken(refreshToken);

          set({ user, isAuthenticated: true, isLoading: false });
        } catch (error: any) {
          const errorMessage = error.response?.data?.error?.message || '注册失败，请稍后重试';
          set({ error: errorMessage, isLoading: false });
          throw error;
        }
      },

      // 登出
      logout: async () => {
        set({ isLoading: true });
        try {
          await authApi.logout();
        } catch (error) {
          // 即使 API 调用失败也清理本地状态
          console.error('Logout API error:', error);
        } finally {
          // 清理 Token
          tokenStorage.clearAllTokens();
          set({ user: null, isAuthenticated: false, isLoading: false });
        }
      },

      // 获取当前用户信息
      fetchCurrentUser: async () => {
        if (!isAuthenticated()) {
          set({ isAuthenticated: false });
          return;
        }

        set({ isLoading: true });
        try {
          const response = await authApi.getCurrentUser();
          set({ user: response.data.data, isAuthenticated: true, isLoading: false });
        } catch (error) {
          // Token 失效，清除登录状态
          tokenStorage.clearAllTokens();
          set({ user: null, isAuthenticated: false, isLoading: false });
        }
      },

      // 更新用户信息（本地）
      updateUser: (data: Partial<User>) => {
        const { user } = get();
        if (user) {
          set({ user: { ...user, ...data } });
        }
      },

      // 更新用户设置（本地）
      updateSettings: (settings: Partial<UserSettings>) => {
        const { user } = get();
        if (user) {
          set({
            user: {
              ...user,
              settings: { ...user.settings, ...settings },
            },
          });
        }
      },

      // 设置错误
      setError: (error: string | null) => {
        set({ error });
      },

      // 清除错误
      clearError: () => {
        set({ error: null });
      },
    }),
    {
      name: 'notepro-auth-storage', // 持久化存储键名
      partialize: (state) => ({
        // 只持久化必要的状态
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useAuthStore;
