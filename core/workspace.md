---
title: 工作区
description: 工作区管理和资源调度
---

# 工作区

本章节解析 `@alilc/lowcode-workspace` 工作区模块的源码实现。

## 🎯 模块职责

工作区模块负责管理**多文档/多页面**的编辑环境：

- 📑 **资源管理** - 管理页面、组件等资源
- 🪟 **窗口管理** - 多窗口/标签页支持
- 🔄 **资源切换** - 在不同资源间切换
- 📊 **状态同步** - 工作区状态管理

## 📁 源码结构

```
packages/workspace/src/
├── index.ts                     # 统一入口
├── workspace.ts                 # 工作区主类
├── resource.ts                  # 资源管理
├── window.ts                    # 窗口管理
└── types.ts                     # 类型定义
```

## 🔧 核心类

### 1. Workspace - 工作区主类

```typescript
// packages/workspace/src/workspace.ts
import { observable, action, computed } from 'mobx';
import { Resource } from './resource';
import { EditorWindow } from './window';

export class Workspace {
  editor: any;
  
  // 资源列表
  @observable resources: Resource[] = [];
  
  // 窗口列表
  @observable windows: EditorWindow[] = [];
  
  // 当前资源
  @observable currentResource: Resource | null = null;
  
  // 当前窗口
  @observable currentWindow: EditorWindow | null = null;
  
  constructor(editor: any) {
    this.editor = editor;
  }
  
  // 初始化
  init(): void {
    // 创建默认资源
    this.createDefaultResource();
  }
  
  // 创建资源
  @action
  createResource(config: any): Resource {
    const resource = new Resource(this, config);
    this.resources.push(resource);
    return resource;
  }
  
  // 打开资源
  @action
  async open(resource: Resource): Promise<EditorWindow> {
    let window = this.windows.find(
      w => w.resource === resource
    );
    
    if (!window) {
      window = new EditorWindow(this, resource);
      this.windows.push(window);
    }
    
    this.currentWindow = window;
    this.currentResource = resource;
    
    return window;
  }
  
  // 关闭资源
  @action
  close(resource: Resource): void {
    const index = this.resources.indexOf(resource);
    if (index > -1) {
      this.resources.splice(index, 1);
    }
    
    // 关闭相关窗口
    const window = this.windows.find(w => w.resource === resource);
    if (window) {
      window.close();
      const winIndex = this.windows.indexOf(window);
      if (winIndex > -1) {
        this.windows.splice(winIndex, 1);
      }
    }
  }
  
  // 获取资源
  getResource(id: string): Resource | null {
    return this.resources.find(r => r.id === id) || null;
  }
}
```

### 2. Resource - 资源类

```typescript
// packages/workspace/src/resource.ts
export interface IResourceConfig {
  id: string;
  title: string;
  type: 'page' | 'component' | 'flow';
  schema?: any;
  componentMeta?: any;
}

export class Resource {
  workspace: Workspace;
  
  id: string;
  title: string;
  type: string;
  schema: any;
  
  @observable modified: boolean = false;
  @observable loading: boolean = false;
  
  constructor(workspace: Workspace, config: IResourceConfig) {
    this.workspace = workspace;
    this.id = config.id;
    this.title = config.title;
    this.type = config.type;
    this.schema = config.schema;
  }
  
  // 保存资源
  async save(): Promise<void> {
    this.loading = true;
    try {
      // 保存到服务器
      await this.saveToServer();
      this.modified = false;
    } finally {
      this.loading = false;
    }
  }
  
  // 导出 Schema
  export(): any {
    return {
      id: this.id,
      title: this.title,
      type: this.type,
      schema: this.schema
    };
  }
}
```

### 3. EditorWindow - 编辑器窗口

```typescript
// packages/workspace/src/window.ts
export class EditorWindow {
  workspace: Workspace;
  resource: Resource;
  
  @observable active: boolean = false;
  @observable title: string;
  
  constructor(workspace: Workspace, resource: Resource) {
    this.workspace = workspace;
    this.resource = resource;
    this.title = resource.title;
  }
  
  // 激活窗口
  activate(): void {
    this.workspace.currentWindow = this;
    this.workspace.currentResource = this.resource;
    this.active = true;
  }
  
  // 关闭窗口
  close(): void {
    this.active = false;
    // 清理资源
  }
  
  // 获取文档
  getDocument(): DocumentModel | null {
    // 返回关联的文档
    return this.resource.schema?.root || null;
  }
}
```

## 🎯 使用示例

### 创建多页面工作区

```typescript
import { init } from '@alilc/lowcode-engine';

const editor = await init(config, container);

// 访问工作区
const workspace = editor.workspace;

// 创建页面资源
const page1 = workspace.createResource({
  id: 'page-1',
  title: '首页',
  type: 'page',
  schema: homepageSchema
});

const page2 = workspace.createResource({
  id: 'page-2',
  title: '列表页',
  type: 'page',
  schema: listPageSchema
});

// 打开页面
await workspace.open(page1);

// 切换页面
await workspace.open(page2);
```

## 📖 下一步

- 阅读 [插件系统](/core/plugin-system) 了解插件架构
- 阅读 [物料系统](/core/material) 了解物料管理
- 阅读 [设置器](/core/setters) 了解属性设置器

---

上一篇：[骨架层](/core/skeleton) · 下一篇：[插件系统](/core/plugin-system)