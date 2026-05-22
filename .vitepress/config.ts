import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'Lowcode Engine 源码解析',
  titleTemplate: ':title - Lowcode Engine 源码深度解析',
  description: '深入解析阿里巴巴 Lowcode Engine 源码架构与设计原理',
  base: '/lowcode-engine-source-code-analysis/',
  lastUpdated: true,
  cleanUrls: true,

  head: [
    ['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'theme-color', content: '#5873ff' }],
    ['meta', { name: 'keywords', content: 'lowcode, low-code, engine, source code, analysis, 低代码，源码解析' }]
  ],

  themeConfig: {
    logo: {
      src: '/logo.svg',
      width: 24,
      height: 24
    },

    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/overview' },
      { text: '架构', link: '/architecture/overview' },
      { text: '核心', link: '/core/engine-core' },
      { text: '进阶', link: '/advanced/custom-plugin' }
    ],

    sidebar: {
      '/guide/': [
        {
          text: '💡 指南篇',
          items: [
            { text: '概览', link: '/guide/overview' },
            { text: '快速开始', link: '/guide/quick-start' },
            { text: '源码结构', link: '/guide/source-structure' },
            { text: '调试指南', link: '/guide/debugging' }
          ]
        }
      ],
      '/architecture/': [
        {
          text: '🏗️ 架构篇',
          items: [
            { text: '整体架构', link: '/architecture/overview' },
            { text: 'Monorepo 结构', link: '/architecture/monorepo' },
            { text: '编辑器核心', link: '/architecture/editor-core' },
            { text: '渲染器架构', link: '/architecture/renderer' }
          ]
        }
      ],
      '/core/': [
        {
          text: '⚙️ 核心篇',
          items: [
            { text: '引擎核心', link: '/core/engine-core' },
            { text: '设计器', link: '/core/designer' },
            { text: '骨架层', link: '/core/skeleton' },
            { text: '工作区', link: '/core/workspace' },
            { text: '插件系统', link: '/core/plugin-system' },
            { text: '物料系统', link: '/core/material' },
            { text: '设置器', link: '/core/setters' },
            { text: 'Outline 树', link: '/core/outline-tree' },
            { text: '命令插件', link: '/core/plugin-command' },
            { text: '页面组装器', link: '/core/ignitor' }
          ]
        }
      ],
      '/advanced/': [
        {
          text: '🚀 进阶篇',
          items: [
            { text: '自定义插件', link: '/advanced/custom-plugin' },
            { text: '自定义渲染器', link: '/advanced/custom-renderer' },
            { text: '物料开发', link: '/advanced/material-development' },
            { text: '最佳实践', link: '/advanced/best-practices' },
            { text: '常见问题', link: '/advanced/faq' }
          ]
        }
      ]
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/alibaba/lowcode-engine' }
    ],

    outline: {
      label: '本页目录',
      level: [2, 3]
    },

    footer: {
      message: '基于 MIT 协议发布',
      copyright: 'Copyright © 2025 Lowcode Engine 源码解析'
    },

    search: {
      provider: 'local',
      options: {
        locales: {
          root: {
            translations: {
              button: {
                buttonText: '搜索文档',
                buttonAriaLabel: '搜索文档'
              },
              modal: {
                noResultsText: '无法找到相关结果',
                resetButtonTitle: '清除查询条件',
                footer: {
                  selectText: '选择',
                  navigateText: '切换'
                },
                displayDetails: '显示详细信息'
              }
            }
          }
        }
      }
    }
  },

  markdown: {
    lineNumbers: true,
    image: {
      lazyLoading: true
    }
  }
})