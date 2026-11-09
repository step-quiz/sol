#!/usr/bin/env python3
"""Posa els pegats a errades.js.

   Ús:  python3 eines/pegats/aplica.py            (després de  fes.py ... --escriu)

   1. A cada errada que surt a eines/pegats/pegats.json li escriu (o li torna a escriure) el camp `pegat`.
   2. Torna a fer la taula PAGINES_IGUALS: les pàgines del PDF que surten en més d'una carpeta i que porten
      algun pegat. El web la fa servir perquè un pegat es vegi en TOTES les còpies d'aquella pàgina.
   No toca res més del fitxer. Es pot executar tantes vegades com calgui."""
import json, os, re, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
import camins

F = os.path.join(camins.ARREL, 'errades.js')
J = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'pegats.json'), encoding='utf-8'))
RET = {u: v for u, v in json.load(open(os.path.join(camins.ARREL, 'eines', 'retalls.json'), encoding='utf-8')).items() if not u.startswith('_')}
s = open(F, encoding='utf-8').read()

def objectes(s, clau):
    """(inici, final) de cada objecte { ... } de la llista de l'exercici `clau`. Els textos entre accents greus no es miren."""
    m = re.search(r"^\s*'" + re.escape(clau) + r"'\s*:\s*\[", s, re.M)
    if not m: raise SystemExit(f"errades.js no té l'exercici {clau}")
    i = m.end(); fons = 0; dins = False; out = []; ini = None
    while True:
        c = s[i]
        if dins:
            if c == '`': dins = False
        elif c == '`': dins = True
        elif c == '{':
            if fons == 0: ini = i
            fons += 1
        elif c == '}':
            fons -= 1
            if fons == 0: out.append((ini, i))
        elif c == ']' and fons == 0: return out
        i += 1

def lit(v):
    if isinstance(v, str): return "'" + v + "'"
    return (f'{v:.3f}'.rstrip('0').rstrip('.'))

canvis = 0
for key in sorted(J, key=lambda k: -len(k)):
    clau, j = key.split('#'); j = int(j)
    obs = objectes(s, clau)
    if j >= len(obs): raise SystemExit(f'errades.js: {clau} no té prou errades ({j})')
    a, b = obs[j]; cos = s[a:b]
    cos = re.sub(r",?\s*\n\s*pegat:\s*\[\[.*?\]\]\s*$", "", cos, flags=re.S).rstrip()
    fila = '[' + ',\n               '.join('[' + ', '.join(lit(x) for x in q) + ']' for q in J[key]) + ']'
    nou = cos.rstrip().rstrip(',') + ',\n      pegat:   ' + fila + ' '
    if nou != s[a:b]: canvis += 1
    s = s[:a] + nou + s[b:]

# ── les còpies d'una mateixa pàgina ──
pag_de = {}                                                  # 'apl-ud1/u1-reals/data/full-4.png' -> pàgina del PDF
for u, v in RET.items():
    for t, ps in v['temes'].items():
        for k, p in enumerate(ps): pag_de[f'{u}/{t}/data/full-{k + 1}.png'] = (v['pdf'], p)
amb_pegat = {pag_de[key.split('/')[0] + '/' + q[0]] for key, qs in J.items() for q in qs}
copies = {}
for ruta, p in pag_de.items():
    if p in amb_pegat: copies.setdefault(p, []).append(ruta)
iguals = {r: f'p{p[1]}' for p, rs in sorted(copies.items(), key=lambda kv: kv[0][1]) if len(rs) > 1 for r in sorted(rs)}
ini, fi = '/* pagines-iguals:inici (ho fa eines/pegats/aplica.py) */', '/* pagines-iguals:fi */'
bloc = ini + '\nconst PAGINES_IGUALS = {\n' + ''.join(f"  '{r}': '{c}',\n" for r, c in iguals.items()) + '};\n' + fi
if ini in s: s = s[:s.index(ini)] + bloc + s[s.index(fi) + len(fi):]
else:
    an = 'const TEX = String.raw;'
    if s.count(an) != 1: raise SystemExit('no trobo on posar la taula PAGINES_IGUALS')
    s = s.replace(an, bloc + '\n\n' + an)
open(F, 'w', encoding='utf-8').write(s)
print(f'errades.js: {len(J)} errades amb pegat ({sum(len(v) for v in J.values())} pegats), {canvis} canviades; {len(iguals)} còpies de pàgina a PAGINES_IGUALS.')
