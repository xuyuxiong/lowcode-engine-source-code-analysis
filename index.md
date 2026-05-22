---
layout: home
hero:
  name: Lowcode Engine
  text: 源码深度解析
  tagline: 深入理解阿里巴巴低代码引擎架构与设计原理
  image:
    src: /logo.svg
    alt: Lowcode Engine Logo
  actions:
    - theme: brand
      text: 快速开始
      link: /guide/overview
    - theme: alt
      text: 查看源码
      link: https://github.com/alibaba/lowcode-engine
    - theme: alt
      text: 核心篇
      link: /core/engine-core

features:
  - icon: 📚
    title: 完整源码解析
    details: 从 Monorepo 结构到核心模块，全方位解析 Lowcode Engine 源码架构
  - icon: 🏗️
    title: 架构设计
    details: 深入理解编辑器核心、设计器、渲染器等关键模块的设计思想
  - icon: 🔌
    title: 插件系统
    details: 学习可扩展的插件架构设计，掌握自定义插件开发方法
  - icon: 📦
    title: 物料体系
    details: 解析物料描述协议、组件库集成与物料市场技术原理
  - icon: 🎨
    title: 渲染引擎
    details: 深入分析渲染器架构、页面渲染与组件渲染核心技术
  - icon: 🛠️
    title: 最佳实践
    details: 基于源码分析的工程实践与使用建议
---

<div class="home-intro">

## 🎯 为什么学习 Lowcode Engine？

Lowcode Engine 是阿里巴巴开源的企业级低代码引擎，代表了现代低代码技术体系的最佳实践。通过源码深度解析，你将学到：

- **可扩展的架构设计** - 理解如何设计一个可扩展的低代码平台
- **插件化系统** - 掌握大型企业级应用的模块化设计思想
- **Monorepo 实践** - 学习如何管理复杂的多包代码仓库
- **前端工程化** - 从源码中学习前端架构设计最佳实践

</div>

<div class="home-quick-links">

## 📖 快速导航

| 类型 | 文档 | 适合人群 |
|------|------|----------|
| 💡 指南篇 | [概览](/guide/overview) · [快速开始](/guide/quick-start) · [源码结构](/guide/source-structure) · [调试指南](/guide/debugging) | 初次接触源码 |
| 🏗️ 架构篇 | [整体架构](/architecture/overview) · [Monorepo](/architecture/monorepo) · [编辑器核心](/architecture/editor-core) · [渲染器](/architecture/renderer) | 架构师/技术负责人 |
| ⚙️ 核心篇 | [引擎核心](/core/engine-core) · [设计器](/core/designer) · [骨架层](/core/skeleton) · [插件系统](/core/plugin-system) | 核心开发者 |
| 🚀 进阶篇 | [自定义插件](/advanced/custom-plugin) · [自定义渲染器](/advanced/custom-renderer) · [物料开发](/advanced/material-development) · [最佳实践](/advanced/best-practices) | 二次开发工程师 |

</div>

<div class="home-project-structure">

## 📁 核心源码模块

```
packages/
├── engine/           # 引擎核心，统一出口
├── editor-core/      # 编辑器核心 API
├── designer/         # 设计器模块
├── editor-skeleton/  # 骨架层定义
├── plugin-*          # 各类插件实现
├── renderer-core/    # 渲染器核心
├── workspace/        # 工作区管理
└── types/            # TypeScript 类型定义
```

</div>

<div class="home-tech-stack">

## 🛠️ 技术栈

- **核心框架**: React + TypeScript
- **状态管理**: MobX
- **构建工具**: Lerna (Monorepo)
- **包管理**: npm/yarn
- **UI 组件**: @alifd/next
- **调试工具**: Chrome DevTools + 源码调试
</div>

<style>
.home-intro, .home-quick-links, .home-project-structure, .home-tech-stack {
  margin: 2rem 0;
  padding: 1.5rem;
  border-radius: 12px;
  background: linear-gradient(135deg, rgba(88,115,255,0.05) 0%, rgba(59,130,246,0.05) 100%);
}

.home-intro h2, .home-quick-links h2, .home-project-structure h2, .home-tech-stack h2 {
  margin-top: 0;
  font-size: 1.5rem;
  color: #1a1a1a;
}

.home-quick-links table {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
}

.home-quick-links td {
  padding: 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
}

.home-project-structure pre {
  margin: 1rem 0;
}
</style>