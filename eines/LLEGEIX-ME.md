# Les eines de les errades del solucionari

Aquí hi ha les tres eines amb què es van fer les dades de les errades (vegeu `ERRADES.md`, a l'arrel):

| Carpeta | Eina | Què fa |
|---|---|---|
| `conversor/` | `genera.py`, `verifica.js` | Torna a fer `errades.js` a partir de `tex/`, i comprova que quadra |
| `localitzador/` | `proposa.py` (amb `loc.py` i `loc2.py`) | Troba on és cada errada dins la imatge: proposa el camp `marca` |
| `pegats/` | `fes.py` (amb `pegats.py` i les `receptes_*.py`) | Fa els pegats: els retalls de pàgina ja corregits |

A més: `dades.py` (llegeix `tex/`, `tasques.js` i `cataleg.js`; el fan servir totes) i `camins.py`.

**Cap eina toca el repo si no li ho dius.** Sense `--escriu`, tot el que fan va a `eines/sortida/`
(que no es puja a GitHub) i et diuen si el resultat és igual que el que hi ha publicat.

## Què cal

- Python 3.10 o més nou, i les llibreries: `pip install -r eines/requisits.txt`
- Node (només per a `verifica.js`). No cal instal·lar res més: fa servir el KaTeX de `assets/katex/`.
- La carpeta `tex/` amb els `errors-setmanaN.tex`, i els PDF del solucionari a `source/`.
- `pdftoppm` (paquet `poppler-utils`) **només** si s'ha de casar amb el PDF una imatge que no és a
  `localitzador/casa.json` (una pàgina nova). Per a les imatges que ja hi ha, no cal.

## D'on surt cada cosa (les fonts)

| El que es veu a `errades.js` | La font |
|---|---|
| `ondiu`, `hadedir`, `motiu`, `lloc`, `enunciat` i les observacions | `tex/errors-setmanaN.tex` |
| `marca` | `eines/localitzador/marques.json` |
| `pegat` | `eines/pegats/pegats.json` (i els PNG de `pegats/<unitat>/`) |
| La capçalera, els interruptors i les funcions | `eines/conversor/cap.js.txt` i `peu.js.txt` |

`genera.py` refà `errades.js` **sencer** a partir d'aquestes fonts. Per tant:

- Si canvies `errades.js` a mà (per exemple, enganxant-hi una `marca` feta amb `?tot=1&marca=1`),
  passa el canvi a la font que toqui abans de tornar a generar. Si no, es perd.
- Per canviar una funció o un interruptor, toca `cap.js.txt` o `peu.js.txt`, no `errades.js`.
- Abans de generar amb `--escriu`, genera sense res i **mira les diferències**: tot el que hi surti
  és el que canviaria.

Les claus de `marques.json` i `pegats.json` són `'u7/92#0'`: l'exercici i, darrere del `#`, la
posició de l'errada dins de la llista d'aquell exercici, **començant per 0**.

## Les ordres

Totes s'executen des de l'arrel del repo.

```
python3 eines/dades.py                               # què ha llegit de tex/, i avisos
python3 eines/conversor/genera.py                    # refà errades.js a eines/sortida/ i el compara amb el del repo
python3 eines/conversor/genera.py --escriu           # ... i substitueix el del repo
node eines/conversor/verifica.js                     # comprova l'errades.js del repo

python3 eines/localitzador/proposa.py u7/92          # proposa la marca de les errades d'un exercici
python3 eines/localitzador/proposa.py --tot --full   # totes, amb fulls per mirar-les

python3 eines/pegats/fes.py receptes_u10             # fa els pegats d'un fitxer de receptes (a eines/sortida/)
python3 eines/pegats/fes.py receptes_u10 u10/63#0    # només una errada
python3 eines/pegats/fes.py receptes_u10 --escriu    # ... i substitueix els del repo i pegats.json
```

`verifica.js` comprova: que `errades.js` diu el mateix que `tex/`; que totes les fórmules es
pinten amb el KaTeX del web; que avisos, targetes, requadres i pegats surten quan toca, amb els
pegats encesos i apagats; i que les imatges i els fitxers que s'hi anomenen existeixen.

## Fer un pegat nou

1. L'errada ha de ser a `tex/` i tenir marca a `localitzador/marques.json` (la recepta busca el
   text vell dins del rectangle de la marca).
2. Escriu la recepta en un `receptes_*.py`:
   ```python
   'u7/92#0': [('S', dict(m=0, vell='0,5', nou='1')),            # a la primera marca, «0,5» passa a ser «1»
               ('S', dict(fila='existeixlim', vell='0,5', nou='1')),   # a la línia que conté aquest text
               ('S', dict(m=1, vell='2,5', nou='5'))],
   ```
3. `python3 eines/pegats/fes.py receptes_u7 u7/92#0` i **mira el full** de `eines/sortida/`, ampliat.
4. Quan estigui bé: `--escriu`, després `genera.py --escriu`, `verifica.js`, i puja el número de
   `errades.js?v=` a `tasca.html`.

### Les operacions d'una recepta

Cada operació és `('NOM', dict(...))`. A totes s'hi pot posar `m=` (número de marca, si l'errada en
té més d'una), `fila='text'` (buscar en la línia que conté aquest text, encara que sigui fora de la
marca) i `img=` (la imatge, si no és la de la primera marca).

| Operació | Què fa | Arguments propis |
|---|---|---|
| `S` | Substitueix `vell` per `nou`. La resta de la línia es desplaça el que calgui | `nth` (quina aparició, des de 0), `mou=False` (no desplacis res), `alinea='c'`/`'d'` (centrat o a la dreta d'on era), `buit=False` (sense l'espai que hi havia darrere), `enganxat=True` (comença on acaba el signe anterior), `franja=(dalt, baix)` (mou la línia sencera, en ems respecte de la línia de base), `centra=True` (torna a centrar la fila: numeradors) |
| `APP` | Afegeix `nou` darrere de `despres` | `nth` |
| `INS` | Hi enganxa un signe (la prima de y′), copiat d'una parella igual | `despres`, `lletra`, `tipus` |
| `SUP` | Posa un exponent darrere de `despres` | `nou`, `nth` |
| `SUB` | Canvia tot un subíndex (el de sota d'un «lim») | `nou`, `nth` |
| `COPG` | Substitueix un subíndex per un altre de la mateixa marca | `de`, `a` |
| `FR1` | Refà una fracció senzilla (barra inclosa) | `des_de` (text del numerador vell), `num`, `den` |
| `RF` | Refà des d'una fracció fins al final de la línia | `des_de`, `nou` (llista: text o `('f', num, den)`) |
| `E` | Esborra les línies de la marca | — |

`nth` compta les aparicions entre els caràcters triats, ordenats per columna, línia de base i posició.
Per saber què hi ha a cada línia de base (i com es diu cada signe al PDF), mira `pag.files` d'una
`pegats.pagina(u, imatge)`.

### Com s'escriu el text nou (`nou`)

| S'escriu | Vol dir |
|---|---|
| `12,5` `(` `]` `=` `+` `-` `<` `>` | Xifres, puntuació i signes, tal qual |
| `x` | Una lletra és una variable (cursiva) |
| `t:recta tangent` | Amb `t:` al davant, és text (lletra recta) i els espais són espais de paraula |
| `x_1` | Subíndex |
| `x^2` | Exponent |
| `→` `′` `·` `∪` `∩` | Fletxa, prima, punt de multiplicar, unió i intersecció |
| un espai | Un espai |

Cada signe es copia d'un signe igual de la mateixa pàgina (o, si no n'hi ha, d'una altra pàgina
de la unitat). Si no es troba enlloc, l'eina s'atura i ho diu.

### Quan hi ha més d'un canvi a la mateixa línia

Les posicions es llegeixen sempre del PDF original. Si un canvi desplaça la línia, el següent
s'ha de fer **més a l'esquerra** (ordre de dreta a esquerra) i amb `franja`, o bé canviar el tros
sencer d'un sol cop. Els paranys coneguts són a l'apartat 9 d'`ERRADES.md`.

## Fins on es pot refer el que hi ha publicat (mesurat el 4 d'octubre de 2026)

- **`errades.js`:** `genera.py` el refà **idèntic**, byte a byte.
- **Marques:** de les 83 errades, 59 propostes de `proposa.py` coincideixen amb la marca desada.
  Les altres 24 es van ajustar a ull. **La referència és `marques.json`**, no la proposta.
- **Pegats:** el motor es va anar millorant unitat per unitat, i els pegats de les primeres
  unitats es van fer amb versions anteriors. Amb el motor d'ara:

  | Receptes | Pegats | Idèntics | Diferents |
  |---|---|---|---|
  | `receptes_u11u12` | 7 | 7 | 0 |
  | `receptes_u3u5u6` | 30 | 30 | 0 |
  | `receptes_u13u14u1u2` | 7 | 6 | 1 |
  | `receptes_u8u9` | 9 | 4 | 5 |
  | `receptes_u10` | 28 | 16 | 12 |
  | `receptes_u7` | 12 | 2 | 10 |
  | **Total** | **93** | **65** | **28** |

  Dels 28 diferents: 12 canvien entre 1 i 8 píxels febles (no es nota); 3 canvien més píxels amb
  la mateixa mida; i 13 canvien de mida o de lloc (uns quants píxels, tret de `u7/76`, on la
  fracció surt força més ampla).

  **Els pegats publicats són els que es van mirar un per un: són la referència.** No en
  substitueixis cap pel que surt ara sense mirar el full ampliat, com si fos nou.
