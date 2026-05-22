---
title: 物料系统
description: 物料描述协议和物料管理
---

# 物料系统

本章节解析 Lowcode Engine 的物料系统和物料描述协议。

## 🎯 物料系统概述

物料系统是 Lowcode Engine 的**组件库管理体系**，负责：

- 📦 **物料描述** - 标准化的组件描述协议
- 🏪 **物料市场** - 组件的注册和管理
- 🔌 **组件加载** - 动态加载组件和依赖

## 📋 物料描述协议 (NPM Schema)

```typescript
interface ComponentMetadata {
  // 组件名
  componentName: string;
  
  // 标题
  title: string;
  
  // 描述
  description?: string;
  
  // 图标
  icon?: string;
  
  // 分类
  category: string;
  
  // 组件加载方式
  npm?: {
    package: string;
    version: string;
    exportName: string;
    main: string;
  };
  
  // 属性配置
  props?: Array<{
    name: string;
    title: string;
    setter: string | SetterConfig;
    defaultValue?: any;
    extraProps?: any;
  }>;
  
  // 配置项
  configure?: {
    props?: any;
    supports?: {
      style?: boolean;
      className?: boolean;
    };
  };
  
  // 高级配置
  advanced?: {
    callbacks?: any;
    initializes?: any;
  };
}
```

## 📁 源码结构

```
packages/engine/src/materials/
├── material.ts                  # 物料主类
├── component-meta.ts            # 组件元数据
└── loader.ts                    # 加载器
```

## 🔧 核心类

### 物料管理

```typescript
class Materials {
  editor: Editor;
  
  // 物料注册表
  @observable componentsMap: Map<string, ComponentMeta> = new Map();
  
  // 注册物料
  register(componentMeta: ComponentMeta): void {
    this.componentsMap.set(
      componentMeta.componentName,
      componentMeta
    );
  }
  
  // 获取物料
  getComponent(componentName: string): ComponentMeta | null {
    return this.componentsMap.get(componentName) || null;
  }
  
  // 获取所有物料
  getMaterials(): ComponentMeta[] {
    return Array.from(this.componentsMap.values());
  }
}
```

## 📋 物料配置示例

```typescript
// 按钮组件物料描述
export const ButtonMetadata: ComponentMetadata = {
  componentName: 'Button',
  title: '按钮',
  category: '基础',
  icon: 'https://img.alicdn.com/tfs/button.svg',
  
  // npm 包配置
  npm: {
    package: '@alilc/lowcode-materials',
    version: '1.0.0',
    exportName: 'Button',
    main: 'lib/index.js'
  },
  
  // 属性配置
  props: [
    {
      name: 'type',
      title: '类型',
      setter: {
        componentName: 'RadioGroupSetter',
        props: {
          options: [
            { label: '默认', value: 'default' },
            { label: '主要', value: 'primary' },
            { label: '成功', value: 'success' }
          ]
        }
      },
      defaultValue: 'default'
    },
    {
      name: 'size',
      title: '尺寸',
      setter: {
        componentName: 'RadioGroupSetter',
        props: {
          options: [
            { label: '小', value: 'small' },
            { label: '中', value: 'medium' },
            { label: '大', value: 'large' }
          ]
        }
      },
      defaultValue: 'medium'
    },
    {
      name: 'children',
      title: '内容',
      setter: 'StringSetter'
    }
  ],
  
  // 配置
  configure: {
    supports: {
      style: true,
      className: true,
      events: true
    }
  }
};
```

## 📖 下一步

- 阅读 [设置器](/core/setters) 了解属性配置器
- 阅读 [Outline 树](/core/outline-tree) 了解页面结构树
- 阅读 [自定义插件](/advanced/custom-plugin) 开发插件

---

上一篇：[插件系统](/core/plugin-system) · 下一篇：[设置器](/core/setters)