import React from 'react';
import { ConfigProvider, Button, theme as antdTheme } from 'antd';
import { SunOutlined, MoonOutlined } from '@ant-design/icons';
import { Sidebar } from './components/Sidebar/Sidebar';
import { NoteList } from './components/NoteList/NoteList';
import { Editor } from './components/Editor/Editor';
import { useNotes } from './hooks/useNotes';
import './App.css';

const App: React.FC = () => {
  const {
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
  } = useNotes();

  const filteredNotes = getFilteredNotes();

  const handleAddNote = () => {
    const folderId = selectedFolderId || 'default';
    addNote(folderId);
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme === 'dark' ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
        token: {
          colorPrimary: '#1677ff',
          borderRadius: 8,
        },
      }}
    >
      <div className={`app ${theme}`}>
        <div className="app-header">
          <div className="app-title">
            <h1>NotePro</h1>
            <span>高级笔记应用</span>
          </div>
          <Button
            type="text"
            icon={theme === 'dark' ? <SunOutlined /> : <MoonOutlined />}
            onClick={toggleTheme}
            className="theme-toggle"
          >
            {theme === 'dark' ? '浅色模式' : '深色模式'}
          </Button>
        </div>

        <div className="app-body">
          <Sidebar
            folders={folders}
            selectedFolderId={selectedFolderId}
            onSelectFolder={setSelectedFolderId}
            onAddFolder={addFolder}
            onUpdateFolder={updateFolder}
            onDeleteFolder={deleteFolder}
            theme={theme}
          />

          <NoteList
            notes={filteredNotes}
            selectedNoteId={selectedNoteId}
            searchQuery={searchQuery}
            onSelectNote={setSelectedNoteId}
            onDeleteNote={deleteNote}
            onToggleFavorite={toggleFavorite}
            onAddNote={handleAddNote}
            onSearch={setSearchQuery}
            theme={theme}
          />

          <Editor
            note={selectedNote}
            notes={notes}
            onUpdateNote={updateNote}
            theme={theme}
          />
        </div>
      </div>
    </ConfigProvider>
  );
};

export default App;
