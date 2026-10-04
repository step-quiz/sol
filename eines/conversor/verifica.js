#!/usr/bin/env node
// Comprova errades.js sense obrir cap navegador:
//   1) diu el mateix que els .tex de tex/ (errades i observacions, text per text);
//   2) totes les fórmules es pinten, en mode estricte, amb el mateix KaTeX que porta el web;
//   3) les funcions tornen el que toca amb els pegats encesos i apagats;
//   4) les imatges i els fitxers que s'hi anomenen (marques i pegats) existeixen.
// Ús:  node eines/conversor/verifica.js [fitxer]      (per defecte, l'errades.js del repo)
const fs = require('fs'), vm = require('vm'), path = require('path'), cp = require('child_process');
const ARREL = path.resolve(__dirname, '..', '..');
const katex = require(path.join(ARREL, 'assets', 'katex', 'katex.min.js'));
const fitxer = process.argv[2] ? path.resolve(process.argv[2]) : path.join(ARREL, 'errades.js');
const src = fs.readFileSync(fitxer, 'utf8');
const d = JSON.parse(cp.execFileSync('python3', [path.join(__dirname, '..', 'dades.py'), '--json'], {encoding: 'utf8', maxBuffer: 1 << 28}));

function carrega(pegats){                       // el fitxer tal com el veuria el navegador, amb l'interruptor que es demani
  const ctx = { katex }; vm.createContext(ctx);
  const s = src.replace(/^const ERRADES_PEGATS\s*=\s*(true|false);/m, 'const ERRADES_PEGATS = ' + pegats + ';')
               .replace(/^const ERRADES_MOTIU\s*=\s*(true|false);/m, 'const ERRADES_MOTIU = false;')
               .replace(/^const ERRADES_OBS\s*=\s*(true|false);/m, 'const ERRADES_OBS = false;');
  vm.runInContext(s.replace(/^const (\w+)\s*=/mg, 'var $1 ='), ctx);
  return ctx;
}
const ctx = carrega(false), ctxOn = carrega(true);
let errors = 0, avisos = 0;
const falla = m => { errors++; console.log('  ✗', m); };
const avisa = m => { avisos++; console.log('  !', m); };

// 1) errades: mateixes claus, mateix nombre i mateix text que als .tex
const kTex = Object.keys(d.ERR).sort(), kJs = Object.keys(ctx.ERRADES).sort();
if(JSON.stringify(kTex) !== JSON.stringify(kJs)) falla('els exercicis amb errades no són els mateixos que als .tex: ' +
    'només al .tex [' + kTex.filter(k => !kJs.includes(k)) + '] · només a errades.js [' + kJs.filter(k => !kTex.includes(k)) + ']');
let n = 0, nEnun = 0;
for(const k of kTex){
  const a = d.ERR[k], b = ctx.ERRADES[k] || [];
  if(a.length !== b.length){ falla(k + ": nombre d'errades diferent (" + a.length + ' al .tex, ' + b.length + ' a errades.js)'); continue; }
  a.forEach((e, i) => {
    n++;
    if(e.ondiu !== b[i].ondiu) falla(k + ' #' + i + ': «On diu» diferent');
    if(e.hadedir !== b[i].hadedir) falla(k + ' #' + i + ': «Ha de dir» diferent');
    if((e.motiu || undefined) !== b[i].motiu) falla(k + ' #' + i + ': «Motiu» diferent');
    const num = k.split('/')[1];
    const t = b[i].enunciat ? `Exercici ${num} (enunciat)` : ('Exercici ' + num + (b[i].lloc ? (/^[a-z]\)/.test(b[i].lloc) ? ' ' : ', ') + b[i].lloc : ''));
    if(t !== e.t) falla(k + ' #' + i + ': títol «' + t + '» ≠ «' + e.t + '»');
    if(b[i].enunciat) nEnun++;
  });
}
// 2) observacions
const oTex = Object.keys(d.OBS).sort(), oJs = Object.keys(ctx.OBSERVACIONS).sort();
if(JSON.stringify(oTex) !== JSON.stringify(oJs)) falla('els exercicis amb observacions no són els mateixos que als .tex');
let no = 0;
for(const k of oTex){
  const a = d.OBS[k], b = ctx.OBSERVACIONS[k] || [];
  if(a.length !== b.length){ falla(k + ": nombre d'observacions diferent"); continue; }
  a.forEach((o, i) => { no++; if(o.text !== b[i].text) falla(k + ' observació #' + i + ': text diferent'); });
}
// 3) totes les fórmules, amb el KaTeX del web, en mode estricte
let nf = 0;
const prova = (k, s) => {
  if(!s) return;
  const p = s.split('$');
  if(p.length % 2 === 0) falla(k + ': dòlars desaparellats: ' + s);
  p.forEach((x, i) => { if(i % 2){ nf++; try{ katex.renderToString(x, {throwOnError: true, strict: 'error', macros: Object.assign({}, ctx.ERRADES_MACROS)}); }catch(e){ falla(k + ': ' + e.message); } } });
};
for(const k in ctx.ERRADES) ctx.ERRADES[k].forEach(e => ['lloc', 'ondiu', 'hadedir', 'motiu'].forEach(c => prova(k, e[c])));
for(const k in ctx.OBSERVACIONS) ctx.OBSERVACIONS[k].forEach(o => ['lloc', 'text'].forEach(c => prova(k, o[c])));

// 4) el que es veu: avisos, targetes, requadres i pegats, amb l'interruptor apagat i encès
const quantes = k => k === 0 ? '' : (k === 1 ? '1 errada al solucionari' : k + ' errades al solucionari');
const compta = (s, re) => (s.match(re) || []).length;
let nMarques = 0, nPegats = 0, nCallades = 0;
for(const [nom, c] of [['pegats apagats', ctx], ['pegats encesos', ctxOn]]){
  const encesos = c === ctxOn;
  for(const k of Object.keys(c.ERRADES)){
    const [u, num] = k.split('/'), errs = c.ERRADES[k];
    const callada = e => encesos && c.pegatsDe(e).length > 0;
    const anunciades = errs.filter(e => !callada(e));
    if(encesos) nCallades += errs.length - anunciades.length;
    const vol = quantes(anunciades.filter(e => !e.enunciat).length);
    if(c.avisErrades(u, num) !== vol) falla(`${k} (${nom}): l'avís diu «${c.avisErrades(u, num)}» i hauria de dir «${vol}»`);
    const html = c.htmlErrades(u, num);
    if(compta(html, /class="err-card"/g) !== anunciades.length) falla(`${k} (${nom}): ${compta(html, /class="err-card"/g)} targetes per ${anunciades.length} errades anunciades`);
    if(/katex-error/.test(html + c.htmlErradesEnunciat(u, num))) falla(`${k} (${nom}): hi ha una fórmula que KaTeX no entén`);
    if(!!c.htmlErradesEnunciat(u, num) !== errs.some(e => e.enunciat)) falla(`${k} (${nom}): el bloc d'errades d'enunciat no toca`);
    const imatges = new Set(); errs.forEach(e => c.marquesDe(e).forEach(m => imatges.add(m.img)));
    for(const img of imatges){
      const esperades = anunciades.reduce((a, e) => a + c.marquesDe(e).filter(m => m.img === img).length, 0);
      if(compta(c.htmlMarques(u, num, img), /class="marca"/g) !== esperades) falla(`${k} (${nom}): requadres sobre ${img}`);
    }
  }
}
// 5) marques i pegats: les imatges i els fitxers existeixen, i els pegats surten sobre la seva imatge
const perImatge = {}, fitxersPegat = new Set();
for(const k of Object.keys(ctx.ERRADES)){
  const [u, num] = k.split('/'), cat = (d.CAT[u] || {})[num] || [];
  ctx.ERRADES[k].forEach((e, i) => {
    ctx.marquesDe(e).forEach(m => {
      nMarques++;
      if(!cat.includes(m.img)) falla(`${k} #${i}: la marca apunta a ${m.img}, que no és una imatge d'aquest exercici a cataleg.js`);
      if(!fs.existsSync(path.join(ARREL, u, m.img))) falla(`${k} #${i}: no existeix la imatge ${u}/${m.img}`);
      if([m.x, m.y, m.w, m.h].some(v => !(v >= 0 && v <= 100)) || m.x + m.w > 100.5 || m.y + m.h > 100.5) falla(`${k} #${i}: marca fora de la imatge`);
    });
    ctxOn.pegatsDe(e).forEach(p => {
      nPegats++; perImatge[u + '/' + p.img] = (perImatge[u + '/' + p.img] || 0) + 1; fitxersPegat.add(u + '/' + p.f);
      if(!fs.existsSync(path.join(ARREL, u, p.img))) falla(`${k} #${i}: no existeix la imatge ${u}/${p.img}`);
      if(!fs.existsSync(path.join(ARREL, 'pegats', u, p.f))) falla(`${k} #${i}: no existeix el pegat pegats/${u}/${p.f}`);
      if(p.x + p.w > 100.01 || p.y + p.h > 100.01 || p.x < 0 || p.y < 0) falla(`${k} #${i}: pegat fora de la imatge`);
    });
  });
}
for(const ui in perImatge){
  const u = ui.split('/')[0], img = ui.slice(u.length + 1);
  if(compta(ctxOn.htmlPegats(u, img), /class="pegat"/g) !== perImatge[ui]) falla(`pegats sobre ${ui}: no en surten ${perImatge[ui]}`);
  if(ctx.htmlPegats(u, img) !== '') falla(`amb l'interruptor apagat no hi ha d'haver pegats (${ui})`);
}
const dirPegats = path.join(ARREL, 'pegats');
if(fs.existsSync(dirPegats)) for(const u of fs.readdirSync(dirPegats)) for(const f of fs.readdirSync(path.join(dirPegats, u)))
  if(f.endsWith('.png') && !fitxersPegat.has(u + '/' + f)) avisa(`pegats/${u}/${f} no el fa servir cap errada`);

console.log(`errades: ${n} (${nEnun} d'enunciat) en ${kJs.length} exercicis · observacions: ${no} en ${oJs.length} exercicis · fórmules provades: ${nf} · KaTeX ${katex.version}`);
console.log(`marques: ${nMarques} · pegats: ${nPegats} · errades que no s'anuncien amb els pegats encesos: ${nCallades}`);
console.log(errors ? `HI HA ${errors} PROBLEMES` : 'TOT QUADRA' + (avisos ? ` (amb ${avisos} avisos)` : ''));
process.exit(errors ? 1 : 0);
