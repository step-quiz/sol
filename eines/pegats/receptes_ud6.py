# Receptes de la UD6 (errades del solucionari de 4t Aplicades).
import numpy as np, cv2
import pegats as M
from receptes_ud5 import _u795

def fraccio_cel(pag, work, xc, base, num, den, neg=True, mida=8.0, mida_m=8.0, vora=2.5, gap=1.0, dn=13.0, dd=11.3, puja=1):
    """Una fracció apilada dins d'una cel·la de taula (amb el signe menys al davant, si neg): el menys i la barra a la mateixa alçada."""
    tinta, fons = M.colors(pag, int(xc) - 26, int(base) - 20, int(xc) + 26, int(base) + 6); M._color(tinta)
    gm = M.glifs(pag, '-', mida_m, None, '5', (xc, base)) if neg else []
    gn = M.glifs(pag, num, mida, prop=(xc, base)); gd = M.glifs(pag, den, mida, prop=(xc, base))
    wm = (gm[0][0]['x1'] - gm[0][0]['x0']) if neg else 0; wn = sum(g[1] for g in gn); wd = sum(g[1] for g in gd); wb = max(wn, wd) + 2*vora
    total = wm + (gap if neg else 0) + wb; X = xc - total/2
    if neg:
        c = gm[0][0]; P = gm[0][2]; y0, y1 = int(c['y0']), int(np.ceil(c['y1'])) + 1; g = P.gris[y0:y1, int(c['x0']) + 3:int(c['x1']) - 3].min(axis=1)
        tall = y0 + int(np.where(g < 190)[0].min()) - c['base']; M.posa_glifs(pag, work, gm, X, base - puja, tinta, fons); X += wm + gap
    else: tall = -8.0
    yb = int(round(base + tall - puja)); fr = M._model_fraccio(pag)
    work[yb:yb + len(fr['perfil']), int(round(X)):int(round(X + wb))] = fr['perfil'][:, None, :]
    M.posa_glifs(pag, work, gn, X + (wb - wn)/2, base - dn, tinta, fons); M.posa_glifs(pag, work, gd, X + (wb - wd)/2, base + dd, tinta, fons)

def _taula51(pag, work, cars):
    # l'última columna s'eixampla 12 px (a la dreta de la taula hi ha lloc)
    y0, y1, xm, xe, dx = 428, 534, 527, 566, 18
    bl = work[y0:y1, xm:xe].copy(); col = work[y0:y1, xm].copy()
    work[y0:y1, xm + dx:xe + dx] = bl; work[y0:y1, xm:xm + dx] = col[:, None, :]
    fons = np.array([255, 255, 255], np.uint8)
    # el «2» de la fila de les x, tornat a centrar
    r = work[444:470, 546:570].copy(); work[444:470, 546:570] = fons; work[444:470, 537:561] = np.minimum(work[444:470, 537:561], r)
    # les tres cel·les noves
    work[488:520, 275:330] = fons; fraccio_cel(pag, work, 302, 510.6, '56', '3')
    work[488:520, 424:466] = fons; fraccio_cel(pag, work, 445, 510.6, '1', '3')
    work[488:520, 545:565] = fons; fraccio_cel(pag, work, 547, 510.6, '8', '3')

def _f749(pag, work, cars):
    M.MOU(pag, work, cars, (878, 8, 918, 82), dx=22)
    tinta, fons = M.colors(pag, 815, 20, 900, 80); M._color(tinta)
    g = M.glifs(pag, '-', 9.0, None, '9', (876, 52.8)); M.posa_glifs(pag, work, g, 876.5, 52.8, tinta, fons)

def _graf100(pag, work, cars):
    """La gràfica: l'altura en funció de la velocitat, h = v²/20 (cada quadret, 5 unitats)."""
    M.neteja_grafica(pag, work, (171, 36, 478, 283), treure=[(292, 72, 384, 104), (180, 208, 197, 232), (224, 258, 241, 280)])
    x0, y0, cw, ch = 203.5, 249.6, 30.17, 30.2
    M.traca(work, [(x0 + cw*v/5, y0 - ch*(v*v/20)/5) for v in np.linspace(0, 26.46, 400)], retall=(0, 38, 2000, 2000))
    # els rètols dels eixos: es canvien de lloc, girats (píxels originals)
    def caixa(x0, y0, x1, y1):
        g = pag.gris[y0:y1, x0:x1]; ys, xs = np.where(g < 200); return x0 + xs.min(), y0 + ys.min(), x0 + xs.max() + 1, y0 + ys.max() + 1
    vx0, vy0, vx1, vy1 = caixa(140, 88, 170, 236); ax0, ay0, ax1, ay1 = caixa(392, 284, 478, 310)
    vel = pag.img[vy0:vy1, vx0:vx1].copy(); alt = pag.img[ay0:ay1, ax0:ax1].copy()
    work[vy0 - 1:vy1 + 1, vx0 - 1:vx1 + 1] = 255; work[ay0 - 1:ay1 + 1, ax0 - 1:ax1 + 1] = 255
    # línia de base de cadascun: Velocidad (vertical) a la columna on acaba la V; Altura (horitzontal) a la fila on acaba la A
    bv = int(np.where(pag.gris[205:224, vx0:vx1].min(axis=0) < 170)[0].max()) + vx0 + 1      # columna de la línia de base del rètol vertical
    ba = int(np.where(pag.gris[ay0:ay1, 396:407].min(axis=1) < 170)[0].max()) + ay0 + 1      # fila de la línia de base del rètol horitzontal
    nou_alt = np.rot90(alt, 1).copy(); nou_vel = np.rot90(vel, -1).copy()
    # «Altura (m)» vertical, on era «Velocidad», centrat i amb la mateixa línia de base
    cyc = (vy0 + vy1)//2; px = bv - (ba - ay0); py = cyc - nou_alt.shape[0]//2
    work[py:py + nou_alt.shape[0], px:px + nou_alt.shape[1]] = np.minimum(work[py:py + nou_alt.shape[0], px:px + nou_alt.shape[1]], nou_alt)
    # «Velocidad (m/s)» horitzontal, on era «Altura», arrenglerat a la dreta i amb la mateixa línia de base
    px2 = ax1 - nou_vel.shape[1]; py2 = ba - (bv - vx0)
    work[py2:py2 + nou_vel.shape[0], px2:px2 + nou_vel.shape[1]] = np.minimum(work[py2:py2 + nou_vel.shape[0], px2:px2 + nou_vel.shape[1]], nou_vel)
    # els nombres dels eixos i l'etiqueta de la corba
    tinta, f = M.colors(pag, 292, 72, 384, 104); M._color(tinta)
    M._escriu(pag, work, ['5'], 183.7, 225.7, tinta, f, 7.0)
    M._escriu(pag, work, ['5'], 227.7, 275.1, tinta, f, 7.0)
    lab = {c['t']: c for c in pag.chars if abs(c['s'] - 7) < .1 and abs(c['base'] - 94.5) < 1}
    h = dict(lab['h']); h['x0'] = 368.05                                 # (la caixa de la h comença a 367,97: així no s'emporta la vora del 0 del costat)
    M._escriu(pag, work, [('g', h), ' = ', ('g', lab['v']), ('e', '2', 4.8), '/20'], 358, 128, tinta, f, 7.0)
    return 'py'

REC = {
 'apl-ud6/U7.45#0': [('S', dict(zona=(1058, 1015, 1100, 1042), vell='-2', nou='2', alinea='c', mou=False, lleu=True)),
                     ('S', dict(zona=(998, 1015, 1040, 1042), vell='-1', nou='1', alinea='c', mou=False, lleu=True))],
 'apl-ud6/U7.46#0': [('S', dict(fila='elvérticees', vell='1', nou='2', nth=1))],
 'apl-ud6/U7.47#0': [('LIN', dict(zona=(130, 350, 215, 410), x=138.6, base=386.3, parts=['t:(0,45; 0)'])),
                     ('LIN', dict(zona=(135, 445, 505, 510), x=138.6, base=483.5, parts=['t:Ecuación: ', 'y = -x', ('e', '2'), ' - 4x + 2'])),
                     ('RECT', dict(rect=(165, 541, 270, 552))),
                     ('LIN', dict(zona=(135, 545, 272, 605), x=138.6, base=579.8, parts=['t:en (-4,45; 0).']))],
 'apl-ud6/U7.49#0': [('PY', dict(f=_f749))],
 'apl-ud6/U7.51#0': [('S', dict(zona=(338, 490, 378, 515), vell='-9', nou='-11', alinea='c', mou=False, lleu=True)),
                     ('PY', dict(f=_taula51))],
 'apl-ud6/U7.95#0': _u795,
 'apl-ud6/U7.100#0': [('PY', dict(m=1, f=_graf100))],
}
