import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button, Dropdown, message } from 'antd';
import {
  BoldOutlined,
  ItalicOutlined,
  UnderlineOutlined,
  StrikethroughOutlined,
  OrderedListOutlined,
  UnorderedListOutlined,
  AlignLeftOutlined,
  AlignCenterOutlined,
  AlignRightOutlined,
  LinkOutlined,
  PictureOutlined,
  FullscreenOutlined,
} from '@ant-design/icons';
import type { Note } from '../../types';
import { exportToPDF, exportNotesToPDF } from '../../utils/exportPDF';
import { exportToExcel, exportNotesToExcel } from '../../utils/exportExcel';

interface EditorProps {
  note: Note | null;
  notes: Note[];
  onUpdateNote: (id: string, updates: Partial<Note>) => void;
  theme: 'light' | 'dark';
}

export const Editor: React.FC<EditorProps> = ({
  note,
  notes,
  onUpdateNote,
  theme,
}) => {
  const [title, setTitle] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const editorRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);
  const lastNoteId = useRef<string | null>(null);

  // Update word count
  const updateWordCount = useCallback(() => {
    if (editorRef.current) {
      const text = editorRef.current.innerText || '';
      setWordCount(text.replace(/\s/g, '').length);
      setCharCount(text.length);
    }
  }, []);

  // Load note data
  useEffect(() => {
    if (note && note.id !== lastNoteId.current) {
      lastNoteId.current = note.id;
      setTitle(note.title);
      if (editorRef.current) {
        editorRef.current.innerHTML = note.content || '';
      }
      isInitialMount.current = false;
      // Update word count after content is set
      setTimeout(updateWordCount, 0);
    } else if (!note) {
      lastNoteId.current = null;
      setTitle('');
      if (editorRef.current) {
        editorRef.current.innerHTML = '';
      }
      setWordCount(0);
      setCharCount(0);
    }
  }, [note?.id, updateWordCount]);

  // Auto-save
  const handleSave = useCallback(() => {
    if (note && editorRef.current && !isInitialMount.current) {
      const currentContent = editorRef.current.innerHTML;
      const currentTitle = title;
      if (currentTitle !== note.title || currentContent !== note.content) {
        onUpdateNote(note.id, { title: currentTitle, content: currentContent });
      }
    }
  }, [note, title, onUpdateNote]);

  // Handle content changes
  const handleInput = useCallback(() => {
    updateWordCount();
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
    }
    if (!isInitialMount.current) {
      saveTimerRef.current = setTimeout(handleSave, 1000);
    }
  }, [handleSave, updateWordCount]);

  // Handle title changes
  const handleTitleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (saveTimerRef.current) {
      clearTimeout(saveTimerRef.current);
    }
    if (!isInitialMount.current) {
      saveTimerRef.current = setTimeout(handleSave, 1000);
    }
  }, [handleSave]);

  // Format commands
  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    handleInput();
  };

  const handleLink = () => {
    const url = prompt('请输入链接地址:');
    if (url) {
      execCommand('createLink', url);
    }
  };

  const handleImage = () => {
    const url = prompt('请输入图片地址:');
    if (url) {
      execCommand('insertImage', url);
    }
  };

  const exportItems = [
    {
      key: 'pdf',
      label: '导出为 PDF',
      onClick: async () => {
        if (note) {
          message.loading({ content: '正在导出 PDF...', key: 'pdf-export' });
          await exportToPDF(note);
          message.success({ content: 'PDF 导出成功', key: 'pdf-export' });
        }
      },
    },
    {
      key: 'excel',
      label: '导出为 Excel',
      onClick: () => {
        if (note) {
          exportToExcel(note);
          message.success('Excel 导出成功');
        }
      },
    },
    {
      key: 'pdf-all',
      label: '导出所有笔记为 PDF',
      onClick: async () => {
        if (notes.length > 0) {
          message.loading({ content: '正在导出 PDF...', key: 'pdf-export' });
          await exportNotesToPDF(notes);
          message.success({ content: 'PDF 导出成功', key: 'pdf-export' });
        }
      },
    },
    {
      key: 'excel-all',
      label: '导出所有笔记为 Excel',
      onClick: () => {
        if (notes.length > 0) {
          exportNotesToExcel(notes);
          message.success('Excel 导出成功');
        }
      },
    },
  ];

  if (!note) {
    return (
      <div className={`editor-empty ${theme}`}>
        <div className="empty-content">
          <h2>欢迎使用 NotePro</h2>
          <p>选择一篇笔记开始编辑，或创建新笔记</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`editor ${theme} ${isFullscreen ? 'fullscreen' : ''}`}>
      <div className="editor-toolbar">
        <div className="toolbar-group">
          <Button
            type="text"
            icon={<BoldOutlined />}
            onClick={() => execCommand('bold')}
            title="加粗"
          />
          <Button
            type="text"
            icon={<ItalicOutlined />}
            onClick={() => execCommand('italic')}
            title="斜体"
          />
          <Button
            type="text"
            icon={<UnderlineOutlined />}
            onClick={() => execCommand('underline')}
            title="下划线"
          />
          <Button
            type="text"
            icon={<StrikethroughOutlined />}
            onClick={() => execCommand('strikeThrough')}
            title="删除线"
          />
        </div>

        <div className="toolbar-divider" />

        <div className="toolbar-group">
          <select
            className="heading-select"
            onChange={(e) => execCommand('formatBlock', e.target.value)}
            defaultValue=""
          >
            <option value="" disabled>标题</option>
            <option value="h1">标题 1</option>
            <option value="h2">标题 2</option>
            <option value="h3">标题 3</option>
            <option value="h4">标题 4</option>
            <option value="p">正文</option>
          </select>
        </div>

        <div className="toolbar-divider" />

        <div className="toolbar-group">
          <Button
            type="text"
            icon={<UnorderedListOutlined />}
            onClick={() => execCommand('insertUnorderedList')}
            title="无序列表"
          />
          <Button
            type="text"
            icon={<OrderedListOutlined />}
            onClick={() => execCommand('insertOrderedList')}
            title="有序列表"
          />
        </div>

        <div className="toolbar-divider" />

        <div className="toolbar-group">
          <Button
            type="text"
            icon={<AlignLeftOutlined />}
            onClick={() => execCommand('justifyLeft')}
            title="左对齐"
          />
          <Button
            type="text"
            icon={<AlignCenterOutlined />}
            onClick={() => execCommand('justifyCenter')}
            title="居中"
          />
          <Button
            type="text"
            icon={<AlignRightOutlined />}
            onClick={() => execCommand('justifyRight')}
            title="右对齐"
          />
        </div>

        <div className="toolbar-divider" />

        <div className="toolbar-group">
          <Button
            type="text"
            icon={<LinkOutlined />}
            onClick={handleLink}
            title="插入链接"
          />
          <Button
            type="text"
            icon={<PictureOutlined />}
            onClick={handleImage}
            title="插入图片"
          />
        </div>

        <div className="toolbar-spacer" />

        <div className="toolbar-group">
          <Dropdown menu={{ items: exportItems }} trigger={['click']}>
            <Button type="text" title="导出">
              导出
            </Button>
          </Dropdown>
          <Button
            type="text"
            icon={<FullscreenOutlined />}
            onClick={() => setIsFullscreen(!isFullscreen)}
            title="全屏"
          />
        </div>
      </div>

      <div className="editor-content">
        <input
          type="text"
          className="editor-title"
          placeholder="笔记标题..."
          value={title}
          onChange={handleTitleChange}
        />
        <div
          ref={editorRef}
          className="editor-body"
          contentEditable
          onInput={handleInput}
        />
      </div>

      <div className="editor-footer">
        <span>字数: {wordCount}</span>
        <span>字符: {charCount}</span>
        <span>已自动保存</span>
      </div>

      <style>{`
        .editor {
          flex: 1;
          display: flex;
          flex-direction: column;
          background: ${theme === 'dark' ? '#1f1f1f' : '#fff'};
          height: 100%;
        }
        .editor.fullscreen {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1000;
        }
        .editor-empty {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background: ${theme === 'dark' ? '#1f1f1f' : '#fff'};
        }
        .empty-content {
          text-align: center;
          color: ${theme === 'dark' ? '#a0a0a0' : '#666'};
        }
        .empty-content h2 {
          color: ${theme === 'dark' ? '#e2e8f0' : '#333'};
          margin-bottom: 8px;
        }
        .editor-toolbar {
          display: flex;
          align-items: center;
          padding: 8px 16px;
          border-bottom: 1px solid ${theme === 'dark' ? '#303030' : '#e8e8e8'};
          flex-wrap: wrap;
          gap: 4px;
        }
        .toolbar-group {
          display: flex;
          align-items: center;
          gap: 2px;
        }
        .toolbar-divider {
          width: 1px;
          height: 24px;
          background: ${theme === 'dark' ? '#303030' : '#e8e8e8'};
          margin: 0 8px;
        }
        .toolbar-spacer {
          flex: 1;
        }
        .heading-select {
          padding: 4px 8px;
          border: 1px solid ${theme === 'dark' ? '#303030' : '#d9d9d9'};
          border-radius: 4px;
          background: ${theme === 'dark' ? '#1f1f1f' : '#fff'};
          color: ${theme === 'dark' ? '#e2e8f0' : '#333'};
          cursor: pointer;
        }
        .editor-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          padding: 24px 32px;
          overflow-y: auto;
        }
        .editor-title {
          font-size: 28px;
          font-weight: 600;
          border: none;
          outline: none;
          background: transparent;
          color: ${theme === 'dark' ? '#e2e8f0' : '#333'};
          margin-bottom: 16px;
          width: 100%;
        }
        .editor-title::placeholder {
          color: ${theme === 'dark' ? '#666' : '#ccc'};
        }
        .editor-body {
          flex: 1;
          font-size: 16px;
          line-height: 1.8;
          outline: none;
          color: ${theme === 'dark' ? '#e2e8f0' : '#333'};
          min-height: 300px;
        }
        .editor-body:empty::before {
          content: '开始记录你的想法...';
          color: ${theme === 'dark' ? '#666' : '#ccc'};
        }
        .editor-body h1 { font-size: 24px; }
        .editor-body h2 { font-size: 20px; }
        .editor-body h3 { font-size: 18px; }
        .editor-body ul, .editor-body ol {
          padding-left: 24px;
        }
        .editor-body a {
          color: #1677ff;
        }
        .editor-body img {
          max-width: 100%;
        }
        .editor-footer {
          display: flex;
          gap: 16px;
          padding: 8px 32px;
          font-size: 12px;
          color: ${theme === 'dark' ? '#666' : '#999'};
          border-top: 1px solid ${theme === 'dark' ? '#303030' : '#e8e8e8'};
        }
      `}</style>
    </div>
  );
};
