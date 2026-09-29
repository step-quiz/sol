const PUBLICATS = {

  'u1/activitats':                 'cap',
  'u1/practica':                   'cap',
  'u1/operacions':                 'cap',
  'u1/rang':                       'cap',
  'u1/inversa':                    'cap',
  'u1/equacions':                  'cap',
  'u1/problemes':                  'cap',
  'u1/mon-real':                   'cap',

  'u7/practica':           'cap',
  'u7/limits-funcions':    'cap',
  'u7/limits-punt':        'cap',
  'u7/continuitat':        'cap',
  'u7/bolzano':            'cap',
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

  'u10/practica':                  'cap',
  'u10/domini-recorregut':         'cap',
  'u10/simetria-periodicitat':     'cap',
  'u10/asimptotes':                'cap',
  'u10/creixement':                'cap',
  'u10/concavitat':                'cap',
  'u10/estudi-complet':            'cap',
  'u10/representacio':             'cap',
  'u10/altres-funcions':           'cap',
  'u10/trossos':                   'cap',
  'u10/problemes-reals':           'cap',
  'u10/problemes-diferents':       'cap',
  'u10/mon-real':                  'cap',

  'u11/practica':                  'cap',
  'u11/primitiva':                 'cap',
  'u11/funcions-elementals':       'cap',
  'u11/integracio-parts':          'cap',
  'u11/funcions-racionals':        'cap',
  'u11/canvi-variable':            'cap',
  'u11/integrals-funcions':        'cap',
  'u11/problemes-reals':           'cap',
  'u11/problemes-diferents':       'cap',
  'u11/mon-real':                  'cap',

  'u12/practica':                  'cap',
  'u12/integral-definida':         'cap',
  'u12/valor-mitja':               'cap',
  'u12/teorema-fonamental':        'cap',
  'u12/regla-barrow':              'cap',
  'u12/area-corba':                'cap',
  'u12/area-corbes':               'cap',
  'u12/problemes-reals':           'cap',
  'u12/problemes-diferents':       'cap',
  'u12/mon-real':                  'cap',

  'u13/practica':                     'cap',
  'u13/espai-mostral':                'cap',
  'u13/probabilitat-esdeveniments':   'cap',
  'u13/calcul-probabilitats':         'cap',
  'u13/probabilitat-condicionada':    'cap',
  'u13/bayes':                        'cap',
  'u13/problemes-quotidians':         'cap',
  'u13/problemes-diferents':          'cap',
  'u13/mon-real':                     'cap',

  'u14/practica':                  'cap',
  'u14/variables-discretes':       'cap',
  'u14/distribucio-binomial':      'cap',
  'u14/variables-continues':       'cap',
  'u14/distribucio-normal':        'cap',
  'u14/aproximacio-normal':        'cap',
  'u14/calcul-probabilitats':      'cap',
  'u14/problemes-diferents':       'cap',
  'u14/mon-real':                  'cap',

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
