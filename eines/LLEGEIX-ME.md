# Les eines

Totes s'executen des de l'arrel del repo. **Cap eina toca el repo si no li ho dius:** sense
`--escriu`, el que fan va a `eines/sortida/` (que no es puja a GitHub).

| Eina | Què fa |
|---|---|
| `comprova.js` | Les proves: catàleg, imatges, tasques, pistes, errades, enunciats i fórmules (pinta totes les fórmules amb el KaTeX del web). GitHub la passa a cada canvi |
| `retalla.py` + `retalls.json` | Fa les imatges de les pàgines d'una unitat a partir del PDF de `source/` |
| `figura.py` | Retalla una figura del PDF (gràfica, taula, dibuix) per posar-la dins d'un enunciat |
| `optimitza_png.py` | Comprimeix les imatges sense cap pèrdua (només si el resultat és idèntic píxel a píxel) |
| `pegats/` | Motor de pegats: `fes.py` fa els PNG a partir de les receptes (`receptes_udN.py`) i `aplica.py` els posa a `errades.js`. Referència tècnica: `pegats/README.md` |

## Què cal

- Node (per a `comprova.js`). No cal instal·lar res més.
- Python 3.10 o més nou i `pip install -r eines/requisits.txt` (per a `retalla.py` i `optimitza_png.py`).
- `pdftoppm` (paquet `poppler-utils`) per a `retalla.py`.

## Les ordres

```
node eines/comprova.js                       # passa les proves

python3 eines/retalla.py apl-ud4             # fa les imatges a eines/sortida/apl-ud4/ (per mirar-les)
python3 eines/retalla.py apl-ud4 --escriu    # ... i les escriu a apl-ud4/<tema>/data/full-K.png

python3 eines/figura.py apl-ud10 U4.34-1 109 30 112 235 330           # retalla una figura (a eines/sortida/)
python3 eines/figura.py apl-ud10 U4.34-1 109 30 112 235 330 --escriu # ... a apl-ud10/enunciats/U4.34-1.png

python3 eines/optimitza_png.py               # comprimeix totes les imatges del web
```

## Com es fan les imatges (`retalls.json`)

Per a cada UD: el PDF, la **caixa** del retall i, per a cada tema (carpeta), les **pàgines del PDF**
(no del llibre: a aquest PDF, pàgina del PDF = pàgina del llibre + 1) que hi van, en ordre. La primera
pàgina de la llista és `full-1.png`, la segona `full-2.png`… Una pàgina amb exercicis de dos temes va a
les dues llistes.

La caixa `[40, 270, 1930, 2680]` (en píxels a 300 ppp) treu la capçalera «SOLUCIONARIO» i el número de
pàgina, i deixa tot el text, tant a les pàgines parells com a les senars. L'eina tria la resolució perquè el
retall faci just **1208 px** d'amplada (unes 192 ppp): així la imatge no es redimensiona i pesa la meitat.
També treu el blanc sobrant de sota i avisa si hi ha tinta tallada a les vores.

Una UD agafa pàgines de diverses unitats de Santillana: el nom del tema porta la unitat al davant
(`u5-semblanca`, `u7-problemes`, `u4-sistemes`). Només hi van les pàgines que tenen algun exercici del
catàleg de la UD.

Les figures dels exercicis del llibre propi (`apl-ud4/enunciats/4.1.4.png`) no surten del PDF de
Santillana: són la `tikzpicture` del `.tex` de l'Overleaf compilada a part (`standalone`) i passada a PNG.

**Atenció:** si es tornen a fer les imatges d'una unitat amb una altra caixa, les marques i els pegats
d'errades d'aquella unitat deixen de valer.

## Les errades

El motor de pegats és a `eines/pegats/`. Les altres dues eines de `sol` per a les errades (conversor i
localitzador) no s'han portat: les errades i les marques s'escriuen directament a `errades.js`. Vegeu `ERRADES.md`, apartat 6.
