---
layout: null
---

{% capture md_01 %}{% include try/steps/01-hello-window.md %}{% endcapture %}
{% capture rb_01 %}{% include try/steps/01-hello-window.rb %}{% endcapture %}
{% capture md_02 %}{% include try/steps/02-where-things-go.md %}{% endcapture %}
{% capture rb_02 %}{% include try/steps/02-where-things-go.rb %}{% endcapture %}
{% capture md_03 %}{% include try/steps/03-a-splash-of-color.md %}{% endcapture %}
{% capture rb_03 %}{% include try/steps/03-a-splash-of-color.rb %}{% endcapture %}
{% capture md_04 %}{% include try/steps/04-meet-the-shapes.md %}{% endcapture %}
{% capture rb_04 %}{% include try/steps/04-meet-the-shapes.rb %}{% endcapture %}
{% capture md_05 %}{% include try/steps/05-shapes-are-objects.md %}{% endcapture %}
{% capture rb_05 %}{% include try/steps/05-shapes-are-objects.rb %}{% endcapture %}
{% capture md_06 %}{% include try/steps/06-make-it-move.md %}{% endcapture %}
{% capture rb_06 %}{% include try/steps/06-make-it-move.rb %}{% endcapture %}
{% capture md_07 %}{% include try/steps/07-bounce.md %}{% endcapture %}
{% capture rb_07 %}{% include try/steps/07-bounce.rb %}{% endcapture %}
{% capture md_08 %}{% include try/steps/08-steer-with-the-keyboard.md %}{% endcapture %}
{% capture rb_08 %}{% include try/steps/08-steer-with-the-keyboard.rb %}{% endcapture %}
{% capture md_09 %}{% include try/steps/09-click-click-click.md %}{% endcapture %}
{% capture rb_09 %}{% include try/steps/09-click-click-click.rb %}{% endcapture %}
{% capture md_10 %}{% include try/steps/10-keeping-score.md %}{% endcapture %}
{% capture rb_10 %}{% include try/steps/10-keeping-score.rb %}{% endcapture %}
{% capture md_11 %}{% include try/steps/11-all-at-once.md %}{% endcapture %}
{% capture rb_11 %}{% include try/steps/11-all-at-once.rb %}{% endcapture %}
{% capture md_12 %}{% include try/steps/12-a-tiny-game.md %}{% endcapture %}
{% capture rb_12 %}{% include try/steps/12-a-tiny-game.rb %}{% endcapture %}

const steps = [
  { slug: 'hello-window',            prose: {{ md_01 | markdownify | jsonify }}, code: {{ rb_01 | jsonify }} },
  { slug: 'where-things-go',         prose: {{ md_02 | markdownify | jsonify }}, code: {{ rb_02 | jsonify }} },
  { slug: 'a-splash-of-color',       prose: {{ md_03 | markdownify | jsonify }}, code: {{ rb_03 | jsonify }} },
  { slug: 'meet-the-shapes',         prose: {{ md_04 | markdownify | jsonify }}, code: {{ rb_04 | jsonify }} },
  { slug: 'shapes-are-objects',      prose: {{ md_05 | markdownify | jsonify }}, code: {{ rb_05 | jsonify }} },
  { slug: 'make-it-move',            prose: {{ md_06 | markdownify | jsonify }}, code: {{ rb_06 | jsonify }} },
  { slug: 'bounce',                  prose: {{ md_07 | markdownify | jsonify }}, code: {{ rb_07 | jsonify }} },
  { slug: 'steer-with-the-keyboard', prose: {{ md_08 | markdownify | jsonify }}, code: {{ rb_08 | jsonify }} },
  { slug: 'click-click-click',       prose: {{ md_09 | markdownify | jsonify }}, code: {{ rb_09 | jsonify }} },
  { slug: 'keeping-score',           prose: {{ md_10 | markdownify | jsonify }}, code: {{ rb_10 | jsonify }} },
  { slug: 'all-at-once',             prose: {{ md_11 | markdownify | jsonify }}, code: {{ rb_11 | jsonify }} },
  { slug: 'a-tiny-game',             prose: {{ md_12 | markdownify | jsonify }}, code: {{ rb_12 | jsonify }} }
];

// Page-specific DOM refs (shared refs live in playground.js)
const stepChipsEl    = document.getElementById('stepChips');
const stepProseEl    = document.getElementById('stepProse');
const stepCountEl    = document.getElementById('stepCount');
const prevBtnEl      = document.getElementById('prevBtn');
const nextBtnEl      = document.getElementById('nextBtn');

let currentStep = 0;
const visited = new Set();

function stepTitle(index) {
  const m = steps[index].prose.match(/<h1[^>]*>(.*?)<\/h1>/);
  return m ? m[1] : 'Step ' + (index + 1);
}

function stepIndexForHash(hash) {
  const slug = hash.replace(/^#/, '');
  for (let i = 0; i < steps.length; i++) {
    if (steps[i].slug === slug) return i;
  }
  return 0;
}

// Build step chips
steps.forEach(function(step, i) {
  const btn = document.createElement('button');
  btn.className = 'try-step-chip';
  btn.textContent = i + 1;
  btn.title = stepTitle(i);
  btn.onclick = function() { goToStep(i); };
  stepChipsEl.appendChild(btn);
});

window.onWasmReady = function() {
  loadingOverlay.style.display = 'none';
  runBtnEl.disabled = false;

  // Name the step in the URL without adding an entry — this is the one the
  // visitor arrived on, so replace rather than push.
  const index = stepIndexForHash(window.location.hash);
  history.replaceState(null, '', '#' + steps[index].slug);
  renderStep(index);
};

// Back and forward between steps. The entry being restored already exists, so
// render into it — pushing from here would bury the step being navigated to
// under a fresh entry and leave back unable to make progress.
window.addEventListener('hashchange', function() {
  renderStep(stepIndexForHash(window.location.hash));
});

// A back/forward restore from the bfcache hands back the page exactly as it
// was, wasm main loop resuming mid-frame, without reloading anything. Re-run
// so the step starts from the top, keeping any edits already in the editor.
window.addEventListener('pageshow', function(e) {
  if (e.persisted && !runBtnEl.disabled) runCode();
});

// Show a step. History is the caller's business — goToStep() adds an entry,
// while back/forward and the first load render into one that already exists.
function renderStep(index) {
  index = Math.max(0, Math.min(index, steps.length - 1));
  currentStep = index;
  visited.add(index);

  // Prose panel
  stepProseEl.innerHTML = steps[index].prose;
  stepProseEl.querySelectorAll('a').forEach(function(a) {
    a.target = '_blank';
    a.rel = 'noopener';
  });
  stepProseEl.scrollTop = 0;
  // Steps arrive as HTML, after the layout's first pass over the page
  if (window.refreshProse) window.refreshProse(stepProseEl);

  // Progress
  stepCountEl.textContent = (index + 1) + ' / ' + steps.length;
  const chips = stepChipsEl.getElementsByTagName('button');
  for (let i = 0; i < chips.length; i++) {
    chips[i].classList.toggle('active', i === index);
    chips[i].classList.toggle('visited', visited.has(i) && i !== index);
  }
  prevBtnEl.disabled = index === 0;
  nextBtnEl.disabled = index === steps.length - 1;

  setEditorCode(steps[index].code);

  if (!runBtnEl.disabled) {
    runCode();
  }
}

// Move to a step, leaving an entry behind so back returns to the one we're on.
// Re-selecting the step already showing restarts it without a duplicate entry,
// which is what clicking the active chip has always done.
function goToStep(index) {
  index = Math.max(0, Math.min(index, steps.length - 1));
  if (index !== currentStep) {
    history.pushState(null, '', '#' + steps[index].slug);
  }
  renderStep(index);
}

function prevStep() { goToStep(currentStep - 1); }
function nextStep() { goToStep(currentStep + 1); }
