---
title: 设置器
description: 属性设置器和表单组件
---

# 设置器

本章节解析 Lowcode Engine 的设置器系统和实现。

## 🎯 设置器概述

设置器（Setter）是用于**编辑节点属性**的表单组件，不同的属性类型对应不同的设置器。

## 📋 内置设置器

| 设置器 | 用途 |
|--------|------|
| `StringSetter` | 字符串输入 |
| `NumberSetter` | 数字输入 |
| `BooleanSetter` | 布尔开关 |
| `SelectSetter` | 下拉选择 |
| `RadioGroupSetter` | 单选框组 |
| `CheckboxGroupSetter` | 复选框组 |
| `JsonSetter` | JSON 编辑 |
| `CodeEditorSetter` | 代码编辑器 |
| `DateSetter` | 日期选择 |
| `ColorSetter` | 颜色选择 |
| `ImageSetter` | 图片选择 |

## 🔧 开发自定义设置器

### 1. 基础设置器

```typescript
import React from 'react';

interface MySetterProps {
  value?: any;
  onChange?: (value: any) => void;
  placeholder?: string;
}

const MySetter: React.FC<MySetterProps> = ({ 
  value, 
  onChange,
  placeholder 
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };
  
  return (
    <input
      type="text"
      value={value || ''}
      onChange={handleChange}
      placeholder={placeholder}
      className="my-setter"
    />
  );
};

export default MySetter;
```

### 2. 复杂设置器

```typescript
import React, { useState } from 'react';

interface RangeSetterProps {
  value?: [number, number];
  onChange?: (value: [number, number]) => void;
  min?: number;
  max?: number;
}

const RangeSetter: React.FC<RangeSetterProps> = ({
  value = [0, 100],
  onChange,
  min = 0,
  max = 100
}) => {
  const [range, setRange] = useState<[number, number]>(value);
  
  const handleChange = (index: number, newValue: number) => {
    const newRange = [...range] as [number, number];
    newRange[index] = newValue;
    setRange(newRange);
    onChange?.(newRange);
  };
  
  return (
    <div className="range-setter">
      <input
        type="number"
        value={range[0]}
        min={min}
        max={range[1]}
        onChange={(e) => handleChange(0, Number(e.target.value))}
      />
      <span> - </span>
      <input
        type="number"
        value={range[1]}
        min={range[0]}
        max={max}
        onChange={(e) => handleChange(1, Number(e.target.value))}
      />
    </div>
  );
};

export default RangeSetter;
```

## 📝 设置器配置

```typescript
// 在物料元数据中使用
{
  name: 'color',
  title: '颜色',
  setter: {
    componentName: 'ColorPickerSetter',
    props: {
      defaultFormat: 'rgb',
      showAlpha: true
    },
    initialValue: 'rgba(255, 255, 255, 1)'
  }
}
```

## 📖 下一步

- 阅读 [Outline 树](/core/outline-tree) 了解页面结构树
- 阅读 [命令插件](/core/plugin-command) 了解命令系统

---

上一篇：[物料系统](/core/material) · 下一篇：[Outline 树](/core/outline-tree)