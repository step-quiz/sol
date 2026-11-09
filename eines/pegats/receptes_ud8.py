# Receptes de la UD8 (errades del solucionari de 4t Aplicades).
import numpy as np, cv2
import pegats as M

def _c(zona, x, txt): return ('LIN', dict(zona=zona, x=x, parts=[txt], mida=8.0))
def _k(zona, vell, nou, **kw): return ('S', dict(zona=zona, vell=vell, nou=nou, lleu=True, **kw))

def _taula85(pag, work, cars):
    # la segona taula: una columna més a la dreta (A = 6, B = 6)
    y0, y1, xb, xe, dx = 420, 518, 313, 352, 30
    img = pag.img
    work[y0:y1, xb + dx:xe + dx] = img[y0:y1, xb:xe]
    col = img[y0:y1, 306].copy()                                    # una columna de cel·la, sense xifres ni separador
    work[y0:y1, xb:xb + dx] = col[:, None, :]
    work[y0:y1, xb + dx - 1:xb + dx + 1] = img[y0:y1, 311:313]      # el separador entre cel·les
    # les xifres de la columna vella tornen al seu lloc; a la columna nova, dos sisos
    work[436:462, 320:336] = img[436:462, 320:336]; work[482:505, 320:336] = img[482:505, 320:336]
    work[436:462, 349:366] = col[436 - y0:462 - y0, None, :].repeat(17, axis=1); work[482:505, 349:366] = col[482 - y0:505 - y0, None, :].repeat(17, axis=1)
    sis = img[438:460, 168:186].copy()                               # el primer 6 de la fila A
    work[438:460, 350:368] = np.minimum(work[438:460, 350:368], sis); work[483:505, 350:368] = np.minimum(work[483:505, 350:368], sis)

def _eix83(pag, work, cars):
    # dues etiquetes intercanviades a l'eix: es permuten tal qual
    a = (462, 704, 486, 726); b = (501, 704, 525, 726)
    ra = pag.img[a[1]:a[3], a[0]:a[2]].copy(); rb = pag.img[b[1]:b[3], b[0]:b[2]].copy()
    work[a[1]:a[3], a[0]:a[2]] = rb; work[b[1]:b[3], b[0]:b[2]] = ra

REC = {
 'apl-ud8/U8.7#0': [('S', dict(zona=(737, 1310, 945, 1332), vell='12,5', nou='17,5', nth=1))],
 'apl-ud8/U8.9#0': [('S', dict(vell='6', nou='7'))],
 'apl-ud8/U8.9#1': [_k((930, 215, 950, 236), '9', '3'), _c((920, 262, 950, 282), 935.8, '5'), _c((920, 308, 950, 328), 935.8, '6'), _k((920, 354, 950, 375), '49', '20'),
                    _c((995, 215, 1052, 236), 1009.7, '67,5'), _c((995, 262, 1036, 282), 998.6, '187,5'), _c((980, 308, 1036, 328), 998.6, '315'), _c((980, 354, 1052, 375), 998.6, '615'),
                    _c((1084, 215, 1112, 236), 1092.0, '9'), _k((1084, 262, 1112, 282), '29', '14'), _k((1084, 308, 1112, 328), '49', '20'),
                    ('S', dict(zona=(860, 430, 945, 452), vell='37,19', nou='30,75', mou=False)),
                    ('REFRA', dict(caixa=(760, 405, 950, 470), xlim=950, num=['615'], den=['20'], vora=4.4)),
                    ('LIN', dict(zona=(705, 480, 1135, 510), x=711.6, parts=['t:Intervalos modales = [0, 15) y [45, 60) →'])),
                    ('LIN', dict(zona=(705, 520, 1050, 552), x=711.6, parts=['t:→ ', 'Mo = 7,5', 't: y ', 'Mo = 52,5'])),
                    ('LIN', dict(zona=(705, 555, 860, 585), x=711.6, parts=['t:Intervalo mediano = [30, 45) → ', 'Me = 37,5']))],
 'apl-ud8/U8.10#0': [_k((510, 236, 540, 256), '2', '4'), _k((510, 282, 540, 302), '10', '12'), _k((510, 329, 540, 349), '22', '24'), _k((510, 375, 540, 395), '32', '34')],
 'apl-ud8/U8.35#0': [_k((1008, 124, 1065, 143), '0,334', '0,333'), _k((1008, 170, 1065, 190), '0,401', '0,4'), _k((1008, 216, 1065, 236), '0,501', '0,5'),
                     _k((860, 262, 918, 283), '0,266', '0,267'),
                     ('S', dict(fila='0,933-0,501', vell='0,432', nou='0,433')), ('S', dict(fila='0,933-0,501', vell='0,501', nou='0,5')),
                     ('S', dict(fila='43,2%', vell='43,2', nou='43,3')),
                     ('LIN', dict(zona=(881, 660, 1132, 684), parts=['0,5 = 0,5 → 50~%']))],
 'apl-ud8/U8.48#0': [('S', dict(fila='Marzo', vell='0,06', nou='0,07', lleu=True)),
                     ('S', dict(fila='Mayo', vell='0,06', nou='0,07', lleu=True)), ('S', dict(fila='Diciembre', vell='0,07', nou='0,08', lleu=True)),
                     ('S', dict(fila='Mayo', vell='0,36', nou='0,37', lleu=True)), ('S', dict(fila='Junio', vell='0,46', nou='0,47', lleu=True)),
                     ('S', dict(fila='Octubre', vell='0,84', nou='0,83', lleu=True)), ('S', dict(fila='Noviembre', vell='0,93', nou='0,92', lleu=True))],
 'apl-ud8/U8.51#0': [('S', dict(zona=(690, b - 16, 718, b + 4), vell=v, nou=n, alinea='d', mou=False)) for b, v, n in
                     [(298.4, '36', '18'), (317.4, '32', '16'), (336.4, '28', '14'), (355.4, '24', '12'), (374.4, '20', '10'), (393.3, '16', '8'), (412.3, '12', '6'), (431.3, '8', '4'), (450.3, '4', '2')]],
 'apl-ud8/U8.59#0': [('S', dict(zona=(875, 524, 907, 545), vell='28', nou='14', alinea='c', mou=False))],
 'apl-ud8/U8.60#0': [('S', dict(fila='b)5,5,6,6,6', vell='6', nou='6, 6', nth=2))],
 'apl-ud8/U8.81#0': [('LIN', dict(zona=(150, 315, 500, 345), parts=['0,25·1,20 + 4,5·1,50 + 23,75·1,80 +'])),
                     ('LIN', dict(zona=(150, 350, 375, 378), parts=['+ 12,25·2,10 = 75,53 €'])),
                     ('S', dict(zona=(155, 385, 216, 408), vell='59,10', nou='75,53')),
                     ('S', dict(zona=(240, 402, 302, 424), vell='1,45', nou='1,85')),
                     ('S', dict(fila='1,45€/kg', vell='1,45', nou='1,85'))],
 'apl-ud8/U8.81#1': [('LIN', dict(zona=(150, 1029, 512, 1057), parts=['0,75·1,50 + 12,5·1,80 + 29,75·2,10 +'])),
                     ('LIN', dict(zona=(150, 1064, 375, 1092), parts=['+ 11,25·2,40 = 113,10 €'])),
                     ('S', dict(zona=(255, 1120, 302, 1145), vell='1,24', nou='2,08', mou=False)),
                     ('REFRA', dict(caixa=(150, 1105, 360, 1165), xlim=360, num=['113,10'], den=['54,25'], vora=3.5)),
                     ('S', dict(fila='Noseincrementa', vell='Nose', nou='t:Se'))],
 'apl-ud8/U8.83#0': [('PY', dict(f=_eix83))],
 'apl-ud8/U8.84#0': [('S', dict(fila='30marcas', vell='30', nou='33'))],
 'apl-ud8/U8.84#1': [_k((950, 548, 985, 572), '10', '9', alinea='c', mou=False)],
 'apl-ud8/U8.85#0': [('PY', dict(f=_taula85))],
}
