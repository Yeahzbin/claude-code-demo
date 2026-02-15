import api, { ApiResponse } from './index';

// 用户类型定义
export interface User {
  id: string;
  email: string;
  username: string;
  avatar?: string;
  settings: UserSettings;
  subscription: UserSubscription;
  stats: UserStats;
  createdAt: string;
  updatedAt: string;
}

export interface UserSettings {
  theme: 'light' | 'dark' | 'system';
  language: string;
  editorMode: 'rich' | 'markdown';
  autoSaveInterval: number;
  defaultNotebook?: string;
}

export interface UserSubscription {
  plan: 'free' | 'pro' | 'team';
  expiresAt?: string;
  storageUsed: number;
  storageLimit: number;
}

export interface UserStats {
  totalNotes: number;
  totalFolders: number;
  lastActiveAt: string;
}

// 注册请求参数
export interface RegisterParams {
  email: string;
  username: string;
  password: string;
}

// 登录请求参数
export interface LoginParams {
  email: string;
  password: string;
}

// 登录响应数据
export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

// 刷新 Token 响应数据
export interface RefreshTokenResponse {
  accessToken: string;
  refreshToken: string;
}

// 忘记密码请求参数
export interface ForgotPasswordParams {
  email: string;
}

// 重置密码请求参数
export interface ResetPasswordParams {
  token: string;
  password: string;
}

// 认证相关 API
export const authApi = {
  /**
   * 用户注册
   */
  register: (params: RegisterParams): Promise<ApiResponse<AuthResponse>> => {
    return api.post('/auth/register', params);
  },

  /**
   * 用户登录
   */
  login: (params: LoginParams): Promise<ApiResponse<AuthResponse>> => {
    return api.post('/auth/login', params);
  },

  /**
   * 用户登出
   */
  logout: (): Promise<ApiResponse<null>> => {
    return api.post('/auth/logout');
  },

  /**
   * 刷新 Token
   */
  refreshToken: (refreshToken: string): Promise<ApiResponse<RefreshTokenResponse>> => {
    return api.post('/auth/refresh', { refreshToken });
  },

  /**
   * 忘记密码
   */
  forgotPassword: (params: ForgotPasswordParams): Promise<ApiResponse<null>> => {
    return api.post('/auth/forgot-password', params);
  },

  /**
   * 重置密码
   */
  resetPassword: (params: ResetPasswordParams): Promise<ApiResponse<null>> => {
    return api.post('/auth/reset-password', params);
  },

  /**
   * 获取当前用户信息
   */
  getCurrentUser: (): Promise<ApiResponse<User>> => {
    return api.get('/auth/me');
  },

  /**
   * 更新用户信息
   */
  updateProfile: (data: Partial<User>): Promise<ApiResponse<User>> => {
    return api.put('/auth/me', data);
  },

  /**
   * 更新用户设置
   */
  updateSettings: (settings: Partial<UserSettings>): Promise<ApiResponse<UserSettings>> => {
    return api.put('/auth/me/settings', settings);
  },

  /**
   * 修改密码
   */
  changePassword: (oldPassword: string, newPassword: string): Promise<ApiResponse<null>> => {
    return api.post('/auth/change-password', { oldPassword, newPassword });
  },
};

export default authApi;
