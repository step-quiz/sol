# Receptes de la UD1 (errades del solucionari de 4t Aplicades).
A = 'u1-aproximacio/data/full-5.png'
_pot_a = [('S', dict(zona=(360, 360, 400, 372), vell='7', nou='4')),
          ('S', dict(zona=(330, 402, 362, 415), vell='7', nou='4')),
          ('S', dict(zona=(311, 440, 342, 452), vell='4', nou='5')),
          ('S', dict(zona=(205, 445, 270, 462), vell='1,998', nou='3,274')),
          ('S', dict(zona=(327, 480, 358, 492), vell='4', nou='5')),
          ('S', dict(zona=(226, 486, 286, 502), vell='1,998', nou='3,274')),
          ('S', dict(zona=(334, 516, 364, 528), vell='7', nou='4')),
          ('S', dict(zona=(412, 500, 500, 520), vell='1194,74', nou='0,1957', mou=False)),
          ('S', dict(zona=(270, 555, 325, 580), vell='muy', nou='', buit=False)),
         ]
_pot_b = [('S', dict(zona=(333, 597, 365, 609), vell='31', nou='28')),
          ('S', dict(zona=(290, 640, 322, 652), vell='31', nou='28', mou=False)),
          ('S', dict(zona=(299, 675, 330, 687), vell='8', nou='9')),
          ('S', dict(zona=(205, 680, 262, 697), vell='8,99', nou='1')),
          ('S', dict(zona=(385, 736, 470, 756), vell='988,01', nou='0,011', mou=False)),
          ('REFRA', dict(caixa=(219, 700, 470, 790), xlim=470, num=['1·10', ('c', (268, 673, 299, 690), 694.7, -1)], den=['9,1·10', ('e', '-2'), ('e', '8')])),
          ('S', dict(zona=(270, 790, 405, 815), vell='muygrande.', nou='t:pequeño.')),
         ]
_l = (121.6, 461.2, 40.3)
def _f(k): return dict(zona=(115, _l[1] + k*_l[2] - 26, 400, _l[1] + k*_l[2] + 12))
_c2 = 362
REC = {
 'apl-ud1/U1.45#0': [('S', dict(vell='2', nou='3'))],
 'apl-ud1/U1.89#0': _pot_a,
 'apl-ud1/U1.89#1': _pot_b,
 'apl-ud1/U1.48#0': [('S', dict(zona=(815, 990, 950, 1015), vell='1,527525231', nou='1,549193338', mou=False)),
                     ('REFRA', dict(caixa=(753, 974, 990, 1038), xlim=990, num=['12'], den=['5'], vora=4.55, vinc=(966, 973)))],
 'apl-ud1/U1.57#0': [('LIN', dict(zona=(278, 470, 287, 492), parts=['t: si ', 'a', ' ≠ 0', 't:.'], marge=(0, 3, 3, 4))),
                     ('LIN', dict(img='u1-reals/data/full-7.png', zona=(313, 760, 322, 780), parts=['t: si ', 'a', ' ≠ 0', 't:.'], marge=(0, 3, 3, 4)))],
 'apl-ud1/U1.90#0': [('S', dict(vell='2,8=', nou='', fins='d)', buit=False))],
 'apl-ud1/U1.99#0': [('S', dict(m=0, vell='1', nou='≤')), ('S', dict(m=1, vell='2', nou='≥'))],
 'apl-ud1/U1.101#0': [('LIN', dict(_f(0), parts=['t:Hay cinco soluciones. Por este orden, Milena,'])),
                      ('LIN', dict(_f(1), parts=['t:Elisa, Pilar, Javier, Cristina e Ismael tienen:'])),
                      ('LIN', dict(_f(2), parts=['t:9, 11, 12, 13, 14 y 10'])),
                      ('LIN', dict(_f(3), parts=['t:8, 9, 11, 12, 13 y 10'])),
                      ('LIN', dict(_f(4), parts=['t:7, 8, 9, 11, 12 y 10'])),
                      ('E', dict(_f(5))),
                      ('LIN', dict(zona=(0, 0, 0, 0), x=_c2, base=_l[1] + 2*_l[2], parts=['t:9, 10, 12, 13, 14 y 11'], tinta_de=(121, 450, 330, 470))),
                      ('LIN', dict(zona=(0, 0, 0, 0), x=_c2, base=_l[1] + 3*_l[2], parts=['t:8, 9, 10, 12, 13 y 11'], tinta_de=(121, 450, 330, 470)))],
}
