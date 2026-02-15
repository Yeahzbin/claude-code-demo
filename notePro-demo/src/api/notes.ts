import api, { ApiResponse, PaginationParams, SortParams } from './index';

// 笔记类型定义（与 PRD 文档一致）
export interface Note {
  id: string;
  userId: string;
  title: string;
  content: string;
  contentType: 'markdown' | 'json' | 'html';
  folderId: string;
  notebookId: string;
  tags: string[];
  isFavorite: boolean;
  isPinned: boolean;
  isDeleted: boolean;
  deletedAt?: string;
  wordCount: number;
  metadata: {
    source: 'web' | 'desktop' | 'mobile';
    ipAddress?: string;
    deviceInfo?: string;
  };
  syncInfo: {
    version: number;
    lastSyncedAt: string;
    syncToken: string;
  };
  createdAt: string;
  updatedAt: string;
}

// 笔记版本历史
export interface NoteVersion {
  id: string;
  noteId: string;
  version: number;
  title: string;
  content: string;
  changeSummary?: string;
  createdAt: string;
}

// 创建笔记请求参数
export interface CreateNoteParams {
  title: string;
  content?: string;
  contentType?: 'markdown' | 'json' | 'html';
  folderId?: string;
  notebookId?: string;
  tags?: string[];
  isFavorite?: boolean;
  isPinned?: boolean;
}

// 更新笔记请求参数
export interface UpdateNoteParams {
  title?: string;
  content?: string;
  contentType?: 'markdown' | 'json' | 'html';
  folderId?: string;
  notebookId?: string;
  tags?: string[];
  isFavorite?: boolean;
  isPinned?: boolean;
}

// 笔记查询参数
export interface NoteQueryParams extends PaginationParams, SortParams {
  folderId?: string;
  notebookId?: string;
  tagId?: string;
  isFavorite?: boolean;
  isPinned?: boolean;
  isDeleted?: boolean;
  search?: string;
}

// 搜索笔记请求参数
export interface SearchNotesParams extends PaginationParams {
  query: string;
  folderId?: string;
  notebookId?: string;
  tagId?: string;
}

// 笔记列表响应
export interface NotesListResponse {
  notes: Note[];
}

// 笔记相关 API
export const notesApi = {
  /**
   * 获取笔记列表
   */
  getNotes: (params?: NoteQueryParams): Promise<ApiResponse<NotesListResponse>> => {
    return api.get('/notes', { params });
  },

  /**
   * 获取笔记详情
   */
  getNote: (id: string): Promise<ApiResponse<Note>> => {
    return api.get(`/notes/${id}`);
  },

  /**
   * 创建笔记
   */
  createNote: (params: CreateNoteParams): Promise<ApiResponse<Note>> => {
    return api.post('/notes', params);
  },

  /**
   * 更新笔记
   */
  updateNote: (id: string, params: UpdateNoteParams): Promise<ApiResponse<Note>> => {
    return api.put(`/notes/${id}`, params);
  },

  /**
   * 删除笔记（软删除）
   */
  deleteNote: (id: string): Promise<ApiResponse<null>> => {
    return api.delete(`/notes/${id}`);
  },

  /**
   * 恢复笔记
   */
  restoreNote: (id: string): Promise<ApiResponse<Note>> => {
    return api.post(`/notes/${id}/restore`);
  },

  /**
   * 永久删除笔记
   */
  permanentDeleteNote: (id: string): Promise<ApiResponse<null>> => {
    return api.delete(`/notes/${id}/permanent`);
  },

  /**
   * 获取笔记版本历史
   */
  getNoteVersions: (id: string, params?: PaginationParams): Promise<ApiResponse<{ versions: NoteVersion[] }>> => {
    return api.get(`/notes/${id}/versions`, { params });
  },

  /**
   * 恢复笔记版本
   */
  restoreNoteVersion: (noteId: string, versionId: string): Promise<ApiResponse<Note>> => {
    return api.post(`/notes/${noteId}/versions/${versionId}/restore`);
  },

  /**
   * 搜索笔记
   */
  searchNotes: (params: SearchNotesParams): Promise<ApiResponse<NotesListResponse>> => {
    return api.get('/notes/search', { params });
  },

  /**
   * 批量移动笔记到文件夹
   */
  moveNotesToFolder: (noteIds: string[], folderId: string): Promise<ApiResponse<null>> => {
    return api.put('/notes/batch/move', { noteIds, folderId });
  },

  /**
   * 批量删除笔记
   */
  batchDeleteNotes: (noteIds: string[]): Promise<ApiResponse<null>> => {
    return api.delete('/notes/batch', { data: { noteIds } });
  },

  /**
   * 批量添加标签
   */
  batchAddTags: (noteIds: string[], tagIds: string[]): Promise<ApiResponse<null>> => {
    return api.put('/notes/batch/tags', { noteIds, tagIds });
  },
};

export default notesApi;
