---
title: 自定义插件
description: 开发和注册自定义插件
---

# 自定义插件

本章节指导如何开发和注册自定义插件。

## 🎯 插件基础

Lowcode Engine 的所有功能都是通过插件实现的。你可以开发自定义插件来扩展引擎能力。

## 📝 插件结构

```typescript
import { IPublicTypePluginMeta, IPublicModelEditor } from '@alilc/lowcode-types';

const myPlugin: IPublicTypePluginMeta = {
  // 插件名称（必须唯一）
  name: 'my-plugin-name',
  
  // 插件导出名
  exportName: 'MyPlugin',
  
  // 插件依赖（可选）
  dependsOn: ['some-other-plugin'],
  
  // 初始化方法
  async init(editor: IPublicModelEditor) {
    console.log('插件初始化');
    
    // 在这里注册功能
  },
  
  // 销毁方法（可选）
  destroy() {
    console.log('插件销毁');
  },
  
  // 优先级（可选，数字越小优先级越高）
  priority: 10
};

export default myPlugin;
```

## 🔧 插件开发示例

### 1. 添加自定义 API

```typescript
const customApiPlugin: IPublicTypePluginMeta = {
  name: 'custom-api-plugin',
  exportName: 'CustomApiPlugin',
  
  async init(editor) {
    // 添加自定义 API
    editor.customApi = {
      // 获取选中节点信息
      getSelectedNodeInfo() {
        const node = editor.selection.node;
        if (!node) return null;
        
        return {
          id: node.id,
          name: node.componentName,
          props: node.props.getValue()
        };
      },
      
      // 批量设置属性
      batchSetProps(nodeId: string, props: any) {
        const node = editor.document.getNode(nodeId);
        if (node) {
          Object.entries(props).forEach(([key, value]) => {
            node.setProp(key, value);
          });
        }
      }
    };
  }
};
```

### 2. 监听事件

```typescript
const eventListenerPlugin: IPublicTypePluginMeta = {
  name: 'event-listener-plugin',
  exportName: 'EventListenerPlugin',
  
  async init(editor) {
    // 监听节点选择
    editor.on('node:select', ({ node }) => {
      console.log('节点被选中:', node.componentName);
    });
    
    // 监听属性变化
    editor.on('node:prop:change', ({ nodeId, propKey, newValue }) => {
      console.log('属性变化:', nodeId, propKey, newValue);
    });
    
    // 监听拖拽事件
    editor.on('node:drag', ({ node, target }) => {
      console.log('节点拖拽:', node, target);
    });
    
    // 监听文档变化
    editor.on('document:change', (change) => {
      console.log('文档变化:', change);
    });
  }
};
```

### 3. 注册快捷键

```typescript
const shortcutPlugin: IPublicTypePluginMeta = {
  name: 'shortcut-plugin',
  exportName: 'ShortcutPlugin',
  
  async init(editor) {
    // 注册删除快捷键
    editor.registerShortcut({
      name: 'custom-delete',
      handler: () => {
        const node = editor.selection.node;
        if (node) {
          node.remove();
        }
      },
      key: 'backspace',
      description: '删除选中节点'
    });
    
    // 注册复制快捷键
    editor.registerShortcut({
      name: 'custom-copy',
      handler: () => {
        const node = editor.selection.node;
        if (node) {
          // 复制逻辑
          const cloned = node.clone();
          node.parent?.appendChild(cloned);
        }
      },
      key: 'ctrl+d',
      description: '复制选中节点'
    });
  }
};
```

### 4. 添加菜单项

```typescript
const menuPlugin: IPublicTypePluginMeta = {
  name: 'menu-plugin',
  exportName: 'MenuPlugin',
  
  async init(editor) {
    // 添加右键菜单
    editor.addContextMenu({
      name: 'custom-menu',
      title: '自定义操作',
      handler: (node) => {
        console.log('执行自定义操作', node);
      },
      condition: (node) => {
        // 条件显示
        return node?.componentName !== 'Page';
      }
    });
  }
};
```

## 📦 发布插件

### package.json 配置

```json
{
  "name": "@your-org/lowcode-plugin-custom",
  "version": "1.0.0",
  "description": "自定义 Lowcode Engine 插件",
  "main": "lib/index.js",
  "module": "es/index.js",
  "types": "es/index.d.ts",
  "files": ["lib", "es"],
  "scripts": {
    "build": "tsc",
    "prepublishOnly": "npm run build"
  },
  "peerDependencies": {
    "@alilc/lowcode-engine": "^1.0.0"
  },
  "devDependencies": {
    "@alilc/lowcode-engine": "^1.0.0",
    "typescript": "^4.0.0"
  }
}
```

### 使用已发布插件

```typescript
import customPlugin from '@your-org/lowcode-plugin-custom';

const editor = await init({
  schema: pageSchema,
  plugins: [customPlugin]
}, container);
```

## 🎯 最佳实践

### 1. 插件命名

- 使用唯一前缀：`your-prefix-plugin-name`
- 避免与内置插件冲突

### 2. 错误处理

```typescript
async init(editor) {
  try {
    // 初始化逻辑
  } catch (error) {
    console.error('插件初始化失败:', error);
    throw error;
  }
}
```

### 3. 资源清理

```typescript
destroy() {
  // 移除事件监听
  editor.off('node:select', this.handleSelect);
  
  // 清理定时器
  if (this.timer) {
    clearInterval(this.timer);
  }
  
  // 清理 DOM
  this.container?.remove();
}
```

## 📖 下一步

- 阅读 [自定义渲染器](/advanced/custom-renderer) 开发自定义渲染器
- 阅读 [物料开发](/advanced/material-development) 开发自定义物料
- 阅读 [最佳实践](/advanced/best-practices) 了解更多实践

---

上一篇：[进阶篇概览](/advanced/overview) · 下一篇：[自定义渲染器](/advanced/custom-renderer)