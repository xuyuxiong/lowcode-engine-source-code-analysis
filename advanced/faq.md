---
title: 常见问题
description: Lowcode Engine FAQ 和问题解答
---

# 常见问题

本章节汇总 Lowcode Engine 使用中的常见问题和解决方案。

## 📋 目录

- [安装问题](#安装问题)
- [使用问题](#使用问题)
- [性能问题](#性能问题)
- [兼容性问题](#兼容性问题)
- [开发问题](#开发问题)

## 安装问题

### Q: npm install 失败

**问题现象：**
```
npm ERR! code ENOENT
npm ERR! syscall open
npm ERR! ENOENT: no such file or directory
```

**解决方案：**
```bash
# 清除缓存
npm cache clean --force

# 删除 node_modules
rm -rf node_modules package-lock.json

# 重新安装
npm install

# 使用淘宝镜像
npm config set registry https://registry.npmmirror.com
npm install
```

### Q: TypeScript 类型错误

**问题现象：**
```
TS2307: Cannot find module '@alilc/lowcode-types'
```

**解决方案：**
```bash
# 确保安装类型包
npm install @alilc/lowcode-types --save-dev

# 检查 tsconfig.json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

## 使用问题

### Q: 物料面板显示空白

**可能原因：**
1. 物料未正确注册
2. 物料元数据格式错误

**解决方案：**
```typescript
// 确保正确注册物料
editor.materials.registerMetadata(materials);

// 检查元数据格式
console.log(materials);  // 应该有 componentName 字段

// 触发刷新
editor.materials.fireChange();
```

### Q: 拖拽不生效

**可能原因：**
1. DnD 未启用
2. 容器高度未设置

**解决方案：**
```typescript
const editor = await init({
  schema: pageSchema,
  enableAutoInsertion: true,  // 启用自动插入
  enableReactiveLayout: true   // 启用响应式布局
}, container);

// 确保容器有高度
container.style.height = '100vh';
```

### Q: 属性面板不显示

**可能原因：**
1. 没有选中节点
2. 骨架层配置问题

**解决方案：**
```typescript
// 检查是否有选中节点
console.log(editor.selection.node);

// 手动激活属性面板
const propsPanel = editor.skeleton.propPanel;
propsPanel?.show();
```

## 性能问题

### Q: 页面渲染慢

**优化方案：**

1. **懒加载物料**
```typescript
// 按需加载
const materials = await import('./materials');
editor.materials.registerMetadata(materials);
```

2. **减少节点数量**
```typescript
// 使用循环渲染
{
  "componentName": "Container",
  "loop": "${list}",
  "loopArgs": ["item", "index"]
}
```

3. **虚拟列表**
```typescript
// 大量列表项时使用虚拟滚动
import { VirtualList } from '@alilc/lowcode-components';
```

### Q: 内存泄漏

**排查方法：**
```javascript
// 在控制台检查
console.log('Nodes count:', editor.document.nodesMap.size);

// 监听内存
setInterval(() => {
  console.log('Memory:', performance.memory?.usedJSHeapSize);
}, 5000);
```

**解决方案：**
```typescript
// 组件卸载时清理
plugin.destroy = () => {
  editor.off('node:select', handler);
  timer && clearInterval(timer);
};
```

## 兼容性问题

### Q: IE 浏览器不支持

**说明：**
Lowcode Engine 基于现代浏览器特性，不支持 IE。

**推荐浏览器：**
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

### Q: React 版本冲突

**问题现象：**
```
Warning: React version not specified
```

**解决方案：**
```json
{
  "peerDependencies": {
    "react": "^16.8.0",
    "react-dom": "^16.8.0"
  }
}
```

## 开发问题

### Q: 自定义组件不显示

**检查清单：**
1. [ ] 组件是否导出正确
2. [ ] 元数据是否配置 componentName
3. [ ] npm 包是否构建
4. [ ] CDN 地址是否正确

**调试步骤：**
```typescript
// 1. 检查组件导出
import MyComponent from './MyComponent';
console.log(MyComponent);

// 2. 检查元数据
console.log(metadata.componentName);

// 3. 检查注册
editor.materials.getMaterial('MyComponent');
```

### Q: 设置器不显示

**可能原因：**
1. props 配置不正确
2. setter 组件不存在

**解决方案：**
```typescript
// 检查 setter 配置
{
  name: 'color',
  setter: {
    componentName: 'ColorSetter',  // 确保设置器存在
    props: {}
  }
}
```

### Q: 插件初始化失败

**调试方法：**
```typescript
const plugin = {
  name: 'my-plugin',
  async init(editor) {
    try {
      console.log('Plugin init start');
      // 初始化逻辑
      console.log('Plugin init Success');
    } catch (error) {
      console.error('Plugin init Error:', error);
      throw error;
    }
  }
};
```

## 📖 获取帮助

如果以上方案未能解决你的问题，可以通过以下方式获取帮助：

- 📝 [GitHub Issues](https://github.com/alibaba/lowcode-engine/issues)
- 📚 [官方文档](https://lowcode-engine.cn/)
- 💬 [社区论坛](https://github.com/alibaba/lowcode-engine/discussions)

---

上一篇：[最佳实践](/advanced/best-practices)