import React from 'react';
import { Input, Button, Card, Empty, Popconfirm } from 'antd';
import { SearchOutlined, PlusOutlined, StarOutlined, StarFilled, DeleteOutlined, ExportOutlined } from '@ant-design/icons';
import type { Note } from '../../types';
import { exportToPDF } from '../../utils/exportPDF';
import { exportToExcel } from '../../utils/exportExcel';

interface NoteListProps {
  notes: Note[];
  selectedNoteId: string | null;
  searchQuery: string;
  onSelectNote: (id: string) => void;
  onDeleteNote: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onAddNote: () => void;
  onSearch: (query: string) => void;
  theme: 'light' | 'dark';
}

export const NoteList: React.FC<NoteListProps> = ({
  notes,
  selectedNoteId,
  searchQuery,
  onSelectNote,
  onDeleteNote,
  onToggleFavorite,
  onAddNote,
  onSearch,
  theme,
}) => {
  const stripHtml = (html: string) => {
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || '';
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 0) {
      return `今天 ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
    } else if (days === 1) {
      return '昨天';
    } else if (days < 7) {
      return `${days}天前`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className={`note-list ${theme}`}>
      <div className="note-list-header">
        <Input
          placeholder="搜索笔记..."
          prefix={<SearchOutlined />}
          value={searchQuery}
          onChange={(e) => onSearch(e.target.value)}
          allowClear
        />
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={onAddNote}
        >
          新建笔记
        </Button>
      </div>

      <div className="note-cards">
        {notes.length === 0 ? (
          <Empty
            description="暂无笔记"
            image={Empty.PRESENTED_IMAGE_SIMPLE}
          >
            <Button type="primary" onClick={onAddNote}>
              创建第一篇笔记
            </Button>
          </Empty>
        ) : (
          notes.map(note => (
            <Card
              key={note.id}
              className={`note-card ${selectedNoteId === note.id ? 'selected' : ''}`}
              onClick={() => onSelectNote(note.id)}
              hoverable
            >
              <div className="note-card-header">
                <h3 className="note-title">{note.title || '无标题'}</h3>
                <div className="note-actions">
                  <Button
                    type="text"
                    size="small"
                    icon={note.isFavorite ? <StarFilled style={{ color: '#faad14' }} /> : <StarOutlined />}
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleFavorite(note.id);
                    }}
                  />
                  <Popconfirm
                    title="确认删除"
                    description="确定要删除这篇笔记吗？"
                    onConfirm={(e) => {
                      e?.stopPropagation();
                      onDeleteNote(note.id);
                    }}
                    onCancel={(e) => e?.stopPropagation()}
                  >
                    <Button
                      type="text"
                      size="small"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </Popconfirm>
                </div>
              </div>
              <p className="note-preview">
                {stripHtml(note.content).substring(0, 100) || '暂无内容...'}
              </p>
              <div className="note-meta">
                <span className="note-date">{formatDate(note.updatedAt)}</span>
                <div className="note-export-btns">
                  <Button
                    type="text"
                    size="small"
                    icon={<ExportOutlined />}
                    onClick={(e) => {
                      e.stopPropagation();
                      exportToPDF(note);
                    }}
                    title="导出PDF"
                  />
                  <Button
                    type="text"
                    size="small"
                    icon={<ExportOutlined />}
                    onClick={(e) => {
                      e.stopPropagation();
                      exportToExcel(note);
                    }}
                    title="导出Excel"
                  />
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      <style>{`
        .note-list {
          width: 320px;
          height: 100%;
          display: flex;
          flex-direction: column;
          background: ${theme === 'dark' ? '#1f1f1f' : '#fff'};
          border-right: 1px solid ${theme === 'dark' ? '#303030' : '#e8e8e8'};
        }
        .note-list-header {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          border-bottom: 1px solid ${theme === 'dark' ? '#303030' : '#e8e8e8'};
        }
        .note-list-header .ant-input-affix-wrapper {
          border-radius: 8px;
        }
        .note-cards {
          flex: 1;
          overflow-y: auto;
          padding: 12px;
        }
        .note-card {
          margin-bottom: 12px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
          border: 1px solid ${theme === 'dark' ? '#303030' : '#e8e8e8'};
        }
        .note-card:hover {
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        .note-card.selected {
          border-color: #1677ff;
          background: ${theme === 'dark' ? '#1f1f1f' : '#f0f7ff'};
        }
        .note-card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 8px;
        }
        .note-title {
          margin: 0;
          font-size: 15px;
          font-weight: 600;
          color: ${theme === 'dark' ? '#e2e8f0' : '#333'};
          flex: 1;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .note-actions {
          display: none;
          gap: 4px;
        }
        .note-card:hover .note-actions {
          display: flex;
        }
        .note-preview {
          color: ${theme === 'dark' ? '#a0a0a0' : '#666'};
          font-size: 13px;
          line-height: 1.5;
          margin: 0 0 12px 0;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
        .note-meta {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .note-date {
          font-size: 12px;
          color: ${theme === 'dark' ? '#666' : '#999'};
        }
        .note-export-btns {
          display: none;
          gap: 4px;
        }
        .note-card:hover .note-export-btns {
          display: flex;
        }
      `}</style>
    </div>
  );
};
