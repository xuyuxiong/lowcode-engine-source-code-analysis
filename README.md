# Lowcode Engine 源码深度解析

深入解析阿里低代码引擎 Lowcode Engine 的架构设计与实现原理。

## 项目结构

```
lowcode-engine-source-code-analysis/
├── guide/           # 使用指南
├── architecture/    # 架构设计
├── core/           # 核心模块
├── advanced/       # 进阶实践
└── index.md        # 首页
```

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run docs:dev

# 构建文档
npm run docs:build
```

## GitHub Pages 部署

本项目已配置 GitHub Actions 自动部署到 GitHub Pages。

### 自动部署触发条件
- 推送代码到 `main` 或 `master` 分支
- 手动触发（在 Actions 页面点击 "Run workflow"）

### 部署步骤

1. **启用 GitHub Pages**
   - 进入仓库 Settings → Pages
   - Source 选择 "GitHub Actions"

2. **首次部署**
   - 推送任意更改到主分支即可触发部署
   - 部署完成后访问 `https://[your-username].github.io/lowcode-engine-source-code-analysis/`

3. **查看部署状态**
   - 在仓库的 Actions 标签页查看部署进度
   - 绿色对勾表示部署成功

### 手动部署
如果需要手动部署，可以：
```bash
npm run docs:build
```
然后将 `.vitepress/dist` 目录的内容部署到 GitHub Pages。

## 访问地址
- 开发环境: `http://localhost:5173` (本地开发时使用)
- 生产环境: https://[your-username].github.io/lowcode-engine-source-code-analysis/

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

本项目基于 MIT 协议发布。

## 🤝 参与贡献

欢迎通过以下方式参与：

- 📝 提交 Issue 反馈问题
- 🔀 提交 Pull Request 补充内容
- 💬 参与讨论和建议

---

**Happy Coding! 🎉**