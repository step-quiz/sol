# Instruccions per a Claude

## Qui és l'usuari

- Professor de Matemàtiques de Batxillerat (Catalunya). Llicenciat en Matemàtiques.
- Parla en **català**: respon sempre en català.
- Coneixements de GitHub limitats: quan calgui fer alguna cosa a GitHub, explica-ho
  pas a pas, amb enllaços i textos per copiar i enganxar.

## Pull requests

- **Per defecte, crea tu mateix la pull request** quan hagis pujat feina a la branca,
  i dona'n l'enllaç. L'usuari només ha de fer: *Merge pull request* → *Confirm merge*.
- Abans de pujar feina nova, comprova si l'última pull request ja s'ha fusionat.
  Si és així, torna a començar la branca des de `main` i crea una pull request **nova**
  (una pull request fusionada no agafa commits nous).

## Què és el projecte

Web estàtica (GitHub Pages, sense servidor) d'exercicis de Matemàtiques II (2n de Batxillerat).
L'alumne navega **unitat → tasca setmanal → exercici** i veu la imatge de l'enunciat i la solució.
Vegeu `README.md` i `TODO.md`.

| Fitxer | Paper |
|---|---|
| `tasques.js` | Programació: una línia per setmana (`unitat`, `setmana`, `limit`, `exercicis`) |
| `cataleg.js` | Fitxa de **cada** exercici de la unitat (títol `t`, dificultat `d`, imatges `i`, `a:1` si és activitat del món real). Mantingut a mà, no es genera |
| `hints.js` | Pistes, **només** dels exercicis programats a `tasques.js` |
| `errades.js` | Errades del solucionari dels exercicis programats («On diu / Ha de dir / Motiu») i observacions. Clau `'uN/número'`. S'edita a mà |
| `assets/katex/` | KaTeX 0.16.47: pinta les fórmules de `errades.js`. No s'hi toca res |
| `marca.js` | Eina del professor per marcar on és una errada dins la imatge. Només es carrega amb `?tot=1&marca=1` |
| `pegats/` | Trossos de pàgina ja corregits (PNG petits) que `tasca.html` posa a sobre de les imatges. Camp `pegat` de `errades.js` |
| `index.html` | `UNITATS`: unitats i temes |
| `publicats.js` | Vista per temes (antiga): tots els temes a `'cap'` |
| `2Bat - Unitats i feina Classroom.xlsx` | Programació del curs (setmana, data límit, unitat, exercicis) |

## Com s'afegeix una unitat nova (workflow)

1. L'usuari passa el **PDF del solucionari** de la unitat.
2. **Imatges**: cada pàgina del PDF → `uN/<tema>/data/full-K.png`, retallada sense la
   capçalera "SOLUCIONARI" ni el número de pàgina, **1208 px d'amplada**. Comprova que cap
   text quedi fora del retall. Una pàgina amb exercicis de dos temes va a les dues carpetes.
3. **Catàleg** de **tota** la unitat a `cataleg.js` (no només dels seleccionats), afegir la unitat
   a `UNITATS_META` (`cataleg.js`), a `UNITATS` (`index.html`) i els temes a `publicats.js`.
   - La dificultat (●○○) es llegeix dels cercles del PDF; la secció PRACTICA i els
     problemes finals no en porten (`d:''`).
   - Els números 1–N de "Matemàtiques en el món real" porten `a:1` i ocupen aquests números:
     les activitats del text amb el mateix número no hi caben.
4. L'usuari passa la **llista-sel** (exercicis de cada setmana, segons l'Excel).
5. Afegir les setmanes a `tasques.js` i **una pista per exercici** a `hints.js`
   (una o dues frases que apuntin al mètode, **mai** el resultat).
6. Provar-ho al navegador amb `?tot=1` i crear la pull request.

## Estil de les pistes

- Clau `'uN/número'`. Apòstrofs escapats (`d\'una`) o tipogràfics (’).
- Orienten cap al mètode o el concepte clau; no donen el resultat numèric ni el pas final.

## Errades del solucionari

- Viuen a `errades.js`: una llista d'errades per exercici. El format és a la capçalera
  del fitxer i al `README.md`.
- El text s'escriu entre accents greus amb `TEX` al davant, i les fórmules entre `$...$`
  (LaTeX). No s'hi pot posar cap accent greu ni la parella `${`.
- Es veuen a `tasca.html`: etiqueta al costat del botó *Veure solució* a la llista de la tasca
  (les errades d'enunciat, senceres) i targetes «On diu / Ha de dir» abans de la imatge.
- El camp `marca` de cada errada diu on és dins la imatge (imatge i rectangle en tant per cent).
  Es calcula amb l'eina `tasca.html?tot=1&marca=1` (`marca.js`). Una marca mal posada és pitjor
  que cap marca: s'ha de comprovar sempre a la imatge ampliada.
- Amb `ERRADES_PEGATS = true`, una errada amb `pegat` no s'anuncia: la imatge ja es veu corregida.
  Les imatges originals no es toquen mai. Els pegats no es fan a mà.
- Després de tocar el fitxer, obrir `tasca.html?tot=1#u7/s3` i comprovar que cap fórmula
  surt en vermell (KaTeX pinta en vermell el que no entén).
