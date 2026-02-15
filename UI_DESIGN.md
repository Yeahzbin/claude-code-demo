# NotePro UI 设计规范

## 1. 品牌规范

### 1.1 Logo 设计

- **图形元素**：简洁的笔记本/便签图形，象征知识的积累与整理
- **文字元素**：NotePro，使用无衬线字体
- **使用场景**：
  - App 图标：48x48px / 128x128px / 256x256px
  - 网页图标：16x16px / 32x32px
  - 品牌标识：全彩版、单色版（黑/白）

### 1.2 配色方案

#### 浅色主题 (Light Mode)

| 用途 | 颜色名称 | 色值 | 使用场景 |
|------|----------|------|----------|
| 主色 | Primary Blue | `#1677ff` | 主要按钮、链接、图标 |
| 主色悬停 | Primary Hover | `#4096ff` | 按钮悬停状态 |
| 主色激活 | Primary Active | `#0050b3` | 按钮激活状态 |
| 主色浅色 | Primary Light | `#e6f4ff` | 背景、标签 |
| 辅助色 | Accent | `#3b82f6` | 次要交互元素 |
| 成功 | Success | `#22c55e` | 成功状态、确认 |
| 警告 | Warning | `#f59e0b` | 警告状态 |
| 错误 | Error | `#ef4444` | 错误状态、删除 |
| 背景色 | Background | `#ffffff` | 页面主背景 |
| 卡片背景 | Card BG | `#fafafa` | 卡片、面板背景 |
| 侧边栏背景 | Sidebar BG | `#f7f7f7` | 侧边栏背景 |
| 边框色 | Border | `#e5e5e5` | 分割线、边框 |
| 文字主色 | Text Primary | `#1a1a1a` | 标题、重要文字 |
| 文字次色 | Text Secondary | `#6b7280` | 描述、次要信息 |
| 文字禁用 | Text Disabled | `#d1d5db` | 禁用状态文字 |

#### 深色主题 (Dark Mode)

| 用途 | 颜色名称 | 色值 | 使用场景 |
|------|----------|------|----------|
| 主色 | Primary Blue | `#3b82f6` | 主要按钮、链接、图标 |
| 主色悬停 | Primary Hover | `#60a5fa` | 按钮悬停状态 |
| 主色激活 | Primary Active | `#2563eb` | 按钮激活状态 |
| 主色浅色 | Primary Light | `#1e3a5f` | 背景、标签 |
| 辅助色 | Accent | `#60a5fa` | 次要交互元素 |
| 成功 | Success | `#4ade80` | 成功状态、确认 |
| 警告 | Warning | `#fbbf24` | 警告状态 |
| 错误 | Error | `#f87171` | 错误状态、删除 |
| 背景色 | Background | `#0f0f0f` | 页面主背景 |
| 卡片背景 | Card BG | `#1a1a1a` | 卡片、面板背景 |
| 侧边栏背景 | Sidebar BG | `#141414` | 侧边栏背景 |
| 边框色 | Border | `#2d2d2d` | 分割线、边框 |
| 文字主色 | Text Primary | `#f5f5f5` | 标题、重要文字 |
| 文字次色 | Text Secondary | `#9ca3af` | 描述、次要信息 |
| 文字禁用 | Text Disabled | `#4b5563` | 禁用状态文字 |

### 1.3 字体规范

| 用途 | 字体 | 字重 | 字号 | 行高 |
|------|------|------|------|------|
| 大标题 | System UI / -apple-system / Segoe UI | 700 (Bold) | 28px (1.75rem) | 1.3 |
| 页面标题 | System UI / -apple-system / Segoe UI | 600 (Semibold) | 24px (1.5rem) | 1.3 |
| 章节标题 | System UI / -apple-system / Segoe UI | 600 (Semibold) | 20px (1.25rem) | 1.4 |
| 卡片标题 | System UI / -apple-system / Segoe UI | 600 (Semibold) | 16px (1rem) | 1.4 |
| 正文 | System UI / -apple-system / Segoe UI | 400 (Regular) | 14px (0.875rem) | 1.6 |
| 小字/描述 | System UI / -apple-system / Segoe UI | 400 (Regular) | 12px (0.75rem) | 1.5 |
| 按钮文字 | System UI / -apple-system / Segoe UI | 500 (Medium) | 14px (0.875rem) | 1 |

### 1.4 图标规范

- **图标风格**：线性图标，1.5px 或 2px 描边
- **图标尺寸**：
  - 小图标：16x16px（工具栏、紧凑布局）
  - 中图标：20x20px（侧边栏、菜单）
  - 大图标：24x24px（主要操作、导航）
- **图标颜色**：跟随文字颜色（Text Primary / Text Secondary）

---

## 2. 间距和尺寸系统

### 2.1 8px 网格系统

| 命名 | 数值 | 使用场景 |
|------|------|----------|
| xs | 4px | 标签内边距、紧凑间距 |
| sm | 8px | 组件内部间距、图标与文字 |
| md | 16px | 组件间距、卡片内边距 |
| lg | 24px | 卡片之间、区域间距 |
| xl | 32px | 大区块间距 |
| 2xl | 48px | 页面边距、大间距 |
| 3xl | 64px | 页面最大间距 |

### 2.2 组件尺寸

| 组件 | 属性 | 值 |
|------|------|-----|
| 按钮 - 大 | 高度 | 40px |
| 按钮 - 中 | 高度 | 36px |
| 按钮 - 小 | 高度 | 32px |
| 输入框 | 高度 | 40px |
| 卡片 | 最小宽度 | 280px |
| 侧边栏 | 宽度 | 240px (收起: 64px) |
| 弹窗 | 最大宽度 | 480px / 560px |
| 标签 | 高度 | 24px |

### 2.3 圆角规范

| 用途 | 圆角值 |
|------|--------|
| 小组件（按钮、输入框、标签） | 6px |
| 卡片 | 8px |
| 弹窗 | 12px |
| 大卡片/面板 | 16px |
| 头像 | 50% (圆形) |

---

## 3. 组件设计规范

### 3.1 按钮 (Button)

#### 主按钮 (Primary Button)
```
背景色: #1677ff (浅色) / #3b82f6 (深色)
文字色: #ffffff
圆角: 6px
过渡: all 200ms ease
```

**状态：**
- Default: 背景 #1677ff
- Hover: 背景 #4096ff，transform: translateY(-1px)
- Active: 背景 #0050b3，transform: translateY(0)
- Disabled: 背景 #d1d5db，cursor: not-allowed

#### 次按钮 (Secondary Button)
```
背景色: transparent
边框: 1px solid #e5e5e5 (浅色) / #2d2d2d (深色)
文字色: #1a1a1a (浅色) / #f5f5f5 (深色)
圆角: 6px
```

#### 文字按钮 (Text Button)
```
背景色: transparent
文字色: #1677ff (浅色) / #3b82f6 (深色)
圆角: 6px
```

#### 危险按钮 (Danger Button)
```
背景色: #ef4444 (浅色) / #f87171 (深色)
文字色: #ffffff
圆角: 6px
```

### 3.2 卡片 (Card)

```css
/* 浅色主题 */
background: #fafafa;
border: 1px solid #e5e5e5;
border-radius: 8px;
padding: 16px;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.08);

/* 深色主题 */
background: #1a1a1a;
border: 1px solid #2d2d2d;
border-radius: 8px;
padding: 16px;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
```

**卡片悬停效果：**
- 轻微上移: transform: translateY(-2px)
- 阴影增强: box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1)
- 过渡时间: 200ms ease

### 3.3 输入框 (Input)

```css
/* 浅色主题 */
background: #ffffff;
border: 1px solid #e5e5e5;
border-radius: 6px;
height: 40px;
padding: 0 12px;
color: #1a1a1a;

/* 深色主题 */
background: #1a1a1a;
border: 1px solid #2d2d2d;
border-radius: 6px;
height: 40px;
padding: 0 12px;
color: #f5f5f5;
```

**状态：**
- Focus: 边框色 #1677ff / #3b82f6，box-shadow: 0 0 0 2px rgba(22, 119, 255, 0.2)
- Error: 边框色 #ef4444 / #f87171
- Disabled: 背景 #f5f5f5 / #141414，cursor: not-allowed

### 3.4 弹窗 (Modal)

```css
/* 浅色主题 */
background: #ffffff;
border-radius: 12px;
padding: 24px;
box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);

/* 深色主题 */
background: #1a1a1a;
border-radius: 12px;
padding: 24px;
box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
```

**弹窗结构：**
- 遮罩层: background: rgba(0, 0, 0, 0.5)，backdrop-filter: blur(4px)
- 关闭按钮: 右上角，24x24px 图标
- 标题区: 20px 字体，600 字重
- 内容区: 14px 字体
- 按钮区: 右对齐，底部 16px 间距

### 3.5 侧边栏 (Sidebar)

```css
/* 浅色主题 */
background: #f7f7f7;
border-right: 1px solid #e5e5e5;
width: 240px;
transition: width 200ms ease;

/* 深色主题 */
background: #141414;
border-right: 1px solid #2d2d2d;
width: 240px;
transition: width 200ms ease;
```

**收起状态：**
- 宽度: 64px
- 图标居中显示
- 隐藏文字标签

### 3.6 标签 (Tag)

```css
/* 浅色主题 */
background: #e6f4ff;
color: #1677ff;
border-radius: 4px;
padding: 2px 8px;
font-size: 12px;

/* 深色主题 */
background: #1e3a5f;
color: #60a5fa;
border-radius: 4px;
padding: 2px 8px;
font-size: 12px;
```

### 3.7 下拉菜单 (Dropdown)

```css
/* 浅色主题 */
background: #ffffff;
border: 1px solid #e5e5e5;
border-radius: 8px;
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
padding: 4px;

/* 深色主题 */
background: #1a1a1a;
border: 1px solid #2d2d2d;
border-radius: 8px;
box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
padding: 4px;
```

**菜单项：**
- 高度: 36px
- 圆角: 4px
- Hover: background #f5f5f5 / #2d2d2d

---

## 4. 动效和过渡动画规范

### 4.1 过渡时间

| 动画类型 | 时长 | 缓动函数 |
|----------|------|----------|
| 快速过渡 | 150ms | ease |
| 标准过渡 | 200ms | ease |
| 慢速过渡 | 300ms | ease |
| 弹跳效果 | 400ms | cubic-bezier(0.68, -0.55, 0.265, 1.55) |

### 4.2 组件过渡

```css
/* 按钮悬停 */
transition: all 200ms ease;

/* 卡片悬停 */
transition: transform 200ms ease, box-shadow 200ms ease;

/* 侧边栏收起 */
transition: width 200ms ease, opacity 200ms ease;

/* 弹窗显示 */
animation: modalIn 200ms ease;

/* 下拉菜单 */
animation: dropdownIn 150ms ease;
```

### 4.3 动画关键帧

```css
/* 淡入动画 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* 上浮动画 */
@keyframes slideUp {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 弹窗进入 */
@keyframes modalIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

/* 下拉菜单 */
@keyframes dropdownIn {
  from { opacity: 0; transform: translateY(-8px); }
  to { opacity: 1; transform: translateY(0); }
}

/* 脉冲动画 (用于加载) */
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
```

### 4.4 交互反馈

| 交互 | 反馈效果 |
|------|----------|
| 按钮点击 | 轻微缩小 transform: scale(0.98)，持续 100ms |
| 卡片悬停 | 上移 2px + 阴影增强 |
| 列表项悬停 | 背景色变化 |
| 开关切换 | 滑块滑动动画 200ms |

---

## 5. 页面布局规范

### 5.1 页面结构

```
+--------------------------------------------------+
|                    Header (64px)                  |
+----------+---------------------------------------+
|          |                                       |
| Sidebar  |            Main Content              |
| (240px)  |                                       |
|          |                                       |
|          |                                       |
+----------+---------------------------------------+
```

### 5.2 页面边距

| 页面类型 | 边距 |
|----------|------|
| 笔记列表页 | 24px |
| 笔记详情页 | 32px |
| 设置页 | 32px |
| 弹窗内容 | 24px |

### 5.3 布局规范

- **最大内容宽度**: 1200px
- **卡片网格**: 使用 CSS Grid，minmax(280px, 1fr)，gap: 16px
- **移动端适配**: 断点 768px（平板）、480px（手机）
- **响应式侧边栏**: 移动端隐藏，通过汉堡菜单触发

### 5.4 响应式断点

| 设备 | 断点 | 侧边栏 | 布局 |
|------|------|--------|------|
| 桌面 | > 1024px | 展开 240px | 多列卡片 |
| 平板 | 768px - 1024px | 收起 64px | 双列卡片 |
| 手机 | < 768px | 隐藏 | 单列卡片 |

---

## 6. 组件状态汇总

### 6.1 颜色映射表

| 状态 | 主色 | 背景 | 边框 | 文字 |
|------|------|------|------|------|
| Default | #1677ff | #ffffff | #e5e5e5 | #1a1a1a |
| Hover | #4096ff | #f5f5f5 | #d1d5db | #1a1a1a |
| Active | #0050b3 | #e5e5e5 | #9ca3af | #1a1a1a |
| Disabled | #d1d5db | #f5f5f5 | #e5e5e5 | #d1d5db |
| Focus | #1677ff | #ffffff | #1677ff | #1a1a1a |
| Error | #ef4444 | #fef2f2 | #ef4444 | #1a1a1a |

---

## 7. 辅助功能规范

### 7.1 可访问性

- **对比度**: 文字与背景对比度至少 4.5:1
- **焦点指示**: 所有可交互元素需要有可见的焦点状态
- **键盘导航**: 支持 Tab 键导航，Enter/Space 激活
- **ARIA**: 适当使用 aria-label、aria-expanded 等属性

### 7.2 无障碍颜色

确保以下颜色组合符合 WCAG 2.1 AA 标准：
- Primary 文字: 在白色背景上对比度 > 4.5:1
- Secondary 文字: 在白色背景上对比度 > 3:1
- 错误状态: 红色与白色对比度 > 4.5:1

---

## 8. 使用说明

### 8.1 CSS 变量定义示例

```css
:root {
  /* 浅色主题 */
  --color-primary: #1677ff;
  --color-primary-hover: #4096ff;
  --color-primary-active: #0050b3;
  --color-primary-light: #e6f4ff;

  --color-success: #22c55e;
  --color-warning: #f59e0b;
  --color-error: #ef4444;

  --color-bg: #ffffff;
  --color-bg-card: #fafafa;
  --color-bg-sidebar: #f7f7f7;

  --color-border: #e5e5e5;
  --color-text-primary: #1a1a1a;
  --color-text-secondary: #6b7280;
  --color-text-disabled: #d1d5db;

  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;

  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;

  --transition: 200ms ease;

  --shadow-card: 0 1px 3px rgba(0, 0, 0, 0.08);
  --shadow-hover: 0 4px 12px rgba(0, 0, 0, 0.1);
  --shadow-modal: 0 20px 40px rgba(0, 0, 0, 0.15);

  --sidebar-width: 240px;
  --sidebar-collapsed: 64px;
  --header-height: 64px;
}

[data-theme="dark"] {
  /* 深色主题 */
  --color-primary: #3b82f6;
  --color-primary-hover: #60a5fa;
  --color-primary-active: #2563eb;
  --color-primary-light: #1e3a5f;

  --color-success: #4ade80;
  --color-warning: #fbbf24;
  --color-error: #f87171;

  --color-bg: #0f0f0f;
  --color-bg-card: #1a1a1a;
  --color-bg-sidebar: #141414;

  --color-border: #2d2d2d;
  --color-text-primary: #f5f5f5;
  --color-text-secondary: #9ca3af;
  --color-text-disabled: #4b5563;

  --shadow-card: 0 1px 3px rgba(0, 0, 0, 0.3);
  --shadow-hover: 0 4px 12px rgba(0, 0, 0, 0.4);
  --shadow-modal: 0 20px 40px rgba(0, 0, 0, 0.5);
}
```

---

## 9. 设计原则总结

1. **一致性**: 所有组件遵循统一的视觉规范
2. **简洁性**: 保持界面干净，减少视觉噪音
3. **可预测性**: 交互行为符合用户预期
4. **高效性**: 减少用户操作步骤
5. **可访问性**: 考虑所有用户群体的使用体验

---

*文档版本: 1.0*
*最后更新: 2026-02-15*
