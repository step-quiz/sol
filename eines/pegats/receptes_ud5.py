# Receptes de la UD5 (errades del solucionari de 4t Aplicades).
REC = {
 'apl-ud5/U3.33#0': [('S', dict(zona=(255, 1045, 275, 1072), vell='1', nou='6', lleu=True))],
 'apl-ud5/U3.41#0': [('RECT', dict(rect=(170, 6, 298, 46))),
                     ('MOU', dict(rect=(299, 6, 508, 46), dx=-127))],
 'apl-ud5/U3.44#0': [('RECT', dict(rect=(685, 1028, 960, 1101))),
                     ('MOU', dict(rect=(685, 1102, 1138, 1170), dy=-74))],
 'apl-ud5/U3.63#0': [('S', dict(zona=(425, 535, 456, 560), vell='35', nou='36')),
                     ('S', dict(zona=(360, 535, 395, 560), vell='2x', nou='x')),
                     ('S', dict(zona=(385, 568, 412, 592), vell='7', nou='6,52')),
                     ('S', dict(zona=(414, 602, 432, 625), vell='5', nou='5,52')),
                     ('REFRA', dict(caixa=(200, 563, 520, 632), xlim=520, num=['1 ± 12,04'], den=['2'], vora=1.5)),
                     ('LIN', dict(fila='Somos7personas', parts=['t:No hay ninguna solución entera: no es'])),
                     ('LIN', dict(fila='6hermanos', parts=['t:posible reunir 36 regalos.']))],
 'apl-ud5/AP.52#0': [('S', dict(zona=(365, 105, 395, 130), vell='+', nou='-')), ('S', dict(zona=(395, 175, 424, 200), vell='+', nou='-'))],
}
_t = (725, 515, 1065, 575)        # d'on es treu el color
_u795 = [('LIN', dict(zona=(722, 430, 915, 462), parts=['y = ax', ('e', '2'), ' + bx + c', 't:, con ', 'a < 0', 't:.'])),
         ('RECT', dict(rect=(718, 574, 1135, 750))),
         ('LIN', dict(zona=(0, 0, 0, 0), x=725.8, base=607.0, tinta_de=_t, parts=['t:Vértice: (¦2,3; 3,5), que es un máximo.'])),
         ('LIN', dict(zona=(0, 0, 0, 0), x=725.8, base=641.6, tinta_de=_t, parts=['t:La ecuación es ', 'y = a(x - 2,3)', ('e', '2'), ' + 3,5', 't:,'])),
         ('LIN', dict(zona=(0, 0, 0, 0), x=725.8, base=676.2, tinta_de=_t, parts=['t:con ', 'a < 0', 't:. Para hallar ', 'a', 't: falta un dato:'])),
         ('LIN', dict(zona=(0, 0, 0, 0), x=725.8, base=710.8, tinta_de=_t, parts=['t:la altura de la canasta o la del lanzamiento.']))]
REC['apl-ud5/U7.95#0'] = _u795
