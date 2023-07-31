# Markdown patarimai

## Antraštės

```md
# h1 antraštė

## h2 antraštė

### h3 antraštė

#### h4 antraštė

##### h5 antraštė

###### h6 antraštė
```

#### Pavyzdys

# h1 antraštė

## h2 antraštė

### h3 antraštė

#### h4 antraštė

##### h5 antraštė

###### h6 antraštė

## Horizontali linija

```md
---
```

#### Pavyzdys

---

## Pabrėžimas

```md
**Paryškintas tekstas**
_Pasviręs tekstas_
~~Nubrauktas tekstas~~
```

#### Pavyzdys

**Paryškintas tekstas**

_Pasviręs tekstas_

~~Nubrauktas tekstas~~

## Citatos

```md
> Citatos gali būti
>
> > Kelių lygių
```

#### Pavyzdys

> Citatos gali būti
>
> > Kelių lygių

## Sąrašai

### Nenumeruoti

```md
- Sąrašai
  - gali būti
    - kelių lygių
  - antras lygis
```

#### Pavyzdys

- Sąrašai
  - gali būti
    - kelių lygių
  - antras lygis

### Numeruoti

```md
1.  Nesvarbu kokiu
1.  skaičiumi pradedama
1.  sąrašo eilutė
```

#### Pavyzdys

1.  Nesvarbu kokiu
1.  skaičiumi pradedama
1.  sąrašo eilutė

## Pranešimų konteineriai

```md
::: tip
Čia yra patarimas
:::

::: warning
Čia yra įspėjimas
:::

::: danger
Čia yra įspėjimas apie pavojų
:::
```

#### Pavyzdys

::: tip
Čia yra patarimas
:::

::: warning
Čia yra įspėjimas
:::

::: danger
Čia yra įspėjimas apie pavojų
:::

Galima keisti pranešimo pavadinimą:

```md
::: danger STOP
Pavojus, toliau neikite
:::
```

#### Pavyzdys

::: danger STOP
Pavojus, toliau neikite
:::

## Nuorodos

```md
[Išorinė nuoroda](https://google.com)

[Nuoroda su pavadinimu](https://google.com 'Pavadinimas')

[Vidinė nuoroda](/lt/)

[Vidinė nuoroda į bloką](/lt/contribute/)

[Vidinė nuoroda į skyrių](/lt/contribute/markdown-tips.md)

[Vidinė nuoroda į sekciją](/lt/contribute/markdown-tips.md#pranesimu-konteineriai)
```

#### Pavyzdys

[Išorinė nuoroda](https://google.com)

[Nuoroda su pavadinimu](https://google.com 'Pavadinimas')

[Vidinė nuoroda](/lt/)

[Vidinė nuoroda į bloką](/lt/contribute/)

[Vidinė nuoroda į skyrių](/lt/contribute/markdown-tips.md)

[Vidinė nuoroda į sekciją](/lt/contribute/markdown-tips.md#pranesimu-konteineriai)

::: warning
Neužmirškite vidinių nuorodų užbaigti su `/`, kitaip atsidursite 404 puslapyje.
:::

## Paveiksliukai

```md
![Alt tekstas](/icons/android-chrome-192x192.png 'Pavadinimas')
```

#### Pavyzdys

![Alt tekstas](/icons/android-chrome-192x192.png 'Pavadinimas')

## Kodas

### Įterptas tekste

```md
Kodas `toje pačioje` eilutėje
```

#### Pavyzdys

Kodas `toje pačioje` eilutėje

### Atskirame bloke

````md
```js
var foo = function (bar) {
  return bar++;
};
```
````

#### Pavyzdys

```js
var foo = function (bar) {
  return bar++;
};
```

Kodo blokuose galima paryškinti linijas:

````md
```js{2,3}
const foo = bar => {
  bar++;
  console.log(bar);
};
```
````

#### Pavyzdys

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

#### Pavyzdys

:tada: :radio:

## Vue komponentai

Šio projekto `markdown` failuose galima naudoti [Vue](https://vuejs.org/) komponentus

`.vuepress/components/DoubleNumber.vue`
@[code](../.vuepress/components/DoubleNumber.vue)

```md
<!-- *.md -->

<DoubleNumber />
```

#### Pavyzdys

<DoubleNumber />

## Lentelės

```md
| Lentelės        |         yra          |  jėga |
| --------------- | :------------------: | ----: |
| 3 stulpelis yra | sulygiuotas dešiniau | €1600 |
| 2 stulpelis yra |      centruotas      |   €12 |
```

#### Pavyzdys

| Lentelės        |         yra          |  jėga |
| --------------- | :------------------: | ----: |
| 3 stulpelis yra | sulygiuotas dešiniau | €1600 |
| 2 stulpelis yra |      centruotas      |   €12 |
