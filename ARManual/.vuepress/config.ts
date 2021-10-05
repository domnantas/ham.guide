
import { path } from '@vuepress/utils'

export default {
  title: 'ARManual',
  description: 'Introduction to amateur radio',
  locales: {
    '/': {
      lang: 'en-US'
    },
    '/lt/': {
      lang: 'lt-LT',
      description: 'Įvadas į mėgėjišką radiją'
    },
    '/es/': {
      lang: 'es-ES',
      description: 'Introduction a la radioafición'
    },
    '/ru/': {
      lang: 'ru-RU',
      description: 'Введение в любительскую радиосвязь'
    },
  },
  head: [
    [
      'link',
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: `/icons/apple-touch-icon.png`
      }
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: `/icons/favicon-32x32.png`
      }
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: `/icons/favicon-16x16.png`
      }
    ],
    [
      'link',
      {
        rel: 'manifest',
        href: `/manifest.webmanifest`
      }
    ],
    [
      'link',
      {
        rel: 'mask-icon',
        href: `/icons/safari-pinned-tab.svg`,
        color: '#647dee'
      }
    ],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'ARManual' }],
    ['meta', { name: 'application-name', content: 'ARManual' }],
    ['meta', { name: 'msapplication-TileColor', content: '#647dee' }],
    ['meta', { name: 'theme-color', content: '#647dee' }],
    [
      'meta',
      {
        property: 'og:image',
        content: 'https://armanual.org/icons/og-image.jpg'
      }
    ],
    ['meta', { property: 'og:title', content: 'ARManual' }],
    ['meta', { property: 'og:url', content: 'https://armanual.org' }],
    [
      'meta',
      {
        property: 'og:description',
        content:
          'Introduction to amateur radio - Open source, multilingual and works offline!'
      }
    ]
  ],
  themeConfig: {
    repo: 'LRMD/ARManual',
    editLinks: true,
    docsDir: 'ARManual',
    logo: '/logo.svg',
    sidebarDepth: 1,
    locales: {
      '/': {
        selectLanguageName: 'English',
        selectLanguageText: 'Languages',
        sidebar: [
          {
            text: 'Ethics and operating procedures for the radio amateur',
            children: [
              '/radio-operating-ethics/',
              '/radio-operating-ethics/radio-amateurs-code',
              '/radio-operating-ethics/introduction',
              '/radio-operating-ethics/general-operating',
              '/radio-operating-ethics/advanced-operating',
              '/radio-operating-ethics/authors'
            ]
          },
          '/phonetic-alphabet/',
          '/q-code/',
          '/dxcc-prefixes/',
          {
            text: 'Contribute',
            children: ['/contribute/', '/contribute/markdown-tips']
          }
        ]
      },
      '/lt/': {
        selectLanguageName: 'Lietuvių',
        selectLanguageText: 'Kalba',
        editLinkText: 'Redaguoti šį puslapį',
        lastUpdatedText: 'Atnaujinta',
        contributorsText: 'Autoriai',
        tip: 'PATARIMAS',
        warning: 'ĮSPĖJIMAS',
        danger: 'PAVOJUS',
        sidebar: [
          {
            text: 'Radijo mėgėjo etikos ir darbo eteryje kodeksas',
            children: [
              '/lt/radio-operating-ethics/',
              '/lt/radio-operating-ethics/radio-amateurs-code',
              '/lt/radio-operating-ethics/introduction',
              '/lt/radio-operating-ethics/general-operating',
              '/lt/radio-operating-ethics/advanced-operating',
              '/lt/radio-operating-ethics/authors',
              '/lt/radio-operating-ethics/translators-note'
            ]
          },
          '/lt/phonetic-alphabet/',
          '/lt/q-code/',
          '/lt/dxcc-prefixes/',
          '/lt/exam/',
          '/lt/lhfa/',
          '/lt/wal/',
          '/lt/qth/',
          {
            text: 'Prisidėkite',
            children: ['/lt/contribute/', '/lt/contribute/markdown-tips']
          }
        ]
      },
      '/es/': {
        selectLanguageName: 'Español',
        selectLanguageText: 'Idiomas',
        editLinkText: 'Editar',
        lastUpdatedText: 'Actualizado',
        contributorsText: 'Colaboradores',
        tip: 'SUGERENCIA',
        warning: 'ADVERTENCIA',
        danger: 'PELIGRO',
        sidebar: [
          {
            text: 'Ética y procedimientos de operación para radioaficionados',
            children: [
              '/radio-operating-ethics/',
              '/radio-operating-ethics/radio-amateurs-code',
              '/radio-operating-ethics/introduction',
              '/radio-operating-ethics/general-operating',
              '/radio-operating-ethics/advanced-operating',
              '/radio-operating-ethics/authors'
            ]
          },
          '/phonetic-alphabet/',
          '/q-code/',
          '/dxcc-prefixes/',
          {
            text: 'Contribuye',
            children: ['/contribute/', '/contribute/markdown-tips']
          }
        ]
      },
      '/ru/': {
        selectLanguageName: 'Русский',
        selectLanguageText: 'Язык',
        editLinkText: 'Изменить',
        lastUpdatedText: 'Обновлено',
        contributorsText: 'Соавторы',
        tip: 'ПОДСКАЗКА',
        warning: 'ПРЕДУПРЕЖДЕНИЕ',
        danger: 'ОПАСНОСТЬ',
        sidebar: [
          {
            text: 'Этика и правила работы радиолюбителя',
            children: [
              '/radio-operating-ethics/',
              '/radio-operating-ethics/radio-amateurs-code',
              '/radio-operating-ethics/introduction',
              '/radio-operating-ethics/general-operating',
              '/radio-operating-ethics/advanced-operating',
              '/radio-operating-ethics/authors'
            ]
          },
          '/phonetic-alphabet/',
          '/ru/q-code/',
          '/dxcc-prefixes/',
          {
            text: 'Участие в проекте',
            children: ['/contribute/', '/contribute/markdown-tips']
          }
        ]
      },
    }
  },
  plugins: [
    [
      '@vuepress/register-components',
      {
        componentsDir: path.resolve(__dirname, './components'),
      },
    ],
    [
      '@vuepress/docsearch',
      {
        apiKey: '2f148ce036146414349f66708050eb31',
        indexName: 'armanual',
        locales: {
          '/': {
            placeholder: 'Search',
          },
          '/lt/': {
            placeholder: 'Paieška',
          },
          '/es/': {
            placeholder: 'Buscar',
          },
          '/ru/': {
            placeholder: 'Поиск',
          },
        },
      },
    ],
    [
      '@vuepress/plugin-google-analytics',
      {
        id: 'G-9BCS1N7E1G',
      },
    ],
    [
      '@vuepress/pwa',
      {
        skipWaiting: true,
      },
    ],
  ],
};
