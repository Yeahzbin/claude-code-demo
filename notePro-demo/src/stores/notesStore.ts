import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { notesApi, Note, NoteQueryParams, CreateNoteParams, UpdateNoteParams } from '../api/notes';
import { foldersApi, Folder, CreateFolderParams, UpdateFolderParams } from '../api/folders';
import { tagsApi, Tag, CreateTagParams, UpdateTagParams } from '../api/tags';

// 笔记状态管理类型定义
interface NotesState {
  // 笔记状态
  notes: Note[];
  selectedNoteId: string | null;
  isLoadingNotes: boolean;
  notesError: string | null;

  // 文件夹状态
  folders: Folder[];
  selectedFolderId: string | null;
  isLoadingFolders: boolean;
  foldersError: string | null;

  // 标签状态
  tags: Tag[];
  isLoadingTags: boolean;
  tagsError: string | null;

  // 搜索状态
  searchQuery: string;
  searchResults: Note[];
  isSearching: boolean;

  // 笔记操作
  fetchNotes: (params?: NoteQueryParams) => Promise<void>;
  fetchNote: (id: string) => Promise<Note | null>;
  createNote: (params: CreateNoteParams) => Promise<Note | null>;
  updateNote: (id: string, params: UpdateNoteParams) => Promise<Note | null>;
  deleteNote: (id: string) => Promise<void>;
  restoreNote: (id: string) => Promise<void>;
  permanentDeleteNote: (id: string) => Promise<void>;
  selectNote: (id: string | null) => void;

  // 文件夹操作
  fetchFolders: () => Promise<void>;
  createFolder: (params: CreateFolderParams) => Promise<Folder | null>;
  updateFolder: (id: string, params: UpdateFolderParams) => Promise<Folder | null>;
  deleteFolder: (id: string) => Promise<void>;
  selectFolder: (id: string | null) => void;

  // 标签操作
  fetchTags: () => Promise<void>;
  createTag: (params: CreateTagParams) => Promise<Tag | null>;
  updateTag: (id: string, params: UpdateTagParams) => Promise<Tag | null>;
  deleteTag: (id: string) => Promise<void>;

  // 搜索操作
  search: (query: string) => Promise<void>;
  clearSearch: () => void;

  // 错误处理
  setNotesError: (error: string | null) => void;
  setFoldersError: (error: string | null) => void;
  setTagsError: (error: string | null) => void;
  clearErrors: () => void;
}

// 创建笔记数据 Store
export const useNotesStore = create<NotesState>()(
  persist(
    (set, get) => ({
      // 初始笔记状态
      notes: [],
      selectedNoteId: null,
      isLoadingNotes: false,
      notesError: null,

      // 初始文件夹状态
      folders: [],
      selectedFolderId: null,
      isLoadingFolders: false,
      foldersError: null,

      // 初始标签状态
      tags: [],
      isLoadingTags: false,
      tagsError: null,

      // 初始搜索状态
      searchQuery: '',
      searchResults: [],
      isSearching: false,

      // ========== 笔记操作 ==========

      // 获取笔记列表
      fetchNotes: async (params?: NoteQueryParams) => {
        set({ isLoadingNotes: true, notesError: null });
        try {
          const response = await notesApi.getNotes(params);
          set({ notes: response.data.data.notes, isLoadingNotes: false });
        } catch (error: any) {
          const errorMessage = error.response?.data?.error?.message || '获取笔记列表失败';
          set({ notesError: errorMessage, isLoadingNotes: false });
        }
      },

      // 获取单个笔记
      fetchNote: async (id: string) => {
        try {
          const response = await notesApi.getNote(id);
          const note = response.data.data;

          // 更新本地笔记列表
          const { notes } = get();
          const noteIndex = notes.findIndex((n) => n.id === id);
          if (noteIndex >= 0) {
            const updatedNotes = [...notes];
            updatedNotes[noteIndex] = note;
            set({ notes: updatedNotes });
          } else {
            set({ notes: [...notes, note] });
          }

          return note;
        } catch (error) {
          return null;
        }
      },

      // 创建笔记
      createNote: async (params: CreateNoteParams) => {
        set({ isLoadingNotes: true, notesError: null });
        try {
          const response = await notesApi.createNote(params);
          const newNote = response.data.data;
          set({ notes: [newNote, ...get().notes], isLoadingNotes: false });
          return newNote;
        } catch (error: any) {
          const errorMessage = error.response?.data?.error?.message || '创建笔记失败';
          set({ notesError: errorMessage, isLoadingNotes: false });
          return null;
        }
      },

      // 更新笔记
      updateNote: async (id: string, params: UpdateNoteParams) => {
        set({ notesError: null });
        try {
          const response = await notesApi.updateNote(id, params);
          const updatedNote = response.data.data;

          // 更新本地笔记列表
          const { notes } = get();
          const updatedNotes = notes.map((note) =>
            note.id === id ? updatedNote : note
          );
          set({ notes: updatedNotes });

          return updatedNote;
        } catch (error: any) {
          const errorMessage = error.response?.data?.error?.message || '更新笔记失败';
          set({ notesError: errorMessage });
          return null;
        }
      },

      // 删除笔记（软删除）
      deleteNote: async (id: string) => {
        set({ notesError: null });
        try {
          await notesApi.deleteNote(id);

          // 从本地列表中移除（或标记为已删除）
          const { notes } = get();
          const updatedNotes = notes.filter((note) => note.id !== id);
          set({ notes: updatedNotes });

          // 如果删除的是当前选中的笔记，清除选中状态
          if (get().selectedNoteId === id) {
            set({ selectedNoteId: null });
          }
        } catch (error: any) {
          const errorMessage = error.response?.data?.error?.message || '删除笔记失败';
          set({ notesError: errorMessage });
        }
      },

      // 恢复笔记
      restoreNote: async (id: string) => {
        set({ notesError: null });
        try {
          const response = await notesApi.restoreNote(id);
          const restoredNote = response.data.data;

          const { notes } = get();
          const updatedNotes = notes.map((note) =>
            note.id === id ? restoredNote : note
          );
          set({ notes: updatedNotes });
        } catch (error: any) {
          const errorMessage = error.response?.data?.error?.message || '恢复笔记失败';
          set({ notesError: errorMessage });
        }
      },

      // 永久删除笔记
      permanentDeleteNote: async (id: string) => {
        set({ notesError: null });
        try {
          await notesApi.permanentDeleteNote(id);

          const { notes } = get();
          const updatedNotes = notes.filter((note) => note.id !== id);
          set({ notes: updatedNotes });

          if (get().selectedNoteId === id) {
            set({ selectedNoteId: null });
          }
        } catch (error: any) {
          const errorMessage = error.response?.data?.error?.message || '永久删除笔记失败';
          set({ notesError: errorMessage });
        }
      },

      // 选择笔记
      selectNote: (id: string | null) => {
        set({ selectedNoteId: id });
      },

      // ========== 文件夹操作 ==========

      // 获取文件夹列表
      fetchFolders: async () => {
        set({ isLoadingFolders: true, foldersError: null });
        try {
          const response = await foldersApi.getFolders();
          set({ folders: response.data.data.folders, isLoadingFolders: false });
        } catch (error: any) {
          const errorMessage = error.response?.data?.error?.message || '获取文件夹列表失败';
          set({ foldersError: errorMessage, isLoadingFolders: false });
        }
      },

      // 创建文件夹
      createFolder: async (params: CreateFolderParams) => {
        set({ isLoadingFolders: true, foldersError: null });
        try {
          const response = await foldersApi.createFolder(params);
          const newFolder = response.data.data;
          set({ folders: [...get().folders, newFolder], isLoadingFolders: false });
          return newFolder;
        } catch (error: any) {
          const errorMessage = error.response?.data?.error?.message || '创建文件夹失败';
          set({ foldersError: errorMessage, isLoadingFolders: false });
          return null;
        }
      },

      // 更新文件夹
      updateFolder: async (id: string, params: UpdateFolderParams) => {
        set({ foldersError: null });
        try {
          const response = await foldersApi.updateFolder(id, params);
          const updatedFolder = response.data.data;

          const { folders } = get();
          const updatedFolders = folders.map((folder) =>
            folder.id === id ? updatedFolder : folder
          );
          set({ folders: updatedFolders });

          return updatedFolder;
        } catch (error: any) {
          const errorMessage = error.response?.data?.error?.message || '更新文件夹失败';
          set({ foldersError: errorMessage });
          return null;
        }
      },

      // 删除文件夹
      deleteFolder: async (id: string) => {
        set({ foldersError: null });
        try {
          await foldersApi.deleteFolder(id);

          const { folders } = get();
          const updatedFolders = folders.filter((folder) => folder.id !== id);
          set({ folders: updatedFolders });

          if (get().selectedFolderId === id) {
            set({ selectedFolderId: null });
          }
        } catch (error: any) {
          const errorMessage = error.response?.data?.error?.message || '删除文件夹失败';
          set({ foldersError: errorMessage });
        }
      },

      // 选择文件夹
      selectFolder: (id: string | null) => {
        set({ selectedFolderId: id });
      },

      // ========== 标签操作 ==========

      // 获取标签列表
      fetchTags: async () => {
        set({ isLoadingTags: true, tagsError: null });
        try {
          const response = await tagsApi.getTags();
          set({ tags: response.data.data.tags, isLoadingTags: false });
        } catch (error: any) {
          const errorMessage = error.response?.data?.error?.message || '获取标签列表失败';
          set({ tagsError: errorMessage, isLoadingTags: false });
        }
      },

      // 创建标签
      createTag: async (params: CreateTagParams) => {
        set({ tagsError: null });
        try {
          const response = await tagsApi.createTag(params);
          const newTag = response.data.data;
          set({ tags: [...get().tags, newTag] });
          return newTag;
        } catch (error: any) {
          const errorMessage = error.response?.data?.error?.message || '创建标签失败';
          set({ tagsError: errorMessage });
          return null;
        }
      },

      // 更新标签
      updateTag: async (id: string, params: UpdateTagParams) => {
        set({ tagsError: null });
        try {
          const response = await tagsApi.updateTag(id, params);
          const updatedTag = response.data.data;

          const { tags } = get();
          const updatedTags = tags.map((tag) =>
            tag.id === id ? updatedTag : tag
          );
          set({ tags: updatedTags });

          return updatedTag;
        } catch (error: any) {
          const errorMessage = error.response?.data?.error?.message || '更新标签失败';
          set({ tagsError: errorMessage });
          return null;
        }
      },

      // 删除标签
      deleteTag: async (id: string) => {
        set({ tagsError: null });
        try {
          await tagsApi.deleteTag(id);

          const { tags } = get();
          const updatedTags = tags.filter((tag) => tag.id !== id);
          set({ tags: updatedTags });
        } catch (error: any) {
          const errorMessage = error.response?.data?.error?.message || '删除标签失败';
          set({ tagsError: errorMessage });
        }
      },

      // ========== 搜索操作 ==========

      // 搜索笔记
      search: async (query: string) => {
        if (!query.trim()) {
          get().clearSearch();
          return;
        }

        set({ searchQuery: query, isSearching: true });
        try {
          const response = await notesApi.searchNotes({ query, page: 1, pageSize: 50 });
          set({ searchResults: response.data.data.notes, isSearching: false });
        } catch (error: any) {
          const errorMessage = error.response?.data?.error?.message || '搜索失败';
          set({ isSearching: false });
          console.error(errorMessage);
        }
      },

      // 清除搜索
      clearSearch: () => {
        set({ searchQuery: '', searchResults: [] });
      },

      // ========== 错误处理 ==========

      setNotesError: (error: string | null) => {
        set({ notesError: error });
      },

      setFoldersError: (error: string | null) => {
        set({ foldersError: error });
      },

      setTagsError: (error: string | null) => {
        set({ tagsError: error });
      },

      clearErrors: () => {
        set({ notesError: null, foldersError: null, tagsError: null });
      },
    }),
    {
      name: 'notepro-notes-storage', // 持久化存储键名
      partialize: (state) => ({
        // 只持久化必要的状态
        selectedNoteId: state.selectedNoteId,
        selectedFolderId: state.selectedFolderId,
      }),
    }
  )
);

export default useNotesStore;
