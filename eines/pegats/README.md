# eines/pegats: PNG overlay engine for the Santillana solution pages

Cold-start reference for an AI agent. Ported from the `sol` repo (2n Batx.), adapted to the 4t ESO Aplicades
image geometry and extended (`LIN`, `REFRA`, `RECT`, `MOU`, `PY`, graph helpers, stricter glyph filters).

## 1. Concept

Page images (`apl-udN/<tema>/data/full-K.png`) are never modified. A patch is a small PNG whose pixels are the
page with the wrong signs replaced. The browser positions it over the image (`img.pegat`, percentages of the
image box, `pointer-events:none`). An erratum with a `pegat` field is *callada*: no card, no red box, no notice.
Exception: `enunciat: 1` errata are still listed, because the student's paper book keeps the error.

New glyphs are never typeset. Each sign is copied from the book itself (same PDF text layer font, size and
weight), so the patch is indistinguishable from the print. The remainder of a line is shifted with its own pixels.

State (2026-11): 62 errata in 55 exercises, 163 PNGs (`pegats/<unit>/`, about 900 KB).

## 2. Pipeline

```
receptes_ud*.py ──> fes.py ──> eines/sortida/pegats/<unit>/*.png + eines/sortida/full_<mod>.png   (dry run)
                      │ --escriu
                      └──────> pegats/<unit>/*.png + eines/pegats/pegats.json
                                        │
                                   aplica.py ──> errades.js: `pegat` fields + PAGINES_IGUALS table
```

```bash
pip install -r eines/requisits.txt          # plus node on PATH (pagines.marques() runs errades.js)
python3 eines/pegats/files.py apl-ud1 u1-reals/data/full-4.png 950 1040 1 -c   # text rows: y range, column, char boxes
python3 eines/pegats/fes.py receptes_ud1                                       # dry run; read the sheet, zoomed
python3 eines/pegats/fes.py receptes_ud1 'apl-ud1/U1.45#0'                     # one erratum
python3 eines/pegats/fes.py receptes_ud1 --escriu                              # write to the site
python3 eines/pegats/aplica.py                                                 # idempotent
node eines/comprova.js
# bump errades.js?v=N in tasca.html and errades.html
```

Run from the repo root. Patches are named `<exercise>-<j+1><letter>.png`, letters by reading order.

| File | Role |
|---|---|
| `pegats.py` | Engine: page model, glyph lookup, operations, graph helpers, `fes(key, ops)` |
| `pagines.py` | Geometry and PDF text layer, `CAT` (all images per unit), `marques()` (reads `marca` from errades.js) |
| `fes.py` | Runner: applies recipes, writes PNGs, before/after review sheet, `pegats.json` |
| `aplica.py` | Injects `pegat` into errades.js by scanning objects (backtick-aware); rebuilds `PAGINES_IGUALS` |
| `files.py` | Inspection: text rows of a page, optional per-character boxes |
| `receptes_ud{1..9,11}.py` | One `REC` dict per unit |
| `../camins.py` | `ARREL`, `PDFS`, `SORTIDA` |

## 3. Geometry

Width is always 1208 px. Box `[40,270,1930,2680]` at 300 dpi, `s = 1208/1890`, `2.663 px/pt`, `ox = 26`, `oy = 173`,
column midline about x = 604. `pagines.casa()` returns `[page_index, 300*s/200, ox, oy, 1]`; PDF page numbers come from
`eines/retalls.json`.

22 image paths are copies of a PDF page already present under another folder (pixel-identical). `PAGINES_IGUALS`
maps each copy to a canonical `pNNN`; `htmlPegats` indexes by canonical key and de-duplicates by canonical key + rect,
so a patch shows on every copy. U7.95 exists in both UD5 and UD6 with identical patches.

## 4. Recipes

```python
REC = {'apl-ud1/U1.45#0': [('S', dict(vell='2', nou='3'))]}   # key = errades.js key + '#' + index of the erratum
```

Operations run in order on one working copy per image, so an operation that shifts text moves the coordinates seen by
later ones. Work right to left on a line, or take shifted positions into account.

Selectors (any op): `img=` image (default: image of the first mark); `m=` index of a mark; `fila=` text of a row + `nfila=`
(nearest to the first mark); `zona=(x0,y0,x1,y1)` px, characters by centre (wins over the rest).

| Op | Arguments | Effect |
|---|---|---|
| `S` | `vell, nou, nth, mou, alinea('e','d','c'), buit, franja, centra, enganxat, fins, lleu` | Replace a run of characters; the tail of the line shifts. `mou=False`: tail stays. `fins=x` or text: tail limit (tables). `franja=(a,b)`: shift a full-height band, in em around the baseline (fractions). `centra=True`: recentre the row (numerators) |
| `LIN` | `parts, x, base, esborra_fila, lleu, mida, marge, dx, dy, tinta_de` | Write a line from parts. With a selector, those characters are erased and the line starts there |
| `REFRA` | `caixa, num, den, xlim, vinc, vora, mida, lleu` | Rewrite a fraction, resize its bar, shift what is at its right up to `xlim`. `vinc=(y0,y1)`: extend a radical vinculum |
| `RECT` | `rect` | Fill with local background |
| `MOU` | `rect, dx, dy, esborra_origen` | Move raw pixels |
| `PY` | `f, **kw` | Custom callback `f(pag, work, cars, **kw)` from the recipe file |
| `APP`, `INS`, `SUP`, `SUB`, `COPG`, `E`, `FR1`, `RF` | see docstrings | From `sol`. `R` and the `tex:` route need xelatex + Source Sans; never needed here |

Text mini-syntax (`nou` and string parts): default is formula mode (letters italic, digits and signs upright);
`t:` prefix is text mode (upright letters, real word spaces). `~` thin thousands space (page-measured `fi_em`, often 3 px; the
book also uses 4.7 px), `¦` +1 px, `_x`/`^x` sub/superscript.
`LIN`/`REFRA` tuple parts: `('f', num, den)`, `('e', txt[, size, previous_sign])` exponent, `('g', char[, page])` explicit
glyph, `('c', rect, base, dx)` already-clean pixels from elsewhere in the working image.

Graph helpers: `neteja_grafica(pag, work, rect, treure, verm)` removes the red curve and label ink, rebuilding the grid from
per-column and per-row medians (per-channel minimum at crossings). `traca(work, pts, gruix, color, retall)`, `punt(work, x, y, r)`
draw antialiased in the book's red (`BGR 36,28,237`).

## 5. Glyph selection (`glifs`)

Font encodings of the PDF: solution text `VectoraLTStd-Light 9`, statements `-Roman 9`, variables `-LightItalic`/`-Italic`, tables
`Light 8`, exponents `Light 5.4`; `MMaCentury` `= - + < > ×` (Bold in statements); `MMaArrow 11` `"` = →; `MathematicalPi` `?` = ·;
`MMaExtra` `1`/`2` = `<`/`>`; `MMaRelation` `#`/`$`/`!` = ≤ ≥ ∈; `MMaBinary` `+ , !` = ∩ ∪ ±; `MMaEtc` `3` ∞, `l` ′; `MMaNegate` `!` ≠.

Search order: same page, same unit, remaining units. Candidate filters:

- `_es`: font family, weight (`lleu`), size.
- `_net`: no overlapping ink from other rows; rejects grid-crossed glyphs (sky-blue or orange pixels in the glyph rows), glyphs on
  coloured backgrounds (table headers), and upright glyphs touched by an italic neighbour.
- Ink colour must match the target (`glifs.negre`, statements are black, solutions blue).
- `_fiable`: shape compared with the median of equal glyphs on that page; rejects hidden-text artefacts. Needs at least 3 samples. If
  nothing passes, a relaxed pass ignores it, then the other weight is tried.
- Score: neighbour types (digit, letter, operator, space, nothing) matching the target context; proximity as tie-break.

Advance widths come from the model glyph context, clipped; digit-digit, digit-comma, comma-digit and digit-variable are forced tight.

## 6. Review (mandatory)

"A bad patch is worse than no patch." Read every before/after sheet zoomed 4–5×. Then check in a real browser: `showExercise({u,n})` for every
key in `ERRADES`, verify `img.pegat` loaded, empty `#err-wrap`, overlay counts per catalogue image against PDF pages. When diffing element
screenshots, the fixed page footer produces false positives.

Known traps:

- The PDF text layer can differ from the printed page (U8.48 has a hidden third decimal; U1.97's A is really `(−∞,3]`). Trust the image.
- Fraction bars, radicals, absolute-value bars and vector arrows are drawn, not characters. Arrow baselines sit about 1.9 px lower.
- At 5.4 pt side bearings are about 0.5 px: a digit copied next to another keeps a sliver. Type exponents digit by digit or reuse clean pixels with `('c', ...)`.
- A tail shift moves exponents and closing parentheses; parentheses overhang their boxes and can leave residues (use `RECT`).
- `S` with `vell` matching a hidden character only rewrites what is printed. Check the zoomed output.

If a page image is regenerated with another crop box, all marks and patches of that unit become invalid.

## 7. Content decisions embodied in patches

`errades.js` (`ondiu`, `hadedir`, `motiu`) documents each one; `errades.html` lists them for the teacher.

| Exercise | Decision |
|---|---|
| U1.48 c) | Irrational between 1.533… and 1.555…: √(12/5) = 1.549193338… (no single-digit fraction exists) |
| U2.43 b) | "al cabo de otros 5 años" read as 10 years in total: 1 126,23 · 1,480244 = 1 667,10 € |
| U3.63 | Statement kept (36 gifts): x² − x − 36 = 0 has no integer root. Alternative: change the statement to 42, x = 7 |
| U6.82 a) | Rewritten from the graph: increasing on (−3,0) and (0,3), decreasing from x = 3. Maximum means a change from increasing to decreasing (the book's own definition, crossword 83): x = 3 is one, x = 0 is not, although the maximum value is reached at both |
| U7.95 | Under-determined: y = a(x − 2,3)² + 3,5 with a < 0, missing datum stated |
| U8.35 | Extra fix found while patching: h₄ = 0,267 |
| U8.48 | Two decimals kept, as printed |
| U6.7 c), U6.106, U7.100 | Graphs redrawn: discrete points; v(t) constant and d(t) = 340t with X cell = 0,25 s; h = v²/20 with cell = 5 |
