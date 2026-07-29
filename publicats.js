const PUBLICATS = {

  'u7/practica':           'cap',
  'u7/limits-funcions':    '44,45,46,47,48',
  'u7/limits-punt':        '66,68,70,76,88,90',
  'u7/continuitat':        '92,93,94,102,103,40,106',
  'u7/bolzano':            '112,113,114,120',
  'u7/problemes-limits':   'cap',
  'u7/problemes-diversos': 'cap',
  'u7/series':             'cap',

  'u8/practica':           'cap',
  'u8/derivada-punt':      'cap',
  'u8/interpretacio-geometrica': 'cap',
  'u8/derivabilitat':      'cap',
  'u8/funcio-derivada':    'cap',
  'u8/problemes-contextualitzats': 'cap',
  'u8/problemes-diferents': 'cap',
  'u8/mon-real':           'cap',

  'u9/practica':           'cap',
  'u9/creixement':         'cap',
  'u9/concavitat':         'cap',
  'u9/optimitzacio':       'cap',
  'u9/teoremes':           'cap',
  'u9/hopital':            'cap',
  'u9/aplicacions':        'cap',
  'u9/problemes-diferents': 'cap',
  'u9/mon-real':           'cap',

};


/* ═══════════════════════════════════════════════════════════════════════
   QUINS EXERCICIS ES VEUEN A LA WEB
   ───────────────────────────────────────────────────────────────────────
   Aquest és l'ÚNIC fitxer que has de tocar per publicar o amagar
   exercicis. Edita'l, desa i fes commit: la web s'actualitza sola.

   Cada línia és:   'unitat/tema': 'què es veu',

   Valors possibles a la dreta:
     'cap'          → el tema no apareix enlloc (ni al menú)
     'tots'         → es veuen tots els exercicis del tema
     '44-49'        → només del 44 al 49
     '44-49, 52'    → del 44 al 49, i també el 52
     '44, 46, 51'   → només aquests tres

   Exemple d'un curs que va avançant:
     setmana 1 →  'u7/limits-funcions': '44-49',
     setmana 2 →  'u7/limits-funcions': '44-56',
     setmana 3 →  'u7/limits-funcions': 'tots',

   Si un tema no surt en aquesta llista, es comporta com si fos 'cap'.
   ═══════════════════════════════════════════════════════════════════════ */

/* ═══════════════════════════════════════════════════════════════════════
   A partir d'aquí no cal tocar res.
   ═══════════════════════════════════════════════════════════════════════ */

/* Converteix '44-49, 52' en un Set {44,45,46,47,48,49,52}.
   Retorna la cadena 'tots', o null si la clau no està definida. */
function _expandeix(spec){
  if(typeof spec !== 'string') return null;
  const s = spec.trim().toLowerCase();
  if(s === 'tots') return 'tots';
  if(s === 'cap' || s === '') return new Set();
  const set = new Set();
  s.split(',').forEach(tros=>{
    const t = tros.trim();
    if(!t) return;
    const m = t.match(/^(\d+)\s*[-–—]\s*(\d+)$/);
    if(m){
      const [a,b] = [Number(m[1]), Number(m[2])].sort((x,y)=>x-y);
      for(let i=a; i<=b; i++) set.add(i);
    } else if(/^\d+$/.test(t)){
      set.add(Number(t));
    }
  });
  return set;
}

/* Es veu l'exercici `num` del tema `clau`? */
function esPublicat(clau, num){
  const r = _expandeix(PUBLICATS[clau]);
  if(r === 'tots') return true;
  if(!r) return false;
  return r.has(num);
}

/* Quants exercicis té publicats el tema `clau`?
   Retorna un número, o 'tots'. */
function comptaPublicats(clau){
  const r = _expandeix(PUBLICATS[clau]);
  if(r === 'tots') return 'tots';
  if(!r) return 0;
  return r.size;
}
