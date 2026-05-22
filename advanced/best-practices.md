---
title: 最佳实践
description: Lowcode Engine 使用最佳实践
---

# 最佳实践

本章节总结 Lowcode Engine 开发和使用中的最佳实践。

## 📋 项目组织

### 推荐目录结构

```
my-lowcode-app/
├── public/                     # 静态资源
├── src/
│   ├── components/             # 自定义组件
│   ├── materials/              # 物料包
│   ├── plugins/                # 自定义插件
│   ├── config/                 # 配置文件
│   │   ├── engine.config.ts    # 引擎配置
│   │   └── theme.config.ts     # 主题配置
│   └── pages/                  # 页面定义
├── package.json
└── README.md
```

## 🎯 性能优化

### 1. 懒加载物料

```typescript
// 按需加载物料
const materials = {
  // 基础组件（立即加载）
  base: () => import('@alilc/lowcode-materials'),
  
  // 业务组件（懒加载）
  business: () => import('./business-materials'),
  
  // 区块（按需加载）
  blocks: () => import('./blocks')
};

// 在使用时加载
async function loadMaterials(category: string) {
  const loader = materials[category];
  if (loader) {
    const module = await loader();
    editor.materials.registerMetadata(module.default);
  }
}
```

### 2. 虚拟滚动

```typescript
// 大量节点时使用虚拟滚动
const VirtualNodeTree = ({ nodes }) => {
  const [visibleNodes, setVisibleNodes] = useState([]);
  
  useEffect(() => {
    // 只渲染可见区域
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter(e => e.isIntersecting)
        .map(e => e.target);
      setVisibleNodes(visible);
    });
    
    nodes.forEach(node => {
      observer.observe(getDOMNode(node));
    });
    
    return () => observer.disconnect();
  }, [nodes]);
  
  return (
    <div>
      {visibleNodes.map(node => (
        <NodeItem key={node.id} node={node} />
      ))}
    </div>
  );
};
```

### 3. 防抖节流

```typescript
// 属性变更防抖
const debouncedSave = debounce((node, props) => {
  node.setProps(props);
}, 300);

// 拖拽节流
const throttledRender = throttle(() => {
  renderCanvas();
}, 16); // 约 60fps
```

## 🔒 安全实践

### 1. Schema 校验

```typescript
// 校验输入 Schema
function validateSchema(schema: any): boolean {
  if (!schema || typeof schema !== 'object') {
    return false;
  }
  
  // 检查必需字段
  if (!schema.componentName) {
    return false;
  }
  
  // 防止 XSS
  if (schema.props) {
    Object.values(schema.props).forEach((value: any) => {
      if (typeof value === 'string') {
        sanitizeString(value);
      }
    });
  }
  
  return true;
}
```

### 2. 沙箱隔离

```typescript
// 使用 iframe 沙箱
function createSandbox() {
  const iframe = document.createElement('iframe');
  iframe.sandbox = 'allow-scripts allow-same-origin';
  iframe.style.display = 'none';
  document.body.appendChild(iframe);
  
  return {
    window: iframe.contentWindow,
    document: iframe.contentDocument,
    destroy: () => iframe.remove()
  };
}
```

## 📝 代码规范

### 1. 组件命名

```typescript
// ✅ 推荐：使用 PascalCase
const MyComponent = () => {};

// ❌ 不推荐：使用 camelCase
const myComponent = () => {};
```

### 2. 物料描述

```typescript
// ✅ 推荐：完整的元数据
{
  componentName: 'Button',
  title: '按钮',
  category: '基础组件',
  props: [...],
  configure: {...}
}

// ❌ 不完整
{
  componentName: 'Button'
}
```

### 3. 事件处理

```typescript
// ✅ 推荐：统一的事件处理
editor.on('node:select', handleNodeSelect);
editor.on('node:prop:change', handlePropChange);

// ❌ 不推荐：匿名函数
editor.on('node:select', (node) => {
  console.log(node);
});
```

## 🚀 部署实践

### 1. 静态资源 CDN

```typescript
// 配置 CDN 地址
const config = {
  schema: pageSchema,
  assets: {
    // 组件库 CDN
    packages: [
      {
        package: '@alilc/lowcode-materials',
        version: '1.0.0',
        cdn: 'https://cdn.example.com/lowcode-materials/1.0.0'
      }
    ]
  }
};
```

### 2. 预加载

```typescript
// 预加载常用物料
async function preloadMaterials() {
  const commonMaterials = [
    '@alilc/lowcode-materials/base',
    '@alilc/lowcode-materials/layout'
  ];
  
  await Promise.all(
    commonMaterials.map(name => import(name))
  );
}
```

## 🐛 调试技巧

### 1. 启用调试模式

```typescript
const editor = await init({
  schema: pageSchema,
  enableDebugger: true,  // 启用调试模式
  debugLogLevel: 'verbose'
}, container);
```

### 2. 导出调试信息

```typescript
// 导出当前状态
function exportDebugInfo() {
  return {
    project: editor.project?.export(),
    selection: editor.selection.node?.export(),
    plugins: Object.keys(editor.plugins)
  };
}

// 在控制台
const debug = exportDebugInfo();
console.log(JSON.stringify(debug, null, 2));
```

## 📊 监控和日志

```typescript
// 记录关键操作
function logAction(action: string, data: any) {
  console.log(`[Lowcode] ${action}:`, data);
  
  // 发送到监控系统
  sendToMonitor({
    action,
    data,
    timestamp: Date.now()
  });
}

// 使用示例
editor.on('node:select', (node) => {
  logAction('node_select', { nodeId: node.id });
});
```

## 📖 常见问题

### 物料不显示

```typescript
// 确保正确注册
editor.materials.registerMetadata(materials);

// 刷新物料面板
editor.materials.fireChange();
```

### 插件不生效

```typescript
// 检查插件名称是否唯一
// 确保在 init 之前注册
editor.register(plugin);
await init(config);  // 注册后再初始化
```

### 性能问题

```typescript
// 减少不必要的渲染
// 使用虚拟列表
// 分包懒加载
```

## 📖 下一步

- 阅读 [常见问题](/advanced/faq) 解决具体问题
- 参考 [GitHub Issues](https://github.com/alibaba/lowcode-engine/issues) 寻求帮助

---

上一篇：[物料开发](/advanced/material-development) · 下一篇：[常见问题](/advanced/faq)