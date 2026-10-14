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
- **Format.** La pista es mostra com a HTML (`innerHTML` a `tasca.html`): només s'hi poden fer servir
  `<i>`, `<b>` i `<br>`. Cap altre `<` (un `<` perdut fa desaparèixer part del text). No s'hi pinten
  fórmules `$...$`: les expressions s'escriuen en text pla.
- **`<i>` per a la notació matemàtica**: paràmetres, variables, funcions i punts (*a*, *b*, *m*, *f(a)*, *x=1*,
  *g*). No per a nombres sols ni per a text corrent.
- **`<b>` gairebé mai**: només per ressaltar de debò una paraula o un avís («**Atenció**», «**normal**»).
  El professor no abusa de la negreta.
- **`<br>` separa els passos** de la pista. Una pista és una sola línia de `hints.js`: no s'hi posa cap
  salt de línia real.
- **Estil del professor** (és el model per a qualsevol pista nova o revisada): senzill, directe i pedagògic.
  Segona persona del singular («Calcula», «Fixa't»). Seqüència clara: *primer… després… finalment…*, un pas
  per línia. Verbs d'acció. Sense frases llargues ni to de màquina. Escurça sempre que es pugui.
  El guionet i el signe menys «−» els fa servir indistintament: no el corregeixis.
- **Què el diferencia d'una màquina** (extret de com el professor va retocar els esborranys de Claude):
  - **Activa l'alumne.** No li dona la regla feta: li deixa el descobriment. Preguntes («saps per què
    funciona?», «pot haver-hi una arrel positiva?»), «comprova per quin motiu…», «pensa bé si és −∞ o +∞»,
    «a veure si ja desapareix la indeterminació». Treu les frases que expliquen què veuran els alumnes.
  - **Retalla.** Elimina les frases de cloenda («Simplifica l'expressió…», «No busquis res complicat»), les
    introduccions meta («Fes-ho al revés») i el que l'alumne ja sap. Si només un passi desbloqueja, només
    hi posa aquest.
  - **Enllaça amb el que ja saben**: «recorda que has de comparar els graus» (exercici anterior), «fes el
    mateix que amb la <i>f</i>», «fes el mateix que a l'exercici 40».
  - **Un exemple concret** quan la regla és abstracta (dividir 3 entre un polinomi de grau 2).
  - **Precisió matemàtica**: «polinomi» i no «potència de x»; «el límit no és finit» i no «és infinit»;
    escriu els dos casos (−∞ i +∞) en comptes de «±∞»; «tant grans com vulguem» en comptes de «molt grans».
  - **Llista amb «- »** (cada ítem separat per `<br>`) quan hi ha casos paral·lels o passos; `<br>` sol per
    a una narració seguida. Una línia en blanc (`<br><br>`) abans d'un avís final.
  - **Negreta**: per al **terme tècnic** la primera vegada que s'anomena («<b>indeterminació</b>»,
    «<b>definida a trossos</b>», «<b>funció lineal</b>») i per a un qualificatiu clau («<b>sempre</b>»,
    «<b>no és finit</b>»). Mai per decorar.
  - **Llengua oral i amable**: «molt i molt gran», «a la llarga», «és ben senzill», «a veure si…»; verbs
    «obtenir», «deduir», «comprovar». Si una pista ja és curta i clara, la deixa tal com és.
- Les pistes que el professor ha escrit a mà (tota la unitat 8 i `u7/40`, `u7/43`, `u7/44`) no es
  reescriuen si ell no ho demana.
- **Flux de treball.** El professor edita les pistes amb l'artifact «Editor de pistes» (que parteix de
  `hints.js`) i en copia el text complet cap a GitHub. Si Claude proposa pistes noves, les deixa com a
  **esborranys a la base de dades de l'artifact** (col·lecció `hints`, document `uN_número`, camps
  `key` i `text`) perquè ell les revisi; Claude no les posa a `hints.js` si no li ho demana.

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
