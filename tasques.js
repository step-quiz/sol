
const TASQUES = [

  /* ── 4t ESO Aplicades ─────────────────────────────────────────────────── */

  /* EXEMPLES: amagats (visible:'mai'). Es veuen només amb  index.html?tot=1 .
     Quan tinguis les setmanes de la UD4, substitueix-los per les de debò.   */
  /* UD1 i UD2: setmanes de 2026-27 ja passades. Amagades (visible:'mai'); per al curs 2027-28, canvia les dates i treu visible. */
  { unitat:'apl-ud1',  setmana:1, limit:'2026-09-20', visible:'mai',
    exercicis:['U1.4', 'U1.5', 'U1.6', 'U1.40', 'U1.41', 'U1.23', 'U1.46'] },
  { unitat:'apl-ud1',  setmana:2, limit:'2026-09-27', visible:'mai',
    exercicis:['U1.8', 'U1.10', 'U1.43', 'U1.45', 'U1.20', 'U1.21', 'U1.22', 'U1.83'] },
  { unitat:'apl-ud1',  setmana:3, limit:'2026-10-04', visible:'mai',
    exercicis:['U1.11', 'U1.12', 'U1.50', 'U1.52', 'U1.53', 'U1.60', 'U1.FN', 'U1.82'] },
  { unitat:'apl-ud2',  setmana:1, limit:'2026-10-11', visible:'mai',
    exercicis:['U2.27', 'U2.28', 'U2.29', 'U2.30', 'U2.89', 'U2.90', 'U2.91'] },
  { unitat:'apl-ud2',  setmana:2, limit:'2026-10-18', visible:'mai',
    exercicis:['U2.31', 'U2.33', 'U2.35', 'U2.92', 'U2.96', 'U2.99'] },
  { unitat:'apl-ud2',  setmana:3, limit:'2026-10-25', visible:'mai',
    exercicis:['U2.32', 'U2.97', 'U2.98', 'U2.103', 'U2.104', 'U2.105'] },
  { unitat:'apl-ud2',  setmana:4, limit:'2026-11-01', visible:'mai',
    exercicis:['U2.36', 'U2.37', 'U2.38', 'U2.39', '2.5.1', '2.5.2', '2.5.3', '2.5.4'] },
  { unitat:'apl-ud2',  setmana:5, limit:'2026-11-08', visible:'mai',
    exercicis:['2.5.5', '2.6.1', '2.6.2', '2.6.3', '2.6.4', '2.6.5', 'U2.94', 'U2.FN'] },
  { unitat:'apl-ud3',  setmana:1, limit:'2026-11-15', visible:'mai',
    exercicis:['U2.48', 'U2.59', 'U5.28', 'U5.34', 'U5.67', 'U5.69'] },
  { unitat:'apl-ud4',  setmana:1, limit:'2026-11-29', visible:'mai',
    exercicis:['4.1.3', '4.2.2', '4.2.7', 'U5.57', 'U5.64', 'U5.81', '4.3.2'] },
  { unitat:'apl-ud11', setmana:1, limit:'2026-12-20', visible:'mai',
    exercicis:['AP.1', 'AP.2', 'AP.33', 'AP.36', 'AP.71'] },
  { unitat:'apl-ud5',  setmana:1, limit:'2027-01-17', visible:'mai',
    exercicis:['U3.33', 'U3.37', 'U3.41', 'AP.49', 'U3.63', 'U7.94'] },
  { unitat:'apl-ud6',  setmana:1, limit:'2027-03-21', visible:'mai',
    exercicis:['U7.QS1', 'U7.45', 'U7.49', 'U6.24', 'U7.86', 'U7.105'] },
  { unitat:'apl-ud7',  setmana:1, limit:'2027-04-18', visible:'mai',
    exercicis:['U6.7', 'U6.52', 'U6.89', 'U7.89', 'U7.92', 'U2.44'] },
  { unitat:'apl-ud8',  setmana:1, limit:'2027-05-09', visible:'mai',
    exercicis:['U8.6', 'U8.34', 'U8.40', 'U8.58', 'U8.70', 'U8.89', '8.3.2', '8.3.10'] },
  { unitat:'apl-ud9',  setmana:1, limit:'2027-05-30', visible:'mai',
    exercicis:['U9.2', 'U9.27', 'U9.33', 'U9.41', 'U9.58', 'U9.93', '9.5.2', '9.5.9'] },
  { unitat:'apl-ud10', setmana:1, limit:'2027-02-28', visible:'mai',
    exercicis:['U4.24', 'U4.25', 'U4.26', 'U4.32', 'U4.39', 'U4.SA1'] },

  /* ── 4t ESO Acadèmiques ───────────────────────────────────────────────── */

];


const DIES_ABANS = 3;

/* ═══════════════════════════════════════════════════════════════════════
   LA PROGRAMACIÓ D'EXERCICIS
   ───────────────────────────────────────────────────────────────────────
   Aquest és l'ÚNIC fitxer que has de tocar per programar el curs.
   Edita'l, desa i fes commit: la web s'actualitza sola.

   Cada línia és una TASCA (una setmana de feina):

     { unitat:'apl-ud4', setmana:3, limit:'2026-12-06',
       exercicis:['4.2.7', 'U5.57', 'U5.81', '4.3.2'] },

     unitat     la UD del teu llibre, amb el prefix de la matèria: 'apl-ud4'
                (Aplicades, UD4), 'apl-ud10' (Aplicades, UD10)…
     setmana    el número que veurà l'alumne
     limit      data límit, sempre en format AAAA-MM-DD
     exercicis  els exercicis, EN L'ORDRE QUE VOLS QUE ELS FACIN, sempre
                entre cometes. La clau diu d'on surt cada exercici:
                  'U5.57'   Santillana, unitat 5, exercici 57
                  'U4.SA1'  Santillana, unitat 4, situació d'aprenentatge 1
                            (també 'U4.FN' fake news, 'U4.AV1' autoavaluació,
                            'U3.QS1' Què saps ja)
                  'AP.33'   Santillana, annex de Polinomis, exercici 33
                  '4.2.7'   el teu llibre, exercici 4.2.7

   L'ORDRE MANA. Si escrius ['U5.64', '4.2.7', 'U5.57'], l'alumne els veurà
   exactament així.

   ── Barrejar unitats en una mateixa tasca ──────────────────────────────
   Un exercici d'una altra UD s'escriu amb la UD i dos punts:

     exercicis:['U5.64', 'apl-ud10:U4.24', '4.3.2']

   Útil per a setmanes de repàs abans d'un examen.

   ── Quan es fa visible una tasca ───────────────────────────────────────
   Per defecte, s'obre DIES_ABANS dies abans de la data límit (ara: 3).
   Ho pots canviar tasca per tasca:

     obre:'2026-11-20'     s'obre aquest dia concret
     visible:'sempre'      visible ja, passi el que passi
     visible:'mai'         amagada (per preparar-la amb antelació)

   Una tasca oberta ja no es torna a tancar: passada la data límit segueix
   consultable, marcada com a vençuda.

   Vista prèvia del professor: afegeix  ?tot=1  a l'adreça
   (index.html?tot=1) i es veuen totes les tasques, també les amagades.
   ═══════════════════════════════════════════════════════════════════════ */



/* ═══════════════════════════════════════════════════════════════════════
   A PARTIR D'AQUÍ NO CAL QUE TOQUIS RES
   ═══════════════════════════════════════════════════════════════════════ */

/* Identificador estable d'una tasca: 'apl-ud4/s3'. Surt de la unitat i la
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

/* El que cal afegir als enllaços interns perquè la vista prèvia (?tot=1, i
   l'eina de marcar, &marca=1) no es perdi en passar d'una pàgina a l'altra. */
function cercaPreview(){
  try{ return _preview() ? location.search : ''; }catch(e){ return ''; }
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

/* Una clau d'exercici: 24 (o '24') és un número; 'U5.57' o '4.2.7' es queden com a text. */
function _clauEx(x){
  const s = String(x).trim();
  return /^\d+$/.test(s) ? parseInt(s, 10) : s;
}

/* Els exercicis d'una tasca, resolts a {u, n}. Accepta 'U5.57', '4.2.7' i 'apl-ud10:U4.24'. */
function refsDe(t){
  return t.exercicis.map(e => {
    const s = String(e);
    const k = s.indexOf(':');
    if(k < 0) return {u: t.unitat, n: _clauEx(s)};
    return {u: s.slice(0, k), n: _clauEx(s.slice(k + 1))};
  });
}

function tasquesDe(unitat, ara){
  return TASQUES.filter(t => t.unitat === unitat && tascaVisible(t, ara))
                .sort((a,b) => a.setmana - b.setmana);
}

function tascaPerId(id, ara){
  return TASQUES.find(t => idTasca(t) === id && tascaVisible(t, ara)) || null;
}

/* Data en català: "diumenge, 29 de novembre de 2026" */
function dataLlarga(s){
  try{
    return _data(s).toLocaleDateString('ca-ES',
      {weekday:'long', day:'numeric', month:'long', year:'numeric'});
  }catch(e){ return s; }
}
