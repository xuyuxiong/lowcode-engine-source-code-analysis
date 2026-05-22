# Lowcode Engine 源码深度解析

> 深入理解阿里巴巴低代码引擎架构与设计原理

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![VitePress](https://img.shields.io/badge/VitePress-1.x-green.svg)](https://vitepress.dev/)
[![Lowcode Engine](https://img.shields.io/badge/Lowcode%20Engine-1.3.2-orange.svg)](https://github.com/alibaba/lowcode-engine)

## 📖 项目简介

本项目是对阿里巴巴开源的 [Lowcode Engine](https://github.com/alibaba/lowcode-engine) 进行源码深度解析的文档站点。通过分析源码结构、核心模块实现和架构设计，帮助开发者深入理解低代码引擎的技术原理。

## 🎯 适合人群

- 🔍 **源码阅读者** - 希望深入理解 Lowcode Engine 源码
- 🏗️ **架构师** - 学习大型前端项目的架构设计
- 🔧 **开发者** - 进行二次开发和自定义扩展
- 📚 **学习者** - 学习低代码技术体系

## 📚 文档结构

```
指南篇 → 架构篇 → 核心篇 → 进阶篇
```

| 篇章 | 文档数 | 内容 |
|------|--------|------|
| 💡 指南篇 | 4 篇 | 概览、快速开始、源码结构、调试指南 |
| 🏗️ 架构篇 | 4 篇 | 整体架构、Monorepo、编辑器核心、渲染器架构 |
| ⚙️ 核心篇 | 10 篇 | 引擎核心、设计器、骨架层、工作区、插件系统等 |
| 🚀 进阶篇 | 5 篇 | 自定义插件、自定义渲染器、物料开发、最佳实践、FAQ |

## 🚀 快速开始

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
npm run docs:dev
```

访问 `http://localhost:5173` 查看文档站点。

### 构建

```bash
npm run docs:build
```

### 预览

```bash
npm run docs:preview
```

## 📁 项目结构

```
lowcode-engine-source-code-analysis/
├── .vitepress/              # VitePress 配置
│   ├── config.ts           # 站点配置
│   └── components/         # 自定义组件
├── guide/                   # 指南篇
│   ├── overview.md
│   ├── quick-start.md
│   ├── source-structure.md
│   └── debugging.md
├── architecture/            # 架构篇
│   ├── overview.md
│   ├── monorepo.md
│   ├── editor-core.md
│   └── renderer.md
├── core/                    # 核心篇
│   ├── engine-core.md
│   ├── designer.md
│   ├── skeleton.md
│   ├── workspace.md
│   ├── plugin-system.md
│   ├── material.md
│   ├── setters.md
│   ├── outline-tree.md
│   ├── plugin-command.md
│   └── ignitor.md
├── advanced/                # 进阶篇
│   ├── overview.md
│   ├── custom-plugin.md
│   ├── custom-renderer.md
│   ├── material-development.md
│   ├── best-practices.md
│   └── faq.md
├── public/                  # 静态资源
│   └── logo.svg
├── index.md                 # 首页
├── README.md                # 项目说明
└── package.json             # 项目配置
```

## 🔗 相关链接

- [Lowcode Engine 官方仓库](https://github.com/alibaba/lowcode-engine)
- [Lowcode Engine 官方文档](https://lowcode-engine.cn/)
- [VitePress 官方文档](https://vitepress.dev/)

## 📝 许可证

本项目基于 [MIT 协议](LICENSE) 发布。

## 🤝 参与贡献

欢迎通过以下方式参与：

- 📝 提交 Issue 反馈问题
- 🔀 提交 Pull Request 补充内容
- 💬 参与讨论和建议

---

**Happy Coding! 🎉**