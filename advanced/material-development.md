---
title: 物料开发
description: 低代码物料开发完整指南
---

# 物料开发

本章节指导如何开发和发布 Lowcode Engine 物料。

## 🎯 物料概述

物料是 Lowcode Engine 的**基础构建单元**，包含：

- 🧩 **组件元数据** - 描述组件的结构和属性
- 🎨 **渲染逻辑** - 组件的实际渲染代码
- ⚙️ **配置器** - 组件的属性配置面板
- 📋 **设置器** - 属性编辑器组件

## 📦 物料结构

```
my-materials/
├── src/
│   ├── components/           # 组件目录
│   │   ├── Button/
│   │   │   ├── index.tsx     # 组件实现
│   │   │   ├── meta.ts       # 元数据配置
│   │   │   └── setter.ts     # 设置器
│   │   └── Input/
│   │       └── ...
│   ├── setters/              # 自定义设置器
│   │   └── custom-setter.tsx
│   └── index.ts              # 统一入口
├── build.json                  # 构建配置
├── package.json
└── README.md
```

## 🔧 开发步骤

### 1. 创建组件

```typescript
// src/components/Button/index.tsx
import React from 'react';

interface ButtonProps {
  type?: 'primary' | 'default' | 'danger';
  size?: 'small' | 'medium' | 'large';
  children?: React.ReactNode;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {
  const { type = 'default', size = 'medium', children, onClick } = props;
  
  return (
    <button 
      className={`btn btn-${type} btn-${size}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
```

### 2. 配置元数据

```typescript
// src/components/Button/meta.ts
export default {
  componentName: 'Button',
  title: '按钮',
  category: '基础组件',
  group: '基础元素',
  icon: 'https://img.alicdn.com/tfs/button-icon.svg',
  
  // npm 包信息
  npm: {
    package: '@your-org/my-materials',
    version: '1.0.0',
    exportName: 'Button',
    main: 'lib/index.js'
  },
  
  // 属性配置
  props: [
    {
      name: 'type',
      title: '按钮类型',
      setter: {
        componentName: 'RadioGroupSetter',
        props: {
          options: [
            { label: '默认', value: 'default', icon: 'default' },
            { label: '主要', value: 'primary', icon: 'primary' },
            { label: '危险', value: 'danger', icon: 'danger' }
          ]
        }
      },
      defaultValue: 'default'
    },
    {
      name: 'size',
      title: '尺寸',
      setter: {
        componentName: 'SelectSetter',
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
      setter: 'StringSetter',
      defaultValue: '按钮'
    }
  ],
  
  // 配置
  configure: {
    supports: {
      style: true,
      className: true,
      events: true,
      loops: true,
      condition: true
    }
  }
};
```

### 3. 开发设置器

```typescript
// src/setters/ColorSetter.tsx
import React, { useState } from 'react';
import { SketchPicker } from 'react-color';

interface ColorSetterProps {
  value?: string;
  onChange?: (value: string) => void;
}

const ColorSetter: React.FC<ColorSetterProps> = ({ value, onChange }) => {
  const [color, setColor] = useState(value || '#5873ff');
  const [showPicker, setShowPicker] = useState(false);
  
  return (
    <div className="color-setter">
      <div 
        className="color-preview"
        style={{ backgroundColor: color }}
        onClick={() => setShowPicker(!showPicker)}
      />
      {showPicker && (
        <SketchPicker
          color={color}
          onChange={(newColor) => {
            setColor(newColor.hex);
            onChange?.(newColor.hex);
          }}
          onBlur={() => setShowPicker(false)}
        />
      )}
    </div>
  );
};

export default ColorSetter;
```

### 4. 注册物料

```typescript
// src/index.ts
import ButtonMeta from './components/Button/meta';
import Button from './components/Button';

// 导出物料
export const materials = [
  {
    ...ButtonMeta,
    component: Button
  }
];

// 导出设置器
export * from './setters';
```

### 5. 构建配置

```json
// build.json
{
  "plugins": [
    [
      "@alib/build-plugin-fusion",
      {
        "themePackage": "@alifd/theme-lowcode-dark"
      }
    ],
    "@alilc/build-plugin-lce-materials"
  ]
}
```

## 📦 发布物料

### package.json

```json
{
  "name": "@your-org/my-materials",
  "version": "1.0.0",
  "description": "我的低代码物料库",
  "main": "lib/index.js",
  "module": "es/index.js",
  "types": "es/index.d.ts",
  "files": ["lib", "es", "dist"],
  "lceMaterial": true,
  "scripts": {
    "build": "lce-materials-build",
    "start": "lce-materials-start"
  }
}
```

### 发布流程

```bash
# 构建
npm run build

# 发布到 npm
npm publish

# 同步到 CDN
tnpm syncOss
```

## 🎯 物料使用

```typescript
import { materials } from '@your-org/my-materials';

// 在引擎中注册
editor.materials.registerMetadata(materials);
```

## 📖 下一步

- 阅读 [最佳实践](/advanced/best-practices)了解更多技巧
- 阅读 [常见问题](/advanced/faq)解决常见问题

---

上一篇：[自定义渲染器](/advanced/custom-renderer) · 下一篇：[最佳实践](/advanced/best-practices)