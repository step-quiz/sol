# Receptes de la UD11 (errades del solucionari de 4t Aplicades).
def _l(base, a, b): return ('S', dict(zona=(740, base - 22, 1045, base + 6), vell=a, nou=b))
_files = [(328.1, '17686', '17,686'), (367.2, '13384', '13,384'), (449.6, '17686', '17,686'), (488.7, '13384', '13,384'),
          (571.2, '17686', '17,686'), (610.3, '13384', '13,384'), (692.7, '17686', '17,686'), (731.8, '13384', '13,384')]
REC = {
 'apl-ud11/AP.74#0': [('S', dict(vell='13384', nou='13,384', lleu=True)), ('S', dict(vell='17686', nou='17,686', lleu=True))],
 'apl-ud11/AP.74#1': [_l(*f) for f in _files],
 'apl-ud11/AP.77#0': [('S', dict(vell='1460', nou='1~460~¦¦000'))],
}
