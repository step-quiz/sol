/* ═══════════════════════════════════════════════════════════════════════
   LES ERRADES DEL SOLUCIONARI
   ───────────────────────────────────────────────────────────────────────
   El solucionari té errades. Aquí hi ha les dels exercicis programats a
   tasques.js. La clau és la mateixa que a hints.js:  'unitat/exercici'.

     'apl-ud10/U4.76': [
       { lloc:    TEX`f)`,
         ondiu:   TEX`$\dlim_{x\to 3}\dfrac{3-x}{x+2}=0$`,
         hadedir: TEX`$\dlim_{x\to 3}\dfrac{-(3+x)}{x+2}=-\dfrac{6}{5}$`,
         motiu:   TEX`Els factors $3-x$ i $x-3$ són oposats.` },
     ],

   Cada exercici porta una LLISTA d'errades (entre [ ]), en l'ordre en què
   surten a la solució. De cada errada:

     lloc      on és: l'apartat i, si cal, un detall
               (TEX`f)` , TEX`e), punt $x=1$` , TEX`segon punt` ...).
               Si no cal dir res, aquesta línia no es posa.
     ondiu     el que hi ha imprès al solucionari
     hadedir   el que hi hauria de dir
     motiu     l'explicació. Només es veu si ERRADES_MOTIU és true.
     pegat     un tros de la pàgina ja corregit, que es posa a sobre de la imatge:
                 pegat: ['continuitat/data/full-2.png', 82.2, 7.4, 5.5, 1.7, '92-1a.png']
               La imatge, el rectangle (en tant per cent, com a `marca`) i el
               fitxer, que és a  pegats/<unitat>/ . Amb ERRADES_PEGATS encès,
               una errada amb pegat no s'anuncia enlloc (ni avís ni targeta ni
               requadre): l'alumne veu la pàgina corregida i prou. Les errades
               d'enunciat s'anuncien igualment a la llista, perquè el llibre
               de l'alumne continua tenint l'errada. Els pegats no es poden
               fer a mà: els fa  eines/pegats/  (vegeu eines/LLEGEIX-ME.md).
     enunciat  s'escriu  enunciat: 1  quan l'errada és a l'ENUNCIAT i no a la
               solució. Aquestes es mostren ja a la llista de la tasca,
               abans que l'alumne comenci l'exercici.
     marca     on és l'errada DINS DE LA IMATGE: el fitxer (tal com surt a
               cataleg.js) i un rectangle en percentatges de la imatge:
                   marca: ['limits-punt/data/full-4.png', x, y, amplada, alçada],
               (x, y) és el cantó de dalt a l'esquerra. Si l'errada ocupa dos
               llocs, una llista de rectangles:  marca: [[...], [...]],
               No s'escriu a mà: obre  tasca.html?tot=1&marca=1  , entra a
               l'exercici, arrossega un rectangle sobre la imatge i copia la
               línia que et dona. Una errada sense `marca` es veu igualment,
               només que sense senyal a la imatge.

   Un exercici sense entrada aquí no mostra res: no cal deixar-hi cap
   llista buida.

   COM S'ESCRIU EL TEXT
     · Sempre entre accents greus i amb TEX al davant:  TEX`...`
       Així el LaTeX s'escriu tal qual, sense doblar cap barra invertida.
     · Les fórmules van entre dòlars, $...$, com en un fitxer .tex.
       Les pinta KaTeX (assets/katex). Hi ha definides \dlim (límit amb el
       subíndex a sota) i \R (els nombres reals), com a defs.tex.
     · Fora dels dòlars és text normal. Només s'hi entenen tres comandes
       d'espai:  \quad   \;   \,
     · Dins del text no hi pot haver cap accent greu ni la parella ${

   ON ES VEU (tasca.html)
     · A la llista de la tasca: una etiqueta vermella al costat del botó
       «Veure solució» («2 errades al solucionari»). Les errades d'enunciat
       hi surten senceres, perquè s'han de saber abans de començar.
     · Dins de l'exercici: una targeta «On diu / Ha de dir» per errada, just
       abans de la imatge, i un requadre vermell numerat sobre la imatge, al
       lloc de l'errada. En tocar el requadre (o «Mostra-ho a la imatge»),
       la imatge s'amplia en aquell punt amb la correcció a sota.

   D'ON SURT AQUEST FITXER
     Les errades i les marques s'escriuen a mà, aquí mateix. Els camps
     `pegat` i la taula PAGINES_IGUALS els posa  eines/pegats/aplica.py  a
     partir de  eines/pegats/pegats.json : no s'editen a mà. Vegeu ERRADES.md.
     Si hi canvies res a mà, passa també el canvi a aquestes fonts: si no,
     es perdrà el dia que algú torni a generar el fitxer.
   ═══════════════════════════════════════════════════════════════════════ */

/* ── Interruptors ───────────────────────────────────────────────────────
   Són els dos que hi havia a dalt de main.tex. Per encendre'n un, canvia
   false per true. */
const ERRADES_MOTIU = false;   // true: cada errada mostra també el «Motiu»
const ERRADES_OBS   = false;   // true: es veuen també les observacions
const ERRADES_PEGATS = true;   // true: on hi ha «pegat», la imatge es veu ja corregida i l'errada no s'anuncia

/* pagines-iguals:inici (ho fa eines/pegats/aplica.py) */
const PAGINES_IGUALS = {
  'apl-ud1/u1-aproximacio/data/full-5.png': 'p26',
  'apl-ud1/u1-intervals/data/full-1.png': 'p26',
  'apl-ud2/u2-percentatges/data/full-3.png': 'p40',
  'apl-ud7/u2-activitats/data/full-1.png': 'p40',
  'apl-ud2/u2-problemes/data/full-6.png': 'p57',
  'apl-ud7/u2-interes/data/full-1.png': 'p57',
  'apl-ud5/u3-equacions/data/full-4.png': 'p77',
  'apl-ud6/u3-equacions/data/full-1.png': 'p77',
  'apl-ud10/u3-problemes/data/full-1.png': 'p84',
  'apl-ud5/u3-problemes/data/full-1.png': 'p84',
  'apl-ud3/u5-escales/data/full-1.png': 'p135',
  'apl-ud4/u5-activitats/data/full-2.png': 'p135',
  'apl-ud3/u5-problemes/data/full-1.png': 'p149',
  'apl-ud4/u5-semblanca/data/full-4.png': 'p149',
  'apl-ud3/u5-problemes/data/full-3.png': 'p152',
  'apl-ud4/u5-problemes/data/full-2.png': 'p152',
  'apl-ud6/u7-paraboles/data/full-1.png': 'p204',
  'apl-ud7/u7-lineals/data/full-4.png': 'p204',
  'apl-ud10/u7-problemes/data/full-2.png': 'p225',
  'apl-ud5/u7-problemes/data/full-1.png': 'p225',
  'apl-ud6/u7-problemes/data/full-2.png': 'p225',
  'apl-ud7/u7-situacions/data/full-5.png': 'p225',
};
/* pagines-iguals:fi */

const TEX = String.raw;        // no toquis aquesta línia

const ERRADES = {

  /* ── 4t ESO Aplicades · UD4 · Mesura indirecta (Santillana U5) ────────── */

  /* ── 4t ESO Aplicades · UD1 ── */

  'apl-ud1/U1.45': [
    { lloc:    TEX`a)`,
      ondiu:   TEX`$\dfrac{\sqrt{3}}{2} < \dfrac{\sqrt{6}}{2} < \sqrt{3}$`,
      hadedir: TEX`$\dfrac{\sqrt{3}}{3} < \dfrac{\sqrt{6}}{2} < \sqrt{3}$`,
      motiu:   TEX`El nombre de l’enunciat és $\dfrac{\sqrt{3}}{3}$, no $\dfrac{\sqrt{3}}{2}$.`,
      marca:   ['u1-reals/data/full-4.png', 14.2, 35.2, 4.9, 4.0],
      pegat:   [['u1-reals/data/full-4.png', 15.563, 37.736, 1.49, 1.627, 'U1.45-1a.png']] },
  ],

  'apl-ud1/U1.48': [
    { lloc:    TEX`c)`,
      ondiu:   TEX`$\sqrt{\dfrac{7}{3}} = 1{,}527525231\ldots$`,
      hadedir: TEX`per exemple, $\sqrt{\dfrac{12}{5}} = 1{,}549193338\ldots$`,
      motiu:   TEX`Cal un irracional entre $1{,}5\widehat{3} = 1{,}533\ldots$ i $1{,}\widehat{5} = 1{,}555\ldots$, i $1{,}5275\ldots$ és menor que tots dos.`,
      marca:   ['u1-reals/data/full-4.png', 57.4, 63.5, 23.8, 4.7],
      pegat:   [['u1-reals/data/full-4.png', 62.666, 62.85, 18.791, 4.294, 'U1.48-1a.png']] },
  ],

  'apl-ud1/U1.57': [
    { lloc:    TEX`c) i d)`,
      ondiu:   TEX`$\sqrt{2}\,a$ és irracional i $\pi a$ és irracional`,
      hadedir: TEX`$\sqrt{2}\,a$ i $\pi a$ són irracionals només si $a \neq 0$. Si $a = 0$, tots dos valen $0$, que és racional`,
      motiu:   TEX`Per aïllar $\sqrt{2}$ o $\pi$ es divideix per $a = \dfrac{b}{c}$, i això demana que $b \neq 0$.`,
      marca:   [['u1-reals/data/full-7.png', 12.4, 28.0, 34.4, 4.3], ['u1-reals/data/full-7.png', 12.4, 45.3, 28.0, 5.7]],
      pegat:   [['u1-reals/data/full-7.png', 22.93, 30.313, 8.195, 1.695, 'U1.57-1a.png'],
               ['u1-reals/data/full-7.png', 25.911, 49.087, 8.195, 1.695, 'U1.57-1b.png']] },
  ],

  'apl-ud1/U1.89': [
    { lloc:    TEX`a)`,
      ondiu:   TEX`$m = 1{,}6726\cdot 10^{-27}$ g, $E_a = 1{,}998\cdot 10^{-24}$, $E_r = 1\,194{,}74$. És un error molt gran`,
      hadedir: TEX`$m = 1{,}6726\cdot 10^{-24}$ g, $E_a = 3{,}274\cdot 10^{-25}$ g, $E_r \approx 0{,}196$ (un $19{,}6\,\%$)`,
      motiu:   TEX`La massa del protó és $1{,}6726\cdot 10^{-27}$ kg, és a dir, $1{,}6726\cdot 10^{-24}$ g. El solucionari barreja quilograms i grams.`,
      marca:   ['u1-aproximacio/data/full-5.png', 9.1, 22.6, 36.8, 15.6],
      pegat:   [['u1-aproximacio/data/full-5.png', 31.623, 23.157, 1.159, 1.109, 'U1.89-1a.png'],
               ['u1-aproximacio/data/full-5.png', 28.808, 25.962, 1.159, 1.109, 'U1.89-1b.png'],
               ['u1-aproximacio/data/full-5.png', 17.301, 28.376, 11.175, 1.826, 'U1.89-1c.png'],
               ['u1-aproximacio/data/full-5.png', 18.626, 31.05, 22.765, 3.392, 'U1.89-1d.png'],
               ['u1-aproximacio/data/full-5.png', 22.434, 35.943, 11.01, 1.957, 'U1.89-1e.png']] },
    { lloc:    TEX`b)`,
      ondiu:   TEX`$m = 9{,}1\cdot 10^{-31}$ g, $E_a = 8{,}99\cdot 10^{-28}$, $E_r = 988{,}01$. És un error molt gran`,
      hadedir: TEX`$m = 9{,}1\cdot 10^{-28}$ g, $E_a = 10^{-29}$ g, $E_r \approx 0{,}011$ (un $1{,}1\,\%$): és un error petit`,
      motiu:   TEX`La massa de l’electró és $9{,}1\cdot 10^{-31}$ kg, és a dir, $9{,}1\cdot 10^{-28}$ g.`,
      marca:   ['u1-aproximacio/data/full-5.png', 9.1, 38.6, 36.8, 14.9],
      pegat:   [['u1-aproximacio/data/full-5.png', 28.56, 38.682, 1.738, 1.174, 'U1.89-2a.png'],
               ['u1-aproximacio/data/full-5.png', 25, 41.487, 1.738, 1.174, 'U1.89-2b.png'],
               ['u1-aproximacio/data/full-5.png', 17.384, 43.77, 10.017, 1.957, 'U1.89-2c.png'],
               ['u1-aproximacio/data/full-5.png', 17.964, 46.314, 19.95, 4.436, 'U1.89-2d.png'],
               ['u1-aproximacio/data/full-5.png', 22.517, 51.272, 10.927, 2.022, 'U1.89-2e.png']] },
  ],

  'apl-ud1/U1.90': [
    { lloc:    TEX`b)`,
      ondiu:   TEX`$2{,}8 = [0;\ 2{,}8]$`,
      hadedir: TEX`$[0;\ 2{,}8]$`,
      motiu:   TEX`El «$2{,}8 =$» del davant sobra: l’interval és $[0;\ 2{,}8]$.`,
      marca:   ['u1-intervals/data/full-1.png', 11.3, 94.5, 12.6, 2.8],
      pegat:   [['u1-intervals/data/full-1.png', 11.921, 95.238, 11.589, 1.892, 'U1.90-1a.png']] },
  ],

  'apl-ud1/U1.99': [
    { lloc:    TEX`d)`,
      ondiu:   TEX`$0 = 0\cdot 0 < x\cdot y$ \quad i \quad $0 = 0\cdot 0 > x\cdot y$`,
      hadedir: TEX`$0 = 0\cdot 0 \leq x\cdot y$ \quad i \quad $0 = 0\cdot 0 \geq x\cdot y$`,
      motiu:   TEX`$y$ pot valer $0$, i llavors $x\cdot y = 0$. El resultat final, $(-2, 6)$, és correcte.`,
      marca:   [['u1-intervals/data/full-2.png', 61.8, 74.9, 26.9, 2.6], ['u1-intervals/data/full-2.png', 64.7, 79.9, 31.5, 2.6]],
      pegat:   [['u1-intervals/data/full-2.png', 70.364, 75.211, 1.904, 1.496, 'U1.99-1a.png'],
               ['u1-intervals/data/full-2.png', 73.262, 80.221, 1.904, 1.496, 'U1.99-1b.png']] },
  ],

  'apl-ud1/U1.101': [
    { ondiu:   TEX`Milena $9$, Ismael $10$, Elisa $11$, Pilar $12$, Javier $13$, Cristina $14$, com a única solució`,
      hadedir: TEX`el problema té cinc solucions. En l’ordre Milena, Elisa, Pilar, Javier, Cristina, Ismael: $9, 11, 12, 13, 14, 10$ · $9, 10, 12, 13, 14, 11$ · $8, 9, 11, 12, 13, 10$ · $8, 9, 10, 12, 13, 11$ · $7, 8, 9, 11, 12, 10$`,
      motiu:   TEX`Les condicions no fixen on va l’Ismael dins de l’ordre Milena $<$ Elisa $<$ Pilar $<$ Javier $<$ Cristina.`,
      marca:   ['u1-intervals/data/full-3.png', 9.8, 28.6, 20.5, 15.2],
      pegat:   [['u1-intervals/data/full-3.png', 9.934, 28.562, 39.321, 1.952, 'U1.101-1a.png'],
               ['u1-intervals/data/full-3.png', 9.934, 31.165, 36.424, 1.887, 'U1.101-1b.png'],
               ['u1-intervals/data/full-3.png', 9.851, 33.767, 37.5, 2.017, 'U1.101-1c.png'],
               ['u1-intervals/data/full-3.png', 9.851, 36.435, 36.507, 1.952, 'U1.101-1d.png'],
               ['u1-intervals/data/full-3.png', 9.768, 39.037, 17.715, 1.952, 'U1.101-1e.png'],
               ['u1-intervals/data/full-3.png', 9.851, 41.64, 19.288, 1.692, 'U1.101-1f.png']] },
  ],

  /* ── 4t ESO Aplicades · UD2 ── */

  'apl-ud2/U2.35': [
    { ondiu:   TEX`un $3\,\%$ menys aproximadament`,
      hadedir: TEX`un $2{,}25\,\%$ menys`,
      motiu:   TEX`$1 - 0{,}9775 = 0{,}0225$.`,
      marca:   ['u2-percentatges/data/full-2.png', 88.3, 18.1, 4.4, 2.4],
      pegat:   [['u2-percentatges/data/full-2.png', 89.073, 18.253, 5.877, 1.825, 'U2.35-1a.png'],
               ['u2-percentatges/data/full-2.png', 62.5, 20.469, 29.801, 1.956, 'U2.35-1b.png'],
               ['u2-percentatges/data/full-2.png', 56.209, 22.751, 5.629, 1.695, 'U2.35-1c.png']] },
  ],

  'apl-ud2/U2.94': [
    { lloc:    TEX`b)`,
      ondiu:   TEX`$8\,\% = \dfrac{0{,}8}{100} = 0{,}008$`,
      hadedir: TEX`$0{,}8\,\% = \dfrac{0{,}8}{100} = 0{,}008$`,
      motiu:   TEX`La comissió de l’enunciat és el $0{,}8\,\%$. La conclusió és correcta.`,
      marca:   ['u2-problemes/data/full-2.png', 59.8, 31.5, 5.3, 3.6],
      pegat:   [['u2-problemes/data/full-2.png', 59.851, 30.429, 19.454, 3.836, 'U2.94-1a.png']] },
  ],

  'apl-ud2/U2.103': [
    { ondiu:   TEX`Com que l’IVA i el guany es calculen sobre el preu inicial`,
      hadedir: TEX`Com que l’IVA es calcula sobre el preu que ja porta el guany`,
      motiu:   TEX`Multiplicar per $1{,}21\cdot 1{,}10 = 1{,}331$ vol dir aplicar un increment sobre l’altre, i el resultat, $45{,}08$ €, és correcte. Si tots dos es calculessin sobre el preu inicial, seria $\dfrac{60}{1{,}31} = 45{,}80$ €.`,
      marca:   ['u2-problemes/data/full-4.png', 57.0, 57.1, 30.0, 4.5],
      pegat:   [['u2-problemes/data/full-4.png', 57.368, 56.966, 29.801, 1.953, 'U2.103-1a.png'],
               ['u2-problemes/data/full-4.png', 57.285, 59.245, 31.374, 1.953, 'U2.103-1b.png']] },
  ],

  /* ── 4t ESO Aplicades · UD3 ── */

  'apl-ud3/U2.59': [
    { lloc:    TEX`a)`,
      ondiu:   TEX`$\dfrac{x}{61} = \dfrac{15}{25} \to x = 36{,}6$, i la columna «Distancia (cm)»`,
      hadedir: TEX`$61$ pals fan $60$ separacions, $60\cdot 15 = 900$ m, i $\dfrac{900}{25} = 36$ separacions: $37$ pals. La distància és en metres`,
      motiu:   TEX`La proporcionalitat inversa és entre les separacions i la distància de cada separació, no entre els pals. El $37$ només surt per l’arrodoniment.`,
      marca:   ['u2-problemes/data/full-4.png', 10.9, 26.0, 39.0, 9.5],
      pegat:   [['u2-problemes/data/full-4.png', 36.424, 16.97, 8.775, 2.016, 'U2.59-1a.png'],
               ['u2-problemes/data/full-4.png', 9.272, 24.577, 20.695, 1.56, 'U2.59-1b.png'],
               ['u2-problemes/data/full-4.png', 12.5, 26.788, 1.573, 1.691, 'U2.59-1c.png'],
               ['u2-problemes/data/full-4.png', 29.884, 29.064, 2.483, 1.691, 'U2.59-1d.png'],
               ['u2-problemes/data/full-4.png', 33.609, 31.144, 13.162, 3.901, 'U2.59-1e.png'],
               ['u2-problemes/data/full-4.png', 12.583, 36.151, 32.947, 2.081, 'U2.59-1f.png']] },
  ],

  'apl-ud3/U5.22': [
    { lloc:    TEX`a)`,
      ondiu:   TEX`$x = 8\,100\,000$ cm i $\dfrac{8\,100\,000}{100\,000} = 810$ km`,
      hadedir: TEX`$x = 81\,000\,000$ cm i $\dfrac{81\,000\,000}{100\,000} = 810$ km`,
      motiu:   TEX`$4{,}5\cdot 18\,000\,000 = 81\,000\,000$. El resultat, $810$ km, és correcte.`,
      marca:   ['u5-escales/data/full-1.png', 58.7, 12.2, 24.7, 7.1],
      pegat:   [['u5-escales/data/full-1.png', 76.821, 12.842, 11.838, 1.63, 'U5.22-1a.png'],
               ['u5-escales/data/full-1.png', 59.768, 15.711, 18.295, 3.846, 'U5.22-1b.png']] },
  ],

  'apl-ud3/U5.69': [
    { ondiu:   TEX`Les escales $1{:}500\,000$ ($39{,}2 \times 42{,}2$ cm) i $1{:}250\,000$ ($78{,}4 \times 84{,}4$ cm)`,
      hadedir: TEX`Han de ser escales que hi càpiguen, per exemple $1{:}1\,000\,000$ ($19{,}6 \times 21{,}1$ cm), $1{:}1\,500\,000$ ($13{,}1 \times 14{,}1$ cm) i $1{:}2\,000\,000$ ($9{,}8 \times 10{,}6$ cm)`,
      motiu:   TEX`Un DIN A4 fa $21 \times 29{,}7$ cm. Amb aquestes tres escales Galícia hi cap, però en un pòsit de $10 \times 10$ cm no.`,
      marca:   ['u5-problemes/data/full-1.png', 57.4, 32.4, 34.2, 13.9],
      pegat:   [['u5-problemes/data/full-1.png', 66.805, 32.466, 16.722, 2.017, 'U5.69-1a.png'],
               ['u5-problemes/data/full-1.png', 59.272, 34.873, 3.974, 1.757, 'U5.69-1b.png'],
               ['u5-problemes/data/full-1.png', 60.679, 37.085, 4.056, 1.822, 'U5.69-1c.png'],
               ['u5-problemes/data/full-1.png', 66.805, 39.623, 16.722, 2.017, 'U5.69-1d.png'],
               ['u5-problemes/data/full-1.png', 59.272, 41.9, 23.427, 1.952, 'U5.69-1e.png'],
               ['u5-problemes/data/full-1.png', 60.762, 44.242, 4.056, 1.757, 'U5.69-1f.png']] },
  ],


  /* ── 4t ESO Aplicades · UD4 ── */

  'apl-ud4/U5.64': [
    { ondiu:   TEX`Els costats mesuraran $6$; $9{,}6$ i $12{,}8$ cm.`,
      hadedir: TEX`Els costats mesuraran $8$; $9{,}6$ i $12{,}8$ cm.`,
      motiu:   TEX`$5\cdot 1{,}6 = 8$, no $6$.`,
      marca:   ['u5-semblanca/data/full-3.png', 55.2, 34.6, 31.0, 4.4],
      pegat:   [['u5-semblanca/data/full-3.png', 71.606, 34.655, 1.49, 1.625, 'U5.64-1a.png']] },
  ],

  'apl-ud4/U5.77': [
    { ondiu:   TEX`$\dfrac{\overline{AB}}{\overline{CB}} = \dfrac{n}{m}$, i després $\dfrac{\overline{AB}}{h} = 1 + \dfrac{\overline{AB}}{\overline{CB}}$`,
      hadedir: TEX`$\dfrac{\overline{AB}}{\overline{CD}} = \dfrac{n}{m}$, i després $\dfrac{\overline{AB}}{h} = 1 + \dfrac{\overline{AB}}{\overline{CD}}$`,
      motiu:   TEX`La raó és entre les dues columnes, $\overline{AB}$ i $\overline{CD}$; $\overline{CB}$ és un dels cables. El resultat final, $h = \dfrac{\overline{AB}\cdot\overline{CD}}{\overline{AB}+\overline{CD}}$, és correcte.`,
      marca:   [['u5-problemes/data/full-1.png', 57.0, 90.0, 10.5, 4.8],
                ['u5-problemes/data/full-2.png', 9.0, 0.5, 20.0, 10.0]],
      pegat:   [['u5-problemes/data/full-1.png', 58.94, 92.82, 7.616, 1.567, 'U5.77-1a.png'],
               ['u5-problemes/data/full-2.png', 24.669, 3.52, 1.821, 1.565, 'U5.77-1b.png'],
               ['u5-problemes/data/full-2.png', 23.344, 8.149, 1.821, 1.63, 'U5.77-1c.png']] },
  ],

  /* ── 4t ESO Aplicades · UD11 · Idea de polinomi (annex de Polinomis) ─── */

  'apl-ud11/AP.74': [
    { enunciat: 1,
      lloc:    TEX`la taula de l’OMS`,
      ondiu:   TEX`$17\,686\cdot\text{pes} + 658{,}2$ \quad i \quad $13\,384\cdot\text{pes} + 692{,}6$`,
      hadedir: TEX`$17{,}686\cdot\text{pes} + 658{,}2$ \quad i \quad $13{,}384\cdot\text{pes} + 692{,}6$`,
      motiu:   TEX`Són els coeficients de l’OMS: $17{,}686$ i $13{,}384$. Amb $17\,686$, una persona de $50$ kg necessitaria més de $880\,000$ kcal al dia.`,
      marca:   ['ap-problemes/data/full-2.png', 15.5, 72.8, 30.8, 5.0],
      pegat:   [['ap-problemes/data/full-2.png', 16.887, 73.667, 28.146, 1.756, 'AP.74-1a.png']] },
    { ondiu:   TEX`$1{,}40\cdot(17\,686\cdot x + 658{,}2)$, $1{,}40\cdot(13\,384\cdot x + 692{,}6)$…`,
      hadedir: TEX`$1{,}40\cdot(17{,}686\, x + 658{,}2)$, $1{,}40\cdot(13{,}384\, x + 692{,}6)$…`,
      motiu:   TEX`La mateixa errada de la taula, a les vuit expressions de la solució.`,
      marca:   ['ap-problemes/data/full-2.png', 55.2, 19.4, 31.5, 28.6],
      pegat:   [['ap-problemes/data/full-2.png', 69.04, 19.896, 16.97, 1.886, 'AP.74-2a.png'],
               ['ap-problemes/data/full-2.png', 67.219, 22.432, 16.722, 1.886, 'AP.74-2b.png'],
               ['ap-problemes/data/full-2.png', 69.04, 27.763, 16.97, 1.886, 'AP.74-2c.png'],
               ['ap-problemes/data/full-2.png', 67.219, 30.299, 16.722, 1.886, 'AP.74-2d.png'],
               ['ap-problemes/data/full-2.png', 69.04, 35.696, 16.97, 1.886, 'AP.74-2e.png'],
               ['ap-problemes/data/full-2.png', 67.219, 38.231, 16.722, 1.886, 'AP.74-2f.png'],
               ['ap-problemes/data/full-2.png', 66.639, 43.563, 16.722, 1.886, 'AP.74-2g.png'],
               ['ap-problemes/data/full-2.png', 64.57, 46.099, 16.805, 1.886, 'AP.74-2h.png']] },
  ],

  'apl-ud11/AP.77': [
    { ondiu:   TEX`$B(365) = 1\,460$ € de benefici`,
      hadedir: TEX`$B(365) = 1\,460$ milers d’euros, és a dir, $1\,460\,000$ € de benefici`,
      motiu:   TEX`L’enunciat diu que els ingressos i les despeses són en milers d’euros.`,
      marca:   ['ap-problemes/data/full-3.png', 57.0, 8.6, 30.8, 4.6],
      pegat:   [['ap-problemes/data/full-3.png', 65.728, 8.919, 25.083, 1.953, 'AP.77-1a.png']] },
  ],

  /* ── 4t ESO Aplicades · UD5 · Equacions de 2n grau (Santillana U3, U7 i annex) ─ */

  'apl-ud5/U3.33': [
    { enunciat: 1,
      lloc:    TEX`e)`,
      ondiu:   TEX`$x^2 + x - 1 = 0$`,
      hadedir: TEX`$x^2 + x - 6 = 0$`,
      motiu:   TEX`Les solucions de $x^2 + x - 1 = 0$ són $\dfrac{-1 \pm \sqrt{5}}{2}$, que no són a la llista. La solució resol $x^2 + x - 6 = 0$.`,
      marca:   ['u3-equacions/data/full-1.png', 9.6, 67.6, 17.8, 3.2],
      pegat:   [['u3-equacions/data/full-1.png', 21.192, 68.12, 1.49, 1.627, 'U3.33-1a.png']] },
  ],

  'apl-ud5/U3.41': [
    { lloc:    TEX`e)`,
      ondiu:   TEX`$(x - 12) \to x^2 + x - 2 + 3x = \ldots$`,
      hadedir: TEX`$x^2 + x - 2 + 3x = \ldots$`,
      motiu:   TEX`Al principi de la línia sobra «$(x - 12) \to$». La resolució és correcta.`,
      marca:   ['u3-equacions/data/full-4.png', 11.2, 0.2, 13.5, 3.2],
      pegat:   [['u3-equacions/data/full-4.png', 13.99, 0.718, 27.649, 2.023, 'U3.41-1a.png']] },
  ],

  'apl-ud5/U3.44': [
    { ondiu:   TEX`$\dfrac{(10 - 6\sqrt{2})(\sqrt{2} + 1)}{(\sqrt{2} - 1)(\sqrt{2} + 1)} = \dfrac{6 - 6\sqrt{2} + 3 + 1}{2 - 1}$`,
      hadedir: TEX`$\dfrac{(10 - 6\sqrt{2})(\sqrt{2} + 1)}{(\sqrt{2} - 1)(\sqrt{2} + 1)} = \dfrac{10\sqrt{2} + 10 - 12 - 6\sqrt{2}}{2 - 1}$`,
      motiu:   TEX`El numerador de la línia del mig és $3(\sqrt{2} - 1)^2 + 1$ sense desenvolupar, i no el producte de la línia anterior. El resultat, $a = 4\sqrt{2} - 2$, és correcte.`,
      marca:   ['u3-equacions/data/full-4.png', 56.8, 67.0, 23.5, 4.6],
      pegat:   [['u3-equacions/data/full-4.png', 57.202, 67.167, 36.341, 4.243, 'U3.44-1a.png'],
               ['u3-equacions/data/full-4.png', 57.202, 71.997, 36.341, 4.243, 'U3.44-1b.png']] },
  ],

  'apl-ud5/U3.63': [
    { ondiu:   TEX`$(x - 1)x = 36 \to x^2 - 2x - 35 = 0 \to x = 7$`,
      hadedir: TEX`$(x - 1)x = 36 \to x^2 - x - 36 = 0 \to x = \dfrac{1 \pm 12{,}04}{2}$: cap solució entera, no es poden reunir $36$ regals`,
      motiu:   TEX`Amb $36$ regals el problema no té solució. Amb $7$ persones hi ha $7\cdot 6 = 42$ regals: si l’enunciat digués $42$, $x^2 - x - 42 = 0 \to x = 7$.`,
      marca:   ['u3-problemes/data/full-1.png', 9.2, 34.0, 36.0, 7.0],
      pegat:   [['u3-problemes/data/full-1.png', 29.884, 34.658, 14.487, 1.629, 'U3.63-1a.png'],
               ['u3-problemes/data/full-1.png', 16.805, 36.547, 23.758, 4.365, 'U3.63-1b.png'],
               ['u3-problemes/data/full-1.png', 9.851, 41.759, 33.692, 2.02, 'U3.63-1c.png'],
               ['u3-problemes/data/full-1.png', 9.851, 44.039, 21.937, 2.02, 'U3.63-1d.png']] },
  ],

  'apl-ud5/U7.95': [
    { ondiu:   TEX`Una paràbola d’equació $y = x^2 + bx + c$ … $y = x^2 - 4{,}6x + 8{,}79$`,
      hadedir: TEX`Una paràbola $y = a(x - 2{,}3)^2 + 3{,}5$ amb $a < 0$`,
      motiu:   TEX`Amb el coeficient de $x^2$ igual a $1$, el vèrtex $(2{,}3;\ 3{,}5)$ és el punt més baix de la paràbola, no el més alt. Per trobar $a$ cal una altra dada: per exemple, que la pilota entra a la cistella, a $3{,}05$ m d’alçada.`,
      marca:   [['u7-problemes/data/full-1.png', 56.8, 25.6, 26.5, 4.6],
                ['u7-problemes/data/full-1.png', 59.4, 46.0, 33.5, 2.9]],
      pegat:   [['u7-problemes/data/full-1.png', 59.685, 27.763, 26.573, 2.016, 'U7.95-1a.png'],
               ['u7-problemes/data/full-1.png', 59.768, 37.386, 37.417, 10.923, 'U7.95-1b.png']] },
  ],

  'apl-ud5/AP.52': [
    { lloc:    TEX`d)`,
      ondiu:   TEX`$\ldots + \dfrac{2x^3}{5} = \ldots + \dfrac{51x^3}{125} + \ldots$`,
      hadedir: TEX`$\ldots - \dfrac{2x^3}{5} = \ldots - \dfrac{51x^3}{125} + \ldots$`,
      motiu:   TEX`El doble producte dels tres termes és $6\cdot\dfrac{x^2}{3}\cdot\left(-\dfrac{x}{5}\right)\cdot 1 = -\dfrac{2x^3}{5}$, i $-\dfrac{x^3}{125} - \dfrac{2x^3}{5} = -\dfrac{51x^3}{125}$.`,
      marca:   [['ap-igualtats/data/full-2.png', 32.3, 5.2, 4.8, 4.2],
                ['ap-igualtats/data/full-2.png', 32.0, 9.7, 8.0, 4.4]],
      pegat:   [['ap-igualtats/data/full-2.png', 30.464, 6.502, 1.987, 1.56, 'AP.52-1a.png'],
               ['ap-igualtats/data/full-2.png', 32.947, 10.988, 1.987, 1.56, 'AP.52-1b.png']] },
  ],

  /* ── 4t ESO Aplicades · UD6 · La paràbola (Santillana U7, U6 i U3) ────── */

  'apl-ud6/U7.45': [
    { lloc:    TEX`la taula`,
      ondiu:   TEX`$x$: \quad $-2$ \quad $-1$ \quad $0$ \quad $-1$ \quad $-2$`,
      hadedir: TEX`$x$: \quad $-2$ \quad $-1$ \quad $0$ \quad $1$ \quad $2$`,
      motiu:   TEX`Els dos últims valors de $x$ són positius; els valors de $y$ de la taula són correctes.`,
      marca:   ['u7-paraboles/data/full-1.png', 81.6, 65.4, 10.2, 2.9],
      pegat:   [['u7-paraboles/data/full-1.png', 82.864, 65.909, 7.864, 1.429, 'U7.45-1a.png']] },
  ],

  'apl-ud6/U7.46': [
    { lloc:    TEX`c)`,
      ondiu:   TEX`el vèrtex és $(-1, -1)$`,
      hadedir: TEX`el vèrtex és $(-1, -2)$`,
      motiu:   TEX`$y = 2(x + 1)^2 - 2$ té el vèrtex a $(-1, -2)$; la gràfica rosa ho mostra bé.`,
      marca:   ['u7-paraboles/data/full-2.png', 38.0, 57.4, 8.9, 2.9],
      pegat:   [['u7-paraboles/data/full-2.png', 44.288, 57.737, 1.49, 1.56, 'U7.46-1a.png']] },
  ],

  'apl-ud6/U7.47': [
    { lloc:    TEX`d)`,
      ondiu:   TEX`Tall amb l’eix $X$: $\left(\dfrac{1}{2}, 0\right)$ … $y = -\dfrac{8}{9}x^2 - \dfrac{32}{9}x + 2$ … i $\left(-\dfrac{9}{2}, 0\right)$`,
      hadedir: TEX`$y = -(x + 2)^2 + 6 = -x^2 - 4x + 2$, que talla l’eix $X$ a $x = -2 \pm \sqrt{6}$, és a dir, a $x \approx 0{,}45$ i $x \approx -4{,}45$`,
      motiu:   TEX`Amb el vèrtex $(-2, 6)$ i el tall $(0, 2)$, $a = -1$. L’equació del llibre surt de llegir $\tfrac{1}{2}$ a la gràfica en lloc de $0{,}45$, i no passa pel vèrtex: hi dona $\tfrac{50}{9} \approx 5{,}6$, no $6$.`,
      marca:   ['u7-paraboles/data/full-3.png', 10.8, 20.6, 33.6, 19.2],
      pegat:   [['u7-paraboles/data/full-3.png', 11.175, 22.497, 7.202, 4.356, 'U7.47-1a.png'],
               ['u7-paraboles/data/full-3.png', 11.424, 28.999, 30.215, 3.771, 'U7.47-1b.png'],
               ['u7-paraboles/data/full-3.png', 13.907, 34.98, 9.52, 4.356, 'U7.47-1c.png']] },
  ],

  'apl-ud6/U7.49': [
    { lloc:    TEX`f)`,
      ondiu:   TEX`Vèrtex: $\left(-\dfrac{9}{2}, \dfrac{9}{4}\right)$`,
      hadedir: TEX`Vèrtex: $\left(-\dfrac{9}{2}, -\dfrac{9}{4}\right)$`,
      motiu:   TEX`$\left(-\tfrac{9}{2}\right)^2 + 9\cdot\left(-\tfrac{9}{2}\right) + 18 = \tfrac{81}{4} - \tfrac{162}{4} + \tfrac{72}{4} = -\tfrac{9}{4}$. La taula i la gràfica ja ho mostren.`,
      marca:   ['u7-paraboles/data/full-4.png', 66.0, 0.5, 9.8, 4.6],
      pegat:   [['u7-paraboles/data/full-4.png', 72.517, 0.714, 4.967, 4.351, 'U7.49-1a.png']] },
  ],

  'apl-ud6/U7.51': [
    { lloc:    TEX`d), la taula`,
      ondiu:   TEX`$y$: \quad $-16$ \quad $-9$ \quad $0$ \quad $-1$ \quad $0$ \quad $5$`,
      hadedir: TEX`$y$: \quad $-\dfrac{56}{3}$ \quad $-11$ \quad $0$ \quad $-\dfrac{1}{3}$ \quad $0$ \quad $-\dfrac{8}{3}$`,
      motiu:   TEX`Són els valors de $y = -x^2 + \tfrac{2}{3}x$ per a $x = -4, -3, 0, 1, \tfrac{2}{3}, 2$. Per exemple, per a $x = 2$: $-4 + \tfrac{4}{3} = -\tfrac{8}{3}$. La gràfica és correcta.`,
      marca:   ['u7-paraboles/data/full-6.png', 22.2, 31.2, 24.0, 3.2],
      pegat:   [['u7-paraboles/data/full-6.png', 22.93, 27.792, 25, 6.688, 'U7.51-1a.png']] },
  ],

  'apl-ud6/U7.95': [
    { ondiu:   TEX`Una paràbola d’equació $y = x^2 + bx + c$ … $y = x^2 - 4{,}6x + 8{,}79$`,
      hadedir: TEX`Una paràbola $y = a(x - 2{,}3)^2 + 3{,}5$ amb $a < 0$`,
      motiu:   TEX`Amb el coeficient de $x^2$ igual a $1$, el vèrtex $(2{,}3;\ 3{,}5)$ és el punt més baix de la paràbola, no el més alt. Per trobar $a$ cal una altra dada: per exemple, que la pilota entra a la cistella, a $3{,}05$ m d’alçada.`,
      marca:   [['u7-problemes/data/full-2.png', 56.8, 25.6, 26.5, 4.6],
                ['u7-problemes/data/full-2.png', 59.4, 46.0, 33.5, 2.9]],
      pegat:   [['u7-problemes/data/full-2.png', 59.685, 27.763, 26.573, 2.016, 'U7.95-1a.png'],
               ['u7-problemes/data/full-2.png', 59.768, 37.386, 37.417, 10.923, 'U7.95-1b.png']] },
  ],

  'apl-ud6/U7.100': [
    { ondiu:   TEX`La taula i la gràfica de $v = \sqrt{20h}$: la velocitat en funció de l’altura`,
      hadedir: TEX`L’altura en funció de la velocitat: $h = \dfrac{v^2}{20}$, una paràbola`,
      motiu:   TEX`L’enunciat demana l’altura des de la qual s’ha de llançar l’objecte perquè arribi amb una velocitat donada: la variable independent és $v$. Per exemple, per arribar a $10$ m/s cal llançar-lo des de $5$ m.`,
      marca:   [['u7-problemes/data/full-3.png', 55.2, 89.6, 34.8, 9.6],
                ['u7-problemes/data/full-4.png', 11.4, 0.4, 30.4, 19.4]],
      pegat:   [['u7-problemes/data/full-4.png', 11.507, 2.276, 28.146, 15.8, 'U7.100-1a.png'],
               ['u7-problemes/data/full-4.png', 28.808, 18.466, 10.679, 1.56, 'U7.100-1b.png']] },
  ],

  /* ── 4t ESO Aplicades · UD7 · Funcions: llegim gràfics (Santillana U6, U7 i U2) ─ */

  'apl-ud7/U6.7': [
    { lloc:    TEX`c)`,
      ondiu:   TEX`Una recta contínua, i no es respon si es poden unir els punts`,
      hadedir: TEX`Punts aïllats, un per a cada nombre enter: $(-12, 2)$, $(-8, 3)$, … No es poden unir.`,
      motiu:   TEX`L’enunciat diu que la funció associa un valor a cada nombre enter: entre dos enters no hi ha cap valor de la funció.`,
      marca:   ['u6-activitats/data/full-3.png', 11.0, 59.4, 31.5, 15.0],
      pegat:   [['u6-activitats/data/full-3.png', 11.672, 63.168, 31.126, 6.91, 'U6.7-1a.png'],
               ['u6-activitats/data/full-3.png', 8.775, 74.055, 37.417, 2.021, 'U6.7-1b.png']] },
  ],

  'apl-ud7/U6.52': [
    { lloc:    TEX`f)`,
      ondiu:   TEX`$f(3) = \dfrac{-12}{15}$`,
      hadedir: TEX`$f(3) = \dfrac{-12}{5}$`,
      motiu:   TEX`$f(3) = \dfrac{9}{3} - 6 + \dfrac{3}{5} = -3 + \dfrac{3}{5} = -\dfrac{12}{5}$.`,
      marca:   ['u6-funcions/data/full-3.png', 12.0, 24.6, 12.0, 5.0],
      pegat:   [['u6-funcions/data/full-3.png', 19.536, 27.314, 2.401, 1.63, 'U6.52-1a.png']] },
  ],

  'apl-ud7/U6.82': [
    { lloc:    TEX`a)`,
      ondiu:   TEX`Creixent a $(-\infty, 0)$ i a $(0, 3)$. Constant a $(3, 5)$ i decreixent a $(5, +\infty)$.`,
      hadedir: TEX`Creixent a $(-3, 0)$ i a $(0, 3)$, i decreixent a partir de $x = 3$. Assoleix el valor màxim a $x = 0$ i a $x = 3$, però només $x = 3$ és un màxim: a $x = 0$ no passa de créixer a decréixer.`,
      motiu:   TEX`A la gràfica, la funció comença a $x = -3$ i, després de $x = 3$, baixa en línia recta: no hi ha cap tram constant. A $x = 3$ passa de créixer a decréixer, i hi té un màxim de valor $3$.`,
      marca:   ['u6-creixement/data/full-3.png', 13.8, 37.4, 32.5, 7.2],
      pegat:   [['u6-creixement/data/full-3.png', 37.5, 37.891, 7.699, 1.888, 'U6.82-1a.png'],
               ['u6-creixement/data/full-3.png', 14.238, 40.104, 30.712, 2.018, 'U6.82-1b.png'],
               ['u6-creixement/data/full-3.png', 14.238, 42.318, 31.457, 1.953, 'U6.82-1c.png'],
               ['u6-creixement/data/full-3.png', 14.238, 44.596, 30.464, 2.018, 'U6.82-1d.png'],
               ['u6-creixement/data/full-3.png', 14.321, 46.81, 32.119, 2.018, 'U6.82-1e.png']] },
  ],

  'apl-ud7/U6.89': [
    { ondiu:   TEX`$TVR = \dfrac{f(2) - f(-1)}{2 - (-1)}\cdot 100$: \; a) $300\,\%$; \; b) $-300\,\%$; \; c) $-400\,\%$`,
      hadedir: TEX`$TVR = \dfrac{f(2) - f(-1)}{f(-1)}\cdot 100$: \; a) $\dfrac{9}{-4}\cdot 100 = -225\,\%$; \; b) $\dfrac{-9}{4}\cdot 100 = -225\,\%$; \; c) $\dfrac{-12}{8}\cdot 100 = -150\,\%$`,
      motiu:   TEX`La taxa de variació relativa, tal com la defineix el llibre a l’exercici 88, divideix per $f(a)$, no per $b - a$. El solucionari calcula la taxa de variació mitjana multiplicada per $100$.`,
      marca:   ['u6-creixement/data/full-4.png', 55.5, 71.8, 33.0, 27.8],
      pegat:   [['u6-creixement/data/full-4.png', 65.977, 74.17, 8.195, 1.887, 'U6.89-1a.png'],
               ['u6-creixement/data/full-4.png', 67.301, 77.619, 21.026, 2.798, 'U6.89-1b.png'],
               ['u6-creixement/data/full-4.png', 65.977, 83.474, 8.195, 1.952, 'U6.89-1c.png'],
               ['u6-creixement/data/full-4.png', 67.467, 86.923, 17.384, 2.798, 'U6.89-1d.png'],
               ['u6-creixement/data/full-4.png', 65.977, 92.778, 8.195, 1.952, 'U6.89-1e.png'],
               ['u6-creixement/data/full-4.png', 67.467, 96.226, 16.308, 2.798, 'U6.89-1f.png']] },
  ],

  'apl-ud7/U6.106': [
    { lloc:    TEX`a) i b)`,
      ondiu:   TEX`a) $f(t) = \dfrac{340}{t}$ \quad b) $g(t) = \dfrac{340t}{t} = 340$`,
      hadedir: TEX`a) $v(t) = 340$ (funció constant) \quad b) $d(t) = 340t$ (proporcionalitat directa)`,
      motiu:   TEX`La velocitat del so no depèn del temps, i la distància recorreguda és velocitat per temps. La corba $\dfrac{340}{t}$ de la gràfica no representa cap de les dues relacions.`,
      marca:   ['u6-a-trossos/data/full-3.png', 11.5, 0.0, 20.5, 9.2],
      pegat:   [['u6-a-trossos/data/full-3.png', 14.238, 0.715, 9.851, 3.836, 'U6.106-1a.png'],
               ['u6-a-trossos/data/full-3.png', 14.156, 5.592, 17.301, 3.836, 'U6.106-1b.png'],
               ['u6-a-trossos/data/full-3.png', 17.715, 11.183, 20.695, 17.815, 'U6.106-1c.png']] },
    { lloc:    TEX`c)`,
      ondiu:   TEX`$f(t) = \dfrac{22{,}22}{t}$ \quad i \quad $g(t) = \dfrac{22{,}22t}{t} = 22{,}22$`,
      hadedir: TEX`$v(t) = 22{,}22$ \quad i \quad $d(t) = 22{,}22t$`,
      motiu:   TEX`La mateixa errada que als apartats a) i b).`,
      marca:   ['u6-a-trossos/data/full-3.png', 11.5, 33.4, 24.5, 9.0],
      pegat:   [['u6-a-trossos/data/full-3.png', 14.238, 34.005, 11.424, 3.836, 'U6.106-2a.png'],
               ['u6-a-trossos/data/full-3.png', 14.073, 38.817, 20.364, 3.836, 'U6.106-2b.png'],
               ['u6-a-trossos/data/full-3.png', 17.715, 44.343, 20.695, 17.685, 'U6.106-2c.png']] },
  ],

  'apl-ud7/U6.112': [
    { ondiu:   TEX`$0{,}10x$ \quad si $400 \le x < 900$`,
      hadedir: TEX`$0{,}10x$ \quad si $400 \le x < 990$`,
      motiu:   TEX`El cartell diu «$400$ € – $990$ €». Amb $900$, els pedidos d’entre $900$ i $990$ € quedarien sense preu.`,
      marca:   ['u6-a-trossos/data/full-5.png', 25.0, 37.9, 16.5, 2.8],
      pegat:   [['u6-a-trossos/data/full-5.png', 37.583, 38.492, 3.477, 1.691, 'U6.112-1a.png']] },
  ],

  'apl-ud7/U7.90': [
    { ondiu:   TEX`a) $y = 32 + \dfrac{180}{100}x$ \quad b) $y = 273{,}15 + x$`,
      hadedir: TEX`a) $y = 273{,}15 + x$ \quad b) $y = 32 + \dfrac{180}{100}x$`,
      motiu:   TEX`L’apartat a) demana passar de Celsius a Kelvin, i el b), de Celsius a Fahrenheit: les dues funcions estan intercanviades.`,
      marca:   ['u7-situacions/data/full-3.png', 56.5, 39.6, 30.5, 7.4],
      pegat:   [['u7-situacions/data/full-3.png', 71.689, 40.312, 13.99, 7.152, 'U7.90-1a.png'],
               ['u7-situacions/data/full-3.png', 66.308, 59.428, 1.407, 1.495, 'U7.90-1b.png'],
               ['u7-situacions/data/full-3.png', 71.109, 63.134, 1.325, 1.495, 'U7.90-1c.png']] },
    { ondiu:   TEX`$x = 301{,}39375$ °C $\to$ $y = 574{,}54375$`,
      hadedir: TEX`$x = 301{,}4375$ °C $\to$ $y = 574{,}5875$`,
      motiu:   TEX`$0{,}8x = 241{,}15 \to x = \dfrac{241{,}15}{0{,}8} = 301{,}4375$, i $273{,}15 + 301{,}4375 = 574{,}5875$.`,
      marca:   ['u7-situacions/data/full-3.png', 56.5, 91.2, 37.0, 8.4],
      pegat:   [['u7-situacions/data/full-3.png', 64.901, 91.808, 28.228, 1.886, 'U7.90-2a.png'],
               ['u7-situacions/data/full-3.png', 64.57, 97.334, 21.358, 1.886, 'U7.90-2b.png']] },
  ],

  'apl-ud7/U2.42': [
    { ondiu:   TEX`$1{,}05^3 = 1{,}158 \to C_f = 3\,531{,}90$ €, \; $I = 481{,}90$ €`,
      hadedir: TEX`$1{,}05^3 = 1{,}157625 \to C_f = 3\,530{,}76$ €, \; $I = 480{,}76$ €`,
      motiu:   TEX`Arrodonir $1{,}05^3$ a tres decimals fa una diferència d’$1{,}14$ €.`,
      marca:   ['u2-activitats/data/full-1.png', 53.5, 8.8, 26.0, 8.0],
      pegat:   [['u2-activitats/data/full-1.png', 62.5, 9.629, 19.95, 1.822, 'U2.42-1a.png'],
               ['u2-activitats/data/full-1.png', 55.712, 14.509, 22.185, 1.822, 'U2.42-1b.png']] },
  ],

  'apl-ud7/U2.43': [
    { lloc:    TEX`b)`,
      ondiu:   TEX`Al cap de $5$ anys: $1\,126{,}23\cdot 1{,}04^{5} = 1\,126{,}23\cdot 1{,}2167 = 1\,370{,}28$ €`,
      hadedir: TEX`Al cap de $10$ anys: $1\,126{,}23\cdot 1{,}04^{10} = 1\,126{,}23\cdot 1{,}480244 = 1\,667{,}10$ €`,
      motiu:   TEX`L’enunciat demana «al cabo de otros 5 años», és a dir, $10$ anys en total, però la solució calcula els $5$ primers.`,
      marca:   ['u2-activitats/data/full-1.png', 56.0, 57.4, 28.5, 3.2],
      pegat:   [['u2-activitats/data/full-1.png', 66.474, 48.796, 21.854, 2.017, 'U2.43-1a.png'],
               ['u2-activitats/data/full-1.png', 72.93, 51.204, 1.821, 1.171, 'U2.43-1b.png'],
               ['u2-activitats/data/full-1.png', 76.076, 55.758, 4.056, 1.431, 'U2.43-1c.png'],
               ['u2-activitats/data/full-1.png', 67.467, 58.035, 19.785, 1.822, 'U2.43-1d.png']] },
  ],

  'apl-ud7/U2.110': [
    { ondiu:   TEX`$10\,000\cdot 1{,}06^{\frac{1}{12}} = 10\,048$ € \; i, al final, $10\,461{,}70$ €`,
      hadedir: TEX`$10\,000\cdot 1{,}06^{\frac{1}{12}} = 10\,048{,}68$ € \; i, al final, $10\,048{,}68\cdot 1{,}045^{\frac{11}{12}} = 10\,462{,}42$ €`,
      motiu:   TEX`El capital del primer mes s’ha truncat a $10\,048$ €: la diferència final és de $0{,}72$ €.`,
      marca:   [['u2-interes/data/full-1.png', 11.5, 91.6, 26.5, 3.4],
                ['u2-interes/data/full-1.png', 56.5, 15.6, 31.0, 3.8]],
      pegat:   [['u2-interes/data/full-1.png', 59.685, 10.078, 23.096, 5.332, 'U2.110-1a.png'],
               ['u2-interes/data/full-1.png', 59.851, 16.125, 29.222, 2.731, 'U2.110-1b.png'],
               ['u2-interes/data/full-1.png', 29.636, 92.328, 10.017, 1.886, 'U2.110-1c.png']] },
  ],

  /* ── 4t ESO Aplicades · UD8 · Estadística (Santillana U8) ─────────────── */

  'apl-ud8/U8.7': [
    { ondiu:   TEX`$\bar{x} = \dfrac{10\cdot 2{,}5 + 12\cdot 7{,}5 + 37\cdot 12{,}5 + 21\cdot 12{,}5}{80}$`,
      hadedir: TEX`$\bar{x} = \dfrac{10\cdot 2{,}5 + 12\cdot 7{,}5 + 37\cdot 12{,}5 + 21\cdot 17{,}5}{80} = \dfrac{945}{80} = 11{,}81$`,
      motiu:   TEX`La marca de classe de $[15, 20)$ és $17{,}5$. El resultat, $11{,}81$, és correcte: l’errada és només a la fórmula.`,
      marca:   ['u8-activitats/data/full-3.png', 60.4, 84.2, 26.5, 3.4],
      pegat:   [['u8-activitats/data/full-3.png', 74.421, 84.906, 3.891, 1.757, 'U8.7-1a.png']] },
  ],

  'apl-ud8/U8.9': [
    { lloc:    TEX`a)`,
      ondiu:   TEX`$Me = 6$`,
      hadedir: TEX`$Me = \dfrac{6 + 8}{2} = 7$`,
      motiu:   TEX`Hi ha $18$ dades: la mediana és la mitjana de la $9$a i la $10$a. La $9$a val $6$ ($F = 9$) i la $10$a, $8$.`,
      marca:   ['u8-activitats/data/full-4.png', 58.2, 3.2, 8.0, 2.8],
      pegat:   [['u8-activitats/data/full-4.png', 64.404, 3.585, 1.49, 1.63, 'U8.9-1a.png']] },
    { lloc:    TEX`b)`,
      ondiu:   TEX`$f_i = 6,\ 9,\ 14,\ 20$; \ $N = 49$; \ $\bar{x} = 37{,}19$; \ interval modal $[45, 60)$`,
      hadedir: TEX`$f_i = 6,\ 3,\ 5,\ 6$; \ $N = 20$; \ $\bar{x} = \dfrac{615}{20} = 30{,}75$; \ dos intervals modals, $[0, 15)$ i $[45, 60)$; \ interval medià $[30, 45)$`,
      motiu:   TEX`La taula de l’enunciat dona les freqüències acumulades $F_i$, no les absolutes: $f_i = F_i - F_{i-1}$.`,
      marca:   ['u8-activitats/data/full-4.png', 55.8, 7.4, 38.0, 31.4],
      pegat:   [['u8-activitats/data/full-4.png', 77.235, 13.82, 14.735, 1.63, 'U8.9-2a.png'],
               ['u8-activitats/data/full-4.png', 76.407, 16.819, 15.646, 1.695, 'U8.9-2b.png'],
               ['u8-activitats/data/full-4.png', 76.325, 19.883, 15.728, 1.499, 'U8.9-2c.png'],
               ['u8-activitats/data/full-4.png', 76.325, 22.881, 10.679, 1.63, 'U8.9-2d.png'],
               ['u8-activitats/data/full-4.png', 63.245, 26.467, 14.487, 3.846, 'U8.9-2e.png'],
               ['u8-activitats/data/full-4.png', 58.692, 31.16, 35.43, 1.956, 'U8.9-2f.png'],
               ['u8-activitats/data/full-4.png', 58.775, 33.833, 27.566, 1.956, 'U8.9-2g.png'],
               ['u8-activitats/data/full-4.png', 58.692, 36.05, 37.914, 1.956, 'U8.9-2h.png']] },
  ],

  'apl-ud8/U8.10': [
    { lloc:    TEX`b)`,
      ondiu:   TEX`$F_i$: \quad $2$ \quad $10$ \quad $22$ \quad $32$`,
      hadedir: TEX`$F_i$: \quad $4$ \quad $12$ \quad $24$ \quad $34$`,
      motiu:   TEX`Amb $f_i = 4, 8, 12, 10$ (el gràfic i la mateixa taula), les acumulades són $4, 12, 24, 34$. La mitjana, $\dfrac{294}{34} = 8{,}65$, és correcta.`,
      marca:   ['u8-activitats/data/full-5.png', 41.0, 14.6, 6.0, 11.6],
      pegat:   [['u8-activitats/data/full-5.png', 43.129, 15.094, 1.407, 1.431, 'U8.10-1a.png'],
               ['u8-activitats/data/full-5.png', 42.301, 18.152, 2.318, 1.496, 'U8.10-1b.png'],
               ['u8-activitats/data/full-5.png', 42.301, 21.145, 2.235, 1.431, 'U8.10-1c.png'],
               ['u8-activitats/data/full-5.png', 42.301, 24.203, 2.235, 1.431, 'U8.10-1d.png']] },
  ],

  'apl-ud8/U8.35': [
    { ondiu:   TEX`$h_4 = 0{,}266$; \ $H_i$: $0{,}334$; $0{,}401$; $0{,}501$… \quad c) $43{,}2\,\%$ \quad d) $49{,}9\,\%$`,
      hadedir: TEX`$h_4 = 0{,}267$; \ $H_i$: $0{,}333$; $0{,}4$; $0{,}5$… \quad c) $\dfrac{13}{30} = 43{,}3\,\%$ \quad d) $\dfrac{15}{30} = 50\,\%$`,
      motiu:   TEX`Les $H_i$ s’han fet sumant les $h_i$ arrodonides, i l’error s’acumula. Cal calcular $H_i = \dfrac{F_i}{N}$.`,
      marca:   [['u8-taules/data/full-2.png', 83.2, 7.5, 5.4, 8.0],
                ['u8-taules/data/full-2.png', 61.8, 37.2, 33.0, 7.6]],
      pegat:   [['u8-taules/data/full-2.png', 83.526, 7.802, 4.553, 1.625, 'U8.35-1a.png'],
               ['u8-taules/data/full-2.png', 83.526, 10.793, 4.305, 1.625, 'U8.35-1b.png'],
               ['u8-taules/data/full-2.png', 83.526, 13.784, 4.305, 1.625, 'U8.35-1c.png'],
               ['u8-taules/data/full-2.png', 71.44, 16.84, 4.553, 1.625, 'U8.35-1d.png'],
               ['u8-taules/data/full-2.png', 79.884, 37.516, 12.831, 1.821, 'U8.35-1e.png'],
               ['u8-taules/data/full-2.png', 62.169, 39.792, 4.056, 1.756, 'U8.35-1f.png'],
               ['u8-taules/data/full-2.png', 72.93, 42.523, 20.695, 1.886, 'U8.35-1g.png']] },
  ],

  'apl-ud8/U8.48': [
    { ondiu:   TEX`$h_i$: $0{,}1$; $0{,}06$; $0{,}06$; $0{,}08$; $0{,}06$… \quad i \quad $H_i$: $0{,}1$; $0{,}16$; $0{,}22$; $0{,}3$; $0{,}36$; $0{,}46$…`,
      hadedir: TEX`$h_i = \dfrac{f_i}{1\,030}$, amb dos decimals: $0{,}1$; $0{,}06$; $0{,}07$; $0{,}08$; $0{,}07$; $0{,}1$; $0{,}12$; $0{,}11$; $0{,}08$; $0{,}07$; $0{,}09$; $0{,}08$ \quad i \quad $H_i = \dfrac{F_i}{1\,030}$: $0{,}1$; $0{,}16$; $0{,}22$; $0{,}3$; $0{,}37$; $0{,}47$; $0{,}58$; $0{,}69$; $0{,}77$; $0{,}83$; $0{,}92$; $1$`,
      motiu:   TEX`El total és $N = 1\,030$ cotxes. Les $h_i$ del solucionari no són $\dfrac{f_i}{1\,030}$ (al març i al maig, amb $f = 70$, hi posa $0{,}06$), i les $H_i$ tampoc no quadren.`,
      marca:   ['u8-taules/data/full-5.png', 81.6, 63.0, 12.8, 35.6],
      pegat:   [['u8-taules/data/full-5.png', 82.285, 69.616, 3.642, 1.627, 'U8.48-1a.png'],
               ['u8-taules/data/full-5.png', 82.285, 75.602, 8.609, 1.627, 'U8.48-1b.png'],
               ['u8-taules/data/full-5.png', 87.252, 78.66, 3.642, 1.627, 'U8.48-1c.png'],
               ['u8-taules/data/full-5.png', 87.252, 90.696, 3.642, 1.627, 'U8.48-1d.png'],
               ['u8-taules/data/full-5.png', 87.252, 93.754, 3.642, 1.627, 'U8.48-1e.png'],
               ['u8-taules/data/full-5.png', 82.285, 96.747, 3.642, 1.627, 'U8.48-1f.png']] },
  ],

  'apl-ud8/U8.51': [
    { lloc:    TEX`l’histograma de freqüències acumulades`,
      ondiu:   TEX`Barres d’altura $6$, $16$, $28$, $36$ i $40$`,
      hadedir: TEX`Barres d’altura $3$, $8$, $14$, $18$ i $20$`,
      motiu:   TEX`Són les $F_i$ de la taula. Les barres del gràfic fan el doble.`,
      marca:   ['u8-taules/data/full-6.png', 56.5, 16.2, 34.0, 18.0],
      pegat:   [['u8-taules/data/full-6.png', 57.285, 18.306, 2.152, 11.596, 'U8.51-1a.png']] },
  ],

  'apl-ud8/U8.59': [
    { lloc:    TEX`b)`,
      ondiu:   TEX`$\bar{x} = \dfrac{10 + 6 + 24 + x_4\cdot 3}{28}$`,
      hadedir: TEX`$\bar{x} = \dfrac{10 + 6 + 24 + x_4\cdot 3}{14}$`,
      motiu:   TEX`$N = 5 + 2 + 4 + 3 = 14$. A la línia següent ja hi ha $14$, i el resultat, $x_4 = 10$, és correcte.`,
      marca:   ['u8-parametres/data/full-1.png', 72.0, 33.2, 3.8, 2.8],
      pegat:   [['u8-parametres/data/full-1.png', 72.517, 33.746, 2.483, 1.694, 'U8.59-1a.png']] },
  ],

  'apl-ud8/U8.60': [
    { lloc:    TEX`b)`,
      ondiu:   TEX`$5, 5, 6, 6, 6, 7, 7, 8, 8$`,
      hadedir: TEX`$10$ dades, per exemple: $5, 5, 6, 6, 6, 6, 7, 7, 8, 8$`,
      motiu:   TEX`L’enunciat demana $10$ dades, i l’exemple en té $9$.`,
      marca:   ['u8-parametres/data/full-1.png', 56.5, 62.0, 25.0, 2.8],
      pegat:   [['u8-parametres/data/full-1.png', 69.785, 62.541, 11.507, 1.824, 'U8.60-1a.png']] },
  ],

  'apl-ud8/U8.81': [
    { lloc:    TEX`a) i b)`,
      ondiu:   TEX`$1\cdot 1{,}20 + 6\cdot 1{,}50 + 19\cdot 1{,}80 + 7\cdot 2{,}10 = 59{,}10$ € \quad b) $\dfrac{59{,}10}{40{,}75} = 1{,}45$ €/kg`,
      hadedir: TEX`$0{,}25\cdot 1{,}20 + 4{,}5\cdot 1{,}50 + 23{,}75\cdot 1{,}80 + 12{,}25\cdot 2{,}10 = 75{,}53$ € \quad b) $\dfrac{75{,}53}{40{,}75} = 1{,}85$ €/kg`,
      motiu:   TEX`El preu és per quilo: cal multiplicar-lo pels quilos de cada classe ($f_i\cdot x_i$), no pel nombre de coliflors. (Amb els pesos exactes, $75{,}08$ € i $1{,}84$ €/kg.)`,
      marca:   ['u8-informacio/data/full-2.png', 11.5, 19.6, 30.0, 11.6],
      pegat:   [['u8-informacio/data/full-2.png', 12.417, 20.286, 35.513, 1.821, 'U8.81-1a.png'],
               ['u8-informacio/data/full-2.png', 14.901, 22.497, 19.702, 1.886, 'U8.81-1b.png'],
               ['u8-informacio/data/full-2.png', 12.748, 24.772, 11.258, 2.796, 'U8.81-1c.png'],
               ['u8-informacio/data/full-2.png', 30.629, 29.259, 3.808, 1.756, 'U8.81-1d.png']] },
    { lloc:    TEX`e)`,
      ondiu:   TEX`$1\cdot 1{,}50 + 10\cdot 1{,}80 + 17\cdot 2{,}10 + 5\cdot 2{,}40 = 67{,}20$ €; \ $1{,}24$ €/kg. «No s’incrementa el preu mitjà per quilo.»`,
      hadedir: TEX`$0{,}75\cdot 1{,}50 + 12{,}5\cdot 1{,}80 + 29{,}75\cdot 2{,}10 + 11{,}25\cdot 2{,}40 = 113{,}10$ €; \ $\dfrac{113{,}10}{54{,}25} = 2{,}08$ €/kg. El preu mitjà per quilo sí que augmenta.`,
      motiu:   TEX`La mateixa errada que a l’apartat a): el preu és per quilo. Ara les coliflors pesen més i passen a classes més cares.`,
      marca:   ['u8-informacio/data/full-2.png', 11.5, 66.0, 30.0, 13.0],
      pegat:   [['u8-informacio/data/full-2.png', 12.417, 66.71, 36.507, 1.821, 'U8.81-2a.png'],
               ['u8-informacio/data/full-2.png', 14.983, 68.921, 20.613, 1.886, 'U8.81-2b.png'],
               ['u8-informacio/data/full-2.png', 12.831, 71.586, 17.384, 4.096, 'U8.81-2c.png'],
               ['u8-informacio/data/full-2.png', 12.417, 76.398, 32.202, 1.691, 'U8.81-2d.png']] },
  ],

  'apl-ud8/U8.83': [
    { lloc:    TEX`l’eix de l’histograma`,
      ondiu:   TEX`$\ldots\ 15 \quad 17 \quad 21 \quad 19 \quad 23$`,
      hadedir: TEX`$\ldots\ 15 \quad 17 \quad 19 \quad 21 \quad 23$`,
      motiu:   TEX`Les etiquetes $19$ i $21$ estan intercanviades.`,
      marca:   ['u8-informacio/data/full-3.png', 37.8, 45.2, 6.0, 2.4],
      pegat:   [['u8-informacio/data/full-3.png', 38.162, 45.774, 5.381, 1.3, 'U8.83-1a.png']] },
  ],

  'apl-ud8/U8.84': [
    { enunciat: 1,
      lloc:    TEX`l’enunciat`,
      ondiu:   TEX`«$30$ marques d’aigua embotellada», i hi ha $33$ dades`,
      hadedir: TEX`«$33$ marques d’aigua embotellada»`,
      motiu:   TEX`La llista té tres files d’$11$ dades, i la solució treballa amb $N = 33$.`,
      marca:   ['u8-informacio/data/full-3.png', 11.4, 74.6, 10.6, 2.6],
      pegat:   [['u8-informacio/data/full-3.png', 12.831, 74.967, 1.49, 1.625, 'U8.84-1a.png']] },
    { ondiu:   TEX`$F_1 = 10$`,
      hadedir: TEX`$F_1 = 9$`,
      motiu:   TEX`La primera classe té $f_1 = 9$ dades; la resta de la columna ($24$, $32$, $33$) és correcta.`,
      marca:   ['u8-informacio/data/full-3.png', 78.4, 35.2, 3.4, 2.6],
      pegat:   [['u8-informacio/data/full-3.png', 78.974, 35.566, 2.235, 1.495, 'U8.84-2a.png']] },
  ],

  'apl-ud8/U8.85': [
    { enunciat: 1,
      lloc:    TEX`les taules de l’enunciat`,
      ondiu:   TEX`$14$ parelles de notes`,
      hadedir: TEX`$15$ parelles: hi falta la parella A $= 6$, B $= 6$`,
      motiu:   TEX`L’enunciat parla de $15$ persones. El diagrama de dispersió de la solució té el punt $(6, 6)$, i els apartats c) i e) el fan servir.`,
      marca:   ['u8-informacio/data/full-4.png', 10.0, 20.4, 23.5, 12.4],
      pegat:   [['u8-informacio/data/full-4.png', 26.076, 27.208, 5.215, 6.429, 'U8.85-1a.png']] },
  ],

  /* ── 4t ESO Aplicades · UD9 · Atzar i decisions (Santillana U9) ───────── */

  'apl-ud9/U9.42': [
    { lloc:    TEX`«únicament 3 cavalls»`,
      ondiu:   TEX`$\dfrac{4}{40}\cdot\dfrac{4}{40}\cdot\dfrac{4}{40} = 0{,}001$ \quad i \quad $\dfrac{4}{40}\cdot\dfrac{3}{39}\cdot\dfrac{2}{38} = 0{,}0004$`,
      hadedir: TEX`Amb reemplaçament: $4\cdot\left(\dfrac{1}{10}\right)^3\cdot\dfrac{9}{10} = 0{,}0036$. \ Sense: $4\cdot\dfrac{4}{40}\cdot\dfrac{3}{39}\cdot\dfrac{2}{38}\cdot\dfrac{36}{37} \approx 0{,}0016$`,
      motiu:   TEX`Es treuen $4$ cartes i han de ser cavalls exactament $3$: la quarta no ho ha de ser, i aquesta carta pot sortir en $4$ posicions. La solució calcula la probabilitat que $3$ cartes seguides siguin cavalls.`,
      marca:   ['u9-activitats/data/full-9.png', 10.0, 2.4, 37.5, 12.4],
      pegat:   [['u9-activitats/data/full-9.png', 10.43, 0.585, 28.891, 2.016, 'U9.42-1a.png'],
               ['u9-activitats/data/full-9.png', 11.672, 3.446, 34.52, 3.836, 'U9.42-1b.png'],
               ['u9-activitats/data/full-9.png', 10.43, 8.127, 28.146, 2.016, 'U9.42-1c.png'],
               ['u9-activitats/data/full-9.png', 11.672, 10.988, 35.679, 3.836, 'U9.42-1d.png']] },
  ],

  'apl-ud9/U9.76': [
    { lloc:    TEX`b)`,
      ondiu:   TEX`«Pelo rubio»: $P = 0{,}46$`,
      hadedir: TEX`«Pelo moreno»: $P = 0{,}46$`,
      motiu:   TEX`L’enunciat parla dels joves amb els cabells morens.`,
      marca:   ['u9-probabilitat/data/full-1.png', 57.5, 48.2, 21.5, 2.8],
      pegat:   [['u9-probabilitat/data/full-1.png', 64.818, 48.505, 15.232, 1.886, 'U9.76-1a.png']] },
  ],

  'apl-ud9/U9.88': [
    { lloc:    TEX`c)`,
      ondiu:   TEX`$P(C) = \dfrac{6}{8} = 0{,}75$`,
      hadedir: TEX`$P(C) = \dfrac{7}{8} = 0{,}875$`,
      motiu:   TEX`«Com a màxim dues creus» és tot menys «tres creus»: $1 - \dfrac{1}{8} = \dfrac{7}{8}$.`,
      marca:   ['u9-probabilitat/data/full-5.png', 10.0, 10.6, 18.5, 4.4],
      pegat:   [['u9-probabilitat/data/full-5.png', 19.205, 10.923, 9.603, 2.666, 'U9.88-1a.png']] },
  ],

};


/* ═══════════════════════════════════════════════════════════════════════
   LES OBSERVACIONS
   ───────────────────────────────────────────────────────────────────────
   Comentaris que no són errades, però que poden confondre. Només es veuen
   si ERRADES_OBS és true: surten dins de l'exercici, sota les errades.

     'apl-ud10/U4.66': [
       { lloc: TEX`c) i d)`,
         text: TEX`Les respostes són el nombre màxim.` },
     ],

   `lloc` és opcional, igual que a les errades. Una observació que parla de
   dos exercicis està escrita dues vegades, un cop a cada exercici.
   ═══════════════════════════════════════════════════════════════════════ */

const OBSERVACIONS = {

};


/* ═══════════════════════════════════════════════════════════════════════
   A PARTIR D'AQUÍ NO CAL QUE TOQUIS RES
   ═══════════════════════════════════════════════════════════════════════ */

/* Les dues comandes pròpies de defs.tex que fan servir els textos. */
const ERRADES_MACROS = { '\\dlim': '\\displaystyle\\lim', '\\R': '\\mathbb{R}' };

/* Les errades d'un exercici (llista buida si no en té). */
function erradesDe(u, n){
  return ERRADES[u + '/' + n] || [];
}

/* Les observacions d'un exercici. Cap, si l'interruptor és apagat. */
function observacionsDe(u, n){
  return ERRADES_OBS ? (OBSERVACIONS[u + '/' + n] || []) : [];
}

/* La icona d'avís: un triangle amb un signe d'admiració. Es dibuixa aquí, i
   no amb el caràcter ⚠, perquè es vegi igual a tots els mòbils i ordinadors. */
const _ICONA_AVIS = '<svg class="err-ico" viewBox="0 0 24 24" aria-hidden="true" focusable="false">'
  + '<path d="M12 3.6 21.7 20.4H2.3Z" fill="currentColor" stroke="currentColor" stroke-width="2.6" stroke-linejoin="round"/>'
  + '<path d="M12 9.4v5" fill="none" stroke="#fff" stroke-width="2.3" stroke-linecap="round"/>'
  + '<circle cx="12" cy="18" r="1.35" fill="#fff"/></svg>';

/* L'avís que surt a la targeta de l'exercici, a la llista de la tasca:
   «2 errades al solucionari». Només compta les errades de la SOLUCIÓ: les
   d'enunciat es mostren senceres allà mateix (vegeu htmlErradesEnunciat).
   Cadena buida si la solució no té cap errada. */
function avisErrades(u, n){
  const k = erradesDe(u, n).filter(e => !e.enunciat && !_callada(e)).length;
  if(!k) return '';
  return k === 1 ? '1 errada al solucionari' : k + ' errades al solucionari';
}

function htmlAvisErrades(u, n){
  const text = avisErrades(u, n);
  return text ? '<span class="ex-err">' + _ICONA_AVIS + '<span>' + text + '</span></span>' : '';
}

/* ── De text amb fórmules a HTML ──────────────────────────────────────── */

function _escapa(s){
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/* Un tros de text normal (fora dels dòlars). */
function _textAHtml(t){
  return _escapa(t)
    .replace(/\\quad\s*/g, '&emsp;')
    .replace(/\\;/g, '&ensp;')
    .replace(/\\,/g, '&thinsp;')
    .replace(/\\([$%])/g, '$1');
}

/* Una fórmula (el que hi ha entre dos dòlars), amb la puntuació que porta
   enganxada: `abans` («, parèntesi d'obrir) i `despres` (punt, coma, »...).
   Aquesta puntuació es posa DINS de la fórmula perquè, en pantalles estretes,
   no quedi mai sola en una altra línia.
   Si KaTeX no s'ha pogut carregar, es mostra el LaTeX tal qual: es llegeix
   pitjor, però no es perd res. */
const _KATEX_FI   = '</span></span></span>';     // tanca l'últim tros, .katex-html i .katex
const _KATEX_TROS = '<span class="base">';       // obre el primer tros de la fórmula

function _formulaAHtml(tex, abans, despres){
  abans = abans || ''; despres = despres || '';
  let h = null;
  if(typeof katex !== 'undefined'){
    try{
      h = katex.renderToString(tex, {
        throwOnError: false,
        macros: Object.assign({}, ERRADES_MACROS)
      });
    }catch(e){ h = null; }
  }
  if(h === null){
    return _escapa(abans) + '<code class="err-tex">' + _escapa(tex) + '</code>' + _escapa(despres);
  }
  if(despres && h.endsWith(_KATEX_FI)){
    h = h.slice(0, -_KATEX_FI.length) + '<span class="err-punt">' + _escapa(despres) + '</span>' + _KATEX_FI;
    despres = '';
  }
  const i = abans ? h.indexOf(_KATEX_TROS) : -1;
  if(i >= 0){
    const tall = i + _KATEX_TROS.length;
    h = h.slice(0, tall) + '<span class="err-punt">' + _escapa(abans) + '</span>' + h.slice(tall);
    abans = '';
  }
  return _escapa(abans) + h + _escapa(despres);
}

/* Text amb fórmules entre $...$  →  HTML. */
function texAHtml(s){
  if(!s) return '';
  s = String(s);

  /* 1) Es talla en trossos: text, fórmula, text, fórmula... */
  const trossos = [];
  let tros = '', mates = false;
  for(let i = 0; i < s.length; i++){
    const c = s[i];
    if(c === '\\' && i + 1 < s.length){ tros += c + s[i + 1]; i++; continue; }
    if(c === '$'){
      trossos.push({mates: mates, s: tros});
      tros = ''; mates = !mates;
      continue;
    }
    tros += c;
  }
  /* Si ha quedat un dòlar sense tancar, el que venia darrere es mostra com
     a text, amb el dòlar al davant, perquè es vegi que falta l'altre. */
  trossos.push({mates: false, s: (mates ? '$' : '') + tros});

  /* 2) Cada fórmula s'emporta la puntuació que té enganxada a banda i banda. */
  let html = '';
  for(let i = 0; i < trossos.length; i++){
    const t = trossos[i];
    if(!t.mates){ html += _textAHtml(t.s); continue; }
    let abans = '', despres = '';
    const m = /[«(\[¿¡]+$/.exec(html);
    if(m){ abans = m[0]; html = html.slice(0, m.index); }
    const seg = trossos[i + 1];
    if(seg && !seg.mates){
      const d = /^[.,;:!?»)\]]+/.exec(seg.s);
      if(d){ despres = d[0]; seg.s = seg.s.slice(d[0].length); }
    }
    html += _formulaAHtml(t.s, abans, despres);
  }
  return html;
}

/* Demana per endavant les dues lletres que fan servir totes les fórmules.
   tasca.html ho crida quan la tasca té alguna errada: així, quan l'alumne
   obre un exercici, les fórmules surten de cop i no després d'un instant
   en blanc. Si el navegador no ho sap fer, no passa res. */
function preparaFormules(){
  try{
    if(document.fonts && document.fonts.load){
      document.fonts.load('1em KaTeX_Main');
      document.fonts.load('italic 1em KaTeX_Math');
    }
  }catch(e){}
}

/* ── Les targetes ─────────────────────────────────────────────────────── */

/* «f)» → «Apartat f)»,  «b) i c)» → «Apartats b) i c)»,
   «segon punt» → «Segon punt». */
function _llocAHtml(lloc){
  const l = String(lloc || '').trim();
  if(!l) return '';
  if(/^[a-z]\)/.test(l)){
    return (/^[a-z]\)\s+i\s+[a-z]\)/.test(l) ? 'Apartats ' : 'Apartat ') + texAHtml(l);
  }
  return texAHtml(l.charAt(0).toUpperCase() + l.slice(1));
}

function _filaErrada(classe, etiqueta, text){
  return '<div class="err-fila"><div class="err-et ' + classe + '">' + etiqueta + '</div>'
       + '<div class="err-val">' + texAHtml(text) + '</div></div>';
}

/* Les marques d'una errada: llista de {img, x, y, w, h}, en percentatges de
   la imatge. Accepta un rectangle sol o una llista de rectangles. */
/* ── Els pegats ─────────────────────────────────────────────────────────
   Trossos de la pàgina ja corregits que es posen a sobre de la imatge. */

/* Els pegats d'una errada, sempre com a llista de {img, x, y, w, h, f}. */
function pegatsDe(e){
  const p = e && e.pegat;
  if(!Array.isArray(p) || !p.length) return [];
  return (Array.isArray(p[0]) ? p : [p])
    .filter(r => r && r.length >= 6)
    .map(r => ({img: r[0], x: +r[1], y: +r[2], w: +r[3], h: +r[4], f: r[5]}));
}

/* Una errada «callada»: la imatge ja es veu corregida i no cal anunciar-la. */
function _callada(e){
  return ERRADES_PEGATS && pegatsDe(e).length > 0;
}

/* El número que porta una errada: la seva posició entre les que s'anuncien. */
function _numero(errs, k){
  let n = 0;
  for(let i = 0; i <= k; i++) if(!_callada(errs[i])) n++;
  return n;
}

/* Tots els pegats que van sobre una imatge (`img`, escrita com a cataleg.js),
   siguin de l'exercici que siguin: la pàgina s'ha de veure corregida es miri
   des d'on es miri. Cadena buida si no n'hi ha o si l'interruptor és apagat. */
let _PEGATS_PER_IMATGE = null;
/* Una pàgina del llibre pot ser a més d'una carpeta (PAGINES_IGUALS): tots els seus pegats valen per a totes les còpies. */
function _pagina(ruta){ return (typeof PAGINES_IGUALS !== 'undefined' && PAGINES_IGUALS[ruta]) || ruta; }
function htmlPegats(u, img){
  if(!ERRADES_PEGATS) return '';
  if(!_PEGATS_PER_IMATGE){
    _PEGATS_PER_IMATGE = {};
    const vistos = {};
    Object.keys(ERRADES).forEach(clau => {
      const un = clau.split('/')[0];
      ERRADES[clau].forEach(e => pegatsDe(e).forEach(q => {
        const k = _pagina(un + '/' + q.img), id = k + '|' + q.x + '|' + q.y + '|' + q.w + '|' + q.h;
        if(vistos[id]) return;                  // la mateixa errada pot ser en dues unitats
        vistos[id] = 1;
        (_PEGATS_PER_IMATGE[k] = _PEGATS_PER_IMATGE[k] || []).push('<img class="pegat" alt="" src="pegats/' + un + '/' + q.f
          + '" style="left:' + q.x + '%;top:' + q.y + '%;width:' + q.w + '%;height:' + q.h + '%">');
      }));
    });
  }
  return (_PEGATS_PER_IMATGE[_pagina(u + '/' + img)] || []).join('');
}

/* ── Les marques ──────────────────────────────────────────────────────── */

function marquesDe(e){
  const m = e && e.marca;
  if(!m || !m.length) return [];
  return (Array.isArray(m[0]) ? m : [m])
    .filter(r => r && r.length >= 5)
    .map(r => ({img: r[0], x: +r[1], y: +r[2], w: +r[3], h: +r[4]}));
}

/* Els requadres vermells d'un exercici que cauen sobre una imatge (`img` és
   el camí tal com surt al catàleg). Cada requadre porta el número de la seva
   errada, el mateix que la targeta. */
function htmlMarques(u, n, img){
  let h = '';
  const errs = erradesDe(u, n);
  errs.forEach((e, k) => {
    if(_callada(e)) return;
    const num = _numero(errs, k);
    marquesDe(e).forEach(r => {
      if(r.img !== img) return;
      h += '<button type="button" class="marca" data-k="' + k + '" style="left:' + r.x + '%;top:' + r.y
         + '%;width:' + r.w + '%;height:' + r.h + '%" aria-label="Errada ' + num
         + ': amplia la imatge i mostra la correcció"><span class="marca-num">' + num + '</span></button>';
    });
  });
  return h;
}

/* Una errada: on és i les dues files «On diu» i «Ha de dir» (i «Motiu», si
   l'interruptor és encès). Amb `senseEnunciat`, no s'hi escriu «Enunciat»
   perquè ja ho diu el títol del bloc. `k` és la posició de l'errada dins de
   l'exercici: si es passa i l'errada té marca a la imatge, la targeta porta
   el mateix número que el requadre i un botó per anar-hi. */
function _htmlErrada(e, senseEnunciat, k, num){
  let lloc = _llocAHtml(e.lloc);
  if(e.enunciat && !senseEnunciat) lloc = 'Enunciat' + (lloc ? ' · ' + lloc : '');
  const ambMarca = k !== undefined && k !== null && marquesDe(e).length > 0;
  let h = '<div class="err-card"' + (ambMarca ? ' data-k="' + k + '"' : '') + '>';
  if(lloc || ambMarca){
    h += '<div class="err-lloc">'
       + (ambMarca ? '<span class="err-num" aria-hidden="true">' + (num || k + 1) + '</span>' : '')
       + '<span class="err-lloc-text">' + lloc + '</span>'
       + (ambMarca ? '<button type="button" class="err-veure" data-k="' + k + '">Mostra-ho a la imatge</button>' : '')
       + '</div>';
  }
  h += _filaErrada('err-et-on', 'On diu', e.ondiu);
  h += _filaErrada('err-et-ha', 'Ha de dir', e.hadedir);
  if(ERRADES_MOTIU && e.motiu) h += _filaErrada('err-et-mo', 'Motiu', e.motiu);
  return h + '</div>';
}

/* La targeta d'una sola errada, per al peu de la imatge ampliada. */
function htmlErradaSola(u, n, k){
  const e = erradesDe(u, n)[k];
  if(!e) return '';
  let lloc = _llocAHtml(e.lloc);
  if(e.enunciat) lloc = 'Enunciat' + (lloc ? ' · ' + lloc : '');
  let h = '<div class="err-lloc"><span class="err-num" aria-hidden="true">' + _numero(erradesDe(u, n), k) + '</span>'
        + '<span class="err-lloc-text">' + (lloc || 'Errada del solucionari') + '</span></div>';
  h += _filaErrada('err-et-on', 'On diu', e.ondiu);
  h += _filaErrada('err-et-ha', 'Ha de dir', e.hadedir);
  if(ERRADES_MOTIU && e.motiu) h += _filaErrada('err-et-mo', 'Motiu', e.motiu);
  return h;
}

function _htmlObservacio(o){
  const lloc = _llocAHtml(o.lloc);
  return '<div class="err-card">'
       + (lloc ? '<div class="err-lloc">' + lloc + '</div>' : '')
       + '<div class="err-val">' + texAHtml(o.text) + '</div></div>';
}

function _quantes(n){
  return n === 1 ? 'una errada' : n + ' errades';
}

function _titolBloc(text){
  return '<div class="err-cap">' + _ICONA_AVIS + '<span>' + text + '</span></div>';
}

/* El bloc que surt dins de l'exercici, abans de la imatge: totes les errades
   i, si l'interruptor és encès, les observacions. Cadena buida si no hi ha res. */
function htmlErrades(u, n){
  const totes = erradesDe(u, n);
  const errs = totes.filter(e => !_callada(e));          // les que tenen pegat ja es veuen corregides: no s'anuncien
  const obs  = observacionsDe(u, n);
  let h = '';
  if(errs.length){
    const k = errs.filter(e => e.enunciat).length;      // quantes són a l'enunciat
    const titol = k === errs.length ? 'L’enunciat d’aquest exercici té ' + _quantes(k)
                : k === 0           ? 'El solucionari té ' + _quantes(errs.length) + ' en aquest exercici'
                :                     'Aquest exercici té ' + _quantes(errs.length);
    h += '<div class="err-panel" role="note">' + _titolBloc(titol)
       + errs.map(e => _htmlErrada(e, k === errs.length, totes.indexOf(e), _numero(totes, totes.indexOf(e)))).join('')
       + '</div>';
  }
  if(obs.length){
    const titol = obs.length === 1 ? 'Una observació sobre aquest exercici'
                                   : obs.length + ' observacions sobre aquest exercici';
    h += '<div class="err-panel err-obs" role="note">'
       + '<div class="err-cap"><span>' + titol + '</span></div>'
       + obs.map(_htmlObservacio).join('')
       + '</div>';
  }
  return h;
}

/* El bloc que surt a la llista de la tasca: només les errades d'enunciat,
   que l'alumne ha de conèixer abans de començar. Cadena buida si no n'hi ha. */
function htmlErradesEnunciat(u, n){
  const errs = erradesDe(u, n).filter(e => e.enunciat);
  if(!errs.length) return '';
  return '<div class="err-panel err-llista" role="note">'
       + _titolBloc(errs.length === 1 ? 'L’enunciat té una errada' : 'L’enunciat té ' + errs.length + ' errades')
       + errs.map(e => _htmlErrada(e, true)).join('')
       + '</div>';
}
