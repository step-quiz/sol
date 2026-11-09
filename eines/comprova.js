#!/usr/bin/env node
/* comprova.js — comprova que les dades del web quadren.

   Ús:  node eines/comprova.js        (des de l'arrel del repo)

   Mira:
     · cataleg.js   cada unitat de CATALEG és a UNITATS_META, i la seva matèria a MATERIES;
                    cada fitxa té títol, dificultat vàlida, una clau bona ('U5.57', 'U4.SA1',
                    'AP.33', '4.2.7') i imatges que existeixen (les del llibre propi no en tenen).
     · tasques.js   cada tasca té unitat coneguda, setmana, data vàlida i exercicis que són al
                    catàleg; no hi ha dues tasques amb el mateix identificador.
     · hints.js     cada pista és d'un exercici del catàleg, és d'una sola línia i només fa
                    servir <i>, <b> i <br> (cap altre «<»).
     · errades.js   es carrega, i cada errada és d'un exercici del catàleg i té ondiu i hadedir;
                    les imatges de marques i pegats existeixen.
     · enunciats.js cada enunciat és d'un exercici del catàleg, té els camps bons i les figures
                    existeixen; els exercicis del llibre propi (i:[]) tenen enunciat i solució.
                    Avisa dels exercicis programats que encara no en tenen.
     · fórmules     totes les d'errades.js i enunciats.js es pinten amb el KaTeX del web sense error.
   Acaba amb codi 1 si hi ha cap problema (el workflow comprova.yml surt en vermell). */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm');
const ARREL = path.resolve(__dirname, '..');
const problemes = [], avisos = [];
const mal = s => problemes.push(s), avis = s => avisos.push(s);

/* Carrega els fitxers del web en un mateix context, com fa el navegador. */
const ctx = { console, location: { search: '' }, localStorage: null, document: { compatMode: 'CSS1Compat' } };
vm.createContext(ctx);
function carrega(f){
  const codi = fs.readFileSync(path.join(ARREL, f), 'utf8')
    .replace(/^const (\w+)\s*=/gm, 'var $1 =');      // perquè les constants quedin visibles
  vm.runInContext(codi, ctx, { filename: f });
}
['assets/katex/katex.min.js', 'cataleg.js', 'tasques.js', 'hints.js', 'progres.js', 'errades.js', 'enunciats.js'].forEach(f => {
  try { carrega(f); } catch (e) { mal(f + ': no es pot carregar (' + e.message + ')'); }
});
const { MATERIES, UNITATS_META, CATALEG, TASQUES, PISTES, ERRADES, ENUNCIATS, katex } = ctx;
const existeix = f => fs.existsSync(path.join(ARREL, f));
const DIF = ['', '●○○', '●●○', '●●●'];

/* ── cataleg.js ── */
let nFitxes = 0;
if (CATALEG) for (const u of Object.keys(CATALEG)) {
  const meta = UNITATS_META[u];
  if (!meta) mal(`cataleg.js: la unitat ${u} no és a UNITATS_META`);
  else if (!MATERIES[meta.materia]) mal(`cataleg.js: la matèria «${meta.materia}» de ${u} no és a MATERIES`);
  for (const [n, f] of Object.entries(CATALEG[u])) {
    nFitxes++;
    const k = `${u}/${n}`;
    if (!f.t) mal(`cataleg.js: ${k} no té títol (t)`);
    if (!DIF.includes(f.d)) mal(`cataleg.js: ${k} té una dificultat estranya: «${f.d}»`);
    if (!Array.isArray(f.i)) { mal(`cataleg.js: ${k} no té el camp d'imatges (i)`); continue; }
    if (!/^((U\d+|AP|AR|AT)\.(\d+|[A-Z]+\d*)|\d+\.\d+\.\d+)$/.test(n)) mal(`cataleg.js: ${k}: clau estranya (ha de ser 'U5.57', 'U4.SA1', 'AP.33' o '4.2.7')`);
    if (!f.i.length) {
      /* Exercici del llibre propi: l'enunciat i la solució han de ser a enunciats.js. */
      if (!/^\d+\.\d+\.\d+$/.test(n)) mal(`cataleg.js: ${k} no té imatges (i) i no és del llibre propi`);
      continue;
    }
    f.i.forEach(img => { if (!existeix(path.join(u, img))) mal(`cataleg.js: ${k}: no existeix ${u}/${img}`); });
    if (/^(U\d+|AP|AR|AT)\.[A-Z]/.test(n) && !f.e) avis(`cataleg.js: ${k} té una clau de text i no té etiqueta (e)`);
  }
}
const aCataleg = (u, n) => !!(CATALEG && CATALEG[u] && CATALEG[u][n]);

/* ── tasques.js ── */
const ids = new Set();
if (TASQUES) TASQUES.forEach((t, i) => {
  const qui = `tasques.js, tasca ${i + 1} (${t.unitat} setmana ${t.setmana})`;
  if (!UNITATS_META[t.unitat]) mal(`${qui}: unitat desconeguda`);
  if (!Number.isInteger(t.setmana)) mal(`${qui}: la setmana ha de ser un número`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(t.limit || '') || isNaN(new Date(t.limit))) mal(`${qui}: data límit no vàlida («${t.limit}»)`);
  if (t.obre && !/^\d{4}-\d{2}-\d{2}$/.test(t.obre)) mal(`${qui}: data d'obertura no vàlida («${t.obre}»)`);
  if (t.visible && !['sempre', 'mai'].includes(t.visible)) mal(`${qui}: visible ha de ser 'sempre' o 'mai'`);
  const id = ctx.idTasca(t);
  if (ids.has(id)) mal(`${qui}: hi ha dues tasques amb l'identificador ${id}`);
  ids.add(id);
  if (!Array.isArray(t.exercicis) || !t.exercicis.length) { mal(`${qui}: no té exercicis`); return; }
  const vistos = new Set();
  ctx.refsDe(t).forEach(r => {
    if (!aCataleg(r.u, r.n)) mal(`${qui}: l'exercici ${r.u}/${r.n} no és al catàleg`);
    if (vistos.has(r.u + '/' + r.n)) avis(`${qui}: l'exercici ${r.u}/${r.n} hi surt dues vegades`);
    vistos.add(r.u + '/' + r.n);
  });
});

/* ── hints.js ── */
if (PISTES) for (const [k, text] of Object.entries(PISTES)) {
  const j = k.lastIndexOf('/');
  const u = k.slice(0, j), n = k.slice(j + 1);
  if (!aCataleg(u, n)) mal(`hints.js: la pista ${k} és d'un exercici que no és al catàleg`);
  if (/[\r\n]/.test(text)) mal(`hints.js: la pista ${k} té salts de línia`);
  const sense = text.replace(/<\/?(i|b)( class="vec")?>|<br>/g, '');
  if (sense.includes('<')) mal(`hints.js: la pista ${k} té un «<» que no és <i>, <b> ni <br>`);
  for (const tag of ['i', 'b']) {
    const obre = (text.match(new RegExp(`<${tag}[ >]`, 'g')) || []).length;
    const tanca = (text.match(new RegExp(`</${tag}>`, 'g')) || []).length;
    if (obre !== tanca) mal(`hints.js: la pista ${k} té etiquetes <${tag}> sense tancar`);
  }
  if (/(<br>|\s)$/.test(text)) mal(`hints.js: la pista ${k} acaba amb <br> o amb un espai`);
  if (text.includes('$') || text.includes('`')) mal(`hints.js: la pista ${k} té «$» o un accent greu`);
}

/* ── errades.js ── */
const imatgesDe = camp => !camp ? [] : (Array.isArray(camp[0]) ? camp : [camp]);
if (ERRADES) for (const [k, llista] of Object.entries(ERRADES)) {
  const j = k.lastIndexOf('/');
  const u = k.slice(0, j), n = k.slice(j + 1);
  if (!aCataleg(u, n)) mal(`errades.js: ${k} no és al catàleg`);
  llista.forEach((e, i) => {
    if (!e.ondiu || !e.hadedir) mal(`errades.js: ${k} #${i}: hi falta ondiu o hadedir`);
    imatgesDe(e.marca).forEach(m => { if (!existeix(path.join(u, m[0]))) mal(`errades.js: ${k} #${i}: no existeix la imatge ${u}/${m[0]}`); });
    imatgesDe(e.pegat).forEach(p => {
      if (!existeix(path.join(u, p[0]))) mal(`errades.js: ${k} #${i}: no existeix la imatge ${u}/${p[0]}`);
      if (!existeix(path.join('pegats', u, p[5]))) mal(`errades.js: ${k} #${i}: no existeix el pegat pegats/${u}/${p[5]}`);
    });
  });
}

/* Les pàgines que surten a més d'una carpeta i porten pegats (la taula la fa eines/pegats/aplica.py). */
if (ctx.PAGINES_IGUALS) for (const r of Object.keys(ctx.PAGINES_IGUALS)) {
  if (!existeix(r)) mal(`errades.js: PAGINES_IGUALS: no existeix la imatge ${r}`);
}

/* ── enunciats.js ── */
const CAMPS_ENUN = ['titol', 'text', 'punts', 'apartats', 'col', 'fig', 'despres', 'solucio'];
if (ENUNCIATS) for (const [k, e] of Object.entries(ENUNCIATS)) {
  const j = k.lastIndexOf('/');
  const u = k.slice(0, j), n = k.slice(j + 1);
  if (!aCataleg(u, n)) mal(`enunciats.js: ${k} no és al catàleg`);
  Object.keys(e).forEach(c => { if (!CAMPS_ENUN.includes(c)) mal(`enunciats.js: ${k}: camp desconegut «${c}»`); });
  if (!e.text && !e.titol && !(e.apartats || []).length && !(e.punts || []).length) mal(`enunciats.js: ${k} és buit`);
  for (const c of ['punts', 'apartats', 'fig']) if (e[c] !== undefined && !Array.isArray(e[c])) mal(`enunciats.js: ${k}: «${c}» ha de ser una llista [ ]`);
  if (e.col !== undefined && !(Number.isInteger(e.col) && e.col >= 1 && e.col <= 4)) mal(`enunciats.js: ${k}: col ha de ser 1, 2, 3 o 4`);
  (e.fig || []).forEach(f => { if (!existeix(path.join(u, f))) mal(`enunciats.js: ${k}: no existeix la figura ${u}/${f}`); });
  if (e.solucio !== undefined && (!Array.isArray(e.solucio) || !e.solucio.length)) mal(`enunciats.js: ${k}: «solucio» ha de ser una llista [ ] amb algun paràgraf`);
}
/* Els exercicis del llibre propi (sense imatges) han de tenir enunciat i solució. */
if (CATALEG) for (const u of Object.keys(CATALEG)) for (const [n, f] of Object.entries(CATALEG[u])) {
  if (!Array.isArray(f.i) || f.i.length) continue;
  const e = ENUNCIATS && ENUNCIATS[u + '/' + n];
  if (!e) mal(`enunciats.js: ${u}/${n} és del llibre propi i no té enunciat`);
  else if (!e.solucio) mal(`enunciats.js: ${u}/${n} és del llibre propi i no té solució (solucio)`);
}
if (TASQUES && ENUNCIATS) {
  const falten = new Set();
  TASQUES.forEach(t => ctx.refsDe(t).forEach(r => { if (aCataleg(r.u, r.n) && !ENUNCIATS[r.u + '/' + r.n]) falten.add(r.u + '/' + r.n); }));
  if (falten.size) avis(`enunciats.js: exercicis programats sense enunciat (es veurà el títol curt): ${[...falten].join(', ')}`);
}

/* ── Fórmules: totes s'han de poder pintar amb el KaTeX del web ── */
let nFormules = 0;
function provaFormules(on, s){
  if (typeof s !== 'string') return;
  const trossos = s.replace(/\\./g, m => m === '\\$' ? '' : m).split('$');
  if (trossos.length % 2 === 0) { mal(`${on}: hi ha un «$» sense tancar`); return; }
  for (let i = 1; i < trossos.length; i += 2) {
    nFormules++;
    try { katex.renderToString(trossos[i], { throwOnError: true, macros: Object.assign({}, ctx.ERRADES_MACROS || {}) }); }
    catch (err) { mal(`${on}: KaTeX no entén «${trossos[i]}» (${String(err.message).split('\n')[0]})`); }
  }
}
if (katex) {
  if (ENUNCIATS) for (const [k, e] of Object.entries(ENUNCIATS))
    for (const c of ['titol', 'text', 'despres', 'punts', 'apartats', 'solucio'])
      [].concat(e[c] || []).forEach((s, i) => provaFormules(`enunciats.js: ${k} (${c}${Array.isArray(e[c]) ? ' ' + (i + 1) : ''})`, s));
  if (ERRADES) for (const [k, llista] of Object.entries(ERRADES))
    llista.forEach((e, i) => ['lloc', 'ondiu', 'hadedir', 'motiu'].forEach(c => provaFormules(`errades.js: ${k} #${i} (${c})`, e[c])));
} else mal('assets/katex/katex.min.js: no s\'ha pogut carregar KaTeX per provar les fórmules');

/* ── Resum ── */
avisos.forEach(a => console.log('  ! ' + a));
problemes.forEach(p => console.log('  ✗ ' + p));
console.log(`matèries: ${Object.keys(MATERIES || {}).length} · unitats: ${Object.keys(UNITATS_META || {}).length}`
  + ` · fitxes: ${nFitxes} · tasques: ${(TASQUES || []).length} · pistes: ${Object.keys(PISTES || {}).length}`
  + ` · exercicis amb errades: ${Object.keys(ERRADES || {}).length}`
  + ` · enunciats: ${Object.keys(ENUNCIATS || {}).length} · fórmules provades: ${nFormules}`);
if (problemes.length) { console.log(`HI HA ${problemes.length} PROBLEMES`); process.exit(1); }
console.log('TOT CORRECTE' + (avisos.length ? ` (amb ${avisos.length} avisos)` : ''));
