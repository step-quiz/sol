# Les errades del solucionari: què s'ha fet i com funciona

> **Per a qui és aquest document.** Per a una IA (Claude) que arriba a aquest repositori
> sense cap context i ha d'entendre, mantenir o ampliar la feina feta sobre les errades
> del solucionari. Estat a **4 d'octubre de 2026**.
>
> Abans llegeix `CLAUDE.md` (qui és l'usuari i com es treballa al repo) i el `README.md`
> (com fa servir el web el professor). Aquí només s'explica la part de les errades.

---

## 1. El que has de saber en un minut

- El web ensenya a l'alumne, per a cada exercici programat, la **imatge de la pàgina del
  solucionari** (Santillana, Matemàtiques II, 2n de Batxillerat) amb l'enunciat i la solució.
- El solucionari té errades. El professor en té la llista escrita en LaTeX: és a `tex/`.
- La feina s'ha fet en **tres fases**, i cada una s'afegeix a l'anterior:

  | Fase | Què hi afegeix | Camp a `errades.js` |
  |---|---|---|
  | 1 | Un avís a la llista de la tasca i una targeta «On diu / Ha de dir» dins de l'exercici | `ondiu`, `hadedir`, `motiu`, `lloc`, `enunciat` |
  | 2 | Un requadre vermell numerat sobre la imatge, al lloc exacte de l'errada | `marca` |
  | 3 | Un «pegat»: la imatge es veu **ja corregida**, sense cap senyal, i l'errada deixa d'anunciar-se | `pegat` |

- **Xifres actuals:** 83 errades en 51 exercicis (2 són d'enunciat) · 25 observacions ·
  87 requadres (les 83 errades en tenen) · **77 errades amb pegat (93 pegats)** · 6 sense pegat.
- **Les imatges de les pàgines no es toquen mai.** Tot el que es veu a sobre (requadres i
  pegats) ho posa el navegador.
- Les eines amb què es van generar les dades, les posicions i els pegats **no són al repo**
  (vegeu l'apartat 9).

---

## 2. On és cada cosa

| Fitxer o carpeta | Paper |
|---|---|
| `tex/` | L'origen: la llista d'errades del professor, en LaTeX (apartat 3) |
| `errades.js` | Les dades (errades i observacions) **i** les funcions que les pinten. És l'únic que llegeix el web |
| `tasca.html` | On es veu tot: llista de la tasca, exercici, imatge ampliada |
| `assets/style.css` | Estils (classes `err-*`, `ex-err`, `marca*`, `pegat`, `lb-*`) |
| `assets/katex/` | KaTeX 0.16.47 en local: pinta les fórmules de `errades.js` |
| `marca.js` | Eina del professor per marcar on és una errada. Només es carrega amb `?tot=1&marca=1` |
| `pegats/<unitat>/` | Els pegats: PNG petits amb el tros de pàgina ja corregit |
| `uN/<tema>/data/full-K.png` | Les imatges de les pàgines. **No es toquen** |
| `source/` | Els PDF del solucionari, un per unitat (d'aquí surten les imatges) |
| `tasques.js`, `cataleg.js` | Quins exercicis hi ha cada setmana i quines imatges té cada exercici |

La clau d'un exercici és sempre `'unitat/exercici'`, per exemple `'u7/92'` (la mateixa que a `hints.js`).

Per veure-ho tot sense esperar les dates: `tasca.html?tot=1#u7/s3` (unitat 7, setmana 3).

---

## 3. D'on surten les errades: la carpeta `tex/`

El professor hi puja el projecte de LaTeX «Errades del solucionari»:

- `main.tex` — el document. A dalt hi ha dos interruptors: `\motiufalse` / `\motiutrue`
  (ensenyar o no el motiu) i `\obsfalse` / `\obstrue` (ensenyar o no les observacions).
- `defs.tex` — les definicions (`\setmana`, `errada`, `\ondiu`, `\hadedir`, `\motiu`,
  `observacio`, `\senseerrades`, `\dlim`, `\R`).
- `headers.tex` — paquets i format.
- `errors-setmana1.tex` … `errors-setmana36.tex` — **un fitxer per setmana** del curs.

Cada errada s'escriu així:

```latex
\setmana{3}{Unitat 7 \textperiodcentered{} Límits i continuïtat}{4 d'octubre de 2026}%
        {92, 93, 94, 102, 103, 40 i 106}

\begin{errada}{Exercici 92 e)}
  \ondiu{«La funció no és contínua en $x=-2$; té una discontinuïtat de salt finit.»}
  \hadedir{«La funció no és contínua en $x=2$; té una discontinuïtat de salt finit.»}
  \motiu{És la frase que tanca l'estudi del punt $x=2$ ...}
\end{errada}
```

Quan es va fer la conversió hi havia 36 `\setmana`, 83 entorns `errada` i 22 entorns
`observacio`. Si ara n'hi ha un altre nombre, el LaTeX ha canviat després.

### Com es va passar de `tex/` a `errades.js`

| Al LaTeX | A `errades.js` |
|---|---|
| El fitxer és d'una setmana; la unitat surt de `\setmana` (i de `tasques.js`) | La clau: `'u7/92'` |
| Títol de l'entorn: `Exercici 92 e)` | `` lloc: TEX`e)` `` (el que ve darrere del número) |
| Títol amb `(enunciat)`: `Exercici 38 (enunciat)` | `enunciat: 1`, sense `lloc` |
| `\ondiu{...}`, `\hadedir{...}`, `\motiu{...}` | `ondiu`, `hadedir`, `motiu`, amb el mateix text |
| `\begin{observacio}{...}` | Una entrada a `OBSERVACIONS` (25, perquè algunes parlen de més d'un exercici) |
| Diverses errades del mateix exercici | Una llista, en l'ordre en què surten a la solució |

**Relació entre tots dos.** La conversió es va fer **un sol cop** i es va comprovar que
quadrava (les 83 errades, text per text, i les 597 fórmules pintades amb KaTeX sense cap
error). Des de llavors `errades.js` s'edita a mà i és l'únic que llegeix el web. `tex/` és
l'origen i la referència. Si l'un i l'altre no diuen el mateix, **no ho arreglis pel teu
compte: pregunta al professor quin és el bo.** No hi ha cap conversor al repo.

---

## 4. Fase 1 — L'avís i la targeta

### Les dades

```js
const ERRADES_MOTIU  = false;  // true: cada targeta ensenya també el «Motiu»
const ERRADES_OBS    = false;  // true: es veuen també les observacions
const ERRADES_PEGATS = true;   // fase 3 (apartat 6)
const TEX = String.raw;        // no es toca

const ERRADES = {
  'u9/42': [
    { lloc:    TEX`d), valor de $y'(2)$`,
      ondiu:   TEX`$y'(2)=80-60-20>0$`,
      hadedir: TEX`$y'(2)=80-60=20>0$`,
      motiu:   TEX`$y'(2)=5\cdot 2^4-15\cdot 2^2=80-60=20$. ...`,
      pegat:   ['creixement/data/full-3.png', 26.532, 21.037, 8.468, 1.524, '42-1a.png'],
      marca:   ['creixement/data/full-3.png', 12.3, 20.9, 22.8, 2.1] },
    { ... la segona errada del mateix exercici ... },
  ],
};
const OBSERVACIONS = { 'u1/42': [ { text: TEX`...` } ], ... };
```

| Camp | Obligatori | Què és |
|---|---|---|
| `ondiu` | sí | El que hi ha imprès |
| `hadedir` | sí | El que hi hauria de dir |
| `lloc` | no | L'apartat i, si cal, un detall: `f)`, `e), punt $x=1$` |
| `motiu` | no | L'explicació. Només es veu amb `ERRADES_MOTIU = true` |
| `enunciat: 1` | no | L'errada és a l'**enunciat**, no a la solució (n'hi ha 2: `u10/38` i `u2/95`) |
| `marca` | no | Fase 2 |
| `pegat` | no | Fase 3 |

### Com s'escriu el text

- Sempre `TEX` i accents greus. Així el LaTeX es copia tal qual, sense doblar cap barra.
- Les fórmules, entre `$...$`. Hi ha definides `\dlim` i `\R`, com a `defs.tex`.
- Fora dels dòlars és text normal i només s'hi entenen `\quad`, `\;` i `\,`.
- Dins del text no hi pot haver **cap accent greu** ni la parella `${`.
- KaTeX pinta **en vermell** el que no entén: després de tocar res, mira que no n'hi hagi.

### KaTeX

És en local (`assets/katex/`, versió **0.16.47**) perquè el web no depèn de cap servidor de
fora. **No l'actualitzis:** `errades.js` enganxa la puntuació que toca una fórmula (coma,
punt, cometes) dins del codi que genera KaTeX, perquè al mòbil no quedi sola a la línia
següent. Això depèn de com és per dins aquesta versió (constants `_KATEX_FI` i
`_KATEX_TROS`); la 0.17 i les següents canvien l'estructura.

### On es veu

- **A la llista de la tasca:** una etiqueta vermella al costat del botó «Veure solució»
  («2 errades al solucionari»). Les errades d'enunciat hi surten senceres, en un bloc
  «L'enunciat té una errada», perquè l'alumne les ha de saber abans de començar.
- **Dins de l'exercici:** just abans de la imatge (`#err-wrap`), una targeta «On diu / Ha de
  dir» per errada. En obrir l'exercici la pàgina puja a dalt de tot perquè es vegin.

### Les funcions d'`errades.js`

| Funció | Què torna |
|---|---|
| `erradesDe(u, n)` | La llista d'errades de l'exercici |
| `observacionsDe(u, n)` | Les observacions (buit si l'interruptor és apagat) |
| `avisErrades(u, n)`, `htmlAvisErrades(u, n)` | El text i l'HTML de l'etiqueta de la llista |
| `htmlErradesEnunciat(u, n)` | El bloc de les errades d'enunciat, per a la llista |
| `htmlErrades(u, n)` | Les targetes de dins de l'exercici (i les observacions) |
| `htmlErradaSola(u, n, k)` | La targeta d'una sola errada (per al peu de la imatge ampliada) |
| `marquesDe(e)`, `htmlMarques(u, n, img)` | Fase 2 |
| `pegatsDe(e)`, `htmlPegats(u, img)` | Fase 3 |
| `texAHtml(s)`, `preparaFormules()` | Text amb fórmules → HTML |

`tasca.html` comprova que existeixin (`AMB_ERRADES`, `AMB_MARQUES`, `AMB_PEGATS`): si
`errades.js` o KaTeX no carreguen, el web funciona igual, sense errades.

---

## 5. Fase 2 — El requadre sobre la imatge

```js
marca: ['limits-punt/data/full-4.png', 58.9, 64.5, 34.7, 4.3],        // un lloc
marca: [['continuitat/data/full-2.png', 61.9, 7.1, 23.6, 2.8],        // dos llocs
        ['continuitat/data/full-2.png', 61.9, 16.2, 9.1, 2.2]],
```

La imatge (escrita igual que a `cataleg.js`, sense la unitat) i un rectangle en **tant per
cent de la imatge**: `x`, `y` (cantó de dalt a l'esquerra), amplada i alçada. En tant per
cent perquè la imatge es veu a mides diferents segons la pantalla.

**Què es veu.** Sobre la imatge, un requadre vermell amb un número (el de la targeta). En
tocar-lo, o en prémer «Mostra-ho a la imatge» a la targeta, la imatge s'amplia centrada en
aquell punt i la correcció surt a sota (`#lb-peu`). Escape tanca.

**Com es van trobar les 87 posicions.** Amb la capa de text dels PDF de `source/` (on és
cada lletra) i casant cada imatge amb la seva pàgina del PDF. Després es van revisar **totes
a ull**. Una marca mal posada és pitjor que cap marca.

**Per marcar-ne una de nova** hi ha l'eina del professor: `tasca.html?tot=1&marca=1`. S'entra
a l'exercici, es tria l'errada, s'arrossega un rectangle sobre la imatge i l'eina dona la
línia `marca: [...]` per enganxar a `errades.js`. No desa res enlloc.

---

## 6. Fase 3 — El pegat

**La decisió és del professor (4 d'octubre de 2026):** vol que la pàgina *sembli corregida,
sense cap senyal*. Per això un pegat no porta vora ni número, i l'errada que en té deixa
d'anunciar-se.

```js
pegat: ['continuitat/data/full-2.png', 66.142, 78.632, 21.689, 1.755, '92-2a.png'],
pegat: [[...], [...], [...]],      // una errada pot necessitar més d'un pegat
```

Com `marca`, més el nom del fitxer, que és a `pegats/<unitat>/`.

- **El nom:** `92-2a.png` = exercici 92, **segona** errada de la seva llista, tros `a`.
- **El fitxer:** un retall de la pàgina, a la mateixa resolució que la imatge (un píxel del
  pegat és un píxel de la pàgina), amb 3 píxels de pàgina sense tocar al voltant.
- **Com es pinta:** `htmlPegats(u, img)` torna
  `<img class="pegat" src="pegats/u7/92-2a.png" style="left:..%;top:..%;width:..%;height:..%">`
  i `tasca.html` el posa dins de la figura, sobre la imatge, i també a la imatge ampliada
  (`#lb-pegats`). No atura els clics (`pointer-events:none`).
- **Quins pegats surten sobre una imatge:** **tots** els d'aquella imatge, siguin de
  l'exercici que siguin. La pàgina s'ha de veure corregida es miri des d'on es miri.

### Una errada amb pegat és una errada «callada»

Amb `ERRADES_PEGATS = true`, si una errada té `pegat` (`_callada(e)`):

- no compta a l'etiqueta de la llista,
- no té targeta,
- no té requadre vermell,
- i les errades que queden es tornen a numerar (`_numero`).

Dues excepcions pensades:

1. **Les errades d'enunciat s'anuncien igualment a la llista**, encara que tinguin pegat: el
   llibre de l'alumne continua tenint l'errada.
2. **A una imatge amb pegats no s'ofereix «Obre la imatge en nova pestanya»**, perquè
   s'obriria la imatge original, sense corregir.

Amb `ERRADES_PEGATS = false` no surt cap pegat i tot torna a ser com a la fase 2.

### Què hi ha dins d'un pegat

**Només canvien els signes equivocats.** Estan fets amb signes copiats de la mateixa pàgina
(la lletra del llibre de veritat, no una d'imitada), i la resta de la línia són els seus
píxels originals, desplaçats si el text nou fa una altra amplada. No s'ha fet servir LaTeX
en cap dels 93. El mètode és a l'apartat 9.

---

## 7. Què veu l'alumne, cas per cas

| L'errada… | Llista de la tasca | Dins de l'exercici | Imatge |
|---|---|---|---|
| té pegat | res | res | corregida, sense senyal |
| no té pegat | etiqueta vermella | targeta «On diu / Ha de dir» | requadre vermell numerat |
| és d'enunciat i té pegat | bloc «L'enunciat té una errada» | res | corregida, sense senyal |
| és d'enunciat i no té pegat | bloc «L'enunciat té una errada» | targeta | requadre vermell |
| qualsevol, amb `ERRADES_PEGATS = false` | com «no té pegat» | com «no té pegat» | original amb requadre |

Un exercici pot barrejar casos. Per exemple, `u9/67` té quatre errades: tres amb pegat i una
sense. Anuncia «1 errada al solucionari» i ensenya una sola targeta, amb el número 1.

---

## 8. Estat errada per errada

### Les sis que no tenen pegat (i per què)

Es veuen amb targeta i requadre. No és un oblit:

| Errada | Motiu |
|---|---|
| `u9/67`, apartat n) | Cal passar un tros de text d'una frase a una altra, en línies diferents |
| `u10/75`, apartat d) | La correcció afegeix línies noves que no caben on és l'original |
| `u10/108`, apartat d) | El mateix: la correcció és molt més llarga |
| `u6/88`, l'equació | Una línia es converteix en una fracció de dos pisos, i no hi ha lloc entre les veïnes |
| `u6/139`, apartats b) i c) | L'error ve de l'apartat a) i s'arrossega per passos intermedis que no són a la llista. Tapar només el resultat deixaria la pàgina incoherent |

### Decisions que no es dedueixen de «On diu / Ha de dir»

- **`u7/92` b):** el pegat corregeix també la línia «→ Existeix lim f(x) = 0,5», que no és a
  la llista d'errades però repeteix el valor equivocat.
- **`u3/60` a):** el «<» surt dues vegades al llibre (final d'una línia i començament de la
  següent). Canviats tots dos per «=».
- **`u3/100`:** corregit a la matriu A i també a A*.
- **`u9/67` f):** les tres línies que sobraven s'han esborrat. Hi queda un buit en blanc.
- **`u9/42` d) i `u8/58`:** frases reescrites amb lletres copiades de la mateixa pàgina.
- **`u10/75` b):** quatre valors canviats i dos signes menys trets; el segon càlcul sencer
  s'ha desplaçat per tancar el forat.
- **`u10/78` b):** afegit «− {−2}» darrere de ℝ. **`u10/37`:** els nombres passen a ser x₁, x₂, x₃.
- **`u10/63` c), `u7/76` f), `u12/55` c):** fraccions refetes (numerador, denominador i, si
  cal, la barra més llarga).
- **`u11/54` f):** dos pegats en dues pàgines diferents (l'integrand i el resultat).
- **`u12/55` g):** el «2» de «cos 2x» passa a ser un exponent; la resta de la línia no es mou.
- **Matrius i determinants:** en treure un signe menys, la xifra no es mou (les columnes
  estan alineades).

### Recompte per unitat

| Unitat | Errades | Amb pegat | Fitxers de pegat |
|---|---|---|---|
| u1 | 1 | 1 | 2 |
| u2 | 2 | 2 | 2 |
| u3 | 9 | 9 | 13 |
| u5 | 8 | 8 | 10 |
| u6 | 9 | 6 | 7 |
| u7 | 10 | 10 | 12 |
| u8 | 1 | 1 | 1 |
| u9 | 9 | 8 | 8 |
| u10 | 25 | 23 | 28 |
| u11 | 4 | 4 | 5 |
| u12 | 2 | 2 | 2 |
| u13 | 2 | 2 | 2 |
| u14 | 1 | 1 | 1 |
| **Total** | **83** | **77** | **93** |

---

## 9. Com es van fer els pegats, i què no hi ha al repo

### El que no hi ha

Aquestes eines van viure només a l'entorn de treball de la IA que va fer la feina:

- el conversor de `tex/` a `errades.js` i el comprovador que tots dos quadren;
- el localitzador de posicions (per a `marca`);
- el motor de pegats i les «receptes» (una per errada: què es canvia per què);
- les proves automàtiques del navegador.

**Conseqüència pràctica:** sense reconstruir el motor no pots fer pegats nous. No passa res:
una errada sense `pegat` es veu amb targeta i requadre, que és un resultat correcte. **Un
pegat mal fet és pitjor que cap pegat.**

### El mètode, per si l'has de refer

1. **Casar la imatge amb el PDF.** Cada `full-K.png` és un retall d'una pàgina del PDF de
   `source/`, a 200 ppp per un factor que canvia segons la unitat (les imatges fan entre
   1208 i 1247 px d'amplada: no en suposis cap). Es troba comparant imatges.
2. **Llegir la capa de text del PDF** (amb `pdfplumber`): de cada caràcter, la caixa, la
   **línia de base** (surt de la matriu de text), la lletra i la mida. Passat a píxels de
   la imatge, se sap on és cada signe.
3. **Trobar el text vell** dins del rectangle de la `marca`, com una seqüència de caràcters
   seguits d'una mateixa línia de base.
4. **Esborrar-lo** amb el color de fons d'aquell lloc (no sempre és blanc).
5. **Compondre el text nou amb signes copiats de la mateixa pàgina:** la mateixa lletra, el
   mateix gruix i la mateixa mida, triant el més proper que tingui els mateixos veïns (així
   l'espaiat surt igual). Es recoloreix amb la tinta del lloc.
6. **Desplaçar la resta de la línia** el que hagi canviat d'amplada.
7. **Retallar** la caixa dels píxels que han canviat de veritat, amb 3 px de marge, i
   passar-la a tant per cent.
8. **Mirar cada pegat ampliat**, abans i després. Sempre.

### Paranys (tots van passar)

- **El PDF porta text amagat** en alguns llocs. Abans de copiar un signe, comprova que a la
  imatge hi ha tinta.
- **Barres de fracció, arrels, barres de valor absolut i fletxes de vector no són
  caràcters:** són ratlles dibuixades. Si mous la línia lletra a lletra, es queden enrere.
  En aquestes línies s'ha de moure la franja sencera.
- **Les fletxes (→)** tenen la línia de base un parell de píxels més avall que el text.
- **Les lletres cursives** sobresurten de la seva caixa, per l'esquerra i per la dreta.
- **Els accents i el punt de la i** queden per sobre de la caixa de la lletra.
- **Les xifres no fan totes la mateixa amplada.** Diversos canvis en una mateixa línia s'han
  de fer de dreta a esquerra, o canviar el nombre sencer d'un sol cop.
- **El signe menys «de davant»** (−4) va més enganxat que el de restar (x − 4). En treure'n
  un, s'ha de conservar l'espai que deixava.
- **L'enunciat** va en lletra normal i negra, amb els signes d'operació en negreta; la
  **solució**, en lletra fina i blava. No es poden barrejar.
- **Prop de la vora de la pàgina,** la caixa del pegat s'ha de mesurar sobre els píxels que
  han canviat, no sobre una zona eixamplada.
- **A ull i sense ampliar no es veu res.** Una taca d'un píxel només surt ampliant quatre o
  cinc vegades, o mirant els píxels un per un.

### Com surten els signes a la capa de text del PDF

| Es veu | Lletra al PDF | Caràcter que es llegeix |
|---|---|---|
| Text de la solució | `VectoraLTStd-Light`, 8,5 pt | el mateix |
| Text de l'enunciat | `VectoraLTStd-Roman` | el mateix |
| Variables (cursiva) | `VectoraLTStd-LightItalic` | el mateix |
| + − = | `MMaCentury` (o `MMaCenturyK`; a l'enunciat, `-Bold`) | `+` `-` `=` |
| < > | `MMaCentury`, o bé `MMaExtra` | `<` `>`, o bé `1` `2` |
| → | `MMaArrow` | `"` |
| ′ ″ ∞ | `MMaEtc` | `l` `m` `3` |
| ∩ ∪ ± | `MMaBinary` | `+` `,` `!` |
| ≠ ∈ ∀ | `MMaNegate`, `MMaRelation`, `MMaExtra` | `!` `!` `6` |
| ℝ | `MMaFermat` | `R` |
| λ π | `MMaGreek` | `m` `r` |
| · (multiplicar) | `MathematicalPiLTStd` | `?` |
| ∫ | `MMaVariable`, 18,7 pt | `y` |
| Parèntesis i claus grans | `MMaVariableA` | lletres i xifres diverses |
| Subíndexs i exponents | les mateixes lletres, a 5,1 pt | — |

---

## 10. Regles per tocar-ho

**Sempre**

- Després de canviar `errades.js`, obre `tasca.html?tot=1#u7/s3` i mira que no hi hagi cap
  fórmula en vermell.
- Si canvies `errades.js` o `assets/style.css`, puja el número de `?v=` amb què `tasca.html`
  els carrega (ara `errades.js?v=3` i `style.css?v=7`). Si no, els alumnes veuran la còpia vella.
- Respon i escriu en català (`CLAUDE.md`).

**Mai**

- No toquis les imatges `uN/<tema>/data/full-K.png`.
- No actualitzis KaTeX.
- No inventis posicions: una `marca` es fa amb l'eina, i un `pegat` no es fa a mà.
- No posis `[skip ci]`, `[ci skip]` ni `[cf-pages-skip]` en cap missatge de commit: el web es
  publica sol a partir de GitHub, i Cloudflare Pages no publica els commits que porten
  aquestes etiquetes.

**Feines habituals**

| Et demanen… | Què has de fer |
|---|---|
| Afegir una errada | Escriu-la a `errades.js` (a la llista del seu exercici, en l'ordre de la solució). Demana al professor que la marqui amb `?tot=1&marca=1`. Sense `pegat`, es veurà amb targeta i requadre |
| Canviar el text d'una errada que té `pegat` | Si canvia el que ha de dir la pàgina, **treu-li el `pegat`** (la imatge del pegat ja no seria certa) i avisa el professor |
| Treure una errada | Esborra l'entrada i els seus fitxers de `pegats/` |
| Tornar als requadres vermells | `ERRADES_PEGATS = false` |
| Ensenyar els motius o les observacions | `ERRADES_MOTIU = true`, `ERRADES_OBS = true` |
| Canviar una imatge de pàgina (un altre retall o una altra mida) | Totes les `marca` i els `pegat` d'aquella imatge deixen de valer: s'han de refer |
| Canviar el camí d'una imatge a `cataleg.js` | Canvia'l també a `marca` i a `pegat`: han de ser idèntics |
| El `tex/` i `errades.js` no diuen el mateix | Pregunta quin és el bo. No hi ha conversor |

**Limitacions conegudes**

- Si una mateixa pàgina és copiada a dues carpetes de tema, el pegat només surt a la còpia
  que fa servir l'exercici de l'errada.
- Només s'ha provat amb Chromium. **Safari i Firefox no s'han provat.**

---

## 11. Com es va comprovar

- **Dades:** les 83 errades, comparades text per text amb el LaTeX; les 597 fórmules,
  pintades amb KaTeX sense cap error.
- **Posicions:** les 87 marques, revisades a ull.
- **Pegats:** els 93, mirats un per un, ampliats, abans i després.
- **Al navegador (Chromium), a 390 i 1100 px d'amplada, obrint els 175 exercicis de les 36
  tasques:** cada pegat es veu a la mateixa escala que la seva pàgina, no surt de la imatge,
  no atura els clics i surt també a la imatge ampliada; les errades amb pegat no s'anuncien
  i les altres sí; cap error de consola ni de xarxa.
- **Amb `ERRADES_PEGATS = false`:** 49 etiquetes, 2 blocs d'enunciat i 83 targetes, com
  abans de la fase 3.

Per comprovar-ho a mà: `tasca.html?tot=1#u7/s3`, exercici 92. No ha de tenir etiqueta ni
targeta, i a la imatge, a l'apartat b), hi ha de dir «= 1» i «f(2) = 5».

---

## 12. Pendent

- Dins d'un exercici, el botó «enrere» del navegador surt de la tasca en lloc de tornar a la
  llista d'exercicis (ja passava abans de les errades).
- Opcional: una pàgina `errades.html` amb totes les errades per setmana.
- Provar-ho amb Safari (iPhone) i Firefox.
- Les sis errades sense pegat (apartat 8), si mai es troba la manera de tapar-les bé.

La resta de pendents del projecte és a `TODO.md`.
