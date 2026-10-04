#!/usr/bin/env python3
"""Torna a fer errades.js, sencer, a partir de quatre coses:

     tex/                                 els textos de les errades i les observacions
     eines/localitzador/marques.json      on és cada errada dins la imatge  (camp `marca`)
     eines/pegats/pegats.json             els pegats de cada errada          (camp `pegat`)
     cap.js.txt i peu.js.txt              la capçalera i les funcions del fitxer

   Ús:  python3 eines/conversor/genera.py            NO toca res del repo: escriu a eines/sortida/errades.js
                                                     i diu si és igual que l'errades.js del repo
        python3 eines/conversor/genera.py --escriu   substitueix l'errades.js del repo

   ATENCIÓ: el fitxer es refà sencer. Tot el que s'hagi canviat a mà dins d'errades.js i no sigui
   a les quatre fonts de dalt es perd."""
import json, re, os, sys, difflib
AQUI = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(AQUI, '..'))
import camins, dades

d = dades.carrega()
if d['avisos']:
    print('AVISOS en llegir tex/:'); [print('  -', a) for a in d['avisos']]
cjs = open(os.path.join(camins.ARREL, 'cataleg.js'), encoding='utf-8').read()
META = dict(re.findall(r"'(u\d+)': \{nom:'[^']*', subtitol:'((?:[^'\\]|\\.)*)'\}", cjs))
META = {u: s.replace("\\'", "'") for u, s in META.items()}

MARQUES = json.load(open(os.path.join(camins.EINES, 'localitzador', 'marques.json'), encoding='utf-8'))   # només les marques revisades
PEGATS = json.load(open(os.path.join(camins.EINES, 'pegats', 'pegats.json'), encoding='utf-8'))            # 'u7/92#0' -> [[img, x, y, w, h, fitxer], ...]
def unum(u): return int(u[1:])
def clau_ord(k):
    u, n = k.split('/'); return (unum(u), int(n))

def seccio(u):
    t = f"  /* ── Unitat {unum(u)} · {META[u]} "
    return t + '─' * max(3, 75 - len(t)) + ' */'

def tex(s):
    assert '`' not in s and '${' not in s and not s.endswith('\\'), s
    return 'TEX`' + s + '`'

def lloc_errada(titol):
    m = re.match(r'^Exercici\s+\d+\s*,?\s*(.*)$', titol)
    assert m, titol
    return m.group(1).strip()

out = []
out.append(open(os.path.join(AQUI, 'cap.js.txt'), encoding='utf-8').read())

# ── ERRADES ──
out.append('const ERRADES = {\n')
actual = None; n_err = 0
for k in sorted(d['ERR'], key=clau_ord):
    u = k.split('/')[0]
    if u != actual:
        out.append('\n' + seccio(u) + '\n'); actual = u
    out.append(f"\n  '{k}': [\n")
    for j, e in enumerate(d['ERR'][k]):
        camps = []
        lloc = lloc_errada(e['t'])
        if lloc == '(enunciat)':
            camps.append(('enunciat: 1', ''))
        elif lloc:
            camps.append(('lloc:', tex(lloc)))
        camps.append(('ondiu:', tex(e['ondiu'])))
        camps.append(('hadedir:', tex(e['hadedir'])))
        if e.get('motiu'): camps.append(('motiu:', tex(e['motiu'])))
        pg = PEGATS.get(f"{k}#{d['ERR'][k].index(e)}") or []
        fp = lambda r: "['%s', %s, %s, %s, %s, '%s']" % tuple(r)
        if len(pg) == 1: camps.append(('pegat:', fp(pg[0])))
        elif len(pg) > 1: camps.append(('pegat:', '[' + ', '.join(fp(r) for r in pg) + ']'))
        mq = MARQUES.get(f"{k}#{d['ERR'][k].index(e)}") or []
        if len(mq) == 1: camps.append(('marca:', json.dumps(mq[0], ensure_ascii=False).replace('"', "'")))
        elif len(mq) > 1: camps.append(('marca:', '[' + ', '.join(json.dumps(r, ensure_ascii=False).replace('"', "'") for r in mq) + ']'))
        linies = []
        for i, (nom, val) in enumerate(camps):
            pre = '    { ' if i == 0 else '      '
            fi = ' },' if i == len(camps) - 1 else ','
            linies.append(pre + (nom.ljust(9) + val if val else nom) + fi)
        out.append('\n'.join(linies) + '\n'); n_err += 1
    out.append('  ],\n')
out.append('\n};\n')

# ── OBSERVACIONS ──
out.append('''

/* ═══════════════════════════════════════════════════════════════════════
   LES OBSERVACIONS
   ───────────────────────────────────────────────────────────────────────
   Comentaris que no són errades, però que poden confondre. Només es veuen
   si ERRADES_OBS és true: surten dins de l'exercici, sota les errades.

     'u9/66': [
       { lloc: TEX`c) i d)`,
         text: TEX`Les respostes són el nombre màxim.` },
     ],

   `lloc` és opcional, igual que a les errades. Una observació que parla de
   dos exercicis està escrita dues vegades, un cop a cada exercici.
   ═══════════════════════════════════════════════════════════════════════ */

const OBSERVACIONS = {
''')
def lloc_obs(titol, n):
    if titol.startswith('Exercicis'):
        resta = titol[len('Exercicis'):].strip()
        for tros in re.split(r'\s+i\s+(?=\d)', resta):
            m = re.match(r'^(\d+)\s*(.*)$', tros.strip())
            if int(m.group(1)) == n: return m.group(2).strip()
        raise ValueError(titol)
    return lloc_errada(titol)

actual = None; n_obs = 0
for k in sorted(d['OBS'], key=clau_ord):
    u, n = k.split('/')
    if u != actual:
        out.append('\n' + seccio(u) + '\n'); actual = u
    out.append(f"\n  '{k}': [\n")
    for o in d['OBS'][k]:
        lloc = lloc_obs(o['t'], int(n))
        if lloc:
            out.append('    { lloc: ' + tex(lloc) + ',\n      text: ' + tex(o['text']) + ' },\n')
        else:
            out.append('    { text: ' + tex(o['text']) + ' },\n')
        n_obs += 1
    out.append('  ],\n')
out.append('\n};\n')
out.append(open(os.path.join(AQUI, 'peu.js.txt'), encoding='utf-8').read())

nou = ''.join(out)
print('errades escrites:', n_err, '· entrades d\'observació:', n_obs, '· exercicis amb errades:', len(d['ERR']))
f_repo = os.path.join(camins.ARREL, 'errades.js'); f_out = os.path.join(camins.SORTIDA, 'errades.js')
vell = open(f_repo, encoding='utf-8').read() if os.path.exists(f_repo) else ''
if '--escriu' in sys.argv:
    open(f_repo, 'w', encoding='utf-8').write(nou)
    print('ESCRIT:', f_repo, '(igual que abans)' if nou == vell else '(HA CANVIAT: recorda pujar el número de errades.js?v= a tasca.html)')
else:
    open(f_out, 'w', encoding='utf-8').write(nou)
    if nou == vell: print("IDÈNTIC a l'errades.js del repo. (Còpia a eines/sortida/errades.js)")
    else:
        print("DIFERENT de l'errades.js del repo. El resultat és a eines/sortida/errades.js; primeres diferències:")
        for i, l in enumerate(difflib.unified_diff(vell.split('\n'), nou.split('\n'), 'repo', 'generat', lineterm='', n=0)):
            if i >= 40: print('   ...'); break
            print('   ' + l[:200])
