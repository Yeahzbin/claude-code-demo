import React, { useState } from 'react';
import { Input, Button, Modal, message } from 'antd';
import { FolderOutlined, FolderOpenOutlined, PlusOutlined, EditOutlined, DeleteOutlined, InboxOutlined } from '@ant-design/icons';
import type { Folder } from '../../types';

interface SidebarProps {
  folders: Folder[];
  selectedFolderId: string | null;
  onSelectFolder: (id: string | null) => void;
  onAddFolder: (name: string, parentId: string | null) => Folder;
  onUpdateFolder: (id: string, updates: Partial<Folder>) => void;
  onDeleteFolder: (id: string) => void;
  theme: 'light' | 'dark';
}

export const Sidebar: React.FC<SidebarProps> = ({
  folders,
  selectedFolderId,
  onSelectFolder,
  onAddFolder,
  onUpdateFolder,
  onDeleteFolder,
  theme,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [folderName, setFolderName] = useState('');
  const [editingFolder, setEditingFolder] = useState<Folder | null>(null);

  const handleAddFolder = () => {
    if (!folderName.trim()) {
      message.warning('请输入文件夹名称');
      return;
    }
    onAddFolder(folderName.trim(), selectedFolderId);
    setFolderName('');
    setIsModalOpen(false);
    message.success('文件夹创建成功');
  };

  const handleEditFolder = () => {
    if (!editingFolder || !folderName.trim()) return;
    onUpdateFolder(editingFolder.id, { name: folderName.trim() });
    setEditingFolder(null);
    setFolderName('');
    setIsModalOpen(false);
    message.success('文件夹已重命名');
  };

  const openEditModal = (folder: Folder) => {
    setEditingFolder(folder);
    setFolderName(folder.name);
    setIsModalOpen(true);
  };

  // Convert folders to tree data
  const buildTreeData = (parentId: string | null = null): any[] => {
    return folders
      .filter(f => f.parentId === parentId)
      .map(f => ({
        key: f.id,
        title: (
          <div className="folder-item">
            <span className="folder-name">{f.name}</span>
            <div className="folder-actions">
              <Button
                type="text"
                size="small"
                icon={<EditOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  openEditModal(f);
                }}
              />
              {f.id !== 'default' && (
                <Button
                  type="text"
                  size="small"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteFolder(f.id);
                    message.success('文件夹已删除');
                  }}
                />
              )}
            </div>
          </div>
        ),
        icon: ({ selected }: { selected: boolean }) =>
          selected ? <FolderOpenOutlined style={{ color: f.color }} /> : <FolderOutlined />,
        children: buildTreeData(f.id),
      }));
  };

  return (
    <div className={`sidebar ${theme}`}>
      <div className="sidebar-header">
        <h2>文件夹</h2>
        <Button
          type="text"
          icon={<PlusOutlined />}
          onClick={() => {
            setEditingFolder(null);
            setFolderName('');
            setIsModalOpen(true);
          }}
        />
      </div>

      <div className="folder-list">
        <div
          className={`folder-item all-notes ${selectedFolderId === null ? 'selected' : ''}`}
          onClick={() => onSelectFolder(null)}
        >
          <InboxOutlined />
          <span>全部笔记</span>
        </div>

        {folders.filter(f => f.parentId === null).map(folder => (
          <div
            key={folder.id}
            className={`folder-item ${selectedFolderId === folder.id ? 'selected' : ''}`}
            onClick={() => onSelectFolder(folder.id)}
          >
            <FolderOutlined style={{ color: folder.color }} />
            <span className="folder-name">{folder.name}</span>
            <div className="folder-actions">
              <Button
                type="text"
                size="small"
                icon={<EditOutlined />}
                onClick={(e) => {
                  e.stopPropagation();
                  openEditModal(folder);
                }}
              />
              {folder.id !== 'default' && (
                <Button
                  type="text"
                  size="small"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={(e) => {
                    e.stopPropagation();
                    onDeleteFolder(folder.id);
                    message.success('文件夹已删除');
                  }}
                />
              )}
            </div>
          </div>
        ))}
      </div>

      <Modal
        title={editingFolder ? '重命名文件夹' : '新建文件夹'}
        open={isModalOpen}
        onOk={editingFolder ? handleEditFolder : handleAddFolder}
        onCancel={() => {
          setIsModalOpen(false);
          setEditingFolder(null);
          setFolderName('');
        }}
      >
        <Input
          placeholder="请输入文件夹名称"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          onPressEnter={editingFolder ? handleEditFolder : handleAddFolder}
        />
      </Modal>

      <style>{`
        .sidebar {
          width: 240px;
          height: 100%;
          padding: 16px;
          background: ${theme === 'dark' ? '#1f1f1f' : '#f5f5f5'};
          border-right: 1px solid ${theme === 'dark' ? '#303030' : '#e8e8e8'};
          display: flex;
          flex-direction: column;
        }
        .sidebar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }
        .sidebar-header h2 {
          margin: 0;
          font-size: 16px;
          font-weight: 600;
          color: ${theme === 'dark' ? '#fff' : '#333'};
        }
        .folder-list {
          flex: 1;
          overflow-y: auto;
        }
        .folder-item {
          display: flex;
          align-items: center;
          padding: 10px 12px;
          margin: 4px 0;
          border-radius: 6px;
          cursor: pointer;
          color: ${theme === 'dark' ? '#e2e8f0' : '#333'};
          transition: all 0.2s;
        }
        .folder-item:hover {
          background: ${theme === 'dark' ? '#303030' : '#e8e8e8'};
        }
        .folder-item.selected {
          background: ${theme === 'dark' ? '#4096ff' : '#e6f4ff'};
          color: ${theme === 'dark' ? '#fff' : '#1677ff'};
        }
        .folder-item.all-notes {
          font-weight: 500;
        }
        .folder-name {
          flex: 1;
          margin-left: 8px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .folder-actions {
          display: none;
          gap: 4px;
        }
        .folder-item:hover .folder-actions {
          display: flex;
        }
      `}</style>
    </div>
  );
};
