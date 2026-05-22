import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Lowcode Engine 源码深度解析',
  description: '深入解析 Lowcode Engine 的架构设计与实现原理',
  base: '/lowcode-engine-source-code-analysis/',
  themeConfig: {
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/overview' },
      { text: '架构', link: '/architecture/overview' },
      { text: '核心', link: '/core/engine-core' }
    ],
    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: [
            { text: '概览', link: '/guide/overview' },
            { text: '快速开始', link: '/guide/quick-start' },
            { text: '源码结构', link: '/guide/source-structure' },
            { text: '调试技巧', link: '/guide/debugging' }
          ]
        }
      ],
      '/architecture/': [
        {
          text: '架构设计',
          items: [
            { text: '概览', link: '/architecture/overview' },
            { text: '编辑器核心', link: '/architecture/editor-core' },
            { text: '渲染器', link: '/architecture/renderer' },
            { text: 'Monorepo 架构', link: '/architecture/monorepo' }
          ]
        }
      ],
      '/core/': [
        {
          text: '核心模块',
          items: [
            { text: '引擎核心', link: '/core/engine-core' },
            { text: '设计器', link: '/core/designer' },
            { text: '物料系统', link: '/core/material' },
            { text: '插件系统', link: '/core/plugin-system' },
            { text: '插件命令', link: '/core/plugin-command' },
            { text: '大纲树', link: '/core/outline-tree' },
            { text: '配置器', link: '/core/setters' },
            { text: '骨架', link: '/core/skeleton' },
            { text: '工作空间', link: '/core/workspace' },
            { text: '启动器', link: '/core/ignitor' }
          ]
        }
      ],
      '/advanced/': [
        {
          text: '进阶实践',
          items: [
            { text: '概览', link: '/advanced/overview' },
            { text: '最佳实践', link: '/advanced/best-practices' },
            { text: '自定义插件', link: '/advanced/custom-plugin' },
            { text: '自定义渲染器', link: '/advanced/custom-renderer' },
            { text: '物料开发', link: '/advanced/material-development' },
            { text: 'FAQ', link: '/advanced/faq' }
          ]
        }
      ]
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/your-username/lowcode-engine-source-code-analysis' }
    ]
  }
})