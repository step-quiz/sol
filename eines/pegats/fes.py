#!/usr/bin/env python3
"""Aplica receptes i fa els pegats.

   Ús:  python3 eines/pegats/fes.py receptes_u10                totes les receptes d'aquest fitxer
        python3 eines/pegats/fes.py receptes_u10 u10/63#0       només aquesta errada
        python3 eines/pegats/fes.py receptes_u10 --escriu       i, a més, substitueix els pegats del repo

   Sense --escriu NO toca res del repo: escriu els pegats a eines/sortida/pegats/<unitat>/ i diu, de cada un,
   si és idèntic al que hi ha a pegats/<unitat>/. Sempre deixa a eines/sortida/ un full amb l'abans (a dalt)
   i el després (a sota) de cada pegat: s'ha de mirar, ampliat, abans de donar res per bo.

   Amb --escriu copia els pegats a pegats/<unitat>/ i posa al dia eines/pegats/pegats.json. Després cal
   tornar a fer errades.js:  python3 eines/conversor/genera.py --escriu"""
import sys, os, json, importlib, shutil, collections
import numpy as np, cv2
AQUI = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, AQUI); sys.path.insert(0, os.path.join(AQUI, '..'))
import camins, pegats

args = sys.argv[1:]; ESCRIU = '--escriu' in args
mods = [a[:-3] if a.endswith('.py') else a for a in args if a.startswith('receptes')]
NOMES = [a for a in args if '/' in a and '#' in a]
if not mods: print(__doc__); sys.exit(1)
REC = {}
for m in mods: REC.update(importlib.import_module(m).REC)
F_JSON = os.path.join(AQUI, 'pegats.json'); VELL = json.load(open(F_JSON, encoding='utf-8')) if os.path.exists(F_JSON) else {}
nou_json = dict(VELL); tiles = []; compte = collections.Counter(); per_copiar = []

for key, ops in REC.items():
    if NOMES and key not in NOMES: continue
    u, resta = key.split('/'); n, j = resta.split('#')
    try: ps = pegats.fes(key, ops)
    except Exception as e:
        print(f'{key}: ERROR {e!r}'[:300]); compte['amb error'] += 1; continue
    d_out = os.path.join(camins.SORTIDA, 'pegats', u); os.makedirs(d_out, exist_ok=True); files = []
    for k, (img, x, y, w, h, retall, work) in enumerate(sorted(ps, key=lambda p: (p[0], p[2], p[1]))):
        pag = pegats.pagina(u, img); nom = f"{n}-{int(j) + 1}{'abcdefgh'[k]}.png"
        cv2.imwrite(os.path.join(d_out, nom), retall, [cv2.IMWRITE_PNG_COMPRESSION, 9])
        fila = [img, round(100*x/pag.W, 3), round(100*y/pag.H, 3), round(100*w/pag.W, 3), round(100*h/pag.H, 3), nom]; files.append(fila)
        f_repo = os.path.join(camins.ARREL, 'pegats', u, nom); vell = next((q for q in VELL.get(key, []) if q[5] == nom), None)
        if not os.path.exists(f_repo): estat = 'NOU'
        else:
            a = cv2.imread(f_repo)
            if a.shape != retall.shape or (vell is not None and vell[:5] != fila[:5]):
                estat = f'DIFERENT (al repo fa {a.shape[1]}x{a.shape[0]} px; ara, {w}x{h}' + ('' if vell is None or vell[:5] == fila[:5] else ', i en un altre lloc') + ')'
            else:
                dif = np.abs(a.astype(int) - retall.astype(int)).max(axis=2); nd = int((dif > 0).sum())
                estat = 'IDÈNTIC' if nd == 0 else f'DIFERENT ({nd} píxels de {w*h}; diferència màxima {int(dif.max())} sobre 255)'
        compte[estat.split(' ')[0]] += 1; per_copiar.append((os.path.join(d_out, nom), f_repo))
        print(f"{key}  {nom}  {w}x{h} px  {'+'.join(pegats.fes.com)}  →  {estat}")
        cx0, cx1 = max(0, x - 70), min(pag.W, x + w + 45); cy0, cy1 = max(0, y - 16), min(pag.H, y + h + 16)
        if cx1 - cx0 > 400: cx0 = max(cx0, x - 16); cx1 = min(cx1, cx0 + 400)
        t = cv2.resize(np.vstack([pag.img[cy0:cy1, cx0:cx1], np.full((4, cx1 - cx0, 3), 90, np.uint8), work[cy0:cy1, cx0:cx1]]), None, fx=1.6, fy=1.6, interpolation=cv2.INTER_CUBIC)
        cap = np.full((18, t.shape[1], 3), 235, np.uint8); cv2.putText(cap, f'{key} {nom}', (4, 13), cv2.FONT_HERSHEY_SIMPLEX, .42, (0, 0, 0), 1, cv2.LINE_AA)
        tiles.append(np.vstack([cap, t]))
    nou_json[key] = files

print('\nresum:', ', '.join(f'{v} {k}' for k, v in compte.items()) or 'res')
if tiles:
    cols = [[], [], []]; alts = [0, 0, 0]
    for t in tiles:
        k = alts.index(min(alts)); cols[k].append(t); alts[k] += t.shape[0] + 6
    W = max(t.shape[1] for t in tiles); full = np.full((max(alts), 3*W + 20, 3), 120, np.uint8)
    for k, col in enumerate(cols):
        yy = 0
        for t in col: full[yy:yy + t.shape[0], k*(W + 10):k*(W + 10) + t.shape[1]] = t; yy += t.shape[0] + 6
    f_full = os.path.join(camins.SORTIDA, 'full_' + '_'.join(m.replace('receptes_', '') for m in mods) + '.png')
    cv2.imwrite(f_full, full); print('full de revisió (abans a dalt, després a sota):', os.path.relpath(f_full, camins.ARREL))
if ESCRIU:
    for key in nou_json:                                   # pegats vells d'una errada que ara en té menys
        if key in REC and (not NOMES or key in NOMES):
            u = key.split('/')[0]
            for q in VELL.get(key, []):
                if q[5] not in [r[5] for r in nou_json[key]]:
                    f = os.path.join(camins.ARREL, 'pegats', u, q[5])
                    if os.path.exists(f): os.remove(f); print('esborrat', os.path.relpath(f, camins.ARREL))
    for a, b in per_copiar:
        os.makedirs(os.path.dirname(b), exist_ok=True); shutil.copyfile(a, b)
    json.dump(nou_json, open(F_JSON, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
    print(f'ESCRIT: {len(per_copiar)} pegats a pegats/ i eines/pegats/pegats.json. Ara: python3 eines/conversor/genera.py --escriu')
else:
    print('No s\'ha tocat res del repo. Els pegats nous són a eines/sortida/pegats/. Amb --escriu se substitueixen els del repo.')
