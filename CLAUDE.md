# Instruccions per a Claude

## Qui és l'usuari

- Professor de Matemàtiques de Batxillerat (Catalunya). Llicenciat en Matemàtiques.
- Parla en **català**: respon sempre en català.
- Coneixements de GitHub limitats: quan calgui fer alguna cosa a GitHub, explica-ho
  pas a pas, amb enllaços i textos per copiar i enganxar.

## Com es puja la feina a GitHub

- **El professor puja ell mateix els fitxers** a GitHub: *Add file* → *Upload files* a l'arrel del
  repositori, i *Commit changes*. Claude no hi té permís d'escriptura ni hi fa pull requests: prepara els
  fitxers definitius (`hints.js`, `errades.js`, `cataleg.js`…), els envia i dona el missatge de commit.
- També es pot lliurar un **ZIP** perquè el professor el pugi a `_uploads/`: l'acció `unzip-upload.yml`
  el descomprimeix a l'arrel i en fa commit. Les rutes del ZIP han de ser les del repositori (per exemple
  `hints.js` o `u7/…`), sense cap carpeta que ho contingui tot. (Fins al 18/10/2026 aquesta acció
  fallava, perquè cridava comprovacions de `1eso/` i `4eso/` copiades d'un altre repositori.)

## Què és el projecte

Web estàtica (publicada des de GitHub, sense servidor) d'exercicis de Matemàtiques II (2n de Batxillerat).
L'alumne navega **unitat → tasca setmanal → exercici** i veu la imatge de l'enunciat i la solució.
Vegeu `README.md` i `TODO.md`.

| Fitxer | Paper |
|---|---|
| `tasques.js` | Programació: una línia per setmana (`unitat`, `setmana`, `limit`, `exercicis`) |
| `cataleg.js` | Fitxa de **cada** exercici de la unitat (títol `t`, dificultat `d`, imatges `i`, `a:1` si és activitat del món real). Mantingut a mà, no es genera |
| `hints.js` | Pistes, **només** dels exercicis programats a `tasques.js` |
| `errades.js` | Errades del solucionari dels exercicis programats («On diu / Ha de dir / Motiu») i observacions. Clau `'uN/número'`. **Es genera** amb `eines/conversor/genera.py` (vegeu més avall); no s'edita a mà |
| `assets/katex/` | KaTeX 0.16.47: pinta les fórmules de `errades.js`. No s'hi toca res |
| `marca.js` | Eina del professor per marcar on és una errada dins la imatge. Només es carrega amb `?tot=1&marca=1` |
| `pegats/` | Trossos de pàgina ja corregits (PNG petits) que `tasca.html` posa a sobre de les imatges. Camp `pegat` de `errades.js` |
| `index.html` | `UNITATS`: unitats i temes |
| `publicats.js` | Vista per temes (antiga): tots els temes a `'cap'` |
| `source/2Bat - Unitats i feina Classroom.xlsx` | Programació del curs (setmana, data límit, unitat, exercicis) |

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
6. Provar-ho al navegador amb `?tot=1` i enviar els fitxers definitius al professor perquè els pugi.

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
- Vectors amb fletxa: `<i class="vec">v</i>`, `<i class="vec">AB</i>`, `<i class="vec">PQ</i>`.
- Derivades sempre amb la variable: *f ′(x)*, *f ″(x)* (caràcters ′ i ″, no l'apòstrof recte), mai *f ′* sol.
- Apartats: «<b>a)</b> …<br><br><b>b)</b> …». Blocs diferents (introducció, llista, conclusió, avís)
  separats amb una línia en blanc (`<br><br>`).
- Elisió davant de la lletra: «d'*A*», «d'*a*», «d'*m*».

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

- **Totes les pistes de `hints.js` (u1–u3, u5–u14) les ha escrit o revisat el professor** (octubre de 2026).
  No es reescriuen si ell no ho demana. Una errada d'escriptura o de format no es corregeix en silenci:
  s'enumera, i es corregeix quan ell ho diu.
- **Flux de treball.** El professor edita les pistes amb l'artifact «Editor de pistes» (que parteix de
  `hints.js`). Si Claude proposa pistes noves, les deixa com a **esborranys a la base de dades de l'artifact**
  (col·lecció `hints`, document `uN_número`, camps `key` i `text`) perquè ell les revisi; Claude no les posa a
  `hints.js` si no li ho demana. Abans de tornar a escriure un esborrany, comprova que la versió del document
  encara és la que va escriure Claude (si el professor l'ha tocat, no el trepitgis).
- Quan el professor dona per bones les pistes, Claude les passa a `hints.js` i a la base de l'Editor
  (`DATA.items[].o` i les línies de `FILE`), comprova que `FILE` regenera exactament `hints.js`, i iguala els
  documents de la base de dades a la nova base (si no, una còpia antiga taparia el canvi).
- Quan el professor retoca els esborranys, Claude compara la seva versió amb la final i actualitza aquest
  apartat amb el que n'aprèn.

### Contrastar amb el solucionari

- Claude **pot llegir l'enunciat i la solució** de cada exercici: `cataleg.js` dona les imatges
  (`uN/<tema>/data/full-K.png`) i el Read les mostra. Una pista nova o revisada es comprova sempre contra
  l'enunciat (dades, noms dels punts i de les funcions, tots els apartats) i contra la resolució.
- Paranys trobats en la revisió de 2026: la pista parla d'un altre tipus d'exercici (u7/90, u13/96); dona per
  feta una forma de les dades que l'enunciat no té (recta en forma contínua o com a intersecció de plans, pla
  en paramètriques, numerador 2*y* − 1); fa servir un nom que xoca amb l'enunciat (punts *A*, *B*, *C* i
  coeficients *A*, *B*, *C*); repeteix una errada del solucionari (u14/53); no cobreix un apartat.
- Una errada del solucionari nova va a `errades.js` (o a `OBSERVACIONS`), i la pista no la reprodueix.

### Què s'ha après dels esborranys
- **Què s'ha après dels esborranys de la u14**:
  - Retalla les preguntes que demanen un recompte o una deducció intermèdia («quants termes tindràs?»,
    «quins valors de *X* hi corresponen?»): ho afirma («és preferible treballar amb l'esdeveniment
    contrari») o ho deixa per a l'alumne. Conserva, com a molt, una pregunta final de comprensió («saps per què
    la suma total dona exactament 1?»), i no sempre.
  - No hi posa exemples inventats amb números que no són de l'enunciat (com «5 llançaments d'una moneda»).
    Només deixa un exemple si il·lustra directament el concepte (una variable que compta peces defectuoses).
  - No afegeix avisos laterals que l'exercici no necessita (l'extracció sense reposició).
  - Un aclariment conceptual porta l'etiqueta <b>Observació</b>; <b>Atenció</b> es reserva per a un avís o un
    parany.
  - Quan unes condicions s'han de complir totes alhora, les numera («1- …», «2- …») en lloc de «- ».
  - Si una pista cobreix dues feines diferents (identificar la distribució / fórmules de la mitjana i la
    variància), les separa amb una línia en blanc.
  - Posa en negreta el terme tècnic sencer («<b>distribució binomial</b>»).
  - Prefereix «identifica» i «deduir» a «llegeix» i «trobar», i la primera persona del plural («anomenem»,
    «tenim», «ens referim») a «et quedarà».
- **Què s'ha après dels esborranys de la u1**:
  - Treu gairebé totes les preguntes finals «saps per què…?» (5 de 6). En conserva una només quan apunta a la
    idea clau de l'exercici (u1/13: per què els nombres que multipliquen es poden deixar per al final). Quan la
    pregunta amagava un avís, el converteix en afirmació amb <b>Atenció</b> (u1/49: «que es pugui fer *AB* no
    vol dir que es pugui fer *BA*»). Com a molt, hi afegeix una pregunta sobre el resultat de la comprovació
    (u1/16: «es compleix la igualtat, en aquest cas?»).
  - Cobreix totes les parts de l'exercici, també la trivial (u1/12: «la primera operació es fa directa…»), en
    lloc de centrar-se només en la difícil.
  - Retalla la regla al que l'exercici necessita (u1/49: treu «el resultat té les files de la primera i les
    columnes de la segona») i no afegeix frases de cloenda, encara que repeteixin l'enunciat (u1/42: treu
    «Els nombres, inventa'ls tu»).
  - Pot obrir amb una imatge que faci intuïtiu el concepte («una matriu és com un full de càlcul», u1/17).
  - Una definició que només aclareix un terme va al final, després d'una línia en blanc, amb <b>Observació</b>
    (u1/85: què és una matriu nul·la).
  - Notació: el producte porta un punt dins de la cursiva, <i>A · B</i>; diu «element» i no «nombre» per a
    una matriu 1×1; el terme tècnic en negreta amb el nom sencer («<b>Matriu diagonal</b>»).
  - Per anomenar una part de l'exercici diu «el segon apartat» (u1/16) en lloc del nom de la propietat que hi
    toca.
  - Parla en plural («recomanem», «podem pensar»).
  - No diguis «que el determinant no sigui zero». Digues «que el determinant sigui diferent de zero».
- **Què s'ha après dels esborranys de la u3**:
  - Anomena el mètode explícitament i al principi («En cada cas, fes servir el mètode de Gauss, fins que
    obtinguis una matriu esglaonada», u3/38). Però quan l'exercici admet diversos mètodes, no n'imposa cap:
    «pel mètode que prefereixis» (u3/100), «per exemple pel mètode de Gauss» (u3/90).
  - **Lèxic: «esglaonada», no «escalonada».** «Respectivament» quan els noms es corresponen amb una enumeració.
  - Treu les justificacions i comprovacions que ell considera d'alçada superior: la pregunta final «saps per què…?»
    (u3/39) la substitueix per una afirmació («L'equació que obtinguis ja és la que estàs buscant»); treu «per
    comprovar-ho, multiplica *A · X*» (u3/42) i l'explicació de què representa cada producte (u3/41).
  - Treu els detalls de procediment que l'alumne ja sap («columna a columna», «de baix a dalt») i els avisos
    laterals (u3/56: treu l'<b>Atenció</b> sobre els sistemes amb més equacions que incògnites). Manté, com a
    mínim, l'<b>Atenció</b> d'un parany real (u3/41, u3/42).
  - Un fet es diu com a fet i amb la conseqüència: «per la resta de valors, el sistema sempre serà compatible
    determinat» (u3/60), en lloc de «pensa quin tipus de sistema obtenim». Explicita el pas intermedi que
    connecta («Iguala el càlcul del determinant a zero, i per tant tindràs una equació»).
  - En les condicions de classificació escriu la conseqüència primer i el terme tècnic en negreta entre
    parèntesis («llavors el sistema no té solució (<b>sistema incompatible</b>)», u3/55). La notació matemàtica
    sencera va dins una sola cursiva i sense espais: <i>rang(A)=rang(A*)=n</i>.
  - Quan una pista cobreix dues feines o una definició i un procediment, les separa amb una línia en blanc (u3/55:
    «Discutir…» a part). Si l'exercici té dues parts seqüencials, les ordena amb «En primer lloc… En segon lloc…»
    (u3/64) i, per apartats, «Apartat a)… Apartat b)…» (u3/66).
  - Etiquetes: <b>Indicació</b> per a una pista d'inici de camí (u3/56), <b>Observació</b> per enllaçar amb
    un apartat anterior (u3/66), <b>Atenció</b> per a un parany.
  - Enumera amb «- » fins i tot elements breus (<i>rang(A)</i>, <i>rang(A*)</i>, <i>n</i>, u3/56).
- **Què s'ha après dels esborranys de la u5**:
  - Treu el procediment que l'alumne ja sap (com substituir, com llegir el vector director) i les observacions
    laterals, i no remet a altres exercicis («com a l'exercici 46»): ho substitueix per un punt de partida.
  - Accions concretes en lloc de fórmules abstractes: «substituïm les coordenades del punt a l'equació del pla
    i aïllem *D*», no «imposant que el pla passi pel punt».
  - «Vectors **paral·lels**» per a la idea geomètrica; «coordenades **proporcionals**» per al càlcul.
  - Les aposicions i definicions surten de la frase principal: van a una **Observació** al final o es treuen
    (u5/72: què és *PQ*). **Observació**, no **Atenció**, quan no és un parany (u5/80).
  - Subjectes explícits («Si **els rangs** són 2 i 2»), noms sencers («equacions paramètriques») i to oral
    («que són, de fet, …»). No posa el nom del teorema entre parèntesis com a etiqueta (u5/74).
- **Què s'ha après dels esborranys de la u6**:
  - No copia una fórmula que l'alumne ha de saber: «Revisa quina és la fórmula de la distància d'un punt a un
    pla» (u6/86).
  - Notació compacta per a les condicions: *v* · *n* ≠ 0 i *v* · *n* = 0, amb els vectors anomenats abans.
  - Una comprovació addicional («també la pots calcular amb la fórmula…») va en una **Observació** a part.
  - Manté l'**Atenció** dels paranys reals (el valor absolut dona dues solucions) i posa en negreta la
    conclusió clau («**dos punts**»).

## Errades del solucionari

- Viuen a `errades.js`: una llista d'errades per exercici. El format és a la capçalera
  del fitxer i al `README.md`.
- **`errades.js` es genera** amb `eines/conversor/genera.py` a partir de `tex/errors-setmanaN.tex`
  (text), `eines/localitzador/marques.json` (marques) i `eines/pegats/pegats.json` (pegats). Una errada o
  observació nova s'escriu a `tex/` i després `genera.py --escriu` i `verifica.js`; si només es toca
  `errades.js`, es perd el dia que es torna a generar. Vegeu `eines/LLEGEIX-ME.md`.
- **Pegats** (el solucionari «pintat» ja corregit): amb les receptes d'`eines/pegats/` i `fes.py`, i
  mirant sempre el full ampliat abans de donar-lo per bo. Quan la correcció no hi cap tal com és, es pot
  escriure una forma equivalent que sí que hi càpiga (u6/88: «√6 · √6» en lloc d'una fracció de dos pisos).
  Després de canviar `errades.js`, puja el número de `errades.js?v=` a `tasca.html`.
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

## Suggeriments de treball per a Claude

- **Valida cada pista abans de desar-la:** una sola línia, només `<i>`, `<b>`, `<br>` (cap altre `<`, que
  s'escriu «menor que» en text), etiquetes tancades, cap accent greu ni `$`, cap `<br>` ni espai sobrer al final.
- **Les pistes del professor poden tenir errades d'escriptura** («en primer llocs», «li ha afegim»): són
  descuits, no estil. No les copiïs.
- **La mida de l'esborrany ha de ser el mínim que cobreix tots els apartats.**
- **Un esborrany sense canvis vol dir revisat i que al professor li ha semblat bé.**
