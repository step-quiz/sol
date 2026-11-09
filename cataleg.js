/* ═══════════════════════════════════════════════════════════════════════
   CATÀLEG D'EXERCICIS
   ───────────────────────────────────────────────────────────────────────
   Fitxer mantingut a mà (no el genera cap programa).
   Les PISTES no viuen aquí: són a hints.js.

   ── Matèries i unitats ─────────────────────────────────────────────────
   Aquest web té dues matèries de 4t d'ESO: Aplicades i Acadèmiques.
   Les unitats són les UD del llibre propi (Overleaf), no les de Santillana:

     apl-ud1    Aplicades, UD1 · Nombres reals des de l’estimació (carpeta apl-ud1/)
     apl-ud2    Aplicades, UD2 · Percentatges i matemàtica financera (carpeta apl-ud2/)
     apl-ud3    Aplicades, UD3 · Proporcionalitat i escales (carpeta apl-ud3/)
     apl-ud4    Aplicades, UD4 · Mesura indirecta       (carpeta apl-ud4/)
     apl-ud11   Aplicades, UD11 · Idea de polinomi      (carpeta apl-ud11/)
     apl-ud5    Aplicades, UD5 · Equacions de 2n grau   (carpeta apl-ud5/)
     apl-ud10   Aplicades, UD10 · Sistemes              (carpeta apl-ud10/)
     apl-ud6    Aplicades, UD6 · La paràbola            (carpeta apl-ud6/)
     apl-ud7    Aplicades, UD7 · Funcions: llegim gràfics (carpeta apl-ud7/)
     apl-ud8    Aplicades, UD8 · Estadística            (carpeta apl-ud8/)
     apl-ud9    Aplicades, UD9 · Atzar i decisions      (carpeta apl-ud9/)

   L'identificador és alhora la carpeta de les imatges i el principi de la
   clau de pistes, errades i enunciats:  'apl-ud10/U4.24'.
   `ordre` és la posició de la UD dins del curs (l'índex les mostra així):
   UD1, UD2, UD3, UD4, UD11, UD5, UD10, UD6, UD7, UD8, UD9.

   ── Les claus dels exercicis ───────────────────────────────────────────
   Una UD pot agafar exercicis de diverses unitats de Santillana i del
   llibre propi. Per això la clau porta l'origen:

     'U4.24'    Santillana, unitat 4, exercici 24     → etiqueta «U4 · 24»
     'U4.SA1'   Santillana, unitat 4, situació 1      → «U4 · Situació 1»
     'U3.QS1'   Santillana, unitat 3, Què saps ja 1   → «U3 · Què saps ja 1»
     'AP.33'    Santillana, annex de Polinomis, 33    → «Annex Pol. · 33»
                (els altres annexos: 'AR.' Potències i radicals, 'AT.' Trigonometria)
     '4.2.7'    llibre propi, exercici 4.2.7          → «4.2.7»

   ── Cada exercici ──────────────────────────────────────────────────────
     t   : títol (descripció curta)
     d   : dificultat ('●○○' | '●●○' | '●●●' | '')
     i   : imatges de suport (enunciat i solució), en ordre, dins de la
           carpeta de la unitat. Els exercicis del llibre propi no en tenen
           (i:[]): l'enunciat i la solució són a enunciats.js, en KaTeX.
     e   : (opcional) etiqueta curta: 'Repte 1', 'Situació 2'… Als de
           Santillana s'hi afegeix l'origen al davant («U4 · Situació 2»).
     nom : (opcional) títol de la pàgina de l'exercici. Sense nom,
           «Exercici 24 · U4» o «Exercici 4.2.7».

   Les tasques (tasques.js) només guarden aquestes claus. Tota la resta surt
   d'aquí: això és el que permet que una tasca barregi exercicis de temes
   diferents i en fixi l'ordre lliurement.
   ═══════════════════════════════════════════════════════════════════════ */

const MATERIES = {
  'apl': {nom:'Matemàtiques Aplicades',   curs:'4t d’ESO'},
  'aca': {nom:'Matemàtiques Acadèmiques', curs:'4t d’ESO'},
};

const UNITATS_META = {
  'apl-ud1':  {materia:'apl', nom:'Unitat 1',  subtitol:'Nombres reals des de l’estimació',    ordre:1},
  'apl-ud2':  {materia:'apl', nom:'Unitat 2',  subtitol:'Percentatges i matemàtica financera', ordre:2},
  'apl-ud3':  {materia:'apl', nom:'Unitat 3',  subtitol:'Proporcionalitat i escales',          ordre:3},
  'apl-ud4':  {materia:'apl', nom:'Unitat 4',  subtitol:'Mesura indirecta',                    ordre:4},
  'apl-ud11': {materia:'apl', nom:'Unitat 11', subtitol:'Idea de polinomi',                    ordre:5},
  'apl-ud5':  {materia:'apl', nom:'Unitat 5',  subtitol:'Equacions de 2n grau',                ordre:6},
  'apl-ud10': {materia:'apl', nom:'Unitat 10', subtitol:'Sistemes d’equacions i inequacions', ordre:7},
  'apl-ud6':  {materia:'apl', nom:'Unitat 6',  subtitol:'La paràbola',                         ordre:8},
  'apl-ud7':  {materia:'apl', nom:'Unitat 7',  subtitol:'Funcions: llegim gràfics',            ordre:9},
  'apl-ud8':  {materia:'apl', nom:'Unitat 8',  subtitol:'Estadística',                         ordre:10},
  'apl-ud9':  {materia:'apl', nom:'Unitat 9',  subtitol:'Atzar i decisions',                   ordre:11},
};

const CATALEG = {

  'apl-ud1': {
    /* ── Santillana, unitat 1 · Activitats (pàgines 6–11 del llibre) */
    'U1.3': {t:'Representa nombres racionals a la recta', d:'', i:['u1-activitats/data/full-1.png']},
    'U1.4': {t:'Arrels quadrades de l’1 al 20: racionals o irracionals', d:'', i:['u1-activitats/data/full-1.png']},
    'U1.5': {t:'De quin tipus són aquests nombres', d:'', i:['u1-activitats/data/full-1.png']},
    'U1.6': {t:'Escriu quatre nombres irracionals i explica per què ho són', d:'', i:['u1-activitats/data/full-1.png']},
    'U1.7': {t:'Classifica en racionals i irracionals', d:'', i:['u1-activitats/data/full-1.png', 'u1-activitats/data/full-2.png']},
    'U1.8': {t:'Representa nombres reals a la recta', d:'', i:['u1-activitats/data/full-2.png']},
    'U1.9': {t:'Troba amb la calculadora aquests nombres i representa’ls de manera aproximada', d:'', i:['u1-activitats/data/full-2.png']},
    'U1.10': {t:'Una recta real amb els punts A, B, C i D', d:'', i:['u1-activitats/data/full-2.png']},
    'U1.11': {t:'A quin conjunt numèric pertany cada nombre', d:'', i:['u1-activitats/data/full-2.png']},
    'U1.12': {t:'El menor conjunt numèric de cada nombre', d:'', i:['u1-activitats/data/full-2.png']},
    'U1.20': {t:'Trunca i arrodoneix a les centèsimes', d:'', i:['u1-activitats/data/full-3.png']},
    'U1.21': {t:'Arrodonir les notes de 10 estudiants', d:'', i:['u1-activitats/data/full-3.png']},
    'U1.22': {t:'Aproxima per arrodoniment i per truncament amb dues xifres decimals', d:'', i:['u1-activitats/data/full-3.png']},
    'U1.23': {t:'La diagonal d’un rectangle de 8 cm i 10 cm: quin tipus de nombre és', d:'', i:['u1-activitats/data/full-3.png']},
    'U1.27': {t:'Expressa com a intervals els nombres reals que compleixen unes condicions', d:'', i:['u1-activitats/data/full-4.png']},
    'U1.28': {t:'Escriu i representa intervals a la recta real', d:'', i:['u1-activitats/data/full-4.png']},
    'U1.29': {t:'Expressa com a intervals', d:'', i:['u1-activitats/data/full-4.png']},
    'U1.30': {t:'Unió i intersecció d’intervals', d:'', i:['u1-activitats/data/full-4.png', 'u1-activitats/data/full-5.png']},
    'U1.31': {t:'Vertader o fals sobre intervals', d:'', i:['u1-activitats/data/full-5.png']},

    /* ── Santillana, unitat 1 · Activitats finals: nombres reals (pàgines 11–18). L’exercici 42 surt resolt al llibre */
    'U1.34': {t:'Ordena nombres amb la seva lletra i troba el palíndrom', d:'●○○', i:['u1-reals/data/full-1.png']},
    'U1.40': {t:'Quines arrels quadrades de l’1 al 20 són racionals', d:'●○○', i:['u1-reals/data/full-2.png']},
    'U1.41': {t:'Quins d’aquests nombres són racionals i quins irracionals', d:'●○○', i:['u1-reals/data/full-3.png']},
    'U1.43': {t:'Representa arrels a la recta real', d:'●●○', i:['u1-reals/data/full-3.png']},
    'U1.44': {t:'Representa irracionals de forma exacta amb dues descomposicions', d:'●●●', i:['u1-reals/data/full-3.png', 'u1-reals/data/full-4.png']},
    'U1.45': {t:'Ordena de menor a major amb la calculadora', d:'●●○', i:['u1-reals/data/full-4.png']},
    'U1.46': {t:'L’altura d’un triangle equilàter: quin tipus de nombre és', d:'●●○', i:['u1-reals/data/full-4.png']},
    'U1.47': {t:'Raona si les afirmacions són certes', d:'●●●', i:['u1-reals/data/full-4.png']},
    'U1.48': {t:'Un nombre irracional entre dos racionals', d:'●●●', i:['u1-reals/data/full-4.png']},
    'U1.49': {t:'Es pot representar el nombre d’or de forma exacta a la recta?', d:'●●●', i:['u1-reals/data/full-4.png', 'u1-reals/data/full-5.png']},
    'U1.50': {t:'Encreuat: el menor conjunt numèric de cada nombre', d:'●○○', i:['u1-reals/data/full-5.png']},
    'U1.51': {t:'Joc de les targetes dels conjunts numèrics', d:'●●○', i:['u1-reals/data/full-5.png']},
    'U1.52': {t:'Tots els conjunts numèrics als quals pertanyen aquests nombres', d:'●●○', i:['u1-reals/data/full-5.png']},
    'U1.53': {t:'Classifica, escriu en forma decimal i ordena', d:'●●○', i:['u1-reals/data/full-5.png', 'u1-reals/data/full-6.png']},
    'U1.54': {t:'Ordena els nombres i troba dues paraules bifrontals', d:'●●○', i:['u1-reals/data/full-6.png']},
    'U1.55': {t:'Vertader o fals sobre nombres, amb raonament', d:'●●○', i:['u1-reals/data/full-6.png']},
    'U1.56': {t:'Repte: si a < b, què passa amb els oposats i amb els inversos?', d:'●●●', i:['u1-reals/data/full-6.png']},
    'U1.57': {t:'Si a és racional, quin tipus de nombre és 2a, a/2, √2·a i πa', d:'●●○', i:['u1-reals/data/full-6.png', 'u1-reals/data/full-7.png']},
    'U1.58': {t:'Si a és irracional, quin tipus de nombre és cada expressió', d:'●●○', i:['u1-reals/data/full-7.png']},
    'U1.59': {t:'Vertader o fals sobre nombres reals, amb raonament', d:'●●○', i:['u1-reals/data/full-7.png']},
    'U1.60': {t:'Opera i indica quin tipus de nombre real resulta', d:'●●●', i:['u1-reals/data/full-8.png']},

    /* ── Santillana, unitat 1 · Activitats finals: aproximació i error (pàgines 21–25) */
    'U1.79': {t:'Encreuat: arrodoneix a les horitzontals i trunca a les verticals', d:'●○○', i:['u1-aproximacio/data/full-1.png', 'u1-aproximacio/data/full-2.png']},
    'U1.80': {t:'Arrodoneix a les deumil·lèsimes i compara amb l’excés i el defecte', d:'●○○', i:['u1-aproximacio/data/full-2.png']},
    'U1.81': {t:'Poden coincidir les aproximacions per excés i per defecte?', d:'●●○', i:['u1-aproximacio/data/full-2.png']},
    'U1.82': {t:'Aproximacions històriques de π: error absolut i relatiu', d:'●○○', i:['u1-aproximacio/data/full-2.png', 'u1-aproximacio/data/full-3.png']},
    'U1.83': {t:'Arrodonir abans o després d’operar: on es comet menys error?', d:'●○○', i:['u1-aproximacio/data/full-3.png']},
    'U1.84': {t:'Excés, defecte i arrodoniment: poden coincidir?', d:'●●○', i:['u1-aproximacio/data/full-3.png']},
    'U1.85': {t:'Què surt a la calculadora si fixem 4 o 5 decimals', d:'●●○', i:['u1-aproximacio/data/full-3.png']},
    'U1.86': {t:'Escriu un nombre que compleixi unes condicions d’aproximació', d:'●●○', i:['u1-aproximacio/data/full-4.png']},
    'U1.87': {t:'Error absolut i relatiu en arrodonir i truncar', d:'●●○', i:['u1-aproximacio/data/full-4.png']},
    'U1.88': {t:'L’any solar: error absolut i relatiu', d:'●●○', i:['u1-aproximacio/data/full-4.png']},
    'U1.89': {t:'La massa del protó i de l’electró: error absolut i relatiu', d:'●●○', i:['u1-aproximacio/data/full-4.png', 'u1-aproximacio/data/full-5.png']},

    /* ── Santillana, unitat 1 · Activitats finals i problemes: intervals (pàgines 25–28). Els 102–107 són els problemes aparentment diferents */
    'U1.90': {t:'Expressa situacions mitjançant intervals', d:'●○○', i:['u1-intervals/data/full-1.png']},
    'U1.91': {t:'En quin interval es troba un nombre', d:'●○○', i:['u1-intervals/data/full-1.png']},
    'U1.92': {t:'Escriu tres nombres de cada interval', d:'●○○', i:['u1-intervals/data/full-1.png']},
    'U1.93': {t:'El límit de 125 anys d’edat en forma d’interval', d:'●●○', i:['u1-intervals/data/full-1.png']},
    'U1.94': {t:'Memory: uneix les targetes del mateix interval', d:'●○○', i:['u1-intervals/data/full-1.png', 'u1-intervals/data/full-2.png']},
    'U1.95': {t:'Nombres racionals entre 0 i 1', d:'●○○', i:['u1-intervals/data/full-2.png']},
    'U1.96': {t:'Vertader o fals sobre intervals', d:'●○○', i:['u1-intervals/data/full-2.png']},
    'U1.97': {t:'Unions i interseccions dels intervals A, B i C', d:'●●○', i:['u1-intervals/data/full-2.png']},
    'U1.98': {t:'Completa amb parèntesis, claudàtors o nombres', d:'●●○', i:['u1-intervals/data/full-2.png']},
    'U1.99': {t:'A quin interval pertanyen x + y, x − y, y − x i x · y', d:'●●●', i:['u1-intervals/data/full-2.png']},
    'U1.100': {t:'Expressa com a interval aquests conjunts numèrics', d:'●●○', i:['u1-intervals/data/full-2.png', 'u1-intervals/data/full-3.png']},
    'U1.101': {t:'Repte: les edats consecutives de sis persones', d:'●●●', i:['u1-intervals/data/full-3.png']},
    'U1.102': {t:'Els nombres entre 147 000 000 i 152 000 000 en forma d’interval', d:'', i:['u1-intervals/data/full-3.png']},
    'U1.103': {t:'La distància de la Terra al Sol en forma d’interval', d:'', i:['u1-intervals/data/full-3.png']},
    'U1.104': {t:'Copia i completa els buits', d:'', i:['u1-intervals/data/full-3.png']},
    'U1.105': {t:'Invertir 1 000 € en un fons al 3 % anual', d:'', i:['u1-intervals/data/full-4.png']},
    'U1.106': {t:'L’interval que conté aquests nombres', d:'', i:['u1-intervals/data/full-4.png']},
    'U1.107': {t:'Inversió mínima i màxima en un fons al 3 % anual', d:'', i:['u1-intervals/data/full-4.png']},

    /* ── Santillana, unitat 1 · Fake news (pàgina 27) */
    'U1.FN': {t:'Hi havia tanta gent? Tres quartes parts i un terç dels assistents', d:'', i:['u1-intervals/data/full-3.png'], e:'Fake news', nom:'Fake news'},
  },

  'apl-ud2': {
    /* ── Santillana, unitat 2 · Activitats de percentatges i interès (pàgines 37–39 del llibre) */
    'U2.27': {t:'Percentatge d’estudiants que fan cada activitat extraescolar', d:'', i:['u2-percentatges/data/full-1.png']},
    'U2.28': {t:'Un televisor de 360 € que s’encareix un 5,8 %', d:'', i:['u2-percentatges/data/full-1.png']},
    'U2.29': {t:'70 tones de cereal: quant s’obté del gra i de la palla', d:'', i:['u2-percentatges/data/full-1.png']},
    'U2.30': {t:'La natalitat baixa un 12,5 %: quants nadons van néixer l’any passat', d:'', i:['u2-percentatges/data/full-1.png']},
    'U2.31': {t:'Augment del 12 %, i el 20 % d’això és 112: quina és la quantitat', d:'', i:['u2-percentatges/data/full-1.png']},
    'U2.32': {t:'Un cotxe amb un descompte del 20 % i un 21 % d’IVA', d:'', i:['u2-percentatges/data/full-2.png']},
    'U2.33': {t:'Augment del 28 % i rebaixa del 12 %: el preu inicial', d:'', i:['u2-percentatges/data/full-2.png']},
    'U2.34': {t:'El 94 % dels estudiants superen les proves d’accés', d:'', i:['u2-percentatges/data/full-2.png']},
    'U2.35': {t:'Pujar un 15 % i després baixar un 15 %: tornem al preu inicial?', d:'', i:['u2-percentatges/data/full-2.png']},
    'U2.36': {t:'Interès de 100 € al 3,5 % durant 2 anys i mig', d:'', i:['u2-percentatges/data/full-2.png']},
    'U2.37': {t:'Capital invertit al 4,5 % durant 2 anys si en retornen 2 346 €', d:'', i:['u2-percentatges/data/full-2.png']},
    'U2.38': {t:'El rèdit d’un préstec de 4 000 € que es torna amb 5 080 €', d:'', i:['u2-percentatges/data/full-2.png', 'u2-percentatges/data/full-3.png']},
    'U2.39': {t:'Quant de temps cal tenir 3 000 € al 3 % per obtenir 225 €', d:'', i:['u2-percentatges/data/full-3.png']},

    /* ── Santillana, unitat 2 · Activitats finals (pàgines 51–56) */
    'U2.89': {t:'Quin percentatge hi ha en aquestes expressions', d:'●○○', i:['u2-problemes/data/full-1.png']},
    'U2.90': {t:'Calcula aquests percentatges de 300', d:'●○○', i:['u2-problemes/data/full-1.png']},
    'U2.91': {t:'Un embassament de 200 hm³ al 45 %', d:'●○○', i:['u2-problemes/data/full-1.png']},
    'U2.92': {t:'Dues pujades seguides del 3 % sobre 72 €', d:'●●○', i:['u2-problemes/data/full-1.png']},
    'U2.93': {t:'Una notícia de premsa amb percentatges', d:'●●○', i:['u2-problemes/data/full-2.png']},
    'U2.94': {t:'La comissió d’un venedor de cotxes', d:'●○○', i:['u2-problemes/data/full-2.png']},
    'U2.95': {t:'Vertader o fals sobre percentatges', d:'●●○', i:['u2-problemes/data/full-2.png']},
    'U2.96': {t:'Els estudiants d’un institut baixen un 20 %', d:'●○○', i:['u2-problemes/data/full-3.png']},
    'U2.97': {t:'Un televisor de 240 € amb un descompte del 20 % i IVA', d:'●●○', i:['u2-problemes/data/full-3.png']},
    'U2.98': {t:'A quant ha de vendre un minorista per guanyar un 20 %', d:'●●○', i:['u2-problemes/data/full-3.png']},
    'U2.99': {t:'Quants diners cal augmentar per a una pujada del 24 %', d:'●●○', i:['u2-problemes/data/full-3.png']},
    'U2.100': {t:'Un còctel amb suc de taronja i extracte de kiwi', d:'●●○', i:['u2-problemes/data/full-3.png', 'u2-problemes/data/full-4.png']},
    'U2.101': {t:'La bretxa salarial: en quin percentatge és superior el salari dels homes', d:'●●○', i:['u2-problemes/data/full-4.png']},
    'U2.102': {t:'Repte: reduir un 40 % els accidents a l’aire lliure', d:'●●●', i:['u2-problemes/data/full-4.png']},
    'U2.103': {t:'Quant valia un producte etiquetat a 60 € amb IVA i guany', d:'●●●', i:['u2-problemes/data/full-4.png']},
    'U2.104': {t:'Uns pantalons de 38 € amb un descompte del 25 % i IVA', d:'●●○', i:['u2-problemes/data/full-4.png', 'u2-problemes/data/full-5.png']},
    'U2.105': {t:'L’IVA en cada etapa: fabricant, magatzem i botiga', d:'●●●', i:['u2-problemes/data/full-5.png']},
    'U2.107': {t:'El capital invertit al 2,5 % durant 3 anys', d:'●●○', i:['u2-problemes/data/full-5.png']},
    'U2.108': {t:'El rèdit d’un préstec de 6 000 € que es torna amb 7 600 €', d:'●○○', i:['u2-problemes/data/full-6.png']},

    /* ── Santillana, unitat 2 · Fake news (pàgina 57) */
    'U2.FN': {t:'La calefacció: tres pujades seguides del 10 % al gasoil', d:'', i:['u2-fake-news/data/full-1.png'], e:'Fake news', nom:'Fake news'},

    /* ── Llibre propi · UD2 (activitats 2.5 i 2.6). L'enunciat i la solució són a enunciats.js.
          Fora: «Per al Quadern d'eines». */
    '2.5.1': {t:'Interès simple de dos capitals', d:'', i:[]},
    '2.5.2': {t:'Quota i total d’un crèdit de 1 500 €', d:'', i:[]},
    '2.5.3': {t:'El cost real d’un mòbil en 12 quotes', d:'', i:[]},
    '2.5.4': {t:'Caça l’error: l’interès sense el temps', d:'', i:[]},
    '2.5.5': {t:'Decideix: un ordinador al comptat o en 18 quotes', d:'', i:[]},
    '2.5.6': {t:'Estima abans de calcular: un préstec de 3 000 €', d:'', i:[]},
    '2.6.1': {t:'Cost total amb entrada i quotes', d:'', i:[]},
    '2.6.2': {t:'Una bici al comptat o a terminis', d:'', i:[]},
    '2.6.3': {t:'Tres opcions per a un portàtil de 800 €', d:'', i:[]},
    '2.6.4': {t:'Caça l’error: la quota més baixa', d:'', i:[]},
    '2.6.5': {t:'Decideix amb criteri: quan finançar', d:'', i:[]},
  },

  'apl-ud3': {
    /* ── Santillana, unitat 2 · Activitats de proporcionalitat (pàgines 31–33 del llibre) */
    'U2.1': {t:'4 pàgines en 20 minuts: quant triguen a fer-ne 22', d:'', i:['u2-activitats/data/full-1.png']},
    'U2.2': {t:'Una connexió de 600 Mbps repartida entre ordinadors', d:'', i:['u2-activitats/data/full-1.png', 'u2-activitats/data/full-2.png']},
    'U2.3': {t:'Dos exemples de magnituds directament i inversament proporcionals', d:'', i:['u2-activitats/data/full-2.png']},
    'U2.4': {t:'Una impressora 3D que fa 4 peces en 20 minuts', d:'', i:['u2-activitats/data/full-2.png']},
    'U2.5': {t:'Diners per a 12 dies: quant puc gastar perquè en durin 15', d:'', i:['u2-activitats/data/full-2.png']},
    'U2.6': {t:'30 gallines i un sac de pinso', d:'', i:['u2-activitats/data/full-2.png']},
    'U2.7': {t:'Quants menús del dia pel preu de 14 menús degustació', d:'', i:['u2-activitats/data/full-2.png']},
    'U2.8': {t:'16 màquines en 6 hores: quantes en calen per a 4 hores', d:'', i:['u2-activitats/data/full-2.png']},
    'U2.9': {t:'Les calories d’un iogurt de 125 g', d:'', i:['u2-activitats/data/full-2.png']},
    'U2.10': {t:'El tipus de proporcionalitat entre tres magnituds', d:'', i:['u2-activitats/data/full-3.png']},
    'U2.11': {t:'Exemples de tres magnituds relacionades', d:'', i:['u2-activitats/data/full-3.png']},
    'U2.12': {t:'Un exemple de quatre magnituds relacionades', d:'', i:['u2-activitats/data/full-3.png']},

    /* ── Santillana, unitat 2 · Activitats finals (pàgines 40–44) */
    'U2.45': {t:'Indica el tipus de proporcionalitat en cada cas', d:'●○○', i:['u2-problemes/data/full-1.png']},
    'U2.46': {t:'El lloguer d’un traster', d:'●○○', i:['u2-problemes/data/full-1.png']},
    'U2.47': {t:'Exemples de magnituds proporcionals a classe', d:'●○○', i:['u2-problemes/data/full-1.png']},
    'U2.48': {t:'El salmó d’una recepta per a 8 persones', d:'●○○', i:['u2-problemes/data/full-1.png', 'u2-problemes/data/full-2.png']},
    'U2.49': {t:'15 € diaris durant 6 dies: i si han de durar 9?', d:'●○○', i:['u2-problemes/data/full-2.png']},
    'U2.50': {t:'La velocitat d’un coet al cap de 5 minuts', d:'●○○', i:['u2-problemes/data/full-2.png']},
    'U2.51': {t:'L’eco contra una paret a 50 m', d:'●○○', i:['u2-problemes/data/full-2.png']},
    'U2.58': {t:'Plantar avets a 50 cm en lloc de 60 cm', d:'●○○', i:['u2-problemes/data/full-3.png']},
    'U2.59': {t:'61 pals de telèfon separats 15 m', d:'●●○', i:['u2-problemes/data/full-4.png']},
    'U2.60': {t:'15 pàgines al dia durant 12 dies: quantes per acabar en 8', d:'●●○', i:['u2-problemes/data/full-4.png']},
    'U2.61': {t:'La velocitat d’un vaixell que fa la travessia en 6 h i mitja', d:'●●○', i:['u2-problemes/data/full-4.png']},
    'U2.62': {t:'Els vasos d’arròs d’una paella', d:'●●○', i:['u2-problemes/data/full-4.png']},
    'U2.63': {t:'12 kg de cafè: quant cal pagar si n’envien 4,5 kg menys', d:'●●○', i:['u2-problemes/data/full-4.png']},
    'U2.64': {t:'640 ovelles i menjar per a 65 dies', d:'●●○', i:['u2-problemes/data/full-4.png', 'u2-problemes/data/full-5.png']},
    'U2.65': {t:'Investiga amb un quadrat de costat a', d:'●●○', i:['u2-problemes/data/full-5.png']},

    /* ── Santillana, unitat 5 · Escales (pàgines 134–137). Fora les 24, 25, 29 i 33: volums × k³ (F1) */
    'U5.22': {t:'Distàncies en un mapa: Sevilla–Barcelona i Càceres–València', d:'', i:['u5-escales/data/full-1.png']},
    'U5.23': {t:'L’escala dels mapes on l’equador mesura 30 cm, 95 cm i 2 m', d:'', i:['u5-escales/data/full-1.png']},
    'U5.28': {t:'La superfície d’un futbolí a escala 1:75', d:'', i:['u5-escales/data/full-2.png']},
    'U5.32': {t:'El preu de les tartes segons la superfície', d:'', i:['u5-escales/data/full-3.png']},
    'U5.34': {t:'Un futbolí semblant a un camp de 100 × 70 m', d:'', i:['u5-escales/data/full-3.png']},

    /* ── Santillana, unitat 5 · Activitats finals: escales i problemes (pàgines 148–151) */
    'U5.67': {t:'Un mapa a escala 1:400 000', d:'●●○', i:['u5-problemes/data/full-1.png']},
    'U5.68': {t:'Una carretera de 45 km en tres plànols', d:'●●○', i:['u5-problemes/data/full-1.png']},
    'U5.69': {t:'Tres escales per representar Galícia en un DIN A4', d:'●●○', i:['u5-problemes/data/full-1.png']},
    'U5.70': {t:'Escala gràfica i escala numèrica', d:'●●○', i:['u5-problemes/data/full-1.png']},
    'U5.71': {t:'París–Viena en un mapa: l’escala i la distància Berlín–Praga', d:'●●○', i:['u5-problemes/data/full-1.png', 'u5-problemes/data/full-2.png']},
    'U5.79': {t:'Els augments d’un microscopi electrònic', d:'', i:['u5-problemes/data/full-3.png']},

    /* ── Santillana, unitat 3 · Activitats finals (pàgina 82) */
    'U3.61': {t:'Les tarifes de l’aigua: quants metres cúbics per 50,83 €', d:'●●○', i:['u3-problemes/data/full-1.png']},
  },

  'apl-ud4': {

    /* ── Santillana, unitat 5 · Activitats (pàgines 133–134 del llibre) */
    'U5.19': {t:'Són semblants els dos rectangles? Troba’n la raó de semblança', d:'', i:['u5-activitats/data/full-1.png', 'u5-activitats/data/full-2.png']},
    'U5.20': {t:'Costats d’un heptàgon de perímetre 25 cm semblant a un altre de conegut', d:'', i:['u5-activitats/data/full-2.png']},
    'U5.21': {t:'Cert o fals: tots els quadrats, tots els rombes, tots els hexàgons regulars són semblants', d:'', i:['u5-activitats/data/full-2.png']},

    /* ── Santillana, unitat 5 · Activitats finals · 2. Semblances (pàgines 145–148) */
    'U5.57': {t:'Costats de triangles semblants a un de 3, 6 i 8 cm amb k = 2 i k = 1/2', d:'●○○', i:['u5-semblanca/data/full-1.png', 'u5-semblanca/data/full-2.png']},
    'U5.61': {t:'Tots els triangles rectangles són semblants?', d:'●●○', i:['u5-semblanca/data/full-3.png']},
    'U5.63': {t:'Dos pentàgons semblants amb raó 5/2: un costat, un angle i un altre costat', d:'●○○', i:['u5-semblanca/data/full-3.png']},
    'U5.64': {t:'Costats d’un triangle semblant a un de 5, 6 i 8 cm amb raó 1,6', d:'●○○', i:['u5-semblanca/data/full-3.png']},
    'U5.65': {t:'Triangle semblant a un de 7, 8 i 10 cm amb perímetre 125 cm', d:'●●○', i:['u5-semblanca/data/full-3.png']},
    'U5.66': {t:'Dos quadrilàters amb els angles iguals són semblants?', d:'●●○', i:['u5-semblanca/data/full-3.png', 'u5-semblanca/data/full-4.png']},

    /* ── Santillana, unitat 5 · Problemes (pàgines 150–151) */
    'U5.77': {t:'Dues columnes i dos cables que es creuen: l’altura del punt de tall', d:'●●●', i:['u5-problemes/data/full-1.png', 'u5-problemes/data/full-2.png']},
    'U5.80': {t:'Costat que falta en dos triangles rectangles semblants', d:'', i:['u5-problemes/data/full-2.png']},
    'U5.81': {t:'L’ombra d’un edifici i la d’un fanal de 5 m', d:'', i:['u5-problemes/data/full-2.png']},

    /* ── Santillana, unitat 7 (pàgina 223) */
    'U7.91': {t:'L’ombra d’un pal d’1 m: taula, funció i gràfica', d:'●●○', i:['u7-problemes/data/full-1.png']},

    /* ── Llibre propi · UD4. L'enunciat i la solució són a enunciats.js.
          Fora: els «Per al Quadern d'eines» i la reflexió final. */
    '4.1.1': {t:'Com es diuen els costats d’un triangle rectangle?', d:'', i:[]},
    '4.1.2': {t:'Triangles semblants amb raó k = 3: el costat corresponent', d:'', i:[]},
    '4.1.3': {t:'L’arbre: altura per ombres', d:'', i:[]},
    '4.1.4': {t:'Estima primer: l’arbre fa més o menys de 5 m?', d:'', i:[]},
    '4.1.5': {t:'Caça l’error: es poden restar les ombres?', d:'', i:[]},
    '4.2.1': {t:'Costats d’un triangle semblant a un de 3, 4 i 5 amb k = 2', d:'', i:[]},
    '4.2.2': {t:'Ombres: l’altura d’una torre', d:'', i:[]},
    '4.2.3': {t:'Ombres al revés: l’ombra d’una persona', d:'', i:[]},
    '4.2.4': {t:'El mirall: l’altura d’un arbre', d:'', i:[]},
    '4.2.5': {t:'Caça l’error: la raó invertida', d:'', i:[]},
    '4.2.6': {t:'Estima abans de calcular: la torre i el pal', d:'', i:[]},
    '4.2.7': {t:'El riu: l’amplada amb estaques', d:'', i:[]},
    '4.2.8': {t:'Una foto amb referència: l’altura d’un arbre', d:'', i:[]},
    '4.2.9': {t:'La foto ampliada: raó de semblança i àrea', d:'', i:[]},
    '4.3.1': {t:'Pitàgores: el costat que falta', d:'', i:[]},
    '4.3.2': {t:'L’escala recolzada a la paret', d:'', i:[]},
    '4.3.3': {t:'La diagonal d’un camp rectangular', d:'', i:[]},
    '4.3.4': {t:'La tirolina: la llargada del cable', d:'', i:[]},
    '4.3.5': {t:'Amb marge d’error: l’altura d’un pal', d:'', i:[]},
    '4.3.6': {t:'Caça l’error: Pitàgores sumant', d:'', i:[]},
    '4.3.7': {t:'Decideix el mètode: ombres o Pitàgores?', d:'', i:[]},
    '4.3.8': {t:'On és més important no equivocar-se?', d:'', i:[]},
    '4.4.1': {t:'Tria el mètode i resol: pal, escala i rampa', d:'', i:[]},
    '4.4.2': {t:'Amb marge: com dones el resultat?', d:'', i:[]},
    '4.4.3': {t:'Caça l’error: el cable i el pal', d:'', i:[]},
    '4.4.4': {t:'Decideix el mètode: riu, arbre i bassa', d:'', i:[]},
    '4.4.5': {t:'Per què mesurar per dos mètodes?', d:'', i:[]},
    '4.6.1': {t:'Ombres: l’altura d’un arbre', d:'', i:[]},
    '4.6.2': {t:'Pitàgores: l’escala', d:'', i:[]},
    '4.6.3': {t:'La diagonal d’una porxada', d:'', i:[]},
    '4.6.4': {t:'Amb marge: l’altura d’una torre', d:'', i:[]},
    '4.6.5': {t:'Caça l’error: l’escala de 5 m', d:'', i:[]},
    '4.6.6': {t:'Decideix el mètode: la diagonal d’una bassa', d:'', i:[]},
  },

  'apl-ud11': {

    /* Santillana, annex de Polinomis (clau 'AP.'). Fora (vistiplau P5): divisió, Ruffini i
       factorització; les igualtats notables van a la UD5. */

    /* ── Què saps ja i activitats (pàgines 317–318 del llibre) */
    'AP.QS1': {t:'Calcula 2x²y − 3x − x²y + 5x', d:'', i:['ap-activitats/data/full-1.png'], e:'Què saps ja 1', nom:'Què saps ja 1'},
    'AP.1':   {t:'Resta dos polinomis de grau 3', d:'', i:['ap-activitats/data/full-1.png']},
    'AP.2':   {t:'Valor numèric: P(1) + P(−1) i P(0) + Q(−1)', d:'', i:['ap-activitats/data/full-1.png', 'ap-activitats/data/full-2.png']},
    'AP.3':   {t:'Multiplica un polinomi de grau 3 per x − 1', d:'', i:['ap-activitats/data/full-2.png']},
    'AP.4':   {t:'Quant ha de valer a perquè P(a) = 0?', d:'', i:['ap-activitats/data/full-2.png']},

    /* ── Activitats finals · Polinomis (pàgines 324–325) */
    'AP.32':  {t:'Opera amb tres polinomis P, Q i R', d:'●○○', i:['ap-exercicis/data/full-1.png']},
    'AP.33':  {t:'Opera i digues el grau i el terme independent del resultat', d:'●○○', i:['ap-exercicis/data/full-1.png', 'ap-exercicis/data/full-2.png']},
    'AP.35':  {t:'Inventa tres polinomis amb P(2) = 5', d:'●○○', i:['ap-exercicis/data/full-2.png']},
    'AP.36':  {t:'Troba a sabent el valor numèric del polinomi per a x = −3', d:'●○○', i:['ap-exercicis/data/full-2.png']},
    'AP.38':  {t:'Joc: inventa polinomis que donin un valor numèric fixat', d:'●●○', i:['ap-exercicis/data/full-2.png']},

    /* ── Activitats finals · 3. Problemes amb polinomis (pàgines 332–335) */
    'AP.71':  {t:'La pàgina d’un llibre: superfície total i superfície útil', d:'●●○', i:['ap-problemes/data/full-1.png']},
    'AP.72':  {t:'El cost de x contenidors amb x caixes, x bosses i x articles', d:'●●○', i:['ap-problemes/data/full-1.png', 'ap-problemes/data/full-2.png']},
    'AP.73':  {t:'La càrrega i la descàrrega de la bateria d’un cotxe elèctric', d:'●●○', i:['ap-problemes/data/full-2.png']},
    'AP.74':  {t:'Les calories diàries segons l’OMS i l’activitat física', d:'●●●', i:['ap-problemes/data/full-2.png']},
    'AP.75':  {t:'El volum d’un cilindre en funció del radi', d:'●●●', i:['ap-problemes/data/full-2.png']},
    'AP.76':  {t:'B(x) = I(x) − G(x) i B(365)', d:'', i:['ap-problemes/data/full-3.png']},
    'AP.77':  {t:'Ingressos i despeses d’una empresa: el benefici en un any', d:'', i:['ap-problemes/data/full-3.png']},
    'AP.80':  {t:'Valor numèric d’un polinomi de grau 2 en diversos punts', d:'', i:['ap-problemes/data/full-3.png']},
    'AP.81':  {t:'Els assistents a una festa al llarg de les hores', d:'', i:['ap-problemes/data/full-4.png']},
  },

  'apl-ud5': {

    /* Santillana, unitat 3 (equacions), unitat 7 (paràboles) i annex de Polinomis (igualtats
       notables). Fora (vistiplau P6 i F9): biquadrades, grau 3 amb Ruffini, paràmetres
       (Act. 10, ex. 47, 50 i 52) i inequacions. */

    /* ── U3 · Què saps ja i activitats (pàgines 61–67 del llibre) */
    'U3.QS1': {t:'Quins valors són solució de (x + 1)(x − 1) = 3?', d:'', i:['u3-activitats/data/full-1.png'], e:'Què saps ja 1', nom:'Què saps ja 1'},
    'U3.QS2': {t:'Quins punts no són a l’interval de la recta?', d:'', i:['u3-activitats/data/full-1.png'], e:'Què saps ja 2', nom:'Què saps ja 2'},
    'U3.1':   {t:'Indica la incògnita, el grau i els membres de dues equacions', d:'', i:['u3-activitats/data/full-1.png']},
    'U3.2':   {t:'Quins valors són solució d’una equació amb fraccions?', d:'', i:['u3-activitats/data/full-1.png', 'u3-activitats/data/full-2.png']},
    'U3.3':   {t:'Comprova si x = 3 i x = −3 són solució de quatre equacions', d:'', i:['u3-activitats/data/full-2.png']},
    'U3.4':   {t:'Escriu una equació que tingui la solució donada', d:'', i:['u3-activitats/data/full-2.png']},
    'U3.5':   {t:'Resol quatre equacions de primer i de segon grau', d:'', i:['u3-activitats/data/full-2.png']},
    'U3.6':   {t:'Escriu una equació de primer grau amb la solució donada', d:'', i:['u3-activitats/data/full-2.png']},
    'U3.7':   {t:'Troba equacions de segon grau amb les solucions donades', d:'', i:['u3-activitats/data/full-3.png']},
    'U3.8':   {t:'Resol equacions de segon grau', d:'', i:['u3-activitats/data/full-3.png']},
    'U3.9':   {t:'Determina el nombre de solucions amb el discriminant', d:'', i:['u3-activitats/data/full-3.png']},
    'U3.11':  {t:'Dues equacions de segon grau amb una única solució, −2', d:'', i:['u3-activitats/data/full-3.png']},
    'U3.20':  {t:'Resol equacions factoritzades', d:'', i:['u3-activitats/data/full-4.png']},

    /* ── U3 · Activitats finals · 1. Equacions de primer i segon grau (pàgines 73–78) */
    'U3.32':  {t:'Membres, incògnita i grau de cada equació (taula)', d:'●○○', i:['u3-equacions/data/full-1.png']},
    'U3.33':  {t:'Relaciona cada equació amb les seves solucions', d:'●○○', i:['u3-equacions/data/full-1.png']},
    'U3.34':  {t:'Inventa equacions que compleixin unes condicions', d:'●●○', i:['u3-equacions/data/full-1.png']},
    'U3.35':  {t:'Troba x en un quadrat màgic', d:'●●○', i:['u3-equacions/data/full-1.png', 'u3-equacions/data/full-2.png']},
    'U3.36':  {t:'Condició perquè dues equacions de primer grau tinguin la mateixa solució', d:'●●●', i:['u3-equacions/data/full-2.png']},
    'U3.37':  {t:'Resol deu equacions de segon grau', d:'●○○', i:['u3-equacions/data/full-2.png']},
    'U3.38':  {t:'Resol equacions de segon grau incompletes (x per un factor)', d:'●○○', i:['u3-equacions/data/full-2.png', 'u3-equacions/data/full-3.png']},
    'U3.39':  {t:'Resol sis equacions del tipus x(x + 1) = …', d:'●●○', i:['u3-equacions/data/full-3.png']},
    'U3.40':  {t:'Resol equacions de segon grau amb igualtats notables, sense la fórmula', d:'●●○', i:['u3-equacions/data/full-3.png']},
    'U3.41':  {t:'Desenvolupa i resol vuit equacions de segon grau', d:'●●○', i:['u3-equacions/data/full-3.png', 'u3-equacions/data/full-4.png']},
    'U3.42':  {t:'Indica el grau de cada equació i resol-la', d:'●●○', i:['u3-equacions/data/full-4.png']},
    'U3.43':  {t:'Resol equacions de segon grau amb fraccions', d:'●●○', i:['u3-equacions/data/full-4.png']},
    'U3.44':  {t:'Si x = √2 − 1 és solució de 3x² − ax + 1 = 0, quant val a?', d:'●●●', i:['u3-equacions/data/full-4.png']},
    'U3.45':  {t:'Sense resoldre, quantes solucions té cada equació?', d:'●○○', i:['u3-equacions/data/full-4.png', 'u3-equacions/data/full-5.png']},
    'U3.46':  {t:'Joc: tria b i c perquè l’equació tingui o no tingui solució', d:'●●○', i:['u3-equacions/data/full-5.png']},
    'U3.48':  {t:'Completa equacions de segon grau perquè no tinguin solució', d:'●●●', i:['u3-equacions/data/full-5.png']},
    'U3.49':  {t:'Inventa quatre equacions de la forma x² + 2x + c = 0', d:'●●○', i:['u3-equacions/data/full-5.png', 'u3-equacions/data/full-6.png']},
    'U3.51':  {t:'Vertader o fals sobre equacions de segon grau', d:'●●○', i:['u3-equacions/data/full-6.png']},

    /* ── U3 · Activitats finals · 4. Problemes (pàgines 83–85) */
    'U3.63':  {t:'Quants germans sou si entre tots feu 36 regals?', d:'●●○', i:['u3-problemes/data/full-1.png']},
    'U3.71':  {t:'Un hort rectangular tancat amb 70 m de cable: la superfície', d:'●●○', i:['u3-problemes/data/full-2.png']},
    'U3.77':  {t:'Un jardí rectangular de 5 600 m²: l’amplada', d:'', i:['u3-problemes/data/full-3.png']},

    /* ── U7 · Problemes de paràboles (pàgina 224) */
    'U7.94':  {t:'El llançament d’una pilota: l’altura màxima i quan s’hi arriba', d:'●○○', i:['u7-problemes/data/full-1.png']},
    'U7.95':  {t:'Un tir lliure de bàsquet: l’equació de la paràbola', d:'●●○', i:['u7-problemes/data/full-1.png']},

    /* ── Annex de Polinomis · Igualtats notables (pàgines 318–319 i 327–328) */
    'AP.8':   {t:'Desenvolupa potències de binomis', d:'', i:['ap-activitats/data/full-1.png', 'ap-activitats/data/full-2.png']},
    'AP.9':   {t:'Vertader o fals amb igualtats notables', d:'', i:['ap-activitats/data/full-2.png']},
    'AP.10':  {t:'Desenvolupa amb les igualtats notables', d:'', i:['ap-activitats/data/full-2.png']},
    'AP.11':  {t:'Expressa com una igualtat notable', d:'', i:['ap-activitats/data/full-2.png']},
    'AP.49':  {t:'Efectua dos quadrats i un cub de binomis', d:'●○○', i:['ap-igualtats/data/full-1.png']},
    'AP.50':  {t:'Efectua i redueix termes semblants', d:'●●○', i:['ap-igualtats/data/full-1.png']},
    'AP.51':  {t:'Opera: el quadrat del quadrat d’un binomi', d:'●●○', i:['ap-igualtats/data/full-1.png']},
    'AP.52':  {t:'Desenvolupa potències de trinomis', d:'●●●', i:['ap-igualtats/data/full-1.png', 'ap-igualtats/data/full-2.png']},
    'AP.53':  {t:'Dos nombres més grans que 1 que multiplicats donin 999 991', d:'●●●', i:['ap-igualtats/data/full-2.png']},
    'AP.54':  {t:'Operacions amb igualtats notables', d:'●●○', i:['ap-igualtats/data/full-2.png']},
    'AP.55':  {t:'Quins són el quadrat d’un binomi?', d:'●●○', i:['ap-igualtats/data/full-2.png']},
    'AP.56':  {t:'Demostra que el triangle és rectangle per a qualsevol x', d:'●●●', i:['ap-igualtats/data/full-2.png']},
    'AP.57':  {t:'A quin quadrat és igual x² + (x + 1)² + x²(x + 1)²?', d:'●●●', i:['ap-igualtats/data/full-2.png']},
  },

  'apl-ud10': {

    /* Santillana, unitat 4 (i, al final, la U3, la U2 i la U7). Fora (vistiplau F10–F12 i F18): paràmetres, sistemes
       d'inequacions, inequacions amb dues incògnites i el sistema no lineal (ex. 72). */

    /* ── Activitats (pàgines 89–95 del llibre) */
    'U4.1': {t:'Comprova que x = −1/2, y = 3/4 és solució d’un sistema', d:'', i:['u4-activitats/data/full-1.png']},
    'U4.2': {t:'Representa gràficament cada sistema i resol-lo', d:'', i:['u4-activitats/data/full-2.png']},
    'U4.3': {t:'Resol gràficament dos sistemes i digues quantes solucions tenen', d:'', i:['u4-activitats/data/full-2.png']},
    'U4.4': {t:'Escriu un sistema que tingui la solució donada', d:'', i:['u4-activitats/data/full-3.png']},
    'U4.5': {t:'Classifica quatre sistemes segons el nombre de solucions', d:'', i:['u4-activitats/data/full-3.png', 'u4-activitats/data/full-4.png']},
    'U4.6': {t:'Classifica sis sistemes a partir del nombre de solucions', d:'', i:['u4-activitats/data/full-4.png']},
    'U4.7': {t:'Observa les gràfiques: escriu el sistema, la solució i el tipus de sistema', d:'', i:['u4-activitats/data/full-4.png', 'u4-activitats/data/full-5.png']},
    'U4.8': {t:'Resol dos sistemes per substitució, igualació i reducció', d:'', i:['u4-activitats/data/full-5.png']},
    'U4.9': {t:'Què passa en resoldre un sistema indeterminat per igualació o un d’incompatible per reducció?', d:'', i:['u4-activitats/data/full-5.png']},
    'U4.10': {t:'Resol dos sistemes amb fraccions', d:'', i:['u4-activitats/data/full-6.png']},
    'U4.11': {t:'Troba la solució de dos sistemes amb fraccions (pissarra)', d:'', i:['u4-activitats/data/full-6.png']},
    'U4.12': {t:'Calcula la solució de sis sistemes amb parèntesis i productes', d:'', i:['u4-activitats/data/full-7.png']},

    /* ── Activitats finals · 1. Nombre de solucions d'un sistema i com es calculen */
    'U4.24': {t:'De quines equacions és solució x = 2, y = −1?', d:'●○○', i:['u4-sistemes/data/full-1.png']},
    'U4.25': {t:'De quines equacions és solució el parell (2, 3)?', d:'●○○', i:['u4-sistemes/data/full-1.png']},
    'U4.26': {t:'Quins parells són solució de l’equació 3x − y/2 = 6?', d:'●○○', i:['u4-sistemes/data/full-1.png', 'u4-sistemes/data/full-2.png']},
    'U4.27': {t:'Relaciona cada equació amb un parell que en sigui solució', d:'●○○', i:['u4-sistemes/data/full-2.png']},
    'U4.28': {t:'Completa els parells perquè siguin solució de 2x − y = 3', d:'●○○', i:['u4-sistemes/data/full-2.png']},
    'U4.29': {t:'Representa les solucions de sis equacions lineals', d:'●●○', i:['u4-sistemes/data/full-2.png', 'u4-sistemes/data/full-3.png']},
    'U4.31': {t:'Escriu dues solucions de quatre equacions', d:'●●○', i:['u4-sistemes/data/full-4.png']},
    'U4.32': {t:'Quantes solucions tenen quatre sistemes? Interpreta-ho geomètricament', d:'●○○', i:['u4-sistemes/data/full-4.png', 'u4-sistemes/data/full-5.png']},
    'U4.34': {t:'Interpreta quatre gràfiques com a sistemes: solució i tipus', d:'●●○', i:['u4-sistemes/data/full-6.png']},
    'U4.35': {t:'Calcula el valor d’A, B, C i D en una resta', d:'●●●', i:['u4-sistemes/data/full-6.png']},
    'U4.36': {t:'Vertader o fals: multiplicar una equació d’un sistema compatible determinat per 3', d:'●●○', i:['u4-sistemes/data/full-6.png']},
    'U4.37': {t:'Dues tiradores d’arc: quines trajectòries corresponen a cada una?', d:'●●○', i:['u4-sistemes/data/full-6.png', 'u4-sistemes/data/full-7.png']},
    'U4.38': {t:'Resol vuit sistemes pel mètode més adequat: què va beure cadascú?', d:'●●○', i:['u4-sistemes/data/full-7.png']},
    'U4.39': {t:'Resol dos sistemes amb fraccions pel mètode més adequat', d:'●○○', i:['u4-sistemes/data/full-8.png']},
    'U4.40': {t:'Joc: generar sistemes compatibles determinats amb la mateixa solució', d:'●●○', i:['u4-sistemes/data/full-8.png']},
    'U4.44': {t:'Quin nombre de dues xifres compleix cada condició?', d:'●●○', i:['u4-sistemes/data/full-9.png']},
    'U4.45': {t:'Resol un sistema amb coeficients √2', d:'●●●', i:['u4-sistemes/data/full-9.png']},
    'U4.46': {t:'Com es resol un sistema compatible indeterminat (resolt al llibre de text)', d:'', i:['u4-sistemes/data/full-9.png']},
    'U4.47': {t:'Resol dos sistemes (indeterminat o incompatible)', d:'●●●', i:['u4-sistemes/data/full-9.png', 'u4-sistemes/data/full-10.png']},
    'U4.48': {t:'Inventa sistemes compatibles determinats, indeterminats i incompatibles', d:'●●○', i:['u4-sistemes/data/full-10.png']},
    'U4.49': {t:'Si en aïllar i igualar no es pot resoldre l’equació, el sistema és compatible o incompatible?', d:'●●●', i:['u4-sistemes/data/full-10.png']},


    /* ── Activitats finals · 3. Problemes amb sistemes */
    'U4.62': {t:'900 bombons en caixes de 6 i de 12 unitats', d:'●●○', i:['u4-problemes/data/full-1.png']},
    'U4.63': {t:'Un congrés de 60 persones: quants homes i quantes dones hi ha?', d:'●●○', i:['u4-problemes/data/full-1.png']},
    'U4.64': {t:'Una caravana de camells i dromedaris: potes i gepes', d:'●●○', i:['u4-problemes/data/full-1.png', 'u4-problemes/data/full-2.png']},
    'U4.65': {t:'Bitllets de 50 € i de 20 € a la butxaca', d:'●●○', i:['u4-problemes/data/full-2.png']},
    'U4.66': {t:'Monedes de 5 cèntims i de 20 cèntims al banc', d:'●●○', i:['u4-problemes/data/full-2.png']},
    'U4.67': {t:'Un xandall i unes sabatilles comprats en rebaixes', d:'●●○', i:['u4-problemes/data/full-2.png']},
    'U4.68': {t:'Vuit monedes de 0,50 € i de 0,20 € que sumen 3,10 €', d:'●●○', i:['u4-problemes/data/full-2.png']},
    'U4.69': {t:'Un campament de 60 joves europeus i asiàtics', d:'●●○', i:['u4-problemes/data/full-2.png', 'u4-problemes/data/full-3.png']},
    'U4.70': {t:'Casos de xarampió el 2021 i el 2022', d:'●●○', i:['u4-problemes/data/full-3.png']},
    'U4.71': {t:'Canvi de moneda: pesos argentins i sols peruans', d:'●●○', i:['u4-problemes/data/full-3.png']},
    'U4.73': {t:'Un camió puja i baixa una muntanya entre tres pobles', d:'●●○', i:['u4-problemes/data/full-3.png', 'u4-problemes/data/full-4.png']},
    'U4.74': {t:'Una mescla de 300 kg de patates de dues classes', d:'●●○', i:['u4-problemes/data/full-4.png']},
    'U4.75': {t:'Un bot a favor i en contra del corrent', d:'●●●', i:['u4-problemes/data/full-4.png']},
    'U4.76': {t:'La bateria de l’ordinador portàtil: hores d’ús i en repòs', d:'●●●', i:['u4-problemes/data/full-4.png']},
    'U4.77': {t:'Vols entre ciutats amb fusos horaris diferents', d:'●●●', i:['u4-problemes/data/full-4.png', 'u4-problemes/data/full-5.png']},
    'U4.78': {t:'Editores i editors del departament: planteja una inequació', d:'●●○', i:['u4-problemes/data/full-5.png']},
    'U4.79': {t:'Massa màxima autoritzada d’un camió: quantes bigues pot portar?', d:'●●○', i:['u4-problemes/data/full-5.png', 'u4-problemes/data/full-6.png']},

    /* ── Problemes aparentment diferents */
    'U4.80': {t:'Resol un sistema amb un percentatge', d:'', i:['u4-problemes-diferents/data/full-1.png']},
    'U4.81': {t:'Mescla de vinagre d’1,20 €/l i d’1,60 €/l', d:'', i:['u4-problemes-diferents/data/full-1.png']},
    'U4.82': {t:'Calcula x + y sense resoldre el sistema', d:'', i:['u4-problemes-diferents/data/full-1.png']},
    'U4.83': {t:'Entrepans i refrescos: quant costa cadascun?', d:'', i:['u4-problemes-diferents/data/full-2.png']},

    /* ── Reptes de l'inici de la unitat, fake news, situació d'aprenentatge i autoavaluació.
          No tenen número d'exercici propi: la clau és un text ('U4.FN', 'U4.SA1', 'U4.AV1'…). */
    'U4.FN': {t:'L’efecte papallona: canvi de bitllets de dòlars en dues oficines', d:'', i:['u4-fake-news/data/full-1.png'], e:'Fake news', nom:'Fake news'},
    'U4.SA1': {t:'Més a prop, millor: vols i hotels del viatge', d:'', i:['u4-situacio/data/full-1.png'], e:'Situació 1', nom:'Situació d’aprenentatge 1'},
    'U4.SA2': {t:'Check in / check out: l’hotel dels afores', d:'', i:['u4-situacio/data/full-1.png', 'u4-situacio/data/full-2.png'], e:'Situació 2', nom:'Situació d’aprenentatge 2'},
    'U4.SA3': {t:'Barat surt car? La targeta de transport públic', d:'', i:['u4-situacio/data/full-2.png', 'u4-situacio/data/full-3.png'], e:'Situació 3', nom:'Situació d’aprenentatge 3'},
    'U4.AV1': {t:'Solucions d’un sistema d’equacions lineals', d:'', i:['u4-autoavaluacio/data/full-1.png'], e:'Autoav. 1', nom:'Autoavaluació 1'},
    'U4.AV2': {t:'Nombre de solucions d’un sistema', d:'', i:['u4-autoavaluacio/data/full-1.png'], e:'Autoav. 2', nom:'Autoavaluació 2'},
    'U4.AV3': {t:'Nombre de solucions d’un sistema amb fraccions', d:'', i:['u4-autoavaluacio/data/full-1.png'], e:'Autoav. 3', nom:'Autoavaluació 3'},
    'U4.AV4': {t:'Solució d’un sistema amb parèntesis', d:'', i:['u4-autoavaluacio/data/full-1.png'], e:'Autoav. 4', nom:'Autoavaluació 4'},
    'U4.AV6': {t:'La parcel·la de la Sílvia: àrea d’un terreny rectangular', d:'', i:['u4-autoavaluacio/data/full-2.png'], e:'Autoav. 6', nom:'Autoavaluació 6'},


    /* ── Santillana, unitat 3 · Inequacions d'una incògnita (pàgines 68–69 i 81–82) */
    'U3.24': {t:'Resol inequacions de primer grau', d:'', i:['u3-activitats/data/full-1.png', 'u3-activitats/data/full-2.png']},
    'U3.25': {t:'Resol inequacions amb parèntesis i fraccions', d:'', i:['u3-activitats/data/full-2.png']},
    'U3.26': {t:'Escriu una inequació amb solució [2, +∞)', d:'', i:['u3-activitats/data/full-2.png']},
    'U3.58': {t:'Completa amb <, ≤, > o ≥ per a x = 2', d:'●○○', i:['u3-inequacions/data/full-1.png']},
    'U3.59': {t:'Opera i resol inequacions', d:'●●○', i:['u3-inequacions/data/full-1.png', 'u3-inequacions/data/full-2.png']},

    /* ── Santillana, unitat 3 · Problemes (pàgines 83–86) */
    'U3.64': {t:'Una família de cinc viatja en tren per 29,40 €: el preu de cada bitllet', d:'●●○', i:['u3-problemes/data/full-1.png']},
    'U3.65': {t:'Gasta el 25 % dels estalvis i encara li queden 120 €', d:'●●○', i:['u3-problemes/data/full-1.png']},
    'U3.66': {t:'Uns pantalons rebaixats un 20 % costen 18 €: el preu inicial', d:'●●○', i:['u3-problemes/data/full-1.png']},
    'U3.73': {t:'Cadires i gandules a la platja: quan surt més a compte la gandula?', d:'●●○', i:['u3-problemes/data/full-2.png']},
    'U3.74': {t:'Un pelegrí que camina entre 4 i 6 km/h: la distància recorreguda', d:'●●●', i:['u3-problemes/data/full-2.png', 'u3-problemes/data/full-3.png']},
    'U3.75': {t:'Les edats de tres nois en intervals', d:'●●●', i:['u3-problemes/data/full-3.png']},
    'U3.80': {t:'Resol la inequació doble 0 < x − 3 < 18', d:'', i:['u3-problemes/data/full-4.png']},
    'U3.81': {t:'L’Alfons és menor d’edat: l’edat possible de la seva germana', d:'', i:['u3-problemes/data/full-4.png']},

    /* ── Santillana, unitat 2 · Problemes de mòbils (pàgines 44–45). El 67 no hi és: el
          solucionari no en dona la solució («Resuelta en el libro de texto»). */
    'U2.68': {t:'Dos trens en el mateix sentit: on i quan l’atrapa?', d:'●●○', i:['u2-problemes/data/full-1.png', 'u2-problemes/data/full-2.png']},
    'U2.69': {t:'Una moto i un cotxe en sentit contrari: quan i on es troben?', d:'●●○', i:['u2-problemes/data/full-2.png']},

    /* ── Santillana, unitat 7 (pàgines 223–224) */
    'U7.93': {t:'El lloguer d’una caravana: dues tarifes, quina surt més a compte?', d:'●●○', i:['u7-problemes/data/full-1.png', 'u7-problemes/data/full-2.png']},

  },

  'apl-ud6': {

    /* Santillana, unitat 7 (funcions polinòmiques), unitat 6 (punts de tall) i unitat 3.
       Fora (vistiplau P8): translacions (Act. 11–13), recta i paràbola (ex. 56–58, 101–102),
       paràmetres (ex. 50 i 53), i les Act. 25–27 de la U6 (calen Ruffini o biquadrades: F1 i F9). */

    /* ── U7 · Què saps ja i activitats (pàgines 189–193 del llibre) */
    'U7.QS1': {t:'Resol x² − 2x + 1 = 0 i digues quantes solucions té', d:'', i:['u7-activitats/data/full-1.png'], e:'Què saps ja 1', nom:'Què saps ja 1'},
    'U7.8':   {t:'Relaciona cada funció amb la seva paràbola', d:'', i:['u7-activitats/data/full-2.png']},
    'U7.9':   {t:'Si la paràbola taronja és y = 3x², quines són les altres dues?', d:'', i:['u7-activitats/data/full-2.png']},
    'U7.10':  {t:'Representa y = 3x², y = x²/3 i y = −2x²', d:'', i:['u7-activitats/data/full-2.png', 'u7-activitats/data/full-3.png']},

    /* ── U7 · Activitats finals · 2. Relació quadràtica (pàgines 203–209) */
    'U7.45':  {t:'Representa y = −5x², y = 5x² i y = x²/4', d:'●●○', i:['u7-paraboles/data/full-1.png']},
    'U7.46':  {t:'Relaciona cada funció amb la seva paràbola', d:'●●○', i:['u7-paraboles/data/full-2.png']},
    'U7.47':  {t:'Vèrtex, eix i talls de quatre paràboles a partir de la gràfica', d:'●●○', i:['u7-paraboles/data/full-2.png', 'u7-paraboles/data/full-3.png']},
    'U7.48':  {t:'Un quadrat màgic amb els eixos de simetria de tres paràboles', d:'●○○', i:['u7-paraboles/data/full-3.png']},
    'U7.49':  {t:'Vèrtex de sis paràboles: màxim o mínim? Representa-les', d:'●●○', i:['u7-paraboles/data/full-3.png', 'u7-paraboles/data/full-4.png']},
    'U7.51':  {t:'Representa quatre paràboles', d:'●○○', i:['u7-paraboles/data/full-5.png', 'u7-paraboles/data/full-6.png']},
    'U7.52':  {t:'Representa y = |x² − x − 6|', d:'●●●', i:['u7-paraboles/data/full-6.png']},
    'U7.54':  {t:'Inventa paràboles amb un vèrtex o un punt donats', d:'●●○', i:['u7-paraboles/data/full-6.png']},
    'U7.55':  {t:'Joc: el «Qui és qui?» de les paràboles', d:'●●○', i:['u7-paraboles/data/full-6.png', 'u7-paraboles/data/full-7.png']},

    /* ── U7 · Problemes (pàgines 220–227) */
    'U7.86':  {t:'Un salt de videojoc: des d’on salta i l’equació de la paràbola', d:'●●○', i:['u7-problemes/data/full-1.png']},
    'U7.94':  {t:'El llançament d’una pilota: l’altura màxima i quan s’hi arriba', d:'●○○', i:['u7-problemes/data/full-2.png']},
    'U7.95':  {t:'Un tir lliure de bàsquet: l’equació de la paràbola', d:'●●○', i:['u7-problemes/data/full-2.png']},
    'U7.96':  {t:'Un bumerang i un ocell: on es troben les trajectòries?', d:'●●○', i:['u7-problemes/data/full-2.png']},
    'U7.100': {t:'Ajuda humanitària: l’altura de llançament segons la velocitat', d:'●●●', i:['u7-problemes/data/full-3.png', 'u7-problemes/data/full-4.png']},
    'U7.105': {t:'Vèrtex de y = −x²/4 + 4x + 20 i f(15)', d:'', i:['u7-problemes/data/full-5.png']},
    'U7.106': {t:'El cost de fabricar un tractor: el màxim i el cost amb 15 unitats', d:'', i:['u7-problemes/data/full-5.png']},

    /* ── U6 · Punts de tall amb els eixos (pàgines 159–161 i 173) */
    'U6.23':  {t:'Punts de tall de quatre funcions lineals', d:'', i:['u6-activitats/data/full-1.png', 'u6-activitats/data/full-2.png']},
    'U6.24':  {t:'Punts de tall amb els eixos de quatre funcions de segon grau', d:'', i:['u6-activitats/data/full-2.png']},
    'U6.28':  {t:'Punts de tall de dues funcions amb fraccions', d:'', i:['u6-activitats/data/full-3.png']},
    'U6.72':  {t:'Calcula els punts de tall amb els eixos', d:'●○○', i:['u6-problemes/data/full-1.png']},

    /* ── U3 · Equacions (pàgines 76–77) */
    'U3.45':  {t:'Sense resoldre, quantes solucions té cada equació?', d:'●○○', i:['u3-equacions/data/full-1.png', 'u3-equacions/data/full-2.png']},
  },

  'apl-ud7': {

    /* Santillana, unitat 6 (funcions), unitat 7 (funcions elementals i situacions reals) i
       unitat 2 (interès compost). Fora (vistiplau P9, F1, F14 i F15): domini calculat,
       continuïtat, simetria, periodicitat i transformacions; U6 · 56 (mòdul d'un vector) i 57
       (trigonometria); U6 · 88 (el solucionari no en dona la solució). */

    /* ── U6 · Activitats (pàgines 155–157 del llibre) */
    'U6.1':   {t:'Són funcions o no? Cinc relacions entre magnituds', d:'', i:['u6-activitats/data/full-1.png', 'u6-activitats/data/full-2.png']},
    'U6.2':   {t:'y = 2x − 1: un enunciat i una taula de valors', d:'', i:['u6-activitats/data/full-2.png']},
    'U6.3':   {t:'El cub menys dues vegades el quadrat: expressió i taula', d:'', i:['u6-activitats/data/full-2.png']},
    'U6.4':   {t:'Aquestes gràfiques són d’una funció?', d:'', i:['u6-activitats/data/full-2.png']},
    'U6.5':   {t:'Taula de valors de dues funcions', d:'', i:['u6-activitats/data/full-2.png']},
    'U6.6':   {t:'La temperatura d’una sala: la gràfica a partir d’una taula', d:'', i:['u6-activitats/data/full-2.png', 'u6-activitats/data/full-3.png']},
    'U6.7':   {t:'La quarta part més cinc: expressió, taula i gràfica', d:'', i:['u6-activitats/data/full-3.png']},

    /* ── U6 · Activitats finals · 1. Relacions entre magnituds (pàgines 167–170) */
    'U6.47':  {t:'Quines relacions són funcions?', d:'●○○', i:['u6-funcions/data/full-1.png']},
    'U6.48':  {t:'L’expressió algebraica de quatre relacions', d:'●○○', i:['u6-funcions/data/full-1.png', 'u6-funcions/data/full-2.png']},
    'U6.49':  {t:'Inventa dues relacions entre magnituds que siguin funcions', d:'●○○', i:['u6-funcions/data/full-2.png']},
    'U6.50':  {t:'Un sudoku 2 × 2 amb la taula de y = −3x + 4', d:'●○○', i:['u6-funcions/data/full-2.png']},
    'U6.51':  {t:'Taula i gràfica de f(x) = −x + 2', d:'●○○', i:['u6-funcions/data/full-2.png']},
    'U6.52':  {t:'Les imatges de 2, −2, 3, −3, 1 i −1 per a sis funcions', d:'●○○', i:['u6-funcions/data/full-2.png', 'u6-funcions/data/full-3.png']},
    'U6.53':  {t:'Inventa dues funcions per a una mateixa taula', d:'●●○', i:['u6-funcions/data/full-3.png']},
    'U6.54':  {t:'El triple menys el quadrat: expressió i taula', d:'●○○', i:['u6-funcions/data/full-3.png']},
    'U6.55':  {t:'El volum d’una esfera en funció del radi', d:'●●○', i:['u6-funcions/data/full-3.png']},
    'U6.58':  {t:'Triangles de superfície S: la base en funció de l’altura', d:'●●○', i:['u6-funcions/data/full-3.png', 'u6-funcions/data/full-4.png']},

    /* ── U6 · Creixement i decreixement (pàgines 174–178) */
    'U6.78':  {t:'Creixement i decreixement de dues gràfiques', d:'●○○', i:['u6-creixement/data/full-1.png', 'u6-creixement/data/full-2.png']},
    'U6.79':  {t:'Intervals de creixement, màxims i mínims de dues gràfiques', d:'●○○', i:['u6-creixement/data/full-2.png']},
    'U6.80':  {t:'Dibuixa els eixos perquè el mínim sigui (1, −1)', d:'●●○', i:['u6-creixement/data/full-2.png']},
    'U6.81':  {t:'Inventa una funció amb un màxim a (2, 4)', d:'●○○', i:['u6-creixement/data/full-2.png']},
    'U6.82':  {t:'Creixement, màxims i mínims de dues gràfiques', d:'●●○', i:['u6-creixement/data/full-3.png']},
    'U6.83':  {t:'Mots encreuats del creixement', d:'●○○', i:['u6-creixement/data/full-3.png']},
    'U6.84':  {t:'La temperatura d’un dia: el màxim i el mínim', d:'●●○', i:['u6-creixement/data/full-3.png']},
    'U6.85':  {t:'Funció creixent de domini [−6, 3] i recorregut [3, 6]', d:'●●●', i:['u6-creixement/data/full-3.png']},
    'U6.86':  {t:'Mots encreuats de la taxa de variació mitjana', d:'●●○', i:['u6-creixement/data/full-4.png']},
    'U6.87':  {t:'Vertader o fals sobre la taxa de variació mitjana', d:'●●●', i:['u6-creixement/data/full-4.png']},
    'U6.89':  {t:'La taxa de variació relativa a [−1, 2]', d:'●○○', i:['u6-creixement/data/full-4.png']},
    'U6.90':  {t:'Dues funcions amb la mateixa TVM a [1, 5]', d:'●●○', i:['u6-creixement/data/full-5.png']},

    /* ── U6 · Funcions a trossos i problemes (pàgines 180–184) */
    'U6.100': {t:'Representa una funció a trossos: domini i recorregut', d:'●○○', i:['u6-a-trossos/data/full-1.png']},
    'U6.101': {t:'Completa perquè les funcions siguin contínues', d:'●●○', i:['u6-a-trossos/data/full-1.png']},
    'U6.102': {t:'L’expressió algebraica de dues funcions a trossos', d:'●●○', i:['u6-a-trossos/data/full-1.png']},
    'U6.103': {t:'L’expressió algebraica d’una funció a trossos a partir de la gràfica', d:'●●●', i:['u6-a-trossos/data/full-2.png']},
    'U6.104': {t:'Quina és la gràfica de f(x) = x − x/|x|?', d:'●●●', i:['u6-a-trossos/data/full-2.png']},
    'U6.105': {t:'El moviment d’un gronxador', d:'●●○', i:['u6-a-trossos/data/full-2.png']},
    'U6.106': {t:'El so: la velocitat i la distància en funció del temps', d:'●●○', i:['u6-a-trossos/data/full-2.png', 'u6-a-trossos/data/full-3.png']},
    'U6.107': {t:'Fórmula 1: la velocitat al llarg de quatre voltes', d:'●●○', i:['u6-a-trossos/data/full-3.png']},
    'U6.108': {t:'Un electrocardiograma: és una funció periòdica?', d:'●●○', i:['u6-a-trossos/data/full-3.png']},
    'U6.109': {t:'Videojoc: la funció «terra» dels bolets', d:'●●○', i:['u6-a-trossos/data/full-3.png', 'u6-a-trossos/data/full-4.png']},
    'U6.110': {t:'El preu d’una acció: el creixement', d:'●●○', i:['u6-a-trossos/data/full-4.png']},
    'U6.111': {t:'La distància de frenada d’un vehicle', d:'●●○', i:['u6-a-trossos/data/full-4.png']},
    'U6.112': {t:'El cost dels enviaments: una funció a trossos', d:'●●○', i:['u6-a-trossos/data/full-5.png']},

    /* ── U7 · Activitats finals · 1. Relació lineal (pàgines 200–203) */
    'U7.35':  {t:'Classifica dues funcions de primer grau i troba’n els punts de tall', d:'●○○', i:['u7-lineals/data/full-1.png']},
    'U7.36':  {t:'Quins punts són de la funció y = −x + 2?', d:'●○○', i:['u7-lineals/data/full-1.png']},
    'U7.37':  {t:'Representa sis funcions de primer grau', d:'●○○', i:['u7-lineals/data/full-2.png']},
    'U7.38':  {t:'Inventa una funció lineal, una de proporcionalitat directa i una constant', d:'●○○', i:['u7-lineals/data/full-2.png']},
    'U7.39':  {t:'L’expressió algebraica a partir del pendent i un punt', d:'●●○', i:['u7-lineals/data/full-3.png']},
    'U7.40':  {t:'La recta que passa per dos punts', d:'●●○', i:['u7-lineals/data/full-3.png']},
    'U7.41':  {t:'Inventa tres funcions que passin per (−1, 2)', d:'●○○', i:['u7-lineals/data/full-3.png']},
    'U7.42':  {t:'L’equació de quatre rectes a partir de la gràfica', d:'●●○', i:['u7-lineals/data/full-3.png', 'u7-lineals/data/full-4.png']},
    'U7.43':  {t:'Si f(6) − f(2) = 12, quant val f(12) − f(2)?', d:'●●●', i:['u7-lineals/data/full-4.png']},
    'U7.44':  {t:'Dibuixa la gràfica de y = x/|x|', d:'●●●', i:['u7-lineals/data/full-4.png']},

    /* ── U7 · 3. Proporcionalitat inversa (pàgines 210–212) */
    'U7.62':  {t:'Relaciona cada hipèrbola amb la seva equació', d:'●○○', i:['u7-inversa/data/full-1.png']},
    'U7.63':  {t:'Una taula de proporcionalitat inversa: expressió i gràfica', d:'●○○', i:['u7-inversa/data/full-1.png', 'u7-inversa/data/full-2.png']},
    'U7.64':  {t:'Representa tres funcions de proporcionalitat inversa', d:'●○○', i:['u7-inversa/data/full-2.png', 'u7-inversa/data/full-3.png']},
    'U7.65':  {t:'y = −5/x: creixement i valors a prop de 0', d:'●○○', i:['u7-inversa/data/full-3.png']},

    /* ── U7 · 4. Relació exponencial (pàgines 216–219) */
    'U7.74':  {t:'Relaciona cada funció exponencial amb la seva gràfica', d:'●○○', i:['u7-exponencial/data/full-1.png']},
    'U7.75':  {t:'Representa tres funcions exponencials als mateixos eixos', d:'●○○', i:['u7-exponencial/data/full-1.png']},
    'U7.76':  {t:'Inventa una exponencial decreixent que passi per (0, 2)', d:'●○○', i:['u7-exponencial/data/full-1.png', 'u7-exponencial/data/full-2.png']},
    'U7.77':  {t:'Troba a en dues funcions y = aˣ a partir de la gràfica', d:'●●○', i:['u7-exponencial/data/full-2.png']},
    'U7.83':  {t:'Estudia i representa sis funcions exponencials', d:'●●○', i:['u7-exponencial/data/full-3.png', 'u7-situacions/data/full-1.png']},

    /* ── U7 · 5. Situacions reals (pàgines 220–227) */
    'U7.85':  {t:'Caminar sobre una cinta mecànica: distància i temps', d:'●●○', i:['u7-situacions/data/full-1.png']},
    'U7.86':  {t:'Videojoc: el salt parabòlic', d:'●●○', i:['u7-situacions/data/full-2.png']},
    'U7.87':  {t:'La factura de la llum: quota fixa més el consum', d:'●●○', i:['u7-situacions/data/full-2.png']},
    'U7.88':  {t:'La temperatura de l’aire segons l’altitud', d:'●●○', i:['u7-situacions/data/full-2.png', 'u7-situacions/data/full-3.png']},
    'U7.89':  {t:'El taxi: baixada de bandera i preu per quilòmetre', d:'●●○', i:['u7-situacions/data/full-3.png']},
    'U7.90':  {t:'Les escales de temperatura: Celsius, Fahrenheit i Kelvin', d:'●●●', i:['u7-situacions/data/full-3.png']},
    'U7.91':  {t:'L’ombra d’un pal d’1 m: taula, funció i gràfica', d:'●●○', i:['u7-situacions/data/full-4.png']},
    'U7.92':  {t:'Les capses de polvorons del viatge d’estudis', d:'●●○', i:['u7-situacions/data/full-4.png']},
    'U7.97':  {t:'El bacteri E. coli es divideix cada 25 minuts', d:'●●○', i:['u7-situacions/data/full-5.png', 'u7-situacions/data/full-6.png']},
    'U7.104': {t:'Una substància radioactiva en funció del temps', d:'', i:['u7-situacions/data/full-7.png']},

    /* ── U2 · Interès compost (pàgines 39–40 i 56–57) */
    'U2.40':  {t:'Interès compost: 2 000 € durant 10 anys al 2,75 %', d:'', i:['u2-activitats/data/full-1.png']},
    'U2.41':  {t:'Quin capital dona 200 € en 2 anys al 5 % compost?', d:'', i:['u2-activitats/data/full-1.png']},
    'U2.42':  {t:'Interès compost: 3 050 € durant 3 anys al 5 %', d:'', i:['u2-activitats/data/full-1.png']},
    'U2.43':  {t:'Un capital que dona 244 € d’interessos en 5 anys al 4 %', d:'', i:['u2-activitats/data/full-1.png']},
    'U2.44':  {t:'Interès simple o compost: quin és més rendible?', d:'', i:['u2-activitats/data/full-1.png', 'u2-activitats/data/full-2.png']},
    'U2.109': {t:'Quin capital dona 111 € d’interessos en 2 anys al 4 %?', d:'●○○', i:['u2-interes/data/full-1.png']},
    'U2.110': {t:'Un dipòsit amb un rèdit el primer mes i un altre la resta de l’any', d:'●●○', i:['u2-interes/data/full-1.png']},
    'U2.111': {t:'L’Emília inverteix 9 600 € al 3,85 %: interessos i penalització', d:'●○○', i:['u2-interes/data/full-1.png', 'u2-interes/data/full-2.png']},
  },

  'apl-ud8': {

    /* Santillana, unitat 8. Fora (vistiplau P10, F1, F16 i F17): quartils i percentils (Act. 11–18),
       dispersió (ex. 64–66), dues variables (Act. 19–32; ex. 78, 79, 85, 90 i 91), i els ex. 68 i 72
       (el solucionari diu «Resuelta en el libro de texto»). Els ex. 75 d), e) i 76 d), e) pregunten
       per quartils i percentils (F16); s’hi han deixat perquè eren a la llista P10. */

    /* ── U8 · Activitats (pàgines 231–235 del llibre) */
    'U8.1': {t:'Població o mostra? Els cargols d’una màquina i el pes de cinc amics', d:'', i:['u8-activitats/data/full-1.png']},
    'U8.2': {t:'El color de cabells de 15 noies: taula de freqüències', d:'', i:['u8-activitats/data/full-1.png', 'u8-activitats/data/full-2.png']},
    'U8.3': {t:'El sexe de 20 nadons: taula, diagrama de sectors i de barres', d:'', i:['u8-activitats/data/full-2.png']},
    'U8.4': {t:'50 llançaments d’un dau: diagrama de barres i polígon', d:'', i:['u8-activitats/data/full-2.png']},
    'U8.5': {t:'La taula de freqüències de dos histogrames', d:'', i:['u8-activitats/data/full-2.png', 'u8-activitats/data/full-3.png']},
    'U8.6': {t:'El pes de 20 persones: taula, gràfic i mesures de centralització', d:'', i:['u8-activitats/data/full-3.png']},
    'U8.7': {t:'Mesures de centralització de dades agrupades', d:'', i:['u8-activitats/data/full-3.png']},
    'U8.8': {t:'Quins valors es poden afegir perquè la mediana no canviï?', d:'', i:['u8-activitats/data/full-4.png']},
    'U8.9': {t:'Calcula i interpreta les mesures de centralització', d:'', i:['u8-activitats/data/full-4.png']},
    'U8.10': {t:'Mesures de centralització a partir de dos gràfics', d:'', i:['u8-activitats/data/full-4.png', 'u8-activitats/data/full-5.png']},

    /* ── U8 · Activitats finals · 1. Taules i gràfics (pàgines 241–247) */
    'U8.33': {t:'Joc: una variable quantitativa discreta, la població i una mostra', d:'●●○', i:['u8-taules/data/full-1.png']},
    'U8.34': {t:'Les hores d’estudi de 30 estudiants: taula de freqüències', d:'●●○', i:['u8-taules/data/full-1.png', 'u8-taules/data/full-2.png']},
    'U8.35': {t:'Quantes vegades van anar al banc 30 persones?', d:'●●○', i:['u8-taules/data/full-2.png']},
    'U8.36': {t:'Inventa una enquesta amb unes freqüències donades', d:'●●○', i:['u8-taules/data/full-2.png']},
    'U8.37': {t:'Completa una taula de freqüències amb cinc valors', d:'●●○', i:['u8-taules/data/full-2.png', 'u8-taules/data/full-3.png']},
    'U8.38': {t:'Completar una taula a partir de les freqüències acumulades', d:'●●○', i:['u8-taules/data/full-3.png']},
    'U8.39': {t:'Aprovats i suspesos d’una classe de 30: taula de freqüències', d:'●●○', i:['u8-taules/data/full-3.png']},
    'U8.40': {t:'El 15 % de la classe són esquerrans: quants alumnes com a mínim?', d:'●●●', i:['u8-taules/data/full-3.png']},
    'U8.41': {t:'Les cançons escoltades: taula amb 8 classes', d:'●●○', i:['u8-taules/data/full-3.png']},
    'U8.42': {t:'Els resultats d’un test: classes d’amplitud 3', d:'●●●', i:['u8-taules/data/full-4.png']},
    'U8.43': {t:'Completa la taula i respon', d:'●●○', i:['u8-taules/data/full-4.png']},
    'U8.44': {t:'El temps davant la televisió: completa la taula', d:'●●○', i:['u8-taules/data/full-4.png']},
    'U8.45': {t:'Els retards d’un tren AVE: diagrama de barres', d:'●○○', i:['u8-taules/data/full-4.png', 'u8-taules/data/full-5.png']},
    'U8.46': {t:'Tria un gràfic adequat per a 35 dades', d:'●●○', i:['u8-taules/data/full-5.png']},
    'U8.47': {t:'Diagrama de barres amb unes condicions sobre les freqüències', d:'●●○', i:['u8-taules/data/full-5.png']},
    'U8.48': {t:'La venda de cotxes d’un any: freqüències', d:'●●○', i:['u8-taules/data/full-5.png']},
    'U8.49': {t:'Diagrama de sectors dels menjars', d:'●●○', i:['u8-taules/data/full-6.png']},
    'U8.50': {t:'Diagrama de sectors: l’amplitud de cada sector', d:'●●○', i:['u8-taules/data/full-6.png']},
    'U8.51': {t:'Histograma i polígons de freqüències absolutes i acumulades', d:'●●○', i:['u8-taules/data/full-6.png']},
    'U8.52': {t:'Les estatures de 27 joves: taula i histograma', d:'●●○', i:['u8-taules/data/full-6.png']},
    'U8.53': {t:'Mots encreuats a partir d’un histograma', d:'●●○', i:['u8-taules/data/full-7.png']},
    'U8.54': {t:'La taula de freqüències d’un histograma', d:'●●○', i:['u8-taules/data/full-7.png']},
    'U8.55': {t:'La taula de freqüències d’un histograma acumulat', d:'●○○', i:['u8-taules/data/full-7.png']},
    'U8.56': {t:'El diagrama de sectors de la Sara: taula i histograma', d:'●●●', i:['u8-taules/data/full-7.png', 'u8-parametres/data/full-1.png']},

    /* ── U8 · 2. Paràmetres estadístics (pàgines 248–252) */
    'U8.57': {t:'Mots encreuats dels paràmetres estadístics', d:'●○○', i:['u8-parametres/data/full-1.png']},
    'U8.58': {t:'Mitjana, mediana i moda de tres grups de dades', d:'●○○', i:['u8-parametres/data/full-1.png']},
    'U8.59': {t:'El valor de x₄ perquè la mitjana sigui 5', d:'●●●', i:['u8-parametres/data/full-1.png']},
    'U8.60': {t:'Inventa 10 dades amb una moda, una mediana o una mitjana donades', d:'●●○', i:['u8-parametres/data/full-1.png']},
    'U8.61': {t:'El percentatge d’encistellades de la Jana', d:'●●○', i:['u8-parametres/data/full-1.png']},
    'U8.62': {t:'Mitjana, mediana i moda de dades agrupades', d:'●●○', i:['u8-parametres/data/full-2.png']},
    'U8.63': {t:'Mesures de centralització de 40 dades', d:'●○○', i:['u8-parametres/data/full-2.png']},
    'U8.67': {t:'Joc: endevina la mitjana i el rang', d:'●●○', i:['u8-parametres/data/full-3.png']},
    'U8.69': {t:'Els valors de x i y perquè la mitjana sigui 20 i la moda 23', d:'●○○', i:['u8-parametres/data/full-4.png']},
    'U8.70': {t:'La puntuació de l’Ana', d:'●●○', i:['u8-parametres/data/full-4.png']},
    'U8.71': {t:'Una competició de tir: quants punts va fer l’Antoni com a mínim?', d:'●●●', i:['u8-parametres/data/full-4.png']},
    'U8.73': {t:'Afegeix dues dades perquè la mediana sigui 8,5, 8 o 9', d:'●●○', i:['u8-parametres/data/full-4.png']},
    'U8.74': {t:'Les dades 0, 1, x i 4: el valor de x i un sudoku', d:'●●○', i:['u8-parametres/data/full-4.png']},
    'U8.75': {t:'Mitjana, mediana, moda, quartils i P₃₂ a partir d’un gràfic', d:'●●○', i:['u8-parametres/data/full-5.png']},
    'U8.76': {t:'Respon raonadament sobre mitjana, moda, mediana i quartils', d:'●●○', i:['u8-parametres/data/full-5.png']},
    'U8.77': {t:'S’esborren 20 nombres: la mitjana dels nombres esborrats', d:'●●●', i:['u8-parametres/data/full-5.png']},

    /* ── U8 · 3. Informació estadística dels mitjans (pàgines 254–258) */
    'U8.80': {t:'Un fons d’inversió: la rendibilitat mitjana en 5 anys', d:'●●○', i:['u8-informacio/data/full-1.png']},
    'U8.81': {t:'Les coliflors: ingressos i preu mitjà per quilo', d:'●●○', i:['u8-informacio/data/full-1.png', 'u8-informacio/data/full-2.png']},
    'U8.82': {t:'L’estatura mitjana d’una classe: vertader o fals', d:'●●○', i:['u8-informacio/data/full-2.png']},
    'U8.83': {t:'La venda de cafès al llarg del dia', d:'●●○', i:['u8-informacio/data/full-2.png', 'u8-informacio/data/full-3.png']},
    'U8.84': {t:'Les sals minerals de l’aigua embotellada', d:'●●○', i:['u8-informacio/data/full-3.png']},
    'U8.85': {t:'Les oposicions de policia local: dues proves', d:'●●○', i:['u8-informacio/data/full-4.png', 'u8-informacio/data/full-5.png']},
    'U8.FN': {t:'Malos humos: els fumadors per província', d:'', i:['u8-informacio/data/full-4.png', 'u8-informacio/data/full-5.png'], e:'Fake news', nom:'Fake news'},
    'U8.88': {t:'Dades 2, 5, 5, 7, 3, x: la mitjana i la mediana', d:'', i:['u8-informacio/data/full-5.png']},
    'U8.89': {t:'La corredora: quants quilòmetres ha de córrer dissabte?', d:'', i:['u8-informacio/data/full-5.png']},

    /* ── Llibre propi · UD8 (activitat 8.3, mitjana ponderada). L'enunciat i la solució són a enunciats.js.
          Fora: «Per al Quadern d'eines». */
    '8.3.1': {t:'Escalfem el cap: mitjana, mediana i moda de set dades', d:'', i:[]},
    '8.3.2': {t:'Nota final amb pesos del 20 %, 30 % i 50 %', d:'', i:[]},
    '8.3.3': {t:'Nota final amb pesos del 40 %, 40 % i 20 %', d:'', i:[]},
    '8.3.4': {t:'Mitjana simple o ponderada: per què surten diferents?', d:'', i:[]},
    '8.3.5': {t:'Sous amb un valor extrem: mitjana o mediana?', d:'', i:[]},
    '8.3.6': {t:'Caça l’error: dividir pel nombre de dades', d:'', i:[]},
    '8.3.7': {t:'Decideix la mesura: mitjana, mediana o moda', d:'', i:[]},
    '8.3.8': {t:'La nota que falta', d:'', i:[]},
    '8.3.9': {t:'Un jugador nou: l’alçada mitjana dels 12', d:'', i:[]},
    '8.3.10': {t:'Quina nota cal a l’examen per treure un 7,5?', d:'', i:[]},
    '8.3.11': {t:'Caça l’error: la mitjana de dues classes', d:'', i:[]},
  },

  'apl-ud9': {

    /* Santillana, unitat 9. Fora (vistiplau P11 i F1): combinatòria amb fórmula, operacions amb
       successos i probabilitat condicionada amb fórmula: Act. 4–16, 18–22, 31, 32 i 35–39; ex. 49–56,
       60, 62, 66–75, 90–92, 94, 95 i 104. També el 83 (el solucionari diu «Resuelta en el libro de
       texto»). */

    /* ── U9 · Activitats (pàgines 263–272 del llibre) */
    'U9.1': {t:'Dues equipacions: de quantes maneres es poden vestir?', d:'', i:['u9-activitats/data/full-1.png']},
    'U9.2': {t:'De quantes maneres es poden col·locar les lletres de PACO?', d:'', i:['u9-activitats/data/full-2.png']},
    'U9.3': {t:'Les combinacions de les lletres de ROSA amb un diagrama d’arbre', d:'', i:['u9-activitats/data/full-2.png']},
    'U9.17': {t:'Experiments aleatoris o deterministes?', d:'', i:['u9-activitats/data/full-3.png']},
    'U9.23': {t:'La freqüència relativa de sortir creu en 75 llançaments', d:'', i:['u9-activitats/data/full-4.png']},
    'U9.24': {t:'Com calcularies la probabilitat que una volandera sigui defectuosa?', d:'', i:['u9-activitats/data/full-4.png']},
    'U9.25': {t:'5 000 extraccions d’una bossa: probabilitats a partir de freqüències', d:'', i:['u9-activitats/data/full-4.png']},
    'U9.26': {t:'Una bossa amb boles de colors: probabilitat de cada color', d:'', i:['u9-activitats/data/full-4.png', 'u9-activitats/data/full-5.png']},
    'U9.27': {t:'17 nois i 19 noies: probabilitat de triar un noi o una noia', d:'', i:['u9-activitats/data/full-5.png']},
    'U9.28': {t:'Camises i samarretes: la probabilitat de cada peça', d:'', i:['u9-activitats/data/full-5.png']},
    'U9.29': {t:'Un dau amb la cara 6 canviada per un 1', d:'', i:['u9-activitats/data/full-5.png']},
    'U9.30': {t:'La baralla espanyola: unió i intersecció de tres successos', d:'', i:['u9-activitats/data/full-5.png', 'u9-activitats/data/full-6.png']},
    'U9.33': {t:'La suma de dos daus', d:'', i:['u9-activitats/data/full-6.png', 'u9-activitats/data/full-7.png']},
    'U9.34': {t:'Probabilitat de no treure ni asos ni figures', d:'', i:['u9-activitats/data/full-7.png']},
    'U9.40': {t:'Una urna amb 2 boles blanques i 2 de blaves: amb i sense reemplaçament', d:'', i:['u9-activitats/data/full-8.png']},
    'U9.41': {t:'Tres monedes: diagrama d’arbre i probabilitats', d:'', i:['u9-activitats/data/full-8.png']},
    'U9.42': {t:'Quatre cavalls de la baralla: amb i sense reemplaçament', d:'', i:['u9-activitats/data/full-8.png', 'u9-activitats/data/full-9.png']},
    'U9.43': {t:'Una campanya de vacunació: vacunat i no malalt', d:'', i:['u9-activitats/data/full-9.png']},
    'U9.44': {t:'Tres missatgers: paquets entregats a temps', d:'', i:['u9-activitats/data/full-9.png']},

    /* ── U9 · Activitats finals · 1. Mètodes de recompte (pàgines 272–273) */
    'U9.45': {t:'El menú del dia: quants menús diferents?', d:'●○○', i:['u9-activitats/data/full-9.png']},
    'U9.46': {t:'Dos tipus d’arbres en tres espais', d:'●○○', i:['u9-recompte/data/full-1.png']},
    'U9.47': {t:'Nombres de tres xifres amb 1, 2, 3 i 4', d:'●●○', i:['u9-recompte/data/full-1.png']},
    'U9.48': {t:'Un torneig de ping-pong: la graella de partides', d:'●●●', i:['u9-recompte/data/full-1.png']},

    /* ── U9 · 2. Situacions aleatòries (pàgines 275–277) */
    'U9.57': {t:'Matrícules de vehicles: quantes se’n poden fer?', d:'●●○', i:['u9-aleatori/data/full-1.png']},
    'U9.58': {t:'Quantes encaixades de mans hi haurà en una reunió de 10 persones?', d:'●●○', i:['u9-aleatori/data/full-2.png']},
    'U9.59': {t:'La quiniela: quantes apostes diferents i quant costarien?', d:'●●○', i:['u9-aleatori/data/full-2.png']},
    'U9.61': {t:'Pedra, paper i tisora: guanyar després de 4 rondes', d:'●●○', i:['u9-aleatori/data/full-2.png']},
    'U9.63': {t:'Deterministes o aleatoris?', d:'●○○', i:['u9-aleatori/data/full-3.png']},
    'U9.64': {t:'Comptar els dilluns d’un mes i triar una fruita: quin tipus d’experiment?', d:'●○○', i:['u9-aleatori/data/full-3.png']},
    'U9.65': {t:'Inventa dos experiments aleatoris i dos que no ho siguin', d:'●○○', i:['u9-aleatori/data/full-3.png']},

    /* ── U9 · 3. Probabilitats (pàgines 281–285) */
    'U9.76': {t:'Expressa en termes de probabilitat', d:'●○○', i:['u9-probabilitat/data/full-1.png']},
    'U9.77': {t:'Un bombo amb 10 boles: freqüències relatives', d:'●●○', i:['u9-probabilitat/data/full-1.png', 'u9-probabilitat/data/full-2.png']},
    'U9.78': {t:'Monedes d’1 € de diferents països', d:'●○○', i:['u9-probabilitat/data/full-2.png']},
    'U9.79': {t:'Una xinxeta: amb la punta cap amunt o cap avall?', d:'●●○', i:['u9-probabilitat/data/full-2.png']},
    'U9.80': {t:'La baralla espanyola: as, ors, rei de bastos', d:'●○○', i:['u9-probabilitat/data/full-2.png', 'u9-probabilitat/data/full-3.png']},
    'U9.81': {t:'Quatre probabilitats que no sumen 1', d:'●○○', i:['u9-probabilitat/data/full-3.png']},
    'U9.82': {t:'Un quadrat màgic de probabilitats', d:'●●○', i:['u9-probabilitat/data/full-3.png', 'u9-probabilitat/data/full-4.png']},
    'U9.84': {t:'Un dau amb P(1) = P(2) = P(3) = 1/7: quant val x?', d:'●●○', i:['u9-probabilitat/data/full-4.png']},
    'U9.85': {t:'P(A) = P(B) = P(C) i P(D) = 2P(A)', d:'●●○', i:['u9-probabilitat/data/full-4.png']},
    'U9.86': {t:'Un punt a l’atzar en un rectangle: probabilitat que x < y', d:'●●●', i:['u9-probabilitat/data/full-4.png']},
    'U9.87': {t:'La suma de les cares visibles d’un dau', d:'●●○', i:['u9-probabilitat/data/full-4.png']},
    'U9.88': {t:'Tres monedes: almenys, com a màxim', d:'●●○', i:['u9-probabilitat/data/full-4.png', 'u9-probabilitat/data/full-5.png']},
    'U9.89': {t:'Joc: quins tres nombres consecutius triaries?', d:'●●○', i:['u9-probabilitat/data/full-5.png']},

    /* ── U9 · 4. Problemes de la vida quotidiana (pàgines 286–288) */
    'U9.93': {t:'Una urna amb 4 boles vermelles i 6 de blanques: dues extraccions', d:'●●●', i:['u9-problemes/data/full-1.png']},
    'U9.96': {t:'Tres daus: probabilitat que el producte sigui 36', d:'●●○', i:['u9-problemes/data/full-1.png', 'u9-problemes/data/full-2.png']},
    'U9.97': {t:'Un nombre del 20 al 79: el producte de les xifres és 18', d:'●●○', i:['u9-problemes/data/full-2.png']},
    'U9.98': {t:'Una penya: probabilitat de ser noia i nombre de membres', d:'●●○', i:['u9-problemes/data/full-2.png']},
    'U9.99': {t:'Dos fills: dos nois, dues noies, un de cada', d:'●●○', i:['u9-problemes/data/full-2.png']},
    'U9.100': {t:'Un test de 4 preguntes contestat a l’atzar', d:'●●●', i:['u9-problemes/data/full-2.png']},
    'U9.101': {t:'Set pinzells: almenys un que no sigui petit', d:'●●●', i:['u9-problemes/data/full-2.png', 'u9-problemes/data/full-3.png']},
    'U9.102': {t:'Dos jugadors de bàsquet alternen tirs lliures', d:'●●●', i:['u9-problemes/data/full-3.png']},
    'U9.103': {t:'Tres taronges de vuit fruites: dues peces a l’atzar', d:'●●●', i:['u9-problemes/data/full-3.png']},

    /* ── Llibre propi · UD9 (activitat 9.5, joc just i apostes). L'enunciat i la solució són a enunciats.js.
          Fora: «Per al Quadern d'eines». */
    '9.5.1': {t:'Escalfem el cap: un joc que paga 4 € si surt parell', d:'', i:[]},
    '9.5.2': {t:'Just o no? Un joc que paga 3 € si surt un 6', d:'', i:[]},
    '9.5.3': {t:'La ruleta amb un premi de 36 €', d:'', i:[]},
    '9.5.4': {t:'Caça el parany de cada missatge', d:'', i:[]},
    '9.5.5': {t:'Compara riscos: la loteria 6/49', d:'', i:[]},
    '9.5.6': {t:'Debat en grup: entreteniment o mal pla', d:'', i:[]},
    '9.5.7': {t:'Decideix i recomana: «recuperar-ho» jugant més', d:'', i:[]},
    '9.5.8': {t:'Una rifa de 500 butlletes', d:'', i:[]},
    '9.5.9': {t:'Una aposta de 10 € a quota 1,80', d:'', i:[]},
    '9.5.10': {t:'El marge d’un partit', d:'', i:[]},
    '9.5.11': {t:'Cada setmana: 10 € a quota 1,90 durant un any', d:'', i:[]},
    '9.5.12': {t:'Respon amb números: «a la llarga es guanya»', d:'', i:[]},
  },



};

/* ── Funcions (no cal tocar-les) ─────────────────────────────────────── */

function fitxaDe(u, n){
  const c = CATALEG[u]; return (c && c[n]) ? c[n] : null;
}
/* Com es diu cada origen a l'etiqueta: les unitats de Santillana es diuen igual
   que la clau ('U4'); els annexos, amb nom curt. */
const ORIGENS = {AP:'Annex Pol.', AR:'Annex Pot.', AT:'Annex Trig.'};
/* La clau partida: 'U4.24' → {origen:'U4', num:'24'}; 'AP.33' → {origen:'Annex Pol.', num:'33'};
   '4.2.7' → {origen:'', num:'4.2.7'}. */
function _parts(n){
  const m = /^(U\d+|AP|AR|AT)\.(.+)$/.exec(String(n));
  return m ? {origen: ORIGENS[m[1]] || m[1], num: m[2]} : {origen: '', num: String(n)};
}
/* L'etiqueta del requadre de la llista: «U4 · 24», «U4 · Situació 2», «4.2.7»… */
function etiquetaDe(u, n){
  const f = fitxaDe(u, n), p = _parts(n);
  const base = (f && f.e) ? f.e : (p.origen ? p.num : (/^\d+$/.test(p.num) ? 'Ex. ' + p.num : p.num));
  return p.origen ? p.origen + ' · ' + base : base;
}
/* El títol de la pàgina d'un exercici: «Exercici 24 · U4», «Exercici 4.2.7»… */
function nomDe(u, n){
  const f = fitxaDe(u, n), p = _parts(n);
  const cua = p.origen ? ' · ' + p.origen : '';
  return (f && f.nom) ? f.nom + cua : 'Exercici ' + p.num + cua;
}
/* Si l'exercici és del llibre propi (sense imatges del solucionari). */
function esPropi(u, n){
  const f = fitxaDe(u, n); return !!f && (!f.i || f.i.length === 0);
}
/* La matèria d'una unitat ('apl-ud4' → 'apl'). */
function materiaDe(u){
  return (UNITATS_META[u] && UNITATS_META[u].materia) || u.split('-')[0];
}
/* La posició de la unitat dins del curs (per ordenar l'índex). */
function ordreDe(u){
  const m = UNITATS_META[u]; return (m && m.ordre) || 99;
}
