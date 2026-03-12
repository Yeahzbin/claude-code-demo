import { apiGet, apiPost, apiPut, apiDelete, ApiResponse, PaginationParams } from './index';

// 标签类型定义（与 PRD 文档一致）
export interface Tag {
  id: string;
  userId: string;
  name: string;
  color: string;
  noteCount: number;
  createdAt: string;
  updatedAt: string;
}

// 创建标签请求参数
export interface CreateTagParams {
  name: string;
  color?: string;
}

// 更新标签请求参数
export interface UpdateTagParams {
  name?: string;
  color?: string;
}

// 标签查询参数
export interface TagQueryParams extends PaginationParams {
  search?: string;
}

// 标签列表响应
export interface TagsListResponse {
  tags: Tag[];
}

// 标签相关 API
export const tagsApi = {
  /**
   * 获取标签列表
   */
  getTags: (params?: TagQueryParams): Promise<ApiResponse<TagsListResponse>> => {
    return apiGet('/tags', { params });
  },

  /**
   * 获取标签详情
   */
  getTag: (id: string): Promise<ApiResponse<Tag>> => {
    return apiGet(`/tags/${id}`);
  },

  /**
   * 创建标签
   */
  createTag: (params: CreateTagParams): Promise<ApiResponse<Tag>> => {
    return apiPost('/tags', params);
  },

  /**
   * 更新标签
   */
  updateTag: (id: string, params: UpdateTagParams): Promise<ApiResponse<Tag>> => {
    return apiPut(`/tags/${id}`, params);
  },

  /**
   * 删除标签
   */
  deleteTag: (id: string): Promise<ApiResponse<null>> => {
    return apiDelete(`/tags/${id}`);
  },

  /**
   * 批量删除标签
   */
  batchDeleteTags: (tagIds: string[]): Promise<ApiResponse<null>> => {
    return apiDelete('/tags/batch', { data: { tagIds } });
  },

  /**
   * 合并标签
   */
  mergeTags: (sourceTagId: string, targetTagId: string): Promise<ApiResponse<null>> => {
    return apiPost('/tags/merge', { sourceTagId, targetTagId });
  },
};

export default tagsApi;
