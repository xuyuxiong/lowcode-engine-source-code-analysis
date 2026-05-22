---
title: 自定义渲染器
description: 开发和注册自定义渲染器
---

# 自定义渲染器

本章节指导如何开发自定义渲染器。

## 🎯 渲染器概述

渲染器负责将 **Schema** 转换为 **可运行的页面**。Lowcode Engine 支持多种渲染器：

- React Renderer（默认）
- 小程序 Renderer
- 自定义 Renderer

## 🔧 渲染器接口

```typescript
interface IRenderer {
  // 初始化
  init(config: RendererConfig): Promise<void>;
  
  // 渲染页面
  render(schema: IPublicModelDocumentSchema): Promise<void>;
  
  // 卸载
  unmount(): Promise<void>;
  
  // 销毁
  dispose(): void;
}
```

## 📝 开发自定义渲染器

### 1. 基础渲染器

```typescript
import { IRenderer, RendererConfig } from '@alilc/lowcode-renderer-core';

class CustomRenderer implements IRenderer {
  container: HTMLElement | null = null;
  config: RendererConfig | null = null;
  
  async init(config: RendererConfig): Promise<void> {
    this.config = config;
    this.container = config.container;
  }
  
  async render(schema: IPublicModelDocumentSchema): Promise<void> {
    if (!this.container) return;
    
    // 解析 Schema
    const componentTree = this.parseSchema(schema);
    
    // 渲染到容器
    this.renderToContainer(componentTree);
  }
  
  private parseSchema(schema: any): any {
    // 将 Schema 转换为组件树
    return {
      type: schema.componentName,
      props: schema.props,
      children: schema.children?.map((child: any) => 
        this.parseSchema(child)
      )
    };
  }
  
  private renderToContainer(tree: any): void {
    if (!this.container) return;
    
    // 自定义渲染逻辑
    this.container.innerHTML = this.renderComponent(tree);
  }
  
  private renderComponent(component: any): string {
    const { type, props, children } = component;
    
    // 渲染为 HTML
    return `<${type} class="${props.className || ''}">
      ${children?.map((c: any) => this.renderComponent(c)).join('')}
    </${type}>`;
  }
  
  async unmount(): Promise<void> {
    if (this.container) {
      this.container.innerHTML = '';
    }
  }
  
  dispose(): void {
    this.container = null;
    this.config = null;
  }
}

export default CustomRenderer;
```

### 2. Vue 渲染器

```typescript
import { createApp, h } from 'vue';

class VueRenderer implements IRenderer {
  app: any = null;
  container: HTMLElement | null = null;
  
  async init(config: RendererConfig): Promise<void> {
    this.container = config.container;
  }
  
  async render(schema: any): Promise<void> {
    if (!this.container) return;
    
    // 创建 Vue 组件
    const component = this.schemaToVueComponent(schema);
    
    // 挂载 Vue 应用
    this.app = createApp(component);
    this.app.mount(this.container);
  }
  
  private schemaToVueComponent(schema: any): any {
    return {
      name: schema.componentName,
      render() {
        return h(schema.componentName, schema.props, 
          schema.children?.map((child: any) => 
            h(child.componentName, child.props, child.children)
          )
        );
      }
    };
  }
  
  async unmount(): Promise<void> {
    if (this.app) {
      this.app.unmount();
      this.app = null;
    }
  }
  
  dispose(): void {
    this.unmount();
    this.container = null;
  }
}
```

### 3. 小程序渲染器

```typescript
class MiniAppRenderer implements IRenderer {
  ctx: any = null;
  
  async init(config: any): Promise<void> {
    this.ctx = config.context;
  }
  
  async render(schema: any): Promise<void> {
    // 转换为小程序模板
    const template = this.convertToTemplate(schema);
    
    // 设置小程序数据
    this.ctx.setData({
      renderData: this.parseSchema(schema)
    });
  }
  
  private convertToTemplate(schema: any): string {
    // 生成小程序 WXML 模板
    return `
      <view class="${schema.props.className || ''}">
        ${schema.children?.map((c: any) => 
          this.convertToTemplate(c)
        ).join('')}
      </view>
    `;
  }
  
  async unmount(): Promise<void> {
    this.ctx.setData({ renderData: null });
  }
  
  dispose(): void {
    this.ctx = null;
  }
}
```

## 📦 注册自定义渲染器

```typescript
import { init } from '@alilc/lowcode-engine';
import CustomRenderer from './custom-renderer';

// 注册渲染器插件
const rendererPlugin = {
  name: 'custom-renderer-plugin',
  exportName: 'CustomRendererPlugin',
  
  async init(editor) {
    // 设置自定义渲染器
    editor.setRenderer(new CustomRenderer());
  }
};

const editor = await init({
  schema: pageSchema,
  plugins: [rendererPlugin]
}, container);
```

## 🎯 渲染器优化

### 1. 增量渲染

```typescript
class OptimizedRenderer implements IRenderer {
  private prevTree: any = null;
  
  async render(schema: any): Promise<void> {
    const newTree = this.parseSchema(schema);
    
    // 计算差异
    const diff = this.diffTrees(this.prevTree, newTree);
    
    // 增量更新
    this.patch(diff);
    
    this.prevTree = newTree;
  }
  
  private diffTrees(prev: any, next: any): any {
    // 实现 diff 算法
    return { type: 'update', changes: [] };
  }
  
  private patch(diff: any): void {
    // 应用差异
  }
}
```

### 2. 虚拟列表

```typescript
private renderList(items: any[]): any {
  // 只渲染可见区域的项目
  const visibleItems = this.getVisibleItems(items);
  
  return visibleItems.map(item => 
    this.renderComponent(item)
  );
}
```

## 📖 下一步

- 阅读 [物料开发](/advanced/material-development) 开发自定义物料
- 阅读 [最佳实践](/advanced/best-practices)了解更多实践

---

上一篇：[自定义插件](/advanced/custom-plugin) · 下一篇：[物料开发](/advanced/material-development)