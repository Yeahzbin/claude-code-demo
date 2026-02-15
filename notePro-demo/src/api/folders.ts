import api, { ApiResponse, PaginationParams, SortParams } from './index';

// 文件夹类型定义（与 PRD 文档一致）
export interface Folder {
  id: string;
  userId: string;
  name: string;
  parentId: string | null;
  notebookId: string;
  color: string;
  icon?: string;
  sortOrder: number;
  isExpanded: boolean;
  noteCount: number;
  createdAt: string;
  updatedAt: string;
}

// 创建文件夹请求参数
export interface CreateFolderParams {
  name: string;
  parentId?: string | null;
  notebookId?: string;
  color?: string;
  icon?: string;
}

// 更新文件夹请求参数
export interface UpdateFolderParams {
  name?: string;
  parentId?: string | null;
  notebookId?: string;
  color?: string;
  icon?: string;
  isExpanded?: boolean;
}

// 文件夹排序请求参数
export interface ReorderFoldersParams {
  folders: Array<{
    id: string;
    sortOrder: number;
  }>;
}

// 文件夹查询参数
export interface FolderQueryParams extends PaginationParams {
  parentId?: string | null;
  notebookId?: string;
}

// 文件夹树响应
export interface FoldersTreeResponse {
  tree: Folder[];
}

// 文件夹相关 API
export const foldersApi = {
  /**
   * 获取文件夹树
   */
  getFoldersTree: (params?: { notebookId?: string }): Promise<ApiResponse<FoldersTreeResponse>> => {
    return api.get('/folders', { params: { ...params, tree: true } });
  },

  /**
   * 获取文件夹列表（扁平结构）
   */
  getFolders: (params?: FolderQueryParams): Promise<ApiResponse<{ folders: Folder[] }>> => {
    return api.get('/folders', { params });
  },

  /**
   * 获取文件夹详情
   */
  getFolder: (id: string): Promise<ApiResponse<Folder>> => {
    return api.get(`/folders/${id}`);
  },

  /**
   * 创建文件夹
   */
  createFolder: (params: CreateFolderParams): Promise<ApiResponse<Folder>> => {
    return api.post('/folders', params);
  },

  /**
   * 更新文件夹
   */
  updateFolder: (id: string, params: UpdateFolderParams): Promise<ApiResponse<Folder>> => {
    return api.put(`/folders/${id}`, params);
  },

  /**
   * 删除文件夹
   */
  deleteFolder: (id: string): Promise<ApiResponse<null>> => {
    return api.delete(`/folders/${id}`);
  },

  /**
   * 批量排序文件夹
   */
  reorderFolders: (params: ReorderFoldersParams): Promise<ApiResponse<null>> => {
    return api.put('/folders/reorder', params);
  },

  /**
   * 移动文件夹
   */
  moveFolder: (id: string, newParentId: string | null): Promise<ApiResponse<Folder>> => {
    return api.put(`/folders/${id}/move`, { parentId: newParentId });
  },
};

export default foldersApi;
