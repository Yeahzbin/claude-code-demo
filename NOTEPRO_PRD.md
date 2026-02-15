# 高级笔记应用 PRD 文档

## 1. 产品概述

### 1.1 产品名称
**NotePro** - 高级智能笔记应用

### 1.2 产品定位
一款兼具美观与高效的桌面笔记应用，专注于提供流畅的笔记创作、管理和导出体验。

### 1.3 核心价值
- **强大**：丰富的编辑功能，支持 Markdown、代码高亮、数学公式
- **美观**：现代化 UI 设计，简洁优雅的界面
- **简易**：直观易上手，学习成本低
- **高效**：快速记录、检索和管理笔记

---

## 2. 目标用户

| 用户群体 | 使用场景 |
|---------|---------|
| 学生 | 课堂笔记、学习资料整理、考试复习 |
| 职场人士 | 会议记录、工作笔记、项目文档 |
| 创作者 | 写作灵感、内容大纲、素材收集 |
| 开发者 | 技术文档、代码笔记、API 记录 |
| 研究人员 | 科研笔记、文献整理、数据记录 |

---

## 3. 功能需求

### 3.1 笔记管理

#### 3.1.1 笔记组织
- **文件夹层级**：支持多级文件夹创建、嵌套
- **笔记本**：支持创建多个笔记本（类似 Notion 的概念）
- **标签系统**：支持多标签分类，支持标签颜色自定义
- **收藏/置顶**：支持收藏重要笔记，置顶显示

#### 3.1.2 笔记操作
- **创建笔记**：支持新建空白笔记或从模板创建
- **编辑笔记**：富文本编辑 + Markdown 双模式
- **删除笔记**：支持删除到回收站，可恢复
- **搜索**：全文搜索、标题搜索、标签筛选
- **排序**：按创建时间、修改时间、标题排序

### 3.2 笔记编辑

#### 3.2.1 基础编辑功能
- 字体格式：加粗、斜体、下划线、删除线
- 标题层级：H1-H6
- 列表：有序列表、无序列表、任务列表
- 引用块
- 分割线
- 撤销/重做

#### 3.2.2 高级编辑功能
- **Markdown 模式**：实时预览，支持快捷键
- **代码高亮**：支持 100+ 编程语言
- **数学公式**：LaTeX 公式渲染
- **表格**：可视化表格编辑
- **图片**：支持本地图片插入、粘贴
- **链接**：超链接和内部笔记链接
- **附件**：支持添加文件附件

#### 3.2.3 编辑增强
- **自动保存**：每 30 秒自动保存
- **版本历史**：记录修改历史，支持回滚
- **字数统计**：实时显示字数、字符数
- **专注模式**：全屏写作，隐藏干扰

### 3.3 导出功能

#### 3.3.1 导出格式
| 格式 | 说明 |
|-----|------|
| **PDF** | 高质量 PDF 文档，支持自定义页眉页脚 |
| **Excel** | 结构化数据导出，适合表格类笔记 |
| **Word (.docx)** | 兼容 Microsoft Word |
| **Markdown (.md)** | 纯 Markdown 源码 |
| **HTML** | 网页格式 |
| **JSON** | 数据备份格式 |
| **Txt** | 纯文本格式 |

#### 3.3.2 批量导出
- 导出整个笔记本
- 导出选中笔记
- 导出到指定文件夹
- 导出设置：编码选择、命名规则

### 3.4 导入功能

#### 3.4.1 支持导入格式
- Markdown 文件 (.md)
- Word 文档 (.docx)
- PDF 文档 (.pdf)
- 纯文本 (.txt)
- HTML 文件 (.html)
- Notion 导出文件
- Evernote 导出文件 (.enex)

### 3.5 系统功能

#### 3.5.1 外观主题
- **浅色模式**：明亮清爽
- **深色模式**：护眼夜间模式
- **跟随系统**：自动跟随操作系统主题
- **自定义主题**：用户可选的预置主题色

#### 3.5.2 快捷键
- 全局快捷键：快速调出应用
- 编辑快捷键：常用编辑操作
- 导航快捷键：快速切换笔记

#### 3.5.3 数据同步与备份
- 本地数据库存储（SQLite）
- 手动备份/恢复
- 自动云同步（可选功能）

#### 3.5.4 其他
- 夜间模式
- 启动时自动打开上次笔记
- 锁屏密码保护

---

## 4. 非功能需求

### 4.1 性能要求
- 应用启动时间 < 3 秒
- 笔记打开时间 < 500ms
- 搜索响应时间 < 200ms（1000 条笔记内）
- 导出 PDF/Excel 时间 < 5 秒（普通笔记）

### 4.2 兼容性要求
- **Windows**：Windows 10 及以上
- **macOS**：macOS 10.15 (Catalina) 及以上
- **Linux**：Ubuntu 20.04 及以上

### 4.3 数据安全
- 本地数据加密存储
- 敏感数据可选加密
- 回收站自动清理（30 天）

### 4.4 可访问性
- 键盘导航支持
- 屏幕阅读器兼容
- 高对比度模式支持

---

## 5. 技术架构建议（单体应用版）

### 5.1 技术选型

| 层级 | 推荐技术 |
|-----|---------|
| **框架** | Electron 或 Tauri |
| **前端** | React + TypeScript |
| **状态管理** | Zustand 或 Redux Toolkit |
| **编辑器** | TipTap / Monaco Editor |
| **本地存储** | SQLite (better-sqlite3) |
| **PDF 导出** | pdfmake / jspdf |
| **Excel 导出** | exceljs / xlsx |
| **UI 组件** | Tailwind CSS + Radix UI |

### 5.2 数据模型

```
Note (笔记)
├── id: string
├── title: string
├── content: string (Markdown/JSON)
├── folderId: string
├── notebookId: string
├── tags: string[]
├── isFavorite: boolean
├── isPinned: boolean
├── createdAt: datetime
├── updatedAt: datetime

Folder (文件夹)
├── id: string
├── name: string
├── parentId: string | null
├── color: string
├── createdAt: datetime

Notebook (笔记本)
├── id: string
├── name: string
├── color: string
├── createdAt: datetime

Tag (标签)
├── id: string
├── name: string
├── color: string
```

---

## 5.3 技术架构（云端版 - 前后端分离）

### 5.3.1 架构概述

采用前后端分离的 Web 应用架构，支持多端同步访问。

```
+-------------------------------------------------------------+
|                         客户端层                             |
|  +-------------+  +-------------+  +-------------+         |
|  |  Web 端     |  |  Desktop    |  |  Mobile     |         |
|  |  (React)    |  |  (Electron) |  |  (React)    |         |
|  +-------------+  +-------------+  +-------------+         |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
|                         API 网关层                           |
|                    (Nginx / Cloudflare)                     |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
|                       应用服务层                             |
|  +-----------------------------------------------------+   |
|  |              RESTful API (Node.js/Express)          |   |
|  +-----------------------------------------------------+   |
|  +-----------------------------------------------------+   |
|  |              WebSocket Server (实时同步)            |   |
|  +-----------------------------------------------------+   |
+-------------------------------------------------------------+
                              |
                              v
+-------------------------------------------------------------+
|                        数据存储层                            |
|  +-------------+  +-------------+  +-------------+         |
|  |  MongoDB    |  |   Redis     |  |   MinIO     |         |
|  |  (主数据库)  |  |  (缓存/会话) |  |  (文件存储)  |         |
|  +-------------+  +-------------+  +-------------+         |
+-------------------------------------------------------------+
```

### 5.3.2 技术选型

| 层级 | 技术 | 说明 |
|-----|------|-----|
| **前端框架** | React + TypeScript | 跨平台客户端开发 |
| **状态管理** | Zustand / TanStack Query | 状态管理与数据获取 |
| **编辑器** | TipTap | 现代化富文本编辑器 |
| **后端运行时** | Node.js + Express | API 服务 |
| **WebSocket** | Socket.io | 实时双向通信 |
| **主数据库** | MongoDB | 文档型数据库，适合笔记结构 |
| **缓存** | Redis | 会话存储、实时缓存 |
| **对象存储** | MinIO / S3 | 图片、附件存储 |
| **认证** | JWT | 无状态身份认证 |
| **部署** | Docker + Kubernetes | 容器化部署 |

### 5.3.3 目录结构

```
notepro/
├── client/                    # 前端应用
│   ├── src/
│   │   ├── components/        # UI 组件
│   │   ├── pages/             # 页面组件
│   │   ├── hooks/             # 自定义 Hooks
│   │   ├── services/          # API 服务
│   │   ├── stores/             # 状态管理
│   │   └── utils/              # 工具函数
│   └── package.json
│
├── server/                    # 后端服务
│   ├── src/
│   │   ├── controllers/       # 控制器
│   │   ├── models/             # MongoDB 模型
│   │   ├── routes/             # 路由定义
│   │   ├── middleware/         # 中间件
│   │   ├── services/           # 业务逻辑
│   │   ├── utils/              # 工具函数
│   │   └── index.js            # 入口文件
│   └── package.json
│
└── docker-compose.yml         # 本地开发配置
```

---

## 5.4 MongoDB 数据库设计

### 5.4.1 数据库概览

| 集合名称 | 说明 | 预估文档数 |
|---------|------|-----------|
| users | 用户账户信息 | 10,000+ |
| notes | 笔记内容 | 1,000,000+ |
| folders | 文件夹层级 | 100,000+ |
| notebooks | 笔记本 | 50,000+ |
| tags | 标签 | 50,000+ |
| attachments | 附件元数据 | 500,000+ |
| versions | 笔记版本历史 | 2,000,000+ |
| sessions | 会话管理 | 20,000+ |

### 5.4.2 集合详细设计

#### 5.4.2.1 users（用户集合）

```javascript
{
  // 用户账户
  _id: ObjectId,                    // 主键
  email: String,                    // 邮箱（唯一索引）
  username: String,                 // 用户名
  passwordHash: String,            // 密码哈希
  avatar: String,                   // 头像 URL
  settings: {
    theme: String,                  // 主题: light/dark/system
    language: String,              // 语言: zh-CN/en
    editorMode: String,            // 编辑器模式: rich/markdown
    autoSaveInterval: Number,      // 自动保存间隔（毫秒）
    defaultNotebook: ObjectId,     // 默认笔记本
  },
  subscription: {
    plan: String,                   // 订阅计划: free/pro/team
    expiresAt: Date,               // 到期时间
    storageUsed: Number,           // 已用存储（字节）
    storageLimit: Number,          // 存储上限（字节）
  },
  stats: {
    totalNotes: Number,            // 笔记总数
    totalFolders: Number,          // 文件夹总数
    lastActiveAt: Date,           // 最后活跃时间
  },
  createdAt: Date,                  // 创建时间
  updatedAt: Date,                  // 更新时间
}
```

**索引设计：**
- `email`: 唯一索引
- `username`: 唯一索引
- `createdAt`: 普通索引

#### 5.4.2.2 notes（笔记集合）

```javascript
{
  // 笔记内容
  _id: ObjectId,                    // 主键
  userId: ObjectId,                 // 所属用户（索引）
  title: String,                    // 标题
  content: String,                  // 内容（Markdown 或 JSON）
  contentType: String,             // 内容类型: markdown/json/html
  folderId: ObjectId,              // 所属文件夹
  notebookId: ObjectId,            // 所属笔记本
  tags: [ObjectId],                 // 关联标签 ID 数组
  isFavorite: Boolean,             // 是否收藏
  isPinned: Boolean,               // 是否置顶
  isDeleted: Boolean,              // 软删除标志
  deletedAt: Date,                 // 删除时间（回收站用）
  wordCount: Number,                // 字数统计
  metadata: {
    source: String,                 // 来源: web/desktop/mobile
    ipAddress: String,             // 创建 IP
    deviceInfo: String,            // 设备信息
  },
  syncInfo: {
    version: Number,               // 版本号（乐观锁）
    lastSyncedAt: Date,            // 最后同步时间
    syncToken: String,             // 同步令牌
  },
  createdAt: Date,                  // 创建时间
  updatedAt: Date,                  // 更新时间
}
```

**索引设计：**
- `userId`: 索引
- `userId + isDeleted`: 复合索引（查询用户有效笔记）
- `userId + folderId`: 复合索引（查询文件夹内笔记）
- `userId + notebookId`: 复合索引（查询笔记本内笔记）
- `userId + isPinned`: 复合索引（置顶笔记）
- `userId + updatedAt`: 复合索引（按时间排序）
- `title`: 全文索引（搜索）
- `content`: 全文索引（搜索）

#### 5.4.2.3 folders（文件夹集合）

```javascript
{
  // 文件夹
  _id: ObjectId,                    // 主键
  userId: ObjectId,                // 所属用户
  name: String,                    // 文件夹名称
  parentId: ObjectId,              // 父文件夹 ID（null 为根目录）
  notebookId: ObjectId,           // 所属笔记本
  color: String,                  // 颜色（十六进制）
  icon: String,                   // 图标 emoji
  sortOrder: Number,              // 排序顺序
  isExpanded: Boolean,            // 前端展开状态
  noteCount: Number,              // 笔记数量（缓存）
  createdAt: Date,                // 创建时间
  updatedAt: Date,                // 更新时间
}
```

**索引设计：**
- `userId`: 索引
- `userId + parentId`: 复合索引（查询子文件夹）
- `userId + notebookId`: 复合索引

#### 5.4.2.4 notebooks（笔记本集合）

```javascript
{
  // 笔记本
  _id: ObjectId,                    // 主键
  userId: ObjectId,                 // 所属用户
  name: String,                     // 笔记本名称
  description: String,              // 描述
  color: String,                    // 颜色
  icon: String,                     // 图标
  coverImage: String,               // 封面图 URL
  sortOrder: Number,                // 排序顺序
  isDefault: Boolean,              // 是否默认笔记本
  noteCount: Number,               // 笔记数量（缓存）
  createdAt: Date,                 // 创建时间
  updatedAt: Date,                 // 更新时间
}
```

**索引设计：**
- `userId`: 索引
- `userId + sortOrder`: 复合索引

#### 5.4.2.5 tags（标签集合）

```javascript
{
  // 标签
  _id: ObjectId,                    // 主键
  userId: ObjectId,                 // 所属用户
  name: String,                     // 标签名称
  color: String,                    // 颜色
  noteCount: Number,                // 使用此标签的笔记数（缓存）
  createdAt: Date,                 // 创建时间
  updatedAt: Date,                 // 更新时间
}
```

**索引设计：**
- `userId`: 索引
- `userId + name`: 唯一复合索引

#### 5.4.2.6 attachments（附件集合）

```javascript
{
  // 附件元数据
  _id: ObjectId,                    // 主键
  userId: ObjectId,                 // 所属用户
  noteId: ObjectId,                // 关联笔记
  fileName: String,                 // 文件名
  fileType: String,                // MIME 类型
  fileSize: Number,                // 文件大小（字节）
  storageKey: String,              // 对象存储键
  thumbnailUrl: String,            // 缩略图 URL（图片）
  width: Number,                   // 图片宽度
  height: Number,                  // 图片高度
  uploadStatus: String,            // 上传状态: pending/completed/failed
  createdAt: Date,                // 创建时间
}
```

**索引设计：**
- `userId`: 索引
- `noteId`: 索引

#### 5.4.2.7 versions（版本历史集合）

```javascript
{
  // 笔记版本历史
  _id: ObjectId,                    // 主键
  noteId: ObjectId,                // 关联笔记
  userId: ObjectId,                // 所属用户
  version: Number,                  // 版本号
  title: String,                    // 标题快照
  content: String,                  // 内容快照
  changeSummary: String,            // 变更摘要
  createdAt: Date,                 // 创建时间
}
```

**索引设计：**
- `noteId + version`: 唯一复合索引
- `createdAt`: 索引（用于查询最近版本）

### 5.4.3 分片策略

建议按 `userId` 进行分片，确保用户数据在同一分片，提升查询性能。

```javascript
sh.shardCollection("notepro.notes", { userId: 1 })
sh.shardCollection("notepro.folders", { userId: 1 })
sh.shardCollection("notepro.versions", { userId: 1 })
```

---

## 5.5 API 接口设计概要

### 5.5.1 API 基础信息

| 项目 | 说明 |
|-----|------|
| 基础 URL | `/api/v1` |
| 认证方式 | Bearer Token (JWT) |
| 数据格式 | JSON |
| 字符编码 | UTF-8 |

### 5.5.2 接口列表

#### 5.5.2.1 认证模块

| 方法 | 路径 | 说明 |
|-----|------|-----|
| POST | `/auth/register` | 用户注册 |
| POST | `/auth/login` | 用户登录 |
| POST | `/auth/logout` | 登出 |
| POST | `/auth/refresh` | 刷新 Token |
| POST | `/auth/forgot-password` | 忘记密码 |
| POST | `/auth/reset-password` | 重置密码 |
| GET | `/auth/me` | 获取当前用户信息 |

#### 5.5.2.2 笔记模块

| 方法 | 路径 | 说明 |
|-----|------|-----|
| GET | `/notes` | 获取笔记列表 |
| GET | `/notes/:id` | 获取笔记详情 |
| POST | `/notes` | 创建笔记 |
| PUT | `/notes/:id` | 更新笔记 |
| DELETE | `/notes/:id` | 删除笔记（软删除） |
| POST | `/notes/:id/restore` | 恢复笔记 |
| DELETE | `/notes/:id/permanent` | 永久删除 |
| GET | `/notes/:id/versions` | 获取版本历史 |
| POST | `/notes/:id/versions/:versionId/restore` | 恢复版本 |
| GET | `/notes/search` | 搜索笔记 |

#### 5.5.2.3 文件夹模块

| 方法 | 路径 | 说明 |
|-----|------|-----|
| GET | `/folders` | 获取文件夹树 |
| GET | `/folders/:id` | 获取文件夹详情 |
| POST | `/folders` | 创建文件夹 |
| PUT | `/folders/:id` | 更新文件夹 |
| DELETE | `/folders/:id` | 删除文件夹 |
| PUT | `/folders/reorder` | 批量排序 |

#### 5.5.2.4 笔记本模块

| 方法 | 路径 | 说明 |
|-----|------|-----|
| GET | `/notebooks` | 获取笔记本列表 |
| GET | `/notebooks/:id` | 获取笔记本详情 |
| POST | `/notebooks` | 创建笔记本 |
| PUT | `/notebooks/:id` | 更新笔记本 |
| DELETE | `/notebooks/:id` | 删除笔记本 |

#### 5.5.2.5 标签模块

| 方法 | 路径 | 说明 |
|-----|------|-----|
| GET | `/tags` | 获取标签列表 |
| POST | `/tags` | 创建标签 |
| PUT | `/tags/:id` | 更新标签 |
| DELETE | `/tags/:id` | 删除标签 |

#### 5.5.2.6 附件模块

| 方法 | 路径 | 说明 |
|-----|------|-----|
| POST | `/attachments/upload` | 上传附件 |
| DELETE | `/attachments/:id` | 删除附件 |
| GET | `/attachments/:id/download` | 下载附件 |

#### 5.5.2.7 同步模块

| 方法 | 路径 | 说明 |
|-----|------|-----|
| GET | `/sync/changes` | 获取变更列表 |
| POST | `/sync/push` | 推送本地变更 |
| GET | `/sync/status` | 获取同步状态 |

### 5.5.3 响应格式

**成功响应：**
```json
{
  "success": true,
  "data": { },
  "meta": {
    "timestamp": "2026-02-15T10:30:00Z",
    "requestId": "req_abc123"
  }
}
```

**分页响应：**
```json
{
  "success": true,
  "data": [ ],
  "meta": {
    "timestamp": "2026-02-15T10:30:00Z",
    "pagination": {
      "page": 1,
      "pageSize": 20,
      "total": 100,
      "hasMore": true
    }
  }
}
```

**错误响应：**
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "请求参数验证失败",
    "details": [
      { "field": "email", "message": "邮箱格式不正确" }
    ]
  },
  "meta": {
    "timestamp": "2026-02-15T10:30:00Z",
    "requestId": "req_abc123"
  }
}
```

---

## 5.6 数据同步方案

### 5.6.1 同步策略

采用 **CRDT (Conflict-free Replicated Data Types)** 结合 **乐观锁** 的混合方案，支持多端同时编辑。

```
+-------------------------------------------------------------+
|                      同步架构图                              |
+-------------------------------------------------------------+
|                                                             |
|   客户端 A          客户端 B          客户端 C              |
|  +--------+       +--------+       +--------+            |
|  | Web    |       |Desktop |       |Mobile  |            |
|  +----+---+       +----+---+       +----+---+            |
|       |                |                |                  |
|       +----------------+----------------+                  |
|                        v                                    |
|              +-----------------+                            |
|              |  WebSocket      |                            |
|              |  实时推送       |                            |
|              +--------+--------+                            |
|                       |                                     |
|         +-------------+-------------+                       |
|         v             v             v                       |
|   +----------+  +----------+  +----------+                |
|   | 增量同步  |  | 全量同步  |  | 冲突处理  |                |
|   +----------+  +----------+  +----------+                |
|                        |                                    |
|                        v                                    |
|              +-----------------+                            |
|              |   MongoDB       |                            |
|              |   主数据库      |                            |
|              +-----------------+                            |
+-------------------------------------------------------------+
```

### 5.6.2 同步模式

#### 5.6.2.1 实时同步（在线模式）
- 使用 WebSocket 长连接
- 笔记编辑后立即推送到服务器
- 服务器广播到其他在线客户端
- 延迟 < 100ms

#### 5.6.2.2 增量同步（离线模式）
- 记录本地变更日志（Change Log）
- 重新上线时对比 syncToken
- 拉取服务器端增量变更
- 上传本地未同步的变更

#### 5.6.2.3 强制同步（冲突解决）
- 当本地版本与服务器版本冲突时
- 保留双方版本，创建冲突副本
- 提示用户手动选择保留版本

### 5.6.3 同步数据结构

```javascript
// 变更记录
{
  _id: ObjectId,
  userId: ObjectId,
  entityType: String,         // note/folder/notebook/tag
  entityId: ObjectId,
  operation: String,          // create/update/delete
  version: Number,            // 乐观锁版本号
  data: {
    before: Object,           // 变更前数据
    after: Object,            // 变更后数据
  },
  timestamp: Date,            // 变更时间戳
  clientId: String,           // 客户端标识
  synced: Boolean,           // 是否已同步
}

// 同步令牌
{
  userId: ObjectId,
  token: String,              // 同步令牌（base64 编码）
  timestamp: Date,            // 令牌更新时间
  entityVersions: {
    notes: Map<noteId, version>,
    folders: Map<folderId, version>,
  }
}
```

### 5.6.4 同步流程

```
1. 应用启动
   |
   v
2. 检查网络状态
   |
   +-- 在线 --> 3a. 建立 WebSocket 连接
   |             |
   |             v
   |         4a. 获取上次同步时间戳
   |             |
   |             v
   |         5a. 拉取增量变更（/sync/changes）
   |             |
   |             v
   |         6a. 应用变更到本地
   |             |
   |             v
   |         7a. 上传本地未同步变更
   |
   +-- 离线 --> 3b. 加载本地缓存
                  |
                  v
              4b. 记录变更到本地日志
                  |
                  v
              5b. 等待网络恢复
```

### 5.6.5 冲突解决策略

| 冲突类型 | 解决策略 |
|---------|---------|
| 标题修改 | 保留最新修改 |
| 内容修改（不同字段） | 合并变更 |
| 内容修改（同一字段） | 保留最新，提示用户 |
| 同时删除 | 确认为已删除 |
| 删除 vs 修改 | 保留删除，通知用户 |

### 5.6.6 同步性能优化

- **压缩传输**：gzip 压缩 API 响应
- **增量更新**：仅传输变更字段
- **批量操作**：合并多个小请求
- **CDN 加速**：静态资源使用 CDN
- **本地缓存**：优先读取本地缓存，后台同步

---

## 5.7 安全性设计

### 5.7.1 认证与授权

- JWT Access Token（15分钟有效期）
- Refresh Token（7天有效期，HttpOnly Cookie）
- 密码 bcrypt 加密（salt rounds: 12）
- 失败登录锁定（5次后锁定15分钟）

### 5.7.2 数据安全

- HTTPS 全链路加密
- 数据库敏感字段加密
- 附件存储使用 SSE 加密
- API 频率限制（100次/分钟）

### 5.7.3 隐私保护

- 符合 GDPR 规范
- 数据导出/删除功能
- 匿名化日志记录

---

## 5.8 部署架构

```yaml
# docker-compose.yml
version: '3.8'

services:
  # 前端
  client:
    image: notepro/client:latest
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://api:3000
      - REACT_APP_WS_URL=ws://api:3000

  # 后端 API
  api:
    image: notepro/api:latest
    ports:
      - "3000:3000"
    environment:
      - MONGODB_URI=mongodb://mongo:27017/notepro
      - REDIS_URL=redis://redis:6379
      - JWT_SECRET=${JWT_SECRET}
      - MINIO_ENDPOINT=minio:9000
    depends_on:
      - mongo
      - redis
      - minio

  # MongoDB
  mongo:
    image: mongo:7.0
    volumes:
      - mongo_data:/data/db
    command: --replSet rs0

  # Redis
  redis:
    image: redis:7-alpine

  # MinIO 对象存储
  minio:
    image: minio/minio
    command: server /data --console-address ":9001"
    volumes:
      - minio_data:/data
    environment:
      - MINIO_ROOT_USER=${MINIO_USER}
      - MINIO_ROOT_PASSWORD=${MINIO_PASSWORD}

  # Nginx 反向代理
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf:ro
    depends_on:
      - client
      - api

volumes:
  mongo_data:
  minio_data:
```

---

## 6. UI/UX 设计方向

### 6.1 整体风格
- **现代极简**：大量留白，视觉干净
- **卡片式设计**：笔记以卡片形式展示
- **圆角设计**：柔和的圆角视觉
- **微交互**：平滑的动画反馈

### 6.2 色彩方案

| 用途 | 浅色模式 | 深色模式 |
|-----|---------|---------|
| 主色 | #2563EB (蓝色) | #3B82F6 |
| 背景 | #FFFFFF | #1E1E1E |
| 侧边栏 | #F8FAFC | #252526 |
| 文字 | #1E293B | #E2E8F0 |
| 边框 | #E2E8F0 | #3C3C3C |

### 6.3 布局结构

```
┌─────────────────────────────────────────────────────┐
│  标题栏 (可选隐藏)                          [_][□][X] │
├────────┬────────────────────────────────────────────┤
│        │  工具栏 (搜索、新建、导出、设置)            │
│  侧    ├────────────────────────────────────────────┤
│  边    │                                            │
│  栏    │            笔记列表 / 编辑区                │
│        │                                            │
│ 文件夹  │  ┌─────────┐ ┌─────────┐ ┌─────────┐       │
│ 笔记本  │  │  笔记   │ │  笔记   │ │  笔记   │       │
│ 标签   │  │  卡片   │ │  卡片   │ │  卡片   │       │
│        │  └─────────┘ └─────────┘ └─────────┘       │
│        │                                            │
└────────┴────────────────────────────────────────────┘
```

---

## 7. 版本规划

### 7.1 MVP (最小可行产品)
- 笔记创建、编辑、删除
- 文件夹管理
- 基础富文本编辑
- PDF 导出
- 本地存储

### 7.2 V1.0
- Excel 导出
- 标签系统
- 搜索功能
- 夜间模式

### 7.3 V1.1
- Markdown 模式
- 代码高亮
- 批量导出
- 导入功能

### 7.4 V1.2 (未来)
- 云同步
- 版本历史
- 模板系统
- 插件系统

---

## 8. 竞品分析

| 竞品 | 优势 | 不足 |
|-----|-----|-----|
| **Notion** | 功能强大、生态丰富 | 需要网络、隐私顾虑 |
| **Obsidian** | Markdown 强、插件生态 | 学习曲线较陡 |
| **印象笔记** | 国民度高、同步稳定 | 付费功能多、广告 |
| **有道云笔记** | 国内生态好 | 功能中规中矩 |

### 8.1 差异化定位
- **本地优先**：强调数据隐私和离线使用
- **轻量高效**：不追求大而全，专注核心体验
- **导出强大**：差异化导出功能，满足特定场景需求

---

## 9. 成功指标

| 指标 | 目标 |
|-----|-----|
| 日活跃用户 | 10,000+ |
| 笔记创建量 | 100,000+/天 |
| 导出功能使用率 | 20%+ |
| 用户满意度 | 4.5/5 星 |
| 应用评分 | 4.7+ |

---

## 10. 风险与挑战

1. **PDF/Excel 导出兼容性**：需要处理各种复杂格式
2. **编辑器性能**：大量内容时的渲染性能
3. **数据迁移**：用户从其他笔记应用迁移
4. **跨平台一致性**：多平台体验一致性

---

*文档版本：V2.0*
*最后更新：2026-02-15*
