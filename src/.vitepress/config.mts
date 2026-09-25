import { defineConfig } from "vitepress";
import { withPwa } from "@vite-pwa/vitepress";
import { fileURLToPath } from "node:url";
import { loadEnv } from "vite";

const envDir = fileURLToPath(new URL("../..", import.meta.url));

if (!loadEnv("", envDir, "VITE_").VITE_MAPBOX_TOKEN) {
  console.warn("VITE_MAPBOX_TOKEN is not set, map pages will not load. See .env.example");
}

const brandColor = "#647dee";

export default withPwa(
  defineConfig({
    title: "ham.guide",
    description: "Introduction to amateur radio",
    lastUpdated: true,
    locales: {
      root: {
        label: "English",
        lang: "en-US",
        themeConfig: {
          nav: [
            { text: "Bandplan", link: "https://bandplan.ham.guide" },
            {
              text: "Changelog",
              link: "https://github.com/domnantas/ham.guide/blob/main/CHANGELOG.md",
            },
          ],
          sidebar: [
            {
              text: "Ethics and operating procedures for the radio amateur",
              items: [
                { text: "Overview", link: "/radio-operating-ethics/" },
                {
                  text: "The Radio Amateur's Code",
                  link: "/radio-operating-ethics/radio-amateurs-code",
                },
                { text: "Introduction", link: "/radio-operating-ethics/introduction" },
                {
                  text: "General operating",
                  link: "/radio-operating-ethics/general-operating",
                },
                {
                  text: "Advanced operating",
                  link: "/radio-operating-ethics/advanced-operating",
                },
                { text: "The authors", link: "/radio-operating-ethics/authors" },
              ],
            },
            {
              text: "Reference",
              items: [
                { text: "International Phonetic Alphabet", link: "/phonetic-alphabet/" },
                { text: "The Q Code", link: "/q-code/" },
                { text: "DXCC prefixes", link: "/dxcc-prefixes/" },
              ],
            },
            {
              text: "Contribute",
              items: [
                { text: "Guide", link: "/contribute/" },
                { text: "Markdown tips", link: "/contribute/markdown-tips" },
              ],
            },
          ],
          footer: {
            message: "MIT Licensed",
            copyright: "Copyright © 2018 Domantas Vasiliauskas LY1JA",
          },
        },
      },
      lt: {
        label: "Lietuvių",
        lang: "lt-LT",
        description: "Įvadas į mėgėjišką radiją",
        themeConfig: {
          nav: [
            {
              text: "Pakeitimai",
              link: "https://github.com/domnantas/ham.guide/blob/main/CHANGELOG.md",
            },
          ],
          sidebar: [
            {
              text: "Radijo mėgėjo etikos ir darbo eteryje kodeksas",
              items: [
                { text: "Apžvalga", link: "/lt/radio-operating-ethics/" },
                {
                  text: "Radijo mėgėjo kodeksas pagal W9EEA",
                  link: "/lt/radio-operating-ethics/radio-amateurs-code",
                },
                { text: "Įvadas", link: "/lt/radio-operating-ethics/introduction" },
                {
                  text: "Darbas radijo eteryje",
                  link: "/lt/radio-operating-ethics/general-operating",
                },
                {
                  text: "Darbas eteryje pažengusiems",
                  link: "/lt/radio-operating-ethics/advanced-operating",
                },
                { text: "Autoriai", link: "/lt/radio-operating-ethics/authors" },
                {
                  text: "Vertėjų žodis",
                  link: "/lt/radio-operating-ethics/translators-note",
                },
              ],
            },
            {
              text: "Žinynas",
              items: [
                { text: "Tarptautinė fonetinė abėcėlė", link: "/lt/phonetic-alphabet/" },
                { text: "Tarptautinis Q kodas", link: "/lt/q-code/" },
                { text: "DXCC prefiksai", link: "/lt/dxcc-prefixes/" },
                { text: "Egzaminas", link: "/lt/exam/" },
              ],
            },
            {
              text: "Žemėlapiai",
              items: [
                { text: "LHFA žemėlapis", link: "/lt/lhfa/" },
                { text: "WAL žemėlapis", link: "/lt/wal/" },
                { text: "QTH", link: "/lt/qth/" },
              ],
            },
            {
              text: "Prisidėkite",
              items: [
                { text: "Gidas", link: "/lt/contribute/" },
                { text: "Markdown patarimai", link: "/lt/contribute/markdown-tips" },
              ],
            },
          ],
          footer: {
            message: "MIT Licencija",
            copyright: "Copyright © 2018 Domantas Vasiliauskas LY1JA",
          },
          editLink: {
            pattern: "https://github.com/domnantas/ham.guide/edit/main/src/:path",
            text: "Redaguoti šį puslapį",
          },
          lastUpdated: { text: "Atnaujinta" },
          outline: { label: "Šiame puslapyje" },
          docFooter: { prev: "Ankstesnis", next: "Kitas" },
          langMenuLabel: "Kalba",
          returnToTopLabel: "Į viršų",
          sidebarMenuLabel: "Meniu",
          darkModeSwitchLabel: "Tema",
          lightModeSwitchTitle: "Šviesi tema",
          darkModeSwitchTitle: "Tamsi tema",
          notFound: {
            title: "PUSLAPIS NERASTAS",
            quote: "Šis puslapis neegzistuoja.",
            linkText: "Į pradžią",
          },
        },
      },
      es: {
        label: "Español",
        lang: "es-ES",
        description: "Introducción a la radioafición",
        themeConfig: {
          nav: [
            {
              text: "Cambios",
              link: "https://github.com/domnantas/ham.guide/blob/main/CHANGELOG.md",
            },
          ],
          sidebar: [
            {
              text: "Referencia",
              items: [
                { text: "Alfabeto fonético internacional", link: "/es/phonetic-alphabet/" },
                { text: "Código Q", link: "/es/q-code/" },
              ],
            },
            {
              text: "Contribuye",
              items: [
                { text: "Guía", link: "/contribute/" },
                { text: "Consejos de Markdown", link: "/contribute/markdown-tips" },
              ],
            },
          ],
          footer: {
            message: "Licencia MIT",
            copyright: "Copyright © 2018 Domantas Vasiliauskas LY1JA",
          },
          editLink: {
            pattern: "https://github.com/domnantas/ham.guide/edit/main/src/:path",
            text: "Editar",
          },
          lastUpdated: { text: "Actualizado" },
          outline: { label: "En esta página" },
          docFooter: { prev: "Anterior", next: "Siguiente" },
          langMenuLabel: "Idiomas",
          returnToTopLabel: "Volver arriba",
          sidebarMenuLabel: "Menú",
          darkModeSwitchLabel: "Tema",
          lightModeSwitchTitle: "Tema claro",
          darkModeSwitchTitle: "Tema oscuro",
          notFound: {
            title: "PÁGINA NO ENCONTRADA",
            quote: "Esta página no existe.",
            linkText: "Ir al inicio",
          },
        },
      },
      ru: {
        label: "Русский",
        lang: "ru-RU",
        description: "Введение в любительскую радиосвязь",
        themeConfig: {
          nav: [
            {
              text: "Изменения",
              link: "https://github.com/domnantas/ham.guide/blob/main/CHANGELOG.md",
            },
          ],
          sidebar: [
            {
              text: "Этика и порядок работы в эфире для радиолюбителя",
              items: [
                { text: "Обзор", link: "/ru/radio-operating-ethics/" },
                {
                  text: "Кодекс радиолюбителя по W9EEA",
                  link: "/ru/radio-operating-ethics/radio-amateurs-code",
                },
                { text: "Введение", link: "/ru/radio-operating-ethics/introduction" },
                {
                  text: "Работа в радиоэфире",
                  link: "/ru/radio-operating-ethics/general-operating",
                },
                {
                  text: "Работа в эфире для продвинутых",
                  link: "/ru/radio-operating-ethics/advanced-operating",
                },
                { text: "Авторы", link: "/ru/radio-operating-ethics/authors" },
              ],
            },
            {
              text: "Справочник",
              items: [
                { text: "Международный фонетический алфавит", link: "/ru/phonetic-alphabet/" },
                { text: "Международный Q-код", link: "/ru/q-code/" },
                { text: "Префиксы DXCC", link: "/ru/dxcc-prefixes/" },
              ],
            },
            {
              text: "Участие",
              items: [
                { text: "Руководство", link: "/ru/contribute/" },
                { text: "Советы по Markdown", link: "/ru/contribute/markdown-tips" },
              ],
            },
          ],
          footer: {
            message: "Лицензия MIT",
            copyright: "Copyright © 2018 Domantas Vasiliauskas LY1JA",
          },
          editLink: {
            pattern: "https://github.com/domnantas/ham.guide/edit/main/src/:path",
            text: "Редактировать эту страницу",
          },
          lastUpdated: { text: "Обновлено" },
          outline: { label: "На этой странице" },
          docFooter: { prev: "Назад", next: "Далее" },
          langMenuLabel: "Язык",
          returnToTopLabel: "Наверх",
          sidebarMenuLabel: "Меню",
          darkModeSwitchLabel: "Тема",
          lightModeSwitchTitle: "Светлая тема",
          darkModeSwitchTitle: "Тёмная тема",
          notFound: {
            title: "СТРАНИЦА НЕ НАЙДЕНА",
            quote: "Такой страницы не существует.",
            linkText: "На главную",
          },
        },
      },
    },
    head: [
      ["link", { rel: "apple-touch-icon", sizes: "180x180", href: "/icons/apple-touch-icon.png" }],
      ["link", { rel: "icon", type: "image/png", sizes: "32x32", href: "/icons/favicon-32x32.png" }],
      ["link", { rel: "icon", type: "image/png", sizes: "16x16", href: "/icons/favicon-16x16.png" }],
      ["link", { rel: "manifest", href: "/manifest.webmanifest" }],
      ["link", { rel: "mask-icon", href: "/icons/safari-pinned-tab.svg", color: brandColor }],
      ["meta", { name: "apple-mobile-web-app-title", content: "ham.guide" }],
      ["meta", { name: "application-name", content: "ham.guide" }],
      ["meta", { name: "msapplication-TileColor", content: brandColor }],
      ["meta", { name: "theme-color", content: brandColor }],
      ["meta", { property: "og:image", content: "https://ham.guide/icons/og-image.jpg" }],
      ["meta", { property: "og:title", content: "ham.guide" }],
      ["meta", { property: "og:url", content: "https://ham.guide" }],
      [
        "meta",
        {
          property: "og:description",
          content: "Introduction to amateur radio - Open source, multilingual and works offline!",
        },
      ],
      [
        "script",
        { async: "", src: "https://www.googletagmanager.com/gtag/js?id=G-9BCS1N7E1G" },
      ],
      [
        "script",
        {},
        "window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-9BCS1N7E1G');",
      ],
    ],
    themeConfig: {
      logo: "/logo.svg",
      socialLinks: [{ icon: "github", link: "https://github.com/domnantas/ham.guide" }],
      editLink: {
        pattern: "https://github.com/domnantas/ham.guide/edit/main/src/:path",
        text: "Edit this page on GitHub",
      },
      search: {
        provider: "local",
        options: {
          locales: {
            lt: {
              translations: {
                button: { buttonText: "Paieška", buttonAriaLabel: "Paieška" },
                modal: {
                  displayDetails: "Rodyti išsamų sąrašą",
                  resetButtonTitle: "Išvalyti paiešką",
                  backButtonTitle: "Uždaryti paiešką",
                  noResultsText: "Nieko nerasta",
                  footer: {
                    selectText: "pasirinkti",
                    navigateText: "naršyti",
                    closeText: "uždaryti",
                  },
                },
              },
            },
            es: {
              translations: {
                button: { buttonText: "Buscar", buttonAriaLabel: "Buscar" },
                modal: {
                  displayDetails: "Mostrar lista detallada",
                  resetButtonTitle: "Restablecer búsqueda",
                  backButtonTitle: "Cerrar búsqueda",
                  noResultsText: "No hay resultados",
                  footer: {
                    selectText: "seleccionar",
                    navigateText: "navegar",
                    closeText: "cerrar",
                  },
                },
              },
            },
            ru: {
              translations: {
                button: { buttonText: "Поиск", buttonAriaLabel: "Поиск" },
                modal: {
                  displayDetails: "Показать подробный список",
                  resetButtonTitle: "Сбросить поиск",
                  backButtonTitle: "Закрыть поиск",
                  noResultsText: "Ничего не найдено",
                  footer: {
                    selectText: "выбрать",
                    navigateText: "перейти",
                    closeText: "закрыть",
                  },
                },
              },
            },
          },
        },
      },
    },
    vite: {
      // Read .env from the repository root rather than src/
      envDir,
    },
    markdown: {
      container: {
        tipLabel: "TIP",
        warningLabel: "WARNING",
        dangerLabel: "DANGER",
      },
    },
    pwa: {
      // Keep the VuePress service worker filename so existing installs pick up the new site
      filename: "service-worker.js",
      registerType: "autoUpdate",
      manifest: false,
      workbox: {
        globPatterns: ["**/*.{css,js,html,png,jpg,svg,ico,json,webmanifest,woff2}"],
        maximumFileSizeToCacheInBytes: 5 * 1024 * 1024,
      },
    },
  }),
);
