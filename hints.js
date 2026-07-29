/* ═══════════════════════════════════════════════════════════════════════
   LES PISTES
   ───────────────────────────────────────────────────────────────────────
   Una línia per pista. La clau és   'unitat/exercici'   i el valor, el text
   que veurà l'alumne quan premi el botó 💡.

     'u7/44': 'Fixa\'t en el grau del numerador i el del denominador...',

   Un exercici sense línia aquí simplement no mostra cap botó de pista: no
   cal escriure-hi res ni deixar-la buida.

   L'apòstrof s'ha d'escapar amb barra invertida:  d\'una  ,  fixa\'t
   (o fes servir l'apòstrof tipogràfic ’, que no cal escapar).

   Es pot editar des del mòbil: GitHub → hints.js → llapis → Commit changes.
   ═══════════════════════════════════════════════════════════════════════ */

const PISTES = {

  /* ── Unitat 7 · Límits i continuïtat ─────────────────────────────────── */
  'u7/40': 'A cada punt de canvi de tros, iguala el límit per l\'esquerra amb el límit per la dreta (i amb el valor que dona la fórmula en aquell punt): cada punt et dona una equació. Resol el sistema resultant per trobar a i b.',
  'u7/43': 'Bolzano parla d\'arrels, o sigui de valors on la funció val 0. Reescriu-ho: defineix g(x) = f(x) − 1 i busca-hi dos punts amb signes contraris. L\'exponencial és contínua a tot ℝ, o sigui que g també ho és.',
  'u7/44': 'Mira cada gràfica per separat a la banda dreta (x → +∞) i a l\'esquerra (x → −∞): la corba s\'apropa a una alçada fixa (asímptota horitzontal), puja o baixa sense parar, o no s\'estabilitza? No cal calcular res, només llegir el dibuix.',
  'u7/45': 'Pensa en qui "guanya" quan x es fa molt gran: una exponencial d\'una base més gran que 1 creix molt més de pressa que qualsevol potència de x, i una arrel creix més a poc a poc que allò que hi ha a dins. Simplifica quedant-te només amb els termes que realment dominen.',
  'u7/46': 'Compara el grau del numerador amb el del denominador: si són iguals, el límit és el quocient dels coeficients del terme de grau més alt; si el numerador té grau més gran, dona infinit; si en té menys, dona 0. Per al signe a −∞, vigila si les potències són parelles o senars.',
  'u7/47': 'Fes-ho al revés: per a cada límit que et demanen, quina és la funció més senzilla que el produeix? Un límit finit no nul suggereix numerador i denominador del mateix grau; un límit infinit, un numerador de grau més gran (o una exponencial); un límit 0, un denominador de grau més gran. No busquis res complicat.',
  'u7/48': 'Fixa\'t que les dues funcions comparteixen denominador (grau 2) i només canvia el grau del numerador (1 i 2, respectivament): aplica la regla de comparar graus a cadascuna i observa com aquest únic canvi altera el resultat.',
  'u7/66': 'Per a cada punt que et demanen, mira si per l\'esquerra i per la dreta la gràfica s\'acosta a la mateixa alçada; si no coincideixen, dona els dos límits laterals per separat en lloc d\'un únic valor.',
  'u7/68': 'Igual que amb f: comprova els límits laterals a cada punt marcat i, per a ±∞, fixa\'t cap a on tendeix la corba pels dos extrems del dibuix (puja, baixa o s\'estabilitza en una alçada).',
  'u7/70': 'Comprova que √(x²+1) mai és zero: la funció és contínua a tot arreu, així que en cada punt només cal substituir directament el valor de x, sense cap indeterminació.',
  'u7/76': 'Quan en substituir surt 0/0, factoritza numerador i denominador (factor comú o Ruffini) per trobar l\'arrel que els anul·la, simplifica i torna a substituir.',
  'u7/88': 'Com que la funció és a trossos, en x=−1 i x=3 calcula per separat el límit amb l\'expressió que val a l\'esquerra i la que val a la dreta de cada punt; en +∞ fixa\'t només en el tros vàlid per a x grans.',
  'u7/90': 'Igual que en l\'exercici anterior: identifica quin tros s\'aplica a cada banda dels 4 punts de canvi i calcula els límits laterals per separat; per a ±∞ mira només el tros vàlid per a x molt grans o molt petites.',
  'u7/92': 'Per a cada gràfica, mira si el límit per l\'esquerra i el de la dreta coincideixen entre ells i amb l\'alçada del punt: si tot coincideix és contínua; si els laterals no coincideixen entre si és discontinuïtat de salt; si coincideixen però no amb el valor de la funció (o aquest no existeix) és evitable; si algun lateral és infinit, és de salt infinit.',
  'u7/93': 'Fixa\'t primer en el domini de cada funció: les arrels necessiten l\'interior ≥ 0 i els logaritmes l\'interior > 0; fora d\'aquest domini la funció ja no és contínua perquè no hi és definida. El valor absolut, en canvi, no restringeix mai el domini.',
  'u7/94': 'Busca els valors de x que anul·len el denominador: només allà hi pot haver discontinuïtat. Calcula el límit en aquest punt; si dona un nombre finit (es pot simplificar el factor que s\'anul·la), és evitable, si dona infinit, és de salt infinit.',
  'u7/102': 'A x=−1 i x=2, calcula el límit lateral amb el tros que correspon a cada banda (recorda que el logaritme només existeix quan l\'argument és positiu) i compara\'ls entre ells i amb el valor de la funció en aquell punt.',
  'u7/103': 'A cada punt de canvi, calcula el límit lateral amb el tros corresponent (compte amb el tros exponencial) i compara\'l amb el valor que pren la funció en aquell punt per decidir si hi ha continuïtat.',
  'u7/106': 'Cada punt de canvi et dona una condició: iguala el límit per l\'esquerra amb el límit per la dreta en aquell punt. Amb les equacions que en surten, planteja i resol el sistema per a a i b.',
  'u7/112': 'És contínua a tot ℝ (una exponencial més un polinomi), o sigui que pots aplicar Bolzano. Ves provant valors enters fins que f canviï de signe i, a partir d\'aquí, parteix l\'interval per la meitat: cada partició el redueix a la meitat, fins que arribis a la longitud que et demanen.',
  'u7/113': 'Un polinomi és continu a tot ℝ, així que amb Bolzano n\'hi ha prou: només has de trobar dos valors on f canviï de signe. Com que l\'interval ha de tenir longitud 2, busca\'ls entre enters separats per dues unitats, i prova primer amb els negatius.',
  'u7/114': 'Comprova abans de res que f canvia de signe als dos extrems de l\'interval. Després aplica bisecció: calcula f al punt mig, queda\'t amb la meitat on continua havent-hi canvi de signe i repeteix. Cada pas divideix la longitud per dos, i has d\'arribar per sota de l\'error demanat.',
  'u7/120': 'Que dues corbes es tallin vol dir que la diferència de les dues funcions s\'anul·la. Per a cada apartat, defineix h(x) com la resta de les dues i busca-hi un canvi de signe. Quan hi hagi un logaritme, mira\'t primer on està definit.',

  /* ── Unitat 8 · Derivades ─────────────────────────────────── */
  'u8/21': 'Et calen dues coses: el punt, que és f(e), i el pendent, que és f′(e). Per derivar un producte de dues funcions aplica la regla del producte. Amb això, la recta surt de y − f(e) = f′(e)·(x − e).',
  'u8/30': 'La taxa de variació mitjana en [a, b] és [f(b) − f(a)] dividit per (b − a). Calcula-la als quatre intervals i després mira\'t els quatre resultats junts: en una funció afí passa una cosa que val la pena que notis.',
  'u8/31': 'És la mateixa fórmula per als tres casos. Abans de calcular la de la funció constant, pensa quant ha de donar; i quan tinguis les altres dues, compara-les amb el pendent de cada recta.',
  'u8/32': 'Els dos primers apartats són taxa de variació mitjana; el tercer és la derivada, que és el límit de la taxa quan l\'interval es fa tan petit com vulguis. Pots fer-ho amb la definició en x = 1 o derivant la funció i substituint.',
  'u8/37': 'Fes servir la definició al punt: f′(a) és el límit, quan h tendeix a 0, de [f(a+h) − f(a)]/h. Substitueix, desenvolupa el numerador i simplifica la h abans de fer el límit; si et continua quedant 0/0, és que encara no has simplificat prou.',
  'u8/40': 'Calcula f(2) per tenir el punt i f′(2) per tenir el pendent, i escriu la recta en forma punt-pendent. Per al dibuix, de la paràbola en necessites el vèrtex i els talls amb els eixos, i la tangent l\'ha de tocar només en aquest punt.',
  'u8/41': 'El punt P és damunt de la corba: substitueix les seves coordenades a f(x) i te\'n sortirà el valor d\'a. Un cop el tinguis, deriva la funció i calcula el pendent en x = 1.',
  'u8/46': 'Primer has de saber quin és el punt: la gràfica talla l\'eix d\'abscisses on f(x) = 0, és a dir on s\'anul·la el numerador. Deriva amb la regla del quocient per tenir el pendent m de la tangent; la normal hi és perpendicular, o sigui que el seu pendent és −1/m.',
  'u8/54': 'Dues rectes són paral·leles quan tenen el mateix pendent, i el de la recta que et donen es llegeix directament. Planteja f′(x) igual a aquest pendent i resol: cada solució és una abscissa, i després calcula la imatge per tenir el punt sencer.',
  'u8/58': 'Troba primer la recta tangent en el punt indicat. Després calcula on talla cada eix (fes-hi x = 0 i y = 0): aquests dos talls, amb l\'origen, són els vèrtexs del triangle rectangle, i l\'àrea és base per altura entre dos.',
  'u8/86': 'Totes són de taula, però la majoria porten funció composta: derivada de fora, per derivada de dins. Vigila amb l\'exponencial de base 2 i amb el logaritme de base 2, perquè hi apareix un ln de la base que no hi és quan la base és e.',
  'u8/87': 'Aquí no busques el valor en un punt sinó la funció derivada, o sigui que apliques la definició deixant la x com a lletra: el límit de [f(x+h) − f(x)]/h. Comença per la constant i fixa\'t què passa amb el numerador.',
  'u8/88': 'A la fracció, fes primer la resta del numerador amb denominador comú i després divideix per h. A l\'arrel, multiplica i divideix pel conjugat per treure-la del numerador: és l\'única manera de fer desaparèixer la h.',
  'u8/92': 'Abans de derivar, reescriu-ho tot en forma de potència: l\'arrel és x elevat a 1/2 i 1/x és x elevat a −1. Així n\'hi ha prou amb la regla de la potència, que també val amb exponents negatius i fraccionaris.',
  'u8/93': 'El primer se simplifica molt si abans ajuntes les dues potències de x en una de sola. Els altres tres són productes, i a l\'últim, a més, hi ha una arrel d\'una funció: cal la regla del producte i la de la cadena alhora.',
  'u8/97': 'La derivada d\'un logaritme és la derivada de dins dividida pel de dins. Al segon, aplica-hi abans la propietat del logaritme d\'una arrel i t\'estalviaràs mitja feina. El tercer és un quocient, i el quart té base 2, o sigui que hi apareixerà un ln 2.',

};


/* ═══════════════════════════════════════════════════════════════════════
   A PARTIR D'AQUÍ NO CAL QUE TOQUIS RES
   ═══════════════════════════════════════════════════════════════════════ */

/* La pista d'un exercici, o null si no en té. */
function pistaDe(u, n){
  const t = PISTES[u + '/' + n];
  return t ? t : null;
}

/* Quants dels exercicis d'una llista de refs {u,n} tenen pista. */
function comptaPistes(refs){
  let k = 0;
  refs.forEach(r => { if(pistaDe(r.u, r.n)) k++; });
  return k;
}
