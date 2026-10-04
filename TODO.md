# ToDo

## Documentació pendent d'actualitzar

- [ ] **README.md · Estructura**: només parla de `u7/ u8/ u9/ u10/`; hi falten `u11/ … u14/`.
- [ ] **README.md · línia de `cataleg.js`**: diu "generat". Ara és un fitxer mantingut a mà.
- [ ] **README.md · paràgraf "tornar a generar el catàleg no fa perdre res"**: ja no té sentit (el catàleg no es genera).
- [ ] **tasques.js · comentari de capçalera**: `unitat  quina unitat didàctica (u7, u8, u9, u10)` → hi falten les altres unitats.
- [ ] **hint-feature-change.md**: és un registre històric desfasat:
  - diu que la pista surt a la pàgina de detall de l'exercici (ara surt a la llista de la tasca);
  - parla d'una pista d'exemple provisional a `u7/44` que ja no existeix;
  - diu que `cataleg.js` és "hand-maintained" en un lloc i "generated" en un altre.
  Decidir si s'actualitza, es resumeix dins del README o s'esborra.

## Programació pendent (segons `2Bat - Unitats i feina Classroom.xlsx`)

Totes les setmanes (1–36) ja són a `tasques.js`:

| Setmanes | Dates límit | Unitat | Material al repo |
|---|---|---|---|
| 18–19 | 17/01 – 24/01/2027 | U1 Matrius | ✅ fet (imatges, catàleg, tasques i pistes) |
| 20–22 | 31/01 – 14/02/2027 | U2 Determinants | ✅ fet (imatges, catàleg, tasques i pistes) |
| 23–26 | 21/02 – 14/03/2027 | U3 Sistemes d'equacions | ✅ fet (imatges, catàleg, tasques i pistes) · ampliada a 4 setmanes |
| 27–31 | 21/03 – 18/04/2027 | U5 Rectes i plans en l'espai | ✅ fet (imatges, catàleg, tasques i pistes) · 5 setmanes |
| 32–33 | 25/04 – 02/05/2027 | U6 Angles i distàncies a l'espai | ✅ fet (imatges, catàleg, tasques i pistes) |
| 34 | 09/05/2027 | U11 Integrals indefinides | ✅ fet (tasques i pistes) · 1 setmana |
| 35–36 | 16/05 – 23/05/2027 | U12 Integrals definides | ✅ fet (tasques i pistes) |

- [x] Triar els exercicis de cada setmana i afegir-los a `tasques.js`.
- [x] Escriure les pistes corresponents a `hints.js`.
- [x] L'Excel de `source/` ja reflecteix els canvis de setmanes (U3 4 setmanes, U5 5, U6 2, U11 1, U12 2)
      i coincideix amb `tasques.js`. El de l'arrel del repositori és l'antic (setmanes 18–36 buides).
- [x] Totes les unitats tenen imatges i catàleg.
- [x] L'Excel no té cap unitat 4 programada: és intencionat (confirmat).

## Errades del solucionari

- [x] Fase 1: etiqueta a la llista de la tasca i targetes «On diu / Ha de dir» dins de
      l'exercici (`errades.js`, amb KaTeX a `assets/katex/`). 83 errades en 51 exercicis.
- [x] Fase 2: requadre vermell numerat sobre la imatge, al lloc de cada errada (camp `marca` de
      `errades.js`, en tant per cent de la imatge). Tocar-lo, o *Mostra-ho a la imatge* a la
      targeta, obre la imatge ampliada en aquell punt amb la correcció a sota. Les 83 errades
      tenen marca (87 requadres). Eina per marcar-ne de noves: `tasca.html?tot=1&marca=1`.
- [x] Fase 3, unitats 7, 8, 9 i 10: «pegats». A 41 errades la imatge es veu ja corregida (48 pegats
      a `pegats/u7/` ... `pegats/u10/`) i l'errada no s'anuncia. Interruptor: `ERRADES_PEGATS`.
      Es queden amb targeta i requadre, perquè no es poden tapar bé: U9 ex. 67 n); U10 ex. 63 c),
      75 d) i 108 d).
- [ ] Fase 3, resta d'unitats (1, 2, 3, 5, 6, 11, 12, 13 i 14): fer els pegats de les altres
      38 errades. Les que no es puguin tapar bé es queden amb targeta i requadre.
- [ ] Fase 3: el constructor de fraccions del motor de pegats va fallar en regenerar l'exercici 76
      de la unitat 7 (s'hi han deixat els pegats antics, que eren bons). Cal arreglar-lo per poder
      fer U10 ex. 63 c).
- [ ] Dins d'un exercici, el botó «enrere» del navegador surt de la tasca en lloc de tornar a
      la llista d'exercicis (ja passava abans de les errades).
- [ ] Opcional: una pàgina `errades.html` amb totes les errades per setmana.

## Altres

- [x] Catàleg antic (u7–u14) revisat: 61 fitxes corregides (u12/88 i 60 més) perquè
      apuntaven a una pàgina equivocada o no incloïen la pàgina on continua la solució.
- [x] Catàleg complet (u1–u14) comparat amb els solucionaris de `source/`: 14 dificultats
      corregides (u6: 66, 127 · u8: 116 · u12: 115, 122, 123, 125–131 · u14: 99), afegida la
      pàgina que faltava a u14 act. 2 i tretes 5 imatges de més (u1/123, u2/33, u2/54, u5/82,
      u5/128). Ara les 1.471 fitxes quadren amb el llibre.
- [ ] Les pàgines per tema antigues (`u*/<tema>/<tema>.html`) tenen la seva pròpia llista
      d'imatges amb els mateixos errors. No es fan servir (tots els temes a `'cap'`).

- [ ] U1: les activitats del text 1–5 no són al catàleg perquè els números 1–5
      ja els fan servir les activitats de "Matemàtiques en el món real" (grafs).
      Si mai se'n vol programar alguna, caldrà ampliar el sistema (p. ex. un prefix).
      El mateix passa a la U2, la U3, la U5 i la U6 amb les activitats del text 1–4.

- [ ] L'Excel encara té l'exercici 92 a la setmana 7 (U8). A `tasques.js` s'ha tret
      perquè ja era a la setmana 5. Actualitzar l'Excel si es vol que quadrin.
