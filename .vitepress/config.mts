import { defineConfig, type DefaultTheme } from 'vitepress'
import markdownItRuby from 'markdown-it-ruby'
import markdownItFootnote from 'markdown-it-footnote'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Nostr!moe - 消息视图主导的社区",
  description: "社区指南和文档中心",
  lang: "zh-Hans",
  lastUpdated: true,
  metaChunk: true,
  srcExclude: ['**/README.md'],
  head: [
    ['link',
      { rel: 'icon', href: '/favicon.ico', sizes: '32x32' }
    ],
    ['link',
      { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' }
    ],
    ['link',
      { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' }
    ],
    ['link',
      { rel: 'manifest', href: '/manifest.webmanifest' }
    ],
    ['meta',
      { property: 'og:locale', content: "zh_CN" }
    ],
    ['meta',
      { property: 'og:image', content: "https://join.nostr.moe/logo-white-256.webp" }
    ],
    ['meta',
      { name: 'twitter:card', content: "summary" }
    ],
    ['meta',
      { name: 'twitter:image', content: "https://join.nostr.moe/logo-white-256.webp" }
    ],
    [
      'link',
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' }
    ],
    [
      'link',
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' }
    ],
    [
      'link',
      { href: 'https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@100..900&family=Noto+Serif+SC:wght@200..900&display=swap', rel: 'stylesheet' }
    ],
    [
      'script',
      {},
      `const isWindowsDevice = /Windows/i.test(navigator.platform) || /Windows/i.test(navigator.userAgent);
      document.documentElement.classList.toggle('windows', isWindowsDevice);`
    ]
  ],
  markdown: {
    lineNumbers: true,
    container: {
      tipLabel: '提示',
      warningLabel: '警告',
      dangerLabel: '危险',
      infoLabel: '信息',
      detailsLabel: '详情'
    },
    config: (md) => {
      // 使用更多的 Markdown-it 插件！
      md.use(markdownItRuby),
      md.use(markdownItFootnote)
    }
  },
  sitemap: {
    hostname: 'https://join.nostr.moe'
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    siteTitle: 'Nostr!moe',
    logo: "/logo-mini.svg",
    nav: [
      {
        text: '开始',
        link: '/start/',
        activeMatch: '/start/'
      },
      {
        text: '资源',
        link: '/resources/community-infrastructure/',
        activeMatch: '/resources/'
      },
      {
        text: '客户端',
        items: [
          { text: '常规版', link: 'https://nostr.moe/'},
          { text: '专业版', link: 'https://pro.nostr.moe/'}
        ]
      }
    ],
    sidebar: {
      '/start/': {
        base: '/start/',
        items: [
          {
            text: '新手教程',
            items: [
              { text: '快速加入 Nostr 网络', link: '/' },
              { text: '申请加入 Nostr!moe 社区', link: 'apply/' },
              { text: '常用操作', link: 'common-operations/'}
            ]
          },
          {
            text: '高级教程',
            items: [
              { text: '高级密钥生成指南', link: 'become-hacker/'},
              { text: '设置域名身份标识', link: 'become-hacker/domain-identity/'},
              { text: '手动管理元数据', link: 'become-hacker/manually-managing-metadata/'},
              { text: 'Android 密钥管理', link: 'become-hacker/android-key-management/'},
              { text: '使用远程签名器', link: 'become-hacker/remote-signer/'},
              { text: '从 Android 设备上接收通知', link: 'become-hacker/receive-notifications-on-android-devices/'}
            ]
          },
          {
            text: '理论概念',
            items: [
              { text: '为什么是 Nostr?', link: 'why-nostr/' },
              { text: '抗审查的 Nostr 如何抗击滥用?', link: 'why-nostr/anti-abuse-and-anti-censorship/' }
            ]
          }
        ]
      },
      '/resources/': {
        base: '/resources/',
        items: [
            {
              text: '社区设施', link: 'community-infrastructure/'
            }
        ]
      }
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/cxplay/join.nostr.moe' }
    ],
    search: {
      provider: 'local',
      options: searchOptions()
    },
    footer: {
      message: '<a href="https://status.nostr.moe" target="_blank">运行状态</a>',
      copyright: 'Nostr!moe © CC BY-NC-SA 4.0'
    },
    langMenuLabel: '多语言',
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '色彩模式',
    lightModeSwitchTitle: '切换到浅色模式',
    darkModeSwitchTitle: '切换到深色模式',
    skipToContentLabel: '跳转到内容',
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    outline: {
      label: '页面导航',
      level: 'deep'
    },
    lastUpdated: {
      text: '最后更新于'
    },
    notFound: {
      title: '页面未找到',
      quote:
        '但如果你不改变方向，并且继续寻找，你可能最终会到达你所前往的地方。',
      linkLabel: '前往首页',
      linkText: '带我回首页'
    }
  }
})

function searchOptions(): Partial<DefaultTheme.LocalSearchOptions> {
  return {
    placeholder: '搜索文档',
    translations: {
      button: {
        buttonText: '搜索文档',
        buttonAriaLabel: '搜索文档'
      },
      modal: {
        searchBox: {
          resetButtonTitle: '清除查询条件',
          resetButtonAriaLabel: '清除查询条件',
          cancelButtonText: '取消',
          cancelButtonAriaLabel: '取消'
        },
        startScreen: {
          recentSearchesTitle: '搜索历史',
          noRecentSearchesText: '没有搜索历史',
          saveRecentSearchButtonTitle: '保存至搜索历史',
          removeRecentSearchButtonTitle: '从搜索历史中移除',
          favoriteSearchesTitle: '收藏',
          removeFavoriteSearchButtonTitle: '从收藏中移除'
        },
        errorScreen: {
          titleText: '无法获取结果',
          helpText: '你可能需要检查你的网络连接'
        },
        footer: {
          selectText: '选择',
          navigateText: '切换',
          closeText: '关闭',
          searchByText: '搜索提供者'
        },
        noResultsScreen: {
          noResultsText: '无法找到相关结果',
          suggestedQueryText: '你可以尝试查询',
          reportMissingResultsText: '你认为该查询应该有结果？',
          reportMissingResultsLinkText: '点击反馈'
        }
      }
    }
  }
}
