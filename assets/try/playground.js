// Shared playground runtime for pages that run Ruby 2D in the browser
// (/try and /examples). Expects the page to provide these elements:
// #canvas, #editor, #editorHighlight, .try-editor-prism pre, #consoleOutput,
// #consolePanel, #consoleBtn, #runBtn, #loadingOverlay — and to define
// window.onWasmReady() for what happens once the wasm runtime is up.
// Load this before the page-specific script and before app.js.

// Cached DOM refs
const canvasEl       = document.getElementById('canvas');
const editorEl       = document.getElementById('editor');
const highlightEl    = document.getElementById('editorHighlight');
const editorPre      = document.querySelector('.try-editor-prism pre');
const consoleOutput  = document.getElementById('consoleOutput');
const consolePanel   = document.getElementById('consolePanel');
const consoleBtnEl   = document.getElementById('consoleBtn');
const runBtnEl       = document.getElementById('runBtn');
const loadingOverlay = document.getElementById('loadingOverlay');

// Keep browser shortcuts (Cmd/Ctrl+C, +V, +A, …) working across the page.
// The wasm runtime binds its SDL keyboard handler to `window` (SDL's default
// when SDL_HINT_EMSCRIPTEN_KEYBOARD_ELEMENT is unset) and calls preventDefault
// on keys it consumes, which otherwise swallows copy/paste everywhere except
// the editor. SDL registers on the bubble phase, so this capture-phase listener
// runs first, and stopping propagation for modifier combos lets the browser's
// native shortcut through. Plain keys are left alone so they still
// reach the running app, and the editor keeps its own Cmd+Enter / Cmd+/.
window.addEventListener('keydown', function(e) {
  if (!(e.metaKey || e.ctrlKey)) return;
  if (editorEl.contains(e.target)) return;
  e.stopImmediatePropagation();
}, true);

// Keep the browser's context menu off the canvas. A right-click there is game
// input, not a request for "Save Image As" — the Mandelbrot example zooms out
// with it — and the menu lands on top of whatever is running. SDL still sees
// the right button either way; only the menu is suppressed.
canvasEl.addEventListener('contextmenu', function(e) {
  e.preventDefault();
});

// Console
let consoleVisible = false;

function appendConsole(text) {
  consoleOutput.textContent += text + '\n';
  consoleOutput.scrollTop = consoleOutput.scrollHeight;
}

function clearConsole() {
  consoleOutput.textContent = '';
}

function toggleConsole() {
  consoleVisible = !consoleVisible;
  consolePanel.classList.toggle('hidden', !consoleVisible);
  consoleBtnEl.textContent = consoleVisible ? 'Hide Console' : 'Show Console';
}

// Emscripten Module — must be defined before app.js loads
var Module = {
  canvas: canvasEl,
  locateFile: function(path) { return '/assets/try/' + path; },
  print: function(text) { appendConsole(text); },
  printErr: function(text) {
    if (text.indexOf('emscripten_set_main_loop_timing') !== -1) return;
    appendConsole(text);
    if (!consoleVisible) toggleConsole();
    editorEl.closest('.try-editor-wrap').classList.add('error');
    canvasEl.style.width  = canvasEl.getAttribute('width')  + 'px';
    canvasEl.style.height = canvasEl.getAttribute('height') + 'px';
  }
};

// Dirty state — does the editor differ from what's on the canvas?
let lastRunCode = null;

function updateDirty() {
  const dirty = lastRunCode !== null && editorEl.value !== lastRunCode;
  runBtnEl.classList.toggle('dirty', dirty);
}

// Call when a fresh program is loaded into the editor. Without it, the previous
// program's source stays the yardstick, and anything that loads code without
// running it (a load while wasm is still arriving, say) reads as "edited since
// the last run" and pulses a Run button the visitor may not even be able to
// click.
function resetDirty() {
  lastRunCode = null;
  updateDirty();
}

function runCode() {
  clearConsole();
  editorEl.closest('.try-editor-wrap').classList.remove('error');
  let code = editorEl.value;
  lastRunCode = code;
  updateDirty();
  code = code.replace(/^[ \t]*require\s+['"]ruby2d(?:\/\w+)*['"]\s*$/mg, '');
  Module.ccall('try_run_code', null, ['string'], [code]);
}

function updateHighlight() {
  highlightEl.textContent = editorEl.value + '\n';
  Prism.highlightElement(highlightEl);
  updateDirty();
}

// Editor behaviors — auto-pairs, indentation, comments, run shortcut
const pairs    = { '(': ')', '{': '}', '[': ']', '"': '"', "'": "'" };
const closers  = new Set([')', '}', ']', '"', "'"] );

editorEl.addEventListener('keydown', function(e) {
  e.stopPropagation();
  const start = this.selectionStart;
  const end   = this.selectionEnd;
  const value = this.value;
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const meta  = isMac ? e.metaKey : e.ctrlKey;

  // Cmd/Ctrl+Enter — run code
  if (meta && e.key === 'Enter') {
    e.preventDefault();
    runCode();

  // Cmd/Ctrl+/ — toggle line comments
  } else if (meta && e.key === '/') {
    e.preventDefault();
    const lineStart = value.lastIndexOf('\n', start - 1) + 1;
    let lineEnd = value.indexOf('\n', end);
    if (lineEnd === -1) lineEnd = value.length;
    const block = value.slice(lineStart, lineEnd);
    const lines = block.split('\n');
    const allCommented = lines.every(function(l) { return /^\s*#/.test(l); });
    const newBlock = lines.map(function(l) {
      if (allCommented) return l.replace(/^(\s*)# ?/, '$1');
      return l.replace(/^(\s*)/, '$1# ');
    }).join('\n');
    this.value = value.slice(0, lineStart) + newBlock + value.slice(lineEnd);
    const delta = newBlock.length - block.length;
    this.selectionStart = start + (start === lineStart ? 0 : delta);
    this.selectionEnd   = end + delta;
    updateHighlight();

  // Tab / Shift+Tab — indent or unindent
  } else if (e.key === 'Tab') {
    e.preventDefault();
    const lineStart = value.lastIndexOf('\n', start - 1) + 1;
    if (start === end && !e.shiftKey) {
      // No selection, no shift — insert two spaces at cursor
      this.value = value.slice(0, start) + '  ' + value.slice(end);
      this.selectionStart = this.selectionEnd = start + 2;
    } else {
      // Selection, or Shift+Tab — operate on full lines
      let lineEnd = value.indexOf('\n', end - 1);
      if (lineEnd === -1) lineEnd = value.length;
      const block = value.slice(lineStart, lineEnd);
      const lines = block.split('\n');
      if (e.shiftKey) {
        const removed = lines.map(function(l) { return l.replace(/^ {1,2}/, ''); });
        const newBlock = removed.join('\n');
        this.value = value.slice(0, lineStart) + newBlock + value.slice(lineEnd);
        const startDelta = Math.min(start - lineStart, lines[0].length - removed[0].length);
        const totalDelta = newBlock.length - block.length;
        this.selectionStart = Math.max(lineStart, start - startDelta);
        this.selectionEnd   = end + totalDelta;
      } else {
        const newBlock = lines.map(function(l) { return '  ' + l; }).join('\n');
        this.value = value.slice(0, lineStart) + newBlock + value.slice(lineEnd);
        this.selectionStart = start + 2;
        this.selectionEnd   = end + (newBlock.length - block.length);
      }
    }
    updateHighlight();

  // Enter — smart indent
  } else if (e.key === 'Enter') {
    e.preventDefault();
    const lineStart = value.lastIndexOf('\n', start - 1) + 1;
    const currentLine = value.slice(lineStart, start);
    let indent = currentLine.match(/^\s*/)[0];
    const trimmed = currentLine.replace(/^\s*/, '');
    const blockOpener = /^(def|class|module|if|elsif|else|unless|while|until|for|begin|case|when|rescue|ensure)\b/.test(trimmed);
    const doBlock = /\bdo(\s*\|[^|]*\|)?\s*$/.test(trimmed);
    if (blockOpener || doBlock) {
      indent += '  ';
    }
    this.value = value.slice(0, start) + '\n' + indent + value.slice(end);
    this.selectionStart = this.selectionEnd = start + 1 + indent.length;
    updateHighlight();

  // Backspace — delete matching pair if cursor sits between them
  } else if (e.key === 'Backspace' && start === end && start > 0) {
    const charBefore = value[start - 1];
    const charAfter  = value[start];
    if (pairs[charBefore] && pairs[charBefore] === charAfter) {
      e.preventDefault();
      this.value = value.slice(0, start - 1) + value.slice(start + 1);
      this.selectionStart = this.selectionEnd = start - 1;
      updateHighlight();
    }

  // Closing bracket skip
  } else if (start === end && closers.has(e.key) && value[start] === e.key) {
    e.preventDefault();
    this.selectionStart = this.selectionEnd = start + 1;

  // Auto-closing pairs
  } else if (pairs[e.key]) {
    e.preventDefault();
    const close    = pairs[e.key];
    const selected = value.slice(start, end);
    this.value = value.slice(0, start) + e.key + selected + close + value.slice(end);
    this.selectionStart = this.selectionEnd = start + 1 + selected.length;
    updateHighlight();
  }
});
editorEl.addEventListener('keyup', function(e) { e.stopPropagation(); });
editorEl.addEventListener('input', function() {
  updateHighlight();
  // Auto-dedent: when a line becomes exactly <indent>end/else/elsif/etc., pull it back 2 spaces
  const pos = this.selectionStart;
  const value = this.value;
  const lineStart = value.lastIndexOf('\n', pos - 1) + 1;
  let lineEnd = value.indexOf('\n', pos);
  if (lineEnd === -1) lineEnd = value.length;
  const line = value.slice(lineStart, lineEnd);
  const m = line.match(/^( {2,})(end|else|elsif|when|rescue|ensure)(\b\s*)$/);
  if (m) {
    const newLine = line.slice(2);
    this.value = value.slice(0, lineStart) + newLine + value.slice(lineEnd);
    this.selectionStart = this.selectionEnd = Math.max(lineStart + newLine.length - m[3].length, lineStart);
    updateHighlight();
  }
});
editorEl.addEventListener('scroll', function() {
  editorPre.style.transform = 'translate(-' + this.scrollLeft + 'px, -' + this.scrollTop + 'px)';
});
