# Markdown tips

## Headings

```md
# h1 heading

## h2 heading

### h3 heading

#### h4 heading

##### h5 heading

###### h6 heading
```

#### Example

# h1 heading

## h2 heading

### h3 heading

#### h4 heading

##### h5 heading

###### h6 heading

## Horizontal rule

```md
---
```

#### Example

---

## Emphasis

```md
**Bold text**
_Italic text_
~~Strikethrough text~~
```

#### Example

**Bold text**

_Italic text_

~~Strikethrough text~~

## Quotes

```md
> Quotes can
>
> > be nested
```

#### Example

> Quotes can
>
> > be nested

## Lists

### Unordered

```md
* Lists
  * can be
    * indented
  * second level
```

#### Example

* Lists
  * can be
    * indented
  * second level

### Ordered

```md
1.  It doesn't matter
1.  what number the line
1.  is prepended with
```

#### Example

1.  It doesn't matter
1.  what number the line
1.  is prepended with

## Message containers

```md
::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger
This is a danger warning
:::
```

#### Example

::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger
This is a danger warning
:::

You can also customize the title of the block:

```md
::: danger STOP
Danger, do not proceed
:::
```

#### Example

::: danger STOP
Danger, do not proceed
:::

## Links

```md
[External link](https://google.com)

[Link with title](https://google.com "Title")

[Relative link](/lt/)

[Relative link to a block](/contribute/)

[Relative link to a chapter](/contribute/markdown-tips.md)

[Relative link to a section](/contribute/markdown-tips.md#message-containers)
```

#### Example

[External link](https://google.com)

[Link with title](https://google.com "Title")

[Relative link](/lt/)

[Relative link to a block](/contribute/)

[Relative link to a chapter](/contribute/markdown-tips.md)

[Relative link to a section](/contribute/markdown-tips.md#message-containers)

::: warning
Don't forget to close off relative links with a ´/´, otherwise you will get a 404.
:::

## Images

```md
![Alt text](/icons/android-chrome-192x192.png "Title")
```

#### Example

![Alt text](/icons/android-chrome-192x192.png "Title")

## Code

### Inline

```md
Inline `code` on the same line
```

#### Example

Inline `code` on the same line

### Code block

````md
```js
var foo = function(bar) {
  return bar++;
};
```
````

#### Example

```js
var foo = function(bar) {
  return bar++;
};
```

Line highlighting in a code block:

````md
```js{2,3}
const foo = bar => {
  bar++;
  console.log(bar);
};
```
````

#### Example

```js{2,3}
const foo = bar => {
  bar++;
  console.log(bar);
};
```

## Emoji :tada:

```md
:tada: :radio:
```

#### Example

:tada: :radio:

## Vue components

In this project it is possible to use [Vue](https://vuejs.org/) components inside `markdown` files

```vue
<!-- .vuepress/components/DoubleNumber.vue -->
<template>
  <div class="doubler">
    <pre>{{ number }}</pre>
    <button @click="double">Double</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      number: 1
    };
  },
  methods: {
    double() {
      this.number = this.number * 2;
    }
  }
};
</script>

<style lang="stylus" scoped>
@require '~@default-theme/styles/config.styl'

.doubler
  text-align center

button
  color #fff
  font-size 1.2rem
  background-color $accentColor
  padding 1.5rem
  border none
</style>
```

```md
<!-- *.md -->

<DoubleNumber />
```

#### Example

<DoubleNumber />

## Tables

```md
| Tables   |      Are      |  Cool |
| -------- | :-----------: | ----: |
| col 3 is | right-aligned | $1600 |
| col 2 is |   centered    |   $12 |
```

#### Example

| Tables   |      Are      |  Cool |
| -------- | :-----------: | ----: |
| col 3 is | right-aligned | $1600 |
| col 2 is |   centered    |   $12 |
