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

## La vista per temes

Els temes del llibre segueixen existint, però **no estan enllaçats enlloc** i
els alumnes no hi arriben navegant. Per consultar-los, escriu l'adreça:

```
index.html#u7/temes
```

`publicats.js` només afecta aquesta vista: hi decideixes quins temes hi
apareixen. Ja no té cap efecte sobre el que veuen els alumnes a les tasques.

## El progrés de l'alumne

Es guarda al navegador de l'alumne, **una clau per unitat** (`u7-fet`), amb la
llista de números d'exercici. Es guarda per unitat i no per tasca a posta: si
reorganitzes la programació a mig curs, la creueta va enganxada a l'exercici i
l'alumne no perd res. Les creuetes del format antic (per tema) es migren soles
el primer cop, sense esborrar-ne cap.

## Provar-ho en local

```bash
python3 -m http.server
# obre http://localhost:8000
# i http://localhost:8000/?tot=1  per veure-ho tot
```

## Nota sobre la privacitat dels enunciats

Els exercicis d'una tasca que encara no s'ha obert **sí que són al repositori**:
un alumne prou tafaner podria llegir `tasques.js` i `cataleg.js` i obrir les
imatges directament. Per a un ús normal d'aula això és suficient; si algun dia
vols que sigui hermètic, cal no pujar les imatges fins al dia de publicar-les.
