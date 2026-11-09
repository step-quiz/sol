"""On és cada lletra de cada imatge.

   Cada imatge  apl-udN/<tema>/data/full-K.png  és una pàgina del PDF de source/ retallada amb la caixa de
   eines/retalls.json (el mateix càlcul que eines/retalla.py). Aquí es llegeix la capa de text del PDF:
   de cada caràcter, la caixa, la línia de base, la lletra i la mida, ja en píxels de la imatge.
   Les marques (el rectangle de cada errada) surten de errades.js."""
import json, logging, os, subprocess, sys
import pdfplumber
from PIL import Image
logging.getLogger('pdfminer').setLevel(logging.ERROR)
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..'))
import camins

SITE = camins.ARREL
RET = {u: v for u, v in json.load(open(os.path.join(SITE, 'eines', 'retalls.json'), encoding='utf-8')).items() if not u.startswith('_')}
AMPLADA = 1208                     # les imatges fan sempre aquesta amplada (eines/retalla.py)

def norm(t):
    return t.replace('−', '-').replace('–', '-').replace('—', '-').replace('’', "'").lower()

def pagina_pdf(u, rel):
    """El número de pàgina del PDF (des d'1) d'una imatge."""
    tema, _, fitxer = rel.split('/')
    return RET[u]['temes'][tema][int(fitxer[5:-4]) - 1]

def casa(u, rel):
    """(índex de pàgina, escala respecte de 200 ppp, ox, oy, 1). Píxel de la imatge = punt del PDF · 200/72 · escala − (ox, oy)"""
    cx = RET[u]['caixa']; s = AMPLADA/(cx[2] - cx[0])
    return [pagina_pdf(u, rel) - 1, 300*s/200, round(cx[0]*s), round(cx[1]*s), 1.0]

_pdf = None
def caracters(u, rel):
    """Caràcters de la pàgina, en píxels de la imatge: dict(t, x0, x1, y0, y1, f, s, base)."""
    global _pdf
    i, s, ox, oy, _ = casa(u, rel)
    if _pdf is None: _pdf = pdfplumber.open(os.path.join(SITE, RET[u]['pdf']))
    pg = _pdf.pages[i]; k = 200/72*s
    W, H = Image.open(f'{SITE}/{u}/{rel}').size
    out = []
    for c in pg.chars:
        if not c['text'].strip(): continue
        x0, x1, y0, y1 = c['x0']*k - ox, c['x1']*k - ox, c['top']*k - oy, c['bottom']*k - oy
        if x1 < 0 or x0 > W or y1 < 0 or y0 > H: continue
        out.append(dict(t=c['text'], x0=x0, x1=x1, y0=y0, y1=y1, f=c['fontname'].split('+')[-1], s=round(c['size'], 1),
                        base=(float(pg.height) - c['matrix'][5])*k - oy, org=c['matrix'][4]*k - ox))
    return out, (W, H), pg.width*k/2 - ox

CAT = {u: [f'{t}/data/full-{j + 1}.png' for t, ps in v['temes'].items() for j in range(len(ps))] for u, v in RET.items()}

_JS = """
const fs=require('fs'),vm=require('vm');let s=fs.readFileSync(process.argv[1],'utf8');
s=s.replace(/\\bconst\\s+(ERRADES)\\b/,'var $1');const c={};vm.createContext(c);vm.runInContext(s,c);
const out={};for(const k of Object.keys(c.ERRADES))c.ERRADES[k].forEach((e,j)=>{const m=e.marca;if(m&&m.length)out[k+'#'+j]=Array.isArray(m[0])?m:[m]});
console.log(JSON.stringify(out));
"""
def marques():
    """{'apl-ud2/U2.35#0': [[imatge, x, y, w, h], ...]}, tal com són a errades.js."""
    r = subprocess.run(['node', '-e', _JS, os.path.join(SITE, 'errades.js')], capture_output=True, text=True)
    if r.returncode: raise RuntimeError(r.stderr[:400])
    return json.loads(r.stdout)
