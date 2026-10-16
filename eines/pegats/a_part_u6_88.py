#!/usr/bin/env python3
"""Pegat de u6/88#0 (l'equació), fet a part del motor de receptes.

   On diu «→ |λ + 4| = √6» hauria de dir «|λ + 4|/√6 = √6». Com que una fracció de dos pisos no hi cap,
   el pegat escriu l'equació equivalent en una sola línia:  «→ |λ + 4| = √6 · √6», que porta directament a
   la línia següent del solucionari («|λ + 4| = 6»).

   El «·» i el «√6» es copien, píxel a píxel, de la mateixa pàgina (el punt de «1 · (2 + λ)» de la línia de
   dalt i el «√6» de la mateixa línia): tenen exactament la mateixa tipografia. El tros afegit va a la dreta
   de la línia, on la pàgina és blanca, i no es toca res del que ja hi ha.

   Ús:  python3 eines/pegats/a_part_u6_88.py            escriu el pegat a eines/sortida/pegats/u6/ i un full
        python3 eines/pegats/a_part_u6_88.py --escriu   i el copia a pegats/u6/ i el posa a pegats.json
   Després:  python3 eines/conversor/genera.py --escriu   i   node eines/conversor/verifica.js"""
import sys, os, json
import numpy as np, cv2
AQUI = os.path.dirname(os.path.abspath(__file__)); ARREL = os.path.abspath(os.path.join(AQUI, '..', '..'))
IMG = 'distancies/data/full-2.png'; KEY = 'u6/88#0'; NOM = '88-1a.png'
pag = cv2.imread(os.path.join(ARREL, 'u6', IMG)); H, W = pag.shape[:2]

ARREL_6 = (267, 297, 996, 1025)      # «√6» de la línia  (x0, x1, y0, y1), inclosos
PUNT    = (184, 186, 943, 945)       # «·» de «1 · (2 + λ)»
BASE_DIGIT = 1019                    # peu de les xifres de la línia (el «4»)
DESP_PUNT = 951 - 944                # el punt és 7 px per sobre del peu de les xifres, com a la línia de dalt
GAP = 10                             # espai entre signes, com a «1 · (»

x_punt = ARREL_6[1] + 1 + GAP
x_arrel = x_punt + (PUNT[1] - PUNT[0] + 1) + GAP
x0, x1 = ARREL_6[1] + 2, x_arrel + (ARREL_6[1] - ARREL_6[0] + 1) + 3
y0, y1 = ARREL_6[2] - 1, ARREL_6[3] + 2
assert (pag[y0:y1, x0:x1] > 200).all(), 'la zona del pegat no és blanca'

work = pag.copy()
def enganxa(src, x, y):
    sx0, sx1, sy0, sy1 = src; tros = pag[sy0:sy1 + 1, sx0:sx1 + 1]
    zona = work[y:y + tros.shape[0], x:x + tros.shape[1]]
    np.minimum(zona, tros, out=zona)                   # tinta damunt de blanc
y_punt = BASE_DIGIT - DESP_PUNT - (PUNT[3] - PUNT[2]) // 2 - 1
enganxa(PUNT, x_punt, y_punt)
enganxa(ARREL_6, x_arrel, ARREL_6[2])

retall = work[y0:y1, x0:x1]
fila = [IMG, round(100 * x0 / W, 3), round(100 * y0 / H, 3), round(100 * (x1 - x0) / W, 3), round(100 * (y1 - y0) / H, 3), NOM]
d_out = os.path.join(ARREL, 'eines', 'sortida', 'pegats', 'u6'); os.makedirs(d_out, exist_ok=True)
cv2.imwrite(os.path.join(d_out, NOM), retall, [cv2.IMWRITE_PNG_COMPRESSION, 9])
cx0, cx1, cy0, cy1 = 100, 420, 930, 1060
full = np.vstack([pag[cy0:cy1, cx0:cx1], np.full((4, cx1 - cx0, 3), 90, np.uint8), work[cy0:cy1, cx0:cx1]])
cv2.imwrite(os.path.join(ARREL, 'eines', 'sortida', 'full-u6_88.png'), cv2.resize(full, None, fx=2, fy=2, interpolation=cv2.INTER_CUBIC))
print(KEY, NOM, f'{x1 - x0}x{y1 - y0} px', fila)
if '--escriu' in sys.argv:
    cv2.imwrite(os.path.join(ARREL, 'pegats', 'u6', NOM), retall, [cv2.IMWRITE_PNG_COMPRESSION, 9])
    fj = os.path.join(AQUI, 'pegats.json'); d = json.load(open(fj, encoding='utf-8')); d[KEY] = [fila]
    json.dump(d, open(fj, 'w', encoding='utf-8'), ensure_ascii=False, indent=1); print('escrit a pegats/u6/ i pegats.json')
