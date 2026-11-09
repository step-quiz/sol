# Exercicis propis — 4t d'ESO

Web estàtica, publicada amb Cloudflare Pages des de GitHub. No hi ha servidor ni base de dades:
HTML, CSS i JavaScript sense compilació.

És el germà de `sol` (Matemàtiques II, 2n de Batxillerat): funciona igual, amb una diferència, que
aquí hi ha **dues matèries** de 4t d'ESO:

| Matèria | Prefix | Exemple d'unitat |
|---|---|---|
| Matemàtiques Aplicades | `apl` | `apl-ud4` (UD4 del llibre propi) |
| Matemàtiques Acadèmiques | `aca` | `aca-ud2` (UD2) |

**Les unitats són les UD del llibre propi (Overleaf), no les de Santillana.** Cada UD agafa els
exercicis de pràctica d'on calgui: d'una o més unitats del solucionari de Santillana (imatges) i del
llibre propi (enunciat i solució escrits en KaTeX). L'índex mostra les UD en l'ordre del curs:
UD1, UD2, UD3, UD4, UD11, UD5, UD10, UD6, UD7, UD8, UD9.

L'alumne navega **matèria → unitat → tasca → exercici**. Una *tasca* és una setmana de feina: una
llista ordenada d'exercicis amb una data límit. Si només hi ha una matèria (o una unitat) amb tasques
visibles, la portada hi entra directament.

**Estat (novembre de 2026):** Aplicades, **UD1** (*Nombres reals des de l'estimació*): 70 exercicis de la U1. **UD2**
(*Percentatges i matemàtica financera*): 33 exercicis de la U2 i 11 del llibre propi amb la solució. **UD3** (*Proporcionalitat i escales*):
39 exercicis de la U2, la U5 i la U3. **UD4** (*Mesura indirecta*): 13 exercicis de Santillana
(U5 i U7) i 33 del llibre propi amb la solució. **UD11** (*Idea de polinomi*): 19 exercicis de l'annex
de Polinomis. **UD5** (*Equacions de 2n grau*): 49 exercicis de la U3, la U7 i l'annex de Polinomis
(igualtats notables). **UD10** (*Sistemes*): 79 exercicis de la U4, la U3 (inequacions i problemes), la U2 (mòbils) i la
U7. **UD6** (*La paràbola*): 25 exercicis de la U7, la U6 i la U3. **UD7** (*Funcions: llegim
gràfics*): 79 exercicis de la U6, la U7 i la U2 (interès compost). **UD8** (*Estadística*): 59 exercicis de la U8 i 11 del llibre propi amb la solució.
**UD9** (*Atzar i decisions*): 52 exercicis de la U9 i 12 del llibre propi amb la solució. Falten les setmanes de debò (`tasques.js`) i les pistes; les altres UD es carregaran unes
setmanes abans de fer-les. Vegeu `TODO.md`.

## Com programo la feina

Edita **`tasques.js`**.

```js
const TASQUES = [
  { unitat:'apl-ud4', setmana:1, limit:'2026-11-29', exercicis:['4.1.3', '4.2.2', 'U5.57', 'U5.64'] },
  { unitat:'apl-ud4', setmana:2, limit:'2026-12-06', exercicis:['4.2.7', 'U5.81', '4.3.2', '4.3.5'] },
];
```

**L'ordre mana.** Els exercicis es mostren tal com els escrius, encara que no estiguin ordenats per
número i encara que vinguin de llocs diferents.

Afegir una setmana és **una línia**. No cal crear cap carpeta ni cap fitxer.

Es pot fer des del mòbil: GitHub → `tasques.js` → llapis → *Commit changes*.

### Les claus dels exercicis

Cada clau diu d'on surt l'exercici, i a `tasques.js` s'escriu **entre cometes**:

| Clau | Què és | L'alumne veu |
|---|---|---|
| `'U5.57'` | Santillana, unitat 5, exercici 57 | U5 · 57 |
| `'U4.FN'` | Santillana, unitat 4, fake news | U4 · Fake news |
| `'U4.SA1'`, `'U4.SA2'`… | Santillana, situació d'aprenentatge | U4 · Situació 1 |
| `'U4.AV1'`, `'U4.AV2'`… | Santillana, autoavaluació | U4 · Autoav. 1 |
| `'U3.QS1'`, `'U3.QS2'` | Santillana, «¿Qué sabes ya?» | U3 · Què saps ja 1 |
| `'AP.33'` | Santillana, annex de Polinomis, ex. 33 (`AR.` Potències i radicals, `AT.` Trigonometria) | Annex Pol. · 33 |
| `'4.2.7'` | Llibre propi, exercici 4.2.7 | 4.2.7 |

```js
exercicis:['4.2.7', 'U5.57', 'U4.SA1']
```

Els exercicis del llibre propi no tenen imatge: en prémer *Veure solució* surten l'enunciat i la
solució escrits (a `enunciats.js`).

### Barrejar unitats

Per a una setmana de repàs, un exercici d'una altra UD porta la UD i dos punts:

```js
exercicis:['4.3.2', 'apl-ud10:U4.24', 'U5.64']
```

### Quan es fa visible una tasca

Per defecte s'obre **uns dies abans** de la data límit (`DIES_ABANS`, a dalt de `tasques.js`). Un cop
oberta ja no es tanca: passada la data segueix consultable i surt marcada com a vençuda. Per tasca:

```js
obre:'2026-11-20'     // s'obre aquest dia concret
visible:'sempre'      // visible ja, passi el que passi
visible:'mai'         // amagada, per preparar-la amb antelació
```

**Vista prèvia:** obre `index.html?tot=1` per veure totes les tasques, també les que encara no toquen.
L'`?tot=1` es manté en passar a les tasques i tornar. Els alumnes no ho saben.

## Estructura

```
index.html      ← portada: matèries → unitats → tasques
tasca.html      ← visor genèric d'una tasca. Es governa per l'adreça: #apl-ud4/s1
errades.html    ← totes les errades del solucionari, per setmanes (les publicades; amb ?tot=1, totes)
tasques.js      ← LA PROGRAMACIÓ
cataleg.js      ← matèries, UD i fitxa de cada exercici (títol, dificultat, imatges). Es manté a mà
hints.js        ← LES PISTES (una línia per pista; s'edita a mà)
enunciats.js    ← ELS ENUNCIATS complets, en català i amb KaTeX, i les solucions del llibre propi
errades.js      ← LES ERRADES DEL SOLUCIONARI (el sistema és el de sol). Vegeu ERRADES.md
marca.js        ← eina del professor per marcar on és una errada (tasca.html?tot=1&marca=1)
pegats/         ← trossos de pàgina ja corregits que es posen a sobre de les imatges (els fa eines/pegats/)
progres.js      ← les creuetes de "fet" de l'alumne (al seu navegador)
README.md       ← aquest fitxer
CLAUDE.md       ← instruccions per a Claude (flux per afegir una unitat, estil de les pistes)
ERRADES.md      ← com funcionen les errades del solucionari
TODO.md         ← feina pendent
LLICENCIA.md, LICENSE
assets/
  style.css     ← compartit per totes les pàgines (el mateix de sol, amb el bloc final de clicables)
  icon.png
  katex/        ← KaTeX: pinta les fórmules de les errades (no s'hi toca res)
apl-ud4/                     ← Aplicades, UD4 · Mesura indirecta
  u5-activitats/data/…       Santillana U5, activitats 19–21
  u5-semblanca/data/…        U5, activitats finals 57–66
  u5-problemes/data/…        U5, 77, 80 i 81
  u7-problemes/data/…        U7, 91
  enunciats/4.1.4.png        figures dels exercicis del llibre propi
apl-ud11/                    ← Aplicades, UD11 · Idea de polinomi
  ap-activitats/data/…       annex de Polinomis, Què saps ja 1 i activitats 1–4
  ap-exercicis/data/…        activitats finals 32–38
  ap-problemes/data/…        problemes 71–81
apl-ud5/                     ← Aplicades, UD5 · Equacions de 2n grau
  u3-activitats/data/…       Santillana U3, Què saps ja i activitats
  u3-equacions/data/…        U3, activitats finals 32–51
  u3-problemes/data/…        U3, 63, 71 i 77
  u7-problemes/data/…        U7, 94 i 95
  ap-activitats/data/…, ap-igualtats/data/…   annex de Polinomis, igualtats notables
apl-ud10/                    ← Aplicades, UD10 · Sistemes
  u4-activitats/data/…       Santillana U4, activitats 1–12 i reptes
  u4-sistemes/data/…         U4, activitats finals, apartat 1
  u4-problemes/data/…        U4, apartat 3 (62–79)
  u4-fake-news/data/…, u4-problemes-diferents/data/…, u4-situacio/data/…, u4-autoavaluacio/data/…
  u3-activitats/data/…, u3-inequacions/data/…, u3-problemes/data/…   U3, inequacions i problemes
  u2-problemes/data/…        U2, mòbils (68 i 69)
  u7-problemes/data/…        U7, 93
apl-ud6/                     ← Aplicades, UD6 · La paràbola
  u7-activitats/data/…       Santillana U7, Què saps ja 1 i activitats 8–10
  u7-paraboles/data/…        U7, activitats finals 45–55
  u7-problemes/data/…        U7, problemes 86–106
  u6-activitats/data/…, u6-problemes/data/…   U6, punts de tall
  u3-equacions/data/…        U3, 45
  enunciats/U7.86.png        figures dels enunciats
apl-ud7/                     ← Aplicades, UD7 · Funcions: llegim gràfics
  u6-activitats/data/…       Santillana U6, activitats 1–7
  u6-funcions/data/…, u6-creixement/data/…, u6-a-trossos/data/…   U6, activitats finals 47–112
  u7-lineals/data/…, u7-inversa/data/…, u7-exponencial/data/…, u7-situacions/data/…   U7
  u2-activitats/data/…, u2-interes/data/…   U2, interès compost
apl-ud8/                     ← Aplicades, UD8 · Estadística (Santillana U8)
  u8-activitats/data/…, u8-taules/data/…, u8-parametres/data/…, u8-informacio/data/…
apl-ud9/                     ← Aplicades, UD9 · Atzar i decisions (Santillana U9)
  u9-activitats/data/…, u9-recompte/data/…, u9-aleatori/data/…, u9-probabilitat/data/…, u9-problemes/data/…
eines/
  retalla.py, retalls.json   ← fan les imatges d'una unitat a partir del PDF de source/
  figura.py                  ← retalla una figura del PDF per a un enunciat (apl-ud10/enunciats/…)
  comprova.js                ← les proves (també les passa GitHub a cada canvi)
  optimitza_png.py           ← comprimeix les imatges sense cap pèrdua
source/         ← el PDF del solucionari (Santillana, Matemáticas 4 ESO Opción A)
_uploads/       ← on es pugen els ZIP (el workflow els descomprimeix)
.github/workflows/unzip-upload.yml ← descomprimeix els ZIP de _uploads/ i en fa commit
.github/workflows/comprova.yml     ← passa eines/comprova.js a cada canvi
```

`cataleg.js` és el que permet que una tasca agafi exercicis d'on sigui: hi ha el títol, la dificultat
i les imatges de cada exercici, un sol cop. Les tasques només guarden les claus.

## Els enunciats

A la llista de la tasca, cada exercici mostra el seu **enunciat complet**, en català i amb les
fórmules ben escrites (KaTeX), en lloc del títol curt del catàleg. Viuen a **`enunciats.js`**, amb la
mateixa clau que les pistes:

```js
  'apl-ud10/U4.24': {
    text: TEX`Troba de quines equacions és solució $x = 2$, $y = -1$.`,
    apartats: [TEX`$x + 3y = 5$`, TEX`$\dfrac{x}{2} + y = 0$`, TEX`$-2x + y = -5$`,
               TEX`$3x - y = 7$`, TEX`$4x + 3y = 4$`, TEX`$x = 2y$`],
    col: 3 },
```

- Dels de Santillana, només hi van els **programats** (com les pistes); un exercici sense enunciat
  mostra el títol curt. Els del **llibre propi** hi són tots, amb la solució al camp `solucio`.
- Camps: `text`, `apartats` (a, b, c…), `col` (columnes dels apartats: 1–4; al mòbil, com a molt 2),
  `punts` (preguntes amb pic), `titol` (nom d'una situació d'aprenentatge), `fig` (figures retallades
  del PDF) i `despres` (text després dels apartats). Explicació a la capçalera del fitxer.
- Les **figures** (gràfiques, taules, dibuixos) no es reescriuen: es retallen del PDF amb
  `eines/figura.py` i van a `apl-udN/enunciats/`. Les del llibre propi són la `tikzpicture` de
  l'Overleaf compilada a part.
- La imatge de la solució (el llibre) continua en castellà.
- `eines/comprova.js` comprova que totes les fórmules es pintin sense error i avisa dels exercicis
  programats que encara no tenen enunciat.

## Les pistes dels exercicis

Cada exercici pot tenir, opcionalment, una pista curta: un cop de mà cap al mètode, no la solució
feta. Totes viuen a **`hints.js`**, una línia per pista, amb la clau `'unitat/exercici'`:

```js
const PISTES = {
  'apl-ud10/U4.24': 'Substitueix <i>x</i> = 2 i <i>y</i> = −1 a cada equació i mira si es compleix la igualtat.',
  'apl-ud4/4.2.7':  'Busca els dos triangles semblants: tots dos tenen un angle recte.',
};
```

- **Afegir una pista és afegir una línia.** Esborrar-la és esborrar la línia.
- **Exercici sense línia = sense botó.**
- **Compte amb els apòstrofs:** dins d'un text entre cometes simples s'han d'escapar (`d\'una`), o
  escriu l'apòstrof tipogràfic (’), que no cal escapar.
- Només es poden fer servir `<i>`, `<b>` i `<br>`. `eines/comprova.js` ho comprova.
- La pista surt a la **llista d'exercicis de la tasca**, amb un botó 💡 *Veure pista*, abans que
  l'alumne obri la solució.
- L'estil (què diu i què no diu una pista) és a `CLAUDE.md`.

## Les errades del solucionari

El solucionari té errades. Les dels exercicis programats van a **`errades.js`**, amb la mateixa clau
que les pistes. El sistema és el de `sol`, sencer: avís a la llista de la tasca, targeta «On diu /
Ha de dir» dins de l'exercici, requadre vermell sobre la imatge (`marca`) i, si es fa, la imatge ja
corregida (`pegat`). Ara n'hi ha a totes les UD carregades menys la UD10, i totes porten pegat: l'alumne veu la pàgina ja corregida. Com s'escriuen: `ERRADES.md`.

## Les proves

```bash
node eines/comprova.js
```

Comprova que cada unitat i matèria existeixen, que cada fitxa té imatges i que les imatges hi són,
que les tasques només fan servir exercicis del catàleg i tenen dates vàlides, que les pistes tenen
el format bo, que les errades i els enunciats apunten a exercicis i imatges que existeixen, i que
totes les fórmules es pinten amb KaTeX sense error. GitHub la passa sola a
cada canvi (Actions → *Comprova el web*): si surt en vermell, alguna dada no quadra.

<!-- atribucio-centre:inici -->

---

Material desenvolupat per **David Arso Civil** per al Departament de Matemàtiques de l'INS Miquel Tarradell.
Contingut sota CC BY-NC-ND 4.0, codi sota llicència MIT. Vegeu [`LLICENCIA.md`](LLICENCIA.md).

<!-- atribucio-centre:final -->
