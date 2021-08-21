# Gidas

Bendruomenės pagalba yra labai laukiama! Nesijaudinkite jeigu turite mažai patirties dirbant su atviro kodo projektais ar git, šiame puslapyje pateikiamos gairės pradedantiesiems.

## Kaip galiu padėti?

Pirmiausa - ačiū kad norite padėti šiam projektui augti. Yra daugelis būdų kaip galite prisidėti — papasakokite draugams apie ARManual, pataisykite gramatines klaidas kurias randate, patikslinkite pasenusią informaciją, išverskite puslapius į kitą kalbą, ar net pridėkite daugiau turinio. Mūsų [Github Issue puslapyje](https://github.com/LRMD/ARManual/issues) ieškokite pranešimų pažymėtų _help wanted_ ir bandykite prisidėti prie jų sprendimo.

## _Issues_

Jeigu turite pasiūlymų, klausimų ar radote klaidų, parašykite pranešimą mūsų [Github Issue puslapyje](https://github.com/LRMD/ARManual/issues).

## Redagavimas pradedantiesiams

Jeigu radote gramatinę klaidą, neteisingą informaciją, ar norėtumėte patikslinti ką nors, atlikite šiuos žingsnius:

- Slinkite iki puslapio, kurį norėtumėte redaguoti, apačios ir spauskite **Redaguoti šį puslapį** nuorodą. Jūs būsite nukreiptas į Github ir norėdami pateikti pakeitimus, turėsite susikurti paskyrą, jeigu jos dar neturite.
- Prisijungus, spauskite **Fork this repository and propose changes** mygtuką.
- Atlikite pakeitimus puslapiui ir _Propose file change_ skyriuje paaiškinkite ką ir kodėl pakeitėte.
- Spauskite **Propose file change** mygtuką ir **Create pull request** kitame puslapyje.
- Įsitikinkite kad jūsų _pull request_ turi atitinkamą antraštę ir aprašymą ir spauskite **Create pull request**

Dėkojame, kad tobulinate ARManual! Mes peržiūrėsime jūsų pakeitimus ir atnaujintą puslapį matysite, kai pakeitimus patvirtinsime. Kartas nuo karto patikrinkite savo [_pull request_](https://github.com/LRMD/ARManual/pulls) — ten galite rasti komentarus ir klausimus susijusius su jūsų pakeitimais.

## Redagavimas pažengusiems

### Vuepress

Projektas sukurtas naudojant [Vuepress](https://vuepress.vuejs.org/).

### Paleidimas vietiniame tinkle

#### Windows

Šiuo atveju rekomenduoju naudoti [WSL](https://medium.com/@johnwoodruff91/epic-dev-environment-with-wsl-dc81e234ae61) ir tokiu būdu įdiegti Git ir Node.

#### MacOS

Įdiekite Git ir Node pagal šias [instrukcijas](https://gist.github.com/nerdenough/d288f2e732637f55f9858070c6b8b15b) (ar sekite panašų gidą, kurį galite rasti internete).

#### Linux

Naudodami savo distribucijos paketų tvarkyklę, įsidiekite programas Git ir Node

---

1. Kai įdiegsite Git ir Node, [klonuokite ARManual repozitoriją ir sukurkite naują šaką](https://gist.github.com/Chaser324/ce0505fbed06b947d962).

1. Įrašykite būtinus modulius

```bash
npm install # arba yarn
```

3. Paleiskite vietinį serverį

```bash
npm run dev # arba yarn dev
```

Apsilankykite `localhost:8080` ir turėtumėte pamatyti ARManual veikiantį vietiniame tinkle.

### Projekto struktūra

```
.
├── ARManual
│   ├── .vuepress
│   ├── contribute
|   ├── phonetic-alphabet
|   ├── q-code
|   ├── radio-operating-ethics
│   └── lt
│       ├── contribute
│       ├── phonetic-alphabet
│       ├── q-code
│       └── radio-operating-ethics
├── CHANGELOG.md
├── LICENSE
├── package.json
└── README.md
```

Tai yra supaprastinta projekto struktūros diagrama.

- `ARManual/` aplanke talpinamas visas svetainės turinys.
- `ARManual/.vuepress` yra Vuepress konfigūracijos ir stilių failai, komponentų ir viešų failų katalogai. Daugiau informacijos apie tai galite rasti [Vuepress dokumentacijoje](https://vuepress.vuejs.org/), bet šiems failams retai reikalingos modifikacijos.

```{4,5,6,7}
.
├── ARManual
│   ├── .vuepress
│   ├── contribute
│   ├── phonetic-alphabet
|   ├── q-code
|   ├── radio-operating-ethics
│   └── lt
│       ├── contribute
|       ├── phonetic-alphabet
|       ├── q-code
│       └── radio-operating-ethics
...
```

Aplankai `ARManua/contribute/` ar `ARManual/q-code/` yra **puslapių** arba **puslapių grupių** aplankai. **Puslapis** yra aplankas talpinantis vieną `README.md` failą. **Puslapių grupė** yra aplankas turintis `README.md` ir kitus `.md` failus papildomiems puslapiams.

::: warning Perspėjimas
Jeigu norite sukurti **naują** puslapį ar puslapių grupę, reikės modifikuoti `ARManual/.vuepress/config.js` failo `themeConfig.locales.sidebar` nustatymą, tam kad jūsų puslapis būtų rodomas navigacijoje. Bandykite tai padaryti pats, naudodami jau aprašytą kodą kaip pavyzdį, tačiau nebijokite prašyti pagalbos mūsų Github puslapyje, jeigu užstrigsite!
:::

```{8,9,10,11,12}
.
├── ARManual
│   ├── .vuepress
│   ├── contribute
│   ├── phonetic-alphabet
|   ├── q-code
|   ├── radio-operating-ethics
│   └── lt
│       ├── contribute
|       ├── phonetic-alphabet
|       ├── q-code
│       └── radio-operating-ethics
...
```

Aplankai pavadinti pagal dviejų raidžių šalies kodą yra **kalbos aplankai**. Numatytoji kalbia šiame projekte yra anglų, todėl `ARManual/contribute/` ir `ARManual/radio-operating-ethics/` nereikalingas kalbos aplankas. Kitos kalbos privalo turėti kalbos aplanką ir jis _turėtų_ talpinti tuos pačius **puslapius** ir **puslapių grupes** kurie yra parašyti anglų kalba.
