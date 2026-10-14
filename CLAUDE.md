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
   (que apunti al mètode, **mai** el resultat; segons l'apartat «Estil de les pistes»).
6. Provar-ho al navegador amb `?tot=1` i crear la pull request.

## Estil de les pistes

- Clau `'uN/número'`. Apòstrofs escapats (`d\'una`) o tipogràfics (’).
- Orienten cap al mètode o el concepte clau; no donen el resultat numèric ni el pas final.

### Format

- La pista es mostra com a HTML (`innerHTML` a `tasca.html`): només s'hi poden fer servir `<i>`, `<b>` i
  `<br>`. Cap altre `<` (un `<` perdut fa desaparèixer part del text). No s'hi pinten fórmules `$...$`:
  les expressions s'escriuen en text pla.
- Una pista és **una sola línia** de `hints.js`: cap salt de línia real. `<br>` separa els passos.
- `<i>` per a la notació matemàtica: paràmetres, variables, funcions i punts (*a*, *b*, *m*, *f(a)*, *x=1*,
  *h(x)*, *log(3)*). No per a nombres sols ni per a text corrent.
- `<b>` amb mesura. Només per a: el **terme tècnic** la primera vegada que s'anomena («<b>indeterminació</b>»,
  «<b>definida a trossos</b>», «<b>evitable</b>», «<b>de salt infinit</b>»), un **qualificatiu clau**
  («<b>sempre</b>», «<b>no és finit</b>») o l'**etiqueta d'un avís** («<b>Atenció</b>:»). Mai per decorar.
- Llista amb «- » (cada ítem separat per `<br>`) quan hi ha casos paral·lels o passos. Si la llista és
  precedida d'una frase, aquesta acaba amb dos punts («…tingues en compte això:»). `<br>` sol per a una
  narració seguida. Un avís final va després d'una línia en blanc (`<br><br>`).
- El guionet i el signe menys «−» els fa servir indistintament: no el corregeixis.

### Com escriu el professor (el model per a qualsevol pista nova o revisada)

Extret de com va refer, una per una, les propostes de Claude. Tot i que la forma és senzilla, la diferència
amb una màquina és de fons:

1. **Activa l'alumne i li deixa el descobriment.** No li dona la regla feta ni el resultat del raonament.
   Tanca amb una pregunta de **comprensió**, no de càlcul: «saps per què…?», «entens el motiu?», «realment
   creus que pot tenir alguna arrel positiva?», «pensa bé si és −∞ o +∞», «a veure si ja desapareix…».
   Una pregunta que obliga a fer un càlcul («quantes vegades has de repetir-ho?») la substitueix per
   **mostrar el patró** (1; 0,5; 0,25; 0,125…) i preguntar pel motiu.
2. **Explica el perquè, amb la definició.** Una regla no va sola: «en un punt que no sigui del domini la
   funció no pot ser contínua perquè la imatge d'aquell punt no existeix»; «(el motiu: és suma d'una
   exponencial i d'una polinòmica)»; «(saps per què en la resta de punts és contínua?)».
3. **Anomena el concepte, el teorema o el mètode pel seu nom.** «El teorema de Bolzano», «la funció
   auxiliar *h(x)*», «una indeterminació 0/0», «(per bisecció)», «límits laterals», «sistema d'equacions»,
   «la imatge *f(x)*». No el substitueix per una paràfrasi procedimental («passa quan pots simplificar…»).
4. **Digues l'objectiu tal com el demana l'enunciat**: «fins que la longitud de l'interval sigui 1/2 o
   inferior», «l'interval que et demanen ha de tenir longitud 2», «les dues funcions valen el mateix».
5. **Concreció.** Un exemple o unes dades en lloc d'una descripció: «*log(3)* existeix, però *log(−3)* i
   *log(0)* no», «comprova que *f(−3)* i *f(−2)* tenen signes diferents» (no «als dos extrems»), dividir
   3 entre un polinomi de grau 2.
6. **No repeteix el que l'alumne ja sap.** Treu les frases de cloenda («Simplifica l'expressió…»), les
   introduccions meta («Fes-ho al revés»), i el procediment d'un mètode ja treballat (a la bisecció no
   explica com es calcula el punt mig). Enllaça amb el que ja han fet: «recorda que has de comparar els
   graus», «fes el mateix que amb la *f*», «fes el mateix que a l'exercici 40».
7. **La llargada la mana el contingut, no un màxim.** Retalla el que sobra, però allarga quan afegeix un
   perquè o un exemple (algunes pistes seves són més llargues que l'esborrany). Una pista que ja és curta i
   clara es deixa tal com és.
8. **Un fet es diu com a fet.** Si és coneixement a recordar (el domini d'una arrel, d'un logaritme, del
   valor absolut), l'afirma; la pregunta es reserva per al raonament.
9. **Llenguatge precís i, alhora, oral i amable.** Precisió: «polinomi» per a l'expressió i «una exponencial
   i una polinòmica» per a tipus de funció; «el límit no és finit» i no «és infinit» (podria ser −∞ o +∞);
   −∞ i +∞ per separat en lloc de «±∞»; «tant grans com vulguem» en lloc de «molt grans». Oral:
   «molt i molt gran», «a la llarga», «és ben senzill», «llavors», «Per tant…»; verbs «obtenir»,
   «deduir», «comprovar», «parar atenció». L'ànim, en positiu: «això et permet deduir…», «i podràs trobar
   els valors que et demanen».

Les pistes del professor poden tenir errades d'escriptura («en primer llocs», «quan a domini»): són
descuits, no estil. No les copiïs.

### Qui toca què

- Les pistes que el professor ha escrit o revisat a mà **no es reescriuen** si ell no ho demana: tota la
  unitat 8 i la unitat 7 (`u7/40`–`u7/120`).
- **Flux de treball.** El professor edita les pistes amb l'artifact «Editor de pistes» (que parteix de
  `hints.js`) i en copia el text complet cap a GitHub. Si Claude proposa pistes noves, les deixa com a
  **esborranys a la base de dades de l'artifact** (col·lecció `hints`, document `uN_número`, camps `key` i
  `text`) perquè ell les revisi; Claude no les posa a `hints.js` si no li ho demana. Abans de tornar a
  escriure un esborrany, comprova que la versió del document encara és la que va escriure Claude (si el
  professor l'ha tocat, no el trepitgis).
- Quan el professor retoca els esborranys, Claude compara la seva versió amb la final i actualitza aquest
  apartat amb el que n'aprèn.

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
