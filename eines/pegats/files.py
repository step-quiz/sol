#!/usr/bin/env python3
"""Mostra què hi ha a una imatge, fila a fila (per escriure les receptes).
   Ús: python3 eines/pegats/files.py apl-ud1 u1-reals/data/full-4.png [y0 y1] [col] [-c]   (amb -c, també la posició de cada caràcter)"""
import sys, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import pegats
DET = '-c' in sys.argv
if DET: sys.argv.remove('-c')
u, rel = sys.argv[1:3]; y0, y1 = (float(sys.argv[3]), float(sys.argv[4])) if len(sys.argv) > 4 else (0, 1e9)
col = int(sys.argv[5]) if len(sys.argv) > 5 else None
pag = pegats.pagina(u, rel)
print(f'imatge {pag.W}x{pag.H}  pxpt {pag.pxpt:.3f}  mida {pag.mida}  espai {pag.espai:.1f}  fi_em {pag.fi_em}')
for i, f in enumerate(pag.files):
    if not (y0 <= f[0]['base'] <= y1) or (col is not None and f[0]['col'] != col): continue
    print(f"{i:3d} c{f[0]['col']} base {f[0]['base']:7.1f} x {f[0]['x0']:6.1f}-{f[-1]['x1']:6.1f} s{f[0]['s']}  " + ''.join(c['t'] for c in f)[:80] + '   |' + ' '.join(sorted({c['f'][:14] for c in f})))
    if DET: print('     ' + ' '.join(f"{c['t']}:{c['x0']:.1f}-{c['x1']:.1f}" + ('' if 'Light' in c['f'] and 'Italic' not in c['f'] else '[' + c['f'][:5] + ']') for c in f))
