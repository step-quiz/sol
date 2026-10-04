#!/usr/bin/env python3
"""La base de totes les eines de posició: on és cada lletra de cada imatge.

   Cada imatge  uN/<tema>/data/full-K.png  és un retall d'una pàgina del PDF del solucionari (source/).
   Aquí es casa la imatge amb la seva pàgina (`casa`) i es llegeix la capa de text del PDF (`caracters`):
   de cada caràcter, la caixa, la línia de base, la lletra i la mida, ja en píxels de la imatge.
   A més: `localitza` (primera versió del cercador d'errades), `ajusta` i `full` (fulls de revisió)."""
import pdfplumber, cv2, numpy as np, json, re, glob, os, subprocess, sys, collections, logging, shutil
from PIL import Image
logging.getLogger('pdfminer').setLevel(logging.ERROR)
AQUI = os.path.dirname(os.path.abspath(__file__)); sys.path.insert(0, os.path.join(AQUI, '..'))
import camins, dades
SITE = camins.ARREL                                  # l'arrel del repositori
REND = os.path.join(camins.SORTIDA, 'pagines')       # les pàgines dels PDF passades a imatge (memòria cau; no es puja)
D = dades.carrega()
CAT = D['CAT']

def pdf_de(u):
    fs = glob.glob(os.path.join(camins.PDFS, '*Unitat_%s.pdf' % u[1:]))
    if not fs: raise FileNotFoundError(f'no trobo el PDF de la unitat {u[1:]} a {camins.PDFS}')
    return fs[0]
def renders(u):
    """Les pàgines del PDF de la unitat, a 200 ppp. Només cal quan s'ha de casar una imatge que no és a casa.json."""
    d = os.path.join(REND, u); os.makedirs(d, exist_ok=True)
    if not glob.glob(d + '/*.png'):
        if not shutil.which('pdftoppm'): raise RuntimeError('cal el programa pdftoppm (paquet poppler-utils) per casar una imatge nova amb el PDF')
        subprocess.run(['pdftoppm', '-r', '200', '-gray', '-png', pdf_de(u), d + '/p'], stderr=subprocess.DEVNULL, check=True)
    return sorted(glob.glob(d + '/*.png'))

_CASA = f'{AQUI}/casa.json'
CASA = json.load(open(_CASA)) if os.path.exists(_CASA) else {}
_petits = {}
def _petit(f, s):
    k = (f, s)
    if k not in _petits:
        R = cv2.imread(f, 0)
        _petits[k] = None if R.shape[1] > 1500 else cv2.resize(R, None, fx=.25*s, fy=.25*s, interpolation=cv2.INTER_AREA)
    return _petits[k]
def casa(u, rel):
    """(índex de pàgina 0.., escala, ox, oy, puntuació): PNG[x,y] = render200dpi*escala[x+ox, y+oy]"""
    k = u + '/' + rel
    if k in CASA: return CASA[k]
    P = cv2.imread(f'{SITE}/{u}/{rel}', 0); h, w = P.shape
    T = P[h//4:h*3//4, w//5:w*4//5]; Ts = cv2.resize(T, None, fx=.25, fy=.25, interpolation=cv2.INTER_AREA)
    best = (0,)
    for i, f in enumerate(renders(u)):
        for s in (1.0, 0.967):
            Rs = _petit(f, s)
            if Rs is None or Rs.shape[0] < Ts.shape[0] or Rs.shape[1] < Ts.shape[1]: continue
            m = cv2.minMaxLoc(cv2.matchTemplate(Rs, Ts, cv2.TM_CCOEFF_NORMED))[1]
            if m > best[0]: best = (m, i, s)
    _, i, s0 = best
    R = cv2.imread(renders(u)[i], 0); fin = (0,)
    for s in np.linspace(s0 - .006, s0 + .006, 7):
        Rs = R if abs(s - 1) < 1e-6 else cv2.resize(R, None, fx=s, fy=s, interpolation=cv2.INTER_AREA)
        mx, loc = cv2.minMaxLoc(cv2.matchTemplate(Rs, T, cv2.TM_CCOEFF_NORMED))[1::2]
        if mx > fin[0]: fin = (mx, s, loc)
    mx, s, loc = fin
    CASA[k] = [i, round(float(s), 4), int(loc[0] - w//5), int(loc[1] - h//4), round(float(mx), 3)]
    json.dump(CASA, open(_CASA, 'w')); return CASA[k]

_pdfs = {}
def caracters(u, rel):
    """Caràcters de la pàgina, en píxels del PNG: dict(t, x0, x1, y0, y1, f, s)"""
    i, s, ox, oy, _ = casa(u, rel)
    if u not in _pdfs: _pdfs[u] = pdfplumber.open(pdf_de(u))
    pg = _pdfs[u].pages[i]; k = 200/72*s
    W, H = Image.open(f'{SITE}/{u}/{rel}').size
    out = []
    for c in pg.chars:
        if not c['text'].strip(): continue
        x0, x1, y0, y1 = c['x0']*k - ox, c['x1']*k - ox, c['top']*k - oy, c['bottom']*k - oy
        if x1 < 0 or x0 > W or y1 < 0 or y0 > H: continue
        out.append(dict(t=c['text'], x0=x0, x1=x1, y0=y0, y1=y1, f=c['fontname'].split('+')[-1], s=round(c['size'], 1),
                        base=(float(pg.height) - c['matrix'][5])*k - oy, org=c['matrix'][4]*k - ox))
    return out, (W, H), pg.width*k/2 - ox

def files(chs):
    """Agrupa caràcters en files visuals (una fracció sencera és una sola fila)."""
    chs = sorted(chs, key=lambda c: c['y0']); rows = []; cur = None
    for c in chs:
        a = c['y0'] + .18*(c['y1']-c['y0']); b = c['y1'] - .18*(c['y1']-c['y0'])
        if cur is None or a > cur['b']:
            cur = dict(a=a, b=b, ch=[c]); rows.append(cur)
        else:
            cur['ch'].append(c); cur['b'] = max(cur['b'], b)
    for r in rows:
        r['ch'].sort(key=lambda c: c['x0']); r['y0'] = min(c['y0'] for c in r['ch']); r['y1'] = max(c['y1'] for c in r['ch'])
        r['x0'] = min(c['x0'] for c in r['ch']); r['x1'] = max(c['x1'] for c in r['ch']); r['txt'] = ''.join(c['t'] for c in r['ch'])
    return rows

def flux(u, n):
    """Files de les imatges de l'exercici, en ordre de lectura (pàgina, columna, y), amb les insígnies de número marcades."""
    out = []
    for k, rel in enumerate(CAT[u][str(n)]):
        chs, (W, H), mig = caracters(u, rel)
        for col in (0, 1):
            cc = [c for c in chs if ((c['x0']+c['x1'])/2 >= mig) == bool(col)]
            for r in files(cc):
                r['img'] = rel; r['k'] = k; r['col'] = col; r['WH'] = (W, H)
                # insígnia d'exercici: número en Raleway petit, a l'esquerra de la columna
                ins = [c for c in r['ch'] if 'Raleway' in c['f'] and 7 <= c['s'] <= 9 and c['t'].isdigit()]
                r['ins'] = None
                if ins:
                    ins.sort(key=lambda c: c['x0']); num = ''; last = None
                    for c in ins:
                        if last is None or c['x0'] - last < 9: num += c['t']; last = c['x1']
                    r['ins'] = int(num) if num else None
                out.append(r)
    return out

def regio(u, n, lloc, enunciat=False):
    """Files de l'exercici n (des de la seva insígnia fins a la següent) i, si es pot, només les de l'apartat."""
    fl = flux(u, n)
    i0 = next((i for i, r in enumerate(fl) if r['ins'] == n), None)
    if i0 is None: return fl, 'sense-insignia'
    i1 = next((i for i in range(i0 + 1, len(fl)) if fl[i]['ins'] is not None and fl[i]['ins'] != n), len(fl))
    ex = fl[i0:i1]; nota = 'exercici'
    m = re.match(r'^([a-z])\)', lloc or '')
    if m:
        def etiqueta(r):
            t = r['txt'].replace(' ', '')
            mm = re.match(r'^(?:\d{1,3})?([a-z])\)', t)
            return mm.group(1) if mm else None
        et = [(i, etiqueta(r)) for i, r in enumerate(ex)]
        on = [i for i, e in et if e == m.group(1)]
        if on:
            a = on[0] if enunciat else on[-1]
            b = next((i for i, e in et if i > a and e is not None), len(ex))
            ex = ex[a:b]; nota = 'apartat'
    return ex, nota

SUBS = [(r'\\dlim|\\lim', 'lim'), (r'\\mathrm\{([A-Za-z]+)\}', r'\1'), (r'\\lambda', 'λ'), (r'\\pi', 'π'), (r'\\R\b', 'R'),
        (r'\\(arccos|cos|sin|ln|log|tan)\b', r'\1'), (r'\\text\{([^}]*)\}', r'\1'), (r'\\overline\{([^}]*)\}', r'\1'),
        (r'\\vec\{([^}]*)\}', r'\1'), (r'\\overrightarrow\{([^}]*)\}', r'\1'), (r'\\sqrt\[(\d)\]', r'\1'), (r'\\[a-zA-Z]+', ' '), (r'\\.', ' ')]
def pla(tex):
    """El text «On diu» sense LaTeX: només el que hi ha d'haver imprès."""
    parts = tex.split('$'); out = ''
    for i, p in enumerate(parts):
        if i % 2 == 0: p = re.sub(r'\([^()]*[a-zà-ú]{3,}[^()]*\)\s*$', ' ', p)     # nota final entre parèntesis: no és a la imatge
        out += ' ' + p
    for a, b in SUBS: out = re.sub(a, b, out)
    return out
def ms(s): return collections.Counter(ch for ch in s.lower() if ch.isalnum())
def f1(T, W):
    inter = sum((T & W).values()); 
    if not inter: return 0
    p = inter / max(1, sum(W.values())); r = inter / max(1, sum(T.values())); return 2*p*r/(p+r)

def localitza(u, n, e):
    lloc = '' if '(enunciat)' in e['t'] else re.sub(r'^Exercici\s+\d+\s*,?\s*', '', e['t'])
    rows, nota = regio(u, n, lloc, '(enunciat)' in e['t'])
    T = ms(pla(e['ondiu'])); best = (0, None)
    for i, r in enumerate(rows):
        ch = r['ch']
        # una fila, amb el tram horitzontal que millor s'hi assembla
        for a in range(len(ch)):
            W = collections.Counter()
            for b in range(a, len(ch)):
                t = ch[b]['t'].lower()
                for x in t:
                    if x.isalnum(): W[x] += 1
                sc = f1(T, W)
                if sc > best[0]: best = (sc, [(r, a, b)])
        # dues, tres o quatre files senceres seguides (mateixa imatge i columna)
        W = ms(r['txt']); grup = [(r, 0, len(ch) - 1)]
        for j in range(i + 1, min(i + 4, len(rows))):
            r2 = rows[j]
            if r2['img'] != r['img'] or r2['col'] != r['col']: break
            W = W + ms(r2['txt']); grup = grup + [(r2, 0, len(r2['ch']) - 1)]
            sc = f1(T, W) - .02
            if sc > best[0]: best = (sc, list(grup))
    sc, grup = best
    if not grup: return None
    xs0 = min(g[0]['ch'][g[1]]['x0'] for g in grup); ys0 = min(min(c['y0'] for c in g[0]['ch'][g[1]:g[2]+1]) for g in grup)
    xs1 = max(max(c['x1'] for c in g[0]['ch'][g[1]:g[2]+1]) for g in grup); ys1 = max(max(c['y1'] for c in g[0]['ch'][g[1]:g[2]+1]) for g in grup)
    return dict(img=grup[0][0]['img'], box=[xs0, ys0, xs1, ys1], sc=round(sc, 2), nota=nota, WH=grup[0][0]['WH'],
                txt=' | '.join(''.join(c['t'] for c in g[0]['ch'][g[1]:g[2]+1]) for g in grup))

def ajusta(u, cand, marge=7):
    """Ajusta la caixa a la tinta real del PNG (i hi deixa un marge)."""
    im = cv2.imread(f"{SITE}/{u}/{cand['img']}", 0); H, W = im.shape
    x0, y0, x1, y1 = [int(round(v)) for v in cand['box']]
    x0 = max(0, x0 - 3); y0 = max(0, y0 - 3); x1 = min(W, x1 + 3); y1 = min(H, y1 + 3)
    sub = im[y0:y1, x0:x1] < 170
    if sub.any():
        ys = np.where(sub.any(axis=1))[0]; xs = np.where(sub.any(axis=0))[0]
        x0, x1, y0, y1 = x0 + xs[0], x0 + xs[-1] + 1, y0 + ys[0], y0 + ys[-1] + 1
    return [max(0, x0 - marge), max(0, y0 - marge), min(W, x1 + marge), min(H, y1 + marge)]

def full(items, path, cols=2, cw=760, pad_x=250, pad_y=85):
    """Full de contactes per revisar: cada errada amb la seva caixa dibuixada."""
    tiles = []
    for idx, (key, e, cand, box) in enumerate(items):
        if cand is None:
            t = np.full((120, cw, 3), 255, np.uint8); cv2.putText(t, f'{idx} {key} NO TROBADA', (10, 60), cv2.FONT_HERSHEY_SIMPLEX, .7, (0, 0, 200), 2); tiles.append(t); continue
        u = key.split('/')[0]; im = cv2.imread(f"{SITE}/{u}/{cand['img']}"); H, W = im.shape[:2]
        x0, y0, x1, y1 = box
        cx0 = max(0, x0 - pad_x); cx1 = min(W, x1 + pad_x); cy0 = max(0, y0 - pad_y); cy1 = min(H, y1 + pad_y)
        crop = im[cy0:cy1, cx0:cx1].copy()
        cv2.rectangle(crop, (x0 - cx0, y0 - cy0), (x1 - cx0, y1 - cy0), (30, 30, 220), 2)
        sc = min(1.0, cw / crop.shape[1]); crop = cv2.resize(crop, None, fx=sc, fy=sc, interpolation=cv2.INTER_AREA)
        t = np.full((crop.shape[0] + 30, cw, 3), 255, np.uint8); t[30:, :crop.shape[1]] = crop
        lloc = re.sub(r'^Exercici\s+', '', e['t']).encode('ascii', 'replace').decode()
        cv2.rectangle(t, (0, 0), (cw, 28), (235, 235, 235), -1)
        cv2.putText(t, f"[{idx}] {key}: {lloc}   f1={cand['sc']} {cand['nota']} {cand['img'].replace('/data/full-', '#').replace('.png', '')}", (6, 20), cv2.FONT_HERSHEY_SIMPLEX, .55, (0, 0, 0), 1, cv2.LINE_AA)
        tiles.append(t)
    colh = [0]*cols; place = []
    for t in tiles:
        c = colh.index(min(colh)); place.append((c, colh[c])); colh[c] += t.shape[0] + 10
    sheet = np.full((max(colh), cols*cw + (cols - 1)*14, 3), 120, np.uint8)
    for t, (c, y) in zip(tiles, place): sheet[y:y + t.shape[0], c*(cw + 14):c*(cw + 14) + cw] = t
    cv2.imwrite(path, sheet); return sheet.shape
