/* ═══════════════════════════════════════════════════════════════════════
   LA PROGRAMACIÓ D'EXERCICIS
   ───────────────────────────────────────────────────────────────────────
   Aquest és l'ÚNIC fitxer que has de tocar per programar el curs.
   Edita'l, desa i fes commit: la web s'actualitza sola.

   Cada línia és una TASCA (una setmana de feina):

     { unitat:'u7', setmana:3, limit:'2026-10-04',
       exercicis:[92, 93, 94, 102, 103, 40, 106] },

     unitat     quina unitat didàctica (u7, u8, u9, u10)
     setmana    el número que veurà l'alumne
     limit      data límit, sempre en format AAAA-MM-DD
     exercicis  els exercicis, EN L'ORDRE QUE VOLS QUE ELS FACIN

   L'ORDRE MANA. Si escrius [112, 113, 114, 43, 120], l'alumne els veurà
   exactament així, encara que el 43 sigui d'una altra part del llibre.
   No cal que estiguin ordenats per número.

   ── Barrejar unitats en una mateixa tasca ──────────────────────────────
   Un exercici d'una altra unitat s'escriu amb el prefix:

     exercicis:[112, 113, 'u9:44', 120]

   El 112, el 113 i el 120 són de la unitat de la tasca; el 44 és de la u9.
   Útil per a setmanes de repàs abans d'un examen.

   ── Quan es fa visible una tasca ───────────────────────────────────────
   Per defecte, s'obre DIES_ABANS dies abans de la data límit (ara: 7).
   Ho pots canviar tasca per tasca:

     obre:'2026-09-10'     s'obre aquest dia concret
     visible:'sempre'      visible ja, passi el que passi
     visible:'mai'         amagada (per preparar-la amb antelació)

   Una tasca oberta ja no es torna a tancar: passada la data límit segueix
   consultable, marcada com a vençuda.
   ═══════════════════════════════════════════════════════════════════════ */

const DIES_ABANS = 7;

const TASQUES = [

  { unitat:'u7', setmana:1, limit:'2026-09-20', exercicis:[44, 45, 46, 47, 48] },
  { unitat:'u7', setmana:2, limit:'2026-09-27', exercicis:[66, 68, 70, 76, 88, 90] },
  { unitat:'u7', setmana:3, limit:'2026-10-04', exercicis:[92, 93, 94, 102, 103, 40, 106] },
  { unitat:'u7', setmana:4, limit:'2026-10-11', exercicis:[112, 113, 114, 43, 120] },

];


/* ═══════════════════════════════════════════════════════════════════════
   A PARTIR D'AQUÍ NO CAL QUE TOQUIS RES
   ═══════════════════════════════════════════════════════════════════════ */

/* Identificador estable d'una tasca: 'u7/s3'. Surt de la unitat i la
   setmana, així que no l'has d'escriure ni mantenir. */
function idTasca(t){ return t.unitat + '/s' + t.setmana; }

function _data(s){ return new Date(s + 'T00:00:00'); }

/* Quan s'obre una tasca: el que digui `obre`, o DIES_ABANS abans del límit. */
function dataObertura(t){
  if(t.obre) return _data(t.obre);
  const d = _data(t.limit);
  d.setDate(d.getDate() - DIES_ABANS);
  return d;
}

/* Vista prèvia del professor: afegint  ?tot=1  a l'adreça es veuen totes
   les tasques, també les que encara no s'han obert. Els alumnes no ho saben. */
function _preview(){
  try{ return location.search.indexOf('tot=1') >= 0; }catch(e){ return false; }
}

function tascaVisible(t, ara){
  if(_preview()) return true;
  if(t.visible === 'sempre') return true;
  if(t.visible === 'mai')    return false;
  const avui = ara || new Date();
  avui.setHours(0,0,0,0);
  return avui >= dataObertura(t);
}

function tascaVencuda(t, ara){
  const avui = ara || new Date();
  avui.setHours(0,0,0,0);
  return avui > _data(t.limit);
}

/* Dies que falten per a la data límit (negatiu si ja ha passat). */
function diesRestants(t, ara){
  const avui = ara || new Date();
  avui.setHours(0,0,0,0);
  return Math.round((_data(t.limit) - avui) / 86400000);
}

/* Els exercicis d'una tasca, resolts a {u, n}. Accepta 44 i 'u9:44'. */
function refsDe(t){
  return t.exercicis.map(e => {
    if(typeof e === 'number') return {u: t.unitat, n: e};
    const p = String(e).split(':');
    return {u: p[0], n: parseInt(p[1], 10)};
  });
}

function tasquesDe(unitat, ara){
  return TASQUES.filter(t => t.unitat === unitat && tascaVisible(t, ara))
                .sort((a,b) => a.setmana - b.setmana);
}

function tascaPerId(id, ara){
  return TASQUES.find(t => idTasca(t) === id && tascaVisible(t, ara)) || null;
}

/* Data en català: "diumenge, 4 d'octubre de 2026" */
function dataLlarga(s){
  try{
    return _data(s).toLocaleDateString('ca-ES',
      {weekday:'long', day:'numeric', month:'long', year:'numeric'});
  }catch(e){ return s; }
}
