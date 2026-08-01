/* ═══════════════════════════════════════════════════════════════════════
   EL PROGRÉS DE L'ALUMNE  —  no cal tocar res d'aquest fitxer
   ───────────────────────────────────────────────────────────────────────
   Les creuetes de "fet" es guarden al navegador de l'alumne, UNA CLAU PER
   UNITAT ('u7-fet'), amb la llista de números d'exercici.

   Es guarda per unitat i no per tasca a posta: així, si reorganitzes la
   programació a mig curs (mous un exercici d'una setmana a una altra, el
   repeteixes en una setmana de repàs...), la creueta va enganxada a
   l'exercici i l'alumne no perd res.

   Abans les creuetes es guardaven per tema ('u7-continuitat-done'). La
   funció migra() les recull i les passa al format nou, un sol cop i sense
   esborrar les antigues.
   ═══════════════════════════════════════════════════════════════════════ */

const _UNITATS_PROGRES = ['u7','u8','u9','u10'];

function _clau(u){ return u + '-fet'; }

function _llegeix(u){
  try{
    const raw = localStorage.getItem(_clau(u));
    return raw ? new Set(JSON.parse(raw).map(Number)) : new Set();
  }catch(e){ return new Set(); }
}

function _desa(u, set){
  try{
    localStorage.setItem(_clau(u), JSON.stringify([...set].sort((a,b)=>a-b)));
  }catch(e){}
}

/* Recull les creuetes del format antic (una clau per tema) cap al nou. */
function _migra(u){
  try{
    if(localStorage.getItem(_clau(u)) !== null) return;   // ja migrat
    const set = new Set();
    const re = new RegExp('^' + u + '-[a-z-]+-done$');
    for(let i = 0; i < localStorage.length; i++){
      const k = localStorage.key(i);
      if(!k || !re.test(k)) continue;
      try{
        JSON.parse(localStorage.getItem(k)).forEach(id => {
          const m = String(id).match(/^ex(\d+)$/);
          if(m) set.add(parseInt(m[1], 10));
        });
      }catch(e){}
    }
    if(set.size) _desa(u, set);
  }catch(e){}
}

_UNITATS_PROGRES.forEach(_migra);

/* ── API ──────────────────────────────────────────────────────────────── */

function esFet(u, n){ return _llegeix(u).has(Number(n)); }

function marcaFet(u, n, fet){
  const set = _llegeix(u);
  if(fet) set.add(Number(n)); else set.delete(Number(n));
  _desa(u, set);
}

/* Quants exercicis d'una llista de refs {u,n} estan fets. */
function comptaFets(refs){
  let k = 0;
  refs.forEach(r => { if(esFet(r.u, r.n)) k++; });
  return k;
}
