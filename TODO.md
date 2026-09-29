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

Setmanes 1–26 ja són a `tasques.js`. Setmanes 27–36 encara no tenen exercicis:

| Setmanes | Dates límit | Unitat | Material al repo |
|---|---|---|---|
| 18–19 | 17/01 – 24/01/2027 | U1 Matrius | ✅ fet (imatges, catàleg, tasques i pistes) |
| 20–22 | 31/01 – 14/02/2027 | U2 Determinants | ✅ fet (imatges, catàleg, tasques i pistes) |
| 23–26 | 21/02 – 14/03/2027 | U3 Sistemes d'equacions | ✅ fet (imatges, catàleg, tasques i pistes) · ampliada a 4 setmanes |
| 27–30 | 21/03 – 11/04/2027 | U5 Rectes i plans en l'espai | ❌ no n'hi ha · ⚠️ l'Excel li donava també la setmana 26, que ara és de la U3 |
| 31–32 | 18/04 – 25/04/2027 | U6 Angles i distàncies a l'espai | ❌ no n'hi ha |
| 33–34 | 02/05 – 09/05/2027 | U11 Integrals indefinides | ✅ catàleg i imatges |
| 35–36 | 16/05 – 23/05/2027 | U12 Integrals definides | ✅ catàleg i imatges |

- [ ] Triar els exercicis de cada setmana (columna D de l'Excel) i afegir-los a `tasques.js`.
- [ ] Escriure les pistes corresponents a `hints.js`.
- [ ] U5, U6: cal crear-ne tot el material (imatges `data/full-*.png`,
      entrades a `cataleg.js`, `UNITATS_META` i `UNITATS` a `index.html`).
- [x] L'Excel no té cap unitat 4 programada: és intencionat (confirmat).

## Altres

- [ ] U1: les activitats del text 1–5 no són al catàleg perquè els números 1–5
      ja els fan servir les activitats de "Matemàtiques en el món real" (grafs).
      Si mai se'n vol programar alguna, caldrà ampliar el sistema (p. ex. un prefix).
      El mateix passa a la U2 i la U3 amb les activitats del text 1–4.

- [ ] L'Excel encara té l'exercici 92 a la setmana 7 (U8). A `tasques.js` s'ha tret
      perquè ja era a la setmana 5. Actualitzar l'Excel si es vol que quadrin.
