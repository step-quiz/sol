#!/usr/bin/env python3
"""Proposa on és cada errada dins la imatge: la línia `marca` de errades.js.

   Ús:  python3 eines/localitzador/proposa.py u7/92 u9/67     les errades d'aquests exercicis
        python3 eines/localitzador/proposa.py --tot           totes
        ... --full                                            i, a més, un full per mirar-ho (a eines/sortida/)

   Per a cada errada escriu la proposta i la compara amb la marca desada a marques.json (la que es veu al web).
   No desa res a marques.json: una proposta s'ha de mirar a ull abans. Si és bona, s'hi copia a mà."""
import sys, os, json
AQUI = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, AQUI)
import loc, loc2, ovr, camins
loc2.OVR.update(ovr.OVR)
MARQ = json.load(open(os.path.join(AQUI, 'marques.json'), encoding='utf-8'))

def pct(b):
    (x0, y0, x1, y1), (W, H) = b['box'], b['WH']
    return [b['img'], round(100*x0/W, 1), round(100*y0/H, 1), round(100*(x1 - x0)/W, 1), round(100*(y1 - y0)/H, 1)]
def iou(a, b):
    if a[0] != b[0]: return 0.0
    ix = max(0, min(a[1] + a[3], b[1] + b[3]) - max(a[1], b[1])); iy = max(0, min(a[2] + a[4], b[2] + b[4]) - max(a[2], b[2]))
    return ix*iy/(a[3]*a[4] + b[3]*b[4] - ix*iy) if ix*iy else 0.0

args = [a for a in sys.argv[1:] if not a.startswith('--')]
claus = sorted(loc.D['ERR'], key=lambda k: (int(k.split('/')[0][1:]), int(k.split('/')[1]))) if '--tot' in sys.argv else args
if not claus: print(__doc__); sys.exit(1)
res = {}; iguals = total = 0
for key in claus:
    if key not in loc.D['ERR']: print(f'{key}: no té cap errada als .tex'); continue
    u, n = key.split('/')
    for j, e in enumerate(loc.D['ERR'][key]):
        kk = f'{key}#{j}'; total += 1
        try: caixes = loc2.fusiona(u, loc2.localitza(u, int(n), j, e))
        except Exception as ex: print(f'{kk}: ERROR {ex!r}'[:200]); continue
        res[kk] = caixes; prop = [pct(b) for b in caixes]; desada = MARQ.get(kk) or []
        lin = 'marca: ' + (json.dumps(prop[0]) if len(prop) == 1 else json.dumps(prop)).replace('"', "'") + ','
        if not prop: estat = 'NO TROBADA'
        elif not desada: estat = 'no hi ha marca desada'
        else:
            coincideix = len(prop) == len(desada) and all(max(iou(p, d) for d in desada) >= .75 for p in prop)
            iguals += coincideix; estat = 'coincideix amb la desada' if coincideix else 'DIFERENT de la desada: ' + json.dumps(desada).replace('"', "'")
        print(f"{kk}  ({e['t']})  semblança {min((b['sc'] for b in caixes), default=0)}\n    {lin}\n    {estat}")
print(f'\n{total} errades · {iguals} propostes coincideixen amb la marca desada')
if '--full' in sys.argv and res:
    print('fulls de revisió:', loc2.fulls(res, list(res), 'proposta'))
