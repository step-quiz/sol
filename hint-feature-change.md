# Change log: exercise hint ("pista") scaffolding

> **SUPERSEDED (later change) — read this first.**
> Hints no longer live in `cataleg.js` as a per-exercise `p` field. They were
> moved to a dedicated file **`hints.js`**, a flat map keyed by
> `'unit/exercise'`:
>
> ```js
> const PISTES = { 'u7/44': '...', 'u8/21': '...' };
> ```
>
> Reason: editing one hint meant finding and modifying a line inside a 70 kB
> generated file, which was slow and error-prone on a phone. It also meant
> `cataleg.js` could no longer be regenerated from the topic pages without
> destroying every hint. With the split, `cataleg.js` is a derived file again
> and `hints.js` is hand-maintained.
>
> `pistaDe(u, n)` moved to `hints.js` and keeps the same signature and
> contract, so `tasca.html` was unchanged apart from loading the new script.
> Everything else below still holds: precomputed only, no runtime API call,
> no backend. **Do not put hints back into `cataleg.js`.**


## Context for the AI reading this

This is a static site (no server, no database, hosted on GitHub Pages) for a
2nd-year Batxillerat math course. Students navigate **unit → task → exercise**.
The single source of truth for exercise metadata is `cataleg.js`, a
hand-maintained (not build-generated) object keyed by unit and exercise
number. `tasques.js` (the weekly schedule) only stores exercise numbers and
resolves them against `cataleg.js` at render time via `fitxaDe(u, n)`.

The long-term goal (**not implemented yet**) is to have an LLM generate a
short hint for each exercise. This change only adds the data model and UI
plumbing for that feature. No AI call exists anywhere in the codebase.

## Decision made

Two architectures were considered:

1. **Precomputed hints** — generate hint text offline (by hand or by pasting
   AI output), store it as a static field in `cataleg.js`, same pattern as
   the existing `t` (title), `d` (difficulty), `i` (images) fields. No
   runtime dependency, no server, no API key exposure, fits the project's
   "edit one file, commit, done" workflow.
2. **On-demand generation** — a button triggers a live API call via a small
   serverless proxy (needed because a static site cannot hold a secret API
   key client-side), ideally with caching so each exercise is generated once
   and reused.

**Option 1 was chosen.** Rationale: the project is deliberately server-less
and maintained by a single non-developer via the GitHub web UI from a phone;
option 1 requires zero new infrastructure and matches the existing
"`cataleg.js` is the single source of truth, filled in by hand" pattern.
Option 2 remains possible later for exercises that lack a precomputed hint,
without conflicting with this change.

## Files changed

### `cataleg.js`
- Documented a new **optional** per-exercise field `p` (pista / hint) in the
  header comment, alongside `t`, `d`, `i`, `a`.
- Added a helper `pistaDe(u, n)`, mirroring the existing `fitxaDe` /
  `etiquetaDe` helpers:
  ```js
  function pistaDe(u, n){
    const f = fitxaDe(u, n);
    return (f && f.p) ? f.p : null;
  }
  ```
- Added one demo hint (exercise 44, unit `u7`) with placeholder text clearly
  marked `[Exemple de pista — substitueix aquest text]`, to validate the UI
  end to end. This is throwaway content, not a real hint — replace or
  delete it before use.

### `tasca.html`
- In the exercise detail view (`#v-detail`), added a hint block right after
  the "mark as done" button and before `#page-wrap`:
  ```html
  <div class="pista-wrap" id="pista-wrap" style="display:none">
    <button class="pista-btn" id="pista-btn" onclick="togglePista()">💡 Veure pista</button>
    <div class="pista-text" id="pista-text" style="display:none"></div>
  </div>
  ```
- Added `updatePista(r)`, called from `showExercise(r)` right after
  `updateDoneBtn()`. It looks up `pistaDe(r.u, r.n)`:
  - If a hint exists, shows the `pista-wrap` block and fills `pista-text`.
  - If not, hides `pista-wrap` entirely — **no empty button is ever shown
    for exercises without a hint**.
- Added `togglePista()`, a simple show/hide toggle for the hint text,
  independent of the "done" state.
- No new global state was introduced beyond the existing `TASCA` / `ACTUAL`
  pattern; the hint is re-resolved every time `showExercise` runs, so it's
  always in sync with `cataleg.js`.

### `assets/style.css`
- Added `.pista-wrap`, `.pista-btn`, `.pista-text`, reusing existing design
  tokens (`--ana`, `--ana-tint`, `--border`, Libre Baskerville for the
  button, same rounded-corner / border treatment as the rest of the detail
  view). No new colors or fonts introduced.

## What did NOT change

- `tasques.js` — untouched. The schedule format is unaffected; hints are
  resolved per exercise number regardless of which task/week it's assigned
  to.
- `progres.js` — untouched. Hint visibility is independent of the
  done/not-done state.
- No network calls, no API keys, no build step, no new dependencies.

## How a hint gets populated (current workflow)

Same as every other field in `cataleg.js`: add or edit the `p:'...'` key on
the relevant exercise entry, commit. There is no automation yet — an editor
(human or an LLM asked to draft hint text) writes the string, and it's
pasted in by hand, exactly like `t`, `d`, and `i` are today.

## Explicitly out of scope / next steps if resumed

If a future session picks this up to actually wire in AI generation, note:

- The site is 100% static (GitHub Pages) — there is **no existing backend**.
  Any live/on-demand generation path requires introducing one (e.g. a
  serverless function) purely to keep the API key server-side. Do not
  attempt to call an LLM API directly from `tasca.html` with an embedded key.
- The chosen direction for now is **offline/precomputed only**. Do not add
  a "Generate hint" button that calls an API at runtime unless explicitly
  asked to revisit that decision — it was deliberately rejected in favor of
  the precomputed approach for this project.
- If precomputing hints in bulk (e.g. for a batch of exercise numbers), the
  output format is simply the `p:'...'` string per exercise in `cataleg.js`
  — no other file needs touching.
- The demo hint on exercise 44 in `u7` should be removed/replaced before
  this reaches students; it is placeholder text only.
