import api, { ApiResponse, PaginationParams } from './index';

// 同步变更记录
export interface SyncChange {
  _id: string;
  userId: string;
  entityType: 'note' | 'folder' | 'notebook' | 'tag';
  entityId: string;
  operation: 'create' | 'update' | 'delete';
  version: number;
  data: {
    before: any;
    after: any;
  };
  timestamp: string;
  clientId: string;
  synced: boolean;
}

// 同步令牌
export interface SyncToken {
  userId: string;
  token: string;
  timestamp: string;
  entityVersions: {
    notes: Record<string, number>;
    folders: Record<string, number>;
    notebooks: Record<string, number>;
    tags: Record<string, number>;
  };
}

// 同步状态
export interface SyncStatus {
  isOnline: boolean;
  lastSyncedAt: string | null;
  pendingChanges: number;
  isSyncing: boolean;
  conflictCount: number;
}

// 变更记录响应
export interface ChangesResponse {
  changes: SyncChange[];
  syncToken: string;
}

// 推送变更请求参数
export interface PushChangesParams {
  changes: Array<{
    entityType: 'note' | 'folder' | 'notebook' | 'tag';
    entityId: string;
    operation: 'create' | 'update' | 'delete';
    data: any;
    version: number;
  }>;
  clientId: string;
}

// 获取变更列表请求参数
export interface GetChangesParams extends PaginationParams {
  syncToken?: string;
  entityTypes?: string[];
}

// 同步相关 API
export const syncApi = {
  /**
   * 获取变更列表（增量同步）
   */
  getChanges: (params: GetChangesParams): Promise<ApiResponse<ChangesResponse>> => {
    return api.get('/sync/changes', { params });
  },

  /**
   * 推送本地变更
   */
  pushChanges: (params: PushChangesParams): Promise<ApiResponse<ChangesResponse>> => {
    return api.post('/sync/push', params);
  },

  /**
   * 获取同步状态
   */
  getSyncStatus: (): Promise<ApiResponse<SyncStatus>> => {
    return api.get('/sync/status');
  },

  /**
   * 强制全量同步
   */
  fullSync: (): Promise<ApiResponse<{
    notes: any[];
    folders: any[];
    notebooks: any[];
    tags: any[];
  }>> => {
    return api.post('/sync/full');
  },

  /**
   * 解决冲突
   */
  resolveConflict: (
    entityType: 'note' | 'folder' | 'notebook' | 'tag',
    entityId: string,
    resolution: 'local' | 'remote' | 'keepBoth'
  ): Promise<ApiResponse<null>> => {
    return api.post('/sync/conflict/resolve', {
      entityType,
      entityId,
      resolution,
    });
  },

  /**
   * 获取冲突列表
   */
  getConflicts: (): Promise<ApiResponse<{
    conflicts: Array<{
      entityType: 'note' | 'folder' | 'notebook' | 'tag';
      entityId: string;
      localData: any;
      remoteData: any;
      createdAt: string;
    }>;
  }>> => {
    return api.get('/sync/conflicts');
  },
};

export default syncApi;
