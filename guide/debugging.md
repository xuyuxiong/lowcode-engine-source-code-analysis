---
title: 调试指南
description: Lowcode Engine 源码调试方法和技巧
---

# 调试指南

本章节介绍 Lowcode Engine 源码的调试方法、技巧和工具。

## 🔧 调试环境配置

### VSCode 配置

在项目根目录创建 `.vscode/launch.json`：

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "调试 Lowcode Engine",
      "url": "http://localhost:5556",
      "webRoot": "${workspaceFolder}/packages",
      "sourceMaps": true,
      "timeout": 30000
    }
  ]
}
```

### TypeScript 编译配置

确保 `tsconfig.json` 中启用了 Source Map：

```json
{
  "compilerOptions": {
    "sourceMap": true,
    "inlineSourceMap": false,
    "inlineSources": true,
    "declaration": true,
    "declarationMap": true,
    "outDir": "./es",
    "rootDir": "./src"
  }
}
```

## 🐛 调试方法

### 1. 启动开发服务器

```bash
# 进入项目目录
cd lowcode-engine

# 安装依赖
npm install

# 启动开发服务器
npm run start
```

访问 `http://localhost:5556` 查看演示页面。

### 2. 在关键位置添加断点

推荐在以下核心类中设置断点：

```typescript
// packages/editor-core/src/kernel/editor.ts
class Editor {
  async init(config: any) {
    // 🔴 在此处打断点，观察初始化流程
    await this.loadPlugins();
    await this.setupCanvas();
  }
}

// packages/designer/src/designer/designer.ts
class Designer {
  init(project: Project) {
    // 🔴 在此处打断点，观察设计器初始化
    this.project = project;
    this.setupSelection();
  }
}

// packages/renderer-core/src/renderer.ts
class Renderer {
  async render(schema: any) {
    // 🔴 在此处打断点，观察渲染流程
    const page = await this.parsePage(schema);
    return this.compose(page);
  }
}
```

### 3. Chrome DevTools 调试

打开 Chrome DevTools（F12）后：

1. **Sources 面板** - 找到源码文件（`webpack://` 目录下）
2. **设置断点** - 点击行号
3. **Sources > Source Map** - 确保 Source Map 已加载
4. **控制台** - 使用 `window.editor`、`window.designer` 等访问实例

### 4. 使用控制台访问核心实例

在浏览器控制台可以快速访问核心对象：

```javascript
// 访问编辑器实例
window.editor

// 访问设计器实例
window.designer

// 访问当前项目
window.editor.project

// 访问当前文档
window.editor.currentDocument

// 访问节点树
window.editor.currentDocument.nodes

// 访问选中节点
window.editor.selection.node

// 访问物料列表
window.editor.materials.getMaterials()

// 访问插件
window.editor.plugins
```

## 📊 调试场景示例

### 场景 1：调试组件拖拽

```typescript
// packages/designer/src/designer/selection.ts
class Selection {
  select(node: Node) {
    // 🔴 在此处打断点，观察选择逻辑
    this.selected = node;
    this.emit('select', node);
    this.updatePropPanel(); // 更新属性面板
  }
  
  private updatePropPanel() {
    // 🔴 调试属性面板更新
    this.selectedNode = this.selected;
    this.skeleton.propPanel.setProps(this.selectedNode?.props);
  }
}
```

### 场景 2：调试属性变更

```typescript
// packages/editor-core/src/kernel/node.ts
class Node {
  initProps(props: any) {
    // 🔴 调试属性初始化
    this._props = new Prop(props, this);
  }
  
  setPropValue(key: string, value: any) {
    // 🔴 调试属性值变更
    this.props.set(key, value);
    this.emit('prop:change', { key, value });
  }
}
```

### 场景 3：调试页面渲染

```typescript
// packages/renderer-core/src/renderer.ts
async render(schema: IPublicModelDocumentSchema) {
  // 🔴 调试渲染入口
  this.sandbox = await this.createSandbox();
  const page = this.parsePage(schema);
  return this.compose(page);
}

private compose(page: Page) {
  // 🔴 调试页面合成
  const { componentsMap = [] } = page;
  return this.buildComponentTree(componentsMap);
}
```

## 🛠️ 调试工具

### 1. React Developer Tools

安装 [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools) 扩展：

- 查看组件树结构
- 检查组件 Props 和 State
- 追踪组件渲染

### 2. Redux DevTools（可选）

如果使用 Redux 管理状态，可安装 Redux DevTools 查看状态变化。

### 3. Performance API

在控制台使用 Performance API 分析性能：

```javascript
// 开始性能监控
performance.mark('render-start');

// ... 执行操作 ...

// 结束性能监控
performance.mark('render-end');
performance.measure('render', 'render-start', 'render-end');

// 查看测量结果
performance.getEntriesByName('render')[0];
```

## 📝 常见调试问题

### 问题 1：Source Map 不生效

**解决方案：**
```bash
# 清除缓存并重新构建
rm -rf node_modules/.cache
npm run build
```

### 问题 2：断点无法命中

**可能原因：**
- 代码经过压缩混淆
- Source Map 路径不正确
- 模块未正确加载

**解决方案：**
```json
// 检查 webpack 配置
{
  "devtool": "source-map",
  "output": {
    "devtoolModuleFilenameTemplate": "webpack://[namespace]/[resource-path]"
  }
}
```

### 问题 3：调试时数据不更新

**解决方案：**

在控制台强制刷新状态：

```javascript
// 强制触发 MobX 更新
editor.kernel.emit('document:change');
```

## 🎯 调试最佳实践

### 1. 分层调试

按照以下顺序调试：

```
接口层 (API)
  ↓
核心层 (Kernel)
  ↓
实现层 (Designer/Renderer)
  ↓
插件层 (Plugins)
```

### 2. 使用日志辅助

关键位置添加日志：

```typescript
import debug from 'debug';
const log = debug('lowcode:editor');

class Editor {
  init() {
    log('Editor initializing...');
    // ...
    log('Editor initialized');
  }
}
```

启用日志：

```bash
# 在浏览器控制台
localStorage.setItem('debug', 'lowcode:*')
```

### 3. 快照调试

保存关键状态快照：

```javascript
// 在控制台
const snapshot = {
  project: editor.project.export(),
  selection: editor.selection.node?.export(),
  plugins: Object.keys(editor.plugins)
};
console.log(JSON.stringify(snapshot, null, 2));
```

## 📖 下一步

- 阅读 [整体架构](/architecture/overview) 理解设计思想
- 阅读 [引擎核心](/core/engine-core) 深入实现细节
- 阅读 [设计器](/core/designer) 了解设计器源码

---

上一篇：[源码结构](/guide/source-structure) · 下一篇：[整体架构](/architecture/overview)