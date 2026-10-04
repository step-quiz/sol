# Exercicis propis — 2n de Batxillerat

Web estàtica (GitHub Pages). No hi ha servidor ni base de dades.

L'alumne navega **unitat → tasca → exercici**. Una *tasca* és una setmana de
feina: una llista ordenada d'exercicis amb una data límit.

## Com programo la feina

Edita **`tasques.js`**.

```js
const TASQUES = [
  { unitat:'u7', setmana:1, limit:'2026-09-20', exercicis:[44, 45, 46, 47, 48] },
  { unitat:'u7', setmana:3, limit:'2026-10-04', exercicis:[92, 93, 94, 102, 103, 40, 106] },
];
```

**L'ordre mana.** Els exercicis es mostren tal com els escrius, encara que no
estiguin ordenats per número i encara que siguin de parts diferents del llibre.
A la setmana 3 de l'exemple, el 40 va entre el 103 i el 106 perquè així ho diu
la llista.

Afegir una setmana és **una línia**. No cal crear cap carpeta ni cap fitxer.

Es pot fer des del mòbil: GitHub → `tasques.js` → llapis → *Commit changes*.

### Barrejar unitats

Per a una setmana de repàs, un exercici d'una altra unitat porta prefix:

```js
exercicis:[112, 113, 'u9:44', 120]
```

### Quan es fa visible una tasca

Per defecte s'obre **uns dies abans** de la data límit (`DIES_ABANS`, a dalt de
`tasques.js`). Un cop oberta ja no es tanca: passada la data segueix
consultable i surt marcada com a vençuda. Per tasca:

```js
obre:'2026-09-10'     // s'obre aquest dia concret
visible:'sempre'      // visible ja, passi el que passi
visible:'mai'         // amagada, per preparar-la amb antelació
```

**Vista prèvia:** obre `index.html?tot=1` per veure totes les tasques, també
les que encara no toquen. Els alumnes no ho saben.

## Estructura

```
index.html      ← únic index.html del projecte. Unitats → tasques.
tasca.html      ← visor genèric d'una tasca. Es governa per l'adreça: #u7/s3
tasques.js      ← LA PROGRAMACIÓ
cataleg.js      ← generat: títol, dificultat i imatges de cada exercici
hints.js        ← LES PISTES (una línia per pista; s'edita a mà)
errades.js      ← LES ERRADES DEL SOLUCIONARI (s'edita a mà)
marca.js        ← eina del professor per marcar on és una errada (tasca.html?tot=1&marca=1)
progres.js      ← les creuetes de "fet" de l'alumne
publicats.js    ← només governa la vista per temes (vegeu més avall)
README.md
assets/
  style.css     ← compartit per totes les pàgines
  icon.png
  katex/        ← KaTeX: pinta les fórmules de les errades (no s'hi toca res)
u7/  u8/  u9/  u10/
  <tema>/
    <tema>.html     ← pàgina del tema (ja no enllaçada des del menú)
    data/full-1.png … full-K.png
```

`cataleg.js` és el que permet que una tasca agafi exercicis d'on sigui: hi ha
el títol, la dificultat i les imatges de cada exercici, un sol cop. Les tasques
només guarden números.

Com que les pistes viuen en un fitxer a part (`hints.js`), tornar a generar el
catàleg no fa perdre res.

## Les pistes dels exercicis

Cada exercici pot tenir, opcionalment, una pista curta: un cop de mà cap al
mètode, no la solució feta. Totes viuen a **`hints.js`**, una línia per pista,
amb la clau `'unitat/exercici'`:

```js
const PISTES = {

  /* ── Unitat 7 · Límits i continuïtat ─────────────────────────────────── */
  'u7/44': 'Mira cada gràfica per separat a la banda dreta (x → +∞) i a l\'esquerra (x → −∞): la corba s\'apropa a una alçada fixa, puja o baixa sense parar, o no s\'estabilitza?',
  'u7/45': 'Pensa en qui guanya quan x es fa molt gran...',

};
```

- **Afegir una pista és afegir una línia**, en qualsevol lloc del fitxer.
  Esborrar-la és esborrar la línia. No cal tocar res més enlloc.
- **Exercici sense línia = sense botó.** L'alumne no té cap manera de saber
  que en podria haver una.
- **Compte amb els apòstrofs:** dins d'un text entre cometes simples s'han
  d'escapar (`d\'una`, `fixa\'t`). Si t'ho vols estalviar, escriu l'apòstrof
  tipogràfic (’), que no cal escapar.
- **S'omple a mà**: escrius el text tu mateix, o li demanes a una IA que en
  redacti un i l'enganxes, i fas commit. No hi ha cap botó de "generar" ni
  cap crida a cap IA en temps real des del navegador de l'alumne — el
  projecte segueix sent 100% estàtic.
- **Helper:** `pistaDe(u, n)` (a `hints.js`) retorna el text o `null`.
- **Com escriure-la:** una frase o dues que apuntin al mètode o al concepte
  clau (compara graus, mira l'asímptota, pensa-ho al revés...), mai el
  resultat numèric ni el pas final. Si la pista revela la resposta, ja no és
  una pista.

### On es veu

La pista apareix a la **llista d'exercicis d'una tasca** (`tasca.html`), com
un botó 💡 *Veure pista* dins de cada targeta, que es desplega allà mateix
sense obrir l'exercici. **No** apareix dins la pàgina de detall de
l'exercici: aquella pàgina ja ensenya la imatge amb l'enunciat (i sovint la
solució treballada del llibre), així que oferir-hi la pista arribaria tard —
per això es mostra abans, a la llista, on l'alumne encara no ha vist res.

## Les errades del solucionari

El solucionari té errades. Les dels exercicis programats viuen a
**`errades.js`**, amb la mateixa clau que les pistes, `'unitat/exercici'`:

```js
const ERRADES = {

  'u7/76': [
    { lloc:    TEX`f)`,
      ondiu:   TEX`$\dlim_{x\to 3}\dfrac{3-x}{x+2}=0$`,
      hadedir: TEX`$\dlim_{x\to 3}\dfrac{-(3+x)}{x+2}=-\dfrac{6}{5}$`,
      motiu:   TEX`Els factors $3-x$ i $x-3$ són oposats.` },
  ],

};
```

- **Cada exercici porta una llista d'errades** (entre `[ ]`), en l'ordre en què
  surten a la solució. De cada errada: `lloc` (l'apartat i, si cal, un detall;
  si no cal dir res, la línia no es posa), `ondiu`, `hadedir` i `motiu`.
- **El text va sempre entre accents greus i amb `TEX` al davant.** Així el
  LaTeX s'escriu tal qual, sense doblar cap barra invertida.
- **Les fórmules van entre dòlars**, com en un fitxer `.tex`. Les pinta KaTeX,
  que és a `assets/katex/` (no depèn de cap servei extern). Hi ha definides
  `\dlim` i `\R`. Fora dels dòlars només s'entenen `\quad`, `\;` i `\,`.
- **`enunciat: 1`** marca una errada que és a l'enunciat i no a la solució.
- **`marca`** diu on és l'errada dins la imatge: la imatge (escrita com a
  `cataleg.js`) i un rectangle en tant per cent de la imatge
  (`marca: ['continuitat/data/full-3.png', 21.0, 74.5, 19.1, 2.1]`). És
  opcional: sense marca, l'errada només surt a la targeta.
- **Exercici sense entrada = sense avís.** No cal deixar-hi cap llista buida.
- **Helpers:** `erradesDe(u, n)` retorna la llista (buida si no n'hi ha) i
  `texAHtml(text)` converteix un text amb fórmules en HTML.

### On es veu

- A la **llista d'exercicis d'una tasca** (`tasca.html`): una etiqueta vermella
  al costat del botó *Veure solució* («2 errades al solucionari»). Si l'errada
  és a l'enunciat, es mostra sencera allà mateix, perquè l'alumne l'ha de
  saber abans de començar.
- A la **pàgina de detall de l'exercici**: una targeta «On diu / Ha de dir»
  per errada, just abans de la imatge. En obrir un exercici la pàgina comença
  sempre per dalt, perquè les errades quedin a la vista; en tornar, la llista
  és on s'havia deixat.
- **Sobre la imatge**: un requadre vermell al lloc de cada errada que té
  `marca`, amb el mateix número que la seva targeta. Tocar el requadre (o
  *Mostra-ho a la imatge*, a la targeta) obre la imatge ampliada en aquell
  punt, amb la correcció a sota.

Les errades es veuen quan es veu la tasca: no cal publicar-les a part.

### Marcar on és una errada

Obre `tasca.html?tot=1&marca=1` i entra a l'exercici. Al quadre de baix a la
dreta tria l'errada, arrossega un rectangle sobre la imatge al lloc de
l'errada (dos, si és en dos llocs), prem *Copia* i enganxa la línia dins de
l'errada, a `errades.js`. L'eina (`marca.js`) no desa res: només calcula la
línia. Els alumnes no la carreguen mai.

### Els dos interruptors

A dalt de `errades.js`:

```js
const ERRADES_MOTIU = false;   // true: cada errada mostra també el «Motiu»
const ERRADES_OBS   = false;   // true: es veuen també les observacions
```

Les observacions (comentaris que no són errades, però que poden confondre)
són al mateix fitxer, a `OBSERVACIONS`. Amb l'interruptor apagat, el text
dels motius i de les observacions no es mostra, però continua dins del
fitxer: qui miri el codi de la pàgina el pot llegir.

### D'on surten

Del projecte d'Overleaf «Errades del solucionari» (`errors-setmanaN.tex`),
convertit un sol cop. A partir d'ara s'editen a `errades.js`: el PDF
d'Overleaf i la web ja no se sincronitzen sols.

<!-- atribucio-centre:inici -->

---

Material desenvolupat per **David Arso Civil** 
Contingut i codi sota llicència CC BY-NC-ND 4.0.

<!-- atribucio-centre:final -->
