# Receptes de la UD9 (errades del solucionari de 4t Aplicades).
def _eq(zona, base, f4, res):
    return ('LIN', dict(zona=zona, x=129.8, base=base, parts=['P = 4 · '] + sum([[('f', a, b), ' · '] for a, b in f4[:-1]], []) + [('f', f4[-1][0], f4[-1][1]), ' = ' + res]))
REC = {
 'apl-ud9/U9.42#0': [('LIN', dict(zona=(125, 12, 400, 42), parts=['t:3 caballos con reemplazamiento:'])),
                     _eq((125, 52, 600, 120), 90.8, [('4', '40'), ('4', '40'), ('4', '40'), ('36', '40')], '0,0036'),
                     ('LIN', dict(zona=(125, 128, 400, 158), parts=['t:3 caballos sin reemplazamiento:'])),
                     _eq((125, 168, 600, 236), 206.9, [('4', '40'), ('3', '39'), ('2', '38'), ('36', '37')], '0,0016')],
 'apl-ud9/U9.76#0': [('S', dict(fila='Pelorubio', vell='rubio', nou='t:moreno'))],
 'apl-ud9/U9.88#0': [('S', dict(zona=(230, 170, 250, 194), vell='6', nou='7')),
                     ('S', dict(zona=(270, 188, 340, 212), vell='0,75', nou='0,875'))],
}
