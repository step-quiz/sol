# Receptes de la UD3 (errades del solucionari de 4t Aplicades).
import pegats as M

def _capcalera(pag, work, cars):
    # «Intervalos», centrat sobre la columna. La l es tria a mà: l'única altra que hi ha a 7 pt és massa prima al costat de les altres lletres.
    P = M.pagina('apl-ud3', 'u2-problemes/data/full-3.png')
    l = next(c for c in P.chars if c['t'] == 'l' and abs(c['s'] - 7) < .07 and abs(c['x0'] - 439.9) < 1 and abs(c['base'] - 820.1) < 1)
    tinta, fons = M.colors(pag, 125, 380, 190, 402); M._color(tinta)
    work[380:403, 124:190] = fons
    M._escriu(pag, work, ['t:Interva', ('g', l, P), 't:os'], 114, 397.0, tinta, fons, 7.0, False)

REC = {
 'apl-ud3/U5.22#0': [('S', dict(zona=(915, 200, 1015, 225), vell='8100000', nou='81~000~000')),
                     ('REFRA', dict(caixa=(712, 240, 960, 305), xlim=960, num=['81~000~000'], den=['100~000'], vora=4.4))],
 'apl-ud3/U5.69#0': [('S', dict(fila='1:500000', vell='1:500000', nou='1:1~500~000')),
                     ('S', dict(fila='39,2', vell='39,2', nou='13,1')),
                     ('S', dict(fila='42,2', vell='42,2', nou='14,1')),
                     ('S', dict(fila='1:250000', vell='1:250000', nou='1:2~000~000')),
                     ('S', dict(fila='78,4', vell='78,4', nou='9,8')),
                     ('S', dict(fila='84,4', vell='84,4', nou='10,6'))],
 'apl-ud3/U2.59#0': [('S', dict(zona=(440, 265, 515, 290), vell='postes', nou='t:intervalos')),
                     ('PY', dict(f=_capcalera)),
                     ('S', dict(zona=(320, 380, 365, 402), vell='cm', nou='t:m')),
                     ('RECT', dict(rect=(351, 380, 364, 402))),
                     ('S', dict(zona=(140, 415, 170, 437), vell='61', nou='60')),
                     ('S', dict(zona=(360, 450, 392, 472), vell='61', nou='60')),
                     ('S', dict(zona=(515, 500, 565, 520), vell='36,6', nou='36')),
                     ('REFRA', dict(caixa=(405, 476, 570, 545), xlim=570, num=['60·15'], den=['25'], vora=1.5)),
                     ('LIN', dict(fila='Luegoseránnecesarios', parts=['t:Luego habrá 36 intervalos y 37 postes.']))],
}
