#!/usr/bin/env python3
"""Les dades de partida de totes les eines.

   Llegeix els .tex de tex/ (errors-setmanaN.tex) i en treu les errades i les observacions, indexades per
   'uN/exercici'. La unitat de cada setmana surt de tasques.js, i les imatges de cada exercici, de cataleg.js.

   Ús:  python3 eines/dades.py           resum del que ha llegit, i avisos
        python3 eines/dades.py --json    les dades en JSON, per la sortida estàndard"""
import re, json, sys, glob, os
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from camins import ARREL, TEX

def treu_comentaris(s):
    return re.sub(r'(?<!\\)%.*', '', s)             # de % (no escapat) fins a final de línia

def arg(s, i):
    """s[i] == '{'  ->  (contingut, índex de després de la '}' aparellada)"""
    assert s[i] == '{', s[max(0, i - 20):i + 20]
    n = 0; j = i
    while j < len(s):
        c = s[j]
        if c == '\\': j += 2; continue
        if c == '{': n += 1
        elif c == '}':
            n -= 1
            if n == 0: return s[i + 1:j], j + 1
        j += 1
    raise ValueError('claus desaparellades')

def camp(cos, nom):
    m = re.search(r'\\' + nom + r'\s*\{', cos)
    if not m: return None
    txt, _ = arg(cos, m.end() - 1)
    return ' '.join(txt.split())

def numeros(titol):
    t = re.sub(r'\$.*?\$', '', titol)               # fora les fórmules
    m = re.match(r'\s*(Exercicis?|Activitats?)\s+(.*)', t)
    if not m: return [], t
    return [int(x) for x in re.findall(r'\b(\d+)\b', m.group(2))], m.group(2)

def tasques():
    """setmana -> unitat, data límit i exercicis (unitat, número), segons tasques.js"""
    tjs = open(os.path.join(ARREL, 'tasques.js'), encoding='utf-8').read(); T = {}
    for m in re.finditer(r"\{\s*unitat:'(u\d+)',\s*setmana:(\d+),\s*limit:'([\d-]+)',(?:\s*\w+:'[^']*',)*\s*exercicis:\[(.*?)\]\s*\}", tjs):
        refs = []
        for e in m.group(4).split(','):
            e = e.strip().strip("'")
            if ':' in e:
                u, n = e.split(':'); refs.append((u, int(n)))
            else:
                refs.append((m.group(1), int(e)))
        T[int(m.group(2))] = dict(unitat=m.group(1), limit=m.group(3), refs=refs)
    return T

def cataleg():
    """unitat -> exercici -> llista d'imatges, segons cataleg.js"""
    cjs = open(os.path.join(ARREL, 'cataleg.js'), encoding='utf-8').read()
    cjs = cjs[cjs.index('const CATALEG'):]; CAT = {}
    for mu in re.finditer(r"\n  '(u\d+)': \{(.*?)\n  \},", cjs, re.S):
        d = {}
        for me in re.finditer(r"^\s*(\d+): \{.*?i:\[(.*?)\]", mu.group(2), re.M):
            d[int(me.group(1))] = re.findall(r"'([^']+)'", me.group(2))
        CAT[mu.group(1)] = d
    return CAT

_dades = None
def carrega():
    """dict(ERR, OBS, CAT, avisos, resum).  ERR['u7/92'] = [ {t, ondiu, hadedir, motiu, s, enunciat?}, ... ]"""
    global _dades
    if _dades is not None: return _dades
    T = tasques(); CAT = cataleg(); ERR = {}; OBS = {}; avisos = []; resum = []
    fitxers = sorted(glob.glob(os.path.join(TEX, 'errors-setmana*.tex')), key=lambda p: int(re.search(r'(\d+)\.tex$', p).group(1)))
    if not fitxers: avisos.append(f'no hi ha cap errors-setmanaN.tex a {TEX}')
    for f in fitxers:
        N = int(re.search(r'(\d+)\.tex$', f).group(1))
        s = treu_comentaris(open(f, encoding='utf-8').read()); t = T.get(N)
        if not t: avisos.append(f'setmana {N}: no és a tasques.js'); continue
        refs = {n: u for (u, n) in t['refs']}; ne = no = 0
        for m in re.finditer(r'\\begin\{(errada|observacio)\}\s*\{', s):
            tipus = m.group(1); titol, k = arg(s, m.end() - 1)
            cos = s[k:s.index(r'\end{%s}' % tipus, k)]
            nums, resta = numeros(titol)
            if not nums: avisos.append(f's{N}: títol sense número: {titol!r}')
            for n in nums:
                if n not in refs: avisos.append(f"s{N}: «{titol}» → l'exercici {n} no és a la tasca"); continue
                u = refs[n]
                if n not in CAT.get(u, {}): avisos.append(f's{N}: {u}/{n} no és al catàleg'); continue
                clau = f'{u}/{n}'
                if tipus == 'errada':
                    e = dict(t=' '.join(titol.split()), ondiu=camp(cos, 'ondiu'), hadedir=camp(cos, 'hadedir'), motiu=camp(cos, 'motiu'), s=N)
                    if e['ondiu'] is None or e['hadedir'] is None: avisos.append(f's{N}: «{titol}» sense \\ondiu o \\hadedir')
                    if '(enunciat)' in titol: e['enunciat'] = 1
                    ERR.setdefault(clau, []).append(e); ne += 1
                else:
                    OBS.setdefault(clau, []).append(dict(t=' '.join(titol.split()), text=' '.join(cos.split()), s=N)); no += 1
        resum.append((N, t['unitat'], ne, no))
    _dades = dict(ERR=ERR, OBS=OBS, CAT={u: {str(k): v for k, v in d.items()} for u, d in CAT.items()}, avisos=avisos, resum=resum)
    return _dades

if __name__ == '__main__':
    d = carrega()
    if '--json' in sys.argv:
        json.dump(dict(ERR=d['ERR'], OBS=d['OBS'], CAT=d['CAT']), sys.stdout, ensure_ascii=False); sys.exit(0)
    print(f"setmanes llegides: {len(d['resum'])}")
    print(f"errades: {sum(len(v) for v in d['ERR'].values())} en {len(d['ERR'])} exercicis · observacions: {sum(len(v) for v in d['OBS'].values())} en {len(d['OBS'])} exercicis")
    print("errades d'enunciat:", [k for k, v in d['ERR'].items() for e in v if e.get('enunciat')])
    print('setmanes sense cap errada:', [N for (N, u, ne, no) in d['resum'] if ne == 0])
    print('avisos:', len(d['avisos']))
    for a in d['avisos']: print('  -', a)
