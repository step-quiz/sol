# Instruccions per a Claude

<!-- regles-comunes:inici -->
## Regles comunes de Step Quiz

*Aquest bloc és igual a tots els repositoris de `step-quiz`. Les regles específiques d'aquest
repositori, si n'hi ha més avall, manen sobre aquestes quan diuen una altra cosa.*

- **Llengua.** Parla amb l'usuari en català. Tot el que veu l'alumnat, també en català.
- **L'usuari.** David, llicenciat en Matemàtiques i professor d'ESO i Batxillerat a Catalunya.
  Programa en C i dissenya algorismes; d'HTML, CSS, JS, Git, GitHub, Codespaces i LaTeX en sap
  el que cal per fer-los servir, no més. Quan hagi de fer alguna cosa (pull, push, commit, pujar
  un ZIP, compilar…), dona-li els passos numerats, amb les ordres o els textos per copiar i
  enganxar, i explica què fa cada pas.
- **ZIP.** Els ZIP que lliuris, l'usuari els puja a `_uploads/` (GitHub → `_uploads/` →
  *Add file* → *Upload files*), i el workflow `unzip-upload.yml` els descomprimeix a l'arrel i en
  fa commit. Per tant, les rutes de dins del ZIP comencen a l'arrel del repositori (`js/app.js`,
  no `projecte/js/app.js`): cap carpeta que ho contingui tot. El que hi hagi a `.github/` s'ignora;
  els workflows es canvien des del web de GitHub.
- **Publicació.** Els webs es publiquen amb Cloudflare Pages a cada commit de `main`. Cap missatge
  de commit pot portar `[skip ci]`, `[ci skip]` ni `[cf-pages-skip]`, tampoc els dels workflows
  que desen fitxers generats: Cloudflare no publicaria aquell commit.
- **Webs estàtiques.** HTML, CSS i JavaScript sense compilació ni servidor, si aquest repositori
  no diu el contrari. Cap dada personal de l'alumnat en un repositori públic.
- **Documentació.** Si canvies el comportament, posa al dia el README i els documents que el
  descriuen en el mateix commit. Si el codi i un document no coincideixen, el que s'ha
  d'arreglar és el document.
- **Proves.** Abans de lliurar res, passa les proves del repositori i digues-ne el resultat.
<!-- regles-comunes:fi -->


## Qui és l'usuari

- Professor de Matemàtiques d'ESO i Batxillerat (Catalunya). Llicenciat en Matemàtiques.
- Parla en **català**: respon sempre en català.
- Coneixements de GitHub limitats: quan calgui fer alguna cosa a GitHub, explica-ho
  pas a pas, amb enllaços i textos per copiar i enganxar.
- Col·labora amb l'editorial del llibre (detecta errades del solucionari i les hi passa).

## Com es puja la feina a GitHub

- **El professor puja ell mateix els fitxers** a GitHub: *Add file* → *Upload files* a l'arrel del
  repositori, i *Commit changes*. Claude no hi té permís d'escriptura ni hi fa pull requests: prepara els
  fitxers definitius (`hints.js`, `tasques.js`, `cataleg.js`…), els envia i dona el missatge de commit.
- També es pot lliurar un **ZIP** perquè el professor el pugi a `_uploads/`: l'acció `unzip-upload.yml`
  el descomprimeix a l'arrel i en fa commit. Les rutes del ZIP han de ser les del repositori (per exemple
  `hints.js` o `apl-u5/…`), sense cap carpeta que ho contingui tot. **Límit de GitHub: 25 MB per fitxer pujat
  pel web.** Una unitat sencera d'imatges (~15 MB) hi cap; si un ZIP passa de 25 MB, parteix-lo en dos.
- Després de cada pujada s'executa `comprova.yml` (Actions): si surt en vermell, alguna dada no quadra.

## Què és el projecte

Web estàtica (publicada amb Cloudflare Pages des de GitHub, sense servidor) d'exercicis de Matemàtiques de
**4t d'ESO**, amb dues matèries: **Aplicades** (`apl`) i **Acadèmiques** (`aca`). És germana de `sol`
(Matemàtiques II, 2n de Batxillerat): mateix funcionament, mateixos fitxers, mateix estil.
L'alumne navega **matèria → unitat → tasca setmanal → exercici** i veu la imatge de l'enunciat i la solució.
Vegeu `README.md` i `TODO.md`.

**Llibre i solucionari:** Santillana, *Matemáticas 4 ESO Opción A* (edició de la Comunitat Valenciana, en
castellà): `source/4ESO_aplicades_-_Solucionario.pdf`. Les imatges surten d'aquest PDF (pàgina del PDF =
pàgina del llibre + 1); els títols del catàleg i tot el que veu l'alumne són en català.

**Llibre propi:** el del professor, a l'Overleaf (`4eso-apl`, 11 UD). **Les unitats del web són les seves UD**
(vistiplau del 7/11/2026), i cada UD agafa la pràctica de Santillana que li toca, d'una o més unitats, més els
exercicis del llibre propi quan Santillana no en té. Quins exercicis de Santillana van a cada UD: artifact
«Vistiplau · Mapa de continguts 4t A ↔ Santillana» (P1–P11) i doc «Mapa de continguts». Les UD es carreguen
una a una, unes setmanes abans de fer-les. Ordre del curs: UD1, UD2, UD3, UD4, UD11, UD5, UD10, UD6, UD7, UD8,
UD9 (camp `ordre` a `UNITATS_META`). No es carrega cap contingut d'ampliació.

### Identificadors (diferència amb `sol`)

- **Unitat:** prefix de la matèria + UD del llibre propi: `apl-ud4`, `apl-ud10`. És la carpeta de les imatges
  (`apl-ud4/<tema>/data/full-K.png`; el tema porta la unitat de Santillana al davant: `u5-semblanca`) i el
  principi de les claus: `'apl-ud4/U5.64'` a `hints.js`, `errades.js` i `enunciats.js`.
- **Exercici:** la clau diu d'on surt.
  - Santillana: `'U5.57'` (unitat 5, ex. 57). Els que no tenen número: `'U4.FN'` (fake news), `'U4.SA1'`
    (situació d'aprenentatge), `'U4.AV1'` (autoavaluació), `'U4.R1'` (repte); porten `e` (etiqueta) i `nom`.
    L'etiqueta que veu l'alumne és «U5 · 57», «U4 · Situació 1». Els «¿Qué sabes ya?» que siguin a la
    llista aprovada: `'U3.QS1'`. Els annexos: `'AP.33'` (Polinomis), `'AR.'` (Potències i radicals),
    `'AT.'` (Trigonometria); l'etiqueta és «Annex Pol. · 33» (`ORIGENS` a `cataleg.js`).
  - Llibre propi: `'4.2.7'` (el número del llibre: UD.activitat.exercici). `i:[]`: no tenen imatge; l'enunciat
    i la solució (camp `solucio`) són a `enunciats.js`, i `tasca.html` els mostra en prémer «Veure solució».
    Es transcriuen del `.tex` (exlist i sollist). Fora: «Per al Quadern d'eines», reflexions personals i la
    prova escrita. Les figures: la `tikzpicture` compilada a part (`standalone`, colors de `defs.tex`) i
    passada a PNG a `apl-udN/enunciats/<clau>.png`.
  - A `tasques.js` van sempre entre cometes: `exercicis:['4.2.7', 'U5.57', 'U4.SA1']`.
- El «Desafío» de Santillana no és al catàleg.
- **Com es carrega una UD:** pàgines de cada exercici amb `pdfplumber` (els números són Raleway-SemiBold de
  8 pt a x < 60 o 235 < x < 260; la dificultat són tres cercles de 3,2 pt just a sota, plens si tenen color
  CMYK), temes a `eines/retalls.json`, `retalla.py --escriu`, catàleg, i **revisar cada solució** (les errades
  noves van a `errades.js`, amb la marca comprovada a la imatge). Una tasca d'exemple amagada per UD, amb els
  enunciats dels seus exercicis.

| Fitxer | Paper |
|---|---|
| `tasques.js` | Programació: una línia per setmana (`unitat`, `setmana`, `limit`, `exercicis`) |
| `cataleg.js` | `MATERIES`, `UNITATS_META` i la fitxa de **cada** exercici de la unitat (títol `t`, dificultat `d`, imatges `i`, i `e`/`nom` per a les claus de text). Mantingut a mà |
| `hints.js` | Pistes, **només** dels exercicis programats a `tasques.js` |
| `enunciats.js` | Enunciats complets en català i KaTeX, **només** dels exercicis programats. A la llista de la tasca substitueixen el títol curt `t` |
| `errades.js` | Errades del solucionari dels exercicis programats (62 errades, 55 exercicis, totes amb `pegat`), amb totes les funcions de `sol` (targetes, marques, pegats) i la taula `PAGINES_IGUALS` |
| `assets/katex/` | KaTeX 0.16.47: pinta les fórmules de `errades.js`. No s'hi toca res |
| `marca.js` | Eina del professor per marcar on és una errada dins la imatge (`tasca.html?tot=1&marca=1`) |
| `pegats/` | Trossos de pàgina ja corregits (163 PNG). Els fa `eines/pegats/` |
| `eines/retalla.py`, `eines/retalls.json` | Fan les imatges d'una unitat a partir del PDF |
| `eines/figura.py` | Retalla una figura del PDF per a un enunciat (`apl-uN/enunciats/<n>-1.png`) |
| `eines/comprova.js` | Les proves: catàleg, imatges, tasques, pistes, errades, enunciats i fórmules (KaTeX) |
| `source/` | El PDF del solucionari |

## Com s'afegeix una unitat nova (workflow)

1. Mira al PDF quines pàgines té la unitat i com es divideix en seccions (activitats del tema, activitats
   finals 1, 2, 3…, problemes aparentment diferents, situació d'aprenentatge, autoavaluació).
2. **Imatges**: afegeix la unitat a `eines/retalls.json` (pàgines del PDF de cada tema; la caixa del retall
   de la UD4 serveix per a tot el llibre) i passa `python3 eines/retalla.py apl-uN`; mira'n el resultat a
   `eines/sortida/` i, si és bo, `--escriu`. Cada pàgina queda a `apl-uN/<tema>/data/full-K.png`, a
   **1208 px d'amplada**, sense la capçalera «SOLUCIONARIO» ni el número de pàgina. Una pàgina amb exercicis de
   dos temes va a les dues carpetes. Comprova a ull que cap text quedi tallat.
3. **Catàleg** de **tota** la unitat a `cataleg.js` (no només dels exercicis triats) i la unitat a
   `UNITATS_META`.
   - La dificultat (●○○) es llegeix dels cercles del PDF (són corbes: tres cercles, els plens tenen color).
     Les activitats del tema, els exercicis «resolts al llibre», els problemes aparentment diferents, la
     situació d'aprenentatge i l'autoavaluació no en porten (`d:''`).
   - Les imatges de cada exercici: des de la pàgina on comença fins a la pàgina on comença el següent (si el
     següent comença a dalt de tot de la columna esquerra, la pàgina anterior). Amb la posició dels números
     (lletra `Raleway-SemiBold` a la capa de text) es calcula sol; després es mira a ull.
4. L'usuari passa la **llista-sel** (exercicis de cada setmana, segons l'Excel).
5. Afegir les setmanes a `tasques.js`, l'**enunciat** de cada exercici programat a `enunciats.js` (apartat
   «Enunciats») i, si ho demana, esborranys de **pista** per exercici (que apuntin al mètode, **mai** el
   resultat; segons l'apartat «Estil de les pistes»).
6. `node eines/comprova.js`, provar-ho al navegador amb `index.html?tot=1` i enviar els fitxers definitius al
   professor perquè els pugi.

## Enunciats (`enunciats.js`)

Decisió del professor (7/11/2026): a la llista de la tasca, en lloc del títol curt, l'enunciat complet, **en
català**, amb KaTeX, **només dels exercicis programats**. Les figures es retallen del PDF.

- **Transcripció fidel.** Mateixes dades, mateix ordre d'apartats, mateixos noms de variables i punts. Es
  tradueix, no s'adapta ni s'aclareix. Es llegeix la imatge ampliada (no la capa de text, que barreja
  columnes) i, en acabat, es compara la web renderitzada amb la imatge, apartat per apartat.
- **Si l'enunciat del llibre té una errada**, no es corregeix en silenci: es transcriu tal com és i es diu al
  professor (pot anar a `errades.js` amb `enunciat: 1`).
- Les dades que l'enunciat del solucionari no porta (les de la pàgina d'obertura de la unitat, a les
  situacions d'aprenentatge) no s'inventen.
- Català del llibre: «Troba», «Resol», «Esbrina», «Determina», «Calcula»; «sistema compatible
  determinat / indeterminat», «incompatible»; «inequació»; «parell»; vols «de la tarda / de la nit».
- LaTeX: fraccions amb `\dfrac`; sistemes amb `\left.\begin{aligned} … \end{aligned}\right\}` (la clau a la
  dreta, com el llibre); parells amb parèntesis normals, o `\left( … \right)` si porten fraccions.
- `col`: 3 per a equacions curtes, 2 per a sistemes o expressions llargues, 1 si cal.
- Figura: `python3 eines/figura.py apl-ud10 U4.37-1 <pàgina PDF> x0 y0 x1 y1` (coordenades de pdfplumber), mirar
  el retall a `eines/sortida/`, i `--escriu`. A l'enunciat: `fig: ['enunciats/U4.37-1.png']`.
- Sempre `node eines/comprova.js` (pinta totes les fórmules) i mirar la tasca al navegador, a l'ordinador i al
  mòbil (390 px): cap fórmula en vermell, cap apartat tallat.

## Estil de les pistes

*Heretat de `sol` (Matemàtiques II, 2n de Batxillerat), on el professor va revisar totes les pistes. Val igual
per a 4t d'ESO, amb una diferència: l'alumnat és més jove i, a Aplicades, el llenguatge ha de ser encara més
planer. Els exemples (u1, u7, u14…) són de `sol`.*

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

- **Les pistes les escriu o les revisa el professor.** Ara mateix `hints.js` és buit. No es reescriu cap pista
  seva si ell no ho demana. Una errada d'escriptura o de format no es corregeix en silenci: s'enumera, i es
  corregeix quan ell ho diu.
- **Flux de treball.** Com a `sol`: el professor edita les pistes amb un artifact «Editor de pistes» (que parteix
  de `hints.js`). Si Claude proposa pistes noves, les deixa com a **esborranys a la base de dades de l'artifact**
  (col·lecció `hints`, document `apl-ud10_U4.24`, camps `key` i `text`) perquè ell les revisi; Claude no les posa a
  `hints.js` si no li ho demana. Abans de tornar a escriure un esborrany, comprova que la versió del document
  encara és la que va escriure Claude (si el professor l'ha tocat, no el trepitgis).
- Quan el professor dona per bones les pistes, Claude les passa a `hints.js` (i a la base de l'Editor) i passa
  `node eines/comprova.js`, que valida el format de cada pista.
- Quan el professor retoca els esborranys, Claude compara la seva versió amb la final i afegeix aquí, a
  «Què s'ha après dels esborranys», el que n'aprèn.

### Contrastar amb el solucionari

- Claude **pot llegir l'enunciat i la solució** de cada exercici: `cataleg.js` dona les imatges
  (`apl-ud4/<tema>/data/full-K.png`) i el Read les mostra. Una pista nova o revisada es comprova sempre contra
  l'enunciat (dades, noms dels punts i de les funcions, tots els apartats) i contra la resolució.
- Paranys trobats en la revisió de 2026: la pista parla d'un altre tipus d'exercici (u7/90, u13/96); dona per
  feta una forma de les dades que l'enunciat no té (recta en forma contínua o com a intersecció de plans, pla
  en paramètriques, numerador 2*y* − 1); fa servir un nom que xoca amb l'enunciat (punts *A*, *B*, *C* i
  coeficients *A*, *B*, *C*); repeteix una errada del solucionari (u14/53); no cobreix un apartat.
- Una errada del solucionari nova va a `errades.js` (o a `OBSERVACIONS`), i la pista no la reprodueix.

### Què s'ha après dels esborranys

*(De `sol`, 2n de Batxillerat. Quan hi hagi esborranys de 4t d'ESO, s'hi afegeixen al davant.)*

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

- El sistema és el de `sol`, sencer i provat: `errades.js` (dades i funcions), KaTeX, `marca.js`, `pegats/`,
  `errades.html`. Les errades de cada UD són a `TODO.md`; `OBSERVACIONS` és buit. Format i comportament: `ERRADES.md`.
- **Diferència amb `sol`:** allà `errades.js` es genera amb `eines/conversor/genera.py` a partir de `tex/`, i
  les marques tenen la seva eina (`eines/localitzador/`). Aquí aquestes dues no hi són: les errades i les marques
  s'escriuen **directament a `errades.js`**.
- **Els pegats sí que hi són:** `eines/pegats/` (motor i receptes per UD; documentació tècnica a
  `eines/pegats/README.md`). `pegat` i `PAGINES_IGUALS` no s'escriuen a mà: els posa `eines/pegats/aplica.py`.
  Si s'afegeix una errada nova, se n'ha de fer el pegat i mirar-lo ampliat, abans i després.
- El text s'escriu entre accents greus amb `TEX` al davant, i les fórmules entre `$...$` (LaTeX). No s'hi pot
  posar cap accent greu ni la parella `${`.
- Una marca mal posada és pitjor que cap marca: s'ha de comprovar sempre a la imatge ampliada.
- Després de tocar `errades.js`: `node eines/comprova.js`, obrir `tasca.html?tot=1#apl-ud4/s1` i mirar que cap
  fórmula surti en vermell, i pujar el número de `errades.js?v=` a `tasca.html` i `errades.html`.

## Suggeriments de treball per a Claude

- **Interfície:** tot element clicable, en passar-hi el ratolí o amb el focus del teclat, té vora negra pura
  gruixuda i fons gris clar, sense canviar de mida ni moure's (bloc final de `assets/style.css`). Qualsevol
  element clicable nou ha d'entrar en aquell bloc.
- **Targetes d'exercici de la tasca (decisió del professor, 7/11/2026):** no són clicables, no tenen fletxa
  ni canvien en passar-hi el ratolí (classe `ex-fixa`). La solució només s'obre amb el botó «Veure solució».
  Les fórmules dels apartats no porten barres de desplaçament.

- **Valida cada pista abans de desar-la:** una sola línia, només `<i>`, `<b>`, `<br>` (cap altre `<`, que
  s'escriu «menor que» en text), etiquetes tancades, cap accent greu ni `$`, cap `<br>` ni espai sobrer al final.
- **Les pistes del professor poden tenir errades d'escriptura** («en primer llocs», «li ha afegim»): són
  descuits, no estil. No les copiïs.
- **La mida de l'esborrany ha de ser el mínim que cobreix tots els apartats.**
- **Un esborrany sense canvis vol dir revisat i que al professor li ha semblat bé.**
