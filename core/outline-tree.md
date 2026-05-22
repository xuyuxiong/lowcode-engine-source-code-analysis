---
title: Outline 树
description: 页面结构树组件解析
---

#Outline 树

本章节解析低代码引擎的页面结构树（Outline Tree）组件。

## 🎯 概述

Outline 树是页面节点层级结构的可视化展示，支持：

- 🌳 **树形展示** - 页面的嵌套结构
- 🖱️ **拖拽排序** - 调整节点顺序
- 👁️ **显示隐藏** - 控制节点可见性
- 🔒 **锁定解锁** - 保护节点不被编辑

## 🔧 核心实现

### 1. 树节点数据结构

```typescript
interface OutlineNode {
  id: string;
  title: string;
  componentName: string;
  children: OutlineNode[];
  hidden: boolean;
  isLocked: boolean;
  depth: number;
}
```

### 2. 树组件实现

```typescript
import React, { useState } from 'react';

interface TreeNodeProps {
  node: OutlineNode;
  onSelect: (node: OutlineNode) => void;
  onDrop: (dragNode: OutlineNode, dropNode: OutlineNode) => void;
}

const TreeNode: React.FC<TreeNodeProps> = ({ 
  node, 
  onSelect,
  onDrop 
}) => {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = node.children && node.children.length > 0;
  
  return (
    <div className="outline-tree-node">
      <div 
        className="node-content"
        onClick={() => onSelect(node)}
      >
        {/* 展开/折叠图标 */}
        {hasChildren && (
          <span 
            className="expand-icon"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? '▼' : '▶'}
          </span>
        )}
        
        {/* 组件图标 */}
        <span className="component-icon">
          {getIcon(node.componentName)}
        </span>
        
        {/* 节点标题 */}
        <span className="node-title">
          {node.title || node.componentName}
        </span>
        
        {/* 状态图标 */}
        {node.hidden && <span className="status-icon">👁️</span>}
        {node.isLocked && <span className="status-icon">🔒</span>}
      </div>
      
      {/* 子节点 */}
      {expanded && hasChildren && (
        <div className="children-container">
          {node.children.map(child => (
            <TreeNode
              key={child.id}
              node={child}
              onSelect={onSelect}
              onDrop={onDrop}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TreeNode;
```

### 3. 拖拽排序

```typescript
const handleDragStart = (e: DragEvent, node: OutlineNode) => {
  e.dataTransfer.setData('nodeId', node.id);
  e.dataTransfer.effectAllowed = 'move';
};

const handleDragOver = (e: DragEvent) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
};

const handleDrop = (e: DragEvent, targetNode: OutlineNode) => {
  e.preventDefault();
  
  const dragNodeId = e.dataTransfer.getData('nodeId');
  const dragNode = findNode(dragNodeId);
  
  if (dragNode && targetNode) {
    // 移动节点
    onDrop(dragNode, targetNode);
  }
};
```

## 🎨 样式实现

```css
.outline-tree-node {
  position: relative;
}

.node-content {
  display: flex;
  align-items: center;
  padding: 4px 8px;
  cursor: pointer;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.node-content:hover {
  background-color: rgba(88, 115, 255, 0.1);
}

.node-content.selected {
  background-color: rgba(88, 115, 255, 0.2);
}

.children-container {
  margin-left: 16px;
  border-left: 1px solid #e0e0e0;
  padding-left: 8px;
}

.status-icon {
  margin-left: 4px;
  font-size: 12px;
  opacity: 0.7;
}
```

## 📖 下一步

- 阅读 [命令插件](/core/plugin-command) 了解命令系统
- 阅读 [页面组装器](/core/ignitor) 了解页面初始化

---

上一篇：[设置器](/core/setters) · 下一篇：[命令插件](/core/plugin-command)