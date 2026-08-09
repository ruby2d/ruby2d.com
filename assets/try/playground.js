// Shared playground runtime for pages that run Ruby 2D in the browser
// (/try and /examples). Expects the page to provide these elements:
// #canvas, #editorWrap, #consoleOutput, #consolePanel, #consoleBtn, #runBtn,
// #loadingOverlay — and to define window.onWasmReady() for what happens once
// the wasm runtime is up. Load prism-editor.js before this, then the
// page-specific script, then app.js.

// Cached DOM refs
const canvasEl       = document.getElementById('canvas');
const editorWrap     = document.getElementById('editorWrap');
const consoleOutput  = document.getElementById('consoleOutput');
const consolePanel   = document.getElementById('consolePanel');
const consoleBtnEl   = document.getElementById('consoleBtn');
const runBtnEl       = document.getElementById('runBtn');
const loadingOverlay = document.getElementById('loadingOverlay');

// Word wrap earns its keep on a phone, where a long line otherwise means
// scrolling the editor sideways with a thumb. On a wide screen it just makes
// the code harder to scan, so it follows the viewport.
const narrowScreen = window.matchMedia('(max-width: 767px)');

const editor = PrismEditor.createEditor(
  editorWrap,
  {
    language: 'ruby',
    value: '',
    tabSize: 2,
    insertSpaces: true,
    lineNumbers: true,
    wordWrap: narrowScreen.matches,
  },
  PrismEditor.editorCommands(PrismEditor.defaultKeymap),
  PrismEditor.editHistory(),
  PrismEditor.cursorPosition(),
  PrismEditor.matchBrackets(),
  PrismEditor.highlightBracketPairs()
);

narrowScreen.addEventListener('change', function(e) {
  editor.setOptions({ wordWrap: e.matches });
});

// Cmd/Ctrl+Enter runs the program. Precedence 0 to beat the default keymap,
// which otherwise claims the combo for "insert blank line".
PrismEditor.addEditorHotkey(editor, 'Mod+Enter', function() {
  runCode();
  return true;
}, 0);

// Keep the running program from reacting to whatever is being typed into the
// editor. The wasm runtime binds its SDL keyboard handler to `window` (SDL's
// default when SDL_HINT_EMSCRIPTEN_KEYBOARD_ELEMENT is unset), so anything that
// reaches `window` is game input. Listening on the editor's own container puts
// this after the editor's handlers but before SDL's: the editor keeps every
// key, the game sees none of them.
editor.container.addEventListener('keydown', function(e) { e.stopPropagation(); });
editor.container.addEventListener('keyup',   function(e) { e.stopPropagation(); });

// Keep browser shortcuts (Cmd/Ctrl+C, +V, +A, …) working across the rest of the
// page. SDL calls preventDefault on keys it consumes, which otherwise swallows
// copy/paste everywhere outside the editor. SDL registers on the bubble phase,
// so this capture-phase listener runs first, and stopping propagation for
// modifier combos lets the browser's native shortcut through. Plain keys are
// left alone so they still reach the running app.
window.addEventListener('keydown', function(e) {
  if (!(e.metaKey || e.ctrlKey)) return;
  if (editor.container.contains(e.target)) return;
  e.stopImmediatePropagation();
}, true);

// Let the page keep scrolling when the pointer is over the canvas. SDL calls
// preventDefault on every wheel event it receives, so a running example pins
// the page under the cursor — on /examples the canvas is most of what's on
// screen, which makes the page feel stuck. Same trick as the keys above: SDL
// listens on the bubble phase, so stopping the event during capture means its
// handler never runs and never cancels the scroll. Passive because this only
// ever stops propagation, which lets the browser scroll without waiting on it.
//
// This does cost the running program its wheel input. Nothing here wants it —
// no example or tutorial step binds a scroll event — but an example that did
// would need this narrowed rather than removed.
window.addEventListener('wheel', function(e) {
  if (e.target === canvasEl) e.stopImmediatePropagation();
}, { capture: true, passive: true });

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
    editorWrap.classList.add('error');
    canvasEl.style.width  = canvasEl.getAttribute('width')  + 'px';
    canvasEl.style.height = canvasEl.getAttribute('height') + 'px';
  }
};

// Dirty state — does the editor differ from what's on the canvas?
let lastRunCode = null;

function updateDirty() {
  const dirty = lastRunCode !== null && editor.value !== lastRunCode;
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

editor.on('update', updateDirty);

// Load a program into the editor, replacing whatever is there. The undo history
// is cleared along with it: without that, a visitor could undo their way from
// this example back into the previous one.
//
// Call this with the editor on screen. Returning it to the top is part of the
// job, and a hidden element has no layout box to accept a scroll offset — the
// assignment is quietly dropped, and reading the value back gives zero either
// way, so there's nothing to notice.
function setEditorCode(code) {
  editor.setOptions({ value: code });
  if (editor.extensions.history) editor.extensions.history.clear();
  editor.container.scrollTop = 0;
  editor.container.scrollLeft = 0;
  resetDirty();
}

function runCode() {
  clearConsole();
  editorWrap.classList.remove('error');
  let code = editor.value;
  lastRunCode = code;
  updateDirty();
  code = code.replace(/^[ \t]*require\s+['"]ruby2d(?:\/\w+)*['"]\s*$/mg, '');
  Module.ccall('try_run_code', null, ['string'], [code]);
}
