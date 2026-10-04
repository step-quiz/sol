# Receptes de les unitats 3, 5 i 6.
F = (-.95, .35)      # franja d'una línia normal
REC = {
 # ── Unitat 3 ──
 'u3/41#0':  [('S', dict(vell='-', nou='+'))],
 'u3/43#0':  [('S', dict(vell='1', nou='2'))],
 'u3/55#0':  [('S', dict(vell='-', nou='', mou=False))],
 'u3/56#0':  [('S', dict(vell='-', nou='', nth=2, mou=False))],
 'u3/60#0':  [('S', dict(vell='<', nou='=', nth=0)), ('S', dict(vell='<', nou='=', nth=1))],
 'u3/60#1':  [('APP', dict(despres='(A', nth=2, nou='*'))],
 'u3/60#2':  [('S', dict(vell='1', nou='2', nth=1))],
 'u3/90#0':  [('S', dict(vell='2', nou='1', nth=1))],
 'u3/100#0': [('S', dict(vell='3', nou='1', nth=1)), ('S', dict(vell='3', nou='1', nth=3)), ('S', dict(vell='1', nou='0', nth=0)), ('S', dict(vell='1', nou='0', nth=1))],
 # ── Unitat 5 ──
 'u5/46#0':  [('S', dict(vell='1', nou='-1', nth=1, alinea='c', mou=False))],
 'u5/49#0':  [('S', dict(vell='=', nou='-', nth=0))],
 'u5/49#1':  [('S', dict(vell='-', nou='=', nth=0))],
 'u5/56#0':  [('S', dict(vell='z', nou='x', nth=0))],
 'u5/59#0':  [('S', dict(vell='-', nou='', nth=1))],
 'u5/63#0':  [('S', dict(vell='2', nou='-2', nth=1, alinea='c', mou=False))],
 'u5/77#0':  [('S', dict(vell='-1', nou='3', nth=0, alinea='d', mou=False)), ('S', dict(vell='5', nou='-1', nth=0, alinea='d', mou=False))],
 'u5/80#0':  [('S', dict(vell='2', nou='-2'))],
 # ── Unitat 6 ──
 'u6/74#0':  [('S', dict(vell='c', nou='t:b', nth=0, mou=False))],
 'u6/86#0':  [('S', dict(vell='1', nou='-1', franja=(-1.05, .35)))],
 'u6/88#1':  [('S', dict(vell='8', nou='10', nth=1, franja=F)), ('S', dict(vell='19', nou='23')), ('S', dict(vell='6', nou='8', nth=1)), ('S', dict(vell='8', nou='10', nth=0, franja=F))],
 'u6/90#0':  [('S', dict(vell='+', nou='-'))],
 'u6/90#1':  [('S', dict(vell='5', nou='1', nth=1)), ('S', dict(vell='3', nou='1', nth=2))],
 'u6/139#0': [('S', dict(vell='2', nou='1', nth=1))],
}
