---
title: 命令插件
description: 命令系统和撤销重做实现
---

# 命令插件

本章节解析 Lowcode Engine 的命令系统和撤销重做实现。

## 🎯 命令系统概述

命令系统负责管理编辑器的**操作历史**，支持撤销（Undo）和重做（Redo）。

## 🔧 核心实现

### 1. 命令接口

```typescript
interface ICommand {
  // 命令名称
  name: string;
  
  // 执行命令
  execute(): void;
  
  // 撤销命令
  undo(): void;
  
  // 重做命令
  redo(): void;
}
```

### 2. 命令历史记录

```typescript
class HistoryManager {
  // 历史栈
  private undoStack: ICommand[] = [];
  private redoStack: ICommand[] = [];
  
  // 最大历史记录数
  private maxSize: number = 100;
  
  // 执行命令
  execute(command: ICommand): void {
    command.execute();
    this.undoStack.push(command);
    this.redoStack = [];
    
    // 限制历史记录大小
    if (this.undoStack.length > this.maxSize) {
      this.undoStack.shift();
    }
  }
  
  // 撤销
  undo(): void {
    const command = this.undoStack.pop();
    if (command) {
      command.undo();
      this.redoStack.push(command);
    }
  }
  
  // 重做
  redo(): void {
    const command = this.redoStack.pop();
    if (command) {
      command.redo();
      this.undoStack.push(command);
    }
  }
  
  // 清空历史
  clear(): void {
    this.undoStack = [];
    this.redoStack = [];
  }
}
```

### 3. 常用命令

#### 插入节点命令

```typescript
class InsertNodeCommand implements ICommand {
  name = 'insert_node';
  
  private parentNode: Node;
  private newNode: Node;
  private index: number;
  
  constructor(parentNode: Node, newNode: Node, index: number) {
    this.parentNode = parentNode;
    this.newNode = newNode;
    this.index = index;
  }
  
  execute(): void {
    this.parentNode.children.splice(
      this.index,
      0,
      this.newNode
    );
  }
  
  undo(): void {
    this.parentNode.children.splice(this.index, 1);
  }
  
  redo(): void {
    this.execute();
  }
}
```

#### 删除节点命令

```typescript
class DeleteNodeCommand implements ICommand {
  name = 'delete_node';
  
  private parentNode: Node | null;
  private node: Node;
  private index: number;
  
  constructor(node: Node) {
    this.node = node;
    this.parentNode = node.parent;
    this.index = node.parent?.children.indexOf(node) || 0;
  }
  
  execute(): void {
    this.node.remove();
  }
  
  undo(): void {
    if (this.parentNode) {
      this.parentNode.children.splice(
        this.index,
        0,
        this.node
      );
    }
  }
  
  redo(): void {
    this.execute();
  }
}
```

## 🎯 快捷键注册

```typescript
// 注册撤销快捷键
editor.registerShortcut({
  name: 'undo',
  handler: () => editor.history.undo(),
  key: 'ctrl+z',
  description: '撤销'
});

// 注册重做快捷键
editor.registerShortcut({
  name: 'redo',
  handler: () => editor.history.redo(),
  key: 'ctrl+shift+z',
  description: '重做'
});
```

## 📖 下一步

- 阅读 [页面组装器](/core/ignitor) 了解页面初始化

---

上一篇：[Outline 树](/core/outline-tree) · 下一篇：[页面组装器](/core/ignitor)