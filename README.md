# Exercicis propis — 2n de Batxillerat

Web estàtica (GitHub Pages). No hi ha servidor ni base de dades.

L'alumne navega **unitat → tasca → exercici**. Una *tasca* és una setmana de
feina: una llista ordenada d'exercicis amb una data límit.

## Com programo la feina

Edita **`tasques.js`** i prou. És l'únic fitxer que cal tocar.

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

Per defecte s'obre **7 dies abans** de la data límit (`DIES_ABANS`, a dalt de
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
tasques.js      ← LA PROGRAMACIÓ (l'únic que edito sovint)
cataleg.js      ← generat: títol, dificultat i imatges de cada exercici
                  (excepte el camp de pista, `p`, que s'edita a mà — vegeu més avall)
progres.js      ← les creuetes de "fet" de l'alumne
publicats.js    ← només governa la vista per temes (vegeu més avall)
README.md
assets/
  style.css     ← compartit per totes les pàgines
  icon.png
u7/  u8/  u9/  u10/
  <tema>/
    <tema>.html     ← pàgina del tema (ja no enllaçada des del menú)
    data/full-1.png … full-K.png
```

`cataleg.js` és el que permet que una tasca agafi exercicis d'on sigui: hi ha
el títol, la dificultat i les imatges de cada exercici, un sol cop. Les tasques
només guarden números.

**No editis `cataleg.js` a mà**: es genera a partir de les pàgines dels temes.
L'única excepció és el camp `p` (pista), que sí que s'edita a mà — vegeu la
secció «Les pistes dels exercicis».

## Les pistes dels exercicis

Cada exercici pot tenir, opcionalment, una pista curta: un cop de mà cap al
mètode, no la solució feta. Es guarda al camp `p` de `cataleg.js`, al costat
de `t`, `d` i `i`:

```js
44: {
  t:'A partir de les gràfiques de f, g i h, determina els límits en ±∞',
  d:'●○○',
  i:['limits-funcions/data/full-1.png'],
  p:'Mira cada gràfica per separat a la banda dreta (x → +∞) i a l\'esquerra ' +
    '(x → −∞): la corba s\'apropa a una alçada fixa, puja o baixa sense parar, ' +
    'o no s\'estabilitza?'
},
```

- **Camp opcional.** Si un exercici no té `p`, no es mostra cap botó de
  pista per a aquell exercici — no hi ha manera de saber que en podria haver
  una. No cal "activar" res enlloc més.
- **S'omple a mà**, exactament igual que `t`, `d` i `i`: escrius el text tu
  mateix, o li demanes a una IA que en redacti un i l'enganxes, i fas
  commit. No hi ha cap botó de "generar" ni cap crida a cap IA en temps
  real des del navegador de l'alumne — el projecte segueix sent 100%
  estàtic.
- **Helper:** `pistaDe(u, n)` a `cataleg.js` retorna el text de la pista o
  `null` si no n'hi ha, seguint el mateix patró que `fitxaDe` i `etiquetaDe`.
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

### Si en algun moment es vol generar-les amb IA a l'instant

Ara mateix està descartat expressament: el lloc no té servidor, i fer una
crida a una API d'IA directament des de `tasca.html` exposaria la clau
d'API a qualsevol que obri el codi font de la pàgina. Fer-ho bé requeriria
introduir una petita funció serverless només per amagar la clau — una peça
d'infraestructura nova que, de moment, es prefereix evitar. Mentre no es
reconsideri aquesta decisió, les pistes es preparen sempre abans, a mà, i es
guarden com a text pla a `cataleg.js`.
