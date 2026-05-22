---
title: 源码结构
description: Lowcode Engine 源码目录结构详解
---

# 源码结构

本章节详细解析 Lowcode Engine 的源码目录结构和各模块职责。

## 📂 整体目录结构

```
lowcode-engine/
├── .github/                    # GitHub 配置
├── .vscode/                    # VSCode 配置
├── deploy-space/               # 部署空间配置
├── docs/                       # 官方文档
├── modules/                    # 示例模块
│   ├── materials/              # 物料示例
│   │   └── lowcode-materials/  # 低代码物料
│   └── plugins/                # 插件示例
├── packages/                   # 🎯 核心代码包（重点）
├── scripts/                    # 构建和发布脚本
├── .editorconfig               # 编辑器配置
├── .eslintrc.js               # ESLint 配置
├── .prettierrc.js             # Prettier 配置
├── .stylelintrc.js            # Stylelint 配置
├── babel.config.js            # Babel 配置
├── commitlint.config.js       # Commit Lint 配置
├── lerna.json                 # Lerna 配置
├── package.json               # 根项目配置
└── tsconfig.json              # TypeScript 配置
```

## 🎯 packages 核心包

### 核心引擎模块

| 包名 | 目录 | 职责 |
|------|------|------|
| `@alilc/lowcode-engine` | `packages/engine/` | 引擎核心，统一出口 |
| `@alilc/lowcode-editor-core` | `packages/editor-core/` | 编辑器核心 API |
| `@alilc/lowcode-designer` | `packages/designer/` | 设计器模块 |
| `@alilc/lowcode-editor-skeleton` | `packages/editor-skeleton/` | 骨架层定义 |

### 渲染器模块

| 包名 | 目录 | 职责 |
|------|------|------|
| `@alilc/lowcode-renderer-core` | `packages/renderer-core/` | 渲染器核心 |
| `@alilc/lowcode-react-renderer` | `packages/react-renderer/` | React 渲染器 |
| `@alilc/lowcode-react-simulator-renderer` | `packages/react-simulator-renderer/` | React 模拟器渲染器 |

### 插件模块

| 包名 | 目录 | 职责 |
|------|------|------|
| `@alilc/lowcode-plugin-command` | `packages/plugin-command/` | 命令系统插件 |
| `@alilc/lowcode-plugin-designer` | `packages/plugin-designer/` | 设计器插件 |
| `@alilc/lowcode-plugin-outline-pane` | `packages/plugin-outline-pane/` | Outline 树插件 |

### 基础模块

| 包名 | 目录 | 职责 |
|------|------|------|
| `@alilc/lowcode-workspace` | `packages/workspace/` | 工作区管理 |
| `@alilc/lowcode-types` | `packages/types/` | TypeScript 类型定义 |
| `@alilc/lowcode-utils` | `packages/utils/` | 工具函数 |
| `@alilc/lowcode-ignitor` | `packages/ignitor/` | 页面组装器 |
| `@alilc/lowcode-shell` | `packages/shell/` | Shell API |

## 📦 核心包详细结构

### 1. engine - 引擎核心

```
packages/engine/
├── src/
│   ├── index.ts              # 统一入口
│   ├── engine-core.ts        # 引擎核心实现
│   ├── editor-context.ts     # 编辑器上下文
│   └── builtin-plugins/      # 内置插件
├── tests/                    # 测试文件
├── package.json
└── README.md
```

**核心职责：**
- 引擎初始化入口
- 插件注册和管理
- 统一 API 导出
- 默认配置管理

### 2. editor-core - 编辑器核心

```
packages/editor-core/
├── src/
│   ├── api/                  # API 定义
│   │   ├── editor.ts         # 编辑器 API
│   │   ├── canvas.ts         # 画布 API
│   │   ├── component.ts      # 组件 API
│   │   ├── material.ts       # 物料 API
│   │   └── ...
│   ├── kernel/              # 内核实现
│   │   ├── editor.ts         # 编辑器实例
│   │   ├── project.ts        # 项目管理
│   │   ├── document.ts       # 文档模型
│   │   └── node.ts           # 节点模型
│   ├── utils/                # 工具函数
│   └── types/                # 类型定义
├── package.json
└── README.md
```

**核心类：**

| 类名 | 职责 |
|------|------|
| `Editor` | 编辑器主类，提供全局 API |
| `Project` | 项目管理，包含多个文档 |
| `DocumentModel` | 文档模型，管理页面节点树 |
| `Node` | 节点模型，页面中的组件实例 |
| `Prop` | 属性模型，节点属性 |

### 3. designer - 设计器

```
packages/designer/
├── src/
│   ├── designer/             # 设计器核心
│   │   ├── designer.ts       # 设计器主类
│   │   ├── selection.ts      # 选择管理
│   │   ├── prop.ts           # 属性管理
│   │   └── setting.ts        # 设置管理
│   ├── simulator/            # 模拟器
│   │   ├── simulator-host.ts # 模拟器宿主
│   │   └── render-env.ts     # 渲染环境
│   ├── editor/               # 编辑器视图
│   │   ├── editor-view.ts    # 编辑器视图
│   │   └── workbench.ts      # 工作台
│   └── skeleton/             # 骨架层
├── package.json
└── README.md
```

### 4. editor-skeleton - 骨架层

```
packages/editor-skeleton/
├── src/
│   ├── widget.ts             # Widget 基类
│   ├── panel.ts              # 面板组件
│   ├── area.ts               # 区域定义
│   └── skeleton.ts           # 骨架实例
└── package.json
```

**骨架层概念：**

骨架层（Skeleton）是 Lowcode Engine 的 UI 布局框架，定义了编辑器界面的基本结构：

```
┌─────────────────────────────────────┐
│  Header (工具栏)                    │
├──────────┬─────────────┬───────────┤
│  Panel   │             │  Panel    │
│  (物料)  │   Canvas    │  (设置器)  │
│          │   (画布)    │           │
├──────────┴─────────────┴───────────┤
│  Footer (状态栏)                    │
└─────────────────────────────────────┘
```

### 5. renderer-core - 渲染器核心

```
packages/renderer-core/
├── src/
│   ├── renderer.ts           # 渲染器主类
│   ├── page.ts               # 页面渲染
│   ├── component.ts          # 组件渲染
│   └── runtime.ts            # 运行时
└── package.json
```

### 6. workspace - 工作区

```
packages/workspace/
├── src/
│   ├── workspace.ts          # 工作区主类
│   ├── resource.ts           # 资源管理
│   └── window.ts             # 窗口管理
└── package.json
```

## 🔗 模块依赖关系

```mermaid
graph TD
    engine[@alilc/lowcode-engine] --> editor-core
    engine --> designer
    engine --> workspace
    
    editor-core[@alilc/lowcode-editor-core] --> types
    editor-core --> utils
    
    designer[@alilc/lowcode-designer] --> editor-core
    designer --> skeleton
    
    renderer-core[@alilc/lowcode-renderer-core] --> types
    
    workspace[@alilc/lowcode-workspace] --> editor-core
    
    plugin-command[plugin-command] --> editor-core
    plugin-designer[plugin-designer] --> designer
    plugin-outline[plugin-outline-pane] --> designer
    
    types[@alilc/lowcode-types]
    utils[@alilc/lowcode-utils]
    skeleton[@alilc/lowcode-editor-skeleton]
```

## 🎯 源码阅读建议

### 1. 按层次阅读

```
第一层：入口和配置
  └─> packages/engine/
  └─> lerna.json, package.json

第二层：核心 API
  └─> packages/editor-core/src/api/
  └─> packages/editor-core/src/kernel/

第三层：具体实现
  └─> packages/designer/src/
  └─> packages/renderer-core/src/

第四层：插件和扩展
  └─> packages/plugin-*/src/
```

### 2. 关注关键文件

| 文件 | 说明 |
|------|------|
| `packages/engine/src/index.ts` | 引擎总入口 |
| `packages/editor-core/src/api/index.ts` | API 汇总 |
| `packages/designer/src/designer/designer.ts` | 设计器主实现 |
| `packages/renderer-core/src/renderer.ts` | 渲染器核心 |

## 📖 下一步

- 阅读 [调试指南](/guide/debugging) 学习调试技巧
- 阅读 [整体架构](/architecture/overview) 理解设计思想
- 阅读 [引擎核心](/core/engine-core) 深入实现细节

---

上一篇：[快速开始](/guide/quick-start) · 下一篇：[调试指南](/guide/debugging)