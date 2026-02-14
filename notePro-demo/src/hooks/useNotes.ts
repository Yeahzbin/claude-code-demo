import { useState, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Note, Folder } from '../types';
import { storage } from '../utils/storage';

export const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  // Load initial data
  useEffect(() => {
    setNotes(storage.getNotes());
    setFolders(storage.getFolders());
    setTheme(storage.getTheme());
  }, []);

  // Auto-save notes
  useEffect(() => {
    if (notes.length > 0) {
      storage.saveNotes(notes);
    }
  }, [notes]);

  // Auto-save folders
  useEffect(() => {
    if (folders.length > 0) {
      storage.saveFolders(folders);
    }
  }, [folders]);

  // Theme
  const toggleTheme = useCallback(() => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    storage.saveTheme(newTheme);
  }, [theme]);

  // Folder operations
  const addFolder = useCallback((name: string, parentId: string | null = null) => {
    const newFolder: Folder = {
      id: uuidv4(),
      name,
      parentId,
      color: '#1890ff',
      createdAt: new Date().toISOString(),
    };
    setFolders(prev => [...prev, newFolder]);
    return newFolder;
  }, []);

  const updateFolder = useCallback((id: string, updates: Partial<Folder>) => {
    setFolders(prev => prev.map(f => f.id === id ? { ...f, ...updates } : f));
  }, []);

  const deleteFolder = useCallback((id: string) => {
    setFolders(prev => prev.filter(f => f.id !== id));
    // Move notes in this folder to default folder
    setNotes(prev => prev.map(n => n.folderId === id ? { ...n, folderId: 'default' } : n));
    if (selectedFolderId === id) {
      setSelectedFolderId(null);
    }
  }, [selectedFolderId]);

  // Note operations
  const addNote = useCallback((folderId: string = 'default') => {
    const newNote: Note = {
      id: uuidv4(),
      title: '无标题笔记',
      content: '',
      folderId,
      tags: [],
      isFavorite: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setNotes(prev => [newNote, ...prev]);
    setSelectedNoteId(newNote.id);
    return newNote;
  }, []);

  const updateNote = useCallback((id: string, updates: Partial<Note>) => {
    setNotes(prev => prev.map(n =>
      n.id === id ? { ...n, ...updates, updatedAt: new Date().toISOString() } : n
    ));
  }, []);

  const deleteNote = useCallback((id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
    if (selectedNoteId === id) {
      setSelectedNoteId(null);
    }
  }, [selectedNoteId]);

  const toggleFavorite = useCallback((id: string) => {
    setNotes(prev => prev.map(n =>
      n.id === id ? { ...n, isFavorite: !n.isFavorite } : n
    ));
  }, []);

  // Get filtered notes
  const getFilteredNotes = useCallback(() => {
    let filtered = notes;

    // Filter by folder
    if (selectedFolderId) {
      filtered = filtered.filter(n => n.folderId === selectedFolderId);
    }

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(n =>
        n.title.toLowerCase().includes(query) ||
        stripHtml(n.content).toLowerCase().includes(query)
      );
    }

    // Sort by updated time
    return filtered.sort((a, b) =>
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }, [notes, selectedFolderId, searchQuery]);

  // Get selected note
  const selectedNote = notes.find(n => n.id === selectedNoteId) || null;

  return {
    notes,
    folders,
    selectedNoteId,
    selectedFolderId,
    selectedNote,
    searchQuery,
    theme,
    setSelectedNoteId,
    setSelectedFolderId,
    setSearchQuery,
    toggleTheme,
    addFolder,
    updateFolder,
    deleteFolder,
    addNote,
    updateNote,
    deleteNote,
    toggleFavorite,
    getFilteredNotes,
  };
};

// Helper function
function stripHtml(html: string): string {
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || '';
}
