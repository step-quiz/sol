/* ═══════════════════════════════════════════════════════════════════════
   LES ERRADES DEL SOLUCIONARI
   ───────────────────────────────────────────────────────────────────────
   El solucionari té errades. Aquí hi ha les dels exercicis programats a
   tasques.js. La clau és la mateixa que a hints.js:  'unitat/exercici'.

     'u7/76': [
       { lloc:    TEX`f)`,
         ondiu:   TEX`$\dlim_{x\to 3}\dfrac{3-x}{x+2}=0$`,
         hadedir: TEX`$\dlim_{x\to 3}\dfrac{-(3+x)}{x+2}=-\dfrac{6}{5}$`,
         motiu:   TEX`Els factors $3-x$ i $x-3$ són oposats.` },
     ],

   Cada exercici porta una LLISTA d'errades (entre [ ]), en l'ordre en què
   surten a la solució. De cada errada:

     lloc      on és: l'apartat i, si cal, un detall
               (TEX`f)` , TEX`e), punt $x=1$` , TEX`segon punt` ...).
               Si no cal dir res, aquesta línia no es posa.
     ondiu     el que hi ha imprès al solucionari
     hadedir   el que hi hauria de dir
     motiu     l'explicació. Només es veu si ERRADES_MOTIU és true.
     pegat     un tros de la pàgina ja corregit, que es posa a sobre de la imatge:
                 pegat: ['continuitat/data/full-2.png', 82.2, 7.4, 5.5, 1.7, '92-1a.png']
               La imatge, el rectangle (en tant per cent, com a `marca`) i el
               fitxer, que és a  pegats/<unitat>/ . Amb ERRADES_PEGATS encès,
               una errada amb pegat no s'anuncia enlloc (ni avís ni targeta ni
               requadre): l'alumne veu la pàgina corregida i prou. Les errades
               d'enunciat s'anuncien igualment a la llista, perquè el llibre
               de l'alumne continua tenint l'errada. Els pegats no es poden
               fer a mà: surten d'un procés a part.
     enunciat  s'escriu  enunciat: 1  quan l'errada és a l'ENUNCIAT i no a la
               solució. Aquestes es mostren ja a la llista de la tasca,
               abans que l'alumne comenci l'exercici.
     marca     on és l'errada DINS DE LA IMATGE: el fitxer (tal com surt a
               cataleg.js) i un rectangle en percentatges de la imatge:
                   marca: ['limits-punt/data/full-4.png', x, y, amplada, alçada],
               (x, y) és el cantó de dalt a l'esquerra. Si l'errada ocupa dos
               llocs, una llista de rectangles:  marca: [[...], [...]],
               No s'escriu a mà: obre  tasca.html?tot=1&marca=1  , entra a
               l'exercici, arrossega un rectangle sobre la imatge i copia la
               línia que et dona. Una errada sense `marca` es veu igualment,
               només que sense senyal a la imatge.

   Un exercici sense entrada aquí no mostra res: no cal deixar-hi cap
   llista buida.

   COM S'ESCRIU EL TEXT
     · Sempre entre accents greus i amb TEX al davant:  TEX`...`
       Així el LaTeX s'escriu tal qual, sense doblar cap barra invertida.
     · Les fórmules van entre dòlars, $...$, com en un fitxer .tex.
       Les pinta KaTeX (assets/katex). Hi ha definides \dlim (límit amb el
       subíndex a sota) i \R (els nombres reals), com a defs.tex.
     · Fora dels dòlars és text normal. Només s'hi entenen tres comandes
       d'espai:  \quad   \;   \,
     · Dins del text no hi pot haver cap accent greu ni la parella ${

   ON ES VEU (tasca.html)
     · A la llista de la tasca: una etiqueta vermella al costat del botó
       «Veure solució» («2 errades al solucionari»). Les errades d'enunciat
       hi surten senceres, perquè s'han de saber abans de començar.
     · Dins de l'exercici: una targeta «On diu / Ha de dir» per errada, just
       abans de la imatge, i un requadre vermell numerat sobre la imatge, al
       lloc de l'errada. En tocar el requadre (o «Mostra-ho a la imatge»),
       la imatge s'amplia en aquell punt amb la correcció a sota.

   Les errades surten del projecte d'Overleaf «Errades del solucionari»
   (errors-setmanaN.tex), convertit un sol cop. A partir d'ara s'editen aquí.
   ═══════════════════════════════════════════════════════════════════════ */

/* ── Interruptors ───────────────────────────────────────────────────────
   Són els dos que hi havia a dalt de main.tex. Per encendre'n un, canvia
   false per true. */
const ERRADES_MOTIU = false;   // true: cada errada mostra també el «Motiu»
const ERRADES_OBS   = false;   // true: es veuen també les observacions
const ERRADES_PEGATS = true;   // true: on hi ha «pegat», la imatge es veu ja corregida i l'errada no s'anuncia

const TEX = String.raw;        // no toquis aquesta línia

const ERRADES = {

  /* ── Unitat 1 · Matrius ──────────────────────────────────────────────── */

  'u1/49': [
    { lloc:    TEX`d)`,
      ondiu:   TEX`$BC=\begin{pmatrix}-7 & 3 & 3\\ -1 & -1 & 8\end{pmatrix}$`,
      hadedir: TEX`$BC=\begin{pmatrix}-8 & 3 & 3\\ -4 & -1 & 8\end{pmatrix}$`,
      motiu:   TEX`Els dos elements de la primera columna estan malament: $(-2)\cdot 4+1\cdot 0+1\cdot 0=-8$ i $(-1)\cdot 4+0\cdot 0+3\cdot 0=-4$.`,
      marca:   ['operacions/data/full-3.png', 12.7, 27.3, 15.0, 4.0] },
  ],

  /* ── Unitat 2 · Determinants ─────────────────────────────────────────── */

  'u2/80': [
    { lloc:    TEX`b)`,
      ondiu:   TEX`$\begin{vmatrix}3&-5&1\\4&1&-2\\7&-4&-2\end{vmatrix}=0$`,
      hadedir: TEX`$\begin{vmatrix}3&-5&1\\4&1&-2\\7&-4&-1\end{vmatrix}=0$`,
      motiu:   TEX`La fila que s'ha afegit a la matriu és $(7,-4,-1)$, la suma de les altres dues, i per això el determinant és $0$. Amb $-2$ al final, el determinant valdria $-23$.`,
      marca:   ['rang/data/full-1.png', 71.5, 79.5, 15.9, 5.7] },
  ],

  'u2/95': [
    { enunciat: 1,
      ondiu:   TEX`III) $-\dfrac{1}{2}\begin{pmatrix}4&-3\\-2&2\end{pmatrix}$`,
      hadedir: TEX`III) $-\dfrac{1}{2}\begin{pmatrix}4&-3\\-2&1\end{pmatrix}$`,
      motiu:   TEX`És una errada de l'enunciat. La inversa de $\begin{pmatrix}1&3\\2&4\end{pmatrix}$ és $\dfrac{1}{-2}\begin{pmatrix}4&-3\\-2&1\end{pmatrix}$: l'últim element és $1$. Tal com està impresa, l'opció III) no és la inversa de cap de les tres matrius; la relació b) $\rightarrow$ III) de la solució és la que es volia.`,
      marca:   ['inversa/data/full-1.png', 10.3, 63.5, 16.6, 4.1] },
  ],

  /* ── Unitat 3 · Sistemes d'equacions ─────────────────────────────────── */

  'u3/41': [
    { lloc:    TEX`d)`,
      ondiu:   TEX`$2x-z=2$`,
      hadedir: TEX`$2x+z=2$`,
      motiu:   TEX`La segona fila de la matriu és $(2\;\;0\;\;1)$: el coeficient de $z$ és $1$.`,
      marca:   ['expressa/data/full-3.png', 16.1, 44.1, 11.4, 2.5] },
  ],

  'u3/43': [
    { lloc:    TEX`f)`,
      ondiu:   TEX`$F_3=F_3-2F_1$`,
      hadedir: TEX`$F_3=F_3-2F_2$`,
      motiu:   TEX`L'operació que anul·la la tercera fila, $(0\;\;10\;\;34\mid 2)$, és restar-li el doble de la segona, $(0\;\;5\;\;17\mid 1)$. La matriu que surt a continuació ja és la correcta.`,
      marca:   ['gauss/data/full-2.png', 31.0, 83.2, 12.4, 3.7] },
  ],

  'u3/55': [
    { lloc:    TEX`d)`,
      ondiu:   TEX`$\begin{vmatrix}1&1\\0&-1\end{vmatrix}=1\neq 0$`,
      hadedir: TEX`$\begin{vmatrix}1&1\\0&1\end{vmatrix}=1\neq 0$`,
      motiu:   TEX`El menor es pren de la matriu $A$, i l'element de la segona fila és $1$. Amb $-1$ el determinant valdria $-1$.`,
      marca:   ['rouche/data/full-2.png', 10.8, 32.9, 18.7, 3.9] },
  ],

  'u3/56': [
    { lloc:    TEX`d)`,
      ondiu:   TEX`$\begin{vmatrix}3&2&7\\1&-1&6\\6&-1&-3\end{vmatrix}=110\neq 0$`,
      hadedir: TEX`$\begin{vmatrix}3&2&7\\1&-1&6\\6&-1&3\end{vmatrix}=110\neq 0$`,
      motiu:   TEX`L'última columna és la dels termes independents, $7$, $6$ i $3$. Amb $3$ el determinant val $110$; amb $-3$ valdria $140$.`,
      marca:   ['rouche/data/full-3.png', 12.7, 12.1, 24.6, 5.7] },
  ],

  'u3/60': [
    { lloc:    TEX`a)`,
      ondiu:   TEX`«Si $m\neq 3$, $m\neq -3$ $\rightarrow$ $\mathrm{Rang}(A)=\mathrm{Rang}(A^*)=2<$ nre. d'incògnites $\rightarrow$ Sistema compatible determinat»`,
      hadedir: TEX`«Si $m\neq 3$, $m\neq -3$ $\rightarrow$ $\mathrm{Rang}(A)=\mathrm{Rang}(A^*)=2=$ nre. d'incògnites $\rightarrow$ Sistema compatible determinat»`,
      motiu:   TEX`El sistema té dues incògnites, $x$ i $y$, i el rang és $2$: són iguals, i per això és compatible determinat. Si el rang fos més petit que el nombre d'incògnites, seria indeterminat.`,
      marca:   ['parametre/data/full-2.png', 12.6, 33.0, 29.4, 8.1] },
    { lloc:    TEX`d)`,
      ondiu:   TEX`«Si $m=-4$ $\rightarrow$ $\mathrm{Rang}(A)=1$ $\rightarrow$ $\mathrm{Rang}(A)\neq\mathrm{Rang}(A)=2$»`,
      hadedir: TEX`«Si $m=-4$ $\rightarrow$ $\mathrm{Rang}(A)=1$ $\rightarrow$ $\mathrm{Rang}(A)\neq\mathrm{Rang}(A^*)=2$»`,
      motiu:   TEX`La que té rang $2$ és la matriu ampliada $A^*$; hi falta l'asterisc.`,
      marca:   ['parametre/data/full-3.png', 10.7, 41.2, 26.7, 4.2] },
    { lloc:    TEX`f), cas $m=0$`,
      ondiu:   TEX`$\begin{vmatrix}-1&2\\1&2\end{vmatrix}=-6\neq 0$`,
      hadedir: TEX`$\begin{vmatrix}-1&2\\2&2\end{vmatrix}=-6\neq 0$`,
      motiu:   TEX`El menor surt de les files 2 i 3 de $A$ (columnes 1 i 3), que per a $m=0$ són $(-1\;\;0\;\;2)$ i $(2\;\;0\;\;2)$. Amb un $1$ el determinant valdria $-4$. Al cas $m=3$ la solució l'escriu bé.`,
      marca:   ['parametre/data/full-3.png', 56.7, 26.8, 17.1, 3.9] },
  ],

  'u3/90': [
    { ondiu:   TEX`$F_2=2F_1-F_2$ \; (primera operació)`,
      hadedir: TEX`$F_1=2F_1-F_2$`,
      motiu:   TEX`La fila que canvia és la primera: $2F_1-F_2=(10\;\;10\;\;0\mid 42)$, i les altres dues queden igual.`,
      marca:   ['problemes/data/full-1.png', 25.6, 88.5, 11.7, 2.3] },
  ],

  'u3/100': [
    { ondiu:   TEX`$A=\begin{pmatrix}0&2&3\\4&0&3\\5&2&1\end{pmatrix}$ \; (i el mateix a la matriu $A^*$)`,
      hadedir: TEX`$A=\begin{pmatrix}0&2&3\\4&0&1\\5&2&0\end{pmatrix}$`,
      motiu:   TEX`Les files són els coeficients de $2p_2+3p_3=440$, $4p_1+p_3=240$ i $5p_1+2p_2=360$. Els determinants de Cramer que venen després ja fan servir la matriu correcta.`,
      marca:   ['problemes/data/full-6.png', 10.2, 54.8, 20.1, 11.6] },
  ],

  /* ── Unitat 5 · Rectes i plans en l'espai ────────────────────────────── */

  'u5/46': [
    { ondiu:   TEX`$\dfrac{x-1}{1}=\dfrac{y-2}{2}$ \; (equació implícita)`,
      hadedir: TEX`$\dfrac{x-1}{-1}=\dfrac{y-2}{2}$`,
      motiu:   TEX`El denominador és la primera coordenada del vector director, $-1$. Amb $-1$ surt $2x+y-4=0$, que és el resultat de la solució; amb $1$ sortiria $2x-y=0$.`,
      marca:   ['equacions/data/full-1.png', 54.2, 83.8, 15.6, 4.0] },
  ],

  'u5/49': [
    { lloc:    TEX`a)`,
      ondiu:   TEX`$\dfrac{x=0}{2}=\dfrac{y-3}{5}=\dfrac{z-0}{1}$`,
      hadedir: TEX`$\dfrac{x-0}{2}=\dfrac{y-3}{5}=\dfrac{z-0}{1}$`,
      motiu:   TEX`Al primer numerador hi ha d'haver un signe menys, no un igual.`,
      marca:   ['equacions/data/full-2.png', 77.5, 1.8, 17.6, 3.9] },
    { lloc:    TEX`b)`,
      ondiu:   TEX`$x-2\lambda$; \; $y=\lambda$; \; $z=\lambda$`,
      hadedir: TEX`$x=2\lambda$; \; $y=\lambda$; \; $z=\lambda$`,
      motiu:   TEX`De $x-2y=0$ amb $y=\lambda$ surt $x=2\lambda$.`,
      marca:   ['equacions/data/full-2.png', 70.1, 25.3, 22.2, 4.3] },
  ],

  'u5/56': [
    { ondiu:   TEX`$z=\lambda$; \; $y=\lambda$; \; $z=\lambda$`,
      hadedir: TEX`$x=\lambda$; \; $y=\lambda$; \; $z=\lambda$`,
      motiu:   TEX`La primera equació paramètrica és la de $x$.`,
      marca:   ['equacions/data/full-4.png', 18.3, 7.2, 11.4, 6.4] },
  ],

  'u5/59': [
    { lloc:    TEX`b)`,
      ondiu:   TEX`$-z+6=0 \;\rightarrow\; z=-6 \;\rightarrow\; P_Z(0,0,6)$`,
      hadedir: TEX`$-z+6=0 \;\rightarrow\; z=6 \;\rightarrow\; P_Z(0,0,6)$`,
      motiu:   TEX`De $-z+6=0$ surt $z=6$. El punt $P_Z(0,0,6)$ ja és correcte.`,
      marca:   ['equacions/data/full-4.png', 58.6, 58.3, 33.4, 2.1] },
  ],

  'u5/63': [
    { ondiu:   TEX`$\dfrac{x-4}{2}=\dfrac{y+2}{4}=\dfrac{z-1}{-2}$`,
      hadedir: TEX`$\dfrac{x-4}{-2}=\dfrac{y+2}{4}=\dfrac{z-1}{-2}$`,
      motiu:   TEX`El vector director és $\overrightarrow{AB}=(-2,4,-2)$. A la línia següent, quan s'hi substitueix el punt $C$, la solució ja hi posa $-2$.`,
      marca:   ['equacions/data/full-5.png', 8.3, 57.5, 23.4, 3.8] },
  ],

  'u5/77': [
    { lloc:    TEX`b)`,
      ondiu:   TEX`$M^*=\begin{pmatrix}1&-2&-1&-1\\2&1&5&5\\7&-4&7&7\end{pmatrix}$`,
      hadedir: TEX`$M^*=\begin{pmatrix}1&-2&3&-1\\2&1&-1&5\\7&-4&7&7\end{pmatrix}$`,
      motiu:   TEX`La tercera columna és la dels coeficients de $z$ ($3$, $-1$ i $7$); a la solució hi surt repetida la dels termes independents.`,
      marca:   ['posicions/data/full-4.png', 10.9, 23.5, 26.6, 5.7] },
  ],

  'u5/80': [
    { ondiu:   TEX`«Les rectes són paral·leles quan $m=2$.»`,
      hadedir: TEX`«Les rectes són paral·leles quan $m=-2$.»`,
      motiu:   TEX`És el valor que surt del sistema de la línia anterior. Amb $m=2$ es compleix $m^2=4$, però no $2-m\neq 0$: les dues rectes serien la mateixa. El pla que es calcula després ja fa servir $m=-2$.`,
      marca:   ['posicions/data/full-5.png', 10.3, 21.7, 32.5, 2.1] },
  ],

  /* ── Unitat 6 · Angles i distàncies a l'espai ────────────────────────── */

  'u6/74': [
    { ondiu:   TEX`«c) Trobem la projecció ortogonal del punt sobre la recta.»`,
      hadedir: TEX`«b) Trobem la projecció ortogonal del punt sobre la recta.»`,
      motiu:   TEX`L'exercici només té dos apartats; aquest és el b), el del punt $P(-1,2,13)$.`,
      marca:   ['simetries/data/full-3.png', 8.4, 13.2, 35.2, 3.9] },
  ],

  'u6/86': [
    { lloc:    TEX`b)`,
      ondiu:   TEX`$\vec{n}=(2,-2,1)$`,
      hadedir: TEX`$\vec{n}=(2,-2,-1)$`,
      motiu:   TEX`El coeficient de $z$ del pla $2x-2y-z+1=0$ és $-1$. El mòdul, $3$, i la distància, $1$ u, no canvien.`,
      marca:   ['distancies/data/full-1.png', 56.7, 84.3, 15.2, 2.3] },
  ],

  'u6/88': [
    { lloc:    TEX`equació`,
      ondiu:   TEX`$|\lambda+4|=\sqrt{6}$`,
      hadedir: TEX`$\dfrac{|\lambda+4|}{\sqrt{6}}=\sqrt{6}$`,
      motiu:   TEX`Hi falta el denominador $\sqrt{6}$ de la fórmula de la distància. La línia següent, $|\lambda+4|=6$, ja és correcta.`,
      marca:   ['distancies/data/full-2.png', 10.2, 62.3, 15.1, 2.6] },
    { lloc:    TEX`segon punt`,
      ondiu:   TEX`$\lambda+4=-6 \;\rightarrow\; \lambda=-8 \;\rightarrow\; P(-6,19,-8)$`,
      hadedir: TEX`$\lambda+4=-6 \;\rightarrow\; \lambda=-10 \;\rightarrow\; P(-8,23,-10)$`,
      motiu:   TEX`De $\lambda+4=-6$ surt $\lambda=-10$. El punt $(-6,19,-8)$ és a distància $\tfrac{4}{\sqrt{6}}$ del pla, no a $\sqrt{6}$.`,
      marca:   ['distancies/data/full-2.png', 10.2, 69.3, 38.5, 2.3] },
  ],

  'u6/90': [
    { lloc:    TEX`a)`,
      ondiu:   TEX`$r:\ \dfrac{x}{1}=\dfrac{y+1}{-1}=\dfrac{z+1}{-1}$`,
      hadedir: TEX`$r:\ \dfrac{x}{1}=\dfrac{y+1}{-1}=\dfrac{z-1}{-1}$`,
      motiu:   TEX`La recta passa per $A(0,-1,1)$, on $z=1$. La línia següent, $x=-z+1$, ja és correcta.`,
      marca:   ['distancies/data/full-2.png', 58.6, 31.7, 8.5, 3.8] },
    { lloc:    TEX`b)`,
      ondiu:   TEX`$d(A,\pi)=\dfrac{|3\cdot(-2)+5\cdot 5-2\cdot(-4)+7|} {\sqrt{3^2+5^2+(-2)^2}}=\dfrac{34}{\sqrt{38}}$ u`,
      hadedir: TEX`$d(A,\pi)=\dfrac{|3\cdot(-2)+5\cdot 1-2\cdot(-4)+7|} {\sqrt{3^2+5^2+(-2)^2}}=\dfrac{14}{\sqrt{38}}$ u`,
      motiu:   TEX`La segona coordenada del punt $A(-2,1,-4)$ és $1$, no $5$. La distància és $\tfrac{14}{\sqrt{38}}=\tfrac{7\sqrt{38}}{19}\approx 2{,}27$ u, que és també la distància de $A$ al punt $Q$ que s'ha trobat.`,
      marca:   ['distancies/data/full-3.png', 10.8, 1.8, 33.0, 10.6] },
  ],

  'u6/139': [
    { lloc:    TEX`a)`,
      ondiu:   TEX`$r:\ \dfrac{x-1}{1}=\dfrac{y-2}{2}=\dfrac{z-1}{3}$`,
      hadedir: TEX`$r:\ \dfrac{x-1}{1}=\dfrac{y-2}{1}=\dfrac{z-1}{3}$`,
      motiu:   TEX`El vector director de la recta és el normal del pla, $\vec{n}=(1,1,3)$: el segon denominador és $1$.`,
      marca:   ['problemes-diferents/data/full-2.png', 58.6, 54.8, 27.5, 3.9] },
    { lloc:    TEX`b)`,
      ondiu:   TEX`$Q\left(\tfrac{1}{2},\,1,\,-\tfrac{1}{2}\right)$`,
      hadedir: TEX`$Q\left(\tfrac{5}{11},\,\tfrac{16}{11},\,-\tfrac{7}{11}\right)$`,
      motiu:   TEX`Amb la recta correcta, $(1+t,\;2+t,\;1+3t)$, el pla dona $6+11t=0$, és a dir, $t=-\tfrac{6}{11}$.`,
      marca:   ['problemes-diferents/data/full-2.png', 58.6, 68.1, 15.1, 4.3] },
    { lloc:    TEX`c)`,
      ondiu:   TEX`$d(P,\pi)=\sqrt{\dfrac{7}{2}}$ u`,
      hadedir: TEX`$d(P,\pi)=\dfrac{6}{\sqrt{11}}=\dfrac{6\sqrt{11}}{11}$ u`,
      motiu:   TEX`Amb la fórmula, $d=\dfrac{|1+2+3\cdot 1|}{\sqrt{1+1+9}}= \dfrac{6}{\sqrt{11}}\approx 1{,}81$ u. El valor de la solució és la distància de $P$ a un punt del pla que no és el peu de la perpendicular.`,
      marca:   ['problemes-diferents/data/full-2.png', 58.6, 74.7, 33.6, 4.8] },
  ],

  /* ── Unitat 7 · Límits i continuïtat ─────────────────────────────────── */

  'u7/43': [
    { ondiu:   TEX`$g(2)-4<0$`,
      hadedir: TEX`$g(2)=-4<0$`,
      motiu:   TEX`Hi falta el signe igual: $g(2)=3^{-2+2}-5=1-5=-4$. El teorema de Bolzano necessita que $g$ tingui signes diferents als extrems de l'interval, i els té: $g(0)=4>0$ i $g(2)=-4<0$.`,
      pegat:   ['practica/data/full-4.png', 34.685, 26.513, 8.858, 1.513, '43-1a.png'],
      marca:   ['practica/data/full-4.png', 30.0, 26.3, 12.5, 2.2] },
  ],

  'u7/76': [
    { lloc:    TEX`f)`,
      ondiu:   TEX`$=\dlim_{x\to 3}\dfrac{(3-x)(3+x)}{(x-3)(x+2)} =\dlim_{x\to 3}\dfrac{3-x}{x+2}=0$`,
      hadedir: TEX`$=\dlim_{x\to 3}\dfrac{(3-x)(3+x)}{(x-3)(x+2)} =\dlim_{x\to 3}\dfrac{-(3+x)}{x+2}=-\dfrac{6}{5}$`,
      motiu:   TEX`Els factors que se simplifiquen són $3-x$ i $x-3$, que són oposats: $\dfrac{3-x}{x-3}=-1$. Queda $-\dfrac{3+x}{x+2}$, que en $x=3$ val $-\dfrac{6}{5}$.`,
      pegat:   ['limits-punt/data/full-4.png', 83.278, 64.709, 10.348, 3.692, '76-1a.png'],
      marca:   ['limits-punt/data/full-4.png', 58.9, 64.5, 34.7, 4.3] },
  ],

  'u7/92': [
    { lloc:    TEX`b)`,
      ondiu:   TEX`$\dlim_{x\to 0^-} f(x)=\dlim_{x\to 0^+} f(x)=0{,}5$ \quad i \quad $f(2)=2{,}5$`,
      hadedir: TEX`$\dlim_{x\to 0^-} f(x)=\dlim_{x\to 0^+} f(x)=1$ \quad i \quad $f(2)=5$`,
      motiu:   TEX`A la gràfica de l'enunciat cada quadre és una unitat (a l'eix $Y$, el $2$ és a la segona marca): el punt buit és a alçada $1$ i la corba passa pel punt $(2,5)$. És la mateixa paràbola de l'apartat d), on el solucionari sí que llegeix $f(-1)=2$ i límit $5$ en $x=2$. La conclusió no canvia: discontinuïtat evitable en $x=0$ i funció contínua en $x=2$.`,
      pegat:   [['continuitat/data/full-2.png', 82.202, 7.446, 5.546, 1.695, '92-1a.png'], ['continuitat/data/full-2.png', 81.788, 9.927, 3.394, 1.695, '92-1b.png'], ['continuitat/data/full-2.png', 67.715, 16.404, 12.169, 2.361, '92-1c.png']],
      marca:   [['continuitat/data/full-2.png', 61.9, 7.1, 23.6, 2.8], ['continuitat/data/full-2.png', 61.9, 16.2, 9.1, 2.2]] },
    { lloc:    TEX`e)`,
      ondiu:   TEX`«La funció no és contínua en $x=-2$; té una discontinuïtat de salt finit.»`,
      hadedir: TEX`«La funció no és contínua en $x=2$; té una discontinuïtat de salt finit.»`,
      motiu:   TEX`És la frase que tanca l'estudi del punt $x=2$, on $f(2)=3$ i els límits laterals valen $-1$ i $3$. El punt $x=-2$ ja s'ha estudiat abans, i hi ha un salt infinit.`,
      pegat:   ['continuitat/data/full-2.png', 66.142, 78.632, 21.689, 1.755, '92-2a.png'],
      marca:   ['continuitat/data/full-2.png', 61.8, 76.5, 26.4, 5.8] },
  ],

  'u7/93': [
    { lloc:    TEX`c)`,
      ondiu:   TEX`contínua en el seu domini, $(-\infty,-2)\cup(2,+\infty)$`,
      hadedir: TEX`contínua en el seu domini, $(-\infty,-2]\cup[2,+\infty)$`,
      motiu:   TEX`La condició és $x^2-4\geq 0$, que també es compleix en $x=-2$ i en $x=2$: allà la funció existeix i val $\sqrt{0}=0$. La mateixa solució ho escriu bé just abans ($x\geq 2$, $x\leq -2$).`,
      pegat:   ['continuitat/data/full-3.png', 29.47, 74.697, 10.017, 1.755, '93-1a.png'],
      marca:   ['continuitat/data/full-3.png', 21.0, 74.5, 19.1, 2.1] },
    { lloc:    TEX`g)`,
      ondiu:   TEX`$\dlim_{x\to 1} 2\,|x-1| = 0 = y(0)$`,
      hadedir: TEX`$\dlim_{x\to 1} 2\,|x-1| = 0 = y(1)$`,
      motiu:   TEX`El punt que s'estudia és $x=1$, i $y(1)=2\,|1-1|=0$. En canvi, $y(0)=2$.`,
      pegat:   ['continuitat/data/full-3.png', 80.464, 23.426, 1.987, 1.634, '93-2a.png'],
      marca:   ['continuitat/data/full-3.png', 60.8, 22.9, 21.9, 3.1] },
  ],

  'u7/94': [
    { lloc:    TEX`b)`,
      ondiu:   TEX`$x^2-2x=3\neq 0$ per a qualsevol $x$ real`,
      hadedir: TEX`$x^2-2x+3\neq 0$ per a qualsevol $x$ real`,
      motiu:   TEX`El denominador és $x^2-2x+3$, i no s'anul·la mai perquè el discriminant és negatiu: $(-2)^2-4\cdot 1\cdot 3=-8<0$. Per això la funció és contínua en tot $\R$.`,
      pegat:   ['continuitat/data/full-4.png', 18.626, 31.961, 28.311, 1.755, '94-1a.png'],
      marca:   ['continuitat/data/full-4.png', 11.2, 31.7, 33.0, 2.2] },
    { lloc:    TEX`e), punt $x=-3$`,
      ondiu:   TEX`«No existeix $\dlim_{x\to 3} f(x)$.»`,
      hadedir: TEX`«No existeix $\dlim_{x\to -3} f(x)$.»`,
      motiu:   TEX`Els dos límits laterals que s'acaben de calcular són els del punt $x=-3$.`,
      pegat:   ['continuitat/data/full-4.png', 39.487, 92.373, 4.387, 1.09, '94-2a.png'],
      marca:   ['continuitat/data/full-4.png', 30.1, 90.9, 16.7, 2.8] },
    { lloc:    TEX`e), punt $x=1$`,
      ondiu:   TEX`«La funció té una discontinuïtat evitable en $x=3$.»`,
      hadedir: TEX`«La funció té una discontinuïtat evitable en $x=1$.»`,
      motiu:   TEX`El límit que s'ha calculat és el de $x\to 1$ (val $\tfrac{1}{8}$), i $x=1$ és el zero del denominador que se simplifica. En $x=3$ la funció és contínua.`,
      pegat:   ['continuitat/data/full-4.png', 65.646, 15.981, 1.49, 1.513, '94-3a.png'],
      marca:   ['continuitat/data/full-4.png', 58.9, 13.7, 33.7, 3.9] },
  ],

  'u7/102': [
    { ondiu:   TEX`$\dlim_{x\to -1^-} f(x)=5$`,
      hadedir: TEX`$\dlim_{x\to -1^-} f(x)=-5$`,
      motiu:   TEX`Per a $x<-1$ la funció és $3x-2$, i $3\cdot(-1)-2=-5$. La conclusió no canvia: els límits laterals ($-5$ i $-4$) són diferents i en $x=-1$ hi ha una discontinuïtat de salt finit.`,
      pegat:   ['continuitat/data/full-6.png', 69.371, 36.864, 3.56, 1.453, '102-1a.png'],
      marca:   ['continuitat/data/full-6.png', 58.1, 36.6, 12.9, 2.8] },
  ],

  /* ── Unitat 8 · Derivades ────────────────────────────────────────────── */

  'u8/58': [
    { ondiu:   TEX`«Els punts de tall de la funció amb els eixos són:»`,
      hadedir: TEX`«Els punts de tall de la recta tangent amb els eixos són:»`,
      motiu:   TEX`Els punts que es calculen a continuació, $(0,7)$ i $\left(\tfrac{7}{2},0\right)$, són els talls de la recta tangent $y=-2x+7$, que és la que forma el triangle amb els eixos. La funció $f$ talla els eixos en uns altres punts: $(0,-1)$ i $(-1,0)$.`,
      pegat:   ['interpretacio-geometrica/data/full-5.png', 27.228, 42.469, 16.089, 1.914, '58-1a.png'],
      marca:   ['interpretacio-geometrica/data/full-5.png', 8.6, 42.3, 28.9, 4.0] },
  ],

  /* ── Unitat 9 · Aplicacions de les derivades ─────────────────────────── */

  'u9/41': [
    { ondiu:   TEX`«A $x=$, $f'(x)$ passa de positiva a negativa; per tant, és un màxim.»`,
      hadedir: TEX`«A $x=2$, $f'(x)$ passa de positiva a negativa; per tant, és un màxim.»`,
      motiu:   TEX`Hi falta el valor de $x$. És l'últim dels quatre punts on la derivada val $0$ ($x=-4$, $x=-2$, $x=0$ i $x=2$), i a la gràfica $f'$ hi passa de positiva a negativa.`,
      pegat:   ['creixement/data/full-2.png', 20.323, 87.988, 22.097, 1.829, '41-1a.png'],
      marca:   ['creixement/data/full-2.png', 13.0, 87.8, 29.4, 4.1] },
  ],

  'u9/42': [
    { lloc:    TEX`d), valor de $y'(2)$`,
      ondiu:   TEX`$y'(2)=80-60-20>0$`,
      hadedir: TEX`$y'(2)=80-60=20>0$`,
      motiu:   TEX`$y'(2)=5\cdot 2^4-15\cdot 2^2=80-60=20$. Tal com està imprès, $80-60-20$ valdria $0$.`,
      pegat:   ['creixement/data/full-3.png', 26.532, 21.037, 8.468, 1.524, '42-1a.png'],
      marca:   ['creixement/data/full-3.png', 12.3, 20.9, 22.8, 2.1] },
    { lloc:    TEX`d), extrems relatius`,
      ondiu:   TEX`«Té màxims relatius a $x=-\sqrt{3}$, $x=\sqrt{3}$.»`,
      hadedir: TEX`«Té un màxim relatiu a $x=-\sqrt{3}$ i un mínim relatiu a $x=\sqrt{3}$.»`,
      motiu:   TEX`A $x=-\sqrt{3}$ la funció passa de créixer a decréixer (màxim), però a $x=\sqrt{3}$ passa de decréixer a créixer: hi ha un mínim. A $x=0$ la derivada també s'anul·la, però no canvia de signe i no hi ha extrem.`,
      pegat:   ['creixement/data/full-3.png', 15.0, 32.073, 30.403, 3.72, '42-2a.png'],
      marca:   ['creixement/data/full-3.png', 12.3, 31.9, 17.8, 4.0] },
  ],

  'u9/51': [
    { ondiu:   TEX`«El signe de $y$ és constant.»`,
      hadedir: TEX`«El signe de $y'$ és constant.»`,
      motiu:   TEX`La que no s'anul·la mai i és contínua és la derivada $y'(x)=3x^2-4x+6$, i per això té signe constant (positiu, perquè $y'(0)=6>0$). La funció $y$ sí que canvia de signe: per exemple, $y(0)=-13$ i $y(3)=14$.`,
      pegat:   ['creixement/data/full-7.png', 42.339, 59.085, 3.79, 1.585, '51-1a.png'],
      marca:   [['creixement/data/full-7.png', 27.7, 58.9, 17.8, 2.2], ['creixement/data/full-7.png', 9.7, 61.0, 8.6, 1.8]] },
  ],

  'u9/58': [
    { lloc:    TEX`b)`,
      ondiu:   TEX`$y'(x)=0 \;\rightarrow\; a=\pm 2$`,
      hadedir: TEX`$y'(x)=0 \;\rightarrow\; x=\pm 2$`,
      motiu:   TEX`El que es resol és $3x^2-12=0$, i la incògnita és $x$. El paràmetre $a$ ja s'ha trobat a l'apartat a) i val $-12$.`,
      pegat:   ['creixement/data/full-8.png', 71.774, 63.476, 7.258, 1.524, '58-1a.png'],
      marca:   ['creixement/data/full-8.png', 60.5, 63.3, 18.9, 2.1] },
  ],

  'u9/67': [
    { lloc:    TEX`d)`,
      ondiu:   TEX`$y''=-\dfrac{6}{x^2}$`,
      hadedir: TEX`$y''=-\dfrac{6}{x^4}$`,
      motiu:   TEX`Com que $y'=\dfrac{x^3+2}{x^3}=1+2x^{-3}$, la derivada segona és $y''=-6x^{-4}$. La conclusió no canvia: $y''<0$ per a tot $x\neq 0$ i la funció és còncava a $(-\infty,0)$ i a $(0,+\infty)$.`,
      pegat:   ['concavitat/data/full-2.png', 22.984, 69.695, 2.016, 1.402, '67-1a.png'],
      marca:   ['concavitat/data/full-2.png', 12.6, 68.0, 12.7, 3.9] },
    { lloc:    TEX`f)`,
      ondiu:   TEX`«$y''>0$ a $(-\infty,-2)$ i a $(2,+\infty)$ $\rightarrow$ $y$ és convexa a $(-\infty,-2)$ i a $(2,+\infty)$.»`,
      hadedir: TEX`Aquestes dues línies sobren.`,
      motiu:   TEX`El domini de la funció és $[-2,2]$, com diu la mateixa solució: fora d'aquest interval la funció no existeix i no té sentit parlar-ne de la curvatura. La resposta és només que $y$ és còncava a $(-2,2)$.`,
      pegat:   ['concavitat/data/full-2.png', 58.871, 15.61, 29.435, 5.671, '67-2a.png'],
      marca:   ['concavitat/data/full-2.png', 58.5, 15.4, 30.1, 6.0] },
    { lloc:    TEX`h)`,
      ondiu:   TEX`$y''(x)=\dfrac{2(x^2-x)-(2x-1)^2}{(x^2-x)}$`,
      hadedir: TEX`$y''(x)=\dfrac{2(x^2-x)-(2x-1)^2}{(x^2-x)^2}$`,
      motiu:   TEX`En derivar el quocient, el denominador queda elevat al quadrat. El pas següent de la solució ja el porta bé, perquè $x^2(x-1)^2=(x^2-x)^2$.`,
      pegat:   ['concavitat/data/full-2.png', 80.887, 45.366, 1.129, 1.037, '67-3a.png'],
      marca:   ['concavitat/data/full-2.png', 59.0, 43.2, 31.0, 4.2] },
    { lloc:    TEX`n)`,
      ondiu:   TEX`$y''(x)>0$ a $\left(-\tfrac{\pi}{4},\tfrac{\pi}{4}\right)$ i a $\left(\tfrac{\pi}{4},\tfrac{\pi}{2}\right)$;\quad $y''(x)<0$ a $\left(-\tfrac{\pi}{2},-\tfrac{\pi}{4}\right)$`,
      hadedir: TEX`$y''(x)>0$ a $\left(-\tfrac{\pi}{4},\tfrac{\pi}{4}\right)$;\quad $y''(x)<0$ a $\left(-\tfrac{\pi}{2},-\tfrac{\pi}{4}\right)$ i a $\left(\tfrac{\pi}{4},\tfrac{\pi}{2}\right)$`,
      motiu:   TEX`$y''=2\cos 2x$. A l'interval $\left(\tfrac{\pi}{4},\tfrac{\pi}{2}\right)$ l'angle $2x$ és entre $\tfrac{\pi}{2}$ i $\pi$, on el cosinus és negatiu. Per tant, la funció és convexa a $\left(-\tfrac{\pi}{4},\tfrac{\pi}{4}\right)$ i còncava als altres dos intervals.`,
      marca:   ['concavitat/data/full-3.png', 14.2, 83.5, 31.4, 12.5] },
  ],

  /* ── Unitat 10 · Representació de funcions ───────────────────────────── */

  'u10/37': [
    { ondiu:   TEX`«$f'(x)>0$ en $(-\infty,-2)\cup(2,6)$» \; i \; «$f'(x)<0$ en $(-2,2)\cup(6,+\infty)$»`,
      hadedir: TEX`«$f'(x)>0$ en $(-\infty,x_1)\cup(x_2,x_3)$» \; i \; «$f'(x)<0$ en $(x_1,x_2)\cup(x_3,+\infty)$»`,
      motiu:   TEX`El signe de $f'$ canvia als punts on la gràfica talla l'eix $X$, que l'enunciat anomena $x_1$, $x_2$ i $x_3$ i que la mateixa solució fa servir a la línia següent. A la gràfica, $x_1$ és entre $-2$ i $-1$ i $x_3$ entre $5$ i $6$: no són $-2$ ni $6$.`,
      pegat:   [['practica/data/full-2.png', 23.553, 87.925, 13.023, 1.699, '37-1a.png'], ['practica/data/full-2.png', 18.891, 92.233, 17.363, 1.76, '37-1b.png']],
      marca:   [['practica/data/full-2.png', 8.4, 87.7, 28.1, 2.1], ['practica/data/full-2.png', 8.4, 92.0, 28.1, 2.1]] },
  ],

  'u10/38': [
    { enunciat: 1,
      ondiu:   TEX`«Creixement: $(-\infty,0)\cup(2\;-\infty)$.»`,
      hadedir: TEX`«Creixement: $(-\infty,0)\cup(2,+\infty)$.»`,
      motiu:   TEX`És una errada de l'enunciat. La funció creix abans del màxim $(0,0)$ i després del mínim $(2,4)$, com es veu a la gràfica de la solució.`,
      pegat:   ['practica/data/full-2.png', 79.019, 26.76, 6.19, 1.699, '38-1a.png'],
      marca:   ['practica/data/full-2.png', 54.6, 26.5, 30.1, 2.1] },
  ],

  'u10/41': [
    { ondiu:   TEX`«$f'(x)=\dfrac{-x^2-1}{(x^2-1)^2}<0 \;\rightarrow\; f(x)$ creixent»`,
      hadedir: TEX`«$f'(x)=\dfrac{-x^2-1}{(x^2-1)^2}<0 \;\rightarrow\; f(x)$ decreixent»`,
      motiu:   TEX`Si la derivada és negativa, la funció decreix. És el que es veu a la gràfica de la mateixa solució, on les tres branques baixen.`,
      pegat:   ['practica/data/full-4.png', 34.968, 49.211, 9.084, 1.578, '41-1a.png'],
      marca:   ['practica/data/full-4.png', 10.3, 48.0, 32.0, 4.2] },
  ],

  'u10/45': [
    { lloc:    TEX`b)`,
      ondiu:   TEX`$\mathrm{Dom}\,f=\R-\{3\}$`,
      hadedir: TEX`$\mathrm{Dom}\,f=\R-\{-3\}$`,
      motiu:   TEX`El denominador és $x+3$, que s'anul·la en $x=-3$.`,
      pegat:   ['domini-recorregut/data/full-1.png', 73.071, 46.177, 4.019, 1.76, '45-1a.png'],
      marca:   ['domini-recorregut/data/full-1.png', 57.7, 46.0, 17.6, 2.1] },
  ],

  'u10/62': [
    { lloc:    TEX`c)`,
      ondiu:   TEX`$\dlim_{x\to-\infty}\,(x^4+2x^3-2x-1)=-\infty$`,
      hadedir: TEX`$\dlim_{x\to-\infty}\,(x^4+2x^3-2x-1)=+\infty$`,
      motiu:   TEX`El terme dominant és $x^4$, que és positiu tant si $x\to-\infty$ com si $x\to+\infty$.`,
      pegat:   ['asimptotes/data/full-2.png', 37.379, 32.16, 4.421, 1.456, '62-1a.png'],
      marca:   ['asimptotes/data/full-2.png', 11.6, 31.8, 29.9, 2.8] },
    { lloc:    TEX`d)`,
      ondiu:   TEX`$\dlim_{x\to+\infty}\,(-2x^4+3x^2-x-1)=+\infty$`,
      hadedir: TEX`$\dlim_{x\to+\infty}\,(-2x^4+3x^2-x-1)=-\infty$`,
      motiu:   TEX`El terme dominant és $-2x^4$, que tendeix a $-\infty$ tant si $x\to-\infty$ com si $x\to+\infty$.`,
      pegat:   ['asimptotes/data/full-2.png', 39.309, 39.745, 3.859, 1.456, '62-2a.png'],
      marca:   ['asimptotes/data/full-2.png', 14.1, 39.4, 29.2, 2.7] },
  ],

  'u10/63': [
    { lloc:    TEX`c)`,
      ondiu:   TEX`$\dlim_{x\to-\infty}\dfrac{2x}{x+1}=2$ \; i \; $\dlim_{x\to+\infty}\dfrac{2x}{x+1}=2$`,
      hadedir: TEX`$\dlim_{x\to-\infty}\dfrac{4x^2}{x^2-9}=4$ \; i \; $\dlim_{x\to+\infty}\dfrac{4x^2}{x^2-9}=4$`,
      motiu:   TEX`Els límits que hi ha impresos són d'una altra funció. Amb la de l'apartat, $y=\dfrac{4x^2}{x^2-9}$, el límit és $4$, que és el que dona l'asímptota horitzontal $y=4$ de la mateixa solució.`,
      marca:   ['asimptotes/data/full-2.png', 60.3, 34.8, 18.0, 7.7] },
  ],

  'u10/75': [
    { lloc:    TEX`a), signe de la derivada`,
      ondiu:   TEX`«En $(-5,1)$, $y'>0$ $\rightarrow$ Funció decreixent»`,
      hadedir: TEX`«En $(-5,1)$, $y'<0$ $\rightarrow$ Funció decreixent»`,
      motiu:   TEX`Entre les dues arrels la derivada és negativa: per exemple, $y'(0)=-15$.`,
      pegat:   ['creixement/data/full-1.png', 24.196, 71.056, 5.707, 1.396, '75-1a.png'],
      marca:   ['creixement/data/full-1.png', 12.3, 70.8, 18.3, 3.8] },
    { lloc:    TEX`a), màxim`,
      ondiu:   TEX`$x=-5 \;\rightarrow\; y=203 \;\rightarrow\; (-5,203)$ màxim`,
      hadedir: TEX`$x=-5 \;\rightarrow\; y=103 \;\rightarrow\; (-5,103)$ màxim`,
      motiu:   TEX`$y(-5)=(-5)^3+6\cdot(-5)^2-15\cdot(-5)+3=-125+150+75+3=103$.`,
      pegat:   ['creixement/data/full-1.png', 25.804, 75.425, 19.534, 1.517, '75-2a.png'],
      marca:   ['creixement/data/full-1.png', 12.1, 75.2, 33.8, 2.2] },
    { lloc:    TEX`b)`,
      ondiu:   TEX`$x=-\tfrac{1}{2} \rightarrow y=-6 \rightarrow \left(-\tfrac{1}{2},-6\right)$ màxim;\quad $x=-\tfrac{1}{2} \rightarrow y=6 \rightarrow \left(-\tfrac{1}{2},6\right)$ mínim`,
      hadedir: TEX`$x=-\tfrac{1}{2} \rightarrow y=-4 \rightarrow \left(-\tfrac{1}{2},-4\right)$ màxim;\quad $x=\tfrac{1}{2} \rightarrow y=4 \rightarrow \left(\tfrac{1}{2},4\right)$ mínim`,
      motiu:   TEX`El numerador val $4\cdot\tfrac{1}{4}+1=2$ en tots dos punts, i $2:\tfrac{1}{2}=4$. Per tant, $y\left(\tfrac{1}{2}\right)=4$ i $y\left(-\tfrac{1}{2}\right)=-4$. A més, el mínim és a $x=\tfrac{1}{2}$, no a $x=-\tfrac{1}{2}$.`,
      pegat:   [['creixement/data/full-1.png', 89.068, 6.25, 3.778, 1.456, '75-3a.png'], ['creixement/data/full-1.png', 68.248, 12.439, 8.521, 2.791, '75-3b.png'], ['creixement/data/full-1.png', 62.46, 15.959, 27.412, 8.192, '75-3c.png'], ['creixement/data/full-1.png', 61.897, 24.575, 12.54, 4.005, '75-3d.png']],
      marca:   ['creixement/data/full-1.png', 58.4, 2.4, 35.0, 26.3] },
    { lloc:    TEX`d)`,
      ondiu:   TEX`«$y'=4x^3-72x^2=0 \rightarrow x=0$. En $\R-\{0\}$, $y'<0$ $\rightarrow$ Funció decreixent»`,
      hadedir: TEX`«$y'=4x^3-72x^2=0 \rightarrow x=0$, $x=18$. En $(-\infty,0)\cup(0,18)$, $y'<0$ $\rightarrow$ Funció decreixent. En $(18,+\infty)$, $y'>0$ $\rightarrow$ Funció creixent. $x=18 \rightarrow y=-34\,992 \rightarrow (18,-34\,992)$ mínim»`,
      motiu:   TEX`$y'=4x^2(x-18)$ també s'anul·la en $x=18$, i allà passa de negativa a positiva. En $x=0$ la derivada val $0$ però no canvia de signe: no hi ha extrem.`,
      marca:   ['creixement/data/full-1.png', 58.4, 47.1, 27.1, 6.6] },
  ],

  'u10/78': [
    { lloc:    TEX`b), domini`,
      ondiu:   TEX`$\mathrm{Dom}=\R$`,
      hadedir: TEX`$\mathrm{Dom}=\R-\{-2\}$`,
      motiu:   TEX`El denominador $x+2$ s'anul·la en $x=-2$.`,
      pegat:   ['concavitat/data/full-1.png', 21.383, 54.248, 6.27, 1.699, '78-1a.png'],
      marca:   ['concavitat/data/full-1.png', 9.7, 54.1, 11.7, 1.9] },
    { lloc:    TEX`b), interval`,
      ondiu:   TEX`«En $(-\infty,2)$, $y''>0$ $\rightarrow$ Funció convexa»`,
      hadedir: TEX`«En $(-\infty,-2)$, $y''>0$ $\rightarrow$ Funció convexa»`,
      motiu:   TEX`$y''=\dfrac{-8}{(x+2)^3}$ canvia de signe en $x=-2$: és positiva per a $x<-2$ i negativa per a $x>-2$.`,
      pegat:   ['concavitat/data/full-1.png', 20.338, 66.505, 12.621, 1.76, '78-2a.png'],
      marca:   ['concavitat/data/full-1.png', 12.3, 66.3, 19.1, 3.7] },
    { lloc:    TEX`d), derivada segona`,
      ondiu:   TEX`$y''=\dfrac{12x^2+4x}{(x^2-1)^3}\neq 0$`,
      hadedir: TEX`$y''=\dfrac{12x^2+4}{(x^2-1)^3}\neq 0$`,
      motiu:   TEX`El numerador és $12x^2+4$, que no s'anul·la mai. Amb $4x$ s'anul·laria en $x=0$, i la solució no podria dir que $y''\neq 0$.`,
      pegat:   ['concavitat/data/full-1.png', 64.148, 45.085, 8.682, 2.124, '78-3a.png'],
      marca:   ['concavitat/data/full-1.png', 58.4, 45.4, 21.7, 4.2] },
    { lloc:    TEX`d), interval`,
      ondiu:   TEX`«En $(1,1)$, $y''<0$ $\rightarrow$ Funció còncava»`,
      hadedir: TEX`«En $(-1,1)$, $y''<0$ $\rightarrow$ Funció còncava»`,
      motiu:   TEX`Entre $-1$ i $1$ el denominador $(x^2-1)^3$ és negatiu i el numerador és positiu.`,
      pegat:   ['concavitat/data/full-1.png', 61.897, 56.493, 28.055, 1.82, '78-4a.png'],
      marca:   ['concavitat/data/full-1.png', 58.5, 56.3, 29.8, 2.2] },
  ],

  'u10/84': [
    { lloc:    TEX`d)`,
      ondiu:   TEX`$f\left(\tfrac{2}{3}\right)=\dfrac{26}{27} \;\rightarrow\; \left(\tfrac{2}{3},\tfrac{26}{27}\right)$ punt d'inflexió`,
      hadedir: TEX`$f\left(\tfrac{2}{3}\right)=\dfrac{20}{27} \;\rightarrow\; \left(\tfrac{2}{3},\tfrac{20}{27}\right)$ punt d'inflexió`,
      motiu:   TEX`$f\left(\tfrac{2}{3}\right)=\tfrac{8}{27}-\tfrac{24}{27}-\tfrac{18}{27} +\tfrac{54}{27}=\tfrac{20}{27}$.`,
      pegat:   [['representacio/data/full-3.png', 73.633, 47.451, 1.447, 1.517, '84-1a.png'], ['representacio/data/full-3.png', 69.775, 51.456, 1.447, 1.517, '84-1b.png']],
      marca:   ['representacio/data/full-3.png', 50.3, 47.1, 34.8, 8.3] },
    { lloc:    TEX`g)`,
      ondiu:   TEX`«$f''(x)=-2>0$ \; $\forall x\in\R$»`,
      hadedir: TEX`«$f''(x)=-2<0$ \; $\forall x\in\R$»`,
      motiu:   TEX`$-2$ és negatiu, i per això la funció és còncava, com diu la mateixa solució.`,
      pegat:   ['representacio/data/full-5.png', 26.608, 12.257, 14.228, 1.638, '84-2a.png'],
      marca:   ['representacio/data/full-5.png', 15.9, 12.1, 25.2, 2.1] },
  ],

  'u10/100': [
    { lloc:    TEX`a)`,
      ondiu:   TEX`$y''=\dfrac{-1}{2(2-x)\sqrt{2-x}}<0$`,
      hadedir: TEX`$y''=\dfrac{-1}{4(2-x)\sqrt{2-x}}<0$`,
      motiu:   TEX`De $y'=-\tfrac{1}{2}(2-x)^{-1/2}$ surt $y''=-\tfrac{1}{4}(2-x)^{-3/2}$. La conclusió (funció còncava) no canvia.`,
      pegat:   ['altres-funcions/data/full-1.png', 19.855, 79.369, 13.666, 1.456, '100-1a.png'],
      marca:   ['altres-funcions/data/full-1.png', 14.0, 77.0, 26.9, 4.2] },
    { lloc:    TEX`c), límit`,
      ondiu:   TEX`$\dlim_{x\to-\infty}\dfrac{\sqrt{x^2-9}}{x}=1 \;\rightarrow\; m=-1$`,
      hadedir: TEX`$\dlim_{x\to-\infty}\dfrac{\sqrt{x^2-9}}{x}=-1 \;\rightarrow\; m=-1$`,
      motiu:   TEX`Quan $x\to-\infty$, el numerador és positiu i el denominador negatiu: el límit és $-1$, que és el pendent $m$ que la solució fa servir.`,
      pegat:   ['altres-funcions/data/full-2.png', 31.511, 25.789, 13.344, 1.396, '100-2a.png'],
      marca:   ['altres-funcions/data/full-2.png', 15.9, 24.0, 27.5, 4.4] },
    { lloc:    TEX`c), títol`,
      ondiu:   TEX`«Creixement i decreixement:» (a sobre de la derivada segona)`,
      hadedir: TEX`«Concavitat i convexitat:»`,
      motiu:   TEX`El títol «Creixement i decreixement» hi surt dues vegades. La segona, la que porta $y''$, és l'estudi de la curvatura.`,
      pegat:   ['altres-funcions/data/full-2.png', 16.399, 66.201, 22.91, 1.638, '100-3a.png'],
      marca:   ['altres-funcions/data/full-2.png', 14.1, 66.0, 25.6, 1.9] },
    { lloc:    TEX`d)`,
      ondiu:   TEX`$y''=\dfrac{-1}{4(x+3)\sqrt{x+3}}>0$`,
      hadedir: TEX`$y''=\dfrac{1}{4(x+3)\sqrt{x+3}}>0$`,
      motiu:   TEX`De $y'=-\tfrac{1}{2}(x+3)^{-1/2}$ surt $y''=\tfrac{1}{4}(x+3)^{-3/2}$, que és positiva. La conclusió (funció convexa) és correcta.`,
      pegat:   ['altres-funcions/data/full-2.png', 73.312, 46.42, 3.135, 1.396, '100-4a.png'],
      marca:   ['altres-funcions/data/full-2.png', 62.1, 46.2, 26.9, 4.2] },
  ],

  'u10/108': [
    { lloc:    TEX`b)`,
      ondiu:   TEX`«Eix $Y$: $f(0)=0 \;\rightarrow\; (0,6)$»`,
      hadedir: TEX`«Eix $Y$: $f(0)=6 \;\rightarrow\; (0,6)$»`,
      motiu:   TEX`Per a $x>-2$ la funció és $6-x^2$, i $f(0)=6$. El punt $(0,6)$ ja és correcte.`,
      pegat:   ['trossos/data/full-2.png', 26.768, 22.694, 8.682, 1.578, '108-1a.png'],
      marca:   ['trossos/data/full-2.png', 16.0, 22.5, 19.8, 2.1] },
    { lloc:    TEX`c), continuïtat`,
      ondiu:   TEX`$\dlim_{x\to-2^-}f(x)=\dlim_{x\to 2^-}(x^3-1)=7$`,
      hadedir: TEX`$\dlim_{x\to 2^-}f(x)=\dlim_{x\to 2^-}(x^3-1)=7$`,
      motiu:   TEX`El punt que s'estudia és $x=2$, on canvia l'expressió de la funció.`,
      pegat:   ['trossos/data/full-2.png', 62.379, 6.493, 4.662, 1.032, '108-2a.png'],
      marca:   ['trossos/data/full-2.png', 62.1, 4.9, 26.5, 2.8] },
    { lloc:    TEX`c), derivada segona`,
      ondiu:   TEX`$\dfrac{14}{(x-1)^3}$ \; si \; $x<2$`,
      hadedir: TEX`$\dfrac{14}{(x-1)^3}$ \; si \; $x>2$`,
      motiu:   TEX`És la derivada segona del tercer tros, $\dfrac{7}{x-1}$, que és el de $x>2$.`,
      pegat:   ['trossos/data/full-2.png', 84.486, 93.507, 3.778, 1.517, '108-3a.png'],
      marca:   ['trossos/data/full-2.png', 68.7, 92.3, 19.8, 4.2] },
    { lloc:    TEX`d)`,
      ondiu:   TEX`«$2-3\cos x=0 \;\rightarrow\; x=\arccos\left(\tfrac{2}{3}\right) \;\rightarrow\; \left(\arccos\left(\tfrac{2}{3}\right),0\right)$»`,
      hadedir: TEX`«$2-3\cos x=0 \;\rightarrow\; x=\pm\arccos\left(\tfrac{2}{3}\right)+2k\pi$, amb $x\leq 0$. El tall més proper a l'origen és $\left(-\arccos\left(\tfrac{2}{3}\right),0\right)$»`,
      motiu:   TEX`El tros $2-3\cos x$ només val per a $x\leq 0$, i $\arccos\left(\tfrac{2}{3}\right)\approx 0{,}84$ és positiu: allà la funció és $2^{-x+1}-3$ i no val $0$. Els talls amb l'eix $X$ són tots a l'esquerra de l'origen i n'hi ha infinits, com es veu a la gràfica de la solució.`,
      marca:   ['trossos/data/full-3.png', 14.0, 53.6, 27.1, 10.6] },
  ],

  /* ── Unitat 11 · Integrals ───────────────────────────────────────────── */

  'u11/52': [
    { lloc:    TEX`g)`,
      ondiu:   TEX`$\displaystyle\int (x-1)^3\,dx=\dfrac{(x-1)^3}{4}+k$`,
      hadedir: TEX`$\displaystyle\int (x-1)^3\,dx=\dfrac{(x-1)^4}{4}+k$`,
      motiu:   TEX`En integrar una potència, l'exponent augmenta una unitat.`,
      marca:   ['funcions-elementals/data/full-2.png', 12.2, 64.5, 28.3, 4.3] },
  ],

  'u11/54': [
    { lloc:    TEX`a)`,
      ondiu:   TEX`$\displaystyle\int\dfrac{4}{x-2}\,dx=4\ln|x+2|+k$`,
      hadedir: TEX`$\displaystyle\int\dfrac{4}{x-2}\,dx=4\ln|x-2|+k$`,
      motiu:   TEX`El denominador és $x-2$.`,
      marca:   ['funcions-elementals/data/full-2.png', 55.9, 59.7, 29.1, 4.4] },
    { lloc:    TEX`d)`,
      ondiu:   TEX`$\displaystyle\int\dfrac{1}{(x+4)^2}\,dx=-\dfrac{1}{x-4}+k$`,
      hadedir: TEX`$\displaystyle\int\dfrac{1}{(x+4)^2}\,dx=-\dfrac{1}{x+4}+k$`,
      motiu:   TEX`El denominador és $x+4$.`,
      marca:   ['funcions-elementals/data/full-2.png', 55.9, 80.6, 29.5, 4.3] },
    { lloc:    TEX`f)`,
      ondiu:   TEX`$\displaystyle\int\left(\dfrac{2}{(x+3)^3}+\dfrac{5}{(x-3)^2}\right)dx =\dfrac{-1}{(x+3)^2}-\dfrac{5}{x-3}+k$`,
      hadedir: TEX`$\displaystyle\int\left(\dfrac{2}{(x+3)^3}-\dfrac{5}{(x-3)^2}\right)dx =\dfrac{-1}{(x+3)^2}+\dfrac{5}{x-3}+k$`,
      motiu:   TEX`A l'enunciat, el segon terme porta signe menys. La solució el copia amb signe més, i el resultat que dona és el d'aquesta altra integral.`,
      marca:   [['funcions-elementals/data/full-2.png', 55.9, 93.9, 29.5, 4.5], ['funcions-elementals/data/full-3.png', 13.9, 2.2, 23.7, 4.0]] },
  ],

  /* ── Unitat 12 · La integral definida ────────────────────────────────── */

  'u12/55': [
    { lloc:    TEX`c)`,
      ondiu:   TEX`$=\dfrac{9}{4}\sqrt[3]{9}+\dfrac{195}{12}$`,
      hadedir: TEX`$=\dfrac{27}{4}\sqrt[3]{9}+\dfrac{199}{12}$`,
      motiu:   TEX`$\tfrac{3}{4}\sqrt[3]{9^4}=\tfrac{3}{4}\cdot 9\sqrt[3]{9}= \tfrac{27}{4}\sqrt[3]{9}$ \;i\; $18-\tfrac{3}{4}-\tfrac{2}{3}=\tfrac{199}{12}$. El valor és aproximadament $30{,}62$.`,
      marca:   ['regla-barrow/data/full-2.png', 14.0, 94.8, 14.4, 3.8] },
    { lloc:    TEX`g)`,
      ondiu:   TEX`$\displaystyle\int_0^{\pi}\cos 2x\,dx$`,
      hadedir: TEX`$\displaystyle\int_0^{\pi}\cos^2 x\,dx$`,
      motiu:   TEX`L'enunciat demana la integral de $\cos^2 x$, i la primitiva $\tfrac{x}{2}+\tfrac{\sin 2x}{4}$ i el resultat $\tfrac{\pi}{2}$ són els d'aquesta funció. La integral de $\cos 2x$ entre $0$ i $\pi$ valdria $0$.`,
      marca:   ['regla-barrow/data/full-2.png', 57.5, 20.8, 14.9, 4.4] },
  ],

  /* ── Unitat 13 · Probabilitat ────────────────────────────────────────── */

  'u13/40': [
    { lloc:    TEX`a)`,
      ondiu:   TEX`$VR_{5,6}=5^6=15\,625$`,
      hadedir: TEX`$4\cdot VR_{5,5}=4\cdot 5^5=12\,500$`,
      motiu:   TEX`Els dígits parells són $0$, $2$, $4$, $6$ i $8$, però un nombre de 6 xifres no pot començar per $0$: per a la primera xifra només hi ha 4 opcions. El resultat $15\,625$ compta també seqüències com $002468$, que no són nombres de 6 xifres.`,
      marca:   ['espai-mostral/data/full-1.png', 55.7, 73.0, 19.9, 2.2] },
  ],

  'u13/60': [
    { lloc:    TEX`a)`,
      ondiu:   TEX`$P(A\cap B)=1-P(\overline{A}\cap\overline{B})=1-0{,}3=0{,}7$`,
      hadedir: TEX`$P(A\cup B)=1-P(\overline{A}\cap\overline{B})=1-0{,}3=0{,}7$`,
      motiu:   TEX`«No s'ha complert alguna de les dues normes» és la unió $A\cup B$, que és el contrari de $\overline{A}\cap\overline{B}$ (complir-les totes dues). La intersecció val una altra cosa: $P(A\cap B)=0{,}23+0{,}65-0{,}7=0{,}18$.`,
      marca:   ['probabilitat-esdeveniments/data/full-3.png', 11.5, 8.7, 27.7, 4.1] },
  ],

  /* ── Unitat 14 · Distribucions de probabilitat ───────────────────────── */

  'u14/53': [
    { lloc:    TEX`b)`,
      ondiu:   TEX`$P(X=3)=0{,}188$`,
      hadedir: TEX`$P(X=12)=0{,}000000007$`,
      motiu:   TEX`$X$ compta els enquestats que responen «NS/NC». Si exactament 3 no responen «NS/NC», els altres 12 sí que ho fan: cal $P(X=12)=\binom{15}{12}\cdot 0{,}13^{12}\cdot 0{,}87^{3}\approx 7\cdot 10^{-9}$. El valor $0{,}188$ és la probabilitat que exactament 3 responguin «NS/NC»: seria la resposta si a l'enunciat hi sobrés el «no».`,
      marca:   ['distribucio-binomial/data/full-3.png', 9.7, 96.7, 18.4, 2.0] },
  ],

};


/* ═══════════════════════════════════════════════════════════════════════
   LES OBSERVACIONS
   ───────────────────────────────────────────────────────────────────────
   Comentaris que no són errades, però que poden confondre. Només es veuen
   si ERRADES_OBS és true: surten dins de l'exercici, sota les errades.

     'u9/66': [
       { lloc: TEX`c) i d)`,
         text: TEX`Les respostes són el nombre màxim.` },
     ],

   `lloc` és opcional, igual que a les errades. Una observació que parla de
   dos exercicis està escrita dues vegades, un cop a cada exercici.
   ═══════════════════════════════════════════════════════════════════════ */

const OBSERVACIONS = {

  /* ── Unitat 1 · Matrius ──────────────────────────────────────────────── */

  'u1/42': [
    { text: TEX`L'enunciat demana dos exemples de cada tipus de matriu i la solució només en dona un.` },
  ],

  /* ── Unitat 2 · Determinants ─────────────────────────────────────────── */

  'u2/44': [
    { text: TEX`A l'enunciat hi ha una paraula repetida: «perquè que el determinant» ha de ser «perquè el determinant».` },
  ],

  /* ── Unitat 3 · Sistemes d'equacions ─────────────────────────────────── */

  'u3/60': [
    { lloc: TEX`d) i e)`,
      text: TEX`Dues errades tipogràfiques sense importància: a d) hi diu «Rango ($A$)» en lloc de «Rang ($A$)», i a e), a «Si $m\neq 1$, $m$ $\rightarrow$», hi sobra la segona $m$.` },
  ],

  'u3/64': [
    { text: TEX`L'enunciat demana resoldre el sistema quan és compatible indeterminat ($a=1$) i la solució només el discuteix. Per a $a=1$ el sistema és $2x+y+z=2$, $x+y=1$, $-y+z=0$, i les solucions són $x=1-\lambda$, $y=\lambda$, $z=\lambda$ amb $\lambda\in\R$.` },
  ],

  /* ── Unitat 5 · Rectes i plans en l'espai ────────────────────────────── */

  'u5/76': [
    { lloc: TEX`b)`,
      text: TEX`La solució escriu «$M^*=(\ldots)=2$» i «$M^*=(\ldots)=3$». Vol dir que el rang de $M^*$ és $2$ o $3$: una matriu no és igual a un nombre.` },
  ],

  'u5/77': [
    { text: TEX`La solució escriu «$M^*=(\ldots)=2$» i «$M^*=(\ldots)=3$». Vol dir que el rang de $M^*$ és $2$ o $3$: una matriu no és igual a un nombre.` },
  ],

  /* ── Unitat 7 · Límits i continuïtat ─────────────────────────────────── */

  'u7/68': [
    { text: TEX`A la solució, els apartats c) i d) surten en ordre canviat: primer el d) i després el c). Els valors de cadascun són correctes.` },
  ],

  'u7/113': [
    { text: TEX`El valor $x=-3$ és una arrel exacta, perquè $x^3+6x^2+12x+9=(x+2)^3+1$. Si proves amb $x=-3$ trobaràs $f(-3)=0$ en lloc d'un canvi de signe: no t'has equivocat, has trobat l'arrel. Qualsevol interval de longitud $2$ que la contingui, com ara $(-4,-2)$, respon la pregunta.` },
  ],

  'u7/120': [
    { text: TEX`L'enunciat anomena $f(x)=x+1$, i la solució torna a fer servir la lletra $f$ per a una funció diferent: la resta de les dues funcions que es tallen (per exemple, $f(x)=x+1-e^{x-1}$ a l'apartat a). El punt on aquesta resta val zero és l'abscissa del punt de tall. D'altra banda, l'enunciat només demana demostrar que hi ha un punt de tall; la solució va més enllà i l'aproxima amb un error menor que una dècima.` },
  ],

  /* ── Unitat 8 · Derivades ────────────────────────────────────────────── */

  'u8/54': [
    { text: TEX`L'enunciat escriu la recta com a $f(x)=2x-123$, amb la mateixa lletra $f$ de la funció $f(x)=x^3-x+4$. Són dues coses diferents: la recta és $y=2x-123$, que és com l'escriu la solució.` },
  ],

  'u8/58': [
    { text: TEX`A la solució hi ha una errada tipogràfica sense importància: hi diu «traingle» en lloc de «triangle».` },
  ],

  'u8/87': [
    { text: TEX`L'enunciat demana calcular la funció derivada «utilitzant la definició», però el solucionari només hi dona el resultat final de cada apartat, sense el desenvolupament. Els resultats són correctes. Si vols veure un model del desenvolupament pas a pas, mira la solució de l'exercici 88.` },
  ],

  /* ── Unitat 9 · Aplicacions de les derivades ─────────────────────────── */

  'u9/39': [
    { lloc: TEX`b)`,
      text: TEX`On diu «La derivada té un grau» vol dir «La derivada té grau u»: la derivada d'una paràbola és un polinomi de grau $1$, que s'anul·la en un sol punt, i per això la paràbola té, com a molt, un extrem.` },
  ],

  'u9/41': [
    { text: TEX`L'enunciat diu «A partir de la derivada de $f'(x)$». Vol dir: a partir de la gràfica de la derivada $f'(x)$, que és la que es dona.` },
  ],

  'u9/51': [
    { text: TEX`La primera frase de la solució enuncia la implicació al revés. El que es fa servir és: si $y'(x)>0$ per a tot $x$, llavors la funció és sempre creixent. La implicació contrària no és certa en general: $y=x^3$ és sempre creixent i, en canvi, $y'(0)=0$.` },
  ],

  'u9/66': [
    { lloc: TEX`c) i d)`,
      text: TEX`Les respostes «Dos punts d'inflexió» i «$n-2$ punts d'inflexió» són el nombre màxim. Un polinomi de quart grau en pot tenir dos o cap: per exemple, $y=x^4$ no en té cap, perquè $y''=12x^2$ no canvia de signe.` },
  ],

  /* ── Unitat 10 · Representació de funcions ───────────────────────────── */

  'u10/75': [
    { lloc: TEX`e)`,
      text: TEX`La solució estudia el creixement, però no diu l'extrem relatiu que demana l'enunciat: hi ha un mínim a $(0,1)$.` },
  ],

  'u10/84': [
    { lloc: TEX`d)`,
      text: TEX`Al segon extrem, $\left(\tfrac{2+\sqrt{7}}{3},\tfrac{20-14\sqrt{7}}{27}\right)$, la solució no diu de quin tipus és: és un mínim.` },
  ],

  'u10/108': [
    { lloc: TEX`b) i c)`,
      text: TEX`La solució només hi dona els mínims. També hi ha màxims relatius: a b), el punt $(0,6)$; a c), el punt $(2,7)$, on la funció passa de créixer a decréixer.` },
  ],

  'u10/124': [
    { lloc: TEX`c)`,
      text: TEX`La solució escriu $T'(x)$ i $T(x)$ en lloc de $T'(t)$ i $T(t)$, i dona l'interval $(-\infty,2)$ tot i que el temps comença a $t=0$.` },
  ],

  /* ── Unitat 13 · Probabilitat ────────────────────────────────────────── */

  'u13/35': [
    { text: TEX`A la solució hi ha una errada tipogràfica sense importància: hi diu «probabiltat» en lloc de «probabilitat».` },
  ],

  'u13/36': [
    { text: TEX`A les solucions hi ha dues errades tipogràfiques sense importància: «probabiltat» en lloc de «probabilitat» (exercici 36) i «perfeccionamient» en lloc de «perfeccionament» (exercici 96).` },
  ],

  'u13/96': [
    { text: TEX`A les solucions hi ha dues errades tipogràfiques sense importància: «probabiltat» en lloc de «probabilitat» (exercici 36) i «perfeccionamient» en lloc de «perfeccionament» (exercici 96).` },
  ],

  /* ── Unitat 14 · Distribucions de probabilitat ───────────────────────── */

  'u14/46': [
    { text: TEX`A les solucions hi ha dues errades tipogràfiques sense importància: «propabilitat» en lloc de «probabilitat» (exercici 46 a) i, a l'exercici 50, un parèntesi que no es tanca: ha de dir $1-\bigl(P(X=0)+P(X=1)+P(X=2)\bigr)$.` },
  ],

  'u14/50': [
    { text: TEX`A les solucions hi ha dues errades tipogràfiques sense importància: «propabilitat» en lloc de «probabilitat» (exercici 46 a) i, a l'exercici 50, un parèntesi que no es tanca: ha de dir $1-\bigl(P(X=0)+P(X=1)+P(X=2)\bigr)$.` },
  ],

};


/* ═══════════════════════════════════════════════════════════════════════
   A PARTIR D'AQUÍ NO CAL QUE TOQUIS RES
   ═══════════════════════════════════════════════════════════════════════ */

/* Les dues comandes pròpies de defs.tex que fan servir els textos. */
const ERRADES_MACROS = { '\\dlim': '\\displaystyle\\lim', '\\R': '\\mathbb{R}' };

/* Les errades d'un exercici (llista buida si no en té). */
function erradesDe(u, n){
  return ERRADES[u + '/' + n] || [];
}

/* Les observacions d'un exercici. Cap, si l'interruptor és apagat. */
function observacionsDe(u, n){
  return ERRADES_OBS ? (OBSERVACIONS[u + '/' + n] || []) : [];
}

/* La icona d'avís: un triangle amb un signe d'admiració. Es dibuixa aquí, i
   no amb el caràcter ⚠, perquè es vegi igual a tots els mòbils i ordinadors. */
const _ICONA_AVIS = '<svg class="err-ico" viewBox="0 0 24 24" aria-hidden="true" focusable="false">'
  + '<path d="M12 3.6 21.7 20.4H2.3Z" fill="currentColor" stroke="currentColor" stroke-width="2.6" stroke-linejoin="round"/>'
  + '<path d="M12 9.4v5" fill="none" stroke="#fff" stroke-width="2.3" stroke-linecap="round"/>'
  + '<circle cx="12" cy="18" r="1.35" fill="#fff"/></svg>';

/* L'avís que surt a la targeta de l'exercici, a la llista de la tasca:
   «2 errades al solucionari». Només compta les errades de la SOLUCIÓ: les
   d'enunciat es mostren senceres allà mateix (vegeu htmlErradesEnunciat).
   Cadena buida si la solució no té cap errada. */
function avisErrades(u, n){
  const k = erradesDe(u, n).filter(e => !e.enunciat && !_callada(e)).length;
  if(!k) return '';
  return k === 1 ? '1 errada al solucionari' : k + ' errades al solucionari';
}

function htmlAvisErrades(u, n){
  const text = avisErrades(u, n);
  return text ? '<span class="ex-err">' + _ICONA_AVIS + '<span>' + text + '</span></span>' : '';
}

/* ── De text amb fórmules a HTML ──────────────────────────────────────── */

function _escapa(s){
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/* Un tros de text normal (fora dels dòlars). */
function _textAHtml(t){
  return _escapa(t)
    .replace(/\\quad\s*/g, '&emsp;')
    .replace(/\\;/g, '&ensp;')
    .replace(/\\,/g, '&thinsp;')
    .replace(/\\([$%])/g, '$1');
}

/* Una fórmula (el que hi ha entre dos dòlars), amb la puntuació que porta
   enganxada: `abans` («, parèntesi d'obrir) i `despres` (punt, coma, »...).
   Aquesta puntuació es posa DINS de la fórmula perquè, en pantalles estretes,
   no quedi mai sola en una altra línia.
   Si KaTeX no s'ha pogut carregar, es mostra el LaTeX tal qual: es llegeix
   pitjor, però no es perd res. */
const _KATEX_FI   = '</span></span></span>';     // tanca l'últim tros, .katex-html i .katex
const _KATEX_TROS = '<span class="base">';       // obre el primer tros de la fórmula

function _formulaAHtml(tex, abans, despres){
  abans = abans || ''; despres = despres || '';
  let h = null;
  if(typeof katex !== 'undefined'){
    try{
      h = katex.renderToString(tex, {
        throwOnError: false,
        macros: Object.assign({}, ERRADES_MACROS)
      });
    }catch(e){ h = null; }
  }
  if(h === null){
    return _escapa(abans) + '<code class="err-tex">' + _escapa(tex) + '</code>' + _escapa(despres);
  }
  if(despres && h.endsWith(_KATEX_FI)){
    h = h.slice(0, -_KATEX_FI.length) + '<span class="err-punt">' + _escapa(despres) + '</span>' + _KATEX_FI;
    despres = '';
  }
  const i = abans ? h.indexOf(_KATEX_TROS) : -1;
  if(i >= 0){
    const tall = i + _KATEX_TROS.length;
    h = h.slice(0, tall) + '<span class="err-punt">' + _escapa(abans) + '</span>' + h.slice(tall);
    abans = '';
  }
  return _escapa(abans) + h + _escapa(despres);
}

/* Text amb fórmules entre $...$  →  HTML. */
function texAHtml(s){
  if(!s) return '';
  s = String(s);

  /* 1) Es talla en trossos: text, fórmula, text, fórmula... */
  const trossos = [];
  let tros = '', mates = false;
  for(let i = 0; i < s.length; i++){
    const c = s[i];
    if(c === '\\' && i + 1 < s.length){ tros += c + s[i + 1]; i++; continue; }
    if(c === '$'){
      trossos.push({mates: mates, s: tros});
      tros = ''; mates = !mates;
      continue;
    }
    tros += c;
  }
  /* Si ha quedat un dòlar sense tancar, el que venia darrere es mostra com
     a text, amb el dòlar al davant, perquè es vegi que falta l'altre. */
  trossos.push({mates: false, s: (mates ? '$' : '') + tros});

  /* 2) Cada fórmula s'emporta la puntuació que té enganxada a banda i banda. */
  let html = '';
  for(let i = 0; i < trossos.length; i++){
    const t = trossos[i];
    if(!t.mates){ html += _textAHtml(t.s); continue; }
    let abans = '', despres = '';
    const m = /[«(\[¿¡]+$/.exec(html);
    if(m){ abans = m[0]; html = html.slice(0, m.index); }
    const seg = trossos[i + 1];
    if(seg && !seg.mates){
      const d = /^[.,;:!?»)\]]+/.exec(seg.s);
      if(d){ despres = d[0]; seg.s = seg.s.slice(d[0].length); }
    }
    html += _formulaAHtml(t.s, abans, despres);
  }
  return html;
}

/* Demana per endavant les dues lletres que fan servir totes les fórmules.
   tasca.html ho crida quan la tasca té alguna errada: així, quan l'alumne
   obre un exercici, les fórmules surten de cop i no després d'un instant
   en blanc. Si el navegador no ho sap fer, no passa res. */
function preparaFormules(){
  try{
    if(document.fonts && document.fonts.load){
      document.fonts.load('1em KaTeX_Main');
      document.fonts.load('italic 1em KaTeX_Math');
    }
  }catch(e){}
}

/* ── Les targetes ─────────────────────────────────────────────────────── */

/* «f)» → «Apartat f)»,  «b) i c)» → «Apartats b) i c)»,
   «segon punt» → «Segon punt». */
function _llocAHtml(lloc){
  const l = String(lloc || '').trim();
  if(!l) return '';
  if(/^[a-z]\)/.test(l)){
    return (/^[a-z]\)\s+i\s+[a-z]\)/.test(l) ? 'Apartats ' : 'Apartat ') + texAHtml(l);
  }
  return texAHtml(l.charAt(0).toUpperCase() + l.slice(1));
}

function _filaErrada(classe, etiqueta, text){
  return '<div class="err-fila"><div class="err-et ' + classe + '">' + etiqueta + '</div>'
       + '<div class="err-val">' + texAHtml(text) + '</div></div>';
}

/* Les marques d'una errada: llista de {img, x, y, w, h}, en percentatges de
   la imatge. Accepta un rectangle sol o una llista de rectangles. */
/* ── Els pegats ─────────────────────────────────────────────────────────
   Trossos de la pàgina ja corregits que es posen a sobre de la imatge. */

/* Els pegats d'una errada, sempre com a llista de {img, x, y, w, h, f}. */
function pegatsDe(e){
  const p = e && e.pegat;
  if(!Array.isArray(p) || !p.length) return [];
  return (Array.isArray(p[0]) ? p : [p])
    .filter(r => r && r.length >= 6)
    .map(r => ({img: r[0], x: +r[1], y: +r[2], w: +r[3], h: +r[4], f: r[5]}));
}

/* Una errada «callada»: la imatge ja es veu corregida i no cal anunciar-la. */
function _callada(e){
  return ERRADES_PEGATS && pegatsDe(e).length > 0;
}

/* El número que porta una errada: la seva posició entre les que s'anuncien. */
function _numero(errs, k){
  let n = 0;
  for(let i = 0; i <= k; i++) if(!_callada(errs[i])) n++;
  return n;
}

/* Tots els pegats que van sobre una imatge (`img`, escrita com a cataleg.js),
   siguin de l'exercici que siguin: la pàgina s'ha de veure corregida es miri
   des d'on es miri. Cadena buida si no n'hi ha o si l'interruptor és apagat. */
let _PEGATS_PER_IMATGE = null;
function htmlPegats(u, img){
  if(!ERRADES_PEGATS) return '';
  if(!_PEGATS_PER_IMATGE){
    _PEGATS_PER_IMATGE = {};
    Object.keys(ERRADES).forEach(clau => {
      const un = clau.split('/')[0];
      ERRADES[clau].forEach(e => pegatsDe(e).forEach(q => {
        const k = un + '/' + q.img;
        (_PEGATS_PER_IMATGE[k] = _PEGATS_PER_IMATGE[k] || []).push('<img class="pegat" alt="" src="pegats/' + un + '/' + q.f
          + '" style="left:' + q.x + '%;top:' + q.y + '%;width:' + q.w + '%;height:' + q.h + '%">');
      }));
    });
  }
  return (_PEGATS_PER_IMATGE[u + '/' + img] || []).join('');
}

/* ── Les marques ──────────────────────────────────────────────────────── */

function marquesDe(e){
  const m = e && e.marca;
  if(!m || !m.length) return [];
  return (Array.isArray(m[0]) ? m : [m])
    .filter(r => r && r.length >= 5)
    .map(r => ({img: r[0], x: +r[1], y: +r[2], w: +r[3], h: +r[4]}));
}

/* Els requadres vermells d'un exercici que cauen sobre una imatge (`img` és
   el camí tal com surt al catàleg). Cada requadre porta el número de la seva
   errada, el mateix que la targeta. */
function htmlMarques(u, n, img){
  let h = '';
  const errs = erradesDe(u, n);
  errs.forEach((e, k) => {
    if(_callada(e)) return;
    const num = _numero(errs, k);
    marquesDe(e).forEach(r => {
      if(r.img !== img) return;
      h += '<button type="button" class="marca" data-k="' + k + '" style="left:' + r.x + '%;top:' + r.y
         + '%;width:' + r.w + '%;height:' + r.h + '%" aria-label="Errada ' + num
         + ': amplia la imatge i mostra la correcció"><span class="marca-num">' + num + '</span></button>';
    });
  });
  return h;
}

/* Una errada: on és i les dues files «On diu» i «Ha de dir» (i «Motiu», si
   l'interruptor és encès). Amb `senseEnunciat`, no s'hi escriu «Enunciat»
   perquè ja ho diu el títol del bloc. `k` és la posició de l'errada dins de
   l'exercici: si es passa i l'errada té marca a la imatge, la targeta porta
   el mateix número que el requadre i un botó per anar-hi. */
function _htmlErrada(e, senseEnunciat, k, num){
  let lloc = _llocAHtml(e.lloc);
  if(e.enunciat && !senseEnunciat) lloc = 'Enunciat' + (lloc ? ' · ' + lloc : '');
  const ambMarca = k !== undefined && k !== null && marquesDe(e).length > 0;
  let h = '<div class="err-card"' + (ambMarca ? ' data-k="' + k + '"' : '') + '>';
  if(lloc || ambMarca){
    h += '<div class="err-lloc">'
       + (ambMarca ? '<span class="err-num" aria-hidden="true">' + (num || k + 1) + '</span>' : '')
       + '<span class="err-lloc-text">' + lloc + '</span>'
       + (ambMarca ? '<button type="button" class="err-veure" data-k="' + k + '">Mostra-ho a la imatge</button>' : '')
       + '</div>';
  }
  h += _filaErrada('err-et-on', 'On diu', e.ondiu);
  h += _filaErrada('err-et-ha', 'Ha de dir', e.hadedir);
  if(ERRADES_MOTIU && e.motiu) h += _filaErrada('err-et-mo', 'Motiu', e.motiu);
  return h + '</div>';
}

/* La targeta d'una sola errada, per al peu de la imatge ampliada. */
function htmlErradaSola(u, n, k){
  const e = erradesDe(u, n)[k];
  if(!e) return '';
  let lloc = _llocAHtml(e.lloc);
  if(e.enunciat) lloc = 'Enunciat' + (lloc ? ' · ' + lloc : '');
  let h = '<div class="err-lloc"><span class="err-num" aria-hidden="true">' + _numero(erradesDe(u, n), k) + '</span>'
        + '<span class="err-lloc-text">' + (lloc || 'Errada del solucionari') + '</span></div>';
  h += _filaErrada('err-et-on', 'On diu', e.ondiu);
  h += _filaErrada('err-et-ha', 'Ha de dir', e.hadedir);
  if(ERRADES_MOTIU && e.motiu) h += _filaErrada('err-et-mo', 'Motiu', e.motiu);
  return h;
}

function _htmlObservacio(o){
  const lloc = _llocAHtml(o.lloc);
  return '<div class="err-card">'
       + (lloc ? '<div class="err-lloc">' + lloc + '</div>' : '')
       + '<div class="err-val">' + texAHtml(o.text) + '</div></div>';
}

function _quantes(n){
  return n === 1 ? 'una errada' : n + ' errades';
}

function _titolBloc(text){
  return '<div class="err-cap">' + _ICONA_AVIS + '<span>' + text + '</span></div>';
}

/* El bloc que surt dins de l'exercici, abans de la imatge: totes les errades
   i, si l'interruptor és encès, les observacions. Cadena buida si no hi ha res. */
function htmlErrades(u, n){
  const totes = erradesDe(u, n);
  const errs = totes.filter(e => !_callada(e));          // les que tenen pegat ja es veuen corregides: no s'anuncien
  const obs  = observacionsDe(u, n);
  let h = '';
  if(errs.length){
    const k = errs.filter(e => e.enunciat).length;      // quantes són a l'enunciat
    const titol = k === errs.length ? 'L’enunciat d’aquest exercici té ' + _quantes(k)
                : k === 0           ? 'El solucionari té ' + _quantes(errs.length) + ' en aquest exercici'
                :                     'Aquest exercici té ' + _quantes(errs.length);
    h += '<div class="err-panel" role="note">' + _titolBloc(titol)
       + errs.map(e => _htmlErrada(e, k === errs.length, totes.indexOf(e), _numero(totes, totes.indexOf(e)))).join('')
       + '</div>';
  }
  if(obs.length){
    const titol = obs.length === 1 ? 'Una observació sobre aquest exercici'
                                   : obs.length + ' observacions sobre aquest exercici';
    h += '<div class="err-panel err-obs" role="note">'
       + '<div class="err-cap"><span>' + titol + '</span></div>'
       + obs.map(_htmlObservacio).join('')
       + '</div>';
  }
  return h;
}

/* El bloc que surt a la llista de la tasca: només les errades d'enunciat,
   que l'alumne ha de conèixer abans de començar. Cadena buida si no n'hi ha. */
function htmlErradesEnunciat(u, n){
  const errs = erradesDe(u, n).filter(e => e.enunciat);
  if(!errs.length) return '';
  return '<div class="err-panel err-llista" role="note">'
       + _titolBloc(errs.length === 1 ? 'L’enunciat té una errada' : 'L’enunciat té ' + errs.length + ' errades')
       + errs.map(e => _htmlErrada(e, true)).join('')
       + '</div>';
}
