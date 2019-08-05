module.exports = {
  title: 'ARManual',
  description: 'Introduction to amateur radio',
  locales: {
    '/': {
      lang: 'en-US'
    },
    '/lt/': {
      lang: 'lt-LT',
      description: 'Įvadas į mėgėjišką radiją'
    }
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
        href: `/manifest.json`
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
    [
      'link',
      {
        rel: 'stylesheet',
        href: `https://api.tiles.mapbox.com/mapbox-gl-js/v0.53.0/mapbox-gl.css`
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
  plugins: {
    '@vuepress/pwa': {
      serviceWorker: true,
      updatePopup: {
        '/': {
          message: 'New content is available.',
          buttonText: 'Refresh'
        },
        '/lt/': {
          message: 'Puslapio turinys atnaujintas.',
          buttonText: 'Atnaujinti'
        }
      }
    },
    '@vuepress/google-analytics': {
      ga: 'UA-144249418-1'
    }
  },
  themeConfig: {
    repo: 'LRMD/ARManual',
    editLinks: true,
    docsDir: 'ARManual',
    algolia: {
      apiKey: '2f148ce036146414349f66708050eb31',
      indexName: 'armanual'
    },
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        sidebar: [
          {
            title: 'Ethics and operating procedures for the radio amateur',
            collapsable: true,
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
            title: 'Contribute',
            collapsable: true,
            children: ['/contribute/', '/contribute/markdown-tips']
          }
        ]
      },
      '/lt/': {
        label: 'Lietuvių',
        selectText: 'Kalba',
        editLinkText: 'Redaguoti šį puslapį',
        lastUpdated: 'Atnaujinta',
        sidebar: [
          {
            title: 'Radijo mėgėjo etikos ir darbo eteryje kodeksas',
            collapsable: true,
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
          {
            title: 'Prisidėkite',
            collapsable: true,
            children: ['/lt/contribute/', '/lt/contribute/markdown-tips']
          }
        ]
      }
    }
  }
};
