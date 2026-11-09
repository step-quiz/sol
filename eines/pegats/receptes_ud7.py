# Receptes de la UD7 (errades del solucionari de 4t Aplicades).
import numpy as np, cv2
import pegats as M

def _g67(pag, work, cars):
    M.neteja_grafica(pag, work, (145, 942, 512, 1130))
    for k in range(7): M.punt(work, 328.5 + 30.1*(2*k - 6), 1096.5 - 30.1*(1 + k/2))

def _gr106(pag, work, rect, ax, ay, ytop, t1_y, labs, base_labs):
    """El to de la recta d(t): passa per l'origen i, a t = 1 s (4 quadrets), arriba a l'altura de la recta verda."""
    M.neteja_grafica(pag, work, rect, treure=[labs])
    x_1 = ax + 4*30.2; p = (ay - ytop)/(ay - t1_y); M.traca(work, [(ax, ay), (ax + (x_1 - ax)*p, ytop)], retall=(0, ytop, 2000, 2000))
    tinta, f = M.colors(pag, 182, rect[1] + 20, 212, rect[3] - 20); M._color(tinta)
    for k, t in ((2, '0,5'), (4, '1'), (6, '1,5')):
        w = M._escriu(pag, None, [t], 0, base_labs, tinta, f, 7.0); M._escriu(pag, work, [t], ax + k*30.2 - w/2, base_labs, tinta, f, 7.0)

def _g106a(pag, work, cars): _gr106(pag, work, (190, 172, 470, 449), 218.5, 416, 175, 185.5, (235, 428, 466, 447), 441.3)
def _g106c(pag, work, cars): _gr106(pag, work, (190, 684, 470, 960), 218.5, 927, 686, 709.5, (238, 936, 466, 955), 949.2)

def _s790(pag, work, cars):
    A = (865, 618, 1042, 684); B = (865, 688, 1036, 720)
    a = pag.img[A[1]:A[3], A[0]:A[2]].copy(); b = pag.img[B[1]:B[3], B[0]:B[2]].copy(); blanc = (255, 255, 255)
    work[A[1]:A[3], A[0]:A[2]] = blanc; work[B[1]:B[3], B[0]:B[2]] = blanc
    work[635:635 + b.shape[0], B[0]:B[2]] = np.minimum(work[635:635 + b.shape[0], B[0]:B[2]], b)
    work[671:671 + a.shape[0], A[0]:A[2]] = np.minimum(work[671:671 + a.shape[0], A[0]:A[2]], a)

_b = 708.0
REC = {
 'apl-ud7/U6.7#0': [('PY', dict(f=_g67)),
                    ('LIN', dict(zona=(0, 0, 0, 0), x=107.4, base=1160.0, tinta_de=(105, 920, 128, 945), parts=['t:No se pueden unir: ', 'x', 't: es un número entero.']))],
 'apl-ud7/U6.52#0': [('S', dict(zona=(235, 420, 262, 443), vell='15', nou='5', alinea='c', mou=False))],
 'apl-ud7/U6.82#0': [('LIN', dict(zona=(452, 585, 547, 612), x=454.5, base=604.2, parts=['t:(-3, 0)'])),
                     ('LIN', dict(zona=(170, 616, 604, 648), parts=['t:y en (0, 3), y decreciente a partir de'])),
                     ('LIN', dict(zona=(170, 651, 604, 683), x=175.2, parts=['x = 3', 't:. Alcanza su máximo valor en'])),
                     ('LIN', dict(zona=(170, 685, 604, 717), x=175.2, parts=['x = 0', 't: y en ', 'x = 3', 't:, pero solo hay'])),
                     ('LIN', dict(zona=(170, 720, 604, 752), x=175.2, parts=['t:máximo en ', 'x = 3', 't:: en ', 'x = 0', 't: no hay']))],
 'apl-ud7/U6.89#0': [('S', dict(zona=(795, 1147, 900, 1169), vell='2-(-1)', nou='f(-1)', alinea='c', mou=False)),
                     ('S', dict(zona=(820, 1216, 845, 1238), vell='3', nou='-4', alinea='c', mou=False)),
                     ('S', dict(zona=(975, 1195, 1042, 1222), vell='300', nou='-225')),
                     ('S', dict(zona=(795, 1290, 900, 1312), vell='2-(-1)', nou='f(-1)', alinea='c', mou=False)),
                     ('S', dict(zona=(812, 1359, 838, 1381), vell='3', nou='4', alinea='c', mou=False)),
                     ('S', dict(zona=(958, 1338, 1047, 1366), vell='-300', nou='-225')),
                     ('S', dict(zona=(795, 1433, 900, 1455), vell='2-(-1)', nou='f(-1)', alinea='c', mou=False)),
                     ('S', dict(zona=(812, 1502, 838, 1524), vell='3', nou='8', alinea='c', mou=False)),
                     ('S', dict(zona=(958, 1481, 1047, 1509), vell='-400', nou='-150'))],
 'apl-ud7/U6.106#0': [('RECT', dict(rect=(170, 12, 300, 76))), ('RECT', dict(rect=(170, 88, 382, 146))),
                      ('LIN', dict(zona=(0, 0, 0, 0), x=174.6, base=49.3, tinta_de=(144, 35, 163, 52), parts=['v(t) = 340'])),
                      ('LIN', dict(zona=(0, 0, 0, 0), x=175.5, base=123.7, tinta_de=(144, 110, 163, 126), parts=['d(t) = 340t'])),
                      ('PY', dict(f=_g106a))],
 'apl-ud7/U6.106#1': [('RECT', dict(rect=(170, 525, 310, 586))), ('RECT', dict(rect=(170, 600, 420, 658))),
                      ('LIN', dict(zona=(0, 0, 0, 0), x=175.2, base=561.0, tinta_de=(144, 485, 400, 508), parts=['v(t) = 22,22'])),
                      ('LIN', dict(zona=(0, 0, 0, 0), x=175.2, base=635.3, tinta_de=(144, 485, 400, 508), parts=['d(t) = 22,22t'])),
                      ('PY', dict(f=_g106c))],
 'apl-ud7/U6.112#0': [('S', dict(fila='400', vell='900', nou='990'))],
 'apl-ud7/U7.90#0': [('PY', dict(f=_s790)),
                     ('RECT', dict(rect=(801, 916, 814, 939))),                 # (la vora clara de la pota de la b)
                     ('S', dict(zona=(800, 915, 822, 940), vell='b', nou='t:a')),
                     ('RECT', dict(rect=(804, 931, 805, 932), fons=(255, 255, 255))),   # (una engruna del model)
                     ('S', dict(zona=(860, 973, 880, 998), vell='a', nou='t:b'))],
 'apl-ud7/U7.90#1': [('S', dict(zona=(990, 1415, 1097, 1445), vell='574,54375', nou='574,5875')),
                     ('S', dict(zona=(774, 1415, 880, 1445), vell='301,39375', nou='301,4375')),
                     ('S', dict(zona=(895, 1500, 1004, 1530), vell='574,54375', nou='574,5875')),
                     ('S', dict(zona=(725, 1500, 835, 1530), vell='574,54375', nou='574,5875'))],
 'apl-ud7/U2.42#0': [('LIN', dict(zona=(755, 150, 960, 178), parts=['1,157625 = 3~530,76 €'])),
                     ('S', dict(zona=(655, 228, 750, 250), vell='531,90', nou='530,76')),
                     ('S', dict(zona=(840, 228, 945, 250), vell='481,90', nou='480,76'))],
 'apl-ud7/U2.43#0': [('S', dict(fila='Alcabode5años', vell='5', nou='10')),
                     ('S', dict(zona=(880, 792, 895, 806), vell='5', nou='10')),
                     ('MOU', dict(rect=(935, 866, 963, 888), dx=8)),
                     ('S', dict(zona=(918, 862, 935, 876), vell='5', nou='10', mou=False)),
                     ('LIN', dict(zona=(815, 895, 1032, 920), parts=['1,480244 = 1~667,10 €']))],
 'apl-ud7/U2.110#0': [('S', dict(zona=(355, 1422, 430, 1447), vell='10048', nou='10~¦¦048,68')),
                      ('S', dict(zona=(720, 195, 790, 216), vell='10048', nou='10~048,68', franja=(-2.35, 1.3))),
                      ('S', dict(zona=(922, 265, 1026, 290), vell='10461,70', nou='10~¦¦462,42', mou=False)),
                      ('S', dict(zona=(722, 265, 795, 290), vell='10048', nou='10~¦¦048,68', franja=(-1.7, 1.25)))],
}
