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


  /* ── Unitat 9 · Aplicacions de les derivades ─────────────────────────── */
  'u9/30': 'Cada dada et dona una equació. Que hi hagi un extrem en un punt vol dir que la derivada s\'hi anul·la: d\'aquí en surten dues. Que P sigui damunt de la gràfica vol dir que f(1) val 6: aquesta és la tercera. Amb tres equacions i tres incògnites, resol el sistema.',
  'u9/34': 'Estudia cada tros per separat buscant-hi els punts crítics amb la derivada, però no et quedis aquí: en una funció a trossos, el màxim i el mínim també poden caure al punt on canvia la definició o als extrems de l\'interval, justament allà on la derivada no existeix o no serveix. Compara al final els valors de tots els candidats.',
  'u9/39': 'Pensa-ho a través de la derivada: si f és un polinomi de grau n, f′ és de grau n − 1, i un polinomi de grau n − 1 no pot tenir més de n − 1 arrels. Com que els extrems només poden ser allà on la derivada s\'anul·la, ja tens el màxim possible. Comprova-ho amb la recta i la paràbola.',
  'u9/41': 'Els extrems de f són allà on la gràfica de f′ talla l\'eix X. Per saber de quin tipus és cadascun, mira com canvia el signe de f′ en creuar-lo: de positiu a negatiu és un màxim de f, i de negatiu a positiu, un mínim. Si f′ toca l\'eix però no canvia de signe, allà no hi ha extrem.',
  'u9/42': 'El procediment és sempre el mateix: deriva, resol f′(x) = 0 per tenir els punts crítics, col·loca\'ls damunt d\'una recta i estudia el signe de f′ a cada interval que en surt. Un canvi de positiu a negatiu és un màxim; de negatiu a positiu, un mínim.',
  'u9/44': 'Ves de la resposta cap enrere: el que vols és que f′ s\'anul·li en aquell punt. Comença decidint com ha de ser f′ (alguna cosa que es faci zero en x = 2, per exemple) i pensa de quina f prové. Amb una paràbola n\'hi ha prou: recorda on té el vèrtex i què decideix si s\'obre cap amunt o cap avall.',
  'u9/50': 'Primer troba els punts crítics resolent f′(x) = 0 i després decideix-ne el tipus substituint-los a f″: si surt negativa és un màxim i si surt positiva, un mínim. Si f″ hi val zero, aquest criteri no et diu res i has de tornar a mirar el signe de f′ als costats.',
  'u9/51': 'Sempre creixent vol dir f′(x) > 0 per a qualsevol x. Deriva i et quedarà una paràbola: si el discriminant surt negatiu, no talla mai l\'eix i per tant no pot canviar de signe. Només et faltarà comprovar quin signe té, substituint-hi un valor qualsevol.',
  'u9/58': 'Que hi hagi un extrem relatiu en x = 2 vol dir que la derivada s\'hi anul·la: planteja f′(2) = 0 i te\'n sortirà el valor d\'a. Amb la a ja coneguda, torna a resoldre f′(x) = 0 per tenir tots els punts crítics i estudia el signe de f′ als intervals que determinen.',
  'u9/66': 'El mateix raonament que amb els extrems, però un pas més enllà: els punts d\'inflexió es busquen allà on s\'anul·la la segona derivada. Si f és de grau n, f″ és de grau n − 2, i d\'aquí en surt el nombre màxim d\'arrels. Fixa\'t què implica això per a la recta i per a la paràbola.',
  'u9/67': 'Per a cada funció, calcula f″ i mira\'n el signe: positiu vol dir convexa i negatiu, còncava. Abans de començar, però, mira\'t el domini, sobretot a les racionals, les arrels i els logaritmes: un punt on la funció no existeix també separa trams de curvatura, encara que no sigui un punt d\'inflexió.',
  'u9/70': 'Tradueix cada condició en una equació: passar per l\'origen vol dir f(0) = 0; tenir un punt d\'inflexió en x = −1 vol dir f″(−1) = 0; i que el pendent de la tangent en x = 1 sigui 3 vol dir f′(1) = 3. Tres condicions per a tres incògnites.',
  'u9/77': 'Anomena x i y els dos catets. Tens dues coses lligades: l\'àrea, que és x·y/2, i el teorema de Pitàgores, que relaciona els catets amb la hipotenusa. Fes servir Pitàgores per deixar l\'àrea en funció d\'una sola variable i deriva. Si vols estalviar-te l\'arrel, treballa amb el quadrat de l\'àrea: té el màxim al mateix lloc.',
  'u9/79': 'Anomena x i y les dimensions de la part escrita, que han de complir x·y = 18. La superfície total del full és (x més els marges laterals) per (y més els marges de dalt i de baix). Substitueix-hi y = 18/x per tenir-ho tot en una sola variable i després minimitza derivant.',
  'u9/86': 'Escriu la superfície del rectangle com a base per altura i fes servir l\'equació de la recta per deixar-ho tot en funció d\'una sola variable. Després deriva, iguala a zero i comprova amb la segona derivada que el que has trobat és realment un màxim i no un mínim.',
  'u9/87': 'La distància del punt (x, x²) al punt donat surt del teorema de Pitàgores. Un truc que t\'estalvia molta feina: el punt que fa mínima la distància és el mateix que fa mínim el seu quadrat, i el quadrat no porta arrel, o sigui que és molt més còmode de derivar.',

  /* ── Unitat 10 · Representació de funcions ───────────────────────────── */
  'u10/37': 'El que tens dibuixat és f′, no f. Allà on la corba de f′ va per sobre de l\'eix, f creix; on va per sota, f decreix; i on el talla, f té un extrem. Per a la curvatura, mira si f′ puja o baixa: si f′ creix, f és convexa; si f′ decreix, f és còncava; i els extrems de f′ són els punts d\'inflexió de f.',
  'u10/38': 'És de resposta oberta: no busquis cap fórmula, dibuixa. Traça primer les dues asímptotes i el punt de tall que et donen, i després encaixa-hi la corba respectant el que et diu del creixement i dels extrems, acostant-se a cada asímptota pel costat que toca.',
  'u10/41': 'El mateix guió que amb qualsevol altra racional, però aquí la simetria et regala mitja feina: mira primer si f(−x) surt igual a f(x) o a −f(x). Si hi ha simetria, estudia només una banda i reflecteix l\'altra. Compte amb el denominador, que s\'anul·la en dos punts.',
  'u10/43': 'Repassa què prohibeix cada tipus de funció: un denominador no es pot anul·lar, dins d\'una arrel d\'índex parell hi ha d\'haver un nombre positiu o zero, i dins d\'un logaritme, estrictament positiu. Les exponencials i el sinus no restringeixen res, o sigui que aquestes tenen tot ℝ per domini.',
  'u10/45': 'Són dues feines diferents. Per al domini, mira només què pot fer petar la fórmula, típicament un denominador que s\'anul·la. Per als talls: amb l\'eix X resol f(x) = 0, i amb l\'eix Y calcula f(0) — si el 0 no és al domini, senzillament no hi ha tall amb l\'eix Y.',
  'u10/62': 'Totes quatre són polinomis, i això ja et dona mitja resposta: un polinomi no té asímptotes de cap mena. El que sí que has de fer és calcular els límits en +∞ i en −∞ per dir cap on se\'n va cada branca, i això ho decideixen el grau i el signe del coeficient principal.',
  'u10/63': 'Les verticals surten dels valors que anul·len el denominador (comprova abans que no desapareguin en simplificar). Per a les horitzontals i les obliqües, compara els graus: si el de dalt és més petit hi ha horitzontal y = 0; si són iguals, horitzontal al quocient dels coeficients principals; i si el de dalt supera el de baix en una unitat, no hi ha horitzontal sinó obliqua.',
  'u10/75': 'Sempre el mateix guió: domini, deriva, resol f′(x) = 0 i estudia el signe de f′ als intervals que en surten. No t\'oblidis de posar damunt de la recta els punts on la funció no existeix: no són extrems, però també separen trams de creixement.',
  'u10/78': 'Aquí treballes amb la segona derivada: on f″ és positiva la funció és convexa i on és negativa, còncava. Per als punts d\'inflexió no n\'hi ha prou que f″ s\'anul·li, també hi ha de canviar de signe; si s\'anul·la i no canvia, allà no hi ha inflexió.',
  'u10/88': 'Tres condicions, tres incògnites. Tenir un extrem en x = 2 vol dir f′(2) = 0; tenir un punt d\'inflexió en x = 0 vol dir f″(0) = 0; i passar per (1, −5) vol dir f(1) = −5. Comença per la del punt d\'inflexió, que és la més curta perquè f″ només conté una de les tres lletres.',
  'u10/91': 'És un estudi complet, o sigui que val la pena seguir sempre el mateix ordre: domini, talls, simetria, asímptotes, monotonia, curvatura i, només al final, el dibuix. Comprova la simetria de bon començament, que et pot estalviar la meitat de la feina; i fixa\'t que el grau de dalt supera en un el de baix, cosa que anuncia asímptota obliqua.',
  'u10/100': 'Amb les arrels el domini mana, i sovint la gràfica només existeix en un tros de la recta: comença sempre resolent la inequació de dins de l\'arrel. Als extrems del domini la corba s\'acaba de cop, i allà la tangent acostuma a ser vertical perquè la derivada s\'hi dispara.',
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
