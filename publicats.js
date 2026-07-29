const PUBLICATS = {

  'u7/practica':           'tots',
  'u7/limits-funcions':    'tots',
  'u7/limits-punt':        'tots',
  'u7/continuitat':        'tots',
  'u7/bolzano':            'tots',
  'u7/problemes-limits':   'tots',
  'u7/problemes-diversos': 'tots',
  'u7/series':             'tots',

  'u8/practica':           'tots',
  'u8/derivada-punt':      'tots',
  'u8/interpretacio-geometrica': 'tots',
  'u8/derivabilitat':      'tots',
  'u8/funcio-derivada':    'tots',
  'u8/problemes-contextualitzats': 'tots',
  'u8/problemes-diferents': 'tots',
  'u8/mon-real':           'tots',

  'u9/practica':           'tots',
  'u9/creixement':         'tots',
  'u9/concavitat':         'tots',
  'u9/optimitzacio':       'tots',
  'u9/teoremes':           'tots',
  'u9/hopital':            'tots',
  'u9/aplicacions':        'tots',
  'u9/problemes-diferents': 'tots',
  'u9/mon-real':           'tots',

  'u10/practica':                  'tots',
  'u10/domini-recorregut':         'tots',
  'u10/simetria-periodicitat':     'tots',
  'u10/asimptotes':                'tots',
  'u10/creixement':                'tots',
  'u10/concavitat':                'tots',
  'u10/estudi-complet':            'tots',
  'u10/representacio':             'tots',
  'u10/altres-funcions':           'tots',
  'u10/trossos':                   'tots',
  'u10/problemes-reals':           'tots',
  'u10/problemes-diferents':       'tots',
  'u10/mon-real':                  'tots',

};


/* ═══════════════════════════════════════════════════════════════════════
   QUINS EXERCICIS ES VEUEN A LA WEB
   ───────────────────────────────────────────────────────────────────────
   Aquest és l'ÚNIC fitxer que has de tocar per publicar o amagar
   exercicis. Edita'l, desa i fes commit: la web s'actualitza sola.

   Cada línia és:   'unitat/tema': 'tots',

   Valors possibles a la dreta:
     'cap'          → el tema no apareix enlloc (ni al menú)
     'tots'         → es veuen tots els exercicis del tema
     '44-49'        → només del 44 al 49
     '44-49, 52'    → del 44 al 49, i també el 52
     '44, 46, 51'   → només aquests tres

   Exemple d'un curs que va avançant:
     setmana 1 →  'u7/limits-funcions': 'tots',
     setmana 2 →  'u7/limits-funcions': 'tots',
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
