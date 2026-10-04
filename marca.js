/* ═══════════════════════════════════════════════════════════════════════
   EINA DEL PROFESSOR: marcar on és una errada dins la imatge
   ───────────────────────────────────────────────────────────────────────
   Només es carrega amb   tasca.html?tot=1&marca=1   (els alumnes no la
   baixen mai). Com es fa servir:

     1. Entra a l'exercici.
     2. Al quadre de baix a la dreta, tria l'errada.
     3. Arrossega un rectangle sobre la imatge, al lloc de l'errada.
        Si l'errada ocupa dos llocs, fes-ne dos.
     4. Prem «Copia» i enganxa la línia dins de l'errada, a errades.js.

   No desa res enlloc: només calcula la línia que has d'enganxar.
   ═══════════════════════════════════════════════════════════════════════ */
(function(){
  const estil = document.createElement('style');
  estil.textContent =
    '.mode-marca .page-fig img{cursor:crosshair;}' +
    '.mode-marca .page-fig .marca{pointer-events:none;opacity:.5;}' +
    '.mm-rect{position:absolute;box-sizing:border-box;border:2px dashed #0a7d32;background:rgba(10,125,50,.18);pointer-events:none;}' +
    '.mm-panell{position:fixed;right:12px;bottom:76px;z-index:150;width:min(430px,calc(100vw - 24px));background:#fff;border:2px solid #0a7d32;' +
      'border-radius:6px;padding:10px 12px;font-family:"Source Code Pro",monospace;font-size:.72rem;line-height:1.5;box-shadow:0 6px 18px rgba(0,0,0,.2);}' +
    '.mm-panell select,.mm-panell button{font:inherit;padding:4px 8px;margin:4px 6px 4px 0;}' +
    '.mm-panell textarea{display:block;width:100%;font:inherit;margin-top:4px;}';
  document.head.appendChild(estil);
  document.body.classList.add('mode-marca');

  const panell = document.createElement('div');
  panell.className = 'mm-panell';
  panell.innerHTML =
    '<strong>Mode marcar</strong><div id="mm-ajuda">Entra a un exercici que tingui errades.</div>' +
    '<label>Errada: <select id="mm-k"></select></label><button type="button" id="mm-buida">Torna a començar</button>' +
    '<textarea id="mm-out" rows="3" readonly placeholder="Arrossega un rectangle sobre la imatge…"></textarea>' +
    '<button type="button" id="mm-copia">Copia</button><span id="mm-avis"></span>';
  document.body.appendChild(panell);

  const sel = panell.querySelector('#mm-k'), out = panell.querySelector('#mm-out');
  const ajuda = panell.querySelector('#mm-ajuda'), avis = panell.querySelector('#mm-avis');
  let rects = [];                       // els rectangles de l'errada triada: [fitxer, x, y, amplada, alçada]

  const fmt = r => "['" + r[0] + "', " + r.slice(1).map(v => v.toFixed(1)).join(', ') + ']';
  function pinta(){
    out.value = !rects.length ? ''
      : 'marca:   ' + (rects.length === 1 ? fmt(rects[0]) : '[' + rects.map(fmt).join(', ') + ']') + ',';
    avis.textContent = '';
  }
  function buida(){
    rects = [];
    document.querySelectorAll('.mm-rect').forEach(x => x.remove());
    pinta();
  }

  /* Cada cop que s'obre un exercici: omple el desplegable i treu l'ampliació de les imatges. */
  function prepara(){
    buida();
    sel.innerHTML = '';
    const errs = (typeof ACTUAL !== 'undefined' && ACTUAL) ? erradesDe(ACTUAL.u, ACTUAL.n) : [];
    errs.forEach((e, k) => {
      const o = document.createElement('option');
      o.value = k;
      o.textContent = (k + 1) + ' · ' + (e.enunciat ? 'enunciat' : (e.lloc || 'sense apartat')) + (marquesDe(e).length ? '  (ja té marca)' : '');
      sel.appendChild(o);
    });
    ajuda.textContent = errs.length ? 'Tria l’errada i arrossega un rectangle sobre la imatge.'
                                    : 'Aquest exercici no té cap errada a errades.js.';
    document.querySelectorAll('#page-wrap .page-fig img').forEach(img => { img.onclick = null; img.draggable = false; });
  }
  new MutationObserver(prepara).observe(document.getElementById('page-wrap'), {childList: true});
  sel.addEventListener('change', buida);
  panell.querySelector('#mm-buida').addEventListener('click', buida);
  panell.querySelector('#mm-copia').addEventListener('click', () => {
    if(!out.value) return;
    out.select();
    const fet = () => { avis.textContent = 'Copiat. Enganxa-ho dins de l’errada, a errades.js.'; };
    if(navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(out.value).then(fet, () => { document.execCommand('copy'); fet(); });
    else { document.execCommand('copy'); fet(); }
  });

  /* Dibuixar el rectangle */
  document.getElementById('page-wrap').addEventListener('pointerdown', ev => {
    const fig = ev.target.closest('.page-fig');
    if(!fig || !sel.options.length || ev.button > 0) return;
    ev.preventDefault();
    const img = fig.querySelector('img'), b = img.getBoundingClientRect();
    const x0 = ev.clientX, y0 = ev.clientY;
    const d = document.createElement('div'); d.className = 'mm-rect'; fig.appendChild(d);
    const limita = (v, a, z) => Math.max(a, Math.min(z, v));
    function mides(e){
      const xa = limita(Math.min(x0, e.clientX), b.left, b.right), xb = limita(Math.max(x0, e.clientX), b.left, b.right);
      const ya = limita(Math.min(y0, e.clientY), b.top, b.bottom), yb = limita(Math.max(y0, e.clientY), b.top, b.bottom);
      return [100*(xa - b.left)/b.width, 100*(ya - b.top)/b.height, 100*(xb - xa)/b.width, 100*(yb - ya)/b.height];
    }
    function mou(e){
      const m = mides(e);
      d.style.left = m[0] + '%'; d.style.top = m[1] + '%'; d.style.width = m[2] + '%'; d.style.height = m[3] + '%';
    }
    function fi(e){
      window.removeEventListener('pointermove', mou); window.removeEventListener('pointerup', fi);
      const m = mides(e);
      if(m[2] < 0.6 || m[3] < 0.3){ d.remove(); return; }          // un clic sense arrossegar no compta
      rects.push([img.getAttribute('src').slice(ACTUAL.u.length + 1)].concat(m));
      pinta();
    }
    window.addEventListener('pointermove', mou); window.addEventListener('pointerup', fi);
  });

  prepara();
})();
