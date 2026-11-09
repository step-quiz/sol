
const TASQUES = [

  { unitat:'u7', setmana:1, limit:'2026-09-20', exercicis:[44, 45, 46, 47, 48] },
  { unitat:'u7', setmana:2, limit:'2026-09-27', exercicis:[66, 68, 70, 76, 88, 90] },
  { unitat:'u7', setmana:3, limit:'2026-10-04', exercicis:[92, 93, 94, 102, 103, 40, 106] },
  { unitat:'u7', setmana:4, limit:'2026-10-11', exercicis:[112, 113, 114, 43, 120] },
  { unitat:'u8', setmana:5, limit:'2026-10-18', visible:'mai', exercicis:[37,86,87,88,92] },
  { unitat:'u8', setmana:6, limit:'2026-10-25', exercicis:[30,31,32,21,40,41] },
  { unitat:'u8', setmana:7, limit:'2026-11-01', exercicis:[46,54,58,93,97] },
  { unitat:'u9', setmana:8, limit:'2026-11-08', exercicis:[39, 41, 42, 44, 50, 51, 58] },
  { unitat:'u9', setmana:9, limit:'2026-11-15', exercicis:[30, 66, 67, 70] },
  { unitat:'u9', setmana:10, limit:'2026-11-22', exercicis:[34, 77, 79, 86, 87] },
  { unitat:'u10', setmana:11, limit:'2026-11-29', exercicis:[37, 38, 43, 45, 62, 63] },
  { unitat:'u10', setmana:12, limit:'2026-12-06', exercicis:[75, 78, 88, 91, 41, 100] },
  { unitat:'u13', setmana:13, limit:'2026-12-13', exercicis:[28, 29, 40, 60, 62, 32, 33, 35] },
  { unitat:'u13', setmana:14, limit:'2026-12-20', exercicis:[36, 96, 103, 104, 105, 106, 107, 108] },
  { unitat:'u14', setmana:15, limit:'2026-12-27', exercicis:[43, 46, 44, 50] },
  { unitat:'u14', setmana:16, limit:'2027-01-03', exercicis:[21, 53, 100, 101] },
  { unitat:'u10', setmana:17, limit:'2027-01-10', exercicis:[84, 108, 123, 124] },
  { unitat:'u1', setmana:18, limit:'2027-01-17', exercicis:[12, 13, 15, 16, 17] },
  { unitat:'u1', setmana:19, limit:'2027-01-24', exercicis:[42, 49, 69, 81, 85] },
  { unitat:'u2', setmana:20, limit:'2027-01-31', exercicis:[35, 36, 37, 41, 44] },
  { unitat:'u2', setmana:21, limit:'2027-02-07', exercicis:[79, 80, 83, 87] },
  { unitat:'u2', setmana:22, limit:'2027-02-14', exercicis:[95, 96, 99, 100] },
  { unitat:'u3', setmana:23, limit:'2027-02-21', exercicis:[38, 41, 42, 39, 43] },
  { unitat:'u3', setmana:24, limit:'2027-02-28', exercicis:[55, 56] },
  { unitat:'u3', setmana:25, limit:'2027-03-07', exercicis:[60, 64, 66] },
  { unitat:'u3', setmana:26, limit:'2027-03-14', exercicis:[90, 92, 94, 100] },
  { unitat:'u5', setmana:27, limit:'2027-03-21', exercicis:[43, 45, 46, 47, 49] },
  { unitat:'u5', setmana:28, limit:'2027-03-28', exercicis:[53, 54, 55, 56, 59] },
  { unitat:'u5', setmana:29, limit:'2027-04-04', exercicis:[63, 66, 71, 72, 73] },
  { unitat:'u5', setmana:30, limit:'2027-04-11', exercicis:[74, 76, 77, 79] },
  { unitat:'u5', setmana:31, limit:'2027-04-18', exercicis:[80, 81, 84, 85] },
  { unitat:'u6', setmana:32, limit:'2027-04-25', exercicis:[74, 76, 86, 88] },
  { unitat:'u6', setmana:33, limit:'2027-05-02', exercicis:[90, 92, 97, 115, 139] },
  { unitat:'u11', setmana:34, limit:'2027-05-09', exercicis:[52, 54] },
  { unitat:'u12', setmana:35, limit:'2027-05-16', exercicis:[35, 39, 55, 79] },
  { unitat:'u12', setmana:36, limit:'2027-05-23', exercicis:[80, 88, 96, 111, 114] }
];


const DIES_ABANS = 3;

/* ═══════════════════════════════════════════════════════════════════════
   LA PROGRAMACIÓ D'EXERCICIS
   ───────────────────────────────────────────────────────────────────────
   Aquest és l'ÚNIC fitxer que has de tocar per programar el curs.
   Edita'l, desa i fes commit: la web s'actualitza sola.

   Cada línia és una TASCA (una setmana de feina):

     { unitat:'u7', setmana:3, limit:'2026-10-04',
       exercicis:[92, 93, 94, 102, 103, 40, 106] },

     unitat     quina unitat didàctica (u1, u2, u3, u5 … u14)
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
   Per defecte, s'obre DIES_ABANS dies abans de la data límit (ara: 3).
   Ho pots canviar tasca per tasca:

     obre:'2026-09-10'     s'obre aquest dia concret
     visible:'sempre'      visible ja, passi el que passi
     visible:'mai'         amagada (per preparar-la amb antelació)

   Una tasca oberta ja no es torna a tancar: passada la data límit segueix
   consultable, marcada com a vençuda.
   ═══════════════════════════════════════════════════════════════════════ */



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
