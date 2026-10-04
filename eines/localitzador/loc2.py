#!/usr/bin/env python3
"""El cercador d'errades (segona versió, la bona): donat el text «On diu», troba on és imprès.

   Com ho fa: delimita l'exercici (per la insígnia amb el número) i, si pot, l'apartat (per la lletra «a)», «b)»...);
   agrupa els caràcters per línia de base i busca el tram que més s'assembla al text, signe per signe.
   El resultat és una PROPOSTA: s'ha de mirar sempre a ull abans de donar-la per bona."""
import json, re, os, sys, collections
import numpy as np, cv2
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import loc, camins
from loc import D, CAT, SITE, AQUI, caracters, ajusta, full

def norm(t):
    return t.replace('\u2212', '-').replace('\u2013', '-').replace('\u2014', '-').replace('\u2019', "'").lower()
BONS = set('=<>()+-,|[]{}/;:')
def atoms(s):
    return [c for c in norm(s) if c.isalnum() or c in BONS]

_cache = {}
def exercici(u, n):
    """Caràcters de les imatges de l'exercici amb clau d'ordre de lectura, insígnies i etiquetes d'apartat."""
    if (u, n) in _cache: return _cache[(u, n)]
    chars = []; ins = []; labs = []
    for k, rel in enumerate(CAT[u][str(n)]):
        chs, WH, mig = caracters(u, rel)
        for c in chs:
            c = dict(c); c['k'] = k; c['img'] = rel; c['col'] = int((c['x0'] + c['x1'])/2 >= mig); c['WH'] = WH
            c['yc'] = (c['y0'] + c['y1'])/2; chars.append(c)
        for col in (0, 1):
            cc = sorted([c for c in chars if c['k'] == k and c['col'] == col], key=lambda c: (round(c['y1']/4), c['x0']))
            # insígnies: dígits en Raleway petit, seguits
            dig = [c for c in cc if 'Raleway' in c['f'] and 7 <= c['s'] <= 9 and c['t'].isdigit()]
            dig.sort(key=lambda c: (round(c['y0']/12), c['x0'])); i = 0
            while i < len(dig):
                j = i; num = dig[i]['t']
                while j + 1 < len(dig) and abs(dig[j+1]['y0'] - dig[i]['y0']) < 6 and -4 <= dig[j+1]['x0'] - dig[j]['x1'] < 9:
                    j += 1; num += dig[j]['t']
                ins.append(dict(k=k, col=col, y=dig[i]['y0'], num=int(num))); i = j + 1
            # etiquetes d'apartat: lletra rodona de Vectora + ')' enganxat, sense res just a l'esquerra
            for a, c in enumerate(cc):
                if not (len(c['t']) == 1 and c['t'].isalpha() and c['t'].islower() and 'Vectora' in c['f'] and 'Italic' not in c['f']): continue
                par = [d for d in cc if d['t'] == ')' and abs(d['y1'] - c['y1']) < 5 and 0 <= d['x0'] - c['x1'] < 12]
                if not par: continue
                esq = [d for d in cc if d is not c and abs(d['yc'] - c['yc']) < 10 and 0 < c['x0'] - d['x1'] < 14]
                if esq: continue
                labs.append(dict(k=k, col=col, y=c['y0'], lletra=c['t'], sol='Light' in c['f'], x=c['x0']))
    key = lambda o: (o['k'], o['col'], o['y'])
    ins.sort(key=key); labs.sort(key=key)
    _cache[(u, n)] = (chars, ins, labs); return _cache[(u, n)]

def regio(u, n, lloc, enunciat):
    chars, ins, labs = exercici(u, n)
    pos = lambda c: (c['k'], c['col'], c['yc'])
    ini = next(((i['k'], i['col'], i['y'] - 6) for i in ins if i['num'] == n), None)
    if ini is None: return chars, 'sense-insignia'
    fi = next(((i['k'], i['col'], i['y'] - 6) for i in ins if (i['k'], i['col'], i['y'] - 6) > ini and i['num'] != n), (99, 0, 0))
    nota = 'exercici'
    m = re.match(r'^([a-z])\)', lloc or '')
    if m:
        dins = [l for l in labs if ini <= (l['k'], l['col'], l['y']) < fi]
        meus = [l for l in dins if l['lletra'] == m.group(1) and (l['sol'] != enunciat)]
        if not meus: meus = [l for l in dins if l['lletra'] == m.group(1)]
        if meus:
            l0 = meus[0] if enunciat else meus[-1]
            a = (l0['k'], l0['col'], l0['y'] - 6)
            seg = [l for l in dins if (l['k'], l['col'], l['y'] - 6) > a and l['sol'] == l0['sol']]
            b = (seg[0]['k'], seg[0]['col'], seg[0]['y'] - 6) if seg else fi
            ini, fi, nota = a, b, 'apartat'
    return [c for c in chars if ini <= pos(c) < fi], nota

SUBS = [(r'\\dlim|\\lim', 'lim'), (r'\\mathrm\{([A-Za-z]+)\}', r'\1'), (r'\\lambda', 'm'), (r'\\pi', 'r'), (r'\\R\b', 'R'),
        (r'\\infty', '3'), (r'\\(arccos|cos|sin|ln|log|tan)\b', r'\1'), (r'\\text\{([^}]*)\}', r'\1'), (r'\\overline\{([^}]*)\}', r'\1'),
        (r'\\vec\{([^}]*)\}', r'\1'), (r'\\overrightarrow\{([^}]*)\}', r'\1'), (r'\\sqrt\[(\d)\]', r'\1'),
        (r'\\left|\\right|\\displaystyle|\\dfrac|\\tfrac|\\frac', ''), (r'\\[{}]', ''), (r'\\[a-zA-Z]+', ' '), (r'\\.', ' '), (r'[{}^_&]', '')]
def pla(tex):
    parts = tex.split('$'); out = ''
    for i, p in enumerate(parts):
        if i % 2 == 0: p = re.sub(r'\([^()]*[a-zà-ú]{3,}[^()]*\)\s*$', ' ', p)
        out += ' ' + p
    for a, b in SUBS: out = re.sub(a, b, out)
    return out
def parts_de(tex):
    """Un «On diu» amb dues coses separades per « i » o «;» es busca en dues vegades."""
    ps = re.split(r'\\quad\s*i\s*\\quad|\\;\s*i\s*\\;|;\s*\\quad', tex)
    out = []; obert = False
    for p in ps:      # no es talla per dins d'una fórmula
        if obert: out[-1] += ' ' + p
        else: out.append(p)
        obert = (out[-1].count('$') % 2 == 1)
    return [p for p in out if len(atoms(pla(p))) >= 3] or [tex]

def files_fines(chs):
    g = collections.defaultdict(list)
    for c in chs: g[(c['k'], c['col'])].append(c)
    rows = []
    for kc in sorted(g):
        cc = sorted(g[kc], key=lambda c: c['y1']); cur = None
        for c in cc:
            if cur is None or c['y1'] - cur[-1]['y1'] > 4.5: cur = [c]; rows.append(cur)
            else: cur.append(c)
    return rows

def cerca(chs, objectiu, maxf=6):
    T = collections.Counter(atoms(objectiu)); nT = sum(T.values()); best = (0, None, 1e18)
    rows = files_fines(chs)
    for i in range(len(rows)):
        acc = []
        for j in range(i, min(i + maxf, len(rows))):
            if (rows[j][0]['k'], rows[j][0]['col']) != (rows[i][0]['k'], rows[i][0]['col']): break
            if j > i and rows[j][0]['y1'] - rows[j-1][-1]['y1'] > 60: break
            acc = acc + rows[j]; cc = sorted(acc, key=lambda c: c['x0']); toks = [atoms(c['t']) for c in cc]
            for a in range(len(cc)):
                if not toks[a]: continue
                W = collections.Counter(); inter = 0; nW = 0
                for b in range(a, len(cc)):
                    for t in toks[b]:
                        W[t] += 1; nW += 1
                        if W[t] <= T.get(t, 0): inter += 1
                    if nW > 2.2*nT: break
                    if not toks[b]: continue
                    sc = 2*inter/(nW + nT)
                    if sc >= best[0] - 1e-9:
                        sel = cc[a:b+1]
                        # dins del tram, només les files que hi aporten alguna cosa
                        area = (max(c['x1'] for c in sel) - min(c['x0'] for c in sel))*(max(c['y1'] for c in sel) - min(c['y0'] for c in sel))
                        if sc > best[0] + 1e-9 or area < best[2]: best = (sc, sel, area)
    return best[0], best[1]

OVR = {}   # 'u7/93#0': ['text a buscar', ...]  → substitueix l'«On diu» com a objectiu;  ('exercici',) força la regió
def localitza(u, n, j, e):
    key = f'{u}/{n}#{j}'
    enun = '(enunciat)' in e['t']
    lloc = '' if enun else re.sub(r'^Exercici\s+\d+\s*,?\s*', '', e['t'])
    chs, nota = regio(u, n, lloc, enun)
    objectius = OVR.get(key) or [pla(p) for p in parts_de(e['ondiu'])]
    out = []
    for obj in objectius:
        sc, sel = cerca(chs, obj)
        if (sc < .62 or sel is None) and nota == 'apartat':
            chs2, _ = regio(u, n, '', enun); sc2, sel2 = cerca(chs2, obj)
            if sc2 > sc + .1: sc, sel, nota2 = sc2, sel2, 'exercici*'
        if sel is None: continue
        out.append(dict(img=sel[0]['img'], WH=sel[0]['WH'], sc=round(sc, 2), nota=nota,
                        box=[min(c['x0'] for c in sel), min(c['y0'] for c in sel), max(c['x1'] for c in sel), max(c['y1'] for c in sel)],
                        txt=''.join(c['t'] for c in sel)[:60]))
    return out

def fusiona(u, cands):
    """Caixes ajustades a la tinta; dues caixes de la mateixa imatge que es toquen (o gairebé) passen a ser una."""
    bx = [dict(img=c['img'], WH=c['WH'], sc=c['sc'], nota=c['nota'], box=[int(v) for v in ajusta(u, c)]) for c in cands]
    canvi = True
    while canvi:
        canvi = False
        for a in range(len(bx)):
            for b in range(a + 1, len(bx)):
                A, B = bx[a], bx[b]
                if A['img'] != B['img']: continue
                gx = max(A['box'][0], B['box'][0]) - min(A['box'][2], B['box'][2]); gy = max(A['box'][1], B['box'][1]) - min(A['box'][3], B['box'][3])
                if gy < 26 and gx < 60:
                    A['box'] = [min(A['box'][0], B['box'][0]), min(A['box'][1], B['box'][1]), max(A['box'][2], B['box'][2]), max(A['box'][3], B['box'][3])]
                    A['sc'] = min(A['sc'], B['sc']); del bx[b]; canvi = True; break
            if canvi: break
    return bx

def corre(unitats, nomes=None):
    f = os.path.join(camins.SORTIDA, 'candidates.json'); res = json.load(open(f)) if os.path.exists(f) else {}
    for key in sorted(D['ERR'], key=lambda k: (int(k.split('/')[0][1:]), int(k.split('/')[1]))):
        u, n = key.split('/')
        if unitats and u not in unitats: continue
        for j, e in enumerate(D['ERR'][key]):
            kk = f'{key}#{j}'
            if nomes and kk not in nomes: continue
            try: res[kk] = fusiona(u, localitza(u, int(n), j, e))
            except Exception as ex: res[kk] = []; print('ERROR', kk, repr(ex)[:120])
            print(kk, ' | '.join(f"{b['img'].replace('/data/full-', '#')[:-4]} f1={b['sc']} {b['nota']} {b['box']}" for b in res[kk]) or 'RES')
    json.dump(res, open(f, 'w')); return res

def fulls(res, claus, prefix, per_full=8):
    items = []
    for kk in claus:
        key, j = kk.split('#'); e = D['ERR'][key][int(j)]
        if not res.get(kk): items.append((kk, e, None, None)); continue
        for b in res[kk]: items.append((kk, e, b, b['box']))
    out = []
    for i in range(0, len(items), per_full):
        p = os.path.join(camins.SORTIDA, f'{prefix}_{i//per_full + 1}.png'); full(items[i:i + per_full], p, cols=2, cw=700, pad_x=240, pad_y=75); out.append(p)
    return out
