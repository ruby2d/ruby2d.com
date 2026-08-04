---
layout: null
---

{% comment %} Embed every example's source, keyed by slug. {% endcomment %}
const examples = {
{% for cat in site.data.examples %}{% for ex in cat.items %}{% assign inc_path = 'examples/' | append: ex.file | append: '.rb' %}{% capture ex_code %}{% include {{ inc_path }} %}{% endcapture %}  '{{ ex.file | replace: '_', '-' }}': {{ ex_code | jsonify }},
{% endfor %}{% endfor %}};

// Page-specific DOM refs (shared refs live in playground.js)
const galleryView     = document.getElementById('galleryView');
const playerView      = document.getElementById('playerView');
const playerIcon      = document.getElementById('playerIcon');
const playerTitle     = document.getElementById('playerTitle');
const playerBlurb     = document.getElementById('playerBlurb');
const backLink        = document.getElementById('backLink');

// The wasm runtime is heavy, so it's only fetched once a visitor opens an
// example — the gallery itself stays light.
let wasmRequested = false;
let wasmReady = false;
let pendingRun = false;
let currentSlug = null;
let wasmPaused = false;

// Where the gallery was scrolled to when we left it for an example. The browser
// can't manage this one itself: the gallery and the player are the same
// document, so on back it restores while the player is still all that's in the
// DOM, clamps the saved offset against that short page, and by the time
// showGallery() puts the tall gallery back, the position is gone. null means
// there's nothing owed — on a first load or a reload the browser's own
// restoration is right, and we stay out of its way.
let galleryScrollY = null;

// Halt the main loop while the gallery is showing — otherwise the last
// example keeps simulating (and burning CPU) on the hidden canvas. There's
// no need to resume it explicitly: runCode() installs a fresh main loop,
// which takes over from the paused one.
function pauseApp() {
  if (wasmReady && !wasmPaused && typeof Module.pauseMainLoop === 'function') {
    Module.pauseMainLoop();
    wasmPaused = true;
  }
}

function ensureWasm() {
  if (wasmRequested) return;
  wasmRequested = true;
  const script = document.createElement('script');
  script.src = '/assets/try/app.js';
  script.async = true;
  document.body.appendChild(script);
}

window.onWasmReady = function() {
  wasmReady = true;
  loadingOverlay.style.display = 'none';
  if (currentSlug) {
    runBtnEl.disabled = false;
    if (pendingRun) {
      pendingRun = false;
      wasmPaused = false;
      runCode();
    }
  } else {
    // The visitor backed out to the gallery while the runtime was loading —
    // park its idle loop right away.
    pauseApp();
  }
};

function slugFromHash() {
  const slug = decodeURIComponent(window.location.hash.replace(/^#/, ''));
  return Object.prototype.hasOwnProperty.call(examples, slug) ? slug : null;
}

function showGallery() {
  currentSlug = null;
  pendingRun = false;
  pauseApp();
  playerView.classList.add('hidden');
  galleryView.classList.remove('hidden');
  document.title = 'Ruby 2D — Examples';

  // After the un-hide, so the page is tall enough to accept the offset.
  if (galleryScrollY !== null) {
    window.scrollTo(0, galleryScrollY);
    galleryScrollY = null;
  }
}

function showPlayer(slug) {
  // Only when arriving from the gallery — stepping between two examples with
  // back/forward would otherwise overwrite the gallery's position with the
  // player's, which is always 0.
  if (currentSlug === null) galleryScrollY = window.scrollY;

  currentSlug = slug;
  const card = document.querySelector('.example-card[data-slug="' + slug + '"]');

  playerIcon.textContent  = card.dataset.icon;
  playerTitle.textContent = card.dataset.title;
  playerBlurb.textContent = card.dataset.blurb;
  document.title = 'Ruby 2D — ' + card.dataset.title;

  // Editor
  editorEl.value = examples[slug];
  resetDirty();
  editorEl.scrollTop = 0;
  editorEl.scrollLeft = 0;
  updateHighlight();
  editorPre.style.transform = '';
  void editorPre.offsetWidth;  // flush pending styles so the next assignment is a genuine change
  editorPre.style.transform = 'translate(0px, 0px)';

  galleryView.classList.add('hidden');
  playerView.classList.remove('hidden');
  window.scrollTo(0, 0);

  ensureWasm();
  if (wasmReady) {
    runBtnEl.disabled = false;
    wasmPaused = false;
    runCode();
  } else {
    loadingOverlay.style.display = 'flex';
    pendingRun = true;
  }
}

function route() {
  const slug = slugFromHash();
  if (slug) {
    showPlayer(slug);
  } else {
    showGallery();
  }
}

window.addEventListener('hashchange', route);

// Leaving the page and coming back with the browser's back/forward buttons can
// restore it from the bfcache: same wasm memory, same main loop picking up
// mid-frame, and no hashchange to notice it happened. Start the example over.
// Re-running beats routing again, which would reset the editor and throw away
// whatever the visitor had been tinkering with.
window.addEventListener('pageshow', function(e) {
  if (!e.persisted) return;
  if (wasmReady && currentSlug) {
    wasmPaused = false;
    runCode();
  }
});

backLink.addEventListener('click', function(e) {
  e.preventDefault();
  history.pushState(null, '', window.location.pathname);
  route();
});

route();
