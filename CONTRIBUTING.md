## How can I help?

First off — thank you for taking interest in helping this project grow. There are many ways you can contribute — tell your friends about ARManual, fix typos you find, correct outdated information, translate it to a language you know or even write new content. Anything helps! Furthermore, go to our [Github Issue page](https://github.com/LRMD/ARManual/issues), check out the issues with a label _help wanted_ and see if you could fix that issue.

## Issues

If you have any suggestions, questions or found a bug, please go to our [Github Issue page](https://github.com/LRMD/ARManual/issues) and submit a new issue.

## Simple editing

If you found a typo, incorrect information or would like to clarify something, follow these steps:

- Scroll to the bottom of the page you want to edit and click **Edit this page** link. You will be taken to Github and in order to make edits, you will need to create an account, if you don't have one already.
- After you log in, click **Fork this repository and propose changes** button.
- Make the changes to the page and explain why and what have you changed in the _Propose file change_ section.
- Click **Propose file change** button and **Create pull request** in the next page.
- Make sure your pull request has an appropriate title and description and click **Create pull request**

Thank you for improving ARManual! We will review your changes and you should see them on the webpage after we approve them. Check back on your [pull request](https://github.com/LRMD/ARManual/pulls) every once in a while — you might find some comments and questions there.

## Advanced editing

### Vuepress

Project is built using [Vuepress](https://vuepress.vuejs.org/).

### Running locally

#### Windows

I would recommend using [WSL](https://medium.com/@johnwoodruff91/epic-dev-environment-with-wsl-dc81e234ae61) to get Git and Node running.

#### MacOS

Install Git and Node as described [here](https://gist.github.com/nerdenough/d288f2e732637f55f9858070c6b8b15b) (or follow any other guide you find).

#### Linux

Install Git and Node using your distro package manager.

---

1. After you have the prerequisites installed, [fork and clone ARManual repository and create a new branch](https://gist.github.com/Chaser324/ce0505fbed06b947d962).

2. Install dependencies

```bash
npm install # or yarn
```

3. Run the dev server

```bash
npm run dev # or yarn dev
```

After that, visit `localhost:8080` and you should see ARManual running locally.

### Project structure

```
.
├── ARManual
│   ├── .vuepress
│   ├── contribute
|   ├── phonetic-alphabet
|   ├── q-code
|   ├── radio-operating-ethics
│   └── lt
│       ├── contribute
│       ├── phonetic-alphabet
│       ├── q-code
│       └── radio-operating-ethics
├── CHANGELOG.md
├── LICENSE
├── package.json
└── README.md
```

This is a simplified diagram of directory structure.

- `ARManual/` folder contains all the content presented on this webpage.
- `ARManual/.vuepress` contains Vuepress configuration and style files, component and public directories. More information about it can be found on [Vuepress documentation](https://vuepress.vuejs.org/), but it rarely needs modification.

```{4,5,6,7}
.
├── ARManual
│   ├── .vuepress
│   ├── contribute
│   ├── phonetic-alphabet
|   ├── q-code
|   ├── radio-operating-ethics
│   └── lt
│       ├── contribute
|       ├── phonetic-alphabet
|       ├── q-code
│       └── radio-operating-ethics
...
```

Directories like `ARManua/contribute/` or `ARManual/q-code/` are **page** or **page group** folders. **Page** is a directory with a single `README.md` file. **Page group** is a directory containing a `README.md` and other `.md` files for additional pages.

::: warning
If you want to create a **new** page or page group, you need to modify `ARManual/.vuepress/config.js` file `themeConfig.locales.sidebar` property in order to see your page in the navigation menu. Try doing this yourself following already existing code as an example, but don't be afraid to ask for help on Github if you get stuck!
:::

```{8,9,10,11,12}
.
├── ARManual
│   ├── .vuepress
│   ├── contribute
│   ├── phonetic-alphabet
|   ├── q-code
|   ├── radio-operating-ethics
│   └── lt
│       ├── contribute
|       ├── phonetic-alphabet
|       ├── q-code
│       └── radio-operating-ethics
...
```

Folders named using a two-letter language code are **language directories**. The default language of this project is English, therefore `ARManual/contribute/` and `ARManual/radio-operating-ethics/` don't need to be nested in a language directory. Additional languages must have a language directory and it _should_ contain the same **page** and **page group** folders as does English.
