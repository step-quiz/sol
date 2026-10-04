#!/usr/bin/env python3
"""El motor de pegats (fase 3).

   Un pegat canvia només els signes equivocats d'una pàgina. Els signes nous es copien de la mateixa pàgina
   (mateixa lletra, gruix i mida) i la resta de la línia són els seus píxels originals, desplaçats si cal.
   El resultat és un retall petit (PNG) que el web posa a sobre de la imatge.

   Aquest fitxer no s'executa sol: el fa servir fes.py, que aplica les «receptes» (receptes_*.py).
   Les operacions que pot portar una recepta són a `OPERACIONS`, al final de `fes`, i explicades a LLEGEIX-ME.md."""
import sys, os, json, re, subprocess, glob, collections
import numpy as np, cv2
_AQUI = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, os.path.join(_AQUI, '..')); sys.path.insert(0, os.path.join(_AQUI, '..', 'localitzador'))
import camins, loc, loc2
SITE = loc.SITE
AQUI = os.path.join(camins.SORTIDA, 'latex')         # només per al cas (que no s'ha donat mai) d'haver de compondre un signe amb LaTeX
MARQ = json.load(open(os.path.join(camins.EINES, 'localitzador', 'marques.json'), encoding='utf-8'))
norm = lambda t: loc2.norm(t).replace(' ', '')

# ───────── LaTeX: es componen tots els trossos d'un cop ─────────
CAP = r'''\documentclass[border=0pt,multi=tros]{standalone}
\usepackage{amsmath}
\usepackage[no-math]{fontspec}
\setmainfont{SourceSans3-Light.otf}[Path=./fonts/, ItalicFont=SourceSans3-LightIt.otf, BoldFont=SourceSans3-Regular.otf, BoldItalicFont=SourceSans3-It.otf]
\usepackage[italic,defaultmathsizes]{mathastext}
\newcommand{\fl}{\rightarrow}
\newcommand{\puntal}{\rule[-1.3em]{0pt}{2.5em}}
\newenvironment{tros}{\puntal$\displaystyle}{$}
\begin{document}
'''
BASE_TEX = 1.2*10*600/72          # línia de base de cada tros, en píxels des de dalt (10 pt a 600 ppp)
EM_TEX = 10*600/72
_tex = {}
def compon(trossos):
    falten = [t for t in dict.fromkeys(trossos) if t and t not in _tex]
    if falten:
        if not os.path.isdir(os.path.join(AQUI, 'fonts')):
            raise RuntimeError('aquest text nou porta un signe que no és a cap pàgina de la unitat (' + ' | '.join(falten)[:80] + '). '
                               'Caldria compondre\'l amb LaTeX (xelatex i la lletra Source Sans 3 a eines/sortida/latex/fonts/), '
                               'però cap pegat publicat ho ha necessitat: revisa abans la recepta.')
        for f in glob.glob(f'{AQUI}/lot*'): os.remove(f)
        open(f'{AQUI}/lot.tex', 'w', encoding='utf-8').write(CAP + '\n'.join(r'\begin{tros}%s\end{tros}' % t for t in falten) + '\n\\end{document}\n')
        r = subprocess.run(['xelatex', '-interaction=nonstopmode', '-halt-on-error', 'lot.tex'], cwd=AQUI, capture_output=True, text=True, timeout=240)
        if 'Output written' not in r.stdout: raise RuntimeError('LaTeX: ' + r.stdout[-600:])
        subprocess.run(['pdftoppm', '-r', '600', '-gray', '-png', 'lot.pdf', 'lot'], cwd=AQUI, check=True)
        fs = sorted(glob.glob(f'{AQUI}/lot-*.png'), key=lambda f: int(re.search(r'-(\d+)\.png', f).group(1)))
        assert len(fs) == len(falten), (len(fs), len(falten))
        for t, f in zip(falten, fs): _tex[t] = cv2.imread(f, 0)

# ───────── una pàgina ─────────
class Pagina:
    def __init__(self, u, rel):
        self.u, self.rel = u, rel
        self.img = cv2.imread(f'{SITE}/{u}/{rel}'); self.gris = cv2.cvtColor(self.img, cv2.COLOR_BGR2GRAY)
        self.H, self.W = self.gris.shape
        chs, WH, mig = loc.caracters(u, rel)
        for c in chs: c['col'] = int((c['x0'] + c['x1'])/2 >= mig)
        self.chars = chs; self.files = []
        for col in (0, 1):
            cur = None
            for c in sorted([c for c in chs if c['col'] == col], key=lambda c: c['base']):
                if cur is None or c['base'] - cur[-1]['base'] > 1.6: cur = [c]; self.files.append(cur)
                else: cur.append(c)
        for i, r in enumerate(self.files):
            r.sort(key=lambda c: c['x0'])
            for c in r: c['fila'] = i
        # mida principal i alçada de les xifres (per posar el text nou a la mateixa mida)
        self.mida = (collections.Counter(c['s'] for c in chs if 'Vectora' in c['f']).most_common(1) or [(8.5, 0)])[0][0]      # una pàgina sense text (només una gràfica) també val
        alc = []
        for c in chs:
            if c['t'].isdigit() and c['s'] == self.mida and 'Vectora' in c['f']:
                col = (self.gris[int(c['base']) - 30:int(c['base']) + 1, int(c['x0']) + 1:int(c['x1'])] < 150).any(axis=1)[::-1]
                k = 0
                while k < len(col) and (col[k] or k < 3): k += 1
                if 8 < k < 28: alc.append(k)
        self.alc_xifra = float(np.median(alc)) if alc else None
        self.pxpt = 200/72*loc.casa(u, rel)[1]            # píxels per punt tipogràfic en aquesta imatge
        em = self.mida*self.pxpt; buits = []
        for f in self.files:
            for a, b in zip(f, f[1:]):
                if all('Vectora' in q['f'] and 'Italic' not in q['f'] and q['s'] == self.mida and q['t'].isalpha() for q in (a, b)) and .12*em < b['x0'] - a['x1'] < .45*em: buits.append(b['x0'] - a['x1'])
        self.espai = float(np.median(buits)) if buits else .25*em          # l'espai entre dues paraules
    def text(self, fila): return ''.join(norm(c['t']) for c in fila)
    def troba(self, cars, vell, nth=0):
        """La n-èsima aparició de `vell` (caràcters seguits d'una mateixa fila) entre els caràcters donats."""
        files = collections.OrderedDict()
        for c in sorted(cars, key=lambda c: (c['col'], c['base'], c['x0'])): files.setdefault(c['fila'], []).append(c)
        v = norm(vell); k = 0
        for fi, cc in files.items():
            cc.sort(key=lambda c: c['x0']); s = ''; idx = []
            for j, c in enumerate(cc):
                for ch in norm(c['t']): s += ch; idx.append(j)
            p = s.find(v)
            while p >= 0:
                if k == nth: return cc[idx[p]:idx[p + len(v) - 1] + 1]
                k += 1; p = s.find(v, p + 1)
        raise LookupError(f'no trobo «{vell}» (aparició {nth}) a {[self.text(f) for f in files.values()]}')

_alc0 = None
def escala(pag, mida):
    """Factor per passar d'un tros compost (10 pt, 600 ppp) a la mida d'aquella lletra a la pàgina."""
    global _alc0
    if _alc0 is None:
        compon(['0']); ys = np.where((_tex['0'] < 128).any(axis=1))[0]; _alc0 = BASE_TEX - ys.min()
    return pag.alc_xifra / _alc0 * (mida / pag.mida)

def colors(pag, x0, y0, x1, y1):
    reg = pag.img[max(0, y0):y1, max(0, x0):x1].reshape(-1, 3); g = pag.gris[max(0, y0):y1, max(0, x0):x1].reshape(-1)
    fons = np.median(reg[g >= np.percentile(g, 70)], axis=0); fosc = reg[g <= g.min() + 35]
    return (np.median(fosc, axis=0) if len(fosc) else np.array([60, 60, 60])), fons

def dibuixa(work, tex, s, X, base, tinta, gruix=0):
    r = _tex[tex]
    if gruix: r = cv2.erode(r, np.ones((3, 3), np.uint8), iterations=gruix)          # traç una mica més gruixut
    rc = cv2.resize(r, None, fx=s, fy=s, interpolation=cv2.INTER_AREA)
    Y = int(round(base - BASE_TEX*s)); X = int(round(X)); h, w = rc.shape
    a = (255 - rc.astype(np.float32))/255.0
    y0, x0 = max(0, Y), max(0, X); reg = work[y0:Y + h, x0:X + w].astype(np.float32); a = a[y0 - Y:, x0 - X:][:reg.shape[0], :reg.shape[1]]
    work[y0:Y + h, x0:X + w] = (reg*(1 - a[..., None]) + tinta[None, None, :]*a[..., None]).astype(np.uint8)
    return w

GRUIX = 0
BAIXEN = set('gjpqy,;()[]{}|/')
def _t(c): return c['t'].replace('\u2212', '-').replace('\u2013', '-').replace('\u2019', "'")
def classe(ch, text=False):
    if ch in '+-=<>': return 'MMaCentury'
    if ch == '→': return 'MMaArrow'
    if ch == '′': return 'MMaEtc'
    if ch == '·': return 'Pi'
    if ch in '∪∩': return 'MMaBinary'
    if ch.isalpha(): return 'Recta' if text else 'Italic'
    return 'Recta'
MENOR_MAJOR = {'<': '1', '>': '2'}          # en algunes fórmules «<» i «>» són els caràcters 1 i 2 de la lletra MMaExtra
def _es(c, ch, cl, mida, lleu=True):
    f = c['f']
    if 'Vectora' in f and (('Light' in f) != lleu or 'Bold' in f): return False
    if cl == 'MMaArrow': return 'MMaArrow' in f and abs(c['s'] - mida*10.5/8.5) < .12
    if cl == 'MMaEtc': return 'MMaEtc' in f and c['t'] == 'l' and abs(c['s'] - mida) < .07
    if cl == 'Pi': return 'MathematicalPi' in f and c['t'] == '?' and abs(c['s'] - mida) < .07
    if cl == 'MMaBinary': return 'MMaBinary' in f and c['t'] == {'∪': ',', '∩': '+'}[ch] and abs(c['s'] - mida) < .3
    if abs(c['s'] - mida) > .07: return False
    if ch in MENOR_MAJOR and 'MMaExtra' in f and c['t'] == MENOR_MAJOR[ch]: return True
    if _t(c) != ch: return False
    if cl == 'MMaCentury': return 'MMaCentury' in f and (('Bold' in f) != lleu)
    if cl == 'Italic': return 'Vectora' in f and 'Italic' in f
    return 'Vectora' in f and 'Italic' not in f
def _tipus(c):
    if c is None: return '-'
    if 'MMaEtc' in c['f']: return 'p'
    if 'MMaExtra' in c['f'] or 'MMaRelation' in c['f'] or 'MMaBinary' in c['f'] or 'MathematicalPi' in c['f']: return 'o'
    t = _t(c); return 'd' if t.isdigit() else ('a' if t.isalpha() else ('o' if t in '+-=<>' else 'p'))
def _vei(pag, c, d):
    f = pag.files[c['fila']]; i = f.index(c) + d
    return f[i] if 0 <= i < len(f) and abs(f[i]['x0'] - c['x0']) < 2.2*c['s']*pag.pxpt else None
def _net(pag, c):
    h = c['y1'] - c['y0']
    if (pag.gris[int(c['y0']):int(np.ceil(c['y1'])) + 1, int(c['x0']):int(np.ceil(c['x1'])) + 1] < 150).sum() < 5: return False
    if 'MMaArrow' in c['f']: return True
    for o in pag.chars:
        if o is c or o['col'] != c['col'] or abs(o['base'] - c['base']) <= 1.6: continue
        if min(o['x1'], c['x1']) - max(o['x0'], c['x0']) > 1.2 and min(o['y1'], c['y1']) - max(o['y0'], c['y0']) > .35*h: return False
    if norm(c['t']) not in BAIXEN:
        sota = pag.gris[int(c['base']) + 3:int(np.ceil(c['y1'])) + 1, int(c['x0']) + 1:int(c['x1'])]
        if sota.size and (sota < 150).any(): return False
    return True
def _altres_pagines(pag):
    """Altres imatges de la mateixa unitat on buscar un signe que en aquesta pàgina no hi és."""
    vistes = {pag.rel}
    for key, ms in MARQ.items():
        if key.split('/')[0] != pag.u: continue
        for q in ms:
            if q[0] not in vistes: vistes.add(q[0]); yield pagina(pag.u, q[0])
    for n, imgs in loc.CAT[pag.u].items():
        for rel in imgs:
            if rel not in vistes: vistes.add(rel); yield pagina(pag.u, rel)
def glifs(pag, text, mida, abans=None, despres=None, prop=None, es_text=False, lleu=True, ultim_just=False):
    """Per a cada signe de `text`: (caràcter d'on copiar-lo, quant avança, pàgina d'on surt). None si en falta algun."""
    out = []; seq = list(text)
    tp = lambda x: '-' if x is None else ('d' if x.isdigit() else ('a' if x.isalpha() else ('o' if x in '+-=<>→' else 'p')))
    sub = False
    for i, ch in enumerate(seq):
        if ch == ' ': out.append((None, pag.espai, pag)); continue
        if ch in '_^': sub = ch; continue
        if sub:
            amunt = sub == '^'; sub = False; em = mida*pag.pxpt; triat = None
            import itertools
            for P in itertools.chain([pag], _altres_pagines(pag)):
                cands = []
                for c in P.chars:
                    if _t(c) == ch and c['s'] < .7*mida and 'Vectora' in c['f'] and 'Italic' not in c['f']:
                        esq = [q for q in P.chars if q['col'] == c['col'] and abs(q['s'] - mida) < .1 and ('Italic' in q['f'] or amunt) and -1.5 < c['x0'] - q['x1'] < 3 and ((-.62*em < c['base'] - q['base'] < -.2*em) if amunt else (.05*em < c['base'] - q['base'] < .45*em))]
                        if esq and _net(P, c): cands.append((c, esq[0]))
                if cands:
                    c, q = min(cands, key=lambda cq: 0 if P is not pag or prop is None else abs(cq[0]['x0'] - prop[0]) + 3*abs(cq[0]['base'] - prop[1]))
                    triat = (c, (c['x1'] - c['x0']) + .5, P, c['base'] - q['base'], c['x0'] - q['x1']); break
            if triat is None: return None
            if out and out[-1][0] is not None: out[-1] = (out[-1][0], out[-1][0]['x1'] - out[-1][0]['x0'] + triat[4],) + tuple(out[-1][2:])      # la lletra de davant avança just fins al subíndex
            out.append(triat[:4]); continue
        cl = classe(ch, es_text)
        seg_ch = seq[i + 1] if i + 1 < len(seq) else despres; ant_ch = seq[i - 1] if i else abans
        vol_seg, vol_ant = ('s' if (es_text and seg_ch == ' ') else tp(seg_ch)), ('s' if (es_text and ant_ch == ' ') else tp(ant_ch))
        if ch == '-' and (ant_ch is None or ant_ch in '=(<>+-,→{[') and seg_ch is not None: vol_seg, vol_ant = 'd', 'o'      # signe menys «de davant»: com el de «= −4»
        triat = None
        aqui = [c for c in pag.chars if _es(c, ch, cl, mida, lleu) and _net(pag, c)]
        for P in ([pag] if aqui else _altres_pagines(pag)):
            cands = aqui if P is pag else [c for c in P.chars if _es(c, ch, cl, mida, lleu) and _net(P, c)]
            if not cands: continue
            def nota(c):
                seg, ant = _vei(P, c, 1), _vei(P, c, -1)
                lluny = 0 if (prop is None or P is not pag) else (abs(c['x0'] - prop[0]) + 3*abs(c['base'] - prop[1]))/1e5
                ts = 's' if (es_text and seg is not None and seg['x0'] - c['x1'] > .12*c['s']*P.pxpt) else _tipus(seg)
                ta = 's' if (es_text and ant is not None and c['x0'] - ant['x1'] > .12*c['s']*P.pxpt) else _tipus(ant)
                return (ts == vol_seg)*2 + (ta == vol_ant) - lluny
            c = max(cands, key=nota); seg = _vei(P, c, 1); w = c['x1'] - c['x0']; em = c['s']*P.pxpt
            igual = seg is not None and vol_seg != '-' and _tipus(seg) == vol_seg
            if es_text: igual = igual and (seg['x0'] - c['x1']) < .12*em and seg_ch != ' '      # dins d'una paraula: sense comptar-hi cap espai
            av = float(np.clip(seg['x0'] - c['x0'], w - .35*em, w + .45*em)) if igual else w
            if ultim_just and i == len(seq) - 1: av = w
            if ch.isdigit() and seg_ch is not None and seg_ch.isdigit(): av = w              # entre dues xifres seguides no hi ha mai espai (el model podia venir de «15 625»)
            if ch == '-' and vol_ant == 'o' and vol_seg == 'd': av = min(av, w + .12*em)      # el signe menys «de davant» va enganxat al nombre
            triat = (c, av, P); break
        if triat is None:
            if lleu is not None and not getattr(glifs, '_dins', False):
                glifs._dins = True
                try: alt = glifs(pag, ch, mida, ant_ch, seg_ch, prop, es_text, not lleu, False)
                finally: glifs._dins = False
                if alt: out.append(alt[0]); continue
            return None
        out.append(triat)
    return out
ACCENTS = 'ijàáèéìíòóùúïüÀÈÉÍÒÓÚ'
def posa_glifs(pag, work, gl, X, base, tinta, fons):
    for g in gl:
        c, av, pag = g[0], g[1], g[2]; base_g = base + (g[3] if len(g) > 3 else 0)
        if c is None: X += av; continue
        dalt = 9 if c['t'] in ACCENTS else 1; costat = 2 if c['t'] in 'íìïÍ' else 0             # l'accent de la í és més ample que la lletra
        y0 = int(np.floor(c['y0'])) - dalt; y1 = int(np.ceil(c['y1'])) + 1; x0 = int(np.floor(c['x0'])) - costat; x1 = int(np.ceil(c['x1'])) + costat
        src = pag.gris[y0:y1, x0:x1].astype(np.float32); gb = float(np.percentile(src, 92)); gi = float(tinta @ np.array([.114, .587, .299]))
        a = np.clip((gb - src)/max(1.0, gb - gi), 0, 1); zona_accent = dalt + 7
        if costat: a[zona_accent:, :costat] = 0; a[zona_accent:, -costat:] = 0
        n, lab, st, _ = cv2.connectedComponentsWithStats((a > .2).astype(np.uint8)); bo = np.zeros(a.shape, np.uint8)
        for k in range(1, n):
            es_accent = dalt > 1 and st[k][1] > 0 and st[k][1] + st[k][3] <= zona_accent
            vora_x = (st[k][2] <= 3 or (st[k][2] <= 5 and st[k][4] <= 16)) and (st[k][0] == 0 or st[k][0] + st[k][2] == a.shape[1])
            vora_y = (st[k][3] <= 4 and (st[k][1] == 0 or st[k][1] + st[k][3] == a.shape[0])) or (dalt > 1 and st[k][1] == 0 and st[k][1] + st[k][3] <= dalt - 1)
            if es_accent or not (vora_x or vora_y): bo[lab == k] = 1                         # aquest tros és del signe: es queda
        tt = _t(c)
        if len(tt) == 1 and 'MMa' not in c['f'] and (tt.isdigit() or (tt.isalpha() and tt not in ACCENTS) or tt in '()[]{}*+-<>/|') and bo.any():
            n2, lab2, st2, _ = cv2.connectedComponentsWithStats(bo)
            if n2 > 2:
                gran = 1 + int(np.argmax(st2[1:, 4])); bo = (lab2 == gran).astype(np.uint8)
        a = a*(cv2.dilate(bo, np.ones((3, 3), np.uint8)) > 0)                                  # tot el que no toca el signe (engrunes dels veïns), fora
        X0 = int(round(X + (x0 - c['x0']))); Y0 = int(round(base_g + (y0 - c['base'])))
        reg = work[Y0:Y0 + a.shape[0], X0:X0 + a.shape[1]].astype(np.float32)
        work[Y0:Y0 + a.shape[0], X0:X0 + a.shape[1]] = (reg*(1 - a[..., None]) + tinta[None, None, :]*a[..., None]).astype(np.uint8)
        X += av
    return X
def esborra(pag, work, x0, x1, y0, y1, fons):
    """Esborra el rectangle i, a més, la tinta dels signes que hi tenen el centre (encara que sobresurtin una mica),
       accents inclosos: es mira 8 px més amunt, però el que arriba fins a dalt de tot és de la línia de sobre i no es toca.
       Les barres de fracció (ratlles primes que passen de banda a banda del text vell) no s'esborren mai."""
    xa, xb = int(np.floor(x0)) - 6, int(np.ceil(x1)) + 6; ya = y0 - 8
    g = cv2.cvtColor(work[ya:y1, xa:xb], cv2.COLOR_BGR2GRAY); gf = float(fons @ np.array([.114, .587, .299]))
    tinta = (g < gf - 28).astype(np.uint8)
    n, lab, st, cen = cv2.connectedComponentsWithStats(tinta)
    barra = np.zeros(g.shape, bool)
    for k in range(1, n):
        # una barra de fracció: ratlla prima, tan ampla com el text vell (o més), que queda per sobre o per sota del text, no al mig
        if st[k][3] <= 4 and st[k][2] >= max(14, .8*(x1 - x0)) and (st[k][1] + st[k][3] <= (y0 - ya) + 3 or st[k][1] >= g.shape[0] - 6): barra |= cv2.dilate((lab == k).astype(np.uint8), np.ones((3, 1), np.uint8)) > 0
    for k in range(1, n):
        if barra[lab == k].any(): continue
        if x0 - .5 <= xa + cen[k][0] <= x1 + .5 and st[k][1] > 0:
            m = cv2.dilate((lab == k).astype(np.uint8), np.ones((3, 3), np.uint8)) > 0
            m[:, :max(0, int(np.floor(x0)) - 2 - xa)] = False; m[:, int(np.ceil(x1)) + 2 - xa:] = False
            work[ya:y1, xa:xb][m & ~barra] = fons
    r0, r1 = int(round(x0)), int(round(x1)); zona = work[y0:y1, r0:r1]; zona[~barra[y0 - ya:, r0 - xa:r1 - xa]] = fons

def _mesura(pag, nou, mida, abans, despres, prop=None, lleu=True, ultim_just=False):
    """Amplada del text nou i com es dibuixarà: amb signes de la pàgina si hi són tots; si no, amb LaTeX."""
    if nou.startswith('tex:'): tex = nou[4:]; gl = None
    else:
        es_text = nou.startswith('t:'); nou = nou[2:] if es_text else nou
        gl = glifs(pag, nou, mida, abans, despres, prop, es_text, lleu, ultim_just) if nou else []
        tex = None if gl is not None else nou.replace('→', r'\fl ')
    if gl is not None: return sum(g[1] for g in gl), gl, None
    compon([tex]); return _tex[tex].shape[1]*escala(pag, mida), None, tex

def S(pag, work, cars, vell, nou, nth=0, mou=True, alinea='e', buit=True, franja=None, centra=False, enganxat=False):
    """Substitueix els caràcters `vell` per `nou`. La resta de la línia es desplaça el que calgui, amb els seus píxels."""
    T = pag.troba(cars, vell, nth); f = pag.files[T[0]['fila']]; base = float(np.median([c['base'] for c in T]))
    mida = max(c['s'] for c in T if 'MMaArrow' not in c['f']); em = mida*pag.pxpt
    ant = f[f.index(T[0]) - 1] if f.index(T[0]) > 0 else None; seg = f[f.index(T[-1]) + 1] if f.index(T[-1]) + 1 < len(f) else None
    if seg is not None and (seg['x0'] - T[-1]['x1'] > 1.5*em or franja): seg = None
    if seg is not None and seg['x0'] < T[-1]['x1'] - .15*em: seg = None        # un «signe» que trepitja el text vell no és de veritat (el PDF porta text amagat)
    x0 = T[0]['x0']; fi = min(T[-1]['x1'], seg['x0']) if seg is not None else T[-1]['x1']       # on acaba el text vell
    x1 = seg['x0'] if seg is not None else fi                                                   # on comença el que ve darrere (espai inclòs)
    ty0 = int(round(base - .9*em)); ty1 = int(round(base + .32*em))
    lleu = not any(('Vectora' in c['f'] and 'Light' not in c['f']) or ('MMaCentury' in c['f'] and 'Bold' in c['f']) for c in f)
    ample, gl, tex = _mesura(pag, nou, mida, norm(ant['t']) if ant else None, norm(seg['t']) if seg else None, (T[0]['x0'], base), lleu, buit and seg is not None and (x1 - fi) > .5)
    d = ample - (fi - x0) - (0 if buit else (x1 - fi))
    if not nou:
        col_t = (pag.gris[ty0:ty1, int(np.floor(x0)):int(np.ceil(fi)) + 1] < 205).any(axis=0); xs_t = np.where(col_t)[0]
        if len(xs_t): d += min(max(0.0, float(xs_t.min()) - (x0 - np.floor(x0)) - 1), .3*em)
    cua = [c for c in f if c['x0'] >= x1 - .6 and c not in T]
    cua += [c for c in pag.chars if c['col'] == T[0]['col'] and c['fila'] != T[0]['fila'] and abs(c['base'] - base) <= 3.5 and (c['s'] >= .85*pag.mida) and c['x0'] >= x1 - .6 and mida >= .85*pag.mida and c['x0'] - x1 < 14*em]      # fletxes i signes de la mateixa línia amb la base una mica diferent
    cua += [c for c in pag.chars if c['col'] == T[0]['col'] and c['fila'] != T[0]['fila'] and c['s'] < .85*pag.mida and c['x0'] >= x1 - .6
            and -.95*em <= c['base'] - base <= .8*em and cua and c['x1'] <= max(q['x1'] for q in cua) + 30
            and not any(abs(c['base'] - q[0]['base']) < abs(c['base'] - base) for q in pag.files if q is not f and q[0]['s'] >= .85*pag.mida and q[0]['col'] == c['col'] and -.95*em <= c['base'] - q[0]['base'] <= .8*em)]
    tinta, fons = colors(pag, int(x0) - 2, ty0, int(np.ceil(T[-1]['x1'])) + 3, ty1)
    esborra(pag, work, x0, fi, ty0, ty1, fons)
    if abs(d) < .75 and not centra: mou = False
    if cua and mou:
        cy0 = min(ty0, int(min(c['y0'] for c in cua)) - 1); cy1 = max(ty1, int(max(c['y1'] for c in cua)) + 2); cx0 = int(np.floor(x1)) - 2; cx1 = int(max(c['x1'] for c in cua)) + 4
        if franja:
            cy0 = int(round(base + franja[0]*em)); cy1 = int(round(base + franja[1]*em)); cx1 += 6
            gf = float(fons @ np.array([.114, .587, .299])); limit = pag.W if T[0]['col'] else int(pag.W/2) + 40
            while cx1 < limit - 1 and (cv2.cvtColor(work[cy0:cy1, cx1:min(limit, cx1 + 34)], cv2.COLOR_BGR2GRAY) < gf - 28).any(): cx1 += 8
        bloc = work[cy0:cy1, cx0:cx1].copy(); masc = np.zeros(bloc.shape[:2], bool) if not franja else np.ones(bloc.shape[:2], bool)
        per_fila = collections.defaultdict(list)
        for c in cua: per_fila[c['fila']].append(c)
        for cc in per_fila.values():                      # dins d'una paraula o fórmula, la màscara també tapa l'espai fins al signe següent
            cc.sort(key=lambda c: c['x0'])                # (les lletres cursives sobresurten una mica de la seva caixa)
            for i, c in enumerate(cc):
                xb = int(np.ceil(c['x1'])) + 1
                if i + 1 < len(cc) and cc[i + 1]['x0'] - c['x1'] < .6*em: xb = max(xb, int(np.ceil(cc[i + 1]['x0'])))
                masc[max(0, int(c['y0']) - 1 - cy0):int(np.ceil(c['y1'])) + 1 - cy0, max(0, int(np.floor(c['x0'])) - (2 if i == 0 else 0) - cx0):xb - cx0] = True
        work[cy0:cy1, cx0:cx1][masc] = fons
    X = x0 if alinea == 'e' else (fi - ample if alinea == 'd' else (x0 + fi - ample)/2)
    if enganxat and ant is not None: X = ant['x1']; d -= (x0 - ant['x1'])          # el text nou comença on acaba el signe anterior (sense l'espai que hi havia)
    if gl: posa_glifs(pag, work, gl, X, base, tinta, fons)
    elif tex: dibuixa(work, tex, escala(pag, mida), X, base, tinta, GRUIX)
    if cua and mou:
        nx = cx0 + int(round(d)); dst = work[cy0:cy1, nx:nx + bloc.shape[1]]
        dst[:] = np.where(masc[..., None] & (bloc.astype(int).sum(axis=2, keepdims=True) < fons.sum() - 24), bloc, dst)
    if centra:
        # la fila (un numerador, per exemple) es torna a centrar: es desplaça la meitat del que ha canviat d'amplada
        fila = [c for c in f] + [c for c in pag.chars if c['col'] == T[0]['col'] and c['s'] < .85*mida and -.75*em < c['base'] - base < -.15*em and f[0]['x0'] - 2 <= c['x0'] <= f[-1]['x1'] + 2]
        rx0 = int(min(c['x0'] for c in fila)) - 3; rx1 = int(max(c['x1'] for c in fila)) + 4; ry0 = int(round(base - 1.22*em)); ry1 = int(round(base + .27*em))
        bl = work[ry0:ry1, rx0:rx1].copy(); work[ry0:ry1, rx0:rx1] = fons; k = int(round(-d/2))
        dst = work[ry0:ry1, rx0 + k:rx1 + k]; dst[:] = np.where(bl.astype(int).sum(axis=2, keepdims=True) < fons.sum() - 24, bl, dst)
    return 'glifs' if gl is not None else 'latex'

def SUB(pag, work, cars, nou, nth=0):
    """Canvia tot un subíndex (les lletres petites de sota d'un «lim») per `nou`, centrat on era."""
    petits = sorted([c for c in cars if c['s'] < .85*pag.mida], key=lambda c: c['x0']); grups = []
    for c in petits:
        if grups and c['x0'] - grups[-1][-1]['x1'] < 6: grups[-1].append(c)
        else: grups.append([c])
    T = grups[nth]; lletres = [c for c in T if 'Vectora' in c['f']]; base = float(np.median([c['base'] for c in lletres])); mida = max(c['s'] for c in lletres); em = mida*pag.pxpt
    x0, x1 = min(c['x0'] for c in T), max(c['x1'] for c in T); y0 = int(min(c['y0'] for c in T)) - 1; y1 = int(max(c['y1'] for c in T)) + 2
    ample, gl, tex = _mesura(pag, nou, mida, None, None, (T[0]['x0'], base))
    tinta, fons = colors(pag, int(x0) - 2, y0, int(x1) + 3, y1)
    work[y0:y1, int(x0) - 1:int(x1) + 2] = fons
    if gl: posa_glifs(pag, work, gl, (x0 + x1 - ample)/2, base, tinta, fons)
    else: dibuixa(work, tex, escala(pag, mida), (x0 + x1 - ample)/2, base, tinta, GRUIX)
    return 'glifs' if gl is not None else 'latex'

def SUP(pag, work, cars, despres, nou, nth=0):
    """Posa un exponent (`nou`) just darrere dels caràcters `despres`, a l'alçada dels altres exponents de la fila."""
    T = pag.troba(cars, despres, nth); c = T[-1]; em = pag.mida*pag.pxpt
    exps = [q for q in pag.chars if q['col'] == c['col'] and q['s'] < .7*pag.mida and -.6*em < q['base'] - c['base'] < -.2*em]
    ref = min(exps, key=lambda q: abs(q['x0'] - c['x1']) + 4*abs((q['base'] - c['base']) + .4*em))             # l'exponent més proper, per copiar-ne l'alçada i la mida
    gl = glifs(pag, nou, ref['s'], prop=(c['x1'], ref['base']))
    if gl is None: raise LookupError(f'no trobo l\'exponent «{nou}»')
    tinta, fons = colors(pag, int(c['x0']) - 2, int(c['y0']), int(c['x1']) + 3, int(c['y1']))
    posa_glifs(pag, work, gl, c['x1'] + .5, c['base'] + (ref['base'] - min((q for q in pag.files[ref['fila']] if True), key=lambda q: abs(q['x0'] - ref['x0']))['base']) + (ref['base'] - c['base']) if False else ref['base'], tinta, fons)
    return 'glifs'

def INS(pag, work, cars, despres, lletra, tipus='MMaEtc', nth=0):
    """Darrere de `despres` hi posa un signe enganxat (per exemple la prima de y′), copiat d'una parella igual de la pàgina
       amb la mateixa posició relativa. La resta de la línia es desplaça el que ocupa."""
    T = pag.troba(cars, despres, nth); c = T[-1]; f = pag.files[c['fila']]; em = pag.mida*pag.pxpt
    refs = []
    import itertools
    for P in itertools.chain([pag], _altres_pagines(pag)):
        for g in P.chars:
            if tipus in g['f'] and g['t'] == lletra and abs(g['s'] - c['s']) < .1:
                esq = [q for q in P.chars if q['col'] == g['col'] and _t(q) == _t(c) and q['f'] == c['f'] and -1 < g['x0'] - q['x1'] < .3*em and abs(g['base'] - q['base']) < .8*em]
                dre = [q for q in P.chars if q['col'] == g['col'] and abs(q['base'] - (esq[0]['base'] if esq else g['base'])) < 1.6 and 0 <= q['x0'] - g['x0'] < 1.2*em and q is not g]
                if esq: refs.append((P, g, esq[0], min(dre, key=lambda q: q['x0']) if dre else None))
        if refs: break
    if not refs: raise LookupError('no trobo cap parella de referència')
    refs.sort(key=lambda r: 0 if (r[3] is not None and r[3]['t'] == '=') else 1)
    P, g, e0, d0 = refs[0]; dx = g['x0'] - e0['x1']; dy = g['base'] - e0['base']; av = (d0['x0'] - e0['x1']) if d0 is not None else (g['x1'] - e0['x1'])
    seg = f[f.index(c) + 1] if f.index(c) + 1 < len(f) else None
    cua = [q for q in f if q['x0'] >= c['x1'] - .6 and q is not c]
    ty0 = int(round(c['base'] - .95*em)); ty1 = int(round(c['base'] + .32*em))
    tinta, fons = colors(pag, int(c['x0']) - 2, ty0, int(c['x1']) + 3, ty1)
    if cua:
        cx0 = int(np.floor(min(q['x0'] for q in cua))) - 2; cx1 = int(max(q['x1'] for q in cua)) + 4; bloc = work[ty0:ty1, cx0:cx1].copy(); work[ty0:ty1, cx0:cx1] = fons
        nx = cx0 + int(round(av)); dst = work[ty0:ty1, nx:nx + bloc.shape[1]]; dst[:] = np.where(bloc.astype(int).sum(axis=2, keepdims=True) < fons.sum() - 24, bloc, dst)
    g2 = dict(g); g2['x1'] = min(g['x1'], d0['x0'] - 1.5) if d0 is not None else g['x1']
    posa_glifs(pag, work, [(g2, 0, P)], c['x1'] + dx, c['base'] + dy, tinta, fons)
    INS.ref = (P.rel, round(g['x0']), round(g['base']), None if d0 is None else d0['t'], round(av, 1))
    return 'glifs'

def COPG(pag, work, cars, de, a):
    """El subíndex número `a` (de la marca) se substitueix pel subíndex número `de`, copiat tal qual i centrat on era."""
    petits = sorted([c for c in cars if c['s'] < .85*pag.mida], key=lambda c: c['x0']); grups = []
    for c in petits:
        if grups and c['x0'] - max(q['x1'] for q in grups[-1]) < 6: grups[-1].append(c)
        else: grups.append([c])
    caixa = lambda g: (int(np.floor(min(c['x0'] for c in g))) - 1, int(np.floor(min(c['y0'] for c in g))) - 1, int(np.ceil(max(c['x1'] for c in g))) + 2, int(np.ceil(max(c['y1'] for c in g))) + 1)
    ax0, ay0, ax1, ay1 = caixa(grups[a]); dx0, dy0, dx1, dy1 = caixa(grups[de])
    tinta, fons = colors(pag, ax0, ay0, ax1, ay1)
    # només les files on hi ha la tinta del subíndex (la caixa de la fletxa puja fins a tocar la línia de dalt)
    base = float(np.median([c['base'] for c in grups[de] if 'Vectora' in c['f']])); em = pag.mida*pag.pxpt
    y0 = int(round(base - .62*em)); y1 = int(round(base + .2*em))
    work[y0:y1, ax0:ax1] = fons
    bl = pag.img[y0:y1, dx0:dx1]; cx = (ax0 + ax1)//2 - (dx1 - dx0)//2; m = np.zeros(bl.shape[:2], bool)
    for c in grups[de]: m[:, max(0, int(np.floor(c['x0'])) - dx0):int(np.ceil(c['x1'])) + 1 - dx0] = True
    dst = work[y0:y1, cx:cx + bl.shape[1]]; dst[:] = np.where(m[..., None] & (bl.astype(int).sum(axis=2, keepdims=True) < fons.sum() - 24), bl, dst)
    return 'copiat'

def APP(pag, work, cars, despres, nou, nth=0):
    """Afegeix `nou` just darrere dels caràcters `despres` (amb signes de la pàgina). El que hi hagi més enllà es desplaça."""
    T = pag.troba(cars, despres, nth); c = T[-1]; f = pag.files[c['fila']]; em = pag.mida*pag.pxpt; base = c['base']
    es_text = nou.startswith('t:'); txt = nou[2:] if es_text else nou
    gl = glifs(pag, txt, pag.mida, _t(c), None, (c['x1'], base), es_text, True, False)
    if gl is None: raise LookupError(f'falten signes per a «{nou}»')
    ample = sum(g[1] for g in gl); ty0 = int(round(base - .95*em)); ty1 = int(round(base + .44*em))      # els parèntesis baixen força
    tinta, fons = colors(pag, int(c['x0']) - 2, ty0, int(c['x1']) + 3, ty1)
    cua = [q for q in pag.chars if q['col'] == c['col'] and abs(q['base'] - base) <= 3.5 and q['s'] >= .85*pag.mida and q['x0'] >= c['x1'] - .6 and q is not c]
    if cua:
        cx0 = int(np.floor(min(q['x0'] for q in cua))) - 2; cx1 = int(max(q['x1'] for q in cua)) + 4; bloc = work[ty0:ty1, cx0:cx1].copy(); work[ty0:ty1, cx0:cx1] = fons
        nx = cx0 + int(round(ample)); dst = work[ty0:ty1, nx:nx + bloc.shape[1]]; dst[:] = np.where(bloc.astype(int).sum(axis=2, keepdims=True) < fons.sum() - 24, bloc, dst)
    posa_glifs(pag, work, gl, c['x1'], base, tinta, fons)
    return 'glifs'

def E(pag, work, cars):
    """Esborra del tot les línies de la marca (queden en blanc, del color del fons)."""
    for f in sorted({c['fila'] for c in cars}):
        cc = [c for c in cars if c['fila'] == f]
        x0 = int(min(c['x0'] for c in cc)) - 4; x1 = int(max(c['x1'] for c in cc)) + 5; y0 = int(min(c['y0'] for c in cc)) - 3; y1 = int(max(c['y1'] for c in cc)) + 4
        tinta, fons = colors(pag, x0, y0, x1, y1); work[y0:y1, x0:x1] = fons
    return 'esborrat'

def FR1(pag, work, cars, des_de, num, den, nth=0):
    """Refà UNA fracció senzilla (la que té `des_de` al numerador) amb numerador i denominador nous.
       Si la barra canvia d'amplada, tot el que hi ha a la dreta dins de la mateixa línia es desplaça."""
    T = pag.troba(cars, des_de, nth); col = T[0]['col']; em = pag.mida*pag.pxpt; yn = T[0]['base']
    xT0, xT1 = T[0]['x0'], T[-1]['x1']
    sota = [f for f in pag.files if f[0]['col'] == col and f[0]['s'] >= .85*pag.mida and 1.0*em < f[0]['base'] - yn < 1.9*em and any(q['x0'] < xT1 + 4 and q['x1'] > xT0 - 4 for q in f)]
    yd = min(f[0]['base'] for f in sota)
    zona = pag.gris[int(yn) + 2:int(yd - .6*em), :]; ys = np.where((zona[:, int(xT0) + 2:int(xT1) - 2] < 150).mean(axis=1) > .8)[0]
    by0 = int(yn) + 2 + ys.min(); by1 = int(yn) + 2 + ys.max() + 1; fila_b = pag.gris[by0, :] < 150
    bx0 = int(xT0) + 2; bx1 = int(xT1) - 2
    while fila_b[bx0 - 1]: bx0 -= 1
    while fila_b[bx1]: bx1 += 1
    perfil = pag.img[by0:by1, (bx0 + bx1)//2].copy()
    gn = glifs(pag, num, pag.mida, prop=(xT0, yn)); gd = glifs(pag, den, pag.mida, prop=(xT0, yd))
    if gn is None or gd is None: raise LookupError('falten signes per a la fracció')
    wn = sum(g[1] for g in gn); wd = sum(g[1] for g in gd)
    dins_n = [c for c in pag.files[T[0]['fila']] if c['x0'] >= bx0 - 3 and c['x1'] <= bx1 + 3]; dins_d = [c for f in sota if f[0]['base'] == yd for c in f if c['x0'] >= bx0 - 3 and c['x1'] <= bx1 + 3]
    vora = max(1.0, bx0 - min(min(c['x0'] for c in dins_n), min(c['x0'] for c in dins_d)) + 1)        # quant sobresurt la barra per cada banda
    wb = int(round(max(wn, wd) + 2*vora)); dd = wb - (bx1 - bx0)
    y0 = int(yn - .95*em) - 3; y1 = int(yd + .36*em)
    tinta, fons = colors(pag, bx0, int(yn - .8*em), bx1, int(yd + .3*em))
    if dd:
        gf = float(fons @ np.array([.114, .587, .299])); limit = pag.W if col else int(pag.W/2) + 40; cx0 = bx1 + 1; cx1 = cx0 + 8
        while cx1 < limit - 1 and (cv2.cvtColor(work[y0:y1, cx1:min(limit, cx1 + 34)], cv2.COLOR_BGR2GRAY) < gf - 28).any(): cx1 += 8
        bloc = work[y0:y1, cx0:cx1].copy(); work[y0:y1, cx0:cx1] = fons
        dst = work[y0:y1, cx0 + dd:cx1 + dd]; dst[:] = np.where(bloc.astype(int).sum(axis=2, keepdims=True) < fons.sum() - 24, bloc, dst)
    work[int(yn - .95*em):y1, bx0 - 1:bx1 + 1 + max(0, dd)] = fons
    work[by0:by1, bx0:bx0 + wb] = perfil[:, None, :]
    posa_glifs(pag, work, gn, bx0 + (wb - wn)/2, yn, tinta, fons); posa_glifs(pag, work, gd, bx0 + (wb - wd)/2, yd, tinta, fons)
    return 'glifs'

def RF(pag, work, cars, des_de, nou, nth=0):
    """Des de la fracció que conté `des_de` fins al final de la línia, es refà tot amb signes de la pàgina.
       `nou` és una llista: text normal (va a la línia de base) o ('f', numerador, denominador)."""
    T = pag.troba(cars, des_de, nth); col = T[0]['col']; em = pag.mida*pag.pxpt; yn = T[0]['base']
    xT0, xT1 = T[0]['x0'], T[-1]['x1']
    sota = [f for f in pag.files if f[0]['col'] == col and f[0]['s'] >= .85*pag.mida and 1.0*em < f[0]['base'] - yn < 1.9*em and any(q['x0'] < xT1 and q['x1'] > xT0 for q in f)]
    yd = min(f[0]['base'] for f in sota)                                              # línia de base del denominador
    mig = [f for f in pag.files if f[0]['col'] == col and yn + 2 < f[0]['base'] < yd - 2 and f[0]['s'] >= .85*pag.mida and any(c['t'] == '=' for c in f)]
    base = min((f[0]['base'] for f in mig), key=lambda b: abs(b - (yn + yd)/2))       # línia de base principal (la dels «=»)
    # la barra de la fracció vella
    zona = pag.gris[int(yn) + 2:int(yd - .6*em), :]; ys = np.where((zona[:, int(xT0):int(xT1)] < 150).mean(axis=1) > .8)[0]
    by0 = int(yn) + 2 + ys.min(); by1 = int(yn) + 2 + ys.max() + 1; fila_b = pag.gris[by0, :] < 150
    bx0 = int(xT0); bx1 = int(xT1)
    while fila_b[bx0 - 1]: bx0 -= 1
    while fila_b[bx1]: bx1 += 1
    den = [c for f in sota if f[0]['base'] == yd for c in f if c['x0'] >= bx0 - 2 and c['x1'] <= bx1 + 2]
    num = [c for c in pag.files[T[0]['fila']] if c['x0'] >= bx0 - 2 and c['x1'] <= bx1 + 2]
    vora = bx0 - min(min(c['x0'] for c in num), min(c['x0'] for c in den))            # quant sobresurt la barra
    perfil = pag.img[by0:by1, (bx0 + bx1)//2].copy()
    y0 = int(yn - .9*em); y1 = int(yd + .34*em)
    resta = [c for c in pag.chars if c['col'] == col and c['x0'] >= bx0 - 1 and y0 <= c['base'] <= y1 + 2]
    xfi = int(max(c['x1'] for c in resta)) + 6
    seg = min((c for c in pag.files[next(i for i, f in enumerate(pag.files) if f[0]['base'] == base and f[0]['col'] == col)] if c['x0'] >= bx1 - 1), key=lambda c: c['x0'], default=None)
    buit = (seg['x0'] - bx1) if seg is not None else 3.0                               # espai entre la barra i el signe següent
    tinta, fons = colors(pag, bx0, y0, xfi, y1)
    work[y0:y1, bx0 - 1:xfi] = fons
    x = float(bx0)
    for k, item in enumerate(nou):
        if isinstance(item, tuple):
            gn = glifs(pag, item[1], pag.mida, prop=(x, yn)); gd = glifs(pag, item[2], pag.mida, prop=(x, yd))
            if gn is None or gd is None: raise LookupError(f'falten signes per a la fracció {item}')
            wn = sum(g[1] for g in gn); wd = sum(g[1] for g in gd); wb = max(wn, wd) + 2*abs(vora)
            xb0 = int(round(x)); xb1 = int(round(x + wb)); work[by0:by1, xb0:xb1] = perfil[:, None, :]
            posa_glifs(pag, work, gn, x + (wb - wn)/2, yn, tinta, fons); posa_glifs(pag, work, gd, x + (wb - wd)/2, yd, tinta, fons)
            x += wb + buit
        else:
            seguent = nou[k + 1] if k + 1 < len(nou) else None
            g = glifs(pag, item, pag.mida, '2' if k else None, '2' if seguent is not None else None, prop=(x, base))
            if g is None: raise LookupError(f'falten signes per a «{item}»')
            x = posa_glifs(pag, work, g, x, base, tinta, fons)
    return 'glifs'

def R(pag, work, cars, des_de, nou, nth=0, banda=(-1.5, 1.25), marge=3, fins=None):
    """Des del caràcter `des_de` fins al final de la línia: s'esborra tot (fraccions incloses) i s'hi posa `nou`."""
    T = pag.troba(cars, des_de, nth); col = T[0]['col']
    principal = [f for f in pag.files if f[0]['col'] == col and f[0]['s'] >= .85*pag.mida and abs(f[0]['base'] - T[0]['base']) < 1.6*23.6]
    base = min((f[0]['base'] for f in principal if any(c['t'] in '=' or c['t'] == 'l' for c in f)), key=lambda b: abs(b - T[0]['base']))
    x0 = int(T[0]['x0']) - marge; y0 = int(base + banda[0]*23.6); y1 = int(base + banda[1]*23.6)
    dins = [c for c in pag.chars if c['col'] == col and c['x0'] >= x0 - 1 and y0 <= (c['y0'] + c['y1'])/2 <= y1]
    x1 = int(fins if fins else max(c['x1'] for c in dins)) + 5
    tinta, fons = colors(pag, x0, y0, x1, y1)
    work[y0:y1, x0:x1] = fons
    compon([nou]); dibuixa(work, nou, escala(pag, pag.mida), x0 + marge, base, tinta, GRUIX)
    return 'latex'

# ───────── aplicar les receptes i treure'n els pegats ─────────
def cars_de(pag, key, m=None, creix=3):
    out = []
    for i, q in enumerate(MARQ[key]):
        if q[0] != pag.rel or (m is not None and i != m): continue
        x0, y0 = q[1]*pag.W/100 - creix, q[2]*pag.H/100 - creix; x1, y1 = (q[1] + q[3])*pag.W/100 + creix, (q[2] + q[4])*pag.H/100 + creix
        out += [c for c in pag.chars if x0 <= (c['x0'] + c['x1'])/2 <= x1 and y0 <= (c['y0'] + c['y1'])/2 <= y1]
    return out
def fila_amb(pag, key, text, nth=0):
    """Els caràcters de la fila que conté `text`, la més propera a la primera marca de l'errada."""
    q = next(q for q in MARQ[key] if q[0] == pag.rel); yq = (q[2] + q[4]/2)*pag.H/100; xq = (q[1] + q[3]/2)*pag.W/100
    cands = [f for f in pag.files if norm(text) in pag.text(f) and (f[0]['col'] == int(xq >= pag.W/2))]
    cands.sort(key=lambda f: abs(f[0]['base'] - yq)); f = cands[nth]
    return [c for c in pag.chars if c['col'] == f[0]['col'] and abs(c['base'] - f[0]['base']) < 1.2*23.6 and abs((c['y0']+c['y1'])/2 - (f[0]['y0']+f[0]['y1'])/2) < 1.6*23.6]

_pags = {}
def pagina(u, rel):
    if (u, rel) not in _pags: _pags[(u, rel)] = Pagina(u, rel)
    return _pags[(u, rel)]

def fes(key, ops):
    """ops: llista de (operació, arguments). Torna la llista de pegats: (imatge, x, y, w, h, retall)."""
    u = key.split('/')[0]; com = []
    per_img = collections.OrderedDict()
    for nom, a in ops:
        a = dict(a); img = a.pop('img', MARQ[key][a.get('m') or 0][0]); pag = pagina(u, img)
        work = per_img.setdefault(img, pag.img.copy())
        cars = fila_amb(pag, key, a.pop('fila'), a.pop('nfila', 0)) if 'fila' in a else cars_de(pag, key, a.pop('m', None))
        a.pop('m', None)
        com.append({'S': S, 'SUB': SUB, 'R': R, 'RF': RF, 'SUP': SUP, 'E': E, 'INS': INS, 'COPG': COPG, 'APP': APP, 'FR1': FR1}[nom](pag, work, cars, **a))
    out = []
    for img, work in per_img.items():
        pag = pagina(u, img)
        # neteja final: taquetes d'1 o 2 píxels que han quedat soltes on abans hi havia fons (restes de vores de lletres)
        canvi = np.abs(work.astype(int) - pag.img.astype(int)).sum(axis=2) > 6
        if canvi.any():
            ys, xs = np.where(canvi); y0, y1, x0, x1 = max(0, ys.min() - 3), ys.max() + 4, max(0, xs.min() - 3), xs.max() + 4
            g = cv2.cvtColor(work[y0:y1, x0:x1], cv2.COLOR_BGR2GRAY).astype(int); gf = int(np.percentile(g, 90))
            n, lab, st, _ = cv2.connectedComponentsWithStats((g < gf - 22).astype(np.uint8), connectivity=8); fons = np.median(work[y0:y1, x0:x1][g >= gf - 4], axis=0)
            for k in range(1, n):
                if st[k][4] <= 2 and canvi[y0:y1, x0:x1][lab == k].all():
                    work[y0:y1, x0:x1][cv2.dilate((lab == k).astype(np.uint8), np.ones((3, 3), np.uint8)) > 0] = fons
        dif = (np.abs(work.astype(int) - pag.img.astype(int)).sum(axis=2) > 6).astype(np.uint8)
        junt = cv2.dilate(dif, np.ones((9, 161), np.uint8))            # els trossos d'una mateixa línia formen un sol pegat
        n, lab, st, _ = cv2.connectedComponentsWithStats(junt)
        for i in range(1, n):
            ys, xs = np.where((lab == i) & (dif > 0))                      # la caixa es mesura sobre els píxels que han canviat de veritat
            if not len(ys): continue
            x = max(0, int(xs.min()) - 3); y = max(0, int(ys.min()) - 3); x1 = min(pag.W, int(xs.max()) + 4); y1 = min(pag.H, int(ys.max()) + 4); w, h = x1 - x, y1 - y
            out.append((img, int(x), int(y), int(w), int(h), work[y:y + h, x:x + w].copy(), work))
    fes.com = com
    return out
