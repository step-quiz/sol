# Exercicis propis — 2n de Batxillerat

Web estàtica (GitHub Pages). No hi ha servidor ni base de dades.

## Com publico exercicis nous

Edita **`publicats.js`** i prou. És l'únic fitxer que cal tocar.

```js
const PUBLICATS = {
  'u7/limits-funcions': '44-49',   // aquesta setmana només fins al 49
  'u7/bolzano':         'cap',     // encara amagat
};
```

Valors admesos: `'cap'`, `'tots'`, `'44-49'`, `'44-49, 52'`, `'44, 46, 51'`.

Es pot fer des del mòbil: GitHub → `publicats.js` → llapis → *Commit changes*.
En un minut la web ja mostra els canvis.

Un tema amb `'cap'` desapareix del menú. Una unitat sense cap tema visible
també desapareix. No cal esborrar ni moure fitxers mai.

## Estructura

```
index.html                 ← únic index.html de tot el projecte
publicats.js               ← QUÈ ES VEU (l'únic que edito sovint)
README.md
assets/
  style.css                ← compartit per totes les pàgines
  icon.png
u7/
  limits-funcions/
    limits-funcions.html
    data/full-1.png … full-5.png
  bolzano/
    bolzano.html
    data/full-1.png … full-3.png
```

Regla: **1 tema = 1 carpeta `unitat/tema/`**, amb un `tema.html` a dins i les
seves pròpies imatges. Cap tema comparteix imatges amb un altre, així que
esborrar-ne un no n'afecta cap altre.

## Com afegeixo un tema nou

1. `cp -r u7/bolzano u7/nou-tema` i reanomena el `.html` a `nou-tema.html`.
2. Substitueix les imatges de `data/` i reescriu l'array `EXERCICIS`.
3. Canvia `const CLAU` i `const DONE_KEY` pel nom del tema nou.
4. Afegeix una entrada a `UNITATS` dins d'`index.html`:
   ```js
   { id: 'nou-tema', titol: '…', rang: 'exercicis X–Y' },
   ```
   Les rutes es dedueixen de l'`id`: no cal escriure-les.
5. Afegeix `'u7/nou-tema': 'cap',` a `publicats.js` i publica quan toqui.

## Provar-ho en local

```bash
python3 -m http.server
# obre http://localhost:8000
```

## Nota

Els exercicis amagats no s'envien al navegador *només* si no els has pujat mai.
Si el fitxer del tema ja és al repositori, un alumne prou tafaner podria llegir
l'array `EXERCICIS`. Per a un ús normal d'aula això és suficient; si algun dia
vols que sigui hermètic, cal no pujar les imatges fins al dia de publicar-les.
